/*
 * @Date: 2023-05-12 11:45:13
 * @LastEditTime: 2023-06-15 14:15:32
 */
// @ts-ignore
import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import store from '@/store'
import router from "@/router/index";

import plugins from '@/plugins'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// console.log('当前地址',process.env.VUE_APP_URL)
createApp(App).use(store).use(Antd).use(router).use(plugins).use(ElementPlus).mount('#app')
