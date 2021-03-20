<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="content4">
    <header>
      <div class="title"></div>
      <h1 class="tip">
    <a style="margin-left: 23%;cursor: pointer" @click="dialogFormVisible2=true">变电所图</a>
                <el-dialog id="dialog" center width="22%" :modal="false" :visible.sync="dialogFormVisible2">
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="toSubstation('变电所图')">变电所图
          </el-button>
              <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
               @click="toSubstation('电力空压')" >电力空压
          </el-button>
        </el-dialog>
        
        <span style="float: right;margin-right: 19.5%">{{date | formatDate}} </span>
      </h1>
    </header>
    <div style="position:fixed;z-index:999;right:10rem;top:2rem;font-size:1.6rem;font-weight:bolder;width:10rem;height:3rem;" >   <a style="margin-left: 23%;cursor: pointer" @click="showEle" >{{isnei}}</a>
                <el-dialog id="dialog" center width="22%" :modal="false" :visible.sync="dialogFormVisible3">
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="net('内网')">内网
          </el-button>
              <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
               @click="net('外网')" >外网
          </el-button>
        </el-dialog></div>
    <div class="main_content ">

      <div class="boxes">
        <!-- <div class="left_box">
          <div class="machine_img"></div>

          <div class="e-chart-card box" id="echart1">

          </div>

          <div class="card">
            <div class="card_title">当日异常记录</div>
            <div class="card_content">
              <div class="card_content_one">07-13 08：13 三星440方 出口压力 6.34</div>
              <div class="card_content_one">07-13 08：13 三星440方 出口压力 6.34</div>
              <div class="card_content_one">07-13 08：13 三星440方 出口压力 6.34</div>
              <div class="card_content_one">07-13 08：13 三星440方 出口压力 6.34</div>
              <div class="card_content_one">07-13 08：13 三星440方 出口压力 6.34</div>
              <div class="card_content_one">07-13 08：13 三星440方 出口压力 6.34</div>
            </div>
          </div>
        </div> -->
        <div class="right_box">
        <iframe id="iframe1" :src="Elesrc"  width="100%" height="100%"
                       frameborder="0">
              </iframe>
  <!-- <div class="card_four">
            <div class="card_four_title">空压机房动力柜1</div>
            <div class="card_four_con">
          <div class="card_four_con_one">
                <div class="card_four_con_one_title">织造一部冷干机4#</div>
                <div class="card_four_con_one_img"></div>
                <div class="card_four_con_one_data">
                  <div class="card_four_con_one_data_con">
                    <span>65.84A</span><span>227.66V</span>
                  </div>
                  <div class="card_four_con_one_data_con">
                    <span>71.00A</span><span>228.42V</span>
                  </div>
                  <div class="card_four_con_one_data_con">
                    <span>66.88A</span><span>228.57V</span>
                  </div>
                </div>
              </div>
     <div class="card_four_con_one">
                <div class="card_four_con_one_title">织造一部冷干机4#</div>
                <div class="card_four_con_one_img"></div>
                <div class="card_four_con_one_data">
                  <div class="card_four_con_one_data_con">
                    <span>65.84A</span><span>227.66V</span>
                  </div>
                  <div class="card_four_con_one_data_con">
                    <span>71.00A</span><span>228.42V</span>
                  </div>
                  <div class="card_four_con_one_data_con">
                    <span>66.88A</span><span>228.57V</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div class="card_four">
            <div class="card_four_title">空压机房动力柜1</div>
            <div class="card_four_con">
              <div class="card_four_con_one">
                <div class="card_four_con_one_title">织造一部冷干机4#</div>
                <div class="card_four_con_one_img"></div>
                <div class="card_four_con_one_data">
                  <div class="card_four_con_one_data_con">
                    <span>65.84A</span><span>227.66V</span>
                  </div>
                  <div class="card_four_con_one_data_con">
                    <span>71.00A</span><span>228.42V</span>
                  </div>
                  <div class="card_four_con_one_data_con">
                    <span>66.88A</span><span>228.57V</span>
                  </div>
                </div>
              </div>
    <div class="card_four_con_one">
                <div class="card_four_con_one_title">织造一部冷干机4#</div>
                <div class="card_four_con_one_img"></div>
                <div class="card_four_con_one_data">
                  <div class="card_four_con_one_data_con">
                    <span>65.84A</span><span>227.66V</span>
                  </div>
                  <div class="card_four_con_one_data_con">
                    <span>71.00A</span><span>228.42V</span>
                  </div>
                  <div class="card_four_con_one_data_con">
                    <span>66.88A</span><span>228.57V</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div class="card_four">
            <div class="card_four_title">空压机房动力柜1</div>
            <div class="card_four_con">
              <div class="card_four_con_one">
                <div class="card_four_con_one_title">织造一部冷干机4#</div>
                <div class="card_four_con_one_img"></div>
                <div class="card_four_con_one_data">
                  <div class="card_four_con_one_data_con">
                    <span>65.84A</span><span>227.66V</span>
                  </div>
                  <div class="card_four_con_one_data_con">
                    <span>71.00A</span><span>228.42V</span>
                  </div>
                  <div class="card_four_con_one_data_con">
                    <span>66.88A</span><span>228.57V</span>
                  </div>
                </div>
              </div>
     <div class="card_four_con_one">
                <div class="card_four_con_one_title">织造一部冷干机4#</div>
                <div class="card_four_con_one_img"></div>
                <div class="card_four_con_one_data">
                  <div class="card_four_con_one_data_con">
                    <span>65.84A</span><span>227.66V</span>
                  </div>
                  <div class="card_four_con_one_data_con">
                    <span>71.00A</span><span>228.42V</span>
                  </div>
                  <div class="card_four_con_one_data_con">
                    <span>66.88A</span><span>228.57V</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card_four">
            <div class="card_four_title">空压机房动力柜1</div>
            <div class="card_four_con">
            <div class="card_four_con_one">
                <div class="card_four_con_one_title">织造一部冷干机4#</div>
                <div class="card_four_con_one_img"></div>
                <div class="card_four_con_one_data">
                  <div class="card_four_con_one_data_con">
                    <span>65.84A</span><span>227.66V</span>
                  </div>
                  <div class="card_four_con_one_data_con">
                    <span>71.00A</span><span>228.42V</span>
                  </div>
                  <div class="card_four_con_one_data_con">
                    <span>66.88A</span><span>228.57V</span>
                  </div>
                </div>
              </div>
       <div class="card_four_con_one">
                <div class="card_four_con_one_title">织造一部冷干机4#</div>
                <div class="card_four_con_one_img"></div>
                <div class="card_four_con_one_data">
                  <div class="card_four_con_one_data_con">
                    <span>65.84A</span><span>227.66V</span>
                  </div>
                  <div class="card_four_con_one_data_con">
                    <span>71.00A</span><span>228.42V</span>
                  </div>
                  <div class="card_four_con_one_data_con">
                    <span>66.88A</span><span>228.57V</span>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
         
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  let host1 = "http://120.55.124.53";
  import axios from 'axios';
  import {
    formatDate
  } from "../static/js/date"; //引入时间格式化js
  
  export default {
    name: "productMonitor",
    data() {
      return {
        Elesrc:"http://60.191.197.50:18080/share?url=displays/af442f8f-04ef-11ea-a114-20040ff30b87.json",
        isnei:"外网",
           dialogFormVisible3:false,
        // zjList: [],
        // jsList: [],
        // zxt_data: [],
        // zxt_data2: [],
        chooseItem:"电力空压",
        dialogFormVisible2:false,
        ampsHisX: [],
        powerHisX: [],
        list2: [], //电流图series数据
        list3: [], //功耗图series数据
        legend: { //统计图参数
          textStyle: {
            fontSize: 18, //字体大小
            color: '#ffffff' //字体颜色
          },
          bottom: 30,
          right: 0,
          data: []
        },

        maxAmps: null, //最大电流值
        maxPower: null, //最大功耗值
        issamsung: false,
        isfun: false,
        isluogan: false,
        allshow: false,
        samsung_thead: [{
            text: "设备",
          },
          {
            text: "系统压力kg/cm2",
          },
          {
            text: "出口压力kg/cm2",
          },
          {
            text: "油压kg/cm2",
          },
          {
            text: "电机电流A",
          },
          {
            text: "一级震动ym",
          },
          {
            text: "二级震动um",
          },
          {
            text: "供油温度℃",
          },
          {
            text: "二级进气温度℃",
          },
          {
            text: "电机绕组R温度℃",
          },
          {
            text: "电机轴承DE温度℃",
          },
          {
            text: "电机轴承NDE温度℃",
          },
          {
            text: "进气调节阀%",
          },
          {
            text: "放空阀%",
          },
        ],
        samsung_tdata: [{
          name: "三星440方",
          system_pressure: "3.74", //系统压力
          stage_2_discharge_pressure: 3.88, //出口压力
          oil_supply_pressure: 3.88, //油压
          motor_current: 3.88, //电机电流
          stage_1_vibration: 3.88, //一级震动
          stage_2_vibration: 3.88, //二级震动
          oil_supply_temperature: 3.88, //供油温度
          stage_2_inlet_temperature: 3.88, //二级进气温度
          motor_winding_r_teperature: 3.88, //电机绕组R温度
          motor_bearing_de_temperature: 21, //电机轴承DE温度
          motor_bearing_nde_temperature: 21, //电机轴承NDE温度
          igv_position_open: 21, //进气调节阀
          bov_position_closed: 21, //放空阀
        }],
        fun_thead: [{
            text: "设备",
          },
          {
            text: "系统压力kg/cm2",
          },
          {
            text: "排气压力kg/cm2",
          },
          {
            text: "油压kg/cm2",
          },
          {
            text: "电机电流A",
          },
          {
            text: "低俗齿轮震动ym",
          },
          {
            text: "高速齿轮震动um",
          },
          {
            text: "进油温度℃",
          },
          {
            text: "末级级间温度℃",
          },
          {
            text: "电机定子温度℃",
          },
          {
            text: "电机前轴承温度℃",
          },
          {
            text: "电机后轴承温度℃",
          },
          {
            text: "调节阀开度%",
          },
          {
            text: "卸荷阀开度%",
          },
        ],
        fun150_tdata: [{
          name: "复盛430方",
          system_pressure: "3.74", //系统压力
          discharge_pressure: 3.88, //排气压力
          oil_pressure: 3.88, //油压
          motor_current: 3.88, //电机电流
          low_speed_vibration: 3.88, //低速震动
          high_speed_vibration: 3.88, //高速震动
          inlet_oil_temperature: 3.88, //进油温度
          final_interstage_air_temperature: 3.88, //末级级间温度
          motor_stator_temperature: 3.88, //电机定子温度
          inboard_motor_bearing_temperature: 21, //电机前轴承温度
          outboard_motor_bearing_temperature: 21, //电机后轴承温度
          inlet_valve: 21, //调节阀开度%
          unloading_valve: 21, //卸荷阀开度%
        }],
        fun200_tdata: [{
          name: "复盛430方",
          system_pressure: "3.74", //系统压力
          discharge_pressure: 3.88, //排气压力
          oil_pressure: 3.88, //油压
          motor_current: 3.88, //电机电流
          low_speed_vibration: 3.88, //低速震动
          high_speed_vibration: 3.88, //高速震动
          inlet_oil_temperature: 3.88, //进油温度
          final_interstage_air_temperature: 3.88, //末级级间温度
          motor_stator_temperature: 3.88, //电机定子温度
          inboard_motor_bearing_temperature: 21, //电机前轴承温度
          outboard_motor_bearing_temperature: 21, //电机后轴承温度
          inlet_valve: 21, //调节阀开度%
          unloading_valve: 21, //卸荷阀开度%
        }],
        luogan_thead: [
          {
            text: "设备",
          },
          {
            text: "排气压力MAP",
          },
          {
            text: "排气温度℃",
          },
          {
            text: "运行时间H",
          },
          {
            text: "加载时间H",
          },
          {
            text: "电机电流A",
          },
          {
            text: "油气桶压力kg/cm2",
          },
          {
            text: "油气桶温度℃",
          },
        ],
        luogan_tdata: [{
          name: "螺杆机",
          discharge_pressure: "3.74", //排气压力
          discharge_temperature: 3.88, //排气温度
          runtime: 3.88, //运行时间
          loading_time: 3.88, //加载时间
          motor_amps: 3.88, //电机电流
          oil_gas_barrel_pressure: 3.88, //油气桶压力
          oil_gas_barrel_temperature: 3.88, //油气桶温度
        }],
        maxValue: "",
        minValue: "",
        maxValue2: "",
        minValue2: "",
        lang: 'zh',
        workshopId: '',
        // src2: '',//设备状态图
        workshopList: [], // 车间编号
        // chartWorkshopList: [],// 图表车间数组
        dialogFormVisible: false, //对话框
        deviceHeight: '', //iframe外层div高度
        deviceWidth: '', //iframe外层div宽度
        date: new Date(),
        // url: window.apiRoot.api_board,
        companyId: this.$route.params.id, //公司库表Id
        buttonName: 'zh-CN',
        // zongchanlaingduibi: true,//总产量推移界面
        // chanliangtuyi: true,//产量对比界面
        // warp_page: true,//整经监控界面
        // sizing_page: false,//浆纱监控界面
        // warpDetail_page: false,//整经详细界面
        // sizingDetail_page: false,//浆纱详细界面
        // currentLength: 2900,//当前长度
        // totalLength: 4500,//总共长度
        // tableData: [],  //预警表
        // lioajiData: [],//了机数据
        // lioajiIngData: [],//当前了机
        // activeName: 'first',//预警区域选项
        //===================整经浆纱数据===========================
        // warp: [],
        // warp1: {},
        // warp2: {},
        // warp3: {},
        // warp4: {},
        // sizing: [],
        // sizing1: {},
        // sizing2: {},
        // sizingDetail: {},
        // machineId: '',

        //===================整经浆纱数据===========================

        //===================产量推移数据===========================
        // productMonths: [],
        // totalProductSeries: [],
        //===================产量推移数据结束===========================


        //===================问题聚焦===========================
        // problemOptions: [{value: '4', label: '效率优秀设备'}, {value: '5', label: '产量优秀设备'}, {
        //   value: '1',
        //   label: '效率落后设备'
        // }, {value: '2', label: '产量落后设备'}, {value: '3', label: '断头落后设备'}],//问题种类选项
        // problemDefaultValue: '4',//问题默认值
        // maxEfficiency: '95',//最高效率
        // avgEfficiency: '89',//平均效率
        // machineEfficiency: [//机器号 开机效率
        //   {machineNum: '', openEfficiency: ''},
        //   {machineNum: '', openEfficiency: ''},
        //   {machineNum: '', openEfficiency: ''},
        //   {machineNum: '', openEfficiency: ''},
        //   {machineNum: '', openEfficiency: ''},
        //   {machineNum: '', openEfficiency: ''},
        //   {machineNum: '', openEfficiency: ''},
        //   {machineNum: '', openEfficiency: ''},
        //   {machineNum: '', openEfficiency: ''},
        //   {machineNum: '', openEfficiency: ''},
        //   {machineNum: '', openEfficiency: ''},
        //   {machineNum: '', openEfficiency: ''},

        // ],//效率落后设备
        // machineChanliangb: [
        //   {machineNum: '', chanliangb: ''},
        //   {machineNum: '', chanliangb: ''},
        //   {machineNum: '', chanliangb: ''},
        //   {machineNum: '', chanliangb: ''},
        //   {machineNum: '', chanliangb: ''},
        //   {machineNum: '', chanliangb: ''},
        //   {machineNum: '', chanliangb: ''},
        //   {machineNum: '', chanliangb: ''},
        //   {machineNum: '', chanliangb: ''},
        //   {machineNum: '', chanliangb: ''},
        //   {machineNum: '', chanliangb: ''},
        //   {machineNum: '', chanliangb: ''},
        // ],//产量落后设备

        // //===================问题聚焦===========================


        // //===================报警设备===========================
        // unusualStop: [],
        // //===================报警设备===========================

        // //===================总产量对比===========================
        // yesProducton: [],//昨日总产量
        // yesProductonXs: [],//昨日折标总产量
        // todProduction: [],//今日总产量
        // todProductionXs: [],//今日折标总产量
        // sumTodProduction: '',//今日四个车间总产量
        // sumTodProductionXs: '',//今日四个车间总产量折标
        // //===================总产量对比===========================
        // maxChartEfficiency:'',
        // minChartEfficiency:'',/

      }
    },
    methods: {
      showEle(){
      
   this.dialogFormVisible3=true
      },
      net(value){
    if(value=="内网"){
   this.dialogFormVisible3=false
       
   this. isnei="内网"
   this.Elesrc="http://192.168.12.230:8080/share?url=displays/ed53e148-1e71-11eb-9b94-20040ff30b87.json"
        this.$message({
          
            message: '已经切换到内网！',
            type: 'success'
          });
        }else{
        this.dialogFormVisible3=false
           this. isnei="外网"
   this.Elesrc="http://60.191.197.50:18080/share?url=displays/af442f8f-04ef-11ea-a114-20040ff30b87.json"
        this.$message({
          
            message: '已经切换到外网！',
            type: 'success'
          });
        }
      },
       toSubstation(value) {
        this.chooseItem=value
        if(value=="变电所图"){
   this.dialogFormVisible2=false
        }else{
       this.$router.push({path:'/ElectricAirPressure/'+this.companyId})
        }
       
      },
      renderTime(date) {
        var dateee = new Date(date).toJSON();
        return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      },
      toDate(time) {

        time = time.replace(/-/g, "/");
        let date = new Date(time);
        return date
      },

      getStartRatesYMD(workshopId, fla) {
        let _this = this;

        axios({
            url: window.apiRoot.api_board + ':7070/wanzhou/getLineChart',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',

            },
            data: {
              workshopid: workshopId
            }

          })
          .then(response => {
            console.log(response);

            let list = response.data.data;
            /* 数据处理代码 */
            let list2 = [] //ampsHis
            let list3 = [] //powerHis

            for (let i = 0; i < list.length; i++) { //machineid图例数据数组

              for (let key in list[i]) {

                if (list[i][key].ampsHis.length > 0 || list[i][key].powerHis.length > 0) { //有数据才显示lengend
                  _this.legend.data[i] = key
                }
              }

            }

            for (let i = 0; i < list.length; i++) {



              for (let key in list[i]) {
                console.log(key + ":" + list[i][key])

                let json, json2;
                if (i == 0) { //第一条线加上警戒线
                  json = {
                    name: "",
                    type: 'line', // 设置数据显示类型,分为line,bar,pie

                    markPoint: {
                      symbolSize: [68, 58],
                      data: [{
                        type: 'max',
                        name: '最大值'
                      }],
                      label: {
                        normal: {
                          formatter: '{c}%'
                        }
                      }
                    },
                    markLine: {
                      symbol: ['none', 'none'], //去掉箭头
                      itemStyle: {
                        normal: {
                          lineStyle: { //全局的样式
                            type: 'solid',
                            width: 2 // 线条高度
                          },
                        }
                      },
                      data: [{
                          yAxis: _this.maxValue,
                          itemStyle: {
                            normal: {
                              color: 'red'
                            }
                          },
                          label: { // 线条提示字体
                            show: true,
                            position: 'end',
                            formatter: '越限上线',
                            color: '#ff3040'
                          }
                        },
                        {
                          yAxis: _this.minValue,
                          itemStyle: {
                            normal: {
                              color: 'blue'
                            }
                          },
                          label: {
                            show: true,
                            position: 'end',
                            formatter: '越限下线',
                            color: '#ff3040'
                          }
                        }
                      ]
                    },
                    data: []
                  }
                  json2 = {
                    name: "",
                    type: 'line', // 设置数据显示类型,分为line,bar,pie

                    markPoint: {
                      symbolSize: [68, 58],
                      data: [{
                        type: 'max',
                        name: '最大值'
                      }],
                      label: {
                        normal: {
                          formatter: '{c}%'
                        }
                      }
                    },
                    markLine: {
                      symbol: ['none', 'none'], //去掉箭头
                      itemStyle: {
                        normal: {
                          lineStyle: { //全局的样式
                            type: 'solid',
                            width: 2 // 线条高度
                          },
                        }
                      },
                      data: [{
                          yAxis: _this.maxValue2,
                          itemStyle: {
                            normal: {
                              color: 'red'
                            }
                          },
                          label: { // 线条提示字体
                            show: true,
                            position: 'end',
                            formatter: '越限上线',
                            color: '#ff3040'
                          }
                        },
                        {
                          yAxis: _this.minValue2,
                          itemStyle: {
                            normal: {
                              color: 'blue'
                            }
                          },
                          label: {
                            show: true,
                            position: 'end',
                            formatter: '越限下线',
                            color: '#ff3040'
                          }
                        }
                      ]
                    },
                    data: []
                  }
                } else {
                  json = {
                    name: "",
                    type: 'line', // 设置数据显示类型,分为line,bar,pie

                    markPoint: {
                      symbolSize: [68, 58],
                      data: [{
                        type: 'max',
                        name: '最大值'
                      }],
                      label: {
                        normal: {
                          formatter: '{c}%'
                        }
                      }
                    },
                    data: []
                  }
                  json2 = {
                    name: "",
                    type: 'line', // 设置数据显示类型,分为line,bar,pie

                    markPoint: {
                      symbolSize: [68, 58],
                      data: [{
                        type: 'max',
                        name: '最大值'
                      }],
                      label: {
                        normal: {
                          formatter: '{c}%'
                        }
                      }
                    },
                    markLine: { // 警戒线
                      symbol: ['none', 'none'], //去掉箭头
                      itemStyle: {
                        normal: {
                          lineStyle: { //全局的样式
                            type: 'solid',
                            width: 2 // 线条高度
                          },
                        }
                      },
                      data: [{
                          yAxis: _this.maxValue2,
                          itemStyle: {
                            normal: {
                              color: 'red'
                            }
                          },
                          label: { // 线条提示字体
                            show: true,
                            position: 'end',
                            formatter: '越限上线',
                            color: '#ff3040'
                          }
                        },
                        {
                          yAxis: _this.minValue2,
                          itemStyle: {
                            normal: {
                              color: 'blue'
                            }
                          },
                          label: {
                            show: true,
                            position: 'end',
                            formatter: '越限下线',
                            color: '#ff3040'
                          }
                        }
                      ]
                    },
                    data: []
                  }
                }

                json.name = key
                for (let j = 0; j < list[i][key].ampsHis.length; j++) { //电流数据处理

                  list[i][key].ampsHis[j].create_time = _this.toDate(_this.renderTime(list[i][key].ampsHis[j]
                      .create_time))
                    .getHours()
                  if (list[i][key].ampsHis[j].create_time == 0) { //如果小时数是0就转为24
                    list[i][key].ampsHis[j].create_time = 24
                  }
                  // json.time[j] = list[i][key].ampsHis[j].create_time
                  // json.data[j] = list[i][key].ampsHis[j].motor_amps
                  json.data[j] = [list[i][key].ampsHis[j].create_time - 1, list[i][key].ampsHis[j]
                    .motor_amps
                  ] //第一个为时间的对应下标，第二个为数值
                }

                list2.push(json)


                json2.name = key
                for (let j = 0; j < list[i][key].powerHis.length; j++) { //功耗数据处理

                  list[i][key].powerHis[j].create_time = _this.toDate(_this.renderTime(list[i][key].powerHis[j]
                      .create_time))
                    .getMinutes()
                  if (list[i][key].powerHis[j].create_time == 0) {
                    list[i][key].powerHis[j].create_time = 60
                  }
                  // json2.time[j] = list[i][key].powerHis[j].create_time
                  // json2.data[j] = list[i][key].powerHis[j].power_consumption
                  json2.data[j] = [list[i][key].powerHis[j].create_time - 1, list[i][key].powerHis[j]
                    .power_consumption
                  ]
                }
                list3.push(json2)
              }

            }

            /* 数据处理代码 */
            console.log(list)
            console.log(list2) //ampshis的统计图数据
            console.log(list3) //powerhis的统计图数据
            _this.list2 = list2
            _this.list3 = list3
            if (fla == true) { //如果传e，e-charts就画电流的option
              _this.zhexian("e")
            } else {
              _this.zhexian("g") //如果传g，e-charts就画功耗的option
            }


            // for (let i = 0; i < response.data.data.ampsHis.length; i++) {
            //   response.data.data.ampsHis[i].create_time = that.toDate(that.renderTime(response.data.data.ampsHis[i]
            //     .create_time)).getHours() //得到时间的小时数
            //   if (response.data.data.ampsHis[i].create_time == 0) { //如果是0点就纠正为24点
            //     response.data.data.ampsHis[i].create_time = 24
            //   }


            //   //response.data.data.ampsHis[i].create_time=that.renderTime( response.data.data.ampsHis[i].create_time)
            //   let index = that.ampsHisX.indexOf(response.data.data.ampsHis[i].create_time) //获取小时数对应x轴的下标
            //   that.ampsHisY[index] = response.data.data.ampsHis[i].motor_amps //设置对应下标的y轴值
            // }

            // for (let i = 0; i < response.data.data.powerHis.length; i++) {

            //   response.data.data.powerHis[i].create_time = that.toDate(that.renderTime(response.data.data.powerHis[i]
            //     .create_time)).getMinutes() //得到时间的分钟数
            //   if (response.data.data.powerHis[i].create_time == 0) { //如果是0分就纠正为60分
            //     response.data.data.powerHis[i].create_time = 60
            //   }
            //   // response.data.data.powerHis[i].create_time=that.renderTime( response.data.data.powerHis[i].create_time)
            //   let index = that.powerHisX.indexOf(response.data.data.powerHis[i].create_time)

            //   that.powerHisY[index] = response.data.data.powerHis[i].power_consumption
            // }
            // that.maxAmps = Math.max(...that.ampsHisY) //获取电流最大值
            // that.maxPower = Math.max(...that.powerHisY) //获取功耗最大值



          })
          .then(() => {

          })
      },
      // change() { //电流最大值最小值输入框改变事件
      //   console.log(this.maxValue)
      //   console.log(this.maxAmps)
      //   this.setWarningRange(this.workshopId)

      //   // if (this.maxValue > this.maxAmps) {
      //   //   this.$message({
      //   //     showClose: true,
      //   //     message: '警戒值过大，请重新输入！',
      //   //     type: 'warning'
      //   //   });
      //   //   this.maxValue = ""
      //   // } else {
      //   //   this.zhexian()
      //   // }
      //   this.getStartRatesYMD(this.workshopId) //获取统计图数据


      // },
      getWarningRange(workshopId) { //电流取最大最小警戒值
        let that = this
        axios({
            url: window.apiRoot.api_board + ':7070/wanzhou/getWarningRange',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              workshopid: workshopId
            }

          })
          .then(response => {
            console.log(response)

            if (response.data.data.highWarning) {
              that.maxValue = response.data.data.highWarning
            } else {
              that.maxValue = 0
            }
            if (response.data.data.lowWarning) {
              that.minValue = response.data.data.lowWarning
            } else {
              that.minValue = 0
            }

          })
          .then(() => {

          })
      },
      setWarningRange(workshopId) { //电流设置最大最小警戒值
        let that = this


        axios({
            url: window.apiRoot.api_board + ':7070/wanzhou/setWarningRange',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',

            },
            data: {
              highWarning: that.maxValue,
              lowWarning: that.minValue,
              workshopid: workshopId
            }

          })
          .then(response => {
            console.log(response)
            if (response.data.successMessage == "success") {
              this.$message({
                showClose: true,
                message: '设置成功！',
                type: 'success'
              });
            } else {
              this.$message({
                showClose: true,
                message: '设置失败！',
                type: '  warning'
              });

            }

          })
          .then(() => {

          })
      },

      // change2() { //功耗最大值最小值输入框改变事件
      //   console.log(this.maxValue2)
      //   console.log(this.minValue2)
      //   this.setWarningRange1(this.workshopId)
      //   // if (this.maxValue2 > this.maxPower) {
      //   //   this.$message({
      //   //     showClose: true,
      //   //     message: '警戒值过大，请重新输入！',
      //   //     type: 'warning'
      //   //   });
      //   //   this.maxValue2 = ""
      //   // } else {
      //   //   this.zhexian2()
      //   // }
      //   this.getStartRatesYMD(this.workshopId) //获取统计图数据
      //   // this.zhexian2()
      // },
      getWarningRange1(workshopId) { //电流取最大最小警戒值
        let that = this
        axios({
            url: window.apiRoot.api_board + ':7070/wanzhou/getWarningRange1',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',

            },
            data: {
              workshopid: workshopId
            }

          })
          .then(response => {
            console.log(response)

            if (response.data.data.highWarning) {
              that.maxValue2 = response.data.data.highWarning
            } else {
              that.maxValue2 = 0
            }
            if (response.data.data.lowWarning) {
              that.minValue2 = response.data.data.lowWarning
            } else {
              that.minValue2 = 0
            }

          })
          .then(() => {

          })
      },
      setWarningRange1(workshopId) { //电流设置最大最小警戒值
        let that = this
        let json = {
          highWarning: that.maxValue2,
          lowWarning: that.minValue2,
          workshopid: workshopId
        }

        axios({
            url: window.apiRoot.api_board + ':7070/wanzhou/setWarningRange1',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',

            },
            data: json

          })
          .then(response => {
            console.log(response)
            if (response.data.successMessage == "success") {
              this.$message({
                showClose: true,
                message: '设置成功！',
                type: 'success'
              });
            } else {
              this.$message({
                showClose: true,
                message: '设置失败！',
                type: '  warning'
              });

            }

          })
          .then(() => {

          })
      },
      zhexian(e) {
        let myChart1 = this.$echarts.init(document.getElementById('echart1'));
        // 绘制图表
        myChart1.clear();
        let that = this;
        console.log(that.maxValue)

        let option;
        if (e == "e") {
          console.log(e)
          option = {
            // title: {
            //   text: '',
            //   textStyle: {
            //     color: "#FFFFFF"
            //   },
            //   x: 'left',
            //   left: '10%',
            //   y: 'top',
            //   textAlign: 'center',
            //   borderColor: '#FFFFFF'
            // },
            legend: that.legend,
            tooltip: {
              trigger: 'axis',
              show: true,
              confine: true,

            },

            grid: {
              top: '20%',
              left: '3%',
              right: '14%',
              bottom: '28%',
              containLabel: true,
              show: false
            },

            xAxis: {
              type: 'category',
              axisLine: { //这是x轴文字颜色
                lineStyle: {
                  color: "#fff",
                }
              },
              axisTick: {
                show: false
              },


              boundaryGap: false,
              data: that.ampsHisX
            },
            yAxis: {
              type: 'value',
              show: true,
              max: function (value) {
                if (value.max > that.maxValue) {
                  return value.max;
                } else {
                  return that.maxValue;
                }


              },

              axisLine: { //这是x轴文字颜色
                lineStyle: {
                  color: "#fff",
                }
              },
            },
            series: that.list2

          };
        } else {
          console.log(e)
          option = {
            // title: {
            //   text: '功耗图',
            //   textStyle: {
            //     color: "#FFFFFF"
            //   },
            //   x: 'left',
            //   left: "10%",
            //   y: 'top',
            //   textAlign: 'center',
            //   borderColor: '#FFFFFF'
            // },
            legend: that.legend,
            tooltip: {
              trigger: 'axis',
              show: true,
              confine: true
            },
            grid: {
              top: '20%',
              left: '3%',
              right: '14%',
              bottom: '28%',
              containLabel: true,
              show: false
            },
            xAxis: {
              type: 'category',
              axisLine: { //这是x轴文字颜色
                lineStyle: {
                  color: "#fff",
                }
              },
              axisTick: {
                show: false
              },


              boundaryGap: false,
              data: that.powerHisX
            },
            yAxis: {
              type: 'value',
              show: true,
              max: function (value) {
                if (value.max > that.maxValue2) {
                  return value.max;
                } else {
                  return that.maxValue2;
                }


              },
              axisLine: { //这是x轴文字颜色
                lineStyle: {
                  color: "#fff",
                }
              },
            },
            series: that.list3 //功耗图series 

          };
        }


        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },
      zhexian2() {
        let myChart1 = this.$echarts.init(document.getElementById('echart2'));
        // 绘制图表
        myChart1.clear();
        let that = this;
        let option = {
          // title: {
          //   text: '功耗图',
          //   textStyle: {
          //     color: "#FFFFFF"
          //   },
          //   x: 'left',
          //   left: "10%",
          //   y: 'top',
          //   textAlign: 'center',
          //   borderColor: '#FFFFFF'
          // },
          legend: that.legend,
          tooltip: {
            trigger: 'axis',
            show: true,
            confine: true
          },
          grid: {
            top: '20%',
            left: '3%',
            right: '14%',
            bottom: '28%',
            containLabel: true,
            show: false
          },
          xAxis: {
            type: 'category',
            axisLine: { //这是x轴文字颜色
              lineStyle: {
                color: "#fff",
              }
            },
            axisTick: {
              show: false
            },


            boundaryGap: false,
            data: that.powerHisX
          },
          yAxis: {
            type: 'value',
            show: true,
            max: function (value) {
              if (value.max > that.maxValue2) {
                return value.max;
              } else {
                return that.maxValue2;
              }


            },
            axisLine: { //这是x轴文字颜色
              lineStyle: {
                color: "#fff",
              }
            },
          },
          series: that.list3 //功耗图series 

        };
        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },


      //============iframe宽高设置================
      // getIframe1: function () {
      //   // this.src2='http://47.110.95.57/mulanTP2.3/index.php/home/index?CompanyId='+this.companyId+'&workshopId='+this.workshopId+'&language='+this.lang;
      //   this.src2 = 'http://47.110.95.57/mulanTP2.3/index.php/home/index/wzTV?CompanyId=' + this.companyId +
      //     '&workshopId=' + this.workshopId + '&language=' + this.lang;
      //   /*console.log(height);
      //   console.log(width);*/
      // },
      //============iframe宽高设置================




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


      //车间编号
      getWorkShopList: function () {


        axios({
            url: host1 + ':8211/workShop/getWorkShopList',
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
              return {
                label: x.name,
                value: x.id,
              }
            });
            this.workshopId = this.workshopList[0].value;
          })
          .then(() => {
            // this.getIframe1();


            // this.getWarningRange(this.workshopId) //获取电流最大最小警戒值
            // this.getWarningRange1(this.workshopId) //获取功耗最大最小警戒值
            this.getStartRatesYMD(this.workshopId, true) //获取统计图数据

          })
      },



      //============后台数据获取================




      //============选择车间================
      choseFactory: function (workshopId) {
        this.workshopId = workshopId; //改变当前车间
        window.document.getElementById('dialog').click('dialogFormVisible = false'); //关闭对话框
        console.log('当前车间id' + this.workshopId);
        this.getKongyaji(this.workshopId)
      },
      //============选择车间================



      //时间格式化
      dateFormatForMMdd: function (time) {
        let t = new Date(time); //row表示一行数据, updateTime 表示要格式化的字段名称
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
      for (let i = 1; i <= 60; i++) {
        _this.powerHisX.push(i)
      }
      for (let i = 1; i <= 24; i++) {
        _this.ampsHisX.push(i)
      }
      this.timer = setInterval(() => {
        _this.date = new Date(); // 修改数据date
      }, 1000);

      //数据获取

      this.getWorkShopList();

    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    }
  }

</script>
<style scoped>
  .main_content {
    width: 100%;
    height: 93%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
  }



  .boxes {
    width: 95%;
    height: 96%;
    display: flex;
  }

  .boxes2 {
    width: 95%;
    height: 92%;
    display: flex;
    flex-direction: column;

  }

  .boxes2_title {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 27px;
  }

  .boxes2_content {
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;

  }

  .left_box {
    width: 30%;
    height: 100%;

    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
  }

  .machine_img {
    background-image: url("../static/img/Substation.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 31.2%;
    margin-bottom: 8%;


  }

  .card {
    background-image: url("../static/img/card.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 33%;
    position: relative;

  }

  .card_title {
    position: absolute;
    top: 9%;
    left: 35%;
    font-size: 27px;
    color: white;


  }

  .card_content {
    position: absolute;
    top: 38%;
    left: 5%;
    font-size: 24px;
    color: white;
    width: 89%;
    height: 55%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
  }

  .card_content_one {
    width: 97%;
    height: 20%;
    margin: 1.5%;
    text-align: left;


  }

  .right_box {
    width: 100%;
    overflow: auto;
    height: 100%;

  }



  .card_four {
    background-image: url("../static/img/Substation_card.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 3.15% 3.5% 0% 3.5%;
    width: 25.6%;
    height: 45%;
    float: left;
    position: relative;
  }

  .card_four_title {
    position: absolute;
    top: 5%;
    left: 22%;
    font-size: 1.5rem;
  }

  .card_four_con {
    position: absolute;
    top: 25%;
    left: 5%;
    width: 88%;
    height: 60%;
    overflow: auto;

  }

  .card_four_con_one {
    width: 100%;
    height: 50%;
    position: relative;
  }

  .card_four_con_one_title {
    position: absolute;
    left: 2%;
    top: 8%;
    font-size: 1rem;
    color: white;
    width: 4.5rem;
  }

  .card_four_con_one_img {
    background-image: url("../static/img/Substation_img.png");
    background-size: 100% 100%;
    height: 57%;
    width: 46%;
    position: absolute;
    top: 25%;
  }

  .card_four_con_one_data {

    height: 72%;
    width: 49%;

    position: absolute;
    top: 18%;
    right: 2%;

  }

  .card_four_con_one_data_con {
    width: 100%;
    height: 33%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 1rem;
  }

  .cards_title {
    position: absolute;
    left: 4%;
    top: 3%;
    font-size: 24px;
    color: white;
  }

  .cards_content {
    position: absolute;
    left: 6%;
    top: 22%;
    font-size: 18px;
    color: white;
    width: 90%;
    height: 70%;
    overflow: auto;

  }

  .cards_content_con {
    left: 6%;
    top: 22%;
    width: 45%;
    height: 13%;
    margin: 2%;
    float: left;


    display: flex;


    justify-content: flex-start;

    align-items: center;
  }

  .main_input {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .t-head {
    width: 100%;
    height: 13%;
    display: flex;
  }

  .t-one {
    width: 100%;
    height: 15%;
    display: flex;
  }

  .t-con {
    width: 7.02%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid white;
    border-bottom: 1px solid white;
    border-left: 1px solid white;
  }

  .t-con span {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .t-con3 span {
    overflow: hidden;

    text-overflow: ellipsis;

    display: -webkit-box;
    -webkit-line-clamp: 2;

    -webkit-box-orient: vertical;

  }

  .t-con3 {
    width: 7.02%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid white;
    border-bottom: 1px solid white;
    border-left: 1px solid white;
  }

  .main_input_con {
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 25px;
  }

  .main_input_con /deep/ .el-input--medium .el-input__inner {
    height: 50px;
    line-height: 50px;
    width: 100%;
  }

  .main_table {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main_table_con {
    width: 80%;
    height: 90%;
    border-top: 1px solid white;
    color: white;
    font-size: 18px;
    overflow: auto;
  }

  .main_echart {
    width: 100%;
    height: 30%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .all-card {
    width: 100%;
    overflow: auto;
    height: 368px;
  }

  .e-chart-card {
    width: 97%;
    margin-bottom: 3%;
    margin-left: 5%;
    margin-right: 5%;
    height: 260px;

  }

  .label {
    width: 22%;
    height: 40px;
    border: 1px solid white;
    position: absolute;
    left: 1%;
    top: 31%;
    margin-top: 2px;
    background: transparent;
    filter: Alpha(opacity=60);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    text-align: center;
    border: 2px rgba(255, 255, 255, 0.41) solid;
    -webkit-box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.2) inset;
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.2) inset;

  }

  .label2 {
    width: 22%;
    height: 40px;
    border: 1px solid white;
    position: absolute;
    left: 23%;
    top: 31%;
    margin-top: 2px;
    background: transparent;
    filter: Alpha(opacity=60);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    text-align: center;
    border: 2px rgba(255, 255, 255, 0.41) solid;
    -webkit-box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.2) inset;
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.2) inset;

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
    height: 44%;
    float: left;
    background-image: url("../static/img/js_green.png");
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
    height: 100%;
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

  .monitor {
    background-image: url("../static/img/bk4.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 57rem;
    padding-top: 1rem;
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
  .el-table th,
  .el-table tr {
    background-color: transparent !important;
  }

  /*修改element-ui的table 在鼠标悬停hover时的高亮颜色*/
  .el-table tbody tr:hover>td {
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
