package com.platform.task;

import com.platform.entity.OrderEntity;
import com.platform.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by ttui on 2018/1/11.
 */
@Component
public class TaskService {
    @Autowired
    private OrderService orderService;

    public void batchUpdateOrderCancelStatus() {
        Map<String,Object> map=new HashMap<>();
        /**
         *
         //付款状态 支付状态;0未付款;1付款中;2已付款
         private Integer payStatus;
         */
        /**
         *
         //1xx 表示订单取消和删除等状态 0订单创建成功等待付款，　101订单已取消，　102订单已删除
         //2xx 表示订单支付状态　201订单已付款，等待发货
         //3xx 表示订单物流相关状态　300订单已发货， 301用户确认收货
         //4xx 表示订单退换货相关的状态　401 没有发货，退款　402 已收货，退款退货
         private Integer orderStatus;
         */
        map.put("notPayStatus",2);//查出所有不等于2{已付款}的订单
        map.put("minuteTime",30); //并且是半小时以前的订单
        map.put("orderStatus",0); //0订单创建成功等待付款
        List<OrderEntity> orderEntity=orderService.queryList(map);
        for (OrderEntity order:orderEntity){
            order.setOrderStatus(101);
            order.setPayStatus(0);
            orderService.update(order);
            System.out.println("订单"+order.getId()+"取消成功！");
        }


    }
}
