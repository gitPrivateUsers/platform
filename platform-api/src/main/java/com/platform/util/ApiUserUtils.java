package com.platform.util;

import com.platform.entity.StoreConfigureEntity;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import java.util.Map;

/**
 * 作者: @author Harmon <br>
 * 时间: 2017-08-11 08:58<br>
 * 描述: ApiUserUtils <br>
 */
@Component
public class ApiUserUtils extends ApiBaseAction{
    private static Logger logger = Logger.getLogger(ApiUserUtils.class);
    //获取code的请求地址
    public static String Get_Code = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=%s&state=STAT#wechat_redirect";

//    public static String APPID = "wxbc649f25caf7512e";
//    public static String SECRET = "c75ba2fa22f202e53d452fa916ffd31b";
    private static final String EMPTY = "";

    //替换字符串
    public static String getCode(String APPID, String REDIRECT_URI, String SCOPE) {
        return String.format(Get_Code, APPID, REDIRECT_URI, SCOPE);
    }

    //获取Web_access_tokenhttps的请求地址
    public static String Web_access_tokenhttps = "https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code";

    //替换字符串
    public   String getWebAccess(String CODE,long storeId) {
        StoreConfigureEntity store=getStore(storeId);
        return String.format(Web_access_tokenhttps,
              store.getAppId()/*这里填小程序的appid*/,
               store.getAppSecret()  /*这里填该小程序的SECRET*/,
                CODE);
    }

    //拉取用户信息的请求地址
    public static String User_Message = "https://api.weixin.qq.com/sns/userinfo?access_token=%s&openid=%s&lang=zh_CN";

    //替换字符串
    public static String getUserMessage(String access_token, String openid) {
        return String.format(User_Message, access_token, openid);
    }
}