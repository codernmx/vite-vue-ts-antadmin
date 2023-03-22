<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo" :style="{width:collapsed?'80px':'200px'}">LOGO</div>
      <div class="head-right">
        <a-breadcrumb style="margin: 16px 0;color: black">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-dropdown :trigger="['click']" class="login-check">
          <a class="ant-dropdown-link" @click.prevent> Maisy
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item key="3">个人中心</a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3">退出登录</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-layout-header>
    <a-layout style="height: calc(100vh - 64px)">
      <a-layout-sider width="200" style="background: #fff;height:calc(100vh - 22px - 64px) " v-model:collapsed="collapsed" :trigger="null" collapsible>
        <div style="text-align: center">
          <menu-unfold-outlined v-if="collapsed" class="trigger" @click="tips" />
          <menu-fold-outlined v-else class="trigger" @click="tips" />
        </div>
        <a-menu v-model:selectedKeys="selectedKeys2" v-model:openKeys="openKeys" mode="inline" :style="{ height: '100%', borderRight: 0 }">
          <a-menu-item key="1">
            <template #icon>
              <home-outlined />
            </template>
            首页
          </a-menu-item>
          <a-sub-menu key="sub2">
            <template #title>
              <span>
                <setting-outlined />
                <span v-if="!collapsed">系统管理</span>
              </span>
            </template>
            <a-menu-item key="5">菜单管理</a-menu-item>
            <a-menu-item key="6">角色管理</a-menu-item>
            <a-menu-item key="7">用户管理</a-menu-item>
            <a-menu-item key="8">附件管理</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 10px">
        <div class="tag">
          <Tag />
        </div>
        <a-layout-content class="main">
          <router-view v-slot="{ Component }">
            <transition name="fade">
              <component :is="Component" />
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
import {
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  HomeOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import Tag from './tag.vue'

import { ref } from 'vue'

const selectedKeys2 = ref<string[]>(['1'])
let collapsed = ref<boolean>(true)
const openKeys = ref<string[]>(['sub1'])
const tips = () => {
  message.success('切换成功')
  collapsed = !collapsed
}
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

.header {
  background: #fff;
  padding: 0;
  //background: gray;
  display: flex;

  .logo {
    text-align: center;
  }

  .head-right {
    flex: 1;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;

    .login-check {
      margin-right: 60px;
    }
  }
}
</style>
