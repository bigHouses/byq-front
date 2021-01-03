import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'transformer/user/login',
    method: 'post',
    data
  })
}

export function queryAllUser(data) {
  return request({
    url: 'transformer/user/queryAllUser',
    method: 'post',
    data
  })
}


export function addUser(data) {
  return request({
    url: 'transformer/user/addUser',
    method: 'post',
    data
  })
}

export function delUser(query) {
  return request({
    url: 'transformer/user/deleteUser',
    method: 'get',
    params: query
  })
}

export function updateUser(data) {
  return request({
    url: 'transformer/user/updateUser',
    method: 'post',
    data
  })
}
