<template>
  <div class="index-detail-pages">
    <div>
      <span class="el-icon-arrow-left back-btn" @click="$router.back()">返回</span>
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        content:`<h1>我是详情页我是详情页我是详情页我是详情页我是详情页</h1>`
      }
    },
  }
</script>

<style lang="scss">
  .index-detail-pages{
    .back-btn{
      font-size: 20px;
      cursor: pointer;
    }
  }
</style>
