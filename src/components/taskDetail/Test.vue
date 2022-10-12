<template>
  <div class="project-card">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in testData"
        :key="index"
        :icon="item.icon"
        :class="item.nextStatus === 'test failed' ? 'test-error' : (item.nextStatus === 'testing' ? 'test-active' : 'test-success')"
        >
        {{item.content}}
        <span class="rerun-test" v-if="item.status === 'test failed' && index === testProcess.length - 1">重跑测试</span>
        <br>
        {{item.timestamp}}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Test',
  data() {
    return {
      testData: [],
    }
  },
  computed: {
    ...mapState('detail', {
      detailData: 'detail'
    })
  },

  watch: {
    detailData: {
			handler(newVal) {
				newVal.testMessageList.forEach((item, index) => {
          let obj = {
            content: `第${item.retryTime}次测试`,
            timestamp: `开始时间：${item.startTime},任务ID：${item.taskId}`,
            icon: item.status === 'test failed' ? 'el-icon-error' : "el-icon-more",
            status: item.status,
            nextStatus: "",
          }
          if(item.failureReason) {
            obj.timestamp += `，失败原因：${item.failureReason}`;
            obj.content += '失败';
          }
          if(item.terminateReason) {
            obj.timestamp += `，终止原因：${item.terminateReason}`;
            obj.content = '测试终止';
          }
          if(item.status === 'test finished') {
            obj.timestamp = `完成时间：${newVal.finishTime},任务ID：${item.taskId}`;
            obj.content = '已完成'
          }
          this.testData.push(obj);
          if(index !== 0) {
            this.testData[index].nextStatus = item.status;
          }
        });
			},
			deep: true,
		}, 
  }
}
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
  content: url('@/assets/detail/ongoing1.svg') !important;
}

::v-deep .el-icon-error:before {
  content: url('@/assets/detail/error1.svg') !important;
}

::v-deep .el-icon-success:before {
  content: url('@/assets/detail/success1.svg') !important;
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