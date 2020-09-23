<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="content4">

    <header>
      <div class="title">{{companyname}}智能纺织-验布机</div>
      <h1 class="tip">




      </h1>
    </header>
    <div class="monitor">
      <div class="monitor_left">

        <div class="monitor_left_top">
          <div class="img">
            <div class="img_con"><a href="http://47.99.156.243:81/qxSignBoard/#/productMonitor2/10000012"
                style="   font-size: 1rem;color: #5D7091;text-decoration:none">{{companyname}}智能纺织</a>
              <div class="jiantou"></div><span style="margin-right:1rem">验布机</span>
            </div>
          </div>

        </div>
        <div class="monitor_left_mid">
          <div class="echart" id="echart1"></div>
        </div>
        <div class="monitor_left_bot">
          <div class="card2">

          </div>
          <div class="card7">
            <div class="card6_con">
              <span style="font-size:0.6rem;color:#00FF99;margin-top:1rem">浙江省{{companyname}}有限公司</span>
              <!-- <span style="color:#FFF700;font-size:1.1rem; margin-top:0.5rem  ">验布机总数：{{jsjzs}}</span> -->
               <span style="color:#FFF700;font-size:1.1rem; margin-top:0.5rem  ">验布机总数：10</span> 
            </div>
          </div>
        </div>
      </div>
      <div class="monitor_right">
        <div class="circle_con">
          <div class="circles">
            <div class="card5">
              <div class="card5_con">
                <span class="jin">今</span>
                <span class="zong">今日疵点总数</span>
                <!-- <span class="num">{{ lacksum}}</span> -->
                        <span class="num">36</span>
              </div>
            </div>
            <div class="card4">
              <div class="card4_con">
                <span class="jin">昨</span>
                <span class="zong">昨日验布米数</span>
                <!-- <span class="num" style="color:#00FF08;right:1.2rem">{{yersum}}</span> -->
                <span class="num" style="color:#00FF08;right:1.2rem">83461</span>
           
              </div>
            </div>
            <div class="font"><span style="font-size:0.9rem;color:white">今日验布米数
              </span>
              <!-- <span style="font-size:1.1rem;color:#EEFF00">{{daysum}}</span> -->
                <span style="font-size:2.3rem;color:#EEFF00">{{jsj}}</span>
              </div>
          </div>
        </div>
        <div class="echart2" id="echart2"></div>
      </div>
    </div>
    <div class="bottom_font"><span>Copyright © 浙江天衡信息技术有限公司</span></div>
  </div>
</template>

<script>
  import axios from 'axios';
  // import {
  //   formatDate
  // } from "../static/js/date"; //引入时间格式化js
  export default {
    name: "yb",
    data() {
      return {
        timer: null,
        timer2:null,
        companyId: this.$route.params.id, //公司库表Id
        workshop_id: "",
        companyname:"",
        jsjzs: null,
        daysum: null,
        lacksum: null,
        yersum: null,
        jsj:21392
      }
    },
    methods: {
      getdate(date) {

        // // 获取当前日期
        // var date = new Date();

        // 获取当前月份
        var nowMonth = date.getMonth() + 1;

        // 获取当前是几号
        var strDate = date.getDate();

        // 添加分隔符“-”
        var seperator = "-";

        // 对月份进行处理，1-9月在前面添加一个“0”
        if (nowMonth >= 1 && nowMonth <= 9) {
          nowMonth = "0" + nowMonth;
        }

        // 对月份进行处理，1-9号在前面添加一个“0”
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }

        // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
        var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
        return nowDate;
      },
      getyb() {
        let that = this
        let xlist = []
        let ylist = []
        let ylist2 = []
        let list = []
        const yestoday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        let date = new Date()

        ////console.log(that.getdate(yestoday))
        ////console.log(that.getdate(date))
        ////console.log(that.companyId)
        ////console.log(that.workshop_id)
        axios({ //今日验布
            url: 'http://47.99.156.243:8227/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },

            data: {

              tableName: "exam_defect_his",
              selectLikeFields: {
                update_time: that.getdate(date)
              },
              groupByColumn: ["user_id1"],
              selectFields: ["sum(yield) as sum", "user_id1"]





            }

          })
          .then(response => {
   
            for (let i = 0; i < response.data.data.length; i++) {
              axios({
                  url: 'http://47.99.156.243:8227/report/getSimpleReport',
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json',
                    'companyId': that.companyId
                  },

                  data: {

                    tableName: "s_staff",
                    query: {
                      id: response.data.data[i].user_id1
                    }





                  }

                })
                .then(res => {
                  response.data.data[i].staff_name = res.data.data[0].staff_name
                  xlist.push(res.data.data[0].staff_name)
                })
            }
            for (let i = 0; i < response.data.data.length; i++) {
              list.push(response.data.data[i])

            }

          }).then(() => {
    
            let list2 = that.sortByKey(list, "sum")

            let arr = []
  //console.log(list2)
 if(list2.length>0){
              for (let j = list2.length - 1; j >= list2.length - 5; j--) {
              arr.push(list2[j])
            
                ylist.push(list2[j].sum)
// if(typeof(list2[j].sum) == "undefined"){
//  ylist.push(0)
// }else{
//   ylist.push(list2[j].sum)
// }

             
            }
 }
            ////console.log(arr)
      

            for (let i = 0; i < arr.length; i++) {


              axios({ //昨日验布
                  url: 'http://47.99.156.243:8227/report/getSimpleReport',
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json',
                    'companyId': that.companyId
                  },

                  data: {

                    tableName: "exam_defect_his",
                    selectLikeFields: {
                      update_time: that.getdate(yestoday)
                    },
                    query: {
                      user_id1: arr[i].user_id1
                    },
                    selectFields: ["sum(yield) as sum", ]





                  }

                })
                .then(response => {
                       if(!response.data.data[0]){
                 ylist2[i] =0
                    }else{
                       ylist2[i] = response.data.data[0].sum
                         
                    }
                
                })
            }
            setTimeout(() => {
              // that.echart2(xlist, ylist, ylist2)
              //console.log(xlist)
              //console.log(ylist)
              //console.log(ylist2)
              let name = xlist[0]
              //console.log(name)

              that.echart2(xlist, ylist, ylist2, name)
            }, 1000);

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
      getElertic() {

        let ylist4 = []
        let that = this;
        let datelist = that.gethourarr(6);
        // axios({
        //     url: 'http://47.99.156.243:8227/report/getSimpleReport',
        //     method: 'post',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'companyId': that.companyId
        //     },

        //     data: {

        //       tableName: "looplist_info",


        //       query: {
        //         'workshop_id': that.workshop_id,
        //         'name': '成品车间'
        //       },



        //     }

        //   })
        //   .then(response => {
        //   //console.log(response)
            //////console.log(that.gethourarr(6))

            // for (let i = 0; i < response.data.data.length; i++) {

            //   for (let j = 0; j < datelist.length; j++) {
            //     axios({
            //         url: 'http://47.99.156.243:8227/report/getSimpleReport',
            //         method: 'post',
            //         headers: {
            //           'Content-Type': 'application/json',
            //           'companyId': that.companyId
            //         },

            //         data: {

            //           tableName: "electric_history_h",


            //           query: {
            //             looplistId: response.data.data[i].id

            //           },
            //           selectLikeFields: {
            //             startTime: datelist[j]
            //           }


            //         }

            //       })
            //       .then(response => {
            //      //console.log(response.data.data)
            //         //////console.log(datelist[j])
            //         if (response.data.data.length == 0) { //说明那天日期的电为0
            //           ylist4[j] = 0
            //         } else {
            //           ylist4[j] = parseInt(response.data.data[0].electric)
            //         }
            //       })
            //   }

            // }


         
              ////console.log(datelist)
              let xlist = []
              let ylist3 = []
              for (let i = 0; i < datelist.length; i++) {
                xlist.push((datelist[i].substr(11, 2) + ":00"))
              }
              let datelist2 = []
              for (let i = 0; i < datelist.length; i++) {
                //  if(datelist[i].substr(11,2))

                let obj = {}
                let endTime = ""
                let hour = ""
                let k = parseInt(datelist[i].substr(11, 2))
                let k2 = datelist[i].substr(0, 11)
                if (k + 1 > 24) {
                  endTime = k2 + "00"
                } else {
                  endTime = k2 + String(k + 1)
                }
                datelist2.push({
                  startTime: datelist[i],
                  endTime: endTime
                })



              }
              for (let i = 0; i < datelist2.length; i++) {
                let sum = 0
                axios({
                    url: 'http://47.99.156.243:8227/report/getSimpleReport',
                    method: 'post',
                    headers: {
                      'Content-Type': 'application/json',
                      'companyId': that.companyId
                    },

                    data: {

                      tableName: "exam_defect",


                      selectFields: ['sum(yield) as sum', "update_time"],
                      selectLikeFields: {
                        update_time: datelist2[i].startTime,

                      }


                    }

                  })
                  .then(response => {
                    if(!response.data.data[0]){
              sum = sum + 0
                    }else{
                         sum = sum + response.data.data[0].sum
                                 
                    }
      

                  }).then(() => {
                    axios({
                        url: 'http://47.99.156.243:8227/report/getSimpleReport',
                        method: 'post',
                        headers: {
                          'Content-Type': 'application/json',
                          'companyId': that.companyId
                        },

                        data: {

                          tableName: "exam_defect",


                          selectFields: ['sum(yield) as sum', "update_time"],
                          selectLikeFields: {
                            update_time: datelist2[i].endTime,

                          }


                        }

                      })
                      .then(response => {
                  
      if(!response.data.data[0]){
              sum = sum + 0
                    }else{
                             sum = sum + response.data.data[0].sum
                                 
                    }
                      }).then(() => {
                        ////console.log(sum)
                        ylist3.push(sum)
                      })
                  })
              }
              setTimeout(() => {
                //console.log(xlist)
                //console.log(ylist3)
                //console.log(ylist4)
                that.echart(xlist, ylist4, ylist3)
              }, 1000);

              //////console.log(ylist4)

      

          
      },
      gethourarr(num) {

        let arr = []
        let arr2 = []
        for (let i = 0; i < num; i++) {
          let f = new Date(new Date().getTime() - i * 60 * 60 * 1000)
          let month = f.getMonth() + 1;
          if (month < 10) {
            month = "0" + month
          }
          let day = f.getDate();
          if (day < 10) {
            day = "0" + day
          }
          let hour = f.getHours();
          if (hour < 10) {
            hour = "0" + hour
          }
          arr.push(f.getFullYear() + "-" + (month) + "-" + day + " " + hour)
        }

        for (let i = arr.length - 1; i >= 0; i--) {
          arr2.push(arr[i])
        }
        return arr2
      },
      echart(xlist, ylist4, ylist3) {

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
          color: ['#0099FF', '#00FF19'],
          legend: {
            data: [ '产量', ],
            itemWidth: 10,
            itemHeight: 5,
            top: "13%",
            right: "13%",
            textStyle: {
              color: "white",
              fontSize: 12,
              fontStyle: "normal"
            }
          },
          grid: {
            bottom: "13%",
            top: "35%",
            right: "10%",
            left:"12%"
          },
          title: {
            padding: [
              3, // 上
              90, // 右
              2, // 下
              90, // 左
            ],
            left: "center",
            top: "3%",

            textStyle: {
              color: "#00E6F1",
              fontSize: 17,
              fontWeight: "normal"
            },
            // text: "验布机产量实时对比"
            text: "验布机日产量对比"
          },
          xAxis: [{
            type: 'category',
            //  data: xlist,
             data:["08/27","08/28","08/29","08/30","08/31","09/01",],
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 12
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
              name: '产量/米',
              // min: 100,
              // max: 350,
              // interval: 50,

              nameTextStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 12
              },

          splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed',
                  color: "rgba(84,84,84,0.5)",
                }
              },
              nameLocation: "end",
              axisLine: {
                lineStyle: {
                  color: "#707070",
                  width: 1
                }
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#FFFFFF",
                  fontSize: 12
                }
              },
            },
           
          ],
          series: [{
              name: '产量',
              type: 'bar',
              yAxisIndex: 0,
              // data: ylist3
              barWidth:"30%",
               data:[83249,84573,82894,87319,82103,85302,]
            },
     

          ]
        };

        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },
      echart2(xlist, ylist, ylist2, name) {
        if(name){ //防止undefined

        }else{
          name=""
        }
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
          color: ['#E69C64', '#64D4E6'],
          legend: {
            // data: ['今日验布', '昨日验布', ],
            data: [ '昨日验布', ],
            itemWidth: 10,
            itemHeight: 5,
            top: "13%",
            right: "13%",
            textStyle: {
              color: "white",
              fontSize: 12,
              fontStyle: "normal"
            }
          },
          grid: {
            bottom: "25%",
            top: "25%",
            right: "10%",
            left: "10%",
          },
          title: {
            padding: [
              3, // 上
              90, // 右
              2, // 下
              90, // 左
            ],
            left: "center",
            top: "3%",

            textStyle: {
              color: "#FFFFFF",
              fontSize: 17,
              fontWeight: "normal"
            },
            // text: "验布小能手-卲美娥" + name
            text: "验布小能手-卲美娥" 
          },
          xAxis: [{
            type: 'category',
            // data: xlist,
                data:["王芳","何秀英","张美芳","陆美琴","徐玲玲","舒华英","卲美娥",],
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 12
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
              //   name: '产量/米',
              // min: 100,
              // max: 350,
              // interval: 50,

              nameTextStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 12
              },

              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed',
                  color: "rgba(84,84,84,0.5)",
                }
              },
              nameLocation: "end",
              axisLine: {
                lineStyle: {
                  color: "rgba(0,0,0,0)",
                  width: 1
                }
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#FFFFFF",
                  fontSize: 12
                }
              },
            },

          ],
          series: [
            // {
            //   name: '今日验布',
            //   type: 'bar',
    
            //   // data: ylist
            //   data:[13100,12300,12000,14000,12400,13041,14010]
            // },
            {
              name: '昨日验布',
              type: 'bar',
                   barWidth:"25%",
   data:[12100,13300,13000,13400,11400,12041,14010],

              // data: ylist2
            },

          ]
        };

        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },
      getMachine() {
        let that = this
        let url = "http://47.99.156.243:8227/report/getSimpleReport"
        axios({
            url: url,
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data: {
              tableName: "exam_day_info"
            }
          })
          .then(response => {
            let daysum = 0
            let lacksum = 0
            if (response.data.data.length < 10) {
              that.jsjzs = "0" + String(response.data.data.length)
            } else {
              that.jsjzs = response.data.data.length
            }
            for (let i = 0; i < response.data.data.length; i++) {
              daysum = daysum + response.data.data[i].yield //浆纱机总数
              lacksum = lacksum + response.data.data[i].lack //疵点总数
            }
            that.daysum = daysum
            that.lacksum = lacksum
          })
      },
      getYesterday() { //昨日验布
        let that = this
        let day = that.getYerFormatDate()
        //////console.log(day)
        let url = "http://47.99.156.243:8227/report/getSimpleReport"
        axios({
            url: url,
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data: {
              tableName: "exam_day_info_his",
              query: {
                shift_date: day
              }
            }
          })
          .then(response => {
            //////console.log(response)
            let yersum = 0
            for (let i = 0; i < response.data.data.length; i++) {
              yersum = yersum + response.data.data[i].yield
            }
            that.yersum = yersum.toFixed(1)
          })
      },

      getYerFormatDate() {
        let time = (new Date).getTime() - 24 * 60 * 60 * 1000;
        let yesday = new Date(time); // 获取的是前一天日期
        yesday = yesday.getFullYear() + "/" + (yesday.getMonth() > 9 ? (yesday.getMonth() + 1) : +(yesday.getMonth() +
          1)) + "/" + (yesday.getDate() > 9 ? (yesday.getDate()) : "0" + (yesday.getDate())); //字符串拼接转
        return yesday
      },
      getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
      },
            getWarningPushDataTiming: function () {
        const timer = setInterval(() => {
       this.getyb()
      this.echart2()
      this.getMachine()
       this.getElertic()
      this.getYesterday()
   
        }, 15000);
        const timer2=setInterval(() => {
         if(this.jsj<100000){
            this.jsj=this.jsj+this.getRandomInt(10000,12000)
         }else{
   this.jsj=5234
         }
        }, 3600000);
        // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
        this.$once('hook:beforeDestroy', () => {
          clearInterval(timer);
            clearInterval(timer2);
        })
      },
          getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
    },


    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    mounted() {
      let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
      // this.timer = setInterval(() => {
      //   _this.date = new Date(); // 修改数据date
      // }, 1000);
      if(this.$route.params.workshop_id==1){
        this.companyname="亿骏"
      }else{
          this.companyname="祥嘉"
      }
      this.getyb()
      this.echart2()
      this.getMachine()
      this.getElertic()
      this.getYesterday()
      this.getWarningPushDataTiming()


    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
        if (this.timer2) {
        clearInterval(this.timer2); // 在Vue实例销毁前，清除我们的定时器
      }
    }
  }

</script>

<style scoped>
  .content4 {
    height: auto;
 position: relative;
       background-image: url("../../../static/img/wzBack.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-color: transparent;
    /*color: rgba(173, 255, 47, 0.25);*/
  }
  .bottom_font{
    position: absolute;
  top: 42.8rem;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.8rem;
    z-index: 100;
  }
  header {
    padding: 0;
    width: 100%;
    text-align: center;
    margin: 0;
  }

  .title {
    /*background-image: url("../static/img/title.png");*/
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-color: transparent;
    height: 5rem;
    color: white;
    text-align: center;
    font-size: 1.5rem;

    width: 100%;
    /*-webkit-box-shadow:1px 1px 1px rgba(9, 62, 175, 0.66);*/
    /*-moz-box-shadow:1px 1px 1px rgba(9, 62, 175, 0.66);*/
    /*box-shadow:1px 1px 25px  rgba(9, 62, 175, 0.66);*/
    /*border-radius: 1rem;*/
  }

  .monitor {
    width: 100%;
    height: 41rem;

    display: flex;
  }

  .monitor_left {
    width: 45%;
    height: 100%;

  }

  .monitor_left_top {
    width: 100%;
    height: 10%;

    position: relative;
  }

  .img {
  position: absolute;
    left: 2rem;
    top: 0rem;
    width: 13rem;
    height: 3rem;
    background-image: url("../../../static/img/card4.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .img_con {
    display: flex;
    font-size: 1rem;
    color: #5D7091;
    align-items: center;
    margin-top: 0.5rem;
  }

  .jiantou {
    width: 1rem;
    height: 1rem;
    background-image: url("../../../static/img/jiantou.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .monitor_left_mid {
    width: 100%;
    height: 35%;

    position: relative;
  }

  .echart {
     
    width: 100%;
    height: 100%;
    margin-top: 1rem;
  }

  .monitor_left_bot {
    width: 100%;
    height: 55%;

    position: relative;
  }

  .card2 {
      position: absolute;
    left: 1rem;
    top: 3rem;
    width: 18rem;
    height: 10rem;
    background-image: url("../../../static/img/card2.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;

  }

  .card7 {
position: absolute;
    right: 8rem;
    width: 15rem;
    height: 5rem;
    top: 4.5rem;
    background-image: url("../../../static/img/card7.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;

  }

  .monitor_right {
    width: 55%;
    height: 100%;

  }

  .circle_con {
    width: 100%;
    height: 40%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .circles {
    width: 15rem;
    height: 15rem;
    background-image: url("../../../static/img/circles.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

  }

  .card5 {
 width: 9.5rem;
    height: 4.5rem;
    background-image: url("../../../static/img/card5.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: -6rem;
    top:0rem;
  }

  .card5_con {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .card4 {
 width: 9.5rem;
    height: 4.5rem;
    background-image: url("../../../static/img/card5.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: -6rem;
    bottom: 0rem;
  }

  .card6_con {
      width: 27rem;
    height: 10rem;
    position: absolute;
    left: -3rem;

    margin-right: 1rem;
    display: flex;
    flex-direction: column;
  }

  .card4_con {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .jin {
    position: absolute;
    font-size: 1rem;
    color: #FFBB00;
      top: 1.5rem;
    left: 1.4rem;
  }

  .zong {
    position: absolute;
    font-size: 0.8rem;
     top: 1rem;
    right: 1rem;
    color: white;
  }

  .num {
    position: absolute;
    font-size: 1rem;
    color: #FF0000;
     top: 2.7rem;
    right: 3.2rem;

    
  }

  .font {
    width: 10rem;
    height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

  }

  .font span {
    width: 100%;
    margin-top: 0.8rem;

  }

  .echart2 {
    width: 100%;
    height: 45%;
    margin-top: 3rem;
  }

</style>
