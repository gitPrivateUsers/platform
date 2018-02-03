package com.platform.controller;

import com.platform.entity.SysDeptEntity;
import com.platform.entity.SysUserEntity;
import com.platform.service.SysDeptService;
import com.platform.utils.ShiroUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

/**
 * Controller公共组件
 *
 * @author lipengjun
 * @email 939961241@qq.com
 * @date 2016年11月9日 下午9:42:26
 */
public abstract class AbstractController {
    protected Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private SysDeptService sysDeptService;

    protected SysUserEntity getUser() {
        return ShiroUtils.getUserEntity();
    }

    protected Long getUserId() {
        return getUser().getUserId();
    }

    protected Long getDeptId() {
        return getUser().getDeptId();
    }

    /**
     * @return 验证部门是否最高级
     */
    protected boolean validDept() {
        return sysDeptService.queryObject(getDeptId()).getParentId() == 0;
    }

    /**
     * 查询条件 根据权限预览数据
     *
     * @param params
     * @return
     */
    protected Map<String, Object> authorityParams(Map<String, Object> params) {
        //admin用户不参与权限验证
        if (!getUser().getUsername().equals("admin")) {
            params.put("storeId", getOneDeptId());
            params.put("identify", getOneDeptId());
            if (!validDept())//验证部门是否最高级
                params.put("sysUserId", getUserId());
            return params;
        }
        return params;

    }


    /**
     * @return 获取登录用户的最高级部门ID
     */
    protected Long getOneDeptId() {
        SysDeptEntity sysDept = sysDeptService.queryObject(getDeptId());
        if (sysDept.getParentId() != 0) {
            sysDept = sysDeptService.queryObject(sysDept.getParentId());
            if (sysDept.getParentId() != 0) {
                sysDept = sysDeptService.queryObject(sysDept.getParentId());
                if (sysDept.getParentId() != 0) {
                    sysDept = sysDeptService.queryObject(sysDept.getParentId());
                    if (sysDept.getParentId() != 0) {
                        sysDept = sysDeptService.queryObject(sysDept.getParentId());
                    }
                    return sysDept.getDeptId();
                }
                return sysDept.getDeptId();
            }
            return sysDept.getDeptId();
        }
        return sysDept.getDeptId();
    }
}
