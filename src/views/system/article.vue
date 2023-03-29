<template>
  <div>
    <a-input v-model:value="data.title" placeholder="搜索一些啥" style="width:200px" allowClear/>
    <a-button type="primary" class="ml-10" @click="getList">搜 索</a-button>
    <a-button type="primary" class="ml-10" @click="openChild">
      <template #icon>
        <plus-outlined/>
      </template>
      新增
    </a-button>
    <a-table :columns="columns" :data-source="data.tabelData" bordered :pagination="false" rowKey="id" class="top-10">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'title'">
          <div style="color:#1890ff" @click="rowClick(record)">
            {{ record.title }}
          </div>
        </template>
        <template v-if="column.key === 'action'">
          <div style="display: flex;justify-content: space-between;">
            <a @click.stop="editMenu(record)">编辑</a>
            <a-popconfirm title="是否确认删除？" ok-text="确定" cancel-text="取消" @confirm="del(record)">
              <a @click.top="">删除</a>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>
    <div class="center top-10">
      <a-pagination v-model:current="current" :show-total="total => `总数 ${total}`" showSizeChanger
          :total="data.total" @change="onChange">
        <template #buildOptionText="props">
          <span>{{ props.value }}条/页</span>
        </template>
      </a-pagination>
    </div>
    <add-edit ref="addRef" :title="modelTitle" @submit="submit" :form="data.form" v-if="visible" @close="close"/>
  </div>

</template>
<script setup lang="ts">


import {message} from 'ant-design-vue'
import {PlusOutlined} from '@ant-design/icons-vue'
import {onMounted, ref, reactive} from 'vue'
import {getArticleList, deleteArticle, insertArticle, updateArticle} from '@/api/index'
import addEdit from './model/articleAdd.vue'
import {useRouter} from 'vue-router'

const router = useRouter()

const addRef = ref()
const visible = ref<boolean>(false)
const current = ref<number>(1)
const value = ref<string>('')
const modelTitle = ref<string>('新增')
const columns = [
  {title: '文章标题', dataIndex: 'title', key: 'title'},
  {title: '浏览量', dataIndex: 'views',align: 'center'},
  {title: '收藏量', dataIndex: 'path'},
  {title: '发布时间', dataIndex: 'createTime'},
  {title: '操作', key: 'action', width: 160, align: 'center'},
]

const data = reactive({
  tabelData: [],
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


const rowClick = (record) => {
  router.push({
    path: '/front/details',
    query: {id: record.id}
  })
}

const openChild = () => {
  data.form = {}
  modelTitle.value = '新增'
  visible.value = true
}

const getList = async () => {
  try {
    const res = await getArticleList({...data.page, title: data.title})
    data.tabelData = res.data.rows || []
    data.total = res.data.count
  } catch (err) {
  }
}
const del = async ({id}) => {
  const res = await deleteArticle({id})
  message.success('成功')
  getList()
}

const editMenu = ({id, title, inputValue}) => {
  data.form = Object.assign({}, {id, title, content: inputValue})
  modelTitle.value = '编辑'
  visible.value = true
}
const add = async (params) => {
  const res = await insertArticle(params)
  close()
  message.success('成功')
  getList()
}
const submit = (val) => {
  console.log(val)
  if (val.id) {
    update(val)
  } else {
    add(val)
  }
}

const update = async (params) => {
  const res = await updateArticle(params)
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
