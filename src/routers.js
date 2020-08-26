import Home from '@/components/home/home'
import Songslist from '@/components/songslist/songslist'
import Player from '@/components/player/player'
import Comment from '@/components/comment/comment'
import Search from '@/components/search/search'
import Artists from '@/components/artists/artists'
import Recommend from '@/components/recommend/recommend'
import Top from '@/components/top/top'
import My from '@/components/my/my'
import Mycollent from '@/components/my/myCollect/myCollect'
import Recent from '@/components/my/recent/recently'
import Ev from '@/components/my/evRecommend/evRecommend'
import Yunhot from '@/components/home/songlist/songlist'

// 路由冗余
// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err);
// }

const routes = [
  { path: '*', redirect: '/index/recommend' },
  {
    path: '/index', component: Home,
    children: [
      { path: 'recommend', component: Recommend },
      { path: 'top', component: Top },
      { path: 'my', component: My, },
    ]
  },
  // 动态路由，即带参数跳转/:id
  { path: '/songslist/:id', component: Songslist },
  { path: '/player/:id', component: Player },
  { path: '/player', component: Player },
  { path: '/comment/:type/:id', component: Comment },
  { path: '/search', component: Search },
  { path: '/artists/:id', component: Artists },
  { path: '/mycollent', component: Mycollent },
  { path: '/recent', component: Recent },
  { path: '/ev', component: Ev },
  { path: '/yhot', component: Yunhot },
  // { path: '/login', component: Login },
  // { path: '/loading', component: loading }
]

export default routes

