<template>
  <a-layout>
    <Header/>
    <a-layout style="height: calc(100vh - 64px)">
      <sider/>
      <a-layout style="padding: 10px">
        <div class="tag">
          <Tag/>
        </div>
        <a-layout-content class="main">
          <router-view v-slot="{ Component }">
            <transition name="fade">
              <component :is="Component"/>
            </transition>
          </router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center;padding: 10px">
          ©2023 By Maisy
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">

import Tag from './tag.vue'
import Sider from "./sider.vue";
import Header from "./header.vue"


</script>
<style scoped lang="less">
.tag {
  width: 100%;
  height: 32px;
  background: #fff;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
}

.main {
  background: #fff;
  border-radius: 5px;
  margin: 0;
  height: 100%;
  padding: 10px;
}


</style>
