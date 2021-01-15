<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu :default-active="activePath"
             :collapse="isCollapse"
             :background-color="variables.menuBg"
             :text-color="variables.menuText"
             :active-text-color="variables.menuActiveText" :collapse-transition="false" mode="vertical">
<!--      <div class="menu-logo">-->
<!--        后台管理系统-->
<!--        <img src="@/assets/imgs/logo-text.png" alt="">-->
<!--      </div>-->
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import {  mapGetters } from 'vuex'
  import variables from '@/styles/variables.scss'
  import SidebarItem from './SidebarItem'

  export default {
    data() {
      return {
        activePath: '',
      }
    },
    components: {
      SidebarItem
    },
    watch: {
      $route(to, from) {
        const length = this.$route.matched.length;
        if (length < 3) {
          this.activePath = this.$route.matched[length - 1].path || '';
        } else {
          this.activePath = this.$route.matched[1].path || ''; //因为第三级不在菜单里 只能选中第二级
        }
        if (this.$route.meta.parentPath) {
          this.activePath = this.$route.meta.parentPath; //左侧菜单没有展开项的 只能选中第一级
        }
      }
    },
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
      routes() {
        return this.$router.options.routes
      },
      variables() {
        return variables
      },
      isCollapse() {
        return !this.sidebar.opened
      },
    },
    created() {
      let length = this.$route.matched.length;
      if (length < 3) {
        this.activePath = this.$route.matched[length - 1].path || '';
      } else {
        this.activePath = this.$route.matched[1].path || ''; //因为第三级不在菜单里 只能选中它的上一级
      }
      if (this.$route.meta.parentPath) {
        try {
          const path = this.$route.meta.parentPath;
          this.activePath = path || ''; //左侧菜单没有展开项 只能选中第一级或者它的上一级
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>
<style lang="scss">
  .menu-logo {
    height: 54px;
    text-align: center;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 180px;
    }
  }
  .hideSidebar{
    .menu-logo{
      display: none;
    }
  }
</style>
