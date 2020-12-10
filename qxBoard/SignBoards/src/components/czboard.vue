<template>
  <div class="content">
    <header style="height: 3rem">
      <div class="title">{{companyname}}纺织穿综信息监控平台</div>

    </header>
    <div class="board">
      <div class="board_con">
        <div class="board_con_top">
         <div class="board_con_top_con">
        <div class="board_con_top_con_one" v-for="(item,index) in tableTitle" :key="index">
  {{item}}
        </div>
      
        </div>
          <div class="board_con_top_con">
        <div class="board_con_top_con_one" v-for="(item,index) in tableTitle" :key="index">
  {{item}}
        </div>
      
        </div>
       
        </div>
        <div class="board_con_bottom">
       <div class="board_con_bottom_left">
       <div class="board_con_bottom_left_left">
       <div class="board_con_bottom_left_left_title">
今日已完成
       </div>
       <div style="overflow: auto;">
       <div class="board_con_bottom_left_left_tablehead">
             <div class="board_con_bottom_left_left_tablehead_one">
         品种
       </div>
          <div class="board_con_bottom_left_left_tablehead_one">
         数量
       </div>
          <div class="board_con_bottom_left_left_tablehead_one">
         剩余
       </div>
       </div>
          <div class="board_con_bottom_left_left_tablehead" v-for="(item,index) in    dczList" :key="index">
             <div class="board_con_bottom_left_left_tablehead_one">
         {{item.product_name}}
       </div>
          <div class="board_con_bottom_left_left_tablehead_one">
      {{item.finish_beam_num}}
       </div>
          <div class="board_con_bottom_left_left_tablehead_one">
    {{item.beam_num-item.finish_beam_num}}
       </div>
       </div>
 
       </div>
        </div><div class="board_con_bottom_left_right" id="dailyEchart">
       
        </div>
        </div>
        <div class="board_con_bottom_right">
       <div class="board_con_bottom_right_img">
         <div class="img1" >
  <img src="/static/img/circle2.png" id="img1" />
  <div class="img_span">
    <span>S40今日穿综根数</span>
    <span>98543</span>
  </div>
         </div>
         <div class="img2">
  <img src="/static/img/circle2.png"  id="img2"  />
    <div class="img_span2">
    <span>S40今日穿综根数</span>
    <span>98543</span>
  </div>
         </div>
       
           
       </div>
        <div class="board_con_bottom_right_echart" id="pzEchart"></div>
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
  let host1 = "http://47.110.242.174:10086";
  import {
    getUrl,
    wzBoard_api
  } from "../api/api"; //引入时间格式化js
  export default {
    name: "czboard",
    data() {
      return {
        lang: 'zh',
        workshopId: '3',
        companyId: "", //公司库表Id
        tableTitle:[
          "序号","分厂","品种","穿棕机型","穿棕轴数","织机机型","完成情况","筘号","筘幅",
        ],
        // dczList: [],
        // dczListLength: 0,
        // clpmList: [],
        // yczList: [],
        // yczListLength: 0,
        product_nameList: [],
        dczList:[],
        // companyname:"",
         root_numberList: [],
        // legendList: [],
        // xList: [],
        // sList: []
      }
    },
    methods: {

rotate () {
  var rotateVal = 0 // 旋转角度
      var InterVal // 定时器
       var rotateVal2 = 0 // 旋转角度
		
				InterVal = setInterval(function () {
					var img = document.getElementById('img1')
					rotateVal += 1
					// 设置旋转属性(顺时针)
					img.style.transform = 'rotate(' + rotateVal + 'deg)'
					// 设置旋转属性(逆时针)
					//img.style.transform = 'rotate(-' + rotateVal + 'deg)'
					// 设置旋转时的动画  匀速0.1s
          img.style.transition = '0.1s linear'
          			var img2 = document.getElementById('img2')
					rotateVal2 += 1
					// 设置旋转属性(顺时针)
					img2.style.transform = 'rotate(' + rotateVal2 + 'deg)'
					// 设置旋转属性(逆时针)
					//img.style.transform = 'rotate(-' + rotateVal + 'deg)'
					// 设置旋转时的动画  匀速0.1s
					img2.style.transition = '0.1s linear'
				}, 100)
			},

      pzEchart(){
             let myChart1 = this.$echarts.init(document.getElementById('pzEchart'));
        // 绘制图表
        myChart1.clear();
        let that=this
let option = {
  
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },

    series: [
        {
            name: '访问来源',
            type: 'pie',
          radius: ['50%', '80%'],
            center: ['52%', '50%'],
            label:{
              position:"inside",
              formatter: '{d}% {b}'
            },
            labelLine:{
              show:false
            },
           
            data:that.root_numberList,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
  myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },
      clEchart(){
               let myChart1 = this.$echarts.init(document.getElementById('dailyEchart'));
        // 绘制图表
        myChart1.clear();
let option = {
  title:{
 text:"穿棕产量日对比",
 textStyle:{
   color:"#87D3F7",
   fontSize:15
 },
 left:"center",
 top:15
  },
    color: ['#87D3F7'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
               axisTick: {
            show:false
            },
            axisLine:{
              lineStyle:{
                 color:"#87D3F7"
              }
            }
        }
    ],
    yAxis: [
        {
       
splitLine:{
    show:true,
    lineStyle:{
        type:'dashed'
    }
},
              axisTick: {
            show:false
            },
            type: 'value',
               axisLine:{
              lineStyle:{
                 color:"#87D3F7"
              }
            }
        }
    ],
    series: [
        {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
        }
    ]
};
      myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },
      getclph() {
        let that = this
        let xList = []
        let sList = []
        let l=[]
        let legendList = []
        // axios({
        //     url: host1 + '/report/getSimpleReport',
        //     method: 'post',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'companyId': that.companyId
        //     },
        //     data: {

        //       tableName: "wear_weaving",


        //       selectFields: ["distinct(machine_id)"],
        //       //  selectFields:["sum(root_number)","machine_id","start_datetime"]

        //     }

        //   })
        //   .then(res => {


      //       for (let i = 0; i < res.data.data.length; i++) {
      //         // if(res.data.data[i].machine_id=="cz02#"){
      // legendList.push(res.data.data[i].machine_id)
              axios({
                  url: host1 + '/report/getSimpleReport',
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json',
                    'companyId': that.companyId
                  },
                  data: {

                    tableName: "wear_weaving",


                    query: {
                      // machine_id: res.data.data[i].machine_id
                    },
                    selectFields: ["sum(root_number)", "machine_id", "create_date"],
                    groupByColumn: ['create_date']

                  }

                })
                .then(response => {
                   console.log(response)
                  let list = []
                  for (let j = 0; j < response.data.data.length; j++) {

                    if (that.xList.indexOf(response.data.data[j].create_date.substr(5, 5)) == -1) {

                      xList.push(response.data.data[j].create_date.substr(5, 5))
            
                    }
        

                    list.push(response.data.data[j]['sum(root_number)'])
                  }
             
                  sList.push({
                    // itemStyle: { //柱图背景色
                    //   color: '#64D4E6'
                    // },
                    name: res.data.data[i].machine_id,
                    data: list,
                    label: {
                      show: true,
                      position: 'top'
                    },
                    type: 'bar'
                  })

                })
              // }
        
            // }
            console.log(xList)
            console.log(sList)

//           }).then(() => {

//              that.legendList=legendList
//              that.xList=xList
//              that.sList=sList

//     setTimeout(() => {
//              let myChart1 = this.$echarts.init(document.getElementById('echart2'));
//         // 绘制图表
//         myChart1.clear();
//        let option = {
//  color:['#1F78B4','#1AFF00'],
//           title: {

//             left: "center",
//             top: "3%",
//             textStyle: {
//               color: "#00FFDC",
//               fontSize: 18,
//               fontWeight: "normal"
//             },
//             text: "每日产量占比"
//           },
//           xAxis: {
//             type: 'category',
//             data: xList,
//             axisLabel: {
//               show: true,
//               textStyle: {
//                 color: "rgba(238,219,219,1)",
//                 fontSize: 10
//               }
//             },
//             axisLine: {
//               lineStyle: {
//                 color: "rgba(255, 255, 255, 0)",
//                 width: 1
//               }
//             },
//             axisTick: {
//               show: false
//             }
//           },

//           // legend: {
//           //   right: "5%",
//           //   top: "17%",
//           //   textStyle: {
//           //     color: "#fff"
//           //   },
//           //   data: legendList
//           // },
//           yAxis: {
//             type: 'value',
//             name: "米",
//             nameTextStyle: {
//               color: "#979797",
//               fontSize: 10
//             },
//             splitLine: {
//               show: false,
//               lineStyle: {
//                 type: 'dashed',
//                 color: "#979797",
//               }
//             },
//             axisLine: {
//               lineStyle: {
//                 color: "rgba(255, 255, 255, 0)",
//                 width: 1
//               }
//             },
//             nameLocation: "end",
//             axisLabel: {
//               show: true,
//               textStyle: {
//                 color: "#979797",
//                 fontSize: 10
//               }
//             },
//           },
//           grid: {
//             left: '10%',
//             bottom: "12%",
//             top: '40%',
//             right: "8%"
//           },
//           series: that.sortByKey(sList,"name")
//         };

//         //console.log(option.series[0])
//         myChart1.setOption(
//           option);
//         window.addEventListener('resize', function () {
//           myChart1.resize();
//         })
//     }, 1000);


//           })
      },
    // 对象排序
      sortByKey(array, key) {
        return array.sort(function (a, b) {
          let x = a[key];
          let y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
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
      getdata4() { //品种产量对比
        let that = this
        axios({
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {

              tableName: "wear_weaving",
groupByColumn:["product_name"],
 selectFields: ["sum(root_number) as root_number","product_name" ],



            }

          })
          .then(res => {
            //console.log(res)
            for (let i = 0; i < res.data.data.length; i++) {
              that.product_nameList.push(res.data.data[i].product_name)
              that.root_numberList.push({
                name: res.data.data[i].product_name,
                value: res.data.data[i].root_number
              })

              that.pzEchart()
            }
          })
      },
   startmarquee3(lh, speed, delay) {
        let that = this
       
        let o = document.getElementById("s3")
        var t;
        var oHeight = o.offsetHeight; /**/ /** div的高度 **/
        var p = false;

        var preTop = 0;
        o.scrollTop = 0;

        function start() {
          t = setInterval(scrolling, speed);
          o.scrollTop += 1;
        }

        function scrolling() {
          if (o.scrollTop % lh != 0 && o.scrollTop % (o.scrollHeight - oHeight - 1) != 0) {
            preTop = o.scrollTop;
            o.scrollTop += 1;
                  //console.log(preTop)
            //console.log(o.scrollHeight)
            //console.log(o.scrollTop)
            if (preTop >= o.scrollHeight || preTop == o.scrollTop) {


            //console.log("asd")
                  // that.getData2()
                that.getdata3()
//  that.echart2() //机台产量对比统计图
//                 that.echart1() //验布疵点排序统计图
              
//               for(var i = 1; i < 1000; i++) {
// t=clearInterval(i);
// }
t=clearInterval(t)
t=null
//  that.timer=clearInterval(that.timer)
//                  that.changeWorkshopTiming()
                

                that.startmarquee3(30, 50, 80)
          
            }
          } else {
           t= clearInterval(t);
            setTimeout(start, delay);
          }
        }
        setTimeout(start, delay);
      },
      
      getdata3() { //今日已穿综记录
        let that = this
        axios({
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {

              tableName: "wear_weaving",
              sort: "DESC",
              sortColumn: "create_time",
              query: {
                status: 2
              }

            }

          })
          .then(res => {
            //console.log(res)
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].machine_id == -1) {
                res.data.data[i].machine_id = "手工穿综"
              }
            }
            that.yczList = res.data.data
            that.yczListLength = res.data.data.length

          })
      },
            startmarquee2(lh, speed, delay) {
        let that = this
       
        let o = document.getElementById("s2")
        var t;
        var oHeight = o.offsetHeight; /**/ /** div的高度 **/
        var p = false;

        var preTop = 0;
        o.scrollTop = 0;

        function start() {
          t = setInterval(scrolling, speed);
          o.scrollTop += 1;
        }

        function scrolling() {
          if (o.scrollTop % lh != 0 && o.scrollTop % (o.scrollHeight - oHeight - 1) != 0) {
            preTop = o.scrollTop;
            o.scrollTop += 1;
                  //console.log(preTop)
            //console.log(o.scrollHeight)
            //console.log(o.scrollTop)
            if (preTop >= o.scrollHeight || preTop == o.scrollTop) {


            //console.log("asd")
                  // that.getData2()
                that.getdata2()
//  that.echart2() //机台产量对比统计图
//                 that.echart1() //验布疵点排序统计图
              
//               for(var i = 1; i < 1000; i++) {
// t=clearInterval(i);
// }
t=clearInterval(t)
t=null
//  that.timer=clearInterval(that.timer)
//                  that.changeWorkshopTiming()
                

                that.startmarquee2(30, 50, 80)
          
            }
          } else {
           t= clearInterval(t);
            setTimeout(start, delay);
          }
        }
        setTimeout(start, delay);
      },
      getdata2() { //产量排行
        let that = this
        axios({
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {

              tableName: "wear_weaving",
              //   sort: "DESC",
              //   sortColumn: "aef",
              // query:{
              //   wear_plan_id:response.data.data[i].id
              // }

            }

          })
          .then(res => {
            //////console.log(res)
            let list = res.data.data
            list = list.reduce((obj, item) => {
              let find = obj.find(i => i.product_name === item.product_name)
              let _d = {
                ...item,
                frequency: 1
              }
              find ? (find.root_number += item.root_number, find.frequency++) : obj.push(_d)
              return obj
            }, [])
            //////console.log(list)
            list = that.sortByKey(list, "root_number")
            let list2 = []
            for (let i = list.length - 1; i >= 0; i--) {
              list[i].create_time = list[i].create_time.substr(0, 10)
              list2.push(list[i])
            }
            that.clpmList = list2

          })
      },
 
      getdata() { //今日待穿综记录
        let date = this.getNowFormatDate()
        let that = this
        //////console.log(date)
        axios({
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {

              tableName: "wear_weaving_plan",
              //   sort: "DESC",
              //   sortColumn: "aef",
              selectLikeFields: {
                // update_time:date
              },
              query: {
                status: 0
              }

            }

          })
          .then(response => {

            for (let i = 0; i < response.data.data.length; i++) {
              axios({
                  url: host1 + '/report/getSimpleReport',
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json',
                    'companyId': that.companyId
                  },
                  data: {

                    tableName: "wear_weaving",
                    //   sort: "DESC",
                    //   sortColumn: "aef",
                    query: {
                      wear_plan_id: response.data.data[i].id
                    }

                  }

                })
                .then(res => {
                  //////console.log(res.data.data.length)
                  response.data.data[i].beamNum2 = res.data.data.length;


                })
              response.data.data[i].update_time = response.data.data[i].update_time.substr(0, 10)

            }
           console.log(response)
            that.dczList = response.data.data
       
          })
      },
                  startmarquee(lh, speed, delay) {
        let that = this
       
        let o = document.getElementById("s1")
        var t;
        var oHeight = o.offsetHeight; /**/ /** div的高度 **/
        var p = false;

        var preTop = 0;
        o.scrollTop = 0;

        function start() {
          t = setInterval(scrolling, speed);
          o.scrollTop += 1;
        }

        function scrolling() {
          if (o.scrollTop % lh != 0 && o.scrollTop % (o.scrollHeight - oHeight - 1) != 0) {
            preTop = o.scrollTop;
            o.scrollTop += 1;
                  //console.log(preTop)
            //console.log(o.scrollHeight)
            //console.log(o.scrollTop)
            if (preTop >= o.scrollHeight || preTop == o.scrollTop) {


      
                  // that.getData2()
                that.getdata()
//  that.echart2() //机台产量对比统计图
//                 that.echart1() //验布疵点排序统计图
              
//               for(var i = 1; i < 1000; i++) {
// t=clearInterval(i);
// }
t=clearInterval(t)
t=null
//  that.timer=clearInterval(that.timer)
//                  that.changeWorkshopTiming()
                

                that.startmarquee(30, 50, 80)
          
            }
          } else {
           t= clearInterval(t);
            setTimeout(start, delay);
          }
        }
        setTimeout(start, delay);
      },
      echart() {
        ////console.log(this.product_nameList)
        ////console.log(this.root_numberList)
        let myChart1 = this.$echarts.init(document.getElementById('echart'));
        // 绘制图表
        myChart1.clear();
        let that = this;
        let option = {
          color: ['#FB9A99', '#33A02C', '#B2DF8A', '#A6CEE3', '#1F78B4'],
          title: {

            left: "center",
            top: "3%",
            textStyle: {
              color: "#00FFDC",
              fontSize: 18,
              fontWeight: "normal"
            },
            text: "品种产量对比"
          },

          legend: {
            orient: 'vertical',
            right: "16%",
            type: 'scroll',
            textStyle: {
              color: "#fff"
            },
            top: '25%',
            data: that.product_nameList
          },

          series: [{
            label: { //去除饼图的指示折线label
              normal: {
                show: false,
                position: 'inside',
                formatter: "{b}:{d}%"
              },
            },
            name: '访问来源',
            type: 'pie',
            radius: '70%',
            center: ['30%', '60%'],
            data: that.root_numberList,

          }]
        };
        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },
      echart2() {
        let myChart1 = this.$echarts.init(document.getElementById('echart2'));
        // 绘制图表
        myChart1.clear();
        let that = this

   

        let option = {

          title: {

            left: "center",
            top: "3%",
            textStyle: {
              color: "#00FFDC",
              fontSize: 18,
              fontWeight: "normal"
            },
            text: "每日产量对比"
          },
          xAxis: {
            type: 'category',
            data: that.xList,
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0)",
                width: 1
              }
            },
            axisTick: {
              show: false
            }
          },

          legend: {
            right: "5%",
            top: "17%",
            textStyle: {
              color: "#fff"
            },
            data: that.legendList
          },
          yAxis: {
            type: 'value',
            name: "米",
            nameTextStyle: {
              color: "#979797",
              fontSize: 10
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: "#979797",
              }
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0)",
                width: 1
              }
            },
            nameLocation: "end",
            axisLabel: {
              show: true,
              textStyle: {
                color: "#979797",
                fontSize: 10
              }
            },
          },
          grid: {
            left: '10%',
            bottom: "12%",
            top: '40%',
            right: "8%"
          },
          series: that.sList
        };

        ////console.log(option)
        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },
            changeWorkshopTiming: function () {
        const timer = setInterval(() => {

  
      this.getdata3()
      this.getdata4()
      this.getclph()
          //  this.getdata()
        }, 15000);
        // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
        this.$once('hook:beforeDestroy', () => {
          clearInterval(timer);
        })
      },
    },




    filters: {

    },
    mounted() {
      this.companyId=this.$route.params.id
      if(this.companyId=="10000022"){
        this.companyname="祥嘉"
            host1="http://47.99.156.243:8227"
      }else if(this.companyId=="10000012"){
        this.companyname="七星"
    
      }
      this. clEchart()
      this.pzEchart()
      this.rotate()
      this.getdata()
      // this.getdata()
      // this.getdata2()
  
      // this.getdata3()
      //     this. startmarquee2(30,50,80)
      // this.startmarquee(30,50,80)
      // this.startmarquee3(30,50,80)
       this.getdata4()
      //  this.getclph()



      //   this.getData()
      //      const timer = setTimeout(() => {

      //  this.startmarquee(30, 30, 80)


      //       }, 1000);
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
    height:48rem;
    /* height: 71%; */
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .board_con {
    width: 98%;
    height: 92%;
    display: flex;
    flex-direction: column;
  }

  .board_con_top {
    width: 100%;
    height: 47%;
    margin-bottom: 2%;
    display: flex;
flex-direction: column;
overflow: auto;
    background: rgb(15,49,83);
  }
  .board_con_top_con {
    width: 100%;
  height: 2.6rem;
    
    display: flex;
    
  }
   .board_con_top_con_one {
    width: 11.1%;
    height: 100%;
    color: white;
    font-size: 1.5rem;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    
  }

  .board_con_bottom {
    width: 100%;
     height: 47%;
 
  display: flex;
  align-items: center;
  }
    .board_con_bottom_left {
    width: 60%;
     height: 100%;

  display: flex;

  }
  .board_con_bottom_left_left {
    width: 50%;
     height: 100%;

  display: flex;
flex-direction: column;

  }
  .board_con_bottom_left_left_title{
    width: 99%;
    height: 4rem;
    font-size: 1.7rem;
    color: white;
    border: 1px solid #87D3F7;
    background: black;
    display: flex;
    align-items: center;
    border-radius: 8px;
    justify-content: center;
  }
    .board_con_bottom_left_left_tablehead{
    width: 100%;
    height: 2.85rem;
    font-size: 1.3rem;
    font-weight: 500;
    color: white;
       background: rgb(15,49,83);
   
    display: flex;
 
  }
   .board_con_bottom_left_left_tablehead_one{
    width: 33.3%;
    height: 2.8rem;

    border-right: 1px solid black;
    border-bottom: 1px solid black;
   
    display: flex;
    align-items: center;
    justify-content: center;
 
  }
    .board_con_bottom_left_right {
    width: 50%;
     height: 100%;

  display: flex;

  }
  
    .board_con_bottom_right {
    width: 40%;
     height: 100%;
 
  display: flex;


  }
     .board_con_bottom_right_img {
    width: 40%;
     height: 100%;
   position: relative;


  }
  .img1{
    width: 11rem;
    height: 11rem;
    position: absolute;
        left: 15px;
    top: 15px;
  }
  .img_span{
    position: absolute;
    width: 6rem;
    height: 6rem;
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
    color: white;
      left: 33px;
    top: 35px;
  }
    .img_span2{
    position: absolute;
    width: 6rem;
    height: 6rem;
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
    color: white;
      left: 35px;
    top: 37px;
  }
  .img1 img{
     width: 11rem;
    height: 11rem;
      
  }

    .img2{
     width: 11rem;
    height: 11rem;
    position: absolute;
        right: 0px;
    bottom: 0px;
   
  }
      .img2 img{
     width: 11rem;
    height: 11rem;
 
  }
       .board_con_bottom_right_echart {
    width: 60%;
     height: 100%;
 


  }
  
</style>
