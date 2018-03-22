var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');



var app = getApp();
var thad;
Page({
  data: {
    array: ['请选择反馈类型', '商品相关', '物流状况', '客户服务', '优惠活动', '功能异常', '产品建议', '其他'],
    index: 0,
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  ph:function(e){
    this.setData({
      ph: e.detail.value
    })
  },
  save:function(){
    initFeedback();
  },
  onLoad: function (options) {
    thad=this;
    
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  }
});

function initFeedback() {
  util.request(api.Feedback, { msg_type: thad.data.index,
    msg_content: "123", mobile:"thad.data.ph"}).then(function (res) {
    if (res.errno === 0) {
  
    }
  });


  // wx.request({
  //   url: api.Feedback, //仅为示例，并非真实的接口地址
  //   data: {
  //     msg_type:thad.data.index
  //   },
  //   header: {
  //     'content-type': 'application/json' // 默认值
  //   },
  //   success: function (res) {
  //     console.log(res.data)
  //     thad.setData({
  //       gs: res.data
  //     });
  //   }
  // });
}