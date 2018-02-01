package com.platform.service.impl;

import com.platform.dao.NewsMessageDao;
import com.platform.entity.NewsMessageEntity;
import com.platform.service.NewsMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * 新闻资讯表Service实现类
 *
 * @author lipengjun
 * @email 939961241@qq.com
 * @date 2018-01-27 11:33:50
 */
@Service("newsMessageService")
public class NewsMessageServiceImpl implements NewsMessageService {
    @Autowired
    private NewsMessageDao newsMessageDao;

    @Override
    public NewsMessageEntity queryObject(Integer id) {
        return newsMessageDao.queryObject(id);
    }

    @Override
    public List<NewsMessageEntity> queryList(Map<String, Object> map) {
        return newsMessageDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return newsMessageDao.queryTotal(map);
    }

    @Override
    public int save(NewsMessageEntity newsMessage) {

        return newsMessageDao.save(newsMessage);
    }

    @Override
    public int update(NewsMessageEntity newsMessage) {
        return newsMessageDao.update(newsMessage);
    }

    @Override
    public int delete(Integer id) {
        return newsMessageDao.delete(id);
    }

    @Override
    public int deleteBatch(Integer[]ids) {
        return newsMessageDao.deleteBatch(ids);
    }
}
