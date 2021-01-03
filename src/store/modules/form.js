import { getUser } from '@/utils/auth'
import {resetRouter} from '@/router'
import {submitReport} from '@/api/form'
import {Message} from 'element-ui'

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

//提交报告
const actions = {
  submitReport({commit}, form) {
    form.userId = JSON.parse(getUser()).id
    return new Promise((resolve, reject) => {
      submitReport(form).then(response => {
        const {data} = response
        resolve()
      }).catch(error => {
        // Message.error("提交失败,请重试")
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

