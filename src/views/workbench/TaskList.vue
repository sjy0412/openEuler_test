<template>
  <div class="taskList-box">
    <div class="list-box">
      <div class="search-box">
        <div></div>
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
          resizable
          border
        >
          <template slot="empty">
            <img src="@/assets/list/noData.svg" />
          </template>
          <el-table-column
            show-overflow-tooltip
            prop="taskId"
            :label="headerLabel[0].label"
            sortable
            width="106"
          >
            <template v-slot="data">
              <router-link :to= "{path:'/projectDetail',query: {testScene: data.row.testScene}}">
                <p class="p-text taskId">{{ data.row.taskId }}</p>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="testId"
            :label="headerLabel[1].label"
            v-if="headerSelected.includes(headerLabel[1].label)"
            sortable
            show-overflow-tooltip
            width="118"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="testScene"
            width="106"
            v-if="headerSelected.includes(headerLabel[2].label)"
          >
            <div slot="header" slot-scope="{}">
              <FilterTable
                :selectOption="filters.testScene"
                :headerLabel="headerLabel[2].label"
                @handleFilter="filterChange"
                :filterSelected="filterSelected.testScene"
                filterKey="testScene"
              >
              </FilterTable>
            </div>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="taskPhase"
            width="136"
            v-if="headerSelected.includes(headerLabel[3].label)"
          >
            <div slot="header" slot-scope="{}">
              <FilterTable
                :selectOption="filters.taskPhase"
                :headerLabel="headerLabel[3].label"
                @handleFilter="filterChange"
                :filterSelected="filterSelected.taskPhase"
                filterKey="taskPhase"
              >
              </FilterTable>
            </div>
            <template v-slot="data">
              <span v-if="data.row.taskPhase === '等待分配服务器'">
                <el-tag
                  color="#f97611"
                  effect="dark"
                  type="warning"
                  style="border: 1px solid #f97611"
                >
                  {{ data.row.taskPhase }}
                </el-tag>
              </span>
              <span
                v-if="
                  data.row.taskPhase === '测试中' ||
                  data.row.taskPhase === '测试中(第二轮)'
                "
              >
                <el-tag
                  color="#07f"
                  effect="dark"
                  style="border: 1px solid #07f"
                >
                  {{ data.row.taskPhase }}
                </el-tag>
              </span>
              <span v-if="data.row.taskPhase === '服务器释放'">
                <el-tag
                  color="#2a739d"
                  effect="dark"
                  style="border: 1px solid #2a739d"
                >
                  {{ data.row.taskPhase }}
                </el-tag>
              </span>
              <span v-if="data.row.taskPhase === '测试完成'">
                <el-tag
                  color="#24ab36"
                  effect="dark"
                  style="border: 1px solid #24ab36"
                >
                  {{ data.row.taskPhase }}
                </el-tag>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="status"
            width="106"
            :label="headerLabel[4].label"
            v-if="headerSelected.includes(headerLabel[4].label)"
          >
            <template v-slot="data">
              <span
                class="status"
                v-if="
                  data.row.status === '排队中' ||
                  data.row.status === '测试中' ||
                  data.row.status === '待释放'
                "
                >{{ data.row.status }}</span
              >
              <span
                class="status status1"
                v-if="
                  data.row.status === '已分配' || data.row.status === '已释放' || data.row.status === '测试成功'
                "
                >{{ data.row.status }}</span
              >
              <span
                class="status status2"
                v-if="data.row.status === '测试失败'"
                >{{ data.row.status }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="submitDate"
            :label="headerLabel[5].label"
            width="110"
            sortable
            show-overflow-tooltip
            v-if="headerSelected.includes(headerLabel[5].label)"
          >
          </el-table-column>
          <el-table-column
            prop="serverModel"
            width="114"
            show-overflow-tooltip
            v-if="headerSelected.includes(headerLabel[6].label)"
          >
            <div slot="header" slot-scope="{}">
              <FilterTable
                :selectOption="filters.serverModel"
                :headerLabel="headerLabel[6].label"
                @handleFilter="filterChange"
                :filterSelected="filterSelected.serverModel"
                filterKey="serverModel"
              >
              </FilterTable>
            </div>
          </el-table-column>
          <el-table-column
            prop="OS"
            show-overflow-tooltip
            column-key="OS"
            width="106"
            v-if="headerSelected.includes(headerLabel[7].label)"
          >
            <div slot="header" slot-scope="{}">
              <FilterTable
                :selectOption="filters.OS"
                :headerLabel="headerLabel[7].label"
                @handleFilter="filterChange"
                :filterSelected="filterSelected.OS"
                filterKey="OS"
              >
              </FilterTable>
            </div>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="serverIp"
            :label="headerLabel[8].label"
            v-if="headerSelected.includes(headerLabel[8].label)"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="testTime"
            :label="headerLabel[9].label"
            sortable
            width="106"
            v-if="headerSelected.includes(headerLabel[9].label)"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="testDuration"
            :label="headerLabel[10].label"
            sortable
            width="106"
            v-if="headerSelected.includes(headerLabel[10].label)"
          >
          </el-table-column>
          <el-table-column
            prop="operate"
            :label="headerLabel[11].label"
            minWidth="220"
            show-overflow-tooltip
            v-if="headerSelected.includes(headerLabel[11].label)"
          >
            <template v-slot="data">
              <div class="opera-btn">
                <button
                  v-if="
                    data.row.taskPhase.includes('测试中') &&
                    data.row.status === '测试失败'
                  "
                >
                  一键重跑
                </button> 
                <button
                  v-if="
                    data.row.taskPhase === '等待分配服务器' ||
                    data.row.taskPhase.includes('测试中') 
                  "
                >
                  终止测试
                </button>                
                <button
                  v-if="
                    data.row.taskPhase !== '认证结束' &&
                      !(data.row.taskPhase === '测试完成' &&
                      data.row.status !== '测试成功') 
                  "
                >
                  重新测试
                </button>
                <button
                  v-if="
                    (data.row.taskPhase === '测试完成' &&
                      data.row.status === '测试成功') ||
                    data.row.taskPhase === '服务器释放' ||
                    data.row.taskPhase === '认证结束'
                  "
                >
                  预览报告
                </button>
                <button
                  v-if="
                    (data.row.taskPhase === '测试完成' &&
                      data.row.status === '测试成功') ||
                    data.row.taskPhase === '服务器释放' ||
                    data.row.taskPhase === '认证结束'
                  "
                >
                  下载报告
                </button>
                <button
                  v-if="
                    data.row.taskPhase === '测试完成' &&
                    data.row.status !== '测试成功'
                  "
                >
                  填写原因
                </button>
                <button v-if="
                      data.row.taskPhase === '测试完成' &&
                      data.row.status !== '测试成功'
                    ">重跑测试</button>
                <el-popover
                  placement="bottom-start"
                  trigger="click"
                  width="88"
                  popper-class="popper-more"
                  v-if="
                    data.row.taskPhase === '测试完成' &&
                    data.row.status !== '测试成功'
                  "
                >
                  <div class="more-btn">
                    <p>重新测试</p>
                    <p>预览报告</p>
                    <p>下载报告</p>
                  </div>
                  <div class="opera-more" slot="reference">
                    <span>更多</span>
                    <i class="el-icon-caret-bottom"></i>
                  </div>
                </el-popover>
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
  </div>
</template>

<script>
import FilterTable from "@/components/public/FilterTable.vue";
import FilterHeader from "@/components/public/FilterHeader.vue";
export default {
  name: "TaskList",
  components: {
    FilterTable,
    FilterHeader,
  },
  data() {
    return {
      keyword: "",
      tableData: [
        {
          taskId: "20220711002",
          testId: "王小虎",
          testScene: "整机与板卡",
          taskPhase: "等待分配服务器",
          status: "排队中",
          submitDate: " 21.128.12.13",
          serverModel: "TaiShan200",
          OS: "王小虎",
          serverIp: " 21.128.12.13",
          testTime: "20220711003",
          testDuration: "王小虎",
          testDuration: "20220711003",
        },
        {
          taskId: "20220711004",
          testId: "王小虎",
          testScene: "openEuler商业发行版",
          taskPhase: "测试中",
          status: "已分配",
          submitDate: " 21.128.12.13",
          serverModel: "TaiShan200",
          OS: "王小虎",
          serverIp: " 21.128.12.13",
          testTime: "20220711003",
          testDuration: "王小虎",
        },
        {
          taskId: "20220711001",
          testId: "王小虎",
          testScene: "商业软件",
          taskPhase: "测试中(第二轮)",
          status: "测试失败",
          submitDate: "1234",
          serverModel: "TaiShan200",
          OS: "王小虎",
          serverIp: " 21.128.12.13",
          testTime: "20220711003",
          testDuration: "王小虎",
        },
        {
          taskId: "20220711003",
          testId: "王小虎",
          testScene: "商业软件",
          taskPhase: "测试完成",
          status: "测试失败",
          submitDate: " 21.128.12.13",
          serverModel: "20220711003",
          OS: "王小虎",
          serverIp: " 22.128.12.13",
          testTime: "20220711003",
          testDuration: "王小虎",
        },
        {
          taskId: "20220711003",
          testId: "王小虎",
          testScene: "openEuler商业发行版",
          taskPhase: "测试完成",
          status: "测试成功",
          submitDate: " 21.128.12.13",
          serverModel: "20220711003",
          OS: "王小虎",
          serverIp: " 21.128.12.13",
          testTime: "20220711003",
          testDuration: "王小虎",
        },
        {
          taskId: "20220711003",
          testId: "王小虎",
          testScene: "整机与板卡",
          taskPhase: "服务器释放",
          status: "已释放",
          submitDate: "20220711003",
          serverModel: "20220711003",
          OS: "王小虎",
          serverIp: "20220711003",
          testTime: "20220711003",
          testDuration: "王小虎",
        },
      ],
      headerLabel: [
        {
          label: "方案ID",
          value: "方案ID",
          disabled: true,
        },
        {
          label: "测试任务ID",
          value: "测试任务ID",
          disabled: false,
        },
        {
          label: "测试场景",
          value: "测试场景",
          disabled: false,
        },
        {
          label: "任务阶段",
          value: "任务阶段",
          disabled: false,
        },
        {
          label: "状态",
          value: "状态",
          disabled: false,
        },
        {
          label: "提交时间",
          value: "提交时间",
          disabled: false,
        },
        {
          label: "服务器型号",
          value: "服务器型号",
          disabled: false,
        },
        {
          label: "操作系统",
          value: "操作系统",
          disabled: false,
        },
        {
          label: "服务器IP",
          value: "服务器IP",
          disabled: false,
        },
        {
          label: "测试时间",
          value: "测试时间",
          disabled: false,
        },
        {
          label: "测试时长",
          value: "测试时长",
          disabled: false,
        },
        {
          label: "操作",
          value: "操作",
          disabled: false,
        },
      ],
      headerInit: [
        "方案ID",
        "测试任务ID",
        "测试场景",
        "任务阶段",
        "状态",
        "提交时间",
        "服务器型号",
        "操作系统",
        "服务器IP",
        "测试时间",
        "测试时长",
        "操作",
      ],
      headerSelected: [
        "方案ID",
        "测试任务ID",
        "测试场景",
        "任务阶段",
        "状态",
        "提交时间",
        "服务器型号",
        "操作系统",
        "服务器IP",
        "测试时间",
        "测试时长",
        "操作",
      ],
      filters: {
        testScene: [],
        taskPhase: [],
        serverModel: [],
        OS: [],
      },
      filterSelected: {
        testScene: [],
        taskPhase: [],
        serverModel: [],
        OS: [],
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
      this.filters.testScene.push({
        value: element.testScene,
        label: element.testScene,
      });
    });
    this.filters.taskPhase = [
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
    this.filters.OS = [
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

    filterHeader(list) {
      this.headerSelected = list;
    },

    filterChange(column) {
      this.chooseList = this.chooseList.filter((res) => {
        return Object.keys(column)[0].indexOf(res.key) === -1;
      });
      if (column.testScene) {
        if (column.testScene.length > 0) {
          let obj = this.handleFilter(column, "testScene");
          this.chooseList.push(obj);
        }
        this.filterSelected.testScene = column.testScene;
      }

      if (column.taskPhase) {
        if (column.taskPhase.length > 0) {
          let obj = this.handleFilter(column, "taskPhase");
          this.chooseList.push(obj);
        }
        this.filterSelected.taskPhase = column.taskPhase;
      }

      if (column.serverModel) {
        if (column.serverModel.length > 0) {
          let obj = this.handleFilter(column, "serverModel");
          this.chooseList.push(obj);
        }
        this.filterSelected.serverModel = column.serverModel;
      }

      if (column.OS) {
        if (column.OS.length > 0) {
          let obj = this.handleFilter(column, "OS");
          this.chooseList.push(obj);
        }
        this.filterSelected.OS = column.OS;
      }
    },

    handleFilter(arr, key) {
      let str = "";
      if (key === "testScene") {
        str = "测试场景：";
      } else if (key === "taskPhase") {
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
        testScene: [],
        taskPhase: [],
        serverModel: [],
        OS: [],
      };
    },

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
    }
    .task-search {
      padding-top: 24px;
      margin-bottom: 16px;
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
    .taskId {
      color: #07f;
      cursor: pointer;
    }
    .status {
      margin-left: 20px;
    }
    .status:before {
      position: absolute;
      display: block;
      width: 8px;
      height: 8px;
      background: #07f;
      border-radius: 50%;
      content: "";
      top: 50%;
      transform: translate(0, -50%);
    }
    .status1:before {
      background: #24ab36;
    }
    .status2:before {
      background: #e32020;
    }
    .p-text {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .taskId {
      color: #07f;
      cursor: pointer;
    }
    .opera-btn {
      button {
        border: none;
        background: none;
        line-height: 20px;
        color: #07f;
        cursor: pointer;
      }
      .opera-more {
        display: inline-block;
        margin-left: 8px;
        color: #07f;
        cursor: pointer;
        .el-icon-caret-bottom {
          content: url("@/assets/menu/arrow3.svg");
          vertical-align: middle;
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
