<template>
  <div class="table-list">
    <el-table
    :data="assignData"
    border
    resizable
    style="width: 100%"
    >
    <el-table-column
      prop="status"
      label="状态">
      <template v-slot="data">
        <span :class="['status', data.row.status === '已分配' ? 'green' : '']">{{data.row.status}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="time"
      label="开始时间">
    </el-table-column>
    <el-table-column
      prop="rank"
      label="位次"
      v-if="!isAssign"
      >
    </el-table-column>
    <el-table-column
      prop="assignTime"
      label="分配到服务器时间"
      v-if="isAssign"
      >
    </el-table-column>
    <el-table-column
      prop="IP"
      label="IP地址"
      v-if="isAssign"
      >
    </el-table-column>
    <el-table-column
      prop="region"
      label="区域"
      v-if="isAssign"
      >
    </el-table-column>
    <el-table-column
      prop="account"
      label="账号"
      v-if="isAssign"
      >
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码"
      v-if="isAssign"
      >
    </el-table-column>
    <el-table-column
      prop="jumper"
      label="跳板机IP"
      v-if="isAssign"
      >
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  name: 'AssignServer',
  props: ['assignData', 'isAssign'],
  data() {
      return {
        
      }
    }
}
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
      background: #f97611;
      border-radius: 50%;
      content: "";
      top: 50%;
      transform: translate(0, -50%);
    }
    .green::before {
      background: #24ab36 ;
    }
  }
::v-deep .el-table--border .el-table__cell:first-child .cell {
  padding-left: 16px;
}
::v-deep .el-table--border th.el-table__cell, .el-table__fixed-right-patch {
  background: #f4f6fa;
  height: 36px;
}
::v-deep .el-table__row {
  height: 48px;
}
</style>