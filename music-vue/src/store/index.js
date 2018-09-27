/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import lib from '../../../store/lib/album.js'

// import utils from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // venues: []
    albums: [],
    mostSoldAlbum: [],
    worstAlbum: [],
    purcharseBigger: [],
  },
  mutations: {
  	getAlbums (state) {
  		state.albums = lib.getAlbums()
  	},

  	albumsList(state) {
  		state.albums = lib.albumsList()
  	},

  	getAlbumComments(state) {
  		state.albums.forEach(album => {
  			album.comments = lib.getAlbumComments(album)
  		})
  	},

  	purchasedAlbums(state) {
  		state.albums.forEach(album => {
  			album.quantity = lib.purchasedAlbums(album.id)
  		})
  	},

  	soldAlbums(state) {
  		state.albums.forEach(album => {
  			album.quantity = lib.soldAlbums(album.id)
  		})
  	},

    lessSoldAlbum(state) {
      state.lessSoldAlbum = lib.lessSoldAlbum()
    },

    worstAlbum(state) {
      state.worstAlbum = lib.worstAlbum()
    },

    purcharseBigger(state) {
      state.purcharseBigger = lib.purcharseBigger()
    }
  },



  plugins: [
  //createPersistedState()
  ]
})
