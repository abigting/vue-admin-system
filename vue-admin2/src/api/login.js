import request from '@/utils/request'

// //get
// export function getList(params) {
//   return request({
//     url: '/table/list',
//     method: 'get',
//     params
//   })
// }

//登录
export function login(data) {
  return request({
    url: '/xnrh-yhzx/api/user/login',
    method: 'post',
    data
  })
}

// 注销
export function logout(data) {
  return request({
    url: '/nbjk-hcvyhzx/api/user/logout',
    method: 'post',
    data
  })
}

// 获取验证码
export function createImageCode(data) {
  return request({
    url: '/xnrh-yhzx/api/common/createImageCode',
    method: 'post',
    data
  })
}
