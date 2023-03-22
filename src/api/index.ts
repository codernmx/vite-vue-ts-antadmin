import request from '@/utils/request'


export function getMenuList(params) {
  return request({
    url: ``,
    method: 'GET',
    params
  })
}
export function menuDel(params) {
  return request({
    url: `/del/menu`,
    method: 'GET',
    params
  })
}

export function menuAdd(params) {
  return request({
    url: `/insert/menu`,
    method: 'GET',
    params
  })
}