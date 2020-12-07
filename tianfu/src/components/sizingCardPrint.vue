<template>
  <div>
    <div style="width: 600px;">
      <button  v-print="'#printTable'">vuePrint打印</button>
      <button  @click="printPdf">lodop打印</button>
    </div>
    <div style="text-align: center" id="printTable" >
      <table  cellspacing='0' cellpadding='0' width="100%" style="">
        <tr style="height: 50px">
          <td colspan="2" style="width: 30%;text-align: left">
            <p style="font-size: 28px;font-weight: bolder;"  v-if="companyId==10000022"> 批号：{{this.headData.supplierCode}}</p>
            <p style="font-size: 28px;font-weight: bolder;" v-if="companyId == 10000015">&nbsp</p>
          </td>
          <td colspan="2" style="width: 70%;text-align: left;height: 50px">
            <p style="font-size: 28px;font-weight: bolder">{{companyName}}</p>
          </td>
          <td style="width: 20%">
            <!--<el-row>-->
              <!--<el-col>-->
                <!--<svg id="barcode"></svg>-->
              <!--</el-col>-->
            <!--</el-row>-->
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <table cellspacing='0' cellpadding='0' width="100%" border="2">
              <tr>
                <td colspan="5">织轴传票</td>
              </tr>
              <tr>
                <td width="100px" >品名</td>
                <td width="240px" colspan="2">{{headData.orderSheetPlan.productName}}</td>
                <td width="100px">完成<br>日期</td>
                <td width="150px"><span v-if="sizingInfoData.endDate">{{sizingInfoData.endDate.substring(0,10)}}</span></td>
              </tr>
              <tr>
              <tr>
                <td width="100px" rowspan="3">浆纱</td>
                <td width="100px">班别</td>
                <td width="150px">&nbsp</td>
                <td width="100px">纱支</td>
                <td width="150px">{{sizingInfoData.yarnWeaving || ""}}</td>
              </tr>
              <tr>
                <td width="100px">轴号</td>
                <td width="150px">{{sizingInfoData.axisNo}}</td>
                <td width="100px">落轴<br>次数</td>
                <td width="150px">{{sizingInfoData.vatNums}}-{{sizingInfoData.beamNums}}</td>
              </tr>
              <tr>
                <td width="100px">米长</td>
                <td width="150px">{{sizingInfoData.actualYarnLength}}M</td>
                <td width="100px">员工号</td>
                <td width="150px">{{headData.workerId}}</td>
              </tr>
              <tr>
                <td width="120px" rowspan="3">穿筘<br>布机</td>
                <td width="100px">穿筘<br>日期</td>
                <td width="150px">&nbsp</td>
                <td width="100px">穿筘<br>工号</td>
                <td width="150px">&nbsp</td>
              </tr>
              <tr>
                <td width="100px">筘号</td>
                <td width="150px">&nbsp</td>
                <td width="100px">运轴<br>工号</td>
                <td width="150px">&nbsp</td>
              </tr>
              <tr>
                <td width="100px">上轴<br>日期</td>
                <td width="150px">&nbsp</td>
                <td width="100px">上轴<br>工号</td>
                <td width="150px">&nbsp</td>
              </tr>
              <tr>
                <td width="100px" rowspan="2">布机<br>结经</td>
                <td width="100px">结经<br>日期</td>
                <td width="150px">&nbsp</td>
                <td width="100px">结经<br>工号</td>
                <td width="150px">&nbsp</td>
              </tr>
              <tr>
                <td width="100px">结经上<br>轴日期</td>
                <td width="150px">&nbsp</td>
                <td width="100px">结经上<br>轴工号</td>
                <td width="150px">&nbsp</td>
              </tr>
              <tr>
                <td rowspan="2" style="height: 200%">
                  备注
                </td>
                <td rowspan="2" colspan="4">
                  &nbsp
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
    <div style="text-align: center" id="printTableQX" >
      <table  cellspacing='0' cellpadding='0' width="100%" style="">
        <tr style="height: 50px">
          <td colspan="2" style="width: 30%">
            &nbsp
          </td>
          <td style="width: 70%;text-align: left;height: 50px;">
            <p style="font-size: 32px;font-weight: bolder">{{companyName}}</p>
          </td>
        </tr>
        <tr>
          <td colspan="13">
            <span style="font-size: 32px;text-align: left;font-weight: bolder">品种：{{headData.orderSheetPlan.productName}}&nbsp&nbsp批号： {{headData.supplierCode}} </span>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <table cellspacing='0' cellpadding='0' width="100%" border="2">
              <tr>
                <td width="12%">
                  机台号
                </td>
                <td width="8%">

                </td>
                <td width="10%">
                  品种
                </td>
                <td width="29%" colspan="2">

                </td>
                <td width="13%" colspan="3">
                  纬密
                </td>
                <td width="28%" colspan="5" style="text-align: right">
                  纬/时
                </td>
              </tr>
              <tr>
                <td rowspan="4" width="20%" colspan="2">
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
                <td  colspan="2">
                  地组织穿法
                </td>
                <td colspan="3" >

                </td>
                <td v-for="indexTd in 8" width="5%">
                  &nbsp
                </td>
              </tr>
              <tr>
                <td  colspan="2">
                  边组织穿法
                </td>
                <td colspan="3" >

                </td>
                <td v-for="indexTd in 8" width="5%">
                  &nbsp
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  度边穿法
                </td>
                <td colspan="3" >

                </td>
                <td v-for="indexTd in 8" width="5%">
                  &nbsp
                </td>
              </tr>
              <tr>
                <td  colspan="2">
                  落布长度
                </td>
                <td>

                </td>
                <td width="12%">
                  筘号
                </td>
                <td width="8%">

                </td>
                <td v-for="indexTd in 8" width="5%">
                  &nbsp
                </td>
              </tr>
              <tr>
                <td colspan="5">
                  操作质量提示
                </td>
                <td v-for="indexTd in 8" width="5%">
                  &nbsp
                </td>
              </tr>
              <tr>
                <td colspan="5" rowspan="6">

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
                <td colspan="13" style="height:32px">
                  <p style="font-size: 24px"> 织轴卡</p>
                </td>
              </tr>
              <tr>
                <td>
                  浆纱机
                </td>
                <td  colspan="2">
                  品种
                </td>
                <td>
                  轴号
                </td>
                <td colspan="3">
                  总经根数
                </td>
                <td colspan="3">
                  浆纱匹长
                </td>
                <td colspan="3">
                  轴次
                </td>
              </tr>
              <tr>
                <td>{{headData.machineId}}</td>
                <td colspan="2">{{headData.orderSheetPlan.productName}}</td>
                <td>{{sizingInfoData.axisNo}}</td>
                <td colspan="3">{{headData.orderSheetPlan.rootNumber}}</td>
                <td colspan="3">{{sizingInfoData.actualYarnLength}}M</td>
                <td colspan="3"></td>
              </tr>
              <tr>
                <td  colspan="3">
                  经纱厂家/支数
                </td>
                <td>
                  浆纱姓名
                </td>
                <td colspan="3">
                  浆纱日期
                </td>
                <td colspan="3">
                  穿综姓名
                </td>
                <td colspan="3">
                  穿综幅宽
                </td>
              </tr>
              <tr>
                <td colspan="3">{{sizingInfoData.yarnWeaving}}</td>
                <td>{{$store.state.staff_name}}</td>
                <td colspan="3">{{sizingInfoData.endDate.substring(0,10)}}&nbsp{{$store.state.shiftName}}</td>
                <td colspan="3"></td>
                <td colspan="3"></td>
              </tr>
              <tr>
                <td>
                  上轴日期
                </td>
                <td colspan="2">
                  上轴质量
                </td>
                <td>
                  结经日期
                </td>
                <td colspan="3">
                  结经质量
                </td>
                <td colspan="6">
                  穿综质量
                </td>
              </tr>
              <tr>
                <td style="height: 70px"></td>
                <td colspan="2"></td>
                <td></td>
                <td colspan="3"></td>
                <td colspan="6"></td>
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
           console.log(sizingDataSelect);
           console.log(sizingInfoData);
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
          //console.log(printerName);
          let  LODOP = getLodop();
          if(this.companyId*1.0 === 10000012){
            let strBodyStyle = "<style>td{ text-align: center;font-size: 14px;height: 24px;font-weight: bolder}</style>";
            let strFormHtml = "";
            strFormHtml = strBodyStyle+"<body>" +document.getElementById("printTableQX").innerHTML +"</body>";
            LODOP.PRINT_INIT("浆纱卡");
            LODOP.SET_PRINTER_INDEX(printerName);
            //LODOP.SET_PRINTER_INDEX("HP LaserJet 1020 (副本 1)");
            LODOP.ADD_PRINT_HTM("6%","3%", "97%", "97%", strFormHtml);
          //  LODOP.ADD_PRINT_TEXT(60,50,250,50,"品种：" + this.headData.orderSheetPlan.productName);
            LODOP.ADD_PRINT_BARCODE(5, 25, 100, 100, "QRCode",  this.sizingInfoData.printCode);
            LODOP.ADD_PRINT_BARCODE(5, 220, 270, 40, "128B",  this.sizingInfoData.printCode);
            // LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Full-page");
            LODOP.SET_PRINT_PAGESIZE(1,0,0,"A5");
            // LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1);
          }else{
            let strBodyStyle = "<style>td{ text-align: center;font-size: 22px;height: 50px}</style>";
            let strFormHtml = strBodyStyle+"<body>" +document.getElementById("printTable").innerHTML +"</body>";
            LODOP.PRINT_INIT("浆纱卡");
            LODOP.SET_PRINTER_INDEX(printerName);
            //LODOP.SET_PRINTER_INDEX("HP LaserJet 1020 (副本 1)");
            LODOP.ADD_PRINT_HTM("12%","3%", "97%", "97%", strFormHtml);
            LODOP.ADD_PRINT_BARCODE(20, 25, 105, 105, "QRCode",  this.sizingInfoData.printCode);
            LODOP.ADD_PRINT_BARCODE(20, 180, 340, 75, "128B",  this.sizingInfoData.printCode);
            // LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Full-page");
            LODOP.SET_PRINT_PAGESIZE(1,0,0,"A5");
            // LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1);
          }
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
