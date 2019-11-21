import request from '@/utils/request';
import { fileUploadUrl } from '../utils/urls';
import { fileFetchAllUrl } from '@/utils/urls';

export async function fileUpload(params) {
  //console.log('params: ', params)

  return request(fileUploadUrl(), {
    method: 'POST',
    body: params,
  });
}

export async function fileFetchAll() {
  console.log('start fetch all');

  return request(fileFetchAllUrl(), {
    method: 'GET',
  });
}
