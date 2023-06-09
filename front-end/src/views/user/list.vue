<!--
 * @Date: 2023-06-06 12:41:48
 * @LastEditTime: 2023-06-14 16:12:40
-->
<template>
  <div>
    <a-input v-model:value="data.name" placeholder="搜索一些啥" style="width:200px" allowClear />
    <a-button type="primary" class="ml-10" @click="getList">搜 索</a-button>
    <a-button type="primary" class="ml-10" @click="openChild">
      <template #icon>
        <plus-outlined />
      </template>
      新增
    </a-button>
    <a-table :columns="columns" :data-source="data.tableData" bordered :pagination="false" rowKey="id" class="top-10">
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'avatar'">
          <a-avatar :src="record.avatar" />
        </template>
        <template v-if="column.key === 'action'">
          <div style="display: flex;justify-content:space-between;">
            <a @click="editRole(record)">分配角色</a>
            <a @click="updateUserStatus(record)">{{ record.status == 0 ? '停用' : '启用' }}</a>
            <a-popconfirm title="是否确认删除？" ok-text="确定" cancel-text="取消" @confirm="del(record)">
              <a @click.top="">删除</a>
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
      <div style="width: 200px;margin: 0 auto">
        <a-image width="100%" src="https://bt.nmxgzs.cn/api/getCode" :preview="false" />
        <div class="center top20">微信扫码即可自动注册用户~</div>
      </div>
    </a-modal>

    <a-modal v-model:visible="authVisible" title="设置角色权限" @ok="updateUserRoleOk">
      <a-select ref="select" v-model:value="value" style="width: 100%">
        <a-select-option :value="item.id" v-for="item in data.roleAll">{{ item.name }}</a-select-option>
      </a-select>
    </a-modal>
  </div>
</template>
<script setup lang="ts">

import { message } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { onMounted, ref, reactive } from 'vue'
import { getUserList, deleteUser, updateUser, insertUser, getRoleListAll, updateUserRole, getRoleIdByUserId } from '@/api/index'


const visible = ref<boolean>(false)
const authVisible = ref<boolean>(false)
const current = ref<number>(1)
const value = ref<string>('')
const modelTitle = ref<string>('新增')

const checkedKeys = ref<string[]>([]);

interface Column {
  title: string;
  align?: string;
  width?: number;
  customRender?: (data: { index: number }) => string;
  dataIndex?: string;
  key?: string;
}

interface Data {
  tableData: any[];
  page: {
    pageSize: number;
    pageNum: number;
  };
  row: any;
  treeData: any[];
  form: {
    name?: string,
    remarks?: string
  };
  total: number;
  title: string;
  roleAll: any[];
  name: string
}
interface DeleteParams {
  id: string;
}
interface updateUserParams {
  id: string
  status: number
}

const columns: Column[] = [
  {
    title: '序号',
    align: "center",
    width: 80,
    customRender: ({ index }) => {
      return `${index + 1}`;
    }
  },
  { title: '头像', dataIndex: 'avatar', key: 'avatar' },
  { title: '用户名', dataIndex: 'name' },
  { title: 'openId', dataIndex: 'openId' },
  { title: '邮箱', dataIndex: 'email' },
  { title: '累计登录次数', dataIndex: 'loginNum' },
  { title: '最近操作时间', dataIndex: 'updateTime' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '操作', key: 'action', width: 160, align: 'center' },
]

const data: Data = reactive({
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
  roleAll: [],//所有角色
  name: ''
})


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

const updateUserRoleOk = async () => {
  updateUserRole({
    userId: data.row.id,
    roleId: value.value
  }).then(res => {
    message.success(res.data)
    authVisible.value = false
  })
}


const submit = async () => {
  visible.value = false
  return false
  if (!data.form.name || !data.form.remarks) {
    message.error('请填写内容')
    return false
  }
  if (modelTitle.value == '新增') {
    const res = await insertUser(data.form)
    message.success('成功')
    getList()
  } else {

  }
  visible.value = false
}

const getList = async () => {
  try {
    const res = await getUserList({ ...data.page, name: data.name })
    data.tableData = res.data.rows || []
    data.total = res.data.count
  } catch (err) {
  }
}
const getRoleAll = async () => {
  try {
    const res = await getRoleListAll()
    data.roleAll = res.data || []
  } catch (err) {
  }
}

const del = async ({ id }: DeleteParams) => {
  const res = await deleteUser({ id })
  message.success('成功')
  getList()
}

const editRole = async (record: any) => {
  authVisible.value = true
  data.row = record
  checkedKeys.value = record.menuId
  const res = await getRoleIdByUserId({ userId: record.id })
  value.value = res.data ? res.data.roleId : ''
  // data.form = Object.assign({}, { id, title, content: inputValue })
  // modelTitle.value = '编辑'
}

const updateUserStatus = (row: any) => {
  update({ id: row.id, status: row.status == 0 ? 1 : 0 })
}

const update = async (params: updateUserParams) => {
  const res = await updateUser(params)
  message.success('成功')
  getList()
}

onMounted(() => {
  getList()
  getRoleAll()
})
</script>
<style scoped lang="less"></style>
  