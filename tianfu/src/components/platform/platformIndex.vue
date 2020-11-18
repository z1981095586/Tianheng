<template>
    <div style="text-align: center;" :style="{backgroundImage: 'url(' + bgPicture + ')'}">
      <div style="height: 80px;width: 100%;">
        <p style="position: absolute;color: white;font-size: 2vw" :style="{left:titleLeft}">纺 织 行 业 互 联 网 平 台</p>
        <p style="position: absolute;color: white;font-size: 1vw;left: 5%;top:3%" >主页展示</p>
        <p style="position: absolute;color: white;font-size: 1vw;left: 10%;top:3%" >数据监控</p>
        <p style="position: absolute;color: white;font-size: 1vw;left: 86%;top:3%" >企业状态</p>
        <p style="position: absolute;color: white;font-size: 1vw;left: 91%;top:3%" >行业指标</p>
      </div>
      <div :style="{height: scrollerHeight,width:scrollerWidth}" style="margin-top: 10px;text-align: center;display: inline-block;vertical-align:top">
        <div :style="{height: scrollerHeightDiv,width:scrollerWidthLeft}" style="display: inline-block;padding: 20px">
          <div id="weightDiv">
            <div>
              <p id="year">年&nbsp</p>
              <p id="month">月&nbsp</p>
              <p id="week">周&nbsp</p>
              <p id="day" style="color: red">日&nbsp</p>
              <p id="senior">&nbsp&nbsp高级</p>
            </div>
            <p style="">日期区间：</p><br>
            <el-date-picker
              v-model="date"
              type="daterange"
              align="right"
              unlink-panels
              style="background-color: transparent;color: white;"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              @change="getChartData"
            >
            </el-date-picker><br>
            <p style="margin-top: 10%">产量权重：</p>
            <input type="text" v-model="output_weight" @change="getChartData">

            </input><br>
            <p style="margin-top: 6%">效率权重：</p>
            <input type="text" v-model="efficiency_weight" @change="getChartData">

            </input><br>
            <p style="margin-top: 6%">质量权重：</p>
            <input type="text" v-model="quality_weight" @change="getChartData">

            </input><br>
            <p style="margin-top: 6%">停机权重：</p>
            <input type="text" v-model="outline_weight" @change="getChartData">

            </input><br>
            <p style="margin-top: 6%">联网权重：</p>
            <input type="text" v-model="inline_weight" @change="getChartData">

            </input><br>
          </div>
        </div>
        <div :style="{height: scrollerHeightDiv,width:scrollerWidthRight}" style="vertical-align:top;display: inline-block;overflow-y:auto;overflow-x:hidden " >
          <table width="98%"  cellspacing='0' cellpadding='0' style="display: inline-block">
            <tr v-for="indexTr in 2" >
              <td  v-for="indexTd in 4" style="text-align: center;width: 15.5vw">
                <div v-if="ifExist(indexTr,indexTd)" style="text-align: center">
                  <div :id="'echarts'+indexTr+indexTd" style="width: 16vw;height: 16vw;margin-top: 20px" >

                  </div>
                  <p style="font-size: 1vw;color: white;margin-top: -50px">{{chartData[(indexTr-1)*4+indexTd-1].name+":"+chartData[(indexTr-1)*4+indexTd-1].scoreDTO.strIScore}}</p>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
</template>
<script>
  import bgPicture from "../../../static/picture/background.png"
  import { platform_api } from "../../../static/api/api.js";
    export default {
        name: "platformIndex",
      data () {
        return {
          scrollerHeight: null,
          scrollerWidth: null,
          scrollerHeightDiv: null,
          scrollerWidthLeft: null,
          scrollerWidthRight: null,
          titleLeft: null,
          output_weight: 5,
          efficiency_weight: 3,
          quality_weight: 3,
          outline_weight: 3,
          inline_weight: 3,
          chartData: [
            {
              companyId: null,
              scoreDTO: {
                score: null
              }
            },
            {
              companyId: null,
              scoreDTO: {
                score: null
              }
            },
            {
              companyId: null,
              scoreDTO: {
                score: null
              }
            },
            {
              companyId: null,
              scoreDTO: {
                score: null
              }
            },
            {
              companyId: null,
              scoreDTO: {
                score: null
              }
            },
            {
              companyId: null,
              scoreDTO: {
                score: null
              }
            }, {
              companyId: null,
              scoreDTO: {
                score: null
              }
            },
            {
              companyId: null,
              scoreDTO: {
                score: null
              }
            },
            {
              companyId: null,
              scoreDTO: {
                score: null
              }
            },
            {
              companyId: null,
              scoreDTO: {
                score: null
              }
            },
            {
              companyId: null,
              scoreDTO: {
                score: null
              }
            },
            {
              companyId: null,
              scoreDTO: {
                score: null
              }
            },
            {
              companyId: null,
              scoreDTO: {
                score: null
              }
            }, {
              companyId: null,
              scoreDTO: {
                score: null
              }
            },
          ],
          bgPicture: bgPicture,
          pickerOptions: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
          date:null
        }
      },
      methods:{
        changeWindow(){
          this.scrollerHeight = (window.innerHeight*0.98 -90) + "px";
          this.scrollerWidth = (window.innerWidth -10) + "px";
          this.scrollerHeightDiv = (window.innerHeight*0.98 -90 -35) +"px";
          this.scrollerWidthLeft = ((window.innerWidth -10)-10)*0.27 +"px";
          this.scrollerWidthRight = ((window.innerWidth -10)-10)*0.72 +"px";
          this.titleLeft = (window.innerWidth -10)/2*0.78 +"px";
        },
        getChartData(){
          let data ={};
          data.startDate = this.date[0];
          data.endDate = this.date[1];
          data.weights = [this.output_weight,this.efficiency_weight,this.quality_weight,this.outline_weight,this.inline_weight];
          let url = "/weight/getScore";
          platform_api(url, data,this.companyId)
            .then(response => {
              console.log(response);
              this.chartData = response.data.data;
              let total = this.chartData.length;
              let rowNumber = 1;
              let colNumber = 1;
              for (let i = 0; i < total; i++) {
                let id= rowNumber+""+colNumber;
                this.printChart(id,this.chartData[i].scoreDTO);
                if(colNumber === 4){
                  colNumber = 1;
                  rowNumber ++;
                }else{
                  colNumber ++;
                }
              }
            })
            .catch(error => {
              console.log(error);
            });

        },
        printChart(id,data){
          let dom = document.getElementById('echarts'+id);
          let myChart = this.echarts.init(dom);
          // 绘制图表
          let option = {
            tooltip: {},
            radar: {
              // shape: 'circle',
              name: {
                textStyle: {
                  fontSize:12,
                  color: '#fff',
                  borderRadius: 3,
                  padding: [3, 5]
                }
              },
              indicator: [
                { name: '产量', max: 100},
                { name: '效率', max: 100},
                { name: '质量', max: 100},
                { name: '停机', max: 100},
                { name: '联网', max: 100},
              ]
            },
            series: [{
              type: 'radar',
              // areaStyle: {normal: {}},
              data: [
                {
                  value: [data.strYieldScore, data.strEfficiencyScore, data.strQualityScore, data.strStopScore, data.strNetMachineCountsScore],
                  name:"统计分数"
                }
              ]
            }]
          };
          myChart.setOption(option)
        },
        ifExist(indexTr,indexTd){
          return !((indexTr-1)*4+indexTd-1>this.chartData.length-1)
        }
      },
      mounted() {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        this.date = [start,end];
        this.changeWindow();
        window.onresize = () => {
          this.changeWindow();
        };
        this.getChartData();
      },
      destroyed() {

      }
    }
</script>

<style scoped>
  #weightDiv p,input{
    display: inline-block;
    color:white;
    font-size: 2vw;
  }
  #weightDiv input{
    width: 9vw;
    background-color: transparent;
    border-color: white;
    padding-left: 2%;
  }

</style>
