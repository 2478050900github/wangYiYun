<template>
  <div id="singer">
    <van-nav-bar :title="artist.name" left-text="返回" left-arrow @click-left="goback(-1)" />

    <div class="singer-pic">
      <img class="auto-img" v-if="artist" :src="artist.picUrl" />
    </div>
    <div class="list-box">
      <div class="title">
        <h1>50首热门歌曲</h1>
      </div>
      <!-- <v-loading msg="歌单加载可能需等待较长时间.." v-if="!hotSongsList"></v-loading> -->
      <!-- v-if="hotSongsList" -->
      <div
        class="item"
        v-for="(item,index) in hotSongsList"
        @click="toPlay(item.id,index)"
        :key="index"
      >
        <div class="sequence">
          <span>{{ index+1 }}</span>
        </div>
        <div class="song-msg">
          <h1 class="song-name one-text">{{ item.name }}</h1>
          <h4
            class="description one-text"
          >{{ item.ar[0].name + ((item.ar[1] && item.ar[1].name)?'/'+item.ar[1].name:'') + (item.al?' - '+item.al.name:"") }}</h4>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-duo" />
          </svg>
        </div>
      </div>
    </div>
    <!-- <v-footer></v-footer> -->
  </div>
</template>

<script>
import axios from "axios";
import vLoading from "@/components/loading/loading";
import "../../assets/css/artist.less";

export default {
  data() {
    return {
      host: this.$store.state.HOST,
      artist: {
        name: "",
        picUrl: null,
      },
      hotSongsList: null,
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.getArtistSongList(this.$route.params.id);
    }
    if (this.$route.query.name) this.artist.name = this.$route.query.name;
    if (this.$route.query.picUrl) this.artist.picUrl = this.$route.query.picUrl;
  },
  methods: {
    getArtistSongList(id) {
      var _this = this;
      axios
        .get(this.host + "/artists", {
          params: {
            id: id,
          },
        })
        .then(function (res) {
           
           
          _this.hotSongsList = res.data.hotSongs;
        });
    },
    goback(index) {
      this.$router.go(index);
    },
    //  跳转至【播放器】
    toPlay(id, index) {
      this.$store.commit("setSongsList", this.hotSongsList);
      this.$store.commit("setListIndex", index);
      this.$router.push({ path: "/player/" + id });
    },
  },
  components: {
    vLoading,
    // vFooter,
  },
};
</script>
