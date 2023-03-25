import {defineStore} from 'pinia'
import {ref, reactive} from 'vue'
import {message} from 'ant-design-vue'
import {getMenuList} from '@/api/index'

const useDemoStore = defineStore('demo', () => {
    const show = ref(true)
    const showMenu = ref(true)

    const data = reactive({
        menuList: [],
        tagList: ['首页'], //header上边的tag
    })

    const changeShow = () => {
        show.value = !show.value
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
        changeShowMenu,
        getMenu,
        setTag,
        ...data,
        data
    }
}, {
    persist: true //持久化
})

export default useDemoStore