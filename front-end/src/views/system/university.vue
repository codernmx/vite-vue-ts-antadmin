<template>
  <div>
    <a-input v-model:value="data.title" placeholder="搜索一些啥" style="width:200px" allowClear />
    <a-button type="primary" class="ml-10" @click="getList">搜 索</a-button>
    <a-button type="primary" class="ml-10" @click="openChild">
      <template #icon>
        <plus-outlined />
      </template>
      新增
    </a-button>
    <a-table :columns="columns" :data-source="data.tableData" bordered :pagination="false" rowKey="id" class="top-10">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <div style="display: flex;justify-content:space-between;">
            <a @click="downLoad(record)">下载</a>
            <!--<a @click="editRole(record)">编辑</a>-->
            <a-popconfirm title="是否确认删除？" ok-text="确定" cancel-text="取消" @confirm="del(record)">
              <a @click.top="" v-if="!record.deleteTime">设置不展示</a>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>


    <div class="center top-10">
      <a-pagination v-model:current="current" :show-total="(total: any) => `总数 ${total}`" showSizeChanger
        :total="data.total" @change="onChange">
        <template #buildOptionText="props">
          <span>{{ props.value }}条/页</span>
        </template>
      </a-pagination>
    </div>


    <a-modal v-model:visible="visible" :title="modelTitle" @ok="submit">
      <a-input placeholder="请输入收集项目名称" v-model:value="data.form.name"></a-input>
      <a-input placeholder="请输入备注信息" v-model:value="data.form.remarks" style="margin-top: 10px;"></a-input>
    </a-modal>



  </div>
</template>
<script setup lang="ts">

import type { TreeProps } from 'ant-design-vue';
import { message } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { onMounted, ref, reactive } from 'vue'
import { getGatherList, delGather, getCompressingFile, insertGather, updateRole } from '@/api/index'
import useDemoStore from '@/store/modules/demo'

import { useRouter } from 'vue-router'

const router = useRouter()

const headers = {
  token: useDemoStore().data.token
}
const visible = ref<boolean>(false)
const authVisible = ref<boolean>(false)
const current = ref<number>(1)
const value = ref<string>('')
const modelTitle = ref<string>('新增')


const selectedKeys = ref<string[]>([]);
const checkedKeys = ref<string[]>([]);


const columns = [
  { title: '收集项目名称', dataIndex: 'name', key: 'name' },
  { title: '备注信息', dataIndex: 'remarks' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '操作', key: 'action', width: 160, align: 'center' },
]

const data = reactive({
  tableData: [],
  page: {
    pageSize: 10,
    pageNum: 1,
  },
  row: {},//行对象
  treeData: [],
  form: {},
  total: 0,
  title: '',
})


const fieldNames: TreeProps['fieldNames'] = {
  children: 'children',
  title: 'title',
  key: 'id'
};

const onChange = (pageNumber: number, pageSize: number) => {
  console.log('Page: ', pageNumber)
  data.page.pageNum = pageNumber
  data.page.pageSize = pageSize
  getList()
}


const openChild = () => {
  data.form = {}
  modelTitle.value = '新增'
  visible.value = true
}

const check = (check: any, e: any) => {
  console.log(check, e);
  console.log(checkedKeys.value, 'checkedKeys');
}



const submit = async () => {
  if (!data.form.name || !data.form.remarks) {
    message.error('请完整填写内容~')
    return false
  }
  if (modelTitle.value == '新增') {
    const res = await insertGather(data.form)
    message.success(res.data)
    getList()
  } else {
    const res = await updateRole(data.form)
    message.success('成功')
    getList()
  }
  visible.value = false
}

const getList = async () => {
  try {
    const res = await getGatherList({ ...data.page, title: data.title, all: '1' })
    data.tableData = res.data.rows || []
    data.total = res.data.count
  } catch (err) {
  }
}
const del = async ({ id }) => {
  const res = await delGather({ id })
  message.success('成功')
  getList()
}

const downLoad = async (record) => {
  console.log(record);
  const res = await getCompressingFile({ folderName: record.name })
  window.open(res.data)
}
const editRole = ({ id, name, remarks }) => {
  visible.value = true
  data.form = Object.assign({}, { id, name, remarks })
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
<style scoped lang="less"></style>
