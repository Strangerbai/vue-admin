import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function uploadImg(data) {
  return request({
    url: '/vue-element-admin/user/uploadImg',
    method: 'post',
    data
  })
}

export function registerUser(data) {
  return request({
    url: '/vue-element-admin/user/register',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
