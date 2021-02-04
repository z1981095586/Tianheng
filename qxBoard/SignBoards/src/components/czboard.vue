<template>
  <div class="content">
    <header style="height: 3rem">
      <div class="title">{{companyname}}纺织穿综信息监控平台</div>

    </header>
    <div class="board">
      <div class="board_con">
        <div class="board_con_left">
          <div class="board_con_title">S40</div>
          <div class="thead">
            <div class="thead_con">
              <div class="thead_con_one" style="width:8.5%">序号</div>
              <div class="thead_con_one" style="width:12.5%">分厂</div>
              <div class="thead_con_one" style="width:13.5%">品种</div>
              <div class="thead_con_one" style="    width: 11.5%;">穿棕轴数</div>
              <div class="thead_con_one" style="    width: 13.5%;">织机机型</div>
              <div class="thead_con_one" style="    width: 13.5%;">完成情况</div>
              <div class="thead_con_one" style="width:11%">筘号</div>
              <div class="thead_con_one" style="    width: 15.5%;">排产日期</div>
            </div>
          </div>
          <div class="tbody">
            <div class="tbody_con">
              <vue-seamless-scroll :data="S40List" v-show="S40List.length>12" :class-option="classOption">
                <div class="tbody_row" v-for="(item,index) in S40List" :key="index">
                  <div class="tbody_row_one" style="width:8.5%"> {{index+1}}</div>
                  <div class="tbody_row_one" style="width:12.5%"> {{item.workshop_type}}</div>
                  <div class="tbody_row_one" style="width:13.5%"> {{item.product_name}}</div>
                  <div class="tbody_row_one" style="    width: 11.5%;"> {{item.beam_num}}</div>
                  <div class="tbody_row_one" style="    width: 13.5%;"> {{item.mac_type_name}}</div>
                  <div class="tbody_row_one" style="    width: 13.5%;"><span :class="item.color"> {{item.status}}</span>
                  </div>
                  <div class="tbody_row_one" style="width:11%"> {{item.reed_no}}</div>
                  <div class="tbody_row_one" style="    width: 15.5%;">{{item.update_time}}</div>
                </div>
              </vue-seamless-scroll>
              <div class="tbody_row" v-for="(item,index) in S40List" v-show="!(S40List.length>12)" :key="index">
                <div class="tbody_row_one" style="width:8.5%"> {{index+1}}</div>
                <div class="tbody_row_one" style="width:12.5%"> {{item.workshop_type}}</div>
                <div class="tbody_row_one" style="width:13.5%"> {{item.product_name}}</div>
                <div class="tbody_row_one" style="    width: 11.5%;"> {{item.beam_num}}</div>
                <div class="tbody_row_one" style="    width: 13.5%;"> {{item.mac_type_name}}</div>
                <div class="tbody_row_one" style="    width: 13.5%;"><span :class="item.color"> {{item.status}}</span>
                </div>
                <div class="tbody_row_one" style="width:11%"> {{item.reed_no}}</div>
                <div class="tbody_row_one" style="    width: 15.5%;">{{item.update_time}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="board_con_right">
          <div class="board_con_title">S60</div>
          <div class="thead">
            <div class="thead_con">
              <div class="thead_con_one" style="width:8.5%">序号</div>
              <div class="thead_con_one" style="width:12.5%">分厂</div>
              <div class="thead_con_one" style="width:13.5%">品种</div>
              <div class="thead_con_one" style="    width: 11.5%;">穿棕轴数</div>
              <div class="thead_con_one" style="    width: 13.5%;">织机机型</div>
              <div class="thead_con_one" style="    width: 13.5%;">完成情况</div>
              <div class="thead_con_one" style="width:11%">筘号</div>
              <div class="thead_con_one" style="    width: 15.5%;">排产日期</div>
            </div>
          </div>
          <div class="tbody">
            <div class="tbody_con">
              <vue-seamless-scroll :data="S60List" v-show="S60List.length>12" :class-option="classOption">
                <div class="tbody_row" v-for="(item,index) in S60List" :key="index">
                  <div class="tbody_row_one" style="width:8.5%"> {{index+1}}</div>
                  <div class="tbody_row_one" style="width:12.5%"> {{item.workshop_type}}</div>
                  <div class="tbody_row_one" style="width:13.5%"> {{item.product_name}}</div>
                  <div class="tbody_row_one" style="    width: 11.5%;"> {{item.beam_num}}</div>
                  <div class="tbody_row_one" style="    width: 13.5%;"> {{item.mac_type_name}}</div>
                  <div class="tbody_row_one" style="    width: 13.5%;"><span :class="item.color"> {{item.status}}</span>
                  </div>
                  <div class="tbody_row_one" style="width:11%"> {{item.reed_no}}</div>
                  <div class="tbody_row_one" style="    width: 15.5%;">{{item.update_time}}</div>
                </div>
              </vue-seamless-scroll>
              <div class="tbody_row" v-for="(item,index) in S60List" v-show="!(S60List.length>12)" :key="index">
                <div class="tbody_row_one" style="width:8.5%"> {{index+1}}</div>
                <div class="tbody_row_one" style="width:12.5%"> {{item.workshop_type}}</div>
                <div class="tbody_row_one" style="width:13.5%"> {{item.product_name}}</div>
                <div class="tbody_row_one" style="width: 11.5%;"> {{item.beam_num}}</div>
                <div class="tbody_row_one" style="    width: 13.5%;"> {{item.mac_type_name}}</div>
                <div class="tbody_row_one" style="    width: 13.5%;"><span :class="item.color"> {{item.status}}</span>
                </div>
                <div class="tbody_row_one" style="width:11%"> {{item.reed_no}}</div>
                <div class="tbody_row_one" style="    width: 15.5%;">{{item.update_time}}</div>
              </div>
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
  import vueSeamlessScroll from 'vue-seamless-scroll'
  let host1 = "http://106.12.219.66:8227";
  import {
    getUrl,
    wzBoard_api
  } from "../api/api"; //引入时间格式化js
  export default {
    name: "czboard",
    components: {
      vueSeamlessScroll
    },
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
        tableData: [],
        S40List: [],
        S60List: []
        // legendList: [],
        // xList: [],
        // sList: []
      }
    },
    computed: {

      classOption() {
        return {
          step: 0.4, // 数值越大速度滚动越快
          limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
          hoverStop: true, // 是否开启鼠标悬停stop
          direction: 1, // 0向下 1向上 2向左 3向右
          openWatch: true, // 开启数据实时监控刷新dom
          singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
          singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
          waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
        }
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
          animation: false,
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
          animation: false,
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
        let date = that.getNowFormatDate()
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
              query: {
                machine_id: "S40"
              },
              selectLikeFields: {
                create_date: date
              },

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
            if (response.data.data[0]) {
              that.sum1 = response.data.data[0].sum
            } else {
              that.sum1 = 0
            }

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
              query: {
                machine_id: "S60"
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
            if (response.data.data.length > 0) {
              that.sum2 = response.data.data[0].sum
            } else {
              that.sum2 = 0
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
            console.log(res)
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



      // getdata2() { //产量排行
      //   let that = this
      //   axios({
      //       url: host1 + '/report/getSimpleReport',
      //       method: 'post',
      //       headers: {
      //         'Content-Type': 'application/json',
      //         'companyId': that.companyId
      //       },
      //       data: {

      //         tableName: "wear_weaving",
      //         //   sort: "DESC",
      //         //   sortColumn: "aef",
      //         // query:{
      //         //   wear_plan_id:response.data.data[i].id
      //         // }

      //       }

      //     })
      //     .then(res => {
      //       //////////console.log(res)
      //       let list = res.data.data
      //       list = list.reduce((obj, item) => {
      //         let find = obj.find(i => i.product_name === item.product_name)
      //         let _d = {
      //           ...item,
      //           frequency: 1
      //         }
      //         find ? (find.root_number += item.root_number, find.frequency++) : obj.push(_d)
      //         return obj
      //       }, [])
      //       //////////console.log(list)
      //       list = that.sortByKey(list, "root_number")
      //       let list2 = []
      //       for (let i = list.length - 1; i >= 0; i--) {
      //         list[i].create_time = list[i].create_time.substr(0, 10)
      //         list2.push(list[i])
      //       }
      //       that.clpmList = list2

      //     })
      // },
      getdata2() { //今日待穿综记录
        let date = this.getNowFormatDate()
        let that = this


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
                update_time: date
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
            let arr = []
            for (let i = 0; i < response.data.data.length; i++) {
              if (i == (response.data.data.length - 1)) {
                response.data.data[i].row = "border-bottom:0.01px solid black;"
              } else {
                response.data.data[i].row = ""
              }
              arr.push(response.data.data[i])
              //今日已完成列表
            }
            that.tableData2 = arr
            //console.log(that.tableData2)

          })
      },
      getdata() { //今日待穿综记录
        let date = this.getNowFormatDate()
        let that = this
        // that.tableData = []

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

            let arr = []
            for (let i = 0; i < response.data.data.length; i++) {
              if (i == (response.data.data.length - 1)) {
                response.data.data[i].row = "border-bottom:0.01px solid black;"
              } else {
                response.data.data[i].row = ""
              }
              if (response.data.data[i].workshop_id == 1) {
                response.data.data[i].workshop = "一分厂"
              } else if (response.data.data[i].workshop_id == 2) {
                response.data.data[i].workshop = "二分厂"
              } else if (response.data.data[i].workshop_id == 3) {
                response.data.data[i].workshop = "三分厂"
              }
              response.data.data[i].update_time = response.data.data[i].update_time.substring(0, 11);
              if (response.data.data[i].status == 0) {
                response.data.data[i].status = "未开始"
                response.data.data[i].color = "red"
              } else if (response.data.data[i].status == 1) {
                response.data.data[i].color = "green"
                // let num= that.GetPercent(response.data.data[i].finish_beam_num,response.data.data[i].beam_num) 
                response.data.data[i].status = "进行中(" + response.data.data[i].finish_beam_num + "/" + response.data
                  .data[i].beam_num + ")"

              } else if (response.data.data[i].status == 2) {
                response.data.data[i].status = "已完成"
              }
              if (response.data.data[i].status != "已完成") {
                arr.push(response.data.data[i])
              }


            }
            that.tableData = arr
            console.log(that.tableData)
            let arr2 = []
            let arr3 = []
            arr.forEach(element => {
              if (element.machine_id == "S40") {
                arr2.push(element)
              } else if (element.machine_id == "S60") {
                arr3.push(element)
              }
            });
            that.S40List = arr2
            that.S60List = arr3


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
        return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00) + "%";
      },
      getWarningPushDataTiming: function () {
       this.timer = setInterval(() => {
          // this.getsum()
          // this.getWearAnalysis()
          this.getdata()
          // this.getdata2()
          // this.getdata4()
          // this.getStartRatesYMD(this.workshopId);
        }, 5000);
        // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
        this.$once('hook:beforeDestroy', () => {
          clearInterval(this.timer);
          this.timer=null
  
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

      // this.getsum()


      // this.getWearAnalysis()
      this.getdata()
      // this.getdata2()
      // this.getdata4()
      this.getWarningPushDataTiming()

      // this.rotate()



    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
        this.timer=null
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
    justify-content: space-between;
    align-items: center;
  }

  .board_con_title {
    width: 100%;
    height: 9%;
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(5, 178, 255, 0.45);
  }

  .board_con_left {
    width: 49%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: rgba(5, 178, 255, 0.2);
    border: 1px solid rgba(5, 178, 255, 0.45);

  }

  .board_con_right {
    width: 49%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: rgba(5, 178, 255, 0.2);
    border: 1px solid rgba(5, 178, 255, 0.45);

  }

  .thead {
    width: 100%;
    height: 5%;
    display: flex;
    align-items: center;
    margin-top: 1%;
    justify-content: center;

  }

  .thead_con {
    width: 96%;
    border-radius: 2px;
    height: 2.2rem;
    display: flex;
    align-items: center;
    background: rgb(1, 85, 115);

  }

  .thead_con_one {
    width: 12.5%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: white;
  }

  .tbody {
    width: 100%;
    height: 85%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tbody_con {
    width: 96%;

    height: 100%;

    overflow: hidden;

  }

  .tbody_row {
    width: 100%;
    height: 3rem;
    border-bottom: 1px dashed rgba(0, 251, 255, 0.9);
    color: white;
    display: flex;
    align-items: center;
  }

  .tbody_row_one {
    width: 12.5%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    line-height: 1.8rem;
    color: white;
  }

  .green {
    width: 100%;
    height: 60%;
    background: rgba(0, 255, 7, 0.25);
    border: 1px solid rgb(0, 255, 7);
    border-radius: 10px;
  }

  .red {
    width: 100%;
    height: 60%;
    background: rgba(254, 56, 56, 0.25);
    border: 1px solid rgb(254, 56, 56);
    border-radius: 10px;
  }

</style>
