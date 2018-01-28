package com.platform.controller;

import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.platform.entity.NewsCommentEntity;
import com.platform.service.NewsCommentService;
import com.platform.utils.PageUtils;
import com.platform.utils.Query;
import com.platform.utils.R;

/**
 * 新闻评论表Controller
 *
 * @author lipengjun
 * @email 939961241@qq.com
 * @date 2018-01-27 11:33:50
 */
@Controller
@RequestMapping("newscomment")
public class NewsCommentController extends AbstractController{
    @Autowired
    private NewsCommentService newsCommentService;

    /**
     * 查看列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("newscomment:list")
    @ResponseBody
    public R list(@RequestParam Map<String, Object> params) {
        //添加权限验证
        params= authorityParams(params);
        //查询列表数据
        Query query = new Query(params);

        List<NewsCommentEntity> newsCommentList = newsCommentService.queryList(query);
        int total = newsCommentService.queryTotal(query);

        PageUtils pageUtil = new PageUtils(newsCommentList, total, query.getLimit(), query.getPage());

        return R.ok().put("page", pageUtil);
    }

    /**
     * 查看信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("newscomment:info")
    @ResponseBody
    public R info(@PathVariable("id") Integer id) {
        NewsCommentEntity newsComment = newsCommentService.queryObject(id);

        return R.ok().put("newsComment", newsComment);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("newscomment:save")
    @ResponseBody
    public R save(@RequestBody NewsCommentEntity newsComment) {
        newsComment.setIdentify(getOneDeptId());
        newsComment.setSysUserId(getUserId());
        newsCommentService.save(newsComment);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("newscomment:update")
    @ResponseBody
    public R update(@RequestBody NewsCommentEntity newsComment) {
        newsCommentService.update(newsComment);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("newscomment:delete")
    @ResponseBody
    public R delete(@RequestBody Integer[]ids) {
        newsCommentService.deleteBatch(ids);

        return R.ok();
    }

    /**
     * 查看所有列表
     */
    @RequestMapping("/queryAll")
    @ResponseBody
    public R queryAll(@RequestParam Map<String, Object> params) {

        List<NewsCommentEntity> list = newsCommentService.queryList(params);

        return R.ok().put("list", list);
    }
}
