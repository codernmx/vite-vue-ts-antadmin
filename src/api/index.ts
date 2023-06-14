import request from '@/utils/request'


import { ArticleList, InsertOrUpArticle, LogList, UserList, UpdateUserRole, FileList, insertOrUpdateRole } from '@/type/api'
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


export function getMenuList(data: { id?: string }) {
    return request({
        url: `/api/menu/list`,
        method: 'POST',
        data
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


export function getArticleList(data: ArticleList) {
    return request({
        url: `/api/article/list`,
        method: 'POST',
        data
    })
}
export function getArticleDetails(data: IDelData) {
    return request({
        url: `/api/article/details`,
        method: 'POST',
        data
    })
}

export function insertArticle(data: InsertOrUpArticle) {
    return request({
        url: `/api/insert/article`,
        method: 'POST',
        data
    })
}


export function updateArticle(data: InsertOrUpArticle) {
    return request({
        url: `/api/update/article`,
        method: 'POST',
        data
    })
}
export function deleteArticle(data: IDelData) {
    return request({
        url: `/api/delete/article`,
        method: 'POST',
        data
    })
}


/* 附件  */
export function getFileList(data: FileList) {
    return request({
        url: `/api/file/list`,
        method: 'POST',
        data
    })
}




export function deleteFile(data: IDelData) {
    return request({
        url: `/api/del/file`,
        method: 'POST',
        data
    })
}

/* 附件 end */





/* 角色相关----------------- */

export function getRoleList(data: UserList) {
    return request({
        url: `/api/role/list`,
        method: 'POST',
        data
    })
}

export function getRoleListAll() {
    return request({
        url: `/api/role/list/all`,
        method: 'POST',
    })
}

export function updateUserRole(data: UpdateUserRole) {
    return request({
        url: `/api/update/user/role`,
        method: 'POST',
        data
    })
}


export function getRoleIdByUserId(data: { userId: string }) {
    return request({
        url: `/api/getRoleIdByUserId`,
        method: 'POST',
        data
    })
}


export function delRole(data: IDelData) {
    return request({
        url: `/api/del/role`,
        method: 'POST',
        data
    })
}


export function insertRole(data: insertOrUpdateRole) {
    return request({
        url: `/api/insert/role`,
        method: 'POST',
        data
    })
}

export function updateRole(data: insertOrUpdateRole) {
    return request({
        url: `/api/update/role`,
        method: 'POST',
        data
    })
}


interface insertRoleMenu {
    menuList: any[]
    roleId: string
}
export function insertRoleMenu(data: insertRoleMenu) {
    return request({
        url: `/api/insert/role/menu`,
        method: 'POST',
        data
    })
}
/* 角色相关----------------- end */






/* 用户相关         */

export function getUserList(data: UserList) {
    return request({
        url: `/api/user/list`,
        method: 'POST',
        data
    })
}


export function insertUser(data: any) { //暂时没调
    return request({
        url: `/api/insert/user`,
        method: 'POST',
        data
    })
}


export function updateUser(data: { id: string, status: number }) { //这个有共用的 type
    return request({
        url: `/api/update/user`,
        method: 'POST',
        data
    })
}
export function deleteUser(data: IDelData) {
    return request({
        url: `/api/delete/user`,
        method: 'POST',
        data
    })
}


/* 用户相关        end */




/* 日志相关         */

export function getLogList(data: LogList) {
    return request({
        url: `/api/log/list`,
        method: 'POST',
        data
    })
}

export function deleteLog(data: IDelData) {
    return request({
        url: `/api/delete/log`,
        method: 'POST',
        data
    })
}


/* 日志相关        end */