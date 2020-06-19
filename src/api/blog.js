import request from '@/utils/request'

export function createBlog(data) {
  return request({
    url: '/vue-element-admin/blog/create',
    method: 'post',
    data
  })
}

export function getBlogInfo() {
  return request({
    url: '/vue-element-admin/blog/fetchAll',
    method: 'post'
  })
}

export function getBlogInfoById(id) {
  return request({
    url: '/vue-element-admin/blog/fetchById',
    method: 'get',
    params: { id }
  })
}
