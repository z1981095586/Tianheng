<template>
  <div class="content">
    <header style="height: 3rem">
      <div class="title">万舟控股信息化监控平台</div>

    </header>
    <div class="board">
      <div class="board_con">
        <div class="board_con_title"><span>粗纱机信息化监控数据</span></div>
        <div class="board_con_content">
          <div class="board_con_content_left" id="echart1">

          </div>
          <div class="board_con_content_right">
            <div class="radius">
              <div class="radius_con">
                <span style="font-size:14px">今日产量</span>
                <span style="font-size:26px;color:#00FFCB">{{csjSum}}</span>
              </div>
            </div>
            <div class="fangkuai">
              <div class="fangkuai_con"><span style="color:#FFFDC2">昨</span></div>
              <div class="fangkuai_con2"> <span>昨日产量</span>
                <span>{{csjSum2}}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="board_con">
        <div class="board_con_title"><span>细纱机信息化监控数据</span></div>
        <div class="board_con_content">
          <div class="board_con_content_left" id="echart2">

          </div>
          <div class="board_con_content_right">
            <div class="radius">
              <div class="radius_con">
                <span style="font-size:14px">今日产量</span>
                <span style="font-size:26px;color:#00FFCB">{{xsjcurrentsum}}</span>
              </div>
            </div>
            <div class="fangkuai">
              <div class="fangkuai_con"><span style="color:#FFFDC2">昨</span></div>
              <div class="fangkuai_con2"> <span>昨日产量</span>
                <span>{{xsjshift_yieldSum}}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="board_con">
        <div class="board_con_title"><span>络筒机信息化监控数据</span></div>
        <div class="board_con_content">
          <div class="board_con_content_left" id="echart3">

          </div>
          <div class="board_con_content_right">
            <div class="radius">
              <div class="radius_con">
                <span style="font-size:14px">今日产量/kg</span>
                <span style="font-size:26px;color:#00FFCB">{{zlrcurrentsum}}</span>
              </div>
            </div>
            <div class="fangkuai">
              <div class="fangkuai_con"><span style="color:#FFFDC2">昨</span></div>
              <div class="fangkuai_con2"> <span>昨日产量/kg</span>
                <span>{{zljshift_yieldSum}}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="board_con">
        <div class="board_con_title"><span>打包机信息化监控数据</span></div>
        <div class="board_con_content">
          <div class="board_con_content_left" id="echart4">

          </div>
          <div class="board_con_content_right">
            <div class="radius">
              <div class="radius_con">
                <span style="font-size:14px">当前打包数</span>
                <span style="font-size:26px;color:#00FFCB">{{current_class_package_num}}</span>
              </div>
            </div>
            <div class="fangkuai">
              <div class="fangkuai_con"><span style="color:#FFFDC2">总</span></div>
              <div class="fangkuai_con2"> <span>累计打包数</span>
                <span>{{cumulative_number_of_packages}}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  // 0: {name: "万舟织造一部", id: 2}
  // 1: {name: "万舟织造二部", id: 3}
  // 2: {name: "兰棉", id: 4}
  // 3: {name: "佳而美", id: 5}
  import axios from 'axios';
  let host1 = "http://106.12.219.66:8227";
  import {
    getUrl,
    wzBoard_api
  } from "../api/api"; //引入时间格式化js
  export default {
    name: "allboard",
    data() {
      return {
        lang: 'zh',
        workshopId: '3',
        companyId: this.$route.params.id, //公司库表Id
        electricList: [],
        xList: [],
        electricList2: [],
        xList2: [],
        current_class_package_num: null,
        cumulative_number_of_packages: null,
        legendList: [],
        seriesList: [],
        xList4: [],
        option: {},
        zljshift_yieldSum: null,
        zlrcurrentsum: null,
        xsjshift_yieldSum: null,
        xsjcurrentsum: null,
        list2: [],
        csjSum: 0,
        csjSum2: 0
      }
    },
    methods: {
      getcushuji2() { //获取粗砂机昨日产量
        let time = (new Date).getTime() - 24 * 60 * 60 * 1000;
        let yesday = new Date(time); // 获取的是前一天日期
        yesday = yesday.getFullYear() + "-" + (yesday.getMonth() > 9 ? (yesday.getMonth() + 1) : "0" + (yesday
        .getMonth() + 1)) + "-" + (yesday.getDate() > 9 ? (yesday.getDate()) : "0" + (yesday
      .getDate())); //字符串拼接转格式：例如2018-08-19
        let time2 = (new Date).getTime();
        let nowday = new Date(time2);
        nowday = nowday.getFullYear() + "-" + (nowday.getMonth() > 9 ? (nowday.getMonth() + 1) : "0" + (nowday
        .getMonth() + 1)) + "-" + (nowday.getDate() > 9 ? (nowday.getDate()) : "0" + (nowday
      .getDate())); //字符串拼接转格式：例如2018-08-19
        ////console.log(nowday)
        ////console.log(yesday) 
        let that = this
        //       axios({
        //       url: host1 + '/report/getSimpleReport',
        //       method: 'post',
        //       headers: {
        //         'Content-Type': 'application/json',
        //         'companyId': 0
        //       },
        //       data: {

        //         tableName: "cushajiDailyOutput",


        //       }

        //     })
        //     .then(res => {
        //       let sum=0;
        //       let sum2=0;
        //  for(let i=0;i<res.data.data.length;i++){
        //         if((res.data.data[i].current_time.indexOf(yesday)!=-1)&&(res.data.data[i].current_time.indexOf("06:45")!=-1)){
        //           sum2=sum2+parseFloat(res.data.data[i].current_all_yield)
        //         }
        //                 if((res.data.data[i].current_time.indexOf(nowday)!=-1)&&(res.data.data[i].current_time.indexOf("06:45")!=-1)){
        //           sum=sum+parseFloat(res.data.data[i].current_all_yield)
        //         }

        //       }

        // that.csjSum2=sum-sum2
        //     })
        axios({
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': 0
            },
            data: {

              tableName: "cushajiAllTotal",


            }

          })
          .then(response => {




            // that.csjSum=response.data.data[0].month_all_total+that.csjSum3
            that.csjSum2 = response.data.data[0].yesterday_total
            //console.log(that.csjSum)
          })
      },
      getcushuji() { //获取粗砂机今日产量
        let that = this
        let sum = 0
        axios({ //获取当前的产量
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': 0
            },
            data: {

              tableName: "cushaji",


            }

          })
          .then(response => {
            for (let i = 0; i < response.data.data.length; i++) {
              sum = sum + response.data.data[i].class_all_yield
            }
          }).then(() => {
            ////console.log(sum)
            let today = new Date();




            let time = (new Date).getTime() - 24 * 60 * 60 * 1000;
            let yesday = new Date(time); // 获取的是前一天日期
            yesday = yesday.getFullYear() + "-" + (yesday.getMonth() > 9 ? (yesday.getMonth() + 1) : "0" + (yesday
              .getMonth() + 1)) + "-" + (yesday.getDate() > 9 ? (yesday.getDate()) : "0" + (yesday
          .getDate())); //字符串拼接转格式：例如2018-08-19
            let time2 = (new Date).getTime();
            let nowday = new Date(time2);
            nowday = nowday.getFullYear() + "-" + (nowday.getMonth() > 9 ? (nowday.getMonth() + 1) : "0" + (nowday
              .getMonth() + 1)) + "-" + (nowday.getDate() > 9 ? (nowday.getDate()) : "0" + (nowday
          .getDate())); //字符串拼接转格式：例如2018-08-19
            ////console.log(nowday)
            ////console.log(yesday) 
            let now = today.getHours() + ":" + today.getMinutes();

            if ((today.getHours() < 6) && (today.getMinutes() < 45)) { //6点45前的情况
              axios({
                  url: host1 + '/report/getSimpleReport',
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json',
                    'companyId': 0
                  },
                  data: {

                    tableName: "cushajiDailyOutput",


                  }

                })
                .then(res => {
                  let sum2 = 0
                  for (let i = 0; i < res.data.data.length; i++) {
                    if ((res.data.data[i].current_time.indexOf(yesday) != -1) && (res.data.data[i].current_time
                        .indexOf("06:45") != -1)) {
                      sum2 = sum2 + parseFloat(res.data.data[i].current_all_yield)
                    }
                  }
                  that.csjSum = sum - sum2

                })
            } else {
              axios({
                  url: host1 + '/report/getSimpleReport',
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json',
                    'companyId': 0
                  },
                  data: {

                    tableName: "cushajiDailyOutput",


                  }

                })
                .then(res => {
                  let sum2 = 0
                  for (let i = 0; i < res.data.data.length; i++) {
                    if ((res.data.data[i].current_time.indexOf(nowday) != -1) && (res.data.data[i].current_time
                        .indexOf("06:45") != -1)) {
                      sum2 = sum2 + parseFloat(res.data.data[i].current_all_yield)
                    }
                  }
                  that.csjSum = sum - sum2

                })
            }








          })
      },
      getziluoji() { //获取自络机统计图数据
        let that = this
        let list = []

        axios({
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': 0
            },
            data: {

              tableName: "ziluojiDailyTotal",
              sortColumn: "shift_date",
              sort: "DESC"

            }

          })
          .then(response => {
            //console.log(response)
            // list = response.data.data

            for (let i = 0; i < response.data.data.length; i++) {
              response.data.data[i].shift_yield = parseFloat(response.data.data[i].shift_yield.replace(/,/g, ''))
              response.data.data[i].shift_aef = parseFloat(response.data.data[i].shift_aef)
            }
            for (let i = response.data.data.length - 1; i >= 0; i--) {
              list.push(response.data.data[i])
            }
            //console.log(list)




          }).then(() => {
            let zbxl = []
            let zbcl = []
            let wbxl = []
            let wbcl = []
            let xList = []
            //console.log(list)
            for (let i = 0; i < list.length; i++) {
              let isdate = new Date(list[i].shift_date.replace(/-/g, "/"));
              isdate = new Date((isdate / 1000 + 86400) * 1000);
              let pdate = isdate.getFullYear() + "-" + (isdate.getMonth() + 1) + "-" + (isdate.getDate());
              if (xList.indexOf(pdate) == -1) {

                xList.push(pdate)


              }
            }
            for (let i = 0; i < list.length; i++) {
              if (list[i].shift_work == 1) {

                zbxl.push(list[i].shift_aef)
                zbcl.push(list[i].shift_yield)

                //                 if(typeof (list[i + 1].shift_aef)!="undefined"){
                //  wbxl.push(list[i + 1].shift_aef)
                //                 }else{
                //                   wbxl.push(0)  
                //                 }


              } else if (list[i].shift_work == 2) {
                wbxl.push(list[i].shift_aef)
                wbcl.push(list[i].shift_yield)
              }
            }

            //console.log(zbxl)
            //console.log(zbcl)
            //console.log(wbxl)
            //console.log(wbcl)
            //console.log(xList)

            let xlMin = (Math.min(...(zbxl.concat(wbxl))) - 20).toFixed(1)
            let xlMax = (Math.max(...(zbxl.concat(wbxl))) + 20).toFixed(1)
            let clMin = (Math.min(...(zbcl.concat(wbcl))) - 20).toFixed(1)
            let clMax = (Math.max(...(zbcl.concat(wbcl))) + 20).toFixed(1)

            that.echart3(zbxl, zbcl, wbxl, wbcl, xList, xlMin, xlMax, clMin, clMax)
            // //////////console.log(xlMin)
            // //////////console.log(xlMax)
            // //////////console.log(clMin)
            // //////////console.log(clMax)


            //          list = list.reduce((obj, item) => {  
            //   let find = obj.find(i => i.shift_date === item.shift_date)  
            //  let _d = {  
            //     ...item,  
            //     frequency: 1  
            //   }  
            //   find ? (find.shift_yield+=item.shift_yield,find.shift_aef+=item.shift_aef,find.frequency++ ): obj.push(_d)  
            //   return obj  
            // }, [])




          })
      },
      getjinri() {
        let that = this


        axios({ //获取自络机今日产量
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': 0
            },
            data: {

              tableName: "ziluoji",
              query: {
                machineId: "AVG"
              }

            }

          })
          .then(response => {
            //////////console.log(response)
            response.data.data[0].prkg = response.data.data[0].prkg.replace(/,/g, '');
            that.zlrcurrentsum = parseInt(response.data.data[0].prkg)


          })
        axios({ //获取细纱机今日产量
            url: 'http://120.55.124.53:8000/wanzhou/xishaji/currentOutput',
            method: 'get',
            headers: {
              'Content-Type': 'application/json',

            },
            data: {




            }

          })
          .then(response => {

            that.xsjcurrentsum = response.data.xishaCurrentTotal
          })
      },
      getzuori() {
        let that = this
        let day1 = new Date();
        day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
        let month = ""
        let dates = ""
        if ((day1.getMonth() + 1) < 10) {
          month = "0" + String(day1.getMonth() + 1)
        } else {
          month = String(day1.getMonth() + 1)
        }
        if ((day1.getDate()) < 10) {

          dates = "0" + String(day1.getDate())
        } else {
          dates = String(day1.getDate())
        }
        //////////console.log(dates)
        let s1 = day1.getFullYear() + "-" + month + "-" + dates;
        axios({ //获取自络机昨日产量
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': 0
            },
            data: {

              tableName: "ziluojiDailyTotal",
              query: {
                shift_date: s1
              }

            }

          })
          .then(response => {
            //////////console.log(response)
            let sum = 0
            for (let i = 0; i < response.data.data.length; i++) {
              response.data.data[i].shift_yield = parseInt(response.data.data[i].shift_yield.replace(/,/g, ''))
              sum = sum + response.data.data[i].shift_yield
            }
            //////////console.log(sum)
            that.zljshift_yieldSum = sum

          })
        axios({ //获取细纱机昨日产量
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': 0
            },
            data: {

              tableName: "xishajiAllTotal",
              // query: {
              //   shift_date: s1
              // }

            }

          })
          .then(response => {
            that.xsjshift_yieldSum = response.data.data[0].yesterday_total //获取昨日产量


          })
      },
      getdata() {
        let list2 = []
        this.electricList2 = []
        this.xList2 = []
        let num = 0 //粗砂机几台
        let list = []

        let that = this
        let dateList = that.getDateArr(5)

        axios({
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': 0
            },
            data: {

              tableName: "cushaji",



            }

          })
          .then(response => {
            num = response.data.data.length

          })
        axios({
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {

              tableName: "looplist_info",
              selectLikeFields: {
                name: "粗纱机"
              },
              selectFields: ['name', 'id']
              // sort: "DESC",
              // //  selectFields:response.data.data[i].machine_ip
              // query: {
              //   "mac_ip": response.data.data[i].machine_ip
              // }

            }

          })
          .then(async response => {

            let list2 = []


            for (let i = 0; i < response.data.data.length; i++) { //电量
              await axios({
                  url: host1 + '/report/getSimpleReport',
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json',
                    'companyId': that.companyId
                  },
                  data: {

                    tableName: "electric_history_d",
                    query: {
                      "looplistId": response.data.data[i].id
                    },
                    selectFields: ['looplistId', 'startTime', 'electric']
                    // sort: "DESC",
                    // //  selectFields:response.data.data[i].machine_ip
                    // query: {
                    //   "mac_ip": response.data.data[i].machine_ip
                    // }

                  }

                })
                .then(res => {
               

                  for (let j = 0; j < res.data.data.length; j++) {

                    if (dateList.indexOf(res.data.data[j].startTime.substr(5, 5)) != -1) {
                      if (res.data.data[j].electric == "None") {
                        res.data.data[j].electric = 0
                      } else {
                        res.data.data[j].electric = parseFloat(res.data.data[j].electric)
                      }
                      res.data.data[j].startTime = res.data.data[j].startTime.substr(5, 5)
                      list2.push(res.data.data[j])
                    }
                  }
//                   console.log(list2.length)
//                   console.log(dateList.length)
//                   // if(list.length==(response.data.data.length*)
// console.log(response.data.data.length*dateList.length)
       if(list2.length==(response.data.data.length*dateList.length)){
                           let xList = []
              let yList = []
              let yList2 = []
              list2 = list2.reduce((obj, item) => {
                let find = obj.find(i => i.startTime === item.startTime)
                let _d = {
                  ...item,
                  frequency: 2
                }


                find ? (find.electric += item.electric, find.frequency++) : obj.push(_d)
                return obj
              }, [])

              axios({
                  url: host1 + '/report/getSimpleReport',
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json',
                    'companyId': 0
                  },
                  data: {

                    tableName: "cushajiDailyOutput",

                    //  selectLikeFields:{
                    //    current_time:"06:45"
                    //  }


                  }

                })
                .then(response => {
                  //////console.log(response)
                  let arr = []
                  for (let i = 0; i < response.data.data.length; i++) {
                    if (response.data.data[i].current_time.indexOf("06:45") != -1) {
                      response.data.data[i].current_time = response.data.data[i].current_time.substr(5, 5)
                      response.data.data[i].current_all_yield = parseInt(response.data.data[i]
                        .current_all_yield)
                      arr.push(response.data.data[i])
                    }
                  }
                  ////////console.log(arr)
                  list = arr.reduce((obj, item) => {
                    let find = obj.find(i => i.current_time === item.current_time)
                    let _d = {
                      ...item,
                      frequency: 2
                    }


                    find ? (find.current_all_yield += item.current_all_yield, find.frequency++) : obj
                      .push(_d)
                    return obj
                  }, [])
                  //////console.log(list2)

                  for (let i = 0; i < list.length; i++) {
                    if (list[i + 1]) {
                      list[i].current_all_yield = list[i + 1].current_all_yield - list[i].current_all_yield
                    } else {
                      list[i].current_all_yield = 0
                    }
                  }
                  //console.log(list2)
                  //console.log(num)
                  for (let i = 0; i < list2.length; i++) {
                    list2[i].electric = (list2[i].electric / (list2[i].frequency - 1)) * num
                  }
                  //////console.log(list)
                  let dateList2 = []
                  for (let i = dateList.length - 1; i >= 0; i--) {
                    dateList2.push(dateList[i])
                  }

                  for (let i = 0; i < dateList2.length; i++) {
                    for (let j = 0; j < list2.length; j++) {
                      if (dateList2[i] == list2[j].startTime) {
                        yList2[i] = list2[j].electric
                      }
                    }
                  }
                  for (let i = 0; i < dateList2.length; i++) {
                    for (let j = 0; j < list.length; j++) {
                      if (dateList2[i] == list[j].current_time) {
                        yList[i] = list[j].current_all_yield
                      }
                    }
                  }
                  //////console.log(yList)
                  //////console.log(yList2)
                  that.echart(dateList2, yList, yList2)
                }) 
                   }

                })

            }



          })



      },
      // 对象排序
      sortByKey(array, key) {
        return array.sort(function (a, b) {
          let x = a[key];
          let y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      },
      getdata2() { //细纱机
        let list2 = []
        this.electricList2 = []
        this.xList2 = []
        let num = 0 //细砂机几台
        let list = []

        let that = this
        let dateList = that.getDateArr(5)

        axios({
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': 0
            },
            data: {

              tableName: "xishaji",



            }

          })
          .then(response => {
            num = response.data.data.length
          })
        axios({
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {

              tableName: "looplist_info",
              selectLikeFields: {
                name: "细纱机"
              },
              selectFields: ['name', 'id']
              // sort: "DESC",
              // //  selectFields:response.data.data[i].machine_ip
              // query: {
              //   "mac_ip": response.data.data[i].machine_ip
              // }

            }

          })
          .then(async response => {
            //////////console.log(response)
            let list2 = []


            for (let i = 0; i < response.data.data.length; i++) { //电量
              await axios({
                  url: host1 + '/report/getSimpleReport',
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json',
                    'companyId': that.companyId
                  },
                  data: {

                    tableName: "electric_history_d",
                    query: {
                      "looplistId": response.data.data[i].id
                    },
                    selectFields: ['looplistId', 'startTime', 'electric']
                    // sort: "DESC",
                    // //  selectFields:response.data.data[i].machine_ip
                    // query: {
                    //   "mac_ip": response.data.data[i].machine_ip
                    // }

                  }

                })
                .then(res => {
                  ////////console.log(res)

                  for (let j = 0; j < res.data.data.length; j++) {

                    if (dateList.indexOf(res.data.data[j].startTime.substr(5, 5)) != -1) {
                      if (res.data.data[j].electric == "None") {
                        res.data.data[j].electric = 0
                      } else {
                        res.data.data[j].electric = parseFloat(res.data.data[j].electric)
                      }
                      res.data.data[j].startTime = res.data.data[j].startTime.substr(5, 5)
                      list2.push(res.data.data[j])
                    }
                  }
                      if(list2.length==(response.data.data.length*dateList.length)){
        let xList = []
              let yList = []
              let yList2 = []

              list2 = list2.reduce((obj, item) => {
                let find = obj.find(i => i.startTime === item.startTime)
                let _d = {
                  ...item,
                  frequency: 2
                }


                find ? (find.electric += item.electric, find.frequency++) : obj.push(_d)
                return obj
              }, [])

              let today = new Date(); //今天
              let y = today.getFullYear()
              let date = []
              for (let i = 0; i < dateList.length; i++) {

                date[i] = y + "-" + dateList[i]
              }
              ////////console.log(date)
              //console.log(list2)
              //console.log(num)
              for (let i = 0; i < list2.length; i++) {
                list2[i].electric = (list2[i].electric / (list2[i].frequency - 1)) * num
              }
              for (let i = 0; i < date.length; i++) {
                axios({
                    url: host1 + '/report/getSimpleReport',
                    method: 'post',
                    headers: {
                      'Content-Type': 'application/json',
                      'companyId': 0
                    },
                    data: {

                      tableName: "xishajiDailyOutput",

                      query: {
                        shift_date: date[i]
                      }


                    }

                  })
                  .then(response => {
                    ////////console.log(response)
                    let sum = 0
                    for (let i = 0; i < response.data.data.length; i++) {
                      sum = sum + parseFloat(response.data.data[i].shift_yield)


                    }

                    list.push({
                      date: date[i],
                      shift_yield: sum
                    })
                    list = that.sortByKey(list, "date")
                    if (list.length == 5) {

                      ////////console.log(list.length)
                      ////////console.log(list2)
                      for (let i = 0; i < list.length; i++) {

                        yList.push(list[i].shift_yield)

                      }
                      for (let i = 0; i < list2.length; i++) {
                        yList2.push(list2[i].electric)

                      }
                      for (let i = dateList.length - 1; i >= 0; i--) {
                        xList.push(dateList[i])
                      }

                      ////////console.log(yList)
                      ////////console.log(yList2)
                      that.echart2(xList, yList, yList2)
                    }


                  })
              }
                      }
                  //console.log(list2)

                })

            }

        


          })
    
      },
      getDateArr(days) {

        var today = new Date(); //今天
        today.setTime(today.getTime() - 24 * 60 * 60 * 1000);
        var daysData = []; //定义一个空数组存放数据

        for (var i = 0; i < days; i++) {

          var day = i * 24 * 60 * 60 * 1000; //每天的时间戳差值

          var todayTimeStamp = today.getTime(); //今天的时间戳

          var finalDay = new Date(todayTimeStamp - day); //最后一天的时间戳 ，几天前是减 ，几天后就改成加

          var Y = finalDay.getFullYear(); //年

          var M = finalDay.getMonth() + 1; //月

          var D = finalDay.getDate(); //日

          //将月和日格式标准化组合成需要的格式

          if (M.toString().length == 1) {

            M = "0" + M;

          }

          if (D.toString().length == 1) {

            D = "0" + D;

          }

          var timeData = M + "-" + D;

          daysData.push(timeData); //添加进数组

        }

        return (daysData); //输出数据，也可改为 return daysData; 直接返回数据

      },
      // getdata3(){//自络机
      //               axios({ //粗砂机
      //           url: host1 + '/report/getSimpleReport',
      //           method: 'post',
      //           headers: {
      //             'Content-Type': 'application/json',
      //             'companyId': 0
      //           },
      //           data: {

      //             tableName: "ziluoji",

      //             selectFields:['aef','prkg','updatetime']
      //             // sort: "DESC",
      //             // //  selectFields:response.data.data[i].machine_ip
      //             // query: {
      //             //   "mac_ip": response.data.data[i].machine_ip
      //             // }

      //           }

      //         })
      //         .then(res => {
      //           ////////////console.log(res)

      //         })
      // },
      getdata4() { //打包机
        let k = [{
          name: "",
          type: 'line',

          data: []
        }]
        let that = this
        axios({
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': 0
            },
            data: {

              tableName: "auto_package2",

              selectFields: ['cumulative_number_of_packages', 'current_class_package_num', 'machine_ip']
              // sort: "DESC",
              // //  selectFields:response.data.data[i].machine_ip
              // query: {
              //   "mac_ip": response.data.data[i].machine_ip
              // }

            }

          })
          .then(res => {
            //  //////////console.log(res)

            let cumulative_number_of_packages = 0
            let current_class_package_num = 0
            for (let i = 0; i < res.data.data.length; i++) {
              axios({
                  url: host1 + '/report/getSimpleReport',
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json',
                    'companyId': 0
                  },
                  async: true, // fasle表示同步请求，true表示异步请求
                  data: {

                    tableName: "machine_list",
                    sort: "DESC",
                    //  selectFields:response.data.data[i].machine_ip
                    query: {
                      "mac_ip": res.data.data[i].machine_ip
                    }

                  }

                })
                .then(response => {
                  k[0].name = response.data.data[0].mac_id

                  if (that.legendList.length < 1) {
                    that.legendList.push(response.data.data[0].mac_id)
                  }
                  k[0].name = that.legendList[0]

                  res.data.data[i].mac_id = response.data.data[0].mac_id
                })
              cumulative_number_of_packages = cumulative_number_of_packages + parseInt(res.data.data[i]
                .cumulative_number_of_packages)
              current_class_package_num = current_class_package_num + parseInt(res.data.data[i]
                .current_class_package_num)
            }


            if (k[0].data.length > 7) {
              k[0].data.push(res.data.data[0].current_class_package_num)
              k[0].data.shift()
            } else {
              k[0].data.push(res.data.data[0].current_class_package_num)
            }
            let date = new Date();
            let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

            if (that.xList4.length > 7) {
              that.xList4.push(hour + ":" + minute)
              that.xList4.shift()
            } else {
              that.xList4.push(hour + ":" + minute)
            }
            that.seriesList = k
            //console.log(k)
            
              console.log(that.legendList)
                 console.log(that.seriesList)
            // const timer = setTimeout(() => {

              let option = {
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'cross',
                    crossStyle: {
                      color: '#999'
                    }
                  }
                },
                color: ['#E98356', '#5660E9'],
                legend: {
                  data: that.legendList,

                  itemWidth: 15,
                  itemHeight: 8,
                  top: "10%",
                  right: "10.5%",
                  textStyle: {
                    color: "white",
                    fontSize: 10,
                    fontStyle: "normal"
                  }
                },
                grid: {
                  bottom: "10%",
                  top: "30%",
                  right: "12%"
                },
                title: {
                  padding: [
                    3, // 上
                    115, // 右
                    2, // 下
                    90, // 左
                  ],
                  left: "3%",
                  top: "3%",

                  backgroundColor: "#5660E9",
                  textStyle: {
                    color: "white",
                    fontSize: 12,
                    fontWeight: "normal"
                  },
                  text: "打包数量实时监控"
                },
                xAxis: [{
                  type: 'category',
                  data: that.xList4,
                  axisPointer: {
                    type: 'shadow'
                  },
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: "rgba(238,219,219,1)",
                      fontSize: 10
                    }
                  },
                  axisLine: {
                    lineStyle: {
                      color: "#fff",
                      width: 1
                    }
                  },
                  axisTick: {
                    show: false
                  }
                }],
                yAxis: [{
                    type: 'value',
                    name: '包数/个',
                    // min: 100,
                    // max: 350,
                    // interval: 50,

                    nameTextStyle: {
                      color: "rgba(238,219,219,1)",
                      fontSize: 10
                    },

                    splitLine: {
                      show: true,
                      lineStyle: {
                        type: 'dashed',
                        color: "rgba(84,84,84,1)",
                      }
                    },
                    nameLocation: "end",
                    axisLine: {
                      lineStyle: {
                        color: "rgba(255, 255, 255, 0)",
                        width: 1
                      }
                    },
                    axisLabel: {
                      show: true,
                      textStyle: {
                        color: "#AAAAAA",
                        fontSize: 10
                      }
                    },
                  },

                ],
                series: that.seriesList
              };


              let myChart1 = this.$echarts.init(document.getElementById('echart4'));
              //console.log(option)
              myChart1.setOption(option)
            // }, 1000);
            //  for(let j=0;j<res.data.data.length;j++){
            //    that.legendList.push(res.data.data[j].mac_id)




            //  }
            that.cumulative_number_of_packages = cumulative_number_of_packages
            that.current_class_package_num = current_class_package_num
            ////////////console.log( that.cumulative_number_of_packages)
          })
        const timer = setInterval(() => {

          axios({
              url: host1 + '/report/getSimpleReport',
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                'companyId': 0
              },
              data: {

                tableName: "auto_package2",

                selectFields: ['cumulative_number_of_packages', 'current_class_package_num', 'machine_ip']
                // sort: "DESC",
                // //  selectFields:response.data.data[i].machine_ip
                // query: {
                //   "mac_ip": response.data.data[i].machine_ip
                // }

              }

            })
            .then(res => {
              //  //////////console.log(res)

              let cumulative_number_of_packages = 0
              let current_class_package_num = 0
              for (let i = 0; i < res.data.data.length; i++) {
                axios({
                    url: host1 + '/report/getSimpleReport',
                    method: 'post',
                    headers: {
                      'Content-Type': 'application/json',
                      'companyId': 0
                    },
                    async: true, // fasle表示同步请求，true表示异步请求
                    data: {

                      tableName: "machine_list",
                      sort: "DESC",
                      //  selectFields:response.data.data[i].machine_ip
                      query: {
                        "mac_ip": res.data.data[i].machine_ip
                      }

                    }

                  })
                  .then(response => {
                    k[0].name = response.data.data[0].mac_id

                    if (that.legendList.length < 1) {
                      that.legendList.push(response.data.data[0].mac_id)
                    }
                    k[0].name = that.legendList[0]
                    res.data.data[i].mac_id = response.data.data[0].mac_id
                  })
                cumulative_number_of_packages = cumulative_number_of_packages + parseInt(res.data.data[i]
                  .cumulative_number_of_packages)
                current_class_package_num = current_class_package_num + parseInt(res.data.data[i]
                  .current_class_package_num)
              }


              if (k[0].data.length > 7) {
                k[0].data.push(res.data.data[0].current_class_package_num)
                k[0].data.shift()
              } else {
                k[0].data.push(res.data.data[0].current_class_package_num)
              }
              let date = new Date();
              let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
              let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

              if (that.xList4.length > 7) {
                that.xList4.push(hour + ":" + minute)
                that.xList4.shift()
              } else {
                that.xList4.push(hour + ":" + minute)
              }
              that.seriesList = k
              // const timer = setTimeout(() => { //有问题

                ////console.log(that.legendList)
                //      //////////console.log(that.seriesList)
                let option = {
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'cross',
                      crossStyle: {
                        color: '#999'
                      }
                    }
                  },
                  color: ['#E98356', '#5660E9'],
                  legend: {
                    data: that.legendList,

                    itemWidth: 15,
                    itemHeight: 8,
                    top: "10%",
                    right: "10.5%",
                    textStyle: {
                      color: "white",
                      fontSize: 10,
                      fontStyle: "normal"
                    }
                  },
                  grid: {
                    bottom: "10%",
                    top: "30%",
                    right: "12%"
                  },
                  title: {
                    padding: [
                      3, // 上
                      115, // 右
                      2, // 下
                      90, // 左
                    ],
                    left: "3%",
                    top: "3%",

                    backgroundColor: "#5660E9",
                    textStyle: {
                      color: "white",
                      fontSize: 12,
                      fontWeight: "normal"
                    },
                    text: "打包数量实时监控"
                  },
                  xAxis: [{
                    type: 'category',
                    data: that.xList4,
                    axisPointer: {
                      type: 'shadow'
                    },
                    axisLabel: {
                      show: true,
                      textStyle: {
                        color: "rgba(238,219,219,1)",
                        fontSize: 10
                      }
                    },
                    axisLine: {
                      lineStyle: {
                        color: "#fff",
                        width: 1
                      }
                    },
                    axisTick: {
                      show: false
                    }
                  }],
                  yAxis: [{
                      type: 'value',
                      name: '包数/个',
                      // min: 100,
                      // max: 350,
                      // interval: 50,

                      nameTextStyle: {
                        color: "rgba(238,219,219,1)",
                        fontSize: 10
                      },

                      splitLine: {
                        show: true,
                        lineStyle: {
                          type: 'dashed',
                          color: "rgba(84,84,84,1)",
                        }
                      },
                      nameLocation: "end",
                      axisLine: {
                        lineStyle: {
                          color: "rgba(255, 255, 255, 0)",
                          width: 1
                        }
                      },
                      axisLabel: {
                        show: true,
                        textStyle: {
                          color: "#AAAAAA",
                          fontSize: 10
                        }
                      },
                    },

                  ],
                  series: that.seriesList
                };


                let myChart1 = this.$echarts.init(document.getElementById('echart4'));
                //console.log(option)
                myChart1.setOption(option)
              // }, 1000);
              //  for(let j=0;j<res.data.data.length;j++){
              //    that.legendList.push(res.data.data[j].mac_id)




              //  }
              that.cumulative_number_of_packages = cumulative_number_of_packages
              that.current_class_package_num = current_class_package_num
              ////////////console.log( that.cumulative_number_of_packages)
            })
        }, 10000);
      },
      echart(xList, yList, yList2) { //每台自络机产量对比
        let myChart1 = this.$echarts.init(document.getElementById('echart1'));
        // 绘制图表
        myChart1.clear();
        let that = this
        for (let i = 0; i < yList.length; i++) {
          yList[i] = (yList[i] / 1000).toFixed(2)
        }
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          color: ['#E98356', '#5660E9'],
          legend: {
            data: ['电量', '产量', ],
            itemWidth: 15,
            itemHeight: 8,
            top: "10%",
            right: "3%",
            textStyle: {
              color: "white",
              fontSize: 10,
              fontStyle: "normal"
            }
          },
          grid: {
            bottom: "10%",
            top: "30%",
            right: "12%"
          },
          title: {
            padding: [
              3, // 上
              130, // 右
              2, // 下
              90, // 左
            ],
            left: "3%",
            top: "3%",

            backgroundColor: "#5660E9",
            textStyle: {
              color: "white",
              fontSize: 12,
              fontWeight: "normal"
            },
            text: "粗纱机产量能耗对比"
          },
          xAxis: [{
            type: 'category',
            data: xList,
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: "#fff",
                width: 1
              }
            },
            axisTick: {
              show: false
            }
          }],
          yAxis: [{
              type: 'value',
              name: '能耗/度',

              // interval: 50,

              nameTextStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 10
              },

              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed',
                  color: "rgba(84,84,84,1)",
                }
              },
              nameLocation: "end",
              axisLine: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0)",
                  width: 1
                }
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#AAAAAA",
                  fontSize: 10
                }
              },
            },
            {
              type: 'value',
              name: '产量/km',


              nameTextStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 10
              },

              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed',
                  color: "rgba(84,84,84,1)",
                }
              },
              nameLocation: "end",
              axisLine: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0)",
                  width: 1
                }
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#AAAAAA",
                  fontSize: 10
                }
              },
            }
          ],
          series: [{
              name: '电量',
              type: 'bar',
              yAxisIndex: 0,
              data: yList2,
              // barGap:"-100%",
              // barWidth:"30%"
            },
            {
              name: '产量',
              type: 'bar',
              yAxisIndex: 1,
              data: yList,
              // barGap:"-100%",
              //   barWidth:"30%"
            },

          ]
        };

        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },
      echart2(xList, yList, yList2) { //每台自络机产量对比
        let myChart1 = this.$echarts.init(document.getElementById('echart2'));
        // 绘制图表
        myChart1.clear();
        let that = this
        for (let i = 0; i < yList.length; i++) {
          yList[i] = (yList[i] / 1000).toFixed(2)
        }
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          color: ['#E98356', '#5660E9'],
          legend: {
            data: ['电量', '产量', ],
            itemWidth: 15,
            itemHeight: 8,
            top: "10%",
            right: "1%",
            textStyle: {
              color: "white",
              fontSize: 10,
              fontStyle: "normal"
            }
          },
          grid: {
            bottom: "10%",
            top: "30%",
            right: "12%"
          },
          title: {
            padding: [
              3, // 上
              135, // 右
              2, // 下
              90, // 左
            ],
            left: "3%",
            top: "3%",

            backgroundColor: "#5660E9",
            textStyle: {
              color: "white",
              fontSize: 12,
              fontWeight: "normal"
            },
            text: "细纱机产量能耗对比"
          },
          xAxis: [{
            type: 'category',
            data: xList,
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: "#fff",
                width: 1
              }
            },
            axisTick: {
              show: false
            }
          }],
          yAxis: [{
              type: 'value',
              name: '能耗/度',
              // min: 100,
              // max: 350,
              // interval: 50,

              nameTextStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 10
              },

              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed',
                  color: "rgba(84,84,84,1)",
                }
              },
              nameLocation: "end",
              axisLine: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0)",
                  width: 1
                }
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#AAAAAA",
                  fontSize: 10
                }
              },
            },
            {
              type: 'value',
              name: '产量/km',
              // min: 10000,
              // max: 41000,

              nameTextStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 10
              },

              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed',
                  color: "rgba(84,84,84,1)",
                }
              },
              nameLocation: "end",
              axisLine: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0)",
                  width: 1
                }
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#AAAAAA",
                  fontSize: 10
                }
              },
            }
          ],
          series: [{
              name: '电量',
              type: 'bar',
              yAxisIndex: 0,
              data: yList2,
              //     barGap:"-100%",
              // barWidth:"30%"
            },
            {
              name: '产量',
              type: 'bar',
              yAxisIndex: 1,
              data: yList,
              //     barGap:"-100%",
              // barWidth:"30%"
            },

          ]
        };

        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },
      echart3(zbxl, zbcl, wbxl, wbcl, xList, xlMin, xlMax, clMin, clMax) { //每台自络机产量对比
        let myChart1 = this.$echarts.init(document.getElementById('echart3'));
        // 绘制图表
        myChart1.clear();
        let that = this
        //console.log(zbcl)
        for (let i = 0; i < wbcl.length; i++) {
          wbcl[i] = (wbcl[i] / 1000).toFixed(2)
        }




        for (let i = 0; i < zbcl.length; i++) {
          zbcl[i] = (zbcl[i] / 1000).toFixed(2)
        }
        clMax = Math.max(...wbcl)
        let max = Math.max(...zbcl)
        if (clMax < max) {
          clMax = max
        }
        clMin = Math.min(...wbcl)
        let min = Math.min(...zbcl)
        if (clMin > min) {
          clMin = min
        }
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },

          legend: {
            data: ['早班效率', '早班产量', '晚班效率', '晚班产量', ],
            itemWidth: 15,
            itemHeight: 8,
            top: "10%",
            right: "0%",
            textStyle: {
              color: "white",
              fontSize: 10,
              fontStyle: "normal"
            }
          },
          grid: {
            bottom: "10%",
            top: "30%",
            right: "12%"
          },
          title: {
            padding: [
              3, // 上
              130, // 右
              2, // 下
              90, // 左
            ],
            left: "3%",
            top: "3%",

            backgroundColor: "#5660E9",
            textStyle: {
              color: "white",
              fontSize: 12,
              fontWeight: "normal"
            },
            text: "络筒机产量与效率对比"
          },
          xAxis: [{
            type: 'category',
            data: xList,
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: "#fff",
                width: 1
              }
            },
            axisTick: {
              show: false
            }
          }],
          yAxis: [{
              type: 'value',
              name: '效率/%',
              min: xlMin,
              max: xlMax,
              interval: 50,

              nameTextStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 10
              },

              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed',
                  color: "rgba(84,84,84,1)",
                }
              },
              nameLocation: "end",
              axisLine: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0)",
                  width: 1
                }
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#AAAAAA",
                  fontSize: 10
                }
              },
            },
            {
              type: 'value',
              name: '产量/ton',
              min: clMin,
              max: clMax,

              nameTextStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 10
              },

              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed',
                  color: "rgba(84,84,84,1)",
                }
              },
              nameLocation: "end",
              axisLine: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0)",
                  width: 1
                }
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#AAAAAA",
                  fontSize: 10
                }
              },
            }
          ],
          series: [{
              name: '早班效率',
              type: 'bar',
              yAxisIndex: 0,
              data: zbxl,
              //  barGap:"-100%"
            },
            {
              name: '早班产量',
              type: 'bar',
              yAxisIndex: 1,
              data: zbcl,
              //  barGap:"-100%"
            },
            {
              name: '晚班效率',
              type: 'bar',
              yAxisIndex: 0,
              data: wbxl,
              //  barGap:"-100%"
            },
            {
              name: '晚班产量',
              type: 'bar',
              yAxisIndex: 1,
              data: wbcl,
              //  barGap:"-100%"
            },
          ]
        };

        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },
      echart4() {
        let myChart1 = this.$echarts.init(document.getElementById('echart4'));
        // 绘制图表
        myChart1.clear();
        let that = this
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          color: ['#E98356', '#5660E9'],
          legend: {
            data: that.legendList,

            itemWidth: 15,
            itemHeight: 8,
            top: "10%",
            right: "10.5%",
            textStyle: {
              color: "white",
              fontSize: 10,
              fontStyle: "normal"
            }
          },
          grid: {
            bottom: "10%",
            top: "30%",
            right: "15%"
          },
          title: {
            padding: [
              3, // 上
              115, // 右
              3, // 下
              90, // 左
            ],
            left: "3%",
            top: "3%",


            backgroundColor: "#5660E9",
            textStyle: {
              color: "white",
              fontSize: 12,
              fontWeight: "normal"
            },
            text: "打包数量实时监控"
          },
          xAxis: [{
            type: 'category',
            data: that.xList4,
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: "#fff",
                width: 1
              }
            },
            axisTick: {
              show: false
            }
          }],
          yAxis: [{
              type: 'value',
              name: '包数/个',
              // min: 100,
              // max: 350,
              // interval: 50,

              nameTextStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 10
              },

              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed',
                  color: "rgba(84,84,84,1)",
                }
              },
              nameLocation: "end",
              axisLine: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0)",
                  width: 1
                }
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#AAAAAA",
                  fontSize: 10
                }
              },
            },

          ],
          series: that.seriesList
        };
        that.option = option

        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
        that.getdata4()
      },
      changeWorkshopTiming: function () {
        const timer = setInterval(() => {
          this.getzuori()
          let date = new Date()


          let h = String(date.getHours())
          let m = String(date.getMinutes())

          if ((h == "00") && (m == "10")) {

            this.getdata()
            this.getziluoji()
            this.getdata2()
          }
          this.getjinri()

          this.getcushuji()
          this.getcushuji2()

          //  this.getdata()
        }, 15000);
        // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
        // this.$once('hook:beforeDestroy', () => {
        //   clearInterval(timer);
        // })
      },



    },




    filters: {

    },
    mounted() {

      this.getzuori()
      this.getjinri()
      this.getziluoji()
      this.getcushuji()
      this.getcushuji2()
      this.getdata()

      this.getdata2()
      this.getdata4()
      this.changeWorkshopTiming()



    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    }
  }

</script>

<style scoped>
  span {
    text-align: center;
  }

  .board {
    width: 100%;
    height: 93%;
    /* height: 71%; */


  }

  .content {
    width: 100%;
    background-image: url("../../static/img/wzBack.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 100%;
    margin: 0;
    padding-top: 2rem;
  }

  .title {
    /*background-image: url("../static/img/title.png");*/
    height: 4rem;
    color: white;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: -1.5rem;
    width: 100%;
    /*-webkit-box-shadow:1px 1px 1px rgba(9, 62, 175, 0.66);*/
    /*-moz-box-shadow:1px 1px 1px rgba(9, 62, 175, 0.66);*/
    /*box-shadow:1px 1px 25px  rgba(9, 62, 175, 0.66);*/
    /*border-radius: 1rem;*/
  }

  .board_con {
    width: 47.7%;
    height: 43%;
    /* margin: 3%; */
    margin-left: 1.5%;
    margin-top: 2%;
    float: left;
    background-image: url("../../static/img/card3.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
  }

  .board_con_title {
    position: absolute;
    top: -4%;
    left: 36%;
    color: #FFF710;
    font-size: 1.2rem;
  }

  .board_con_content {
    position: absolute;
    top: 8%;
    left: 3%;

    width: 94%;
    height: 90%;
    display: flex;
  }

  .board_con_content_left {
    width: 60%;
    height: 100%;

  }

  .board_con_content_right {
    width: 40%;
    height: 100%;

    /* display: flex;
    flex-direction: column;
    align-items: center; */
    position: relative;
  }

  .radius {
    width: 220px;
    height: 220px;
    background-image: url("../../static/img/radius2.png");
    background-size: 100% 100%;
    position: absolute;
    top: -2%;
    left: 6%;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .radius_con {
    width: 40%;
    height: 40%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .fangkuai {
    width: 125px;
    height: 50px;
    z-index: 20;
    position: absolute;
    bottom: 4%;
    left: 24%;
    background-image: url("../../static/img/card4.png");
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    background-repeat: no-repeat;
  }

  .fangkuai_con {
    width: 26px;
    height: 26px;
    margin: 5px;
    background: linear-gradient(180deg, rgba(39, 105, 132, 1) 0%, rgba(35, 95, 119, 0.8) 45%, rgba(20, 53, 66, 0) 100%);
    border-radius: 50%;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fangkuai_con2 {
    width: 65%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 8px;
  }

</style>
