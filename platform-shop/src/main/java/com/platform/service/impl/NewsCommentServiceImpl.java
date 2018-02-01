package com.platform.service.impl;

import com.platform.dao.NewsCommentDao;
import com.platform.entity.NewsCommentEntity;
import com.platform.service.NewsCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * 新闻评论表Service实现类
 *
 * @author lipengjun
 * @email 939961241@qq.com
 * @date 2018-01-27 11:33:50
 */
@Service("newsCommentService")
public class NewsCommentServiceImpl implements NewsCommentService {
    @Autowired
    private NewsCommentDao newsCommentDao;

    @Override
    public NewsCommentEntity queryObject(Integer id) {
        return newsCommentDao.queryObject(id);
    }

    @Override
    public List<NewsCommentEntity> queryList(Map<String, Object> map) {
        return newsCommentDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return newsCommentDao.queryTotal(map);
    }

    @Override
    public int save(NewsCommentEntity newsComment) {
        return newsCommentDao.save(newsComment);
    }

    @Override
    public int update(NewsCommentEntity newsComment) {
        return newsCommentDao.update(newsComment);
    }

    @Override
    public int delete(Integer id) {
        return newsCommentDao.delete(id);
    }

    @Override
    public int deleteBatch(Integer[]ids) {
        return newsCommentDao.deleteBatch(ids);
    }
}
