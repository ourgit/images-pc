import request from '@/utils/request'

/**
 * 获取成员列表
 */
export function getShopMemberList(data: object) {
  return request({
    url: '/v2/shop/shop_members/',
    method: 'get',
    data,
  })
}

/**
 * 获取成员详情
 */
export function getShopMemberDetail(data: any) {
  return request({
    url: `/v2/shop/shop_members/${data.id}/`,
    method: 'get',
    params: {},
  })
}
/**
 * 添加成员
 */
export function addShopMember(data: any) {
  return request({
    url: '/v2/shop/shop_members/new/',
    method: 'post',
    params: {},
  })
}
/**
 * 修改成员
 */
export function updateShopMember(data: any) {
  return request({
    url: `/v2/shop/admin_member/${data.id}/`,
    method: 'post',
    params: {},
  })
}
//删除成员
export function delShopMember(data: any) {
  return request({
    url: '/v2/shop/admin_member/',
    method: 'post',
    data: {
      id: data.id,
      operation: 'del'
    }
  })
}


//锁定/解锁成员
export function setShopMemberStatus(data: any) {
  return request({
    url: '/v2/shop/admin_members/status/',
    method: 'post',
    data,
  })
}

//会员绑定店铺
export function bindShop(data: any) {
  return request({
    url: '/v2/shop/bind_shop/',
    method: 'post',
    data,
  })
}


