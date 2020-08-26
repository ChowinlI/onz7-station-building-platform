import { login, getUserInfo } from '@/api/user'
import router from '@/router/index'

const state = {
  token: '',
  userInfo: {
    userId: '',
    username: '',
    nickname: ''
  }
}

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  setToken(state, token) {
    state.token = token
  },
  logout(state) {
    state.userInfo = {}
    state.token = ''
    router.push({ name: 'login', replace: true })
    sessionStorage.clear()
    window.location.reload()
  },
  resetUserInfo(state, userInfo = {}) {
    state.userInfo = { ...state.userInfo, ...userInfo }
  }
}

const actions = {
  async login({ commit }, data) {
    const loginRes = await login(data)
    commit('setToken', loginRes.data.token)
    const userInfo = await getUserInfo()
    commit('setUserInfo', userInfo.data)
    if (loginRes.code == 0) {
      const redirect = router.history.current.query.redirect
      if (redirect) {
        router.push({ path: redirect }).catch(() => {})
      } else {
        router.push({ path: '/layout' }).catch(() => {})
      }
    }
  },
  async logout({ commit }) {
    // const res = await jsonInBlacklist()
    // if (res.code == 0) {
    //   commit('logout')
    // }
  }
}

const getters = {
  userInfo(state) {
    return state.userInfo
  },
  token(state) {
    return state.token
  }
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}
