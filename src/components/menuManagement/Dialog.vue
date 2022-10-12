<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-position="left"
      label-width="80px"
      :rules="rules"
    >
      <el-form-item label="名称">
        <el-input v-model="form.name" placeholder="请输入"> </el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          type="textarea"
          v-model="form.description"
          maxlength="100"
          placeholder="请输入"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-radio-group v-model="form.authority">
          <el-radio label="普通用户" name="authority"></el-radio>
          <el-radio label="超级管理员" name="authority"></el-radio>
          <el-radio label="项目支撑人员" name="authority"></el-radio>
          <el-radio label="实验室管理员" name="authority"></el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="form-btn">
        <el-button type="primary" @click="addAccount">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </el-form>
    
  </div>
</template>

<script>
import { menuService } from "@/utils/menuService.js";

export default {
  name: "Dialog",
  props: ["isEdit"],
  data() {
    return {
      form: {
        name: '',
        description: '',
        authority: '', 
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        description: [{ required: true, message: "请输入描述", trigger: "blur" }],
        authority: [{required: true, message: "请选择", trigger: "change" }]
      },
    }
  },

  methods: {
    handleCancel() {
      this.$refs['form'].resetFields();
      this.form = {
        name: '',
        description: '',
        authority: '', 
      }
      this.$emit("handleClose", false);
    },

    addAccount() {
      let params = {
        name: this.form.name,
        description: this.form.description,
        authority: this.form.authority,
      }
      if(params.authority === '普通用户') {
        params.authority = 0;
      }else if(params.authority === '超级管理员') {
        params.authority = 1;
      }else if(params.authority === '项目支撑人员') {
        params.authority = 2;
      }else if(params.authority === '实验室管理员') {
        params.authority = 3;
      }
      this.$refs["form"].validate((valid) => {
        if (valid) { 
          menuService.createItem(params).then(res => {
            if (res.data.code === this.$statusCode.LOGIN_FAILED) {
              noLogin();
            } else if (res.data.code === this.$statusCode.SUCCESS) {
              this.$message({
                message: '下拉框创建成功',
                type: 'success'
              });
              this.handleCancel();
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          })
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.form-btn {
  text-align: center;
  padding-bottom: 24px;
  margin-top: 32px; 
  .el-button {
    width: 96px;
  }
  .el-button + .el-button {
    margin-left: 16px;
  }
}
::v-deep .el-input {
  width: 100%;
}
::v-deep .el-radio {
  color: #000;
}

::v-deep .el-radio__input.is-checked .el-radio__inner {
  border-color: #07f;
  background: #fff;
}
::v-deep .el-radio__input.is-checked .el-radio__inner::after {
  width: 8px;
  height: 8px;
  background: #07f;
}
::v-deep .el-textarea__inner {
  min-height: 104px !important;
}
::v-deep .el-form-item {
  margin-bottom: 16px;
}
</style>
