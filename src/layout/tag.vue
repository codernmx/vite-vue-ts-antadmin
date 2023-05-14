<template>
  <div style="display: inline;margin-right: 15px;">
    <menu-unfold-outlined v-if="showMenu" class="trigger" @click="tips" />
    <menu-fold-outlined v-else class="trigger" @click="tips" />
  </div>
  <a-tag @close="close(item)" :closable="item !== '首页'" v-for="item in demoStore.data.tagList">{{ item }}</a-tag>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { MenuUnfoldOutlined, MenuFoldOutlined, } from '@ant-design/icons-vue'
import useDemoStore from '@/store/modules/demo'
import { storeToRefs } from 'pinia'

const demoStore = useDemoStore()
const { tagList, showMenu } = storeToRefs(demoStore)

const tips = () => {
  demoStore.changeShowMenu()
}

const close = (item) => {
  demoStore.setTag(item, true)
}
</script>
<style lang="less" scoped></style>
