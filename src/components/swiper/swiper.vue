<template>
  <div class="swiper">
    <van-swipe style="height:3rem;" :autoplay="3000" class="my-swipe" indicator-color="red">
      <van-swipe-item v-for="(item, index) in banners" :key="index">
        <img v-lazy="item.imageUrl" style="width:100%; height:100%;" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    getUrl: {
      default: null,
      type: String,
    },
  },
  data() {
    return {
      // 轮播图数据
      banners: [],
    };
  },
  created() {
    this.getBanner();
  },
  mounted() {
    if (this.getUrl) {
      this.getBanner();
    }
  },
  methods: {
    // 获取轮播图数据
    getBanner() {
      var _this = this;
      axios.get(_this.getUrl).then(function (res) {
        _this.banners = res.data.banners;
        _this.$emit("bannerUpdate");
      });
    },
  },
};
</script>