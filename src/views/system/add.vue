<template>
  <a-modal okText="提交" cancelText="取消" v-model:visible="visible" :title="props.title" width="60%" wrap-class-name="full-modal" @ok="handleOk"
      @cancel="cancel">
    <a-form labelAlign="left" ref="formRef" :model="formState" name="basic" :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="菜单标题" name="title" :rules="[{ required: true, message: 'Please input your title!' }]">
        <a-input v-model:value="formState.title"/>
      </a-form-item>
      <a-form-item label="菜单图标" name="icon" :rules="[{ required: true, message: 'Please input your icon!' }]">
        <a-input v-model:value="formState.icon"/>
      </a-form-item>
      <a-form-item label="菜单路径" name="path" :rules="[{ required: true, message: 'Please input your path!' }]">
        <a-input v-model:value="formState.path"/>
      </a-form-item>
      <a-form-item label="菜单name" name="name" :rules="[{ required: true, message: 'Please input your name!' }]">
        <a-input v-model:value="formState.name"/>
      </a-form-item>
      <a-form-item label="菜单排序" name="sort" :rules="[{ required: true, message: 'Please input your sort!' }]">
        <a-input v-model:value="formState.sort"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup lang="ts">
import {message} from 'ant-design-vue'
import {PlusOutlined} from '@ant-design/icons-vue'
import {onMounted, ref, reactive, watch} from 'vue'
import {getMenuList, menuDel, menuAdd} from '@/api/index'
import type {FormInstance} from 'ant-design-vue'

const emits = defineEmits(['submit'])

interface FormState {
  title: string
  icon: string
  path: string
  name: string
  sort: string
}

interface PropsType {
  form: Object,
  title: String
}

const props = defineProps<PropsType>()
const visible = ref<boolean>(true)
const formRef = ref<FormInstance>()

const changeModel = () => {
  visible.value = !visible.value
}
const cancel = () => {
  emits('close')
}

const handleOk = async (e: MouseEvent) => {
  try {
    const values = await formRef.value.validateFields()
    emits('submit', {parId: props.form?.parId, id: props.form?.id, ...formState})
  } catch (errorInfo) {
    console.log(errorInfo);
    message.error('请填写完整信息')
  }
}

let formState = reactive<FormState>({
  title: props.form?.title || "",
  name: props.form?.name || "",
  icon: props.form?.icon || "",
  path: props.form?.path || "",
  sort: props.form?.sort || "",
})
const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

defineExpose({
  changeModel,
})
</script>
<style scoped lang="less"></style>
