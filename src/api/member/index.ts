import request from '@/utils/request'

/**
 * 获取用户列表
 */
export function getMemberList(data: object) {
  return request({
    url: '/v2/shop/members/',
    method: 'post',
    data,
  })
}

/**
 * 获取用户详情
 */
export function getMemberDetail(data: any) {
  return request({
    url: `/v2/shop/members/${data.id}/`,
    method: 'get',
    params: {},
  })
}

//锁定/解锁用户
export function setMemberStatus(data: any) {
  return request({
    url: '/v2/shop/members/status/',
    method: 'post',
    data,
  })
}

//获得用户流水记录
export function getMemberBalance(data: any) {
  return request({
    url: '/v2/shop/members/status/',
    method: 'post',
    data,
  })
}
//获得用户订单
export function getMemberOrder(data: any) {
  return request({
    url: '/v2/shop/customer_orders/',
    method: 'get',
    data,
  })
}
//修改用户详情
export function updateMember(data: any) {
  return request({
    url: '/v2/shop/customer_orders/',
    method: 'get',
    data,
  })
}
//充值/扣款
export function updateBalance(data: any) {
  return request({
    url: '/v2/shop/member_balance/',
    method: 'post',
    data,
  })
}
