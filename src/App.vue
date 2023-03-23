<script setup lang="ts">

import useDemoStore from '@/store/modules/demo'
import { storeToRefs } from 'pinia'

const demoStore = useDemoStore()
const { show } = storeToRefs(demoStore)


</script>

<template>
  <a-spin tip="服务器拼命加载中..." :spinning="show" wrapperClassName="loadinglcl">
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </a-spin>
</template>

<style scoped></style>
