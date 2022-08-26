<template>
  <div class="project-card">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in testProcess"
        :key="index"
        :icon="item.icon"
        :class="item.nextStatus === 'error' ? 'test-error' : (item.nextStatus === 'active' ? 'test-active' : 'test-success')"
        >
        {{item.content}}
        <span class="rerun-test" v-if="item.status === 'error' && index === testProcess.length - 1">重跑测试</span>
        <br>
        {{item.timestamp}}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>

export default {
  name: 'Test',
  props: ['testProcess'],
  data() {
    return {
    }
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