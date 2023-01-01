import request from '@/utils/request'

export function getInfoList(params) {
  return request({
    url: '/vue-admin-template/table/infoList',
    method: 'get',
    params: params
  })
}

export function deleteInfo(params) {
  return request({
    url: '/vue-admin-template/table/delete',
    method: 'delete',
    params: params
  })
}

export function insertInfo(params) {
  return request({
    url: '/vue-admin-template/table/insert',
    method: 'post',
    params: params
  })
}

export function editInfo(params) {
  return request({
    url: '/vue-admin-template/table/edit',
    method: 'put',
    params: params
  })
}
