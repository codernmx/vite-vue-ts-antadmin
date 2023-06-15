<!--
 * @Date: 2023-05-12 11:45:13
 * @LastEditTime: 2023-06-06 15:56:35
-->
<template>
  <div style="display: inline;margin-right: 15px;">
    <menu-unfold-outlined v-if="showMenu" class="trigger" @click="tips" />
    <menu-fold-outlined v-else class="trigger" @click="tips" />
  </div>
  <a-tag @close="close(item)" @click="chickTag(item)" :closable="item.name !== '首页'"
    v-for="item in demoStore.data.tagList">{{ item.name }}</a-tag>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { MenuUnfoldOutlined, MenuFoldOutlined, } from '@ant-design/icons-vue'
import useDemoStore from '@/store/modules/demo'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
const demoStore = useDemoStore()
const { tagList, showMenu } = storeToRefs(demoStore)

const router = useRouter()

const tips = () => {
  demoStore.changeShowMenu()
}

const close = (item) => {
  demoStore.setTag(item, true)
  router.push(demoStore.data.tagList[demoStore.data.tagList.length - 1].path)
}
const chickTag = ({ path }) => {
  router.push(path)
}
</script>
<style lang="less" scoped></style>
