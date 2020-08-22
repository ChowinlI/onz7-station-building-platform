import axios from 'axios'
import qs from 'qs'
import { Message, Loading } from 'element-ui'
import store from '@/store'

let acitveAxios = 0
let loadingInstance
let timer

const showLoading = () => {
  acitveAxios++
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    if (acitveAxios > 0) {
      loadingInstance = Loading.service({ fullscreen: true })
    }
  }, 400)
}

const closeLoading = () => {
  acitveAxios--
  if (acitveAxios <= 0) {
    clearTimeout(timer)
    loadingInstance && loadingInstance.close()
  }
}

const service = axios.create({
  baseURL: '/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [
    function(data, header) {
      if (header['Content-Type'] === 'application/x-www-form-urlencoded') {
        return qs.stringify(data, { indices: false })
      } else if (header['Content-Type'] === 'multipart/form-data') {
        return data
      } else {
        return JSON.stringify(data)
      }
    }
  ],
  paramsSerializer: function(params) {
    return qs.stringify(params, { indices: false })
  }
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    showLoading()
    const token = store.getters.token
    const user = store.getters.userInfo
    config.headers = {
      'Content-Type': 'application/json',
      'x-token': token,
      'x-user-id': user.userId
    }
    // if (config.method === 'get' || config.method === 'delete') {
    //   Object.assign(config.params, { token })
    // } else {
    //   Object.assign(config.data, { token })
    // }
    return config
  },
  (error) => {
    closeLoading()
    Message({
      showClose: true,
      message: error.message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

// 返回拦截器
service.interceptors.response.use(
  (response) => {
    closeLoading()
    if (response.data.code === 0) {
      return response.data
    } else {
      Message({
        showClose: true,
        message: response.data.message,
        type: 'error'
      })
      return Promise.reject(response.data.message)
    }
  },
  (error) => {
    closeLoading()
    Message({
      showClose: true,
      message: error,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default service
