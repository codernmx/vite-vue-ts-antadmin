import { defineStore } from 'pinia'
import { ref } from 'vue'

const useDemoStore = defineStore('demo', () => {
    const show = ref(true)
    const showLoading = () => {
        show.value = true
    }
    const closeLoading = () => {
        show.value = false
    }
    return {
        show,
        showLoading,
        closeLoading
    }
}, {
    persist: true //持久化
})

export default useDemoStore