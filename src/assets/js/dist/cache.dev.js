"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveFavorite = saveFavorite;
exports.deleteFavorite = deleteFavorite;
exports.loadFavorite = loadFavorite;
// 操作和 storage 相关代码
// import storage from 'good-storage'
var FAVORITE_KEY = '__favorite__';
var FAVORITE_MAX_LENGTH = 200;

function saveFavorite(song) {
  var songs = storage.get(FAVORITE_KEY, []);
  insertArray(songs, song, function (item) {
    return song.id === item.id;
  }, FAVORITE_MAX_LENGTH);
  storage.set(FAVORITE_KEY, songs);
  return songs;
}

function deleteFavorite(song) {
  var songs = storage.get(FAVORITE_KEY, []);
  deleteFromArray(songs, function (item) {
    return song.id === item.id;
  });
  storage.set(FAVORITE_KEY, songs);
  return songs;
}

function loadFavorite() {
  return storage.get(FAVORITE_KEY, []);
}