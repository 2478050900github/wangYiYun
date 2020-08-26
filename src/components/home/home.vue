<template>
  <div class="find">
    <router-view />
    <div class="header">
      <div class="identify">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wy" />
        </svg>
      </div>
      <div class="search-box">
        <input
          class="homeInput"
          ref="search"
          v-model="searchKey"
          type="text"
          placeholder="搜索音乐，歌词，电台..."
          key="homeInput"
          @keyup.enter="search"
        />
        <div class="sch">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-search" />
          </svg>
        </div>
      </div>
      <div class="toggleTab">
        <van-tabbar v-model="tabbarActiveKey" @change="toggleTabBar">
          <van-tabbar-item v-for="(item,index) in tabbars" :key="index">
            <svg class="icon active" aria-hidden="true">
              <use :xlink:href="item.tabIcon" />
            </svg>
            {{item.tabTit}}
          </van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/css/home.less";
import axios from "axios";

export default {
  data() {
    return {
      searchKey: "", //搜索关键词
      tabbarActiveKey: 1, // 导航激活
      tabbars: [
        {
          tabTit: "排行榜",
          tabIcon: "#icon-music",
          url: "/index/top",
        },
        {
          tabTit: "推荐音乐",
          tabIcon: "#icon-wyy",
          url: "/index/recommend",
        },
        {
          tabTit: "我的",
          tabIcon: "#icon-user",
          url: "/index/my",
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
  components: {},
  computed: {},

  methods: {
    slideTo(num) {
      this.homeSwiper.slideTo(num, 0.1);
    },
    search() {
      this.$refs.search.blur();
      this.$router.push({ path: "/search", query: { key: this.searchKey } });
    },
    // 切换
    toggleTabBar(index) {
      this.$router.push({ path: this.tabbars[index].url });
      // this.$router.push({ name: this.tabbars[index].name });
    },
  },
};
</script>