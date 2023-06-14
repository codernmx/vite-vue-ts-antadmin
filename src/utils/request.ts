/*
 * @Date: 2023-05-12 11:45:13
 * @LastEditTime: 2023-06-14 15:08:48
 */
import axios from 'axios'
import { message } from 'ant-design-vue';
import { ElLoading } from 'element-plus'
import useDemoStore from '@/store/modules/demo'
import router from '@/router/index'


const baseURL = 'http://localhost:3000/'

let loading: any = null //这里是loading
const request = axios.create({//使用create方法创建axios实例
    timeout: 30000, // 请求超时时间
    baseURL,
    // method: 'POST',
    // headers: {
    //     'Content-Type': 'application/json;charset=UTF-8',
    // }
})
// 添加请求拦截器
request.interceptors.request.use(config => {
    loading = ElLoading.service({
        lock: true,
        text: '拼命加载中...'
    })
    const demoStore = useDemoStore()
    config.headers.token = demoStore.data.token
    return config
})
// 添加响应拦截器
request.interceptors.response.use(response => {
    loading.close()
    if (response.data.code !== 200) {
        if (response.data.code === 403) {
            // message.error(response.data.msg)
            router.push('/login')
        }
        // if (response.data.code === 500) {
        //     message.error(response.data.msg)
        // }

        message.error(response.data.msg)
        return Promise.reject(response.data.msg)
    } else {
        return response.data
    }

}, error => {
    if (error.message === 'Network Error') {
        message.error('网络错误，请稍后重试')
    } else {
        message.error(error.message)
    }
    loading.close()
    return Promise.reject(error)
})


export default request