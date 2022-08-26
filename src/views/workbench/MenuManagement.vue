<template>
  <div class="menu-box">
    <el-button type="primary" @click="dialogVisible = true">创建一级下拉框</el-button>
    <el-row class="menu-col">
      <el-col :span="9" class="flex-left">
        <p>根目录</p>
        <el-tree
          :data="data"
          node-key="id"
          :expand-on-click-node="false"
          :current-node-key="handelCurrent"
          :highlight-current="true"
          :default-expanded-keys="defaultExpandedKeys"
        >
          <template slot-scope="{ node, data }">
            <div class="custom-tree-node">
              <div v-if="!data.isEdit" class="flex-row">
                <span>{{ data.label }}</span>
                <span class="edit-icon">
                  <i
                    class="el-icon-circle-plus-outline"
                    @click="() => append(data)"
                  ></i>
                  <i class="el-icon-edit-outline"></i>
                  <i
                    class="el-icon-delete"
                    @click="() => remove(node, data)"
                  ></i>
                </span>
              </div>

              <div v-if="data.isEdit" class="flex-row">
                <span>
                  <el-input v-model="data.label"></el-input>
                </span>
                <span class="edit-icon input-icon">
                  <i class="el-icon-circle-check"></i>
                  <i
                    class="el-icon-delete"
                    @click="() => remove(node, data)"
                  ></i>
                </span>
              </div>
            </div>
          </template>
        </el-tree>
      </el-col>

      <el-col :span="14" class="flex-right">
        <div class="flex-row">
          <p>下拉框详情</p>
          <div>
            <el-button>编辑</el-button>
            <el-button>保存</el-button>
            <el-button>取消</el-button>
          </div>
        </div>
        
          <Dialog></Dialog>
      </el-col>
    </el-row>
    <el-dialog
      title="创建下拉框"
      :visible.sync="dialogVisible"
      width="656">
      <Dialog></Dialog>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Dialog from '@/components/menuManagement/Dialog.vue'
export default {
  name: "MenuManagement",
  components: {
    Dialog,
  },
  data() {
    return {
      defaultExpandedKeys: [2],
      dialogVisible: false,
      data: [
        {
          label: "问题类型/ITEM_0001",
          isEdit: false,
          id: 1,
          children: [
            {
              label: "二级 1-1",
              isEdit: false,
            },
          ],
        },
        {
          label: "测试机构/ITEM_0002",
          isEdit: false,
          id: 2,
          children: [
            {
              label: "二级 2-1",
              isEdit: false,
            },
            {
              label: "二级 2-2",
              isEdit: false,
            },
          ],
        },
        {
          label: "服务器管理-群组/ITEM_0003",
          isEdit: false,
          id: 3,
          children: [
            {
              label: "二级 3-1",
              isEdit: false,
            },
            {
              label: "二级 3-2",
              isEdit: false,
            },
          ],
        },
      ],
      text: "",
      handelCurrent: "",
    };
  },
  methods: {
    getCurrent(node) {
      console.log(node);
    },
    handleOpen(item) {
      item.isOpen = !item.isOpen;
    },
    addClass(index) {
      this.isActive = index;
    },

    append(data) {
      const newChild = { label: "", isEdit: true, children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      console.log(node);
      console.log(children);
      console.log(data);
      const index = children.findIndex((d) => d.label === data.label);
      children.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-box {
  margin: 24px 40px 24px 0px;
  background: #fefefe;
  padding: 24px;
  .menu-col {
    margin-top: 16px;
  }
  .flex-left {
    border: 1px solid #dfe5ef;
    margin-right: 20px;
    border-radius: 4px;
    padding: 24px;
    p {
      margin: 0;
      font-size: 16px;
      color: #000000;
      font-weight: 700;
      margin-bottom: 12px;
    }
    .flex-row {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }

  .flex-right {
    border: 1px solid #dfe5ef;
    border-radius: 4px;
    flex: 1;
    padding: 16px 16px 16px 24px;
    min-height: 280px;
    .flex-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
    }
    p {
      margin: 0;
      font-size: 16px;
      color: #000000;
      font-weight: 700;
    }
  }
}

::v-deep .el-tree-node__content {
  height: 40px;
  padding: 10px 0;
  color: #4e5865;
  .edit-icon {
    display: none;
    i {
      margin-right: 11px;
    }
  }
  .input-icon {
    line-height: 36px;
    display: inline-block;
  }
  .is-leaf {
    display: none;
  }
}
::v-deep .el-tree-node__content:hover {
  .edit-icon {
    display: inline-block;
  }
}
::v-deep .custom-tree-node {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  .el-input {
    width: 420px;
  }
}

::v-deep .is-expanded .el-icon-caret-right::before {
  content: url("@/assets/menu/arrow5.svg");
}

::v-deep .el-tree-node__content > .el-tree-node__expand-icon {
  padding: 0;
  margin-right: 12px;
}
::v-deep .el-tree-node__expand-icon.expanded {
  transform: none;
}
::v-deep .el-tree-node__children .el-tree-node__content {
  padding-left: 48px !important;
}
::v-deep .is-current > .el-tree-node__content {
  color: #000000;
  font-weight: 500;
}

::v-deep .el-tree > .is-expanded > .el-tree-node__content {
  color: #000000;
  font-weight: 500;
}
::v-deep .el-tree-node:focus > .el-tree-node__content {
  background-color: transparent;
}
::v-deep
  .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background-color: transparent;
}

::v-deep .el-dialog {
  width: 656px;
}
</style>
