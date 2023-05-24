import request from "@/utils/request";
//获取商品列表
export function getProductList(data: any) {
  return request({
    url: "/v1/p/noauth/products/",
    method: "post",
    data,
  });
}

//获取商品详情
export function getProductDetail(data: any) {
  return request({
    url: `/v1/p/noauth/products/${data.id}/`,
    method: "get",
    params: {},
  });
}
//获取推荐列表
export function getRecommend(data: any) {
  return request({
    url: `/v1/p/noauth/recommend_products/`,
    method: "get",
    params: {},
  });
}
