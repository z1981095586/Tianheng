<template>
    <div>
      <!-------------------打印区-落布明细---------------------->
      <div style="text-align: center;font-size: 12px; display: none" v-for="(item,index) in printData" :class="'printCloths' + index">
        <table border="1" border-color="gray" width="260" cellspacing="0" cellpadding="1" style="font-size: 12px; margin-bottom: 1px; text-align: center; line-height: 14px;text-transform: uppercase;"  :key="'printData'+index">
          <!--<caption align="top" style="font-size: 14px; font-weight: bold">落布卡</caption>-->
          <tr>
            <td style="width: 70px;">品名</td>
            <td colspan=4 >{{orderData.productName}}</td>
          </tr>
          <tr>
            <td style="width: 70px">织机号</td>
            <td colspan=4>{{orderData.machineAxis || ""}}</td>
          </tr>
          <tr>
            <td style="width: 70px">员工号</td>
            <td colspan=4>{{item.staff_id || ""}}</td>
          </tr>
          <tr>
            <td style="width: 70px">每卷米数</td>
            <td colspan=4>{{item.yieldMeterSemi || ""}}</td>
          </tr>
          <tr>
            <td style="width: 70px">卷号</td>
            <td>{{item.print_count || ""}}</td>
            <td style="width: 60px">轴号</td>
            <td>{{item.axisNo || ""}}</td>
          </tr>
          <tr>
            <td style="width: 70px;text-transform: uppercase">纬纱批号</td>
            <td >{{orderData.supplierCode}}</td>
            <td style="width: 60px;text-transform: uppercase">纬纱产地</td>
            <td >{{orderData.supplierName}}</td>
          </tr>
          <tr>
            <td style="width: 70px;text-transform: uppercase">经纱批号</td>
            <td >{{orderData.ZjwarpsupplierCode}}</td>
            <td style="width: 60px;text-transform: uppercase">经纱产地</td>
            <td >{{orderData.ZjwarpsupplierName}}</td>
          </tr>
          <!--<tr>-->
          <!--<td>备注</td>-->
          <!--<td colspan=4>{{item.notice || ""}}</td>-->
          <!--</tr>-->
          <tr>
            <td style="width: 70px">班次</td>
            <td style="width: 40px"></td>
            <td style="width: 60px">日期</td>
            <td style="width: 80px">{{todayDate}}</td>
          </tr>


        </table>
      </div>
    </div>
</template>

<script>
  import {getLodop} from "../LodopFuncs";
  import { common_api } from "../../../static/api/api.js";
    export default {
      data () {
        return {
          printData:[],
          orderData:{},
          todayDate:"",
          printMode:1
        }
      },
      methods:{
        getData(orderData,printData,printMode){
          console.log(orderData);
          if(printMode === 0){
            this.printMode = printMode;
          }
          this.orderData = orderData;
          this.printData = printData;
          console.log(printData);
          console.log(orderData);
          let count = LODOP.GET_PRINTER_COUNT();
          let printerList = [];
          if(count ===0 ){
            this.$message.error( "未连接打印机,请重新连接打印机")
          }
          else{
            for (let i = 0; i < count; i++) {
              //根据设备序号获取设备名
              let name = LODOP.GET_PRINTER_NAME(i);
              if(name.indexOf("Gprinter GP-1524T")>-1){
                printerList.push(name)
              }
            }
          }
          // console.log(printerList);
          for (let i = 0; i < printerList.length; i++) {
            this.$nextTick(()=>{
              this.print(printerList[i]);
              this.$store.state.showLoadingLog = false;
              // this.savePrintCount();
            })
          }
          this.savePrintStatus();
        },
        print(printerName) {
         // console.log("打印数据，printData为", this.printData);
          const LODOP = getLodop();
          //打印初始化
          LODOP.PRINT_INIT("布票");
          // LODOP.PRINT_INITA(0,0,522,333,"打印鑫海落布表");
         // console.log("printData2", this.printData);
          for(let i = 0; i < this.printData.length; i++){
            //设定纸张大小
            LODOP.SET_PRINT_PAGESIZE(0, 800, 600, '');
            let XHPlanTable = document.querySelector('.printCloths' + i).innerHTML;
            // console.log("XHPlanTable", XHPlanTable);
            //打印二维码
            LODOP.SET_PRINT_STYLE('FontSize', 12);
            LODOP.ADD_PRINT_BARCODE(5, 5, 55, 55, "QRCode", this.printData[i].id);
            //打印条形码
            LODOP.SET_PRINT_STYLE('FontSize', 12);
            LODOP.ADD_PRINT_BARCODE(5, 66, 240, 43, "128B", this.printData[i].id);
            //打印标题
            // LODOP.SET_PRINT_STYLE('FontSize', 18);
            // LODOP.SET_PRINT_STYLE('Bold', 1);
            // LODOP.ADD_PRINT_TEXT(75, 300, 200, 30, "鑫海织造计划表");
            //设置默认打印机
            LODOP.SET_PRINTER_INDEX(printerName);
            // LODOP.SET_PRINTER_INDEX("Gprinter GP-1524T (副本 1)");
            //打印标题
            //LODOP.SET_PRINT_STYLE('FontSize', 12);
            //LODOP.SET_PRINT_STYLE('Bold', 1);
           // LODOP.ADD_PRINT_TEXT(60,50,250,50,"落布卡 打印次数: " + this.printData[i].print_count);
            //打印表格
            LODOP.SET_PRINT_STYLE('FontSize', 16);
            LODOP.ADD_PRINT_HTM(69, 20, 600, 600, XHPlanTable);
            LODOP.NewPage();
          }
          if(this.$store.state.openOutline){
           //alert(1);
            LODOP.PREVIEW();
          }else{
            LODOP.PRINT();
            //LODOP.PREVIEW();

          }
        },
        savePrintCount(){
          let data = {};
          data.tableName = "lm_warp_plan_b";
          data.query = {
            print_count:this.printData[this.printData.length-1].print_count + 1
          };
          data.updateFields = {
            bar_code:this.orderData.barCode
          };
          common_api("/report/updateSimpleReport", data,this.orderData.companyId)
            .then(response => {
              if(response.data.result === "ok"){
                this.message.success("打印操作已记录")
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        savePrintStatus() {
          if (this.printCode === 0) {
            this.message.success("新增布票成功");
          } else {
            if (this.printData[0].printCode) {
              this.$message.success("打印信息储存成功");

              let data = {};
              data.tableName = "lm_warp_plan_detail";
              data.query = {
                print_status: 0
              };
              data.updateFields = {
                print_code: this.printData[0].printCode
              };
              //console.log(data);
              common_api("/report/updateSimpleReport", data, this.orderData.companyId)
                .then(response => {
                  if (response.data.result === "ok") {
                    this.message.success("打印状态已记录");
                    this.$emit("printReturn")
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            } else {
              this.$message.error("数据存在漏洞，打印信息储存失败，请联系管理员，新增布票请忽略")
            }
          }
        },
        getTodayDate(){
          let day = new Date();
          let YYYY = day.getFullYear().toString();
          let MM = (day.getMonth() + 1).toString();
          if(MM.length === 1){
            MM = "0" + MM
          }
          let DD = day.getDate().toString();
          if(DD.length === 1){
            DD = "0" + DD
          }
          let hh = day.getHours().toString();
          if(hh.length === 1){
            hh = "0" + hh
          }
          let mm = day.getMinutes().toString();
          if(mm.length === 1){
            mm = "0" + mm
          }
          let ss = day.getSeconds().toString();
          if(ss.length === 1){
            ss = "0" + ss
          }
          let data = [];
          data[0] = YYYY + "-" + MM + "-" + DD;
          data[1] = YYYY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
          return data[0]
        }
      },
      mounted() {
         this.todayDate = this.getTodayDate()
      },
      destroyed() {

      }
    }
</script>

<style lang="less" scoped>

</style>
