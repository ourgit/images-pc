import request from "@/utils/request";
//获取网站标题
export function getTitle(data: any) {
  return request({
    url: "/v1/p/noauth/contact/",
    method: "get",
    data,
  });
}
