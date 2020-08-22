<template>
  <div class="login-container">
    <el-card :body-style="{ padding: '20px' }" shadow="hover" class="login-form">
      <div slot="header" class="login-form-header">
        <span>欢迎登录Onz7建站平台</span>
      </div>
      <!-- card body -->
      <el-form class="login-form-body" :model="loginForm">
        <el-form-item>
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入帐号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-form-body-submit"
            type="primary"
            :loading="loading"
            @click="loginSubmit"
          >登录</el-button>
        </el-form-item>
        <el-checkbox class="login-form-body-remenber" v-model="remenber">记住我</el-checkbox>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      remenber: false,
      loading: false
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    /**
     * 登录
     */
    loginSubmit() {
      let data = this.loginForm
      this.login(data)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~common/styles/variables.less');
.login-container {
  width: 100%;
  min-height: 100%;
  position: relative;
  overflow: hidden;
  background-color: @color-primary;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-form {
    width: 420px;

    &-header {
      text-align: center;
    }

    &-body {
      &-submit {
        width: 100%;
      }
      &-remenber {
        /deep/ .el-checkbox__label {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
