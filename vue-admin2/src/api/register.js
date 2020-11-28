/**
 * @parameter
 * @description 注册
 * @author Feng.xiuting
 * @date
 */
import request from '@/utils/request'

export function register(data) {
  return request({
    url: '/api/xnrh-yhzx/api/user/login',
    method: 'post',
    data
  })
}
