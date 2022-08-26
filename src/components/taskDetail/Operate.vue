<template>
  <div class="project-card">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in operateLog"
        :key="index"
        class="operate"
        >
        <span>操作</span>
        <br>
        <span class="tips">{{item.time + '，操作人：' + item.operator}}</span>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: 'Operate',
  props: ['operateLog'],
}
</script>

<style lang="scss" scoped>
::v-deep .el-timeline-item__wrapper {
  padding-left: 48px !important;
}
::v-deep .operate .el-timeline-item__node {
    display: block !important;
    left: 26px !important;
    top: 6px !important;
}
::v-deep .el-timeline-item__tail {
    display: block !important;
    top: 14px !important;
    left: 31px !important;
    border-left: 2px solid #80bbff !important;
}

::v-deep .el-timeline-item:last-child .el-timeline-item__tail {
  display: none !important;
}
::v-deep .el-timeline-item__node {
    background-color: #fff;
    border-radius: 50%;
    border: 2.4px solid #07f;
}
::v-deep .el-timeline-item__content {
  color: #000;
  .tips {
    color: #8d98aa;
    font-size: 12px;
  }
}
</style>