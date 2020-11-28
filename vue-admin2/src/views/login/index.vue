<template>
  <div class="login">
    <div class="systemLogo">
      <img src="@/assets/imgs/loginText.png" alt="" class="logo">
    </div>
    <div class="login-container">
      <img class="cube0" src="@/assets/imgs/cube.png" alt="">
      <img class="cube1" src="@/assets/imgs/cube.png" alt="">
      <img class="cube2" src="@/assets/imgs/cube.png" alt="">
      <img class="cube3" src="@/assets/imgs/cube.png" alt="">
      <div>
        <img class="illustration" src="@/assets/imgs/illustration.png" alt="">
      </div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <h3 class="title">登录</h3>
        <el-form-item prop="username">
          <span class="svg-container">
            <i class="el-icon-message"></i>
          </span>
          <el-input
            v-model="loginForm.username"
            name="username"
            type="text"
            auto-complete="on"
            placeholder="请输入用户名"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <i class="el-icon-lock"></i>
          </span>
          <el-input
            :type="pwdType"
            v-model="loginForm.password"
            name="password"
            auto-complete="on"
            placeholder="请输入密码"
            @keyup.enter="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'"/>
          </span>
        </el-form-item>
        <el-form-item class="checkCode">
          <span class="svg-container">
            <i class="el-icon-document-checked"></i>
          </span>
          <el-input
            v-model="loginForm.imageCode"
            type="text"
            auto-complete="on"
            placeholder="验证码"
            style="width: 60%"
            @keyup.enter="handleLogin"
          />
          <div class="yzmImg" @click="clickImgFN()">
            <img :src="imgBase64" alt="">
          </div>
        </el-form-item>

        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            style="width:100%;"
            @click.native.prevent="handleLogin"
          >登 录
          </el-button>
        </el-form-item>
        <p class="register" @click="register">监督员注册</p>
      </el-form>
    </div>
  </div>
</template>

<script>
  import * as loginApi from "@/api/login";
  import {setCookie, getToken} from '@/utils/common';

  export default {
    name: "Login",
    data() {
      // const validateUsername = (rule, value, callback) => {
      //   if (!isvalidUsername(value)) {
      //     callback(new Error("请输入正确的用户名"));
      //   } else {
      //     callback();
      //   }
      // };
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error("密码不能小于5位"));
        } else {
          callback();
        }
      };
      return {
        imgBase64: '',
        loginForm: {
          username: "123456789",
          password: "123456",
          imageCode: "",
          uuid: "",
        },
        loginRules: {
          username: [
            {required: true, trigger: "blur", message: "请输入用户名",}
          ],
          password: [{required: true, trigger: "blur", validator: validatePass}],
          imageCode: [{required: true, message: "请选择输入验证码", trigger: "blur"}]
        },
        loading: false,
        pwdType: "password",
        redirect: undefined
      };
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect;
        },
        immediate: true
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === "password") {
          this.pwdType = "text";
        } else {
          this.pwdType = "password";
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
            if (valid) {
              loginApi.login(this.loginForm).then(res => {
                if (res) {
                  const {token, userZcVo} = res;
                  const {name, sex, compName} = userZcVo;
                  setCookie('token', token);
                  setCookie('userInfo', {
                    name, sex, compName
                  });
                  this.$router.push({path: "/navigation"});
                }
              }).catch(() => {
                console.log("登录失败");
              });
            }
          }
        );
      },
      async clickImgFN() {

        let s = [];
        let hexDigits = "0123456789abcdef";
        for (let i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "";
        let uuid = s.join("");
        this.loginForm.uuid = uuid;

        const res = await loginApi.createImageCode({uuid: this.loginForm.uuid});
        if (res) {
          const {imageBase64} = res;
          this.imgBase64 = imageBase64;
        }
      },
      register() {
        this.$router.push('/register')
      }
    },
    created() {
      this.clickImgFN();
      let lett = this;
      document.onkeydown = function (e) {
        let key = window.event.keyCode;
        if (key == 13) {
          lett.handleLogin();
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .login {
    height: 100vh;
    width: 100%;
    background: #0043C9;
  }


  .systemLogo {
    text-align: center;
    padding-top: 78px;

    > img {
      width: 722px;
    }
  }

  .yzmImg {
    position: absolute;
    bottom: 0;
    right: -88px;
    width: 80px;
    height: 40px;
    border: 1px solid #cfc3c3;
    cursor: pointer;

    > img {
      width: 78px;
      height: 38px;
    }
  }

  .checkCode {
    position: relative;
    width: 70%;
  }

  .login-container /deep/ .el-input {
    display: inline-block;
    height: 32px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      // color: rgb(83, 78, 78);
      // color: $light_gray;
      height: 32px;

      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset !important;
        -webkit-text-fill-color: rgb(196, 193, 193) !important;
      }
    }
  }

  .login-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 228px);
    /*background: url("../../assets/img/background_2.png") no-repeat;*/
    background-position: center;
    background-size: cover;
    width: 1440px;
    margin: 0 auto;

    .login-form {
      width: 360px;
      height: 340px;
      background-color: #fff;
      max-width: 100%;
      padding: 30px 35px 15px 35px;
      // margin: 120px auto;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: #889aa4;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title {
      font-size: 23px;
      font-weight: 400;
      color: #1680df;
      margin: 0px auto 21px auto;
      text-align: center;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: #889aa4;
      cursor: pointer;
      user-select: none;
    }

    .el-form-item {
      border: 1px solid rgb(207, 195, 195);
      background: white;
      border-radius: 3px;
      margin-bottom: 12px;
    }

    .el-form-item span i {
      font-size: 16px;
    }

    .el-button {
      height: 40px;
    }
  }

  .register {
    color: #585E77;
    font-size: 14px;
    cursor: pointer;
  }

  .illustration {
    width: 585px;
    margin-right: 94px;
  }

  .cube0 {
    position: absolute;
    left: 52px;
    width: 138px;
  }

  .cube1 {
    position: absolute;
    left: 303px;
    width: 82px;
    bottom: 0;
  }

  .cube2 {
    position: absolute;
    top: 112px;
    left: 50%;
    transform: (-50%, -50%);
    width: 101px;
  }

  .cube3 {
    position: absolute;
    bottom: 0;
    right: 100px;
    width: 82px;
  }

  @media screen and (max-width: 1400px) {
    .chatBox {
      .title {
        font-size: 12px;
        padding: 0 4px 4px 16px;
        margin-bottom: 4px;
      }
    }
    .login-container {
      height: calc(100vh - 188px);
    }
  }

</style>
