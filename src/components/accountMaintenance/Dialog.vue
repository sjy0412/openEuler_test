<template>
  <div>
    <el-form ref="form" :model="form" label-position="left" label-width="80px">
        <el-form-item label="测试机构">
          <el-select v-model="form.testOrganization" placeholder="请选择">
            <el-option v-for="item in testOptions" :label="item.label" :key="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-radio-group v-model="form.desc">
            <el-radio label="项目支撑人员" name="desc"></el-radio>
            <el-radio label="实验室管理员" name="desc"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="群组">
          <el-radio-group v-model="form.group">
            <el-radio label="商业软件" name="group"></el-radio>
            <el-radio label="整机与板卡" name="group"></el-radio>
            <el-radio label="openEuler商业发行版" name="group"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="成员">
          <div class="flex-row" v-for="(item, index) in form.member" :key="index">
            <el-input v-model="item.name" placeholder="请输入姓名"></el-input>
            <el-input v-model="item.workNum" placeholder="请输入工号"></el-input>
            <el-input v-model="item.phone" placeholder="请输入电话"></el-input>
            <el-input v-model="item.email" class="last-input" placeholder="请输入邮箱"></el-input>  
            <div class="el-icon">
              <i class="el-icon-remove-outline" @click="deleteMember(index)" v-if="form.member.length> 1"></i>
              <i class="el-icon-circle-plus-outline" @click="addMember"></i>
            </div>
          </div>
        </el-form-item>
      </el-form>
      
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: ['dialogVisible'],
  data() {
    return {
      form: {
        testOrganization: '',
        desc: '',
        group: '',
        member: [{
          name: '',
          workNum: '',
          phone: '',
          email: '',
        }]
      },
      testOptions: [{
        label: '北京鲲鹏',
        value: '北京鲲鹏'
      }]
    }
  },

  methods: {
    addMember() {
      this.form.member.push({
         name: '',
        workNum: '',
        phone: '',
        email: '',
      })
    },
    deleteMember(index) {
      this.form.member.splice(index, 1);
    }
  }
}
</script>

<style lang="scss" scoped>
  .flex-row {
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
    .el-input {
      width: 160px;
      margin-right: 8px;
    }
    .last-input {
      width: 248px;
    }
  }
  .el-icon {
    i {
      cursor: pointer;
      margin-right: 10px;
      color: #8d98aa;
    }
  }
::v-deep .el-select>.el-input {
    width: 752px;
}
::v-deep .el-form-item__label {
  line-height: 36px;
  color: #4e5865;
}
::v-deep .el-form-item__content {
  line-height: 36px;
}
::v-deep .el-radio {
  color: #000;
}

::v-deep .el-icon-arrow-up:before {
  content: url('@/assets/list/arrow2.svg');
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
</style>