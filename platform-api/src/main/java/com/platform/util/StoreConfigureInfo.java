package com.platform.util;

import com.platform.entity.StoreConfigureEntity;
import com.platform.entity.SysDeptEntity;
import com.platform.service.StoreConfigureService;
import com.platform.service.SysDeptService;
import com.platform.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
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

    public R getStoreConfigureAndDept(long storeId) {
        if (storeId == 0)
            return null;
        Map<String, Object> resultObj = new HashMap();
        StoreConfigureEntity storeConfigure = storeConfigureService.queryObject(storeId);
        if (storeConfigure != null) {
            resultObj.put("storeConfigure", storeConfigure);
            SysDeptEntity dept = sysDeptService.queryObject(storeConfigure.getDeptParentId());
            if (dept != null)
                resultObj.put("dept", dept);
        }
        return R.ok(resultObj);
    }
}
