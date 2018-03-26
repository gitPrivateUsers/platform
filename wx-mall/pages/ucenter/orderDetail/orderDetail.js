var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const pay = require('../../../services/pay.js');
Page({
  data: {
    orderId: 0,
    orderInfo: {},
    orderGoods: [],
    handleOption: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      orderId: options.id
    });
    this.getOrderDetail();
  },
  getOrderDetail() {
    let that = this;
    util.request(api.OrderDetail, {
      orderId: that.data.orderId
    }).then(function (res) {
      if (res.errno === 0) {
        console.log(res.data);
        that.setData({
          orderInfo: res.data.orderInfo,
          orderGoods: res.data.orderGoods,
          handleOption: res.data.handleOption
        });
        //that.payTimer();
      }
    });
  },
  payTimer() {
    let that = this;
    let orderInfo = that.data.orderInfo;

    setInterval(() => {
      console.log(orderInfo);
      orderInfo.add_time -= 1;
      that.setData({
        orderInfo: orderInfo,
      });
    }, 1000);
  },
  payOrder() {
    let that = this;
    util.request(api.PayPrepayId, {
      orderId: that.data.orderId || 15
      , storeId: api.StoreId}).then(function (res) {
      if (res.errno === 0) {
        const payParam = res.data;
        pay.payOrder(parseInt(that.data.orderId)).then(res => {
          wx.redirectTo({
            url: '/pages/payResult/payResult?status=1&orderId=' + that.data.orderId 
          });
        }).catch(res => {
          wx.redirectTo({
            url: '/pages/payResult/payResult?status=0&orderId=' + that.data.orderId 
          }); 
        });
      }
    });

  },
  cancelOrder:function(res){//取消订单
    let that = this;
    util.request(api.cancelOrder, {
      orderId: that.data.orderId,
      storeId: api.StoreId
    }).then(function (res) {
    
      if (res.errno==0){
        wx.redirectTo({
          url: '../order/order'
        })
      }
    }
    );
  },
  confirmOrder:function(res){
    let that = this;
    util.request(api.confirmOrder, {
      orderId: that.data.orderId
    }).then(function (res) {
      console.info(res);
    }
      );
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
  }
})