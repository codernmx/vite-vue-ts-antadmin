import { createRouter, createWebHistory } from "vue-router"

// import Layout from '@/components/HelloWorld.vue'
import Layout from '../components/HelloWorld.vue'

// 2. 定义路由配置
const routes = [
    {
        path: "/",
        component: Layout,
        children: [
            {
                path: "/sys",
                component: () => import('../views/system/menu.vue'),
            }
        ]
    },
];

// 3. 创建路由实例
const router = createRouter({
    // 4. 采用hash 模式
    // history: createWebHashHistory(),
    // 采用 history 模式
    history: createWebHistory(),
    routes,
});

export default router
