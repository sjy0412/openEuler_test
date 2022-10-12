<template>
  <div class="project-card">
    <el-row>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">提交时间</p>
          <p class="value">{{ data.requestTime ? data.requestTime : '-' }}</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">测试人姓名</p>
          <p class="value">{{ data.userName ? data.userName : '-' }}</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">测试人公司</p>
          <p class="value">{{ data.companyName ? data.companyName : '-' }}</p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">测试人邮箱</p>
          <p class="value">{{ data.email ? data.email : '-' }}</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">测试人电话</p>
          <p class="value">{{ data.telephone ? data.telephone : '-' }}</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">方案名称</p>
          <p class="value">{{ data.solutionName ? data.solutionName : '-' }}</p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">方案ID</p>
          <p class="value">{{ data.projectId ? data.projectId : '-' }}</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">产品名称</p>
          <p class="value">{{ data.productName ? data.productName : '-' }}</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">产品版本</p>
          <p class="value">{{ data.productVersion ? data.productVersion : '-' }}</p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">产品类型</p>
          <p class="value">{{ data.productType ? data.productType : '-' }}</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">算力平台</p>
          <p class="value">{{ data.platform ? data.platform : '-' }}</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">服务器类型</p>
          <p class="value">{{ data.serverType ? data.serverType : '-' }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SubmitInfo',

  computed: {
    ...mapState('detail', {
      data: 'detail'
    })
  }
};
</script>

<style lang="scss" scoped>
  .flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  .label {
    color: #4e5865;
    margin: 0;
    width: 70px;
    margin-right: 26px;
  }
  .value {
    margin: 0;
    color: #000;
    flex: 1;
  }
}
</style>
