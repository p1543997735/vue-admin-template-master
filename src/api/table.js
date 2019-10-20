import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'querybusinesslist',
    method: 'get',
    params
  })
}
