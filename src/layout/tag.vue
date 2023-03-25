<template>
  <a-tag @close="close(item)" :closable="item !=='首页'" v-for="item in demoStore.data.tagList">{{ item }}</a-tag>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import useDemoStore from '@/store/modules/demo'
import {storeToRefs} from 'pinia'

const demoStore = useDemoStore()
const {tagList} = storeToRefs(demoStore)

const close = (item) => {
  demoStore.setTag(item, true)
}
</script>
<style lang="less" scoped>

</style>
