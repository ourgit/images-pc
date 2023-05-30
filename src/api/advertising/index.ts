import request from "@/utils/request";
//获取广告
export function getAdvertising(data: any) {
  return request({
    url: "/v1/p/noauth/contact/",
    method: "get",
    data,
  });
}
