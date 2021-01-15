import Vue from 'vue';
import {common_api } from "../static/api/api.js";
Vue.prototype.today = function getToday(){
  let day = new Date();
  let YYYY = day.getFullYear().toString();
  let MM = (day.getMonth() + 1).toString();
  if(MM.length === 1){
    MM = "0" + MM
  }
  let DD = day.getDate().toString();
  if(DD.length === 1){
    DD = "0" + DD
  }
  let hh = day.getHours().toString();
  if(hh.length === 1){
    hh = "0" + hh
  }
  let mm = day.getMinutes().toString();
  if(mm.length === 1){
    mm = "0" + mm
  }
  let ss = day.getSeconds().toString();
  if(ss.length === 1){
    ss = "0" + ss
  }
  let data = [];
  data[0] = YYYY + "-" + MM + "-" + DD;
  data[1] = YYYY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
  return data[0]
};
Vue.prototype.thisTime= function getThisTime(){
  let day = new Date();
  let YYYY = day.getFullYear().toString();
  let MM = (day.getMonth() + 1).toString();
  if(MM.length === 1){
    MM = "0" + MM
  }
  let DD = day.getDate().toString();
  if(DD.length === 1){
    DD = "0" + DD
  }
  let hh = day.getHours().toString();
  if(hh.length === 1){
    hh = "0" + hh
  }
  let mm = day.getMinutes().toString();
  if(mm.length === 1){
    mm = "0" + mm
  }
  let ss = day.getSeconds().toString();
  if(ss.length === 1){
    ss = "0" + ss
  }
  let data = [];
  data[0] = YYYY + "-" + MM + "-" + DD;
  data[1] = YYYY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
  return data[1]
};
Vue.prototype.standardDateTransferToYMD = function (date) {
  let day = new Date(date);
  let YYYY = day.getFullYear().toString();
  let MM = (day.getMonth() + 1).toString();
  if(MM.length === 1){
    MM = "0" + MM
  }
  let DD = day.getDate().toString();
  if(DD.length === 1){
    DD = "0" + DD
  }
  let hh = day.getHours().toString();
  if(hh.length === 1){
    hh = "0" + hh
  }
  let mm = day.getMinutes().toString();
  if(mm.length === 1){
    mm = "0" + mm
  }
  let ss = day.getSeconds().toString();
  if(ss.length === 1){
    ss = "0" + ss
  }
  return YYYY + "-" + MM + "-" + DD;
};
