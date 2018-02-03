package com.platform.service.impl;

import com.platform.dao.StoreConfigureDao;
import com.platform.entity.StoreConfigureEntity;
import com.platform.service.StoreConfigureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Service实现类
 *
 * @author Position
 * @email 7797638@qq.com
 * @date 2018-02-02 18:07:48
 */
@Service("storeConfigureService")
public class StoreConfigureServiceImpl implements StoreConfigureService {
    @Autowired
    private StoreConfigureDao storeConfigureDao;

    @Override
    public StoreConfigureEntity queryObject(Long storeId) {
        return storeConfigureDao.queryObject(storeId);
    }

    @Override
    public List<StoreConfigureEntity> queryList(Map<String, Object> map) {
        return storeConfigureDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return storeConfigureDao.queryTotal(map);
    }

    @Override
    public int save(StoreConfigureEntity storeConfigure) {
        return storeConfigureDao.save(storeConfigure);
    }

    @Override
    public int update(StoreConfigureEntity storeConfigure) {
        return storeConfigureDao.update(storeConfigure);
    }

    @Override
    public int delete(Long storeId) {
        return storeConfigureDao.delete(storeId);
    }

    @Override
    public int deleteBatch(Long[]storeIds) {
        return storeConfigureDao.deleteBatch(storeIds);
    }

}
