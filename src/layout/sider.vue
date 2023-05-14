<template>
  <a-layout-sider width="200" style="background: #fff;height:calc(100vh - 22px - 64px) " v-model:collapsed="showMenu"
    :trigger="null" collapsible>
    <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline" @click="clickMenu"
      @openChange="openChange">
      <a-menu-item key="/home">
        <template #icon>
          <home-outlined />
        </template>
        首页
      </a-menu-item>
      <a-sub-menu v-for="item in data.menuList" :key="item.path">
        <template #title>
          <span>
            <setting-outlined />
            <span>{{ item.title }}</span>
          </span>
        </template>
        <div v-if="item.children && item.children.length > 0">
          <a-menu-item :key="ite.path" v-for="ite in item.children">{{ ite.title }}</a-menu-item>
        </div>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>
<script setup lang="ts">
import {
  HomeOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

import { useRouter, useRoute } from 'vue-router'

import { ref, reactive, onMounted } from 'vue'
import useDemoStore from '@/store/modules/demo'
import { storeToRefs } from 'pinia'

const demoStore = useDemoStore()
const { showMenu } = storeToRefs(demoStore)


const router = useRouter()
const route = useRoute()
const data = reactive({
  menuList: [],
})

const openKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])


const clickMenu = ({ key, path }) => {
  router.push(key)
}

const openChange = (openKeys) => {
  console.log(openKeys);

  // if (openKeys.length > 0) {
  demoStore.data.openKeys = openKeys
  // }
}

onMounted(() => {
  data.menuList = demoStore.data.menuList
  openKeys.value = demoStore.data.openKeys
  selectedKeys.value = [route.path]
})

</script>
<style lang="less" scoped></style>
