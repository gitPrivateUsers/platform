package com.platform.api;

import com.alibaba.fastjson.JSONObject;
import com.platform.annotation.IgnoreAuth;
import com.platform.annotation.LoginUser;
import com.platform.entity.AddressVo;
import com.platform.entity.UserVo;
import com.platform.service.ApiAddressService;
import com.platform.util.ApiBaseAction;
import com.qiniu.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 作者: @author Harmon <br>
 * 时间: 2017-08-11 08:32<br>
 * 描述: ApiIndexController <br>
 */
@RestController
@RequestMapping("/api/address")
public class ApiAddressController extends ApiBaseAction {
	@Autowired
	private ApiAddressService addressService;

	/**
<<<<<<< HEAD
	 * 获取用户的收货地址··
=======
	 * 获取用户的收货地址
>>>>>>> a10ea8d1583e59548cae4fec01833a5f34a4729f
	 */
	@RequestMapping("list")
	public Object list(@LoginUser UserVo loginUser) {
		Map param = new HashMap();
		param.put("user_id", loginUser.getUserId());
		param.put("sidx", "is_default");
		param.put("order", "desc");
		List<AddressVo> addressEntities = addressService.queryList(param);
		return toResponsSuccess(addressEntities);
	}

	/**
	 * 获取收货地址的详情
	 */
	@IgnoreAuth
	@RequestMapping("detail")
	public Object detail(Integer id) {
		AddressVo entity = addressService.queryObject(id);
		return toResponsSuccess(entity);
	}

	/**
	 * 添加或更新收货地址
	 */
	@RequestMapping("save")
	public Object save(@LoginUser UserVo loginUser) {
		JSONObject addressJson = this.getJsonRequest();
		AddressVo entity = new AddressVo();
		if (null != addressJson) {
			
	        AddressVo addressVo=new AddressVo();
	        addressVo.setUserId(loginUser.getUserId());
	        addressVo.setIsDefault("1");
	        AddressVo checkedAddress = addressService.queryDefault(addressVo);
	        if(checkedAddress==null) {
	        	    entity.setIsDefault("1");
	        }else {
	          	entity.setIsDefault("0");
	        }


			if (!StringUtils.isNullOrEmpty(addressJson.getString("storeId"))) {
				long identify =getStoreIdByDeptId(Long.valueOf(addressJson.getString("storeId")));
				entity.setIdentify(identify);
			}else
			//异常处理 获取店铺标识失败
				return this.toResponsObject(101, "保存失败！", "");

			entity.setId(addressJson.getLong("id"));
			entity.setUserId(loginUser.getUserId());
			// 姓名
			entity.setUserName(addressJson.getString("userName"));
			// 邮编
			entity.setPostalCode(addressJson.getString("postalCode"));
			entity.setProvinceName(addressJson.getString("provinceName"));
			entity.setCityName(addressJson.getString("cityName"));
			entity.setCountyName(addressJson.getString("countyName"));
			entity.setDetailInfo(addressJson.getString("detailInfo"));
			entity.setNationalCode(addressJson.getString("nationalCode"));
			entity.setTelNumber(addressJson.getString("telNumber"));
		}
		if (null == entity.getId() || entity.getId() == 0) {
			entity.setId(null);
			addressService.save(entity);
		} else {
			addressService.update(entity);
		}
		return toResponsSuccess(entity);
	}

	/**
	 * 删除指定的收货地址
	 */
	@IgnoreAuth
	@RequestMapping("delete")
	public Object delete() {
		JSONObject jsonParam = this.getJsonRequest();
		addressService.delete(jsonParam.getIntValue("id"));
		return toResponsSuccess("");
	}

	@RequestMapping("update/default")
	public Object updateDefault(@LoginUser UserVo loginUser) {
		System.out.println("111");
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("user_id", loginUser.getUserId());
		
	    JSONObject jsonParam=this.getJsonRequest();
		int id=jsonParam.getIntValue("id");
		param.put("user_id", loginUser.getUserId());
		
		boolean bl =addressService.updateDefault(param, id);
		return toResponsSuccess(bl);
	}
}