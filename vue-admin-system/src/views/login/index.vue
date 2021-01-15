<template>
    <div class="login-wrapper">
        <div class="system-name">
            F的代码库
            <!--            <img src="@/assets/imgs/loginText.png" alt="" class="logo">-->
        </div>
        <div>
            <el-form
                    class="login-form"
                    ref="loginForm"
                    :model="loginForm"
                    :rules="loginRules"
                    auto-complete="on"
                    label-position="left">
                <h3 class="type-toggle">
               <span :class="{'password-login':true,'is-active':activeType==='password-login'}"
                     @click="activeType = 'password-login'">密码登录</span>
                    <span :class="{'phone-login':true,'is-active':activeType==='phone-login'}"
                          @click="activeType = 'phone-login'">手机号登录</span>
                </h3>
                <el-form-item prop="username">
                    <el-input
                            v-model="loginForm.username"
                            name="username"
                            type="text"
                            auto-complete="on"
                            placeholder="请输入手机号"
                            @keyup.enter="handleLogin"
                    />
                </el-form-item>

                <template v-if="activeType==='password-login'">
                    <el-form-item prop="password">
                        <el-input
                                :type="pwdType"
                                v-model="loginForm.password"
                                name="password"
                                auto-complete="on"
                                placeholder="请输入密码"
                                @keyup.enter="handleLogin"
                        />
                    </el-form-item>
                    <el-form-item class="img-code-input">
                        <el-input
                                v-model="loginForm.imageCode"
                                type="text"
                                auto-complete="on"
                                placeholder="验证码"
                                style="width: 60%"
                                @keyup.enter="handleLogin"
                        />
                        <div class="img-code" @click="clickImgFN()">
                            <img :src="imgBase64" alt="">
                        </div>
                    </el-form-item>
                </template>

                <el-form-item v-if="activeType==='phone-login'">
                    <el-input
                            v-model="loginForm.checkCode"
                            type="text"
                            auto-complete="on"
                            placeholder="验证码"
                            style="width: 60%"
                            @keyup.enter="handleLogin"
                    />
                    <el-button class="dx-code" type="primary" :disabled="count<60" @click="getVerificationCode()">
                        {{count<60?`${count}S后重新获取`:'获取验证码'}}
                    </el-button>
                </el-form-item>

                <el-form-item>
                    <el-button
                            :loading="loading"
                            type="primary"
                            class="submit-btn"
                            @click.native.prevent="handleLogin">
                        登 录
                    </el-button>
                </el-form-item>
                <p @click="register">监督员注册</p>
            </el-form>
        </div>
        <div class="footer">
            浙江创得信息技术有限公司&nbsp;&nbsp;&nbsp;&nbsp;服务电话：0571-85776903
        </div>
    </div>
</template>

<script>
    import * as userApi from "@/api/user";
    import {setCookie} from '@/utils/auth';
    import storage from '@/utils/localStorage'
    import md5 from 'js-md5'

    export default {
        name: "Login",
        data() {
            return {
                imgBase64: '',
                loginForm: {
                    username: "17859865322",
                    // password: "xn123456",
                    clientId: 33000000000
                },
                loginRules: {},
                loading: false,
                pwdType: "password",
                redirect: undefined,
                imgShow: false,
                activeType: 'password-login',
                count: 60
            };
        },
        mounted() {
            this.imgShow = true
        },
        watch: {
            $route: {
                handler: function (route) {
                    this.redirect = route.query && route.query.redirect;
                },
                immediate: true
            },
            activeType: function (newVal, oldVal) {
                if (newVal === 'password-login') {
                    delete this.loginForm['checkCode'];
                } else {
                    delete this.loginForm['uuid'];
                    delete this.loginForm['password'];
                    delete this.loginForm['imageCode'];
                }
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
                const {username, password, imageCode, checkCode} = this.loginForm;
                let req = this.loginForm;
                if (!username) {
                    this.$message.info('请填写账号');
                    return
                }
                if (this.activeType === 'password-login') {
                    if (!password) {
                        this.$message.info('请填写密码');
                        return
                    } else if (!imageCode) {
                        this.$message.info('请填写验证码');
                        return
                    } else {
                        req = {...this.loginForm, password: md5(password)}
                    }
                } else {
                    if (!checkCode) {
                        this.$message.info('请填写短信验证码');
                        return
                    }
                }
                this.loading = true;
                userApi.login(req).then(res => {
                    if (res) {
                        this.loading = false;
                        const {token, userZcVo, menuListVo} = res;
                        const {name, sex, compName, telphone, id, isFirstLogin} = userZcVo;
                        setCookie('token', token);
                        setCookie('userInfo', {
                            name, sex, compName, telphone, userId: id, isFirstLogin
                        });
                        const permission = menuListVo.find(s => s.systemId === 33000000000);
                        if (permission) {
                            const {auths} = permission;
                            storage.set('auths', auths || []);
                        }
                        this.$router.push({path: "/"});
                    } else {
                        this.loading = false;
                    }
                }).catch(() => {
                    this.loading = false;
                    console.log("登录失败");
                });
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

                const res = await userApi.createImageCode({uuid: this.loginForm.uuid});
                if (res) {
                    const {imageBase64} = res;
                    this.imgBase64 = imageBase64;
                }
            },
            register() {
                this.$router.push('/register')
            },
            getVerificationCode() {
                if (this.loginForm.username) {
                    if (this.count < 60) {
                        return
                    }
                    userApi.createTelphonCode({
                        checkType: 1,
                        telphone: this.loginForm.username
                    }).then((res) => {
                        this.timerFn();
                        if (res) {
                            // this.loginForm.checkCode = res;
                            this.$message.success(res)
                        } else {
                            clearInterval(this.timer);
                        }
                    })
                } else {
                    this.$message.info('请输入手机号')
                }
            },
            timerFn() {
                this.timer = setInterval(() => {
                    this.count--;
                    if (this.count <= 0) {
                        clearInterval(this.timer);
                        this.count = 60;
                    }
                }, 1000)
            },
        },
        created() {
            this.clickImgFN();
            let lett = this;
            document.onkeydown = function (e) {
                const {hash} = window.location;
                let key = window.event.keyCode;
                if (key === 13) {
                    if (hash === '#/login') {
                        lett.handleLogin();
                    }
                }
            }
        }
    };
</script>

<style scoped lang="scss">

    .login-wrapper {
        height: 100vh;
        width: 100%;
        background: linear-gradient(270deg, #6592EE 0%, #405DB5 100%);
    }

    .submit-btn {
        width: 100%;
        height: 48px;
    }

    .type-toggle {
        text-align: center;
        color: rgba(0, 0, 0, 0.6);

        .is-active {
            color: rgba(0, 0, 0, 1);
        }
    }

    .system-name {
        text-align: center;
        font-size: 36px;
        color: #ffffff;
        padding: 64px 0;
    }

    .login-form {
        width: 336px;
        background: #ffffff;
        padding: 32px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .login-form /deep/ .el-input__inner {
        height: 40px;
        line-height: 40px;
    }

    .password-login {
        display: inline-block;
        width: 120px;
        cursor: pointer;
    }

    .phone-login {
        display: inline-block;
        width: 120px;
        cursor: pointer;
    }

    .img-code-input {
        position: relative;

    }

    .img-code {
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
        border-radius: 2px;
        border: 1px solid #cfc3c3;
        height: 38px;
    }

    .dx-code {
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
        height: 40px;
    }

    .footer {
        color: white;
        text-align: center;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 24px;
    }

</style>
