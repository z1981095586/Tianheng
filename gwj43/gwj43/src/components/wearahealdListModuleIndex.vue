<template>
  <div>
    <el-dialog
      :visible.sync="showSubmitTable"
      width="764px"
      append-to-body
      :close-on-click-modal="false"
    >
      <outputSubmitTable @closeSubmitTable="closeSubmitTable"></outputSubmitTable>
    </el-dialog>
    <!--<el-dialog-->
      <!--:visible.sync="showPrintTable"-->
      <!--width="940px"-->
      <!--append-to-body-->
      <!--:close-on-click-modal="false"-->
    <!--&gt;-->
      <!--<outputPrintTable ref="outputPrintTable"></outputPrintTable>-->
    <!--</el-dialog>-->
    <el-dialog
      :visible.sync="showPrintTable"
      width="640px"
      append-to-body
      :close-on-click-modal="false">
      <warpCardPrint ref="warpCardPrint"></warpCardPrint>
    </el-dialog>
    <div style="overflow-x: hidden;position: absolute;width: 100%;height: 100%">
      <div style="height: 95%;overflow-y: auto;overflow-x:hidden ">
        <headComponent style="height: 30px"></headComponent>
        <table  class="standard_border" style="height:150px;width:100%;" cellspacing='0' cellpadding='0'>
          <tr>
            <!--左侧刷卡栏-->
            <td style="display: inline-block;width: 20%;height: 100%" class="standard_border">
              <table  cellspacing='0' cellpadding='0' style="width: 100%;height: 100%;border-collapse: collapse;">
                <tr style="height: 25%">
                  <td colspan="2" style="background-color: #e5e6e9"><p class="small_title">开始刷卡</p></td>
                </tr>
                <tr class="standard_border" style="height: 75%;background-color: #ebecef">
                  <td width="20%" style="text-align: center">
                    <p style="font-size: 20px;display: inline-block">穿综<br>卡号</p>
                  </td>
                  <td>
                    <el-input v-model="cardNumber" style="display: inline-block;width: 90%;font-size: 20px" @change="getDataByCardNumber(cardNumber)"></el-input>
                  </td>
                </tr>
              </table>
            </td>
            <!--右侧查询栏-->
            <td style="display: inline-block;width: 80%;height: 100%" class="standard_border">
              <table cellspacing='0' cellpadding='0' style="width: 100%;height: 100%;border-collapse: collapse;">
                <tr style="height: 25%">
                  <td colspan="2" style="background-color: #e5e6e9"><p class="small_title">穿综加工单信息</p></td>
                </tr>
                <tr class="standard_border" style="height: 75%;background-color: #ebecef">
                  <table cellspacing='0' cellpadding='0'>
                    <tr style="">
                      <td class="rightTableTd">
                        <div class="blueInputTitle">编号</div>
                        <el-input class="standard_input" style="width: 150px" disabled size="mini" v-model="warpCardData.sheetSeries"></el-input>
                      </td>
                      <td class="rightTableTd">
                        <div class="blueInputTitle">类型</div>
                        <el-input class="standard_input" style="width: 150px" disabled size="mini" v-model="warpCardData.sheetDate"></el-input>
                      </td>
                      <td class="rightTableTd">
                        <div class="inputTitle">客户</div>
                        <el-input class="standard_input" style="width: 150px" disabled size="mini" v-model="warpCardData.processingType"></el-input>
                      </td>
                      <td class="rightTableTd">
                        <div class="inputTitle">成品名称</div>
                        <el-input class="standard_input" style="width: 150px" disabled size="mini" v-model="warpCardData.machineId"></el-input>
                      </td>
                    </tr>
                    <tr>
                      <td class="rightTableTd">
                        <div class="blueInputTitle">轴长</div>
                        <el-input class="standard_input" style="width: 150px" disabled size="mini" v-model="warpCardData.processingCategory"></el-input>
                      </td>
                      <td class="rightTableTd">
                        <div class="blueInputTitle" style="width: 60px">浆纱合轴数</div>
                        <el-input class="standard_input" style="width: 140px" disabled size="mini" v-model="warpCardData.hingeAxis"></el-input>
                      </td>
                      <td class="rightTableTd">
                        <div class="inputTitle">总根经数</div>
                        <el-input class="standard_input" style="width: 150px" disabled size="mini" v-model="warpCardData.requiredDeliveryDate"></el-input>
                      </td>
                    </tr>
                    <tr>
                      <td class="rightTableTd">
                        <div class="blueInputTitle">合同号</div>
                        <el-input class="standard_input" style="width: 150px" disabled size="mini" v-model="warpCardData.beamFixedLength"></el-input>
                      </td>
                      <td class="rightTableTd">
                        <div class="blueInputTitle">订单号</div>
                        <el-input class="standard_input" style="width: 150px" disabled size="mini" v-model="warpCardData.axisNumber"></el-input>
                      </td>
                    </tr>
                    <td class="rightTableTd" colspan="4">
                      <div class="inputTitle">备注</div>
                      <el-input class="standard_input" style="width: 770px" size="mini"></el-input>
                    </td>
                  </table>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <div  class="standard_border" style="height: 68px;background-color: #f0f0f0;">
          <div style="height: 40px;margin-top: 14px">
            <el-row>
              <el-col :span="2">
                &nbsp
              </el-col>
              <el-col :span="19" >
                <div style="text-align: center">
                  <el-button style="" @click.native="clickStep(2)">产量报工</el-button>
                  <!--<el-steps :active="activeStep" finish-status="success" style="height: 40px;">-->
                    <!--<el-step  title="织轴上机" @click.native="clickStep(1)" ></el-step>-->
                    <!--<el-step  title="产量报工" @click.native="clickStep(2)"></el-step>-->
                    <!--<el-step  title="打印" @click.native="clickStep(3)" ></el-step>-->
                  <!--</el-steps>-->
                </div>
              </el-col>
              <!--<el-col :span="3" style="text-align: center">-->
                <!--<el-button style="" @click="prevStep" :disabled="activeStep===0">上一步</el-button>-->
                <!--<el-button style="" @click="nextStep" :disabled="activeStep===3">下一步</el-button>-->
              <!--</el-col>-->
            </el-row>
          </div>
        </div>
        <div class="standard_border">
          <div  style="background-color: #e5e6e9"><p class="small_title">经轴明细</p></div>
          <div style="background-color: #ffffff;overflow-y: auto;">
            <Table border  stripe :columns="warpInfoColumn" :data="warpInfoData" height="648" highlight-row @on-current-change="selectRow"></Table>
          </div>
        </div>
      </div>
      <footerComponent style="height:5%;"></footerComponent>
    </div>
  </div>
</template>

<script>
  import { warp_api,produce_api } from "../../static/api/api.js";
  import headComponent from './head.vue';
  import footerComponent from './footer.vue';
  import outputSubmitTable from './outputSubmitTable.vue';
  import warpCardPrint from './warpCardPrint.vue';
  export default {
    components: {headComponent,footerComponent,outputSubmitTable,warpCardPrint},
    data () {
      return {
        warpInfoData:[],
        warpInfoColumn:[
          {
            title: '品种',
            key: 'nameC',
            align: 'center',
          },
          {
            title: '序号',
            key: 'id',
            align: 'center',
          },
          {
            title: '轴号',
            key: 'axisNo',
            align: 'center',
          },
          {
            title: '工序号',
            key: 'workQty',
            align: 'center',
          },
          {
            title: '条码',
            key: 'workQty',
            align: 'center',
          },
          {
            title: '机台号',
            key: 'workQty',
            align: 'center',
          },
          {
            title: '开始时间',
            key: 'workQty',
            align: 'center',
          },
          {
            title: '结束时间',
            key: 'workQty',
            align: 'center',
          },
          {
            title: '上机时间',
            key: 'startDate',
            align: 'center',
          },
          {
            title: 'WorkMoney',
            key: 'workQty',
            align: 'center',
          },
          {
            title: '员工号1',
            key: 'empId1',
            align: 'center',
          },
          {
            title: '员工号2',
            key: 'empId2',
            align: 'center',
          },
          {
            title: '员工号3',
            key: 'empId2',
            align: 'center',
          },
          {
            title: '产量1',
            key: 'workQty1',
            align: 'center',
          },
          {
            title: '产量2',
            key: 'workQty2',
            align: 'center',
          },
          {
            title: '产量3',
            key: 'workQty2',
            align: 'center',
          },
          {
            title: '当前长度1',
            key: 'currentLength1',
            align: 'center',
          },
          {
            title: '当前长度2',
            key: 'currentLength2',
            align: 'center',
          },
          {
            title: '当前长度3',
            key: 'currentLength3',
            align: 'center',
          },
          {
            title: '登记产量时间1',
            key: 'workQty1Time',
            align: 'center',
          },
          {
            title: '登记产量时间2',
            key: 'workQty2Time',
            align: 'center',
          },
          {
            title: '登记产量时间3',
            key: 'workQty3Time',
            align: 'center',
          },
        ],
        activeStep:0,
        cardNumber:null,
        companyId:10000015,
        warpCardData:{

        },
        showSubmitTable:false,
        showPrintTable:false,
      }
    },
    methods:{
      prevStep(){
        let step = this.activeStep - 1;
        this.checkStep(step);
      },
      nextStep(){
        let step = this.activeStep + 1;
        this.checkStep(step);
      },
      checkStep(){
        this.showSubmitTable = true;
      },
      getDataByCardNumber(barCode){
        let data = {};
        data.barCode = barCode;
        data.companyId = this.companyId;
        let url = "/warp/selectZj";
        warp_api(url, data)
          .then(response => {
            //console.log(response);
            this.warpCardData = response.data.data[0];
            this.warpInfoData = response.data.data;
            this.activeStep = 1;
          })
          .catch(error => {
            console.log(error);
          });
      },
      closeSubmitTable(emitData){
        if(emitData.status === "shift"){
          let data = {};
          data.wrap_plan_id = this.warpCardData.wrap_plan_id;
          data.machine_id = this.warpCardData.machineId;
          data.produce_user_id = emitData.data.staff_id;
          data.yield = emitData.data.finished_meter;
         let url = "/api/produce/addWarpUser";
          produce_api(url, data,this.companyId)
            .then(response => {
              //console.log(response);
            })
            .catch(error => {
              console.log(error);
            });
        }
        this.activeStep = emitData.step;
        this.showSubmitTable = false;
      },
      openPrintTable(){
        this.showPrintTable = true;
        this.$nextTick(() => {
          this.$refs.warpCardPrint.startPrint(this.warpInfoData);
        })
      },
      clickStep(step){
        this.checkStep(step);
      },
      selectRow(currentRow){
        this.warpCardData = [];
        this.warpCardData = currentRow;
      }
    },
    mounted() {
      document.querySelector('body').setAttribute('style', 'background-color:rgba(240,240,240,0.9)');//设置背景色
      this.getDataByCardNumber("QJJS20200102001");
    },
    destroyed() {

    }
  }
</script>

<style lang="less">
  .rightTableTd{
    width: 250px;
    height: 33.3px;
  }
  .el-input__inner{
    height: 80px;
  }
  .el-dialog{
    display: flex;
    flex-direction: column;
    margin:0 !important;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    /*height:600px;*/
    max-height:calc(100% - 30px);
    max-width:calc(100% - 30px);
  }
  .el-dialog .el-dialog__body{
    flex:1;
    overflow: auto;
  }
</style>
