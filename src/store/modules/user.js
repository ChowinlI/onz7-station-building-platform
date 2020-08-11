import {login} from '@/api/user'

const state = {
    token: "",
    userInfo: {
        user_id: "",
        nickname: ""
    }
}

const mutations = {
    setUserInfo(state, userInfo){
        state.userInfo = userInfo
    },
    setToken(state, token){
        state.token = token
    }
}