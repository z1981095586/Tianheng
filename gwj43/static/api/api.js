import Axios from 'axios';
let api53 = window.apiRoot.api53;
let api66 = window.apiRoot.api66;
let api57 = window.apiRoot.api57;
export function warp_api(url, data,companyId)
{
  let totalUrl= api66 + ':8763';
  totalUrl+=url;
  let headers= {
    'Content-Type': 'application/json',
    'companyId': companyId
  };
  // console.log(data1);
  return Axios({
    url: totalUrl,
    method: 'post',
    data: data,
    headers: headers
  });
}
export function shift_api(url, data)
{
  let totalUrl='https://localhost:44339';
  totalUrl+=url;
  let headers= {
    'Content-Type': 'application/json',
  };
  // console.log(data1);
  return Axios({
    url: totalUrl,
    method: 'post',
    data: data,
    headers: headers
  });
}
export function warp_api_get(url,data,companyId )
{
  let totalUrl=api66 + ':8763';
  totalUrl+=url;
  let headers= {
    'Content-Type': 'application/json',
    'companyId': companyId
  };
  // console.log(data1);
  return Axios({
    url: totalUrl,
    method: 'get',
    params: data,
    headers: headers
  });
}
export function produce_api(url, data,companyId)
{
  let totalUrl=api53 + ':8206';
  totalUrl+=url;
  let headers= {
    'Content-Type': 'application/json',
    'companyID': companyId,
  };
  return Axios({
    url: totalUrl,
    method: 'post',
    data: data,
    headers: headers
  });
}
export function workShop_api(url, data,companyId)
{
  let totalUrl=api53 + ':8211';
  totalUrl+=url;
  let headers= {
    'Content-Type': 'application/json',
    'companyID': companyId,
  };
  return Axios({
    url: totalUrl,
    method: 'post',
    data: data,
    headers: headers
  });
}
export function realOutput_api(url, data,companyId)
{
  let totalUrl=api53 + ':8226';
  totalUrl+=url;
  let headers= {
    'Content-Type': 'application/json',
    'companyId': companyId,
  };
  return Axios({
    url: totalUrl,
    method: 'get',
    params: data,
    headers: headers
  });
}
export function common_api(url, data,companyId)
{
  // let totalUrl=api66 + ':10086';//测试
  let totalUrl=api66 + ':8227';//正式
  totalUrl+=url;
  let headers= {
    'Content-Type': 'application/json',
    'companyId': companyId,
  };
  return Axios({
    url: totalUrl,
    method: 'post',
    data: data,
    headers: headers
  });
}
export function platform_api(url, data,companyId)
{
  let totalUrl= api53 + ':7070';
  //let totalUrl = "http://192.168.43.162:7070";
  totalUrl+=url;
  let headers= {
    'Content-Type': 'application/json',
    'companyId': companyId,
  };
  return Axios({
    url: totalUrl,
    method: 'post',
    data: data,
    headers: headers
  });
}
export function weaving_api(url, data,companyId)
{
  // let totalUrl= api66 + ':8213';
  let totalUrl= api66 + ':8763';
  totalUrl+=url;
  let headers= {
    'Content-Type': 'application/json',
    'companyId': companyId,
  };
  return Axios({
    url: totalUrl,
    method: 'get',
    params: data,
    headers: headers
  });
}
export function weaving_print_api(url, data,companyId)
{
  // let totalUrl= api66 + ':8213';
  let totalUrl= api66 + ':8763';
  totalUrl+=url;
  let headers= {
    'Content-Type': 'application/json',
    'companyId': companyId,
  };
  return Axios({
    url: totalUrl,
    method: 'post',
    data: data,
    headers: headers
  });
}
export function platformGet_api(url, data,companyId) {
  let totalUrl = api53 + ':7070';
  //let totalUrl = "http://192.168.43.162:7070";
  totalUrl += url;
  let headers = {
    'Content-Type': 'application/json',
    'companyId': companyId,
  };
  return Axios({
    url: totalUrl,
    method: 'get',
    params: data,
    headers: headers
  });
}
export function repair_api(url, data) {
  let totalUrl = api57 + ':8091';
  totalUrl += url;
  let headers = {
    'Content-Type': 'application/json',
  };
  return Axios({
    url: totalUrl,
    method: 'post',
    params: data,
    headers: headers
  });
}
export function repair_api_15(url, data) {
  let totalUrl = 'http://112.12.1.41:8091';
  totalUrl += url;
  let headers = {
    'Content-Type': 'application/json',
  };
  return Axios({
    url: totalUrl,
    method: 'post',
    params: data,
    headers: headers
  });
}
