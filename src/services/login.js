import request from '@/utils/request';
import { loginUrl } from '../utils/urls'
export async function AccountLogin(params) {
  //console.log(params)
  return request(loginUrl(), {
    method: 'POST',
    body: params,
  });
}
