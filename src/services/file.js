import request from '@/utils/request';
import { fileUploadUrl } from '../utils/urls'
export async function fileUpload(params) {
  //console.log('params: ', params)
  
  return request(fileUploadUrl(), {
    method: 'POST',
    body: params,
  });
}
