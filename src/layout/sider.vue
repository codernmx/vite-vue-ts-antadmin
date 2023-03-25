<template>
  <a-layout-sider width="200" style="background: #fff;height:calc(100vh - 22px - 64px) " v-model:collapsed="showMenu" :trigger="null" collapsible>
    <div style="text-align: center">
      <menu-unfold-outlined v-if="showMenu" class="trigger" @click="tips"/>
      <menu-fold-outlined v-else class="trigger" @click="tips"/>
    </div>
    <a-menu v-model:selectedKeys="selectedKeys2" v-model:openKeys="openKeys" mode="inline" @click="clickMenu">
      <a-menu-item key="/home">
        <template #icon>
          <home-outlined/>
        </template>
        首页
      </a-menu-item>
      <a-sub-menu v-for="item in data.menuList" :key="item.path">
        <template #title>
              <span>
                <setting-outlined/>
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
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'
import {message} from 'ant-design-vue'

import {useRouter} from 'vue-router'

import {ref, reactive, onMounted} from 'vue'
import useDemoStore from '@/store/modules/demo'
import {storeToRefs} from 'pinia'

const demoStore = useDemoStore()
const {showMenu} = storeToRefs(demoStore)


const router = useRouter()
const data = reactive({
  menuList: []
})

const selectedKeys2 = ref<string[]>(['1'])
const openKeys = ref<string[]>(['sub1'])
const tips = () => {
  demoStore.changeShowMenu()
}

const clickMenu = ({key}) => {
  router.push(key)
}

onMounted(() => {
  data.menuList = demoStore.data.menuList
})

</script>
<style lang="less" scoped>

</style>
