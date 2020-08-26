<template>
  <div class="tab">
    <van-tabbar v-model="tabbarActiveKey" @change="toggleTabBar">
      <van-tabbar-item v-for="(item,index) in tabbars" :key="index" >
        <svg class="icon active" aria-hidden="true">
          <use :xlink:href="item.tabIcon" />
        </svg>
        {{item.tabTit}}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import "../../assets/css/nav.less";
export default {
  data() {
    return {
      // 导航激活
      tabbarActiveKey: 1,
      tabbars: [
        {
          tabTit: "动态",
          tabIcon: "#icon-music",
          name: "funny",
          url: "/funny",
        },
        {
          tabTit: "推荐音乐",
          tabIcon: "#icon-wyy",
          name: "home",
          url: "/index",
        },
        {
          tabTit: "我的",
          tabIcon: "#icon-user",
          name: "my",
          url: "/my",
        },
      ],
    };
  },
  created() {
    let hash = location.hash.slice(1);
    for (let i = 0; i < this.tabbars.length; i++) {
      if (this.tabbars[i].url == hash) {
        this.tabbarActiveKey = i;
        break;
      }
    }
  },
  methods: {
    // 切换
    toggleTabBar(index) {
      this.$router.push({ name: this.tabbars[index].name });
    },
  },
};
</script>

<style lang="less" scoped>
</style>