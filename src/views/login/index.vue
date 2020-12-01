<template>
  <div class="login-container">
    <el-card :body-style="{ padding: '20px' }" shadow="hover" class="login-form">
      <div slot="header" class="login-form-header">
        <span>Onz7 建站平台</span>
      </div>
      <!-- card body -->
      <el-form class="login-form-body" :model="loginForm" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入帐号" maxlength="16"
            @keyup.enter.native="loginSubmit"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码" maxlength="16"
            @keyup.enter.native="loginSubmit" show-password>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-form-body-submit" type="primary" :loading="loading" @click="loginSubmit">登录
          </el-button>
        </el-form-item>
        <el-checkbox class="login-form-body-remember" v-model="remember">记住我</el-checkbox>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '帐号不能为空', trigger: 'blur' },
          { min: 5, max: 16, message: '帐号长度为 5 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 5, max: 16, message: '密码长度为 5 到 16 个字符', trigger: 'blur' }
        ]
      },
      remember: false,
      loading: false
    };
  },
  created() {
    this.getLoginStorage();
    console.log('create');
  },
  methods: {
    ...mapActions('user', ['login']),
    /**
     * 登录
     */
    loginSubmit() {
      let data = {
        username: this.loginForm.username,
        password: this.loginForm.password,
        remember: this.remember
      };
      this.login(data);
    },
    getLoginStorage() {
      this.$nextTick(() => {
        this.loginForm.username = localStorage.getItem('onz7_username') || '';
        this.loginForm.password = localStorage.getItem('onz7_password') || '';
        this.remember = localStorage.getItem('onz7_remember') == 1 ? true : false;
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url('~common/styles/variables.less');
.login-container {
  width: 100%;
  min-height: 100%;
  position: relative;
  overflow: hidden;
  background-color: @color-primary;
  background-image: linear-gradient(141deg, #6ce4b0 0%, #1fc8db 51%, @color-primary 75%);
  display: flex;
  align-items: center;
  justify-content: center;

  .login-form {
    width: 420px;
    background-color: rgba(255, 255, 255, 0.6);
    border: none;
    border-radius: 8px;

    /deep/ .el-card__header {
      border: none !important;
    }

    &-header {
      text-align: center;
      font-size: 26px;
      font-weight: bold;
      color: #333333;
    }

    &-body {
      &-submit {
        width: 100%;
      }
      &-remember {
        /deep/ .el-checkbox__label {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
