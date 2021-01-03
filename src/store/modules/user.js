import {login, logout, getInfo} from '@/api/user'
import {setToken, getToken, removeToken, getUser, setUser, removeUser} from '@/utils/auth'
import {resetRouter} from '@/router'
import {Message} from 'element-ui'

var md5 = require('md5-node');

const getDefaultState = () => {
  return {
    // token: getToken(),
    token: getUser(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({commit}, userInfo) {
    const {username, password} = userInfo
    return new Promise((resolve, reject) => {
      // setUser(userInfo)
      // setToken(md5(userInfo))
      // resetRouter()
      // resolve()
      // return
      login({username: username.trim(), password: password}).then(response => {
        const {data} = response
        //管理员
        resetRouter()
        if (!response.data.loginFlag) {
          Message.error("用户名或密码错误")
          reject("用户名或密码错误")
        }
        setUser(response.data)
        setToken(response.data.token)
        resolve()
      }).catch(error => {
        Message.error("登录失败,请重试")
        reject(error)
      })
    })
  },

  // get user info
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      // getInfo(state.token).then(response => {
      //   const {data} = response
      //
      //   if (!data) {
      //     return reject('Verification failed, please Login again.')
      //   }
      //
      //   const {name, avatar} = data
      //
      //   commit('SET_NAME', name)
      //   commit('SET_AVATAR', avatar)
      //   resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })
      resolve(getUser())
    })
  },

  // user logout
  logout({commit, state}) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      //   removeToken() // must remove  token  first
      //   removeUser()
      //   resetRouter()
      //   commit('RESET_STATE')
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
      removeToken()
      removeUser()
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetUser({commit}) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeUser()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

