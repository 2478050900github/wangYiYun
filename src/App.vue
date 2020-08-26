<template>
  <div id="app">
    <!-- <v-home></v-home> -->
    <!-- 一级路由插座 -->
    <!-- <keep-alive> -->
      <router-view />
    <!-- </keep-alive> -->
    <v-play></v-play>
  </div>
</template>

<script>
// import vHome from "@/components/home/home";
import vPlay from "@/components/player/player";
export default {
  components: {
    // vHome,
    vPlay,
  },
};
</script>

<style lang="less">
//全局样式
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  background-color: #f0f0f0;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.auto-img {
  width: 100%;
  display: block;
}

.one-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.van-nav-bar .van-icon,
.van-nav-bar__text {
  color: #e00b36;
}
::-webkit-scrollbar {
  // 隐藏滚动条
  display: none;
}
</style>
