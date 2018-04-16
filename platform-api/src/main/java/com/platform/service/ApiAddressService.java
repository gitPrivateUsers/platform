package com.platform.service;

import com.platform.dao.ApiAddressMapper;
import com.platform.entity.AddressVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ApiAddressService {
	@Autowired
	private ApiAddressMapper addressDao;

	public AddressVo queryObject(Integer id) {
		return addressDao.queryObject(id);
	}

	/***
	 * 修改默认收货地址
	 * @param map 查询条件
	 * @param id 地址ID
	 * @return
	 */
	public boolean updateDefault(Map<String, Object> map, int id) {
		// 得到用户的所有收货地址
		List<AddressVo> addressEntities = addressDao.queryList(map);
		for (int i = 0; i < addressEntities.size(); i++) {
			AddressVo addressVo = addressEntities.get(i);
			if(addressVo.getId()==id) {
				addressVo.setIsDefault("1");
			}else {
				addressVo.setIsDefault("0");
			}
			addressDao.update(addressVo);
		}
		return true;
	}

	public AddressVo queryDefault(AddressVo addressVo) {
		return addressDao.queryDefault(addressVo);
	}
	public List<AddressVo> queryList(Map<String, Object> map) {
		return addressDao.queryList(map);
	}

	public int queryTotal(Map<String, Object> map) {
		return addressDao.queryTotal(map);
	}

	public void save(AddressVo address) {
		addressDao.save(address);
	}

	public void update(AddressVo address) {
		addressDao.update(address);
	}

	public void delete(Integer id) {
		addressDao.delete(id);
	}

	public void deleteBatch(Integer[] ids) {
		addressDao.deleteBatch(ids);
	}

}
