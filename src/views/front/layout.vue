<template>
  <div class="container_layout">
    <a-row type="flex" class="box">
      <a-col :span="3" class="logo">
        <a-image :preview="false" :src="logo" width="120px" style="margin-top: -5px" />
      </a-col>
      <a-col :span="18" class="flex">
        <div v-for="(item, i) in data.routers" :key="i" @click="openMenu(item.path)" class="item">
          <div class="text-center" :class="data.active == item.path ? 'active' : ''">
            {{ item.title }}
          </div>
          <img src="@/assets/nav.png" alt="" v-if="data.active == item.path" style="margin-top: -6px" />
        </div>
      </a-col>
      <a-col :span="3">
        <a-dropdown :trigger="['hover']" class="login-check" v-if="demoStore.data.userInfo.name">
          <a class="ant-dropdown-link" @click.prevent> {{ demoStore.data.userInfo.name }}
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu @click="click">
              <a-menu-item key="1">个人中心</a-menu-item>
              <a-menu-divider />
              <a-menu-item key="2">退出登录</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>

        <div @click="login" v-else>登录</div>
      </a-col>
    </a-row>
    <a-carousel arrows :autoplay="true">
      <template #prevArrow>
        <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
          <left-circle-outlined />
        </div>
      </template>
      <template #nextArrow>
        <div class="custom-slick-arrow" style="right: 10px">
          <right-circle-outlined />
        </div>
      </template>
      <div>
        <el-image style="width: 100%; height: 100%"
          src="https://bt.nmxgzs.cn/upload/2022-05-13/fe3ce5d55aed80328a65dd75aac99065.jpeg" fit="cover"></el-image>
      </div>
      <div>
        <el-image style="width: 100%; height: 100%"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover"></el-image>
      </div>
      <div>
        <el-image style="width: 100%; height: 100%"
          src="https://bt.nmxgzs.cn/upload/2022-05-13/fe3ce5d55aed80328a65dd75aac99065.jpeg" fit="cover"></el-image>
      </div>
    </a-carousel>

  </div>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.png'
import { LeftCircleOutlined, RightCircleOutlined, DownOutlined } from '@ant-design/icons-vue';
import { reactive } from "vue";
import { useRouter } from 'vue-router'
import { onMounted } from "vue";
import useDemoStore from '@/store/modules/demo'
import { storeToRefs } from 'pinia'
import { message } from "ant-design-vue";

const demoStore = useDemoStore()
const router = useRouter()


const data = reactive({
  routers: [
    {
      title: '博客',
      path: '/front/home'
    }
  ],
  active: ''
})

const click = (val: any) => {
  if (val.key === '2') {
    demoStore.clearToken()
    message.success('成功')
    router.push('/login')
  }
  if (val.key === '1') {
    router.push('/home')
  }
}

const openMenu = (path: string) => {
  router.push(path)
}
const login = () => {
  router.push('/login')
}
onMounted(() => {
  data.active = router.currentRoute.value.path
})

</script>

<style lang="less" scoped>
.container_layout {
  line-height: 60px;
  cursor: pointer;

  .box {
    padding: 0 80px;

    .logo {
      display: flex;
      align-items: center;
    }

    .item {
      width: 82px;
      height: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .active {
        color: #0773e7;
      }
    }
  }
}

.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 400px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
  z-index: 1;
}

.ant-carousel :deep(.custom-slick-arrow:before) {
  display: none;
}

.ant-carousel :deep(.custom-slick-arrow:hover) {
  opacity: 0.5;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}
</style>