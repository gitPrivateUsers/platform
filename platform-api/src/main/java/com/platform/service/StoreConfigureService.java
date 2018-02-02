package com.platform.service;

import com.platform.entity.StoreConfigureEntity;

import java.util.List;
import java.util.Map;

/**
 * Service接口
 *
 * @author Position
 * @email 7797638@qq.com
 * @date 2018-02-02 18:07:48
 */
public interface StoreConfigureService {

    /**
     * 根据主键查询实体
     *
     * @param id 主键
     * @return 实体
     */
    StoreConfigureEntity queryObject(Long storeId);

    /**
     * 分页查询
     *
     * @param map 参数
     * @return list
     */
    List<StoreConfigureEntity> queryList(Map<String, Object> map);

    /**
     * 分页统计总数
     *
     * @param map 参数
     * @return 总数
     */
    int queryTotal(Map<String, Object> map);

    /**
     * 保存实体
     *
     * @param storeConfigure 实体
     * @return 保存条数
     */
    int save(StoreConfigureEntity storeConfigure);

    /**
     * 根据主键更新实体
     *
     * @param storeConfigure 实体
     * @return 更新条数
     */
    int update(StoreConfigureEntity storeConfigure);

    /**
     * 根据主键删除
     *
     * @param storeId
     * @return 删除条数
     */
    int delete(Long storeId);

    /**
     * 根据主键批量删除
     *
     * @param storeIds
     * @return 删除条数
     */
    int deleteBatch(Long[] storeIds);
}
