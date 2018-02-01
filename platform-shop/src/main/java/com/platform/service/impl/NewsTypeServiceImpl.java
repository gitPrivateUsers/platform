package com.platform.service.impl;

import com.platform.dao.NewsTypeDao;
import com.platform.entity.NewsTypeEntity;
import com.platform.service.NewsTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * 新闻类型表Service实现类
 *
 * @author lipengjun
 * @email 939961241@qq.com
 * @date 2018-01-27 11:33:50
 */
@Service("newsTypeService")
public class NewsTypeServiceImpl implements NewsTypeService {
    @Autowired
    private NewsTypeDao newsTypeDao;

    @Override
    public NewsTypeEntity queryObject(Integer id) {
        return newsTypeDao.queryObject(id);
    }

    @Override
    public List<NewsTypeEntity> queryList(Map<String, Object> map) {
        return newsTypeDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return newsTypeDao.queryTotal(map);
    }

    @Override
    public int save(NewsTypeEntity newsType) {
        return newsTypeDao.save(newsType);
    }

    @Override
    public int update(NewsTypeEntity newsType) {
        return newsTypeDao.update(newsType);
    }

    @Override
    public int delete(Integer id) {
        return newsTypeDao.delete(id);
    }

    @Override
    public int deleteBatch(Integer[]ids) {
        return newsTypeDao.deleteBatch(ids);
    }
}
