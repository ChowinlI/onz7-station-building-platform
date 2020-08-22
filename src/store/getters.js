const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  menu: (state) => state.app.menu
}

export default getters
