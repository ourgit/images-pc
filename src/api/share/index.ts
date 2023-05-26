import request from "@/utils/request";
//获取分享列表
export function getShareList(data: any) {
  return request({
    url: "/v1/p/noauth/coverImgUrl/",
    method: "post",
    data,
  });
}
