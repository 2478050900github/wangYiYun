<template>
  <div class="my">
    <div class="my-top">
      <div class="author-pic fl">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-girl" />
        </svg>
      </div>
      <div class="nick-box fl">
        <div class="nick-name one-text">用户abc123</div>
        <div class="grade">
          <span class="vip">VIP</span>
          <span class="lv">Lv.6</span>
        </div>
      </div>
      <div class="openVip fr">
        开通黑胶VIP
        <van-icon class="fr" name="arrow" />
      </div>
    </div>
    <div class="my-box">
      <h1>我的音乐</h1>
      <div class="my-tab">
        <div v-for="(item,index) in tabbars" :key="index" @click="toList(index)">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="item.tabIcon" />
          </svg>
          <div>{{item.tabTit}}</div>
        </div>
      </div>
      <div class="my-list">
        <h1>我的歌单</h1>
        <van-collapse v-model="activeNames">
          <van-collapse-item title="默认列表" name="1" icon="music-o">
            <div class="list">
              <van-card
                v-for="(item, i) in newsongs"
                :key="i"
                :thumb="item.song.album.picUrl"
                :title="item.name + ' ' +'—'+ item.song.artists[0].name"
                @click="toPlay(item.id)"
              >
                <template #footer>
                  <div class="play-btn">
                    <img
                      class="auto-img"
                      :src="require('../../assets/images/' + (isPlay ? 'pause.png' : 'play.png'))"
                    />
                  </div>
                </template>
              </van-card>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "../../assets/css/my.less";
export default {
  name: "my",
  data() {
    return {
      host: this.$store.state.HOST,
      activeNames: ["1"],
      newsongs: [], // 最新音乐
      isPlay: false, // 播放
      tabbars: [
        {
          tabTit: "我的收藏",
          tabIcon: "#icon-like-act",
          url: "/mycollent",
        },
        {
          tabTit: "最近播放",
          tabIcon: "#icon-zuijin",
          url: "/recent",
        },
        {
          tabTit: "日推",
          tabIcon: "#icon-tuijian",
          url: "/ev",
        },
      ],
    };
  },
  mounted() {
    this.getNewsongs();
  },
  methods: {
    //  获取【最新音乐】
    getNewsongs() {
      var _this = this;
      axios.get(this.host + "/personalized/newsong").then(function (res) {
        _this.newsongs = res.data.result;
        _this.$emit("swiperUpdate");
      });
    },
    //  跳转至【播放器】
    toPlay(id) {
      this.$store.commit("setSongsList", this.songslist);
      this.$router.push({ path: "/player/" + id });
    },
    toList(index) {
      this.$router.push({ path: this.tabbars[index].url });
    },
  },
};
</script>
