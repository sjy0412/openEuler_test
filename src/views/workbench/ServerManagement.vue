<template>
  <div class="management-box">
    <div class="list-box">
      <div class="search-box">
        <div>
          <el-button type="primary" @click="addEquipment">新增设备</el-button>
          <el-button disabled>批量删除</el-button>
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
          ref="multipleTable"
          @filter-change="filterChange"
          tooltip-effect="light tooltip-end"
          resizable
          border
          @selection-change="handleSelectionChange"
        >
          <template slot="empty">
            <img src="@/assets/list/noData.svg" />
          </template>
          <el-table-column type="selection" width="30"> </el-table-column>
          <el-table-column
            prop="deviceId"
            :label="headerLabel[0].label"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="BMC"
            show-overflow-tooltip
            :label="headerLabel[1].label"
            v-if="headerSelected.includes(headerLabel[1].label)"
          >
          </el-table-column>
          <el-table-column
            prop="serverType"
            show-overflow-tooltip
            width="112"
            v-if="headerSelected.includes(headerLabel[2].label)"
          >
            <div slot="header" slot-scope="{}">
              <FilterTable
                :selectOption="filters.serverType"
                :headerLabel="headerLabel[2].label"
                @handleFilter="filterChange"
                :filterSelected="filterSelected.serverType"
                filterKey="serverType"
              >
              </FilterTable>
            </div>
          </el-table-column>
          <el-table-column
            prop="serverModel"
            width="136"
            show-overflow-tooltip
            :label="headerLabel[3].label"
            v-if="headerSelected.includes(headerLabel[3].label)"
          >
            <div slot="header" slot-scope="{}">
              <FilterTable
                :selectOption="filters.serverModel"
                :headerLabel="headerLabel[3].label"
                @handleFilter="filterChange"
                :filterSelected="filterSelected.serverModel"
                filterKey="serverModel"
              >
              </FilterTable>
            </div>
          </el-table-column>
          <el-table-column
            prop="serverUsage"
            show-overflow-tooltip
            :label="headerLabel[4].label"
            width="112"
            v-if="headerSelected.includes(headerLabel[4].label)"
          >
            <div slot="header" slot-scope="{}">
              <FilterTable
                :selectOption="filters.serverUsage"
                :headerLabel="headerLabel[4].label"
                @handleFilter="filterChange"
                :filterSelected="filterSelected.serverUsage"
                filterKey="serverUsage"
              >
              </FilterTable>
            </div>
          </el-table-column>
          <el-table-column
            prop="resourceType"
            :label="headerLabel[5].label"
            show-overflow-tooltip
            width="112"
            v-if="headerSelected.includes(headerLabel[5].label)"
          >
            <div slot="header" slot-scope="{}">
              <FilterTable
                :selectOption="filters.resourceType"
                :headerLabel="headerLabel[5].label"
                @handleFilter="filterChange"
                :filterSelected="filterSelected.resourceType"
                filterKey="resourceType"
              >
              </FilterTable>
            </div>
          </el-table-column>
          <el-table-column
            prop="platform"
            width="114"
            show-overflow-tooltip
            v-if="headerSelected.includes(headerLabel[6].label)"
          >
            <div slot="header" slot-scope="{}">
              <FilterTable
                :selectOption="filters.platform"
                :headerLabel="headerLabel[6].label"
                @handleFilter="filterChange"
                :filterSelected="filterSelected.platform"
                filterKey="platform"
              >
              </FilterTable>
            </div>
          </el-table-column>
          <el-table-column
            prop="CPU"
            column-key="CPU"
            show-overflow-tooltip
            v-if="headerSelected.includes(headerLabel[7].label)"
          >
            <div slot="header" slot-scope="{}">
              <FilterTable
                :selectOption="filters.CPU"
                :headerLabel="headerLabel[7].label"
                @handleFilter="filterChange"
                :filterSelected="filterSelected.CPU"
                filterKey="CPU"
              >
              </FilterTable>
            </div>
          </el-table-column>
          <el-table-column
            prop="memory"
            :label="headerLabel[8].label"
            show-overflow-tooltip
            v-if="headerSelected.includes(headerLabel[8].label)"
          >
            <div slot="header" slot-scope="{}">
              <FilterTable
                :selectOption="filters.memory"
                :headerLabel="headerLabel[8].label"
                @handleFilter="filterChange"
                :filterSelected="filterSelected.memory"
                filterKey="memory"
              >
              </FilterTable>
            </div>
          </el-table-column>
          <el-table-column
            prop="disk"
            :label="headerLabel[9].label"
            show-overflow-tooltip
            v-if="headerSelected.includes(headerLabel[9].label)"
          >
          </el-table-column>
          <el-table-column
            prop="region"
            :label="headerLabel[10].label"
            show-overflow-tooltip
            v-if="headerSelected.includes(headerLabel[10].label)"
          >
            <div slot="header" slot-scope="{}">
              <FilterTable
                :selectOption="filters.region"
                :headerLabel="headerLabel[10].label"
                @handleFilter="filterChange"
                :filterSelected="filterSelected.region"
                filterKey="region"
              >
              </FilterTable>
            </div>
          </el-table-column>
          <el-table-column
            prop="status"
            :label="headerLabel[11].label"
            show-overflow-tooltip
            v-if="headerSelected.includes(headerLabel[11].label)"
          >
            <div slot="header" slot-scope="{}">
              <FilterTable
                :selectOption="filters.status"
                :headerLabel="headerLabel[11].label"
                @handleFilter="filterChange"
                :filterSelected="filterSelected.status"
                filterKey="status"
              >
              </FilterTable>
            </div>
            <template v-slot="data">
              <span class="status" v-if="data.row.status === '回收中'">{{
                data.row.status
              }}</span>
              <span
                class="status status1"
                v-if="data.row.status === '可分配'"
                >{{ data.row.status }}</span
              >
              <span
                class="status status2"
                v-if="data.row.status === '使用中'"
                >{{ data.row.status }}</span
              >
              <span
                class="status status3"
                v-if="data.row.status === '建设中'"
                >{{ data.row.status }}</span
              >
              <span
                class="status status4"
                v-if="data.row.status === '维修中'"
                >{{ data.row.status }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="operate"
            :label="headerLabel[12].label"
            minWidth="104"
            v-if="headerSelected.includes(headerLabel[12].label)"
            show-overflow-tooltip
          >
            <template v-slot="data">
              <div class="opera-btn">
                <button>编辑</button>
                <button @click="deleteServer(data.row)">删除</button>
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
    <el-drawer
      title="新增设备"
      :visible.sync="drawer"
      :show-close="false"
      :before-close="closeDrawer"
    >
      <AddEquipment></AddEquipment>
    </el-drawer>
  </div>
</template>

<script>
import FilterTable from "@/components/public/FilterTable.vue";
import FilterHeader from "@/components/public/FilterHeader.vue";
import AddEquipment from "@/components/serverManagement/AddEquipment.vue";
export default {
  name: "ServerManagement",
  components: {
    FilterTable,
    FilterHeader,
    AddEquipment,
  },
  data() {
    return {
      keyword: "",
      drawer: false,
      tableData: [
        {
          deviceId: "DC_01_001",
          BMC: "王小虎",
          serverType: "上海市普陀区金沙江路 1518 弄",
          serverModel: "等待分配服务器",
          serverUsage: "排队中",
          resourceType: "21.128.12.13",
          platform: "王小虎",
          CPU: " 21.128.12.13",
          memory: "20220711003",
          disk: "4*3.2TB",
          region: "王小虎",
          status: "回收中",
        },
        {
          deviceId: "DC_01_002",
          BMC: "王小虎",
          serverType: "上海市普陀区金沙江路 1517 弄",
          serverModel: "测试中",
          serverUsage: "已分配",
          resourceType: " 21.128.12.13",
          platform: "王小虎",
          CPU: " 21.128.12.13",
          memory: "20220711003",
          disk: "4*3.2TB",
          region: "王小虎",
          status: "使用中",
        },
        {
          deviceId: "DC_01_003",
          BMC: "王小虎",
          serverType: "上海市普陀区金沙江路 1519 弄",
          serverModel: "测试中(第二轮)",
          serverUsage: "测试失败",
          resourceType: "1234",
          platform: "王小虎",
          CPU: " 21.128.12.13",
          memory: "20220711003",
          disk: "4*3.2TB",
          region: "王小虎",
          status: "可分配",
        },
        {
          deviceId: "DC_01_004",
          BMC: "王小虎",
          serverType: "上海市普陀区金沙江路 1520 弄",
          serverModel: "服务器释放",
          serverUsage: "测试中",
          resourceType: " 21.128.12.13",
          platform: "王小虎",
          CPU: " 22.128.12.13",
          memory: "20220711003",
          disk: "4*3.2TB",
          region: "王小虎",
          status: "建设中",
        },
        {
          deviceId: "DC_01_005",
          BMC: "王小虎",
          serverType: "上海市普陀区金沙江路 130 弄",
          serverModel: "服务器释放",
          serverUsage: "待释放",
          resourceType: " 21.128.12.13",
          platform: "王小虎",
          CPU: " 21.128.12.13",
          memory: "20220711003",
          disk: "4*3.2TB",
          region: "王小虎",
          status: "维修中",
        },
      ],
      headerLabel: [
        {
          label: "设备ID",
          value: "设备ID",
          disabled: true,
        },
        {
          label: "BMC IP",
          value: "BMC IP",
          disabled: false,
        },
        {
          label: "服务器类型",
          value: "服务器类型",
          disabled: false,
        },
        {
          label: "服务器型号",
          value: "服务器型号",
          disabled: false,
        },
        {
          label: "服务器用途",
          value: "服务器用途",
          disabled: false,
        },
        {
          label: "资源类型",
          value: "资源类型",
          disabled: false,
        },
        {
          label: "算力平台",
          value: "算力平台",
          disabled: false,
        },
        {
          label: "CPU",
          value: "CPU",
          disabled: false,
        },
        {
          label: "内存",
          value: "内存",
          disabled: false,
        },
        {
          label: "硬盘",
          value: "硬盘",
          disabled: false,
        },
        {
          label: "区域",
          value: "区域",
          disabled: false,
        },
        {
          label: "状态",
          value: "状态",
          disabled: false,
        },
        {
          label: "操作",
          value: "操作",
          disabled: false,
        },
      ],
      headerInit: [
        "设备ID",
        "BMC Ip",
        "服务器类型",
        "服务器型号",
        "服务器用途",
        "资源类型",
        "算力平台",
        "CPU",
        "内存",
        "硬盘",
        "区域",
        "状态",
        "操作",
      ],
      headerSelected: [
        "设备ID",
        "BMC IP",
        "服务器类型",
        "服务器型号",
        "服务器用途",
        "资源类型",
        "算力平台",
        "CPU",
        "内存",
        "硬盘",
        "区域",
        "状态",
        "操作",
      ],
      filters: {
        serverType: [],
        serverModel: [],
        serverUsage: [],
        resourceType: [],
        platform: [],
        CPU: [],
        memory: [],
        region: [],
        status: [],
      },
      filterSelected: {
        serverType: [],
        serverModel: [],
        serverUsage: [],
        resourceType: [],
        platform: [],
        CPU: [],
        memory: [],
        region: [],
        status: [],
      },
      chooseList: [],
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
      this.filters.serverType.push({
        value: element.serverType,
        label: element.serverType,
      });
    });
    this.filters.serverType = [
      {
        value: "任务1",
        label: "任务1",
      },
      {
        value: "任务2",
        label: "任务2",
      },
    ];
    this.filters.serverModel = [
      {
        value: "型号1",
        label: "型号1",
      },
      {
        value: "型号2",
        label: "型号2",
      },
    ];
    this.filters.platform = [
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
    handleSelectionChange() {},
    addEquipment() {
      this.drawer = true;
    },
    closeDrawer() {
      this.drawer = false;
    },
    filterHeader(list) {
      this.headerSelected = list;
    },

    filterChange(column) {
      this.chooseList = this.chooseList.filter((res) => {
        return Object.keys(column)[0].indexOf(res.key) === -1;
      });
      if (column.serverType) {
        if (column.serverType.length > 0) {
          let obj = this.handleFilter(column, "serverType");
          this.chooseList.push(obj);
        }
        this.filterSelected.serverType = column.serverType;
      }

      if (column.serverModel) {
        if (column.serverModel.length > 0) {
          let obj = this.handleFilter(column, "serverModel");
          this.chooseList.push(obj);
        }
        this.filterSelected.serverModel = column.serverModel;
      }

      if (column.serverModel) {
        if (column.serverModel.length > 0) {
          let obj = this.handleFilter(column, "serverModel");
          this.chooseList.push(obj);
        }
        this.filterSelected.serverModel = column.serverModel;
      }

      if (column.platform) {
        if (column.platform.length > 0) {
          let obj = this.handleFilter(column, "platform");
          this.chooseList.push(obj);
        }
        this.filterSelected.platform = column.platform;
      }
    },

    handleFilter(arr, key) {
      let str = "";
      if (key === "serverType") {
        str = "测试场景：";
      } else if (key === "serverModel") {
        str = "任务阶段：";
      } else if (key === "serverModel") {
        str = "服务器型号：";
      } else {
        str = "操作系统：";
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
        serverType: [],
        serverModel: [],
        serverModel: [],
        platform: [],
      };
    },

    searchData() {},

    
    deleteServer(row) {
      console.log(row);
      this.$confirm('服务器删除后将不可恢复，确定要删除服务器？', '删除服务器', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
            showClose: true,
          });
        })
    }
  },
};
</script>

<style lang="scss" scoped>
.management-box {
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
    .status {
      margin-left: 20px;
    }
    .status:before {
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
    .status1:before {
      background: #24ab36;
    }
    .status2:before {
      background: #07f;
    }
    .status3:before {
      background: #ebaf00;
    }
    .status4:before {
      background: #576372;
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
}
::v-deep .el-table--border tr th:first-child::after {
  width: 0;
}
::v-deep .el-button {
  width: 96px;
  height: 36px;
  padding: 8px 0;
}
::v-deep .el-button + .el-button {
  margin-left: 16px;
}

::v-deep .el-button.is-disabled,
.el-button.is-disabled:focus,
.el-button.is-disabled:hover {
  color: #bfc7d7;
  background-color: #ebedf3;
  border-color: #bfc7d7;
}
::v-deep .el-drawer__open .el-drawer.rtl {
  width: 50% !important;
}
::v-deep .el-drawer__header {
  padding: 24px 24px 16px 24px;
  margin-bottom: 0;
  font-size: 16px;
  color: #000;
  font-weight: 700;
}
::v-deep .el-drawer__body {
  padding: 0 24px;
}
::v-deep .el-table__body-wrapper tr {
  height: 48px;
}
</style>
