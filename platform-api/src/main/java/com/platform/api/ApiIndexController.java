package com.platform.api;

import com.platform.annotation.IgnoreAuth;
import com.platform.entity.AdPositionVo;
import com.platform.entity.AdVo;
import com.platform.entity.GoodsVo;
import com.platform.entity.StoreConfigureEntity;
import com.platform.service.*;
import com.platform.util.ApiBaseAction;
import com.platform.util.wechat.WechatConfig;
import com.platform.util.wechat.WechatUtil;
import com.platform.utils.CharUtil;
import com.platform.utils.DateUtils;
import com.platform.utils.MapUtils;
import com.platform.utils.XmlUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

/**
 * 作者: @author Harmon <br>
 * 时间: 2017-08-11 08:32<br>
 * 描述: ApiIndexController <br>
 */
@RestController
@RequestMapping("/api/index")
public class ApiIndexController extends ApiBaseAction {
    // 微信统一下单接口路径
    private static final String UNIFORMORDER = "https://api.mch.weixin.qq.com/pay/unifiedorder";
    /**
     * 获取支付的请求参数
     */
    @IgnoreAuth
    @RequestMapping("pay_prepay1")
    public Object payPrepay1(long storeId) {
        //查詢出商家信息
        StoreConfigureEntity store=getStore(storeId);

        String nonceStr = CharUtil.getRandomString(32);

        //https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&index=3
        Map<Object, Object> resultObj = new TreeMap();

        try {
            Map<Object, Object> parame = new TreeMap<Object, Object>();
            parame.put("appid", store.getAppId());
//            parame.put("appid", WechatConfig.appId);
//            parame.put("mch_id", WechatConfig.mchId);// 商家账号。
            parame.put("mch_id",  store.getMuchId());// 商家账号。
            String randomStr = CharUtil.getRandomNum(18).toUpperCase();
            parame.put("nonce_str", randomStr);// 随机字符串
            parame.put("out_trade_no", "1111");// 商户订单编号
            parame.put("openid", "ozvkm0WKwT5xYPSVPAN6g-9H7zaY");
            Map orderGoodsParam = new HashMap();
            orderGoodsParam.put("order_id", "111");
            parame.put("body", "超市-支付");// 商品描述
            //订单的商品

            //支付金额
//            parame.put("total_fee", orderInfo.getActual_price().multiply(new BigDecimal(100)).intValue()));//todo 消费金额
            parame.put("total_fee", 1);// 消费金额
            parame.put("notify_url", WechatConfig.notifyUrl);// 回调地址
            parame.put("trade_type", WechatConfig.tradeType);// 交易类型APP
//            parame.put("spbill_create_ip", getClientIp());
            parame.put("spbill_create_ip", "119.23.71.39");

//            parame.put("sign_type", "MD5");

            String sign = WechatUtil.arraySign(parame, store.getPaySingKey());
//            String sign = WechatUtil.arraySign(parame, WechatConfig.paySignKey);
            parame.put("sign", sign);// 数字签证

            String xml = MapUtils.convertMap2Xml(parame);
            logger.info("xml:" + xml);

            Map<String, Object> resultUn = XmlUtil.xmlStrToMap(WechatUtil.requestOnce(UNIFORMORDER, xml,getStore(storeId).getMuchId()));
            // 响应报文
            String return_code = MapUtils.getString("return_code", resultUn);
            String return_msg = MapUtils.getString("return_msg", resultUn);
            //
            if (return_code.equalsIgnoreCase("FAIL")) {
                return toResponsFail("支付失败," + return_msg);
            } else if (return_code.equalsIgnoreCase("SUCCESS")) {
                // 返回数据
                String result_code = MapUtils.getString("result_code", resultUn);
                String err_code_des = MapUtils.getString("err_code_des", resultUn);
                if (result_code.equalsIgnoreCase("FAIL")) {
                    return toResponsFail("支付失败," + err_code_des);
                } else if (result_code.equalsIgnoreCase("SUCCESS")) {
                    String prepay_id = MapUtils.getString("prepay_id", resultUn);
                    // 先生成paySign 参考https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&index=5
//                    resultObj.put("appId", WechatConfig.appId);
                    resultObj.put("appId", store.getAppId());
                    resultObj.put("timeStamp", DateUtils.timeToStr(System.currentTimeMillis() / 1000, DateUtils.DATE_TIME_PATTERN));
                    resultObj.put("nonceStr", nonceStr);
                    resultObj.put("package", "prepay_id=" + prepay_id);
                    resultObj.put("signType", "MD5");
                    String paySign = WechatUtil.arraySign(resultObj, store.getPaySingKey());
//                    String paySign = WechatUtil.arraySign(resultObj, WechatConfig.paySignKey);
                    resultObj.put("paySign", paySign);
         
                    return toResponsObject(0, "微信统一订单下单成功", resultObj);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return toResponsFail("下单失败,error=" + e.getMessage());
        }
        return toResponsFail("下单失败");
    }
    
	
	/**
	 * 广告
	 */
    @Autowired
    private ApiAdService adService;

    /**
     * 广告类型
     */
    @Autowired
    private ApiBrandService brandService;
    @Autowired
    private ApiChannelService channelService;
    @Autowired
    private ApiGoodsService goodsService;
    @Autowired
    private ApiTopicService topicService;
    @Autowired
    private ApiCategoryService categoryService;
    @Autowired
    private ApiGoodsGroupService goodsGroupService;
    @Autowired
    private ApiCartService cartService;


    /**
     * app首页
     */
    @IgnoreAuth
    @RequestMapping("index")
    public Object index(@RequestParam Long storeId) {

        long identify =getStoreIdByDeptId(storeId);

        Map<String, Object> resultObj = new HashMap<String, Object>();
        //轮播图
        Map<String, Object>param = new HashMap<String, Object>();
        param.put("ad_position_id", 2);
        param.put("identify", identify);
        List<AdVo> banner = adService.queryList(param);
        resultObj.put("banner", banner);
        //新品
        param = new HashMap<String, Object>();
        param.put("is_new", 1);
        param.put("offset", 0);
        param.put("limit", 4);
        param.put("is_delete", 0);
        param.put("identify", identify);
        param.put("fields", "id, name, list_pic_url, retail_price");
        List<GoodsVo> newGoods = goodsService.queryList(param);
        resultObj.put("newGoodsList", newGoods);
        
        //热销
        param = new HashMap<String, Object>();
        param.put("is_hot", 1);
        param.put("offset", 0);
        param.put("limit", 4);
        param.put("is_delete", 0);
        param.put("identify", identify);
        param.put("fields", "id, name, list_pic_url, retail_price");
        List<GoodsVo> hotGoods = goodsService.queryList(param);
        resultObj.put("hotGoodsList", hotGoods);
        
        //
//        param = new HashMap<String, Object>();
//        param.put("sidx", "sort_order ");
//        param.put("order", "asc ");
//        List<ChannelVo> channel = channelService.queryList(param);
//        resultObj.put("channel", channel);
        //

        
        //
//        param = new HashMap<String, Object>();
//        param.put("is_hot", "1");
//        param.put("offset", 0);
//        param.put("limit", 3);
//        param.put("is_delete", 0);
//        List<GoodsVo> hotGoods = goodsService.queryHotGoodsList(param);
//        resultObj.put("hotGoodsList", hotGoods);
//        // 当前购物车中
//        List<CartVo> cartList = new ArrayList();
//        if (null != getUserId()) {
//            //查询列表数据
//            Map<String, Object> cartParam = new HashMap<String, Object>();
//            cartParam.put("user_id", getUserId());
//            cartList = cartService.queryList(cartParam);
//        }
//        if (null != cartList && cartList.size() > 0 && null != hotGoods && hotGoods.size() > 0) {
//            for (GoodsVo goodsVo : hotGoods) {
//                for (CartVo cartVo : cartList) {
//                    if (goodsVo.getId().equals(cartVo.getGoods_id())) {
//                        goodsVo.setCart_num(cartVo.getNumber());
//                    }
//                }
//            }
//        }
        //
//        param = new HashMap();
//        param.put("is_new", 1);
//        param.put("sidx", "new_sort_order ");
//        param.put("order", "asc ");
//        param.put("offset", 0);
//        param.put("limit", 4);
//        List<BrandVo> brandList = brandService.queryList(param);
//        resultObj.put("brandList", brandList);
        //
//        param = new HashMap();
//        param.put("offset", 0);
//        param.put("limit", 3);
//        List<TopicVo> topicList = topicService.queryList(param);
//        resultObj.put("topicList", topicList);
        // 团购
//        param = new HashMap();
//        param.put("offset", 0);
//        param.put("limit", 3);
//        List<GoodsGroupVo> goodsGroupVos = goodsGroupService.queryList(param);
//        resultObj.put("topicList", goodsGroupVos);
        // 砍价
//        param = new HashMap();
//        param.put("offset", 0);
//        param.put("limit", 3);
//        List<GoodsGroupVo> goodsGroupVos = goodsGroupService.queryList(param);
//        resultObj.put("topicList", goodsGroupVos);
        //
//        param = new HashMap<String, Object>();
//        param.put("parent_id", 0);
//        param.put("notName", "推荐");//<>
//        List<CategoryVo> categoryList = categoryService.queryList(param);
//        List<Map<String, Object>> newCategoryList = new ArrayList<>();
//
//        for (CategoryVo categoryItem : categoryList) {
//            param.remove("fields");
//            param.put("parent_id", categoryItem.getId());
//            List<CategoryVo> categoryEntityList = categoryService.queryList(param);
//            List<Integer> childCategoryIds = new ArrayList<>();
//            for (CategoryVo categoryEntity : categoryEntityList) {
//                childCategoryIds.add(categoryEntity.getId());
//            }
//        
//            //
//            param = new HashMap<String, Object>();
//            param.put("categoryIds", childCategoryIds);
//            param.put("fields", "id as id, name as name, list_pic_url as list_pic_url, retail_price as retail_price");
//            List<GoodsVo> categoryGoods = goodsService.queryList(param);
//            Map<String, Object> newCategory = new HashMap<String, Object>();
//            newCategory.put("id", categoryItem.getId());
//            newCategory.put("name", categoryItem.getName());
//            newCategory.put("goodsList", categoryGoods);
//            newCategoryList.add(newCategory);
//            
//            
//        }
        
//        resultObj.put("categoryList", categoryList);
//        resultObj.put("categoryList", newCategoryList);
        return toResponsSuccess(resultObj);
    }
}