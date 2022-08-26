<template>
  <div class="left-box">
    <ul class="left-panel">
      <router-link to="/workbench/task">
        <li :class="['menu-item', currentIndex === 1 ? 'active' : '']" @click="changeMenu(1)">
          <span>任务列表</span>
        </li>
      </router-link>
      <router-link to="/workbench/serverManagement">
        <li :class="['menu-item', currentIndex === 2 ? 'active' : '']" @click="changeMenu(2)">
          <span>服务器管理</span>
        </li>
      </router-link>
      <router-link to="/workbench/MenuManagement">
        <li :class="['menu-item', currentIndex === 3 ? 'active' : '']" @click="changeMenu(3)">
          <span>下拉菜单管理</span>
        </li>
      </router-link>
      <router-link to="/workbench/accountMaintenance">
        <li :class="['menu-item', currentIndex === 4 ? 'active' : '']" @click="changeMenu(4)">
          <span>账号维护</span>
        </li>
      </router-link>
        
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 1,
    }
  },

  created() {
    this.setHighlight();
  },

  methods: {
    // 根据路由设置菜单高亮
    setHighlight() {
      if(this.$route.name === 'TaskList') {
        this.currentIndex = 1;
      }else if (this.$route.name === 'ServerManagement') {
        this.currentIndex = 2;
      }else if (this.$route.name === 'MenuManagement') {
        this.currentIndex = 3;
      }else if (this.$route.name === 'AccountMaintenance') {
        this.currentIndex = 4;
      }
    },

    changeMenu(index) {
      this.currentIndex = index;
    }
  }
}
</script>

<style lang="scss" scoped>
  .left-box {
    height: 100%;
    width: 296px;
    background: #eef0f5;
    .left-panel {
      padding: 24px 40px 0px 24px;
      .menu-item {
        background: #fff;
        box-shadow: 0 2px 12px 0 rgba(179,186,200,0.3);
        border-radius: 4px;
        padding: 9px 0px 9px 32px; 
        font-size: 14px;
        color: #000;
        overflow: hidden;
        cursor: pointer;
        white-space: nowrap;
        margin-bottom: 8px;
        span {
          line-height: 22px;
        }
      }
      .active {
        color: #07f
      }
    }
    
  }

</style>