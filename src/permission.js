import router from './router'
import store from './store'

const whiteList = ['login'] // 路由白名单
let dynamicRouterFlag = false // 是否加载动态路由

router.beforeEach(async (to, from, next) => {
  const token = store.getters['user/token']
  // 白名单判断
  if (whiteList.includes(to.name)) {
    // 在白名单且已登录
    if (token) {
      next('/layout')
    } else {
      next()
    }
  } else {
    // 不在白名单但已登录
    if (token) {
      if (!dynamicRouterFlag) {
        // 加载动态路由
        dynamicRouterFlag = true
        await store.dispatch('router/setAsyncRouter')
        const asyncRouters = store.getters['router/asyncRouters']
        router.addRoutes(asyncRouters)
        next({ ...to, replace: true })
      } else {
        next()
      }
    } else {
      console.log(to.path, document.location.hash)
      next({
        name: 'login',
        query: {
          redirect: document.location.hash // 当前路径
        }
      })
    }
  }
})
