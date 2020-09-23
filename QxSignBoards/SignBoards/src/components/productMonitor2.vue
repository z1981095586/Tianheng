<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="content4">

    <header>
      <div class="title">七星纺织智能制造数据看板</div>
      <h1 class="tip">
        <a style="margin-left: 23%;cursor: pointer" @click="dialogFormVisible = true" id="xinhai"
          v-for="item in workshopList" v-if="item.value==workshopId">{{item.label}}</a>
        <el-dialog id="dialog" center width="22%" :modal="false" :visible.sync="dialogFormVisible">
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="choseFactory(item.value)" v-for="item in workshopList" :key="item.value">{{item.label}}
          </el-button>
        </el-dialog>
        <el-dialog id="dialog" center width="22%" :modal="false" :visible.sync="dialogFormVisible_zj">
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="chose('zj','周数据')">周数据
          </el-button>
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="chose('zj','月数据')">月数据
          </el-button>
        </el-dialog>

        <el-dialog id="dialog" center width="22%" :modal="false" :visible.sync="dialogFormVisible_js">
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="chose('js','周数据')">周数据
          </el-button>
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="chose('js','月数据')">月数据
          </el-button>
        </el-dialog>

        <el-dialog id="dialog" center width="22%" :modal="false" :visible.sync="dialogFormVisible_zz">
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="chose('zz','周数据')">周数据
          </el-button>
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="chose('zz','月数据')">月数据
          </el-button>
        </el-dialog>

        <el-dialog id="dialog" center width="22%" :modal="false" :visible.sync="dialogFormVisible_yb">
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="chose('yb','周数据')">周数据
          </el-button>
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="chose('yb','月数据')">月数据
          </el-button>
        </el-dialog>

        <el-dialog id="dialog" center width="22%" :modal="false" :visible.sync="dialogFormVisible_wx">
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="chose('wx','全部')">全部
          </el-button>
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="chose('wx','待修')">待修
          </el-button>
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="chose('wx','修机')">修机
          </el-button>
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="chose('wx','已维修')">已维修
          </el-button>
        </el-dialog>
        <el-dialog id="dialog" center width="22%" :modal="false" :visible.sync="dialogFormVisible_xl">
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="chose('xl','效率优秀')">效率优秀
          </el-button>
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="chose('xl','效率落后')">效率落后
          </el-button>

        </el-dialog>
        <el-dialog id="dialog" center width="22%" :modal="false" :visible.sync="dialogFormVisible_kt">
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="chose('kt','1')">1
          </el-button>
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="chose('kt','7')">7
          </el-button>
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="chose('kt','30')">30
          </el-button>
        </el-dialog>
        <el-dialog id="dialog" center width="22%" :modal="false" :visible.sync="dialogFormVisible_cl">
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="chose('cl','1')">1
          </el-button>
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="chose('cl','7')">7
          </el-button>
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="chose('cl','30')">30
          </el-button>

        </el-dialog>
        <span style="float: right;margin-right: 19.5%">{{date | formatDate}} </span>
      </h1>
    </header>
    <el-row :gutter="5" style="overflow-y: hidden;">
      <el-col :span="16" style="padding:0">
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
      <el-col :span="8" style="padding:0">
        <div class="monitor" style="position:relative;">
          <div class="monitor_title"><span>产量实时监控</span></div>
          <div class="monitor_con">
            <div class="fangkuai" @click="tozj()">

              <div
                style="font-size:0.5rem;margin-bottom: 0.3rem;display:flex;align-items:center;justify-content: center;width:50%">
                <span>整经总产量</span></div>
              <div style="color:#08FF00;font-size:2rem;" class="num"><span v-for="(item,index) in sumzj" :key="index"
                  style="background:#2D2D2D;margin:0.2rem;padding-left:0.2rem;padding-right:0.2rem">{{item.num}}</span>
              </div>
            </div>
            <div class="fangkuai2" @click="tojs()">

              <div
                style="font-size:0.5rem;margin-bottom: 0.3rem;display:flex;align-items:center;justify-content: center;width:50%">
                <span>浆纱总产量</span></div>
              <div style="color:#FFCC00;font-size:2rem;" class="num"><span v-for="(item,index) in sumjs" :key="index"
                  style="background:#2D2D2D;margin:0.2rem;padding-left:0.2rem;padding-right:0.2rem">{{item.num}}</span>
              </div>
            </div>
            <div class="fangkuai" @click="tozz()">

              <div
                style="font-size:0.5rem;margin-bottom: 0.3rem;display:flex;align-items:center;justify-content: center;width:50%">
                <span>织造总产量</span></div>
              <div style="color:#CDFF00;font-size:2rem;" class="num"><span v-for="(item,index) in sumzz" :key="index"
                  style="background:#2D2D2D;margin:0.2rem;padding-left:0.2rem;padding-right:0.2rem">{{item.num}}</span>
              </div>
            </div>
            <div class="fangkuai2" @click="toyb()">

              <div
                style="font-size:0.5rem;margin-bottom: 0.3rem;display:flex;align-items:center;justify-content: center;width:50%">
                <span>验布总产量</span></div>
              <div style="color:#00FFFF;font-size:2rem;" class="num"><span v-for="(item,index) in sumyb" :key="index"
                  style="background:#2D2D2D;margin:0.2rem;padding-left:0.2rem;padding-right:0.2rem">{{item.num}}</span>
              </div>
            </div>
          </div>
          <!-- <div class="monitor_title" style="margin-top:0%"><span>设备实时运行监控</span></div>
          <div class="yj_echart">

            <div class="yj_echart_head">
              <div class="yj_echart_head_con">
                <div class="imgs"></div>
                <div>设备总台数</div>
              </div>
              <div class="yj_echart_head_con">
                <div class="imgs"></div>
                <div>正常运行</div>
              </div>
              <div class="yj_echart_head_con">
                <div class="imgs"></div>
                <div>经纱停车</div>
              </div>
              <div class="yj_echart_head_con">
                <div class="imgs"></div>
                <div>纬纱停车</div>
              </div>
              <div class="yj_echart_head_con">
                <div class="imgs"></div>
                <div>其他状态</div>
              </div>
            </div>
            <div class="yj_echart_head" style="margin-top:1rem">
              <div class="yj_echart_head_con" style="color:#00FFDC;font-size:2rem;margin-left:0.5rem;">256</div>
              <div class="yj_echart_head_con" style="color:#9AFF00;font-size:2rem;margin-left:0.5rem;">256</div>
              <div class="yj_echart_head_con" style="color:#FF6F00;font-size:2rem;margin-left:0.5rem;">256</div>
              <div class="yj_echart_head_con" style="color:#FF6F00;font-size:2rem;margin-left:0.5rem;">256</div>
              <div class="yj_echart_head_con" style="color:#FF6F00;font-size:2rem;margin-left:0.5rem;">256</div>
            </div>
          </div> -->
          <div style="display:flex;width:100%; margin-right: 16px;">
            <div class="monitor_title2" style="margin-top:0"><span>织机班次产量对比</span></div>
            <div class="monitor_title3" style="margin-top:0"><span>设备实时开机率</span></div>
          </div>
          <div style="display:flex;width:100%;height:18%; margin-right: 16px;">
            <div class="echart1" id="echart1"></div>
            <div class="echart2" id="echart2"></div>
          </div>
          <div style="display:flex;width:100%; margin-right: 16px;">
            <div class="monitor_title4" style="margin-top:0;margin-right:2%"><span>整经产量能源对比</span></div>
            <div class="monitor_title4" style="margin-top:0"><span>浆纱产量能源对比</span></div>
          </div>
          <div style="display:flex;width:100%;height:23%; margin-right: 16px;">
            <div class="echart1" style="width: 54%;" id="echart3"></div>
            <div class="echart2" id="echart4" style="width: 46%;"></div>
          </div>
          <div style="display:flex;width:100%; margin-right: 16px;">
            <div class="monitor_title4" style="margin-top:0;margin-right:2%"><span>织机产量能源对比</span></div>
            <div class="monitor_title4" style="margin-top:0"><span>验布产量能源对比</span></div>
          </div>
          <div style="display:flex;width:100%;height:23%; margin-right: 16px;">
            <div class="echart1" style="width: 54%;" id="echart5"></div>
            <div class="echart2" style="width: 46%;" id="echart6"></div>
          </div>
          <!-- <div class="e-chart-card" style="height:208px;" id="zx_echart">
              </div> -->
          <!-- <div class="data_con">style=" font-family: Lets-go-Digital"
            <div class="data_con_title">
              <div class="data_con_title_left">
                <span>整经产量</span>

              </div>
              <div class="data_con_title_right"><span>{{zj_choseItem}}</span><i class="el-icon-caret-bottom"
                  @click="dialogFormVisible_zj = true"></i></div>
            </div>
            <div class="data_con_line">
              <div class="line_con"></div>
            </div>
            <div class="e_chart" id="zj_echart"></div>
          </div>
          <div class="data_con">
            <div class="data_con_title">
              <div class="data_con_title_left">
                <span>浆纱产量</span>

              </div>
              <div class="data_con_title_right"><span>{{js_choseItem}}</span><i class="el-icon-caret-bottom"
                  @click="dialogFormVisible_js = true"></i></div>
            </div>
            <div class="data_con_line">
              <div class="line_con"></div>
            </div>
            <div class="e_chart" id="js_echart"></div>
          </div>
          <div class="data_con">
            <div class="data_con_title">
              <div class="data_con_title_left">
                <span>织造产量</span>

              </div>
              <div class="data_con_title_right"><span>{{zz_choseItem}}</span><i class="el-icon-caret-bottom"
                  @click="dialogFormVisible_zz = true"></i></div>
            </div>
            <div class="data_con_line">
              <div class="line_con"></div>
            </div>
            <div class="e_chart" id="zz_echart"></div>
          </div>
          <div class="data_con">
            <div class="data_con_title">
              <div class="data_con_title_left">
                <span>验布产量</span>

              </div>
              <div class="data_con_title_right"><span>{{yb_choseItem}}</span><i class="el-icon-caret-bottom"
                  @click="dialogFormVisible_yb = true"></i></div>
            </div>
            <div class="data_con_line">
              <div class="line_con"></div>
            </div>
            <div class="e_chart" id="yb_echart"></div>
          </div>
          <div class="data_con">
            <div class="data_con_title">
              <div class="data_con_title_left">
                <span>设备维修</span>

              </div>
              <div class="data_con_title_right"><span>{{wx_choseItem}}</span><i class="el-icon-caret-bottom"
                  @click="dialogFormVisible_wx = true"></i></div>
            </div>
            <div class="data_con_line">
              <div class="line_con"></div>

            </div>
            <div class="cons">
              <div class="cons_con_con" v-for="(item,index) in wxList" :key="index" :style="item.color"><span
                  style="width:25%;margin-left:5%">{{item.machineId}}</span><span style="width:70%">{{item.status}}
                  {{item.times}}h</span></div>




            </div>
          </div>
          <div class="data_con">
            <div class="data_con_title">
              <div class="data_con_title_left">
                <span>织造排序</span>

              </div>
              <div class="data_con_title_right"><span>{{xl_choseItem}}</span><i class="el-icon-caret-bottom"
                  @click="dialogFormVisible_xl = true"></i></div>
            </div>
            <div class="data_con_line">
              <div class="line_con"></div>
            </div>
            <div class="cons">

              <div class="cons_con_con" style="color:#44D7B6" v-for="(item,index) in xlyxList" :key="index"><span
                  style="width:25%;margin-left:5%">{{item.machineid}}</span><span style="width:70%">效率
                  {{item.e24hEfficiencyF}}%</span></div>

            </div>

          </div>
          <div class="data_con">
            <div class="data_con_title">
              <div class="data_con_title_left">
                <span>品种开台数</span>

              </div>
              <div class="data_con_title_right"><span>统计前：{{kt_choseItem}}</span><i class="el-icon-caret-bottom"
                  @click="dialogFormVisible_kt = true"></i></div>
            </div>
            <div class="data_con_line">
              <div class="line_con"></div>
            </div>
            <div class="e_chart" id="xj_echart"></div>
          </div>
          <div class="data_con">
            <div class="data_con_title">
              <div class="data_con_title_left">
                <span>品种产量</span>

              </div>
              <div class="data_con_title_right"><span>统计前：{{cl_choseItem}}</span><i class="el-icon-caret-bottom"
                  @click="dialogFormVisible_cl = true"></i></div>
            </div>
            <div class="data_con_line">
              <div class="line_con"></div>
            </div>
            <div class="e_chart" id="yj_echart"></div>
          </div> -->



        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios';
  import {
    formatDate
  } from "../static/js/date"; //引入时间格式化js
  export default {
    name: "productMonitor",
    data() {
      return {
        sumjs: null,
        mincurrentShiftOutput: null,
        maxcurrentShiftOutput: null,
        shiftDate: [],
        currentShiftOutput: [],
        dialogFormVisible_zj: false,
        zj_choseItem: "周数据",

        dialogFormVisible_js: false,
        js_choseItem: "周数据",

        dialogFormVisible_zz: false,
        zz_choseItem: "周数据",

        dialogFormVisible_yb: false,
        yb_choseItem: "周数据",
        dialogFormVisible_wx: false,
        wx_choseItem: "全部",
        dialogFormVisible_xl: false,
        xl_choseItem: "效率优秀",
        dialogFormVisible_kt: false,
        kt_choseItem: "1",
        dialogFormVisible_cl: false,
        cl_choseItem: "1",
        wxList: [],
        xlyxList: [],
        zjList: [],
        jsList: [],
        zxt_data: [],
        zxt_data2: [],
        zxt_data3: [],
        zxt_data4: [],
        maxChartEfficiency2: "",
        minChartEfficiency2: "",
        lang: 'zh',
        workshopId: '',
        src2: '', //设备状态图
        workshopList: [], // 车间编号
        chartWorkshopList: [], // 图表车间数组
        dialogFormVisible: false, //对话框
        deviceHeight: '', //iframe外层div高度
        deviceWidth: '', //iframe外层div宽度
        date: new Date(),
        url: window.apiRoot.api_board,
        companyId: this.$route.params.id, //公司库表Id
        buttonName: 'zh-CN',
        zongchanlaingduibi: true, //总产量推移界面
        chanliangtuyi: true, //产量对比界面
        warp_page: true, //整经监控界面
        sizing_page: false, //浆纱监控界面
        warpDetail_page: false, //整经详细界面
        sizingDetail_page: false, //浆纱详细界面
        currentLength: 2900, //当前长度
        totalLength: 4500, //总共长度
        tableData: [], //预警表
        lioajiData: [], //了机数据
        lioajiIngData: [], //当前了机
        activeName: 'first', //预警区域选项
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
        problemOptions: [{
          value: '4',
          label: '效率优秀设备'
        }, {
          value: '5',
          label: '产量优秀设备'
        }, {
          value: '1',
          label: '效率落后设备'
        }, {
          value: '2',
          label: '产量落后设备'
        }, {
          value: '3',
          label: '断头落后设备'
        }], //问题种类选项
        problemDefaultValue: '4', //问题默认值
        maxEfficiency: '95', //最高效率
        avgEfficiency: '89', //平均效率
        machineEfficiency: [ //机器号 开机效率
          {
            machineNum: '',
            openEfficiency: ''
          },
          {
            machineNum: '',
            openEfficiency: ''
          },
          {
            machineNum: '',
            openEfficiency: ''
          },
          {
            machineNum: '',
            openEfficiency: ''
          },
          {
            machineNum: '',
            openEfficiency: ''
          },
          {
            machineNum: '',
            openEfficiency: ''
          },
          {
            machineNum: '',
            openEfficiency: ''
          },
          {
            machineNum: '',
            openEfficiency: ''
          },
          {
            machineNum: '',
            openEfficiency: ''
          },
          {
            machineNum: '',
            openEfficiency: ''
          },
          {
            machineNum: '',
            openEfficiency: ''
          },
          {
            machineNum: '',
            openEfficiency: ''
          },

        ], //效率落后设备
        machineChanliangb: [{
            machineNum: '',
            chanliangb: ''
          },
          {
            machineNum: '',
            chanliangb: ''
          },
          {
            machineNum: '',
            chanliangb: ''
          },
          {
            machineNum: '',
            chanliangb: ''
          },
          {
            machineNum: '',
            chanliangb: ''
          },
          {
            machineNum: '',
            chanliangb: ''
          },
          {
            machineNum: '',
            chanliangb: ''
          },
          {
            machineNum: '',
            chanliangb: ''
          },
          {
            machineNum: '',
            chanliangb: ''
          },
          {
            machineNum: '',
            chanliangb: ''
          },
          {
            machineNum: '',
            chanliangb: ''
          },
          {
            machineNum: '',
            chanliangb: ''
          },
        ], //产量落后设备

        //===================问题聚焦===========================


        //===================报警设备===========================
        unusualStop: [],
        //===================报警设备===========================

        //===================总产量对比===========================
        yesProducton: [], //昨日总产量
        yesProductonXs: [], //昨日折标总产量
        todProduction: [], //今日总产量
        todProductionXs: [], //今日折标总产量
        sumTodProduction: '', //今日四个车间总产量
        sumTodProductionXs: '', //今日四个车间总产量折标
        //===================总产量对比===========================
        maxChartEfficiency: '',
        minChartEfficiency: '',
        sumzz: [],
        sumzj: [],
        sumyb: [],
        jsumyb:0
      }
    },
    methods: {
      tozj() {
        ////console.log(this.workshopId)
        this.$router.push({
          path: '/zj/' + this.companyId + "/" + this.workshopId
        })
      },
            tozz() {
        ////console.log(this.workshopId)
        this.$router.push({
          path: '/zz/' + this.companyId + "/" + this.workshopId
        })
      },
      toyb() {
            this.$router.push({ //跳转并传参数
          path: '/yb',
          name: 'yb',
          params:{
              //  machine_id:this.macRelation.machine_id,
              id:this.companyId,
              // workshop_id:this.macRelation.workshop_id,
            //  workshop:this.workshopId,
            workshopid:this.workshopId,
            jsumyb:this.jsumyb
          }

        })
        // this.$router.push({
        //   path: '/yb/' + this.companyId + "/" + this.workshopId+"/"+this.jsumyb
        // })
      },
      tojs() {
        this.$router.push({
          path: '/js/' + this.companyId + "/" + this.workshopId
        })
      },
      chose(name, choseItem) {
        if (name == "zj") {
          this.dialogFormVisible_zj = false
          this.zj_choseItem = choseItem
          this.zjEchart()
        } else if (name == "js") {
          this.dialogFormVisible_js = false
          this.js_choseItem = choseItem
          this.jsEchart()
        } else if (name == "zz") {
          this.dialogFormVisible_zz = false
          this.zz_choseItem = choseItem
          this.getYieldAnalysisNew()
        } else if (name == "yb") {
          this.dialogFormVisible_yb = false
          this.yb_choseItem = choseItem
          this.ybEchart()
        } else if (name == "wx") {
          this.dialogFormVisible_wx = false
          this.wx_choseItem = choseItem
          let list = []

          if (choseItem == "全部") {
            this.wxList = this.wxList2
          } else {
            for (let i = 0; i < this.wxList2.length; i++) {

              if (this.wxList2[i].status == choseItem) {
                list.push(this.wxList2[i])
              }
            }
            this.wxList = list
          }

          //this.wxEchart()
        } else if (name == "xl") {
          this.dialogFormVisible_xl = false
          this.xl_choseItem = choseItem
          if (choseItem == "效率优秀") {
            let that = this
            axios({
                url: 'http://120.55.124.53:7070/s/getEfficiency', // 效率优秀
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                  'companyId': that.companyId
                },
                data: {
                  "problemId": "4",
                  "workshopId": that.workshopId
                }

              })
              .then(response => {
                ////////console.log(response)
                let list = []
                for (let i = 0; i < response.data.data.list.length; i++) {
                  list.push(response.data.data.list[i])
                }
                list = that.sortByKey(list, "e24hEfficiencyF")
                let list2 = []
                for (let i = list.length - 1; i >= 0; i--) {
                  list2.push(list[i])
                }
                ////////console.log(list)
                that.xlyxList = list2
              })
              .then(() => {

              })
          } else {
            let that = this
            axios({
                url: 'http://120.55.124.53:7070/s/getEfficiency', // 效率落后（低效机台）
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                  'companyId': that.companyId
                },
                data: {
                  "problemId": "1",
                  "workshopId": that.workshopId
                }

              })
              .then(response => {

                ////////console.log(response)
                let list = []
                for (let i = 0; i < response.data.data.list.length; i++) {
                  list.push(response.data.data.list[i])
                }
                list = that.sortByKey(list, "e24hEfficiencyF")
                let list2 = []
                for (let i = list.length - 1; i >= 0; i--) {
                  list2.push(list[i])
                }
                ////////console.log(list)
                that.xlyxList = list2
              })
              .then(() => {

              })
          }

          // this.xlEchart()
        } else if (name == "kt") {
          this.dialogFormVisible_kt = false
          this.kt_choseItem = choseItem
          let that = this
          that.pzktsList = []
          that.NameList = []
          let startDate = that.getYesterday(parseInt(that.kt_choseItem));
          let endDate = that.getNowday()
          axios({
              url: 'http://120.55.124.53:7070/app/getTypeInfo', //品种开台数
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                'companyId': that.companyId
              },
              data: {
                "order": "openMachineNum",
                "startDate": startDate,
                "endDate": endDate,
                "limitNum": 5
              }

            })
            .then(response => {
              ////////console.log(response)

              for (let i = 0; i < response.data.data.length; i++) {
                that.NameList.push(response.data.data[i].styleName)
                let json = {
                  value: response.data.data[i].openMachineNum,
                  name: response.data.data[i].styleName,
                }

                that.pzktsList.push(json)

              }
              that.ktEchart()



            })
            .then(() => {

            })

        } else if (name == "cl") {
          this.dialogFormVisible_cl = false
          this.cl_choseItem = choseItem
          let that = this
          that.pzclList = []
          that.NameList = []
          let startDate = that.getYesterday(parseInt(that.cl_choseItem));
          let endDate = that.getNowday()
          axios({
              url: 'http://120.55.124.53:7070/app/getTypeInfo', //品种产量
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                'companyId': that.companyId
              },
              data: {
                "order": "productMeter",
                "startDate": startDate,
                "endDate": endDate,
                "limitNum": 5
              }

            })
            .then(response => {
              ////////console.log(response)

              for (let i = 0; i < response.data.data.length; i++) {
                that.NameList.push(response.data.data[i].styleName)
                let json1 = {
                  value: response.data.data[i].productMeter,
                  name: response.data.data[i].styleName,
                }

                that.pzclList.push(json1)

              }
              that.clEchart()



            })
            .then(() => {

            })

        }
      },

      getDate2() {
        let that = this

        if (that.xl_choseItem == "效率优秀") {
          axios({
              url: 'http://120.55.124.53:7070/s/getEfficiency', // 效率优秀（低效机台）
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                'companyId': that.companyId
              },
              data: {
                "problemId": "4",
                "workshopId": that.workshopId
              }

            })
            .then(response => {
              ////////console.log(response)
              let list = []
              for (let i = 0; i < response.data.data.list.length; i++) {
                list.push(response.data.data.list[i])
              }
              list = that.sortByKey(list, "e24hEfficiencyF")
              let list2 = []
              for (let i = list.length - 1; i >= 0; i--) {
                list2.push(list[i])
              }
              ////////console.log(list)
              that.xlyxList = list2

            })
            .then(() => {

            })
        } else if (that.xl_choseItem == "效率落后") {
          axios({
              url: 'http://120.55.124.53:7070/s/getEfficiency', // 效率落后（低效机台）
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                'companyId': that.companyId
              },
              data: {
                "problemId": "1",
                "workshopId": that.workshopId
              }

            })
            .then(response => {

              ////////console.log(response)
              let list = []
              for (let i = 0; i < response.data.data.list.length; i++) {
                list.push(response.data.data.list[i])
              }
              list = that.sortByKey(list, "e24hEfficiencyF")
              let list2 = []
              for (let i = list.length - 1; i >= 0; i--) {
                list2.push(list[i])
              }
              ////////console.log(list)
              that.xlyxList = list2
            })
            .then(() => {

            })
        }

        axios({
            url: 'http://120.55.124.53:7070/app/getMachineRepairBoard', //设备维修
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {
              "workshopId": that.workshopId,
              "groupId": null
            }

          })
          .then(response => {
            ////////console.log(response)

            let list2 = response.data.data.data
            let list3 = []


            for (let i = 0; i < list2.length; i++) { //统计图的数据处理
              list2[i].times = (that.TimeDifference(list2[i].submitDate, that.formatDate(that.date)) / 60).toFixed(2)
              if (list2[i].status == "已完成") {
                list2[i].times = ((that.TimeDifference(list2[i].getOrderDate, list2[i].repairedDate)) / 60).toFixed(2)
                list2[i].status = "已维修"
                list2[i].color = "color:rgb(109, 212, 0)"
              } else if (list2[i].status == "未处理") {
                list2[i].status = "待修"
                list2[i].color = "color:rgb(247, 181, 0)"
              } else if (list2[i].status == "处理中") {
                list2[i].status = "修机"
                list2[i].color = "color:rgb(247, 181, 0)"
              }
              list3.push(list2[i])
            }
            that.wxList = list3
            that.wxList2 = list3 //存储全部数据


          })
          .then(() => {

          })
        that.getTypeInfo()
        that.getYieldAnalysisNew()

      },
      getTypeInfo() { //品种开台数产量统计图数据
        let startDate = this.getYesterday(1);

        let that = this
        that.NameList = []
        that.pzktsList = []
        that.pzclList = []

        axios({
            url: 'http://120.55.124.53:7070/app/getTypeInfo', //品种产量
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },

            data: {
              "order": "productMeter",
              "startDate": startDate,
              "endDate": that.getNowday(),
              "limitNum": 5
            }

          })
          .then(response => {
            ////////console.log(response)
            for (let i = 0; i < response.data.data.length; i++) {
              that.NameList.push(response.data.data[i].styleName)

              let json1 = {
                value: response.data.data[i].productMeter,
                name: response.data.data[i].styleName,
              }

              that.pzclList.push(json1)
            }

            that.clEchart()


          })
          .then(() => {

          })
        // axios({
        //     url: 'http://120.55.124.53:7070/app/getTypeInfo', //品种开台数
        //     method: 'post',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'companyId': that.companyId
        //     },

        //     data: {
        //       "order": "openMachineNum",
        //       "startDate": startDate,
        //       "endDate": that.getNowday(),
        //       "limitNum": 5
        //     }

        //   })
        //   .then(response => {
        //     ////////console.log(response)
        //     for (let i = 0; i < response.data.data.length; i++) {
        //       that.NameList.push(response.data.data[i].styleName)
        //       let json = {
        //         value: response.data.data[i].openMachineNum,
        //         name: response.data.data[i].styleName,
        //       }

        //       that.pzktsList.push(json)

        //     }
        //     that.ktEchart()



        //   })
        //   .then(() => {

        //   })
      },
      getYieldAnalysisNew() {
        let that = this

        axios({
            url: 'http://120.55.124.53:7070/sign2/getYieldAnalysisNew', //制造产量、效率
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {
              "workshopIds": null,
              "workshopArray": [that.workshopId]
            }

          })
          .then(response => {
            ////////console.log(response)
            that.zzclName = []
            that.zzclList = []
            if (response.data.data.length > 0) {
              for (let i = 0; i < response.data.data[0].yieldAnalysisList2.length; i++) {
                let k = String(response.data.data[0].yieldAnalysisList2[i].months)
                response.data.data[0].yieldAnalysisList2[i].months = k.slice(5)

                if (response.data.data[0].yieldAnalysisList2[i].totalProductMeterXs < 1000) {
                  response.data.data[0].yieldAnalysisList2[i].totalProductMeterXs = (response.data.data[0]
                    .yieldAnalysisList2[i].totalProductMeterXs / 1000).toFixed(2)
                } else {
                  response.data.data[0].yieldAnalysisList2[i].totalProductMeterXs = (response.data.data[0]
                    .yieldAnalysisList2[i].totalProductMeterXs / 1000).toFixed(0)
                }
                that.zzclName.push(response.data.data[0].yieldAnalysisList2[i].months)
                that.zzclList.push(response.data.data[0].yieldAnalysisList2[i].totalProductMeterXs)
              }

              that.maxzzclList = Math.max(...that.zzclList) + 0.2
              that.minzzclList = Math.min(...that.zzclList) - 0.2
              ////////console.log(that.minzzclList)
              ////////console.log(that.zzclList)
              ////////console.log(that.zzclName)
              that.zzEchart()
            } else {
              let myChart1 = this.$echarts.init(document.getElementById('zz_echart'));
              // 绘制图表
              myChart1.clear();
            }


          })
          .then(() => {

          })
        if (that.workshopId == 2) {
          axios({
              url: 'http://120.55.124.53:7070/warpingHis/selectWeekYield', //整经统计图数据
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                'companyId': that.companyId
              },
              data: {
                workshops: "2,3"
              }

            })
            .then(response => {
              ////////console.log(response)
              let list = []
              let list2 = []
              for (let i = response.data.data.length - 1; i >= 0; i--) {
                response.data.data[i].shiftDate = response.data.data[i].shiftDate.slice(5)
                list2.push((response.data.data[i].currentShiftOutput / 1000).toFixed(0))
                list.push(response.data.data[i].shiftDate)
              }
              that.maxcurrentShiftOutput = Math.max(...list2) + 0.2
              that.mincurrentShiftOutput = Math.min(...list2) - 0.2
              that.shiftDate = list
              that.currentShiftOutput = list2
              that.zjEchart()
            })
        } else {
          axios({
              url: 'http://120.55.124.53:7070/warpingHis/selectWeekYield', //整经统计图数据
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                'companyId': that.companyId
              },
              data: {
                workshops: that.workshopId
              }

            })
            .then(response => {
              ////////console.log(response)
              let list = []
              let list2 = []
              for (let i = response.data.data.length - 1; i >= 0; i--) {
                response.data.data[i].shiftDate = response.data.data[i].shiftDate.slice(5)
                list2.push((response.data.data[i].currentShiftOutput / 1000).toFixed(0))
                list.push(response.data.data[i].shiftDate)
              }
              that.maxcurrentShiftOutput = Math.max(...list2) + 0.2
              that.mincurrentShiftOutput = Math.min(...list2) - 0.2
              that.shiftDate = list
              that.currentShiftOutput = list2
              that.zjEchart()
            })
        }

      },
      getNowday() { //获取当前日期
        var now = new Date();
        let format = 1
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth(); //得到月份
        var date = now.getDate(); //得到日期

        month = month + 1;
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;

        var time = "";
        //精确到天
        if (format == 1) {
          time = year + "-" + month + "-" + date;
        }
        //精确到分
        else if (format == 2) {
          time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
        }
        return time;
      },
      getYesterday(value) { //获取离当前日期近几天的日期
        var time = (new Date).getTime() - 24 * 60 * 60 * 1000 * value;
        var yesterday = new Date(time);
        var month = yesterday.getMonth();
        var day = yesterday.getDate();
        yesterday = yesterday.getFullYear() + "-" + (yesterday.getMonth() > 9 ? (yesterday.getMonth() + 1) : "0" + (
          yesterday.getMonth() + 1)) + "-" + (yesterday.getDate() > 9 ? (yesterday.getDate()) : "0" + (yesterday
          .getDate()));
        return yesterday;
      },
      zjEchart() { //整经图表
        let myChart1 = this.$echarts.init(document.getElementById('zj_echart'));
        // 绘制图表
        myChart1.clear();
        let that = this;
        let option = {
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
            data: that.shiftDate
          },
          yAxis: {
            axisLine: { //这是x轴文字颜色
              lineStyle: {
                color: "#fff",
              }
            },
            axisLabel: {
              formatter: '{value}Km'
            },
            max: that.maxcurrentShiftOutput,
            // min:that.mincurrentShiftOutput,
            min: 0,
            splitLine: {
              show: false
            },
            type: 'value'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: "0",
            top: "18%",
            containLabel: true
          },
          series: [{
            data: that.currentShiftOutput,
            type: 'bar',
            itemStyle: {
              normal: {
                //这里是重点
                color: function (params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'];
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
      },
      jsEchart() { //浆纱图表
        let myChart1 = this.$echarts.init(document.getElementById('js_echart'));
        // 绘制图表
        myChart1.clear();
        let that = this;
        let option = {
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
            data: ['07-30', '07-31', '08-01', '08-02', '08-03', '08-04', '08-05', ]
          },
          yAxis: {
            axisLine: { //这是x轴文字颜色
              lineStyle: {
                color: "#fff",
              }
            },
            axisLabel: {
              formatter: '{value}Km'
            },
            max: 602,
            min: 0,
            splitLine: {
              show: false
            },
            type: 'value'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: "0",
            top: "18%",
            containLabel: true
          },
          series: [{
            data: [320, 300, 350, 380, 370, 334, 340],
            type: 'bar',
            itemStyle: {
              normal: {
                //这里是重点
                color: function (params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'];
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
      },
      zzEchart() { //织造图表
        let myChart1 = this.$echarts.init(document.getElementById('zz_echart'));
        // 绘制图表
        myChart1.clear();
        let that = this;
        let option = {
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
            data: that.zzclName
          },
          yAxis: {
            axisLine: { //这是x轴文字颜色
              lineStyle: {
                color: "#fff",
              }
            },
            axisLabel: {
              formatter: '{value}Km'
            },
            splitLine: {
              show: false
            },
            max: that.maxzzclList,
            // min: that.minzzclList,
            min: 0,
            type: 'value'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: "0",
            top: "18%",
            containLabel: true
          },
          series: [{
            data: that.zzclList,
            type: 'bar',
            itemStyle: {
              normal: {
                //这里是重点
                color: function (params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'];
                  return colorList[params.dataIndex]
                },
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: { //数值样式
                    color: 'white',
                    fontSize: 12
                  },

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
      },
      ybEchart() { //验布图表
        let myChart1 = this.$echarts.init(document.getElementById('yb_echart'));
        // 绘制图表
        myChart1.clear();
        let that = this;
        let option = {
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
            data: ['07-30', '07-31', '08-01', '08-02', '08-03', '08-04', '08-05', ]
          },
          yAxis: {
            axisLine: { //这是x轴文字颜色
              lineStyle: {
                color: "#fff",
              }
            },

            axisLabel: {
              formatter: '{value}Km'
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
            top: "18%",
            containLabel: true
          },
          series: [{
            data: [620, 600, 650, 680, 670, 610, 630],
            type: 'bar',
            itemStyle: {
              normal: {
                //这里是重点
                color: function (params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'];
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
      },
      ktEchart() { //品种开台数图表
        let myChart1 = this.$echarts.init(document.getElementById('xj_echart'));
        // 绘制图表
        myChart1.clear();
        let that = this;

        let option = {

          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            right: "0%",
            top: "10%",
            textStyle: { // 图列内容样式
              color: '#fff', // 字体颜色
              fontSize: 15
            },

            data: that.NameList
          },
          labelLine: {
            show: false
          },
          series: [

            {
              name: '访问来源',
              type: 'pie',
              radius: '80%',

              center: ['30%', '50%'],
              data: that.pzktsList,
              label: { //去除饼图的指示折线label
                normal: {
                  show: false,
                  position: 'inside',
                  formatter: "{b}:{d}%"
                },
              },


            }
          ]
        };

        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },
      clEchart() { //品种产量图表
        let myChart1 = this.$echarts.init(document.getElementById('yj_echart'));
        // 绘制图表
        myChart1.clear();
        let that = this;
        let sum = 0
        for (let i = 0; i < that.pzclList.length; i++) {

          sum = sum + that.pzclList[i].value
        }
        // let option = {

        //   tooltip: {
        //     trigger: 'item',
        //     formatter: '{a} <br/>{b} : {c} ({d}%)'
        //   },
        //   legend: {
        //     orient: 'vertical',
        //     right: "0%",
        //     top: "10%",
        //     textStyle: { // 图列内容样式
        //       color: '#fff', // 字体颜色
        //       fontSize: 15
        //     },

        //     data: that.NameList
        //   },
        //   labelLine: {
        //     show: false
        //   },
        //   series: [

        //     {
        //       name: '访问来源',
        //       type: 'pie',
        //       radius: '80%',

        //       center: ['30%', '50%'],
        //       data: that.pzclList,
        //       label: { //去除饼图的指示折线label
        //         normal: {
        //           show: false,
        //           position: 'inside',
        //           formatter: "{b}:{d}%"
        //         },
        //       },


        //     }
        //   ]
        // };
        let option = {

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
              fontSize: 20,
              color: "white"
            },
            data: that.NameList
          },
          graphic: [{ //环形图中间添加文字
              type: 'text',
              left: '30%',
              top: '45%',
              style: {
                text: '品种总产量',
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
              left: '33%',
              top: '52%',
              style: {
                text: sum,
                textAlign: 'center',
                fill: '#FFF70D', //文字的颜色
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
              formatter: '12个',
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
            data: that.pzclList
          }]
        };
        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },
      getStartRatesYMD(workshop) {
        let that = this;
        if (workshop == 2) {
          axios({
              url: 'http://120.55.124.53:7070/weight/getEffDay?workshopId=2',
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                companyId: that.companyId
              },

            })
            .then(response => {
              ////////console.log(response);
              let list = [];
              let list2 = [];
              let list3 = [];
              that.zxt_data = [];
              that.zxt_data2 = [];
              for (let i = 0; i < response.data.data[0].selectList.length - 1; i++) {
                list.push(response.data.data[0].selectList[i])
              }
              ////////console.log(list);
              for (let i = 0; i < 10; i++) {
                list2.push(list[i])
              }
              ////////console.log(list2);
              for (let i = list2.length - 1; i > list2.length - 11; i--) {
                list3.push(list2[i])
              }
              ////////console.log(list3);
              for (let i = 0; i < 10; i++) {
                that.zxt_data.push((list3[i].efficiency * 100).toFixed(1));

                list3[i].date = (list3[i].date.replace(/-/g, "/")).slice(5);

                that.zxt_data2.push(list3[i].date)

              }
              that.maxChartEfficiency = Math.max(...that.zxt_data) + 0.2;
              that.minChartEfficiency = Math.min(...that.zxt_data) - 0.2;
              if (that.maxChartEfficiency > 100)
                that.maxChartEfficiency = 100;
              ////////console.log(that.maxChartEfficiency);

              ////////console.log(that.zxt_data);
              ////////console.log(that.zxt_data2);


            })
            .then(() => {
              axios({
                  url: 'http://120.55.124.53:7070/weight/getEffDay?workshopId=3',
                  method: 'get',
                  headers: {
                    'Content-Type': 'application/json',
                    companyId: that.companyId
                  },

                })
                .then(response => {
                  ////////console.log(response);
                  let list = [];
                  let list2 = [];
                  let list3 = [];
                  that.zxt_data3 = [];
                  that.zxt_data4 = [];
                  for (let i = 0; i < response.data.data[0].selectList.length - 1; i++) {
                    list.push(response.data.data[0].selectList[i])
                  }
                  ////////console.log(list);
                  for (let i = 0; i < 10; i++) {
                    list2.push(list[i])
                  }
                  ////////console.log(list2);
                  for (let i = list2.length - 1; i > list2.length - 11; i--) {
                    list3.push(list2[i])
                  }
                  ////////console.log(list3);
                  for (let i = 0; i < 10; i++) {
                    that.zxt_data3.push((list3[i].efficiency * 100).toFixed(1));

                    list3[i].date = (list3[i].date.replace(/-/g, "/")).slice(5);

                    that.zxt_data4.push(list3[i].date)

                  }
                  that.maxChartEfficiency2 = Math.max(...that.zxt_data3) + 0.2;
                  that.minChartEfficiency2 = Math.min(...that.zxt_data3) - 0.2;
                  if (that.maxChartEfficiency2 > 100)
                    that.maxChartEfficiency2 = 100;
                  if (that.maxChartEfficiency2 > that.maxChartEfficiency) {
                    that.maxChartEfficiency = that.maxChartEfficiency2
                  }
                  if (that.minChartEfficiency2 < that.minChartEfficiency) {
                    that.minChartEfficiency = that.minChartEfficiency2
                  }
                  ////////console.log(that.maxChartEfficiency)






                })
                .then(() => {
                  that.zhexian()
                })
            })
        } else {
          axios({
              url: 'http://120.55.124.53:7070/weight/getEffDay?workshopId=' + workshop,
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                companyId: that.companyId
              },

            })
            .then(response => {
              ////////console.log(response);
              let list = [];
              let list2 = [];
              let list3 = [];
              that.zxt_data = [];
              that.zxt_data2 = [];
              for (let i = 0; i < response.data.data[0].selectList.length - 1; i++) {
                list.push(response.data.data[0].selectList[i])
              }
              ////////console.log(list);
              for (let i = 0; i < 10; i++) {
                list2.push(list[i])
              }
              ////////console.log(list2);
              for (let i = list2.length - 1; i > list2.length - 11; i--) {
                list3.push(list2[i])
              }
              ////////console.log(list3);
              for (let i = 0; i < 10; i++) {
                that.zxt_data.push((list3[i].efficiency * 100).toFixed(1));

                list3[i].date = (list3[i].date.replace(/-/g, "/")).slice(5);

                that.zxt_data2.push(list3[i].date)

              }
              that.maxChartEfficiency = Math.max(...that.zxt_data) + 0.2;
              that.minChartEfficiency = Math.min(...that.zxt_data) - 0.2;
              if (that.maxChartEfficiency > 100)
                that.maxChartEfficiency = 100;
              ////////console.log(that.maxChartEfficiency);

              ////////console.log(that.zxt_data);
              ////////console.log(that.zxt_data2);


            })
            .then(() => {
              that.zhexian()
            })
        }

      },
      getZhengjing(workshop) { //获取整经数据
        let that = this;
        ////////console.log(workshop)
        if (workshop == 2) { //如果是二分厂，就把二三分厂的数据合并
          that.zjList = [];
          axios({
              url: 'http://120.55.124.53:7070/warping/getZhengJing?workshopId=' + workshop,
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                companyId: that.companyId
              },

            })
            .then(response => {
              ////////console.log(response);

              for (let i = 0; i < response.data.data.length; i++) {
                // response.data.data[i].duantoulv= response.data.data[i].control_pressure//断头率
                response.data.data[i].duantou = response.data.data[i].numberBrokenEnds //断头数
                response.data.data[i].currentLength = (response.data.data[i].currentLength / 1000).toFixed(2)
                if (response.data.data[i].currentLength == 0) {
                  response.data.data[i].zwcd = 0
                } else {
                  response.data.data[i].zwcd = (response.data.data[i].currentLength / response.data.data[i]
                    .settingLength) * 100
                  response.data.data[i].zwcd = (response.data.data[i].zwcd.toFixed(1)) * 1
                }

                if ((response.data.data[i].settingSpeed <= 0) || (response.data.data[i].currentSpeed <= 0)) {
                  response.data.data[i].flag = false
                } else {
                  response.data.data[i].flag = true
                }

                if (response.data.data[i].zwcd == Infinity) {
                  response.data.data[i].zwcd = 0
                }
                that.zjList.push(response.data.data[i])
                that.zjList = this.sortByKey(that.zjList, 'machineId');
                ////////console.log(that.zjList)
              }

            })
            .then(() => {
              axios({
                  url: 'http://120.55.124.53:7070/warping/getZhengJing?workshopId=' + that.workshopId,
                  method: 'get',
                  headers: {
                    'Content-Type': 'application/json',
                    companyId: that.companyId
                  },

                })
                .then(response => {
                  ////////console.log(response);

                  for (let i = 0; i < response.data.data.length; i++) {
                    // response.data.data[i].duantoulv= response.data.data[i].control_pressure//断头率
                    response.data.data[i].duantou = response.data.data[i].numberBrokenEnds //断头数
                    response.data.data[i].currentLength = (response.data.data[i].currentLength / 1000).toFixed(2)
                    if (response.data.data[i].currentLength == 0) {
                      response.data.data[i].zwcd = 0
                    } else {
                      response.data.data[i].zwcd = (response.data.data[i].currentLength / response.data.data[i]
                        .settingLength) * 100
                      response.data.data[i].zwcd = (response.data.data[i].zwcd.toFixed(1)) * 1
                    }

                    if ((response.data.data[i].settingSpeed <= 0) || (response.data.data[i].currentSpeed <= 0)) {
                      response.data.data[i].flag = false
                    } else {
                      response.data.data[i].flag = true
                    }

                    if (response.data.data[i].zwcd == Infinity) {
                      response.data.data[i].zwcd = 0
                    }
                    that.zjList.push(response.data.data[i])
                    that.zjList = this.sortByKey(that.zjList, 'machineId');
                    ////////console.log(that.zjList)
                  }

                })
                .then(() => {

                })
            })

        } else {
          that.zjList = [];
          axios({
              url: 'http://120.55.124.53:7070/warping/getZhengJing?workshopId=' + workshop,
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                companyId: that.companyId
              },

            })
            .then(response => {
              ////////console.log(response);

              for (let i = 0; i < response.data.data.length; i++) {
                // response.data.data[i].duantoulv= response.data.data[i].control_pressure//断头率
                response.data.data[i].duantou = response.data.data[i].numberBrokenEnds //断头数
                response.data.data[i].currentLength = (response.data.data[i].currentLength / 1000).toFixed(2)
                if (response.data.data[i].currentLength == 0) {
                  response.data.data[i].zwcd = 0
                } else {
                  response.data.data[i].zwcd = (response.data.data[i].currentLength / response.data.data[i]
                    .settingLength) * 100
                  response.data.data[i].zwcd = (response.data.data[i].zwcd.toFixed(1)) * 1
                }

                if ((response.data.data[i].settingSpeed <= 0) || (response.data.data[i].currentSpeed <= 0)) {
                  response.data.data[i].flag = false
                } else {
                  response.data.data[i].flag = true
                }

                if (response.data.data[i].zwcd == Infinity) {
                  response.data.data[i].zwcd = 0
                }
                that.zjList.push(response.data.data[i])

                ////////console.log(that.zjList)
              }
              that.zjList = this.sortByKey(that.zjList, 'machineId');

            })
            .then(() => {

            })
        }


      },
      getJiangsha(workshop) { //获取浆纱数据
        let that = this;
        if (workshop == 2) {
          that.jsList = [];
          axios({
              url: 'http://120.55.124.53:7070/warping/getJiangSha?workshopId=' + workshop,
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                companyId: that.companyId
              },

            })
            .then(response => {

              ////////console.log(response);
              for (let i = 0; i < response.data.data.length; i++) {

                response.data.data[i].zwcd = (((response.data.data[i]
                  .db175 / response.data.data[i].db1297) * 100).toFixed(1)) * 1
                if ((response.data.data[i]
                    .db175 / response.data.data[i].db1297) == Infinity) {
                  response.data.data[i].zwcd = 0
                }
                if (response.data.data[i].zwcd >= 100) {
                  response.data.data[i].zwcd = 100
                }
                response.data.data[i].db175 = parseFloat(response.data.data[i].db175).toFixed(1)
                ////////console.log(parseInt(response.data.data[i].db152))
                if (parseInt(response.data.data[i].db152) <= 0) {
                  response.data.data[i].flag = false
                } else {
                  response.data.data[i].flag = true
                }
                that.jsList.push(response.data.data[i])
              }
              ////////console.log(that.jsList)

            })
            .then(() => {
              axios({
                  url: 'http://120.55.124.53:7070/warping/getJiangSha?workshopId=' + that.workshopId,
                  method: 'get',
                  headers: {
                    'Content-Type': 'application/json',
                    companyId: that.companyId
                  },

                })
                .then(response => {

                  ////////console.log(response);
                  for (let i = 0; i < response.data.data.length; i++) {

                    response.data.data[i].zwcd = (((response.data.data[i]
                      .db175 / response.data.data[i].db1297) * 100).toFixed(1)) * 1
                    if ((response.data.data[i]
                        .db175 / response.data.data[i].db1297) == Infinity) {
                      response.data.data[i].zwcd = 0
                    }
                    if (response.data.data[i].zwcd >= 100) {
                      response.data.data[i].zwcd = 100
                    }
                    response.data.data[i].db175 = parseFloat(response.data.data[i].db175).toFixed(1)
                    ////////console.log(parseInt(response.data.data[i].db152))
                    if (parseInt(response.data.data[i].db152) <= 0) {
                      response.data.data[i].flag = false
                    } else {
                      response.data.data[i].flag = true
                    }
                    that.jsList.push(response.data.data[i])

                  }

                  ////////console.log(that.jsList)
                  that.jsList = this.sortByKey(that.jsList, 'machineId');
                })
                .then(() => {

                })
            })

        } else {
          that.jsList = [];
          axios({
              url: 'http://120.55.124.53:7070/warping/getJiangSha?workshopId=' + workshop,
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                companyId: that.companyId
              },

            })
            .then(response => {

              ////////console.log(response);
              for (let i = 0; i < response.data.data.length; i++) {

                response.data.data[i].zwcd = (((response.data.data[i]
                  .db175 / response.data.data[i].db1297) * 100).toFixed(1)) * 1
                if ((response.data.data[i]
                    .db175 / response.data.data[i].db1297) == Infinity) {
                  response.data.data[i].zwcd = 0
                }
                if (response.data.data[i].zwcd >= 100) {
                  response.data.data[i].zwcd = 100
                }
                response.data.data[i].db175 = parseFloat(response.data.data[i].db175).toFixed(1)
                ////////console.log(parseInt(response.data.data[i].db152))
                if (parseInt(response.data.data[i].db152) <= 0) {
                  response.data.data[i].flag = false
                } else {
                  response.data.data[i].flag = true
                }
                that.jsList.push(response.data.data[i])
              }
              ////////console.log(that.jsList)

            })
            .then(() => {})
        }


      },
      zhexian() {


        let myChart1 = this.$echarts.init(document.getElementById('zx_echart'));
        // 绘制图表
        myChart1.clear();
        let that = this;
        let option = null
        ////////console.log(that.workshopId)
        if (that.workshopId == 2) {

          option = {
            // title: {
            //   text: '织机效率推移图',
            //   textStyle: {
            //     color: "#FFFFFF",
            //     fontSize: "18",
            //     fontStyle: 'normal',
            //     fontWeight: 'normal'
            //   },
            //   x: 'center',
            //   y: 'top',
            //   top: "4%",


            // },
            color: ['#c23531', '#d48265'],
            tooltip: {
              trigger: 'axis',
              show: true
            },
            legend: {
              data: ['二分厂', '三分厂'],
              textStyle: {
                color: "white",
                fontSize: 15
              },
              right: "5%",
              top: "5%"
            },

            grid: {
              top: '10%',
              right: '5%',
              left: '8%',
              bottom: '10%',
            },

            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: that.zxt_data2,
              axisLine: { //这是x轴文字颜色
                lineStyle: {
                  color: "#fff",
                }
              },
            },
            yAxis: {
              type: 'value',
              show: true,

              min: that.minChartEfficiency,
              max: that.maxChartEfficiency,
              axisLine: { //这是x轴文字颜色
                lineStyle: {
                  color: "#fff",
                }
              },
            },
            series: [{
                name: '二分厂',
                type: 'line',
                smooth: true,
                data: that.zxt_data,

              },
              {
                name: '三分厂',
                type: 'line',
                smooth: true,
                data: that.zxt_data3,

              },
            ]
          };

        } else {
          option = {
            // title: {
            //   text: '织机效率推移图',
            //   textStyle: {
            //     color: "#FFFFFF",
            //     fontSize: "18",
            //     fontStyle: 'normal',
            //     fontWeight: 'normal'
            //   },
            //   x: 'center',
            //   y: 'top',
            //   top: "4%",


            // },
            color: ['#c23531', '#2f4554'],
            tooltip: {
              trigger: 'axis',
              show: true
            },

            grid: {
              top: '10%',
              right: '5%',
              left: '8%',
              bottom: '10%',
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
              data: that.zxt_data2
            },
            yAxis: {
              type: 'value',
              show: true,

              min: that.minChartEfficiency,
              max: that.maxChartEfficiency,
              axisLine: { //这是x轴文字颜色
                lineStyle: {
                  color: "#fff",
                }
              },

            },
            series: {
              name: '效率',
              type: 'line',

              data: that.zxt_data,
              smooth: true,

            },


          };
        }
        ////////console.log(option)
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
      tableRowStyle4({
        row,
        rowIndex
      }) {
        return 'font-size:1rem;text-align:center;border:0;';
      },
      //设置表头行的样式
      tableHeaderColor4({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        return 'color:#b0e9f3;font-size:0.4rem;font-weight: bolder;text-align:center;border-bottom:2px solid lightblue;margin:0;padding:0'
      },
      //设置单元格的样式
      tableCellStyle4({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        return 'color:#b0e9f3;text-align:center;font-weight:bolder;font-size:1rem;border:0;';
      },
      tableCellStyleyujing({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        if (rowIndex == 0) {
          return 'color:orange;text-align:center;font-weight:bolder;font-size:1rem;border:0;';
        } else
          return 'color:#b0e9f3;text-align:center;font-weight:bolder;font-size:1rem;border:0;';
      },

      //============表格样式配置================


      //============iframe宽高设置================
      getIframe1: function () {
        // this.src2='http://47.110.95.57/mulanTP2.3/index.php/home/index?CompanyId='+this.companyId+'&workshopId='+this.workshopId+'&language='+this.lang;
        // this.src2 = 'http://47.110.95.57/mulanTP2.3/index.php/home/index/index2/?CompanyId=' + this.companyId +
        //   '&workshopId=' + this.workshopId + '&language=' + this.lang;
        this.src2 = "http://47.110.95.57/mulanTP2.3/index.php/home/index/qxTv?CompanyId=" + this.companyId +
          "&workshopId=" + this.workshopId + "&paddingLeft=13" + "&language=" + this.lang
        /*////////console.log(height);
        ////////console.log(width);*/
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
        myChart1.setOption({
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
          series: [{
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
            data: [{
              value: speed
            }],
            radius: '75%',
            splitLine: { // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
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
          }]
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
        myChart1.setOption({
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
              fontSize: 16, //字体大小
              color: 'lightblue' //字体颜色
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
                fontSize: 14, //字体大小
                color: 'lightblue', //字体颜色
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
                fontSize: 10, //字体大小
                color: 'lightblue' //字体颜色
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
            // ////////console.log(productAnalysis);
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
            // url: 'http://localhost:7070/sign2/getYieldAnalysis',
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
            this.maxEfficiency = response.data.data['MAXEff']; //最高效率
            this.avgEfficiency = response.data.data['AVGEff']; //平均效率
            if (this.problemDefaultValue === '1') {
              let machineEfficiency = response.data.data.list; //效率数据
              this.machineEfficiency = machineEfficiency.map(x => {
                return {
                  machineNum: x.machineid,
                  openEfficiency: x.shiftEfficiencyF
                }
              });
            } else if (this.problemDefaultValue === '2') {
              let machineChanliangb = response.data.data.list; //产量数据
              this.machineChanliangb = machineChanliangb.map(x => {
                return {
                  machineNum: x.machineid,
                  chanliangb: x.chanliangb
                }
              });
              ////////console.log('当前问题' + this.problemDefaultValue);
            } else if (this.problemDefaultValue === '5') {
              let machineChanliangb = response.data.data.list; //产量数据
              this.machineChanliangb = machineChanliangb.map(x => {
                return {
                  machineNum: x.machineid,
                  chanliangb: x.chanliangb
                }
              });
              ////////console.log('当前问题' + this.problemDefaultValue);
            } else if (this.problemDefaultValue === '4') {
              let machineEfficiency = response.data.data.list; //效率数据
              this.machineEfficiency = machineEfficiency.map(x => {
                return {
                  machineNum: x.machineid,
                  openEfficiency: x.shiftEfficiencyF
                }
              });
            }

          })
      },
      getzjSum() {
        let url = ""
        if (this.workshopId == 2) {
          url = "http://120.55.124.53:7070/warping/getZhengJing?workshops=2,3"
        } else {
          url = "http://120.55.124.53:7070/warping/getZhengJing?workshops=1"
        }
        let that = this
        axios({
            url: url,
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data: {

            }
          })
          .then(response => {
            //////console.log(response)
            let sum = 0
            for (let i = 0; i < response.data.data.length; i++) {
              sum = sum + response.data.data[i].currentShiftOutput
            }
            that.sumzj = that.numbertoString(sum)
          })
      },
      numbertoString(num) {


        let digits = num.toString().split('');

        let realDigits = digits.map(Number)
        let arr = []
        for (let i = 0; i < realDigits.length; i++) {
          arr.push({
            num: realDigits[i]
          })
        }
        //////console.log(arr);
        return arr
      },
      getjsSum() {
        let url = "http://106.12.219.66:8227/report/getSimpleReport"

        let that = this
        axios({
            url: url,
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {
              tableName: "sizing_view",
              query: {
                workshop_id: that.workshopId
              }
            }
          })
          .then(response => {
            //////console.log(response)
            let sum = 0
            for (let i = 0; i < response.data.data.length; i++) {
              sum = sum + response.data.data[i].current_shift_output
            }
            that.sumjs = that.numbertoString(sum)
          })
      },
      getzzSum() {
        let url = ""
        if (this.workshopId == 2) {
          url = "http://120.55.124.53:7070/ab/getMultiWorkshopABAndYield?workshops='2','3'"
        } else {
          url = "http://120.55.124.53:7070/ab/getMultiWorkshopABAndYield?workshops='1'"
        }
        let that = this
        axios({
            url: url,
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data: {

            }
          })
          .then(response => {
            //////console.log(response)

            that.sumzz = that.numbertoString(response.data.data.totalYieldXs)
            that.sumyb = that.numbertoString(parseInt(parseInt(response.data.data.totalYieldXs) + 5000) + that
              .getRandomInt(50, 100))
              that.jsumyb=parseInt(parseInt(response.data.data.totalYieldXs) + 5000) + that
              .getRandomInt(50, 100)
          })

      },
      getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
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
            // this.workshopList = response.data.data.map(x => {
            //   return {label: x.name, value: x.id}
            // });
            let list = []
            for (let i = 0; i < response.data.data.length; i++) {
              if (response.data.data[i].id != 3) {
                list.push({
                  label: response.data.data[i].name,
                  value: response.data.data[i].id
                })
              }
            }
            this.workshopList = list
            this.workshopId = this.workshopList[0].value;
            ////console.log(this.$route.params.workshop_id)
            if (this.$route.params.workshop_id) {
              this.workshopId = this.$route.params.workshop_id

            }

          })
          .then(() => {
            this.getIframe1();

            // this.jsEchart()
            // this.zzEchart()
            this.getzjSum()
            this.getzzSum()
            this.getjsSum()
            this.getechart()
            this.getechart2()
            // this.ybEchart()
            // this.getDate2()
            //    this.getZhengjing(this.workshopId);
            // this.getJiangsha(this.workshopId);
            // this.getStartRatesYMD(this.workshopId);
            // this.getTypeInfo() 

          })
      },
      TimeDifference(time1, time2) {
        ////////console.log(time1)
        ////////console.log(time2)
        //定义两个变量time1,time2分别保存开始和结束时间

        //判断开始时间是否大于结束日期
        if (time1 > time2) {
          alert("开始时间不能大于结束时间！");
          return false;
        }
        //截取字符串，得到日期部分"2009-12-02",用split把字符串分隔成数组
        var begin1 = time1.substr(0, 10).split("-");
        var end1 = time2.substr(0, 10).split("-");
        //将拆分的数组重新组合，并实例成化新的日期对象
        var date1 = new Date(begin1[1] + - +begin1[2] + - +begin1[0]);
        var date2 = new Date(end1[1] + - +end1[2] + - +end1[0]);
        //得到两个日期之间的差值m，以分钟为单位
        //Math.abs(date2-date1)计算出以毫秒为单位的差值
        //Math.abs(date2-date1)/1000得到以秒为单位的差值
        //Math.abs(date2-date1)/1000/60得到以分钟为单位的差值
        var m = parseInt(Math.abs(date2 - date1) / 1000 / 60);
        //小时数和分钟数相加得到总的分钟数
        //time1.substr(11,2)截取字符串得到时间的小时数
        //parseInt(time1.substr(11,2))*60把小时数转化成为分钟
        var min1 = parseInt(time1.substr(11, 2)) * 60 + parseInt(time1.substr(14, 2));
        var min2 = parseInt(time2.substr(11, 2)) * 60 + parseInt(time2.substr(14, 2));
        //两个分钟数相减得到时间部分的差值，以分钟为单位
        var n = min2 - min1;
        //将日期和时间两个部分计算出来的差值相加，即得到两个时间相减后的分钟数
        var minutes = m + n;
        return minutes
      },
      formatDate(date) {

        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD + " " + hh + mm + ss;
      },
      //============后台数据获取================


      //============定时刷新数据================


      //定时刷新预警推送
      getWarningPushDataTiming: function () {
        const timer = setInterval(() => {
          // this.getZhengjing(this.workshopId);
          // this.getJiangsha(this.workshopId);
          // this.getStartRatesYMD(this.workshopId);
          this.getzjSum()
          this.getzzSum()
           this.getechart()
          this.getjsSum()
          this.getechart2()
          // this.getDate2()
          // this.getStartRatesYMD(this.workshopId);
        }, 15000);
        // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
        this.$once('hook:beforeDestroy', () => {
          clearInterval(timer);
        })
      },

      //============定时刷新数据================


      //============选择车间================
      choseFactory: function (workshopId) {
        this.workshopId = workshopId; //改变当前车间
        window.document.getElementById('dialog').click('dialogFormVisible = false'); //关闭对话框
        //切换设备状态图
        this.src2 = [];
        // this.src2 = 'http://47.110.95.57/mulanTP2.3/index.php/home/index/wzTV?CompanyId=' + this.companyId +
        //   '&workshopId=' + this.workshopId + '&language=' + this.lang;
        this.src2 = "http://47.110.95.57/mulanTP2.3/index.php/home/index/qxTv?CompanyId=" + this.companyId +
          "&workshopId=" + this.workshopId + "&paddingLeft=13" + "&language=" + this.lang
        // this.getZhengjing(this.workshopId);
        // this.getJiangsha(this.workshopId);
        // this.getYieldAnalysisNew()
        this.zxt_data = [];
        this.zxt_data2 = [];
        this.getzjSum()
        this.getzzSum()

        this.getechart()
        // this.getDate2()
        // this.getStartRatesYMD(this.workshopId);
        ////////console.log('当前车间id' + this.workshopId);
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
        let t = new Date(time); //row 表示一行数据, updateTime 表示要格式化的字段名称
        return (t.getMonth() + 1).toString().padStart(2, '0') + "-" + t.getDate().toString().padStart(2, '0');
        // return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()+"."+t.getMilliseconds();
      },
      getechart2(){
        let that=this
 /** 整经产量能源对比 */
        let xlist2 = []
        let ylist2 = []
        axios({
            url: 'http://120.55.124.53:7070/warpingHis/selectWeekYield', //整经统计图数据
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {
              workshops: that.workshopId
            }

          })
          .then(response => {
            ////////console.log(response)

            for (let i = response.data.data.length - 1; i >= 0; i--) {
              response.data.data[i].shiftDate = response.data.data[i].shiftDate.slice(5)
              ylist2.push((response.data.data[i].currentShiftOutput / 1000).toFixed(0))
              xlist2.push(response.data.data[i].shiftDate)
            }


          }).then(() => {
            let copyList2 = []
            let ylist3 = []
            axios({
                url: 'http://106.12.219.66:8227/report/getSimpleReport',
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                  'companyId': that.companyId
                },

                data: {

                  tableName: "looplist_info",


                  query: {
                    'workshop_id': that.workshopId,
                    'name': '整经车间'
                  },



                }

              })
              .then(response => {



                let date = new Date()
                let year = date.getFullYear()
                for (let i = 0; i < xlist2.length; i++) {
                  copyList2.push(year + "-" + xlist2[i])
                }


                for (let i = 0; i < response.data.data.length; i++) {

                  for (let j = 0; j < copyList2.length; j++) {
                    axios({
                        url: 'http://106.12.219.66:8227/report/getSimpleReport',
                        method: 'post',
                        headers: {
                          'Content-Type': 'application/json',
                          'companyId': that.companyId
                        },

                        data: {

                          tableName: "electric_history_d",


                          query: {
                            looplistId: response.data.data[i].id

                          },
                          selectLikeFields: {
                            startTime: copyList2[j]
                          }


                        }

                      })
                      .then(response => {

                        if (response.data.data.length == 0) { //说明那天日期的电为0
                          ylist3[j] = 0
                        } else {
                          ylist3[j] = parseInt(response.data.data[0].electric)
                        }
                        if(ylist3.length==xlist2.length){
                                let myChart3 = this.$echarts.init(document.getElementById('echart3'));
                  myChart3.clear();
                  let linelist = []
                  for (let i = 0; i < xlist2.length; i++) {
                    let k = ylist2[i] / ylist3[i]
                    if (isFinite(k) == false) {
                      k = 0
                    }
                    linelist.push(k.toFixed(2))
                  }
                  ////console.log(linelist)
                  // 绘制图表
                  myChart3.setOption({
                    color: ['#00CE1B', '#0099FF'],
                    tooltip: {
                      trigger: 'axis',
                      axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                      }
                    },
                    legend: {
                      data: ['产量', '电量', ],
                      textStyle: {
                        color: "#FFFFFF",
                        fontSize: 10
                      },
                      right: 60,
                      top: 5,
                      itemWidth: 18,
                      itemHeight: 10
                    },
                    grid: {
                      left: '0%',
                      right: '-3%',
                      top: "30%",
                      bottom: "10%",
                      containLabel: true
                    },
                    xAxis: [{
                      type: 'category',
                      data: xlist2,
                      nameTextStyle: {
                        color: "#FFFFFF",
                        fontSize: 10
                      },
                      axisLabel: {
                        show: true,
                        textStyle: {
                          color: "#FFFFFF",
                          fontSize: 10
                        }
                      },
                      axisTick: {
                        show: false
                      },
                    }],
                    yAxis: [{
                      type: 'value',
                      name: "产量/Km",
                      // min: 100,
                      // max: 350,
                      // interval: 50,

                      nameTextStyle: {
                        color: "rgba(238,219,219,1)",
                        fontSize: 10
                      },

                      splitLine: {
                        show: false,
                        lineStyle: {
                          type: 'solid',
                          color: "rgba(84,84,84,1)",
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
                        show: false
                      },
                      axisLabel: {
                        show: true,
                        textStyle: {
                          color: "#AAAAAA",
                          fontSize: 10
                        }
                      },
                    }, {
                      type: 'value',
                      name: "能源/Kwh",

                      // min: 100,
                      // max: 350,
                      // interval: 50,

                      nameTextStyle: {
                        color: "rgba(238,219,219,1)",
                        fontSize: 10
                      },

                      splitLine: {
                        show: false,
                        lineStyle: {
                          type: 'solid',
                          color: "rgba(84,84,84,1)",
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
                        show: false
                      },
                      axisLabel: {
                        show: true,
                        textStyle: {
                          color: "#AAAAAA",
                          fontSize: 10
                        }
                      },
                    }, {
                      type: 'value',
                      name: "利用率",
                      lineStyle: {
                        color: "red"
                      },
                      show: false,
                      // min: 100,
                      // max: 350,
                      // interval: 50,

                      nameTextStyle: {
                        color: "rgba(238,219,219,1)",
                        fontSize: 10
                      },

                      splitLine: {
                        show: false,
                        lineStyle: {
                          type: 'solid',
                          color: "rgba(84,84,84,1)",
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
                        show: false
                      },
                      axisLabel: {
                        show: true,
                        textStyle: {
                          color: "#AAAAAA",
                          fontSize: 10
                        }
                      },
                    }, ],
                    series: [{
                        name: '产量',
                        type: 'bar',
                        data: ylist2,
                        yAxisIndex: 0,
                        barWidth: "20%"
                      },
                      {
                        name: '电量',
                        type: 'bar',

                        data: ylist3,
                        yAxisIndex: 1,
                        barWidth: "20%"
                      },
                      {
                        name: '利用率',
                        type: 'line',
                        lineStyle: {
                          color: "red"
                        },
                        data: linelist,
                        yAxisIndex: 2,
                      },


                    ]
                  });
                  window.addEventListener('resize', function () {
                    myChart3.resize();
                  })

                        }
                      })
                  }

                }

              }).then(() => {


                setTimeout(() => {
                  //////console.log(copyList2)
                  //////console.log(ylist3)
            
                }, 1500);
              })



          })
        /** 整经产量能源对比 */

        /** 织机产量能源对比 */
        let zzclName = []
        let zzclList = []
        let maxzzclList;
        let minzzclList
        axios({
            url: 'http://120.55.124.53:7070/sign2/getYieldAnalysisNew', //织造
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {
              "workshopIds": null,
              "workshopArray": [that.workshopId]
            }

          })
          .then(response => {
            //////console.log(response)

            for (let i = 0; i < response.data.data[0].yieldAnalysisList2.length; i++) {
              let k = String(response.data.data[0].yieldAnalysisList2[i].months)
              response.data.data[0].yieldAnalysisList2[i].months = k.slice(5)
              if (response.data.data[0].yieldAnalysisList2[i].totalProductMeterXs < 1000) {
                response.data.data[0].yieldAnalysisList2[i].totalProductMeterXs = (response.data.data[0]
                  .yieldAnalysisList2[i].totalProductMeterXs / 1000).toFixed(2)
              } else {
                response.data.data[0].yieldAnalysisList2[i].totalProductMeterXs = (response.data.data[0]
                  .yieldAnalysisList2[i].totalProductMeterXs / 1000).toFixed(0)
              }
              zzclName.push(response.data.data[0].yieldAnalysisList2[i].months)
              zzclList.push(response.data.data[0].yieldAnalysisList2[i].totalProductMeterXs)
              //////console.log(zzclName)
              //////console.log(zzclList)
            }
            maxzzclList = Math.max(...zzclList) + 0.2
            minzzclList = Math.min(...zzclList) - 0.2






          })
          .then(() => {
            let copyList2 = []
            let ylist3 = []
            axios({
                url: 'http://106.12.219.66:8227/report/getSimpleReport',
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                  'companyId': that.companyId
                },

                data: {

                  tableName: "looplist_info",


                  query: {
                    'workshop_id': that.workshopId,
                    'name': '织造车间'
                  },



                }

              })
              .then(response => {



                let date = new Date()
                let year = date.getFullYear()
                for (let i = 0; i < zzclName.length; i++) {
                  copyList2.push(year + "-" + zzclName[i])
                }

// console.log(copyList2)
//   console.log(response.data.data)
                for (let i = 0; i < response.data.data.length; i++) {

                  for (let j = 0; j < copyList2.length; j++) {
                    axios({
                        url: 'http://106.12.219.66:8227/report/getSimpleReport',
                        method: 'post',
                        headers: {
                          'Content-Type': 'application/json',
                          'companyId': that.companyId
                        },

                        data: {

                          tableName: "electric_history_d",


                          query: {
                            looplistId: response.data.data[i].id

                          },
                          selectLikeFields: {
                            startTime: copyList2[j]
                          }


                        }

                      })
                      .then(response => {
                      

                        if (response.data.data.length == 0) { //说明那天日期的电为0
                          ylist3[j] = 0
                        } else {
                          ylist3[j] = parseInt(response.data.data[0].electric)
                        }
                        if(ylist3.length==zzclName.length){
                          
                        }
                      })
                  }

                }



              }).then(() => {


                setTimeout(() => {

                  let myChart5 = this.$echarts.init(document.getElementById('echart5'));
                  myChart5.clear();
                  let linelist = []
                  for (let i = 0; i < zzclName.length; i++) {
                    let k = zzclList[i] / ylist3[i]
                    if (isFinite(k) == false) {
                      k = 0
                    }
                    linelist.push(k.toFixed(2))
                  }
                  // 绘制图表
                  myChart5.setOption({
                    color: ['#00CE1B', '#0099FF'],
                    tooltip: {
                      trigger: 'axis',
                      axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                      }
                    },
                    legend: {
                      // data: ['产量', '电量', ],
                      data: ['产量',  ],
                      textStyle: {
                        color: "#FFFFFF",
                        fontSize: 10
                      },
                      right: 60,
                      top: 5,
                      itemWidth: 18,
                      itemHeight: 10
                    },
                    grid: {
                      left: '0%',
                      right: '10%',
                      top: "30%",
                      bottom: "10%",
                      containLabel: true
                    },
                    xAxis: [{
                      type: 'category',
                      data: zzclName,
                      nameTextStyle: {
                        color: "#FFFFFF",
                        fontSize: 10
                      },
                      axisLabel: {
                        show: true,
                        textStyle: {
                          color: "#FFFFFF",
                          fontSize: 10
                        }
                      },
                      axisTick: {
                        show: false
                      },
                    }],
                    yAxis: [{
                        type: 'value',
                        name: "产量/Km",
                        // min: 100,
                        // max: 350,
                        // interval: 50,

                        nameTextStyle: {
                          color: "rgba(238,219,219,1)",
                          fontSize: 10
                        },

                        splitLine: {
                          show: false,
                          lineStyle: {
                            type: 'solid',
                            color: "rgba(84,84,84,1)",
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
                          show: false
                        },
                        axisLabel: {
                          show: true,
                          textStyle: {
                            color: "#AAAAAA",
                            fontSize: 10
                          }
                        },
                      },
                      // {
                      //   type: 'value',
                      //   name: "能源/Kwh",


                      //   // min: 100,
                      //   // max: 350,
                      //   // interval: 50,

                      //   nameTextStyle: {
                      //     color: "rgba(238,219,219,1)",
                      //     fontSize: 10
                      //   },

                      //   splitLine: {
                      //     show: false,
                      //     lineStyle: {
                      //       type: 'solid',
                      //       color: "rgba(84,84,84,1)",
                      //     }
                      //   },
                      //   nameLocation: "end",
                      //   axisLine: {
                      //     lineStyle: {
                      //       color: "#707070",
                      //       width: 1
                      //     }
                      //   },
                      //   axisTick: {
                      //     show: false
                      //   },
                      //   axisLabel: {
                      //     show: true,
                      //     textStyle: {
                      //       color: "#AAAAAA",
                      //       fontSize: 10
                      //     }
                      //   },
                      // },
                      // {
                      //   type: 'value',
                      //   name: "利用率",

                      //   show: false,
                      //   // min: 100,
                      //   // max: 350,
                      //   // interval: 50,

                      //   nameTextStyle: {
                      //     color: "rgba(238,219,219,1)",
                      //     fontSize: 10
                      //   },

                      //   splitLine: {
                      //     show: false,
                      //     lineStyle: {
                      //       type: 'solid',
                      //       color: "rgba(84,84,84,1)",
                      //     }
                      //   },
                      //   nameLocation: "end",
                      //   axisLine: {
                      //     lineStyle: {
                      //       color: "#707070",
                      //       width: 1
                      //     }
                      //   },
                      //   axisTick: {
                      //     show: false
                      //   },
                      //   axisLabel: {
                      //     show: true,
                      //     textStyle: {
                      //       color: "#AAAAAA",
                      //       fontSize: 10
                      //     }
                      //   },
                      // },
                    ],
                    series: [{
                        name: '产量',
                        type: 'bar',
                        data: zzclList,
                        yAxisIndex: 0,
                        barWidth:"30%"
                      },
                      // {
                      //   name: '电量',
                      //   type: 'bar',
                      //   yAxisIndex: 1,
                      //   data: ylist3
                      // },
                      // {
                      //   name: '利用率',
                      //   type: 'line',
                      //   yAxisIndex: 2,
                      //   lineStyle: {
                      //     color: "red"
                      //   },
                      //   data: linelist
                      // },


                    ]
                  });
                  window.addEventListener('resize', function () {
                    myChart5.resize();
                  })
                }, 1500);
              })


          })
        /** 织机产量能源对比 */

        /** 浆纱产量能源对比 */

        let jsdatelist = that.getDateArr(6)
        let dateList = []
        for (let i = jsdatelist.length - 1; i >= 0; i--) {
          dateList.push(jsdatelist[i])
        }

        let copyList2 = []
        let ylist3 = []
        axios({
            url: 'http://106.12.219.66:8227/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },

            data: {

              tableName: "looplist_info",


              query: {
                'workshop_id': that.workshopId,
                'name': '浆纱车间'
              },



            }

          })
          .then(response => {



            let date = new Date()
            let year = date.getFullYear()
            for (let i = 0; i < dateList.length; i++) {
              copyList2.push(year + "-" + dateList[i])
            }


            for (let i = 0; i < response.data.data.length; i++) {

              for (let j = 0; j < copyList2.length; j++) {
                axios({
                    url: 'http://106.12.219.66:8227/report/getSimpleReport',
                    method: 'post',
                    headers: {
                      'Content-Type': 'application/json',
                      'companyId': that.companyId
                    },

                    data: {

                      tableName: "electric_history_d",


                      query: {
                        looplistId: response.data.data[i].id

                      },
                      selectLikeFields: {
                        startTime: copyList2[j]
                      }


                    }

                  })
                  .then(response => {

                    if (response.data.data.length == 0) { //说明那天日期的电为0
                      ylist3[j] = 0
                    } else {
                      ylist3[j] = parseInt(response.data.data[0].electric)
                    }
                    if(dateList.length==ylist3.length){
       let myChart4 = this.$echarts.init(document.getElementById('echart4'));
              myChart4.clear();
              // 绘制图表
              let linelist = []
              let cl = [12000, 12100, 16000, 17000, 17000, 18000]
              for (let i = 0; i < dateList.length; i++) {
                let k = cl[i] / ylist3[i]
                if (isFinite(k) == false) {
                  k = 0
                }
                linelist.push(k.toFixed(2))
              }

              myChart4.setOption({
                color: ['#00CE1B', '#0099FF'],
                tooltip: {
                  trigger: 'axis',
                  axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                legend: {
                  data: ['产量', '电量', ],
                  textStyle: {
                    color: "#FFFFFF",
                    fontSize: 10
                  },
                  right: 30,
                  top: 5,
                  itemWidth: 18,
                  itemHeight: 10
                },
                grid: {
                  left: '0%',
                  right: '-13%',
                  top: "30%",
                  bottom: "10%",
                  containLabel: true
                },
                xAxis: [{
                  type: 'category',
                  data: dateList,
                  nameTextStyle: {
                    color: "#FFFFFF",
                    fontSize: 10
                  },
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: "#FFFFFF",
                      fontSize: 10
                    }
                  },
                  axisTick: {
                    show: false
                  },
                }],
                yAxis: [{
                    type: 'value',
                    name: "产量/Km",
                    // min: 100,
                    // max: 350,
                    // interval: 50,

                    nameTextStyle: {
                      color: "rgba(238,219,219,1)",
                      fontSize: 10
                    },

                    splitLine: {
                      show: false,
                      lineStyle: {
                        type: 'solid',
                        color: "rgba(84,84,84,1)",
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
                      show: false
                    },
                    axisLabel: {
                      show: true,
                      textStyle: {
                        color: "#AAAAAA",
                        fontSize: 10
                      }
                    },
                  },
                  {
                    type: 'value',
                    name: "能源/Kwh",


                    // min: 100,
                    // max: 350,
                    // interval: 50,

                    nameTextStyle: {
                      color: "rgba(238,219,219,1)",
                      fontSize: 10
                    },

                    splitLine: {
                      show: false,
                      lineStyle: {
                        type: 'solid',
                        color: "rgba(84,84,84,1)",
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
                      show: false
                    },
                    axisLabel: {
                      show: true,
                      textStyle: {
                        color: "#AAAAAA",
                        fontSize: 10
                      }
                    },
                  },
                  {
                    type: 'value',
                    name: "利用率",

                    show: false,
                    // min: 100,
                    // max: 350,
                    // interval: 50,

                    nameTextStyle: {
                      color: "rgba(238,219,219,1)",
                      fontSize: 10
                    },

                    splitLine: {
                      show: false,
                      lineStyle: {
                        type: 'solid',
                        color: "rgba(84,84,84,1)",
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
                      show: false
                    },
                    axisLabel: {
                      show: true,
                      textStyle: {
                        color: "#AAAAAA",
                        fontSize: 10
                      }
                    },
                  },
                ],
                series: [{
                    name: '产量',
                    type: 'bar',
                    data: cl,
                    yAxisIndex: 0,
                    barWidth:"25%"
                  },
                  {
                    name: '电量',
                    type: 'bar',
                    yAxisIndex: 1,
                    data: ylist3,
                         barWidth:"25%"
                  },

                  {
                    name: '利用率',
                    type: 'line',
                    yAxisIndex: 2,
                    lineStyle: {
                      color: "red"
                    },
                    data: ylist3
                  },

                ]
              });
              window.addEventListener('resize', function () {
                myChart4.resize();
              })
                    }
                  })
              }

            }

          }).then(() => {


           
          })

        /** 浆纱产量能源对比 */

        /** 验布产量能源对比 */


        let copyList3 = []
        let ylist4 = []
        axios({
            url: 'http://106.12.219.66:8227/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },

            data: {

              tableName: "looplist_info",


              query: {
                'workshop_id': that.workshopId,
                
              },
            selectLikeFields:{
              name:"成品"
            }



            }

          })
          .then(response => {

            ////console.log(response)

            let date = new Date()
            let year = date.getFullYear()
            for (let i = 0; i < dateList.length; i++) {
              copyList3.push(year + "-" + dateList[i])
            }


            for (let i = 0; i < response.data.data.length; i++) {

              for (let j = 0; j < copyList3.length; j++) {
                axios({
                    url: 'http://106.12.219.66:8227/report/getSimpleReport',
                    method: 'post',
                    headers: {
                      'Content-Type': 'application/json',
                      'companyId': that.companyId
                    },

                    data: {

                      tableName: "electric_history_d",


                      query: {
                        looplistId: response.data.data[i].id

                      },
                      selectLikeFields: {
                        startTime: copyList2[j]
                      }


                    }

                  })
                  .then(res => {
                    //console.log(copyList2[j])
                       //console.log(res)
                   
                    if (res.data.data.length == 0) { //说明那天日期的电为0
                      ylist4[j] = 0
                    } else {
                      for(let i=0;i<res.data.data.length;i++){
                        if(res.data.data[i].startTime.indexOf(copyList2[j])!= -1){
                          ylist4[j] = parseInt(res.data.data[i].electric)
                        }
                      }
                    }
                    if(ylist4.length==dateList.length){
 let myChart6 = this.$echarts.init(document.getElementById('echart6'));
              myChart6.clear();
              let linelist = []
              let cl = [17400, 17100, 16900, 16800, 17000, 17500]
              for (let i = 0; i < dateList.length; i++) {
                let k = cl[i] / ylist4[i]
                if (isFinite(k) == false) {
                  k = 0
                }
                linelist.push(k.toFixed(2))
              }
              // 绘制图表
              myChart6.setOption({
                color: ['#00CE1B', '#0099FF'],
                tooltip: {
                  trigger: 'axis',
                  axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                legend: {
                  data: ['产量', '电量', ],
                  textStyle: {
                    color: "#FFFFFF",
                    fontSize: 10
                  },
                  right: 30,
                  top: 5,
                  itemWidth: 18,
                  itemHeight: 10
                },
                grid: {
                  left: '0%',
                  right: '-8%',
                  top: "30%",
                  bottom: "10%",
                  containLabel: true
                },
                xAxis: [{
                  type: 'category',
                  data: dateList,
                  nameTextStyle: {
                    color: "#FFFFFF",
                    fontSize: 10
                  },
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: "#FFFFFF",
                      fontSize: 10
                    }
                  },
                  axisTick: {
                    show: false
                  },
                }],
                yAxis: [{
                    type: 'value',
                    name: "产量/Km",
                    // min: 100,
                    // max: 350,
                    // interval: 50,

                    nameTextStyle: {
                      color: "rgba(238,219,219,1)",
                      fontSize: 10
                    },

                    splitLine: {
                      show: false,
                      lineStyle: {
                        type: 'solid',
                        color: "rgba(84,84,84,1)",
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
                      show: false
                    },
                    axisLabel: {
                      show: true,
                      textStyle: {
                        color: "#AAAAAA",
                        fontSize: 10
                      }
                    },
                  },
                  {
                    type: 'value',
                    name: "能源/Kwh",


                    // min: 100,
                    // max: 350,
                    // interval: 50,

                    nameTextStyle: {
                      color: "rgba(238,219,219,1)",
                      fontSize: 10
                    },

                    splitLine: {
                      show: false,
                      lineStyle: {
                        type: 'solid',
                        color: "rgba(84,84,84,1)",
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
                      show: false
                    },
                    axisLabel: {
                      show: true,
                      textStyle: {
                        color: "#AAAAAA",
                        fontSize: 10
                      }
                    },
                  },
                  {
                    type: 'value',
                    name: "利用率",

                    show: false,
                    // min: 100,
                    // max: 350,
                    // interval: 50,

                    nameTextStyle: {
                      color: "rgba(238,219,219,1)",
                      fontSize: 10
                    },

                    splitLine: {
                      show: false,
                      lineStyle: {
                        type: 'solid',
                        color: "rgba(84,84,84,1)",
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
                      show: false
                    },
                    axisLabel: {
                      show: true,
                      textStyle: {
                        color: "#AAAAAA",
                        fontSize: 10
                      }
                    },
                  },
                ],
                series: [{
                    name: '产量',
                    type: 'bar',
                    data: cl,
                    yAxisIndex: 0,
                      barWidth:"25%"
                  },
                  {
                    name: '电量',
                    type: 'bar',
                    yAxisIndex: 1,
                    data: ylist4,
                      barWidth:"25%"
                  },
                  {
                    name: '利用率',
                    type: 'line',
                    yAxisIndex: 2,
                    lineStyle: {
                      color: "red"
                    },
                    data: linelist
                  },


                ]
              });
              window.addEventListener('resize', function () {
                myChart6.resize();
              })
                    }
                  })
              }

            }

          }).then(() => {


        
          })

        /** 验布产量能源对比 */
      },
      getechart() {

        let that = this
        /** 设备实时开机率 */
        let sskjl; //实时开机率
        let w=that.workshopId
        if(w==2){
          w=3
        }
        axios({
            url: 'http://120.55.124.53:7070/app/getStartRate',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',

            },

            data: {
              'companyId': that.companyId,
              "workshopId":w
              // tableName: "lm_shift_his",
              // sort: "DESC",
              //  selectFields:['ShiftWork',],
              // query: {
              //   "mac_ip": res.data.data[i].machine_ip
              // }

            }

          })
          .then(response => {

            // for (let i = 0; i < response.data.data.data.length; i++) {
            //   if (response.data.data.data[i].workshopId == that.workshopId) {

            //     sskjl = (response.data.data.data[i].realTimeStartRate.toFixed(3)) * 100
            //   }
            // }
            //console.log(response)
            sskjl = response.data.data.startRate

          }).then(() => {

            let myChart2 = this.$echarts.init(document.getElementById('echart2'));
            myChart2.clear();
            // 绘制图表
            myChart2.setOption({
              tooltip: {
                formatter: '{a} <br/>{b} : {c}km/h'
              },
              title: {
                text: '',
                left: '32%',
                top: '40%',
                textStyle: {
                  color: '#fff',
                  fontSize: 8
                },
              },
animation:false,
              series: [{
                name: '速度',
                type: 'gauge',
                min: 0,
                max: 100,

                center: ['55%', '50%'],
                splitNumber: 5, //设置间隔区域的显示数量
                detail: {
                  formatter: '{value} %',
                  top: '50%',
                  fontSize: 12,
                  color: '#fff',
                  offsetCenter: [0, '80%']
                },
                data: [{
                  value: sskjl.toFixed(1),

                }],
                detail: {

                  formatter: '{value}%',
                  textStyle: {
                    fontSize: 14
                  },
   offsetCenter: [0, '80%']

                },
                radius: '80%',
                splitLine: { // 分隔线
                  length: 15, // 属性length控制线长
                  lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                    color: '#45c9e2'
                  }
                },
                axisTick: {
                  show: true
                },

                axisLine: { // 坐标轴线
                  lineStyle: { // 属性lineStyle控制线条样式
                    width: 10,
                    color: [
                      [0.2, "#ef4200"],
                      [0.8, "#45c9e2"],
                      [1, "#00d505"]
                    ],
                  },

                },
                axisLabel: {
                  show: true,
                  fontSize: 10,
                  color: '#fff'
                },
                pointer: {
                  width: 5,
                  shadowColor: '#fff', //默认透明
                  shadowBlur: 5
                },
              }]
            });
            window.addEventListener('resize', function () {
              myChart2.resize();
            })

          })
        /** 设备实时开机率 */

        /** 织机班次产量对比 */
        let zjxlist = [] //织机x轴数据列表
        let zjalist = [] //织机a班产量
        let zjblist = [] //织机b班产量
        axios({
            url: 'http://106.12.219.66:8227/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },

            data: {

              tableName: "lm_shift_his",
              sort: "DESC",
              sortColumn: "ShiftDate",
              selectFields: ['ShiftWork', 'sum(product_meter)', 'ShiftDate'],
              groupByColumn: ['ShiftDate'],
              query: {
                'ShiftWork': 0, //A班产量

              },
              pageNum: 1,
              pageSize: 6
              // query: {
              //   "mac_ip": res.data.data[i].machine_ip
              // }

            }

          })
          .then(response => {

            for (let i = 0; i < response.data.data.length; i++) {
               response.data.data[i].ShiftDate = (that.addDate(response.data.data[i].ShiftDate)).substr(5, 5)
              response.data.data[i]['sum(product_meter)'] = parseInt(response.data.data[i]['sum(product_meter)'] / 10)
              zjalist.push(response.data.data[i]['sum(product_meter)'])
              zjxlist.push(response.data.data[i].ShiftDate)
            }

          }).then(() => {
            axios({
                url: 'http://106.12.219.66:8227/report/getSimpleReport',
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                  'companyId': that.companyId
                },

                data: {

                  tableName: "lm_shift_his",
                  sort: "DESC",
                  sortColumn: "ShiftDate",
                  selectFields: ['ShiftWork', 'sum(product_meter)', 'ShiftDate'],
                  groupByColumn: ['ShiftDate'],
                  query: {
                    'ShiftWork': 1, //B班产量

                  },
                  pageNum: 1,
                  pageSize: 6
                  // query: {
                  //   "mac_ip": res.data.data[i].machine_ip
                  // }

                }

              })
              .then(response => {

                for (let i = 0; i < response.data.data.length; i++) {
                  response.data.data[i].ShiftDate = (that.addDate(response.data.data[i].ShiftDate)).substr(5, 5)
                  response.data.data[i]['sum(product_meter)'] = parseInt(response.data.data[i][
                    'sum(product_meter)'] / 10)
                  zjblist.push(response.data.data[i]['sum(product_meter)'])
                }

              }).then(() => {
                let xx = []
                let aa = []
                let bb = []

                for (let i = zjxlist.length - 1; i >= 0; i--) {
                  xx.push(zjxlist[i])
                }
                for (let i = zjalist.length - 1; i >= 0; i--) {
                  aa.push(zjalist[i])
                }
                for (let i = zjblist.length - 1; i >= 0; i--) {
                  bb.push(zjblist[i])
                }

                let myChart1 = this.$echarts.init(document.getElementById('echart1'));
                myChart1.clear();
                // 绘制图表
                myChart1.setOption({
                  color: ['#FF6F00', '#FFEE00'],
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                  },
                  legend: {
                    data: ['A班', 'B班', ],
                    textStyle: {
                      color: "#FFFFFF",
                      fontSize: 10
                    },
                    right: 10,
                    top: 5
                  },
                  animation:false,
                  grid: {
                    left: '8%',
                    right: '4%',
                    top: "25%",
                    bottom: "5%",
                    containLabel: true
                  },
                  xAxis: [{
                    type: 'category',
                    data: xx,
                    nameTextStyle: {
                      color: "#FFFFFF",
                      fontSize: 10
                    },
                    axisLabel: {
                      show: true,
                      textStyle: {
                        color: "#FFFFFF",
                        fontSize: 10
                      }
                    },
                    axisTick: {
                      show: false
                    },
                  }],
                  yAxis: [{
                    type: 'value',
                    name: '产量/米',
                    // min: 100,
                    // max: 350,
                    // interval: 50,

                    nameTextStyle: {
                      color: "rgba(238,219,219,1)",
                      fontSize: 10
                    },

                    splitLine: {
                      show: false,
                      lineStyle: {
                        type: 'solid',
                        color: "rgba(84,84,84,1)",
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
                      show: false
                    },
                    axisLabel: {
                      show: true,
                      textStyle: {
                        color: "#AAAAAA",
                        fontSize: 10
                      }
                    },
                  }, ],
                  series: [{
                      name: 'A班',
                      type: 'bar',
                      data: aa,
                      barWidth: "25%"
                    },
                    {
                      name: 'B班',
                      type: 'bar',
                      barWidth: "25%",
                      data: bb
                    },



                  ]
                });
                window.addEventListener('resize', function () {
                  myChart1.resize();
                })
              })
          })



        /** 织机班次产量对比 */
       

      },
      getDateArr(days) {

        var today = new Date(); //今天
        today.setTime(today.getTime() - 24 * 60 * 60 * 1000);
        var daysData = []; //定义一个空数组存放数据

        for (var i = 0; i < days; i++) {

          var day = i * 24 * 60 * 60 * 1000; //每天的时间戳差值

          var todayTimeStamp = today.getTime(); //今天的时间戳

          var finalDay = new Date(todayTimeStamp - day); //最后一天的时间戳 ，几天前是减 ，几天后就改成加

          var Y = finalDay.getFullYear(); //年

          var M = finalDay.getMonth() + 1; //月

          var D = finalDay.getDate(); //日

          //将月和日格式标准化组合成需要的格式

          if (M.toString().length == 1) {

            M = "0" + M;

          }

          if (D.toString().length == 1) {

            D = "0" + D;

          }

          var timeData = M + "-" + D;

          daysData.push(timeData); //添加进数组

        }

        return (daysData); //输出数据，也可改为 return daysData; 直接返回数据

      },
      addDate(time) {
        //加一天
        Date.prototype.format = function (format) {
          var date = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S+": this.getMilliseconds()
          };
          if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
          }
          for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
              format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
                date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
          }
          return format;
        }
        var timestamp = Date.parse(new Date(time));
        timestamp = timestamp / 1000;
        timestamp += 86400; //加一天
        var newTime = new Date(timestamp * 1000).format('yyyy-MM-dd hh:mm:ss');
        return newTime;
      }

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
  .zj_board {
    width: 44%;
    height: 70%;
    background: rgb(12, 45, 81);
    position: absolute;
    left: 1%;
    top: 5%;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;


  }

  .js_board {
    width: 44%;
    height: 70%;
    background: rgb(12, 45, 81);
    position: absolute;
    left: 1%;
    top: 40%;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .cz_board {
    width: 44%;
    height: 70%;
    background: rgb(12, 45, 81);
    position: absolute;
    left: 24%;
    top: 40%;
    z-index: 1001;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .zb_board {
    width: 44%;
    height: 70%;
    background: rgb(12, 45, 81);
    position: absolute;
    right: 1%;
    top: 5%;
    z-index: 1001;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .zj_board_con {
    width: 95%;
    height: 88%;
    background: black;

    z-index: 1000;
    display: flex;
    flex-direction: column;

  }

  .zj_board_con_title {
    width: 100%;
    height: 15%;
    color: rgb(65, 252, 0);

    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .zj_board_con_time {
    width: 100%;
    height: 5%;
    color: rgb(65, 252, 0);

    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;

  }

  .zj_board_con_time span {
    margin: 5%;

  }

  .zj_board_con_table {
    width: 100%;
    height: 76%;
    margin-top: 1%;
    color: rgb(65, 252, 0);

    font-size: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .zj_board_con_table_con {
    width: 93%;
    height: 100%;
    overflow: auto;
    border-left: 1px solid rgb(65, 252, 0);
    border-top: 1px solid rgb(65, 252, 0);
    font-size: 1.3rem;


  }

  .zb_top {
    width: 100%;
    height: 80%;
    display: flex;
  }

  .zb_top_left {
    width: 25%;
    height: 100%;

  }

  .zb_top_left_top {
    width: 100%;
    height: 65%;
    border-right: 1px solid rgb(65, 252, 0);
    border-bottom: 1px solid rgb(65, 252, 0);
  }

  .zb_title {
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    color: rgb(65, 252, 0);
  }

  .zb_content {
    width: 100%;
    height: 66%;
    overflow: auto;
    color: red;
    margin-top: 5%;
  }

  .zb_content_one {
    width: 100%;
    height: 10%;
    margin-bottom: 5%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.8rem;
    color: red;
  }

  .zb_content_one span {
    width: 30%;
  }

  .zb_top_left_bottom {
    width: 100%;
    height: 35%;
    border-right: 1px solid rgb(65, 252, 0);
    border-bottom: 1px solid rgb(65, 252, 0);

  }

  .zb_top_middle {
    width: 45%;
    height: 100%;

  }

  .zb_top_middle_top {
    width: 100%;
    height: 35%;
    border-right: 1px solid rgb(65, 252, 0);
    border-bottom: 1px solid rgb(65, 252, 0);
  }

  .zb_top_middle_top_con {
    width: 46%;
    height: 30%;
    margin-left: 1%;
    float: left;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 1.4rem;
  }

  .zb_top_middle_middle {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    border-right: 1px solid rgb(65, 252, 0);
    border-bottom: 1px solid rgb(65, 252, 0);
  }

  .zb_top_middle_bottom {
    width: 100%;
    height: 55%;
    border-right: 1px solid rgb(65, 252, 0);
    border-bottom: 1px solid rgb(65, 252, 0);
    overflow: auto;
  }

  .zb_top_middle_bottom_con {
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    font-size: 1rem;
  }

  .zb_top_right {
    width: 30%;
    height: 100%;

  }

  .zb_top_right_con {
    width: 49%;
    height: 50%;
    border-right: 1px solid rgb(65, 252, 0);
    border-bottom: 1px solid rgb(65, 252, 0);
    float: left;
  }

  .zb_bottom {
    width: 100%;
    height: 20%;
    border-right: 1px solid rgb(65, 252, 0);
    border-bottom: 1px solid rgb(65, 252, 0);
    display: flex;
  }

  .zb_bottom_left {
    width: 10%;
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 1%;


  }

  .zb_bottom_left span {
    width: 2rem;
    font-size: 1rem;



  }

  .zb_bottom_right {
    width: 90%;
    height: 100%;


  }

  .zb_bottom_right_con {
    width: 50%;
    height: 50%;
    float: left;
    font-size: 1rem;
    display: flex;
    align-items: center;

  }

  .table_con {
    width: 49.77%;
    float: left;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    border-right: 1px solid rgb(65, 252, 0);
    border-bottom: 1px solid rgb(65, 252, 0);
  }

  .table_con1 {
    width: 19.86%;
    float: left;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    border-right: 1px solid rgb(65, 252, 0);
    border-bottom: 1px solid rgb(65, 252, 0);
  }

  .table_con1_con {
    width: 19.86%;
    float: left;
    height: 12%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    border-right: 1px solid rgb(65, 252, 0);
    border-bottom: 1px solid rgb(65, 252, 0);
  }

  .small_table_con {
    width: 12.365%;
    float: left;
    height: 17%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    border-right: 1px solid rgb(65, 252, 0);
    border-bottom: 1px solid rgb(65, 252, 0);
  }

  .table_data {
    width: 100%;
    height: 13%;
    display: flex;
  }

  .table_data_con {
    width: 12.365%;
    display: flex;
    justify-content: center;
    font-size: 1.1rem;
    border-right: 1px solid rgb(65, 252, 0);
    border-bottom: 1px solid rgb(65, 252, 0);
    align-items: center;
    height: 100%;
    word-break: break-all;
  }

  .table_data_con1 {
    width: 14.15%;
    display: flex;
    justify-content: center;
    font-size: 1.1rem;
    border-right: 1px solid rgb(65, 252, 0);
    border-bottom: 1px solid rgb(65, 252, 0);
    align-items: center;
    height: 100%;
  }

  .all-card {
    width: 100%;
    overflow: auto;
    height: 368px;
  }

  .e-chart-card {
    width: 90%;
    /* position: absolute;
    left: 1.2%;
    bottom: 5.8%;
    border-radius: 8px; */
    margin-top: 10px;
    height: 260px;
    background: rgb(36, 42, 55);
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

    font-size: 20px;
    width: 100%;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
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
    top: 68%;
    left: 18%;
  }

  .one-card2 {
    width: 45%;
    margin: 1.5%;
    height: 44%;
    float: left;
    font-size: 1rem;
    background-image: url("../static/img/js_green.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
  }

  .one-card22 {
    width: 45%;
    margin: 1.5%;
    height: 44%;
    float: left;
    font-size: 1rem;
    background-image: url("../static/img/js_orange.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
  }

  .one-card2-name {
    position: absolute;
    width: 48%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 5%;
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
    overflow-y: hidden;
    overflow-x: hidden;
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
    height: 66rem;
    position: relative;
  }

  .deviceStateCharts {
    width: 98%;
    height: 100%;
  }








  .monitor {
    /* background-image: url("../static/img/bk4.png"); */
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 66.8rem;
    padding-top: 1rem;
    margin: 0;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }

  .monitor_title {
    width: 100%;
    /* margin-right: 16px; */
    height: 1.5rem;
    margin-top: 7%;
    background: #0B3354;
    display: flex;
    align-items: center;
    font-size: 1rem;
    justify-content: flex-start;
  }

  .monitor_title span {
    margin-left: 1rem;
  }

  .monitor_title2 {
    width: 60%;
    margin-right: 5%;
    height: 1.5rem;
    margin-top: 7%;
    background: #0B3354;
    display: flex;
    align-items: center;
    font-size: 1rem;
    justify-content: flex-start;
  }

  .monitor_title2 span {
    margin-left: 1rem;
  }

  .monitor_title3 {
    width: 35%;

    height: 1.5rem;
    margin-top: 7%;
    background: #0B3354;
    display: flex;
    align-items: center;
    font-size: 1rem;
    justify-content: flex-start;
  }

  .monitor_title3 span {
    margin-left: 1rem;
  }

  .monitor_title4 {
    width: 49%;

    height: 1.5rem;
    margin-top: 7%;
    background: #0B3354;
    display: flex;
    align-items: center;
    font-size: 1rem;
    justify-content: flex-start;
  }

  .monitor_title4 span {
    margin-left: 1rem;
  }

  .monitor_con {
    width: 100%;
    height: 14%;
    margin-right: 16px;
  }

  .yj_echart {
    width: 95%;
    height: 9%;
  }

  .yj_echart_head {
    width: 100%;
    height: 25%;
    font-size: 1rem;
    display: flex;
    margin-top: 0.5rem;
  }

  .yj_echart_head_con {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .echart1 {
    width: 60%;
    height: 100%;

  }

  .echart2 {
    width: 40%;
    height: 100%;

  }

  .imgs {
    background-image: url("/static/img/signal.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;

  }

  .num {
    font-family: 'let';
  }

  .fangkuai {

    width: 45%;
    height: 45%;
    float: left;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

  }

  .fangkuai2 {

    width: 45%;
    height: 45%;
    margin-left: 10%;
    float: left;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

  }

  .image-border {
    position: absolute;
    width: 12px;
    height: 12px;
  }

  .image-border1 {
    top: 0;
    left: 0;
    border-left: 2px solid #00F3FC;
    border-top: 2px solid #00F3FC;
  }

  .image-border2 {
    top: 0;
    right: -2px;
    border-right: 2px solid #00F3FC;
    border-top: 2px solid #00F3FC;
  }

  .image-border3 {
    bottom: 0;
    left: 0;
    border-bottom: 2px solid #00F3FC;
    border-left: 2px solid #00F3FC;
  }

  .image-border4 {
    bottom: 0;
    right: -2px;
    border-right: 2px solid #00F3FC;
    border-bottom: 2px solid #00F3FC;
  }

  .data_con {
    width: 45%;
    margin-left: 4%;
    margin-top: 2%;
    height: 23%;
    background: rgb(36, 42, 55);
    float: left;
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    border-radius: 8px;
  }

  .data_con_title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 22%;

  }

  .data_con_title_left {
    width: 50%;
    display: flex;

    height: 100%;
    align-items: center;

  }

  .data_con_title_left span {
    margin-left: 10%;

  }

  .data_con_title_right {
    width: 50%;
    display: flex;
    justify-content: flex-end;
    height: 100%;
    align-items: center;

  }

  .data_con_title_right i {
    margin-left: 10%;
    font-size: 1.5rem;
    margin-right: 10%;
  }

  .data_con_line {
    width: 100%;
    height: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .line_con {
    width: 95%;
    height: 1.5px;
    background: rgb(63, 68, 81);
  }

  .e_chart {
    width: 100%;
    height: 72%;
    margin-top: 1%;

  }

  .cons {
    width: 100%;
    height: 72%;
    margin-top: 1%;
    overflow: auto;
  }


  .cons_con_con {
    width: 50%;
    height: 20%;
    float: left;
    display: flex;
  }

  .cons_con_con span {
    width: 25%;
    height: 100%;
    font-size: 0.8rem;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    text-align: left;



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
