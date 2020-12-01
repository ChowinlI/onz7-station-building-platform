import { login, getUserInfo, logout } from '@/api/user'
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
    const { username, password, remember} = data
    const loginRes = await login({username, password})
    commit('setToken', loginRes.data.token)
    if(remember){
      console.log(remember)
      localStorage.setItem('onz7_remember', 1)
      localStorage.setItem('onz7_username', data.username)
      localStorage.setItem('onz7_password', data.password)
    }else{
      localStorage.removeItem('onz7_remember')
      localStorage.removeItem('onz7_username')
      localStorage.removeItem('onz7_password')
    }
    const userInfo = await getUserInfo()
    commit('setUserInfo', userInfo.data)
    if (loginRes.code == 0) {
      const redirect = router.history.current.query.redirect
      if (redirect) {
        router.push({ path: redirect }).catch(() => {})
      } else {
        router.push({ path: '/layout/dashboard' }).catch(() => {})
      }
    }
  },
  async logout({ commit }) {
    const res = await logout()
    if (res.code == 0) {
      commit('logout')
      router.push({ path: '/login'})
    }
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
