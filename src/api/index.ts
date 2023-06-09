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


export function getMenuList(data) {
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


/* 附件  */
export function getFileList(data) {
    return request({
        url: `/api/file/list`,
        method: 'POST',
        data
    })
}


export function insertFile(data) {
    return request({
        url: `/api/insert/file`,
        method: 'POST',
        data
    })
}


export function updateFile(data) {
    return request({
        url: `/api/update/file`,
        method: 'POST',
        data
    })
}


export function deleteFile(data) {
    return request({
        url: `/api/del/file`,
        method: 'POST',
        data
    })
}

/* 附件 end */





/* 角色相关----------------- */

export function getRoleList(data) {
    return request({
        url: `/api/role/list`,
        method: 'POST',
        data
    })
}

export function getRoleListAll(data) {
    return request({
        url: `/api/role/list/all`,
        method: 'POST',
        data
    })
}

export function updateUserRole(data) {
    return request({
        url: `/api/update/user/role`,
        method: 'POST',
        data
    })
}


export function getRoleIdByUserId(data) {
    return request({
        url: `/api/getRoleIdByUserId`,
        method: 'POST',
        data
    })
}


export function delRole(data) {
    return request({
        url: `/api/del/role`,
        method: 'POST',
        data
    })
}


export function insertRole(data) {
    return request({
        url: `/api/insert/role`,
        method: 'POST',
        data
    })
}

export function updateRole(data) {
    return request({
        url: `/api/update/role`,
        method: 'POST',
        data
    })
}

export function insertRoleMenu(data) {
    return request({
        url: `/api/insert/role/menu`,
        method: 'POST',
        data
    })
}
/* 角色相关----------------- end */






/* 用户相关         */

export function getUserList(data) {
    return request({
        url: `/api/user/list`,
        method: 'POST',
        data
    })
}
export function getUserDetails(data) {
    return request({
        url: `/api/user/details`,
        method: 'POST',
        data
    })
}

export function insertUser(data) {
    return request({
        url: `/api/insert/user`,
        method: 'POST',
        data
    })
}


export function updateUser(data) {
    return request({
        url: `/api/update/user`,
        method: 'POST',
        data
    })
}
export function deleteUser(data) {
    return request({
        url: `/api/delete/user`,
        method: 'POST',
        data
    })
}


/* 用户相关        end */




/* 日志相关         */

export function getLogList(data) {
    return request({
        url: `/api/log/list`,
        method: 'POST',
        data
    })
}
export function getLogDetails(data) {
    return request({
        url: `/api/log/details`,
        method: 'POST',
        data
    })
}

export function insertLog(data) {
    return request({
        url: `/api/insert/log`,
        method: 'POST',
        data
    })
}


export function updateLog(data) {
    return request({
        url: `/api/update/log`,
        method: 'POST',
        data
    })
}
export function deleteLog(data) {
    return request({
        url: `/api/delete/log`,
        method: 'POST',
        data
    })
}


/* 日志相关        end */