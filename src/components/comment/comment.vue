<template>
  <div class="comment">
    <van-nav-bar title="评论" left-text="返回" left-arrow @click-left="back" />
    <div class="top">
      <div class="img-box">
        <img class="auto-img" :src="picUrl" alt />
      </div>
      <div class="msg-box">
        <h1 class="title">{{ title }}</h1>
        <h4 class="author">{{ artist }}</h4>
      </div>
    </div>
    <div class="comment-box">
      <div class="hot-comment">
        <h2 class="title">精彩评论</h2>
        <!-- <v-loading v-if="!hotComments" msg></v-loading> -->
        <div class="comments-list" v-for="(item,index) in hotComments" :key="index">
          <div class="avatar">
            <img :src="item.user.avatarUrl" alt />
          </div>
          <div class="content">
            <div class="information">
              <h1 class="name">{{ item.user.nickname }}</h1>
              <span
                class="date"
              >{{ (new Date( item.time )).getFullYear()+'年'+(new Date( item.time )).getMonth()+'月'+(new Date( item.time )).getDate()+'日' }}</span>
              <div class="like">
                <span class="num">{{ item.likedCount }}</span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-dianzan" />
                </svg>
              </div>
            </div>
            <div class="context">{{ item.content }}</div>
          </div>
        </div>
      </div>
      <div class="new-comment">
        <h2 class="title">最新评论</h2>
        <!-- <v-loading v-if="!newComments" msg></v-loading> -->
        <div class="comments-list" v-for="(item,index) in newComments" :key="index">
          <div class="avatar">
            <img :src="item.user.avatarUrl" alt />
          </div>
          <div class="content">
            <div class="information">
              <h1 class="name">{{ item.user.nickname }}</h1>
              <span
                class="date"
              >{{ (new Date( item.time )).getFullYear()+'年'+(new Date( item.time )).getMonth()+'月'+(new Date( item.time )).getDate()+'日' }}</span>
              <div class="like">
                <span class="num">{{ item.likedCount }}</span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-dianzan" />
                </svg>
              </div>
            </div>
            <div class="context">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/css/comment.less";
import axios from "axios";
import { mapMutations, mapGetters } from "vuex";
// import vLoading from "@/components/loading/loading";

export default {
  data() {
    return {
      host: this.$store.state.HOST,
      hotComments: null,
      newComments: null,
    };
  },
  computed: {
    ...mapGetters(["picUrl", "title", "artist"]),
  },
  mounted() {
    var type = this.$route.params.type;
    var id = this.$route.params.id;
    this.getComments(type, id);
  },
  methods: {
    //返回
    back() {
      this.$router.go(-1);
    },
    getComments(type, id) {
      var _this = this;
      if (!type || !id) return false;
      axios
        .get(this.host + "/comment/" + type, {
          params: {
            id: id,
          },
        })
        .then(function (res) {
          _this.hotComments = res.data.hotComments;
          _this.newComments = res.data.comments;
        });
    },
  },
  // components: {
  //   vLoading,
  // },
};
</script>