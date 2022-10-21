<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-position="left"
      label-width="80px"
      :rules="rules"
    >
      <el-form-item label="终止原因">
        <el-input
          type="textarea"
          v-model="form.reason"
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
      form: {
        reason: '',
      },
      rules: {
        reason: [{ required: true, message: "请输入", trigger: "blur" }],
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
            testScenario: this.dialogData.testScenario,
            reason: this.form.reason
          }
          taskListService.terminateTest(params).then(res => {
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
      this.$emit("handleCancel", false);
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
