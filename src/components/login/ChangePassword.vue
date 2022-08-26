<template>
  <div class="login-form">
    <el-form :model="formData" :rules="rules" ref="rule" class="demo-ruleForm">
      <el-form-item prop="account">
        <img
          src="../../assets/login/clear.svg"
          v-show="formData.account && clearShow.isClear"
          class="input-clear"
          @mousedown="formData.account = ''"
        />
        <el-input
          type="text"
          v-model="formData.account"
          placeholder="请输入账号"
          @focus="clearShow.isClear = true"
          @blur="clearShow.isClear = false"
        ></el-input>
      </el-form-item>

      <el-form-item prop="oldPassword">
        <img
          :src="eyesShow.isShow1 ? eyes.show : eyes.hide"
          :class="['eye-img', eyesShow.isShow1 ? 'eye-show' : 'eye-hide']"
          @click="eyesShow.isShow1 = !eyesShow.isShow1"
        />
        <img
          src="../../assets/login/clear.svg"
          v-show="formData.oldPassword && clearShow.isClear1"
          class="input-clear"
          @mousedown="formData.oldPassword = ''"
        />
        <el-input
          :type="eyesShow.isShow1 ? 'text' : 'password'"
          v-model="formData.oldPassword"
          placeholder="旧密码"
          @focus="clearShow.isClear1 = true"
          @blur="clearShow.isClear1 = false"
        ></el-input>
      </el-form-item>

      <el-form-item prop="newPassword">
        <img
          :src="eyesShow.isShow2 ? eyes.show : eyes.hide"
          :class="['eye-img', eyesShow.isShow2 ? 'eye-show' : 'eye-hide']"
          @click="eyesShow.isShow2 = !eyesShow.isShow2"
        />
        <img
          src="../../assets/login/clear.svg"
          v-show="formData.newPassword && isClear"
          class="input-clear"
          @mousedown="formData.newPassword = ''"
        />
        <el-input
          :type="eyesShow.isShow2 ? 'text' : 'password'"
          v-model="formData.newPassword"
          placeholder="新密码"
          @focus="isClear = true"
          @blur="isClear = false"
        ></el-input>
      </el-form-item>

      <el-form-item prop="confirmPW">
        <img
          :src="eyesShow.isShow3 ? eyes.show : eyes.hide"
          :class="['eye-img', eyesShow.isShow3 ? 'eye-show' : 'eye-hide']"
          @click="eyesShow.isShow3 = !eyesShow.isShow3"
        />
        <img
          src="../../assets/login/clear.svg"
          v-show="formData.confirmPw && clearShow.isClear3"
          class="input-clear"
          @mousedown="formData.confirmPw = ''"
        />
        <el-input
          :type="eyesShow.isShow3 ? 'text' : 'password'"
          v-model="formData.confirmPW"
          placeholder="确认密码"
          @focus="clearShow.isClear3 = true"
          @blur="clearShow.isClear3 = false"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="default" class="cancel-btn" @click="handleCancel()"
        >取消</el-button>
        <el-button
          type="primary"
          class="sure-btn"
          @click="changeSubmit('ruleForm')"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { validate } from '@/utils/validate/loginValidate.js';

export default {
  name: "ChangePassword",
  data() {
    let validateConfPw = (rule, value, callback) =>{
      if(value.trim() !== this.formData.newPassword.trim()) {
        callback(new Error('两次输入密码不一致！'));
      }else if (value.trim().length <= 0) {
        callback(new Error('请再次输密码'));
      }else {
        callback();
      }
    };
    return {
      formData: {
        account: "",
        oldPassword: "",
        newPassword: "",
        confirmPW: "",
      },
      rules: {
        account:[{validator: validate.validateAccount, trigger: 'blur'}],
        oldPassword:[{validator: validate.validatePassword, trigger: 'blur'}],
        newPassword:[{validator: validate.validateNewPassword, trigger: 'blur'}],
        confirmPW:[{validator: validateConfPw, trigger: 'blur'}],
      },
      eyes: {
        hide: require("@/assets/login/hide.svg"),
        show: require("@/assets/login/show.svg"),
      },
      eyesShow: {
        isShow1: false,
        isShow2: false,
        isShow3: false,
      },
      clearShow: {
        isClear: false,
        isClear1: false,
        isClear2: false,
        isClear3: false,
      },
    };
  },

  methods: {
    ...mapMutations("login", ["switchForm"]),
    handleCancel() {
      this.switchForm(false);
    },
  },
};
</script>

<style lang="scss" scope>
.login-form {
  margin: 48px;
  position: relative;
  .eye-img {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translate(0, -50%);
    z-index: 99;
    cursor: pointer;
  }
  .eye-show:hover {
    content: url(../../assets/login/show2.svg);
  }
  .eye-show:active {
    content: url(../../assets/login/show1.svg);
  }
  .eye-hide:hover {
    content: url(../../assets/login/hide2.svg);
  }
  .eye-hide:hover {
    content: url(../../assets/login/hide1.svg);
  }
  .input-clear {
    position: absolute;
    top: 50%;
    right: 40px;
    transform: translate(0, -50%);
    z-index: 99;
    cursor: pointer;
  }
  .input-clear:hover {
    content: url("../../assets/login/clear1.svg");
  }
  .input-clear:active {
    content: url("../../assets/login/clear2.svg");
  }
  .change-pw {
    font-size: 12px;
    color: #0077ff;
    position: absolute;
    right: 0;
    margin-top: 8px;
  }
  .cancel-btn {
    width: 172px;
    height: 48px;
    margin-top: 24px;
    margin-right: 6px;
    color: #4e5865;
    font-size: 16px;
  }
  .sure-btn {
    width: 172px !important;
    margin-top: 24px !important;
  }
}
</style>