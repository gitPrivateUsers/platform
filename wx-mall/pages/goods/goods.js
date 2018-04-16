var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var thats;

Page({
  data: {
    id: 0,
    goods: {},
    gallery: [],
    attribute: [],
    issueList: [],
    comment: [],
    brand: {},
    specificationList: [],//产品参数
    productList: [],
    relatedGoods: [],
    cartGoodsCount: 0,
    userHasCollect: 0,
    number: 1,
    checkedSpecText: '请选择规格数量',
    openAttr: false,//是否显示参数
    noCollectImage: "/static/images/icon_collect.png",
    hasCollectImage: "/static/images/icon_collect_checked.png",
    collectBackImage: "/static/images/icon_collect.png"
  },
  getGoodsRelated: function () {
    let that = this;
    util.request(api.GoodsRelated, {
      id: that.data.id, storeId: api.StoreId
}).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          relatedGoods: res.data.goodsList,
        });
      }
    });

  },
  onShareAppMessage: function () {
    return {
      title: '商品详情',
      desc: '点客盈微信小程序商城',
      path: '/pages/goods/goods'
    }
  },
  clickSkuValue: function (event) {//选规格
    clickSkuValue(this, event);
  },
  //根据已选的值，计算其它值的状态
  setSpecValueStatus: function () {

  },
  //判断规格是否选择完整
  isCheckedAllSpec: function () {
    return !getCheckedSpecValue(this).some(function (v) {
      if (v.valueId == 0) {
        return true;
      }
    });
  },
  changeSpecInfo: function () {
    let checkedNameValue = getCheckedSpecValue(this);

    //设置选择的信息
    let checkedValue = checkedNameValue.filter(function (v) {
      if (v.valueId != 0) {
        return true;
      } else {
        return false;
      }
    }).map(function (v) {
      return v.valueText;
    });
    if (checkedValue.length > 0) {
      this.setData({
        'checkedSpecText': checkedValue.join('　')
      });
    } else {
      this.setData({
        'checkedSpecText': '请选择规格数量'
      });
    }

  }
,
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品详情'
    })
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      id: parseInt(options.id)
      // id: 1181000
    });
    var that = this;
    thats=this;
    //初始化数据
    init(that);

    util.request(api.CartGoodsCount, { storeId: api.StoreId}).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          cartGoodsCount: res.data.cartTotal.goodsCount
        });
      }
    });

  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  switchAttrPop: function () {
    if (this.data.openAttr == false) {
      this.setData({
        openAttr: !this.data.openAttr,
        collectBackImage: "/static/images/detail_back.png"
      });
    }
  },
  closeAttrOrCollect: function () {
    let that = this;
    if (this.data.openAttr) {
      this.setData({
        openAttr: false,
      });
      if (that.data.userHasCollect == 1) {
        that.setData({
          'collectBackImage': that.data.hasCollectImage
        });
      } else {
        that.setData({
          'collectBackImage': that.data.noCollectImage
        });
      }
    } else {
      //添加或是取消收藏
      util.request(api.CollectAddOrDelete, { typeId: 0, valueId: this.data.id, storeId: api.StoreId}, "POST")
        .then(function (res) {
          let _res = res;
          if (_res.errno == 0) {
            if (_res.data.type == 'add') {
              that.setData({
                'collectBackImage': that.data.hasCollectImage
              });
            } else {
              that.setData({
                'collectBackImage': that.data.noCollectImage
              });
            }

          } else {
            wx.showToast({
              image: '/static/images/icon_error.png',
              title: _res.errmsg,
              mask: true
            });
          }

        });
    }

  },
  openCartPage: function () {
    wx.switchTab({
      url: '/pages/cart/cart',
    });
  },
  
  gm:function(){
    clickAddToCart(this,0);
   
  },
  addToCart: function () {//点击事件：加入购物车
    clickAddToCart(this)
  },
  cutNumber: function () {
    this.setData({
      number: (this.data.number - 1 > 1) ? this.data.number - 1 : 1
    });
  },
  addNumber: function () {
    this.setData({
      number: this.data.number + 1
    });
  }
});

function getCheckedSpecKey(that){
  let checkedValue = getCheckedSpecValue(that).map(function (v) {
    return v.valueId;
  });
  return checkedValue.join('_');
}


function getCheckedProductItem(key, that) {
  console.info(thats.data.productList);
  return thats.data.productList.filter(function (v) {
    return v;
    // if (v.goods_specification_ids == key) {
    //   return true;
    // } else {
    //   return false;
    // }
  });
}

/**
 * 获取选中的规格信息
 */
function getCheckedSpecValue(that){
  let checkedValues = [];
  let _specificationList = thats.data.specificationList;
  for (let i = 0; i < _specificationList.length; i++) {
    let _checkedObj = {
      nameId: _specificationList[i].specification_id,
      valueId: 0,
      valueText: ''
    };
    for (let j = 0; j < _specificationList[i].valueList.length; j++) {
      if (_specificationList[i].valueList[j].checked) {
        _checkedObj.valueId = _specificationList[i].valueList[j].id;
        _checkedObj.valueText = _specificationList[i].valueList[j].value;
      }
    }
    checkedValues.push(_checkedObj);
  }

  return checkedValues;

}

/***
 * 点击事件：加入购物车
 */
function clickAddToCart(that,types){
    //提示选择完整规格
    if (!thats.isCheckedAllSpec()) {
      return false;
    }
    console.info("===========");
    console.info(thats.data.checkedSpecText);
    console.info("============");
    //根据选中的规格，判断是否有对应的sku信息
    let checkedProduct = getCheckedProductItem(getCheckedSpecKey());
    
    // console.info(checkedProduct);
    // if (!checkedProduct || checkedProduct.length <= 0) {
    //   //找不到对应的product信息，提示没有库存
    //   return false;
    // }
 
    // //验证库存
    // if (checkedProduct.goods_number < thats.data.number) {
    //   //找不到对应的product信息，提示没有库存
    //   return false;
    // }
    // console.info(getCheckedSpecKey(thats));
    //添加到购物车
    util.request(api.CartAdd, { goodsId: that.data.goods.id, number: that.data.number, productId: checkedProduct[0].id, goodsSpecifitionNameValue: thats.data.checkedSpecText, goodsSpecifitionIds: getCheckedSpecKey(thats), storeId: api.StoreId }, "POST")
      .then(function (res) {
        let _res = res;
        if (_res.errno == 0) {
          wx.showToast({
            title: '添加成功'
          });
          that.setData({
            // openAttr: !that.data.openAttr,
            cartGoodsCount: _res.data.cartTotal.goodsCount
          });
          if (that.data.userHasCollect == 1) {
            that.setData({
              'collectBackImage': that.data.hasCollectImage
            });
          } else {
            that.setData({
              'collectBackImage': that.data.noCollectImage
            });
          }
          wx.navigateTo({
            url: '../shopping/checkout/checkout'
          });
        } else {
          wx.showToast({
            image: '/static/images/icon_error.png',
            title: _res.errmsg,
            mask: true
          });
        }

      });
  
}
/**
 * 点解事件：选择规格
 */
function clickSkuValue(that, event){
  let specNameId = event.currentTarget.dataset.nameId;
  let specValueId = event.currentTarget.dataset.valueId;

  //判断是否可以点击

  //TODO 性能优化，可在wx:for中添加index，可以直接获取点击的属性名和属性值，不用循环
  let _specificationList = that.data.specificationList;
  for (let i = 0; i < _specificationList.length; i++) {
    if (_specificationList[i].specification_id == specNameId) {
      for (let j = 0; j < _specificationList[i].valueList.length; j++) {
        if (_specificationList[i].valueList[j].id == specValueId) {
          //如果已经选中，则反选
          if (_specificationList[i].valueList[j].checked) {
            _specificationList[i].valueList[j].checked = false;
          } else {
            _specificationList[i].valueList[j].checked = true;
          }
        } else {
          _specificationList[i].valueList[j].checked = false;
        }
      }
    }
  }
  that.setData({
    'specificationList': _specificationList
  });
  //重新计算spec改变后的信息
  that.changeSpecInfo();

    //重新计算哪些值不可以点击
}
/**
 * 初始化数据
 */
function init(that) {
  initGoods(that);
}
/**
 * 初始化产品数据
 */
function initGoods(that) {
  util.request(api.GoodsDetail, { id: that.data.id}).then(function (res) {
    if (res.errno === 0) {
      that.setData({
        goods: res.data.info,
        gallery: res.data.gallery,
        attribute: res.data.attribute,
        issueList: res.data.issue,
        comment: res.data.comment,
        brand: res.data.brand,
        specificationList: res.data.specificationList,
        productList: res.data.productList,
        userHasCollect: res.data.userHasCollect
      });

      if (res.data.userHasCollect == 1) {
        that.setData({
          'collectBackImage': that.data.hasCollectImage
        });
      } else {
        that.setData({
          'collectBackImage': that.data.noCollectImage
        });
      }

      WxParse.wxParse('goodsDetail', 'html', res.data.info.goods_desc, that);
      //初始化产品规格
      initSpeciFications(that);
      that.getGoodsRelated();
    }
  });

}

/**
 * 初始化规格
 */
function initSpeciFications(that) {
  //TODO 性能优化，可在wx:for中添加index，可以直接获取点击的属性名和属性值，不用循环
  var _specificationList = that.data.specificationList;
  for (var i = 0; i < _specificationList.length; i++) {
    for (var j = 0; j < _specificationList[i].valueList.length; j++) {
      if (j == 0) {
        _specificationList[i].valueList[j].checked = true;
      }
    }

  }
  that.setData({
    'specificationList': _specificationList
  });
  //重新计算spec改变后的信息
  that.changeSpecInfo();
}