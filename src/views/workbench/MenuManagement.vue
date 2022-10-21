<template>
	<div class="menu-box">
		<el-button type="primary" @click="dialogVisible = true">创建一级下拉框</el-button>
		<el-row class="menu-col">
			<el-col :span="9" class="flex-left">
				<p>根目录</p>
				<el-tree
					:data="data"
					node-key="id"
					:expand-on-click-node="false"
					:current-node-key="handelCurrent"
					:highlight-current="true"
					:default-expanded-keys="defaultExpandedKeys"
				>
					<template slot-scope="{ node, data }">
						<div class="custom-tree-node" @click="getCurrent(data)">
							<div class="flex-row"  v-if="!data.isEdit">
								<span>{{ data.name + "/" + data.id }}</span>
								<span class="edit-icon">
									<i class="el-icon-circle-plus-outline" @click="() => append(data)"></i>
									<i class="el-icon-edit-outline" v-if="data.rootId" @click="editRelation(data)"></i>
									<i class="el-icon-delete" @click="() => remove(node, data)"></i>
								</span>
							</div>

							<div v-if="data.isEdit" class="flex-row">
								<span class="flex-input">
									<el-input v-model="data.name"></el-input>
								</span>
								<span class="edit-icon input-icon">
									<i class="el-icon-circle-check" v-if="data.id" @click="modifyRelation(data)"></i>
									<i class="el-icon-circle-check" v-if="!data.id" @click="addRelation(data)"></i>
									<i class="el-icon-delete" @click="remove(node, data)"></i>
								</span>
							</div>
						</div>
					</template>
				</el-tree>
			</el-col>
			<el-col :span="14" class="flex-right">
				<MenuDetail @handelModify="getList"></MenuDetail>
			</el-col>
		</el-row>
		<el-dialog title="创建下拉框" :visible.sync="dialogVisible" width="656">
			<Dialog @handleClose="handleClose"></Dialog>
		</el-dialog>
	</div>
</template>

<script>
import Dialog from "@/components/menuManagement/Dialog.vue";
import MenuDetail from "@/components/menuManagement/MenuDetail.vue";
import { mapMutations } from "vuex";
import { menuService } from "@/utils/menuService.js";
import { noLogin } from "@/utils/publicFunction.js";

export default {
	name: "MenuManagement",
	components: {
		Dialog,
		MenuDetail,
	},
	data() {
		return {
			defaultExpandedKeys: [],
			dialogVisible: false,
			data: [],
			text: "",
			handelCurrent: "",
		};
	},

	created() {
		this.getList();
	},

	methods: {
		...mapMutations("menu", ["switchDetail"]),
		getCurrent(node) {
			let detail = {};
			if (node.rootId) {
				this.data.forEach((item) => {
					if (item.id === node.rootId) {
						detail = {
							id: item.id,
							name: item.name,
							description: item.description,
							authority: item.authority,
						};
					}
				});
			} else {
				detail = {
					id: node.id,
					name: node.name,
					description: node.description,
					authority: node.authority,
				};
			}
			this.switchDetail(detail);
		},

		getList() {
			menuService.getList().then((res) => {
				if (res.data.code === this.$statusCode.LOGIN_FAILED) {
					noLogin();
				} else if (res.data.code === this.$statusCode.SUCCESS) {
					this.data = res.data.body;
					this.getCurrent(this.data[0]);
				}
			});
		},

		append(data) {
			this.defaultExpandedKeys.push(data.id);
			const newChild = { name: "", isEdit: true, children: [], rootId: data.rootId, fatherId: data.id };
			if (!data.children) {
				this.$set(data, "children", []);
			}
			data.children.push(newChild);
			console.log(data);
		},

		remove(node, data) {
			console.log(data.name);
			if (data.id) {
				menuService.deleteItem(data.id).then((res) => {
					if (res.data.code === this.$statusCode.LOGIN_FAILED) {
						noLogin();
					} else if (res.data.code === this.$statusCode.SUCCESS) {
						this.$message({
							message: "词条删除成功",
							type: "success",
						});
						this.getList();
					} else {
						this.$message({
							message: res.data.msg,
							type: "error",
						});
					}
				});
			} else {
				const parent = node.parent;
				const children = parent.data.children || parent.data;
				const index = children.findIndex((d) => d.name === data.name);
				children.splice(index, 1);
			}
		},

		// 创建非一级下拉框
		addRelation(data) {
			let params = {
				fatherId: data.fatherId,
				description: data.name,
			};
			menuService.addRelation(params).then((res) => {
				if (res.data.code === this.$statusCode.LOGIN_FAILED) {
					noLogin();
				} else if (res.data.code === this.$statusCode.SUCCESS) {
					this.$message({
						message: "词条新增成功",
						type: "success",
					});
					data.isEdit = false;
					this.getList();
				} else {
					this.$message({
						message: res.data.msg,
						type: "error",
					});
				}
			});
		},

		// 修改非一级下拉框
		modifyRelation(data) {
			let params = {
				id: data.id,
				description: data.name,
			};
			menuService.modifyRelation(params).then((res) => {
				if (res.data.code === this.$statusCode.LOGIN_FAILED) {
					noLogin();
				} else if (res.data.code === this.$statusCode.SUCCESS) {
					this.$message({
						message: "词条修改成功",
						type: "success",
					});
					data.isEdit = false;
					this.getList();
				} else {
					this.$message({
						message: res.data.msg,
						type: "error",
					});
				}
			});
		},

		// 编辑非一级下拉框
		editRelation(data) {
			let obj = JSON.parse(JSON.stringify(data.name));
			data.name = '';
			data.isEdit = true;
			data.name = obj;
		},

		handleClose(val) {
			this.dialogVisible = val;
			this.getList(true);
		},
	},
};
</script>

<style lang="scss" scoped>
.menu-box {
	margin: 24px 40px 24px 0px;
	background: #fefefe;
	padding: 24px;
	.menu-col {
		margin-top: 16px;
	}
	.flex-left {
		border: 1px solid #dfe5ef;
		margin-right: 20px;
		border-radius: 4px;
		padding: 24px;
		p {
			margin: 0;
			font-size: 16px;
			color: #000000;
			font-weight: 700;
			margin-bottom: 12px;
		}
		.flex-row {
			width: 100%;
			display: flex;
			justify-content: space-between;
			.flex-input {
				width: 90%;
			}
		}
	}

	.flex-right {
		border: 1px solid #dfe5ef;
		border-radius: 4px;
		flex: 1;
		padding: 16px 16px 16px 24px;
		min-height: 280px;
	}
}

::v-deep .el-tree {
	background: transparent;
}

::v-deep .el-tree-node__content {
	height: 40px;
	padding: 10px 0;
	color: #4e5865;
	.edit-icon {
		display: none;
		i {
			margin-right: 11px;
		}
	}
	.input-icon {
		line-height: 36px;
		display: inline-block;
		flex: 1;
	}
	.is-leaf {
		opacity: 0;
	}
}

::v-deep .el-tree-node__content:hover {
	.edit-icon {
		display: inline-block;
	}
}

::v-deep .custom-tree-node {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	.el-input {
		width: 97%;
	}
}

::v-deep .expanded::before {
	content: url("@/assets/menu/arrow5.svg");
}

::v-deep .el-tree-node__content > .el-tree-node__expand-icon {
	padding: 0;
	padding-top: 4px;
	margin-right: 8px;
}

::v-deep .el-tree-node__expand-icon.expanded {
	transform: none;
}

::v-deep .is-current > .el-tree-node__content {
	color: #000000;
	font-weight: 500;
}

::v-deep .el-tree > .is-expanded > .el-tree-node__content {
	color: #000000;
	font-weight: 500;
}
::v-deep .el-tree-node:focus > .el-tree-node__content {
	background-color: transparent;
}

::v-deep .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
	background-color: transparent;
}

::v-deep .el-dialog {
	width: 656px;
}
</style>
