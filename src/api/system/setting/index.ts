import request from '@/utils/request'

//获取商品统一图片
export function getProductImg() {
  return request({
    url: '/v2/shop/product_uni_image/',
    method: 'get',
    params: {},
  })
}


//保存商品统一图片
export function setProductImg(data:any) {
  return request({
    url: '/v2/shop/product_uni_image/',
    method: 'post',
    params: data,
  })
}


//店铺退货默认地址详情
export function getAddress() {
  return request({
    url: '/v2/shop/shop_return_contact_detail/',
    method: 'get',
  })
}

//店铺退货默认地址详情
export function updateAddress(data:any) {
  return request({
    url: '/v2/shop/shop_return_contact_detail/',
    method: 'post',
    params: data,
  })
}

