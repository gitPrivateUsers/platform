package com.platform.entity;

import java.io.Serializable;


/**
 * 实体
 * 表名 nideshop_address
 *
 * @author lipengjun
 * @email 939961241@qq.com
 * @date 2017-10-02 14:11:24
 */
public class AddressEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    //
    private Integer id;
    //会员ID
    private Integer userId;
    //收货人姓名
    private String userName;
    //手机
    private String telNumber;
    //邮编
    private String postalCode;
    //收货地址国家码
    private String nationalCode;
    //省
    private String provinceName;
    //市
    private String cityName;
    //区
    private String countyName;
    //详细收货地址信息
    private String detailInfo;
    //是否默认收货地址(0:不默认 1:默认收货地址)
    //private String idDefault = "0";
    //默认收货地址字段错误
    private  Integer isDefault = 0;

    public Integer getIsDefault() {
        return isDefault;
    }

    public void setIsDefault(Integer isDefault) {
        this.isDefault = isDefault;
    }

    //添加身份标识
    private Long identify;
    //添加用户ID
    private Long sysUserId;

    public Long getIdentify() {
        return identify;
    }

    public void setIdentify(Long identify) {
        this.identify = identify;
    }

    public Long getSysUserId() {
        return sysUserId;
    }

    public void setSysUserId(Long sysUserId) {
        this.sysUserId = sysUserId;
    }

    /**
     * 翻译会员名
     */
    private String shopUserName;

    public String getShopUserName() {
        return shopUserName;
    }

    public void setShopUserName(String shopUserName) {
        this.shopUserName = shopUserName;
    }

    /**
     * 设置：
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取：
     */
    public Integer getId() {
        return id;
    }

    /**
     * 设置：会员ID
     */
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    /**
     * 获取：会员ID
     */
    public Integer getUserId() {
        return userId;
    }

    /**
     * 设置：收货人姓名
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * 获取：收货人姓名
     */
    public String getUserName() {
        return userName;
    }

    /**
     * 设置：手机
     */
    public void setTelNumber(String telNumber) {
        this.telNumber = telNumber;
    }

    /**
     * 获取：手机
     */
    public String getTelNumber() {
        return telNumber;
    }

    /**
     * 设置：邮编
     */
    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    /**
     * 获取：邮编
     */
    public String getPostalCode() {
        return postalCode;
    }

    /**
     * 设置：收货地址国家码
     */
    public void setNationalCode(String nationalCode) {
        this.nationalCode = nationalCode;
    }

    /**
     * 获取：收货地址国家码
     */
    public String getNationalCode() {
        return nationalCode;
    }

    /**
     * 设置：省
     */
    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    /**
     * 获取：省
     */
    public String getProvinceName() {
        return provinceName;
    }

    /**
     * 设置：市
     */
    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    /**
     * 获取：市
     */
    public String getCityName() {
        return cityName;
    }

    /**
     * 设置：区
     */
    public void setCountyName(String countyName) {
        this.countyName = countyName;
    }

    /**
     * 获取：区
     */
    public String getCountyName() {
        return countyName;
    }

    /**
     * 设置：详细收货地址信息
     */
    public void setDetailInfo(String detailInfo) {
        this.detailInfo = detailInfo;
    }

    /**
     * 获取：详细收货地址信息
     */
    public String getDetailInfo() {
        return detailInfo;
    }

    /**
     * 设置：默认收货地址
     */
    //public String getIdDefault() {
    //    return idDefault;
    //}
    /**
     * 获取：默认收货地址
     */
    //public void setIdDefault(String idDefault) {
    //    this.idDefault = idDefault;
    //}
}
