<template>
	<div class="wrap">
		<div class="detail-header" :style="{ left: -scrollLeft + 'px' }">
			<p class="goBack" @click="goBack">
				<i class="el-icon-arrow-left"></i>
				返回
			</p>
			<img :src="statusImg" />
			<div class="flex-column">
				<span class="project-status">
					<el-tag :style="statusStyle">{{ data.taskStatus }}</el-tag>
				</span>
				<span>{{ data.projectId }}</span>
			</div>
			<ProcessLine :statusList="statusList" :currentIndex="currentIndex"></ProcessLine>
			<div class="test-btn">
				<el-button
					type="primary"
					@click="dialogVisible1 = true"
					size="small"
					v-if="data.taskStatus === '等待分配服务器' || data.taskStatus === '测试'"
					>终止测试</el-button
				>
				<el-button type="default" @click="restartTest" size="small" v-if="data.taskStatus !== '认证结束'"
					>重新测试</el-button
				>
				<el-button
					:type="data.taskStatus === '测试失败' ? 'default' : 'primary'"
					@click="downUpload"
					size="small"
					v-if="data.taskStatus !== '等待分配服务器' && data.taskStatus !== '测试'"
				
					>下载报告</el-button
				>
				<el-button type="primary" @click="dialogVisible = true" size="small" v-if="data.taskStatus === '测试失败'"
					>填写原因</el-button
				>
			</div>
		</div>

		<div class="detail-content">
			<el-timeline>
				<el-timeline-item icon="el-icon-success" placement="top" class="success">
					<el-card>
						<div :class="['bar-title', isOpen.submitInfo ? 'open-card' : '']" @click="openCard('submitTest')">
							提交测试
						</div>
						<SubmitInfo v-show="isOpen.submitInfo"></SubmitInfo>
					</el-card>
				</el-timeline-item>

				<el-timeline-item icon="el-icon-success" placement="top" :class="statusClass" v-if="currentIndex >= 1">
					<el-card>
						<div :class="['bar-title', isOpen.assignServer ? 'open-card' : '']" @click="openCard('assignServer')">
							分配服务器
						</div>
						<AssignServer v-show="isOpen.assignServer"></AssignServer>
					</el-card>
				</el-timeline-item>
				<el-timeline-item
					:hide-timestamp="true"
					icon="el-icon-success"
					placement="top"
					class="success"
					v-if="$route.query.testScene === 'openEuler商业发行版'"
				>
					<el-card>
						<div>
							<span :class="['bar-title', isOpen.compile ? 'open-card' : '']" @click="openCard('compile')"
								>编译打包</span
							>
							<span class="re-run">一键重跑</span>
						</div>
						<Compile v-show="isOpen.compile" :compileData="compileData"></Compile>
					</el-card>
				</el-timeline-item>
				<el-timeline-item
					:hide-timestamp="true"
					icon="el-icon-success"
					placement="top"
					class="success"
					v-if="$route.query.testScene === 'openEuler商业发行版'"
				>
					<el-card>
						<div>
							<span :class="['bar-title', isOpen.repository ? 'open-card' : '']" @click="openCard('repository')"
								>仓库测试</span
							>
							<span class="re-run">一键重跑</span>
						</div>
						<RepositoryTest
							v-show="isOpen.repository"
							:tableData="repositoryData"
							:operateLog="operateLog"
						></RepositoryTest>
					</el-card>
				</el-timeline-item>
				<el-timeline-item
					:hide-timestamp="true"
					:icon="statusIcon"
					placement="top"
					class="success"
					v-if="currentIndex >= 2"
				>
					<el-card>
						<div :class="['bar-title', isOpen.test ? 'open-card' : '']" @click="openCard('test')">测试</div>
						<Test v-show="isOpen.test"></Test>
					</el-card>
				</el-timeline-item>
				<el-timeline-item
					:hide-timestamp="true"
					icon="el-icon-success"
					placement="top"
					class="success"
					v-if="$route.query.testScene === 'openEuler商业发行版'"
				>
					<el-card>
						<div>
							<span :class="['bar-title', isOpen.baseTest ? 'open-card' : '']" @click="openCard('baseTest')"
								>基础性能测试</span
							>
							<span class="re-run">一键重跑</span>
						</div>
						<div v-show="isOpen.baseTest">
							<span class="base-test-title">unixbench用例</span>
							<BaseTest :tableData="baseTestData"></BaseTest>
							<span class="base-test-title">lmbench用例</span>
							<BaseTest :tableData="baseTestData"></BaseTest>
							<span class="base-test-title">Benchmark-sol用例</span>
							<BaseTest :tableData="baseTestData"></BaseTest>
						</div>
					</el-card>
				</el-timeline-item>
				<el-timeline-item
					:hide-timestamp="true"
					icon="el-icon-success"
					placement="top"
					class="success"
					v-if="$route.query.testScene === 'openEuler商业发行版'"
				>
					<el-card>
						<div>
							<span :class="['bar-title', isOpen.oecn ? 'open-card' : '']" @click="openCard('oecn')">oecn测试</span>
						</div>
						<OecnTest v-show="isOpen.oecn" :tableData="oecnData"></OecnTest>
					</el-card>
				</el-timeline-item>
				<el-timeline-item
					:hide-timestamp="true"
					icon="el-icon-success"
					v-if="currentIndex >= 3"
					placement="top"
					class="success"
				>
					<el-card>
						<div :class="['bar-title', isOpen.testSuccess ? 'open-card' : '']" @click="openCard('testSuccess')">
							<div class="test-title">测试通过</div>
						</div>
						<span v-show="isOpen.testSuccess" class="test-end project-card">{{ "结束时间：" + data.finishTime }}</span>
					</el-card>
				</el-timeline-item>
				<el-timeline-item
					:hide-timestamp="true"
					icon="el-icon-success"
					placement="top"
					class="success"
					v-if="currentIndex >= 4 && data.testScenario === 'isv'"
				>
					<el-card>
						<div :class="['bar-title', isOpen.serverRelease ? 'open-card' : '']" @click="openCard('serverRelease')">
							服务器释放
						</div>
						<span v-show="isOpen.serverRelease" class="test-end project-card"
							>开始时间：xxxx,结束时间：xxx,处理人：xxx</span
						>
					</el-card>
				</el-timeline-item>
				<el-timeline-item
					:hide-timestamp="true"
					icon="el-icon-success"
					placement="top"
					class="success"
					v-if="(data.testScenario === 'ihv' && currentIndex >= 4) || data.testScenario === 'isv' && currentIndex >= 5"
				>
					<el-card>
						<div :class="['bar-title', isOpen.certificateEnd ? 'open-card' : '']" @click="openCard('certificateEnd')">
							认证结束
						</div>
						<span v-show="isOpen.certificateEnd" class="test-end project-card">{{
							"结束时间：" + data.finishTime
						}}</span>
					</el-card>
				</el-timeline-item>
				<el-timeline-item
					:hide-timestamp="true"
					icon="el-icon-success"
					placement="top"
					class="success"
					v-if="data.testScenario === 'ihv' && currentIndex === 5"
				>
					<el-card>
						<div :class="['bar-title', isOpen.serverRelease ? 'open-card' : '']" @click="openCard('serverRelease')">
							服务器释放
						</div>
						<span v-show="isOpen.serverRelease" class="test-end project-card"
							>开始时间：xxxx,结束时间：xxx,处理人：xxx</span
						>
					</el-card>
				</el-timeline-item>
				<el-timeline-item :hide-timestamp="true" icon="el-icon-error" placement="top" class="success" v-if="false">
					<el-card>
						<div :class="['bar-title', isOpen.determineTest ? 'open-card' : '']" @click="openCard('determineTest')">
							终止测试
						</div>
						<span v-show="isOpen.determineTest" class="test-end project-card">结束时间：xxx 原因：xxxx</span>
					</el-card>
				</el-timeline-item>
				<el-timeline-item placement="top" :hide-timestamp="true" class="operate">
					<el-card>
						<div :class="['bar-title', isOpen.operateLog ? 'open-card' : '']" @click="openCard('operateLog')">
							操作日志
						</div>
						<Operate v-show="isOpen.operateLog"></Operate>
					</el-card>
				</el-timeline-item>
			</el-timeline>
		</div>
		<el-dialog title="失败原因" :visible.sync="dialogVisible">
			<Dialog @handleCancel="handleCancel" :dialogData="dialogData"></Dialog>
		</el-dialog>
		<el-dialog title="终止测试" :visible.sync="dialogVisible1">
			<TerminateDialog @handleCancel="handleCancel1" :dialogData="dialogData"></TerminateDialog>
		</el-dialog>
	</div>
</template>

<script>
import Dialog from "@/components/taskDetail/Dialog";
import TerminateDialog from "@/components/taskDetail/TerminateDialog";
import ProcessLine from "@/components/public/ProcessLine";
import SubmitInfo from "@/components/taskDetail/SubmitInfo";
import AssignServer from "@/components/taskDetail/AssignServer";
import Test from "@/components/taskDetail/Test";
import Operate from "@/components/taskDetail/Operate";
import Compile from "@/components/taskDetail/Compile";
import RepositoryTest from "@/components/taskDetail/RepositoryTest";
import BaseTest from "@/components/taskDetail/BaseTest";
import OecnTest from "@/components/taskDetail/OecnTest";
import { taskListService } from "@/utils/taskListService";
import { mapMutations } from "vuex";
import { noLogin } from "@/utils/publicFunction.js";

export default {
	name: "projectDetail",
	components: {
		ProcessLine,
		SubmitInfo,
		AssignServer,
		Test,
		Operate,
		Compile,
		RepositoryTest,
		BaseTest,
		OecnTest,
		Dialog,
		TerminateDialog,
	},
	data() {
		return {
			dialogVisible: false,
			dialogData: {},
			dialogVisible1: false,
			statusList: [],
			currentIndex: 0,
			compileData: [
				{
					useCase: "已分配",
					taskId: "2016-05-02",
					startTime: "2022-07-01",
					endTime: "256.122.17.166",
					status: "失败",
					failCause: "12304",
				},
				{
					useCase: "已分配",
					taskId: "2016-05-03",
					startTime: "2022-07-01",
					endTime: "256.122.17.166",
					status: "成功",
					failCause: "原因",
				},
			],
			repositoryData: [
				{
					taskId: "2016-05-02",
					rpm: "已分配",
					startTime: "2022-07-01",
					endTime: "256.122.17.166",
					status: "失败",
					failCause: "12304",
				},
				{
					taskId: "2016-05-03",
					rpm: "已分配",
					startTime: "2022-07-01",
					endTime: "256.122.17.166",
					status: "成功",
					failCause: "",
				},
				{
					taskId: "2016-05-03",
					rpm: "已分配",
					startTime: "2022-07-01",
					endTime: "",
					status: "测试中",
					failCause: "",
				},
			],
			baseTestData: [
				{
					taskId: "2016-05-02",
					testNum: "已分配",
					startTime: "2022-07-01",
					endTime: "256.122.17.166",
					status: "失败",
					failCause: "12304",
				},
				{
					taskId: "2016-05-03",
					testNum: "已分配",
					startTime: "2022-07-01",
					endTime: "256.122.17.166",
					status: "成功",
					failCause: "",
				},
				{
					taskId: "2016-05-03",
					testNum: "已分配",
					startTime: "2022-07-01",
					endTime: "",
					status: "测试中",
					failCause: "",
				},
			],
			oecnData: [
				{
					testId: "2016-05-02",
					startTime: "2022-07-01",
					endTime: "256.122.17.166",
					status: "失败",
					failCause: "12304",
				},
				{
					testId: "2016-05-03",
					testNum: "已分配",
					startTime: "2022-07-01",
					endTime: "256.122.17.166",
					status: "成功",
					failCause: "",
				},
				{
					testId: "2016-05-03",
					testNum: "已分配",
					startTime: "2022-07-01",
					endTime: "",
					status: "测试中",
					failCause: "",
				},
			],
			isAssign: false,
			testProcess: [
				{
					content: "测试中",
					timestamp: "开始时间：2022:08:12,任务ID：123344144",
					icon: "el-icon-more",
					status: "active",
					nextStatus: "error",
				},
				{
					content: "第一次测试失败",
					timestamp: "开始时间：2022:08:12,任务ID：123344144,失败原因：xxxxx",
					icon: "el-icon-error",
					status: "error",
					nextStatus: "active",
				},
				{
					content: "第二次测试",
					timestamp: "完成时间：2022:08:12,任务ID：123344144",
					icon: "el-icon-more",
					status: "active",
					nextStatus: "error",
				},
				{
					content: "第二次测试失败",
					timestamp: "完成时间：2022:08:12,任务ID：123344144",
					icon: "el-icon-error",
					status: "error",
					nextStatus: "active",
				},
				{
					content: "三轮测试中",
					timestamp: "开始时间：2022:08:12,任务ID：123344144",
					icon: "el-icon-more",
					status: "active",
					nextStatus: "success",
				},
				{
					content: "已完成",
					timestamp: "完成时间：2022:08:12,任务ID：123344144",
					icon: "el-icon-success",
					status: "success",
					nextStatus: "",
				},
			],
			isOpen: {
				submitInfo: false,
				assignServer: false,
				compile: false,
				repository: false,
				baseTest: false,
				oecn: false,
				serverInit: false,
				test: false,
				testSuccess: false,
				serverRelease: false,
				certificateEnd: false,
				determineTest: false,
				operateLog: false,
			},
			scrollLeft: 0,
			data: {},
			statusStyle: {
				background: "#f97611",
				borderColor: "#f97611",
			},
			statusImg: require("@/assets/detail/orange.svg"),
			statusIcon: "el-icon-success",
			statusClass: "success",
		};
	},

	created() {
		this.getPreview();
		this.dialogData = {
			projectId: this.$route.query.projectId,
			requestId: this.$route.query.requestId,
		};
	},

	methods: {
		...mapMutations("detail", ["switchInfo"]),
		goBack() {
			if (document.referrer.indexOf("/workbench/task") > -1) {
				thi.$router.back();
			} else {
				this.$router.push("/workbench/task");
			}
		},

		// 获取详情
		getPreview() {
			taskListService.getPreview(this.$route.query.projectId, this.$route.query.requestId).then((res) => {
				if (res.data.code === this.$statusCode.LOGIN_FAILED) {
					noLogin();
				} else if (res.data.code === this.$statusCode.SUCCESS) {
					this.data = res.data.body;
					if (this.data.testScenario === "ihv") {
						this.statusList = [
							"提交测试任务",
							"分配服务器",
							"测试",
							"测试完成",
							"认证结束",
							"服务器释放",
						];
						this.dialogData.testScenario = "整机与板卡";
					} else {
						this.statusList = ["提交测试任务", "分配服务器", "测试", "测试完成", "服务器释放", "认证结束"];
						this.dialogData.testScenario = "商业软件";
					}
					this.switchInfo(this.data);
					this.handleStatus();
				}
			});
		},

		// 处理任务状态
		handleStatus() {
			switch (this.data.taskStatus) {
				case "submit":
					this.data.taskStatus = "提交测试任务";
					this.currentIndex = 0;
					break;
				case "waiting to allocate server":
					this.data.taskStatus = "等待分配服务器";
					this.currentIndex = 1;
					this.statusImg = require("@/assets/detail/orange.svg");
					this.statusStyle = {
						background: "#f97611",
						borderColor: "#f97611",
					};
					break;
				case "server init":
				case "server install":
				case "server allocated":
				case "testing":
					this.data.taskStatus = "测试";
					this.statusIcon = "el-icon-more";
					this.statusClass = "on-going";
					this.currentIndex = 2;
					this.statusImg = require("@/assets/detail/blue.svg");
					this.statusStyle = {
						background: "#07f",
						borderColor: "#07f",
					};
					break;
				case "test failed":
					this.data.taskStatus = "测试";
					this.statusIcon = "el-icon-error";
					this.statusClass = "error";
					this.currentIndex = 2;
					this.statusImg = require("@/assets/detail/blue.svg");
					this.statusStyle = {
						background: "#07f",
						borderColor: "#07f",
					};
					break;
				case "test finished":
				case "test done":
					this.data.taskStatus = "测试完成";
					this.statusIcon = "el-icon-success";
					this.statusClass = "success";
					this.currentIndex = 3;
					this.statusImg = require("@/assets/detail/green.svg");
					this.statusStyle = {
						background: "#24ab36",
						borderColor: "#24ab36",
					};
					break;
				case "server release":
					this.data.taskStatus = "服务器释放";
					this.currentIndex = this.data.testScenario === 'ihv' ? 5 : 4;
					this.statusImg = require("@/assets/detail/darkblue.svg");
					this.statusStyle = {
						background: "#2a739d",
						borderColor: "#2a739d",
					};
					break;
				case "certificated":
					this.data.taskStatus = "认证结束";
					this.currentIndex = this.data.testScenario === 'ihv' ? 4 : 5;
					this.statusImg = require("@/assets/detail/cyan.svg");
					this.statusStyle = {
						background: "#30b7bb",
						borderColor: "#30b7bb",
					};
					break;
				case "test terminated":
					this.data.taskStatus = "测试终止";
					if (this.data.server === null) {
						this.currentIndex = 1;
					} else {
						this.currentIndex = 2;
					}
					this.statusImg = require("@/assets/detail/gray.svg");
					this.statusStyle = {
						background: "#8d98aa",
						borderColor: "#8d98aa",
					};
					break;
				default:
					break;
			}
		},

		// 重新测试
		restartTest() {
      taskListService.restartTest(this.data.projectId, this.data.requestId).then((res) => {
				if (res.data.code === this.$statusCode.LOGIN_FAILED) {
					noLogin();
				} else if (res.data.code === this.$statusCode.SUCCESS) {

        }
      })
    },

		// 下载报告
		downUpload() {
      taskListService.downUpload(this.data.projectId, this.data.requestId).then((res) => {
				if (res.data.code === this.$statusCode.LOGIN_FAILED) {
					noLogin();
				} else if (res.data.code === this.$statusCode.SUCCESS) {

        }
      })
    },

		openCard(cardName) {
			if (cardName === "submitTest") {
				this.isOpen.submitInfo = !this.isOpen.submitInfo;
			} else if (cardName === "assignServer") {
				this.isOpen.assignServer = !this.isOpen.assignServer;
			} else if (cardName === "compile") {
				this.isOpen.compile = !this.isOpen.compile;
			} else if (cardName === "repository") {
				this.isOpen.repository = !this.isOpen.repository;
			} else if (cardName === "baseTest") {
				this.isOpen.baseTest = !this.isOpen.baseTest;
			} else if (cardName === "oecn") {
				this.isOpen.oecn = !this.isOpen.oecn;
			} else if (cardName === "serverInit") {
				this.isOpen.serverInit = !this.isOpen.serverInit;
			} else if (cardName === "test") {
				this.isOpen.test = !this.isOpen.test;
			} else if (cardName === "testSuccess") {
				this.isOpen.testSuccess = !this.isOpen.testSuccess;
			} else if (cardName === "serverRelease") {
				this.isOpen.serverRelease = !this.isOpen.serverRelease;
			} else if (cardName === "certificateEnd") {
				this.isOpen.certificateEnd = !this.isOpen.certificateEnd;
			} else if (cardName === "determineTest") {
				this.isOpen.determineTest = !this.isOpen.determineTest;
			} else if (cardName === "operateLog") {
				this.isOpen.operateLog = !this.isOpen.operateLog;
			}
		},

		handleCancel1() {
			this.dialogVisible1 = false;
		},

		handleCancel() {
			this.dialogVisible = false;
		},

		handelScroll() {
			this.scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
		},
	},

	mounted() {
		window.addEventListener("scroll", this.handelScroll, true);
		document.getElementsByTagName("body")[0].style.background = "#ebf0f6";
	},
};
</script>

<style lang="scss" scoped>
.wrap {
	min-width: 1700px;
	margin-top: 48px;
}

.detail-header {
	display: flex;
	position: fixed;
	z-index: 99;
	top: 48px;
	width: 100%;
	min-width: 1700px;
	padding: 0 40px 0 44px;
	height: 80px;
	background: #fefefe;
	box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.05);
	flex-direction: row;
	align-items: center;
	white-space: nowrap;
	.goBack {
		margin-right: 23px;
		cursor: pointer;
	}
	.flex-column {
		display: flex;
		flex-direction: column;
		margin-left: 18px;
		margin-right: 26px;
		font-size: 14px;
		font-family: HarmonyOS_Sans_SC_Medium;
	}
	.project-status {
		height: 24px;
		.el-tag {
			color: #fff;
			height: 24px;
			font-size: 14px;
			line-height: normal;
			padding: 0 7px;
			border-radius: 2px;
		}
	}
	.steps {
		width: 1142px;
	}
	.test-btn {
		display: flex;
		margin-left: auto;
		.opera-more {
			display: inline-block;
			margin-left: 16px;
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

.detail-content {
	padding-top: 128px;
	padding-bottom: 64px;
	background: #ebf0f6;
	width: 100%;
	padding-left: 40px;
	padding-right: 40px;
	font-family: HarmonyOS_Sans_SC_Medium;
}

.bar-title {
	color: #000;
	font-size: 16px;
	font-family: HarmonyOS_Sans_SC_Medium;
	font-weight: 600;
	cursor: pointer;
}

.bar-title::before {
	content: "";
	width: 16px;
	height: 16px;
	margin-right: 12px;
	display: inline-block;
	background: url("@/assets/list/arrow3.svg") no-repeat;
}

.open-card::before {
	background: url("@/assets/list/arrow1.svg") no-repeat;
}

.re-run {
	color: #07f;
	font-size: 14px;
	font-weight: 400;
	margin-left: 16px;
	cursor: pointer;
}

.base-test-title {
	color: #000;
	font-weight: 500;
	margin: 16px 0px 8px 28px;
	display: block;
}

.test-end {
	font-size: 12px;
	color: #8d98aa;
	margin-left: 28px;
}
.test-title {
	display: inline;
}
::v-deep .el-row {
	margin-left: 28px;
	margin-top: 16px;
}
::v-deep .el-row:first-child {
	margin-top: 0px;
}
::v-deep .el-button {
	font-size: 12px;
	height: 32px;
}
::v-deep .el-timeline-item__tail {
	top: 18px;
	left: 24px;
}
::v-deep .el-timeline-item__node {
	top: 18px;
	left: 17px;
	z-index: 2;
}
::v-deep .el-icon-more:before {
	content: url("@/assets/detail/ongoing2.svg");
}
::v-deep .el-icon-error:before {
	content: url("@/assets/detail/error2.svg");
}
::v-deep .el-icon-success:before {
	content: url("@/assets/detail/success2.svg");
}
::v-deep .el-timeline-item__icon {
	width: 21px;
	height: 21px;
}
::v-deep .operate .el-timeline-item__node {
	display: none;
}

::v-deep .el-timeline-item:nth-last-child(2) .el-timeline-item__tail {
	display: none;
}

::v-deep .success .el-timeline-item__tail {
	border-left: 2px solid #24ab35;
}

::v-deep .on-going .el-timeline-item__tail {
	border-left: 2px solid #07f;
}

::v-deep .error .el-timeline-item__tail {
	border-left: 2px solid #e53839;
}
::v-deep .el-timeline-item {
	margin-bottom: 4px;
}
::v-deep .el-timeline-item__wrapper {
	top: 0;
}
::v-deep .el-timeline-item__timestamp.is-top {
	margin-bottom: 0;
}

::v-deep .el-dialog {
	width: 516px !important;
	min-width: fit-content;
}
</style>
