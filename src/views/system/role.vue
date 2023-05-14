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
            <a @click="editRole(record)">权限</a>
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


    <a-modal v-model:visible="visible" :title="modelTitle" @ok="submit">
      <a-input placeholder="请输入角色名称" v-model:value="data.form.name"></a-input>
      <a-input placeholder="请输入角色名称" v-model:value="data.form.remarks" style="margin-top: 10px;"></a-input>
    </a-modal>



    <a-modal v-model:visible="authVisible" title="权限" @ok="authSubmit">

      <a-tree v-model:selectedKeys="selectedKeys" v-model:checkedKeys="checkedKeys" default-expand-all checkable
        :height="233" :tree-data="data.treeData" @check="check" :field-names="fieldNames">
        <template #title="{ title, key }">
          <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
          <template v-else>{{ title }}</template>
        </template>
      </a-tree>

    </a-modal>


  </div>
</template>
<script setup lang="ts">

import type { TreeProps } from 'ant-design-vue';
import { message } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { onMounted, ref, reactive } from 'vue'
import { getRoleList, delRole, updateArticle, insertRole, getMenuList, insertRoleMenu } from '@/api/index'
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
  { title: '角色名称', dataIndex: 'name', key: 'name' },
  { title: '备注信息', dataIndex: 'remarks', align: 'center' },
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

const onChange = (pageNumber: number, pageSize) => {
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

const check = (check, e) => {
  console.log(check, e);
  console.log(checkedKeys.value, 'checkedKeys');
}


const authSubmit = () => {
  //这里需要注意下父级id 如何处理
  let menuList = []
  checkedKeys.value.forEach(item => {
    menuList.push({
      roleId: data.row.id,
      menuId: item
    })
  })

  insertRoleMenu({
    menuList,
    roleId: data.row.id
  }).then(res => {
    message.success('成功')
    authVisible.value = false
  })
}


const submit = async () => {
  if (!data.form.name || !data.form.remarks) {
    message.error('请填写内容')
    return false
  }
  if (modelTitle.value == '新增') {
    const res = await insertRole(data.form)
    message.success('成功')
    getList()
  } else {

  }
  visible.value = false
}

const getList = async () => {
  try {
    const res = await getRoleList({ ...data.page, title: data.title })
    data.tableData = res.data.rows || []
    data.total = res.data.count
  } catch (err) {
  }
}
const del = async ({ id }) => {
  const res = await delRole({ id })
  message.success('成功')
  getList()
}

const editRole = (record) => {
  authVisible.value = true
  data.row = record
  checkedKeys.value = record.menuId
  // data.form = Object.assign({}, { id, title, content: inputValue })
  // modelTitle.value = '编辑'
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
  getMenuList().then(res => {
    data.treeData = res.data
  })
})
</script>
<style scoped lang="less"></style>
