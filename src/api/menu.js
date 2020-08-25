import service from '@/utils/request'

/**
 * 获取动态路由
 */
export const asyncMenu = () => {
  return service({
    url: '/menu/getMenu',
    method: 'post'
  })
}
