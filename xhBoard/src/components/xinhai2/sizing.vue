<template>
    <div class="sizingBody">
      <div class="sizing">
        <div class="title">
        </div>
        <el-row :gutter="5">
            <el-col :span="12" :key="item.machineId" v-for="item in warp">
              <div class="warp">
                <div class="titleWarp">{{item.machineId}}#浆纱机</div>
                <div class="tableWarp">
                  <el-row>
                    <el-col :span="12"><div class="headTitle">浆纱实时产量: {{item.actualYarnLength}}</div></el-col>
                    <el-col :span="12"><div class="headTitle">速度: {{item.speed}} m/min</div></el-col>
                  </el-row>
                  <el-row style="margin-top: 0.5rem">
                    <el-col :span="12"><div class="headTitle">前退卷张力: {{item.futension}}</div></el-col>
                    <el-col :span="12"><div class="headTitle">前浆槽温度: {{item.fsttemp}}</div></el-col>
                  </el-row>
                  <el-row style="margin: 0.8rem 0">
                    <el-col :span="9"><div class="tableText">批次号</div></el-col>
                    <el-col :span="6"><div class="tableText">品种</div></el-col>
                    <el-col :span="5"><div class="tableText">总米数</div></el-col>
                    <el-col :span="4"><div class="tableText">完成率</div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="9"><div class="tableText">{{item.batchCode}}</div></el-col>
                    <el-col :span="6"><div class="tableText">{{item.nameC}}</div></el-col>
                    <el-col :span="5"><div class="tableText">{{item.planYieldTotal}}</div></el-col>
                    <el-col :span="4">
                      <div class="tableText" v-if="item.finish>100">100%</div>
                      <div class="tableText" v-else>{{parseInt(item.finish)}}%</div>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top: 1rem">
                    <el-col :span="8"><div class="line"></div></el-col>
                    <el-col :span="8"><div class="headTitle" style="font-size: 1rem;padding: 0">最新完成浆纱信息</div></el-col>
                    <el-col :span="8"><div class="line"></div></el-col>
                  </el-row>
                  <el-row style="margin: 0.8rem 0">
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem">时间</div></el-col>
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem">人员</div></el-col>
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem">品种</div></el-col>
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem">轴号</div></el-col>
                  </el-row>
                  <el-row style="margin-bottom: 1.5rem">
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem" v-show="item.beamName!=null && item.beamName!==''">{{dateFormat(item.endDate)}}</div></el-col>
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem" v-show="item.beamName!=null && item.beamName!==''">{{item.empId}}</div></el-col>
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem" v-show="item.beamName!=null && item.beamName!==''">{{item.nameC}}</div></el-col>
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem" v-show="item.beamName!=null && item.beamName!==''">{{item.beamName}}</div></el-col>
                  </el-row>
                  <el-row style="margin: 0.8rem 0">
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem">实际纱长</div></el-col>
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem">设定纱长</div></el-col>
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem">实际退绕纱长</div></el-col>
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem">设定退绕纱长</div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem" v-show="item.beamName!=null && item.beamName!==''">{{item.workQty}} </div></el-col>
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem" v-show="item.beamName!=null && item.beamName!==''">{{item.yarnLength}}</div></el-col>
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem" v-show="item.beamName!=null && item.beamName!==''">{{item.unwindingLength}}</div></el-col>
                    <el-col :span="6"><div class="tableText" style="font-size: 1rem" v-show="item.beamName!=null && item.beamName!==''">{{item.setUnwindingLength}}</div></el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
          </el-row>
      </div>
    </div>
</template>

<script>
    export default {
      name: "sizing",
      data(){
        return{
          currentPage: 1, //  el-pagination 初始页
          pagesize: 8,//  el-pagination 每页的数据
          companyId: '10000015',
          title:'设 备 报 修',
          warp1:{
            actualYarnLength: '',
            batchCode: '',
            beamName: '',
            empId: '',
            endDate: '',
            finish: '',
            fsttemp: '',
            futension: '',
            nameC: '',
            planYieldTotal: '',
            setUnwindingLength: '',
            setYarnLength: '',
            speed: '',
            unwindingLength: '',
            yarnLength: ''
          },
          warp2:{
            actualYarnLength: '',
            batchCode: '',
            beamName: '',
            empId: '',
            endDate: '',
            finish: '',
            fsttemp: '',
            futension: '',
            nameC: '',
            planYieldTotal: '',
            setUnwindingLength: '',
            setYarnLength: '',
            speed: '',
            unwindingLength: '',
            yarnLength: ''
          },
          url:'http://120.55.124.53:8226',
          warp:[],
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
        tableRowStyle2({row,rowIndex}){
            return 'text-align:center !important;' +
              'color:#ffffff !important;background-color:transparent !important;';
        },
        //设置表头行的样式
        tableHeaderColor2({row,column,rowIndex,columnIndex}){
          return 'color:#ffffff !important;text-align:center !important;' +
            'font-size:1.2rem !important;width:100% !important;border-bottom: 1px solid rgba(0,133,239,0.71) !important;'
        },
        //设置单元格的样式
        tableCellStyle2({row, column, rowIndex, columnIndex}) {
          if (row.deliveryTime<24)
            return 'font-size:1.1rem;' +
            'color:red !important;' +
            'text-align :center !important;' +
            'border: 1px solid rgba(0,133,239,0.71) !important;' +
            'padding:0.3rem 0!important;';
          else
            return 'font-size:1.1rem;' +
              'color:white !important;' +
              'text-align :center !important;' +
              'border: 1px solid rgba(0,133,239,0.71) !important;' +
              'padding:0.3rem 0!important;';
        },
        //============表格样式配置================
        getBoardData:function () {
          this.$axios({
            url:this.url+'/machine/getXHBoardSlasher?workshopId=2',
            method:'GET',
            headers:{
              'Content-Type':'application/json;charset=utf-8',
              companyId: this.companyId
            }
          }).then(response=>{
            this.warp=[];
            let result = response.data.data2;
            result = this.sortByKey(result,'machineId');
            if (result.length>1){
              this.warp.push(result[0]);
              this.warp.push(result[1]);
            }
            else {
              this.warp = result;
            }
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
  .sizingBody{
    background-image: url("../../../static/img/xhfzjs.png");
    background-size: 100% 100%;
    width: 100%;
    overflow: hidden;
    -webkit-overflow-scrolling: unset;
    height: 50rem;
    font-size: 5px;
    margin: 0;
  }
  .sizing{
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
    height: 1rem;
  }
  .warp{
    width: 100%;
    height: 15rem;
    text-align: center;
  }
  .table{
    background: transparent !important;
    margin-top: 0.6rem;
  }
  .titleWarp{
    color: white;
    font-weight: bolder;
    font-size: 1.3rem;
    line-height: 1.2rem;
    height: 1.2rem;
    margin-top: 1.3rem;

  }
  .tableWarp{
    background-image: url("../../../static/img/bk2.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 1.6rem;
    height: 20rem;
  }
  .headTitle{
    padding-left: 1.5rem;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    color: rgb(126, 202, 250);
  }
  .tableText{
    color: rgba(225, 225, 225, 0.99);
    text-align: center;
    font-size: 1rem;
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
  .el-table th {
    background-color: transparent;
    padding-bottom: 5px !important;
    padding-top: 0 !important;
  }
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

