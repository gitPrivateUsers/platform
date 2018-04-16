package com.platform.controller;

import com.platform.entity.NewsTypeEntity;
import com.platform.service.NewsTypeService;
import com.platform.utils.PageUtils;
import com.platform.utils.Query;
import com.platform.utils.R;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 新闻类型表Controller
 *
 * @date 2018-01-27 11:33:50
 */
@RestController
@RequestMapping("newstype")
public class NewsTypeController extends AbstractController {
    @Autowired
    private NewsTypeService newsTypeService;

    /**
     * 查看列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("newstype:list")
    public R list(@RequestParam Map<String, Object> params) {
        //添加权限验证
        params= authorityParams(params);
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
    public R info(@PathVariable("id") Integer id) {
        NewsTypeEntity newsType = newsTypeService.queryObject(id);

        return R.ok().put("newsType", newsType);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("newstype:save")
    public R save(@RequestBody NewsTypeEntity newsType) {
        newsType.setIdentify(getOneDeptId());
        newsType.setSysUserId(getUserId());
        newsTypeService.save(newsType);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("newstype:update")
    public R update(@RequestBody NewsTypeEntity newsType) {
        newsType.setIdentify(getOneDeptId());
        newsType.setSysUserId(getUserId());
        newsTypeService.update(newsType);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("newstype:delete")
    public R delete(@RequestBody Integer[]ids) {
        newsTypeService.deleteBatch(ids);

        return R.ok();
    }

    /**
     * 查看所有列表
     */
    @RequestMapping("/queryAll")
    public R queryAll(@RequestParam Map<String, Object> params) {
        //添加权限验证
        params= authorityParams(params);
        //查询列表数据

        List<NewsTypeEntity> list = newsTypeService.queryList(params);

        return R.ok().put("list", list);
    }
}
