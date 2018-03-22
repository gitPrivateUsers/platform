package com.platform.util.wechat;

import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLContexts;

import javax.net.ssl.SSLContext;
import java.io.InputStream;
import java.security.KeyStore;

@SuppressWarnings("deprecation")
public class WechatConfig {

    /**
     * 商户id
     */
    public static String appId = "wxbc649f25caf7512e";
    /**
     * 商户号
     */
    public static String mchId = "1496716192";
    /**
     * 交易类型
     */
    public static String tradeType = "JSAPI";//JSAPI
    /**
     * 签名
     */
    public static String paySignKey = "726520f78a6d5cc0127e7da9fb778ff4";
    /**
     * 证书名称，对应不同的商户号
     */
    public static String certName = "/cert/apiclient_cert.p12";
    /**
     * 支付回调地址
     */
    public static String notifyUrl = "url/api/notify";

    private static SSLConnectionSocketFactory sslcsf;

    public static SSLConnectionSocketFactory getSslcsf() {
        if (null == sslcsf) {
            setSsslcsf();
        }
        return sslcsf;
    }

    private static void setSsslcsf() {
        try {
            KeyStore keyStore = KeyStore.getInstance("PKCS12");
            Thread.currentThread().getContextClassLoader();
            InputStream instream = new WechatRefundApiResult().getClass().getResourceAsStream(certName);
//            InputStream instream = new FileInputStream(certName);
            try {
                keyStore.load(instream, mchId.toCharArray());
            } finally {
                instream.close();
            }
            SSLContext sslcontext = SSLContexts.custom().loadKeyMaterial(keyStore, mchId.toCharArray()).build();
            sslcsf = new SSLConnectionSocketFactory(sslcontext, new String[]{"TLSv1"}, null, SSLConnectionSocketFactory.BROWSER_COMPATIBLE_HOSTNAME_VERIFIER);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
