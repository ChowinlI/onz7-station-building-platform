import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  }
]

const createRouter = () => {
  return new VueRouter({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes
  })
}

const router = createRouter()

export default router
