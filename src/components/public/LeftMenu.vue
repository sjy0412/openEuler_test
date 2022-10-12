<template>
  <div class="left-box">
    <ul class="left-panel">
       <router-link :to="item.url"  v-for="(item,index) in menuList" :key="index">
        <li :class="['menu-item', currentIndex === index ? 'active' : '']" @click="changeMenu(index)">
          <span>{{item.label}}</span>
        </li>
      </router-link> 
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      menuList: [
        {
          label: '任务列表',
          url: '/workbench/task',
        },
        {
          label: '服务器管理',
          url: '/workbench/serverManagement',
        },
        {
          label: '下拉菜单管理',
          url: '/workbench/MenuManagement',
        },
        {
          label: '账号维护',
          url: '/workbench/accountMaintenance',
        },
      ]
    }
  },

  created() {
    this.setHighlight();
  },

  methods: {
    // 根据路由设置菜单高亮
    setHighlight() {
      if(this.$route.name === 'TaskList') {
        this.currentIndex = 0;
      }else if (this.$route.name === 'ServerManagement') {
        this.currentIndex = 1;
      }else if (this.$route.name === 'MenuManagement') {
        this.currentIndex = 2;
      }else if (this.$route.name === 'AccountMaintenance') {
        this.currentIndex = 3;
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