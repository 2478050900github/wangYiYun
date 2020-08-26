<template>
  <div id="top">
    <div
      class="top-list"
      v-for="item in topDatas"
      :key="item.id"
      @click="toSongsList(item.id,'gd')"
    >
      <div class="pic-box">
        <img :src="item.coverImgUrl" />
      </div>
      <div class="top-songs">
        <ul>
          <li
            class="one-text"
            v-for="(song,index) in item.top"
            :key="index"
          >{{ index+1 + ". " + song.name + " - " + song.ar[0].name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "../../assets/css/top.less";
export default {
  name: "top",
  data() {
    return {
      host: this.$store.state.HOST,
      topId: [],
      topDatas: [],
    };
  },
  mounted() {
    this.getlist();
    this.getFirstThree();
  },
  created() {
    // this.getlist();
    // this.getFirstThree();
  },
  methods: {
    getlist() {
      var _this = this;
      axios.get(this.host + "/toplist").then(function (res) {
        _this.topId = res.data.list;
        for (let i = 0; i < _this.topId.length; i++) {
          _this.getFirstThree(res.data.list[i].id);
        }
      });
    },
    //  拿到飙升榜前三首歌
    getFirstThree(id) {
      var _this = this;
      axios
        .get(this.host + "/playlist/detail", {
          params: { id: id },
        })
        .then(function (res) {
          let listDatas = res.data.playlist;
          listDatas.top = res.data.playlist.tracks.slice(0, 3);
          // _this.topDatas.sort((a, b) => {
          //   return b.id - a.id;
          // });
          _this.topDatas.push(listDatas);
        });
    },
    //  跳转-歌单
    toSongsList(id, type) {
      this.$router.push({
        path: "/songslist/" + id,
        query: { type: type || null },
      });
    },
  },
};
</script>