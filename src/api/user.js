import service from '@/utils/request'

export const login = (data) => {
  return service({
    url: '/login',
    method: 'post',
    data
  })
}

export const getUserInfo = (params) => {
  return service({
    url: '/userInfo',
    method: 'get',
    params
  })
}

export const getUserAuth = (data) => {
  return service({
    url: '/auth',
    method: 'post',
    data
  })
}
