//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    addressList:[]
  },
  addAddess : function () {//新增地址
    wx.navigateTo({
      url:"/pages/ucenter/address-add/address-add"
    })
  },
  
  editAddess: function (e) {//修改地址
    wx.navigateTo({
      url: "/pages/address-add/index?id=" + e.currentTarget.dataset.id
    })
  },
  
  onLoad: function () {
    console.log('onLoad')

   
  },
  onShow : function () {
    this.initShippingAddress();
  },
  initShippingAddress: function () {
    var that = this;
    wx.request({
      url: 'https://xcx.shty888.com/address.list',
      data: {
        token:app.globalData.token
      },
      success: (res) =>{
        if (res.data.code == 1) {
          that.setData({
            addressList: res.data.data.addresses
          });
        } else if (res.data.code == 700){
          that.setData({
            addressList: null
          });
        }
      }
    })
  }

});


