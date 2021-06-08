import Vue from 'vue'
import Vuex from 'vuex'
import {
  login,
  register,
  updateUser
} from '@/api/user'
import {
  saveToken
} from '@/utils/token'
import storage from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: storage.read('user') || {}
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    onLogin ({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data).then((res) => {
          console.log(res)
          if (res.code === 200) {
            saveToken()
            storage.write('user', res.data)
            commit('setUser', res.data)
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    onRegister ({ commit }, data) {
      return new Promise((resolve, reject) => {
        register(data).then((res) => {
          console.log(res)
          if (res.code === 200) {
            saveToken()
            storage.write('user', res.data)
            commit('setUser', res.data)
          }
          resolve(res)
        }).catch((err) => {
          console.log(err)
          reject(err)
        })
      })
    },
    onUpdateUser ({ commit }, data) {
      return new Promise((resolve, reject) => {
        updateUser(data).then(res => {
          console.log(res)
          if (res.code === 200) {
            storage.write('user', res.data)
            commit('setUser', res.data)
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  modules: {
  }
})
