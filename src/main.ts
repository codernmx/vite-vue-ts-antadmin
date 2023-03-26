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

createApp(App).use(store).use(Antd).use(router).use(plugins).use(ElementPlus).mount('#app')
