"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _home = _interopRequireDefault(require("@/components/home/home"));

var _songslist = _interopRequireDefault(require("@/components/songslist/songslist"));

var _player = _interopRequireDefault(require("@/components/player/player"));

var _comment = _interopRequireDefault(require("@/components/comment/comment"));

var _search = _interopRequireDefault(require("@/components/search/search"));

var _artists = _interopRequireDefault(require("@/components/artists/artists"));

var _recommend = _interopRequireDefault(require("@/components/recommend/recommend"));

var _top = _interopRequireDefault(require("@/components/top/top"));

var _my = _interopRequireDefault(require("@/components/my/my"));

var _myCollect = _interopRequireDefault(require("@/components/my/myCollect/myCollect"));

var _recently = _interopRequireDefault(require("@/components/my/recent/recently"));

var _evRecommend = _interopRequireDefault(require("@/components/my/evRecommend/evRecommend"));

var _songlist = _interopRequireDefault(require("@/components/home/songlist/songlist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 路由冗余
// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err);
// }
var routes = [{
  path: '*',
  redirect: '/index/recommend'
}, {
  path: '/index',
  component: _home["default"],
  children: [{
    path: 'recommend',
    component: _recommend["default"]
  }, {
    path: 'top',
    component: _top["default"]
  }, {
    path: 'my',
    component: _my["default"]
  }]
}, // 动态路由，即带参数跳转/:id
{
  path: '/songslist/:id',
  component: _songslist["default"]
}, {
  path: '/player/:id',
  component: _player["default"]
}, {
  path: '/player',
  component: _player["default"]
}, {
  path: '/comment/:type/:id',
  component: _comment["default"]
}, {
  path: '/search',
  component: _search["default"]
}, {
  path: '/artists/:id',
  component: _artists["default"]
}, {
  path: '/mycollent',
  component: _myCollect["default"]
}, {
  path: '/recent',
  component: _recently["default"]
}, {
  path: '/ev',
  component: _evRecommend["default"]
}, {
  path: '/yhot',
  component: _songlist["default"]
} // { path: '/login', component: Login },
// { path: '/loading', component: loading }
];
var _default = routes;
exports["default"] = _default;