<template>
  <div>
    <div style="width: 600px;">
      <button  v-print="'#printTable'">vuePrint打印</button>
      <button  @click="printPdf">lodop打印</button>
    </div>
    <div style="text-align: center" id="printTable" >
      <table  cellspacing='0' cellpadding='0' width="100%" style="">
        <tr style="height: 100px">
          <td colspan="2" style="width: 30%">
            &nbsp
          </td>
          <td colspan="2" style="width: 50%;text-align: left">
            <p style="font-size: 20px;font-weight: bolder">浙江鑫海纺织有限公司</p>
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
                <td width="120px" >品名：</td>
                <td width="240px" colspan="2">{{headData.nameC}}</td>
                <td width="120px">日期：</td>
                <td>{{headData.date}}</td>
              </tr>
              <tr>
              <tr>
                <td width="120px" rowspan="3">浆纱</td>
                <td width="120px">班别</td>
                <td width="120px">&nbsp</td>
                <td width="120px">匹数</td>
                <td width="120px">&nbsp</td>
              </tr>
              <tr>
                <td width="120px">轴号</td>
                <td width="120px">{{sizingInfoData.axisNo}}</td>
                <td width="120px">落轴次数</td>
                <td width="120px">&nbsp</td>
              </tr>
              <tr>
                <td width="120px">米长</td>
                <td width="120px">{{sizingInfoData.workQty}}M</td>
                <td width="120px">员工号</td>
                <td width="120px">{{headData.workerId}}</td>
              </tr>
              <tr>
                <td width="120px" rowspan="3">穿筘布机</td>
                <td width="120px">穿筘日期</td>
                <td width="120px">&nbsp</td>
                <td width="120px">穿筘工号</td>
                <td width="120px">&nbsp</td>
              </tr>
              <tr>
                <td width="120px">筘号</td>
                <td width="120px">&nbsp</td>
                <td width="120px">运轴工号</td>
                <td width="120px">&nbsp</td>
              </tr>
              <tr>
                <td width="120px">上轴日期</td>
                <td width="120px">&nbsp</td>
                <td width="120px">上轴工号</td>
                <td width="120px">&nbsp</td>
              </tr>
              <tr>
                <td width="120px" rowspan="2">布机结经</td>
                <td width="120px">结经日期</td>
                <td width="120px">&nbsp</td>
                <td width="120px">结经工号</td>
                <td width="120px">&nbsp</td>
              </tr>
              <tr>
                <td width="120px">结经上轴日期</td>
                <td width="120px">&nbsp</td>
                <td width="120px">结经上轴工号</td>
                <td width="120px">&nbsp</td>
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
          headData:[],
          companyId:null
        }
      },
      methods:{
        startPrint(sizingInfoData,sizingDataSelect,companyId){
          this.headData = sizingInfoData;
          this.headData.workerId = sizingDataSelect.empId1;
          if(sizingDataSelect.empId2){
            this.headData.workerId+=","+sizingDataSelect.empId2;
          }
          this.sizingInfoData = sizingDataSelect;
          this.companyId = companyId;
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
          this.$nextTick(() => {
            this.printPdf();
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
          // let pageHeight = this.printConfig.printHeight * 100;
          // let pageWidth = this.printConfig.printWidth * 100;
          let strBodyStyle = "<style>td{ text-align: center;font-size: 22px;height: 50px}</style>";
          let strFormHtml = strBodyStyle+"<body>" +document.getElementById("printTable").innerHTML +"</body>";
        //  console.log(strFormHtml);
          LODOP.PRINT_INIT("流水单");
          LODOP.ADD_PRINT_HTM("12%","3%", "94%", "94%",
            strFormHtml);
          LODOP.ADD_PRINT_BARCODE(20, 25, 100, 100, "QRCode",  this.sizingInfoData.printCode);
          LODOP.ADD_PRINT_BARCODE(50, 380, 130, 50, "128B",  this.sizingInfoData.printCode);
         // LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Full-page");
          LODOP.SET_PRINT_PAGESIZE(1,0,0,"A5");
          // LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1);
          //LODOP.PRINT();
          LODOP.PREVIEW();
          this.printed();
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
