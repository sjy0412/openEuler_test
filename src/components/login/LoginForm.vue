<template>
  <div class="login-form">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item prop="account">
        <img
          src="../../assets/login/clear.svg"
          v-show="ruleForm.account && clearShow.isClear1"
          class="input-clear"
          @mousedown="ruleForm.account = ''"
        />
        <el-input
          type="text"
          v-model="ruleForm.account"
          placeholder="请输入账号"
          @focus="clearShow.isClear1 = true"
          @blur="clearShow.isClear1 = false"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <img
          :src="isShow ? eyes.show : eyes.hide"
          :class="isShow ? 'eye-img eye-show' : 'eye-img eye-hide'"
          @click="isShow = !isShow"
        />
        <img
          src="../../assets/login/clear.svg"
          v-show="ruleForm.password && clearShow.isClear2"
          class="input-clear"
          @mousedown="ruleForm.password = ''"
        />
        <el-input
          :type="isShow ? 'text' : 'password'"
          v-model="ruleForm.password"
          placeholder="请输入密码"
          @focus="clearShow.isClear2 = true"
          @blur="clearShow.isClear2 = false"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">登录</el-button>
      </el-form-item>
    </el-form>
    <span @click="changeForm()" class="change-pw">修改密码</span>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { validate } from "@/utils/validate/loginValidate.js";

export default {
  name: "LoginForm",
  data() {
    return {
      ruleForm: {
        account: "",
        password: "",
      },
      rules: {
        account: [{ validator: validate.validateAccount, trigger: "blur" }],
        password: [{ validator: validate.validatePassword, trigger: "blur" }],
      },
      eyes: {
        hide: require("@/assets/login/hide.svg"),
        show: require("@/assets/login/show.svg"),
      },
      isShow: false,
      clearShow: {
        isClear1: false,
        isClear2: false,
      },
    };
  },
  methods: {
    ...mapMutations("login", ["switchForm"]),
    changeForm() {
      this.switchForm(true);
    },

    submitForm() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.$router.push("/workbench/task");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
    cursor: pointer;
  }
}
</style>
