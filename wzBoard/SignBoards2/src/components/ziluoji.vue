<template>
  <div class="content">
    <header style="height: 3rem">
      <div class="title">万舟控股信息化监控平台</div>

    </header>
    <div class="board">
      <div class="board_con">
        <div class="board_con_top">
          <div class="board_con_top_con">
            <div class="board_con_top_con_title">自络机生产效率排行</div>
            <div class="board_con_top_con_content" id="s1">
              <div class="board_con_top_con_content_one" v-for="(item,index) in list" :key="index">
                <div class="board_con_top_con_content_one_con">
                  <div class="board_con_top_con_content_one_left">
                    <div class="fangkuai" :style="item.color">{{index+1}}</div>
                    <span style="color:#EEDBDB">{{item.machineId}}</span>
                  </div>
                  <div class="board_con_top_con_content_one_right">
                    <span :style="item.fontcolor">效率：{{item.aef}}%</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div class="board_con_top_con2">
            <!-- <div class="radius">
              <div class="radius_font">
                <div class="span1">总产量</div>
                <div class="span2">{{sum}}</div>
              </div>

            </div> -->
            <div class="radius_font">
              <div class="span1">总产量</div>
              <div class="span2">{{sum}}</div>
            </div>
            <vue-particles class="radius" color="#fff" :particleOpacity="0.7" :particlesNumber="70" shapeType="circle"
              :particleSize="4" linesColor="#fff" :linesWidth="1" :lineLinked="false" :lineOpacity="0.4"
              :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true"
              clickMode="push">
              <!-- 粒子特效块 -->
              <!-- 属性：
color: String类型。默认'#dedede'。粒子颜色。
particleOpacity: Number类型。默认0.7。粒子透明度。
particlesNumber: Number类型。默认80。粒子数量。
shapeType: String类型。默认'circle'。可用的粒子外观类型有："circle","edge","triangle", "polygon","star"。
particleSize: Number类型。默认80。单个粒子大小。
linesColor: String类型。默认'#dedede'。线条颜色。
linesWidth: Number类型。默认1。线条宽度。
lineLinked: 布尔类型。默认true。连接线是否可用。
lineOpacity: Number类型。默认0.4。线条透明度。
linesDistance: Number类型。默认150。线条距离。
moveSpeed: Number类型。默认3。粒子运动速度。
hoverEffect: 布尔类型。默认true。是否有hover特效。
hoverMode: String类型。默认true。可用的hover模式有: "grab", "repulse", "bubble"。
clickEffect: 布尔类型。默认true。是否有click特效。
clickMode: String类型。默认true。可用的click模式有: "push", "remove", "repulse", "bubble"。
 -->
            </vue-particles>
          </div>
          <div class="board_con_top_con3" id="echart">

          </div>
        </div>
        <div class="board_con_bottom">
          <div class="board_con_bottom_con" id="echart2">

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
  import VueParticles from 'vue-particles' 
  let host1 = "http://106.12.219.66:8227";
  import {
    getUrl,
    wzBoard_api
  } from "../api/api"; //引入时间格式化js
  export default {
    name: "board",
    data() {
      return {
        lang: 'zh',
        workshopId: '3',
        companyId: this.$route.params.id, //公司库表Id
        list: [], //数据数组
        sum: 0, //总产量
        prkgList: [],
        machineIdList: [],
        prkgList2: [],
        piciList: [],

        flag: false,
        pch: 0
      }
    },
    methods: {
      changeWorkshopTiming: function () {
        const timer = setInterval(() => {

            this.getData()
        }, 15000);
        // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
        // this.$once('hook:beforeDestroy', () => {
        //   clearInterval(timer);
        // })
      },
      startmarquee(lh, speed, delay) { //自动滚动
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

            if (preTop >= o.scrollHeight || preTop == o.scrollTop) {




               that.getData2()


              // for (var i = 1; i < 1000; i++) {
              //   t = clearInterval(i);
              // }
t=clearInterval(t)
t=null
              //console.log(t)


              that.startmarquee(80, 30, 80)


            }
          } else {
            t = clearInterval(t);
            setTimeout(start, delay);
          }
        }
        setTimeout(start, delay);
      },
      getData2(){
   let that = this
        axios({
            url: host1+'/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': 0
            },
            data: {

              tableName: "ziluoji",
              sort: "DESC",
              sortColumn: "aef+0",


            }

          })
          .then(response => {
            //console.log("1")
             let list = []
                  for (let i = 0; i < response.data.data.length; i++) {
                           if (i == 0) { //前三名加颜色
                response.data.data[i].color = "background:#5CF803"
                response.data.data[i].fontcolor = "color:#5CF803"
              } else if (i == 1) {
                response.data.data[i].color = "background:#F8DF03"
                response.data.data[i].fontcolor = "color:#F8DF03"

              } else if (i == 2) {
                response.data.data[i].color = "background:#F86D03"
                response.data.data[i].fontcolor = "color:#F86D03"
              } else {
                response.data.data[i].color = "background:#008B95"
                response.data.data[i].fontcolor = "color:#fff"
              }
                   if(response.data.data[i].machineId!="AVG"){
              
                        list.push(response.data.data[i])
                   
                }
                
                  }
                         if (that.flag == false) { //获取数据完成开始滚动，在getdata中只执行一次加载滚动
              that.startmarquee(80, 30, 80)
              that.flag = true
            }
                       that.list = list
          })
      },
      getData() { //获取数据
        let that = this
        axios({
            url: host1+'/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': 0
            },
            data: {

              tableName: "ziluoji",
              sort: "DESC",
              sortColumn: "aef+0",


            }

          })
          .then(response => {
            //console.log(response)
             let sum = 0
          
         
             let list = []
            let machineIdList = []
            let prkgList = []
            for (let i = 0; i < response.data.data.length; i++) {
  if(response.data.data[i].machineId=="AVG"){
           sum=response.data.data[i].prkg
          //console.log(response.data.data[i].prkg)
            }
              if (response.data.data[i].prkg == null || response.data.data[i].prkg == "") {
                response.data.data[i].prkg = 0
              }
              // sum = sum + parseFloat(response.data.data[i].prkg) //总产量
           
              if (i == 0) { //前三名加颜色
                response.data.data[i].color = "background:#5CF803"
                response.data.data[i].fontcolor = "color:#5CF803"
              } else if (i == 1) {
                response.data.data[i].color = "background:#F8DF03"
                response.data.data[i].fontcolor = "color:#F8DF03"

              } else if (i == 2) {
                response.data.data[i].color = "background:#F86D03"
                response.data.data[i].fontcolor = "color:#F86D03"
              } else {
                response.data.data[i].color = "background:#008B95"
                response.data.data[i].fontcolor = "color:#fff"
              }
              // if(response.data.data[i].machineId=="24"){
              //   //console.log(response.data.data[i].prkg)
              //   //console.log(parseInt(response.data.data[i].prkg))
              // }
                if(response.data.data[i].machineId!="AVG"){
                       prkgList.push(parseFloat(response.data.data[i].prkg.replace(/,/g,'')))
                        list.push(response.data.data[i])
                         machineIdList.push(response.data.data[i].machineId)
                }
               
           

            }
              //console.log(list)
            that.sum = sum
       
            that.prkgList = prkgList

            that.machineIdList = machineIdList
     
            that.echart2()
          })
        axios({
            url: host1+'/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': 0
            },
            data: {

              tableName: "ziluojiPici",
              sort: "DESC",
              sortColumn: "aef",


            }

          })
          .then(response => {
            //console.log(response)
            let list = response.data.data
            let piciList = []
            let prkgList2 = []
            for (let i = 0; i < list.length; i++) {
              if (list[i].prkg == null || list[i].prkg == "") {
                list[i].prkg = 0
              } else {
                list[i].prkg = parseFloat(list[i].prkg)
              }

            }
            list = list.reduce((obj, item) => {
              let find = obj.find(i => i.pici === item.pici)
              let _d = {
                ...item,
                frequency: 1
              }

              find ? (find.prkg += item.prkg, find.frequency++) : obj.push(_d)
              return obj
            }, [])
            //console.log(list)
            for (let i = 0; i < list.length; i++) {
              piciList.push(list[i].pici)
              prkgList2.push({
                "name": list[i].pici,
                "value": list[i].prkg
              })
            }
            that.prkgList2 = prkgList2
            that.piciList = piciList
            that.pch = that.piciList.length
            that.echart()
          })

      },
    
      echart() { //自络机批次号
        let myChart1 = this.$echarts.init(document.getElementById('echart'));
        // 绘制图表
        myChart1.clear();
        let that = this;
        let option = {
          title: {

            left: "40%",
            top: "5%",
            textStyle: {
              color: "#10FFC6",
              fontSize: 14,
              fontWeight: "normal"
            },
            text: "自络机批次号"
          },
          tooltip: {
            trigger: 'item',
            formatter(params) {
              for (x in params) {
                return null;
              }

            }


          },
          legend: {
            selectedMode: false,
            type: 'scroll',
  
            orient: 'vertical',
            right: 30,
            top: "20%",
            textStyle: {
              fontSize: 10,
              color: "white"
            },
            data: that.piciList
          },
          graphic: [{//环形图中间添加文字
              type: 'text',
              left: '28.5%',
              top: '45%',
              style: {
                text: '总批次号',
                textAlign: 'center',
                color: '#fff',
                fill: '#fff',
                width: 30,
                height: 30,
                fontSize: 18,
              }
            },
            { 
              type: 'text', //通过不同top值可以设置上下显示
              left: '33.5%',
              top: '52%',
              style: {
                text: that.pch + "个",
                textAlign: 'center',
                fill: '#39F1FF', //文字的颜色
                width: 30,
                height: 30,
                fontSize: 18,
                color: "#39F1FF",
                fontFamily: "Microsoft YaHei"
              }
            },
          ],
          series: [{
            name: '访问来源',
            type: 'pie',
            label: {
              position: 'center',
              formatter: '总批次号12个',
              fontSize: 20
            },
            radius: ['40%', '60%'],
            center: ['38%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },

            labelLine: {
              show: false
            },
            data: that.prkgList2
          }]
        };
        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },
      echart2() { //每台自络机产量对比
        let myChart1 = this.$echarts.init(document.getElementById('echart2'));
        // 绘制图表
        myChart1.clear();
        let that = this
        let option = {
          title: {

            left: "45%",
            top: "3%",
            textStyle: {
              color: "#10FFC6",
              fontSize: 13,
              fontWeight: "normal"
            },
            text: "每台自络机产量对比"
          },
          xAxis: {
            type: 'category',
            data: that.machineIdList,
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 14
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
          },
          yAxis: {
            type: 'value',
            name: "产量/kg",
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
                color: "rgba(238,219,219,1)",
                fontSize: 10
              }
            },
          },
          grid: {
            left: '4%',
            bottom: "12%",
            top: '30%',
            right: "2%"
          },
          series: [{
            itemStyle: { //柱图背景色
              color: '#64D4E6'
            },
            data: that.prkgList,
            barWidth:"50%",
            label:{
              show:true,
                position: 'top'
            },
            type: 'bar'
          }]
        };
        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },
       d(){
        let list
          axios({
            url: host1+'/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': 0
            },
            data: {

              tableName: "ziluojiPici",
              sort: "DESC",
              sortColumn: "aef",


            }

          })
          .then(response => {
            console.log(response)
            list=response
          }).then(()=>{
   console.log(list)
          })
       
      }


    },




    filters: {

    },
    mounted() {

this.getData2()
      this.getData()
      this.changeWorkshopTiming()
      //      const timer = setTimeout(() => {
this.d()
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
    height: 93%;
    /* height: 71%; */

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .board_con {
    width: 96%;
    height: 95%;

    display: flex;
    flex-direction: column;
  }

  .board_con_top {
    width: 100%;
    height: 60%;
    display: flex;
    align-items: center;


  }

  .board_con_bottom {
    width: 100%;
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .board_con_bottom_con {
    width: 100%;
    height: 80%;
    background: #051F3C;
  }

  .board_con_top_con {
    background: #051F3C;
    width: 35%;
    height: 100%;

  }

  .board_con_top_con_title {
    width: 100%;
    height: 10%;
    margin-bottom: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #10FFC6;
    font-size: 14px;
  }

  .board_con_top_con_content {
    width: 100%;
    height: 80%;
    overflow: auto;
  }

  .board_con_top_con_content_one {
    width: 100%;
    height: 12.6%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .board_con_top_con_content_one_con {
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px dashed rgba(78, 78, 78, 1);
    opacity: 1;
  }

  .board_con_top_con_content_one_left {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

  }

  .fangkuai {
    width: 20px;
    height: 20px;
    background: #5CF803;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    color: black;
  }

  .board_con_top_con_content_one_right {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

  }

  .board_con_top_con2 {

    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .radius {
    width: 300px;
    height: 300px;
    background-image: url("../../static/img/radius2.png");
    background-size: 100% 100%;

    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .radius_font {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 40.5%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .span1 {
    width: 100%;
    height: 27%;
    text-align: center;
    color: white;
    font-size: 14px;
  }

  .span2 {
    width: 100%;
    height: 20%;
    font-size: 17px;
    text-align: center;
    color: #FCA016;
  }

  .board_con_top_con3 {
    background: #051F3C;
    width: 35%;
    height: 100%;

  }

</style>
