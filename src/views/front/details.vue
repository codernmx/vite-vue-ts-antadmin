<template>
  <div class="container">
    <v-md-preview-html :html="data.text" preview-class="vuepress-markdown-body"></v-md-preview-html>
  </div>
</template>

<script setup lang="ts">
import {getArticleDetails} from '@/api/index'
import {reactive,onMounted} from "vue";
import {useRouter,useRoute} from 'vue-router'

const route = useRoute()

const data = reactive({
  text:''
})

const change=(text, html)=>{
  console.log(text, html)
}

onMounted(() => {
  getArticleDetails({id:route.query.id}).then(res=>{
    console.log(res)
    data.text = res.data.content
  })
})

</script>

<style lang="less" scoped>
.container{
  margin: 0 10%;
  min-height: 520px;
}
</style>