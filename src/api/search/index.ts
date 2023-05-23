import request from "@/utils/request";
//获取搜索列表
export function getSearch(data: any) {
  return request({
    url: "/v1/p/noauth/search_products/",
    method: "post",
    data,
  });
}
