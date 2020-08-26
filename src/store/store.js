import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { playMode } from "../assets/js/config";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        HOST: 'http://192.168.90.30:3000',          // 'http://192.168.54.39:3000'

        // 当前播放歌曲的信息
        playing: {
            id: null,                               //  音乐ID   
            isPlay: false,                          //  播放状态
            title: '',                               //  歌名
            artist: '',                             //  歌手名
            // url: '',                                //  歌曲URL
            songUrl: "https://music.163.com/song/media/outer/url?id=",//  歌曲URL
            lyric: '',                               //  未处理的歌词数据
            songsList: [],                           //  当前歌单列表
            playButtonUrl: '#icon-pause',            //  播放状态小图标
            picUrl: null,                            //  歌曲图片
            lrc: [],                                 //  处理的歌词数据
            curTime: 0,                             //  当前音乐的播放时刻
            duration: 0,                            //  音乐时长      
            changeTime: 0,                          //  指定播放时刻          
            listIndex: -1,                          //  当前歌曲在歌曲列表的位置   
            autoNext: true,                          //  触发自动播放下一首
            mode: playMode.sequence,                 // 播放模式
            fullScreen: true,                       //全屏
            isLike: false
            // showFlag: false
        }
    },
    getters: {
        id: state => state.playing.id,
        artist: state => state.playing.artist,
        isPlay: state => state.playing.isPlay,
        title: state => state.playing.title,
        // url: state => state.playing.url,
        songUrl: state => state.playing.songUrl,
        lyric: state => state.playing.lyric,
        lrc: state => state.playing.lrc,
        songsList: state => state.playing.songsList,
        playButtonUrl: state => state.playing.playButtonUrl,
        picUrl: state => state.playing.picUrl,
        curTime: state => state.playing.curTime,
        duration: state => state.playing.duration,
        changeTime: state => state.playing.changeTime,
        listIndex: state => state.playing.listIndex,
        autoNext: state => state.playing.autoNext,
        mode: state => state.playing.mode,
        fullScreen: state => state.playing.fullScreen,
        isLike: state => state.playing.isLike
        // showFlag: state => state.playing.showFlag
    },
    mutations: {
        setId: (state, id) => { state.playing.id = id },
        setUrl: (state, url) => { state.playing.url = url },
        setTitle: (state, title) => { state.playing.title = title },
        setArtist: (state, artist) => { state.playing.artist = artist },
        setIsPlay: (state, isPlay) => { state.playing.isPlay = isPlay },
        setPlayButtonUrl: (state, playButtonUrl) => { state.playing.playButtonUrl = playButtonUrl },
        setLyric: (state, lyric) => { state.playing.lyric = lyric },
        setpicUrl: (state, picUrl) => { state.playing.picUrl = picUrl },
        setCurTime: (state, curTime) => { state.playing.curTime = curTime },
        setDuration: (state, duration) => { state.playing.duration = duration },
        setChangeTime: (state, changeTime) => { state.playing.changeTime = changeTime },
        setLrc: (state, lrc) => { state.playing.lrc = lrc },
        setSongsList: (state, songsList) => { state.playing.songsList = songsList },
        pushSongsList: (state, song) => { state.playing.songsList.unshift(song) },
        setListIndex: (state, listIndex) => { state.playing.listIndex = listIndex },
        setAutoNext: (state, autoNext) => { state.playing.autoNext = autoNext },
        setPlayMode: (state, mode) => { state.playing.mode = mode },
        setFullScreen: (state, fullScreen) => { state.playing.fullScreen = fullScreen },
        // setShowFlag: (state, showFlag) => { state.playing.fullScreen = showFlag },
        // setFullScreen: (state, isPlay) => { state.playing.fullScreen = isPlay }
        setIsLike: (state, isLike) => { state.playing.isLike = isLike }
    }
})