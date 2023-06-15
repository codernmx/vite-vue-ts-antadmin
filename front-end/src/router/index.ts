import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"

import useDemoStore from '@/store/modules/demo'
import { storeToRefs } from 'pinia'
import Layout from '@/layout/index.vue'
import fontLayout from '@/views/front/layout.vue'

// 2. 定义路由配置
const routes = [

    {
        path: '/404',
        name: "Error",
        component: () => import('@/views/error/404.vue'),
    },
    {
        path: '/front',
        name: "front",
        component: fontLayout,
        children: [
            {
                path: "/front/home",
                component: () => import('@/views/front/home.vue'),
            },
            {
                path: "/front/details",
                component: () => import('@/views/front/details.vue'),
            }
        ]
    },
    {
        path: '/login',
        name: "login",
        component: () => import('@/views/login/login.vue'),
    },
    {
        path: "/",
        component: Layout,
        redirect: '/home',
        meta: { title: '首页' },
        children: [
            {
                path: "/home",
                component: () => import('@/views/home/home.vue'),
            }
        ]
    },
];

// 3. 创建路由实例
const router = createRouter({
    // 4. 采用hash 模式
    // history: createWebHashHistory(),
    // createWebHistory
    // 采用 history 模式
    history: createWebHashHistory(),
    routes,
});


function change(temp: any, isChildren = false) {
    let finalArr: any[] = []
    if (isChildren) {
        let modules = import.meta.glob(`../views/**/*.vue`)  //获取view 下所有组件
        temp.forEach((item: any) => {
            item = {
                name: item.name,
                path: item.path,
                meta: { title: item.title },
                component: modules[`../views${item.path}.vue`],
            }
            finalArr.push(item)
        })
    } else { //这里是一级菜单
        temp.forEach((item: any) => {
            if (item.children && item.children.length > 0) {
                item.children = change(item.children, true)
            }
            item = {
                path: item.path,
                component: Layout,
                meta: { title: item.title },
                children: item.children || []
            }
            finalArr.push(item)
        })
    }
    return finalArr
}

const whiteList = ['/login', '/404', '/front/home']
//守卫
router.beforeEach((to, from, next) => {
    //判断是否有权限返回登录界面
    const demoStore = useDemoStore()
    demoStore.setTag({
        name: to.meta.title,
        path: to.path
    })
    const { menuList } = storeToRefs(demoStore)
    if (demoStore.data.token) {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            if (demoStore.data.menuList.length > 0) {
                next()
            } else {
                const userId: string | null = sessionStorage.getItem('userId') as string;
                demoStore.getMenu(userId).then((res: any) => {
                    const list = change(JSON.parse(JSON.stringify(res.data)))
                    list.forEach(item => {
                        router.addRoute(item)
                    })
                    router.addRoute({  //动态路由处理完成之后   添加 404 页面
                        path: "/:pathMath(.*)", // ***此处需特别注意置于最底部***
                        redirect: "/404"
                    })
                    next({ ...to, replace: true })
                })
            }

        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})


export default router
