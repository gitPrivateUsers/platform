package com.platform.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 新闻资讯表实体
 * 表名 news_message
 *
 * @author lipengjun
 * @email 939961241@qq.com
 * @date 2018-01-27 11:33:50
 */
public class NewsMessageEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    //新闻id 
    private Integer id;
    //新闻标题
    private String title;
    //
    private String details;
    //新闻内容
    private String author;
    //发布日期
    private Date releaseDate;
    //类型id
    private Integer typeId;
    //点击量
    private Long clickRate;
    //是否头条：0否，1是
    private Integer showTop;
    //是否热点：0否，1是
    private Integer showHot;
    //新闻图片url
    private String newsImageUrl;
    //最后评论者id
    private Integer lastCommentId;
    //最后评论时间
    private Date lastCommentTime;
    //评论次数
    private Long commentCount;
    //更新时间
    private Date updateTime;
    //更新者
    private String updateBy;
    //身份标识
    private Long identify;
    //用户ID
    private Long sysUserId;

    //类型名称
    private String typeName;


    /**
     * 设置：新闻id 
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取：新闻id 
     */
    public Integer getId() {
        return id;
    }
    /**
     * 设置：新闻标题
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * 获取：新闻标题
     */
    public String getTitle() {
        return title;
    }
    /**
     * 设置：
     */
    public void setDetails(String details) {
        this.details = details;
    }

    /**
     * 获取：
     */
    public String getDetails() {
        return details;
    }
    /**
     * 设置：新闻内容
     */
    public void setAuthor(String author) {
        this.author = author;
    }

    /**
     * 获取：新闻内容
     */
    public String getAuthor() {
        return author;
    }
    /**
     * 设置：发布日期
     */
    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    /**
     * 获取：发布日期
     */
    public Date getReleaseDate() {
        return releaseDate;
    }
    /**
     * 设置：类型id
     */
    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    /**
     * 获取：类型id
     */
    public Integer getTypeId() {
        return typeId;
    }
    /**
     * 设置：点击量
     */
    public void setClickRate(Long clickRate) {
        this.clickRate = clickRate;
    }

    /**
     * 获取：点击量
     */
    public Long getClickRate() {
        return clickRate;
    }
    /**
     * 设置：是否头条：0否，1是
     */
    public void setShowTop(Integer showTop) {
        this.showTop = showTop;
    }

    /**
     * 获取：是否头条：0否，1是
     */
    public Integer getShowTop() {
        return showTop;
    }
    /**
     * 设置：是否热点：0否，1是
     */
    public void setShowHot(Integer showHot) {
        this.showHot = showHot;
    }

    /**
     * 获取：是否热点：0否，1是
     */
    public Integer getShowHot() {
        return showHot;
    }
    /**
     * 设置：新闻图片url
     */
    public void setNewsImageUrl(String newsImageUrl) {
        this.newsImageUrl = newsImageUrl;
    }

    /**
     * 获取：新闻图片url
     */
    public String getNewsImageUrl() {
        return newsImageUrl;
    }
    /**
     * 设置：最后评论者id
     */
    public void setLastCommentId(Integer lastCommentId) {
        this.lastCommentId = lastCommentId;
    }

    /**
     * 获取：最后评论者id
     */
    public Integer getLastCommentId() {
        return lastCommentId;
    }
    /**
     * 设置：最后评论时间
     */
    public void setLastCommentTime(Date lastCommentTime) {
        this.lastCommentTime = lastCommentTime;
    }

    /**
     * 获取：最后评论时间
     */
    public Date getLastCommentTime() {
        return lastCommentTime;
    }
    /**
     * 设置：评论次数
     */
    public void setCommentCount(Long commentCount) {
        this.commentCount = commentCount;
    }

    /**
     * 获取：评论次数
     */
    public Long getCommentCount() {
        return commentCount;
    }
    /**
     * 设置：更新时间
     */
    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    /**
     * 获取：更新时间
     */
    public Date getUpdateTime() {
        return updateTime;
    }
    /**
     * 设置：更新者
     */
    public void setUpdateBy(String updateBy) {
        this.updateBy = updateBy;
    }

    /**
     * 获取：更新者
     */
    public String getUpdateBy() {
        return updateBy;
    }
    /**
     * 设置：标识索引备注
     */
    public void setIdentify(Long identify) {
        this.identify = identify;
    }

    /**
     * 获取：标识索引备注
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
}
