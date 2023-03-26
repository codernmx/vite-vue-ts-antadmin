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
        url: `/api/menu/list`,
        method: 'POST'
    })
}

export function menuDel(data: IDelData) {
    return request({
        url: `/api/del/menu`,
        method: 'POST',
        data
    })
}

export function menuAdd(data: IAddData) {
    return request({
        url: `/api/insert/menu`,
        method: 'POST',
        data
    })
}

export function updateApi(data: IUpdateData) {
    return request({
        url: `/api/update/menu`,
        method: 'POST',
        data
    })
}

export function loginApi(data: IUpdateData) {
    return request({
        url: `/api/login`,
        method: 'POST',
        data
    })
}


export function getArticleList(data) {
    return request({
        url: `/api/article/list`,
        method: 'POST',
        data
    })
}
export function getArticleDetails(data) {
    return request({
        url: `/api/article/details`,
        method: 'POST',
        data
    })
}

export function insertArticle(data) {
    return request({
        url: `/api/insert/article`,
        method: 'POST',
        data
    })
}


export function updateArticle(data) {
    return request({
        url: `/api/update/article`,
        method: 'POST',
        data
    })
}
export function deleteArticle(data) {
    return request({
        url: `/api/delete/article`,
        method: 'POST',
        data
    })
}