import request from '@/utils/request'

//获取商品列表
export function getProductList(data: any) {
  return request({
    url: '/v2/shop/product_list/',
    method: 'post',
    data,
  })
}

//获取商品详情
export function getProductDetail(data: any) {
  return request({
    url: `/v2/shop/products/${data.id}/`,
    method: 'get',
    params: {},
  })
}

//添加商品
export function addProduct(data: object) {
  return request({
    url: '/v2/shop/products/new/',
    method: 'post',
    data,
  })
}

//更新商品
export function updateProduct(data: any) {
  return request({
    url: `/v2/shop/products/${data.id}/`,
    method: 'post',
    data,
  })
}

//删除商品
export function deleteProduct(data: any) {
  return request({
    url: '/v2/shop/products/',
    method: 'post',
    data: { list: data.id, operation: 'del' },
  })
}

//上下架商品
export function setStatus(data: any) {
  return request({
    url: `/v2/shop/product_status/${data.id}/`,
    method: 'post',
    data,
  })
}

//批量上下架商品
export function batchSetStatus(data: any) {
  return request({
    url: '/v2/shop/batch_update_product_status/',
    method: 'post',
    data,
  })
}

//批量绑定商品到店铺
export function batchCloneProduct(data: any) {
  return request({
    url: '/v2/shop/batch_clone_product/',
    method: 'post',
    data,
  })
}
