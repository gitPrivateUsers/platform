package com.platform.controller;

import com.platform.entity.NewsMessageEntity;
import com.platform.service.NewsMessageService;
import com.platform.utils.PageUtils;
import com.platform.utils.Query;
import com.platform.utils.R;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 新闻资讯表Controller
 *
 * @author lipengjun
 * @email 939961241@qq.com
 * @date 2018-01-27 11:33:50
 */
@Controller
@RequestMapping("newsmessage")
public class NewsMessageController extends AbstractController{
    @Autowired
    private NewsMessageService newsMessageService;

    /**
     * 查看列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("newsmessage:list")
    @ResponseBody
    public R list(@RequestParam Map<String, Object> params) {
        params.put("identify",getOneDeptId());
//        params.put("_search",true);
        //查询列表数据
        Query query = new Query(params);

        List<NewsMessageEntity> newsMessageList = newsMessageService.queryList(query);
        int total = newsMessageService.queryTotal(query);

        PageUtils pageUtil = new PageUtils(newsMessageList, total, query.getLimit(), query.getPage());

        return R.ok().put("page", pageUtil);
    }

    /**
     * 查看信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("newsmessage:info")
    @ResponseBody
    public R info(@PathVariable("id") Integer id) {
        NewsMessageEntity newsMessage = newsMessageService.queryObject(id);

        return R.ok().put("newsMessage", newsMessage);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("newsmessage:save")
    @ResponseBody
    public R save(@RequestBody NewsMessageEntity newsMessage) {
        newsMessage.setIdentify(getOneDeptId());
        newsMessageService.save(newsMessage);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("newsmessage:update")
    @ResponseBody
    public R update(@RequestBody NewsMessageEntity newsMessage) {
        newsMessageService.update(newsMessage);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("newsmessage:delete")
    @ResponseBody
    public R delete(@RequestBody Integer[]ids) {
        newsMessageService.deleteBatch(ids);

        return R.ok();
    }

    /**
     * 查看所有列表
     */
    @RequestMapping("/queryAll")
    @ResponseBody
    public R queryAll(@RequestParam Map<String, Object> params) {

        List<NewsMessageEntity> list = newsMessageService.queryList(params);

        return R.ok().put("list", list);
    }
}
