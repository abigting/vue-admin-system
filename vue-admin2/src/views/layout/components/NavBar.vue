<template>
  <div class="navbar-pages">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />
    <breadcrumb />
    <div class="admin-block">
      <el-dropdown class="avatar-container">
        <div class="avatar-wrapper">
<!--          <img src="../../../assets/imgs/admin.png" class="admin-avatar" alt="">-->
          <span class="admin-name">{{userInfo.accountName}} admin</span>
          <i class="el-icon-caret-bottom el-icon-arrow-down" />
        </div>
        <el-dropdown-menu slot="dropdown" class="avatar-menu-wrap">
          <el-dropdown-item>
            <span class="fixed-menu-item" @click="dialogVisible = true">个人信息</span>
          </el-dropdown-item>
          <el-dropdown-item class="login-out-item">
            <span class="fixed-menu-item" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="个人信息" :visible.sync="dialogVisible" width="700px" :close-on-click-modal="isFirstLogin!=='1'"
      :show-close="isFirstLogin==='0'" @close="dialogClose">
      <div v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.4)">
        <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="100px" class="demo-userInfo">
          <div>
            <div class="title-block">基本信息</div>
            <el-form-item label="用户名：" prop="accountName">
              <el-input v-model="userInfo.accountName" maxlength="8"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="userName">
              <el-input v-model="userInfo.userName" maxlength="4"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="phone">
              <el-input v-model="userInfo.phone" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="身份证号：" prop="userCardNo">
              <el-input v-model="userInfo.userCardNo" maxlength="18"></el-input>
            </el-form-item>
          </div>
          <div>
            <div class="title-block">密码信息</div>
            <el-form-item label="当前密码：" prop="oldpassword" v-if="isFirstLogin==='0'">
              <el-input v-model="userInfo.oldpassword" type="text"></el-input>
            </el-form-item>
            <el-form-item label="新密码：" prop="password">
              <el-input v-model="userInfo.password" minlength="6" type="text"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码：" prop="repassword">
              <el-input v-model="userInfo.repassword" minlength="6" type="text"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" v-if="isFirstLogin==='0'">取 消</el-button>
          <el-button type="primary" @click="submitForm('userInfo')">保 存</el-button>
        </div>
      </div>
    </el-dialog>
    <div class="loginout-cover" v-if="loginOut" v-loading="true" element-loading-text="退出中" element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.2)">
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import {
    getUserInfo,
    removeToken,
    setUserInfo,
    removeUserInfo
  } from '@/utils/auth';
  // import {
  //   updateUser
  // } from "@/api/user";
  import {
    resetRouter
  } from '@/router';
  import md5 from 'js-md5'; //md5加密
  // import Screenfull from '@/components/Screenfull'
  export default {
    data() {
      var checkPhone = (rule, value, callback) => {
        if (value === "") {
          callback(new Error('请输入手机号码'));
        } else if (!(/^1[34578]\d{9}$/.test(Number(value)))) {
          callback(new Error('手机号码不规范'));
        } else {
          callback();
        }
      };
      var checkId = (rule, value, callback) => {
        if (value === "") {
          callback(new Error('请输入身份证号码'));
        } else if (value.length != 18) {
          callback(new Error('身份证号码应为18位'));
        } else {
          callback();
        }
      };
      var checkPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else if (value.length < 6) {
          callback(new Error('请至少输入6位密码'));
        } else {
          if (this.userInfo.repassword !== '') {
            this.$refs.userInfo.validateField('repassword');
          }
          callback();
        }
      };
      var checkRepass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value.length < 6) {
          callback(new Error('请至少输入6位密码'));
        } else if (value !== this.userInfo.password) {
          callback(new Error('两次密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        loading: false,
        loginOut: false,
        dialogVisible: false,
        isFirstLogin: "0", //是否首次登陆(未更改过密码)  1是 0否
        userInfo: {
          accountName: "",
          userName: "",
          phone: "",
          userCardNo: "",
          oldpassword: "",
          password: "",
          repassword: "",
          flag: "1", //1为是[需要当前密码]，0为否[不需要当前密码]
        },
        rules: {
          accountName: [{
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }],
          userName: [{
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }],
          phone: [{
            validator: checkPhone,
            trigger: "blur"
          }],
          userCardNo: [{
            validator: checkId,
            trigger: "blur"
          }],
          oldpassword: [{
            required: true,
            message: "请输入当前密码",
            trigger: "blur"
          }],
          password: [{
            trigger: "blur",
            validator: checkPass
          }],
          repassword: [{
            trigger: "blur",
            validator: checkRepass
          }]
        }
      };
    },
    created() {
      // const userInfo = getUserInfo()||{};
      // this.isFirstLogin = userInfo.isFirstLogin || "0";
      // if(userInfo.isFirstLogin==='1'){
      //   this.dialogVisible = true;
      //   this.userInfo.flag = "0"
      // }
      // Object.assign(this.userInfo, userInfo);
    },
    components: {
      Breadcrumb,
      Hamburger,
      // Screenfull
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
      dialogClose() {
        this.$refs["userInfo"].resetFields();
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.loading = true;
            let obj = {
              accountName: this.userInfo.accountName,
              flag: this.userInfo.flag,
              oldpassword: md5(this.userInfo.oldpassword),
              password: md5(this.userInfo.password),
              repassword: md5(this.userInfo.repassword),
              phone: this.userInfo.phone,
              userCardNo: this.userInfo.userCardNo,
              userName: this.userInfo.userName
            }
            const typeText = this.isFirstLogin === "0" ? "修改成功" : "保存成功";
            updateUser(obj).then(res => {
              this.loading = false;
              if (res.success) {
                this.$message({
                  message: typeText,
                  type: "success"
                });
                this.isFirstLogin = "0";
                this.userInfo.flag === "1" ? "0" : "1";
                this.userInfo.password = "";
                this.userInfo.repassword = "";
                this.userInfo.oldpassword = "";
                this.dialogVisible = false;
              }
            }).catch(err => {
              this.loading = false;
            })
          } else {
            console.log("error submit!!");
            return false;
          }
        });
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
    height: 54px;
    line-height: 54px;
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    position: relative;
    .el-input__inner {
      height: 34px!important;
      line-height: 34px!important;
    }

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
      line-height: 60px;
      height: 54px;
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
    .admin-name{
      cursor: pointer;
      color: #333;
      font-size: 16px;
      padding-right: 10px;
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

    .dialog-footer {
      padding: 10px 0;
      text-align: right;
    }
  }
  .avatar-menu-wrap{
    padding: 2px !important;
    li{
      border-radius: 14px;
      background: transparent!important;
    }
    .fixed-menu-item {
      display: block;
      font-size: 14px;
      padding: 4px 0;
      text-align: center;
      width: 120px;
      box-sizing: border-box;
      overflow: hidden;
      transition: all .1s linear;
      white-space: nowrap;
    }
    .el-dropdown-menu--mini{
      padding: 0!important;
    }
    .fixed-menu-item:hover {
      font-size: 18px;
      font-weight: 600;
    }
    .login-out-item:hover {
      color: #F56C6C!important;
    }
  }
</style>
