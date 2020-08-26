import Vue from 'vue'
// import router from './router'
import VueRouter from 'vue-router'
import routes from './routers'
import App from './App.vue'
import { store } from './store/store'

import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)
import vAudio from '@/components/audio/audio'
import '@/assets/css/reset.css'
import '@/assets/css/basic.css'
// import '@/assets/js/iconfont.js'
// 移动端rem
import 'lib-flexible'
// 引入阿里巴巴图标
import './assets/icon/iconfont.css'
import './assets/icon/iconfont'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video;

//导入vant框架
import {
  NavBar,
  Swipe, SwipeItem,
  SwipeCell,
  Lazyload,
  Card,
  Tabbar, TabbarItem,
  Popup,
  Cell, CellGroup,
  Button,
  NoticeBar,
  Search,
  Tabs, Tab,
  Icon,
  Skeleton,
  Form,
  Field,
  Collapse, CollapseItem,
  Toast,
  Circle
} from 'vant'

Vue
  .use(SwipeCell)
  .use(NavBar)
  .use(Lazyload)
  .use(Swipe)
  .use(Tabbar)
  .use(TabbarItem)
  .use(SwipeItem)
  .use(Popup)
  .use(Cell)
  .use(CellGroup)
  .use(Card)
  .use(NoticeBar)
  .use(Search)
  .use(Tabs)
  .use(Tab)
  .use(Icon)
  .use(Skeleton)
  .use(Form)
  .use(Field)
  .use(Collapse)
  .use(CollapseItem)
  .use(Toast)
  .use(Circle)
  .use(Button);

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes
});

/* eslint-disable no-new */
new Vue({
  router,
  store: store,
  components: {
    vAudio
  },
  render: h => h(App)
}).$mount('#app')
