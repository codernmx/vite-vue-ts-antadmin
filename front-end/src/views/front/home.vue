<template>
  <div class="container">
    <div v-for="item in data.tableData" :key="item.id" class="item d-flex" @click="details(item)">
      <div class="img mr-30">
        <el-image :src="fileUrl+'/upload/2023/20230330132196.jpg'" style="width: 326px"></el-image>
      </div>
      <div class="content">
        <h3>{{ item.title }}</h3>
        <span style="color: rgb(102, 102, 102)">{{ item.inputValue.slice(0, 500) }}</span>
        <el-row>
          <el-col :span="14"></el-col>
          <el-col :span="10">
            <div class="d-flex ju-b">
              <h5>作者：{{ item.user.name }}</h5>
              <h5>创建时间：{{ item.createTime }}</h5>
              <h5>浏览量：{{ item.views }}</h5>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArticleList } from '@/api/index'
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import {fileUrl} from '@/config/index'

const router = useRouter()
const data = reactive({
  page: {
    pageSize: 10,
    pageNum: 1,
  },
  tableData: [],
  total: 0,
})

const details = ({ id }) => {
  router.push({
    path: '/front/details',
    query: { id }
  })
}
const getList = async () => {
  try {
    const res = await getArticleList({ ...data.page })
    data.tableData = res.data.rows || []
    data.total = res.data.count
  } catch (err) {
  }
}
onMounted(() => {
  getList()
})
</script>

<style lang="less" scoped>
.container {
  margin: 0 10%;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  //justify-content: space-between;

  .item {
    .img {
      border-radius: 4px;
      overflow: hidden;
      width: 326px;
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    h3,
    h5 {
      text-align: left;
    }

    h3 {
      font-size: 20px;
      font-weight: 600;
    }

    box-shadow: 0px 2px 5px 0px rgb(0 0 0 / 5%);
    border: 1px solid #f5f5f5;
    border-radius: 4px;
    width: 100%;
    min-height: 150px;


    span {
      line-height: 24px !important;
      //overflow: hidden; //超出的文本隐藏
      //text-overflow: ellipsis; //溢出用省略号显示
      //text-align: justify;
    }

    padding: 15px;
    margin-top: 15px;
  }
}
</style>