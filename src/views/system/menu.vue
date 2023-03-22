<template>
  <div>
    <a-input v-model:value="value" placeholder="搜索一些啥" style="width:200px" allowClear />
    <a-button type="primary" class="ml-10">Search</a-button>

    <a-button type="primary" class="ml-10" @click="openChild">
      <template #icon>
        <plus-outlined />
      </template>
      新增
    </a-button>

    <a-table :columns="columns" :data-source="data.tabelData" bordered :pagination="false" rowKey="id" class="top-10">
      <template #bodyCell="{ column,record }">
        <template v-if="column.key === 'action'">
          <a @click="add(record)" v-if="record.children && record.children.length > 0">新增</a>
          <br />
          <a-popconfirm title="是否确认删除？" ok-text="Yes" cancel-text="No" @confirm="del(record)">
            <a>删除</a>
          </a-popconfirm>
        </template>
      </template>
      <!-- <template #expandedRowRender="{ record }">
        <p style="margin: 0">
          {{ record.id }}
        </p>
      </template> -->
    </a-table>
    <div class="center top-10">
      <a-pagination v-model:current="current" :show-total="total=>`总数 ${total}`" showSizeChanger :total="data.tabelData.length" @change="onChange">
        <template #buildOptionText="props">
          <span>{{ props.value }}条/页</span>
        </template>
      </a-pagination>
    </div>
  </div>
  <add-edit ref="addRef" @submit="submit" />
</template>
<script setup lang="ts">
import { message } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { onMounted, ref, reactive } from 'vue'

import { getMenuList, menuDel, menuAdd } from '@/api/index'

import addEdit from './add.vue'

const addRef = ref()

const current = ref<number>(1)
const value = ref<string>('')
const columns = [
  { title: '菜单名称', dataIndex: 'title' },
  { title: '菜单图标', dataIndex: 'icon' },
  { title: '菜单路径', dataIndex: 'path' },
  { title: '菜单name', dataIndex: 'name' },
  { title: '操作', key: 'action' },
]

let data = reactive({
  tabelData: [],
})

const onChange = (pageNumber: number) => {
  console.log('Page: ', pageNumber)
}
const openChild = () => {
  addRef.value.showModal()
}

const getList = async () => {
  try {
    const res = await getMenuList()
    data.tabelData = res.data
  } catch (err) {}
}
const del = async ({ id }) => {
  const res = await menuDel({ id })
  message.success('成功')
  getList()
}
const add = async ({ id }) => {
  const res = await menuAdd({ id })
  message.success('成功')
  getList()
}
const submit = (val) => {
  console.log(val)
}
onMounted(() => {
  getList()
})
</script>
<style scoped lang="less">
</style>
