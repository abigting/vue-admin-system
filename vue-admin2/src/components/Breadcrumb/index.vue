<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span
          v-if="item.redirect==='noredirect'||index==levelList.length-1||index==0" class="no-redirect" :class="{'current-page':index==levelList.length-1}"
        >{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)" class="pre-page">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from "path-to-regexp";

export default {
  data() {
    return {
      levelList: null
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      if (this.$route.query && this.$route.query.isSave == "true") {
        let matched = this.$route.matched.filter(item => item.name);
        let levelListTemp = matched.filter(
          item => item.meta && item.meta.title && item.meta.breadcrumb !== false
        );
        this.levelList = [...this.levelList];
        this.levelList.push(levelListTemp[1]);
        return;
      }
      let matched = this.$route.matched.filter(item => item.name);

      // const first = matched[0]
      // if (first && first.name !== 'dashboard') {
      //   matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
      // }

      this.levelList = matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route;
      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(item) {
      const { redirect, path,parent } = item;
      if (redirect) {
        this.$router.push(redirect);
      }
	  if(parent!=undefined){
		  this.$router.push(this.pathCompile(path));
	  }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 54px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  .el-breadcrumb__inner a {
    font-weight: 500;
  }
  .current-page{
	color: #3A3D49;
  }
  .pre-page{
	color: #97a8be;
  }
  .pre-page:hover{
	  color: #409EFF;
  }
}
</style>
