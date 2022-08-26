<template>
  <div class="box">
    <div class="leftMenu-container">
      <LeftMenu></LeftMenu>
    </div>

    <div class="content-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from '@/components/public/LeftMenu.vue';

export default {
  name: 'Workbench',
  components: {
    LeftMenu
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  background: transparent;
}
body {
  background: #eef0f5;
}
  .leftMenu-container {
    position: fixed;
    top: 48px;
    bottom: 0;
    z-index: 999;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;

  }
  .content-main {
    min-width: 1502px;
    margin-left: 296px;
    margin-top: 48px;
    overflow: auto;
  }
  ::v-deep .el-scrollbar__wrap {
    overflow: hidden;
    margin-bottom: 0px !important;
    margin-right: 0px !important; 
  }
</style>