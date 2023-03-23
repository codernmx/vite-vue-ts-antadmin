import { createRouter, createWebHistory } from "vue-router"

// import Layout from '@/components/HelloWorld.vue'
import Layout from '@/Layout/index.vue'

// 2. 定义路由配置
const routes = [
    {//未匹配的页面，默认跳转到404页面
        path: '/:pathMatch(.*)*',
        redirect: '/404',
    },
    {
        path: '/404',
        name: "Error",
        component: () => import('@/views/error/404.vue'),
    },
    {
        path: "/",
        component: Layout,
        redirect: '/sys',
        children: [
            {
                path: "/sys",
                component: () => import('@/views/system/menu.vue'),
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
