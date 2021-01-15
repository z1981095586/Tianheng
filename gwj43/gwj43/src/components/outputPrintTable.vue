<template>
    <div style="width: 900px" >
      <div>
        <button  v-print="'#printTable'">vuePrint打印</button>
        <button  @click="printPdf">lodop打印</button>
      </div>
      <div id="printTable">
        <table  cellspacing='0' cellpadding='0' width="100%">
          <tr>
            <td colspan="2" width="250px">
              <svg id="barcode"></svg>
            </td>
            <td colspan="2" style="text-align: center" width="400px">
              <p style="font-size: 30px">浆纱生产记录表</p>
            </td>
            <td colspan="2" style="text-align: right" width="250px">
              <p style="font-size: 14px">{{date}}</p>
            </td>
          </tr>
          <tr>
            <td colspan="6">
              <table id="mainTable" cellspacing='0' cellpadding='0' width="100%"  border="1">
                <tr>
                  <td width="100px">机台</td>
                  <td width="200px">品种名称</td>
                  <td width="140px">整经总长度</td>
                  <td width="140px">总经根数</td>
                  <td width="320px" colspan="2">经轴组合</td>
                </tr>
                <tr style="height: 40px">
                  <td>{{warpInfoData.machineId}}</td>
                  <td>{{headData.nameC}}</td>
                  <td>{{warpInfoData.beamFixedLength}}</td>
                  <td></td>
                  <td colspan="2"></td>
                </tr>
                <tr style="height: 40px">
                  <td>经纱排列</td>
                  <td colspan="5"></td>
                </tr>
                <tr>
                  <td colspan="6">经纱信息</td>
                </tr>
                <tr>
                  <td width="100px">序号</td>
                  <td width="340px" colspan="2">纱线名称</td>
                  <td width="140px">产地</td>
                  <td width="180px">批次</td>
                  <td width="140px">头份</td>
                </tr>
                <tr>
                  <td width="80px">A</td>
                  <td width="300px" colspan="2"></td>
                  <td width="120px"></td>
                  <td width="250px"></td>
                  <td width="150px"></td>
                </tr>
                <tr>
                  <td width="80px">轴号</td>
                  <td width="180px">班次员工号</td>
                  <td width="120px">头份(根)</td>
                  <td width="120px">长度(M)</td>
                  <td width="250px">时间</td>
                  <td width="150px">产量合计</td>
                </tr>
                <tr v-for="index in 1" >
                  <td width="80px">{{headData.axisNo}}</td>
                  <td width="180px">{{workerId}}</td>
                  <td width="120px"></td>
                  <td width="120px">{{headData.workQty1}}</td>
                  <td width="250px">{{headData.workQty1Time}}</td>
                  <td width="150px" rowspan="20" v-if="index === 1">产量合计</td>
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
  import {getLodop} from './LodopFuncs'
  export default {
    data () {
      return {
        sheetSeries:"Z20010201",
        date:null,
        headData:[],
        warpInfoData:[],
        workerId:null
      }
    },
    methods:{
      startPrint(warpInfoData,selectData){
         console.log(warpInfoData);
        this.headData = selectData;
        this.warpInfoData = warpInfoData;
        JsBarcode("#barcode",this.headData.sheetSeries,{
          height:40,
          textAlign:"left",
          fontSize:14,
        });
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
        let pageHeight = "21cm";
        let pageWidth = "29.7cm";
        let strBodyStyle = "<style>td{ text-align: center;}</style>";
        let strFormHtml = strBodyStyle+"<body>" +document.getElementById("printTable").innerHTML +"</body>";
        LODOP.PRINT_INIT("流水单");
        LODOP.ADD_PRINT_HTM("10mm","10mm", "20cm", "28.7cm",
          strFormHtml);
        LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Full-Page");
        LODOP.SET_PRINT_PAGESIZE(2,pageWidth,pageHeight,"");
        // LODOP.PRINT();
        LODOP.PREVIEW();
      },
    },
    mounted() {
      this.date = this.getDate();
    },
    destroyed() {

    }
  }
</script>

<style lang="less">
 #mainTable td{
   text-align: center;
 }
</style>
