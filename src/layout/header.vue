<template>
  <a-layout-header class="header">
    <div class="logo" :style="{width:showMenu?'80px':'200px'}">LOGO</div>
    <div class="head-right">
      <!--<a-breadcrumb style="margin: 16px 0;color: black">-->
      <!--  <a-breadcrumb-item>Home</a-breadcrumb-item>-->
      <!--  <a-breadcrumb-item>List</a-breadcrumb-item>-->
      <!--  <a-breadcrumb-item>App</a-breadcrumb-item>-->
      <!--</a-breadcrumb>-->
      <div></div>
      <a-dropdown :trigger="['hover']" class="login-check">
        <a class="ant-dropdown-link" @click.prevent> Maisy
          <DownOutlined/>
        </a>
        <template #overlay>
          <a-menu @click="click">
            <a-menu-item key="1">个人中心</a-menu-item>
            <a-menu-divider/>
            <a-menu-item key="2">退出登录</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>
<script setup lang="ts">
import {DownOutlined} from '@ant-design/icons-vue'
import {useRouter} from 'vue-router'

import useDemoStore from '@/store/modules/demo'
import {storeToRefs} from 'pinia'

const {showMenu} = storeToRefs(useDemoStore())

const router = useRouter()
import {ref} from 'vue'
import {message} from 'ant-design-vue'

const click = (val) => {
  if (val.key === '2') {
    message.success('成功')
    router.push('/login')
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
