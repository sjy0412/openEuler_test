<template>
  <div>
    <el-form ref="form" :model="form" label-position="left" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name" placeholder="请输入">
          </el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.desc" maxlength="100" show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-radio-group v-model="form.permission">
            <el-radio label="所有用户" name="permission"></el-radio>
            <el-radio label="项目支撑人员" name="permission"></el-radio>
            <el-radio label="实验室管理员" name="permission"></el-radio>
            <el-radio label="管理员" name="permission"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>   
  </div>
</template>

<script> 
export default {
  name: 'Dialog',
  data() {
    return {
      form: {
        name: '',
        desc: '',
        permission: '', 
      },
      
    }
  },

  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input {
  width: 100%;
}
::v-deep .el-radio {
  color: #000;
}

::v-deep .el-radio__input.is-checked .el-radio__inner {
  border-color: #07f;
  background: #fff;
}
::v-deep .el-radio__input.is-checked .el-radio__inner::after {
  width: 8px;
  height: 8px;
  background: #07f;
}
::v-deep .el-textarea__inner {
  min-height: 104px !important;
}
::v-deep .el-form-item {
  margin-bottom: 16px;
}
</style>