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
          <div style="display:flex;flex-direction:column;overflow:auto;height: 18rem;" id="s1">
            <div class="board_con_top_con" v-for="(item,index) in tableData" :key="index">
              <div class="board_con_top_con_one">
                {{index+1}}
              </div>
              <div class="board_con_top_con_one">
                {{item.workshop}}
              </div>
              <div class="board_con_top_con_one">
                {{item.product_name}}
              </div>
              <div class="board_con_top_con_one">
                {{item.machine_id}}
              </div>
              <div class="board_con_top_con_one">
                {{item.beam_num}}
              </div>
              <div class="board_con_top_con_one">
                {{item.mac_type_name}}
              </div>
              <div class="board_con_top_con_one">
                {{item.status}}
              </div>
              <div class="board_con_top_con_one">
                {{item.reed_no}}
              </div>
              <div class="board_con_top_con_one">
                {{item.reed_width}}
              </div>
            </div>
          </div>

        </div>
        <div class="board_con_bottom">
          <div class="board_con_bottom_left">
            <div class="board_con_bottom_left_left">
              <div class="board_con_bottom_left_left_title">
                今日已完成
              </div>
              <div>
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
                <div style="display:flex;flex-direction:column;overflow:auto;height: 13rem;" id="s2">
                  <div class="board_con_bottom_left_left_tablehead" v-for="(item,index) in    tableData2" :key="index">
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
              </div>
            </div>
            <div class="board_con_bottom_left_right" id="dailyEchart">

            </div>
          </div>
          <div class="board_con_bottom_right">
            <div class="board_con_bottom_right_img">
              <div class="img1">
                <img src="../../static/img/circle2.png" id="img1" />
                <div class="img_span">
                  <span>S40今日穿综根数</span>
                  <span>{{sum1}}</span>
                </div>
              </div>
              <div class="img2">
                <img src="../../static/img/circle2.png" id="img2" />
                <div class="img_span2">
                  <span>S60今日穿综根数</span>
                  <span>{{sum2}}</span>
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
  let host1 = "http://106.12.219.66:8227";
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
        tableTitle: [
          "序号", "分厂", "品种", "穿棕机型", "穿棕轴数", "织机机型", "完成情况", "筘号", "筘幅",
        ],
        // dczList: [],
        // dczListLength: 0,
        // clpmList: [],
        // yczList: [],
        // yczListLength: 0,
        sum1: "",
        sum2: "",
        sum1Name: "",
        sum2Name: "",
        product_nameList: [],
        tableData2: [],
        companyname: "",
        root_numberList: [],
        tableData: []
        // legendList: [],
        // xList: [],
        // sList: []
      }
    },
    methods: {
      getWearAnalysis() {
        let url = "http://120.55.124.53:7070/wear-weaving/getWearAnalysis"
        axios({
            url: url,
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data: {
              "bean": {
                "day": 30
              }

            }

          })
          .then(response => {
            let xList = []
            let yList = []
            console.log(response)
            // let m=this.toGetMonth();
            response.data.data.forEach(element => {

              // if(element.ddate.substr(5,2)==String(m)){
              xList.push(element.ddate)
              //   xList.push(element.ddate.substr(8,2))
              yList.push(element.rootNumber)
              // }

            });
            console.log(xList)
            console.log(yList)
            this.clEchart(xList, yList)

          })
      },

      toGetMonth() {
        var myDate = new Date();
        let m = myDate.getMonth();
        if (m < 10) {
          m = "0" + m
        }
        console.log(m)
        return m
      },
      rotate() {
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

      pzEchart() {
        let myChart1 = this.$echarts.init(document.getElementById('pzEchart'));
        // 绘制图表
        myChart1.clear();
        let that = this
        let option = {

          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },

          series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '80%'],
            center: ['52%', '50%'],
            label: {
              position: "inside",
              formatter: '{d}% {b}'
            },
            labelLine: {
              show: false
            },

            data: that.root_numberList,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        };
        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },
      clEchart(xList, yList) {
        let myChart1 = this.$echarts.init(document.getElementById('dailyEchart'));
        // 绘制图表
        myChart1.clear();
        let option = {
          title: {
            text: "穿棕产量日对比",
            textStyle: {
              color: "#87D3F7",
              fontSize: 15
            },
            left: "center",
            top: 15
          },
          color: ['#87D3F7'],
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{

            type: 'category',
            data: xList,
            axisTick: {
              show: false
            },

            //            axisLabel: { //  如果这个字段不设置，echarts会根据屏宽及横坐标数据自动给出间隔
            //  interval: 2, // 间隔长度，可自定义（如果是时间格式，echarts会自动处理）

            // },
            axisLine: {
              lineStyle: {
                color: "#87D3F7"
              }
            }
          }],
          yAxis: [{


            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed'
              }
            },
            axisTick: {
              show: false
            },
            type: 'value',
            axisLine: {
              lineStyle: {
                color: "#87D3F7"
              }
            }
          }],
          series: [{
            name: '日产量',
            type: 'line',
            barWidth: '60%',
            data: yList
          }]
        };
        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },

      // 对象排序
      getsum() {
        let that = this
        //console.log(this. getNowFormatDate())
        axios({
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data: {

              tableName: "wear_weaving",
              pageNum: 1,
              pageSize: 3,
           

              selectFields: ["sum(root_number) as sum", "machine_id", "create_date"],
              groupByColumn: ['machine_id'],
              query:{
                machine_id:"S40"
              }

            }

          })
          .then(response => {
            console.log(response)
            // let arr=[]
            // response.data.data.forEach(element => {
            //   if(element.machine_id!="-1"){
            //     arr.push(element)
            //   }
            // });
             that.sum1 =response.data.data[0].sum
            // that.sum2 = arr[1].sum
      
          })
            axios({
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data: {

              tableName: "wear_weaving",
              pageNum: 1,
              pageSize: 3,
           

              selectFields: ["sum(root_number) as sum", "machine_id", "create_date"],
              groupByColumn: ['machine_id'],
              query:{
                machine_id:"S60"
              }

            }

          })
          .then(response => {
            console.log(response)
            // let arr=[]
            // response.data.data.forEach(element => {
            //   if(element.machine_id!="-1"){
            //     arr.push(element)
            //   }
            // });
            if(response.data.data.length>0){
that.sum2 =response.data.data[0].sum
            }else{
              that.sum2 =0
            }
             
            // that.sum2 = arr[1].sum
      
          })
      },
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
        that.root_numberList = []
        that.product_nameList = []
        axios({
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {

              tableName: "wear_weaving",
              groupByColumn: ["product_name"],
              selectFields: ["sum(root_number) as root_number", "product_name"],



            }

          })
          .then(res => {
            //////console.log(res)
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
            //////console.log(preTop)
            //////console.log(o.scrollHeight)
            //////console.log(o.scrollTop)
            if (preTop >= o.scrollHeight || preTop == o.scrollTop) {


              //////console.log("asd")
              // that.getData2()
              that.getdata2()
              //  that.echart2() //机台产量对比统计图
              //                 that.echart1() //验布疵点排序统计图

              //               for(var i = 1; i < 1000; i++) {
              // t=clearInterval(i);
              // }
              t = clearInterval(t)
              t = null
              //  that.timer=clearInterval(that.timer)
              //                  that.changeWorkshopTiming()


              that.startmarquee2(30, 50, 80)

            }
          } else {
            t = clearInterval(t);
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
            //////////console.log(res)
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
            //////////console.log(list)
            list = that.sortByKey(list, "root_number")
            let list2 = []
            for (let i = list.length - 1; i >= 0; i--) {
              list[i].create_time = list[i].create_time.substr(0, 10)
              list2.push(list[i])
            }
            that.clpmList = list2

          })
      },
      getdata2() { //今日待穿综记录
        let date = this.getNowFormatDate()
        let that = this

        that.tableData2 = []
        //////////console.log(date)
        axios({
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {

              tableName: "wear_weaving_plan",
              sort: "ASC",
              sortColumn: "status",
              selectLikeFields: {
                 update_time:date
              },
              // query: {
              //   status: 2
              // },
              pageNum: 1,
              pageSize: 100

            }

          })
          .then(response => {
            console.log(response)
            for (let i = 0; i < response.data.data.length; i++) {
                that.tableData2.push(response.data.data[i])
              //今日已完成列表
            }
            //console.log(that.tableData2)

          })
      },
      getdata() { //今日待穿综记录
        let date = this.getNowFormatDate()
        let that = this
        that.tableData = []

        //////////console.log(date)
        axios({
            url: host1 + '/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {

              tableName: "wear_weaving_plan",
              sort: "ASC",
              sortColumn: "status",
              selectLikeFields: {
                // update_time:date
              },
              // query: {
              //   status: 0
              // },
              pageNum: 1,
              pageSize: 100

            }

          })
          .then(response => {
            //console.log(response)
            for (let i = 0; i < response.data.data.length; i++) {

              if (response.data.data[i].workshop_id == 1) {
                response.data.data[i].workshop = "一分厂"
              } else if (response.data.data[i].workshop_id == 2) {
                response.data.data[i].workshop = "二分厂"
              } else if (response.data.data[i].workshop_id == 3) {
                response.data.data[i].workshop = "三分厂"
              }
              if (response.data.data[i].status == 0) {
                response.data.data[i].status = "未开始"
              } else if (response.data.data[i].status == 1) {
                // let num= that.GetPercent(response.data.data[i].finish_beam_num,response.data.data[i].beam_num) 
                response.data.data[i].status = "进行中("+response.data.data[i].finish_beam_num+"/"+response.data.data[i].beam_num+")"
               
              } else if (response.data.data[i].status == 2) {
                response.data.data[i].status = "已完成"
              }
              if( response.data.data[i].status!="已完成"){
that.tableData.push(response.data.data[i])
              }
              

            }


          })
      },
       GetPercent(num, total) {
    /// <summary>
    /// 求百分比
    /// </summary>
    /// <param name="num">当前数</param>
    /// <param name="total">总数</param>
    num = parseFloat(num);
    total = parseFloat(total);
    if (isNaN(num) || isNaN(total)) {
        return "-";
    }
    return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00)+"%";
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
            //////console.log(preTop)
            //////console.log(o.scrollHeight)
            //////console.log(o.scrollTop)
            if (preTop >= o.scrollHeight || preTop == o.scrollTop) {



              // that.getData2()
              that.getdata()
              //  that.echart2() //机台产量对比统计图
              //                 that.echart1() //验布疵点排序统计图

              //               for(var i = 1; i < 1000; i++) {
              // t=clearInterval(i);
              // }
              t = clearInterval(t)
              t = null
              //  that.timer=clearInterval(that.timer)
              //                  that.changeWorkshopTiming()


              that.startmarquee(30, 50, 80)

            }
          } else {
            t = clearInterval(t);
            setTimeout(start, delay);
          }
        }
        setTimeout(start, delay);
      },

      changeWorkshopTiming: function () {
        const timer = setInterval(() => {


          this.getsum()


          this.getWearAnalysis()
          this.getdata()
          this.getdata2()
          this.getdata4()
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
      this.companyId = this.$route.params.id
      if (this.companyId == "10000022") {
        this.companyname = "祥嘉"
        host1 = "http://47.99.156.243:8227"
      } else if (this.companyId == "10000012") {
        this.companyname = "七星"

      }
      this.getsum()


      this.getWearAnalysis()
      this.getdata()
      this.getdata2()
      this.getdata4()
      //  this. changeWorkshopTiming()
      this.startmarquee2(30, 50, 80)
      this.startmarquee(30, 50, 80)
      this.rotate()


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
    height: 48rem;
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
    background: rgb(15, 49, 83);
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

  .board_con_bottom_left_left_title {
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

  .board_con_bottom_left_left_tablehead {
    width: 100%;
    height: 2.85rem;
    font-size: 1.3rem;
    font-weight: 500;
    color: white;
    background: rgb(15, 49, 83);

    display: flex;

  }

  .board_con_bottom_left_left_tablehead_one {
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

  .img1 {
    width: 11rem;
    height: 11rem;
    position: absolute;
    left: 15px;
    top: 15px;
  }

  .img_span {
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

  .img_span2 {
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

  .img1 img {
    width: 11rem;
    height: 11rem;

  }

  .img2 {
    width: 11rem;
    height: 11rem;
    position: absolute;
    right: 0px;
    bottom: 0px;

  }

  .img2 img {
    width: 11rem;
    height: 11rem;

  }

  .board_con_bottom_right_echart {
    width: 60%;
    height: 100%;



  }

</style>
