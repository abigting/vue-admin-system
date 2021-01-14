import request from '@/utils/request'

// 查询用户列表
export function getList(data) {
  return request({
    url: '/xnrh-yhzx/api/role/showList',
    method: 'post',
    data
  })
}

// 新增用户
export function addItem(data) {
  return request({
    url: '/xnrh-yhzx/api/role/create',
    method: 'post',
    data
  })
}

// 删除用户
export function deleteItem(data) {
  return request({
    url: '/xnrh-yhzx/api/role/delete',
    method: 'post',
    data
  })
}

// 查看用户
export function getInfo(data) {
  return request({
    url: '/xnrh-yhzx/api/role/detail',
    method: 'post',
    data
  })
}
// 编辑
export function editItem(data) {
  return request({
    url: '/xnrh-yhzx/api/role/update',
    method: 'post',
    data
  })
}

// 编辑
export function getPermissionList(data) {
  return request({
    url: '/xnrh-yhzx/api/role/permissionList',
    method: 'post',
    data
  })
}
