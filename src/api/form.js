import request from '@/utils/request'

//提交报告
export function submitReport(data) {
  return request({
    url: 'transformer/report/insertReport',
    method: 'post',
    data
  })
}

//更新报告
export function updateReport(data) {
  return request({
    url: 'transformer/report/updateReport',
    method: 'post',
    data
  })
}

//获取报告列表
export function getReporeList(data) {
  return request({
    url: 'transformer/report/queryReport',
    method: 'post',
    data
  })
}

//保存草稿
export function saveDraft(data,userId) {
  return request({
    url: 'transformer/report/saveReportToDraft?userId=' + userId,
    method: 'post',
    data
  })
}

//保存草稿
export function getDraft(userId) {
  return request({
    url: 'transformer/report/queryReportFromDraft',
    method: 'get',
    params: { userId }
  })
}

//保存草稿
export function generateData(data) {
  return request({
    url: 'transformer/readFile/generatedData',
    method: 'post',
    data
  })
}

//获取评估结果
export function getResult(data) {
  return request({
    url: 'transformer/readFile/generatedResult',
    method: 'post',
    data
  })
}


