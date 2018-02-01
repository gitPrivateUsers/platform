package com.platform.entity;

import java.io.Serializable;


/**
 * 新闻类型表实体
 * 表名 news_type
 *
 * @author lipengjun
 * @email 939961241@qq.com
 * @date 2018-01-27 11:33:50
 */
public class NewsTypeEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    //新闻类型id
    private Integer id;
    //类型名称
    private String typeName;
    //上一级类型id
    private Integer superiorId;
    //层级id
    private Integer tierId;
    //排序索引
    private Integer sortIndex;
    //备注
    private String remark;
    //身份标识
    private Long identify;
    //用户ID
    private Long sysUserId;

    /**
     * 设置：新闻类型id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取：新闻类型id
     */
    public Integer getId() {
        return id;
    }
    /**
     * 设置：类型名称
     */
    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    /**
     * 获取：类型名称
     */
    public String getTypeName() {
        return typeName;
    }
    /**
     * 设置：上一级类型id
     */
    public void setSuperiorId(Integer superiorId) {
        this.superiorId = superiorId;
    }

    /**
     * 获取：上一级类型id
     */
    public Integer getSuperiorId() {
        return superiorId;
    }
    /**
     * 设置：层级id
     */
    public void setTierId(Integer tierId) {
        this.tierId = tierId;
    }

    /**
     * 获取：层级id
     */
    public Integer getTierId() {
        return tierId;
    }
    /**
     * 设置：排序索引
     */
    public void setSortIndex(Integer sortIndex) {
        this.sortIndex = sortIndex;
    }

    /**
     * 获取：排序索引
     */
    public Integer getSortIndex() {
        return sortIndex;
    }
    /**
     * 设置：备注
     */
    public void setRemark(String remark) {
        this.remark = remark;
    }

    /**
     * 获取：备注
     */
    public String getRemark() {
        return remark;
    }
    /**
     * 设置：身份标识
     */
    public void setIdentify(Long identify) {
        this.identify = identify;
    }

    /**
     * 获取：身份标识
     */
    public Long getIdentify() {
        return identify;
    }
    /**
     * 设置:用户ID
     */
    public void setSysUserId(Long sysUserId) {
        this.sysUserId = sysUserId;
    }

    /**
     * 获取：用户ID
     */
    public Long getSysUserId() {
        return sysUserId;
    }
}
