import {defineStore} from 'pinia'
import {ref, reactive} from 'vue'
import {message} from 'ant-design-vue'
import {getMenuList, loginApi} from '@/api/index'

const useDemoStore = defineStore('demo', () => {
    const show = ref(true)
    const showMenu = ref(true)

    const data = reactive({
        menuList: [],
        tagList: ['首页'], //header上边的tag
        token: '',
        userInfo: {},
    })

    const changeShow = () => {
        show.value = !show.value
    }
    const clearToken = () => {
        data.token = ''
        data.userInfo = {}
    }
    const getToken = (userInfo) => {
        return new Promise((resolve, reject) => {
            loginApi(userInfo).then(res => {
                data.token = res.data.token || ''
                data.userInfo = res.data
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
    const setTag = (tag: string, del = false) => {
        if (!del) {
            if (tag && !data.tagList.includes(tag)) {
                data.tagList.push(tag)
            }
        } else {
            if (tag !== '首页') {
                data.tagList = data.tagList.filter(ite => ite !== tag)
            }
        }
    }

    const changeShowMenu = () => {
        showMenu.value = !showMenu.value
        message.success('切换成功')
    }

    const getMenu = () => {
        return new Promise((resolve, reject) => {
            getMenuList().then(res => {
                data.menuList = res.data || []
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })

    }
    return {
        show,
        showMenu,
        changeShow,
        getToken,
        changeShowMenu,
        getMenu,
        clearToken,
        setTag,
        ...data,
        data
    }
}, {
    // persist: true //持久化
    persist: {
        key: 'demo', //缓存key
        storage: sessionStorage, //缓存方式
        // 部分持久化状态的点符号路径数组，默认持久化所有数据
        paths: ['data.token', 'data.tagList', 'showMenu', 'data.userInfo'],  //持久化字段
    }
})

export default useDemoStore