<template>
  <div class="filter">
    <el-popover
      :visible-arrow="false"
      width="120px"
      v-model="visible"
      placement="bottom-end"
      trigger="click"
      popper-class="filter-table"
    >
        <el-checkbox-group v-model="filterVal" @change="handleChoose" class="filter-top">
          <el-checkbox
            :label="item.label"
            :value="item.value"
            v-for="item in selectOption"
            :disabled="item.disabled"
            :key="item.value"
          >
          </el-checkbox>          
        </el-checkbox-group>
        <div class="el-table-filter_bottom">
            <el-button type="primary" @click="filterTable" size="small">
              确认
            </el-button>
            <el-button type="default" @click="cancel" size="small">
              重置
            </el-button>
          </div>
        <el-button
          slot="reference"
          class="setting"
          size="mini"
          icon="el-icon-setting"
        ></el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "FilterTable",
  props: ["selectOption", "filterSelected", "headerInit"],
  data() {
    return {
      filterVal: [],
      visible: false,
      filterChoose: [],
    };
  },

  created() {
    this.filterVal = this.filterSelected;
  },

  watch: {
    filterSelected(newVal) {
      this.filterSelected = newVal;
      this.filterVal = newVal;
      this.filterChoose = newVal;
    },
  },

  methods: {
    handleChoose(val) {
      this.filterChoose = val;
    },

    filterTable() {
      this.$emit("handleFilter", this.filterChoose);
      this.visible = false;
    },

    cancel() {
      this.filterVal = this.headerInit;
      this.filterChoose = this.headerInit;
      this.filterTable();
    },
  },
};
</script>

<style lang="scss" scoped>
.filter {
  display: inline-block;
  margin-left: 8px;
  margin-right: 24px;
  vertical-align: middle;
  .setting {
    height: 36px;
    width: 36px;
    padding: 9px;
  }
  
}
.filter-top {
    height: 288px;
    overflow-y: scroll;
}
</style>
