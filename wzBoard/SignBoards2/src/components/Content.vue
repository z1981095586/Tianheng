<template xmlns:el-col="http://www.w3.org/1999/html">
    <div class="content4">
      <header style="height: 3rem">
        <div class="title">{{this.workshopLabel}}——织造数据监控</div>
        <h1 class="tip">
          <span style="float: right;margin-top: -2%;margin-right: 19.5%;font-size: 1rem;font-weight: bold">{{date | formatDate}} </span>
        </h1>
      </header>
        <el-row :gutter="5">
          <el-col :span="18">
            <el-row>
              <div class="deviceState" ref="iframe1">
                <iframe id="iframe1" v-bind:src="src2"  marginwidth='0' marginheight='0' width="100%" height="100%"  class="deviceStateCharts"  frameborder="0" >
                </iframe>
              </div>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col :span="24">
                <div class="failureEquipment">
                  <div style="text-align: left;margin-left: 5%;padding-top: 1rem">
                    <span class="tbTitle">停机设备</span>
                  </div>
                  <div style="margin-left: 8%;overflow-y:scroll;height: 8rem;width: 90%;">
                    <el-row :key="item.workshopId" v-for="item in unusualStop">
                      <!--<div style="text-align: center" class="tbTitle">{{item.workshopName}}</div>-->
                      <el-col :key="machine.stopName" :span="24" v-for="machine in item.stopTypeDTOS">
                        <div v-if="machine.stopName==='经纱停车'" style="font-size: 1rem;margin-top: 0.5rem"
                             :class="{'jingsha':machine.stopName==='经纱停车'}"
                             class="tbTitle">{{machine.stopName}}</div>
                        <div v-else-if="machine.stopName==='纬纱停车'" style="font-size: 1rem;margin-top: 0.5rem"
                             :class="{'weisha':machine.stopName==='纬纱停车'}"
                             class="tbTitle">{{machine.stopName}}</div>
                        <div v-else-if="machine.stopName==='其他'" style="font-size: 1rem;margin-top: 0.5rem"
                             :class="{'qita':machine.stopName==='其他'}"
                             class="tbTitle">{{machine.stopName}}</div>
                        <div style="float: left;font-size:0.8rem;margin:0.1rem 0.1rem;width: 3rem;text-align: left" v-for="machineId in machine.strings"  class="tbText">
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
                  <div style="text-align: left;margin-left: 5%;padding-top: 0.5rem">
                    <span class="tbTitle">生产聚焦</span>
                    &nbsp;
                    <span class="tbTitle">效率优秀设备</span>
                    &nbsp;
                    <span class="tbTitle">效率:最高{{maxEfficiency}}%</span>
                    <!--,{{$t('lang.pingjun')}}{{avgEfficiency}}%-->
                  </div>
                  <hr style="width: 90%;border: 1px solid lightblue;">
                  <div style="margin-left: 4%;overflow-y:hidden;height: 20rem;">
                    <div style="float: left;margin:0.1rem 0.4rem;width: 8rem;text-align: left;" v-for="item in machineEfficiencyGood" class="tbText">
                      {{item.machineNum}}:开机效率 {{item.openEfficiency}}%
                    </div>
                  </div>

                <!--  <div style="margin-left: 6%;overflow-y:hidden;height: 15.5rem;width: 34rem" v-show="this.problemDefaultValue==='3'">
                    <div style="float: left;margin:0.5rem 0.8rem;width: 15rem;text-align: left" v-for="item in machineEfficiency" class="tbTitle">&lt;!&ndash;<div style="float: left;padding-top: 0.18rem;width: 2.5rem">&ndash;&gt;{{item.machineNum}}：断头 {{item.openEfficiency}}%</div>
                  </div>-->
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="problemsFocus">
                  <div style="text-align: left;margin-left: 5%;padding-top: 0.5rem">
                    <span class="tbTitle">生产聚焦</span>
                    &nbsp;
                    <span class="tbTitle">效率落后设备</span>
                    &nbsp;
                    <!--<span class="tbTitle">效率:最高{{maxEfficiency}}%</span>-->
                    <!--,{{$t('lang.pingjun')}}{{avgEfficiency}}%-->
                  </div>
                  <hr style="width: 90%;border: 1px solid lightblue;">
                  <div style="margin-left: 4%;overflow-y:hidden;height: 20rem">
                    <div style="float: left;margin:0.1rem 0.4rem;width: 8rem;text-align: left" v-for="item in machineEfficiencyBad" class="tbText">
                      {{item.machineNum}}:开机效率 {{item.openEfficiency}}%</div>
                  </div>

                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="problemsFocus">
                  <div style="text-align: left;margin-left: 5%;padding-top: 0.5rem">
                    <span class="tbTitle">生产聚焦</span>
                    &nbsp;
                    <span class="tbTitle">断头落后设备</span>
                    &nbsp;
                    <span class="tbTitle">纬停率（cmpx）</span>
                  </div>
                  <hr style="width: 90%;border: 1px solid lightblue;">
                    <div style="margin-left: 4%;overflow-y:hidden;height: 7rem">
                      <div style="float: left;margin:0.11rem 0.4rem;width: 8rem;text-align: left" v-for="item in weftCmpx" class="tbText">
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
  import axios from 'axios';
  import {formatDate} from "../static/js/date"; //引入时间格式化js
  import {getUrl,wzBoard_api} from "../api/api"; //引入时间格式化js
    export default {
      name: "Content",
      data() {
        return {
          lang:'zh',
          workshopId:'',
          stopName:'经纱停车',// 停车类型
          src2:'',//设备状态图
          dialogFormVisible:false,//对话框
          deviceHeight:'',//iframe外层div高度
          deviceWidth:'',//iframe外层div宽度
          date: new Date(),
          url:getUrl(),//鑫海局域网
          companyId: this.$route.params.id,//公司库表Id
          buttonName:'zh-CN',
          zongchanlaingduibi:true,//总产量推移界面
          chanliangtuyi:false,//产量对比界面
          warp_page:true,//整经监控界面
          sizing_page:false,//浆纱监控界面
          warpDetail_page:false,//整经详细界面
          sizingDetail_page:false,//浆纱详细界面
          currentLength:2900,//当前长度
          totalLength:4500,//总共长度
          tableData: [],  //预警表
          lioajiData:[],//了机数据
          lioajiIngData:[],//当前了机
          activeName: 'first',//预警区域选项



          //===================产量推移数据结束===========================


          //===================问题聚焦===========================
          problemOptions:[{value:'4',label:'效率优秀设备'},{value:'5',label:'产量优秀设备'},{value:'1',label:'效率落后设备'},{value:'2',label:'产量落后设备'},{value:'3',label:'断头落后设备'}],//问题种类选项
          problemDefaultValue:'4',//问题默认值
          maxEfficiency:'95',//最高效率
          avgEfficiency:'89',//平均效率
          // 效率优秀设备
          machineEfficiencyGood:[
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
          ],
          // 效率落后设备
          machineEfficiencyBad:[
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
          ],
          // 断头落后
          machineDuantouBad:[
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
          ],
          weftCmpx:[],// 断头落后

          //===================问题聚焦===========================


          //===================报警设备===========================
          unusualStop:[],
          workshopList:[],
          workshopLabel:'',
          //===================报警设备===========================


        }
      },
      methods: {
        getWorkshopList(){
          let path='/report/getSimpleReport';
          let data={
            "tableName": "mac_workshop",
            "selectFields":['id','name'],
            "query":{"status":1}
          };
          wzBoard_api(path,data,this.companyId)
            .then(response => {
              this.workshopList=response.data.data.map(x=> {
                return{label:x.name,value:x.id}
              });
              this.workshopId=this.workshopList[0].value;
              this.workshopLabel=this.workshopList[0].label;
            })
            .then(()=>{
              this.getIframe1();
              this.getProblemsFocusData(1);
              this.getProblemsFocusData(4);
              this.getFailureEquipmentData();
              this.getWeftCmpx();
            })

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
          this.src2 = [];
          this.src2='http://47.110.95.57/mulanTP2.3/index.php/home/index/wzTV?CompanyId='+this.companyId+'&workshopId='+this.workshopId+'&language='+this.lang;
          // this.src2='http://112.12.1.41:8082/index.php?CompanyId='+this.companyId+'&workshopId='+this.workshopId+'&language='+this.lang;
          /*console.log(height);
          console.log(width);*/
        },
        //============iframe宽高设置================



        //============后台数据获取================

        // 问题聚焦数据
        getProblemsFocusData: function (problemDefaultValue) {
          axios({
            // url: 'http://localhost:7070/sign2/getYieldAnalysis',
            url: this.url+'/s/getEfficiency',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data:{
              problemId:problemDefaultValue,
              workshopId:this.workshopId,
            }
          })
            .then(response => {
              // ==========问题聚焦数据表格显示============
              this.maxEfficiency = response.data.data['MAXEff'];//最高效率
              this.avgEfficiency = response.data.data['AVGEff'];//平均效率
              // 效率落后
              if (problemDefaultValue===1){
                let machineEfficiency = response.data.data.list;//效率数据
                this.machineEfficiencyBad = machineEfficiency.map(x => {
                  return {machineNum:x.machineid,openEfficiency:x.shiftEfficiencyF}
                });
              }
              // 效率优秀设备
              else if (problemDefaultValue===4){
                let machineEfficiency = response.data.data.list;//效率数据
                this.machineEfficiencyGood = machineEfficiency.map(x => {
                  return {machineNum:x.machineid,openEfficiency:x.shiftEfficiencyF}
                });
              }

            })
        },

        //故障设备数据
        getFailureEquipmentData:function (){
          axios({
            // url: 'http://localhost:7070/sign2/getYieldAnalysis',
            url: this.url + '/s/getUnusualStopMachineListNew',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data: {
              workshopId: null,
              stopName:this.stopName,
              workshopArray:[this.workshopId]
            }
          })
            .then(response => {
              // ==========总产量对比数据表格显示============
              this.unusualStop = response.data.data.unusualStop;
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
              this.weftCmpx.splice(12,3);
            })
        },

        //============后台数据获取================


        //============定时刷新数据================

        //定时刷新问题聚焦
        getProblemsFocusDataTiming:function (){
          const timer = setInterval(() =>{
            this.getProblemsFocusData(1);
            this.getProblemsFocusData(4);
            this.getWeftCmpx();
            // this.getProblemsFocusData(3);
          }, 5000);
          // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
          this.$once('hook:beforeDestroy', () => {
            clearInterval(timer);
          })
        },

        //定时刷报警设备
        getFailureEquipmentDataTiming:function (){
          const timer = setInterval(() =>{
            if (this.stopName==='经纱停车'){
              this.stopName = '纬纱停车'
            }
            else if (this.stopName==='纬纱停车'){
              this.stopName = '其他'
            }
            else if (this.stopName==='其他'){
              this.stopName = '经纱停车';
            }
            this.getFailureEquipmentData();
          }, 3000);
          // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
          this.$once('hook:beforeDestroy', () => {
            clearInterval(timer);
          })
        },

        //定时切换车间
        changeWorkshopTiming:function (){
          const timer = setInterval(() =>{
            this.machineEfficiencyBad = [];
            this.machineEfficiencyGood = [];
            this.unusualStop = [];
            this.weftCmpx=[];
            this.maxEfficiency = '';
            this.avgEfficiency = '';
            this.stopName = '纬纱停车';
            let index = '';
            let i = 0;
            for ( i = 0;i<this.workshopList.length;i++){
              if (this.workshopList[i].value===this.workshopId){
                index = i;
              }
            }
            if (index+1<this.workshopList.length){
              this.workshopId = this.workshopList[index+1].value;
              this.workshopLabel = this.workshopList[index+1].label;
            }
            else {
              this.workshopId = this.workshopList[0].value;
              this.workshopLabel = this.workshopList[0].label;
            }
            // console.log(this.workshopId)
            // console.log(this.workshopLabel);
            this.getIframe1();
            this.getProblemsFocusData(1);
            this.getProblemsFocusData(4);
            this.getWeftCmpx();
            this.getFailureEquipmentData();
          }, 15000);
          // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
          this.$once('hook:beforeDestroy', () => {
            clearInterval(timer);
          })
        },

        //============定时刷新数据================



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
        // this.getIframe1();
        //数据获取
        this.getWorkshopList();
        //刷新数据

        this.getProblemsFocusDataTiming();
        this.getFailureEquipmentDataTiming();
        this.changeWorkshopTiming();


      },
      beforeDestroy() {
        if (this.timer) {
          clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
        }
      }
    }
</script>

<style scoped>

  .content4{
    background-image: url("../../static/img/wzBack.png");
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    margin: 0;
    padding-top: 2rem;
    /*color: rgba(173, 255, 47, 0.25);*/
  }
  header{
    padding: 0;
    width: 100%;
    text-align: center;
    margin: 0;
  }
  .title{
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
    font-size: 0.8rem;
    color: #00ffff;
  }

  .tbText{
    font-weight: bolder;
    font-size: 0.6rem;
    color: lightblue;
  }
  .deviceState{
    width: 100%;
    height: 42rem;
  }
  .deviceStateCharts{
    width: 99%;
    height: 100%;
    margin-left: 0.5%;
  }

  .failureEquipment{
    background-image: url("../../static/img/bk4.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 11rem;
    margin: 0;
  }
  .problemsFocus{
    background-image: url("../../static/img/bk4.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 10rem;
    margin: 0;
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
