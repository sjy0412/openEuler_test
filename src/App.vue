<template>
  <div id="app">
    <HeaderHome></HeaderHome>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderHome from "./components/public/HeaderHome.vue";

export default {
  name: "App",
  components: {
    HeaderHome,
  },
};
</script>

<style lang="scss">
</style>
