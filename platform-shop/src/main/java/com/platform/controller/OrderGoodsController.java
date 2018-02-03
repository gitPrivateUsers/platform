package com.platform.controller;

import com.platform.entity.OrderGoodsEntity;
import com.platform.service.OrderGoodsService;
import com.platform.utils.PageUtils;
import com.platform.utils.Query;
import com.platform.utils.R;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


/**
 *
 *
 * @author lipengjun
 * @email 939961241@qq.com
 * @date 2017-08-13 10:41:09
 */
@RestController
@RequestMapping("ordergoods")
public class OrderGoodsController extends AbstractController {
	@Autowired
	private OrderGoodsService orderGoodsService;

	/**
	 * 列表
	 */
    @RequestMapping("/list")
    @RequiresPermissions("ordergoods:list")
    public R list(@RequestParam Map<String, Object> params) {
        params = authorityParams(params);

        if (!getUser().getUsername().equals("admin")) {
            if (params.get("storeId") == null) {
                return R.ok();
            }
        }
        params = authorityParams(params);
        //查询列表数据
        Query query = new Query(params);

        List<OrderGoodsEntity> orderGoodsList = orderGoodsService.queryList(query);
        int total = orderGoodsService.queryTotal(query);

        PageUtils pageUtil = new PageUtils(orderGoodsList, total, query.getLimit(), query.getPage());

        return R.ok().put("page", pageUtil);
    }


	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("ordergoods:info")
	public R info(@PathVariable("id") Integer id){
		OrderGoodsEntity orderGoods = orderGoodsService.queryObject(id);

		return R.ok().put("orderGoods", orderGoods);
	}

	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("ordergoods:save")
	public R save(@RequestBody OrderGoodsEntity orderGoods){
		orderGoodsService.save(orderGoods);

		return R.ok();
	}

	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("ordergoods:update")
	public R update(@RequestBody OrderGoodsEntity orderGoods){
		orderGoodsService.update(orderGoods);

		return R.ok();
	}

	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("ordergoods:delete")
	public R delete(@RequestBody Integer[] ids){
		orderGoodsService.deleteBatch(ids);

		return R.ok();
	}

	/**
	 * 查看所有列表
	 */
	@RequestMapping("/queryAll")
	public R queryAll(@RequestParam Map<String, Object> params) {

		List<OrderGoodsEntity> list = orderGoodsService.queryList(params);

		return R.ok().put("list", list);
	}
}
