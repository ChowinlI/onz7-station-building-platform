import service from '@/utils/request'

export const login = (data) => {
    return service({
        url: '/api/login',
        method: 'post',
        data
    })
}