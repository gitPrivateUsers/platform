package com.platform.service;

import com.platform.dao.ApiAdPositionMapper;
import com.platform.entity.AdPositionVo;
import com.platform.entity.AdVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class ApiAdPositionService {
    @Autowired
    private ApiAdPositionMapper adPositionDao;


    public AdPositionVo queryObject(Integer id) {
        return adPositionDao.queryObject(id);
    }


    public List<AdPositionVo> queryList(Map<String, Object> map) {
        return adPositionDao.queryList(map);
    }


    public int queryTotal(Map<String, Object> map) {
        return adPositionDao.queryTotal(map);
    }


    public void save(AdPositionVo brand) {
        adPositionDao.save(brand);
    }


    public void update(AdPositionVo brand) {
        adPositionDao.update(brand);
    }


    public void delete(Integer id) {
        adPositionDao.delete(id);
    }


    public void deleteBatch(Integer[] ids) {
        adPositionDao.deleteBatch(ids);
    }

}
