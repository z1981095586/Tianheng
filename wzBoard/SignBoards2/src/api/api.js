import Axios from 'axios';
let url = window.apiRoot.wz_board;
let url66_8227 = window.apiRoot.url66_8227;

export function getUrl() {
  return url;
}
export function wzBoard_api(url, data,companyId)
{
  let headers= {
    'Content-Type': 'application/json',
    'companyId': companyId,
  };
  return Axios({
    url: url66_8227+url,
    method: 'post',
    data: data,
    headers: headers
  });
}
