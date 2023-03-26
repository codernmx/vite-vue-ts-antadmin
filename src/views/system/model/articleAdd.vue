<template>
  <a-modal okText="提交" cancelText="取消" v-model:visible="visible" :title="props.title" width="60%" wrap-class-name="full-modal" @ok="handleOk"
      @cancel="cancel">
    <a-form labelAlign="left" ref="formRef" :model="formState" name="basic" :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="文章标题" name="title" :rules="[{ required: true, message: 'Please input your title!' }]">
        <a-input v-model:value="formState.title"/>
      </a-form-item>
      <a-form-item label="内容" name="content" :rules="[{ required: true, message: 'Please input your content!' }]">
        <v-md-editor v-model="formState.content" height="400px" @change="change" @upload-image="handleUploadImage" :disabled-menus="[]"></v-md-editor>
      </a-form-item>
      <!--<a-form-item label="菜单路径" name="path" :rules="[{ required: true, message: 'Please input your path!' }]">-->
      <!--  <a-input v-model:value="formState.path"/>-->
      <!--</a-form-item>-->
      <!--<a-form-item label="菜单name" name="name" :rules="[{ required: true, message: 'Please input your name!' }]">-->
      <!--  <a-input v-model:value="formState.name"/>-->
      <!--</a-form-item>-->
      <!--<a-form-item label="菜单排序" name="sort" :rules="[{ required: true, message: 'Please input your sort!' }]">-->
      <!--  <a-input v-model:value="formState.sort"/>-->
      <!--</a-form-item>-->
    </a-form>
  </a-modal>
</template>
<script setup lang="ts">
import {message} from 'ant-design-vue'
import axios from 'axios'
import {PlusOutlined} from '@ant-design/icons-vue'
import {onMounted, ref, reactive, watch} from 'vue'
import type {FormInstance} from 'ant-design-vue'
import useDemoStore from '@/store/modules/demo'
import {storeToRefs} from 'pinia'

const demoStore = useDemoStore()


const emits = defineEmits(['submit'])

interface FormState {
  title: string
  content: string
  inputValue: string
}

interface PropsType {
  form: Object,
  title: String
}

const props = defineProps<PropsType>()

let formState = reactive<FormState>({
  title: props.form?.title || "",
  content: props.form?.content || "",
  inputValue: props.form?.inputValue || "",
})
const visible = ref<boolean>(true)
const content = ref<string>('')
const formRef = ref<FormInstance>()

const changeModel = () => {
  visible.value = !visible.value
}
const cancel = () => {
  emits('close')
}
const change = (text, html) => {
  formState.inputValue = text
  content.value = html
}
const handleUploadImage = (event, insertImage, files) => {
  // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
  console.log(files);
  const file = files[0];
  // 在这里进行一系列的校验
  const formData = new FormData();
  formData.append("file", file);
  axios.post('http://localhost:3000/api/upload/file', formData, {
    'Content-type': 'multipart/form-data'
  }).then(res => {
    console.log(res)
    // 上传成功后的处理
    insertImage({
      url:res.data.url,
      desc: file.name,
      width: 'auto',
      height: 'auto',
    });

  }, err => {
    // 出现错误时的处理
  })
  // 此处只做示例

}
const handleOk = async (e: MouseEvent) => {
  try {
    const values = await formRef.value.validateFields()
    emits('submit', {userId: demoStore.data.userInfo.id, id: props.form?.id, ...formState, content: content.value})
  } catch (errorInfo) {
    console.log(errorInfo);
    message.error('请填写完整信息')
  }
}

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
