<template>
  <div>
    <el-form
      label-width="80px"
      :model="formData"
      label-position="left"
      :rules="rules"
      ref="formData"
    >
      <div class="form-top">
        <p class="form-title">基本信息</p>
        <el-form-item label="区域" prop="region">
          <el-select v-model="formData.region" placeholder="请选择">
            <el-option
              v-for="item in selectData.region"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源类型" prop="resourceType">
          <el-select v-model="formData.resourceType" placeholder="请选择">
            <el-option
              v-for="item in selectData.resourceType"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="算力平台" prop="platform">
          <el-select v-model="formData.platform" placeholder="请选择">
            <el-option
              v-for="item in selectData.platform"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formData.status" placeholder="请选择">
            <el-option
              v-for="item in selectData.status"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备ID" prop="deviceId">
          <el-input v-model="formData.deviceId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="服务器类型" prop="serverType">
          <el-select v-model="formData.serverType" placeholder="请选择">
            <el-option
              v-for="item in selectData.serverType"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务器型号" prop="modelType">
          <el-select v-model="formData.modelType" placeholder="请选择">
            <el-option
              v-for="item in selectData.modelType"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="BMC IP" prop="bmcIp">
          <el-input v-model="formData.bmcIp" placeholder="请输入"></el-input>
        </el-form-item>
      </div>
      <div class="form-bottom">
        <p class="form-title">硬件信息</p>
        <el-form-item label="CPU" prop="cpu">
          <el-select v-model="formData.cpu" placeholder="请选择">
            <el-option
              v-for="item in selectData.cpu"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内存" prop="ram">
          <div class="form-flex">
            <el-form-item prop="ram.size" :rules="rules.ramList.size">
              <el-select
                v-model="formData.ram.size"
                placeholder="请选择"
                class="dis-right"
              >
                <el-option
                  v-for="item in selectData.ram"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="ram.count" :rules="rules.ramList.count">
              <el-input-number
                v-model="formData.ram.count"
                @change="handleChange"
                :min="1"
              >
              </el-input-number>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="网卡" prop="nic">
          <div
            v-for="(nicItem, index) in formData.nic"
            :key="index"
            class="form-flex"
          >
            <el-form-item
              :prop="`nic.` + index + `.type`"
              :rules="rules.nicList.type"
            >
              <el-select
                v-model="nicItem.type"
                placeholder="请选择"
                class="dis-right"
              >
                <el-option
                  v-for="item in selectData.nic"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :prop="`nic.` + index + `.count`"
              :rules="rules.nicList.count"
            >
              <el-input-number
                v-model="nicItem.count"
                @change="handleChange"
                :min="1"
                class="dis-right"
              >
              </el-input-number>
              <i class="el-icon-circle-plus-outline"></i>
            </el-form-item>
          </div>
        </el-form-item>

        <el-form-item label="硬盘" prop="disk">
          <div
            v-for="(diskItem, index) in formData.disk"
            :key="index"
            class="form-flex"
          >
            <el-form-item
              :prop="`disk.` + index + `.type`"
              :rules="rules.diskList.type"
            >
              <el-select
                v-model="diskItem.type"
                placeholder="请选择类型"
                class="dis-right"
              >
                <el-option
                  v-for="item in selectData.diskType"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :prop="`disk.` + index + `.size`"
              :rules="rules.diskList.size"
            >
              <el-select
                v-model="diskItem.size"
                placeholder="请选择容量"
                class="dis-right"
              >
                <el-option
                  v-for="item in selectData.diskSize"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :prop="`disk.` + index + `.count`"
              :rules="rules.diskList.count"
            >
              <el-input-number
                v-model="diskItem.count"
                @change="handleChange"
                :min="1"
                class="dis-right"
              >
              </el-input-number>
              <i class="el-icon-remove-outline"></i>
              <i class="el-icon-circle-plus-outline"></i>
            </el-form-item>
          </div>
        </el-form-item>
      </div>

      <div class="form-footer">
        <el-button type="primary" @click="handelSubmit">提交</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { managementService } from "@/utils/managementService.js";
import { menuService } from "@/utils/menuService.js";
import { noLogin } from "@/utils/publicFunction.js";

export default {
  name: "AddEquipment",
  props: ['editData'],
  data() {
    return {
      formData: {
        deviceId: "",
        region: "",
        resourceType: "",
        platform: "",
        status: "",
        serverType: "",
        modelType: "",
        bmcIp: "",
        cpu: "",
        ram: {
          size: "",
          count: 1,
        },
        nic: [
          {
            size: "",
            count: 1,
          },
        ],
        disk: [
          {
            type: "",
            count: 1,
            size: "",
          },
        ],
      },
      rules: {
        region: [{ required: true, message: "请选择" }],
        deviceId: [{ required: true, message: "请输入设备ID" }],
        resourceType: [{ required: true, message: "请选择" }],
        platform: [{ required: true, message: "请选择" }],
        status: [{ required: true, message: "请选择" }],
        serverType: [{ required: true, message: "请选择" }],
        modelType: [{ required: true, message: "请选择区域" }],
        bmcIp: [{ required: true, message: "请输入" }],
        cpu: [{ required: true, message: "请选择" }],
        ram: [{ required: true, message: "" }],
        ramList: {
          size: [{ required: true, message: "请选择" }],
          count: [{ required: true, message: "请选择" }],
        },
        nic: [{ required: true, message: "" }],
        nicList: {
          type: [{ required: true, message: "请选择" }],
          count: [{ required: true, message: "请选择" }],
        },
        disk: [{ required: true, message: "" }],
        diskList: {
          type: [{ required: true, message: "请选择" }],
          size: [{ required: true, message: "请选择" }],
          count: [{ required: true, message: "请选择" }],
        },
      },
      selectData: {
        region: [],
        resourceType: [],
        platform: [],
        status: [],
        serverType: [],
        modelType: [],
        cpu: [],
        ram: [],
        nic: [],
        diskType: [],
        diskSize: [],
      },
    };
  },
  created() {
    this.getItem("ITEM_0008");
    this.getItem("ITEM_0009");
    this.getItem("ITEM_0010");
    this.getItem("ITEM_0011");
    this.getItem("ITEM_0012");
    this.getItem("ITEM_0013");
    this.getItem("ITEM_0014");
    this.getItem("ITEM_0015");
    this.getItem("ITEM_0016");
    this.getItem("ITEM_0017");
    this.getItem("ITEM_0018");
    this.$nextTick(() => {
      if(this.editData.deviceId) {
        this.formData = JSON.parse(JSON.stringify(this.editData)); 
      }
    }) 
  },

  watch: {
    editData: {
      handler(val) {
        if(val.deviceId) {
          this.formData = JSON.parse(JSON.stringify(val));
        }
      },
      deep: true,
    }
  },

  methods: {
    handleChange() {},

    getItem(id) {
      menuService.getItem(id).then((res) => {
        if (res.data.code === this.$statusCode.LOGIN_FAILED) {
          noLogin();
        } else if (res.data.code === this.$statusCode.SUCCESS) {
          res.data.body.forEach((item) => {
            switch (id) {
              case "ITEM_0008":
                this.selectData.region.push(item.name);
                break;
              case "ITEM_0009":
                this.selectData.platform.push(item.name);
                break;
              case "ITEM_0010":
                this.selectData.resourceType.push(item.name);
                break;
              case "ITEM_0011":
                this.selectData.status.push(item.name);
                break;
              case "ITEM_0012":
                this.selectData.serverType.push(item.name);
                break;
              case "ITEM_0013":
                this.selectData.modelType.push(item.name);
                break;
              case "ITEM_0014":
                this.selectData.cpu.push(item.name);
                break;
              case "ITEM_0015":
                this.selectData.ram.push(item.name);
                break;
              case "ITEM_0016":
                this.selectData.nic.push(item.name);
                break;
              case "ITEM_0017":
                this.selectData.diskType.push(item.name);
                break;
              case "ITEM_0018":
                this.selectData.diskSize.push(item.name);
                break;
              default:
                break;
            }
          });
        }
      });
    },

    handelSubmit() {
      this.$refs["formData"].validate((valid) => {
        if (valid) {
          managementService.addServer(this.formData).then((res) => {
            if (res.data.code === this.$statusCode.LOGIN_FAILED) {
              noLogin();
            } else if (res.data.code === this.$statusCode.SUCCESS) {
              this.$message({
                type: 'success',
                message: '设备新增成功!',
                showClose: true,
              });
              this.handleCancel(true);
            } else {
              this.$message({
                message: res.data.msg,
                type: "error",
              });
            }
          });
        }
      });
    },


    handleCancel(val) {
      this.$refs["formData"].resetFields();
      if(val) {
        this.$emit("handleCancel", val);
      }else {
        this.$emit("handleCancel");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form-top,
.form-bottom {
  background: #f4f6fa;
  border-radius: 4px;
  padding: 24px;
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
.form-flex {
  display: flex;
  ::v-deep .el-form-item__error {
    left: 0 !important;
  }
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
::v-deep .el-popper[x-placement^="bottom"] {
  display: none;
}
::v-deep .el-form-item__content {
  line-height: 36px;
}
::v-deep .el-icon-arrow-up:before {
  content: url("@/assets/list/arrow2.svg");
}
::v-deep .el-input-number {
  width: 110px;
  line-height: 36px;
  .el-input .el-input__inner {
    width: 110px;
  }
  .el-input-number__decrease,
  .el-input-number__increase {
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
::v-deep .el-icon-remove-outline,
.el-icon-circle-plus-outline {
  vertical-align: middle;
  cursor: pointer;
  margin-right: 10px;
}
::v-deep .el-form-item__error {
  left: 24px;
}
</style>
