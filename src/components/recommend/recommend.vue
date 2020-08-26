<template>
  <div class="recommend">
    <v-swiper :getUrl="bannerUrl" @bannerUpdate="updateBanner"></v-swiper>
    <div class="recommend-menu">
      <div
        class="recommend-item"
        @click="toggleTab(index)"
        v-for="(item,index) in tabbars"
        :key="index"
      >
        <img :src="item.tabImg" />
        <h4>{{item.tabTit}}</h4>
      </div>
    </div>

    <div class="recommend-songlist">
      <h2 class="title">推荐歌单 ＞</h2>
      <div class="list-wrapper">
        <div
          class="item-1-3"
          v-for="(item,index) in personalized"
          @click="toSongsList(item.id,item,'gd',item.name,item.picUrl)"
          :key="index"
        >
          <img :src="item.picUrl" />
          <h3 class="item-title">{{ item.name }}</h3>
        </div>
      </div>
    </div>

    <div class="recommend-newsongs">
      <h2 class="title">最新音乐 ＞</h2>
      <div class="list-wrapper">
        <div
          class="item-1-3"
          v-for="(item,index) in newsongs"
          @click="toSongsList(item.song.album.id,item,'zj',item.name,item.song.album.picUrl)"
          :key="index"
        >
          <img :src="item.song.album.picUrl" alt />
          <h3 class="item-title">{{ item.name }}</h3>
          <span class="artists-name">{{ item.song.artists[0].name }}</span>
        </div>
      </div>
    </div>

    <div class="recommend-exclusive">
      <h2 class="title">独家放送 ＞</h2>
      <div class="list-wrapper">
        <div class="item-1-2" v-for="(item,index) in privatecontent" :key="index">
          <img :src="item.picUrl" />
          <h3 class="item-title">{{ item.name }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/css/recomend.less";
import axios from "axios";
import vSwiper from "@/components/swiper/swiper";

export default {
  name: "recommend",
  data() {
    return {
      host: this.$store.state.HOST,
      bannerUrl: this.$store.state.HOST + "/banner", // 轮播图接口地址
      personalized: [], // 存放推荐歌单
      privatecontent: [], // 独家放送
      newsongs: [], // 最新音乐
      // 播放
      isPlay: false,
      tabbars: [
        {
          tabTit: "私人FM",
          tabImg: require("./fm.png"),
          url: "/songslist/120001?type=gd",
        },
        {
          tabTit: "每日歌曲推荐",
          tabImg: require("./recommend.png"),
          url: "/songslist/3779629?type=gd",
        },
        {
          tabTit: "云音乐热歌榜",
          tabImg: require("./top.png"),
          url: "/yhot",
        },
      ],
    };
  },
  components: {
    vSwiper,
  },
  created() {},
  mounted() {
    this.getPersonalized();
    this.getPrivatecontent();
    this.getNewsongs();
  },
  methods: {
    toggleTab(index) {
      this.$router.push({ path: this.tabbars[index].url });
    },
    //  获取【推荐歌单】数据
    getPersonalized() {
      var _this = this;
      axios.get(this.host + "/personalized?limit=12").then(function (res) {
        _this.personalized = res.data.result;
        _this.$emit("swiperUpdate");
      });
    },
    //  获取【独家放送】歌单
    getPrivatecontent() {
      var _this = this;
      axios
        .get(this.host + "/personalized/privatecontent")
        .then(function (res) {
          //
          _this.privatecontent = res.data.result;
          _this.$emit("swiperUpdate");
        });
    },
    //  获取【最新音乐】
    getNewsongs() {
      var _this = this;
      axios.get(this.host + "/personalized/newsong").then(function (res) {
        _this.newsongs = res.data.result;
        _this.$emit("swiperUpdate");
      });
    },
    //  跳转至【歌单】
    toSongsList(id, obj, type, name, picUrl) {
      this.$router.push({
        path: "/songslist/" + id,
        query: {
          type: type,
          name: name || "",
          picUrl: picUrl || null,
        },
      });
    },
    updateBanner() {
      this.$emit("swiperUpdate");
    },
    slideTo(num) {
      this.$emit("slideTo", num);
    },
    //  跳转至【播放器】
    toPlay(id) {
      this.$store.commit("setSongsList", this.songslist);
      // this.$store.commit("setListIndex", index);
      this.$router.push({ path: "/player/" + id });
    },
  },
};
</script>
