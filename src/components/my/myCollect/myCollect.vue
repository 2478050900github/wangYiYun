<template>
  <div class="ev">
    <van-nav-bar title="我的喜欢的音乐" left-text="返回" left-arrow @click-left="goback(-1)" />
  </div>
</template>

<script>
export default {
  methods: {
    goback(index) {
      this.$router.go(index);
    },
  },
};
</script>

<style lang="less" scoped>
</style>