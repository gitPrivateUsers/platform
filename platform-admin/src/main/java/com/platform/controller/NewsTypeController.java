package com.platform.controller;

import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.platform.entity.NewsTypeEntity;
import com.platform.service.NewsTypeService;
import com.platform.utils.PageUtils;
import com.platform.utils.Query;
import com.platform.utils.R;

/**
 * 新闻类型表Controller
 *
 * @author lipengjun
 * @email 939961241@qq.com
 * @date 2018-01-27 11:33:50
 */
@Controller
@RequestMapping("newstype")
public class NewsTypeController {
    @Autowired
    private NewsTypeService newsTypeService;

    /**
     * 查看列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("newstype:list")
    @ResponseBody
    public R list(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);

        List<NewsTypeEntity> newsTypeList = newsTypeService.queryList(query);
        int total = newsTypeService.queryTotal(query);

        PageUtils pageUtil = new PageUtils(newsTypeList, total, query.getLimit(), query.getPage());

        return R.ok().put("page", pageUtil);
    }

    /**
     * 查看信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("newstype:info")
    @ResponseBody
    public R info(@PathVariable("id") Integer id) {
        NewsTypeEntity newsType = newsTypeService.queryObject(id);

        return R.ok().put("newsType", newsType);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("newstype:save")
    @ResponseBody
    public R save(@RequestBody NewsTypeEntity newsType) {
        newsTypeService.save(newsType);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("newstype:update")
    @ResponseBody
    public R update(@RequestBody NewsTypeEntity newsType) {
        newsTypeService.update(newsType);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("newstype:delete")
    @ResponseBody
    public R delete(@RequestBody Integer[]ids) {
        newsTypeService.deleteBatch(ids);

        return R.ok();
    }

    /**
     * 查看所有列表
     */
    @RequestMapping("/queryAll")
    @ResponseBody
    public R queryAll(@RequestParam Map<String, Object> params) {

        List<NewsTypeEntity> list = newsTypeService.queryList(params);

        return R.ok().put("list", list);
    }
}
