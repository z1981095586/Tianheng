<template>
    <div>
      <div class="warper">
        <div class="title">
        </div>
        <div>
          <el-row :gutter="5">
            <el-col :span="12">
              <div class="warp">
                <div class="titleWarp">1#分条整经机</div>
                <div class="tableWarp">
                  <el-table
                    :data="warp1"
                    :row-style="tableRowStyle1"
                    height="12rem"
                    :header-cell-style="tableHeaderColor1"
                    :cell-style="tableCellStyle1"
                    class="table">
                    <el-table-column
                      prop="nameC"
                      label="品名"
                    ></el-table-column>
                    <el-table-column
                      prop="production"
                      label="生产数量"
                    >
                      <template slot-scope="scope">
                        {{scope.row.production}}米
                      </template>
                    </el-table-column>

                    <el-table-column
                      prop="finish"
                      label="完成率"
                      width="80"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.axisNo==='' || scope.row.axisNo==null">0%</span>
                        <span v-else-if="scope.row.finish>=100">100%</span>
                        <span v-else>{{scope.row.finish}}%</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="status"
                      label="生产状态"
                      width="110"
                    >
                      <template slot-scope="scope">
                        <!--<span v-if="scope.row.finish===0">待生产</span>-->
                        <span v-if="scope.row.axisNo==='' || scope.row.axisNo==null || scope.row.finish===0">待生产</span>
                        <span v-else-if="scope.row.finish >0 && scope.row.finish<100" style="color: red">紧急/生产中</span>
                        <span v-else-if="scope.row.finish >=100" style="color: green">已完成</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="warp">
                <div class="titleWarp">2#分条整经机</div>
                <div class="tableWarp">
                  <el-table
                    :data="warp2"
                    :row-style="tableRowStyle1"
                    height="12rem"
                    :header-cell-style="tableHeaderColor1"
                    :cell-style="tableCellStyle1"
                    class="table">
                    <el-table-column
                      prop="nameC"
                      label="品名"
                    ></el-table-column>
                    <el-table-column
                      prop="production"
                      label="生产数量"
                    >
                      <template slot-scope="scope">
                        {{scope.row.production}}米
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="finish"
                      label="完成率"
                      width="80"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.axisNo==='' || scope.row.axisNo==null">0%</span>
                        <span v-else-if="scope.row.finish>=100">100%</span>
                        <span v-else>{{scope.row.finish}}%</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="status"
                      label="生产状态"
                      width="110"
                    >
                      <template slot-scope="scope">
                        <!--<span v-if="scope.row.finish===0">待生产</span>-->
                        <span v-if="scope.row.axisNo==='' || scope.row.axisNo==null || scope.row.finish===0">待生产</span>
                        <span v-else-if="scope.row.finish >0 && scope.row.finish<100" style="color: red">紧急/生产中</span>
                        <span v-else-if="scope.row.finish >=100" style="color: green">已完成</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="12">
              <div class="warp">
                <div class="titleWarp">3#分条整经机</div>
                <div class="tableWarp">
                  <el-table
                    :data="warp3"
                    :row-style="tableRowStyle1"
                    height="12.2rem"
                    :header-cell-style="tableHeaderColor1"
                    :cell-style="tableCellStyle1"
                    class="table">
                    <el-table-column
                      prop="nameC"
                      label="品名"
                    ></el-table-column>
                    <el-table-column
                      prop="production"
                      label="生产数量"
                    >
                      <template slot-scope="scope">
                        {{scope.row.production}}米
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="finish"
                      label="完成率"
                      width="80"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.axisNo==='' || scope.row.axisNo==null">0%</span>
                        <span v-else-if="scope.row.finish>=100">100%</span>
                        <span v-else>{{scope.row.finish}}%</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="status"
                      label="生产状态"
                      width="110"
                    >
                      <template slot-scope="scope">
                        <!--<span v-if="scope.row.finish===0">待生产</span>-->
                        <span v-if="scope.row.axisNo==='' || scope.row.axisNo==null || scope.row.finish===0">待生产</span>
                        <span v-else-if="scope.row.finish >0 && scope.row.finish<100" style="color: red">紧急/生产中</span>
                        <span v-else-if="scope.row.finish >=100" style="color: green">已完成</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="warp">
                <div class="titleWarp">4#分条整经机</div>
                <div class="tableWarp">
                  <el-table
                    :data="warp4"
                    :row-style="tableRowStyle1"
                    height="12.2rem"
                    :header-cell-style="tableHeaderColor1"
                    :cell-style="tableCellStyle1"
                    class="table">
                    <el-table-column
                      prop="nameC"
                      label="品名"
                    ></el-table-column>
                    <el-table-column
                      prop="production"
                      label="生产数量"
                    >
                      <template slot-scope="scope">
                        {{scope.row.production}}米
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="finish"
                      label="完成率"
                      width="80"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.axisNo==='' || scope.row.axisNo==null">0%</span>
                        <span v-else-if="scope.row.finish>=100">100%</span>
                        <span v-else>{{scope.row.finish}}%</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="status"
                      label="生产状态"
                      width="110"
                    >
                      <!--<template slot-scope="scope">
                        <span v-if="scope.row.status ==null">待生产</span>
                        <span v-else-if="scope.row.startTime !=null && scope.row.endTime ==null" style="color: red">紧急/生产中</span>
                        <span v-else-if="scope.row.startTime !=null && scope.row.endTime !=null" style="color: green">已完成</span>
                      </template>-->
                      <template slot-scope="scope">
                        <!--<span v-if="scope.row.finish===0">待生产</span>-->
                        <span v-if="scope.row.axisNo==='' || scope.row.axisNo==null || scope.row.finish===0">待生产</span>
                        <span v-else-if="scope.row.finish >0 && scope.row.finish<100" style="color: red">紧急/生产中</span>
                        <span v-else-if="scope.row.finish >=100" style="color: green">已完成</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "SlittingWarper",
      data(){
        return{
          currentPage: 1, //  el-pagination 初始页
          pagesize: 8,//  el-pagination 每页的数据
          companyId: '10000000',
          title:'设 备 报 修',
          warp1:[],
          warp2:[],
          warp3:[],
          warp4:[],
          url:'http://120.55.124.53:8226'
        }
      },
      methods:{

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
            return 'font-size:1rem;' +
            'color:white !important;' +
            'text-align :center !important;' +
            'border: 1px solid rgba(0,133,239,0.71) !important;' +
            'padding:0.3rem 0!important;'
        },
        //============表格样式配置================
        getBoardData:function () {
          this.$axios({
            url:this.url+'/warp/getSlittingBoardWarp',
            method:'get',

            headers:{
              'Content-Type':'application/json;charset=utf-8',
               companyId: this.companyId
            }
          }).then(response=>{
            this.warp1 = response.data.data.boardWarps1;
            this.warp2 = response.data.data.boardWarps2;
            this.warp3 = response.data.data.boardWarps3;
            this.warp4 = response.data.data.boardWarps4;


          })

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
        // this.getBoardData();
        // this.changePage();
        // this.getBoardDataTiming();
      },

    }
</script>

<style scoped>

  .warper{
    width: 99%;
    height: 50rem;
    text-align: center;
    color: rgba(0,133,239,0.71);
    margin: 0;
    padding-left: 0.5rem;
    /*background-color: #539cbd;*/
    /*background-color: #37678d;*/
  /*color: rgba(51, 170, 222, 0.61);*/
}
  .title{
    height: 2rem;
  }
  .warp{
    width: 100%;
    height: 15rem;
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
    height: 12rem;
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
