package com.platform.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 新闻评论表实体
 * 表名 news_comment
 *
 * @author lipengjun
 * @email 939961241@qq.com
 * @date 2018-01-27 11:33:50
 */
public class NewsCommentEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    //评论id
    private Integer id;
    //新闻id
    private Integer newsId;
    //评论内容
    private String commentDetails;
    //评论时间
    private Date commentTime;
    //用户的ip地址
    private String commentIp;
    //用户id
    private Integer commentUid;
    //
    private Integer anonymityInfo;
    //标识索引备注
    private Long identify;
    //用户ID
    private Long sysUserId;

    /**
     * 设置：评论id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取：评论id
     */
    public Integer getId() {
        return id;
    }
    /**
     * 设置：新闻id
     */
    public void setNewsId(Integer newsId) {
        this.newsId = newsId;
    }

    /**
     * 获取：新闻id
     */
    public Integer getNewsId() {
        return newsId;
    }
    /**
     * 设置：评论内容
     */
    public void setCommentDetails(String commentDetails) {
        this.commentDetails = commentDetails;
    }

    /**
     * 获取：评论内容
     */
    public String getCommentDetails() {
        return commentDetails;
    }
    /**
     * 设置：评论时间
     */
    public void setCommentTime(Date commentTime) {
        this.commentTime = commentTime;
    }

    /**
     * 获取：评论时间
     */
    public Date getCommentTime() {
        return commentTime;
    }
    /**
     * 设置：用户的ip地址
     */
    public void setCommentIp(String commentIp) {
        this.commentIp = commentIp;
    }

    /**
     * 获取：用户的ip地址
     */
    public String getCommentIp() {
        return commentIp;
    }
    /**
     * 设置：用户id
     */
    public void setCommentUid(Integer commentUid) {
        this.commentUid = commentUid;
    }

    /**
     * 获取：用户id
     */
    public Integer getCommentUid() {
        return commentUid;
    }
    /**
     * 设置：
     */
    public void setAnonymityInfo(Integer anonymityInfo) {
        this.anonymityInfo = anonymityInfo;
    }

    /**
     * 获取：
     */
    public Integer getAnonymityInfo() {
        return anonymityInfo;
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
}
