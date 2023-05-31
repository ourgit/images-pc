import request from "@/utils/request";
//获取联系
export function getRelationList(data: any) {
  return request({
    url: "/v1/p/noauth/contact/",
    method: "get",
    data,
  });
}
