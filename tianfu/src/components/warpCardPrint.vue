<template>
  <div>
    <div style="width: 600px;">
      <button  v-print="'#printTable'" @click="printed">vuePrint打印</button>
      <button  @click="printPdf">lodop打印</button>
    </div>
    <div style="text-align: center" id="printTable" >
      <table  cellspacing='0' cellpadding='0' width="100%">
        <tr>
          <td style="width: 25%">
            &nbsp
          </td>
          <td colspan="2" style="width: 50%;text-align: center;height: 1cm">
            <p style="font-size: 20px">经轴卡</p>
          </td>
          <td style="width: 25%">
            <!--<el-row>-->
              <!--<el-col>-->
                <!--<svg id="barcode"></svg>-->
              <!--</el-col>-->
            <!--</el-row>-->
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <table cellspacing='0' cellpadding='0' border="1" width="96%" style="margin-left: 2%" >
              <tr>
                <td width="120px">机台号</td>
                <td width="120px">{{warpInfoData.axisInfo.machineId}}</td>
                <td width="120px">轴号</td>
                <td width="120px">{{warpInfoData.axisNo}}</td>
              </tr>
              <tr>
                <td>品名</td>
                <td>{{headData.orderSheetPlan.productName}}</td>
                <td>头份</td>
                <td>{{warpInfoData.axisInfo.totalWarpNumber}}</td>
              </tr>
              <tr>
                <td colspan="2">总经根数</td>
                <td colspan="2">{{headData.orderSheetPlan.rootNumber}}</td>
              </tr>
              <tr>
                <td>纱支</td>
                <td colspan="3">{{warpInfoData.axisInfo.yarnWeaving}}</td>
              </tr>
              <tr>
                <td>长度</td>
                <td>{{warpInfoData.actualYarnLength}}M</td>
                <td>员工</td>
                <td>{{warpInfoData.staff_name}}</td>
              </tr>
              <tr>
                <td>班次</td>
                <td></td>
                <td>日期</td>
                <td>{{headData.date}}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </div>

</template>

<script>
  import JsBarcode from 'jsbarcode';
  import { warp_api } from "../../static/api/api.js";
  import {getLodop} from './LodopFuncs'
    export default {
      data () {
        return {
          warpInfoData:{
            axisInfo:{}
          },
          headData:{
            orderSheetPlan:{}
          },
          companyId:null
        }
      },
      methods:{
        startPrint(warpInfoData,warpDataSelect,companyId){
          console.log(warpDataSelect);
          this.headData = warpInfoData;
          this.warpInfoData = warpDataSelect;
          this.companyId = companyId;
          this.headData.date = this.getDate();
          // JsBarcode("#barcode",this.headData.barCode,{
          //   height:30,
          //   width:1,
          //   textAlign:"left",
          //   fontSize:14,
          // });
          this.print();
        },
        print(){
          this.$nextTick(() => {
            this.printPdf();
            this.$store.state.showLoadingLog = false;
          })
        },
        getDate(){
          let date = new Date();
          let year=date.getFullYear();
          let month=date.getMonth()+1;
          let day=date.getDate();
          return year + "-" + month + "-" + day;
        },
        printPdf() {
          let  LODOP = getLodop();
          let pageHeight = "6cm";
          let pageWidth = "8cm";
          let strBodyStyle = "<style>td{ text-align: center;font-size: 14px;}</style>";
          let strFormHtml = strBodyStyle+"<body>" +document.getElementById("printTable").innerHTML +"</body>";
          LODOP.PRINT_INIT("流水单");
          LODOP.ADD_PRINT_BARCODE(5, 5, 55, 55, "QRCode",  this.warpInfoData.printCode);
          LODOP.SET_PRINT_STYLEA(0,"AngleOfPageInside",-90);
          LODOP.ADD_PRINT_BARCODE(5, 66, 230, 43, "128B",  this.warpInfoData.printCode);
          LODOP.ADD_PRINT_HTM("16mm","0mm", pageWidth, pageHeight,
            strFormHtml);
          LODOP.SET_PRINT_PAGESIZE(2,pageWidth,pageHeight,"");
          if(this.$store.state.openOutline){
            LODOP.PREVIEW();
          }else{
            LODOP.PRINT();
          }
          // LODOP.PREVIEW();
          //this.printed();
        },
        printed(){
          this.$emit('printFinished');
        }
      },
      mounted() {

      },
      destroyed() {

      }
    }
</script>

<style lang="less">
#printTable td{
  text-align: center;
  height: 50px;
  font-size: 20px;
}
</style>
