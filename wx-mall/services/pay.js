/**
 * 支付相关服务
 */

const util = require('../utils/util.js');
const api = require('../config/api.js');

/**
 * 判断用户是否登录
 */
function payOrder(orderId) {
  return new Promise(function (resolve, reject) {
    util.request(api.PayPrepayId, {
      orderId: orderId,
      storeId: api.StoreId
    }).then((res) => {
      console.log(res)
      if (res.errno === 0) {
        const payParam = res.data;
        wx.requestPayment({
          'timeStamp': payParam.timeStamp,
          'nonceStr': payParam.nonceStr,
          'package': payParam.package,
          'signType': payParam.signType,
          'paySign': payParam.paySign,
          'success': function (res) {
            resolve(res);
            util.request(api.notify, {
              'result_code': "SUCCESS",
              out_trade_no: orderId,
              storeId: api.StoreId
            }, 'POST').then(function (res) {
              console.info(res);
            });
          },
          'fail': function (res) {
            util.request(api.notify, {
              'result_code': "FAIL",
              out_trade_no: orderId,
              storeId: api.StoreId
            }, 'POST').then(function (res) {
              console.info(res);
            });
            reject(res);

          },
          'complete': function (res) {
            reject(res);
          }
        });
      } else {
        reject(res);
      }
    });
  });
}


module.exports = {
  payOrder,
};











