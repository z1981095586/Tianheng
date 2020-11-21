<template>
  <div>
    <!--保养状态小页面-->
    <el-dialog
      :visible.sync="showCondition"
      width="400px"
      append-to-body
      :close-on-click-modal="false"
    >
      <div  style="width: 100%;text-align: center;font-size: 30px">待保养</div>
      <div  style="width: 100%;text-align: center;font-size: 30px">待保养项目:每月保养</div>
      <div  style="width: 100%;text-align: center;font-size: 30px">截止时间:2020-11-1</div>
      <div  style="width: 100%;text-align: center"><el-button  type="warning" style="font-size:1.5rem; width: 15vw; height: 10vw" @click="Upkeep">进入保养</el-button></div>
    </el-dialog>
    <!--维修状态小页面-->
    <el-dialog
      :visible.sync="showService"
      width="400px"
      append-to-body
      :close-on-click-modal="false"
    >
      <div  style="width: 100%;text-align: center;font-size: 30px">待维修</div>
      <div  style="width: 100%;text-align: center;font-size: 25px">提交时间:2020-10-29 09:30</div>
      <div  style="width: 100%;text-align: center"><el-button  type="danger" style="font-size:1.5rem; width: 15vw; height: 10vw" @click="UpService">进入维修</el-button></div>
    </el-dialog>
    <!--保养信息页面-->
    <el-dialog
      :visible.sync="showmaintenanceinfo"
      width="1000px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-card>
        <div style="width: 100%;font-size: 2.5rem">机器号:1001 #选定后不修改</div>
      </el-card>
      <el-card>
        <div style="width: 100%;font-size: 2.5rem">保养项次:</div>
        <div style="font-size: 1rem">
          <el-checkbox v-model="checked" style="width: 400px">项次一</el-checkbox>
          <el-checkbox v-model="checked" style="width: 400px">项次二</el-checkbox><br>
          <el-checkbox v-model="checked" style="width: 400px">项次一</el-checkbox>
          <el-checkbox v-model="checked" style="width: 400px">项次二</el-checkbox><br>
          <el-checkbox v-model="checked" style="width: 400px">项次一</el-checkbox>
          <el-checkbox v-model="checked" style="width: 400px">项次二</el-checkbox><br>
        </div>
      </el-card>
      <el-card>
        <div style="width: 100%;font-size: 2.5rem">零配件:
          <div style="font-size: 2rem">
            配件一:8个&nbsp;&nbsp;配件二:5个</div>
          </div>
        <el-button type="warning" style="position: absolute;top: 350px;right: 40px; width: 7.8vw;height: 5vw; font-size: 1.5rem; padding-left: 15px">增加</el-button>
      </el-card>
      <el-button type="success" style="font-size:2.5rem; width: 13vw; height: 10vw; margin-top:20px;margin-left: 220px">确认</el-button>
      <el-button type="danger" style="font-size:2.5rem; width: 13vw; height: 10vw; margin-left: 200px"@click="showmaintenanceinfo = false" >取消</el-button>
    </el-dialog>
    <!--维修信息页面-->
    <el-dialog
      :visible.sync="showserviceinfo"
      width="1000px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-card>
        <div style="width: 100%;font-size: 2rem">机器号:1001 &nbsp;&nbsp;&nbsp;报修时间:2020-10-29&nbsp;09:30</div>
      </el-card>
      <el-card>
        <div style="width: 100%;font-size: 2rem">故障分类:
          <el-radio v-model="radio" label="1">经</el-radio>
          <el-radio v-model="radio" label="2">纬</el-radio>
          <el-radio v-model="radio" label="3">疵点</el-radio>
          <el-radio v-model="radio" label="4">设备</el-radio>
        </div>
      </el-card>
      <el-card style="height:150px ">
        <div style="width: 100%;font-size: 2rem">处理方式:</div>
      </el-card>
      <el-card>
        <div style="width: 100%;font-size: 2rem">零配件:
          <div style="font-size: 2rem">
            配件一:8个&nbsp;&nbsp;配件二:5个</div>
        </div>
        <el-button type="warning" style="position: absolute;top: 400px;right: 40px; width: 7.8vw;height: 5vw; font-size: 1.5rem; padding-left: 15px">增加</el-button>
      </el-card>
      <el-button type="success" style="font-size:2.5rem; width: 13vw; height: 10vw; margin-top:20px;margin-left: 220px">确认</el-button>
      <el-button type="danger" style="font-size:2.5rem; width: 13vw; height: 10vw; margin-left: 200px"@click="showserviceinfo = false" >取消</el-button>
    </el-dialog>

    <div style="height: 80px;background-color: #29374b;width: 100%">
      <!-- <headComponent ref="headComponent" @selectWorker="selectWorker"></headComponent> -->
    </div>
    <div style="width: 100%;height: 100%">
      <table class="radioTable" cellspacing='3px' cellpadding='10px' width="100%" style="font-size: 3rem;text-align: center">
        <tr>
        <tr>
          <td id="radio1" @click="changeRadio('radio1')" style="background-color: #409EFF;font-size: 2.5rem">
            我的机台&nbsp;
          </td>
          <td id="radio2" @click="changeRadio('radio2')" style="font-size: 2.5rem">
            维修&nbsp;
          </td>
          <td id="radio3" @click="changeRadio('radio3')" style="font-size: 2.5rem">
            保养&nbsp;
          </td>
          <td id="radio4" @click="changeRadio('radio4')" style="font-size: 2.5rem">
            历史&nbsp;
          </td>
        </tr>
      </table>
    </div>
    <div v-show="radio === 'radio1'">
    <div>
      <el-button class="el-button-top">共64台</el-button>
      <el-button type="success" class="el-button-top">正常机台</el-button>
      <el-button type="warning" class="el-button-top">待保养机台</el-button>
      <!--<el-button type="danger" class="el-button-top">保养逾期机台</el-button>-->
      <el-button type="danger" class="el-button-top">待维修机台</el-button>
    </div>
      <table>
        <tr v-for="indexTd in 3">
          <td><el-button class="el-button-below" @click="viewStatus">10001</el-button></td>
          <td><el-button class="el-button-below" @click="viewService">10002</el-button></td>
          <td><el-button class="el-button-below">10003</el-button></td>
          <td><el-button class="el-button-below">10004</el-button></td>
        </tr>
      </table>
  </div>


    <table class="radioTable"  style="width: 95%" cellspacing="30px" v-show="radio === 'radio2'" >
      <tr v-for="indexTd in 3" >
        <td v-for="indexTd in 3" style="text-align: left;width: 33%" >
          <div style="height:16vh;margin-top: 5%;width: 96%">
            <div style="height:5vh;font-size: 1rem; font-weight: bolder">机台号：1235</div>
            <div style="height:5vh;font-size: 1rem;font-weight: bolder;">报修时间：2020-10-10</div>
            <div> <el-button type="danger"  style="height:5vh;font-size: 1rem;font-weight: bolder;" @click="UpService">待维修</el-button></div>
            <!--<div style="height:9vh;font-size: 1.5vw;font-weight: bolder;">排产品种：<br>{{machine_detail_list[indexTd+indexTr*3-4].styleName}}</div>-->
          </div>
        </td>
      </tr>
    </table>

    <div v-show="radio === 'radio3'">
      <div class="upkeep-tab-top">
        <el-tabs >
          <el-tab-pane label="每日保养"><div></div></el-tab-pane>

          <el-tab-pane label="每周保养">222222222222</el-tab-pane>

          <el-tab-pane label="每月保养">333333333333</el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div v-show="radio === 'radio4'">

    </div>
  </div>




</template>
<script>
  import { warp_api,warp_api_get,common_api  } from "../../../static/api/api.js";
  import headComponent from './mainHead.vue';
  import setAxleTable from './../setAxleTable.vue';
  import outputSubmitTable from './../outputSubmitTable.vue';
  import outputPrintTable from './../sizingCardPrint.vue';
  export default {
    components: {headComponent, setAxleTable, outputSubmitTable, outputPrintTable},
    data() {
      return {
        db: null,
        companyId:null,
        radio: "radio1",
        all_order_list:[],
        showCondition:false,
        showmaintenanceinfo:false,
        showmParts:false,
        showService:false,
        showserviceinfo:false,
      }
    },
    methods: {
      getColor(status, step) {
        if (step.indexOf(status) > -1) {
          return "#417804";
        } else {
          return "gray";
        }
      },
      changeWindow() {

      },
      changeRadio(radioId) {
        this.radio = radioId;
        for (let i = 1; i < 5; i++) {
          document.getElementById("radio" + i).style.backgroundColor = "white";
        }
        document.getElementById(radioId).style.backgroundColor = "#409EFF";
        if (this.radio == 'radio4') {
          this.getRadio4Data();
        }
      },

      viewStatus(){
        this.showCondition = true;
      },
      viewService(){
        this.showService = true;
      },
      Upkeep(){
        this.showmaintenanceinfo = true;
      },
      UpService(){
        this.showserviceinfo = true;

      }
      },
      mounted() {
        this.getUrlMessage();
        document.querySelector('body').setAttribute('style', 'background-color:rgba(223,229,236,0.9)');//设置背景色
        this.changeWindow();
        window.onresize = () => {
          this.changeWindow();
        };
        // alert(this.scrollerWidthLeft);
      },
      selectWorker(workerId,name)
        {
          this.staff_id = workerId;
          this.staff_name = name;
        },
      computed: {
        watchLoadingState() {
          return this.$store.state.showLoadingLog;
        }
      },
      watch: {
        watchLoadingState(newVal, oldVal) {
          if (newVal) {
            clearTimeout(this.$store.state.commonClock);
            let _this = this;
            this.$store.commonClock = setTimeout(function () {
              // _this.$message.warning("出现异常，自动取消上一步操作");
              _this.$store.state.showLoadingLog = false;
            }, 5000)
          } else {
            clearTimeout(this.$store.state.commonClock);
            this.$store.state.commonClock = null;
          }
        }
      },
      destroyed() {

      }
  }
</script>


<style lang="less" scoped>
  .radioTable td{
    position: relative;
    border:2px solid lightgray;
    border-radius:10px;
    padding-left: 10px;
    height:120px;
  }
  .el-button-top{
    position: relative;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bolder;
    padding-left: 30px;
    margin-left: 93PX;
    margin-top:20px;
    height:7vw;
  }
  .el-button-below{
    position: relative;
    height:10vw;
    width: 18vw;
    font-size: 2rem;
    padding-left: 20px;
    margin-left: 53PX;
    margin-top:30px;
  }
</style>

<style lang="less">
  .el-tabs__item{
    padding:15px;
    margin-left:60px;
    padding-right: 200px;
    font-size: 1.8rem;
   font-weight: bolder;
  }
  .el-tabs__active-bar{
    position: absolute;
    height:0px;
  }
  .el-checkbox__label{
    font-size: 1.5rem;
  }
  .el-radio__label{
    font-size: 1.5rem;
    padding-left:15px;
  }
</style>


