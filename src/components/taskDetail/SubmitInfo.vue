<template>
  <div class="project-card">
    <el-row>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">提交时间</p>
          <p class="value">2022-07-11</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">测试人姓名</p>
          <p class="value">张三</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">测试人公司</p>
          <p class="value">华为技术有限公司</p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">测试人邮箱</p>
          <p class="value">2022-07-11</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">测试人电话</p>
          <p class="value">张三</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">方案名称</p>
          <p class="value">华为技术有限公司</p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">方案ID</p>
          <p class="value">2022-07-11</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">产品名称</p>
          <p class="value">张三</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">产品版本</p>
          <p class="value">华为技术有限公司</p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">产品类型</p>
          <p class="value">2022-07-11</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">算力平台</p>
          <p class="value">张三</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="flex-row">
          <p class="label">服务器类型</p>
          <p class="value">TaiShan200</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'SubmitInfo'
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
