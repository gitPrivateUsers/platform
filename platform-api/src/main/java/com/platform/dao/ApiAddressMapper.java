package com.platform.dao;

import java.util.Map;

import com.platform.entity.AddressVo;


/**
 * @author lipengjun
 * @email 939961241@qq.com
 * @date 2017-08-11 09:14:25
 */
public interface ApiAddressMapper extends BaseDao<AddressVo> {
	
	AddressVo queryDefault(AddressVo addressVo);

}
