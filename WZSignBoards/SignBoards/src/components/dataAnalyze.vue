<template xmlns:el-col="http://www.w3.org/1999/html">
    <div class="content4">
      <header>
        <div class="title"></div>
        <h1 class="tip">
          <a style="margin-left: 23%;cursor: pointer" @click="dialogFormVisible = true" id="xinhai" v-for="item in workshopList" v-if="item.value==workshopId">{{item.label}}</a>
          <el-dialog id="dialog" center width="22%" :modal="false" :visible.sync="dialogFormVisible">
            <el-button style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;" @click="choseFactory(item.value)" v-for="item in workshopList" :key="item.value">{{item.label}}</el-button>
          </el-dialog>
          <span style="float: right;margin-right: 19.5%">{{date | formatDate}} </span>
        </h1>
      </header>
      <!--<el-button @click="changeLangEvent" style="position: absolute;z-index:3;font-size: 1.5rem;top: 1%;right: 12%" type="text" size="medium">{{buttonName}}</el-button>-->
        <el-row :gutter="5">
          <el-col :span="7">
            <el-row>
              <el-col :span="24">
                <div class="factoryProduction">
                  <div style="text-align: left;margin-left: 5%;padding-top: 0.6rem">
                    <span class="unChoosetbTitle" :class="{'choose':this.chanliangtuyi===true}" @click="switchZCLAndCLTY('clty')">{{$t('lang.chanliangtuyi')}}</span>
                  </div>
                  <el-row>
                    <div v-show="chanliangtuyi" >
                      <el-col :span="24">
                        <div  id="ProductionTimeCharts" style="width: 45rem;height: 26rem">
                        </div>
                      </el-col>
                    </div>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <div class="typeDistribution">
                <div style="text-align: left;margin-left: 5%;padding-top: 0.6rem">
                  <span class="unChoosetbTitle" :class="{'choose':this.chanliangtuyi===true}">品种分布图</span>
                </div>
                <el-row>
                  <div >
                    <el-col :span="24">
                      <div  id="typeDistributionChart" style="width: 100%;height: 27rem">
                      </div>
                    </el-col>
                  </div>
                </el-row>
              </div>
            </el-row>
          </el-col>
          <el-col :span="10">
            <div class="centerContent">
              <div>
                <div style="font-weight: bold;font-size: 2.5rem;text-align: center;padding-top: 1rem">今 日 总 产 量</div>
                <div style="font-weight: bold;font-size: 2.4rem;text-align: center;color: rgba(58,214,185,0.9)">{{this.totalYield}}&nbsp;米</div>
              </div>
              <div class="mod_efficiency">
                <el-row>
                  <el-col :span="12">
                    <div id="efficiencyChart2" style="width: 100%;height: 13rem;"></div>
                  </el-col>
                  <el-col :span="12">
                    <div id="efficiencyChart3" style="width: 100%;height: 13rem;"></div>
                  </el-col>
                <!--  <el-col :span="8">
                    <div class="mod_efficiency_title">佳而美B班效率</div>
                    <div id="BEfficiencyChart5" style="width: 100%;height: 19rem;"></div>
                  </el-col>-->
                </el-row>
                <el-row >
                  <el-col :span="6">
                    <div class="mod_efficiency_title">A班效率</div>
                    <div id="AEfficiencyChart2" style="width: 100%;height: 10rem;"></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="mod_efficiency_title">B班效率</div>
                    <div id="BEfficiencyChart2" style="width: 100%;height: 10rem;"></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="mod_efficiency_title">A班效率</div>
                    <div id="AEfficiencyChart3" style="width: 100%;height: 10rem;"></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="mod_efficiency_title">B班效率</div>
                    <div id="BEfficiencyChart3" style="width: 100%;height: 10rem;"></div>
                  </el-col>
                </el-row>
              </div>
              <div class="mod_efficiency" style="margin-top: 0.5rem">
                <el-row>
                  <el-col :span="12">
                    <div id="efficiencyChart4" style="width: 100%;height: 13rem;"></div>
                  </el-col>
                  <el-col :span="12">
                    <div id="efficiencyChart5" style="width: 100%;height: 13rem;"></div>
                  </el-col>

                </el-row>
                <el-row >
                  <el-col :span="6">
                    <div class="mod_efficiency_title">A班效率</div>
                    <div id="AEfficiencyChart4" style="width: 100%;height: 10rem;"></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="mod_efficiency_title">B班效率</div>
                    <div id="BEfficiencyChart4" style="width: 100%;height: 10rem;"></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="mod_efficiency_title">A班效率</div>
                    <div id="AEfficiencyChart5" style="width: 100%;height: 10rem;"></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="mod_efficiency_title">B班效率</div>
                    <div id="BEfficiencyChart5" style="width: 100%;height: 10rem;"></div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col :span="7">
            <el-row>
              <el-col :span="24">
                <div class="failureEquipment">
                  <div style="text-align: left;margin-left: 5%;padding-top: 1rem">
                    <span class="tbTitle">{{$t('lang.tingjishebei')}}</span>
                  </div>
                  <div id="failureEquipmentCharts" style="margin-left: 6%;overflow-y:scroll;height: 28rem;width: 34rem;">
                    <el-row :key="item.workshopId" v-for="item in unusualStop">
                      <div style="width: 32rem" class="tbTitle">{{item.workshopName}}</div>
                      <el-col :key="machine.stopName" :span="24" v-for="machine in item.stopTypeDTOS">
                        <div v-if="machine.stopName==='经纱停车'"
                             style="width: 32rem;font-size: 1rem;margin-top: 0.5rem"
                             :class="{'jingsha':machine.stopName==='经纱停车'}"
                             class="tbTitle">{{machine.stopName}}({{machine.strings.length}})</div>
                        <div v-else-if="machine.stopName==='纬纱停车'"
                             style="width: 32rem;font-size: 1rem;margin-top: 0.5rem"
                             :class="{'weisha':machine.stopName==='纬纱停车'}"
                             class="tbTitle">{{machine.stopName}}({{machine.strings.length}})</div>
                        <div v-else-if="machine.stopName==='其他'"
                             style="width: 32rem;font-size: 1rem;margin-top: 0.5rem"
                             :class="{'qita':machine.stopName==='其他'}"
                             class="tbTitle">{{machine.stopName}}({{machine.strings.length}})</div>
                        <div style="float: left;margin:0.2rem 0;width: 4rem;text-align: left"
                             v-for="machineId in machine.strings"
                             class="tbText">
                          <span v-if="machine.stopName==='经纱停车'" :class="{'jingsha':machine.stopName==='经纱停车'}">{{machineId}}</span>
                          <span v-else-if="machine.stopName==='纬纱停车'" :class="{'weisha':machine.stopName==='纬纱停车'}">{{machineId}}</span>
                          <span v-else-if="machine.stopName==='其他'" :class="{'qita':machine.stopName==='其他'}">{{machineId}}</span>
                        </div>
                      </el-col>
                      <!-- <el-col :span="24">
                         <div style="width: 30rem;font-size: 1rem;color: #238F3B;" class="tbTitle">{{$t('lang.weishatingche')}}</div>
                         <div style="float: left;margin:0.2rem 0;width: 3rem;text-align: left" v-for="machineId in item['纬纱停车']" class="tbText">
                           <span style="color: #238F3B;">{{machineId}}</span>
                         </div>
                       </el-col>
                       <el-col :span="24">
                         <div style="width: 30rem;font-size: 1rem;color: #956132;" class="tbTitle">{{$t('lang.qitatingche')}}</div>
                         <div style="float: left;margin:0.2rem 0;width: 3rem;text-align: left" v-for="machineId in item['其他']" class="tbText">
                           <span style="color: #956132;">{{machineId}}</span>
                         </div>
                       </el-col>-->
                    </el-row>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="problemsFocus">
                  <div style="text-align: left;margin-left: 5%;padding-top: 1.2rem">
                    <span class="tbTitle">{{$t('lang.shengchanjvjiao')}}</span>
                    <el-select v-model="problemDefaultValue" @change="changeProblems(problemDefaultValue)">
                      <el-option
                        v-for="item in problemOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <span class="tbTitle">{{$t('lang.xiaolvzuigao')}}{{maxEfficiency}}%</span>
                    <!--,{{$t('lang.pingjun')}}{{avgEfficiency}}%-->
                  </div>
                  <hr style="width: 90%;border: 1px solid lightblue;;">
                  <div class="mod_problem"  v-show="this.problemDefaultValue==='1'">
                    <div class="mod_problem_content tbText" v-for="item in machineEfficiency">
                      {{item.machineNum}}：{{$t('lang.kaijixiaolv')}} {{item.openEfficiency}}%</div>
                  </div>
                  <div class="mod_problem" v-show="this.problemDefaultValue==='4'">
                    <div class="mod_problem_content tbText" v-for="item in machineEfficiency">
                      {{item.machineNum}}：{{$t('lang.kaijixiaolv')}} {{item.openEfficiency}}%</div>
                  </div>
                  <div class="mod_problem" v-show="this.problemDefaultValue==='2'">
                    <div class="mod_problem_content tbText" v-for="item in machineChanliangb">
                      {{item.machineNum}}：{{$t('lang.chanliang')}} {{item.chanliangb}}{{$t('lang.mi')}}</div>
                  </div>
                  <div class="mod_problem" v-show="this.problemDefaultValue==='5'">
                    <div class="mod_problem_content tbText" v-for="item in machineChanliangb">
                      {{item.machineNum}}：{{$t('lang.chanliang')}} {{item.chanliangb}}{{$t('lang.mi')}}</div>
                  </div>
                  <div class="mod_problem" v-show="this.problemDefaultValue==='3'">
                    <div class="mod_problem_content tbText" v-for="item in weftCmpx" >
                      {{item.machineId}}:纬停率 {{item.weftCmpx}}%</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

    </div>
</template>

<script>
  import echarts from 'echarts'
  import axios from 'axios';
  import {formatDate} from "../static/js/date"; //引入时间格式化js
    export default {
      name: "dataAnalyze",
      data() {
        return {
          lang:'zh',
          workshopId:'',
          src2:'',//设备状态图
          workshopList:[],// 车间编号
          chartWorkshopList:[],// 图表车间数组
          dialogFormVisible:false,//对话框
          deviceHeight:'',//iframe外层div高度
          deviceWidth:'',//iframe外层div宽度
          date: new Date(),
          url:window.apiRoot.api_board,
          companyId: this.$route.params.id,//公司库表Id
          buttonName:'zh-CN',
          zongchanlaingduibi:true,//总产量推移界面
          chanliangtuyi:true,//产量对比界面
          warp_page:true,//整经监控界面
          sizing_page:false,//浆纱监控界面
          warpDetail_page:false,//整经详细界面
          sizingDetail_page:false,//浆纱详细界面
          currentLength:2900,//当前长度
          totalLength:4500,//总共长度
          tableData: [],  //预警表
          lioajiData:[],//了机数据
          lioajiIngData:[],//当前了机
          totalYield:'',// 今日总产量
          activeName: 'first',//预警区域选项
          //===================整经浆纱数据===========================
          warp:[],
          warp1:{},
          warp2:{},
          warp3:{},
          warp4:{},
          sizing:[],
          sizing1:{},
          sizing2:{},
          sizingDetail:{
          },
          machineId:'',
          //===================产量推移数据===========================
          productMonths: [],
          totalProductSeries:[],
          //===================产量推移数据结束===========================


          //===================问题聚焦===========================
          problemOptions:[{value:'4',label:'效率优秀设备'},{value:'5',label:'产量优秀设备'},{value:'1',label:'效率落后设备'},{value:'2',label:'产量落后设备'},{value:'3',label:'断头落后设备'}],//问题种类选项
          problemDefaultValue:'4',//问题默认值
          maxEfficiency:'95',//最高效率
          avgEfficiency:'89',//平均效率
          machineEfficiency:[//机器号 开机效率
            {machineNum:'',openEfficiency:''},
            {machineNum:'',openEfficiency:''},
            {machineNum:'',openEfficiency:''},
            {machineNum:'',openEfficiency:''},
            {machineNum:'',openEfficiency:''},
            {machineNum:'',openEfficiency:''},
            {machineNum:'',openEfficiency:''},
            {machineNum:'',openEfficiency:''},
            {machineNum:'',openEfficiency:''},
            {machineNum:'',openEfficiency:''},
            {machineNum:'',openEfficiency:''},
            {machineNum:'',openEfficiency:''},

          ],//效率落后设备
          machineChanliangb:[
            {machineNum:'',chanliangb:''},
            {machineNum:'',chanliangb:''},
            {machineNum:'',chanliangb:''},
            {machineNum:'',chanliangb:''},
            {machineNum:'',chanliangb:''},
            {machineNum:'',chanliangb:''},
            {machineNum:'',chanliangb:''},
            {machineNum:'',chanliangb:''},
            {machineNum:'',chanliangb:''},
            {machineNum:'',chanliangb:''},
            {machineNum:'',chanliangb:''},
            {machineNum:'',chanliangb:''},
          ],//产量落后设备
          weftCmpx:[],// 断头落后

          //===================问题聚焦===========================


          //===================报警设备===========================
          unusualStop:[],
          //===================报警设备===========================

          //===================品种===========================
          styleList:[]
          //===================品种===========================

        }
      },
      methods: {

        //显示浆纱详细
        showSizingDetail:function(machineId){
            this.sizingDetail={};
            this.sizingDetail=this.sizing.filter(x=>{return x.machineId === machineId})[0];
            this.machineId=machineId;
            this.sizingDetail_page=true;
        },
        //切换总产量对比和产量推移图
        switchZCLAndCLTY:function(type){
          if (type==='zcldb'){
            this.zongchanlaingduibi=true;
            this.chanliangtuyi=false;
          }
          if (type==='clty'){
            this.zongchanlaingduibi=false;
            this.chanliangtuyi=true;
          }
          if (type==='warp'){
            this.warp_page=true;
            this.sizing_page=false;
          }
          if (type==='sizing'){
            this.warp_page=false;
            this.sizing_page=true;
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
          if(rowIndex==0){
            return 'color:orange;text-align:center;font-weight:bolder;font-size:1rem;border:0;';
          }
          else
            return 'color:#b0e9f3;text-align:center;font-weight:bolder;font-size:1rem;border:0;';
        },

        //============表格样式配置================


        //============iframe宽高设置================
        getIframe1:function(){
          // this.src2='http://47.110.95.57/mulanTP2.3/index.php/home/index?CompanyId='+this.companyId+'&workshopId='+this.workshopId+'&language='+this.lang;
          this.src2='http://47.110.95.57/mulanTP2.3/index.php/home/index/wzTV?CompanyId='+this.companyId+'&workshopId='+this.workshopId+'&language='+this.lang;
          /*console.log(height);
          console.log(width);*/
        },
        //============iframe宽高设置================


        //============图表渲染================
        // AB班效率对比
        getABEfficiency(shift,workshopId,efficiency){
          let myChart = this.$echarts.init(document.getElementById(shift+'EfficiencyChart'+workshopId));
          let option = {};
          let angle = 0;//角度，用来做简单的动画效果的
          let value = efficiency;
          option = {
            title: {
              text: '{a|'+ value +'}{c|%}',
              x: 'center',
              y: 'center',
              textStyle: {
                rich:{
                  a: {
                    fontSize: 20,
                    color: '#29EEF3'
                  },

                  c: {
                    fontSize: 20,
                    color: '#ffffff',
                    // padding: [5,0]
                  }
                }
              }
            },
            legend: {
              type: "plain",
              orient: "vertical",
              right: 0,
              top: "10%",
              align: "auto",
              data: [{
                name: '涨价后没吃过',
                icon: "circle"
              }, {
                name: '天天吃',
                icon: "circle"
              }, {
                name: '三五天吃一次',
                icon: "circle"
              }, {
                name: '半个月吃一次',
                icon: "circle"
              }],
              textStyle: {
                color: "white",
                fontSize: 16,
                padding: [10, 1, 10, 0]
              },
              selectedMode:false
            },
            series: [ {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                    startAngle: (0+angle) * Math.PI / 180,
                    endAngle: (90+angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#0CD3DB",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                    startAngle: (180+angle) * Math.PI / 180,
                    endAngle: (270+angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#0CD3DB",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
                    startAngle: (270+-angle) * Math.PI / 180,
                    endAngle: (40+-angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#0CD3DB",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
                    startAngle: (90+-angle) * Math.PI / 180,
                    endAngle: (220+-angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#0CD3DB",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65;
                let point = getCirlPoint(x0, y0, r, (90+-angle))
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4
                  },
                  style: {
                    stroke: "#0CD3DB",//粉
                    fill: "#0CD3DB"
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",  //绿点
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65;
                let point = getCirlPoint(x0, y0, r, (270+-angle))
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4
                  },
                  style: {
                    stroke: "#0CD3DB",      //绿
                    fill: "#0CD3DB"
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: '吃猪肉频率',
              type: 'pie',
              radius: ['58%', '45%'],
              silent: true,
              clockwise: true,
              startAngle: 90,
              z: 0,
              zlevel: 0,
              label: {
                normal: {
                  position: "center",

                }
              },
              data: [{
                value: value,
                name: "",
                itemStyle: {
                  normal: {
                    color: { // 完成的圆环的颜色
                      colorStops: [{
                        offset: 0,
                        color: '#4FADFD' // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: '#28E8FA' // 100% 处的颜色
                      }]
                    },
                  }
                }
              },
                {
                  value: 100-value,
                  name: "",
                  label: {
                    normal: {
                      show: false
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: "#173164"
                    }
                  }
                }
              ]
            },

              {
                name: "",
                type: "gauge",
                radius: "58%",
                center: ['50%', '50%'],
                startAngle: 0,
                endAngle: 359.9,
                splitNumber: 8,
                hoverAnimation: true,
                axisTick: {
                  show: false
                },
                splitLine: {
                  length: 60,
                  lineStyle: {
                    width: 5,
                    color: "#061740"
                  }
                },
                axisLabel: {
                  show: false
                },
                pointer: {
                  show: false
                },
                axisLine: {
                  lineStyle: {
                    opacity: 0
                  }
                },
                detail: {
                  show: false
                },
                data: [{
                  value: 0,
                  name: ""
                }]
              },

            ]
          };

          //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
          function getCirlPoint(x0, y0, r, angle) {
            let x1 = x0 + r * Math.cos(angle * Math.PI / 180);
            let y1 = y0 + r * Math.sin(angle * Math.PI / 180);
            return {
              x: x1,
              y: y1
            }
          }

          myChart.setOption(option);
          window.addEventListener('resize',function () {
            myChart.resize();
          })
        },
        // 车间效率图表
        getWorkshopEfficiency:function(efficiency,name,id) {
          // 基于准备好的dom，初始化echarts实例
          let myChart3 = this.$echarts.init(document.getElementById('efficiencyChart'+id));
          // 绘制图表
          myChart3.setOption(
            {
              tooltip : {
                formatter: "{a} <br/>{c} {b}"
              },
              series : [
               /* {
                  height:'200',
                  name:'效率',
                  type:'gauge',
                  center : ['20%', '50%'],    // 默认全局居中
                  radius : '70%',
                  min:0,
                  max:100,
                  endAngle:45,
                  splitNumber:10,
                  axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                      color: [[0.29, 'lime'],[0.86, '#1e90ff'],[1, '#ff4500']],
                      width: 2,
                      shadowColor : '#fff', //默认透明
                      shadowBlur: 10
                    }
                  },
                  axisLabel: {            // 坐标轴小标记
                    textStyle: {       // 属性lineStyle控制线条样式
                      fontWeight: 'bolder',
                      color: '#fff',
                      fontSize:8,
                      shadowColor : '#fff', //默认透明
                      shadowBlur: 10
                    }
                  },
                  axisTick: {            // 坐标轴小标记
                    length :12,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                      color: 'auto',
                      shadowColor : '#fff', //默认透明
                      shadowBlur: 10
                    }
                  },
                  splitLine: {           // 分隔线
                    length :20,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                      width:3,
                      color: '#fff',
                      shadowColor : '#fff', //默认透明
                      shadowBlur: 10
                    }
                  },
                  pointer: {
                    width:5,
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5
                  },
                  title : {
                    offsetCenter: [0, '-30%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                      fontWeight: 'bolder',
                      fontStyle: 'italic',
                      color: '#24acff',
                      shadowColor : '#fff', //默认透明
                      shadowBlur: 10
                    }
                  },
                  detail : {
                    //backgroundColor: 'rgba(30,144,255,0.8)',
                    // borderWidth: 1,
                    borderColor: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5,
                    width: 80,
                    height:30,
                    offsetCenter: [20, '30%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                      fontWeight: 'bolder',
                      color: '#fff'
                    }
                  },
                  data:[{value: lanmianEfficiency, name: '兰棉'}]
                },*/
                {
                  name:'效率',
                  type:'gauge',
                  center:['50%','50%'],
                  min:0,
                  max:100,
                  splitNumber:10,
                  radius: '75%',
                  axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                      color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
                      width: 2,
                      shadowColor : '#fff', //默认透明
                      shadowBlur: 10
                    }
                  },
                  axisLabel: {            // 坐标轴小标记
                    textStyle: {       // 属性lineStyle控制线条样式
                      fontWeight: 'bolder',
                      color: '#fff',
                      fontSize:8,
                      shadowColor : '#fff', //默认透明
                      shadowBlur: 10
                    }
                  },
                  axisTick: {            // 坐标轴小标记
                    length :15,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                      color: 'auto',
                      shadowColor : '#fff', //默认透明
                      shadowBlur: 10
                    }
                  },
                  splitLine: {           // 分隔线
                    length :18,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                      width:2,
                      color: '#fff',
                      shadowColor : '#fff', //默认透明
                      shadowBlur: 10
                    }
                  },
                  pointer: {           // 分隔线
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5
                  },
                  title : {
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                      fontWeight: 'bolder',
                      fontSize: 20,
                      fontStyle: 'italic',
                      color: '#24acff',
                      shadowColor : '#fff', //默认透明
                      shadowBlur: 10,
                    },
                    offsetCenter: [0, '-30%'],
                  },
                  detail : {
                    backgroundColor: 'rgba(30,144,255,0.8)',
                    borderWidth: 1,
                    borderColor: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5,
                    offsetCenter: [0, '65%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                      fontWeight: 'bolder',
                      color: '#fff'
                    }
                  },
                  data:[{value: efficiency, name: name}]
                },
                /*{
                  name:'效率',
                  type:'gauge',
                  center : ['78%', '50%'],    // 默认全局居中
                  radius : '70%',
                  min:0,
                  max:100,
                  startAngle:135,
                  endAngle:-45,
                  rotateOption:90,
                  splitNumber:10,
                  axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                      color: [[0.29, 'lime'],[0.86, '#1e90ff'],[1, '#ff4500']],
                      width: 2,
                      shadowColor : '#fff', //默认透明
                      shadowBlur: 10
                    }
                  },
                  axisLabel: {            // 坐标轴小标记
                    textStyle: {       // 属性lineStyle控制线条样式
                      fontWeight: 'bolder',
                      color: '#fff',
                      fontSize:8,
                      shadowColor : '#fff', //默认透明
                      shadowBlur: 10
                    }
                  },
                  axisTick: {            // 坐标轴小标记
                    length :12,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                      color: 'auto',
                      shadowColor : '#fff', //默认透明
                      shadowBlur: 10
                    }
                  },
                  splitLine: {           // 分隔线
                    length :20,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                      width:3,
                      color: '#fff',
                      shadowColor : '#fff', //默认透明
                      shadowBlur: 10
                    }
                  },
                  pointer: {
                    width:5,
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5
                  },
                  title : {
                    offsetCenter: [0, '-30%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                      fontWeight: 'bolder',
                      fontStyle: 'italic',
                      color: '#24acff',
                      shadowColor : '#fff', //默认透明
                      shadowBlur: 10
                    }
                  },
                  detail : {
                    //backgroundColor: 'rgba(30,144,255,0.8)',
                    // borderWidth: 1,
                    borderColor: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5,
                    width: 80,
                    height:30,
                    offsetCenter: [-20, '30%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                      fontWeight: 'bolder',
                      color: '#fff'
                    }
                  },
                  data:[{value: jiaermeiEfficiency, name: '佳而美'}]
                },*/
              ]
            });
          window.addEventListener('resize',function () {
            myChart3.resize();
          })

        },

        //断头落后
        getWeftCmpx:function (){
          axios({
            // url: 'http://localhost:7070/sign2/getYieldAnalysis',
            url: this.url + '/weight/getWeftCmpx?workshopId='+this.workshopId,
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data: {
            }
          })
            .then(response => {
              // ==========总产量对比数据表格显示============
              this.weftCmpx = response.data.data;
              if (this.weftCmpx.length>11)
                this.weftCmpx.splice(12,3);
            })
        },
          //产量推移图
        getProductionTime: function () {
          // 基于准备好的dom，初始化echarts实例
          let myChart1 = this.$echarts.init(document.getElementById('ProductionTimeCharts'));
          myChart1.clear();
          // 绘制图表
          console.log(this.chartWorkshopList);
          let list=this.chartWorkshopList;
          for(let i=0;i<list.length;i++){
            if(list[i]=="万舟织造二部"){
             let k=list[list.length-1];
              list[list.length-1]=list[i];
              list[i]=k
            }
          }
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
                data:list,
                textStyle:{
                  fontSize: 16,//字体大小
                  color: 'lightblue'//字体颜色
                },
                top:'5%',
                left:'8%'
              },
              grid:{
                x:70,
                x2:200,
                y2:30,
                left:'10%',
                top:'30%',
                bottom:'20%'
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
                    lineHeight:20,
                  },
                },
              },
              yAxis: {
                name:this.$t('lang.mi'),
                nameTextStyle:{
                  color:'lightblue',
                  fontSize:16,
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
                    color: 'lightblue',//字体颜色
                  },
                },
              },
              series:this.totalProductSeries
            });
          window.addEventListener('resize', function () {
            myChart1.resize();
          })
        },

        //品种分布图
        getTypeDistributionChart(){
          let myChart = this.$echarts.init(document.getElementById('typeDistributionChart'));
          myChart.clear();
          myChart.setOption(
            {

              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
              },

              legend: {
                color: '#dddddd',
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 50,
                // backgroundColor:'#06213f',
                textStyle:{
                  color: '#dddddd'
                },
                data: this.styleList.map(x=>{return x.name}),
              },
              series: [
                {
                  name: '品种:机台数',
                  type: 'pie',
                  radius: ['50%', '40%'],
                  center: ['40%', '48%'],
                  itemStyle: {
                    normal: {
                      label: {
                        show: true,
                        color: '#fff',
                        formatter: '{b}',
                      },
                      labelLine: {
                        length:20,
                        length2:20,
                        show: true,
                        color:'#00ffff'
                      }
                    }
                  },
                  data:this.styleList,
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            }
            );
          window.addEventListener('resize', function () {
            myChart.resize();
          })
        },
        //============图表渲染================


        //============后台数据获取================

        // 产量推移数据
        getProductionTimeData: function () {
          let workshopList = [];
          workshopList = this.workshopList.map(x=>{return x.value});
          axios({
            url: this.url+'/sign2/getYieldAnalysisNew',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data:{
              workshopIds:null,
              workshopArray:workshopList,
            }
          })
            .then(response => {
              // ==========原始数据表格显示============
              let result =  response.data.data;
              // console.log(productAnalysis);
              if (result.length>0){
                this.productMonths = result[0].yieldAnalysisList2.map(x => {
                  return this.dateFormatForMMdd(x.months);
                });
                this.chartWorkshopList = result.map(x=>{
                  return x.workshopName
                });
                this.totalProductSeries = result.map(x=>{return {
                  name:x.workshopName,
                  data:x.yieldAnalysisList2.map(x=>{return x.totalProductMeterXs}),
                  type:'bar',
                }});
              }
            })
            .then(()=>{
              this.getProductionTime();
            })
        },
        // 问题聚焦数据
        getProblemsFocusData: function () {
          axios({
            // url: 'http://localhost:7070/sign2/getYieldAnalysis',
            url: this.url+'/s/getEfficiency',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data:{
              problemId:this.problemDefaultValue,
              workshopId:this.workshopId,
            }
          })
            .then(response => {
              // ==========问题聚焦数据表格显示============
              this.maxEfficiency = response.data.data['MAXEff'];//最高效率
              this.avgEfficiency = response.data.data['AVGEff'];//平均效率
              if (this.problemDefaultValue==='1'){
                let machineEfficiency = response.data.data.list;//效率数据
                this.machineEfficiency = machineEfficiency.map(x => {
                  return {machineNum:x.machineid,openEfficiency:x.shiftEfficiencyF}
                });
              }
              else if(this.problemDefaultValue==='2'){
                let machineChanliangb = response.data.data.list;//产量数据
                this.machineChanliangb = machineChanliangb.map(x => {
                  return {machineNum:x.machineid,chanliangb:x.chanliangb}
                });
                console.log('当前问题'+this.problemDefaultValue);
              }
              else if(this.problemDefaultValue==='5'){
                let machineChanliangb = response.data.data.list;//产量数据
                this.machineChanliangb = machineChanliangb.map(x => {
                  return {machineNum:x.machineid,chanliangb:x.chanliangb}
                });
                console.log('当前问题'+this.problemDefaultValue);
              }
              else if (this.problemDefaultValue==='4'){
                let machineEfficiency = response.data.data.list;//效率数据
                this.machineEfficiency = machineEfficiency.map(x => {
                  return {machineNum:x.machineid,openEfficiency:x.shiftEfficiencyF}
                });
              }

            })
        },


        //车间编号
        getWorkShopList:function (){
          axios({
            url: 'http://120.55.124.53:8211/workShop/getWorkShopList',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data:{
              "page": 1,
              "pageSize": 100
            }
          })
            .then(response => {
              // ==========总产量对比数据表格显示============
              this.workshopList = response.data.data.map(x=>{return{label:x.name,value:x.id}});
              this.workshopId = this.workshopList[0].value;
            })
            .then(()=>{
              this.getFailureEquipmentData();
              this.getProductionTimeData();
              this.getSpeciesDistribution()
            })
        },
        //故障设备数据
        getFailureEquipmentData:function (){
          let workshopList = [];
          workshopList = this.workshopList.map(x=>{return x.value});
          axios({
            url: this.url+'/s/getUnusualStopMachineListNew',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data:{
              workshopId:null,
              workshopArray: workshopList,
              stopName:'经纱停车',
            }
          })
            .then(response => {
              this.unusualStop = response.data.data.unusualStop;
              let index = '';
              for (let i = 0;i<this.unusualStop.length;i++){
                if (this.unusualStop[i].workshopId==this.workshopId){
                  index = i;
                  break;
                }
              }
              this.unusualStop.unshift(this.unusualStop.splice(index,1)[0]);
            })
        },
        //vue使用
        sortByKey:function(array,key) {
          return array.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? 1 : ((x > y) ? -1 : 0));
          });
        },
        //品种数据
        getSpeciesDistribution:function (){
          axios({
            // url: 'http://localhost:7070/sign2/getYieldAnalysis',
            url: this.url+'/app/getSpeciesDistribution',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            data:{
              workshopId:this.workshopId,
              companyId:this.companyId,
            }
          })
            .then(response => {
              this.styleList=[];
              // ==========总产量对比数据表格显示============
              let data = response.data.data;
              let temp =[];
              let otherNum=0;
              for (let i=0;i<data.length;i++){
                if (data[i].machine.length>7){
                  temp.push(data[i]);
                }
                else if (data[i].machine.length<=7) {
                  otherNum+=data[i].machine.length;
                }
              }
              this.styleList = temp.map(x=>{return{value:x.machine.length,name:x.styleName}});
              this.styleList.push({value:otherNum,name:'其他'});
              this.styleList = this.sortByKey(this.styleList,'value');

            })
            .then(()=>{
              this.getTypeDistributionChart();
            })
        },
        // 效率数据
        getEfficiency(){
          axios({
            url: this.url+'/ab/getWorkshopABAndYield?workshops="1","2","4","5"',
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data:{

            }
          })
            .then(response => {
              console.log(response)
              let data = response.data.data;
              this.totalYield = data.totalYield;
              let Awanzhou1Efficiency = '';
              let Bwanzhou1Efficiency = '';
              let totalwanzhou1Efficiency = '';
              let Awanzhou2Efficiency = '';
              let Bwanzhou2Efficiency = '';
              let totalwanzhou2Efficiency = '';
              let AlanmianEfficiency = '';
              let BlanmianEfficiency = '';
              let totallanmianEfficiency = '';
              let AjiaermeiEfficiency = '';
              let BjiaermeiEfficiency = '';
              let totaljiaermeiEfficiency = '';
              let wanzhou1Efficiency = data.selects.filter(x=>{return x.workshops==='"4"'})[0];
              let wanzhou2Efficiency = data.selects.filter(x=>{return x.workshops==='"5"'})[0];
              let lanmianEfficiency = data.selects.filter(x=>{return x.workshops==='"2"'})[0];
              let jiaermeiEfficiency = data.selects.filter(x=>{return x.workshops==='"1"'})[0];
              Awanzhou1Efficiency = wanzhou1Efficiency.list[0]; // A班效率
              Bwanzhou1Efficiency = wanzhou1Efficiency.list[1]; // B班效率
              totalwanzhou1Efficiency = wanzhou1Efficiency.list[2];// 总效率

              Awanzhou2Efficiency = wanzhou2Efficiency.list[0]; // A班效率
              Bwanzhou2Efficiency = wanzhou2Efficiency.list[1]; // B班效率
              totalwanzhou2Efficiency = wanzhou2Efficiency.list[2];// 总效率

              AlanmianEfficiency = lanmianEfficiency.list[0];
              BlanmianEfficiency = lanmianEfficiency.list[1];
              totallanmianEfficiency = lanmianEfficiency.list[2];

              AjiaermeiEfficiency = jiaermeiEfficiency.list[0];
              BjiaermeiEfficiency = jiaermeiEfficiency.list[1];
              totaljiaermeiEfficiency = jiaermeiEfficiency.list[2];

              this.getABEfficiency('A',2,Awanzhou1Efficiency);
              this.getABEfficiency('A',3,Awanzhou2Efficiency);
              this.getABEfficiency('A',4,AlanmianEfficiency);
              this.getABEfficiency('A',5,AjiaermeiEfficiency);
              this.getABEfficiency('B',2,Bwanzhou1Efficiency);
              this.getABEfficiency('B',3,Bwanzhou2Efficiency);
              this.getABEfficiency('B',4,BlanmianEfficiency);
              this.getABEfficiency('B',5,BjiaermeiEfficiency);
              this.getWorkshopEfficiency(totalwanzhou1Efficiency,'一部',2);
              this.getWorkshopEfficiency(totalwanzhou2Efficiency,'二部',3);
              this.getWorkshopEfficiency(totallanmianEfficiency,'兰棉',4);
              this.getWorkshopEfficiency(totaljiaermeiEfficiency,'佳而美',5);
            });

        },
        //============后台数据获取================


        //============定时刷新数据================
        //  定时刷新产量推移
        getProductionTimeDataTiming:function () {
          const timer = setInterval(() =>{
            this.getProductionTimeData();
            this.getSpeciesDistribution();
          }, 300000);
          // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
          this.$once('hook:beforeDestroy', () => {
            clearInterval(timer);
          })
        },
        //定时刷新问题聚焦
        getProblemsFocusDataTiming:function (){
          const timer = setInterval(() =>{
            if (this.problemDefaultValue==='3'){
              this.getWeftCmpx();
            }
            else {
              this.getProblemsFocusData();
            }
            this.getEfficiency();
          }, 5000);
          // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
          this.$once('hook:beforeDestroy', () => {
            clearInterval(timer);
          })
        },


        //定时刷报警设备
        getFailureEquipmentDataTiming:function (){
          const timer = setInterval(() =>{
            this.getFailureEquipmentData();
          }, 10000);
          // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
          this.$once('hook:beforeDestroy', () => {
            clearInterval(timer);
          })
        },

        //============定时刷新数据================



        //============选择车间================
        choseFactory:function (workshopId) {
          this.workshopId=workshopId;//改变当前车间
          window.document.getElementById('dialog').click('dialogFormVisible = false');//关闭对话框
          //切换设备状态图
          this.src2=[];
          this.src2='http://47.110.95.57/mulanTP2.3/index.php/home/index/wzTV?CompanyId='+this.companyId+'&workshopId='+this.workshopId+'&language='+this.lang;
          //切换问题聚焦
          this.machineEfficiency=[];
          this.machineChanliangb=[];
          this.weftCmpx=[];
          if (this.problemDefaultValue==='3'){
            this.getWeftCmpx();
          }
          else {
            this.getProblemsFocusData();
          }
          this.styleList=[];
          this.getSpeciesDistribution();
          this.unusualStop=[];
          this.getFailureEquipmentData();
          //切换预警数据
          /*this.tableData=[];
          this.getWarningPushData();*/
          // this.lioajiData=[];
          // this.getLiaojiData();
          // this.lioajiIngData=[];
          // this.getLiaojiIngData();
      /*    //切换报警设备
          this.failureEquipment=[];
          this.getFailureEquipmentData();*/
        // 切换整经浆纱
        //   this.warp=[];
        //   this.sizing=[];
        //   this.getWarp();
        //   this.getSizing();
          console.log('当前车间id'+this.workshopId);
        },
        //============选择车间================

        //============改变问题聚焦问题================
        changeProblems:function (problemDefaultValue) {
          this.machineEfficiency=[];
          this.machineChanliangb=[];
          this.weftCmpx = [];
          if (problemDefaultValue==='3'){
            this.getWeftCmpx();
          }
          else
            this.getProblemsFocusData();
        },
        //============改变问题聚焦问题================

        //============了机点击事件================
        handleClick:function () {

        },
        //============了机点击事件================



        //时间格式化
        dateFormatForMMdd:function(time){
          let t=new Date(time);//row 表示一行数据, updateTime 表示要格式化的字段名称
          return (t.getMonth()+1).toString().padStart(2,'0')+"-"+t.getDate().toString().padStart(2,'0');
          // return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()+"."+t.getMilliseconds();
        },
      },




      filters:{
        formatDate(time){
          let date = new Date(time);
          return formatDate(date,'yyyy-MM-dd hh:mm:ss')
        }
      },
      mounted() {
        let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
        this.timer = setInterval(() => {
          _this.date = new Date(); // 修改数据date
        }, 1000);
        //图表渲染
        this.getProductionTime();
        this.getEfficiency();
        //数据获取
        this.getWorkShopList();
        this.getProductionTimeData();
        this.getProblemsFocusData();
        //刷新数据

        this.getProductionTimeDataTiming();
        this.getProblemsFocusDataTiming();
        this.getFailureEquipmentDataTiming();
        //改变问题聚焦问题
        this.changeProblems();


      },
      beforeDestroy() {
        if (this.timer) {
          clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
        }
      }
    }
</script>

<style  scoped>
  .content4{
    height: auto;
    margin-top: 10px;
    /*color: rgba(173, 255, 47, 0.25);*/
  }
  header{
    padding: 0;
    width: 100%;
    text-align: center;
    margin: 0;
  }
  .mod_efficiency{
    background-image: url("../static/img/efficiencyBack.png");
    background-size: 94% 100%;
    background-repeat: no-repeat;
    background-color: transparent;
    width: 100%;
    height: 23rem;
    background-position: center;
  }
  .mod_efficiency_title{
    font-size: 1rem;
    font-weight: bold;
    margin-top: -1rem;
  }
  .mod_problem{
    margin-left: 6%;
    overflow-y:hidden;
    height: 15.5rem;
    width: 34rem
  }
  .mod_problem_content{
    float: left;
    margin:0.5rem 0.8rem;
    width: 15rem;
    text-align: left
  }

  .title{
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
  .jingsha{
    color: #E60012 !important;
  }
  .weisha{
    color: #238F3B !important;

  }
  .qita{
    color: #956132 !important;
  }
  .tip{
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
  .choose{
    color: #00ffff !important;
    font-size: 1.2rem !important;
  }
  .tbTitle{
    font-weight: bolder;
    font-size: 1.2rem;
    color: #00ffff;
  }
  .unChoosetbTitle{
    font-weight: bolder;
    font-size: 1rem;
    color: #00b7b7;
    cursor:pointer;
  }
  .warpStop{
    background-image: url("../static/img/chart3.png") !important;
  }
  .sizingStop{
    background-image: url("../static/img/chart2.png") !important;
  }
  .tbText{
    font-weight: bolder;
    font-size: 1.2rem;
    color: lightblue;
  }
  .deviceState{
    width: 100%;
    height: 46rem;
  }
  .deviceStateCharts{
    width: 100%;
    height: 100%;
  }

  .failureEquipment{
    margin-top: 1rem;
    background-image: url("../static/img/bk4.png");
    background-size: 100% 99%;
    background-repeat: no-repeat;
    height: 34rem;
  }
  .factoryProduction{
    margin-top: 1rem;
    background-image: url("../static/img/bk4.png");
    background-size: 100% 99%;
    background-repeat: no-repeat;
    height: 29rem;
  }
  .typeDistribution{
    background-image: url("../static/img/bk4.png");
    background-size: 100% 99%;
    background-repeat: no-repeat;
    height: 28rem;
    margin: 0;
  }
  .centerContent{
    background-image: url("../static/img/bk4.png");
    background-size: 100% 99%;
    background-repeat: no-repeat;
    height: 58.5rem;
    margin: 0;
  }
  .productionTime{
    background-image: url("../static/img/bk4.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 23rem;
    margin: 0;
  }
  .problemsFocus{
    background-image: url("../static/img/bk4.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 23rem;
    margin: 0;
  }
  .warningPush{
    background-image: url("../static/img/bk4.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 23rem;
    margin: 0;
  }
  .totalProductionImg{
    background-image: url("../static/img/circle.png");
    background-repeat: no-repeat;
    background-size: 85% 100%;
    width: 100%;
    height: 9.5rem;
    text-align: center;
    vertical-align: middle;
  }
  .sizingImg{
    background-image: url("../static/img/chart1.png");
    background-repeat: no-repeat;
    background-size: 100% 50%;
    width: 80%;
    height: 10rem;
    margin-left: 1rem;
    margin-top: 1rem;
  }
  .warpImg{
    width: 100%;
  }
  .warpMachine{
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
  .percentage{
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
  .zjPercentage{
    position: absolute;
    z-index: 4;
    color: black;
    font-weight: bold;
  }
  .sizingDetail{
    background: rgba(122,121,121,0.63);

  }
  .sizingDetailTitle{
    text-align: center;
    height: 2rem;
    padding: 0.5rem 0;
    border: 1px solid rgba(121, 121, 121, 0.63);
    color: white;
  }
  .eltabs{
    width: 33rem;
  }

  .dataTable{
    background-color:transparent !important;
    margin-left: 0.1rem;
    width: 95%;
  }

  .el-table::before{
   height: 0;
  }
  .el-table::after{
    height: 0;
  }
  /* 使表格背景透明 */
  .el-table th, .el-table tr {
    background-color: transparent !important;
  }
  /*修改element-ui的table 在鼠标悬停hover时的高亮颜色*/
  .el-table tbody tr:hover>td {
    background-color: rgba(48, 162, 211, 0.9) !important
  }
  /*table表格控件表头与内容列不对齐问题*/
  body .el-table th.gutter{
    display: table-cell!important;
  }
</style>
<style>
  .el-input__inner{
    background-color: rgb(1, 4, 42) !important;
    font-size: 1rem;
    border-radius: 5px;
    width: 11rem;
    font-weight: bolder;
    color: #00ffff;
}
  .el-select-dropdown__item.selected{
    background-color: lightblue;
  }

  .el-dialog--center{
    background-color: rgb(0, 111, 175) !important;
    -webkit-box-shadow:1px 1px 1px rgba(190, 190, 190, 0.9);
    -moz-box-shadow:1px 1px 1px rgba(190, 190, 190, 0.9) ;
    box-shadow:2px 2px 10px rgba(190, 190, 190, 0.9);
    border-radius: 10px;
  }
  .el-dialog__title{
    font-size: 1.8rem !important;
    font-weight: bolder !important;
    color: #ffffff;
  }
  .el-tabs__nav{
    background-color: transparent;

  }
  .el-tabs__item{
    font-size: 1rem;
    color: lightblue;
    font-weight: bolder;
  }
  .el-tabs__item.is-active{
    color: #00ffff;
  }
  .sizingDetail .el-popover{
    padding: 0;
    background: rgba(121, 120, 121, 0.99);
  }
</style>
