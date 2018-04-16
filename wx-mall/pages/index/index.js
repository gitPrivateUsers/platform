const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');

//获取应用实例
const app = getApp()
Page({
  data: {
    newGoodsList: [],
    hotGoodsList: [],
    topics: [],
    brands: [],
    floorGoods: [],
    banner: []//广告图
  },
  onShareAppMessage: function () {
    return {
      title: '点客盈-首页',
      desc: '点客盈微信小程序商城',
      path: '/pages/index/index'
    }
  },

  getIndexData: function () {
    let that = this;
    util.request(api.IndexUrl, { storeId:api.StoreId}).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          newGoods: res.data.newGoodsList,
          hotGoods: res.data.hotGoodsList,
          topics: res.data.topicList,
          brand: res.data.brandList,
          floorGoods: res.data.categoryList,
          banner: res.data.banner,
          newGoodsList: res.data.newGoodsList,
          hotGoodsList: res.data.hotGoodsList
        });
      }
    });
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '首页'
    })
    this.getIndexData();
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
});

