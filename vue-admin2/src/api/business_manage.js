import request from '@/utils/request'

//企业自查设置 - 专业列表
export function queryProfessionDataList(data) {
  return request({
    url: '/xnrh-zczl/api/selfchcek/queryProfessionDataList',
    method: 'post',
    data
  })
}

//企业自查设置 -表格
export function queryProfessionDataSettingList(data) {
  return request({
    url: '/xnrh-zczl/api/selfchcek/queryProfessionDataSettingList',
    method: 'post',
    data
  })
}

//企业自查设置 - 当前专业下保存的自查数据
export function queryProfessionConfig(data) {
  return request({
    url: '/xnrh-zczl/api/selfchcek/queryProfessionConfig',
    method: 'post',
    data
  })
}

//企业自查设置 - 保存/编辑自查数据
export function saveOrEditProfessionConfig(data) {
  return request({
    url: '/xnrh-zczl/api/selfchcek/saveOrEditProfessionConfig',
    method: 'post',
    data
  })
}

//企业自查设置 - 删除自查数据
export function deleteProfessionConfig(data) {
  return request({
    url: '/xnrh-zczl/api/selfchcek/deleteProfessionConfig',
    method: 'post',
    data
  })
}
