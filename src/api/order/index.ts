import request from '@/utils/request'

//获取店铺订单列表
export function getOrderList(data: object) {
  return request({
    url: '/v2/shop/shop_orders/',
    method: 'post',
    data,
  })
}

//获取店铺订单详情
export function getOrderDetail(data: any) {
  return request({
    url: `/v2/shop/shop_orders/${data.id}/`,
    method: 'get',
    data
  })
}
//订单日志列表
export function getOrderLog(data: any) {
  return request({
    url: `/v2/shop/shop_order_logs/${data.id}/`,
    method: 'get',
    data
  })
}

//订单发货
export function orderDelievered(data: any) {
  return request({
    url: `/v2/shop/order_delievered/${data.orderId}/`,
    method: 'post',
    data,
  })
}

//后台取消订单
export function cancelOrder(data: any) {
  return request({
    url: `/v2/shop/orders/${data.id}/`,
    method: 'post',
    data: {
      orderId: data.id,
      operation: 'cancel'
    },
  })
}


//订单批量发货
export function batchOrderDelievered(data: any) {
  return request({
    url: '/v2/shop/batch_order_delievered/',
    method: 'post',
    data,
  })
}

//获取订单状态统计
export function getOrderCount() {
  return request({
    url: '/v2/shop/order_count/',
    method: 'get',
    params: {},
  })
}
