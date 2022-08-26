<template>
  <div class="login-container">
    <img class="login-bg" src="../../assets/login/loginBg.svg" />
    <div class="login-box">
      <div class="login-title">
        <p class="small-title" v-if="!changePassword">欢迎使用</p>
        <p class="big-title" v-if="!changePassword">openEuler认证报告生成平台管理</p>
        <p class="change-title big-title" v-if="changePassword">修改密码</p>
      </div>
       <LoginForm v-if="!changePassword "></LoginForm>
       <ChangePassword v-if="changePassword"></ChangePassword>
    </div>
  </div>
</template>

<script>
import ChangePassword from '@/components/login/ChangePassword.vue';
import LoginForm from '@/components/login/LoginForm.vue';
import { mapState } from 'vuex';

export default {
  name: "login",
  components: {
    ChangePassword,
    LoginForm
  },
  data() {
    return {
        isChange: false,
    }
  },

  computed: {
    ...mapState('login', {
        changePassword: 'changePassword'
    })
  },

  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  background: #ebeff6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  width: 100%;
  min-height: 1032px;
  position: relative;
  .login-bg {
    position: absolute;
    top: 408px;
    left: 220px;
  }
  .login-box {
    width: 456px;
    height: 544px;
    background: #fefefe;
    box-shadow: 0 4px 16px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    position: absolute;
    top: 216px;
    right: 144px;
    .login-title {
        margin: 48px 0px 48px 48px;
        .small-title {
        font-size: 12px;
        color: #4E5865;
        font-weight: 400;
        margin: 0;
    }
    .big-title {
        font-family: HarmonyOS_Sans_SC_Bold;
        font-size: 24px;
        color: #000000;
        font-weight: 600;
        margin-top: 8px;
    }
    .change-title {
        margin-top: 16px;
        margin-bottom: 48px;
    }
    }
  }
}
::v-deep .el-button--primary {
    width: 360px;
    height: 48px;
    background: #0077ff;
    border-color: #0077ff;
    border-radius: 2px;
    margin-top: 88px;
    font-size: 16px;
}
::v-deep .el-input {
  width: 360px;
  height: 48px;
}
::v-deep .el-input__inner {
    height: 48px;
    border: 1px solid #c3cedf;
    border-radius: 2px;
    padding: 12px 16px;
    padding-right: 62px;
}
::v-deep .el-input__inner:focus {
    border-color: #0077ff !important;
}
::v-deep .el-form-item {
    margin-bottom: 24px;
}
::v-deep .el-form-item:last-child {
    margin-bottom: 0px;
}

</style>
