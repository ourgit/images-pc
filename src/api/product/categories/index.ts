import request from "@/utils/request";
//获取商品分类列表
export function getCategoryList(data: any) {
  return request({
    url: "/v1/p/admin/product_categories/",
    method: "get",
    data,
  });
}
