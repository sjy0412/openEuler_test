<template>
  <div class="header-container">
    <div class="logo">
      <img src="@/assets/login/headerIcon.svg" />
      <span>openEuler认证报告生成平台管理</span>
    </div>
    <div class="user">
      <img src="@/assets/login/user1.svg" />
      <div class="user-menu">
        <div class="menu-top">
          <div>
            <span class="menu-left">账号</span>
            <span class="menu-right">swx1125250</span>
          </div>
          <div>
            <span class="menu-left">角色</span>
            <span class="menu-right">项目支撑人员</span>
          </div>
          <div>
            <span class="menu-left">IP</span>
            <span class="menu-right">12.22.32.255</span>
          </div>
        </div>
        <div class="menu-bottom">
          <span>退出登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderHome",
};
</script>

<style lang="scss" scoped>
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  z-index: 999;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  .logo {
    margin-left: 42px;
    line-height: 48px;
    img {
      width: 26px;
      height: 28px;
      vertical-align: middle;
    }
    span {
      margin-left: 8px;
      font-family: HarmonyOS_Sans_SC_Bold;
      font-size: 14px;
      color: #000000;
      font-weight: 700;
    }
  }
  .user {
    position: absolute;
    right: 43px;
    top: 14px;
    img {
      cursor: pointer;
    }
    img:hover {
      content: url("@/assets/login/user2.svg");
    }
    .user-menu {
      display: none;
      position: absolute;
      top: 24px;
      right: -19px;
      width: 188px;
      height: 144px;
      background: #fefefe;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.24);
      border-radius: 4px;
      font-size: 14px;
      font-family: HarmonyOS_Sans_SC;
      .menu-top {
        height: 106px;
        padding: 16px 0;
        border-bottom: 1px solid #dfe5ef;
        .menu-left {
          margin: 0px 16px;
          color: #4e5865;
          display: inline-block;
          width: 28px;
        }
        span {
          padding-bottom: 4px;
        }
      }
      .menu-bottom {
        height: 37px;
        line-height: 37px;
        text-align: center;
        span {
          cursor: pointer;
          color: #07f;
        }
      }
    }
  }
  .user:hover {
    img {
      content: url("@/assets/login/user2.svg");
    }
    .user-menu {
      display: block;
    }
  }
}
</style>
