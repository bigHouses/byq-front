<template>
  <div class="container">
    <!--<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">-->

    <!--<div class="title-container">-->
    <!--<h3 class="title">Login Form</h3>-->
    <!--</div>-->

    <!--<el-form-item prop="username">-->
    <!--<span class="svg-container">-->
    <!--<svg-icon icon-class="user" />-->
    <!--</span>-->
    <!--<el-input-->
    <!--ref="username"-->
    <!--v-model="loginForm.username"-->
    <!--placeholder="Username"-->
    <!--name="username"-->
    <!--type="text"-->
    <!--tabindex="1"-->
    <!--auto-complete="on"-->
    <!--/>-->
    <!--</el-form-item>-->

    <!--<el-form-item prop="password">-->
    <!--<span class="svg-container">-->
    <!--<svg-icon icon-class="password" />-->
    <!--</span>-->
    <!--<el-input-->
    <!--:key="passwordType"-->
    <!--ref="password"-->
    <!--v-model="loginForm.password"-->
    <!--:type="passwordType"-->
    <!--placeholder="Password"-->
    <!--name="password"-->
    <!--tabindex="2"-->
    <!--auto-complete="on"-->
    <!--@keyup.enter.native="handleLogin"-->
    <!--/>-->
    <!--<span class="show-pwd" @click="showPwd">-->
    <!--<svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />-->
    <!--</span>-->
    <!--</el-form-item>-->

    <!--<el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>-->

    <!--<div class="tips">-->
    <!--<span style="margin-right:20px;">username: admin</span>-->
    <!--<span> password: any</span>-->
    <!--</div>-->

    <!--</el-form>-->

    <div class="w clear">
      <span class="big-font">变压器绕组变形状态评估系统</span>

      <div class="login-box">
        <div class="login-process">
          <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
                   label-position="left">
            <div class="title">账号登录</div>
            <el-form-item prop="username">
              <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入用户名"
                        @keyup.enter.native="handleLogin"/>
            </el-form-item>
            <el-form-item prop="password">
              <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin"
                        v-model="loginForm.password" autoComplete="on" placeholder="请输入密码"/>
            </el-form-item>
            <!--<el-form-item prop="verifyCode" style="width:220px;">-->
            <!--<el-input name="verifyCode" type="text" v-model="loginForm.verifyCode" autoComplete="on" @keyup.enter.native="handleLogin" placeholder="请输入验证码"/>-->
            <!--</el-form-item>-->
            <!--<span style="position: absolute;margin-left: 230px;margin-top: -58px;">-->
            <!--<img :src="codeImageSrc" @click="updateCode" style="height:36px;"/>-->
            <!--</span>-->
            <el-button type="primary" class="login-btn" style="width:94%;margin-bottom:30px;" :loading="loading"
                       @click.native.prevent="handleLogin">登录
            </el-button>

          </el-form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {validUsername} from '@/utils/validate'

  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
//        if (value.length < 6) {
//          callback(new Error('The password can not be less than 6 digits'))
//        } else {
        callback()
//        }
      }
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePassword}]
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm).then((data) => {
              this.$router.push({
                name: '试验报告查询',
              })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
  @import '../../assets/css/index.css';

  .big-font {
    float: left;
    z-index: 2147483647;
    margin-left: 128px;
    margin-top: 100px;
    font-size: 65px;
    color: #736969;
  }

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */


</style>

