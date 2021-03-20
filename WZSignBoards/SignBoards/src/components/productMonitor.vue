<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="content4">
  
    <header>
      <div class="title"></div>
      <h1 class="tip">
        <a style="margin-left: 23%;cursor: pointer" @click="dialogFormVisible = true" id="xinhai"
           v-for="item in workshopList" v-if="item.value==workshopId">{{item.label}}</a>
        <el-dialog id="dialog" center width="22%" :modal="false" :visible.sync="dialogFormVisible">
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="choseFactory(item.value)" v-for="item in workshopList" :key="item.value">{{item.label}}
          </el-button>
        </el-dialog>
        <span style="float: right;margin-right: 19.5%">{{date | formatDate}} </span>
      </h1>
    </header>
    <el-row :gutter="5">
      <el-col :span="17">
        <el-row>
          <el-col :span="24">
            <div class="deviceState" ref="iframe1">
              <iframe id="iframe1" v-bind:src="src2" marginwidth='0' marginheight='0' width="100%" height="100%"
                      class="deviceStateCharts" frameborder="0">
              </iframe>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="7">
        <div class="monitor" style="position:relative;">
          <div class="head">整经机</div>
          <div class="all-card">
            <div v-for="(item,index) in zjList" :key="index" style="  width: 25%;float:left;    margin: 1%;

    margin-left: 1%;
    margin-right: 7%;
    margin-top: 1%;
      height: 45%;">
              <div class="one-card-green" v-if="item.flag">
                <div class="one-card-name">{{item.machine_id}}</div>
                <div class="one-card-cl">班产量：{{item.bcl}}Km</div>
                <div class="one-card-xl">断头数：{{item.duantou}}</div>
                 <div class="one-card-dt">断头率：{{item.duantoulv}}%</div>
                <div class="one-card-wcd">轴完成度：{{item.zwcd}}%</div>
              </div>
              <div class="one-card-orange" v-if="!item.flag">
                <div class="one-card-name">{{item.machine_id}}</div>
                <div class="one-card-cl">班产量：{{item.bcl}}Km</div>
                <div class="one-card-xl">断头数：{{item.duantou}}</div>
                <div class="one-card-dt">断头率：{{item.duantoulv}}%</div>
                <div class="one-card-wcd">轴完成度：{{item.zwcd}}%</div>
              </div>
            </div>
          </div>
          <div class="head" style="positon:relative;">浆纱机   </div>
          <div class="all-card" style="height:17rem">
            <div :class="{'one-card2':(item.flag==true),'one-card22':(item.flag==false)}" v-for="(item,index) in jsList" :key="index">
              <div class="one-card2-name">{{item.machine_id}}</div>
              <div class="one-card2-clxl">
                <div class="con">当日产量：{{item.actual_yarn_length}}m</div>
                <div class="con"> 品种：{{item.type}}</div>
              </div>
              <div class="one-card2-tjwcd">
                <div class="con">当日停车：{{item.stop_num}}</div>
                <div class="con">轴完成度： {{item.zwcd}}%</div>
              </div>
              <div class="one-card2-zlhsl">
                <div class="con">卷绕张力： {{item.winding_tension}}</div>
                <div class="con">回潮率： {{item.regain}}%</div>
              </div>
              <div class="one-card2-cstf">
                <div class="con">车速： {{item.speed}}m/s</div>
                <div class="con">头份： {{item.first_part}}</div>
              </div>
            </div>
            
          </div>
          <div class="e-chart-card" style="height:260px;width:100%" id="zx_echart">
          </div>
    
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios';
  import {formatDate} from "../static/js/date"; //引入时间格式化js
  export default {
    name: "productMonitor",
    data() {
      return {
        zjList: [],
        jsList: [],
        zxt_data: [],
        zxt_data2: [],
        lang: 'zh',
        workshopId: '',
        src2: '',//设备状态图
        workshopList: [],// 车间编号
        chartWorkshopList: [],// 图表车间数组
        dialogFormVisible: false,//对话框
        deviceHeight: '',//iframe外层div高度
        deviceWidth: '',//iframe外层div宽度
        date: new Date(),
        url: window.apiRoot.api_board,
        companyId: this.$route.params.id,//公司库表Id
        buttonName: 'zh-CN',
        zongchanlaingduibi: true,//总产量推移界面
        chanliangtuyi: true,//产量对比界面
        warp_page: true,//整经监控界面
        sizing_page: false,//浆纱监控界面
        warpDetail_page: false,//整经详细界面
        sizingDetail_page: false,//浆纱详细界面
        currentLength: 2900,//当前长度
        totalLength: 4500,//总共长度
        tableData: [],  //预警表
        lioajiData: [],//了机数据
        lioajiIngData: [],//当前了机
        activeName: 'first',//预警区域选项
        //===================整经浆纱数据===========================
        warp: [],
        warp1: {},
        warp2: {},
        warp3: {},
        warp4: {},
        sizing: [],
        sizing1: {},
        sizing2: {},
        sizingDetail: {},
        machineId: '',

        //===================整经浆纱数据===========================

        //===================产量推移数据===========================
        productMonths: [],
        totalProductSeries: [],
        //===================产量推移数据结束===========================


        //===================问题聚焦===========================
        problemOptions: [{value: '4', label: '效率优秀设备'}, {value: '5', label: '产量优秀设备'}, {
          value: '1',
          label: '效率落后设备'
        }, {value: '2', label: '产量落后设备'}, {value: '3', label: '断头落后设备'}],//问题种类选项
        problemDefaultValue: '4',//问题默认值
        maxEfficiency: '95',//最高效率
        avgEfficiency: '89',//平均效率
        machineEfficiency: [//机器号 开机效率
          {machineNum: '', openEfficiency: ''},
          {machineNum: '', openEfficiency: ''},
          {machineNum: '', openEfficiency: ''},
          {machineNum: '', openEfficiency: ''},
          {machineNum: '', openEfficiency: ''},
          {machineNum: '', openEfficiency: ''},
          {machineNum: '', openEfficiency: ''},
          {machineNum: '', openEfficiency: ''},
          {machineNum: '', openEfficiency: ''},
          {machineNum: '', openEfficiency: ''},
          {machineNum: '', openEfficiency: ''},
          {machineNum: '', openEfficiency: ''},

        ],//效率落后设备
        machineChanliangb: [
          {machineNum: '', chanliangb: ''},
          {machineNum: '', chanliangb: ''},
          {machineNum: '', chanliangb: ''},
          {machineNum: '', chanliangb: ''},
          {machineNum: '', chanliangb: ''},
          {machineNum: '', chanliangb: ''},
          {machineNum: '', chanliangb: ''},
          {machineNum: '', chanliangb: ''},
          {machineNum: '', chanliangb: ''},
          {machineNum: '', chanliangb: ''},
          {machineNum: '', chanliangb: ''},
          {machineNum: '', chanliangb: ''},
        ],//产量落后设备

        //===================问题聚焦===========================


        //===================报警设备===========================
        unusualStop: [],
        //===================报警设备===========================

        //===================总产量对比===========================
        yesProducton: [],//昨日总产量
        yesProductonXs: [],//昨日折标总产量
        todProduction: [],//今日总产量
        todProductionXs: [],//今日折标总产量
        sumTodProduction: '',//今日四个车间总产量
        sumTodProductionXs: '',//今日四个车间总产量折标
        //===================总产量对比===========================
        maxChartEfficiency:'',
        minChartEfficiency:'',

      }
    },
    methods: {
      getStartRatesYMD(workshop) {
        let that = this;
        console.log(that.companyId);
        axios({
          url: 'http://120.55.124.53:7070/weight/getEffDay?workshopId=' + workshop,
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            companyId: that.companyId
          },

        })
          .then(response => {
            console.log(response);
            let list = [];
            let list2 = [];
            let list3 = [];
            that.zxt_data = [];
            that.zxt_data2 = [];
            for (let i = 0; i < response.data.data[0].selectList.length - 1; i++) {
              list.push(response.data.data[0].selectList[i])
            }
            console.log(list);
            for (let i = 0; i < 10; i++) {
              list2.push(list[i])
            }
            console.log(list2);
            for (let i = list2.length - 1; i > list2.length - 11; i--) {
              list3.push(list2[i])
            }
            console.log(list3);
            for (let i = 0; i < 10; i++) {
              that.zxt_data.push((list3[i].efficiency * 100).toFixed(1));
              list3[i].date = (list3[i].date.replace(/-/g, "/")).slice(5);
              that.zxt_data2.push(list3[i].date)
            }
            that.maxChartEfficiency = Math.max(...that.zxt_data)+0.2;
            that.minChartEfficiency = Math.min(...that.zxt_data)-0.2;
            if (that.maxChartEfficiency>100)
              that.maxChartEfficiency=100;
            console.log(that.maxChartEfficiency);

//             for(let i=0;i<response.data.data[0].selectList.length-1 ;i++){
//            list.push(response.data.data[0].selectList[i])
//             }
//             for(let i=list.length-1;i>=0;i--){
//  list2.push(list[i])
//             }
//             console.log(list2)
//                 for(let i=list2.length-1;i>list2.length-11 ;i--){

//                   that.zxt_data.push(list2[i].efficiency)

// list2[i].date=(list2[i].date.replace(/-/g,"/")).slice(5);

//                   that.zxt_data2.push(list2[i].date)


//               }
//               let l=[]
//               let l2=[]
//               for(let i=that.zxt_data.length-1;i>0;i--){
//                l.push(that.zxt_data[i])
//               }
//                    for(let i=that.zxt_data2.length-1;i>0;i--){
//                l2.push(that.zxt_data2[i])
//               }
//               that.zxt_data=[]
//               that.zxt_data2=[]
//               for(let i=0;i<l.length;i++){
//                 that.zxt_data.push(l[i])
//               }
//                for(let i=0;i<l2.length;i++){
//                 that.zxt_data2.push(l2[i])
//               }
            console.log(that.zxt_data);
            console.log(that.zxt_data2);
            

          })
          .then(() => {
that.zhexian()
          })
      },
      getZhengjing(workshop) {//获取整经数据
        let that = this;
        let url="http://106.12.219.66:8227/report/getSimpleReport"
                axios({
          url: url,
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
              companyId:0
          },
          data: {
tableName:"wz_warping_view",
query:{
workshop_id:workshop
},
sort:"ASC",
sortColumn:"machine_id"
                

          }
        })
          .then(response => { 
              for (let i = 0; i < response.data.data.length; i++) {
                response.data.data[i].bcl =  (response.data.data[i].current_shift_output/1000).toFixed(1)
                 response.data.data[i].zwcd =( (response.data.data[i].actual_length / response.data.data[i].set_length) * 100).toFixed(1)
                               if (isNaN( response.data.data[i].zwcd )) {
                response.data.data[i].zwcd = 0
              }
              }
            that.zjList=response.data.data

          })
//         axios({
//           url: 'http://120.55.124.53:7070/wanzhou/getZhengjing',
//           method: 'post',
//           headers: {
//             'Content-Type': 'application/json',

//           },
//           data: {

//             workshop: workshop

//           }
//         })
//           .then(response => {
//             console.log(response);
//             that.zjList = [];
//             for (let i = 0; i < response.data.data.length; i++) {
//               // if ('jia_yield' in response.data.data[i]) {
//               //   response.data.data[i].bcl = (response.data.data[i].jia_yield/1000).toFixed(1)*1
//               // } else {
//               //   response.data.data[i].bcl = (response.data.data[i].class_one_length / 1000).toFixed(1)*1
//               // }
//               if(response.data.data[i].shiftwork==0){
//                  response.data.data[i].bcl =  (response.data.data[i].jia_yield/1000).toFixed(1)*1
//               }else if(response.data.data[i].shiftwork==1){
//                    response.data.data[i].bcl =  (response.data.data[i].yi_yield/1000).toFixed(1)*1
//               }else if(response.data.data[i].shiftwork==2){
//  response.data.data[i].bcl =  (response.data.data[i].bing_yield/1000).toFixed(1)*1
//               }else if(response.data.data[i].shiftwork==3){
//  response.data.data[i].bcl =  (response.data.data[i].ding_yield/1000).toFixed(1)*1
//               }
//               if ('current_length' in response.data.data[i]) {
//                 if(response.data.data[i].current_length==0){
//                   response.data.data[i].zwcd=0
//                 }else{
//  response.data.data[i].zwcd = (response.data.data[i].current_length / response.data.data[i].set_length) * 100
//                 response.data.data[i].zwcd = (response.data.data[i].zwcd.toFixed(1))*1
//                 }
               

//               } else {
//                     if(response.data.data[i].actual_length==0){
//                       response.data.data[i].zwcd=0
//                     }else{
//   response.data.data[i].zwcd = (response.data.data[i].actual_length / response.data.data[i].set_length) * 100
//                 response.data.data[i].zwcd = (response.data.data[i].zwcd.toFixed(1))*1
//                     }
              
//               }
//               if (response.data.data[i].zwcd == Infinity) {
//                 response.data.data[i].zwcd = 0
//               }
//               if ((response.data.data[i].actual_speed <= 0) || (response.data.data[i].current_speed <= 0)) {
//                 response.data.data[i].flag = false
//               } else {
//                 response.data.data[i].flag = true
//               }
//               if(('machine_id' in response.data.data[i])&&(response.data.data[i].machine_id!="")){
//  that.zjList.push(response.data.data[i])
//               }
             
//             }
//             that.zjList = this.sortByKey(that.zjList,'machine_id');
//             console.log(that.zjList)
//           })
//           .then(() => {

//           })
      },
      getJiangsha(workshop) {//获取浆纱数据
        let that = this;
        axios({
          url: 'http://120.55.124.53:7070/wanzhou/getJiangsha',
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {

            workshop: workshop

          }
        })
          .then(response => {
            that.jsList = [];
            console.log(response);
            for (let i = 0; i < response.data.data.length; i++) {
              response.data.data[i].zwcd = (((response.data.data[i].actual_yarn_length / response.data.data[i].set_yarn_length) * 100).toFixed(1))*1
              if (parseInt(response.data.data[i].speed) <= 0) {
                response.data.data[i].flag = false
              } else {
                response.data.data[i].flag = true
              }
              that.jsList.push(response.data.data[i])
            }
            console.log(that.jsList)
          })
          .then(() => {

          })
      },
      zhexian() {
        console.log(this.zxt_data.montStartRate);
        console.log(this.zxt_data.weekStartRate);
        let myChart1 = this.$echarts.init(document.getElementById('zx_echart'));
        // 绘制图表
        myChart1.clear();
        let that = this;
        // let option = {
        //     xAxis: {
        //         type: 'category',
        //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        //     },
        //     yAxis: {
        //         type: 'value'
        //     },
        //     series: [{
        //         data: [820, 932, 901, 934, 1290, 1330, 1320],
        //         type: 'line',
        //         smooth: true,
        //         markLine: {
        //             symbol: 'none',
        //             itemStyle: {
        //                 normal: {
        //                     lineStyle: {
        //                         type: 'solid',
        //                         color: '#000'
        //                     },
        //                     label: {
        //                         show: true,
        //                         position: 'left'
        //                     }

        //                 }
        //             },
        //             data: [{
        //                     name: '平均线',
        //                     // 支持 'average', 'min', 'max'
        //                     type: 'min'
        //                 },
        //                 {
        //                     name: '峰线',
        //                     // 支持 'average', 'min', 'max'
        //                     type: 'max'
        //                 },
        //                 {
        //                     name: '谷线',
        //                     // 支持 'average', 'min', 'max'
        //                     type: 'min'
        //                 }

        //             ]
        //         }
        //     }]
        // };
        let option = {
          title: {
            text: '织机效率推移图',
            textStyle: {
              color: "#FFFFFF"
            },
            x: 'center',
            y: 'top',
            top:"4%",
            textAlign: 'left',
            borderColor: '#FFFFFF'
          },
          tooltip: {
            trigger: 'axis',
            show: true
          },

          grid: {
            // top:'20%',
             right: '5%',
             left:"6%",
            // left:'-9%',
            // bottom: '28%',       
          },
          xAxis: {
            type: 'category',
            axisLine: {  //这是x轴文字颜色
              lineStyle: {
                color: "#fff",
              }
            },
            axisTick: {
              show: false
            },
            boundaryGap: false,
            data: that.zxt_data2
          },
          yAxis: {
            type: 'value',
            show: true,
     
            min:that.minChartEfficiency,
            max:that.maxChartEfficiency,
            axisLine: {  //这是x轴文字颜色
              lineStyle: {
                color: "#fff",
              }
            },

          },
          series: {
            name: '效率',
            type: 'line',
            stack: '总量',
            data: that.zxt_data,
            smooth: true,
       
          },


        };
        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },
      //切换总产量对比和产量推移图
      switchZCLAndCLTY: function (type) {
        if (type === 'zcldb') {
          this.zongchanlaingduibi = true;
          this.chanliangtuyi = false;
        }
        if (type === 'clty') {
          this.zongchanlaingduibi = false;
          this.chanliangtuyi = true;
        }
        if (type === 'warp') {
          this.warp_page = true;
          this.sizing_page = false;
        }
        if (type === 'sizing') {
          this.warp_page = false;
          this.sizing_page = true;
        }

      },
      //============表格样式配置================
      //设置表格行的样式
      tableRowStyle4({row, rowIndex}) {
        return 'font-size:1rem;text-align:center;border:0;';
      },
      //设置表头行的样式
      tableHeaderColor4({row, column, rowIndex, columnIndex}) {
        return 'color:#b0e9f3;font-size:0.4rem;font-weight: bolder;text-align:center;border-bottom:2px solid lightblue;margin:0;padding:0'
      },
      //设置单元格的样式
      tableCellStyle4({row, column, rowIndex, columnIndex}) {
        return 'color:#b0e9f3;text-align:center;font-weight:bolder;font-size:1rem;border:0;';
      },
      tableCellStyleyujing({row, column, rowIndex, columnIndex}) {
        if (rowIndex == 0) {
          return 'color:orange;text-align:center;font-weight:bolder;font-size:1rem;border:0;';
        } else
          return 'color:#b0e9f3;text-align:center;font-weight:bolder;font-size:1rem;border:0;';
      },

      //============表格样式配置================


      //============iframe宽高设置================
      getIframe1: function () {
        // this.src2='http://47.110.95.57/mulanTP2.3/index.php/home/index?CompanyId='+this.companyId+'&workshopId='+this.workshopId+'&language='+this.lang;
        this.src2 = 'http://47.110.95.57/mulanTP2.3/index.php/home/index/wzTV?CompanyId=' + this.companyId + '&workshopId=' + this.workshopId + '&language=' + this.lang;
        /*console.log(height);
        console.log(width);*/
      },
      //============iframe宽高设置================


      //============图表渲染================
      //整经图表
      getWarpSpeed: function (number) {
        // 基于准备好的dom，初始化echarts实例
        let speed = '';
        /* switch (number) {
           case 1:speed=this.warp1.currentSpeed;break;
           case 2:speed=this.warp2.currentSpeed;break;
           case 3:speed=this.warp3.currentSpeed;break;
           case 4:speed=this.warp4.currentSpeed;break;
         }*/
        this.warp.forEach(x => {
          if (x.machineId === number) {
            speed = x.currentSpeed
          }
        });
        let myChart1 = this.$echarts.init(document.getElementById('warpSpeedChart' + number));
        // 绘制图表
        myChart1.setOption(
          {
            tooltip: {
              formatter: '{a} <br/>{b} : {c}km/h'
            },
            title: {
              text: '当前速度',
              left: '32%',
              top: '40%',
              textStyle: {
                color: '#fff',
                fontSize: 8
              },
            },
            series: [
              {
                name: '业务指标',
                type: 'gauge',
                min: 0,
                max: 5000,
                center: ['55%', '35%'],
                detail: {
                  formatter: '{value} km/h',
                  top: '80%',
                  fontSize: 10,
                  color: '#fff',
                  offsetCenter: [0, '80%']
                },
                data: [{value: speed}],
                radius: '75%',
                splitLine: {           // 分隔线
                  length: 15,         // 属性length控制线长
                  lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                  }
                },
                axisLine: {            // 坐标轴线
                  lineStyle: {       // 属性lineStyle控制线条样式
                    width: 10
                  }
                },
                axisLabel: {
                  show: false,
                  fontSize: 5,
                  color: '#fff'
                },
                pointer: {
                  width: 5,
                  shadowColor: '#fff', //默认透明
                  shadowBlur: 5
                },
              }
            ]
          });
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },
      //产量推移图
      getProductionTime: function () {
        // 基于准备好的dom，初始化echarts实例
        let myChart1 = this.$echarts.init(document.getElementById('ProductionTimeCharts'));
        myChart1.clear();
        // 绘制图表
        myChart1.setOption(
          {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#ffffff'
                }
              }
            },
            legend: {
              data: this.chartWorkshopList,
              textStyle: {
                fontSize: 16,//字体大小
                color: 'lightblue'//字体颜色
              },
              top: '5%',
              left: '15%'
            },
            grid: {
              x: 70,
              x2: 150,
              y2: 30,
              left: '10%',
              top: '23%',
              bottom: '20%'
            },
            xAxis: {
              type: 'category',
              // data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月','08月', '09月', '10月', '11月', '12月'],
              data: this.productMonths,
              axisLabel: {
                show: true,
                textStyle: {
                  fontSize: 14,//字体大小
                  color: 'lightblue',//字体颜色
                  lineHeight: 20,
                },
              },
            },
            yAxis: {
              name: this.$t('lang.mi'),
              nameTextStyle: {
                color: 'lightblue',
                fontSize: 16,
              },
              type: 'value',
              // min: function(value) {
              //   return value.min-20000;
              // },
              // max: function(value) {
              //   return value.max+50000;
              // },

              axisLabel: {
                show: true,
                textStyle: {
                  fontSize: 10,//字体大小
                  color: 'lightblue'//字体颜色
                },
              },
            },
            series: this.totalProductSeries
          });
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },

      //============图表渲染================


      //============后台数据获取================

      // 对象排序
      sortByKey(array, key) {
        return array.sort(function (a, b) {
          let x = a[key];
          let y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      },
      // 数组排序
      sortArr(array) {
        return array.sort(function (a, b) {
          let x = a;
          let y = b;
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      },
      // 产量推移数据
      getProductionTimeData: function () {
        let workshopList = [];
        workshopList = this.workshopList.map(x => {
          return x.value
        });
        axios({
          url: this.url + '/sign2/getYieldAnalysisNew',
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'companyId': this.companyId
          },
          data: {
            workshopIds: null,
            workshopArray: workshopList,
          }
        })
          .then(response => {
            // ==========原始数据表格显示============
            let result = response.data.data;
            // console.log(productAnalysis);
            if (result.length > 0) {
              this.productMonths = result[0].yieldAnalysisList2.map(x => {
                return this.dateFormatForMMdd(x.months);
              });
              this.chartWorkshopList = result.map(x => {
                return x.workshopName
              });
              this.totalProductSeries = result.map(x => {
                return {
                  name: x.workshopName,
                  data: x.yieldAnalysisList2.map(x => {
                    return x.totalProductMeterXs
                  }),
                  type: 'bar',
                }
              });
            }
          })
          .then(() => {
            this.getProductionTime();
          })
      },
      // 问题聚焦数据
      getProblemsFocusData: function () {
        axios({
          // url: 'http://106.12.219.66:7070/sign2/getYieldAnalysis',
          url: this.url + '/s/getEfficiency',
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'companyId': this.companyId
          },
          data: {
            problemId: this.problemDefaultValue,
            workshopId: this.workshopId,
          }
        })
          .then(response => {
            // ==========问题聚焦数据表格显示============
            this.maxEfficiency = response.data.data['MAXEff'];//最高效率
            this.avgEfficiency = response.data.data['AVGEff'];//平均效率
            if (this.problemDefaultValue === '1') {
              let machineEfficiency = response.data.data.list;//效率数据
              this.machineEfficiency = machineEfficiency.map(x => {
                return {machineNum: x.machineid, openEfficiency: x.shiftEfficiencyF}
              });
            } else if (this.problemDefaultValue === '2') {
              let machineChanliangb = response.data.data.list;//产量数据
              this.machineChanliangb = machineChanliangb.map(x => {
                return {machineNum: x.machineid, chanliangb: x.chanliangb}
              });
              console.log('当前问题' + this.problemDefaultValue);
            } else if (this.problemDefaultValue === '5') {
              let machineChanliangb = response.data.data.list;//产量数据
              this.machineChanliangb = machineChanliangb.map(x => {
                return {machineNum: x.machineid, chanliangb: x.chanliangb}
              });
              console.log('当前问题' + this.problemDefaultValue);
            } else if (this.problemDefaultValue === '4') {
              let machineEfficiency = response.data.data.list;//效率数据
              this.machineEfficiency = machineEfficiency.map(x => {
                return {machineNum: x.machineid, openEfficiency: x.shiftEfficiencyF}
              });
            }

          })
      },


      //车间编号
      getWorkShopList: function () {
        axios({
          url: 'http://120.55.124.53:8211/workShop/getWorkShopList',
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'companyId': this.companyId
          },
          data: {
            "page": 1,
            "pageSize": 100
          }
        })
          .then(response => {
            // ==========总产量对比数据表格显示============
            this.workshopList = response.data.data.map(x => {
              return {label: x.name, value: x.id}
            });
            this.workshopId = this.workshopList[0].value;
          })
          .then(() => {
            this.getIframe1();
            this.getZhengjing(this.workshopId);
            this.getJiangsha(this.workshopId);
            this.getStartRatesYMD(this.workshopId);
          })
      },


      //============后台数据获取================


      //============定时刷新数据================


      //定时刷新预警推送
      getWarningPushDataTiming: function () {
        const timer = setInterval(() => {
          this.getZhengjing(this.workshopId);
          this.getJiangsha(this.workshopId);
          // this.getStartRatesYMD(this.workshopId);
        }, 5000);
        // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
        this.$once('hook:beforeDestroy', () => {
          clearInterval(timer);
        })
      },

      //============定时刷新数据================


      //============选择车间================
      choseFactory: function (workshopId) {
        this.workshopId = workshopId;//改变当前车间
        window.document.getElementById('dialog').click('dialogFormVisible = false');//关闭对话框
        //切换设备状态图
        this.src2 = [];
        this.src2 = 'http://47.110.95.57/mulanTP2.3/index.php/home/index/wzTV?CompanyId=' + this.companyId + '&workshopId=' + this.workshopId + '&language=' + this.lang;
        this.getZhengjing(this.workshopId);
        this.getJiangsha(this.workshopId);
        this.zxt_data=[];
        this.zxt_data2=[];
        this.getStartRatesYMD(this.workshopId);
        console.log('当前车间id' + this.workshopId);
      },
      //============选择车间================

      //============改变问题聚焦问题================
      changeProblems: function (problemDefaultValue) {
        this.machineEfficiency = [];
        this.machineChanliangb = [];
        this.getProblemsFocusData();
      },
      //============改变问题聚焦问题================

      //============了机点击事件================
      handleClick: function () {

      },
      //============了机点击事件================


      //时间格式化
      dateFormatForMMdd: function (time) {
        let t = new Date(time);//row 表示一行数据, updateTime 表示要格式化的字段名称
        return (t.getMonth() + 1).toString().padStart(2, '0') + "-" + t.getDate().toString().padStart(2, '0');
        // return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()+"."+t.getMilliseconds();
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
      this.timer = setInterval(() => {
        _this.date = new Date(); // 修改数据date
      }, 1000);

      //数据获取
      this.getWorkShopList();

      //刷新数据
      this.getWarningPushDataTiming();


    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    }
  }
</script>

<style scoped>
  .all-card {
    width: 100%;
    overflow: auto;
    height: 368px;
 
  }

  .e-chart-card {
   width: 100%;
    height: 260px;
  
  }

  .head {
    width: 100%;
    height: 20px;
    text-align: center;
    font-size: 26px;
    color: white;
    padding-bottom: 10px;
  }

  .one-card-green {
    width: 100%;
    height: 100%;
    margin: 1%;

    margin-left: 1%;
    margin-right: 7%;
    margin-top: 2%;

    float: left;
    background-image: url("../static/img/zj_green.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
  }

  .one-card-orange {
    width: 100%;
    margin: 1%;

    margin-left: 1%;
    margin-right: 7%;
    margin-top: 2%;
    height: 100%;
    float: left;
    background-image: url("../static/img/zj_orange.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
  }

  .con {
    width: 50%;
    text-align: left;

  }

  .one-card-name {
    position: absolute;
    top: 8%;
    left: 21%;
    font-size: 20px;
    font-weight: bold;
  }

  .one-card-cl {
    position: absolute;
    top: 36%;
    left: 18%;
  }

  .one-card-xl {
    position: absolute;
    top: 51%;
    left: 18%;
  }

  .one-card-dt {
    position: absolute;
    top: 65%;
    left: 18%;
  }

  .one-card-wcd {
    position: absolute;
    top: 80%;
    left: 18%;
  }

  .one-card2 {
    width: 45%;
    margin: 1.5%;
    height: 45%;
    float: left;
    background-image: url("../static/img/js_green.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
  }
    .one-card22 {
    width: 45%;
    margin: 1.5%;
    height: 45%;
    float: left;

    background-image: url("../static/img/js_orange.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
  }
  .one-card2-name {
    position: absolute;
    left: 8%;
    top: 3%;
    font-size: 18px;
    font-weight: bold;
  }

  .one-card2-clxl {
    position: absolute;
    left: 8%;
    top: 30%;
    width: 100%;
    display: flex;
  }

  .one-card2-tjwcd {
    position: absolute;
    left: 8%;
    top: 46%;
    width: 100%;
    display: flex;
  }

  .one-card2-zlhsl {
    position: absolute;
    left: 8%;
    width: 100%;
    display: flex;
    top: 62%;
  }

  .one-card2-cstf {
    position: absolute;
    left: 8%;
    top: 78%;
    width: 100%;
    display: flex;
  }

  .content4 {
    height: auto;
    margin-top: 10px;
    
    /*color: rgba(173, 255, 47, 0.25);*/
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
    font-size: 3em;
    width: 100%;
    /*-webkit-box-shadow:1px 1px 1px rgba(9, 62, 175, 0.66);*/
    /*-moz-box-shadow:1px 1px 1px rgba(9, 62, 175, 0.66);*/
    /*box-shadow:1px 1px 25px  rgba(9, 62, 175, 0.66);*/
    /*border-radius: 1rem;*/
  }

  .jingsha {
    color: #E60012 !important;
  }

  .weisha {
    color: #238F3B !important;

  }

  .qita {
    color: #956132 !important;
  }

  .tip {
    position: absolute;
    z-index: 2;
    top: 0.4rem;
    font-size: 1.6rem;
    font-weight: bolder;
    line-height: 5rem;
    width: 100%;
    text-align: left;
    height: 5rem;
  }

  .choose {
    color: #00ffff !important;
    font-size: 1.2rem !important;
  }

  .tbTitle {
    font-weight: bolder;
    font-size: 1.2rem;
    color: #00ffff;
  }

  .unChoosetbTitle {
    font-weight: bolder;
    font-size: 1rem;
    color: #00b7b7;
    cursor: pointer;
  }

  .warpStop {
    background-image: url("../static/img/chart3.png") !important;
  }

  .sizingStop {
    background-image: url("../static/img/chart2.png") !important;
  }

  .tbText {
    font-weight: bolder;
    font-size: 1.2rem;
    color: lightblue;
  }

  .deviceState {
    margin-top: 2rem;
    width: 100%;
    height: 58rem;
  }

  .deviceStateCharts {
    width: 98%;
    height: 100%;
  }

  .monitor{
    /* background-image: url("../static/img/bk4.png"); */
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 57rem;
    /* padding-top: 1rem; */
    margin: 0;
  }
  .failureEquipment {
    background-image: url("../static/img/bk4.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 23rem;
    margin: 0;
  }

  .factoryProduction {
    background-image: url("../static/img/bk4.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 23rem;
    margin: 0;
  }

  .productionTime {
    background-image: url("../static/img/bk4.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 23rem;
    margin: 0;
  }

  .problemsFocus {
    background-image: url("../static/img/bk4.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 23rem;
    margin: 0;
  }

  .warningPush {
    background-image: url("../static/img/bk4.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 23rem;
    margin: 0;
  }

  .totalProductionImg {
    background-image: url("../static/img/circle.png");
    background-repeat: no-repeat;
    background-size: 85% 100%;
    width: 100%;
    height: 9.5rem;
    text-align: center;
    vertical-align: middle;
  }

  .sizingImg {
    background-image: url("../static/img/chart1.png");
    background-repeat: no-repeat;
    background-size: 100% 50%;
    width: 80%;
    height: 10rem;
    margin-left: 1rem;
    margin-top: 1rem;
  }

  .warpImg {
    width: 100%;
  }

  .warpMachine {
    background-image: url("../static/img/chart4.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 65%;
    height: 6rem;
  }

  .progress {
    width: 100%;
    height: 1.2rem;
    background: rgba(66, 125, 177, 0.63);
    border-radius: 5px;
    text-align: center;
    color: #fff;
    font-weight: lighter;
  }

  .progressing {
    position: relative;
    float: left;
    margin: 0 auto;
    height: 1.2rem;
    background: #427db1;
    border-radius: 5px;

  }

  .percentage {
    position: absolute;
    z-index: 4;
  }

  .zjProgress {
    margin-top: -2.8rem;
    width: 80%;
    height: 1.2rem;
    background: rgba(215, 248, 135, 0.39);
    border-radius: 5px;
    text-align: center;
    color: #fff;
    font-weight: lighter;
    margin-left: 0.8rem;
  }

  .zjProgressing {
    position: relative;
    float: left;
    margin: 0 auto;
    height: 1.2rem;
    background: #d7f886;
    border-radius: 5px;

  }

  .zjPercentage {
    position: absolute;
    z-index: 4;
    color: black;
    font-weight: bold;
  }

  .sizingDetail {
    background: rgba(122, 121, 121, 0.63);

  }

  .sizingDetailTitle {
    text-align: center;
    height: 2rem;
    padding: 0.5rem 0;
    border: 1px solid rgba(121, 121, 121, 0.63);
    color: white;
  }

  .eltabs {
    width: 33rem;
  }

  .dataTable {
    background-color: transparent !important;
    margin-left: 0.1rem;
    width: 95%;
  }

  .el-table::before {
    height: 0;
  }

  .el-table::after {
    height: 0;
  }

  /* 使表格背景透明 */
  .el-table th, .el-table tr {
    background-color: transparent !important;
  }

  /*修改element-ui的table 在鼠标悬停hover时的高亮颜色*/
  .el-table tbody tr:hover > td {
    background-color: rgba(48, 162, 211, 0.9) !important
  }

  /*table表格控件表头与内容列不对齐问题*/
  body .el-table th.gutter {
    display: table-cell !important;
  }
</style>
<style>
  .el-input__inner {
    background-color: rgb(1, 4, 42) !important;
    font-size: 1rem;
    border-radius: 5px;
    width: 11rem;
    font-weight: bolder;
    color: #00ffff;
  }

  .el-select-dropdown__item.selected {
    background-color: lightblue;
  }

  .el-dialog--center {
    background-color: rgb(0, 111, 175) !important;
    -webkit-box-shadow: 1px 1px 1px rgba(190, 190, 190, 0.9);
    -moz-box-shadow: 1px 1px 1px rgba(190, 190, 190, 0.9);
    box-shadow: 2px 2px 10px rgba(190, 190, 190, 0.9);
    border-radius: 10px;
  }

  .el-dialog__title {
    font-size: 1.8rem !important;
    font-weight: bolder !important;
    color: #ffffff;
  }

  .el-tabs__nav {
    background-color: transparent;

  }

  .el-tabs__item {
    font-size: 1rem;
    color: lightblue;
    font-weight: bolder;
  }

  .el-tabs__item.is-active {
    color: #00ffff;
  }

  .sizingDetail .el-popover {
    padding: 0;
    background: rgba(121, 120, 121, 0.99);
  }
</style>
