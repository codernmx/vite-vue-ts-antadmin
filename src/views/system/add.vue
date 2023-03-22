<template>
  <a-modal v-model:visible="visible" title="Basic Modal" width="40%" wrap-class-name="full-modal" @ok="handleOk">

    <a-form ref="formRef" :model="formState" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">

      <a-form-item label="title" name="title" :rules="[{ required: true, message: 'Please input your title!' }]">
        <a-input v-model:value="formState.title" />
      </a-form-item>

      <a-form-item label="icon" name="icon" :rules="[{ required: true, message: 'Please input your icon!' }]">
        <a-input v-model:value="formState.icon" />
      </a-form-item>

      <a-form-item label="path" name="path" :rules="[{ required: true, message: 'Please input your path!' }]">
        <a-input v-model:value="formState.path" />
      </a-form-item>
      <a-form-item label="name" name="name" :rules="[{ required: true, message: 'Please input your name!' }]">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="sort" name="sort" :rules="[{ required: true, message: 'Please input your sort!' }]">
        <a-input v-model:value="formState.sort" />
      </a-form-item>
    </a-form>

  </a-modal>
</template>
<script setup lang="ts">
import { message } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { onMounted, ref, reactive } from 'vue'
import { getMenuList, menuDel, menuAdd } from '@/api/index'
import type { FormInstance } from 'ant-design-vue'
const emits = defineEmits(['submit'])

interface FormState {
  title: string
  icon: string
  path: string
  name: string
  sort: string
}
const visible = ref<boolean>(false)
const formRef = ref<FormInstance>()

const showModal = () => {
  visible.value = true
}

const handleOk = async (e: MouseEvent) => {
  console.log(e)
  // visible.value = false
  try {
    const values = await formRef.value.validateFields()
    console.log('Success:', values)
    emits('submit', formState)
  } catch (errorInfo) {
    console.log('Failed:', errorInfo)
  }
}

const formState = reactive<FormState>({
  title: '',
  icon: '',
  path: '',
  name: '',
  sort: '',
})
const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

defineExpose({
  showModal,
})
</script>
<style scoped lang="less">
</style>
