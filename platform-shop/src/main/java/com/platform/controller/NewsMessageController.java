package com.platform.controller;

import com.platform.entity.NewsMessageEntity;
import com.platform.service.NewsMessageService;
import com.platform.utils.PageUtils;
import com.platform.utils.Query;
import com.platform.utils.R;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 新闻资讯 Controller
 *
 * @date 2018-01-27 11:33:50
 *
 */

@RestController
@RequestMapping("newsmessage")
public class NewsMessageController extends AbstractController{
    @Autowired
    private NewsMessageService newsMessageService;

    @RequestMapping("/list")
    @RequiresPermissions("newsmessage:list")
    public R list(@RequestParam Map<String, Object> params) {
        //添加权限验证
          params= authorityParams(params);
        //查询列表数据
        Query query = new Query(params);

        List<NewsMessageEntity> newsMessageList = newsMessageService.queryList(query);
        int total = newsMessageService.queryTotal(query);

        PageUtils pageUtil = new PageUtils(newsMessageList, total, query.getLimit(), query.getPage());

        return R.ok().put("page", pageUtil);
    }


    @RequestMapping("/info/{id}")
    @RequiresPermissions("newsmessage:info")
    public R info(@PathVariable("id") Integer id) {
        NewsMessageEntity newsMessage = newsMessageService.queryObject(id);

        return R.ok().put("newsMessage", newsMessage);
    }


    @RequestMapping("/save")
    @RequiresPermissions("newsmessage:save")
    //@ResponseBody
    public R save(@RequestBody NewsMessageEntity newsMessage) {
        newsMessage.setIdentify(getOneDeptId());
        newsMessage.setSysUserId(getUserId());
        newsMessageService.save(newsMessage);

        return R.ok();
    }

    @RequestMapping("/update")
    @RequiresPermissions("newsmessage:update")
    public R update(@RequestBody NewsMessageEntity newsMessage) {
        newsMessageService.update(newsMessage);

        return R.ok();
    }


    @RequestMapping("/delete")
    @RequiresPermissions("newsmessage:delete")
    public R delete(@RequestBody Integer[]ids) {
        newsMessageService.deleteBatch(ids);

        return R.ok();
    }


    @RequestMapping("/queryAll")
    public R queryAll(@RequestParam Map<String, Object> params) {

        List<NewsMessageEntity> list = newsMessageService.queryList(params);

        return R.ok().put("list", list);
    }
}
