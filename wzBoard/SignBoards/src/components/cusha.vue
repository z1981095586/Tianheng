<template>
  <div class="content">
    <header style="height: 3rem">
      <div class="title">万舟纺纱信息化监控平台-粗纱机</div>

    </header>
    <div class="board">
      <div class="board_con">
        <div class="board_con_left">
          <div class="title2">
            <div class="fangkuai">
              <div class="image-border image-border1"></div>
              <div class="image-border image-border2"></div>
              <div class="image-border image-border3"></div>
              <div class="image-border image-border4"></div>
              <span style="font-size:1rem;margin-bottom:1rem">总产量</span>
              <span style="color:#FFFF00;font-size:2rem; font-family: 'let';">{{csjSum}}</span>
            </div>
            <div class="fangkuai">
              <div class="image-border image-border1"></div>
              <div class="image-border image-border2"></div>
              <div class="image-border image-border3"></div>
              <div class="image-border image-border4"></div>
              <span style="font-size:1rem;margin-bottom:1rem">昨日产量</span>
              <span style="color:#00FFDC;font-size:2rem; font-family: 'let';">{{csjSum2}}</span>
            </div>
          </div>
          <div class="table">
            <div class="table_title"><span>前罗拉转速排行</span></div>
            <div class="table_head"><span>前罗拉转速</span><span>设备</span><span>已纺长度</span><span>设定长度</span><span>捻度</span>
            </div>
            <div class="table_content">
              <div :class="item.class" :style="item.styles" v-for="(item,index) in qllList" :key="index"><span
                  :style="item.style2">{{item.front_lola_speed}}</span><span>#{{item.mac_id}}</span><span>{{item.yi_fang_sha_length}}</span><span>{{item.set_length}}</span><span>{{item.nian_du}}</span>
              </div>

            </div>
          </div>
          <div class="echart">
            <div class="table_title2"><span>前罗拉转速实时预警</span></div>
            <div class="echart_con" id="echart1"></div>
          </div>
        </div>
        <div class="board_con_right">
          <div class="title2">
            <div class="fangkuai">
              <div class="image-border image-border1"></div>
              <div class="image-border image-border2"></div>
              <div class="image-border image-border3"></div>
              <div class="image-border image-border4"></div>
              <span style="font-size:1rem;margin-bottom:1rem">当前产量</span>
              <span style="color:#FFFF00;font-size:2rem; font-family: 'let';">{{csjSum3}}</span>
            </div>
            <div class="fangkuai">
              <div class="image-border image-border1"></div>
              <div class="image-border image-border2"></div>
              <div class="image-border image-border3"></div>
              <div class="image-border image-border4"></div>
              <span style="font-size:1rem;margin-bottom:1rem">设备运转率</span>
              <span style="color:#00FFDC;font-size:2rem; font-family: 'let';">{{sbyzl}}%</span>
            </div>
          </div>
          <div class="table">
            <div class="table_title"><span>锭翼转速排行</span></div>
            <div class="table_head"><span>锭翼转速</span><span>设备</span><span>已纺长度</span><span>设定长度</span><span>捻度</span>
            </div>
            <div class="table_content">
              <div :class="item.class" :style="item.styles" v-for="(item,index) in dyList" :key="index"><span
                  :style="item.style2">{{item.spindle_speed}}</span><span>#{{item.mac_id}}</span><span>{{item.yi_fang_sha_length}}</span><span>{{item.set_length}}</span><span>{{item.nian_du}}</span>
              </div>


            </div>
          </div>
          <div class="echart">
            <div class="table_title2"><span>锭翼转速实时预警</span></div>
            <div class="echart_con" id="echart2"></div>
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
    name: "cusha",
    data() {
      return {
        lang: 'zh',
        workshopId: '3',
        companyId: this.$route.params.id, //公司库表Id
        qllList: [],
        machineIdList: [],
        dyList: [],
        machineIdList2: [],
        time: [],
        speed: [],
        timer: "",
        timer2: "",
        timer3: "",
        timer4: "",
        option: {},
           time2: [],
        speed2: [],
     sbyzl:null,
     csjSum2:null,
     csjSum:null,
        csjSum3:null,
        option2: {}
      }
    },
    methods: {
            getcushuji3(){ //获取粗砂机今日产量
         let that = this
         let sum=0
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
            for(let i=0;i<response.data.data.length;i++){
              sum=sum+response.data.data[i].class_all_yield
            }
          }).then(() => {
            //console.log(sum)
               let today = new Date(); 


     

 let time = (new Date).getTime() - 24 * 60 * 60 * 1000;
let yesday = new Date(time); // 获取的是前一天日期
yesday = yesday.getFullYear() + "-" + (yesday.getMonth()> 9 ? (yesday.getMonth() + 1) : "0" + (yesday.getMonth() + 1)) + "-" +(yesday.getDate()> 9 ? (yesday.getDate()) : "0" + (yesday.getDate())); //字符串拼接转格式：例如2018-08-19
 let time2 = (new Date).getTime() ;
let nowday = new Date(time2); 
nowday = nowday.getFullYear() + "-" + (nowday.getMonth()> 9 ? (nowday.getMonth() + 1) : "0" + (nowday.getMonth() + 1)) + "-" +(nowday.getDate()> 9 ? (nowday.getDate()) : "0" + (nowday.getDate())); //字符串拼接转格式：例如2018-08-19
//console.log(nowday)
     //console.log(yesday) 
          let now = today.getHours()+":"+today.getMinutes();
    
          if((today.getHours()<6)&&(today.getMinutes()<45)){ //6点45前的情况
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
            let sum2=0
            for(let i=0;i<res.data.data.length;i++){
              if((res.data.data[i].current_time.indexOf(yesday)!=-1)&&(res.data.data[i].current_time.indexOf("06:45")!=-1)){
                sum2=sum2+parseFloat(res.data.data[i].current_all_yield)
              }
            }
            that.csjSum3=sum-sum2

          })
          }else{
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
            let sum2=0
            for(let i=0;i<res.data.data.length;i++){
              if((res.data.data[i].current_time.indexOf(nowday)!=-1)&&(res.data.data[i].current_time.indexOf("06:45")!=-1)){
                sum2=sum2+parseFloat(res.data.data[i].current_all_yield)
              }
            }
            that.csjSum3=sum-sum2
            that.getcushuji()

          })
          }


     

       

    

          })
      },
//             getcushuji2(){ //获取粗砂机昨日产量
//        let time = (new Date).getTime() - 24 * 60 * 60 * 1000;
// let yesday = new Date(time); // 获取的是前一天日期
// yesday = yesday.getFullYear() + "-" + (yesday.getMonth()> 9 ? (yesday.getMonth() + 1) : "0" + (yesday.getMonth() + 1)) + "-" +(yesday.getDate()> 9 ? (yesday.getDate()) : "0" + (yesday.getDate())); //字符串拼接转格式：例如2018-08-19
//  let time2 = (new Date).getTime() ;
// let nowday = new Date(time2); 
// nowday = nowday.getFullYear() + "-" + (nowday.getMonth()> 9 ? (nowday.getMonth() + 1) : "0" + (nowday.getMonth() + 1)) + "-" +(nowday.getDate()> 9 ? (nowday.getDate()) : "0" + (nowday.getDate())); //字符串拼接转格式：例如2018-08-19
// //console.log(nowday)
//      //console.log(yesday) 
//          let that = this
//             axios({
//             url: host1 + '/report/getSimpleReport',
//             method: 'post',
//             headers: {
//               'Content-Type': 'application/json',
//               'companyId': 0
//             },
//             data: {

//               tableName: "cushajiDailyOutput",


//             }

//           })
//           .then(res => {
//             let sum=0;
//             let sum2=0;
//        for(let i=0;i<res.data.data.length;i++){
//               if((res.data.data[i].current_time.indexOf(yesday)!=-1)&&(res.data.data[i].current_time.indexOf("06:45")!=-1)){
//                 sum2=sum2+parseFloat(res.data.data[i].current_all_yield)
//               }
//                       if((res.data.data[i].current_time.indexOf(nowday)!=-1)&&(res.data.data[i].current_time.indexOf("06:45")!=-1)){
//                 sum=sum+parseFloat(res.data.data[i].current_all_yield)
//               }

//             }
      
//       that.csjSum2=sum-sum2
//           })
//       },
            getcushuji(){ //获取粗砂机总产量
       let time = (new Date).getTime() - 24 * 60 * 60 * 1000;
let yesday = new Date(time); // 获取的是前一天日期
yesday = yesday.getFullYear() + "-" + (yesday.getMonth()> 9 ? (yesday.getMonth() + 1) : "0" + (yesday.getMonth() + 1)) + "-" +(yesday.getDate()> 9 ? (yesday.getDate()) : "0" + (yesday.getDate())); //字符串拼接转格式：例如2018-08-19
 let time2 = (new Date).getTime() ;
let nowday = new Date(time2); 
nowday = nowday.getFullYear() + "-" + (nowday.getMonth()> 9 ? (nowday.getMonth() + 1) : "0" + (nowday.getMonth() + 1)) + "-" +(nowday.getDate()> 9 ? (nowday.getDate()) : "0" + (nowday.getDate())); //字符串拼接转格式：例如2018-08-19
//console.log(nowday)
     //console.log(yesday) 
         let that = this
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
       
       
 
      
      that.csjSum=response.data.data[0].month_all_total+that.csjSum3
      that.csjSum2=response.data.data[0].yesterday_total
      //console.log(that.csjSum)
          })
      },
      changeWorkshopTiming: function () {
        const timer = setInterval(() => {

   
      this.getshebei()
     
      this.getcushuji3()

      // this.getcushuji()
          //  this.getdata()
        }, 5000);
        // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
        // this.$once('hook:beforeDestroy', () => {
        //   clearInterval(timer);
        // })
      },
             getshebei(){ //获取设备运转率
      let that=this
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
            let sum=0; //故障台数
         for(let i=0;i<response.data.data.length;i++){
           if((response.data.data[i].spindle_speed==0) &&(response.data.data[i].front_lola_speed==0)){
          sum=sum+1

           }

          
         }
          that.sbyzl=(((response.data.data.length-sum)/response.data.data.length).toFixed(5)*100).toFixed(1)
   
          })
      },
      getdata2(){ // 钉子
 //先获取前三名排名，再实时统计，经过一小时如果排名发生变化，清空数据，重新获取排名，获取历史罗拉转身并实时推移
        let that = this
        let pmList = [] //排名列表
        // 刚开始第一次获取排名
        axios({ //罗拉转速排名
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': 0
            },
            data: {

              tableName: "cushaji",
              sort: "DESC",
              sortColumn: "spindle_speed+0",


            }

          })
          .then(response => {



            for (let i = 0; i < 3; i++) { //取前三名
              if (i == 0) {
                response.data.data[i].class = "table_con"
                response.data.data[i].styles = "color: rgb(107, 255, 225);"
                response.data.data[i].style2 = "color: rgb(255, 0, 0);"
              } else if (i == 1) {
                response.data.data[i].class = "table_con2"
                response.data.data[i].styles = "color:rgb(255, 255, 0)"
                response.data.data[i].style2 = "color: rgb(255, 0, 221);"
              } else if (i == 2) {
                response.data.data[i].class = "table_con"
                response.data.data[i].styles = "color: rgb(89, 240, 4);"
                response.data.data[i].style2 = "    color: rgb(0, 216, 216);"
              }
              pmList.push(response.data.data[i])


            }
            that.dyList = pmList

            let rhour = that.gethourarr(5)

            let series = [{
             name: "设备号 "+pmList[0].mac_id.substr(5,2),
                type: 'line',
                yAxisIndex: 0,
                markLine: {
                  symbol: ['none', 'image://https://s1.ax1x.com/2020/08/10/abCVjf.png'], //去掉箭头
                  symbolSize: [15, 15],
                  itemStyle: {
                    normal: {
                      lineStyle: { //全局的样式
                        type: 'dashed',

                      },
                    }
                  },
                  data: [{
                      yAxis: 250,

                      itemStyle: {
                        normal: {
                          color: 'red'
                        }
                      },
                      label: { // 线条提示字体
                        show: false,
                        position: 'end',

                        color: '#ff3040'
                      }
                    },
                    {
                      yAxis: 110,
                      itemStyle: {
                        normal: {
                          color: 'blue'
                        }
                      },
                      label: {
                        show: false,
                        position: 'end',
                        formatter: '越限下线',
                        color: '#ff3040'
                      }
                    }
                  ]
                },
                data: []
              },
              {
             name: "设备号 "+pmList[1].mac_id.substr(5,2),
                type: 'line',
                yAxisIndex: 0,
                data: []
              },
              {
                name: "设备号 "+pmList[2].mac_id.substr(5,2),
                type: 'line',
                yAxisIndex: 0,
                data: []
              },

            ]
            let xlist = []
            for (let i = 0; i < pmList.length; i++) {
              for (let j = 0; j < rhour.length; j++) {

                axios({
                    url: host1 + '/report/getSimpleReport',
                    method: 'post',
                    headers: {
                      'Content-Type': 'application/json',
                      'companyId': 0
                    },
                    data: {

                      tableName: "cushaji_spindle_speed xr",

                      query: {
                        machine_id: pmList[i].mac_id,
                        "xr.current_time": rhour[j]
                      }


                    }

                  })

                  .then(response => {
               
                 if(response.data.data.length==0){
                     //console.log(response)
                   series[i].data[j] = 0
                 }else{
 series[i].data[j] = parseInt(response.data.data[0].spindle_speed)
                 }
                   

                  })
              }

            }
            for (let i = 0; i < rhour.length; i++) {
              xlist.push(rhour[i].substr(11, 5))
            }

            setTimeout(() => {
              that.echart2(pmList, xlist, series)

           this.timer3=setInterval(() => {
                  for (let i = 0; i < 3; i++) {
                axios({ //罗拉转速处理
                    url: host1 + '/report/getSimpleReport',
                    method: 'post',
                    headers: {
                      'Content-Type': 'application/json',
                      'companyId': 0
                    },
                    data: {

                      tableName: "cushaji",
                      query: {
                        // mac_id: series[i].name
                          mac_id: pmList[i].mac_id
                      }


                    }

                  })
                  .then(response => {
      if(response.data.data.length==0){
                     //console.log(response)
                  series[i].data.push(0)
                 }else{
 series[i].data.push(parseInt(response.data.data[0].spindle_speed))
                 }
                   

                  })
              }
              let date = new Date();
              let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
              let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

              if (minute == "00") {
                xlist.push(hour + ":" + minute)
                xlist.shift()
                series[0].data.shift()
                 series[1].data.shift()
                  series[2].data.shift()
              } else {
                xlist.push("")
              }


              setTimeout(() => {
                let myChart1 = this.$echarts.init(document.getElementById('echart2'));

                myChart1.setOption(that.option2)
              }, 1000);
           }, 180000);


            }, 1000);
          })
          // let a=[{mac_id:12},{mac_id:1},{mac_id:2}]
          // let b=[{mac_id:12},{mac_id:1},{mac_id:2}]
          // //console.log(that.equalArr2(a,b))
          that.timer4=setInterval(() => { //每小时获取排名
                 axios({ //罗拉转速排名
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': 0
            },
            data: {

              tableName: "cushaji",
              sort: "DESC",
              sortColumn: "spindle_speed+0",


            }

          })
          .then(response => {


        let arr=[]
            for (let i = 0; i < 3; i++) { //取前三名
              if (i == 0) {
                response.data.data[i].class = "table_con"
                response.data.data[i].styles = "color: rgb(107, 255, 225);"
                response.data.data[i].style2 = "color: rgb(255, 0, 0);"
              } else if (i == 1) {
                response.data.data[i].class = "table_con2"
                response.data.data[i].styles = "color:rgb(255, 255, 0)"
                response.data.data[i].style2 = "color: rgb(255, 0, 221);"
              } else if (i == 2) {
                response.data.data[i].class = "table_con"
                response.data.data[i].styles = "color: rgb(89, 240, 4);"
                response.data.data[i].style2 = "    color: rgb(0, 216, 216);"
              }
            arr.push(response.data.data[i])


            }
          
           if(that.equalArr2(arr,that.dyList)==true){
             //console.log("排名不变，继续刷新")
           }else{
               //console.log("排名变化，关闭统计图刷新定时器，关闭获取排名的定时器，清空统计图和排名列表")
              //  that.qllList = arr
               that.time3=clearInterval(that.timer3) //关闭统计图定时器
                    that.time4=clearInterval(that.timer4)  //关闭获取排名定时器
                     let myChart1 = that.$echarts.init(document.getElementById('echart2'));

                myChart1.clear()
                that.getdata2() //重新执行函数


           }

          })
          }, 36000000);
      },
      getdata() { //罗拉
        //先获取前三名排名，再实时统计，经过一小时如果排名发生变化，清空数据，重新获取排名，获取历史罗拉转身并实时推移
        let that = this
        let pmList = [] //排名列表
        // 刚开始第一次获取排名
        axios({ //罗拉转速排名
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': 0
            },
            data: {

              tableName: "cushaji",
              sort: "DESC",
              sortColumn: "front_lola_speed+0",


            }

          })
          .then(response => {



            for (let i = 0; i < 3; i++) { //取前三名
              if (i == 0) {
                response.data.data[i].class = "table_con"
                response.data.data[i].styles = "color: rgb(107, 255, 225);"
                response.data.data[i].style2 = "color: rgb(255, 0, 0);"
              } else if (i == 1) {
                response.data.data[i].class = "table_con2"
                response.data.data[i].styles = "color:rgb(255, 255, 0)"
                response.data.data[i].style2 = "color: rgb(255, 0, 221);"
              } else if (i == 2) {
                response.data.data[i].class = "table_con"
                response.data.data[i].styles = "color: rgb(89, 240, 4);"
                response.data.data[i].style2 = "    color: rgb(0, 216, 216);"
              }
              pmList.push(response.data.data[i])


            }
            that.qllList = pmList

            let rhour = that.gethourarr(5)

            let series = [{
                name: "设备号 "+pmList[0].mac_id.substr(5,2),
                type: 'line',
                yAxisIndex: 0,
                markLine: {
                  symbol: ['none', 'image://https://s1.ax1x.com/2020/08/10/abCVjf.png'], //去掉箭头
                  symbolSize: [15, 15],
                  itemStyle: {
                    normal: {
                      lineStyle: { //全局的样式
                        type: 'dashed',

                      },
                    }
                  },
                  data: [{
                      yAxis: 250,

                      itemStyle: {
                        normal: {
                          color: 'red'
                        }
                      },
                      label: { // 线条提示字体
                        show: false,
                        position: 'end',

                        color: '#ff3040'
                      }
                    },
                    {
                      yAxis: 110,
                      itemStyle: {
                        normal: {
                          color: 'blue'
                        }
                      },
                      label: {
                        show: false,
                        position: 'end',
                        formatter: '越限下线',
                        color: '#ff3040'
                      }
                    }
                  ]
                },
                data: []
              },
              {
       name: "设备号 "+pmList[1].mac_id.substr(5,2),
                type: 'line',
                yAxisIndex: 0,
                data: []
              },
              {
        name: "设备号 "+pmList[2].mac_id.substr(5,2),
                type: 'line',
                yAxisIndex: 0,
                data: []
              },

            ]
            let xlist = []
            for (let i = 0; i < pmList.length; i++) {
              for (let j = 0; j < rhour.length; j++) {

                axios({
                    url: host1 + '/report/getSimpleReport',
                    method: 'post',
                    headers: {
                      'Content-Type': 'application/json',
                      'companyId': 0
                    },
                    data: {

                      tableName: "cushaji_frontLola_speed xr",

                      query: {
                        machine_id: pmList[i].mac_id,
                        "xr.current_time": rhour[j]
                      }


                    }

                  })

                  .then(response => {

                
      if(response.data.data.length==0){
                     //console.log(response)
                   series[i].data[j] = 0
                 }else{
     series[i].data[j] = parseInt(response.data.data[0].front_lola_speed)
                 }
                  })
              }

            }
            for (let i = 0; i < rhour.length; i++) {
              xlist.push(rhour[i].substr(11, 5))
            }

            setTimeout(() => {
              that.echart(pmList, xlist, series)

           this.timer2=setInterval(() => {
                  for (let i = 0; i < 3; i++) {
                axios({ //罗拉转速处理
                    url: host1 + '/report/getSimpleReport',
                    method: 'post',
                    headers: {
                      'Content-Type': 'application/json',
                      'companyId': 0
                    },
                    data: {

                      tableName: "cushaji",
                      query: {
                        // mac_id: series[i].name
                          mac_id: pmList[i].mac_id
                      }


                    }

                  })
                  .then(response => {
      if(response.data.data.length==0){
                     //console.log(response)
                series[i].data.push(0)
                 }else{
                series[i].data.push(parseInt(response.data.data[0].front_lola_speed))
                 }
    

                  })
              }
              let date = new Date();
              let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
              let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

              if (minute == "00") {
                xlist.push(hour + ":" + minute)
                xlist.shift()
                series[0].data.shift()
                 series[1].data.shift()
                  series[2].data.shift()
              } else {
                xlist.push("")
              }


              setTimeout(() => {
                let myChart1 = this.$echarts.init(document.getElementById('echart1'));

                myChart1.setOption(that.option)
              }, 1000);
           }, 180000);


            }, 1000);
          })
          // let a=[{mac_id:12},{mac_id:1},{mac_id:2}]
          // let b=[{mac_id:12},{mac_id:1},{mac_id:2}]
          // //console.log(that.equalArr2(a,b))
          that.timer3=setInterval(() => { //每小时获取排名
                 axios({ //罗拉转速排名
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': 0
            },
            data: {

              tableName: "cushaji",
              sort: "DESC",
              sortColumn: "front_lola_speed+0",


            }

          })
          .then(response => {


        let arr=[]
            for (let i = 0; i < 3; i++) { //取前三名
              if (i == 0) {
                response.data.data[i].class = "table_con"
                response.data.data[i].styles = "color: rgb(107, 255, 225);"
                response.data.data[i].style2 = "color: rgb(255, 0, 0);"
              } else if (i == 1) {
                response.data.data[i].class = "table_con2"
                response.data.data[i].styles = "color:rgb(255, 255, 0)"
                response.data.data[i].style2 = "color: rgb(255, 0, 221);"
              } else if (i == 2) {
                response.data.data[i].class = "table_con"
                response.data.data[i].styles = "color: rgb(89, 240, 4);"
                response.data.data[i].style2 = "    color: rgb(0, 216, 216);"
              }
            arr.push(response.data.data[i])


            }
            //console.log(arr)
            //console.log(that.qllList)
           if(that.equalArr2(arr,that.qllList)==true){
             //console.log("排名不变，继续刷新")
           }else{
               //console.log("排名变化，关闭统计图刷新定时器，关闭获取排名的定时器，清空统计图和排名列表")
              //  that.qllList = arr
               that.time2=clearInterval(that.timer2) //关闭统计图定时器
                    that.time3=clearInterval(that.timer3)  //关闭获取排名定时器
                     let myChart1 = that.$echarts.init(document.getElementById('echart1'));

                myChart1.clear()
                that.getdata() //重新执行函数


           }

          })
          }, 36000000);
   

      },
//       getdata() {
//         let that = this


//         axios({ //前罗拉转速处理
//             url: host1 + '/report/getSimpleReport',
//             method: 'post',
//             headers: {
//               'Content-Type': 'application/json',
//               'companyId': 0
//             },
//             data: {

//               tableName: "cushaji",
//               sort: "DESC",
//               sortColumn: "front_lola_speed",


//             }

//           })
//           .then(response => {

//             let datas = response
//             let list = []
//             let list2=[]
//             let str=""
//             for (let i = 0; i < 3; i++) {
//               axios({
//                   url: host1 + '/report/getSimpleReport',
//                   method: 'post',
//                   headers: {
//                     'Content-Type': 'application/json',
//                     'companyId': 0
//                   },
//                   async: true, // fasle表示同步请求，true表示异步请求
//                   data: {

//                     tableName: "machine_list",
//                     sort: "DESC",
//                     //  selectFields:response.data.data[i].machine_ip
//                     query: {
//                       "mac_ip": response.data.data[i].machine_ip
//                     }

//                   }

//                 })
//                 .then(response => {
              
//                    datas.data.data[i].front_lola_speed=parseInt(  datas.data.data[i].front_lola_speed)
//                   datas.data.data[i].mac_id = response.data.data[0].mac_id
//                   list.push(datas.data.data[i])
//                  list2.push(response.data.data[0].mac_id) //前三台设备id列表
// str=str+response.data.data[0].mac_id+","
//                 })
//                        .then(()=>{
//                          list=that.sortByKey(list,"front_lola_speed")
//                          let list3=[]
//                          for(let i=list.length-1;i>=0;i--){
// list3.push(list[i])
//                          }
//                                    for(let i=0;i<list3.length;i++){
//             if (i == 0) {
//                     list3[i].class = "table_con"
//                      list3[i].styles = "color: rgb(107, 255, 225);"
//                    list3[i].style2 = "color: rgb(255, 0, 0);"
//                   } else if (i == 1) {
//                      list3[i].class = "table_con2"
//                     list3[i].styles = "color:rgb(255, 255, 0)"
//                     list3[i].style2 = "color: rgb(255, 0, 221);"
//                   } else if (i == 2) {
//                    list3[i].class = "table_con"
//                    list3[i].styles = "color: rgb(89, 240, 4);"
//                   list3[i].style2 = "    color: rgb(0, 216, 216);"
//                   }
//                          }
//          that.qllList = list3

//          //console.log(that.qllList)
//              that.machineIdList=list2
//              //console.log(str)
//             //console.log(str.split(','))
//             let key=str.split(',')
    
//             let l = []
//             let k = [{
//                 name: key[0],
//                 type: 'line',
//                 yAxisIndex: 0,
//                 markLine: {
//                   symbol: ['none', 'image://https://s1.ax1x.com/2020/08/10/abCVjf.png'], //去掉箭头
//                   symbolSize: [15, 15],
//                   itemStyle: {
//                     normal: {
//                       lineStyle: { //全局的样式
//                         type: 'dashed',

//                       },
//                     }
//                   },
//                   data: [{
//                       yAxis: 250,

//                       itemStyle: {
//                         normal: {
//                           color: 'red'
//                         }
//                       },
//                       label: { // 线条提示字体
//                         show: false,
//                         position: 'end',

//                         color: '#ff3040'
//                       }
//                     },
//                     {
//                       yAxis: 110,
//                       itemStyle: {
//                         normal: {
//                           color: 'blue'
//                         }
//                       },
//                       label: {
//                         show: false,
//                         position: 'end',
//                         formatter: '越限下线',
//                         color: '#ff3040'
//                       }
//                     }
//                   ]
//                 },
//                 data: []
//               },
//               {
//                 name: key[1],
//                 type: 'line',
//                 yAxisIndex: 0,
//                 data: []
//               },
//               {
//                 name: key[2],
//                 type: 'line',
//                 yAxisIndex: 0,
//                 data: []
//               },

//             ]
           
//             let date = new Date();
//             let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
//             let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
//             l.push(hour + ":" + minute)
       
//             for (let i = 0; i < k.length; i++) {  //有问题
//                for(let j=0;j<that.qllList.length;j++){
//            if(k[i].name==that.qllList[j].mac_id){
// k[i].data.push(that.qllList[j].front_lola_speed)
//            }
      
//             }
              
//             }
//             that.time = l
//             that.speed = k
  
             
//             const timer = setInterval(() => {
//               let date = new Date();
//               let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
//               let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
//               l.push(hour + ":" + minute)
//               if (l.length > 6) {
//                 l.shift()
//               }
               
//      axios({ //前罗拉转速处理
//             url: host1 + '/report/getSimpleReport',
//             method: 'post',
//             headers: {
//               'Content-Type': 'application/json',
//               'companyId': 0
//             },
//             data: {

//               tableName: "cushaji",
//               sort: "DESC",
//               sortColumn: "front_lola_speed",


//             }

//           })

//           .then(response => {
//             let pp=response.data.data
//          for(let i=0;i<pp.length;i++){
//                axios({
//                   url: host1 + '/report/getSimpleReport',
//                   method: 'post',
//                   headers: {
//                     'Content-Type': 'application/json',
//                     'companyId': 0
//                   },
//                   async: true, // fasle表示同步请求，true表示异步请求
//                   data: {

//                     tableName: "machine_list",
//                     sort: "DESC",
//                     //  selectFields:response.data.data[i].machine_ip
//                     query: {
//                       "mac_ip":pp[i].machine_ip
//                     }

//                   }

//                 })
//                 .then(response => {
//                   pp[i].mac_id=response.data.data[0].mac_id
//                 })      .then(()=>{
           
//                 for (let i = 0; i < k.length; i++) {
//                 if (k[i].data.length > 6) {
//                   k[i].data.shift()
//                 }
              
    
//                   for (let j = 0; j < pp.length; j++) {
//                       //  //console.log(that.qllList[j].mac_id)
//                       // //console.log(k[i].name)
//                     if (k[i].name == pp[j].mac_id) {
                   
//                       k[i].data.push(pp[j].front_lola_speed)
//                     }
//                   }
                





//               }

//               that.time = l
//               that.speed = k
//               let myChart1 = this.$echarts.init(document.getElementById('echart1'));
//               myChart1.setOption(that.option)
//              })
//          }
//           })




          
//             }, 60000);
     
//             that.echart(key)
            
//             })

//             }
            

           
//           })
//         axios({ //锭翼转速(r/min)处理
//             url: host1 + '/report/getSimpleReport',
//             method: 'post',
//             headers: {
//               'Content-Type': 'application/json',
//               'companyId': 0
//             },
//             data: {

//               tableName: "cushaji",
//               sort: "DESC",
//               sortColumn: "spindle_speed",


//             }

//           })
//           .then(response => {

//             let datas = response
//             let list = []
//               let list2=[]
//                    let str=""
//             for (let i = 0; i < 3; i++) {
//               axios({
//                   url: host1 + '/report/getSimpleReport',
//                   method: 'post',
//                   headers: {
//                     'Content-Type': 'application/json',
//                     'companyId': 0
//                   },
//                   data: {

//                     tableName: "machine_list",
//                     sort: "DESC",
//                     //  selectFields:response.data.data[i].machine_ip
//                     query: {
//                       "mac_ip": response.data.data[i].machine_ip
//                     }

//                   }

//                 })
//                 .then(response => {
            
//                              datas.data.data[i].spindle_speed=parseInt(  datas.data.data[i].spindle_speed)
//                   datas.data.data[i].mac_id = response.data.data[0].mac_id
//                   list.push(datas.data.data[i])
//                   list2.push(response.data.data[0].mac_id) //前三台设备id列表
//                   str=str+response.data.data[0].mac_id+","
//                 })
//                      .then(()=>{
//                           list=that.sortByKey(list,"spindle_speed")
//                          let list3=[]
//                          for(let i=list.length-1;i>=0;i--){
// list3.push(list[i])
//                          }
//                                     for(let i=0;i<list3.length;i++){
//             if (i == 0) {
//                     list3[i].class = "table_con"
//                      list3[i].styles = "color: rgb(107, 255, 225);"
//                    list3[i].style2 = "color: rgb(255, 0, 0);"
//                   } else if (i == 1) {
//                      list3[i].class = "table_con2"
//                     list3[i].styles = "color:rgb(255, 255, 0)"
//                     list3[i].style2 = "color: rgb(255, 0, 221);"
//                   } else if (i == 2) {
//                    list3[i].class = "table_con"
//                    list3[i].styles = "color: rgb(89, 240, 4);"
//                   list3[i].style2 = "    color: rgb(0, 216, 216);"
//                   }
//                          }
//             that.dyList = list3
//              that.machineIdList2=list2
//              //console.log(str)
//             //console.log(str.split(','))
//             let key=str.split(',')
    
//             let l = []
//             let k = [{
//                 name: key[0],
//                 type: 'line',
//                 yAxisIndex: 0,
//                 markLine: {
//                   symbol: ['none', 'image://https://s1.ax1x.com/2020/08/10/abCVjf.png'], //去掉箭头
//                   symbolSize: [15, 15],
//                   itemStyle: {
//                     normal: {
//                       lineStyle: { //全局的样式
//                         type: 'dashed',

//                       },
//                     }
//                   },
//                   data: [{
//                       yAxis: 20000,

//                       itemStyle: {
//                         normal: {
//                           color: 'red'
//                         }
//                       },
//                       label: { // 线条提示字体
//                         show: false,
//                         position: 'end',

//                         color: '#ff3040'
//                       }
//                     },
//                     {
//                       yAxis: 5000,
//                       itemStyle: {
//                         normal: {
//                           color: 'blue'
//                         }
//                       },
//                       label: {
//                         show: false,
//                         position: 'end',
//                         formatter: '越限下线',
//                         color: '#ff3040'
//                       }
//                     }
//                   ]
//                 },
//                 data: []
//               },
//               {
//                 name: key[1],
//                 type: 'line',
//                 yAxisIndex: 0,
//                 data: []
//               },
//               {
//                 name: key[2],
//                 type: 'line',
//                 yAxisIndex: 0,
//                 data: []
//               },

//             ]
           
//             let date = new Date();
//             let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
//             let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
//             l.push(hour + ":" + minute)
       
//             for (let i = 0; i < k.length; i++) {  
//                for(let j=0;j<that.dyList.length;j++){
//            if(k[i].name==that.dyList[j].mac_id){
// k[i].data.push(that.dyList[j].spindle_speed)
//            }
      
//             }
              
//             }
//             that.time2 = l
//             that.speed2 = k
  
             
//             const timer = setInterval(() => {
//               let date = new Date();
//               let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
//               let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
//               l.push(hour + ":" + minute)
//               if (l.length > 6) {
//                 l.shift()
//               }
               
//      axios({
//             url: host1 + '/report/getSimpleReport',
//             method: 'post',
//             headers: {
//               'Content-Type': 'application/json',
//               'companyId': 0
//             },
//             data: {

//               tableName: "cushaji",
//               sort: "DESC",
//                sortColumn: "spindle_speed",


//             }

//           })

//           .then(response => {
//             let pp=response.data.data
//          for(let i=0;i<pp.length;i++){
//                axios({
//                   url: host1 + '/report/getSimpleReport',
//                   method: 'post',
//                   headers: {
//                     'Content-Type': 'application/json',
//                     'companyId': 0
//                   },
//                   async: true, // fasle表示同步请求，true表示异步请求
//                   data: {

//                     tableName: "machine_list",
//                     sort: "DESC",
//                     //  selectFields:response.data.data[i].machine_ip
//                     query: {
//                       "mac_ip":pp[i].machine_ip
//                     }

//                   }

//                 })
//                 .then(response => {
//                   pp[i].mac_id=response.data.data[0].mac_id
//                 })      .then(()=>{
           
//                 for (let i = 0; i < k.length; i++) {
//                 if (k[i].data.length > 6) {
//                   k[i].data.shift()
//                 }
              
    
//                   for (let j = 0; j < pp.length; j++) {
//                       //  //console.log(that.qllList[j].mac_id)
//                       // //console.log(k[i].name)
//                     if (k[i].name == pp[j].mac_id) {
                   
//                       k[i].data.push(pp[j].spindle_speed)
//                     }
//                   }
                





//               }

//               that.time2 = l
//               that.speed2 = k
//               let myChart1 = this.$echarts.init(document.getElementById('echart2'));
//               myChart1.setOption(that.option2)
//              })
//          }
//           })




          
//             }, 60000);
     
//             that.echart2(key)
            
//             })

//             }
       
          
//           })
//       },
                 equalArr2(arr,arrs){
        let arr1=[]
        let arr2=[]
           for(let i=0;i<arr.length;i++){
             arr1.push(arr[i].mac_id)
           }
              for(let i=0;i<arrs.length;i++){
             arr2.push(arrs[i].mac_id)
           }
      for(let i=0;i<arr1.length;i++){
        if(arr2.indexOf(arr1[i])==-1){
          return false
          
        }
      }
      return true
      },
      gethourarr(num) {
        let arr = []
        let arr2 = []
        for (let i = 0; i < num; i++) {
          let d = new Date(new Date().getTime() - i * 60 * 60 * 1000);

          let year = d.getFullYear();
          let mon = d.getMonth() + 1;
          let dd = d.getDate();
          let hh = d.getHours();
          let mm = d.getMinutes();
          let ss = d.getSeconds();

          //如果月，日，时，分，秒的值小于10，则在其前面加0
          mon = this.checkTime(mon);
          dd = this.checkTime(dd);
          hh = this.checkTime(hh);
          mm = this.checkTime(mm);
          ss = this.checkTime(ss);

          let str = year + '-' + mon + '-' + dd + ' ' + hh + ":00:00"

          arr.push(str)
        }
        for (let i = arr.length - 1; i >= 0; i--) {
          arr2.push(arr[i])
        }
        return arr2
      },
      checkTime(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      },
          // 对象排序
      sortByKey(array, key) {
        return array.sort(function (a, b) {
          let x = a[key];
          let y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      },
           echart(key, xlist, series) { //每台自络机产量对比
        let myChart1 = this.$echarts.init(document.getElementById('echart1'));
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
          color: ['#FF0000', '#FF00DD', '#00D8D8'],
            legend: {
            data: ["设备号 "+key[0].mac_id.substr(5,2), "设备号 "+key[1].mac_id.substr(5,2), "设备号 "+key[2].mac_id.substr(5,2), ],
            itemWidth: 25,
            itemHeight: 14,
            top: "4%",
            right: "0%",
            textStyle: {
              color: "white",
              fontSize: 16,
              fontStyle: "normal"
            }
          },
          grid: {
            bottom: "15%",
            top: "30%",
            right: "5%"
          },

          xAxis: [{
            type: 'category',
            data: xlist,
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#949494",
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
              name: '转速 r/min',
              // min: 0,
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
          series: series
        };
        that.option = option
        //console.log(option)
        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },
      echart2(key, xlist, series) { //每台自络机产量对比
        let myChart1 = this.$echarts.init(document.getElementById('echart2'));
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
          color: ['#FF0000', '#FF00DD', '#00D8D8'],
               legend: {
            data: ["设备号 "+key[0].mac_id.substr(5,2), "设备号 "+key[1].mac_id.substr(5,2), "设备号 "+key[2].mac_id.substr(5,2), ],
            itemWidth: 25,
            itemHeight: 14,
            top: "4%",
            right: "0%",
            textStyle: {
              color: "white",
              fontSize: 16,
              fontStyle: "normal"
            }
          },
          grid: {
            bottom: "15%",
            top: "30%",
            right: "5%"
          },

          xAxis: [{
            type: 'category',
            data: xlist,
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#949494",
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
              name: '转速 r/min',
              // min: 0,
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
          series: series
        };
        that.option2 = option
        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },


    },




    filters: {

    },
    mounted() {

    
      this.getdata()
      this.getdata2()
      this.getshebei()
      
      this. getcushuji3()
   
   
this.changeWorkshopTiming()
    },
    beforeDestroy() {

            if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
        if (this.timer2) {
        clearInterval(this.timer2); // 在Vue实例销毁前，清除我们的定时器
      }
      if (this.timer3) {
        clearInterval(this.timer3); // 在Vue实例销毁前，清除我们的定时器
      }
      if (this.timer4) {
        clearInterval(this.timer4); // 在Vue实例销毁前，清除我们的定时器
      }
    }
  }

</script>

<style scoped>
  span {
    text-align: center;
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

  .board {
    width: 100%;
    height: 92%;
    /* height: 71%; */

    display: flex;
    justify-content: center;

  }

  .board_con {
    width: 91%;
    height: 93%;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;


  }

  .board_con_left {
    width: 46%;
    height: 100%;

    display: flex;
    flex-direction: column;


  }

  .board_con_right {
    width: 46%;
    height: 100%;

    display: flex;
    flex-direction: column;


  }

  .title2 {
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3%;
  }

  .table {
    width: 100%;
    height: 32%;

  }

  .table_title {
    width: 100%;
    height: 35px;
    background: #2977CE;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.15rem;
  }

  .table_title2 {
    width: 100%;
    height: 35px;
    background: #2977CE;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.15rem;
  }

  .table_head {
    width: 100%;
    height: 17%;
    background: rgba(5, 31, 60, 1);
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.8rem;
  }

  .table_head span {
    width: 20%;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .table_content {
    overflow: auto;
    width: 100%;
    height: 66%;
  }

  .table_con {
    width: 100%;
    height: 27%;
    background: #000000;
    display: flex;
    justify-content: space-around;
    align-items: center;
       font-size: 1.4rem;
  }

  .table_con span {
    width: 20%;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .table_con2 {
    width: 100%;
    height: 37%;
    background: rgba(5, 31, 60, 1);
    display: flex;
    justify-content: space-around;
    align-items: center;
       font-size: 1.4rem;
  }

  .table_con2 span {
    width: 20%;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .echart {
    width: 100%;
    height: 45%;

  }

  .echart_con {
    width: 100%;
    height: 90%;
    background: rgba(5, 31, 60, 1);

  }

  .fangkuai {

    width: 40%;
    height: 100%;
    background: rgba(5, 31, 60, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
  }

  .image-border {
    position: absolute;
    width: 12px;
    height: 12px;
  }

  .image-border1 {
    top: 0;
    left: 0;
    border-left: 2px solid #00F3FC;
    border-top: 2px solid #00F3FC;
  }

  .image-border2 {
    top: 0;
    right: -2px;
    border-right: 2px solid #00F3FC;
    border-top: 2px solid #00F3FC;
  }

  .image-border3 {
    bottom: 0;
    left: 0;
    border-bottom: 2px solid #00F3FC;
    border-left: 2px solid #00F3FC;
  }

  .image-border4 {
    bottom: 0;
    right: -2px;
    border-right: 2px solid #00F3FC;
    border-bottom: 2px solid #00F3FC;
  }

</style>
