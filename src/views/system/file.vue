<template>
  <div>
    <a-input v-model:value="data.title" placeholder="搜索一些啥" style="width:200px" allowClear />
    <a-button type="primary" class="ml-10" @click="getList">搜 索</a-button>
    <a-button type="primary" class="ml-10" @click="openChild">
      <template #icon>
        <plus-outlined />
      </template>
      上传
    </a-button>
    <a-table :columns="columns" :data-source="data.tableData" bordered :pagination="false" rowKey="id" class="top-10">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <div style="display: flex;justify-content: center;">
            <!-- <a @click.stop="editMenu(record)">编辑</a> -->
            <a-popconfirm title="是否确认删除？" ok-text="确定" cancel-text="取消" @confirm="del(record)">
              <a @click.top="">删除</a>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>
    <div class="center top-10">
      <a-pagination v-model:current="current" :show-total="total => `总数 ${total}`" showSizeChanger :total="data.total"
        @change="onChange">
        <template #buildOptionText="props">
          <span>{{ props.value }}条/页</span>
        </template>
      </a-pagination>
    </div>


    <a-modal v-model:visible="visible" title="上传文件" @cancel="getList" @ok="visible = false; getList()">
      <a-upload v-model:file-list="data.fileList" name="file" list-type="picture-card" :show-upload-list="false"
        action="http://localhost:3000/api/upload/file" @change="handleChange">
        <div>
          <plus-outlined></plus-outlined>
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
    </a-modal>
  </div>
</template>
<script setup lang="ts">


import { message } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { onMounted, ref, reactive } from 'vue'
import { getFileList, deleteFile, insertArticle, updateArticle } from '@/api/index'
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';

import { useRouter } from 'vue-router'

const router = useRouter()


const visible = ref<boolean>(false)
const current = ref<number>(1)
const value = ref<string>('')
const modelTitle = ref<string>('新增')
const columns = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '历史名称', dataIndex: 'oldName', align: 'center' },
  { title: '路劲', dataIndex: 'path' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '操作', key: 'action', width: 160, align: 'center' },
]

const data = reactive({
  fileList: [],
  tableData: [],
  page: {
    pageSize: 10,
    pageNum: 1,
  },
  form: {},
  total: 0,
  title: '',
})

const onChange = (pageNumber: number, pageSize) => {
  console.log('Page: ', pageNumber)
  data.page.pageNum = pageNumber
  data.page.pageSize = pageSize
  getList()
}

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === 'uploading') {
    console.log('upload~~');
    return;
  }
  if (info.file.status === 'done') {
    message.success('上传成功~');
  }
  if (info.file.status === 'error') {
    message.error('upload error');
  }
};


const openChild = () => {
  data.form = {}
  modelTitle.value = '新增'
  visible.value = true
}

const getList = async () => {
  try {
    const res = await getFileList({ ...data.page, title: data.title })
    data.tableData = res.data.rows || []
    data.total = res.data.count
  } catch (err) {
  }
}
const del = async ({ id }) => {
  const res = await deleteFile({ id })
  message.success('成功')
  getList()
}

const editMenu = ({ id, title, inputValue }) => {
  data.form = Object.assign({}, { id, title, content: inputValue })
  modelTitle.value = '编辑'
}

const update = async (params) => {
  const res = await updateArticle(params)
  message.success('成功')
  getList()
}

const close = () => {
  visible.value = false
}
onMounted(() => {
  getList()
})
</script>
<style scoped lang="less">
:deep(.ant-upload.ant-upload-select-picture-card) {
  width: 100% !important;
}
</style>
