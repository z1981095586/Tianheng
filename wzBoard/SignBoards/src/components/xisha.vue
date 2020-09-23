<template>
  <div class="content">
    <header style="height: 3rem">
      <div class="title">万舟纺纱信息化监控平台-细纱机</div>

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
              <span style="color:#FFFF00;font-size:2rem; font-family: 'let';">{{zcl}}</span>
            </div>
            <div class="fangkuai">
              <div class="image-border image-border1"></div>
              <div class="image-border image-border2"></div>
              <div class="image-border image-border3"></div>
              <div class="image-border image-border4"></div>
              <span style="font-size:1rem;margin-bottom:1rem">昨日产量</span>
              <span style="color:#00FFDC;font-size:2rem; font-family: 'let';">{{shift_yieldSum}}</span>
            </div>
          </div>
          <div class="table">
            <div class="table_title"><span>罗拉转速排行</span></div>
            <div class="table_head"><span>罗拉转速</span><span>设备</span><span>滚盘直径</span><span>锭盘直径</span><span>细纱号数</span>
            </div>
            <div class="table_content">
              <div :class="item.class" :style="item.styles" v-for="(item,index) in qllList" :key="index"><span
                  :style="item.style2">{{item.spindle_speed}}</span><span>#{{item.mac_id}}</span><span>{{item.wharve_diameter}}</span><span>{{item.rolled_plate_diameter}}</span><span>{{item.yarn_number}}</span>
              </div>

            </div>
          </div>
          <div class="echart">
            <div class="table_title2"><span>罗拉转速实时预警</span></div>
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
              <span style="color:#FFFF00;font-size:2rem; font-family: 'let';">{{currentLength}}</span>
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
            <div class="table_title"><span>锭子转速排行</span></div>
            <div class="table_head"><span>锭字转速</span><span>设备</span><span>滚盘直径</span><span>锭盘直径</span><span>细纱号数</span>
            </div>
            <div class="table_content">
              <div :class="item.class" :style="item.styles" v-for="(item,index) in dyList" :key="index"><span
                  :style="item.style2">{{item.rolled_speed}}</span><span>#{{item.mac_id}}</span><span>{{item.wharve_diameter}}</span><span>{{item.rolled_plate_diameter}}</span><span>{{item.yarn_number}}</span>
              </div>


            </div>
          </div>
          <div class="echart">
            <div class="table_title2"><span>锭子转速实时预警</span></div>
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
    name: "xisha",
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
        shift_yieldSum: null,
        currentLength: null,
        sbyzl: null,
        option2: {},
        zcl: null
      }
    },
    methods: {
      changeWorkshopTiming: function () {
        this.timer = setInterval(() => {

          this.getCurrent();
     
          this.getshebei()
          // this.getzuori()

          //  this.getdata()
        }, 5000);
        // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
        // this.$once('hook:beforeDestroy', () => {
        //   clearInterval(timer);
        // })
      },
      getzong() { //获取总产量
        let that = this


        let k = 0;
        axios({
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': 0
            },
            data: {

              tableName: "xishajiAllTotal",


            }

          })
          .then(response => {

            k = response.data.data[0].month_all_total + that.currentLength
            //////console.log(response.data.data[0].month_all_total)
            //////console.log(that.currentLength)
            that.zcl = k
            that.shift_yieldSum=response.data.data[0].yesterday_total//获取昨日产量

          })

      },
      // getzuori() { //获取昨日产量
      //   let that = this
      //   let day1 = new Date();
      //   day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
      //   let month = ""
      //   let dates = ""
      //   if ((day1.getMonth() + 1) < 10) {
      //     month = "0" + String(day1.getMonth() + 1)
      //   } else {
      //     month = String(day1.getMonth() + 1)
      //   }
      //   if ((day1.getDate()) < 10) {

      //     dates = "0" + String(day1.getDate())
      //   } else {
      //     dates = String(day1.getDate())
      //   }
      //   //////console.log(dates)
      //   let s1 = day1.getFullYear() + "-" + month + "-" + dates;
      //   axios({
      //       url: host1 + '/report/getSimpleReport',
      //       method: 'post',
      //       headers: {
      //         'Content-Type': 'application/json',
      //         'companyId': 0
      //       },
      //       data: {

      //         tableName: "xishajiDailyOutput",
      //         query: {
      //           shift_date: s1
      //         }

      //       }

      //     })
      //     .then(response => {
      //       //////console.log(response)
      //       let sum = 0
      //       for (let i = 0; i < response.data.data.length; i++) {
      //         response.data.data[i].shift_yield = parseInt(response.data.data[i].shift_yield)
      //         sum = sum + response.data.data[i].shift_yield
      //       }
      //       that.shift_yieldSum = sum
      //     })
      // },
      getshebei() { //获取设备运转率
        let that = this
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
            let sum = 0; //故障台数
            for (let i = 0; i < response.data.data.length; i++) {
              if ((response.data.data[i].spindle_speed == 0) && (response
                  .data.data[i].rolled_speed == 0)) {
                sum = sum + 1
              }
            }
            that.sbyzl = (((response.data.data.length - sum) / response.data.data.length).toFixed(5) * 100).toFixed(1)

          })
      },
      getCurrent() { //获取当前产量
        let that = this
        axios({
            url: 'http://120.55.124.53:8000/wanzhou/xishaji/currentOutput',
            method: 'get',
            headers: {
              'Content-Type': 'application/json',

            },
            data: {




            }

          })
          .then(response => {

            that.currentLength = response.data.xishaCurrentTotal
            that.getzong()
          })
      },
      getdata2() { // 钉子
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
              tableName: "xishaji",
              sort: "DESC",
              sortColumn: "rolled_speed+0",
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
                name: "设备号 " + pmList[0].mac_id.substr(5, 2),
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
                name: "设备号 " + pmList[1].mac_id.substr(5, 2),
                type: 'line',
                yAxisIndex: 0,
                data: []
              },
              {
                name: "设备号 " + pmList[2].mac_id.substr(5, 2),
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

                      tableName: "xishaji_rolled_speed xr",

                      query: {
                        machine_id: pmList[i].mac_id,
                        "xr.current_time": rhour[j]
                      }


                    }

                  })

                  .then(response => {

                    if (response.data.data.length == 0) {
                      //console.log(response)
                      series[i].data[j] = 0
                    } else {
                      series[i].data[j] = parseInt(response.data.data[0].rolled_speed)
                    }


                  })
              }

            }

            for (let i = 0; i < rhour.length; i++) {
              xlist.push(rhour[i].substr(11, 5))
            }
            //  for (let i = 0; i < rhour.length; i++) {
            //            //console.log(new Date(rhour[i]).getTime())
            //           }
            setTimeout(() => {
              that.echart2(pmList, xlist, series)
              //console.log(pmList)
              this.timer3 = setInterval(() => {
                for (let i = 0; i < 3; i++) {
                  axios({ //罗拉转速处理
                      url: host1 + '/report/getSimpleReport',
                      method: 'post',
                      headers: {
                        'Content-Type': 'application/json',
                        'companyId': 0
                      },
                      data: {

                        tableName: "xishaji",
                        query: {
                          mac_id: pmList[i].mac_id
                        }


                      }

                    })
                    .then(response => {
                      //console.log(response)
                      if (response.data.data.length == 0) {
                        //console.log(response)
                        series[i].data.push(0)
                      } else {
                        series[i].data.push(parseInt(response.data.data[0].rolled_speed))
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
        that.timer4 = setInterval(() => { //每小时获取排名
          axios({ //罗拉转速排名
              url: host1 + '/report/getSimpleReport',
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                'companyId': 0
              },
              data: {

                tableName: "xishaji",
                sort: "DESC",
                sortColumn: "rolled_speed+0",


              }

            })
            .then(response => {


              let arr = []
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

              if (that.equalArr2(arr, that.dyList) == true) {
                //console.log("排名不变，继续刷新")
              } else {
                //console.log("排名变化，关闭统计图刷新定时器，关闭获取排名的定时器，清空统计图和排名列表")
                //  that.qllList = arr
                that.time3 = clearInterval(that.timer3) //关闭统计图定时器
                that.time4 = clearInterval(that.timer4) //关闭获取排名定时器
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

              tableName: "xishaji",
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
            that.qllList = pmList

            let rhour = that.gethourarr(5)

            let series = [{
                name: "设备号 " + pmList[0].mac_id.substr(5, 2),
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
                name: "设备号 " + pmList[1].mac_id.substr(5, 2),
                type: 'line',
                yAxisIndex: 0,
                data: []
              },
              {
                name: "设备号 " + pmList[2].mac_id.substr(5, 2),
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

                      tableName: "xishaji_lola_speed xr",

                      query: {
                        machine_id: pmList[i].mac_id,
                        "xr.current_time": rhour[j]
                      }


                    }

                  })

                  .then(response => {


                    if (response.data.data.length == 0) {
                      //console.log(response)
                      series[i].data[j] = 0
                    } else {
                      series[i].data[j] = parseInt(response.data.data[0].spindle_speed)
                    }
                  })
              }

            }
            for (let i = 0; i < rhour.length; i++) {
              xlist.push(rhour[i].substr(11, 5))
            }

            setTimeout(() => {
              that.echart(pmList, xlist, series)

              this.timer2 = setInterval(() => {
                for (let i = 0; i < 3; i++) {
                  axios({ //罗拉转速处理
                      url: host1 + '/report/getSimpleReport',
                      method: 'post',
                      headers: {
                        'Content-Type': 'application/json',
                        'companyId': 0
                      },
                      data: {

                        tableName: "xishaji",
                        query: {
                          // mac_id: series[i].name
                          mac_id: pmList[i].mac_id
                        }


                      }

                    })
                    .then(response => {

                      if (response.data.data.length == 0) {
                        //console.log(response)
                        series[i].data.push(0)
                      } else {
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
                  let myChart1 = this.$echarts.init(document.getElementById('echart1'));

                  myChart1.setOption(that.option)
                }, 1000);
              }, 180000);


            }, 1000);
          })
        // let a=[{mac_id:12},{mac_id:1},{mac_id:2}]
        // let b=[{mac_id:12},{mac_id:1},{mac_id:2}]
        // //console.log(that.equalArr2(a,b))
        that.timer3 = setInterval(() => { //每小时获取排名
          axios({ //罗拉转速排名
              url: host1 + '/report/getSimpleReport',
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                'companyId': 0
              },
              data: {

                tableName: "xishaji",
                sort: "DESC",
                sortColumn: "spindle_speed+0",


              }

            })
            .then(response => {


              let arr = []
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
              if (that.equalArr2(arr, that.qllList) == true) {
                //console.log("排名不变，继续刷新")
              } else {
                //console.log("排名变化，关闭统计图刷新定时器，关闭获取排名的定时器，清空统计图和排名列表")
                //  that.qllList = arr
                that.time2 = clearInterval(that.timer2) //关闭统计图定时器
                that.time3 = clearInterval(that.timer3) //关闭获取排名定时器
                let myChart1 = that.$echarts.init(document.getElementById('echart1'));

                myChart1.clear()
                that.getdata() //重新执行函数


              }

            })
        }, 36000000);
        //  this.timer2=setInterval(() => {

        //   }, 360000);

        //        let lists=[]
        //           let list = []
        //             let list2=[]
        //             let str=""
        //             setTimeout(() => {


        //           list2=[]
        //           str=""
        //           list = []
        //         axios({ //罗拉转速处理
        //             url: host1 + '/report/getSimpleReport',
        //             method: 'post',
        //             headers: {
        //               'Content-Type': 'application/json',
        //               'companyId': 0
        //             },
        //             data: {

        //               tableName: "xishaji",
        //               sort: "DESC",
        //               sortColumn: "spindle_speed",


        //             }

        //           })
        //           .then(response => {

        //             let datas = response

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
        //              datas.data.data[i].spindle_speed=parseInt(  datas.data.data[i].spindle_speed)
        //                   datas.data.data[i].mac_id = response.data.data[0].mac_id
        //                   list.push(datas.data.data[i])
        //                  list2.push(response.data.data[0].mac_id) //前三台设备id列表
        // str=str+response.data.data[0].mac_id+","
        //                 })
        //                        .then(()=>{
        //                               list=that.sortByKey(list,"spindle_speed")
        //                          let list3=[]
        //                          //////console.log(list)
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
        //              that.machineIdList=list2
        //              ////////console.log(str)
        //             ////////console.log(str.split(','))
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


        //             that.time = l
        //             that.speed = k

        //  let rhour=that. gethourarr(5)
        //  for(let i=0;i<rhour.length;i++){
        //    l.push(rhour[i])
        //  }


        //  for(let i=0;i<list2.length;i++){
        //    for(let j=0;j<l.length;j++){
        //           axios({ 
        //             url: host1 + '/report/getSimpleReport',
        //             method: 'post',
        //             headers: {
        //               'Content-Type': 'application/json',
        //               'companyId': 0
        //             },
        //             data: {

        //               tableName: "xishaji_lola_speed xr",

        //               query:{
        //                 machine_id:list2[i],
        //                 "xr.current_time":l[j]
        //               }


        //             }

        //           })

        //           .then(response => {
        //    // //console.log(response.data.data)
        //         if(response.data.data.length==0){
        //                 for(let l=0;l<k.length;l++){
        //               if(list2[l]==k[l].name){
        //                 k[l].data.push(0)

        //               }
        //             }
        //         }else{
        //               for(let m=0;m<k.length;m++){
        //               if(response.data.data[0].machine_id==k[m].name){
        //                 k[m].data.push(parseInt(response.data.data[0].spindle_speed))

        //               }
        //             }
        //         }

        //           })
        //    }
        //  }
        // setTimeout(() => {
        //    //console.log(k[0].data.length)
        // if(k[0].data.length==5){

        //     that.time = l
        //               that.speed = k
        //               let myChart1 = this.$echarts.init(document.getElementById('echart1'));

        //               myChart1.setOption(that.option)
        // }
        // }, 1000);


        //       that.timer4 = setInterval(() => {
        //               let date = new Date();
        //               let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        //               let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        //               // l.push(hour + ":" + minute)
        //               if(minute=="00"){
        //                 l.push(hour + ":" + minute)
        //               }else{
        //                 l.push("")
        //               }
        //               // if (l.length > 6) {
        //               //   l.shift()
        //               // }

        //      axios({ //前罗拉转速处理
        //             url: host1 + '/report/getSimpleReport',
        //             method: 'post',
        //             headers: {
        //               'Content-Type': 'application/json',
        //               'companyId': 0
        //             },
        //             data: {

        //               tableName: "xishaji",
        //               sort: "DESC",
        //               sortColumn: "spindle_speed",


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
        //                 // if (k[i].data.length > 6) {
        //                 //   k[i].data.shift()
        //                 // }


        //                   for (let j = 0; j < pp.length; j++) {
        //                       //  ////////console.log(that.qllList[j].mac_id)
        //                       // ////////console.log(k[i].name)
        //                     if (k[i].name == pp[j].mac_id) {

        //                       k[i].data.push(pp[j].spindle_speed)
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

        //                 setTimeout(() => {

        //                           if(lists.length==0){

        //               lists=list2
        //             }else{
        //               let flag=true

        //               for(let i=0;i<list2.length;i++){
        //                 if(lists.indexOf(list2[i])==-1){

        //                        flag=false
        //                        break
        //                 }else{
        //                   flag=true
        //                 }
        //               }


        //               if(flag==true){
        //                 //console.log("继续")

        //               }else{
        //                 //console.log("变了")
        //                 clearInterval(that.timer5)
        //                      clearInterval(that.timer4)
        //                 that.qllList=[]
        //               let myChart1 = this.$echarts.init(document.getElementById('echart1'));
        //         // 绘制图表
        //         myChart1.clear();
        //         that.getdata()


        //               }
        //             }
        //                 }, 1500);



        //           })
        //         },1000)
        //         that.timer5 = setInterval(() => {
        //           list2=[]
        //           str=""
        //           list = []
        //         axios({ //罗拉转速处理
        //             url: host1 + '/report/getSimpleReport',
        //             method: 'post',
        //             headers: {
        //               'Content-Type': 'application/json',
        //               'companyId': 0
        //             },
        //             data: {

        //               tableName: "xishaji",
        //               sort: "DESC",
        //               sortColumn: "spindle_speed",


        //             }

        //           })
        //           .then(response => {

        //             let datas = response

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
        //              datas.data.data[i].spindle_speed=parseInt(  datas.data.data[i].spindle_speed)
        //                   datas.data.data[i].mac_id = response.data.data[0].mac_id
        //                   list.push(datas.data.data[i])
        //                  list2.push(response.data.data[0].mac_id) //前三台设备id列表
        // str=str+response.data.data[0].mac_id+","
        //                 })
        //                        .then(()=>{


        //             })

        //             }

        //                 setTimeout(() => {
        //                           if(lists.length==0){
        //               lists=list2
        //             }else{
        //               let flag=true

        //               for(let i=0;i<list2.length;i++){
        //                 if(lists.indexOf(list2[i])==-1){

        //                        flag=false
        //                        break
        //                 }else{
        //                   flag=true
        //                 }
        //               }


        //               if(flag==true){
        //                 ////console.log("继续")

        //               }else{
        //                 ////console.log("变了")
        //                 clearInterval(that.timer5)
        //                      clearInterval(that.timer4)
        //                 that.qllList=[]
        //               let myChart1 = this.$echarts.init(document.getElementById('echart1'));
        //         // 绘制图表
        //         myChart1.clear();
        //         that.getdata()


        //               }
        //             }
        //                 }, 1000);



        //           })
        //         },12000)

        //         axios({ //锭翼转速(r/min)处理
        //             url: host1 + '/report/getSimpleReport',
        //             method: 'post',
        //             headers: {
        //               'Content-Type': 'application/json',
        //               'companyId': 0
        //             },
        //             data: {

        //               tableName: "xishaji",
        //               sort: "DESC",
        //               sortColumn: "rolled_speed",


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

        //                   datas.data.data[i].mac_id = response.data.data[0].mac_id
        //                   datas.data.data[i].rolled_speed=parseInt(datas.data.data[i].rolled_speed)
        //                   list.push(datas.data.data[i])
        //                   list2.push(response.data.data[0].mac_id) //前三台设备id列表
        //                   str=str+response.data.data[0].mac_id+","
        //                 })
        //                      .then(()=>{

        //                             list=that.sortByKey(list,"rolled_speed")
        //                             ////////console.log(list)
        //                          let list3=[]
        //                          for(let i=list.length-1;i>=0;i--){
        // list3.push(list[i])
        //                          }
        //                                for(let i=0;i<list3.length;i++){
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

        //                          ////////console.log(list3)
        //             that.dyList = list3
        //              that.machineIdList2=list2
        //              ////////console.log(str)
        //             ////////console.log(str.split(','))
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
        // k[i].data.push(that.dyList[j].rolled_speed)
        //            }

        //             }

        //             }
        //             that.time2 = l
        //             that.speed2 = k


        //             that.timer3 = setInterval(() => {
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

        //               tableName: "xishaji",
        //               sort: "DESC",
        //                sortColumn: "rolled_speed",


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
        //                       //  ////////console.log(that.qllList[j].mac_id)
        //                       // ////////console.log(k[i].name)
        //                     if (k[i].name == pp[j].mac_id) {

        //                       k[i].data.push(pp[j].rolled_speed)
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
      },
      equalArr(arr1, arr2) {


        for (let i = 0; i < arr1.length; i++) {
          if (arr2.indexOf(arr1[i]) == -1) {
            return false

          }
        }
        return true
      },
      equalArr2(arr, arrs) {
        let arr1 = []
        let arr2 = []
        for (let i = 0; i < arr.length; i++) {
          arr1.push(arr[i].mac_id)
        }
        for (let i = 0; i < arrs.length; i++) {
          arr2.push(arrs[i].mac_id)
        }
        for (let i = 0; i < arr1.length; i++) {
          if (arr2.indexOf(arr1[i]) == -1) {
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
            data: ["设备号 " + key[0].mac_id.substr(5, 2), "设备号 " + key[1].mac_id.substr(5, 2), "设备号 " + key[2].mac_id
              .substr(5, 2),
            ],
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
            data: ["设备号 " + key[0].mac_id.substr(5, 2), "设备号 " + key[1].mac_id.substr(5, 2), "设备号 " + key[2].mac_id
              .substr(5, 2),
            ],
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
        //console.log(option)
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
     

      this.getCurrent()
      // this.getzuori()
      this.getshebei()
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
