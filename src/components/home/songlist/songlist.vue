<template>
  <div class="songlist">
    <van-nav-bar title="云音乐热歌榜" left-text="返回" left-arrow @click-left="back" />
    <div class="list-wrapper">
      <div
        class="item-box fl"
        v-for="(item,index) in highqualitPlaylist"
        @click="toSongsList(item.id,item,'gd',item.name,item.coverImgUrl)"
        :key="index"
      >
        <div class="face">
          <img class="auto-img" :src="item.coverImgUrl" alt />
        </div>
        <h3 class="item-title one-text">{{ item.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "../../../assets/css/yhot.less";
export default {
  data() {
    return {
      host: this.$store.state.HOST,
      highqualitPlaylist: [],
    };
  },
  mounted() {
    this.getPersonalized();
  },
  methods: {
    //返回
    back() {
      this.$router.go(-1);
    },
    //  获取【推荐歌单】数据
    getPersonalized() {
      var _this = this;
      axios
        .get(this.host + "/top/playlist", {
          params: { limit: 12, order: "hot" },
        })
        .then(function (res) {
          _this.highqualitPlaylist = res.data.playlists;
          _this.$emit("swiperUpdate");
        });
    },
    //  跳转至【歌单】
    toSongsList(id, obj, type, name, picUrl) {
      this.$router.push({
        path: "/songslist/" + id,
        query: { type: type, name: name || "", picUrl: picUrl || null },
      });
    },
  },
};
</script>
