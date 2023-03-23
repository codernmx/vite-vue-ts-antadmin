import axios from 'axios'
import { message } from 'ant-design-vue';

import useDemoStore from '@/store/modules/demo'
import { storeToRefs } from 'pinia'

const demoStore = useDemoStore()
const { show } = storeToRefs(demoStore)





const baseURL = 'http://localhost:3000/'

// let loadingInstance = null //这里是loading
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
  demoStore.showLoading()
  console.log(show);
  
  // loadingInstance = ElLoading.service({
  //   lock: true,
  //   text: '拼命加载中...'
  // })
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
  demoStore.closeLoading()
  console.log(demoStore,'guanbizhihou');
  
  // loadingInstance.close()
  console.log(response)
  return response.data
}, error => {
  demoStore.closeLoading()
  console.log('error', error)
  message.error(error.message)
  // loadingInstance.close()
  return Promise.reject(error)
})


export default request