<template>
	<div class="project-card">
		<el-timeline>
			<el-timeline-item
				v-for="(item, index) in testData"
				:key="index"
				:icon="item.icon"
 				:class="
					item.nextStatus === 'test failed'
						? 'test-error'
						: item.nextStatus === 'testing'
						? 'test-active'
						: 'test-success'
				"
			>
				{{ item.content }}
				<br />
				{{ item.timestamp }}
			</el-timeline-item>
		</el-timeline>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "ServerInit",
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
            content: '初始化中',
            timestamp: `开始时间：${res.startTime}`,
            icon: "el-icon-more",
            status: "",
            nextStatus: "",
        };
        this.testData.push(obj);
        if(res.finishTime) {
          let obj1 = JSON.parse(JSON.stringify(obj));
          if(res.status === 'test finished') {
            obj1.content = '初始化完成';
            obj1.icon =  "el-icon-success",
            obj1.timestamp = `结束时间：${res.finishTime}，任务ID：${res.taskId}`
          }else if(res.status === 'test failed'){
            obj1.content = '初始化失败';
            obj1.icon = "el-icon-error";
            obj1.timestamp = `结束时间：${res.finishTime}，任务ID：${res.taskId}，失败原因：${res.failureReason ? res.failureReason : '-'}`
          }
          this.testData[0].nextStatus = res.status;
          this.testData.push(obj1);
        }
      }
      
    }
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
