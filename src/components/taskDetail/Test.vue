<template>
	<div class="project-card">
		<el-timeline>
			<el-timeline-item
				v-for="(item, index) in testData"
				:key="index"
				:icon="item.icon"
 				:class="
					item.nextStatus === '失败'
						? 'test-error'
						: item.nextStatus === '测试中'
						? 'test-active'
						: 'test-success'
				"
			>
				{{ item.content }}
				<span class="rerun-test" v-if="item.icon === 'el-icon-error'" @click="handleRerun"
					>重跑测试</span
				>
				<br />
				{{ item.timestamp }}
			</el-timeline-item>
		</el-timeline>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { taskListService } from "@/utils/taskListService";

export default {
	name: "Test",
	data() {
		return {
			testData: [],
		};
	},
	computed: {
		...mapState("detail", {
			detailData: "detail",
		}),
	},

	created() {
    this.handleData();
	},

  methods: {
    handleData() {
      if(this.detailData.testMessageList && this.detailData.testMessageList.length === 1) {
        let res = this.detailData.testMessageList[0]
        let obj = {
            content: '测试中',
            timestamp: `开始时间：${res.startTime}，任务ID：${res.taskId}`,
            icon: "el-icon-more",
            status: "",
            nextStatus: "",
        };
        this.testData.push(obj);
        if(res.finishTime) {
          let obj1 = JSON.parse(JSON.stringify(obj));
          if(res.status === 'test finished') {
            obj1.content = '测试完成';
            obj1.icon =  "el-icon-success",
            obj1.timestamp = `结束时间：${res.finishTime}，任务ID：${res.taskId}`
          }else if(res.status === 'test failed'){
            obj1.content = '测试失败';
            obj1.icon = "el-icon-error";
            obj1.timestamp = `结束时间：${res.finishTime}，任务ID：${res.taskId}，失败原因：${res.failureReason ? res.failureReason : '-'}`
          }
          this.testData[0].nextStatus = res.status;
          this.testData.push(obj1);
        }
      }else if(this.detailData.testMessageList && this.detailData.testMessageList.length > 1){
        this.detailData.testMessageList.forEach((item, index) => {
          let obj = {
            content: item.retryTime > 0 ? `第${item.retryTime}次${item.testSuite}` : item.testSuite,
            timestamp: `开始时间：${item.startTime}，任务ID：${item.taskId}`,
            icon: "el-icon-more",
            status: "测试中",
            nextStatus: item.status,
          };
          this.testData.push(obj);
          let obj1 = JSON.parse(JSON.stringify(obj));
          if (item.status === "失败") {
            obj1.timestamp = `结束时间：${item.endTime}，任务ID：${item.taskId}，失败原因：${item.failureReason ? item.failureReason : '-'}`;
            obj1.content += "失败";
            obj1.icon = "el-icon-error";
            obj1.nextStatus = "测试中";
            this.testData.push(obj1);
          }else if (item.status === "成功") {
            obj1.icon = "el-icon-success"
            obj1.timestamp = `完成时间：${item.finishTime}，任务ID：${item.taskId}`;
            obj1.content = "已完成";
            obj1.nextStatus = "测试中";
            this.testData.push(obj1);
          }
		    });
      }
      
    },
    
		// 重跑测试
    handleRerun() {
      console.log(this.detailData);
      taskListService.rerunTest(this.detailData.projectId, this.detailData.requestId).then((res) => {
				if (res.data.code === this.$statusCode.LOGIN_FAILED) {
					noLogin();
				} else if (res.data.code === this.$statusCode.SUCCESS) {

        }
      })
    },
  }
};
</script>

<style lang="scss" scoped>
.rerun-test {
	color: #07f;
	cursor: pointer;
	font-size: 14px;
	margin-left: 16px;
}

::v-deep .el-timeline-item__wrapper {
	padding-bottom: 16px;
}

::v-deep .el-icon-more:before {
	content: url("@/assets/detail/ongoing1.svg") !important;
}

::v-deep .el-icon-error:before {
	content: url("@/assets/detail/error1.svg") !important;
}

::v-deep .el-icon-success:before {
	content: url("@/assets/detail/success1.svg") !important;
}

::v-deep .el-timeline-item__node--normal {
	top: 8px !important;
}

::v-deep .el-timeline-item__tail {
	top: 8px !important;
	left: 34px !important;
	display: block !important;
}

::v-deep .el-timeline-item:last-child .el-timeline-item__tail {
	display: none !important;
}

::v-deep .el-timeline-item__node {
	left: 29px !important;
}

::v-deep .test-error .el-timeline-item__tail {
	border-left: 2px solid #f19190 !important;
}

::v-deep .test-active .el-timeline-item__tail {
	border-left: 2px solid #80bbff !important;
}

::v-deep .test-success .el-timeline-item__tail {
	border-left: 2px solid #91d59a !important;
}
::v-deep .el-timeline-item__wrapper {
	padding-left: 52px !important;
}
</style>
