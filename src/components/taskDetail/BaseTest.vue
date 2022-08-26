<template>
  <div class="table-list">
    <el-table :data="tableData" border resizable style="width: 100%">
      <el-table-column prop="testNum" label="测试次数"> </el-table-column>
      <el-table-column prop="taskId" label="任务ID"> </el-table-column>
      <el-table-column prop="startTime" label="开始时间"> </el-table-column>
      <el-table-column prop="endTime" label="结束时间">
        <template v-slot="data">
          <span>{{ data.row.endTime !== "" ? data.row.endTime : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="data">
          <span
            :class="[
              'status',
              data.row.status === '成功'
                ? 'green'
                : data.row.status === '测试中'
                ? 'blue'
                : '',
            ]"
            >{{ data.row.status }}</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="failCause" label="失败原因">
        <template v-slot="data">
          <span>{{ data.row.failCause !== '' ? data.row.failCause : '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template v-slot="data">
          <span class="re-btn">{{data.row.status === '失败' ? '重跑' : '-'}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "BaseTest",
  props: ["tableData"],
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.table-list {
  margin-left: 28px;
  margin-right: 24px;
  .status {
    margin-left: 20px;
  }
  .status::before {
    position: absolute;
    display: block;
    width: 8px;
    height: 8px;
    background: #e32020;
    border-radius: 50%;
    content: "";
    top: 50%;
    transform: translate(0, -50%);
  }
  .green::before {
    background: #24ab36;
  }
  .blue::before {
    background: #07f;
  }
  .re-btn {
    color: #07f;
    cursor: pointer;
    padding-right: 16px;
    font-weight: 400;
  }
}
::v-deep .el-table--border .el-table__cell:first-child .cell {
  padding-left: 16px;
}
::v-deep .el-table--border th.el-table__cell,
.el-table__fixed-right-patch {
  background: #f4f6fa;
  height: 36px;
}
::v-deep .el-table__row {
  height: 48px;
}
</style>
