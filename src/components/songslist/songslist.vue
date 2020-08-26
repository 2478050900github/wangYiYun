<template>
  <div class="songslist">
    <van-nav-bar :title="type" left-text="返回" left-arrow @click-left="goback(-1)" />
    <div class="content">
      <div class="list-top">
        <div class="list-top-after" :style="{backgroundImage: 'url(' + coverImgUrl + ')'}"></div>
        <div class="msg-box">
          <div class="img-msg">
            <img :src="coverImgUrl" alt />
          </div>
          <div class="txt-msg">
            <h1>{{ name }}</h1>
            <div v-if="avatarUrl && type == '歌单'">
              <img class="author-pic" :src="avatarUrl" />
              <span class="author-name">{{ nickname }}</span>
            </div>
            <div v-if="nickname && type == '专辑'">
              <span class="author-name">歌手：{{ nickname }}</span>
              <h2 class="date">发行时间：{{ date }}</h2>
            </div>
          </div>
        </div>
        <div class="option-box">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shoucang" />
            </svg>
            <h4 class="count">{{ subscribedCount }}</h4>
          </div>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-pinglun" />
            </svg>
            <h4 class="count">{{ commentCount }}</h4>
          </div>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fenxiang" />
            </svg>
            <h4 class="count">{{ shareCount }}</h4>
          </div>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiazai" />
            </svg>
            <h4 class="count">下载</h4>
          </div>
        </div>
      </div>
      <div class="list-box">
        <!-- <v-loading msg="歌单加载可能需等待较长时间.." v-if="!songslist"></v-loading> -->
        <div
          class="item"
          v-for="(item,index) in songslist"
          :key="index"
          @click="toPlay(item.id,index)"
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
              <use xlink:href="#icon-unie644" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations, mapGetters } from "vuex";
import vLoading from "@/components/loading/loading";
import "../../assets/css/songList.less";

export default {
  name: "songslist",
  data() {
    return {
      host: this.$store.state.HOST,
      type: "",
      name: "", //  标题
      creator: "", //  作者
      coverImgUrl: null, //  图片
      subscribedCount: 0, //  收藏数
      commentCount: 0, //  评论数
      shareCount: 0, //  转发数
      avatarUrl: null, //  作者头像
      nickname: "", //  作者昵称
      songslist: null, //  存放歌单数据
      date: "", //  专辑发行时间
    };
  },
  computed: {
    ...mapGetters(["songsList", "isPlay"]),
  },
  components: {
    vLoading,
  },
  mounted() {
    if (this.$route.params.id) {
      this.name = this.$route.query.name || "";
      this.coverImgUrl = this.$route.query.picUrl || null;
      if (this.$route.query.type == "gd") {
        this.type = "歌单";
        this.getPlaylistDetail();
      } else if (this.$route.params.id && this.$route.query.type == "zj") {
        this.type = "专辑";
        this.getAalbum();
      }
    }
  },
  methods: {
    //  获取歌单数据
    getPlaylistDetail() {
      var _this = this;
      axios
        .get(_this.host + "/playlist/detail", {
          params: { id: this.$route.params.id },
        })
        .then(function (res) {
          _this.subscribedCount = res.data.playlist.subscribedCount;
          _this.commentCount = res.data.playlist.commentCount;
          _this.shareCount = res.data.playlist.shareCount;
          _this.name = res.data.playlist.name;
          _this.coverImgUrl = res.data.playlist.coverImgUrl;
          _this.avatarUrl = res.data.playlist.creator.avatarUrl;
          _this.nickname = res.data.playlist.creator.nickname;
          _this.songslist = res.data.playlist.tracks;
        });
    },
    //  获取专辑数据
    getAalbum() {
      var _this = this;
      axios
        .get(_this.host + "/album", {
          params: { id: this.$route.params.id },
        })
        .then(function (res) {
          _this.subscribedCount = res.data.album.info.likedCount;
          _this.commentCount = res.data.album.info.commentCount;
          _this.shareCount = res.data.album.info.shareCount;
          _this.name = res.data.album.name;
          _this.coverImgUrl = res.data.album.picUrl;
          _this.songslist = res.data.songs;
          _this.nickname = res.data.album.artist.name;
          let _date = new Date(res.data.album.publishTime);
          _this.date =
            _date.getFullYear() + "-" + _date.getMonth() + "-" + _date.getDay();
        });
    },
    goback(index) {
      this.$router.go(index);
    },
    //  跳转至【播放器】
    toPlay(id, index) {
      this.$store.commit("setSongsList", this.songslist);
      this.$store.commit("setListIndex", index);
      // this.$store.commit("setShowFlag", true);
      this.$router.push({ path: "/player/" + id });
      this.$store.commit("setFullScreen", true);
    },
  },
};
</script>