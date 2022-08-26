<template>
  <div>
    <el-form label-width="80px" :model="formData" label-position="left" :rules="rules">
      <div class="form-top">
        <p class="form-title">基本信息</p>
        <el-form-item label="区域">
          <el-select v-model="formData.region"  placeholder="请选择">
            <el-option
              v-for="item in regionOptions"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源类型">
          <el-select v-model="formData.resourceType"  placeholder="请选择">
            <el-option
              v-for="item in regionOptions"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="算力平台">
          <el-select v-model="formData.platform"  placeholder="请选择">
            <el-option
              v-for="item in regionOptions"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机架号">
          <el-input-number 
          v-model="formData.rackNo" 
          @change="handleChange" 
          :min="1">
          </el-input-number> 
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formData.status"  placeholder="请选择">
            <el-option
              v-for="item in regionOptions"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="formData.deviceName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="服务器类型">
          <el-select v-model="formData.serverType"  placeholder="请选择">
            <el-option
              v-for="item in regionOptions"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务器型号">
          <el-select v-model="formData.serverModel"  placeholder="请选择">
            <el-option
              v-for="item in regionOptions"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务器用途">
          <el-select v-model="formData.serverUsage"  placeholder="请选择">
            <el-option
              v-for="item in regionOptions"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="BMC IP">
          <el-input v-model="formData.BMC" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="MAC 地址">
          <el-input v-model="formData.MAC" placeholder="请输入"></el-input>
        </el-form-item>
      </div>
      <div class="form-bottom">
        <p class="form-title">硬件信息</p>
        <el-form-item label="CPU">
          <el-select v-model="formData.CPU"  placeholder="请选择">
            <el-option
              v-for="item in regionOptions"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内存">
          <el-select v-model="formData.memory"  placeholder="请选择" class="dis-right">
            <el-option
              v-for="item in regionOptions"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <el-input-number 
          v-model="formData.rackNo" 
          @change="handleChange" 
          :min="1">
          </el-input-number> 
        </el-form-item>
        <el-form-item label="网卡">
          <el-select v-model="formData.network"  placeholder="请选择" class="dis-right">
            <el-option
              v-for="item in regionOptions"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <el-input-number 
          v-model="formData.rackNo" 
          @change="handleChange" 
          :min="1"
          class="dis-right">
          </el-input-number>
          <i class="el-icon-circle-plus-outline"></i> 
        </el-form-item>
        <el-form-item label="硬盘">
          <el-select v-model="formData.disk"  placeholder="请选择类型" class="dis-right">
            <el-option
              v-for="item in regionOptions"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <el-select v-model="formData.disk"  placeholder="请选择容量" class="dis-right">
            <el-option
              v-for="item in regionOptions"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <el-input-number 
          v-model="formData.rackNo" 
          @change="handleChange" 
          :min="1"
          class="dis-right"
          >
          </el-input-number>
          <i class="el-icon-remove-outline"></i>
          <i class="el-icon-circle-plus-outline"></i>
        </el-form-item>
      </div>

      <div class="form-footer">
        <el-button type="primary">提交</el-button>
        <el-button>取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddEquipment",
  props: [],
  data() {
    return {
      formData: {
        region: "",
        resourceType: "",
        platform: "",
        rackNo: "",
        status: "",
        deviceName: "",
        serverType: "",
        serverModel: "",
        serverUsage: "",
        BMC: "",
        MAC: "",
        CPU: "",
        memory: "",
        network: "",
        disk: "",
      },
      regionOptions: ['东莞', '广州', '北京'],
      rules: {
        region: [{required: true, message: '请选择区域'}]
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.form-top,
.form-bottom {
  background: #f4f6fa;
  border-radius: 4px;
  padding: 16px 24px;
  margin-bottom: 8px;
  min-width: 500px;
  ::v-deep .el-form-item:last-child {
    margin-bottom: 0px;
  }
}
.form-bottom {
  margin-bottom: 79px;
}
.form-footer {
  position: fixed;
  bottom: 0;
  z-index: 99;
  margin-left: -24px;
  width: 100%;
  height: 70px;
  padding: 24px 18px 16px 24px;
  background: #fefefe;
  box-shadow: 0 -4px 10px 0 rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 14px;
  font-weight: 700;
  color: #000;
  margin: 0;
  margin-bottom: 16px;
}
.dis-right {
  margin-right: 8px;
}
::v-deep .el-form-item__label {
  font-size: 14px;
  color: #4e5865;
  font-weight: 400;
  margin-right: 24px;
  padding: 0;
}
::v-deep .el-input .el-input__inner {
  width: 260px;
  border: 1px solid #c3cedf;
  border-radius: 2px;
}
::v-deep .el-input {
  width: 260px;
}
::v-deep .el-form-item {
  margin-bottom: 16px;
}
::v-deep .el-popper[x-placement^=bottom] {
 display: none;
}
::v-deep .el-form-item__content {
  line-height: 36px;
}
::v-deep .el-icon-arrow-up:before {
  content: url('@/assets/list/arrow2.svg');
}
::v-deep .el-input-number {
  width: 110px;
  line-height: 36px;
  .el-input .el-input__inner {
    width: 110px;
  }
  .el-input-number__decrease, .el-input-number__increase {
    width: 35px;
    height: 36px;
    background: transparent;
  }
  .el-input-number__increase {
    border-left: 1px solid #c3cedf;
  }
  .el-input-number__decrease {
    border-right: 1px solid #c3cedf;
  }
}
::v-deep .el-icon-remove-outline, .el-icon-circle-plus-outline {
  vertical-align: middle;
}
</style>
