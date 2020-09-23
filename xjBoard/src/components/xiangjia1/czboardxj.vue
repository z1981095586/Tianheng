<template>
  <div class="content">
    <header style="height: 3rem">
      <div class="title">{{companyname}}纺织穿综信息监控平台</div>

    </header>
    <div class="board">
      <div class="board_con">
        <div class="board_con_top">
          <div class="board_con_top_left">
            <div class="board_con_top_left_con" style=" margin-bottom: 8%;">
              <div class="yijilu"><span>已记录&nbsp;&nbsp;&nbsp;{{dczListLength}}</span></div>
              <div class="board_con_top_left_con_title">
                <span style="margin-right:5%"> 今日待穿综记录</span>
              </div>
              <div class="board_con_top_left_con_tablehead">
                <span>品种</span> <span>轴数</span> <span>日期</span>
              </div>
              <div class="board_con_top_left_con_tablecon" id="s1">
                <div class="board_con_top_left_con_tablecon_one" v-for="(item,index) in dczList" :key="index"> <span
                    style="color:#FFFFFF">{{item.product_name}}</span> <span
                    style="color:#6CF603">{{item.beamNum2}}/{{item.beam_num}}</span> <span
                    style="color:#FFFFFF">{{item.update_time}}</span></div>
              </div>
            </div>
            <div class="board_con_top_left_con2" id="echart"></div>
          </div>
          <div class="board_con_top_middle">
            <div class="board_con_top_middle_con">
              <div class="board_con_top_middle_con_font">
                <span style="font-size:1rem;color:white">今日总产量</span> <span style="color:#FFEE00;font-size:2rem">123953</span>
              </div>
            </div>
          </div>
          <div class="board_con_top_right">
            <div class="board_con_top_left_con" style=" margin-bottom: 8%;">
              <div class="board_con_top_left_con_title">
                产量排行
              </div>
              <div class="board_con_top_left_con_tablehead">
                <span>产量</span> <span>品种</span> <span>日期</span>
              </div>
              <div class="board_con_top_left_con_tablecon" id="s2">
                <div class="board_con_top_left_con_tablecon_one" v-for="(item,index) in clpmList" :key="'clph'+index">
                  <span style="color:#FFDD00">{{item.root_number}}</span>
                  <span style="color:white">{{item.product_name}}</span> <span style="color:#FFFFFF">{{item.create_time}}</span></div>
              </div>
            </div>
            <div class="board_con_top_left_con2" id="echart2"></div>
          </div>
        </div>
        <!-- <div class="board_con_bottom">
          <div class="yijilu2"><span>已记录&nbsp;&nbsp;{{yczListLength}}</span></div>
          <div class="board_con_bottom_title">
            已穿综记录
          </div>
          <div class="board_con_bottom_tablehead">
            <span>织轴卡号</span><span>机台号</span><span>总经根数</span><span>品名</span><span>轴号</span><span>筘号</span><span>日期</span>
          </div>
          <div class="board_con_bottom_tablecon" id="s3">

            <div class="board_con_bottom_tablecon_one" v-for="(item,index) in yczList" :key="'ycz'+index">
              <span>{{item.print_code}}</span><span>{{item.machine_id}}</span><span>{{item.root_number}}</span><span
                style="color:#5CFF00">{{item.product_name}}</span><span>轴号</span><span>{{item.reed_no}}</span><span>{{item.create_time}}</span>
            </div>
          </div>
        </div> -->
      </div>
    </div>
     <div class="bottom_font"><span>Copyright © 浙江天衡信息技术有限公司</span></div>
  </div>

</template>

<script>
  // 0: {name: "万舟织造一部", id: 2}
  // 1: {name: "万舟织造二部", id: 3}
  // 2: {name: "兰棉", id: 4}
  // 3: {name: "佳而美", id: 5}
  import axios from 'axios';
  let host1 = "http://47.110.242.174:10086";
  // import {
  //   getUrl,
  //   wzBoard_api
  // } from "../api/api"; //引入时间格式化js
  export default {
    name: "czboard",
    data() {
      return {
        lang: 'zh',
        workshopId: '3',
        companyId: "", //公司库表Id
        dczList: [],
        dczListLength: 0,
        clpmList: [],
        yczList: [],
        yczListLength: 0,
        product_nameList: [],
        companyname:"",
        root_numberList: [],
        legendList: [],
        xList: [],
        sList: []
      }
    },
    methods: {
      async getclph() {
        let that = this
        let xList = []
        let sList = []
        let json={}
        let legendList = []
        //console.log("sad")
       await axios({
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {

              tableName: "wear_weaving",


              selectFields: ["distinct(machine_id)"],
              //  selectFields:["sum(root_number)","machine_id","start_datetime"]

            }

          })
          .then(res => {


            for (let i = 0; i < res.data.data.length; i++) {
              console.log(res.data.data[i].machine_id)
              if(res.data.data[i].machine_id=="cz02#"){
      legendList.push(res.data.data[i].machine_id)
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
                      machine_id: res.data.data[i].machine_id
                    },
                    selectFields: ["sum(root_number)", "machine_id", "create_date"],
                    groupByColumn: ['create_date']

                  }

                })
                .then(response => {
console.log(response)
                  let list = []
                  for (let j = 0; j < response.data.data.length; j++) {
                  //console.log(response.data.data[j])
                  if (xList.indexOf(response.data.data[j].create_date.substr(5, 5)) == -1) {

                      xList.push(response.data.data[j].create_date.substr(5, 5))
                   }

                    list.push(response.data.data[j]['sum(root_number)'])
                  }
      
            json={
                    // itemStyle: { //柱图背景色
                    //   color: '#64D4E6'
                    // },
                    name: res.data.data[i].machine_id,
                    data: list,

                    barWidth:"40%",
                    label: {
                      show: true,
                      position: 'top'
                    },
                    type: 'bar'
                  }
  
                
                })
             
              }
        
            }

          }).then(() => {

             that.legendList=legendList
             that.xList=xList
             that.sList=sList

  

   
          })
          console.log(that.legendList)
          console.log(that.xList)
          console.log(that.sList)
          
    setTimeout(() => {
      //console.log(xList)
      
      //console.log(legendList)
      let xList2=that.xList.sort()
   

      sList=sList.pop()
      //console.log(sList)
             let myChart1 = this.$echarts.init(document.getElementById('echart2'));
        // 绘制图表
        myChart1.clear();
       let option = {
 color:['#1F78B4','#1AFF00'],
          title: {

            left: "center",
            top: "3%",
            textStyle: {
              color: "#00FFDC",
              fontSize: 15,
              fontWeight: "normal"
            },
            text: "每日产量对比"
          },
          // legend:{
          //   data:that.legendList,
          //   right:0,
          //   top:25,
          //   textStyle:{
          //     color:"white"
          //   }
          // },
          xAxis: {
            type: 'category',
            data:xList2,
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

          // legend: {
          //   right: "4%",
          //   top: "17%",
         

          //    itemWidth:15,

          //   textStyle: {
          //     color: "#fff",
          //     fontSize:10
          //   },
          //   data: legendList
          // },
          yAxis: {
            type: 'value',
            name: "米",
            nameTextStyle: {
              color: "#979797",
              fontSize: 10
            },
            splitLine: {
              show: false,
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
            left: '18%',
            bottom: "15%",
            top: '40%',
            right: "5%"
          },
          series: [json]
        };

        ////console.log(option.series[0])
        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
    }, 1500);
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
        if(res.data.data[i]){
                that.product_nameList.push(res.data.data[i].product_name)
              that.root_numberList.push({
                name: res.data.data[i].product_name,
                value: res.data.data[i].root_number
              })

              that.echart()
        }
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
                  ////console.log(preTop)
            ////console.log(o.scrollHeight)
            ////console.log(o.scrollTop)
            if (preTop >= o.scrollHeight || preTop == o.scrollTop) {


            ////console.log("asd")
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
            ////console.log(res)
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
                  ////console.log(preTop)
            ////console.log(o.scrollHeight)
            ////console.log(o.scrollTop)
            if (preTop >= o.scrollHeight || preTop == o.scrollTop) {


            ////console.log("asd")
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
           //console.log(res)
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
            ////////console.log(list)
            list = that.sortByKey(list, "root_number")
            //console.log(list)
            let list2 = []
            for (let i = list.length - 1; i >= 0; i--) {
              if(list[i].create_time){
                list[i].create_time = list[i].create_time.substr(0, 10)
              }
              list2.push(list[i])
            }
            //console.log(list2)
            that.clpmList = list2

          })
      },

      getdata() { //今日待穿综记录
        let date = this.getNowFormatDate()
        let that = this
        ////////console.log(date)
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
                  ////////console.log(res.data.data.length)
                  response.data.data[i].beamNum2 = res.data.data.length;


                })
              response.data.data[i].update_time = response.data.data[i].update_time.substr(0, 10)

            }
            ////////console.log(response)
            that.dczList = response.data.data
            that.dczListLength = response.data.data.length
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
                  ////console.log(preTop)
            ////console.log(o.scrollHeight)
            ////console.log(o.scrollTop)
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
        //////console.log(this.product_nameList)
        //////console.log(this.root_numberList)
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
              fontSize: 15,
              fontWeight: "normal"
            },
            text: "品种产量占比"
          },

          legend: {
            orient: 'vertical',
            right: "16%",
            type: 'scroll',
            textStyle: {
              color: "#fff"
            },
            
             itemWidth:15,
           itemHeight:10,
            textStyle: {
              color: "#fff",
              fontSize:10
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

        // for(let i=0;i<that.xList.length;i++){
        //   list.push(that.xList[i])
        // }
        //    for(let i=0;i<that.sList.length;i++){
        // //////console.log(that.sList[i].data)
        // }
        //   that.xList=['08-21','08-22','08-23','08-24','08-25',]
        //   that.legendList=['1','2','-1']
        //   that.sList=[
        //  {
        //               // itemStyle: { //柱图背景色
        //               //   color: '#64D4E6'
        //               // },
        //               name: '1',
        //          data:[122,123,124,531,313,134],
        //               label: {
        //                 show: true,
        //                 position: 'top'
        //               },
        //               type: 'bar'
        //             },
        //              {
        //               // itemStyle: { //柱图背景色
        //               //   color: '#64D4E6'
        //               // },
        //               name: '2',
        //               data:[122,123,124,531,313,134],
        //               label: {
        //                 show: true,
        //                 position: 'top'
        //               },
        //               type: 'bar'
        //             },
        //              {
        //               // itemStyle: { //柱图背景色
        //               //   color: '#64D4E6'
        //               // },
        //               name: '-1',
        //               data:[122,123,124,531,313,134],
        //               label: {
        //                 show: true,
        //                 position: 'top'
        //               },
        //               type: 'bar'
        //             }
        //   ]

        let option = {

          title: {

            left: "center",
            top: "3%",
            textStyle: {
              color: "#00FFDC",
              fontSize: 15,
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

        //////console.log(option)
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
      this.getdata()
      this.getdata2()
  
      this.getdata3()
          this. startmarquee2(30,50,80)

        this.startmarquee(30,50,80)
      // this.startmarquee3(30,50,80)

      this.getdata4()
      this.getclph()



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
    background-image: url("../../../static/img/wzBack.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 100%;
    margin: 0;
    padding-top: 2rem;
    position: relative;
  }
    .bottom_font{
    position: absolute;
   
    top: 32rem;

    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
    z-index: 100;
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
    height: 31rem;
    /* height: 71%; */
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .board_con {
    width: 93%;
    height: 92%;
    display: flex;
    flex-direction: column;
  }

  .board_con_top {
    width: 100%;
    height: 96%;
    margin-bottom: 2%;
    display: flex;

  }

  .board_con_top_left {
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;

  }

  .board_con_top_left_con {
    width: 100%;
    height: 47%;

    background: #0E3E5F;
    position: relative;

  }

  .yijilu {
    position: absolute;
    right: 0;
    top: 0;
     width: 4rem;
    height: 2rem;
    padding-left: 7px;
    padding-right: 7px;
    background: black;
    color: #DFFF00;
    font-size: 0.8rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;

  }

  .yijilu2 {
    position: absolute;
    right: 0;
    top: 0;
    width: 4rem;
    height: 2rem;
    padding-left: 7px;
    padding-right: 7px;
    background: black;
    color: #DFFF00;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;

  }

  .board_con_top_left_con2 {
    width: 100%;
    height: 45%;

    background: #0E3E5F;
  }

  .board_con_top_left_con_title {
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #00FFDC;
    font-size:15px;
  }

  .board_con_top_left_con_tablehead {
    width: 100%;
    height: 20%;
    display: flex;
   
  }

  .board_con_top_left_con_tablehead span {
    width: 33.33%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #01CBFF;
   font-size:12px;
  }

  .board_con_top_left_con_tablecon {
    width: 100%;
    height: 6.8rem;
    overflow: auto;
  }

  .board_con_top_left_con_tablecon_one {
    width: 100%;
    height: 1.94rem;
    display: flex;
    font-size: 11px;

  }

  .board_con_top_left_con_tablecon_one span {
    width: 33.33%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

  }

  .board_con_top_middle {
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;


  }

  .board_con_top_middle_con_font {
    width: 100px;
    height: 100px;

  }

  .board_con_top_middle_con_font span {
    width: 100%;
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

  }

  .board_con_top_middle_con {
    width: 18rem;
    height: 18rem;
    background-image: url("../../../static/img/circle.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .board_con_top_right {
    width: 30%;
    height: 100%;


  }

  .board_con_bottom {
    width: 100%;
    height: 34%;
    background: #0E3E5F;
    position: relative;
  }

  .board_con_bottom_title {
    width: 100%;
    height: 20%;
    display: flex;
    font-size: 1.2rem;
    color: #00FFDC;
    align-items: center;
    justify-content: center;
  }

  .board_con_bottom_tablehead {
    width: 100%;
    height: 20%;
    display: flex;
    font-size: 1.1rem;
    color: #01CBFF;

  }

  .board_con_bottom_tablehead span {
    width: 14.28%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .board_con_bottom_tablecon {
    width: 100%;
    height: 60%;
    overflow: auto;
  }

  .board_con_bottom_tablecon_one {
    width: 100%;
    height: 25%;
    display: flex;
  }

  .board_con_bottom_tablecon_one span {
    width: 14.28%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    color: white;
  }

</style>
