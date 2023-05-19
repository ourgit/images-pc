import request from '@/utils/request'

//获取首页统计数据
export function getHomeStat() {
  return request({
    url: '/v2/shop/home_page_stat/',
    method: 'get',
    params: {},
  })
}

//日统计数据
export function getDayStat(data: any) {
  return request({
    url: '/v2/shop/platform_day_stat/',
    method: 'get',
    params: data,
  })
}

//月统计数据
export function getMonthStat(data: any) {
  return request({
    url: '/v2/shop/platform_month_stat/',
    method: 'get',
    params: data,
  })
}
