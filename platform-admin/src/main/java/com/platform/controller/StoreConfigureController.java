package com.platform.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.platform.entity.StoreConfigureEntity;
import com.platform.service.StoreConfigureService;
import com.platform.utils.PageUtils;
import com.platform.utils.Query;
import com.platform.utils.R;

/**
 * Controller
 *
 * @author Position
 * @email 7797638@qq.com
 * @date 2018-02-02 18:07:48
 */
@RestController
@RequestMapping("storeconfigure")
public class StoreConfigureController extends AbstractController{
    @Autowired
    private StoreConfigureService storeConfigureService;

    /**
     * 查看列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("storeconfigure:list")
    public R list(@RequestParam Map<String, Object> params) {
        //添加权限验证
        //params.put("deptParentId",getDeptId());
        params = authorityParams(params);
        //查询列表数据
        Query query = new Query(params);

        List<StoreConfigureEntity> storeConfigureList = storeConfigureService.queryList(query);
        int total = storeConfigureService.queryTotal(query);

        PageUtils pageUtil = new PageUtils(storeConfigureList, total, query.getLimit(), query.getPage());

        return R.ok().put("page", pageUtil);
    }

    /**
     * 查看信息
     */
    @RequestMapping("/info/{storeId}")
    @RequiresPermissions("storeconfigure:info")
    public R info(@PathVariable("storeId") Long storeId) {
        StoreConfigureEntity storeConfigure = storeConfigureService.queryObject(storeId);

        return R.ok().put("storeConfigure", storeConfigure);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("storeconfigure:save")
    public R save(@RequestBody StoreConfigureEntity storeConfigure) {
        //storeConfigure.setDeptParentId(getOneDeptId());
        storeConfigure.setCreateBy(getUser().getUsername());
        storeConfigure.setCreateTime(new Date());
        storeConfigure.setUpdateBy(getUser().getUsername());
        storeConfigure.setUpdateTime(new Date());
        storeConfigureService.save(storeConfigure);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("storeconfigure:update")
    public R update(@RequestBody StoreConfigureEntity storeConfigure) {
        storeConfigure.setUpdateBy(getUser().getUsername());
        storeConfigure.setUpdateTime(new Date());
        storeConfigureService.update(storeConfigure);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("storeconfigure:delete")
    public R delete(@RequestBody Long[]storeIds) {
        storeConfigureService.deleteBatch(storeIds);

        return R.ok();
    }

    /**
     * 查看所有列表
     */
    @RequestMapping("/queryAll")
    public R queryAll(@RequestParam Map<String, Object> params) {
        //权限过滤数据
        params.put("identify",getOneDeptId());

        List<StoreConfigureEntity> list = storeConfigureService.queryList(params);

        return R.ok().put("list", list);
    }
}
