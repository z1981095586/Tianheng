<template>
    <div style="text-align: center;background:url('../../../static/picture/background.png') no-repeat center center;background-size:100% 100%;">
      <el-dialog
        :visible.sync="showNoticeTable"
        width="1200px"
        append-to-body
        :before-close="saveNotice"
      >
        <div slot="title" style="font-size: 1.5vw;font-weight: bolder">请输入公告内容，最多输入70个字</div>
        <el-input  type="textarea"
                   :autosize="{ minRows: 2, maxRows: 2}"
                   maxlength="70"
                   v-model="notice"
                   placeholder="请输入内容"
                   style="font-size: 1.5vw"
        >
        </el-input>
      </el-dialog>
      <div style="height: 80px;width: 100%;">
        <p style="position: absolute;color: white;font-size: 2vw;" :style="{left:titleLeft}">{{urlName}}</p>
        <!--<p style="position: absolute;color: white;font-size: 2vw;" :style="{left:titleLeft}">鑫 浪 纺 织 车 间 查 询 平 台</p>-->
        <!--<p style="position: absolute;color: white;font-size: 2vw;" :style="{left:titleLeft}">赐 源 纺 织 车 间 查 询 平 台</p>-->
      </div>
      <div :style="{height: scrollerHeight,width:scrollerWidth}" style="margin-top: 10px;text-align: center;display: inline-block;vertical-align:top">
        <div :style="{height: '98%',width:scrollerWidthLeft}" style="display: inline-block;padding: 20px">
          <table cellspacing="20px" width="100%" id="leftTable">
            <tr>
              <td style=" background:url('../../../static/picture/platform/border.png') no-repeat center center;background-size:100% 100%;">
                <div :style="{height: scrollerHeightDiv,width:scrollerWidthLeftDiv}" style=";background-color: transparent">
                  <table style="text-align: center;width: 100%;height: 100%" >
                    <tr>
                      <td colspan="2">
                        <p  class="tableTitle" style="margin-top: -9.3%;">优秀班组</p>
                      </td>
                    </tr>
                    <tr>
                      <td class="tableBody">
                        <span v-if="staffEfficiencyList.length>0">{{staffEfficiencyList[0].staffName}}:{{Math.ceil(staffEfficiencyList[0].productMeter/100)/10}}千米</span>
                      </td>
                      <td class="tableBody">
                        <span v-if="staffEfficiencyList.length>1">{{staffEfficiencyList[1].staffName}}:{{Math.ceil(staffEfficiencyList[1].productMeter/100)/10}}千米</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="tableBody">
                        <span v-if="staffEfficiencyList.length>2">{{staffEfficiencyList[2].staffName}}:{{Math.ceil(staffEfficiencyList[2].productMeter/100)/10}}千米</span>
                      </td>
                      <td class="tableBody">
                        <span v-if="staffEfficiencyList.length>3">{{staffEfficiencyList[3].staffName}}:{{Math.ceil(staffEfficiencyList[3].productMeter/100)/10}}千米</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="tableBody">
                        <span v-if="staffEfficiencyList.length>4">{{staffEfficiencyList[4].staffName}}:{{Math.ceil(staffEfficiencyList[4].productMeter/100)/10}}千米</span>
                      </td>
                      <td class="tableBody">
                        <span v-if="staffEfficiencyList.length>5">{{staffEfficiencyList[5].staffName}}:{{Math.ceil(staffEfficiencyList[5].productMeter/100)/10}}千米</span>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
            <tr>
              <td style=" background:url('../../../static/picture/platform/border2.png') no-repeat center center;background-size:100% 100%;">
                <div :style="{height: scrollerHeightDiv2,width:scrollerWidthLeftDiv}" style=";background-color: transparent">
                  <table style="text-align: center;width: 100%;height: 100%" >
                    <tr>
                      <td colspan="2">
                        <p  class="tableTitle" style="margin-top: -9.3%;">优秀设备</p>
                      </td>
                    </tr>
                    <tr>
                    <td class="tableBody">
                      <span v-if="EfficiencyList.length>0">{{EfficiencyList[0].machine_id}}:效率{{EfficiencyList[0].shiftEfficiency}}%</span>
                    </td>
                    <td class="tableBody">
                      <span v-if="EfficiencyList.length>1">{{EfficiencyList[1].machine_id}}:效率{{EfficiencyList[1].shiftEfficiency}}%</span>
                    </td>
                  </tr>
                    <tr>
                      <td class="tableBody">
                        <span v-if="EfficiencyList.length>2">{{EfficiencyList[2].machine_id}}:效率{{EfficiencyList[2].shiftEfficiency}}%</span>
                      </td>
                      <td class="tableBody">
                        <span v-if="EfficiencyList.length>3">{{EfficiencyList[3].machine_id}}:效率{{EfficiencyList[3].shiftEfficiency}}%</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="tableBody">
                        <span v-if="EfficiencyList.length>4">{{EfficiencyList[4].machine_id}}:效率{{EfficiencyList[4].shiftEfficiency}}%</span>
                      </td>
                      <td class="tableBody">
                        <span v-if="EfficiencyList.length>5">{{EfficiencyList[5].machine_id}}:效率{{EfficiencyList[5].shiftEfficiency}}%</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="tableBody">
                        <span v-if="EfficiencyList.length>6">{{EfficiencyList[6].machine_id}}:效率{{EfficiencyList[6].shiftEfficiency}}%</span>
                      </td>
                      <td class="tableBody">
                        <span v-if="EfficiencyList.length>7">{{EfficiencyList[7].machine_id}}:效率{{EfficiencyList[7].shiftEfficiency}}%</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="tableBody">
                        <span v-if="EfficiencyList.length>8">{{EfficiencyList[8].machine_id}}:效率{{EfficiencyList[8].shiftEfficiency}}%</span>
                      </td>
                      <td class="tableBody">
                        <span v-if="EfficiencyList.length>9">{{EfficiencyList[9].machine_id}}:效率{{EfficiencyList[9].shiftEfficiency}}%</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="tableBody">
                        <span v-if="EfficiencyList.length>10">{{EfficiencyList[10].machine_id}}:效率{{EfficiencyList[10].shiftEfficiency}}%</span>
                      </td>
                      <td class="tableBody">
                        <span v-if="EfficiencyList.length>11">{{EfficiencyList[11].machine_id}}:效率{{EfficiencyList[11].shiftEfficiency}}%</span>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div :style="{height: '98%',width:scrollerMiddleMiddle}" style="background-color: transparent;vertical-align:top;display: inline-block">
           <table style="height: 97%;width: 100%">
             <tr>
               <td style=" background:url('../../../static/picture/platform/middleBackground.png') no-repeat center center;background-size:100% 100%;height: 60%;padding: 50px;vertical-align: top">
                 <div>
                   <div style="height: 3.3rem;text-align: left;">
                     <div style="height:100%;border-left:4px solid rgba(88,162,195,1);display: inline-block;font-size: 2.4rem;font-weight: bolder;color: #ffffff;letter-spacing:4px;padding-left: 4px">
                       今日总产量
                     </div>
                   </div>
                   <div style="width:57px;height:83px;line-height: 83px;background:rgba(7,134,191,0.61);;font-size: 72px;font-family: digital;margin-top: 10px;margin-left: 20px;display: inline-block" v-for="index in 7" >
                     <span style="color: #FFFFFF">{{yieldsToday[index-1]}}</span>
                   </div>
                     <div style="width:54%;height:54px;line-height:54px;background:rgba(88,162,195,0.61);padding-left: 10px;text-align: left;margin-top: 50px">
                       <p class="body_font_slim">实时生产效率&nbsp<span style="color: #FFCC00">{{efficiencyToday}}%</span></p>
                     </div>
                   <div style="text-align: justify;width: 100%;margin-top: 50px;">
                     <div style="width:47%;height:54px;line-height:54px;background:rgba(88,162,195,0.61);text-align: left;padding-left: 10px;display: inline-block">
                       <p class="body_font_slim">纬停次数&nbsp<span style="color: #00FF1E">{{breakToday}}</span>&nbsp次</p>
                     </div>
                     <div style="width:47%;height:54px;line-height:54px;background:rgba(88,162,195,0.61);text-align: left;padding-left: 10px;display: inline-block;margin-left: 5%">
                       <p class="body_font_slim">经停次数&nbsp<span style="color: #FF0000">{{breakTodayJ}}</span>&nbsp次</p>
                     </div>
                   </div>
                 </div>
               </td>
             </tr>
             <tr>
               <td height="40%" style=" background:url('../../../static/picture/platform/border.png') no-repeat center center;background-size:100% 100%;">
                 <table style="text-align: center;width: 100%;height: 100%" id="middleTable">
                   <tr>
                     <td>
                       <p  class="tableTitle">公告栏</p>
                     </td>
                   </tr>
                   <tr>
                     <td class="tableBody" rowspan="3" @click="showNoticeTable = true">
                       公告内容：{{notice}}
                     </td>
                   </tr>
                 </table>
               </td>
             </tr>
           </table>
        </div>
        <div :style="{height: '98%',width:scrollerWidthRight}" style="vertical-align:top;display: inline-block; " >
          <table style="height: 99%;width: 100%" cellspacing="20px">
            <tr>
              <td style="background:url('../../../static/picture/platform/border.png') no-repeat center center;background-size:100% 100%;height: 40%;">
                <table style="text-align: center;width: 100%;height: 100%" >
                  <tr>
                    <td>
                      <p style=" font-size: 2vw; font-weight: bolder;color: #ffffff;margin-top: -8.3%;">产量推移</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div id="ProductionTimeCharts" style="width: 500px;height: 200px"></div>
                     </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td height="60%" style=" background:url('../../../static/picture/platform/border2.png') no-repeat center center;background-size:100% 100%;">
                <table style="text-align: center;width: 100%;height: 100%" id="rightTable"  >
                  <tr>
                    <td colspan="2">
                      <p  class="tableTitle" style="margin-top: -6.3%;">产量查询</p>
                    </td>
                  </tr>
                  <tr>
                    <td class="tableBody" style="font-size: 1.6vw">
                        查询日期
                    </td>
                    <td class="tableBody" id="date-picker">
                      <el-date-picker
                        class="datePicker"
                        v-model="date"
                        type="daterange"
                        align="right"
                        unlink-panels
                        style="background-color: transparent;color: white;width: 15vw;height: 3vw"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions"
                        @change="searchOutput"
                      >
                      </el-date-picker>
                    </td>
                  </tr>
                  <tr>
                    <td class="tableBody"  style="font-size: 1.6vw">
                      员工姓名
                    </td>
                    <td class="tableBody">
                      <el-select filterable placeholder="请选择"  style="width: 15vw;height: 3vw" v-model="staff_selected" @change="searchOutput" >
                        <el-option
                          v-for="item in staffList"
                          :key="item.staff_name"
                          :label="item.staff_name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </td>
                  </tr>
                  <tr>
                    <td class="tableBody" style="font-size: 1.6vw">
                      产量加总
                    </td>
                    <td style="font-size: 2vw;color: #F9243D">
                      {{staffYield}}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="bottom_font"><span>Copyright©浙江天衡信息技术有限公司</span></div>
    </div>
</template>
<script>
  import bgPicture from "../../../static/picture/background.png"
  import { platform_api,common_api, platformGet_api} from "../../../static/api/api.js";
  import echarts from 'echarts'; //此处引入echarts
  import Cookies from 'js-cookie';
    export default {
      name: "platformIndex",
      data () {
        return {
          timer:null,//主定时器
          companyId:10000005,
          scrollerHeight: null,
          scrollerWidth: null,
          scrollerHeightDiv: null,
          scrollerHeightDiv2:null,
          scrollerWidthLeft: null,
          scrollerWidthLeftDiv:null,
          scrollerMiddleMiddle:null,
          scrollerWidthRight: null,
          titleLeft: null,
          bgPicture: bgPicture,
          date:[],
          staffList:[],
          staff_selected:null,
          pickerOptions: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
          EfficiencyList:[],//机器效率
          staffEfficiencyList:[],//员工效率
          workshopList:[],
          productMonths:[],
          totalProductSeries:[],
          yieldsToday:0,
          efficiencyToday:0,
          breakToday:0,
          breakTodayJ:0,
          showNoticeTable:false,
          notice:"",//公告栏内容
          staffYield:"0米",//员工产量
          urlName:"万 舟 纺 织 车 间 查 询 平 台",//标题
          workshopIdList:[]
        }
      },
      methods:{
        changeWindow(){
          this.scrollerHeight = (window.innerHeight*0.98 -71) + "px";
          this.scrollerWidth = (window.innerWidth -10) + "px";
          this.scrollerHeightDiv = (window.innerHeight*0.98 -90 -35)*0.3 +"px";
          this.scrollerHeightDiv2 = (window.innerHeight*0.98 -90 -35)*0.63 +"px";
          this.scrollerWidthLeftDiv = ((window.innerWidth -10)-10)*0.3*0.92- 40 +"px";
          this.scrollerWidthLeft = ((window.innerWidth -10)-10)*0.3 +"px";
          this.scrollerMiddleMiddle = ((window.innerWidth -10)-10)*0.38 +"px";
          this.scrollerWidthRight = ((window.innerWidth -10)-10)*0.3 +"px";
          this.titleLeft = (window.innerWidth -10)/2*0.78 +"px";
        },
        getStaffList(){
          let data = {};
          data.tableName = "s_staff";
          data.selectFields =["staff_name","staff_code","id"];
          if(this.companyId == "10000005"){
            data.query={
              staff_organization_id:3
            };
          }else if(this.companyId == 10000015 && this.workshopIdList[0]=="4" ){
            data.query={
              staff_organization_id:29
            };
          }else if(this.companyId == 10000015 && this.workshopIdList[0]=="3"){
            data.query={
              staff_organization_id:28
            };
          }else if(this.companyId == 10000022){
            data.query={
              nickName:"pb"
            };
          }
          let url = "/report/getSimpleReport";
          common_api(url, data,this.companyId)
            .then(response => {
             // console.log(response.data.data);
              this.staffList = [];
              for (let i = 0; i < response.data.data.length; i++) {
                if(response.data.data[i].id){
                  this.staffList.push(response.data.data[i])
                }
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        getLowEfficiencyMachine(){
          let data = {};
          data.workshopId = this.workshopIdList[0];
          data.problemId = 4;
          let url = "/s/getEfficiency";
          platform_api(url, data,this.companyId)
            .then(response => {
              //console.log(response.data);
              let EfficiencyList = [];
              for (let i = 0; i < response.data.data.list.length; i++) {
                EfficiencyList.push(
                  {
                    machine_id:response.data.data.list[i].machineid,
                    shiftEfficiency:response.data.data.list[i].shiftEfficiencyF.toFixed(1)
                  }
                )
              }
              this.EfficiencyList = EfficiencyList;
            })
            .catch(error => {
              console.log(error);
            });
        },
        getProductionTimeCharts(){
          let data = {};
          data.workshopArray = [1,2,3,4,5];
          let url ="/sign2/getYieldAnalysisNew";
          platform_api(url, data,this.companyId)
            .then(response => {
              // console.log(response.data);
              let result =  response.data.data;
              if (result.length>0){
                this.productMonths = result[0].yieldAnalysisList2.map(x => {
                  return this.dateFormatForMMdd(x.months);
                });
                this.workshopList = result.map(x=>{
                  return x.workshopName
                });
                this.totalProductSeries = result.map(x=>{return {
                  name:x.workshopName,
                  data:x.yieldAnalysisList2.map(x=>{return x.totalProductMeterXs}),
                  type:'bar',
                }});
              }
               this.printChart();
            })
            .catch(error => {
              console.log(error);
            });
        },
        dateFormatForMMdd:function(time){
          let t=new Date(time);//row 表示一行数据, updateTime 表示要格式化的字段名称
          return (t.getMonth()+1).toString().padStart(2,'0')+"-"+t.getDate().toString().padStart(2,'0');
          // return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()+"."+t.getMilliseconds();
        },
        printChart(){
          let productionTimeChart = echarts.init(document.getElementById('ProductionTimeCharts'));
          // 绘制图表
          productionTimeChart.clear();
          productionTimeChart.setOption(
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
                data:this.workshopList,
                textStyle:{
                  fontSize: 12,//字体大小
                  color: 'lightblue'//字体颜色
                },
                top:'5%',
                left:'23%'
              },
              grid:{
                x:70,
                x2:20,
                y2:80,
                left:'23%',
                top:'16%',
                bottom:'14%'
              },
              xAxis: {
                type: 'category',
                //data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月','08月', '09月', '10月', '11月', '12月'],
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
                name:'米',
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
                    fontSize: 16,//字体大小
                    color: 'lightblue'//字体颜色
                  },
                },
              },
              series: this.totalProductSeries
            },true);
          window.addEventListener('resize', function () {
            productionTimeChart.resize();
          });
        },
        //  定时刷新产量推移
        getProductionTimeDataTiming:function () {
          const timer = setInterval(() =>{
            this.getProductionTimeData();
          }, 300000);
          // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
          this.$once('hook:beforeDestroy', () => {
            clearInterval(timer);
          })
        },
        //今日产量数据
        getMessageToday(){
          let data = {};
          data.workshops = this.workshopIdList+"";
          let url ="/ab/getWorkshopABAndYield";
          platformGet_api(url, data,this.companyId)
            .then(response => {
              //console.log(response.data);
              this.yieldsToday = "0000000";
              if(response.data.data.totalYield){
                let yieldsToday ="0000000" + (response.data.data.totalYield+"");
                this.yieldsToday = yieldsToday.substring(yieldsToday.length-7);
              }
              this.efficiencyToday = 0;
              for (let i = 0; i < response.data.data.selects.length; i++) {
               // this.yieldsToday += response.data.data.selects[i].yesterdayYield;
                this.efficiencyToday += response.data.data.selects[i].list[0]*1.0;
              }
             // this.yieldsToday = Math.round(this.yieldsToday*10)/10;
              this.efficiencyToday =  Math.round((this.efficiencyToday/(this.workshopIdList+"").length)*10)/10;
            })
            .catch(error => {
              console.log(error);
            });
        },
        getShiftData(){
          let data = {};
          data.tableName = "lm_shift";
          data.selectFields =["product_meter","staff_id","weft_c","warp_c"];
          data.query = {
            workshopId: this.workshopIdList[0]
          };
          let url = "/report/getSimpleReport";
          common_api(url, data,this.companyId)
            .then(response => {
              //console.log(response.data);
              this.breakToday = 0;
              this.breakTodayJ = 0;
              for (let i = 0; i < response.data.data.length; i++) {
                this.breakToday += response.data.data[i].weft_c;
                this.breakTodayJ += response.data.data[i].warp_c;
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        getStaffEfficiency(){
          let data = {};
          data.workshops = this.workshopIdList[0] + "";
          let url = "/lm_shift_his/selectStaffAndYield";
          platform_api(url,data,this.companyId)
            .then(response => {
             // console.log(response.data);
              this.staffEfficiencyList = response.data.data;
            })
            .catch(error => {
              console.log(error);
            });
        },
        searchOutput(){
          let data = {};
          data.startDate = this.date[0];
          data.endDate = this.date[1];
          data.staffId = this.staff_selected;
          if(data.staffId &&  data.endDate && data.startDate){
            let url = "/lm_shift_his/select";
            platform_api(url,data,this.companyId)
              .then(response => {
                //console.log(response.data);
                this.staffYield = response.data.data.yield +"米"
              })
              .catch(error => {
                console.log(error);
              });
          }
        },
        dateFormat(date) {
          let day = new Date(date);
          let YYYY = day.getFullYear().toString();
          let MM = (day.getMonth() + 1).toString();
          if(MM.length === 1){
            MM = "0" + MM
          }
          let DD = day.getDate().toString();
          if(DD.length === 1){
            DD = "0" + DD
          }
          let hh = day.getHours().toString();
          if(hh.length === 1){
            hh = "0" + hh
          }
          let mm = day.getMinutes().toString();
          if(mm.length === 1){
            mm = "0" + mm
          }
          let ss = day.getSeconds().toString();
          if(ss.length === 1){
            ss = "0" + ss
          }
          return YYYY + "-" + MM + "-" + DD;
        },
        saveNotice(){
          Cookies.set("notice",this.notice);
          this.showNoticeTable = false;
        },
        getData(){
          this.getStaffList();//获取员工列表
          this.getLowEfficiencyMachine();//低效机器
          this.getMessageToday();//今日数据
          this.getShiftData();//班次数据
          this.getStaffEfficiency();//员工效率
        },
        getUrlMessage(){
          let params = this.$route.params.params.split(",");
          this.companyId = params[0];
          this.workshopIdList = [];
          let workshopIdList = params[1]+"";
          for (let i = 0; i < workshopIdList.length; i++) {
            this.workshopIdList.push(workshopIdList[i])
          }
          if(this.companyId == 10000015 && workshopIdList==="4" ){
            this.urlName = "鑫 浪 纺 织 车 间 查 询 平 台";
          }else if(this.companyId == 10000015 && workshopIdList==="3"){
            this.urlName = "赐 源 纺 织 车 间 查 询 平 台";
          }else if(this.companyId == 10000022 && workshopIdList==="1"){
            this.urlName = "亿 骏 纺 织 车 间 查 询 平 台";
          }else if(this.companyId == 10000022 && workshopIdList==="2"){
            this.urlName = "祥 嘉 纺 织 车 间 查 询 平 台";
          }
          this.getProductionTimeCharts();//时间推移图
          this.getData();
        }
      },
      mounted() {
        this.getUrlMessage();
        if(Cookies.get('notice')){
          this.notice = Cookies.get('notice');
        }
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        this.date = [this.dateFormat(start),this.dateFormat(end)];
        this.changeWindow();
        window.onresize = () => {
          this.changeWindow();//自适应
        };
        //主定时器，定时3秒刷新
        if (this.timer) {
          clearInterval(this.timer);
        } else {
          this.timer = setInterval(() => {
            this.getData();
          }, 3000)
        }
      },
      destroyed() {
        clearInterval(this.timer);
      }
    }
</script>

<style lang="less" scoped>
  @font-face {
    font-family: 'digital';
    src: url('./../../assets/Lets.ttf')  format('truetype');
  }
  #weightDiv p,input{
    display: inline-block;
    color:white;
    font-size: 2vw;
  }
  #weightDiv input{
    width: 9vw;
    background-color: transparent;
    border-color: white;
    padding-left: 2%;
  }
  #leftTable{
    div{
      background-size:100% 100%;
      display:inline-block;
      padding: 10px;
    }
    .tableTitle{
      font-size: 2vw;
      font-weight: bolder;
      color: #ffffff;
      margin-top: -5.8%;
    }
    .tableBodyBig{
      font-size: 1.8vw;
      color: #ffffff;
    }
    .tableBody{
      font-size: 1.4vw;
      color: #ffffff;
    }
  }
  #middleTable{
    .tableTitle{
      font-size: 2vw;
      font-weight: bolder;
      color: #ffffff;
      margin-top: -5.8%;
    }
    .tableBody{
      font-size: 1.8vw;
      color: #ffffff;
      vertical-align: top;
      text-align: left;
      padding: 2vw;
      word-break:break-all;
      word-wrap:break-word;
    }
  }
  #rightTable{
    .tableTitle{
      font-size: 2vw;
      font-weight: bolder;
      color: #ffffff;
    }
    .tableBody{
      font-size: 2.2vw;
      color: #ffffff;
      text-align: left;
      padding: 1vw;
    }
  }
  .bottom_font{
    position: absolute;
    display: flex;
    bottom: 0;
    width: 100%;
    align-items: center;
    justify-content:center;
    color:white;
    font-size: 1.2rem;
    z-index: 100;
  }
  .body_font_slim{
    height:32px;
    font-size:32px;
    font-weight:400;
    color:rgba(255,255,255,0.99);
  }
</style>
<style lang="less">
    .datePicker .el-range-input{
      background-color: transparent;
      color: white;
      font-size: 1vw;
    }
</style>
