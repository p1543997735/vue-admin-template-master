import request from '@/utils/request'

export function getShop(params) {
  return request({
    url: '/JustLikeThis/public/index.php/api/admin/querybusinesslist',
    method: 'get',
    params
  })
}
export function userlogin(params) {
  return request({
    url: 'userloginbyusername',
    method: 'get',
    params
  })
}
export function querybusinesslist(params) {
  return request({
    url: 'querybusinesslist',
    method: 'get',
    params
  })
}
export function submitCommodity(params) {
  return request({
    url: 'uploadcommoditydata',
    method: 'post',
    params
  })
}
export function submitCommodityClass(params) {
  return request({
    url: 'submitcommodityclass',
    method: 'post',
    params
  })
}
export function queryCommodityKind() {
  return request({
    url: 'querycommoditykindlist',
    method: 'get'
  })
}
export function queryCommodityShopList() {
  return request({
    url: 'querycommodityshoplist',
    method: 'get'
  })
}
export function deletetablebyId(params) {
  return request({
    url: 'deletetablebyId',
    method: 'post',
    params
  })
}
export function querycommodityshoptable(params) {
  return request({
    url: 'querycommodityshoptable',
    method: 'get',
    params
  })
}
export function querycommodityitemlistbypage(params) {
  return request({
    url: 'querycommodityitemlistbypage',
    method: 'get',
    params
  })
}
export function querycommoditylistbypage(params) {
  return request({
    url: 'querycommoditylistbypage',
    method: 'get',
    params
  })
}
export function updatetabledatabyid(params) {
  return request({
    url: 'updatetabledatabyid',
    method: 'post',
    params
  })
}
export function querycommoditybysearch(params) {
  return request({
    url: 'querycommoditybysearch',
    method: 'get',
    params
  })
}
export function uploadfileinoss(params) {
  return request({
    url: 'uploadfileinoss',
    method: 'post',
    params
  })
}

