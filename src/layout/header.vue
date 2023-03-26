<template>
  <a-layout-header class="header">
    <!--后面改-->
    <div class="logo" :style="{width:showMenu?'80px':'200px'}" v-if="!showMenu">
      <el-image :src="logo" style="height: 42px;margin-left: 40px;margin-top: 15px"></el-image>
    </div>
    <div class="head-right">
      <!--<a-breadcrumb style="margin: 16px 0;color: black">-->
      <!--  <a-breadcrumb-item>Home</a-breadcrumb-item>-->
      <!--  <a-breadcrumb-item>List</a-breadcrumb-item>-->
      <!--  <a-breadcrumb-item>App</a-breadcrumb-item>-->
      <!--</a-breadcrumb>-->
      <div></div>
      <a-dropdown :trigger="['hover']" class="login-check">
        <a class="ant-dropdown-link" @click.prevent> {{ demoStore.data.userInfo.name }}
          <DownOutlined/>
        </a>
        <template #overlay>
          <a-menu @click="click">
            <a-menu-item key="1">回到前台</a-menu-item>
            <a-menu-divider/>
            <a-menu-item key="2">退出登录</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>
<script setup lang="ts">
import logo from '@/assets/logo.png'
import {DownOutlined} from '@ant-design/icons-vue'
import {useRouter} from 'vue-router'

import useDemoStore from '@/store/modules/demo'
import {storeToRefs} from 'pinia'

const demoStore = useDemoStore()
const {showMenu} = storeToRefs(useDemoStore())

const router = useRouter()
import {ref} from 'vue'
import {message} from 'ant-design-vue'

const click = (val) => {
  if (val.key === '2') {
    demoStore.clearToken()
    message.success('成功')
    router.push('/login')
  }

  if (val.key === '1') {
    router.push('/front/home')
  }
}
</script>
<style lang="less" scoped>
.header {
  background: #fff;
  padding: 0;
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
