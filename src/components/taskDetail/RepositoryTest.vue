<template>
  <div class="table-list">
    <el-table :data="tableData" border resizable style="width: 100%">
      <el-table-column prop="taskId" label="任务ID"> </el-table-column>
      <el-table-column prop="rpm" label="rpm包范围"> </el-table-column>
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
          <span v-if="data.row.failCause !== ''">{{ data.row.failCause }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template v-slot="data">
          <span v-if="data.row.status === '失败'" class="re-btn">重跑</span>
          <span v-if="data.row.status === '失败'" class="re-btn">补充原因</span>
          <span class="re-btn" @click="showLog = true">查看日志</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="showLog"
      width="30%"
    >
      <Operate :operateLog="operateLog"></Operate>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showLog = false"
          >关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Operate from "@/components/taskDetail/Operate";
export default {
  name: "RepositoryTest",
  props: ["tableData", 'operateLog'],
  components: {
    Operate
  },
  data() {
    return {
      showLog: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.table-list {
  margin-left: 28px;
  margin-right: 24px;
  margin-top: 16px;
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
