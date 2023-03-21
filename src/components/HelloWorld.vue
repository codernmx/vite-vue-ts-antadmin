<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo"></div>
      <a-menu v-model:selectedKeys="selectedKeys1" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item key="1">首页</a-menu-item>
        <a-menu-item key="2">推荐</a-menu-item>
        <a-menu-item key="3">关于</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout style="height: calc(100vh - 64px)">
      <a-layout-sider width="200" style="background: #fff" v-model:collapsed="collapsed" collapsible>
        <a-menu v-model:selectedKeys="selectedKeys2" v-model:openKeys="openKeys" mode="inline" :style="{ height: '100%', borderRight: 0 }">
          <a-sub-menu key="sub1">
            <template #title>
              <span>
                <user-outlined />
                <span v-if="!collapsed">信息管理</span>
              </span>
            </template>
            <a-menu-item key="1">信息管理</a-menu-item>
            <a-menu-item key="2">邮件管理</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <template #title>
              <span>
                <video-camera-outlined />
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
      <a-layout style="padding: 0 24px">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
          <a-button type="primary" @click="tips">切换</a-button>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { ref } from 'vue'

const selectedKeys1 = ref<string[]>(['2'])
const selectedKeys2 = ref<string[]>(['1'])
const collapsed = ref<boolean>(false)
const openKeys = ref<string[]>(['sub1'])
const tips = () => {
  message.success('切换成功')
  collapsed.value = !collapsed.value
}
</script>
<style>
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
