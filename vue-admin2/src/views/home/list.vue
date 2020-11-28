<template>
  <div class="index-list-pages">
    <span class="el-icon-arrow-left back-btn" @click="$router.back()">返回</span>
    <div class="list-wrap">
      <div class="item over_hidden" v-for="item in 30">
       <span class="data">2020-06-09</span>
       <p class="content" @click="toDetail">%政策法规标题%%政策法规标题%%政策法规标题%%政策法规标题%%政策法规标题%</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    methods:{
      toDetail(){
        this.$router.push('/index/detail')
      }
    }
  }
</script>

<style lang="scss">
  .index-list-pages{
    .back-btn{
      font-size: 20px;
      cursor: pointer;
    }
    .list-wrap{
      .item{
        color: dodgerblue;
        margin: 14px;
        cursor: pointer;
        .data{
          color: #333;
          padding-right: 30px;
        }
        .content{
          display: inline-block;
        }
        .content:hover{
          text-decoration: underline;
        }
      }
    }
  }
</style>
