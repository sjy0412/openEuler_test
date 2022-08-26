<template>
  <div class="filter">
    <el-popover
      :visible-arrow="false"
      width="120px"
      v-model="isShowFilter"
      placement="bottom-start"
      trigger="click"
      popper-class="filter-table"
    >
      <el-checkbox-group v-model="filterVal" @change="handleChoose">
        <el-checkbox
          :label="item.label"
          :value="item.value"
          v-for="item in selectOption"
          :key="item.value"
        >
        </el-checkbox>
        <div class="el-table-filter_bottom">
          <el-button type="primary" @click="filterTable" size="small">
            确认
          </el-button>
          <el-button type="default" @click="cancel" size="small">
            重置
          </el-button>
        </div>
      </el-checkbox-group>
      <p slot="reference" class="table-header">
        {{ headerLabel }}
        <img
          src="@/assets/login/screen1.svg"
          alt=""
          v-if="filterSelected.length === 0"
        />
        <img src="@/assets/login/screen3.svg" alt="" v-else />
      </p>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "FilterTable",
  props: ["selectOption", "headerLabel", "filterSelected", "filterKey"],
  data() {
    return {
      filterVal: [],
      isShowFilter: false,
      filterChoose: [],
    };
  },

  created() {
    this.filterVal = this.getSelected();
  },

  watch: {
    filterSelected(newVal) {
      console.log(newVal);
      this.filterSelected = newVal;
      this.filterVal = newVal;
      this.filterChoose[this.filterKey] = newVal;
    }
  },

  methods: {
    handleChoose(val) {
      this.filterChoose[this.filterKey] = val;
    },

    getSelected() {
      let labList = [];
      this.filterVal.forEach(res => {
        this.selectOption.forEach(item => {
          if(res === item.value) {
            labList.push(item.value);
          }
        })
      }) 
      return labList
    },

    filterTable() {
      this.$emit("handleFilter", this.filterChoose);
      this.isShowFilter = false;
    },

    cancel() {
      this.filterVal = [];
      this.filterChoose[this.filterKey] = [];
      this.filterTable();
    },
  },
};
</script>

<style lang="scss" scoped>
.table-header {
  img {
    vertical-align: middle;
  }
}

</style>
