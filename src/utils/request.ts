import axios from 'axios'
import {message} from 'ant-design-vue';
import {ElLoading} from 'element-plus'

const baseURL = 'http://localhost:3000/'

let loading = null //这里是loading
const request = axios.create({//使用create方法创建axios实例
    timeout: 30000, // 请求超时时间
    baseURL,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    }
})
const cookie = localStorage.getItem("cookie");

// 添加请求拦截器
request.interceptors.request.use(config => {
    loading = ElLoading.service({
        lock: true,
        text: '拼命加载中...'
    })
    // if (cookie) {
    //   if (config.method === 'get') {
    //     config.params = {
    //       ...config.params,
    //       cookie
    //     }
    //   } else {
    //     config.data.cookie = cookie
    //   }
    // }
    return config
})
// 添加响应拦截器
request.interceptors.response.use(response => {
    loading.close()
    return response.data
}, error => {
    console.log('error', error)
    message.error(error.message)
    loading.close()
    return Promise.reject(error)
})


export default request