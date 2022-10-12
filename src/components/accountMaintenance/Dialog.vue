<template>
	<div>
		<el-form ref="form" :rules="rules" :model="form" label-position="left" label-width="80px">
			<el-form-item label="测试机构" prop="testOrganization">
				<el-select v-model="form.testOrganization" placeholder="请选择">
					<el-option v-for="item in testOptions" :label="item.label" :value="item.value" :key="item.label"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="角色" prop="labManager">
				<el-radio-group v-model="form.labManager">
					<el-radio label="项目支撑人员" name="labManager"></el-radio>
					<el-radio label="实验室管理员" name="labManager"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="群组" prop="groupList">
				<el-checkbox-group v-model="form.groupList" @change="handleGroupChange">
					<el-checkbox v-for="group in groupLists" :label="group" :key="group" name="groupList">{{
						group
					}}</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="成员">
				<div class="flex-row" v-for="(item, index) in form.userList" :key="index">
					<el-form-item :prop="`userList.${index}.userName`" :rules="rules.member.userName">
						<el-input v-model="item.userName" placeholder="请输入姓名"></el-input>
					</el-form-item>
					<el-form-item :prop="`userList.${index}.uniportalId`" :rules="rules.member.uniportalId">
						<el-input v-model="item.uniportalId" placeholder="请输入工号"></el-input>
					</el-form-item>
					<el-form-item :prop="`userList.${index}.telephone`" :rules="rules.member.telephone">
						<el-input v-model="item.telephone" placeholder="请输入电话"></el-input>
					</el-form-item>
					<el-form-item :prop="`userList.${index}.email`" :rules="rules.member.email">
						<el-input v-model="item.email" class="last-input" placeholder="请输入邮箱"></el-input>
					</el-form-item>
					<div class="el-icon">
						<i class="el-icon-remove-outline" @click="deleteMember(index)" v-if="form.userList.length > 1"></i>
						<i class="el-icon-circle-plus-outline" @click="addMember"></i>
					</div>
				</div>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="addAccount">确 定</el-button>
			<el-button @click="handleCancel">取 消</el-button>
		</div>
	</div>
</template>

<script>
import { accountService } from "@/utils/accountService";
import { noLogin } from "@/utils/publicFunction.js";
import { publicValidate } from "@/utils/validate/publicValidate";

export default {
	name: "Dialog",
	props: ["editData"],
	data() {
		return {
			groupLists: ["商业软件", "整机与板卡", "openEuler商业发行版"],
			form: {
				testOrganization: "",
				labManager: "",
				groupList: [],
				userList: [
					{
						userName: "",
						uniportalId: "",
						telephone: "",
						email: "",
					},
				],
			},
			rules: {
				testOrganization: [{ required: true, message: "请选择", trigger: "change" }],
				labManager: [{ required: true, message: "请选择", trigger: "change" }],
				groupList: [{ type: "array", required: true, message: "请选择", trigger: "change" }],
				member: {
					userName: [{ required: true, validator: publicValidate.nameValidate, trigger: "blur" }],
					uniportalId: [{ required: true, message: "请输入工号", trigger: "blur" }],
					telephone: [{ required: true, validator: publicValidate.phoneValidate, trigger: "blur" }],
					email: [{ required: true, validator: publicValidate.emailValidate, trigger: "blur" }],
				},
			},
			testOptions: [
				{
					label: "创新中心旗舰店",
					value: "创新中心旗舰店",
				},
			],
		};
	},

	created() {
		if(this.editData.length) {
this.form = {
			testOrganization: this.editData.testOrganization,
			labManager: this.editData.roleDesc,
			groupList: this.editData.groupList,
			userList: [
				{
					userName: this.editData.userName,
					uniportalId: this.editData.uniportalId,
					telephone: this.editData.telephone,
					email: this.editData.email,
				},
			],
		};
		}
		
	},

	watch: {
		editData: {
			handler(newVal) {
				if (newVal.length) {
					this.form = {
						testOrganization: newVal.testOrganization,
						labManager: newVal.roleDesc,
						groupList: newVal.groupList,
						userList: [
							{
								userName: newVal.userName,
								uniportalId: newVal.uniportalId,
								telephone: newVal.telephone,
								email: newVal.email,
							},
						],
					};
				}
			},
			deep: true,
		},
	},
	methods: {
		handleGroupChange(value) {},

		// 添加成员
		addMember() {
			this.form.userList.push({
				userName: "",
				uniportalId: "",
				telephone: "",
				email: "",
			});
		},

		deleteMember(index) {
			this.form.userList.splice(index, 1);
		},

		// 提交表单
		addAccount() {
			let params = {
				testOrganization: this.form.testOrganization,
				projectSupporter: this.form.labManager === "项目支撑人员",
				labManager: this.form.labManager === "实验室管理员",
				isvSupporter: false,
				ihvSupporter: false,
				osvSupporter: false,
				userList: this.form.userList,
			};
			this.form.groupList.forEach((item) => {
				if (item === "商业软件") {
					params.isvSupporter = true;
				} else if (item === "整机与板卡") {
					params.ihvSupporter = true;
				} else if (item === "openEuler商业发行版") {
					params.osvSupporter = true;
				}
			});
			this.$refs["form"].validate((valid) => {
				if (valid) {
					if (this.editData.id) {
						this.changAccountInfo(params);
					} else {
						this.addAccountInfo(params);
					}
				}
			});
		},

		// 添加新账号
		addAccountInfo(params) {
			accountService.addAccount(params).then((res) => {
				if (res.data.code === this.$statusCode.LOGIN_FAILED) {
					noLogin();
				} else if (res.data.code === this.$statusCode.SUCCESS) {
					this.$message({
						message: "账号添加成功",
						type: "success",
					});
					this.handleCancel();
				} else if (res.data.code === this.$statusCode.REQUEST_FAILED) {
					this.$message({
						message: res.data.msg,
						type: "error",
					});
				}
			});
		},

		// 修改账号信息
		changAccountInfo(params) {
			accountService.editAccount(params).then((res) => {
				if (res.data.code === this.$statusCode.LOGIN_FAILED) {
					noLogin();
				} else if (res.data.code === this.$statusCode.SUCCESS) {
					this.$message({
						message: "账号修改成功",
						type: "success",
					});
					this.handleCancel();
				} else if (res.data.code === this.$statusCode.REQUEST_FAILED) {
					this.$message({
						message: res.data.msg,
						type: "error",
					});
				}
			});
		},
		handleCancel() {
			this.form = {
				testOrganization: "",
				labManager: "",
				groupList: [],
				userList: [
					{
						userName: "",
						uniportalId: "",
						telephone: "",
						email: "",
					},
				],
			};
			this.$refs["form"].resetFields();
			// this.$refs["form"].clearValidate();
			setTimeout(()=>{
			this.$emit("cancel", false);
			},100)
		},
	},
};
</script>

<style lang="scss" scoped>
.flex-row {
	display: flex;
	flex-direction: row;
	margin-bottom: 24px;
	.el-input {
		width: 160px;
		margin-right: 8px;
	}
	
}
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
::v-deep .el-form-item__content {
	line-height: 36px;
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
