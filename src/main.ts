import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.ts";
import store from '@/store'



import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

createApp(App).use(Antd).use(router).use(store).mount('#app')
