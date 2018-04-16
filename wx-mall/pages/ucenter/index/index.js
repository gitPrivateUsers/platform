var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../services/user.js');
var app = getApp();
var thad;
Page({
  data: {
  },
  pay:function(){

  },
  onLoad: function (options) {


    wx.setNavigationBarTitle({
      title: '我的'
    })

    // 页面初始化 options为页面跳转所带来的参数
    thad=this;
    initGs();
    user.loginByWeixin().then(res => {
      console.info("====");
      console.info(res);
      thad.setData({
        userInfo: res.data.userInfo,
        gs:res.data.gs,
        token: res.data.token
      });
      console.info(this.data);


    }).catch((err) => {
      console.log(err)
    });
  
  },
  onReady: function () {

  },
  onShow: function () { 
    let userInfo = wx.getStorageSync('userInfo');
    let gs = wx.getStorageSync('gs');//tianjia
    let token = wx.getStorageSync('token');

    // 页面显示
    if (userInfo && token) {
      app.globalData.userInfo = userInfo;
      app.globalData.token = token;
    }

    this.setData({
      userInfo: app.globalData.userInfo,
    });

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  },
  gh:function(){ 
    wx.makePhoneCall({
      phoneNumber: this.data.gs.ph
    });
  },
  dh: function (e) {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度  
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude

        wx.openLocation({
          latitude: thad.data.gs.latitude,
          longitude: thad.data.gs.longitude,
          name: thad.data.gs.address,
          scale: 28
        });
      }
    })
    },
    exitLogin: function () {
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          wx.switchTab({
            url: '/pages/index/index'
          });
        }
      }
    })

  }
});
function initGs(){
  wx.request({
    url: api.GS, //仅为示例，并非真实的接口地址
    data: {
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data)
      thad.setData({
        gs: res.data
      });
    }
  });
}