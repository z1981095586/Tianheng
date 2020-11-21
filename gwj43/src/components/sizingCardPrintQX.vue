<template>
  <div>
    <div style="width: 600px;">
      <button  v-print="'#printTable'">vuePrint打印</button>
      <button  @click="printPdf">lodop打印</button>
    </div>
    <div style="text-align: center" id="printTable" >
      <table  cellspacing='0' cellpadding='0' width="100%" style="">
        <tr style="height: 50px">
          <td colspan="2" style="width: 30%">
            &nbsp
          </td>
          <td colspan="2" style="width: 10%">
            <!--<el-row>-->
            <!--<el-col>-->
            <!--<svg id="barcode"></svg>-->
            <!--</el-col>-->
            <!--</el-row>-->
          </td>
          <td style="width: 60%;text-align: left;height: 50px;">
            <p style="font-size: 32px;font-weight: bolder">{{companyName}}</p>
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <table cellspacing='0' cellpadding='0' width="100%" border="2">
              <tr>
                <td width="20%">
                  机台号
                </td>
                <td width="13%">

                </td>
                <td width="13%">
                   品种
                </td>
                <td width="13%">

                </td>
                <td width="13%" colspan="3">
                   纬密
                </td>
                <td width="28%" colspan="5" style="text-align: right">
                   纬/时
                </td>
              </tr>
              <tr>
                <td rowspan="4" width="20%">
                  纬纱
                </td>
                <td colspan="3" style="text-align: left" width="39%">
                  道1：
                </td>
                <td colspan="8" width="51%">
                  组织图
                </td>
              </tr>
              <tr v-for="indexTr in 3">
                <td colspan="3" style="text-align: left"  width="39%">
                  道{{indexTr+1}}：
                </td>
                <td v-for="indexTd in 8" width="5%">
                   &nbsp
                </td>
              </tr>
              <tr>
                <td>
                  地组织穿法
                </td>
                <td colspan="3" >

                </td>
                <td v-for="indexTd in 8" width="5%">
                  &nbsp
                </td>
              </tr>
              <tr>
                <td>
                  边组织穿法
                </td>
                <td colspan="3" >

                </td>
                <td v-for="indexTd in 8" width="5%">
                  &nbsp
                </td>
              </tr>
              <tr>
                <td>
                  度边穿法
                </td>
                <td colspan="3" >

                </td>
                <td v-for="indexTd in 8" width="5%">
                  &nbsp
                </td>
              </tr>
              <tr>
                <td>
                  落布长度
                </td>
                <td>

                </td>
                <td>
                  筘号
                </td>
                <td>

                </td>
                <td v-for="indexTd in 8" width="5%">
                  &nbsp
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  操作质量提示
                </td>
                <td v-for="indexTd in 8" width="5%">
                  &nbsp
                </td>
              </tr>
              <tr>
                <td colspan="4" rowspan="6">

                </td>
                <td colspan="8" style="text-align: left">
                  组长签名：
                </td>
              </tr>
              <tr>
                <td colspan="8"  style="text-align: left">
                  机修工签名：
                </td>
              </tr>
              <tr>
                <td colspan="8"  style="text-align: left">
                  运转质量员复查：
                </td>
              </tr>
              <tr>
                <td colspan="8" style="text-align: left">
                  白班质量员复查：
                </td>
              </tr>
              <tr>
                <td colspan="8"  style="text-align: left">
                  设备质量员复查：
                </td>
              </tr>
              <tr>
                <td colspan="8"  style="text-align: left">
                  运转主任复查：
                </td>
              </tr>
              <tr>
                <td colspan="12" style="height:48px">
                  <p style="font-size: 24px"> 织轴卡</p>
                </td>
              </tr>
              <tr>
                <td>
                  浆纱机
                </td>
                <td>
                  品种
                </td>
                <td>
                  轴号
                </td>
                <td>
                  总经根数
                </td>
                <td colspan="4">
                  浆纱匹长
                </td>
                <td colspan="4">
                  轴次
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="4"></td>
                <td colspan="4"></td>
              </tr>
              <tr>
                <td>
                  经纱支数
                </td>
                <td>
                  经纱产地
                </td>
                <td>
                  浆纱日期
                </td>
                <td>
                  浆纱班别
                </td>
                <td colspan="4">
                  穿综姓名
                </td>
                <td colspan="4">
                  穿综幅宽
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="4"></td>
                <td colspan="4"></td>
              </tr>
              <tr>
                <td>
                  上轴日期
                </td>
                <td>
                  上轴质量
                </td>
                <td>
                  结经日期
                </td>
                <td>
                  结经质量
                </td>
                <td colspan="8">
                  穿综质量
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="8"></td>
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
          sizingInfoData:[],
          headData:{
            orderSheetPlan:{}
          },
          companyId:null,
          companyName:"浙江鑫海纺织有限公司"
        }
      },
      methods:{
        startPrint(sizingInfoData,sizingDataSelect,companyId,companyName){
         //  console.log(companyName);
         //  console.log(sizingDataSelect);
          this.headData = sizingInfoData;
          this.headData.workerId = sizingDataSelect.staff_name;
          this.sizingInfoData = sizingDataSelect;
          if(this.sizingInfoData.lmWarpPlanB){
            this.sizingInfoData.yarnWeaving = this.sizingInfoData.lmWarpPlanB.yarnWeaving
          }
          this.companyId = companyId;
          this.companyName = companyName;
          if(this.sizingInfoData.endDate){
            this.sizingInfoData.finishDate = this.sizingInfoData.endDate.slice(0,10);
          }
          this.headData.date = this.getDate();
          // JsBarcode("#barcode",this.sizingInfoData.printCode,{
          //   height:30,
          //   width:1,
          //   textAlign:"left",
          //   fontSize:14,
          // });
          this.print();
        },
        print(){
          let count = LODOP.GET_PRINTER_COUNT();
          let printerList = [];
          for (let i = 0; i < count; i++) {
            //根据设备序号获取设备名
           // console.log(LODOP.GET_PRINTER_NAME(i));
            let name = LODOP.GET_PRINTER_NAME(i);
            if(name.indexOf("HP LaserJet 1020")>-1||name.indexOf("HP LaserJet 1022")>-1){
              printerList.push(name)
            }
          }
          // console.log(printerList);
          for (let i = 0; i < printerList.length; i++) {
            this.$nextTick(() => {
              this.printPdf(printerList[i]);
            })
          }
        },
        getDate(){
          let date = new Date();
          let year=date.getFullYear();
          let month=date.getMonth()+1;
          let day=date.getDate();
          return year + "-" + month + "-" + day;
        },
        printPdf(printerName) {
          console.log(printerName);
          let  LODOP = getLodop();
          // let pageHeight = this.printConfig.printHeight * 100;
          // let pageWidth = this.printConfig.printWidth * 100;
          let strBodyStyle = "<style>td{ text-align: center;font-size: 14px;height: 24px}</style>";
          let strFormHtml = strBodyStyle+"<body>" +document.getElementById("printTable").innerHTML +"</body>";
        //  console.log(strFormHtml);
          LODOP.PRINT_INIT("浆纱卡");
          LODOP.SET_PRINTER_INDEX(printerName);
          //LODOP.SET_PRINTER_INDEX("HP LaserJet 1020 (副本 1)");
          LODOP.ADD_PRINT_HTM("12%","3%", "97%", "97%",
            strFormHtml);
          LODOP.ADD_PRINT_BARCODE(20, 25, 115, 115, "QRCode",  this.sizingInfoData.printCode);
          LODOP.ADD_PRINT_BARCODE(20, 220, 270, 60, "128B",  this.sizingInfoData.printCode);
         // LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Full-page");
          LODOP.SET_PRINT_PAGESIZE(1,0,0,"A5");
          // LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1);
          if(this.$store.state.openOutline){
            LODOP.PREVIEW();
          }else{
            LODOP.PRINT();
          }
          //this.printed();
        },
        printed(){
          let data = {};
          data.id = this.sizingInfoData.id;
          let url = "/warp/b/printingJs";
          warp_api(url,data,this.companyId)
            .then(response => {
              //console.log(response);
              this.$message.success("打印成功");
              this.$emit('printFinished');
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      mounted() {
        this.companyId = this.$route.params.params.split(",")[1];
      },
      destroyed() {

      }
    }
</script>

<style lang="less">
#printTable td{
  text-align: center;
  height: 60px;
  font-size: 20px;
}
</style>
