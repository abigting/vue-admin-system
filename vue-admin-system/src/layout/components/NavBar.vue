<template>
  <div class="navbar-pages">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb/>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import {getUserInfo} from '@/utils/auth'

  export default {
    name: "index",
    components: {
      Breadcrumb,
      Hamburger,
    },
    data() {

      return {
        circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        loading: false,
        loginOut: false,
        dialogVisible: false,
        isFirstLogin: "0", //是否首次登陆(未更改过密码)  1是 0否
        userInfo: getUserInfo(),
        accountInfoVisible: false,
        modifyPasswordDialog: false
      };
    },
    created() {

    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar',
        'device'
      ])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('app/ToggleSideBar')
      },
      handleClick(type) {
        switch (type) {
          case '1':
            this.accountInfoVisible = true;
            return;
          case '2':
            this.modifyPasswordDialog = true;
            return;
          case '3':
            const loading = this.$loading({
              lock: true,
              text: '退出登录中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(() => {
              loading.close();
            }, 1000);
            this.$store.dispatch('user/logout').then(res => {
              setTimeout(() => {
                this.$router.push('/login');
                location.reload()
              }, 1000);
            });
            return;
          case '4':
            this.$router.push("/");
            return;
          default:
            return;
        }
      },
      logout() {
        this.loginOut = true;
        setTimeout(() => {
          this.loginOut = false; //模拟退出
          this.$router.push("/login");
        }, 1500)
        // this.$store.dispatch("user/LogOut").then(res => {
        //   if (res.success) {
        //     setTimeout(() => {
        //       this.loginOut = false;
        //       removeToken();
        //       removeUserInfo();
        //       resetRouter();
        //       if(this.userInfo.isFirstLogin === "1"){
        //         this.userInfo.isFirstLogin = "0";
        //         setUserInfo(this.userInfo)
        //       }
        //       this.$store.commit('user/SET_ROLES', []);
        //       this.$router.push("/login");
        //       location.reload()
        //     }, 500)
        //   } else {
        //     this.loginOut = false;
        //   }
        // }).catch(err => {
        //   this.loginOut = false;
        // });
      }
    }
  }
</script>

<style lang="scss">
  .navbar-pages {
    height: 40px;
    /*line-height: 54px;*/
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    position: relative;

    /*.el-input__inner {*/
    /*  height: 34px !important;*/
    /*  line-height: 34px !important;*/
    /*}*/

    .loginout-cover {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 9999;
      background: rgba(0, 0, 0, .5);
    }

    .el-dialog__body {
      padding-top: 0;
    }

    .hamburger-container {
      line-height: 40px;
      height: 40px;
      float: left;
      padding-left: 10px;
    }

    .menu-item:hover {
      font-size: 16px;
      padding: 10px 20px 5px;
      font-weight: 600;
    }

    .el-popup-parent--hidden {
      padding-right: 0 !important;
    }

    .admin-block {
      .el-icon-arrow-down {
        font-size: 12px;
        color: #3A3D49;
      }
    }

    .title-block {
      padding: 0 8px;
      margin-bottom: 12px;
      font-size: 16px;
      font-weight: 600;
      position: relative;
    }

    .title-block::after {
      content: '';
      display: block;
      width: 4px;
      height: 10px;
      background: #1e8dea;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }

    .admin-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 8px;
    }

    .admin-name {
      cursor: pointer;
      color: #333;
      font-size: 16px;
      padding-right: 10px;
      margin-left: 8px;
    }

    .avatar-container {
      display: inline-block;
      position: absolute;
      right: 20px;
      top: 0;
      line-height: 40px;

      .avatar-wrapper {
        cursor: pointer;
        display: flex;
        align-items: center;
      }
    }

    .dialog-footer {
      padding: 10px 0;
      text-align: right;
    }
  }

  .avatar-menu-wrap {
    padding: 2px !important;

    li {
      border-radius: 14px;
      background: transparent !important;
    }

    .fixed-menu-item {
      display: block;
      font-size: 14px;
      text-align: center;
      box-sizing: border-box;
      overflow: hidden;
      transition: all .1s linear;
      white-space: nowrap;
    }

    /*.el-dropdown-menu--mini {*/
    /*  padding: 0 !important;*/
    /*}*/

    /*.fixed-menu-item:hover {*/
    /*  font-size: 18px;*/
    /*  font-weight: 600;*/
    /*}*/

    /*.login-out-item:hover {*/
    /*  color: #F56C6C !important;*/
    /*}*/
  }
</style>
