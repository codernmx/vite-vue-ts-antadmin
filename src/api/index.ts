import request from '@/utils/request'

export interface IDelData {
    id?: string
}

export interface IAddData {
    parId?: string
    icon: string
    name: string
    path: string
    sort?: string
}

export interface IUpdateData {
    id?: string
    icon: string
    name: string
    path: string
    sort?: string
}


export function getMenuList() {
    return request({
        url: `/menu/list`,
        method: 'POST'
    })
}

export function menuDel(data: IDelData) {
    return request({
        url: `/del/menu`,
        method: 'POST',
        data
    })
}

export function menuAdd(data: IAddData) {
    return request({
        url: `/insert/menu`,
        method: 'POST',
        data
    })
}

export function updateApi(data: IUpdateData) {
    return request({
        url: `/update/menu`,
        method: 'POST',
        data
    })
}