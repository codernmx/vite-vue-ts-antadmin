import {createRouter, createWebHistory} from "vue-router"

import useDemoStore from '@/store/modules/demo'
import {storeToRefs} from 'pinia'
import Layout from '@/layout/index.vue'

// 2. 定义路由配置
const routes = [

    {
        path: '/404',
        name: "Error",
        component: () => import('@/views/error/404.vue'),
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
        meta: {title: '首页'},
        children: [
            {
                path: "home",
                component: () => import('@/views/home/home.vue'),
            }
        ]
    },
    // {//未匹配的页面，默认跳转到404页面
    //     path: '/:pathMatch(.*)*',
    //     redirect: '/404',
    // },
];

// 3. 创建路由实例
const router = createRouter({
    // 4. 采用hash 模式
    // history: createWebHashHistory(),
    // 采用 history 模式
    history: createWebHistory(),
    routes,
});


function change(temp, isChildren = false) {
    let finalArr = []
    if (isChildren) {
        //只针对 system下的有效  后期优化
        let modules = import.meta.glob("../views/system/*.vue")
        temp.forEach(item => {
            item = {
                name: item.name,
                path: item.path,
                meta: {title: item.title},
                component: modules[`../views${item.path}.vue`],
            }
            finalArr.push(item)
        })
    } else {
        temp.forEach(item => {
            if (item.children && item.children.length > 0) {
                item.children = change(item.children, true)
            }
            item = {
                path: item.path,
                component: Layout,
                meta: {title: item.title},
                children: item.children || []
            }
            finalArr.push(item)
        })
    }
    return finalArr
}

//守卫
router.beforeEach((to, from, next) => {
    //判断是否有权限返回登录界面
    console.log(from.path, to.path)
    const demoStore = useDemoStore()
    demoStore.setTag(to.meta.title)
    const {menuList} = storeToRefs(demoStore)
    console.log(router, router.currentRoute)
    if (router.getRoutes().length === 4) {
        demoStore.getMenu().then(res => {
            const list = change(JSON.parse(JSON.stringify(res.data)))
            list.forEach(item => {
                router.addRoute(item)
            })
            router.push(to)
        })
    } else {
        next()
    }

    // if (to.path !== '/login' && to.path !== '/404') {
    //     if (menuList.length > 0) {
    //         next()
    //     } else {
    //         demoStore.getMenu().then(res => {
    //             console.log(change(res.data))
    //             router.addRoute(change(res.data))
    //             // console.log(res.data, 't')
    //             next()
    //         }).catch(err => {
    //             console.log(err, 'err')
    //             next('/404')
    //         })
    //
    //     }
    // } else {
    //     next()
    // }
})


export default router
