<template>
	<div class="taskList-box">
		<div class="list-box">
			<div class="search-box">
				<div></div>
				<div class="task-search">
					<el-input
						type="text"
						placeholder="请输入搜索内容"
						clearable
						v-model="keyword"
						@change="searchData"
						prefix-icon="el-icon-search"
					>
					</el-input>
					<FilterHeader
						:selectOption="headerLabel"
						@handleFilter="filterHeader"
						:headerInit="headerInit"
						:filterSelected="headerSelected"
					></FilterHeader>
				</div>
			</div>

			<div class="filter-list" v-if="chooseList.length > 0">
				<span class="found">
					已找到
					<el-tag type="round" size="small" style="margin-left: 5px; color: #252b3a">
						{{ pagination.total }}
					</el-tag>
					:
				</span>
				<el-tooltip
					class="item"
					v-for="(tag, index) in chooseList"
					:key="index"
					effect="light"
					:content="tag.value"
					placement="top"
				>
					<el-tag type="info" closable @close="handleClose(tag)">
						{{ tag.value }}
					</el-tag>
				</el-tooltip>
				<span @click="clearAll()" class="clear-all">全部清除</span>
			</div>
			<div class="task-table">
				<el-table
					:data="tableData"
					style="width: 100%"
					ref="filterTable"
					tooltip-effect="light tooltip-end"
					@filter-change="filterChange"
					resizable
					sortable="custom"
					@sort-change="handleSort"
					border
				>
					<template slot="empty">
						<img src="@/assets/list/noData.svg" />
					</template>
					<el-table-column show-overflow-tooltip prop="projectId" :label="headerLabel[0].label" sortable width="106">
						<template v-slot="data">
							<router-link
								:to="{
									path: '/projectDetail',
									query: {
										projectId: data.row.projectId,
										requestId: data.row.requestId,
									},
								}"
							>
								<p class="p-text projectId">{{ data.row.projectId ? data.row.projectId : "-" }}</p>
							</router-link>
						</template>
					</el-table-column>
					<el-table-column
						prop="requestId"
						:label="headerLabel[1].label"
						v-if="headerSelected.includes(headerLabel[1].label)"
						sortable
						show-overflow-tooltip
						width="118"
					>
					</el-table-column>
					<el-table-column
						prop="solutionName"
						:label="headerLabel[2].label"
						v-if="headerSelected.includes(headerLabel[2].label)"
						show-overflow-tooltip
						width="118"
					>
						<template v-slot="data">
							<span>{{ data.row.solutionName ? data.row.solutionName : "-" }}</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="companyName"
						:label="headerLabel[3].label"
						v-if="headerSelected.includes(headerLabel[3].label)"
						show-overflow-tooltip
						width="118"
					>
						<template v-slot="data">
							<span>{{ data.row.companyName ? data.row.companyName : "-" }}</span>
						</template>
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="testScenario"
						width="106"
						v-if="headerSelected.includes(headerLabel[4].label)"
					>
						<div slot="header" slot-scope="{}">
							<FilterTable
								:selectOption="filters.testScenario"
								:headerLabel="headerLabel[4].label"
								@handleFilter="filterChange"
								:filterSelected="filterSelected.testScenario"
								filterKey="testScenario"
							>
							</FilterTable>
						</div>
						<template v-slot="data">
							<span>{{ data.row.testScenario ? data.row.testScenario : "-" }}</span>
						</template>
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						:label="headerLabel[5].label"
						prop="testOrganizations"
						width="106"
						v-if="headerSelected.includes(headerLabel[5].label)"
					>
						<template v-slot="data">
							<span>{{ data.row.testOrganizations ? data.row.testOrganizations : "-" }}</span>
						</template>
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="taskStatus"
						width="136"
						v-if="headerSelected.includes(headerLabel[6].label)"
					>
						<div slot="header" slot-scope="{}">
							<FilterTable
								:selectOption="filters.taskStatus"
								:headerLabel="headerLabel[6].label"
								@handleFilter="filterChange"
								:filterSelected="filterSelected.taskStatus"
								filterKey="taskStatus"
							>
							</FilterTable>
						</div>
						<template v-slot="data">
							<span>
								<el-tag effect="dark" :style="getStyle(data.row.taskStatus)">
									{{ data.row.taskStatus ? data.row.taskStatus : "" }}
								</el-tag>
							</span>
						</template>
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="serverStatus"
						width="106"
						:label="headerLabel[7].label"
						v-if="headerSelected.includes(headerLabel[7].label)"
					>
						<template v-slot="data">
							<span :class="getClass(data.row.serverStatus)">{{
								data.row.serverStatus ? data.row.serverStatus : "-"
							}}</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="submitDate"
						:label="headerLabel[8].label"
						width="110"
						sortable
						show-overflow-tooltip
						v-if="headerSelected.includes(headerLabel[8].label)"
					>
						<template v-slot="data">
							<span>{{ data.row.submitDate ? data.row.submitDate : "-" }}</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="serverModel"
						width="114"
						show-overflow-tooltip
						:label="headerLabel[9].label"
						v-if="headerSelected.includes(headerLabel[9].label)"
					>
						<template v-slot="data">
							<span>{{ data.row.serverModel ? data.row.serverModel : "-" }}</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="OS"
						show-overflow-tooltip
						column-key="OS"
						width="106"
						:label="headerLabel[10].label"
						v-if="headerSelected.includes(headerLabel[10].label)"
					>
						<template v-slot="data">
							<span>{{ data.row.osName ? data.row.osName + " " + data.row.osVersion : "-" }}</span>
						</template>
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="serverIp"
						:label="headerLabel[11].label"
						v-if="headerSelected.includes(headerLabel[11].label)"
					>
						<template v-slot="data">
							<span>{{ data.row.serverIp ? data.row.serverIp : "-" }}</span>
						</template>
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="startTime"
						:label="headerLabel[12].label"
						sortable
						width="106"
						v-if="headerSelected.includes(headerLabel[12].label)"
					>
						<template v-slot="data">
							<span>{{ data.row.startTime ? data.row.startTime : "-" }}</span>
						</template>
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="duration"
						:label="headerLabel[13].label"
						sortable
						width="106"
						v-if="headerSelected.includes(headerLabel[13].label)"
					>
						<template v-slot="data">
							<span>{{ data.row.duration ? data.row.duration : "-" }}</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="operate"
						:label="headerLabel[14].label"
						minWidth="220"
						show-overflow-tooltip
						v-if="headerSelected.includes(headerLabel[14].label)"
					>
						<template v-slot="data">
							<div class="opera-btn">
								<button v-if="data.row.taskStatus === '测试失败'" @click="handleRerun(data.row)">重跑</button>
								<button
									v-if="data.row.taskStatus && (data.row.taskStatus.indexOf('测试') === -1 || data.row.taskStatus === '等待分配服务器')"
									@click="handleDialog(data.row, 'terminate')"
								>
									终止测试
								</button>
								<button
									v-if="
										data.row.taskStatus !== '认证结束' &&
										data.row.taskStatus !== '开始测试' &&
										data.row.taskStatus !== '等待分配服务器'&&
										data.row.taskStatus !== '测试结束'
									"
                  @click="restartTest(data.row)"
								>
									重新测试
								</button>
								<button
									v-if="
										data.row.taskStatus === '认证结束' ||
										data.row.taskStatus === '测试完成' ||
										data.row.taskStatus === '服务器释放'
									"
                  @click="downUpload(data.row)"
								>
									下载报告
								</button>
								<button v-if="data.row.taskStatus === '测试失败'" @click="handleDialog(data.row, 'failed')">填写原因</button>
                <button v-if="data.row.taskStatus === '安装完成'" @click="handleInstall(data.row)">安装完成</button>
							</div>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="pagination.currentPage"
					:page-sizes="pagination.pageSizes"
					:page-size="pagination.pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="pagination.total"
				>
				</el-pagination>
			</div>
		</div>
    <el-dialog title="失败原因" :visible.sync="dialogVisible">
      <Dialog @handleClose="handleCancel('failed')" :dialogData="dialogData"></Dialog>
    </el-dialog>
		<el-dialog title="终止测试" :visible.sync="terminateVisible">
			<TerminateDialog @handleCancel="handleCancel('terminate')" :dialogData="dialogData"></TerminateDialog>
		</el-dialog>
	</div>
</template>

<script>
import FilterTable from "@/components/public/FilterTable.vue";
import FilterHeader from "@/components/public/FilterHeader.vue";
import { taskListService } from "@/utils/taskListService";
import { noLogin } from "@/utils/publicFunction.js";
import TerminateDialog from "@/components/taskDetail/TerminateDialog";
import Dialog from "@/components/taskDetail/Dialog";

export default {
	name: "TaskList",
	components: {
		FilterTable,
		FilterHeader,
		TerminateDialog,
    Dialog,
	},
	data() {
		return {
			dialogVisible: false,
      terminateVisible: false,
			dialogData: {},
			keyword: "",
			tableData: [],
			headerLabel: [
				{
					label: "方案ID",
					value: "方案ID",
					disabled: true,
				},
				{
					label: "测试任务ID",
					value: "测试任务ID",
					disabled: false,
				},
				{
					label: "方案名称",
					value: "方案名称",
					disabled: false,
				},
				{
					label: "公司名称",
					value: "公司名称",
					disabled: false,
				},
				{
					label: "测试场景",
					value: "测试场景",
					disabled: false,
				},
				{
					label: "测试机构",
					value: "测试机构",
					disabled: false,
				},
				{
					label: "测试状态",
					value: "测试状态",
					disabled: false,
				},
				{
					label: "服务器状态",
					value: "服务器状态",
					disabled: false,
				},
				{
					label: "提交时间",
					value: "提交时间",
					disabled: false,
				},
				{
					label: "服务器型号",
					value: "服务器型号",
					disabled: false,
				},
				{
					label: "操作系统",
					value: "操作系统",
					disabled: false,
				},
				{
					label: "服务器IP",
					value: "服务器IP",
					disabled: false,
				},
				{
					label: "测试时间",
					value: "测试时间",
					disabled: false,
				},
				{
					label: "测试时长",
					value: "测试时长",
					disabled: false,
				},
				{
					label: "操作",
					value: "操作",
					disabled: false,
				},
			],
			headerInit: [
				"方案ID",
				"测试任务ID",
				"方案名称",
				"公司名称",
				"测试场景",
				"测试机构",
				"测试状态",
				"服务器状态",
				"提交时间",
				"服务器型号",
				"操作系统",
				"服务器IP",
				"测试时间",
				"测试时长",
				"操作",
			],
			headerSelected: [
				"方案ID",
				"测试任务ID",
				"方案名称",
				"公司名称",
				"测试场景",
				"测试机构",
				"测试状态",
				"服务器状态",
				"服务器型号",
				"操作系统",
				"服务器IP",
				"操作",
			],
			filters: {
				testScenario: [],
				taskStatus: [],
			},
			filterSelected: {
				testScenario: [],
				taskStatus: [],
			},
			chooseList: [],
			pagination: {
				total: 0,
				currentPage: 1,
				layout: "total, size, prev, pager, next, jumper",
				pageSizes: [10, 20, 30, 50],
				pageSize: 10,
			},
			params: {
				testScenario: [], // 测试场景
				taskStatus: [],
				keyword: "",
				sortType: "", // desc/asc
				sortKey: "", // projectId|requestId|requestTime|startTime|duration
				pageNo: 1,
				pageSize: 10,
			},
		};
	},

	created() {
		this.getList();
	},

	methods: {
		handleSizeChange(val) {
			this.params.pageSize = val;
			this.pagination.pageSize = val;
			this.getList();
		},
		handleCurrentChange(val) {
			this.params.pageNo = val;
			this.pagination.currentPage = val;
			this.getList();
		},

		getClass(val) {
			let className = "";
			switch (val) {
				case "排队中":
					className = "serverStatus status1";
					break;
				case "已分配":
					className = "serverStatus status2";
					break;
				case "待回收":
					className = "serverStatus status3";
					break;
				case "已回收":
					className = "serverStatus status4";
					break;
				default:
					className = "serverStatus";
					break;
			}
			return className;
		},

		getStyle(val) {
			let style = {};
			if (val && val.includes("测试中")) {
				style = {
					border: "1px solid #07f",
					backgroundColor: "#07f",
				};
			} else if (val && val.includes("测试失败")) {
				style = {
					border: "1px solid #e32020",
					backgroundColor: "#e32020",
				};
			}
			switch (val) {
				case "等待分配服务器":
					style = {
						border: "1px solid #ebaf00",
						backgroundColor: "#ebaf00",
					};
					break;
				case "已分配服务器":
					style = {
						border: "1px solid #2db47c",
						backgroundColor: "#2db47c",
					};
					break;
				case "初始化服务器":
					style = {
						border: "1px solid #81ba06",
						backgroundColor: "#81ba06",
					};
					break;
				case "安装驱动":
					style = {
						border: "1px solid #52a3ff",
						backgroundColor: "#52a3ff",
					};
					break;
				case "测试完成":
					style = {
						border: "1px solid #30b7bb",
						backgroundColor: "#30b7bb",
					};
					break;
				case "认证结束":
					style = {
						border: "1px solid #24ab36",
						backgroundColor: "#24ab36",
					};
					break;
				case "服务器释放":
					style = {
						border: "1px solid #2a739d",
						backgroundColor: "#2a739d",
					};
					break;
				case "测试终止":
					style = {
						border: "1px solid #9ea8b9",
						backgroundColor: "#9ea8b9",
					};
					break;
				default:
					break;
			}
			return style;
		},

		filterHeader(list) {
			this.headerSelected = list;
		},

		filterChange(column) {
			this.chooseList = this.chooseList.filter((res) => {
				return Object.keys(column)[0].indexOf(res.key) === -1;
			});
			if (column.testScenario) {
				if (column.testScenario.length > 0) {
					let obj = this.handleFilter(column, "testScenario");
					this.chooseList.push(obj);
				}
				this.filterSelected.testScenario = column.testScenario;
				this.params.testScenario = column.testScenario;
			}

			if (column.taskStatus) {
				if (column.taskStatus.length > 0) {
					let obj = this.handleFilter(column, "taskStatus");
					this.chooseList.push(obj);
				}
				this.filterSelected.taskStatus = column.taskStatus;
				this.params.taskStatus = column.taskStatus;
			}
			this.getList();
		},

		handleFilter(arr, key) {
			let str = "";
			if (key === "testScenario") {
				str = "测试场景：";
			} else if (key === "taskStatus") {
				str = "测试状态：";
			}
			arr[key].forEach((item, index) => {
				str += item;
				if (index < arr[key].length - 1) {
					str += ", ";
				}
			});
			let obj = {
				key: key,
				value: str,
			};
			return obj;
		},

		// 关闭筛选
		handleClose(column) {
			this.chooseList = this.chooseList.filter((res) => res.key !== column.key);
			this.filterSelected[column.key] = [];
		},

		// 清除全部筛选
		clearAll() {
			this.chooseList = [];
			this.filterSelected = {
				testScenario: [],
				taskStatus: [],
			};
			this.params.testScenario = [];
			this.params.taskStatus = [];
			this.getList();
		},

		searchData(val) {
			this.params.keyword = val;
			this.getList();
		},

		handleSort(val) {
			this.params.sortKey = val.prop;
			this.params.sortType = val === "descending" ? "desc" : "asc";
			this.getList();
		},

		getList() {
			taskListService.getList(this.params).then((res) => {
				if (res.data.code === this.$statusCode.LOGIN_FAILED) {
					noLogin();
				} else if (res.data.code === this.$statusCode.SUCCESS) {
					this.tableData = res.data.body.list;
					this.pagination.total = res.data.body.total;
					this.filters.taskStatus = [];
					this.filters.testScenario = [];
					res.data.body.taskStatusList.forEach((item) => {
						let obj = {
							value: item,
							label: item,
						};
						this.filters.taskStatus.push(obj);
					});
					res.data.body.testScenarioList.forEach((item) => {
						let obj = {
							value: item,
							label: item,
						};
						this.filters.testScenario.push(obj);
					});
				} else {
					this.$message({
						message: res.data.msg,
						type: "error",
					});
				}
			});
		},

    // 重跑测试
    handleRerun(row) {
      taskListService.rerunTest(row.projectId, row.requestId).then((res) => {
				if (res.data.code === this.$statusCode.LOGIN_FAILED) {
					noLogin();
				} else if (res.data.code === this.$statusCode.SUCCESS) {

        }
      })
    },

    restartTest(row) {
      taskListService.restartTest(row.projectId, row.requestId).then((res) => {
				if (res.data.code === this.$statusCode.LOGIN_FAILED) {
					noLogin();
				} else if (res.data.code === this.$statusCode.SUCCESS) {

        }
      })
    },

    downUpload(row) {
      taskListService.downUpload(row.projectId, row.requestId).then((res) => {
				if (res.data.code === this.$statusCode.LOGIN_FAILED) {
					noLogin();
				} else if (res.data.code === this.$statusCode.SUCCESS) {

        }
      })
    },

    handleInstall(row) {
      taskListService.installServer(row.projectId, row.requestId).then((res) => {
				if (res.data.code === this.$statusCode.LOGIN_FAILED) {
					noLogin();
				} else if (res.data.code === this.$statusCode.SUCCESS) {

        }
      })
    },
    
		handleDialog(row, val) {
			this.dialogData = {
				projectId: row.projectId,
				requestId: row.requestId,
			};
      if(val === 'terminate') {
        this.terminateVisible = true
      }else {
			  this.dialogVisible = true;
      }
		},

		handleCancel(val) {
      if(val === 'terminate') {
        this.terminateVisible = false;
      }else {
			  this.dialogVisible = false;
      }
		},
	},
};
</script>

<style lang="scss" scoped>
.taskList-box {
	padding: 24px 40px 24px 0px;
	background: #ebf0f6;
	.list-box {
		background: #fff;
		min-height: 700px;
		.search-box {
			display: flex;
			justify-content: space-between;
			flex-direction: row;
		}
		.task-search {
			padding-top: 24px;
			margin-bottom: 16px;
		}
		.filter-list {
			padding-left: 24px;
			margin-bottom: 10px;
			font-size: 14px;
			color: #4e5865;
			.clear-all {
				margin-left: 8px;
				color: #07f;
				cursor: pointer;
			}
		}
		.task-table {
			padding: 0px 24px 0px 24px;
		}
		.projectId {
			color: #07f;
			cursor: pointer;
		}
		.serverStatus {
			margin-left: 20px;
		}
		.serverStatus:before {
			position: absolute;
			display: block;
			width: 8px;
			height: 8px;
			background: #07f;
			border-radius: 50%;
			content: "";
			top: 50%;
			transform: translate(0, -50%);
		}
		.status1:before {
			background: #f97611;
		}
		.status2:before {
			background: #2db47c;
		}
		.status3:before {
			background: #ebaf00;
		}
		.status4:before {
			background: #24ab36;
		}
		.p-text {
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.projectId {
			color: #07f;
			cursor: pointer;
		}
		.opera-btn {
			button {
				border: none;
				background: none;
				line-height: 20px;
				color: #07f;
				cursor: pointer;
			}
			.opera-more {
				display: inline-block;
				margin-left: 8px;
				color: #07f;
				cursor: pointer;
				.el-icon-caret-bottom {
					content: url("@/assets/menu/arrow3.svg");
					vertical-align: middle;
					margin-left: 4px;
				}
			}
		}
	}
}
::v-deep.el-table--scrollable-x .el-table__body-wrapper {
	overflow-x: hidden;
}
::v-deep .el-dialog {
	width: 516px !important;
	min-width: fit-content;
}
</style>
