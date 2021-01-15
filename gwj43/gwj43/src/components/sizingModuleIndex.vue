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
      <!--<outputPrintTable ref="outputPrintTable" @printFinished="printFinished"></outputPrintTable>-->
    <!--</el-dialog>-->
    <outputPrintTable ref="outputPrintTable" @printFinished="printFinished" style="display: none"></outputPrintTable>
    <el-dialog
      :visible.sync="showSetAxleTable"
      width="764px"
      append-to-body
      :close-on-click-modal="false"
    >
      <setAxleTable @closeSetAxleTable="closeSetAxleTable"></setAxleTable>
    </el-dialog>
    <div style="overflow-x: hidden;position: absolute;width: 100%;height: 100%">
      <div style="height: 100%;overflow-y: auto;overflow-x:hidden ">
        <headComponent ref="headComponent" style="height: 30px"></headComponent>
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
                    <p style="font-size: 24px;display: inline-block">浆纱<br>卡号</p>
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
                  <td colspan="2" style="background-color: #e5e6e9"><p class="small_title">浆纱加工单信息</p></td>
                </tr>
                <tr class="standard_border" style="height: 75%;background-color: #ebecef">
                  <table cellspacing='0' cellpadding='0'>
                    <tr style="">
                      <td class="rightTableTd">
                        <div class="blueInputTitle">加工单号</div>
                        <el-input class="standard_input" style="width: 150px" disabled size="small" v-model="sizingCardData.batchCode"></el-input>
                      </td>
                      <td class="rightTableTd" >
                        <div class="blueInputTitle" >规格</div>
                        <el-input class="standard_input" style="width: 150px" disabled size="small" v-model="sizingCardData.specification"></el-input>
                      </td>
                      <!--<td class="rightTableTd">-->
                        <!--<div class="blueInputTitle">类型</div>-->
                        <!--<el-input class="standard_input" style="width: 150px" size="small"  v-model="sizingCardData.sheetNo"></el-input>-->
                      <!--</td>-->
                      <!--<td class="rightTableTd">-->
                        <!--<div class="inputTitle">客户</div>-->
                        <!--<el-input class="standard_input" style="width: 150px" disabled size="small" v-model="sizingCardData.customer"></el-input>-->
                      <!--</td>-->
                      <td class="rightTableTd">
                        <div class="blueInputTitle" >品名</div>
                        <el-input class="standard_input" style="width: 150px" disabled size="small" v-model="sizingCardData.nameC"></el-input>
                      </td>
                      <!--<td class="rightTableTd">-->
                        <!--<div class="inputTitle">合同号</div>-->
                        <!--<el-input class="standard_input" style="width: 150px" disabled size="small" v-model="sizingCardData.contractId"></el-input>-->
                      <!--</td>-->
                    </tr>
                    <!--<tr>-->
                      <!--<td class="rightTableTd">-->
                        <!--<div class="blueInputTitle">胚布名称</div>-->
                        <!--<el-input class="standard_input" style="width: 150px" size="small" v-model="sizingCardData.clothName"></el-input>-->
                      <!--</td>-->
                      <!--<td class="rightTableTd">-->
                        <!--<div class="inputTitle">颜色</div>-->
                        <!--<el-input class="standard_input" style="width: 150px" disabled size="small" v-model="sizingCardData.color"></el-input>-->
                      <!--</td>-->
                      <!--<td class="rightTableTd">-->
                        <!--<div class="inputTitle">组织</div>-->
                        <!--<el-input class="standard_input" style="width: 150px" size="small" v-model="sizingCardData.organization"></el-input>-->
                      <!--</td>-->
                      <!--<td class="rightTableTd">-->
                        <!--<div class="inputTitle">订单号</div>-->
                        <!--<el-input class="standard_input" style="width: 150px" size="small" v-model="sizingCardData.orderSheetNo"></el-input>-->
                      <!--</td>-->
                    <!--</tr>-->
                    <tr>
                      <!--<td class="rightTableTd">-->
                        <!--<div class="blueInputTitle">客户布号</div>-->
                        <!--<el-input class="standard_input" style="width: 150px" disabled size="small" v-model="sizingCardData.customerClothId"></el-input>-->
                      <!--</td>-->
                      <!--<td class="rightTableTd">-->
                        <!--<div class="blueInputTitle">订单数量</div>-->
                        <!--<el-input class="standard_input" style="width: 150px" disabled size="small" v-model="sizingCardData.orderNum"></el-input>-->
                      <!--</td>-->
                      <td class="rightTableTd">
                        <div class="blueInputTitle">交期</div>
                        <el-input class="standard_input" style="width: 150px" disabled size="small" v-model="sizingCardData.requiredDeliveryDate"></el-input>
                      </td>
                      <td class="rightTableTd">
                        <div class="blueInputTitle">轴长</div>
                        <el-input class="standard_input" style="width: 150px" disabled size="small" v-model="sizingCardData.inlth"></el-input>
                      </td>
                      <td class="rightTableTd">
                        <div class="blueInputTitle" style="width: 120px">浆纱合轴数</div>
                        <el-input class="standard_input" style="width: 130px" disabled size="small" v-model="sizingCardData.axialNumber"></el-input>
                      </td>
                    </tr>
                    <tr>
                      <td class="rightTableTd">
                        <div class="blueInputTitle" style="width: 120px">浆纱机台号</div>
                        <el-input class="standard_input" style="width: 130px" disabled size="small" v-model="sizingCardData.machineId"></el-input>
                      </td>
                      <td class="rightTableTd" colspan="2">
                        <div class="blueInputTitle">备注</div>
                        <el-input class="standard_input" style="width: 350px" disabled size="small" v-model="sizingCardData.notice"></el-input>
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
                    <el-step  @click.native="clickStep(0)" ><p style="font-size: 28px;font-weight: bolder" slot="title">整经轴确认</p></el-step>
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
            <Table border  :columns="sizingInfoColumn" :data="sizingInfoData" height="600" highlight-row @on-current-change="selectRow"></Table>
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
  import outputPrintTable from './sizingCardPrint.vue';
  import setAxleTable from './setAxleTable.vue';
  export default {
    components: {headComponent,footerComponent,outputSubmitTable,outputPrintTable,setAxleTable},
    data () {
      return {
        sizingInfoData:[],
        sizingInfoColumn:[
          {
          title: '序号',
          type:'index',
          align: 'center',
         },
          {
            title: '品种',
            key: 'nameC',
            align: 'center',
          },
          {
            title: '轴号',
            key: 'axisNo',
            align: 'center',
          },
          {
            title: '浆纱定长',
            key: 'workQty',
            align: 'center',
          },
          // {
          //   title: '状态',
          //   key: 'status',
          //   align: 'center',
          // },
          // {
          //   title: '条码',
          //   key: 'batchCode',
          //   align: 'center',
          // },
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
        sizingCardData:{

        },
        showSubmitTable:false,
        showPrintTable:false,
        showSetAxleTable:false,
        sizingDataSelect:[]
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
            this.showSubmitTable = true;
          }else if(step === 3){
            this.openPrintTable();
          }else if(step === 0){
            this.$message.error('施工中');
            this.activeStep = 0;
            this.sizingInfoData = [];
            this.sizingCardData = [];
            this.cardNumber = "";
          }else if(step === 1){
            if(this.sizingDataSelect&&this.sizingDataSelect!==null){
              this.showSetAxleTable = true;
            }else{
              //console.log(this.warpDataSelect);
              this.$message.error('请选择经轴再进行操作');
            }
          }
        }
      },
      getDataByCardNumber(batchCode){
        this.batchCode = batchCode;
        let data = {};
        data.code = 1;
        data.batchCode = batchCode;
        data.companyId = this.companyId;
        // data={
        //   batchCode:"XHJS20200102001",
        //   companyId:this.companyId
        // };
        let url = "/warp/b/selectJs";
        warp_api(url, data)
          .then(response => {
            console.log(JSON.stringify(response.data.data));
            this.sizingCardData = response.data.data[0];
            this.sizingInfoData = response.data.data[0].lmWarpPlanDetails;
            if (response.data.data[0].lmWarpPlanDetails) {
              for (let i = 0; i < response.data.data[0].lmWarpPlanDetails.length; i++) {
                response.data.data[0].lmWarpPlanDetails[i].nameC = response.data.data[0].nameC
              }
            }
            // this.activeStep = 1;
          })
          .catch(error => {
            console.log(error);
          });
      },
      closeSubmitTable(emitData){
        if(emitData.status!==null){
          let data = {};
          data.id = this.sizingDataSelect.id;
          data.machineId = this.sizingDataSelect.machineId;
          data.empIds = emitData.data.staff_id;
          data.workQtys = emitData.data.finished_meter;
          data.typeId = emitData.status;
         let url = "/warp/b/ProductionReportJs";
          warp_api(url, data,this.companyId)
            .then(response => {
              this.getDataByCardNumber(this.batchCode);
            })
            .catch(error => {
              console.log(error);
            });
        }
        this.activeStep = emitData.step +1;
        this.showSubmitTable = false;
      },
      openPrintTable(){
        let data = {};
        data.id = this.sizingDataSelect.id;
        let url = "/warp/b/printingJs";
        warp_api(url,data,this.companyId)
          .then(response => {
            this.sizingDataSelect.printCode = response.data.data;
            this.$nextTick(() => {
              this.$refs.outputPrintTable.startPrint(this.sizingCardData,this.sizingDataSelect,this.companyId);
            })
          })
          .catch(error => {
            console.log(error);
          });
      },
      clickStep(step){
        this.checkStep(step);
      },
      closeSetAxleTable(emitData){
        if(emitData.status){
        let data = {};
        data.id = this.sizingDataSelect.id;
        data.axisNo = emitData.data.axleNumber;
        let url = "/warp/b/weavingSpindleJs";
        warp_api(url, data,this.companyId)
          .then(response => {
            console.log(response);
            this.activeStep = emitData.step +1;
            this.showSetAxleTable = false;
            this.getDataByCardNumber(this.batchCode);
          })
          .catch(error => {
            console.log(error);
          });
        }else{
          this.showSetAxleTable = false;
        }
      },
      changeTitle(){
        this.$nextTick(() => {
          this.$refs.headComponent.changeMainTitle("天衡浆纱刷卡系统");
        });
      },
      selectRow(currentRow){
        this.sizingDataSelect = null;
        this.sizingDataSelect = currentRow;
         console.log(this.sizingDataSelect);
        if (this.sizingDataSelect.status){
          this.activeStep = this.sizingDataSelect.status +1 ;
        }else{
          this.activeStep = 1 ;
        }
      },
      refresh(){
        window.location.reload()
      },
      printFinished(){
        this.activeStep = 4
      }
    },
    mounted() {
      document.querySelector('body').setAttribute('style', 'background-color:rgba(240,240,240,0.9)');//设置背景色
      //this.getDataByCardNumber("XHJS20200102001");
      this.changeTitle()
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
