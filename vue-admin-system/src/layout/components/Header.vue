<template>
    <div class="header">
<!--        <img src="@/assets/imgs/loginText.png" alt="" class="system-logo">-->
              后台管理系统
        <div class="admin-block">
            <el-dropdown class="avatar-container">
                <div class="avatar-wrapper">
                    <el-avatar :size="30" style="vertical-align: middle">
                        {{userInfo.name?userInfo.name[0]:'A'}}
                    </el-avatar>
                    <span class="admin-name">
            {{userInfo.name?userInfo.name:'admin'}}
          </span>
                    <i class="el-icon-caret-bottom el-icon-arrow-down"/>
                </div>
                <el-dropdown-menu slot="dropdown" class="avatar-menu-wrap">
                    <!--            <el-dropdown-item><span class="fixed-menu-item" @click="handleClick('4')"><i-->
                    <!--              class="iconfont iconshouye blue-text"></i>返回首页</span></el-dropdown-item>-->
                    <el-dropdown-item><span class="fixed-menu-item" @click="handleClick('1')"><i
                            class="iconfont iconbianji blue-text"></i>账号信息</span></el-dropdown-item>
                    <!--                      <el-dropdown-item><span class="fixed-menu-item" @click="handleClick('2')"><i-->
                    <!--                        class="iconfont iconmima blue-text"></i>修改密码</span></el-dropdown-item>-->
                    <el-dropdown-item><span class="fixed-menu-item" @click="handleClick('3')"><i
                            class="iconfont icontuichu blue-text"></i>退出登录</span></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
<!--        <ModifyPassword :modifyPasswordDialog="modifyPasswordDialog" @handCancel="modifyPasswordDialog=false"/>-->
<!--        <AccountInfo :accountInfoVisible="accountInfoVisible" @handCancel="accountInfoVisible=false"/>-->
    </div>
</template>

<script>
    // import ModifyPassword from '../../index/components/modifyPassword'
    // import AccountInfo from '../../index/components/accountInfo'
    import {getUserInfo} from '@/utils/auth'

    export default {
        name: "Header",
        components: {
            // ModifyPassword,
            // AccountInfo
        },
        data() {
            return {
                userInfo: getUserInfo(),
                accountInfoVisible: false,
                modifyPasswordDialog: false
            }
        },
        methods: {
            handleClick(type) {
                switch (type) {
                    case '1':
                        this.accountInfoVisible = true;
                        return;
                    case '2':
                        this.modifyPasswordDialog = true;
                        return;
                    case '3':
                        this.$router.push('/login');
                        // const loading = this.$loading({
                        //   lock: true,
                        //   text: '退出登录中...',
                        //   spinner: 'el-icon-loading',
                        //   background: 'rgba(0, 0, 0, 0.7)'
                        // });
                        // setTimeout(() => {
                        //   loading.close();
                        // }, 1000);
                        // this.$store.dispatch('user/logout').then(res => {
                        //   setTimeout(() => {
                        //     this.$router.push('/login');
                        //     location.reload()
                        //   }, 1000);
                        // });
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

<style lang="scss" scoped>
    .header {
        height: 54px;
        line-height: 54px;
        background: #2E63B7;
        box-shadow: 0 2px 4px 0 #B1C3E5;
        color: #ffffff;
        padding: 0 20px;
        font-size: 20px;
    }

    .system-logo {
        width: 330px;
        vertical-align: middle;
    }

    .admin-block {
        .el-icon-arrow-down {
            font-size: 12px;
            color: #fff;
        }
    }

    .admin-avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 8px;
    }

    .admin-name {
        cursor: pointer;
        color: #fff;
        font-size: 16px;
        padding-right: 10px;
        margin-left: 8px;
    }

    .avatar-container {
        display: inline-block;
        position: absolute;
        right: 20px;
        top: 0;
        line-height: 54px;

        .avatar-wrapper {
            cursor: pointer;
            display: flex;
            align-items: center;
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
