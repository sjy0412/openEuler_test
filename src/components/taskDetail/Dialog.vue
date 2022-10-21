<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-position="left"
      label-width="80px"
      :rules="rules"
    >
      <el-form-item label="问题类型">
        <el-select v-model="form.failureType" placeholder="请选择">
            <el-option
              v-for="item in problemType"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="详细说明">
        <el-input
          type="textarea"
          v-model="form.failureReason"
          maxlength="1000"
          placeholder="请输入"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </el-form>
    
  </div>
</template>

<script>
import { taskListService } from "@/utils/taskListService.js";

export default {
  name: "Dialog",
  props: ["dialogData"],
  data() {
    return {
      problemType: ['用户侧问题', '测试平台问题', '其它问题'],
      form: {
        failureType: '',
        failureReason: '',
      },
      rules: {
        failureType: [{ required: true, message: "请选择", trigger: "change" }],
        failureReason: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    }
  },

  methods: {
    handleSubmit() {
      this.$refs["form"].validate((valid) => {
				if (valid) {
          let params = {
            projectId: this.dialogData.projectId,
            requestId: this.dialogData.requestId,
            failureType: this.form.failureType,
            failureReason: this.form.failureReason
          }
          taskListService.setFailReason(params).then(res => {
            if (res.data.code === this.$statusCode.LOGIN_FAILED) {
              noLogin();
            } else if (res.data.code === this.$statusCode.SUCCESS) {
              
            }
          })
        }
      })
    },

    handleCancel() {
      this.$refs['form'].resetFields();
      this.form = {
        failureType: '',
        failureReason: '',
      }
      this.$emit("handleClose", false);
    },
   
  },
};
</script>

<style lang="scss" scoped>
.el-icon {
	i {
		cursor: pointer;
		margin-right: 10px;
		color: #8d98aa;
	}
}
.dialog-footer {
	padding-bottom: 24px;
	text-align: center;
	.el-button {
		width: 96px;
		height: 36px;
	}
	.el-button + .el-button {
		margin-left: 16px;
	}
}
::v-deep .el-form-item__label {
	line-height: 36px;
	color: #4e5865;
}
::v-deep .el-input {
  width: 416px;
}
::v-deep .el-form-item__content {
	line-height: 36px;
  width: 416px;
}
::v-deep .el-radio {
	color: #000;
}

::v-deep .el-icon-arrow-up:before {
	content: url("@/assets/list/arrow2.svg");
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
::v-deep .el-form-item {
	margin-bottom: 24px;
	.el-form-item {
		margin-bottom: 0;
	}
}
::v-deep .el-form-item:last-child {
	margin-bottom: 8px;
}
::v-deep .el-checkbox-group {
	display: inline-flex;
}
</style>
