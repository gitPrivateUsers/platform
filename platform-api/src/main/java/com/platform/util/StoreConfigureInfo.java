package com.platform.util;

import com.platform.entity.StoreConfigureEntity;
import com.platform.entity.SysDeptEntity;
import com.platform.service.StoreConfigureService;
import com.platform.service.SysDeptService;
import com.platform.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created by ttui on 2018/2/2.
 */
@Component
public class StoreConfigureInfo {


    @Autowired
    private SysDeptService sysDeptService;
    @Autowired
    private StoreConfigureService storeConfigureService;

    /**
     * 查询条件 根据店铺预览数据
     *
     * @return
     */
    public Map<String, Object> authorityStore(Long storeId) {
        Map<String, Object> params = new LinkedHashMap<>();

        params.put("page", 1);
        params.put("limit", 999);
        params.put("sidx", "");
        params.put("order", "asc");
        params.put("_search", "false");
        params.put("identify", getSysDeptIdByStoreId(storeId));
//        params.put("storeId", storeId);
        return params;
    }

    public R getStoreConfigureAndDept(Long storeId) {
        if (storeId == 0)
            return null;
        Map<String, Object> resultObj = new LinkedHashMap<>();
        StoreConfigureEntity storeConfigure = storeConfigureService.queryObject(storeId);
        if (storeConfigure != null) {
            resultObj.put("storeConfigure", storeConfigure);
            SysDeptEntity dept = sysDeptService.queryObject(storeConfigure.getDeptParentId());
            if (dept != null)
                resultObj.put("dept", dept);
        }
        return R.ok(resultObj);
    }

    protected StoreConfigureEntity getStoreConfigureById(Long storeId) {
        if (storeId == 0)
            return null;
        return storeConfigureService.queryObject(storeId);
    }

    protected Long getSysDeptIdByStoreId(Long storeId) {
        StoreConfigureEntity sce = storeConfigureService.queryObject(storeId);
        if (null != sce) {
            SysDeptEntity sde = sysDeptService.queryObject(sce.getDeptParentId());
            if (null != sde)
                return sde.getDeptId();
        }
        return null;
    }


}
