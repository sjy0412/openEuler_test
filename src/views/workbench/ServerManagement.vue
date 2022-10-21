<template>
  <div class="management-box">
    <div class="list-box">
      <div class="search-box">
        <div>
          <el-button type="primary" @click="drawer = true">新增设备</el-button>
          <el-button :disabled="multipleSelection.length === 0" @click="batchDelete">批量删除</el-button>
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
            prop="bmcIp"
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
            prop="modelType"
            width="136"
            show-overflow-tooltip
            :label="headerLabel[3].label"
            v-if="headerSelected.includes(headerLabel[3].label)"
          >
            <div slot="header" slot-scope="{}">
              <FilterTable
                :selectOption="filters.modelType"
                :headerLabel="headerLabel[3].label"
                @handleFilter="filterChange"
                :filterSelected="filterSelected.modelType"
                filterKey="modelType"
              >
              </FilterTable>
            </div>
          </el-table-column>
          <el-table-column
            prop="testOrganization"
            show-overflow-tooltip
            :label="headerLabel[4].label"
            width="112"
            v-if="headerSelected.includes(headerLabel[4].label)"
          >
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
            prop="cpu"
            column-key="cpu"
            show-overflow-tooltip
            v-if="headerSelected.includes(headerLabel[7].label)"
          >
            <div slot="header" slot-scope="{}">
              <FilterTable
                :selectOption="filters.cpu"
                :headerLabel="headerLabel[7].label"
                @handleFilter="filterChange"
                :filterSelected="filterSelected.cpu"
                filterKey="cpu"
              >
              </FilterTable>
            </div>
          </el-table-column>
          <el-table-column
            prop="ram"
            :label="headerLabel[8].label"
            show-overflow-tooltip
            v-if="headerSelected.includes(headerLabel[8].label)"
          >
            <template v-slot="data">
              <span>
                {{data.row.ram.count + '*' + data.row.ram.size}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="diskStr"
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
              <span
                class="status status4"
                v-if="data.row.status === '已回收'"
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
                <button @click="handelEdit(data.row)">编辑</button>
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
      <AddEquipment @handleCancel="handleCancel" :editData="editData"></AddEquipment>
    </el-drawer>
  </div>
</template>

<script>
import FilterTable from "@/components/public/FilterTable.vue";
import FilterHeader from "@/components/public/FilterHeader.vue";
import AddEquipment from "@/components/serverManagement/AddEquipment.vue";
import { managementService } from "@/utils/managementService.js";
import { noLogin } from "@/utils/publicFunction.js";
import { menuService } from "@/utils/menuService.js";

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
      tableData: [],
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
          label: "测试机构",
          value: "测试机构",
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
          label: "cpu",
          value: "cpu",
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
        "测试机构",
        "资源类型",
        "算力平台",
        "cpu",
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
        "测试机构",
        "资源类型",
        "算力平台",
        "cpu",
        "内存",
        "硬盘",
        "区域",
        "状态",
        "操作",
      ],
      filters: {
        serverType: [],
        modelType: [],
        resourceType: [],
        platform: [],
        cpu: [],
        region: [],
        status: [],
      },
      filterSelected: {
        serverType: [],
        modelType: [],
        resourceType: [],
        platform: [],
        cpu: [],
        region: [],
        status: [],
      },
      chooseList: [],
      pagination: {
        total: 0,
        currentPage: 1,
        layout: "total, size, prev, pager, next, jumper",
        pageSizes: [10, 20, 30, 50],
        pageSize: 10,
      },
      params: {
        serverTypeList: [],
        modelTypeList: [],
        resourceTypeList: [],
        platformList: [],
        cpuList: [],
        ramList: [],
        regionList: [],
        statusList: [],
        keyword: '',
        pageNo: 1,
        pageSize: 10
      },
      editData: {},
      multipleSelection: [],
    };
  },

  created() {
    this.getList();
    this.getFilterList();
  },

  methods: {
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.pagination.pageSize = val;
      this.getList();
    },

    handleCurrentChange(val) {
      this.params.pageNo = val;
      this.pagination.currentPage = val;
      this.getList()
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    getList() {
      managementService.getList(this.params).then(res => {
        if (res.data.code === this.$statusCode.LOGIN_FAILED) {
					noLogin();
				} else if (res.data.code === this.$statusCode.SUCCESS) {
					this.tableData = res.data.body.list[0];
          this.pagination.total = res.data.body.total;
          this.tableData.forEach(res => {
            let obj = '';
            res.disk.forEach((item,index) => {
              obj += item.count + '*' + item.size + ' ' + item.type;
              if(index !== res.disk.length - 1) {
                obj += ','
              }
            })
            res.diskStr = obj;
          })
				}
      })
    },

    // 获取筛选列表信息
    getFilterList() {
      managementService.getFilterList().then(res => {
        if (res.data.code === this.$statusCode.LOGIN_FAILED) {
					noLogin();
				} else if (res.data.code === this.$statusCode.SUCCESS) {
          this.filters.serverType = this.handleData(res.data.body.serverTypeList);
          this.filters.modelType = this.handleData(res.data.body.modelTypeList);
          this.filters.resourceType = this.handleData(res.data.body.resourceTypeList);
          this.filters.platform = this.handleData(res.data.body.platformList);
          this.filters.cpu = this.handleData(res.data.body.cpuList);
          this.filters.region = this.handleData(res.data.body.regionList);
          this.filters.status = this.handleData(res.data.body.statusList);
        }
      })
    },
    
    // 处理筛选数据
    handleData(array) {
      let arr = [];
      if(array && array.length > 0) {
        array.forEach(item => {
          let obj = {
            label: item,
            value: item,
          }
          arr.push(obj);
        })    
      }
      
      return arr;
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
        this.params.serverTypeList = column.serverType;
      }

      if (column.modelType) {
        if (column.modelType.length > 0) {
          let obj = this.handleFilter(column, "modelType");
          this.chooseList.push(obj);
        }
        this.filterSelected.modelType = column.modelType;
        this.params.modelTypeList = column.modelType;
      }

      if (column.resourceType) {
        if (column.resourceType.length > 0) {
          let obj = this.handleFilter(column, "resourceType");
          this.chooseList.push(obj);
        }
        this.filterSelected.resourceType = column.resourceType;
        this.params.resourceTypeList = column.resourceType;
      }

      if (column.platform) {
        if (column.platform.length > 0) {
          let obj = this.handleFilter(column, "platform");
          this.chooseList.push(obj);
        }
        this.filterSelected.platform = column.platform;
        this.params.platformList = column.platform;
      }

      if (column.cpu) {
        if (column.cpu.length > 0) {
          let obj = this.handleFilter(column, "cpu");
          this.chooseList.push(obj);
        }
        this.filterSelected.cpu = column.cpu;
        this.params.cpuList = column.cpu;
      }

      if (column.region) {
        if (column.region.length > 0) {
          let obj = this.handleFilter(column, "region");
          this.chooseList.push(obj);
        }
        this.filterSelected.region = column.region;
        this.params.regionList = column.region;
      }

      if (column.status) {
        if (column.status.length > 0) {
          let obj = this.handleFilter(column, "status");
          this.chooseList.push(obj);
        }
        this.filterSelected.status = column.status;
        this.params.statusList = column.status;
      }

      if (column.testOrganization) {
        if (column.testOrganization.length > 0) {
          let obj = this.handleFilter(column, "testOrganization");
          this.chooseList.push(obj);
        }
        this.filterSelected.testOrganization = column.testOrganization;
        this.params.testOrganizationList = column.testOrganization;
      }
      this.getList();
    },

    handleFilter(arr, key) {
      let str = "";
      if (key === "serverType") {
        str = "测试场景：";
      } else if (key === "modelType") {
        str = "服务器型号：";
      } else if (key === "resourceType") {
        str = "资源类型：";
      } else if (key === "platform") {
        str = "算力平台：";
      } else if (key === "cpu") {
        str = "cpu: ";
      } else if(key === "region") {
        str = "地域：";
      } else if(key === "testOrganization") {
        str = "测试机构：";
      } else {
        str = "状态："
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
        modelType: [],
        resourceType: [],
        platform: [],
        cpu: [],
        region: [],
        status: [],
        testOrganization: [],
      };
      this.params.serverTypeList = [];
      this.params.modelTypeList = [];
      this.params.resourceTypeList = [];
      this.params.platformList = [];
      this.params.cpuList = [];
      this.params.regionList = [];
      this.params.statusList = [];
      this.getList();
    },

    searchData(val) {
      this.params.keyword = val;
      this.getList();
    },

    handelEdit(row) {
      this.editData = JSON.parse(JSON.stringify(row));
      this.drawer = true;
    },

    batchDelete() {
      let arr = [];
      this.multipleSelection.forEach(item => {
        arr.push(item.deviceId)
      })
      this.deleteServer(arr, true)
    },

    deleteServer(row,val) {
      this.$confirm('服务器删除后将不可恢复，确定要删除服务器？', '删除服务器', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          let params = [];
          params = val ? row : [row.deviceId]
          managementService.deleteServer(params).then(res => {
            if (res.data.code === this.$statusCode.LOGIN_FAILED) {
              noLogin();
            } else if (res.data.code === this.$statusCode.SUCCESS) {
              this.getList();
              this.$message({
                type: 'success',
                message: '所选服务器已删除。',
                showClose: true,
              });
            }
          }) 
        })
    },

    handleCancel(val) {
      this.drawer = false;
      this.editData = {};
      if(val) {
        this.getList();
      }
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
