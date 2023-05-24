import request from "@/utils/request";
//获取联系
export function getProductList(data: any) {
  return request({
    url: "/v1/p/noauth/products/",
    method: "get",
    data,
  });
}
