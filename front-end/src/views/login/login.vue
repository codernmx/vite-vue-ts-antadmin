<!--
 * @Date: 2023-05-12 11:45:13
 * @LastEditTime: 2023-06-15 23:19:02
-->
<template>
  <div class="container">
    <canvas id="canvas" style="display: block"></canvas>
    <div class="form">
      <h1>登 录</h1>
      <a-form :model="form" name="basic" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item label="" name="name" :rules="[{ required: true, message: 'Please input your name!' }]">
          <a-input v-model:value="form.name" />
        </a-form-item>
        <a-form-item label="" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password v-model:value="form.password" />
        </a-form-item>
        <a-button style="width: 100%" type="primary" html-type="submit">登录</a-button>
      </a-form>
    </div>

  </div>
</template>

<script setup lang="ts">
import useDemoStore from '@/store/modules/demo'
import initLoginBg from "./init"
import { onMounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()




const demoStore = useDemoStore()


interface FormState {
  name: string;
  password: string;
}

const form = reactive<FormState>({
  name: '',
  password: '',
});
const onFinish = (values: any) => {
  console.log('Success:', values);
  demoStore.getToken(form).then((res: any) => {
    if (res.data) {
      sessionStorage.setItem('userId', res.data.id)
      router.push('/')
    }
  })
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};


onMounted(() => {
  initLoginBg();
  window.onresize = function () {
    initLoginBg()
  };
})

</script>

<style scoped lang="less">
.container {
  position: relative;
  height: 100vh;

  #canvas {
    position: absolute;
  }

  .form {
    h1 {
      color: white;
      text-align: center;
    }

    position: absolute;
    width: 500px;
    height: 500px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>

