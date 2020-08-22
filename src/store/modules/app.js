import Cookies from 'js-cookie'

const state = {
  menu: {
    opened: Cookies.get('menuStatus') ? !!+Cookies.get('menuStatus') : true,
    withoutAnimation: false
  }
}

const mutations = {
  TOGGLE_MENU: (state) => {
    state.menu.opened = !state.menu.opened
    state.menu.withoutAnimation = false
    if (state.menu.opened) {
      Cookies.set('menuStatus', 1)
    } else {
      Cookies.set('menuStatus', 0)
    }
  },
  CLOSE_MENU: (state, withoutAnimation) => {
    Cookies.set('menuStatus', 0)
    state.menu.opened = false
    state.menu.withoutAnimation = withoutAnimation
  }
}

const actions = {
  toggleMenu({ commit }) {
    commit('TOGGLE_MENU')
  },
  closeMenu({ commit }, { withoutAnimation }) {
    commit('CLOSE_MENU', withoutAnimation)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
