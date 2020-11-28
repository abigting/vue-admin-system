/**
 * @parameter
 * @description 通用接口
 * @author Feng.xiuting
 * @date 2020-10-20
 */

import request from '@/utils/request'

//专业列表
export function queryProfessionDataList(data) {
  return request({
    url: '/xnrh-zczl/api/selfchcek/queryProfessionDataList',
    method: 'post',
    data
  })
}

//文件上传
export function uploadNew(data) {
  return request({
    url: '/xnrh-zczl/api/common/uploadnew',
    method: 'post',
    data
  })
}
