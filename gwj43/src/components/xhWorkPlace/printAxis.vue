<template>
    <div id="printAxisTable" style="width: 444px;height:630px;text-align: center">
      <table  cellspacing='0' cellpadding='0' border="2" width="100%" style="width: 444px;max-height:630px;text-align: center">
        <tr>
          <td colspan="" style="font-size: 30px">序号</td>
          <td colspan="" style="font-size: 30px">轴号</td>
        </tr>
        <tr v-for="item in all_axis_list" :key="item.id">
           <td width="50%" style="font-size: 22px">{{item.id}}</td>
           <td width="50%"  style="font-size: 22px">{{item.beamName}}</td>
        </tr>
      </table>
      <!--<table  cellspacing='0' cellpadding='0' border="2" width="100%" style="width: 444px;max-height:630px;text-align: center">-->
        <!--<tr>-->
          <!--<td colspan="2" style="font-size: 30px">经轴号</td>-->
        <!--</tr>-->
        <!--<tr v-for="indexTr in all_axis_list_length" :key="indexTr">-->
          <!--<td v-for="indexTd in 2" width="50%" :key="indexTd" style="font-size: 22px" v-if="(indexTd+(indexTr-1)*2-1)<all_axis_list.length">-->
            <!--{{all_axis_list[(indexTr-1)*2+indexTd-1].id + all_axis_list[(indexTr-1)*2+indexTd-1].beamName}}-->
          <!--</td>-->
        <!--</tr>-->
      <!--</table>-->
    </div>
</template>

<script>
  import {getLodop} from './../LodopFuncs'
    export default {
      data () {
        return {
          all_axis_list:[]
        }
      },
      methods:{
        showPrintTable(data){
          this.all_axis_list = data;
          for (let i = 0; i < data.length; i++) {
            this.all_axis_list[i].id = i+1 +"";
          }
          this.$nextTick(()=>{
            this.printPdf();
            this.$store.state.showLoadingLog = false;
          })
        },
        printPdf() {
          let  LODOP = getLodop();
          // let pageHeight = this.printConfig.printHeight * 100;
          let strBodyStyle = "<style>td{ text-align: center;font-size: 22px;}</style>";
          let strFormHtml = strBodyStyle+"<body>" +document.getElementById("printAxisTable").innerHTML +"</body>";
          // let pageWidth = this.printConfig.printWidth * 100;
          LODOP.PRINT_INIT("流水单");
          LODOP.ADD_PRINT_HTM("3%","10%", "80%", "94%",
            strFormHtml);
          // LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Full-page");
          LODOP.SET_PRINT_PAGESIZE(1,0,0,"A5");
          // LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1);
          if(this.$store.state.openOutline){
            LODOP.PREVIEW();
          }else{
            LODOP.PRINT();
          }
        },
      },
      mounted() {

      },
      destroyed() {

      }
    }
</script>

<style lang="less" scoped>

</style>
