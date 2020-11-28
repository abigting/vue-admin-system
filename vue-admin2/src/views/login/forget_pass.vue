<template>
  <div class="register-pages">
    <main>
      <div class="flex-between nav-logo-block">
        <img src="../../assets/imgs/black_logo.png" alt="" class="logo">
        <div class="login-link">
          <span @click="navTo('/login')">返回登录</span>
        </div>
      </div>
       <div class="form-block">
         <!-- 找回成功 -->
         <div class="find-success" v-if="isSuccess">
           <div class="title">找回密码</div>
           <div class="title">您已成功设置密码，请使用新密码登录</div>
           <div class="login-btn"  @click="navTo('/login',2)">马上登录</div>
         </div>
         <!-- 找回流程 -->
          <el-form v-else :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="手机号" prop="name" v-if="step===1||step===2">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="短信验证码" prop="name" v-if="step===2">
              <div class="code-block">
                <div class="input-wrap">
                 <el-input v-model="ruleForm.name"></el-input>
                </div>
                <div class="get-code" :class="{'not-allow':count!==60}" @click="getCode">{{count==60?'获取验证码':`${count} s`}}</div>
              </div>
            </el-form-item>
            <el-form-item label="新密码" prop="name" v-if="step===3">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="name" v-if="step===3">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="login-btn" :class="{'not-allowed':checked}" @click="nextStep('ruleForm')">下一步</div>
            </el-form-item>
          </el-form>
       </div>
    </main>
  </div>
</template>

<script>
  export default {
      data() {
        return {
          isSuccess:false,
          step:1,
          count: 60, //倒计时
          timer: null,
          checked:false,
          ruleForm: {
            value1:[],
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
          rules: {
            name: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            region: [
              { required: true, message: '请选择活动区域', trigger: 'change' }
            ],
            date1: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            date2: [
              { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ],
            type: [
              { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ],
            resource: [
              { required: true, message: '请选择活动资源', trigger: 'change' }
            ],
            desc: [
              { required: true, message: '请填写活动形式', trigger: 'blur' }
            ]
          }
        };
      },
      destroyed() {
        clearInterval(this.timer)
      },
      methods: {
        nextStep(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.step ++;
              if(this.step>3){
                this.isSuccess = true;
              }
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        // 获取验证码
        getCode() {
          if (this.count === 60) {
            this.count--
            this.timer = setInterval(() => {
              this.count--
              if (this.count <= 0) {
                clearInterval(this.timer)
                this.count = 60
              }
            }, 1000)
          }
        },
        navTo(path,type){
          this.$router.push({
            path:path,
            query:{
              active:type
            }
          })
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style lang="scss">
  .find-success{
    .title{
      font-size: 16px;
      font-weight: 400;
      color: #3A3D49;
      text-align: center;
      margin-bottom: 24px;
    }
  }
  .register-pages{
    padding-top: 58px;
    .el-select,
    .el-date-editor{
      width: 100%;
    }
    .el-input__inner{
      height: 32px;
    }
    .el-form-item{
      position: relative;
    }
    main{
      width: 1200px;
      margin: auto;
    }
    .nav-logo-block{
      margin-bottom: 14px;
      .logo{
        height: 36px;
      }
      .login-link{
        font-size: 14px;
        font-weight: 400;
        color: #61646A;
        span{
          color: #1C69E3;
          padding-left: 4px;
          cursor: pointer;
        }
        span:hover{
          text-decoration: underline;
        }
      }
    }
    .agreement-block{
      .link{
        color: rgba(28, 105, 227, 1);
      }
      .link:hover{
        text-decoration: underline;
      }
    }
    .code-block {
      width: 100%;

      .input-wrap {
        width: 54%;
        overflow: hidden;
        float: left;
      }

      .get-code {
        width: 40%;
        height: 36px;
        float: right;
        background: rgba(44, 109, 236, 1);
        font-size: 14px;
        font-weight: 400;
        color: #FFFFFF;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
      }

      .not-allow {
        background: rgba(44, 109, 236, .6);
      }
    }
    .has-margin-bottom{
      margin-bottom: 40px;
    }
    .form-block{
      background: #fff;
      min-height: 600px;
      padding: 58px 360px 60px 320px;
      .right-status-icon{
        position: absolute;
        right:0;
        top: 0;
        transform: translateX(100%);
        padding-left: 6px;
        i{
          font-size: 16px;
        }
        .el-icon-success{
          color: #4BDD8D;
        }
        .el-icon-error{
          color: #E96B51;
        }
      }
      .login-btn{
        width:100%;
        height: 44px;
        text-align: center;
        line-height: 44px;
        background:rgba(44, 109, 236, 1);
        box-shadow: 0px 1px 4px 0px rgba(47, 169, 237, 0.38);
        border-radius: 1px;
        font-size: 14px;
        font-weight: 400;
        color: #FFFFFF;
        cursor: pointer;
      }
      .not-allowed{
        background:rgba(44, 109, 236, .38);
      }
    }
  }
</style>
