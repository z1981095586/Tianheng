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
    <el-dialog
      :visible.sync="showSetAxleTable"
      width="764px"
      append-to-body
      :close-on-click-modal="false"
    >
      <setAxleTable @closeSetAxleTable="closeSetAxleTable"></setAxleTable>
    </el-dialog>
    <!--<el-dialog-->
      <!--:visible.sync="showPrintTable"-->
      <!--width="940px"-->
      <!--append-to-body-->
      <!--:close-on-click-modal="false"-->
    <!--&gt;-->
      <!--<outputPrintTable ref="outputPrintTable"></outputPrintTable>-->
    <!--</el-dialog>-->
    <!--<el-dialog-->
      <!--:visible.sync="showPrintTable"-->
      <!--width="640px"-->
      <!--append-to-body-->
      <!--:close-on-click-modal="false">-->
      <!--<warpCardPrint ref="warpCardPrint" @printFinished="printFinished"></warpCardPrint>-->
    <!--</el-dialog> -->
    <warpCardPrint ref="warpCardPrint" @printFinished="printFinished" style="display: none"></warpCardPrint>
    <div style="overflow-x: hidden;position: absolute;width: 100%;height: 100%">
      <div style="height: 100%;overflow-y: auto;overflow-x:hidden ">
        <headComponent style="height: 30px"></headComponent>
        <table  class="standard_border" style="height:150px;width:100%;" cellspacing='0' cellpadding='0'>
          <tr>
            <!--左侧刷卡栏-->
            <td style="display: inline-block;width: 20%;height: 100%" class="standard_border">
              <table  cellspacing='0' cellpadding='0' style="width: 100%;height: 100%;border-collapse: collapse;">
                <tr style="height: 25%">
                  <td colspan="2" style="background-color: #e5e6e9;"><p class="small_title" style="display: inline-block;width: 40%">开始刷卡</p>
                    <div style="display: inline-block;text-align: right;width: 55%"><el-button @click="refresh" type="primary"><p style="font-size: 28px">清 空</p></el-button></div>
                  </td>
                </tr>
                <tr class="standard_border" style="height: 75%;background-color: #ebecef">
                  <td width="20%" style="text-align: center">
                    <p style="font-size: 24px;display: inline-block">整经<br>卡号</p>
                  </td>
                  <td>
                    <input v-model="cardNumber" style="display: inline-block;width: 90%;font-size: 30px;height: 80px" @change="getDataByCardNumber(cardNumber)"></input>
                  </td>
                </tr>
              </table>
            </td>
            <!--右侧查询栏-->
            <td style="display: inline-block;width: 80%;height: 100%" class="standard_border">
              <table cellspacing='0' cellpadding='0' style="width: 100%;height: 100%;border-collapse: collapse;">
                <tr style="height: 25%">
                  <td colspan="2" style="background-color: #e5e6e9"><p class="small_title">整经卡信息</p></td>
                </tr>
                <tr class="standard_border" style="height: 75%;background-color: #ebecef">
                  <table cellspacing='0' cellpadding='0'>
                    <tr style="">
                      <td class="rightTableTd">
                        <div class="blueInputTitle">加工单号</div>
                        <el-input class="standard_input" style="width: 150px" disabled size="small" v-model="warpCardData.barCode"></el-input>
                      </td>
                      <td class="rightTableTd">
                        <div class="blueInputTitle">加工日期</div>
                        <el-input class="standard_input" style="width: 150px" disabled size="small" v-model="warpCardData.sheetDate"></el-input>
                      </td>
                      <td class="rightTableTd">
                        <div class="blueInputTitle">要求交期</div>
                        <el-input class="standard_input" style="width: 150px" disabled size="small" v-model="warpCardData.requiredDeliveryDate"></el-input>
                      </td>
                      <!--<td class="rightTableTd">-->
                        <!--<div class="inputTitle">加工类型</div>-->
                        <!--<el-input class="standard_input" style="width: 150px" disabled size="small" v-model="warpCardData.processingType"></el-input>-->
                      <!--</td>-->
                      <!--<td class="rightTableTd">-->
                        <!--<div class="blueInputTitle" style="width: 120px">整经机台号</div>-->
                        <!--<el-input class="standard_input" style="width: 130px" disabled size="small" v-model="warpCardData.machineId"></el-input>-->
                      <!--</td>-->
                    </tr>
                    <tr>
                      <!--<td class="rightTableTd">-->
                        <!--<div class="blueInputTitle">加工类别</div>-->
                        <!--<el-input class="standard_input" style="width: 150px" disabled size="small" v-model="warpCardData.processingCategory"></el-input>-->
                      <!--</td>-->
                      <!--<td class="rightTableTd">-->
                        <!--<div class="inputTitle">联系人</div>-->
                        <!--<el-input class="standard_input" style="width: 150px" disabled size="small" v-model="warpCardData.linkMan"></el-input>-->
                      <!--</td>-->
                      <td class="rightTableTd">
                        <div class="blueInputTitle">品名</div>
                        <el-input class="standard_input" style="width: 150px" disabled size="small" v-model="warpCardData.nameC"></el-input>
                      </td>
                      <td class="rightTableTd">
                      <div class="blueInputTitle">经轴定长</div>
                      <el-input class="standard_input" style="width: 150px" disabled size="small" v-model="warpCardData.inlth"></el-input>
                      </td>
                      <td class="rightTableTd">
                        <div class="blueInputTitle">开轴数</div>
                        <el-input class="standard_input" style="width: 150px" disabled size="small" v-model="warpCardData.totalLength"></el-input>
                      </td>
                    </tr>
                    <tr>
                      <td class="rightTableTd">
                        <div class="blueInputTitle">总根经数</div>
                        <el-input class="standard_input" style="width: 150px" disabled size="small" v-model="warpCardData.rootNumber"></el-input>
                      </td>
                      <td class="rightTableTd">
                        <div class="blueInputTitle">备注</div>
                        <el-input class="standard_input" style="width: 150px" disabled size="small" v-model="warpCardData.notice"></el-input>
                      </td>
                    </tr>
                  </table>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <div  class="standard_border" style="height: 108px;background-color: #f0f0f0;">
          <div style="height: 80px;margin-top: 28px">
            <el-row>
              <el-col :span="2">
                &nbsp
              </el-col>
              <el-col :span="17" >
                <div>
                  <el-steps :active="activeStep" finish-status="success" style="height: 80px;">
                    <el-step  @click.native="clickStep(1)" ><p style="font-size: 28px;font-weight: bolder" slot="title">织轴上机</p></el-step>
                    <el-step  @click.native="clickStep(2)"><p style="font-size: 28px;font-weight: bolder" slot="title">产量报工</p></el-step>
                    <el-step  @click.native="clickStep(3)" ><p style="font-size: 28px;font-weight: bolder" slot="title">打印</p></el-step>
                  </el-steps>
                </div>
              </el-col>
              <el-col :span="5" style="text-align: center">
                <el-button style="" @click="prevStep" :disabled="activeStep===0"><p style="font-size: 28px">上一步</p></el-button>
                <el-button style="" @click="nextStep" :disabled="activeStep===3"><p style="font-size: 28px">下一步</p></el-button>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="standard_border">
          <div  style="background-color: #e5e6e9"><p class="small_title">经轴明细</p></div>
          <div style="background-color: #ffffff;overflow-y: auto;">
            <Table border  :columns="warpInfoColumn" :data="warpInfoData" height="600" highlight-row @on-current-change="selectRow"></Table>
          </div>
        </div>
      </div>
      <!--<footerComponent style="height:5%;"></footerComponent>-->
    </div>
  </div>
</template>

<script>
  import { warp_api,produce_api } from "../../static/api/api.js";
  import headComponent from './head.vue';
  import footerComponent from './footer.vue';
  import outputSubmitTable from './outputSubmitTable.vue';
  import warpCardPrint from './warpCardPrint.vue';
  import setAxleTable from './setAxleTable.vue';
  export default {
    components: {headComponent,footerComponent,outputSubmitTable,warpCardPrint,setAxleTable},
    data () {
      return {
        warpInfoData:[],
        warpInfoColumn:[
          {
            title: '序号',
            type:'index',
            align: 'center',
          },
          {
            title: '品名',
            key: 'nameC',
            align: 'center',
          },
          {
            title: '机台号',
            key: 'aIMachineId',
            align: 'center',
          },
          {
            title: '轴号',
            key: 'axisNo',
            align: 'center',
          },
          {
            title: '纱织',
            key: 'aIYarnWeaving',
            align: 'center',
          },
          {
            title: '头份',
            key: 'totalWarpNumber',
            align: 'center',
          },
          {
            title: '整经定长',
            key: 'workQty',
            align: 'center',
          },
          {
            title: '上机时间',
            key: 'startDate',
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
          // {
          //   title: '员工号3',
          //   key: 'empId3',
          //   align: 'center',
          // },
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
          // {
          //   title: '产量3',
          //   key: 'workQty3',
          //   align: 'center',
          // },
          // {
          //   title: '当前长度1',
          //   key: 'currentLength1',
          //   align: 'center',
          // },
          // {
          //   title: '当前长度2',
          //   key: 'currentLength2',
          //   align: 'center',
          // },
          // {
          //   title: '当前长度3',
          //   key: 'currentLength3',
          //   align: 'center',
          // },
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
          // {
          //   title: '登记产量时间3',
          //   key: 'workQty3Time',
          //   align: 'center',
          // },
        ],
        activeStep:0,
        cardNumber:null,
        companyId:10000015,
        warpCardData:[],
        showSubmitTable:false,
        showPrintTable:false,
        showSetAxleTable:false,
        warpDataSelect:[],
        barCode:null,
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
      checkStep(step){
        if(step - this.activeStep > 1 ||this.activeStep - step> 1){
          this.$message.error('请勿跳过必要步骤');
        }else{
          if(step === 2){
           if(this.activeStep>1){
             this.$message.error('产量报工已完成');
           }else{
             this.showSubmitTable = true;
           }
          }else if(step === 3){
            this.openPrintTable();
          }else if(step === 0){
            this.activeStep--;
            this.warpInfoData = [];
            this.warpDataSelect = null;
            this.cardNumber = "";
          }else if(step === 1){
            if(this.activeStep>0){
              this.$message.error('织轴上机已完成');
            }else{
              if(this.warpDataSelect){
                this.showSetAxleTable = true;
              }else{
                //console.log(this.warpDataSelect);
                this.$message.error('请选择经轴再进行操作');
              }
            }
          }
        }
      },
      getDataByCardNumber(barCode){
        this.barCode = barCode;
        let data = {};
        data.code = 1;
        data.barCode = barCode;
        data.companyId = this.companyId;
        // data={
        //   barCode:"XHZJ20200102001",
        //   companyId:this.companyId
        // };
        let url = "/warp/b/selectZj";
        warp_api(url, data)
          .then(response => {
            //console.log(response);
            this.warpCardData = response.data.data[0];
            this.warpInfoData = response.data.data[0].lmZjwarpPlanDetails;
            this.warpCardData.totalLength = response.data.data[0].lmZjwarpPlanDetails.length;
            if (response.data.data[0].lmZjwarpPlanDetails) {
              for (let i = 0; i < response.data.data[0].lmZjwarpPlanDetails.length; i++) {
                response.data.data[0].lmZjwarpPlanDetails[i].nameC = response.data.data[0].nameC
              }
            }
            // if(this.warpCardData.axisNo){
            //   this.activeStep = 1;
            // }else{
            //   this.activeStep = 0;
            // }
          })
          .catch(error => {
            console.log(error);
          });
      },
      closeSubmitTable(emitData){
        if(emitData.status!==null){
          let data = {};
          data.id = this.warpDataSelect.id;
          data.machineId = this.warpDataSelect.machineId;
          data.empIds = emitData.data.staff_id;
          data.workQtys = emitData.data.finished_meter;
          data.typeId = emitData.status;
         let url = "/warp/b/ProductionReportZj";
          warp_api(url, data,this.companyId)
            .then(response => {
              //console.log(response);
              this.getDataByCardNumber(this.cardNumber);
            })
            .catch(error => {
              console.log(error);
            });
        }
        this.activeStep = emitData.step;
        this.showSubmitTable = false;
      },
      closeSetAxleTable(emitData){
        if(emitData.status!==null){
          let data = {};
          data.id = this.warpDataSelect.id;
          data.axisNo = emitData.data.axleNumber;
          let url = "/warp/b/weavingSpindleZj";
          warp_api(url,data,this.companyId)
            .then(response => {
              console.log(response);
              this.activeStep = emitData.step;
              this.showSetAxleTable = false;
              this.getDataByCardNumber(this.cardNumber);
            })
            .catch(error => {
              console.log(error);
            });
        }else{
          this.showSetAxleTable = false;
        }
      },
      openPrintTable(){
        this.showPrintTable = true;
        this.$nextTick(() => {
          this.$refs.warpCardPrint.startPrint(this.warpCardData,this.warpDataSelect,this.companyId);
        })
      },
      clickStep(step){
        this.checkStep(step);
      },
      selectRow(currentRow){
        this.warpDataSelect = null;
        this.warpDataSelect = currentRow;
       // console.log(this.warpCardData);
        this.activeStep = this.warpDataSelect.status;
      },
      refresh(){
        window.location.reload()
      },
      printFinished(){
        this.activeStep = 3
      }
    },
    mounted() {
      document.querySelector('body').setAttribute('style', 'background-color:rgba(240,240,240,0.9)');//设置背景色
      //this.getDataByCardNumber("XHZJ20200102001");
    },
    destroyed() {

    }
  }
</script>

<style lang="less">
  .rightTableTd{
    width: 20%;
    height: 33.3px;
    white-space: nowrap;
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
  body,td,th {
    font-size: 18px;
  }
</style>
