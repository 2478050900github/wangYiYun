"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _axios = _interopRequireDefault(require("axios"));

var _config = require("../assets/js/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var store = new _vuex["default"].Store({
  state: {
    HOST: 'http://192.168.90.30:3000',
    // 'http://192.168.54.39:3000'
    // 当前播放歌曲的信息
    playing: {
      id: null,
      //  音乐ID   
      isPlay: false,
      //  播放状态
      title: '',
      //  歌名
      artist: '',
      //  歌手名
      // url: '',                                //  歌曲URL
      songUrl: "https://music.163.com/song/media/outer/url?id=",
      //  歌曲URL
      lyric: '',
      //  未处理的歌词数据
      songsList: [],
      //  当前歌单列表
      playButtonUrl: '#icon-pause',
      //  播放状态小图标
      picUrl: null,
      //  歌曲图片
      lrc: [],
      //  处理的歌词数据
      curTime: 0,
      //  当前音乐的播放时刻
      duration: 0,
      //  音乐时长      
      changeTime: 0,
      //  指定播放时刻          
      listIndex: -1,
      //  当前歌曲在歌曲列表的位置   
      autoNext: true,
      //  触发自动播放下一首
      mode: _config.playMode.sequence,
      // 播放模式
      fullScreen: true,
      //全屏
      isLike: false // showFlag: false

    }
  },
  getters: {
    id: function id(state) {
      return state.playing.id;
    },
    artist: function artist(state) {
      return state.playing.artist;
    },
    isPlay: function isPlay(state) {
      return state.playing.isPlay;
    },
    title: function title(state) {
      return state.playing.title;
    },
    // url: state => state.playing.url,
    songUrl: function songUrl(state) {
      return state.playing.songUrl;
    },
    lyric: function lyric(state) {
      return state.playing.lyric;
    },
    lrc: function lrc(state) {
      return state.playing.lrc;
    },
    songsList: function songsList(state) {
      return state.playing.songsList;
    },
    playButtonUrl: function playButtonUrl(state) {
      return state.playing.playButtonUrl;
    },
    picUrl: function picUrl(state) {
      return state.playing.picUrl;
    },
    curTime: function curTime(state) {
      return state.playing.curTime;
    },
    duration: function duration(state) {
      return state.playing.duration;
    },
    changeTime: function changeTime(state) {
      return state.playing.changeTime;
    },
    listIndex: function listIndex(state) {
      return state.playing.listIndex;
    },
    autoNext: function autoNext(state) {
      return state.playing.autoNext;
    },
    mode: function mode(state) {
      return state.playing.mode;
    },
    fullScreen: function fullScreen(state) {
      return state.playing.fullScreen;
    },
    isLike: function isLike(state) {
      return state.playing.isLike;
    } // showFlag: state => state.playing.showFlag

  },
  mutations: {
    setId: function setId(state, id) {
      state.playing.id = id;
    },
    setUrl: function setUrl(state, url) {
      state.playing.url = url;
    },
    setTitle: function setTitle(state, title) {
      state.playing.title = title;
    },
    setArtist: function setArtist(state, artist) {
      state.playing.artist = artist;
    },
    setIsPlay: function setIsPlay(state, isPlay) {
      state.playing.isPlay = isPlay;
    },
    setPlayButtonUrl: function setPlayButtonUrl(state, playButtonUrl) {
      state.playing.playButtonUrl = playButtonUrl;
    },
    setLyric: function setLyric(state, lyric) {
      state.playing.lyric = lyric;
    },
    setpicUrl: function setpicUrl(state, picUrl) {
      state.playing.picUrl = picUrl;
    },
    setCurTime: function setCurTime(state, curTime) {
      state.playing.curTime = curTime;
    },
    setDuration: function setDuration(state, duration) {
      state.playing.duration = duration;
    },
    setChangeTime: function setChangeTime(state, changeTime) {
      state.playing.changeTime = changeTime;
    },
    setLrc: function setLrc(state, lrc) {
      state.playing.lrc = lrc;
    },
    setSongsList: function setSongsList(state, songsList) {
      state.playing.songsList = songsList;
    },
    pushSongsList: function pushSongsList(state, song) {
      state.playing.songsList.unshift(song);
    },
    setListIndex: function setListIndex(state, listIndex) {
      state.playing.listIndex = listIndex;
    },
    setAutoNext: function setAutoNext(state, autoNext) {
      state.playing.autoNext = autoNext;
    },
    setPlayMode: function setPlayMode(state, mode) {
      state.playing.mode = mode;
    },
    setFullScreen: function setFullScreen(state, fullScreen) {
      state.playing.fullScreen = fullScreen;
    },
    // setShowFlag: (state, showFlag) => { state.playing.fullScreen = showFlag },
    // setFullScreen: (state, isPlay) => { state.playing.fullScreen = isPlay }
    setIsLike: function setIsLike(state, isLike) {
      state.playing.isLike = isLike;
    }
  }
});
exports.store = store;