package com.platform.service;

import com.platform.entity.NewsTypeEntity;

import java.util.List;
import java.util.Map;

/**
 * 新闻类型表Service接口
 *
 * @author lipengjun
 * @email 939961241@qq.com
 * @date 2018-01-27 11:33:50
 */
public interface NewsTypeService {

    /**
     * 根据主键查询实体
     *
     * @param id 主键
     * @return 实体
     */
    NewsTypeEntity queryObject(Integer id);

    /**
     * 分页查询
     *
     * @param map 参数
     * @return list
     */
    List<NewsTypeEntity> queryList(Map<String, Object> map);

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
     * @param newsType 实体
     * @return 保存条数
     */
    int save(NewsTypeEntity newsType);

    /**
     * 根据主键更新实体
     *
     * @param newsType 实体
     * @return 更新条数
     */
    int update(NewsTypeEntity newsType);

    /**
     * 根据主键删除
     *
     * @param id
     * @return 删除条数
     */
    int delete(Integer id);

    /**
     * 根据主键批量删除
     *
     * @param ids
     * @return 删除条数
     */
    int deleteBatch(Integer[] ids);
}
