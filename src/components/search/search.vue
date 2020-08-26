<template>
  <div class="search">
    <div class="header">
      <div class="search-box fl">
        <input
          class="searchInput"
          v-model="keywords"
          type="text"
          placeholder="搜索音乐，歌词，电台"
          @keyup.enter="getSearch"
          key="searchInput"
        />
        <div class="sch">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-search" />
          </svg>
        </div>
      </div>

      <!-- <router-link to="/index/recommend"> -->
      <div class="back fr" @click="back">
        <span>取消</span>
      </div>
      <!-- </router-link> -->
    </div>
    <div class="menutab">
      <van-tabs v-model="actIndex">
        <van-tab title="单曲">
          <div class="list-box">
            <div class="song-list" v-for="(item,index) in songs" :key="index">
              <div class="item" @click="toPlay(item.id,item,index)">
                <div class="song-msg">
                  <h1 class="song-name one-text">{{ item.name }}</h1>
                  <h4
                    class="description one-text"
                  >{{ item.artists[0].name + (item.album.name?(' - ' + item.album.name):'') }}</h4>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-play" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="歌手">
          <div class="list-box">
            <div
              class="artist-list"
              v-for="(item,index) in artists"
              @click="toArtists(item.id,item,item.name,item.picUrl)"
              :key="index"
            >
              <div class="item">
                <div class="artist-pic fl">
                  <img class="auto-img" :src="item.img1v1Url" />
                </div>
                <div class="song-msg fl">
                  <h1
                    class="artist-name one-text fl"
                  >{{ item.name + (item.alias.length?(' (' + item.alia[0] + ')'):'' ) }}</h1>
                  <van-icon class="fr" name="arrow" />
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import "../../assets/css/search.less";
import axios from "axios";

export default {
  data() {
    return {
      actIndex: 0, //单曲、歌手-切换
      songs: [], //单曲
      artists: [], //歌手
      host: this.$store.state.HOST,
      keywords: "",
    };
  },
  computed: {},
  mounted() {
    if (this.$route.query.key) {
      this.keywords = this.$route.query.key;
      this.getSearch();
    }
  },
  components: {},
  methods: {
    //返回
    back() {
      this.$router.go(-1);
    },
    //  跳转至【播放器】
    toPlay(id, item, index) {
      this.$store.commit("pushSongsList", item);
      this.$store.commit("setListIndex", 0);
      this.$router.push({ path: "/player/" + id });
    },
    //  跳转至【歌手单曲】
    toArtists(id, artist, name, pciUrl) {
      this.$router.push({
        path: "/artists/" + id,
        query: { name: name, picUrl: pciUrl },
      });
    },
    getSearch() {
      var _this = this;
      // 单曲
      axios
        .get(this.host + "/search", {
          params: { keywords: this.keywords, type: 1 },
        })
        .then(function (res) {
          _this.songs = res.data.result.songs;
        });
      // 歌手
      axios
        .get(this.host + "/search", {
          params: { keywords: this.keywords, type: 100 },
        })
        .then(function (res) {
          _this.artists = res.data.result.artists;
        });
      return false;
    },
  },
};
</script>