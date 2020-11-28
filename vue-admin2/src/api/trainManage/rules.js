/**
 * @parameter
 * @description 培训考试管理|考试规则管理
 * @author Feng.xiuting
 * @date 2020-10-20
 */
import request from '@/utils/request'

//获取列表
export function getList(data) {
  return request({
    url: '/xnrh-zczl/api/subject/findTestRuleList',
    method: 'post',
    data
  })
}

//增加
export function addItem(data) {
  return request({
    url: '/xnrh-zczl/api/subject/createTestRule',
    method: 'post',
    data
  })
}

//删除
export function deleteItem(data) {
  return request({
    url: '/xnrh-zczl/api/subject/deleteTestRule',
    method: 'post',
    data
  })
}

//编辑
export function editItem(data) {
  return request({
    url: '/xnrh-zczl/api/subject/updateTestRule',
    method: 'post',
    data
  })
}

//获取详情
export function getInfo(data) {
  return request({
    url: '/xnrh-zczl/api/subject/findTestRuleByID',
    method: 'post',
    data
  })
}

//查询专业对应题目数量
export function findSubjectCount(data) {
  return request({
    url: '/xnrh-zczl/api/subject/findSubjectCount',
    method: 'post',
    data
  })
}
