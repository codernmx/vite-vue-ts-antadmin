/*
 * @Date: 2023-06-14 15:43:28
 * @LastEditTime: 2023-06-14 16:10:10
 */
export interface ArticleList {
    title?: string
    pageSize: number
    pageNum: number
}


export interface InsertOrUpArticle {
    id?: string;
    title: string;
    content: string;
    userId: number;
    inputValue: string;
}

export interface LogList {
    action?: string
    pageSize: number
    pageNum: number
}


export interface UserList {
    name?: string
    pageSize: number
    pageNum: number
}


export interface UpdateUserRole {
    userId: string
    roleId: string
}

export interface FileList {
    title?: string
    pageSize: number
    pageNum: number
}

export interface insertOrUpdateRole {
    id?: string
    name: string
    remarks: string
}