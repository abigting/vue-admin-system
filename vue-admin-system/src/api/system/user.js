import request from '@/utils/request'

// 查询用户列表
export function getList(data) {
  return request({
    url: '/xnrh-yhzx/api/user/queryUserInfoList',
    method: 'post',
    data
  })
}

// 删除用户
export function deleteItem(data) {
  return request({
    url: '/xnrh-yhzx/api/user/delete',
    method: 'post',
    data
  })
}

// // 重置用户
// export function reset(data) {
//   return request({
//     url: '/xnrh-yhzx/api/user/resetUser',
//     method: 'post',
//     data
//   })
// }

// 查看用户
export function getInfo(data) {
  return request({
    url: '/xnrh-yhzx/api/user/queryUserInfoByUserId',
    method: 'post',
    data
  })
}

// 编辑
export function editItem(data) {
  return request({
    url: '/xnrh-yhzx/api/user/edit',
    method: 'post',
    data
  })
}

// 用户启用/禁用接口
export function enable(data) {
  return request({
    url: '/xnrh-yhzx/api/user/enable',
    method: 'post',
    data
  })
}

// 用户审批接口
export function approval(data) {
  return request({
    url: '/xnrh-yhzx/api/user/approval',
    method: 'post',
    data
  })
}
