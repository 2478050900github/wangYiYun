<template>
  <div class="play" v-show="songsList.length>0">
    <!-- <div class="play"> -->
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <van-nav-bar :title="title + ' - '+ artist" left-text="返回" left-arrow @click-left="back" />
        <div class="song-main">
          <transition name="fade">
            <div class="middle-box">
              <div
                class="pic-box"
                v-show="!showLrc"
                @click="showLrc = true"
                :style="{'animation': (isPlay? 'none':' turn 5s linear infinite')}"
              >
                <img :src="picUrl" alt class="album-pic auto-img" />
                <div></div>
              </div>
              <div class="action-list clearfix">
                <div @click="likeAndNotLike">
                  <!-- <div> -->
                  <van-icon
                    class="icon"
                    :name="isLike ? 'like-o':'like'"
                    :color="isLike ? '#e00b36' : '#fff'"
                  />
                </div>
                <div>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai" />
                  </svg>
                </div>
                <div @click="toComment()">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pinglun" />
                  </svg>
                </div>
                <div>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sandian" />
                  </svg>
                </div>
              </div>
            </div>
          </transition>
          <transition name="fade">
            <!-- 歌词 -->
            <div v-show="showLrc" class="showLrc-box" @click="showLrc = false" ref="wrapper">
              <ul v-show="lrc.length" class="lrc" ref="lyricUL">
                <li
                  v-for="(item,i) in lrc"
                  ref="lrcLi"
                  :style="{color:isLrcLight===i?'#f8f8f8':'#000', lineHeight:isLrcLight===i? '40px':' ',
              fontSize:isLrcLight===i?'20px':'17px'}"
                  :key="i"
                  :data-index="i"
                >{{ item[1] }}</li>
              </ul>
              <ul v-show="!lrc.length" style="margin-top:40%;">
                <span class="no-lrc">暂无歌词</span>
              </ul>
            </div>
          </transition>
        </div>
        <div class="play-btn-box">
          <div class="progress-bar">
            <div class="current-time stime fl">{{ nowTime }}</div>
            <div class="progress-box fl">
              <div ref="progress" class="progress">
                <div ref="curProgress" class="cur-progress" :style="{ width: curLength+'%'}"></div>
                <div
                  class="idot"
                  :style="{left: curLength-2 +'%'}"
                  @mousedown="down"
                  @mousemove="move"
                  @touchstart="touchstart"
                  @touchmove="touchmove"
                ></div>
              </div>
            </div>
            <div class="left-time stime fr">{{ songTime }}</div>
          </div>

          <div class="play-btns clearfix">
            <div class="fl play-style" @click="changeMode">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="iconMode" />
              </svg>
            </div>

            <div class="fl mid">
              <div @click="prev" class="pn">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-prev" />
                </svg>
              </div>

              <div @click="togglePlay">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="playButtonUrl" />
                </svg>
              </div>

              <div @click="next" class="pn">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-next" />
                </svg>
              </div>
            </div>
            <audio
              ref="audio"
              :src="songUrl + id +'.mp3'"
              controls="controls"
              preload="auto"
              @timeupdate="timeupdate"
              @ended="endPlay"
              autoplay
              style="display:none;"
            ></audio>
            <!-- preload 属性规定是否在页面加载后载入音频。 -->

            <div @click="showSList" class="fr">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-list" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="mini">
      <div class="mini-player-box" v-show="!fullScreen">
        <div class="mini-player">
          <div class="song-face fl" @click.stop="open">
            <img :src="picUrl" class="auto-img" />
          </div>
          <div class="text fl">
            <h2 class="name one-text" v-html="title"></h2>
            <div class="desc one-text" v-html="artist"></div>
          </div>

          <div class="control fl" @click="togglePlay">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="playButtonUrl" />
            </svg>

            <van-circle
              v-model="currentRate"
              :rate="curLength"
              size="50px"
              :stroke-width="90"
              color="#e00b36"
              layer-color="#e8e8e8"
            />
          </div>
          <div @click="showSList" class="fr">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-list" />
            </svg>
          </div>

          <van-popup class="popup-box" v-model="isShowList" position="bottom">
            <div class="songsList-box">
              <div class="top">
                <span class="title">播放列表</span>
                <span class="option fr" @click="emptied">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-delete" />
                  </svg>
                  清空
                </span>
              </div>
              <div class="content">
                <div
                  class="song-list"
                  v-for="(item,index) in songsList"
                  :key="index"
                  @click="toPlay(item.id)"
                >
                  <h1 class="one-text fl">
                    <span class="name">{{ item.name }}</span>
                    <span class="artist">- {{ item.ar?item.ar[0].name:item.artists[0].name }}</span>
                  </h1>
                  <svg class="icon delete fr" aria-hidden="true">
                    <use xlink:href="#icon-guanbi" />
                  </svg>
                </div>
              </div>
            </div>
          </van-popup>
        </div>
      </div>
    </transition>
    <van-popup class="popup-box" v-model="isShowList" position="bottom">
      <div class="songsList-box">
        <div class="top">
          <span class="title">播放列表</span>
          <span class="option fr" @click="emptied">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-delete" />
            </svg>
            清空
          </span>
        </div>
        <div class="content">
          <div
            class="song-list"
            v-for="(item,index) in songsList"
            :key="index"
            @click="toPlay(item.id)"
          >
            <h1 class="one-text fl">
              <span class="name">{{ item.name }}</span>
              <span class="artist">- {{ item.ar?item.ar[0].name:item.artists[0].name }}</span>
            </h1>
            <svg class="icon delete fr" aria-hidden="true">
              <use xlink:href="#icon-guanbi" />
            </svg>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
  <!-- 《歌词滚动》!!!!!!!!
  在audio的timeupdate事件是进行监听【循环 得到的歌词数组，拿到时间并与 currentTime 进行对比，如果 currentTime 大于歌词时间，拿到当前li标签 data-index 的值，与循环的 i 进行对比，如果相同就更新data里面的 isLrcLight（是否高亮标记） 的值，同时控制外层 ul 标签的滚动--改变-transfrom：translateY() 的值。 】-->
</template>

<script>
import "../../assets/css/player.less";
import "../../assets/css/mini.less";
import axios from "axios";
// import audio from '@/components/audio/audio'
import { mapMutations, mapGetters, mapActions } from "vuex";
import { playMode } from "../../assets/js/config";
import { shuffle } from "../../assets/js/randomArr";

export default {
  data() {
    return {
      host: this.$store.state.HOST,
      showSongsList: false,
      showLrc: false,
      touchStartX: 0,
      progressLength: 0,
      isDown: false,
      curLength: 0,
      songName: "",
      songTime: "00:00",
      nowTime: "00:00",
      isShowList: false, //弹出列表
      isLrcLight: 0,
      lrcMoveIndex: 0, //歌词移动的index
      currentRate: 0,
      // isLike: false,
      // idx: 0,
      // showFlag: false,
    };
  },
  watch: {
    autoNext: function () {
      this.next();
    },
    isPlay: function (val) {
      if (val) this.$store.commit("setPlayButtonUrl", "#icon-play");
      else this.$store.commit("setPlayButtonUrl", "#icon-pause");
    },
    changeTime: function () {
      //  跳到指定时刻播放
      this.$refs.audio.currentTime = this.changeTime;
    },
    duration: function () {
      this.songTime = this.formatTime(this.$refs.audio.duration);
    },
  },
  computed: {
    //设置播放模式图标
    iconMode() {
      return this.mode === playMode.sequence
        ? "#icon-shunxu"
        : this.mode === playMode.loop
        ? "#icon-danqu"
        : "#icon-suiji";
    },
    ...mapGetters([
      "mode",
      "id",
      "url",
      "isPlay",
      "songUrl",
      "curTime",
      // "changeTime",
      "songsList",
      "playButtonUrl",
      "picUrl",
      "duration",
      "title",
      "artist",
      "lrc",
      "listIndex",
      "autoNext",
      // "showFlag",
      "fullScreen",
      "isLike",
    ]),
  },
  mounted() {
    this.progressLength = this.$refs.progress.getBoundingClientRect().width;
    document.onmouseup = this.up;
    if (this.$route.params.id && this.id != this.$route.params.id) {
      this.$store.commit("setId", this.$route.params.id);
      this.getSongDetail();
    }
  },
  created() {
    // this.timeupdate();
  },
  methods: {
    //返回
    back() {
      // this.setFullScreen(false);
      this.$store.commit("setFullScreen", false);
      this.$router.go(-1);
    },
    open() {
      this.$store.commit("setFullScreen", true);
    },
    changeMode() {
      const mode = (this.mode + 1) % 3;
      this.$store.commit("setPlayMode", mode);
      if (mode === playMode.random) {
        this.$toast("随机播放");
      } else if (mode === playMode.loop) {
        this.$toast("单曲循环");
      } else {
        this.$toast("顺序播放");
      }
    },

    //  暂停\播放
    togglePlay() {
      if (this.isPlay) {
        this.$refs.audio.play();
        this.$store.commit("setIsPlay", false);
      } else {
        this.$refs.audio.pause();
        this.$store.commit("setIsPlay", true);
      }
    },
    endPlay() {
      if (this.mode == 1 || this.songsList == undefined) {
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
      } else {
        this.next();
      }
    },
    //  获取歌曲详情
    getSongDetail() {
      var _this = this;
      axios
        .get(this.host + "/song/detail", {
          params: {
            ids: _this.id,
          },
        })
        .then(function (res) {
          _this.getLyric();
          _this.timeupdate();
          _this.$store.commit("setpicUrl", res.data.songs[0].al.picUrl);
          _this.$store.commit("setTitle", res.data.songs[0].name);
          _this.$store.commit("setArtist", res.data.songs[0].ar[0].name);
        });
    },
    //  鼠标按下拖拽按钮
    down() {
      this.isDown = true;
    },
    //  鼠标拖拽按钮
    move(e) {
      if (this.isDown) {
        var curLength = this.$refs.curProgress.getBoundingClientRect().width;
        var newLength = ((curLength + e.movementX) / this.progressLength) * 100;
        if (newLength > 100) newLength = 100;
        else if (newLength < 0) newLength = 0;
        this.curLength = newLength;
      }
    },
    //  松开鼠标
    up() {
      this.isDown = false;
    },
    //  触屏开始
    touchstart(e) {
      this.touchStartX = e.touches[0].pageX;
    },
    //  触屏拖拽
    touchmove(e) {
      var movementX = e.touches[0].pageX - this.touchStartX;
      var curLength = this.$refs.curProgress.getBoundingClientRect().width;
      //  计算出百分比
      var newPercent = ((curLength + movementX) / this.progressLength) * 100;
      newPercent =
        newPercent > 100 ? 100 : (newPercent = newPercent < 0 ? 0 : newPercent);
      this.curLength = newPercent;
      this.touchStartX = e.touches[0].pageX;
      //  根据百分比推出对应的播放时间
      this.changeTime(newPercent);
    },
    //  更改歌曲进度
    changeTime(percent) {
      let newCurTime = (percent / 100) * this.$refs.audio.duration;
      this.$store.commit("setChangeTime", newCurTime);
      this.$refs.audio.currentTime = newCurTime;
    },
    // 获取歌词
    getLyric() {
      this.$store.commit("setLyric", []);
      this.$store.commit("setLrc", []);
      if (!this.id) return false;
      var _this = this;
      axios
        .get(this.host + "/lyric", {
          params: {
            id: _this.id,
          },
        })
        .then(function (res) {
          var lrc = _this.parseLyric(res.data.lrc.lyric);
          _this.$store.commit("setLyric", res.data.lrc.lyric);
          _this.$store.commit("setLrc", lrc);
        });
    },
    //  解析歌词
    parseLyric(text) {
      var lines = text.split("\n"),
        pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g,
        result = [];
      while (!pattern.test(lines[0])) {
        lines = lines.slice(1);
      }

      // pop();移除数组中最后一个元素
      lines[lines.length - 1].length === 0 && lines.pop();

      lines.forEach(function (v, i, a) {
        var time = v.match(pattern),
          value = v.replace(pattern, "");

        time.forEach(function (v1, i1, a1) {
          var t = v1.slice(1, -1).split(":");
          if (value != "" && value != " ") {
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
          }
        });
      });
      result.sort(function (a, b) {
        return a[0] - b[0];
      });
      return result;
    },

    // 时间格式化
    formatTime(sec) {
      // sec秒数
      var minute = Math.floor(sec / 60);
      minute = minute >= 10 ? minute : "0" + minute;
      var second = Math.floor(sec % 60);
      second = second >= 10 ? second : "0" + second;
      return minute + ":" + second;
    },
    // 更新当前时间
    timeupdate() {
      this.nowTime = this.formatTime(this.$refs.audio.currentTime);
      this.songTime = this.formatTime(this.$refs.audio.duration);
      if (this.nowTime == this.formatTime(this.$refs.audio.duration)) {
        this.currentLength = 0;
      } else {
        this.curLength = (
          (this.$refs.audio.currentTime.toFixed(2) /
            this.$refs.audio.duration) *
          100
        ).toFixed(2);
      }

      // 歌词滚动
      if (this.lrc.length != 0) {
        for (var i = 0; i < this.lrc.length; i++) {
          var nextLrcTime = this.lrc[i + 1];
          if (nextLrcTime === undefined) {
            return;
          }
          if (this.$refs.audio.currentTime > this.lrc[i][0]) {
            const index = this.$refs.lrcLi[i].dataset.index;
            if (i === parseInt(index)) {
              this.isLrcLight = i;
              this.$refs.lyricUL.style.transform = `translateY(${
                100 - 30 * (i + 1)
              }px)`;
            }
          }
        }
      }
    },

    // 展示歌单
    showSList() {
      this.isShowList = true;
    },
    //  跳转至【评论】
    toComment() {
      if (this.id) this.$router.push({ path: "/comment/music/" + this.id });
    },
    //  播放歌曲列表内容
    toPlay(id) {
      if (id && id != this.id) {
        this.$router.replace({ path: "/player/" + id });
        this.$store.commit("setId", id);
        this.$store.commit("setIsPlay", false);
        this.$store.commit("setFullScreen", true);
        this.getSongDetail();
      }
      this.showSongsList = false;
    },
    //  下一首
    next() {
      let listiddx = null;
      if (this.listIndex != -1 && this.songsList.length > 1) {
        // this.$refs.audio.play();
        if (this.listIndex < this.songsList.length - 1) {
          if (this.mode == 2) {
            // 随机
            listiddx = shuffle(0, this.songsList.length);
            this.toPlay(this.songsList[listiddx + 1].id);
            this.$store.commit("setListIndex", listiddx + 1);
          } else {
            this.toPlay(this.songsList[this.listIndex + 1].id);
            this.$store.commit("setListIndex", this.listIndex + 1);
          }
        } else {
          this.toPlay(this.songsList[0].id);
          this.$store.commit("setListIndex", 0);
        }
      }
    },
    //  上一首
    prev() {
      if (this.listIndex != -1 && this.songsList.length > 1) {
        if (this.listIndex > 0) {
          this.$store.commit("setListIndex", this.listIndex - 1);
          this.toPlay(this.songsList[this.listIndex].id);
        } else {
          this.$store.commit("setListIndex", this.songsList.length - 1);
          this.toPlay(this.songsList[this.listIndex].id);
        }
      }
    },
    //  清空歌曲列表
    emptied() {
      this.$store.commit("setSongsList", []);
    },
    goback(index) {
      this.$router.go(index);
    },
    likeAndNotLike() {
    },
  },
};
</script>
