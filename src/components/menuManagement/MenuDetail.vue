<template>
  <div>
    <div class="detail-head">
      <p>下拉框详情</p>
      <div>
        <el-button @click="handleEdit" v-if="!isEdit">编辑</el-button>
        <el-button v-if="isEdit" @click="handleSave">保存</el-button>
        <el-button v-if="isEdit" @click="isEdit = false">取消</el-button>
      </div>
    </div>
    <el-form
      :rules="rules"
      ref="formData"
      :model="formData"
      label-position="left"
      label-width="80px"
      v-if="isEdit"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入"> </el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          type="textarea"
          v-model="formData.description"
          maxlength="100"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item label="权限" prop="authority">
        <el-radio-group v-model="formData.authority">
          <el-radio label="普通用户" name="authority"></el-radio>
          <el-radio label="超级管理员" name="authority"></el-radio>
          <el-radio label="项目支撑人员" name="authority"></el-radio>
          <el-radio label="实验室管理员" name="authority"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-row v-if="!isEdit" :model="form">
      <el-col :span="24">
        <div class="flex-row">
          <p class="label">ID</p>
          <p class="detail-value">{{ form.id }}</p>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="flex-row">
          <p class="label">名称</p>
          <p class="detail-value">{{ form.name }}</p>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="flex-row">
          <p class="label">描述</p>
          <p class="detail-value">{{ form.description ? form.description : '-' }}</p>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="flex-row">
          <p class="label">权限</p>
          <p class="detail-value">{{ form.authority }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { menuService } from "@/utils/menuService.js";

export default {
  name: "MenuDetail",
  data() {
    return {    
      isEdit: false,
      formData: {
        name: '',
        description: '',
        authority: '', 
      },
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        authority: [{required: true, message: "请选择", trigger: "change" }]
      },
    };
  },

  computed: {
    ...mapState("menu", {
      form: "dorpDownDetail",
    }),
  },
  methods: {
    handleEdit() {
      this.isEdit = true;
      this.formData = this.form;
    },
    handleSave() {
      let params = {
        id: this.formData.id,
        name: this.formData.name,
        description: this.formData.description,
        authority: this.formData.authority,
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
      this.$refs["formData"].validate((valid) => {
        if (valid) { 
          menuService.createItem(params).then(res => {
            if (res.data.code === this.$statusCode.LOGIN_FAILED) {
              noLogin();
            } else if (res.data.code === this.$statusCode.SUCCESS) {
              this.$message({
                message: '下拉框修改成功',
                type: 'success'
              });
              this.isEdit = false;
              this.$emit('handelModify')
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
.detail-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  p {
    margin: 0;
    font-size: 16px;
    color: #000000;
    font-weight: 700;
  }
  .el-button {
    width: 96px;
  }
  .el-button + .el-button {
    margin-left: 16px;
  }
}
.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
  .label {
    margin: 0;
    width: 28px;
  }
  .detail-value {
    margin: 0;
    margin-left: 40px;
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
