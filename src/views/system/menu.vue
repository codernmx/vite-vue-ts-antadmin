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
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <div style="display: flex;justify-content: space-between;">
            <a @click="addChildren(record)">新增</a>
            <a @click="editMenu(record)">编辑</a>
            <a-popconfirm title="是否确认删除？" ok-text="Yes" cancel-text="No" @confirm="del(record)">
              <a>删除</a>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>
    <div class="center top-10">
      <a-pagination v-model:current="current" :show-total="total => `总数 ${total}`" showSizeChanger
        :total="data.tabelData.length" @change="onChange">
        <template #buildOptionText="props">
          <span>{{ props.value }}条/页</span>
        </template>
      </a-pagination>
    </div>
    <add-edit ref="addRef" :title="modelTitle" @submit="submit" :form="data.form" v-if="visible" @close="close" />
  </div>

</template>
<script setup lang="ts">
import useDemoStore from '@/store/modules/demo'
import { storeToRefs } from 'pinia'





import { message } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { onMounted, ref, reactive } from 'vue'
import { getMenuList, menuDel, menuAdd, updateApi } from '@/api/index'
import addEdit from './add.vue'

const demoStore = useDemoStore()
const { show } = storeToRefs(demoStore)


console.log(storeToRefs(demoStore),'pppppppppppp');

const addRef = ref()
const visible = ref<boolean>(false)
const current = ref<number>(1)
const value = ref<string>('')
const modelTitle = ref<string>('新增')
const columns = [
  { title: '菜单名称', dataIndex: 'title' },
  { title: '菜单图标', dataIndex: 'icon' },
  { title: '菜单路径', dataIndex: 'path' },
  { title: '菜单name', dataIndex: 'name' },
  { title: '操作', key: 'action', width: 160, align: 'center' },
]

let data = reactive({
  tabelData: [],
  form: {}
})

const onChange = (pageNumber: number) => {
  console.log('Page: ', pageNumber)
}
const openChild = () => {
  data.form = {}
  modelTitle.value = '新增根节点'
  visible.value = true
}

const getList = async () => {
  try {
    const res = await getMenuList()
    data.tabelData = res.data || []
  } catch (err) { }
}
const del = async ({ id }) => {
  const res = await menuDel({ id })
  message.success('成功')
  getList()
}
const addChildren = ({ icon, id, title, name, sort, path }) => {
  data.form = { parId: id }
  modelTitle.value = '新增'
  visible.value = true

}
const editMenu = ({ icon, id, title, name, sort, path }) => {
  data.form = { icon, id, title, name, sort, path }
  modelTitle.value = '编辑'
  visible.value = true

}
const add = async (params) => {
  const res = await menuAdd(params)
  close()
  message.success('成功')
  getList()
}
const submit = (val) => {
  if (val.id) {
    update(val)
  } else {
    add(val)
  }
}

const update = async (params) => {
  const res = await updateApi(params)
  close()
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
