<template>
  <div class="taskList-box">
    <div class="list-box">
      <div class="search-box">
        <div>
          <el-button type="primary" @click="addPerson">添加人员</el-button>
          <el-button
            :disabled="multipleSelection.length === 0"
            @click="handelMulDelete"
            >批量删除</el-button
          >
        </div>
        <div class="task-search">
          <el-input
            type="text"
            placeholder="请输入搜索内容"
            clearable
            v-model="keyword"
            @change="searchData"
            prefix-icon="el-icon-search"
          >
          </el-input>
          <FilterHeader
            :selectOption="headerLabel"
            @handleFilter="filterHeader"
            :headerInit="headerInit"
            :filterSelected="headerSelected"
          ></FilterHeader>
        </div>
      </div>

      <div class="filter-list" v-if="chooseList.length > 0">
        <span class="found">
          已找到
          <el-tag
            type="round"
            size="small"
            style="margin-left: 5px; color: #252b3a"
          >
            {{ pagination.total }}
          </el-tag>
          :
        </span>
        <el-tooltip
          class="item"
          v-for="(tag, index) in chooseList"
          :key="index"
          effect="light"
          :content="tag.value"
          placement="top"
        >
          <el-tag type="info" closable @close="handleClose(tag)">
            {{ tag.value }}
          </el-tag>
        </el-tooltip>
        <span @click="clearAll()" class="clear-all">全部清除</span>
      </div>
      <div class="task-table">
        <el-table
          :data="tableData"
          style="width: 100%"
          ref="filterTable"
          tooltip-effect="light tooltip-end"
          @filter-change="filterChange"
          @selection-change="handleSelectionChange"
          resizable
          border
        >
          <template slot="empty">
            <img src="@/assets/list/noData.svg" />
          </template>
          <el-table-column type="selection" width="30"> </el-table-column>
          <el-table-column prop="name" :label="headerLabel[0].label">
          </el-table-column>
          <el-table-column
            prop="workNum"
            :label="headerLabel[1].label"
            show-overflow-tooltip
            v-if="headerSelected.includes(headerLabel[1].label)"
          >
          </el-table-column>
          <el-table-column
            prop="testOrganization"
            show-overflow-tooltip
            v-if="headerSelected.includes(headerLabel[2].label)"
          >
            <div slot="header" slot-scope="{}">
              <FilterTable
                :selectOption="filters.testOrganization"
                :headerLabel="headerLabel[2].label"
                @handleFilter="filterChange"
                :filterSelected="filterSelected.testOrganization"
                filterKey="testOrganization"
              >
              </FilterTable>
            </div>
          </el-table-column>
          <el-table-column
            prop="role"
            show-overflow-tooltip
            v-if="headerSelected.includes(headerLabel[3].label)"
          >
            <div slot="header" slot-scope="{}">
              <FilterTable
                :selectOption="filters.role"
                :headerLabel="headerLabel[3].label"
                @handleFilter="filterChange"
                :filterSelected="filterSelected.role"
                filterKey="role"
              >
              </FilterTable>
            </div>
          </el-table-column>
          <el-table-column
            prop="group"
            :label="headerLabel[4].label"
            show-overflow-tooltip
            v-if="headerSelected.includes(headerLabel[4].label)"
          >
            <div slot="header" slot-scope="{}">
              <FilterTable
                :selectOption="filters.group"
                :headerLabel="headerLabel[4].label"
                @handleFilter="filterChange"
                :filterSelected="filterSelected.group"
                filterKey="group"
              >
              </FilterTable>
            </div>
          </el-table-column>
          <el-table-column
            prop="phone"
            :label="headerLabel[5].label"
            show-overflow-tooltip
            v-if="headerSelected.includes(headerLabel[5].label)"
          >
          </el-table-column>
          <el-table-column
            prop="email"
            :label="headerLabel[6].label"
            show-overflow-tooltip
            v-if="headerSelected.includes(headerLabel[6].label)"
          >
          </el-table-column>
          <el-table-column
            prop="operate"
            :label="headerLabel[7].label"
            minWidth="120"
            v-if="headerSelected.includes(headerLabel[7].label)"
            column-key="ope"
            show-overflow-tooltip
          >
            <template v-slot="data">
              <div class="opera-btn">
                <button @click="handleDelete(data.$index, data.row)">
                  删除
                </button>
                <button @click="handelEdit(data.$index, data.row)">编辑</button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog title="添加人员" :visible.sync="dialogVisible">
      <Dialog></Dialog>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FilterTable from "@/components/public/FilterTable.vue";
import FilterHeader from "@/components/public/FilterHeader.vue";
import Dialog from "@/components/accountMaintenance/Dialog.vue";
export default {
  name: "AccountMaintenance",
  components: {
    FilterTable,
    FilterHeader,
    Dialog,
  },
  data() {
    return {
      keyword: "",
      dialogVisible: false,
      tableData: [
        {
          name: "20220711002",
          workNum: "王小虎",
          testOrganization: "上海市普陀区金沙江路 1518 弄",
          role: "等待分配服务器",
          group: "排队中",
          phone: " 21.128.12.13",
          email: "TaiShan200",
        },
        {
          name: "20220711004",
          workNum: "王小虎",
          testOrganization: "上海市普陀区金沙江路 1517 弄",
          role: "测试中",
          group: "已分配",
          phone: " 21.128.12.13",
          email: "TaiShan200",
        },
        {
          name: "20220711001",
          workNum: "王小虎",
          testOrganization: "上海市普陀区金沙江路 1519 弄",
          role: "测试中(第二轮)",
          group: "测试失败",
          phone: "1234",
          email: "TaiShan200",
        },
        {
          name: "20220711003",
          workNum: "王小虎",
          testOrganization: "上海市普陀区金沙江路 1520 弄",
          role: "服务器释放",
          group: "测试中",
          phone: " 21.128.12.13",
          email: "20220711003",
        },
        {
          name: "20220711003",
          workNum: "王小虎",
          testOrganization: "上海市普陀区金沙江路 130 弄",
          role: "服务器释放",
          group: "待释放",
          phone: " 21.128.12.13",
          email: "20220711003",
        },
        {
          name: "20220711003",
          workNum: "王小虎",
          testOrganization: "上海市普陀区金沙江路 1516 弄",
          role: "服务器释放",
          group: "已释放",
          phone: "20220711003",
          email: "20220711003",
        },
      ],
      headerLabel: [
        {
          label: "姓名",
          value: "姓名",
          disabled: true,
        },
        {
          label: "工号",
          value: "工号",
          disabled: false,
        },
        {
          label: "测试机构",
          value: "测试机构",
          disabled: false,
        },
        {
          label: "角色",
          value: "角色",
          disabled: false,
        },
        {
          label: "群组",
          value: "群组",
          disabled: false,
        },
        {
          label: "电话",
          value: "电话",
          disabled: false,
        },
        {
          label: "邮箱",
          value: "邮箱",
          disabled: false,
        },
        {
          label: "操作",
          value: "操作",
          disabled: false,
        },
      ],
      headerInit: [
        "姓名",
        "工号",
        "测试机构",
        "角色",
        "群组",
        "电话",
        "邮箱",
        "操作",
      ],
      headerSelected: [
        "姓名",
        "工号",
        "测试机构",
        "角色",
        "群组",
        "电话",
        "邮箱",
        "操作",
      ],
      filters: {
        testOrganization: [],
        role: [],
        email: [],
      },
      filterSelected: {
        testOrganization: [],
        role: [],
        group: [],
      },
      chooseList: [],
      multipleSelection: [],
      pagination: {
        total: 100,
        currentPage: 1,
        layout: "total, size, prev, pager, next, jumper",
        pageSizes: [10, 20, 30, 50],
        pageSize: 10,
      },
    };
  },

  created() {
    this.tableData.forEach((element) => {
      this.filters.testOrganization.push({
        value: element.testOrganization,
        label: element.testOrganization,
      });
    });
    this.filters.role = [
      {
        value: "任务1",
        label: "任务1",
      },
      {
        value: "任务2",
        label: "任务2",
      },
    ];
    this.filters.group = [
      {
        value: "型号1",
        label: "型号1",
      },
      {
        value: "型号2",
        label: "型号2",
      },
    ];
    this.filters.testOrganization = [
      {
        value: "OS1",
        label: "OS1",
      },
      {
        value: "OS2",
        label: "OS2",
      },
    ];
  },

  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    addPerson() {
      this.dialogVisible = true;
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 批量删除
    handelMulDelete() {},

    // 单行删除
    handleDelete(index, row) {
      this.$confirm('账号删除后将不可恢复，确定删除所选账号？', '确认删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.tableData.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration: 0,
            showClose: true,
          });
        })
      
    },

    handleEdit(row) {},
    // 表头筛选
    filterHeader(list) {
      this.headerSelected = list;
    },

    // 列筛选
    filterChange(column) {
      this.chooseList = this.chooseList.filter((res) => {
        return Object.keys(column)[0].indexOf(res.key) === -1;
      });
      if (column.testOrganization) {
        if (column.testOrganization.length > 0) {
          let obj = this.handleFilter(column, "testOrganization");
          this.chooseList.push(obj);
        }
        this.filterSelected.testOrganization = column.testOrganization;
      }

      if (column.role) {
        if (column.role.length > 0) {
          let obj = this.handleFilter(column, "role");
          this.chooseList.push(obj);
        }
        this.filterSelected.role = column.role;
      }

      if (column.group) {
        if (column.group.length > 0) {
          let obj = this.handleFilter(column, "group");
          this.chooseList.push(obj);
        }
        this.filterSelected.group = column.group;
      }
    },

    // 处理筛选显示
    handleFilter(arr, key) {
      let str = "";
      if (key === "testOrganization") {
        str = "测试机构：";
      } else if (key === "role") {
        str = "角色：";
      } else if (key === "group") {
        str = "群组：";
      }
      arr[key].forEach((item, index) => {
        str += item;
        if (index < arr[key].length - 1) {
          str += ", ";
        }
      });
      let obj = {
        key: key,
        value: str,
      };
      return obj;
    },

    // 关闭筛选
    handleClose(column) {
      this.chooseList = this.chooseList.filter((res) => res.key !== column.key);
      this.filterSelected[column.key] = [];
    },

    // 清除全部筛选
    clearAll() {
      this.chooseList = [];
      this.filterSelected = {
        testOrganization: [],
        role: [],
        group: [],
      };
    },

    // 关键字搜索
    searchData() {},
  },
};
</script>

<style lang="scss" scoped>
.taskList-box {
  padding: 24px 40px 24px 0px;
  background: #ebf0f6;
  .list-box {
    background: #fff;
    min-height: 700px;
    .search-box {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      padding-top: 24px;
      margin-bottom: 16px;
      margin-left: 24px;
    }
    .filter-list {
      padding-left: 24px;
      margin-bottom: 10px;
      font-size: 14px;
      color: #4e5865;
      .clear-all {
        margin-left: 8px;
        color: #07f;
        cursor: pointer;
      }
    }
    .task-table {
      padding: 0px 24px 0px 24px;
    }
    .opera-btn {
      button {
        border: none;
        background: none;
        line-height: 20px;
        color: #07f;
        cursor: pointer;
      }
    }
  }
  ::v-deep .el-table--border tr th:first-child::after {
    width: 0;
  }
  .el-button.is-disabled,
  .el-button.is-disabled:focus,
  .el-button.is-disabled:hover {
    background: #ebedf3;
    border: 1px solid #bfc7d7;
  }
}

::v-deep .el-table__body-wrapper tr {
  height: 48px;
}
</style>
