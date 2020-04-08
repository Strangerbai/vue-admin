<template>
  <div class="social-signup-container">
    <el-form ref="loginForm" class="login-form" autocomplete="on" label-position="left">
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginInfo.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          ref="password"
          v-model="loginInfo.password"
          placeholder="Password"
          name="password"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click="registerUser">注册</el-button>
    </el-form>
  </div>
</template>

<script>
// import openWindow from '@/utils/open-window'
import { setToken } from '../../../utils/auth' // get token from cookie
import { registerUser } from '../../../api/user'

export default {
  name: 'SocialSignin',
  data() {
    return {
      loginInfo: {
        username: '',
        password: ''
      },
      redirect: undefined,
      otherQuery: {},
      loading: false
    }
  },
  methods: {
    registerUser() {
      if (this.loginInfo.password === '' || this.loginInfo.username === '') {
        this.$message({
          message: '参数有误',
          type: 'error'
        })
        return
      }
      var data = {
        'username': this.loginInfo.username,
        'password': this.loginInfo.password
      }
      // eslint-disable-next-line no-undef
      registerUser(data).then(response => {
        if (response.code === '500') {
          this.$message({
            message: '系统错误',
            type: 'fail'
          })
        } else {
          alert(response.data)
          setToken(response.data)
          location.reload()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .social-signup-container {
    margin: 20px 0;
    .sign-btn {
      display: inline-block;
      cursor: pointer;
    }
    .icon {
      color: #fff;
      font-size: 24px;
      margin-top: 8px;
    }
    .wx-svg-container,
    .qq-svg-container {
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      padding-top: 1px;
      border-radius: 4px;
      margin-bottom: 20px;
      margin-right: 5px;
    }
    .wx-svg-container {
      background-color: #24da70;
    }
    .qq-svg-container {
      background-color: #6BA2D6;
      margin-left: 50px;
    }
  }
</style>
