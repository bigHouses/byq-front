import request from '@/utils/request'

export function getSelectParam(data) {
  return request({
    url: 'transformer/report/queryReportSelect',
    method: 'post',
    data
  })
}

export function getPdf(query) {
  return request({
    url: 'transformer/report/viewPdf',
    method: 'get',
    responseType: 'blob',
    params: query
  })
}

export function delReport(query) {
  return request({
    url: 'transformer/report/deleteReport',
    method: 'get',
    params: query
  })
}
