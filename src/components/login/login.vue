<template>
  <div class="login">
    <van-nav-bar title="网易云音乐"></van-nav-bar>
    <div class="face">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-wy" />
      </svg>
    </div>

    <van-form @submit="login">
      <van-field
        label="账号"
        v-model="userInfo.phone"
        type="tel"
        left-icon="smile-o"
        placeholder="请输入手机号..."
        maxlength="11"
      />
      <van-field
        v-model="userInfo.password"
        :type="isOpen ? 'text' : 'password'"
        label="密码"
        placeholder="请输入登录密码..."
        left-icon="goods-collect-o"
        :right-icon="isOpen ? 'eye-o' : 'closed-eye'"
        @click-right-icon="isOpenPasswd"
        maxlength="16"
      />

      <div class="login-btn">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <div class="other">
      <h1>其他登录方式</h1>
      <div class="login-way">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-weixin" />
          </svg>
        </div>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-qq" />
          </svg>
        </div>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-weibo" />
          </svg>
        </div>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wangyi" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入样式
import "../../assets/css/login.less";
//导入验证表单模块
import validForm from "../../assets/js/FormValidation";
import axios from "axios";

export default {
  data() {
    return {
      userInfo: {
        phone: "",
        password: "",
      },
      isOpen: false,
    };
  },
  created() {
    // this.login();
  },
  methods: {
    goPage(name) {
      this.$router.push({ name });
    },
    isOpenPasswd() {
      this.isOpen = !this.isOpen;
    },

    //登录
    login() {
      if (validForm.validUserForm(this.userInfo)) {
        let data = Object.assign({}, this.userInfo);
        // data.appkey = this.appkey;

        this.$toast.loading({
          message: "加载中...",
          // 防止点击穿透
          forbidClick: true,
          duration: 0,
        });

        axios
          .post(this.host + "/login/cellphone", {
            data,
            // params: { phone: this.keywords, password: this.password },
          })
          .then(function (res) {
            this.$toast.clear();
            if (result.data.code == 200) {
              localStorage.setItem("__Tk", result.data.token);
              //跳转到页面
              // this.$router.push({ name: "01SY" });
               
            } else {
              this.$toast(result.data.msg);
            }
          })
          .catch((err) => {
            this.$toast.clear();
          });
        // //发起请求
        // this.axios({
        //   method: "POST",
        //   url: "/login",
        //   data,
        // })
        // .then((result) => {
        //   this.$toast.clear();
        //   if (result.data.code == 200) {
        //     localStorage.setItem("__Tk", result.data.token);
        //     //跳转到页面
        //     this.$router.push({ name: "01SY" });
        //   } else {
        //     this.$toast(result.data.msg);
        //   }
        // })
        // .catch((err) => {
        //   this.$toast.clear();
        // });
      }
    },
  },
};
</script>