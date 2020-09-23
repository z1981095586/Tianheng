<template>
  <div class="content">
    <header style="height: 3rem">
      <div class="title">万舟制造二部——万舟集团验布车间看板</div>

    </header>
    <div class="board">
      <div class="board_top">
        <div class="board_top_left" id="echart1"></div>
        <div class="board_top_middle">
          <div class="board_top_middle_con">
            <div class="font">今日验布米数</div>
            <div class="number">{{defectMeter}}万米</div>
            <div class="font">今日疵点总数</div>
            <div class="number2">{{ defectTotalToday}}个</div>
          </div>
        </div>
        <div class="board_top_right">
          <div class="board_top_right_con">
            <div class="board_top_right_top">
              <div class="board_top_right_top_title">
                <div class="img">
                  <div class="img_line"></div>
                  <div class="radius"></div>
                </div>
                <div class="fonts">今日检验小能手</div>
                <div class="img2">
                  <div class="radius"></div>
                  <div class="img_line2"></div>

                </div>
              </div>
              <div class="board_top_right_top_content" id="s1">
                <div :class="index%2==0?'board_top_right_top_content_con':'board_top_right_top_content_con2'"
                  v-for="(item,index) in outPutMeterList" :key="index"><span>{{item.workerName}}</span><span
                    style="text-align:right">{{item.outPutMeter}}米</span></div>

              </div>
            </div>
            <div class="board_top_right_bottom">
              <div class="board_top_right_top_title">
                <div class="img">
                  <div class="img_line"></div>
                  <div class="radius"></div>
                </div>
                <div class="fonts">问题批次排名</div>
                <div class="img2">
                  <div class="radius"></div>
                  <div class="img_line2"></div>

                </div>
              </div>
              <div class="board_top_right_bottom_content" id="s2">
                <div class="board_top_right_bottom_content_content" v-for="(item,index) in batchMeterList" :key="index">
                  <div class="board_top_right_bottom_content_con"><span style="    width: 35.33%;">{{item.batchNo}}
                    </span><span style="    width: 30%;text-align:center">{{item.productName}}</span><span
                      style="    width: 34.33%;text-align:right">{{item.outPutMeter}}米</span></div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="board_bottom" id="echart2"></div>
    </div>
  </div>

</template>

<script>
  // 0: {name: "万舟织造一部", id: }4
  // 1: {name: "万舟织造二部", id: }5
  // 2: {name: "兰棉", id: }2
  // 3: {name: "佳而美", id: }1
  import axios from 'axios';
  let host1 = "http://120.55.124.53";
  import {
    getUrl,
    wzBoard_api
  } from "../api/api"; //引入时间格式化js
  export default {
    name: "board",
    data() {
      return {
        lang: 'zh',
        workshopId: '5',
        companyId: this.$route.params.id, //公司库表Id
        defectMeter: "", //今日验布米数
        outPutMeterList: [], //工人产量排序
        batchMeterList: [], //产量批次排名
        productNameList: [],
        outPutMeterYesterdaList: [],
        outPutMeterList: [],
        outPutMeterList2: [],
        defectTotalToday: "",
        defectNumList: [],
        timer: null,
        flag1: null,
        flag2: null,
        defectNameList: []
      }
    },
    methods: {
      echart1() {
        let myChart1 = this.$echarts.init(document.getElementById('echart1'));
        // 绘制图表
        myChart1.clear();
        let that = this;
        axios({
            url: ' http://120.55.124.53:8226/defect/selectDefectStatistics', //疵点统计数据和今日疵点总数
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {

              workshopName: "三期"
            }

          })
          .then(response => {
            ////console.log(response)
            that.defectTotalToday = response.data.data.defectTotalToday

            let list = []
            let list2 = []
            for (let i = 0; i < response.data.data.defectList.length; i++) {
              list.push(response.data.data.defectList[i].defectName)
              list2.push(response.data.data.defectList[i].defectNum)
            }
            that.defectNameList = list
            that.defectNumList = list2
            let option = {
              title: {
                textStyle: {
                  color: "white",
                  fontSize: 20
                },
                left: "8%",
                text: "验布疵点排序统计"
              },
              xAxis: {
                type: 'category',
                axisLine: { //这是x轴文字颜色
                  lineStyle: {
                    color: "#fff",
                  },

                },
                boundaryGap: ['40%', '20%'],
                axisLabel: {
                  show: true,
                  textStyle: {
                    fontSize: 18
                  }
                },

                axisTick: {
                  show: false
                },
                data: that.defectNameList
              },
              yAxis: {
                axisLine: { //这是x轴文字颜色
                  lineStyle: {
                    color: "#fff",
                  }
                },

                splitLine: {
                  show: false
                },
                type: 'value'
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: "0",
                top: "15%",
                containLabel: true
              },
              series: [{
                data: that.defectNumList,
                type: 'bar',

                barCategoryGap: "5%",
                itemStyle: {
                  normal: {
                    //这里是重点
                    color: function (params) {
                      //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                      var colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83',
                        '#ca8622'
                      ];
                      return colorList[params.dataIndex]
                    },
                    label: {
                      show: true, //开启显示
                      position: 'top', //在上方显示
                      textStyle: { //数值样式
                        color: 'white',
                        fontSize: 12
                      }
                    }
                  }
                }
              }]
            };
            myChart1.setOption(
              option);
            window.addEventListener('resize', function () {
              myChart1.resize();
            })
          })


      },
      echart2() {


        let myChart1 = this.$echarts.init(document.getElementById('echart2'));
        // 绘制图表
        myChart1.clear();
        let that = this;
        axios({
            url: ' http://120.55.124.53:8226/defect/selectHdrMeterCompare', //  品种产量昨日今日对比
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {

              workshopName: "三期"
            }

          })
          .then(response => {
            ////console.log(response)
            let productNameList = []
            let outPutMeterList2 = []
            let outPutMeterYesterdaList = []
            let list = []
            response.data.data.meterCompareList = that.sortByKey(response.data.data.meterCompareList, "outPutMeter")
            if (response.data.data.meterCompareList.length >= 10) {
              for (let i = response.data.data.meterCompareList.length - 1; i > (response.data.data.meterCompareList
                  .length - 10); i--) {
                list.push(response.data.data.meterCompareList[i])
              }
              ////console.log(list)
              for (let i = 0; i < list.length; i++) {



                productNameList.push(list[i].workerName)
                outPutMeterYesterdaList.push(list[i].outPutMeterYesterday)
                outPutMeterList2.push(list[i].outPutMeter)
              }
            } else {
              list = response.data.data.meterCompareList
              ////console.log(list)
              for (let i = 0; i < list.length; i++) {



                productNameList.push(list[i].workerName)
                outPutMeterYesterdaList.push(list[i].outPutMeterYesterday)
                outPutMeterList2.push(list[i].outPutMeter)
              }
            }
            that.productNameList = productNameList
            that.outPutMeterYesterdaList = outPutMeterYesterdaList
            that.outPutMeterList2 = outPutMeterList2

            let option = {
              color: ['#44D7B6', '#F7B500'],
              title: {
                textStyle: {
                  color: "white",
                  fontSize: 20
                },
                left: "3.5%",
                text: "人员产量对比",
                top: "3%"
              },
              barMaxWidth: "30",
              xAxis: {
                type: 'category',
                axisLine: { //这是x轴文字颜色
                  lineStyle: {
                    color: "#fff",

                  },

                },
                axisLabel: {
                  show: true,
                  textStyle: {
                    fontSize: 18
                  }
                },
                axisTick: {
                  show: false
                },
                data: that.productNameList
              },
              tooltip: {
                positon: "inside"
              },
              legend: {

                top: "13%",
                right: "3%",
                fontSize: 25,
                data: ['昨日产量', '今日产量'],
                textStyle: {
                  color: 'white',
                  fontSize: 18
                }
              },

              yAxis: {
                axisLine: { //这是x轴文字颜色
                  lineStyle: {
                    color: "#fff",

                  }
                },
                splitLine: {
                  show: false
                },
                type: 'value'
              },
              grid: {
                left: '1%',
                right: '4%',
                bottom: "10%",
                top: "25%",
                containLabel: true
              },
              series: [{
                  name: '昨日产量',
                  type: 'bar',
                  data: that.outPutMeterYesterdaList,
                  barGap: "35%",
                  markPoint: {
                    data: [{
                        type: 'max',
                        name: '最大值'
                      },

                    ],
                    label: {
                      show: false,
                      position: ['28%', '60%'],
                      color: 'red', //气泡中字体颜色
                      fontWeight: "bold",
                    },

                    symbol: "image://https://s1.ax1x.com/2020/07/29/aZkQZF.png",
                    symbolOffset: [0, '-63%'],
                    symbolSize: [60, 40]
                  },

                },
                {
                  name: '今日产量',
                  type: 'bar',
                  barGap: "35%",
                  data: that.outPutMeterList2,
                  markPoint: {
                    data: [{
                        type: 'max',
                        name: '最大值'
                      },

                    ],
                    label: {
                      show: false,
                      position: ['28%', '60%'],
                      fontWeight: "bold",
                      color: 'red', //气泡中字体颜色
                    },
                    symbol: "image://https://s1.ax1x.com/2020/07/29/aZisTH.png",
                    symbolOffset: [0, '-63%'],
                    symbolSize: [60, 40]
                  },

                }
              ]
            };
            myChart1.setOption(
              option);
            window.addEventListener('resize', function () {
              myChart1.resize();
            })
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


              that.flag1 = false
              if (that.flag1 == false) {
                  // that.getData2()
                that.getData()
//  that.echart2() //机台产量对比统计图
//                 that.echart1() //验布疵点排序统计图
              
//               for(var i = 1; i < 1000; i++) {
// t=clearInterval(i);
// }
t=clearInterval(t)
t=null
//  that.timer=clearInterval(that.timer)
//                  that.changeWorkshopTiming()
                
                that.flag1 = true
                that.flag2 = true

                that.startmarquee(30, 50, 80)
                // that.startmarquee2(30, 50, 80)
              }
            }
          } else {
           t= clearInterval(t);
            setTimeout(start, delay);
          }
        }
        setTimeout(start, delay);
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
            if (preTop >= o.scrollHeight || preTop == o.scrollTop) {
              // 　　　　　　　o.scrollTop = 0;　

              that.flag2 = false
              if (that.flag2 == false) {
                that.getData2()
                // that.getData()

                // that.echart1() //验布疵点排序统计图
                //  that.echart2() //机台产量对比统计图
//             for(var i = 1; i < 1000; i++) {
// t=clearInterval(i);
// }
t=clearInterval(t)
t=null
  //  that.timer=clearInterval(that.timer)
  //              that.changeWorkshopTiming()
                that.flag1 = true
                that.flag2 = true
                    //  that.startmarquee(30, 50, 80)
                that.startmarquee2(30, 50, 80)
              }
            }
          } else {
           t= clearInterval(t);
            setTimeout(start, delay);
          }
        }
        setTimeout(start, delay);
      },
      changeWorkshopTiming: function () {
        this.timer = setInterval(() => {
          this.getData()
               this.getData2()
          this.echart1() //验布疵点排序统计图

          this.echart2() //机台产量对比统计图
          // let index = '';
          // let i = 0;
          // for ( i = 0;i<this.workshopList.length;i++){
          //   if (this.workshopList[i].value===this.workshopId){
          //     index = i;
          //   }
          // }
          // if (index+1<this.workshopList.length){
          //   this.workshopId = this.workshopList[index+1].value;
          //   this.workshopLabel = this.workshopList[index+1].label;
          // }
          // else {
          //   this.workshopId = this.workshopList[0].value;
          //   this.workshopLabel = this.workshopList[0].label;
          // }

        }, 15000);
        // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
        // this.$once('hook:beforeDestroy', () => {
        //   clearInterval(timer);
        // })
      },
      getData() {

        let that = this
        axios({
            url: ' http://120.55.124.53:8226/defect/selectDefectMeter', // 今日验布米数
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {

              workshopName: "三期"
            }

          })
          .then(response => {
            that.defectMeter = (response.data.data.defectMeter/10000).toFixed(2)
          })
       

      },
      getData2(){
        let that=this
         axios({
            url: ' http://120.55.124.53:8226/defect/selectHdrMeter', //工人产量排序
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {

              workshopName: "三期"
            }

          })
          .then(response => {

            let list = []
            for (let i = 0; i < response.data.data.outPutMeterList.length; i++) {
              list.push(response.data.data.outPutMeterList[i])
            }
            that.outPutMeterList = list
          })
        axios({
            url: ' http://120.55.124.53:8226/defect/selectHdrBatchNoMeter', //产量批次排名
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {

              workshopName: "三期"
            }

          })
          .then(response => {

            let list = []
            for (let i = 0; i < response.data.data.batchMeterList.length; i++) {
              list.push(response.data.data.batchMeterList[i])
            }
            that.batchMeterList = list

          })
      },
      //        autoScroll(stepLength, speed, delay, element) {

      //     let interval
      //     let step = 1
      //     element.scrollTop = 0


      //     function start() {
      //         interval = setInterval(scrolling, speed)
      //         element.scrollTop += step
      //     }

      //     function scrolling() {
      //         if (element.scrollTop % stepLength !== 0) {
      //           element.scrollTop += step
      //         } else {
      //           if (element.scrollTop === 0 || element.scrollTop === (element.scrollHeight - element.offsetHeight)) { // 触顶或触底
      //             return 
      //             step *= -1 // 转换方向
      //           }
      //           clearInterval(interval)
      //           setTimeout(start, delay)
      //         }
      //     }

      //     if (element.offsetHeight !== element.scrollHeight) { // 元素内容没有溢出时，不触发
      //         setTimeout(start, delay)
      //     }
      // },
      // 对象排序
      sortByKey(array, key) {
        return array.sort(function (a, b) {
          let x = a[key];
          let y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      },

    },




    filters: {

    },
    mounted() {

      this.echart1() //验布疵点排序统计图
       this.getData2()
      this.echart2() //机台产量对比统计图
      this.getData()
      this.startmarquee(30, 50, 80)
      this.startmarquee2(30, 50, 80)
       this.changeWorkshopTiming()
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    },

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
    height: 50rem;
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
    height: 48rem;

    display: flex;

    flex-direction: column;

  }

  .board_top {
    width: 100%;
    height: 24rem;
    display: flex;
  }

  .board_top_left {
    width: 40%;
    height: 24rem;

  }

  .board_top_middle {
    width: 23%;
    height: 24rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .board_top_middle_con {
    width: 95%;
    height: 21.6rem;

  }

  .font {
    width: 100%;
    height: 5.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: white;

  }

  .number {
    width: 100%;
    height: 3.24rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.4rem;
    color: #05B636;
    margin-bottom: 15%;
  }

  .number2 {
    width: 100%;
   height: 3.24rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.4rem;
    color: #FA6400;
    margin-bottom: 15%;
  }

  .board_top_right {
    width: 37%;
    height: 24rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .board_top_right_con {
    width: 80%;
    height: 24rem;

    display: flex;
    flex-direction: column;
  }

  .board_top_right_top {
    width: 100%;
    height: 10.8rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 2%;
  }

  .board_top_right_top_title {
    width: 100%;
    height: 2.16rem;
    display: flex;
    margin-bottom: 2%;
  }

  .board_top_right_top_content {
    width: 100%;
    height: 8.424rem;
    overflow: auto;

  }

  .board_top_right_top_content_con {
    width: 50%;
    height: 2.779rem;
    float: left;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;

  }

  .board_top_right_top_content_con span {
    width: 50%;
    text-align: left;
  }

  .board_top_right_top_content_con2 {
    width: 50%;
 height: 2.779rem;
    float: left;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;

  }

  .board_top_right_top_content_con2 span {
    width: 50%;
    text-align: right;
  }

  .img {
    width: 27.5%;
    height: 2.16rem;
    display: flex;
    align-items: center;

  }

  .img2 {
    width: 27.5%;
    height: 2.16rem;
    display: flex;
    align-items: center;

  }

  .img_line {
    width: 168px;
    height: 1px;
    background: white;
  }

  .radius {
    width: 23px;
    height: 1rem;
    background: white;
    border-radius: 50%;
  }

  .img_line2 {
    width: 168px;
    height: 1px;
    background: white;

  }





  .fonts {
    width: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 1.7rem;
  }

  .board_top_right_bottom {
    width: 100%;
    height: 12.72rem;
    display: flex;
    flex-direction: column;
  }

  .board_top_right_bottom_content {
    width: 100%;
    height: 9.92rem;

    overflow: auto;
  }

  .board_top_right_bottom_content_content {
    width: 100%;
    height: 33px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 3%;
  }

  .board_top_right_bottom_content_con {
    width: 100%;

    display: flex;
    justify-content: flex-start;
    align-items: center;

  }

  .board_top_right_bottom_content_con span {

    font-size: 1.5rem;
    height: 33px;
    text-align: left;
  }

  .board_bottom {
    width: 100%;
    height: 24rem;
  }

</style>
