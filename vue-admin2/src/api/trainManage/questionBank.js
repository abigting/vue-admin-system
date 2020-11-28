/**
 * @parameter
 * @description 培训考试管理|题库管理
 * @author Feng.xiuting
 * @date 2020-10-20
 */
import request from '@/utils/request'

//获取列表
export function getList(data) {
  return request({
    url: '/xnrh-zczl/api/subject/findList',
    method: 'post',
    data
  })
}

//增加
export function addItem(data) {
  return request({
    url: '/xnrh-zczl/api/subject/createSubject',
    method: 'post',
    data
  })
}

//删除
export function deleteItem(data) {
  return request({
    url: '/xnrh-zczl/api/subject/deleteSubject',
    method: 'post',
    data
  })
}

//编辑
export function editItem(data) {
  return request({
    url: '/xnrh-zczl/api/subject/updateSubject',
    method: 'post',
    data
  })
}

//获取详情
export function getInfo(data) {
  return request({
    url: '/xnrh-zczl/api/subject/findSubjectByID',
    method: 'post',
    data
  })
}
