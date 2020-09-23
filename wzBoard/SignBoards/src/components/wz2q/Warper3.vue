<template>
    <div class="warpBody">
      <div class="warper">
        <div class="title">
          万舟整经数据看板
        </div>
        <div>
          <el-row :gutter="5">
            <el-col :span="12" :key="item.machineId" v-for="item in warp">
              <div class="warp">
                <div class="titleWarp">{{item.machineId}}#整经机</div>
                <div class="tableWarp">
                  <el-row style="margin-top: 1rem;width: 94%;padding-left: 6%">
                    <el-col :span="8"><div class="line"></div></el-col>
                    <el-col :span="8"><div class="headTitle" style="font-size: 1rem;padding: 0">整经设备实时信息</div></el-col>
                    <el-col :span="8"><div class="line"></div></el-col>
                  </el-row>
                  <el-row style="margin-top: 0.1rem">
                    <el-col :span="12"><div class="headTitle">实际长度: {{item.currentLength}}</div></el-col>
                    <el-col :span="12"><div class="headTitle">设定长度: {{item.setLength}} </div></el-col>
                  </el-row>
                  <el-row style="margin-top: 0.1rem">
                    <el-col :span="12"><div class="headTitle">速度: {{item.currentSpeed}}m/min</div></el-col>
                    <el-col :span="12"><div class="headTitle">断头数: {{item.numberBrokenEnds}}
                      <!--<span v-if="item.machineState=='0'">停止</span>-->
                      <!--<span v-else-if="item.machineState=='1'">运行</span>-->
                      <!--<span v-else-if="item.machineState=='2'">点动</span>-->
                      <!--<span v-else-if="item.machineState=='3'">到达长度</span>-->
                      <!--<span v-else-if="item.machineState=='4'">断头停车</span>-->
                      <!--<span v-else-if="item.machineState=='5'">气压故障</span>-->
                      <!--<span v-else-if="item.machineState=='6'">安全保护</span>-->
                      <!--<span v-else-if="item.machineState=='7'">变频报警</span>-->
                    </div>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top: 1rem">
                    <el-col :span="8"><div class="line"></div></el-col>
                    <el-col :span="8"><div class="headTitle" style="font-size: 1rem;padding: 0">最新产出整经信息</div></el-col>
                    <el-col :span="8"><div class="line"></div></el-col>
                  </el-row>
                  <el-row style="margin: 0.2rem 0">
                    <el-col :span="6"><div class="tableText">订单号</div></el-col>
                    <el-col :span="6"><div class="tableText">车间</div></el-col>
                    <el-col :span="6"><div class="tableText">计划长度</div></el-col>
                    <el-col :span="6"><div class="tableText">实际长度</div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6"><div class="tableText">{{item.barCode}}</div></el-col>
                    <el-col :span="6"><div class="tableText">{{item.workshopName}}</div></el-col>
                    <el-col :span="6"><div class="tableText">{{item.inlthTotal}}</div></el-col>
                    <el-col :span="6">
                      <div class="tableText">{{item.workQty}}</div>
                    </el-col>
                  </el-row>
                  <el-row style="margin: 0.2rem 0">
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem">产出时间</div></el-col>
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem">人员</div></el-col>
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem">经轴号</div></el-col>
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem">总经根数</div></el-col>
                  </el-row>
                  <el-row style="margin-bottom: 0.2rem">
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem">{{dateFormat(item.endDate)}}</div></el-col>
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem;width: 100%">{{item.empId}}</div></el-col>
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem">{{item.axisNo}}</div></el-col>
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem">{{item.totalWarpNumber}}</div></el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
      name: "Warper3",
      data(){
        return{
          currentPage: 1, //  el-pagination 初始页
          pagesize: 8,//  el-pagination 每页的数据
          companyId: '10000005',
          warp:[],
          url:'http://120.55.124.53:8226'
          // url:'http://localhost:8226'
        }
      },
      methods:{
        //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
        dateFormat:function(time) {
          if (time!=null && time!==''){
            let date=new Date(time);
            let year=date.getFullYear();
            /* 在日期格式中，月份是从0开始的，因此要加0
             * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
             * */
            let month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
            let day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
            let hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
            let minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
            let seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
            // 拼接
            return month+"-"+day+" "+hours+":"+minutes;
          }
          else
            return '';

        },
        // size-change	pageSize 改变时会触发	每页条数size
        // current-change	currentPage 改变时会触发	当前页currentPage
        handleSizeChange: function(size) {
          this.pagesize = size;
          console.log(this.pagesize) // 每页下拉显示数据
        },
        handleCurrentChange: function(currentPage) {
          this.currentPage = currentPage;
          console.log(this.currentPage);// 点击第几页
        },

        //============表格样式配置================
        //设置表格行的样式
        tableRowStyle1({row,rowIndex}){

            return 'text-align:center !important;' +
              'color:#ffffff !important;background-color:transparent !important;';
        },
        //设置表头行的样式
        tableHeaderColor1({row,column,rowIndex,columnIndex}){
          return 'color:#ffffff !important;text-align:center !important;' +
            'font-size:1rem !important;width:100% !important;border-bottom: 1px solid rgba(0,133,239,0.71) !important;' +
            'padding:0 !important'
        },
        //设置单元格的样式
        tableCellStyle1({row, column, rowIndex, columnIndex}) {
          if (row.deliveryTime<24)
            return 'font-size:1rem;' +
            'color:red !important;' +
            'text-align :center !important;' +
            'border: 1px solid rgba(0,133,239,0.71) !important;' +
            'padding:0.3rem 0!important;';
          else
            return 'font-size:1rem;' +
              'color:white !important;' +
              'text-align :center !important;' +
              'border: 1px solid rgba(0,133,239,0.71) !important;' +
              'padding:0.3rem 0!important;';

        },
        //============表格样式配置================
        getBoardData:function () {
          axios({
            url:this.url+'/warp/getWZBoardWarp?workshopId=4&groupId=3',
            method:'get',

            headers:{
              'Content-Type':'application/json;charset=utf-8',
               companyId: this.companyId
            }
          }).then(response=>{
            this.warp=[];
            let result = response.data.data;
            result = this.sortByKey(result,'machineId');
            this.warp = result;
          })
        },
        //数组对象方法排序:
        sortByKey(array,key){
          return array.sort(function(a,b){
            let x=a[key];
            let y=b[key];
            return ((x<y)?-1:((x>y)?1:0));
          });
        },
        changePage:function () {
          const timer = setInterval(() =>{
            this.$router.push({path:'3'})
          }, 15000);
          // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
          this.$once('hook:beforeDestroy', () => {
            clearInterval(timer);
          })
        },
        getBoardDataTiming:function () {
          const timer = setInterval(() =>{
            this.getBoardData();
          }, 5000);
          // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
          this.$once('hook:beforeDestroy', () => {
            clearInterval(timer);
          })
        }

      },
      mounted(){
        this.getBoardData();
        // this.changePage();
        this.getBoardDataTiming();
      },

    }
</script>

<style scoped>
  .warpBody{
    background-image: url("../../../static/img/wzBack.png");
    background-size: 100% 100%;
    width: 100%;
    overflow: hidden;
    -webkit-overflow-scrolling: unset;
    height: 50rem;
    font-size: 5px;
    margin: 0;
  }
  .warper{
    width: 99%;
    height: 50rem;
    text-align: center;
    color: rgba(0,133,239,0.71);
    margin: 0;
    padding-left: 0.2rem;
    /*background-color: #539cbd;*/
    /*background-color: #37678d;*/
  /*color: rgba(51, 170, 222, 0.61);*/
}
  .title{
    height: 2rem;
    color: white;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    padding-top: 0.4rem;
    width: 100%;
  }
  .warp{
    width: 100%;
    height: 20rem;
    text-align: center;
  }
  .table{
    background: transparent !important;
  }
  .titleWarp{
    color: white;
    font-weight: bolder;
    font-size: 1.3rem;
    line-height: 1.2rem;
    height: 1.2rem;

  }
  .tableWarp{
    background-image: url("../../../static/img/bk2.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 0.8rem;
    height: 16rem;
  }
  .headTitle{
    padding-left: 1.5rem;
    text-align: center;
    font-size: 1.3rem;
    font-weight: bold;
    color: rgb(126, 202, 250);
  }
  .tableText{
    color: rgba(225, 225, 225, 0.99);
    text-align: center;
    font-size: 1.1rem;
    border: 1px solid transparent;
  }
  .line{
    background-color: rgb(126, 202, 250);
    height: 0.1rem;
    margin-top: 0.6rem;
  }


  .page{
    position: absolute;
    text-align: center;
    top: 80%;
    width: 70%;
    border:3px solid rgba(188, 255, 252, 0.71);
    padding-top: 15px;
    padding-bottom: 15px;
    -webkit-box-shadow: 4px 4px rgba(33, 147, 191, 0.67);
    -moz-box-shadow: 4px 4px rgba(33, 147, 191, 0.67);
    box-shadow: 4px 4px rgba(33, 147, 191, 0.67);
    border-radius: 5px;
    background-color: rgba(44, 149, 194, 0.71);
  }



</style>
<style>

  /* 使表格背景透明 */

  .el-table th, .el-table tr {
    background-color: transparent;
  }


  .el-table::before{
    height: 0 !important;
  }
  .el-table::after{
    height: 0 !important;
  }

</style>
