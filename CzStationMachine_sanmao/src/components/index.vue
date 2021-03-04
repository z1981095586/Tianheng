<template>
  <div class="allPage">
    <div class="header">
      <div class="header_left">
        <el-avatar :size="50">
          <img src="../../static/img/logo.png" />
        </el-avatar>
        <span>天衡穿综工位操作系统</span>
      </div>
      <div class="header_right">
        <!-- <span v-show="isShangZhou" v-for="(item,index) in nameList"
          :key="'sz_'+index">{{item.label}}：{{item.staffName}}</span>
        <span v-show="isChaPian" v-for="(item,index) in nameList2"
          :key="'cp_'+index">{{item.label}}：{{item.staffName}}</span>
        <span v-show="isStopCar || isMachine ">{{nameList3}}</span> -->
        <div class="icon_info">
          <img src="../../static/img/remind.png" />

          <img src="../../static/img/unremind.png" />

          <img src="../../static/img/refresh.png" @click="pageNum=1;getData();" />

          <img src="../../static/img/question.png" @click="help=true"  />
        </div>
      </div>
    </div>
    <div class="main" v-show="mainShow">
      <div class="btn" @click="showQuery">穿综计划查询</div>
      <div class="btn" @click="showBaogong">穿综报工</div>
    </div>
    <div class="query" v-show="queryShow">
      <div class="table">
        <el-table :data="tableData" size="medium" :border="border" style="width: 100%;height:100%;font-size:1.3rem"
          :header-cell-style="headerClass">
          <el-table-column align="center" prop="priority" label="优先级">
          </el-table-column>
          <el-table-column align="center" prop="material_code" label="产品品号">
          </el-table-column>
          <el-table-column align="center" prop="gui_ge" label="色号">
          </el-table-column>
          <el-table-column align="center" prop="pi_ci" label="批次">
          </el-table-column>
          <el-table-column align="center" prop="beam_name" label="轴号">
          </el-table-column>
          <el-table-column align="center" prop="product_name" label="品名" width="200">
          </el-table-column>
          <el-table-column align="center" prop="bar_code" label="整经单号" width="200">
          </el-table-column>
          <el-table-column align="center" prop="remark" label="备注">
          </el-table-column>
        </el-table>
      </div>
      <div class="bottom">
        <div class="left_bottom">
          <div class="btn" style="font-size:2rem" @click="lastPage()">上一页</div>
          <div class="btn" style="font-size:2rem" @click="nextPage()">下一页</div>
        </div>
        <div class="right_bottom">
          <div class="btn" style="font-size:2rem;background:#808080;color:white" @click="back">返回</div>
        </div>
      </div>
    </div>
    <div class="baogong" v-show="baogongShow">
      <div class="head" :style="enabled ? 'background:rgba(49,124,205,0.6)':''"><span
          style=" justify-content: flex-start;"></span><span style="font-size:2rem">穿综记录</span><span
          style="    justify-content: flex-end;">{{time}}</span></div>
      <div class="con1">
        <div class="con1_top">
          <div class="con1_top_con"><span>品号</span><span>色号</span><span>批次</span><span>轴号</span><span>整经长度</span>
          </div>
          <div class="con1_top_con">
            <span>{{pinh}}</span><span>{{seHao}}</span><span>{{canPinPiHao}}</span><span>{{axisNo}}</span><span>{{planYield}}</span>
          </div>
        </div>

        <div class="con1_bottom" style="    display: flex;
    flex-direction: column;">
          <div style="display:flex;justify-content: space-around;width:100%;">
            <div class="con1_bottom_con" style="flex-direction: row;">
              <span>穿综工号1</span>
              <input v-model="cz1" @blur="selectStaffCode('1')" style="width:7rem;" />
            </div>
            <div class="con1_bottom_con" style="flex-direction: row;">
              <span>穿综工号2</span>
              <input v-model="cz2" @blur="selectStaffCode('2')" style="width:7rem;" />
            </div>
            <div class="con1_bottom_con" style="flex-direction: row;">
              <span>穿综工号3</span>
              <input v-model="cz3" @blur="selectStaffCode('3')" style="width:7rem;" />
            </div>
            <div class="con1_bottom_con" style="flex-direction: row;">
              <span>穿综工号4</span>
              <input v-model="cz4" @blur="selectStaffCode('4')" style="width:7rem;" />
            </div>
          </div>
          <div style="display:flex;justify-content: space-around;width:100%;">
            <div class="con1_bottom_con" style="flex-direction: row;">
              <span>工号1系数</span>
              <input v-model="xs1" style="width:7rem;" v-show="xsFlag1" />
              <input v-model="xs1" style="width:7rem;" disabled v-show="!xsFlag1" />
            </div>
            <div class="con1_bottom_con" style="flex-direction: row;">
              <span>工号2系数</span>
              <input v-model="xs2" style="width:7rem;" v-show="xsFlag2" />
              <input v-model="xs2" style="width:7rem;" disabled v-show="!xsFlag2" />
            </div>
            <div class="con1_bottom_con" style="flex-direction: row;">
              <span>工号3系数</span>
              <input v-model="xs3" style="width:7rem;" v-show="xsFlag3" />
              <input v-model="xs3" style="width:7rem;" disabled v-show="!xsFlag3" />
            </div>
            <div class="con1_bottom_con" style="flex-direction: row;">
              <span>工号4系数</span>
              <input v-model="xs4" style="width:7rem;" v-show="xsFlag4" />
              <input v-model="xs4" style="width:7rem;" disabled v-show="!xsFlag4" />
            </div>
          </div>
        </div>
      </div>
      <div class="con2">
        <div class="con2_con">
          <div class="con1_bottom_con" style="height:50%">
            <span>根数</span>
            <input v-model="gs" />
          </div>
          <div class="con1_bottom_con" style="height:50%">
            <span style="width:10rem">复查人(工长)</span>
            <input v-model="fcr" @blur="selectStaffCode('5')" />
          </div>
        </div>
        <div class="con2_con" style="width:30%;">
          <div class="con1_bottom_con" style="height:50%;width:100%;flex-direction:row;justify-content:flex-start">
            <span style="margin-right:1rem;margin-top:3rem">难度系数</span>
            <input v-model="ndxs" style="margin-top:3rem" />
          </div>
          <div class="con1_bottom_con" style="height:50%;width:100%;flex-direction:row;justify-content:flex-start">
            <span style="margin-right:1rem;margin-top:3rem">加班系数</span>
            <input v-model="jbxs" style="margin-top:3rem" />
          </div>
          
        </div>
        <div class="con2_con" style="width:30%;">
          <div class="con1_bottom_con" style="height:50%;width:100%;flex-direction:row;justify-content:flex-start">
            <span style="margin-right:1rem;margin-top:3rem">补综丝人</span>
            <input v-model="bzsr" @blur="selectStaffCode('6')" style="margin-top:3rem" />
          </div>
          <div class="con1_bottom_con" style="height:50%;width:100%;flex-direction:row;justify-content:flex-start">
            <span style="margin-right:1rem;margin-top:3rem">补综丝数</span>
            <input v-model="bzss" style="margin-top:3rem" />
          </div>
        </div>
        
        <div class="con2_con">
          <span style="    margin-bottom: 1.5rem;
    margin-top: 1rem;">备注</span>
          <textarea v-model="bz"></textarea>
        </div>
      </div>
      <div class="bottom_btn">
        <div class="btns" :style=" enabled ? '':'background:rgba(163,216,151,0.6);color:rgba(0,0,0,0.6)'"
          @click="enabled?dialogVisible=true:dialogVisible=false;">扫码穿综</div>
        <div class="btns" :style=" enabled2 ? '':'background:rgba(163,216,151,0.6);color:rgba(0,0,0,0.6)'"
          @click=" enabled2?save():''">保存</div>
        <div class="btns" :style=" !enabled2 && !enabled ? '':'background:rgba(163,216,151,0.6);color:rgba(0,0,0,0.6)'"
          @click="!enabled2 && !enabled ?update():''">修改</div>
        <div class="btns" @click="enabled3 ?dialogVisible2=true:dialogVisible2=false"
          :style=" enabled3 ? '':'background:rgba(163,216,151,0.6);color:rgba(0,0,0,0.6)'">完成</div>
        <div class="btns" style="margin-left:5rem;background:#808080;color:white" @click=" back">返回</div>
      </div>
      <el-dialog title="扫码" :visible.sync="dialogVisible" width="45%">
        <div
          style="width:100%;height:20rem;    display: flex;flex-direction: column;align-items: center;justify-content: space-around;">
          <input id="code" v-model="printCode"
            style="width:10rem;font-size:1.6rem;height:2rem;    border: 1px solid black;" />
          <img src="../../static/img/saomiao.gif" style="width:10rem;" />

          <div class="stopBtn" @click="dialogVisible = false">停止扫码</div>
        </div>





      </el-dialog>
      <el-dialog title="确认提交" :visible.sync="dialogVisible2" width="45%">
        <div
          style="width:100%;height:20rem;    display: flex;flex-direction: column;align-items: center;justify-content: space-around;">

          <img src="../../static/img/face.png" style="width:10rem;" />
          <span style="font-size:1.6rem">是否提交</span>
          <div style="width:100%;display:flex;justify-content: space-around;">
            <div class="stopBtn" @click="Finish()">确认</div>
            <div class="stopBtn" style="background:#808080;color:white;" @click="dialogVisible2 = false">取消</div>
          </div>
        </div>


      </el-dialog>
      
    </div>
      <div class="help">
        <el-drawer
 :show-close="false"

  :visible.sync="help"
  direction="ttb"
  size="100%"
  >
   <div class="pdf" style="position:relative" v-show="fileType === 'pdf'"    >

   
    <pdf
    
      :src="src" 
      :page="currentPage" 
      @num-pages="pageCount=$event" 
      @page-loaded="currentPage=$event" 
      @loaded="loadPdfHandler"> 
    </pdf>
 <i class="el-icon-circle-close" @click="help=false" style="position:absolute;top:1rem;right:1rem;font-size:3rem;z-index:999;color:red;" ></i>
 
  </div>
</el-drawer>
   <div class="arrow" v-show="help" style="position:fixed;bottom:0;left:50%; transform:translate(-50%,0);display:flex;z-index:10000;font-size:2rem;align-items:center; ">
 <div class="stopBtn"  @click="changePdfPage(0)" >上一页</div>
    <!-- <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage==1}">Preview</span> -->
   &nbsp; {{currentPage}} / {{pageCount}} &nbsp;
  <div class="stopBtn" @click="changePdfPage(1)">下一页</div>
    <!-- <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage==pageCount}">Next</span> -->
    </div>
  </div>
   </div>
</template>

<script>
 import pdf from 'vue-pdf'
  import axios from 'axios'
  export default {
     components: {pdf},
    name: 'index',
    data() {
      return {

         currentPage: 0, // pdf文件页码
        pageCount: 0, // pdf文件总页数
        fileType: 'pdf', // 文件类型
　　　　　src: require('../pdf/help.pdf'), // pdf文件地址
help:false,

        timer: "",
        time: "",
        Id: "",
        printCode: "",
        border: false,
        mainShow: true,
        queryShow: false,
        baogongShow: false,
        enabled: true,
        enabled2: false,
        enabled3: false,
        dialogVisible: false,
        dialogVisible2: false,
        pageNum: 1,
        pageSize: 12,
        companyId: "10000025",
        tableData: [],
        tableDataCon: [],
        cz1: "",
        cz2: "",
        cz3: "",
        cz4: "",
        cz1_code: "",
        cz2_code: "",
        cz3_code: "",
        cz4_code: "",
        xs1: "",
        xs2: "",
        xs3: "",
        xs4: "",
        xsFlag1: false,
        xsFlag2: false,
        xsFlag3: false,
        xsFlag4: false,
        gs: "",
        fcr: "",
        fcr_code: "",
        ndxs: "",
        jbxs: "",
        bz: "",
        bzsr: "",
        bzss:"",
        bzsr_code: "",
        planYield: "",
        productName: "", //品名
        pinh: "",
        axisNo: "",
        seHao: "",

        canPinPiHao: "",

      }
    },
    methods: {

      Finish() { //完成事件
        let header = {
          'Content-Type': 'application/json',
          'companyID': this.companyId
        };
        let url2 = "http://106.12.219.66:8763/wear-weaving-plan/saveWear";
        let that = this
        axios({
          url: url2,
          method: "post",
          headers: header,
          data: {
            zenJinId: this.Id,
         staffCode1: this.cz1_code==""?null:this.cz1_code ,
            staffCode2: this.cz2_code==""?null:this.cz2_code ,
            staffCode3: this.cz3_code==""?null:this.cz3_code ,
            staffCode4: this.cz4_code==""?null:this.cz4_code ,
            staffXs1: this.xs1,
            staffXs2: this.xs2,
            staffXs3: this.xs3,
            staffXs4: this.xs4,
            wearCount:this.bzss,
            rootNumber: this.gs,
            checkStaff: this.fcr_code,
            dcDegree: this.ndxs,
            wearCount:this.bzss,
            workDegree: this.jbxs,
            feedWearStaff: this.bzsr_code,
            status: 2
          },
          // headers: headers
        }).then((res) => {
          console.log(res)
          if (res.data.result == "ok") {

            that.$message({

              message: '保存更新成功！',
              type: 'success',
              duration: 1000

            });
            this.dialogVisible2 = false
            this.baogongShow = false
            this.mainShow = true
            Object.assign(this.$data, this.$options.data());
          } else {
            that.$message({

              message: '保存更新失败！',
              type: 'error',
              duration: 1000

            });
          }
        })
      },

      save() { //保存事件
        console.log("af")
        let header = {
          'Content-Type': 'application/json',
          'companyID': this.companyId
        };
        let url2 = "http://106.12.219.66:8763/wear-weaving-plan/saveWear";
        let that = this
        axios({
          url: url2,
          method: "post",
          headers: header,
          data: {
            zenJinId: this.Id,
            staffCode1: this.cz1_code==""?null:this.cz1_code ,
            staffCode2: this.cz2_code==""?null:this.cz2_code ,
            staffCode3: this.cz3_code==""?null:this.cz3_code ,
            staffCode4: this.cz4_code==""?null:this.cz4_code ,
            staffXs1: this.xs1,
            staffXs2: this.xs2,
            staffXs3: this.xs3,
            staffXs4: this.xs4,
            rootNumber: this.gs,
            checkStaff: this.fcr_code,
            dcDegree: this.ndxs,
            wearCount:this.bzss,
            workDegree: this.jbxs,
            feedWearStaff: this.bzsr_code,
            status: -1
          },
          // headers: headers
        }).then((res) => {
          console.log(res)
          if (res.data.result == "ok") {

            that.$message({

              message: '保存更新成功！',
              type: 'success',
              duration: 1000

            });
            this.enabled2 = !this.enabled2
            this.enabled3 = true
          } else {
            that.$message({

              message: '保存更新失败！',
              type: 'error',
              duration: 1000

            });
          }
        })
      },
      update() { //修改事件
        let header = {
          'Content-Type': 'application/json',
          'companyID': this.companyId
        };
        let url2 = "http://106.12.219.66:8763/wear-weaving-plan/saveWear";
        let that = this
        axios({
          url: url2,
          method: "post",
          headers: header,
          data: {
            zenJinId: this.Id,
           staffCode1: this.cz1_code==""?null:this.cz1_code ,
            staffCode2: this.cz2_code==""?null:this.cz2_code ,
            staffCode3: this.cz3_code==""?null:this.cz3_code ,
            staffCode4: this.cz4_code==""?null:this.cz4_code ,
            staffXs1: this.xs1,
            staffXs2: this.xs2,
            staffXs3: this.xs3,
            staffXs4: this.xs4,
            rootNumber: this.gs,
            checkStaff: this.fcr_code,
            dcDegree: this.ndxs,
            wearCount:this.bzss,
            workDegree: this.jbxs,
            feedWearStaff: this.bzsr_code,
            status: -1
          },
          // headers: headers
        }).then((res) => {
          console.log(res)
          if (res.data.result == "ok") {

            that.$message({

              message: '保存更新成功！',
              type: 'success',
              duration: 1000

            });
            this.enabled2 = !this.enabled2
            this.enabled3 = false
          } else {
            that.$message({

              message: '保存更新失败！',
              type: 'error',
              duration: 1000

            });
          }
        })
      },
      lastPage() { //上一页

        if (this.pageNum == 1) {
          this.$message({

            message: '没有上一页了！',
            type: 'error',
            duration: 1000

          });
        } else {
          this.pageNum = this.pageNum - 1;
          this.tableData = this.pagination(this.pageNum, this.pageSize, this.tableDataCon)
        }
        console.log(this.pageNum)

      },
      nextPage() {  //下一页

        if (this.pageNum * this.pageSize >= this.tableDataCon.length) {
          this.$message({

            message: '最后一页了！',
            type: 'error',
            duration: 1000

          });
        } else {
          this.pageNum = this.pageNum + 1;
          this.tableData = this.pagination(this.pageNum, this.pageSize, this.tableDataCon)
        }
        console.log(this.pageNum)
      },
      pagination(pageNo, pageSize, array) { //数组分页函数
        var offset = (pageNo - 1) * pageSize;
        return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset +
          pageSize);
      },
      getData() {
        let url = 'http://120.55.124.53:12140/api/zj/getCuanZongPlan';

        let method = "post";
        let data = {
          selectInfo: {
            company_id: this.companyId
          },
          cuan_zhong_ji_hua: {
            status: "0"
          }

        };

        let that = this
        axios({
            url: url,
            method: method,
            data: data,

          })
          .then(response => {
            console.log(response)
            let arr = []
            if (response.data.result.length > 0) {
              for (let i = 0; i < response.data.result.length; i++) {
                if (response.data.result[i].priority != null && response.data.result[i].priority != "") {
                  arr.push(response.data.result[i])
                }

              }

              that.tableDataCon = arr
              that.tableData = that.pagination(this.pageNum, this.pageSize, that.tableDataCon)
              this.$message({

                message: '数据已刷新！',
                type: 'success',
                duration: 1000


              });
            } else {
              this.$message({

                message: '没有计划单！',
                type: 'error',
                duration: 1000

              });
            }

          })
      },
      headerClass({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        console.log(row)
        if (rowIndex == 0) {
          return 'background:#317CCD;color:white;'
        }

      },
      showQuery() {
        this.mainShow = false
        this.baogongShow = false

        this.queryShow = true
      },
      showBaogong() {
        this.mainShow = false
        this.queryShow = false
        this.baogongShow = true

      },
      back() {

        this.queryShow = false
        this.baogongShow = false
        this.mainShow = true
        Object.assign(this.$data, this.$options.data()) //data数据初始化

      },
      getTime() { //获取时间
        //定义一个日期对象;
        var dateTime = new Date();
        //获得系统年份;
        var year = dateTime.getFullYear();
        //获得系统月份;
        var month = dateTime.getMonth() + 1;
        //获得系统当月分天数;
        var day = dateTime.getDate();
        //获得系统小时;


        var hours = dateTime.getHours();
        //获得系统分钟;
        var minutes = dateTime.getMinutes();
        //获得系统秒数;
        var second = dateTime.getSeconds();

        day < 10 ? day = '0' + day : day;
        month < 10 ? month = '0' + month : month;
        hours < 10 ? hours = '0' + hours : hours;
        minutes < 10 ? minutes = '0' + minutes : minutes;
        second < 10 ? second = '0' + second : second;

        let dateStr = year + '-' + month + '-' + day + ' ' + ' ' + hours + ':' + minutes + ':' + second;
        this.time = dateStr
        return dateStr

      },

      selectStaffCode(flag) {

        let url = "http://106.12.219.66:8227/report/getSimpleReport";
        let data = {}
        let header = {
          companyId: this.companyId
        }
        if (flag == "1") {

          data = {

            tableName: "s_staff",
            query: {
              staff_code: this.cz1
            }
          };
        } else if (flag == "2") {
          data = {

            tableName: "s_staff",
            query: {
              staff_code: this.cz2
            }
          };
        } else if (flag == "3") {
          data = {

            tableName: "s_staff",
            query: {
              staff_code: this.cz3
            }
          };
        } else if (flag == "4") {
          data = {

            tableName: "s_staff",
            query: {
              staff_code: this.cz4
            }
          };
        } else if (flag == "5") {
          data = {

            tableName: "s_staff",
            query: {
              staff_code: this.fcr
            }
          };
        } else if (flag == "6") {
          data = {

            tableName: "s_staff",
            query: {
              staff_code: this.bzsr
            }
          };
        }



        let that = this;
        if (this.isChinese(data.query.staff_code) == false || parseInt(flag) > 2) {
          axios({
            url: url,
            method: "post",
            headers: header,
            data: data,

            // headers: headers
          }).then((res) => {
            console.log(res.data.data.length);
            if (res.data.data.length == 1) {
              if (flag == "1") {
                this.cz1_code = this.cz1
                this.cz1 = res.data.data[0].staff_name

              } else if (flag == "2") {
                this.cz2_code = this.cz2
                this.cz2 = res.data.data[0].staff_name
              } else if (flag == "3") {
                this.cz3_code = this.cz3
                this.cz3 = res.data.data[0].staff_name
              } else if (flag == "4") {
                this.cz4_code = this.cz4
                this.cz4 = res.data.data[0].staff_name
              } else if (flag == "5") {
                this.fcr_code = this.fcr
                this.fcr = res.data.data[0].staff_name
              } else if (flag == "6") {
                this.bzsr_code = this.bzsr
                this.bzsr = res.data.data[0].staff_name
              }

            } else {
              this.$message({
                message: "工号不正确！",
                type: "warning",
                duration: 1000
              });
              if (flag == "1") {
                this.cz1_code = ""
                this.cz1 = ""

              } else if (flag == "2") {
                this.cz2_code = ""
                this.cz2 = ""
              } else if (flag == "3") {
                this.cz3_code = ""
                this.cz3 = ""
              } else if (flag == "4") {
                this.cz4_code = ""
                this.cz4 = ""
              } else if (flag == "5") {
                this.fcr = ""
                this.fcr_code = ""
              } else if (flag == "6") {
                this.bzsr = ""
                this.bzsr_code = ""
              }
            }
          });
        }

      },
      isChinese(temp) {
        let re = /[^\u4E00-\u9FA5]/;
        if (re.test(temp)) return false;
        return true;
      },
      getInfo(val) {
        let url = "http://106.12.219.66:8763/lm-zjwarp-plan-detail/selectByPlanB";
        let url2 = "http://106.12.219.66:8763/wear-weaving-plan/saveWear";
        let data = {

          "barCode": val

        };
        let header = {
          companyId: this.companyId
        }

        let that = this;
        axios({
          url: url,
          method: "post",
          headers: header,
          data: data,
          // headers: headers
        }).then((res) => {
          console.log(res.data.data);
          if (res.data.data) {
            this.dialogVisible = false
            this.enabled = false
            this.enabled2 = true
            this.enabled3 = false
            this.printCode = ""


            this.Id = res.data.data.id

            this.planYield = res.data.data.planYield
            this.productName = res.data.data.productName //品名
            this.pinh = res.data.data.pinh
            this.axisNo = res.data.data.axisNo
            this.gs = res.data.data.zbZjgs
            this.seHao = res.data.data.seHao
            this.canPinPiHao = res.data.data.canPinPiHao


            if (res.data.data.wwStatus == 0) { //未完成才扫码穿综
              axios({
                url: url2,
                method: "post",
                headers: header,
                data: {
                  zenJinId: this.Id,
                  //     staffCode1:this.cz1_code,
                  //      staffCode2:this.cz2_code,
                  //        staffCode3:this.cz3_code,
                  //      staffCode4:this.cz4_code,
                  //      staffXs1:this.xs1,
                  //      staffXs2:this.xs2,
                  //      staffXs3:this.xs3,
                  //      staffXs4:this.xs4,
                  //      rootNumber:this.gs,
                  //      checkStaff:this.fcr_code,
                  //      dcDegree:this.ndxs,
                  //      workDegree:this.jbxs,
                  //  feedWearStaffBODY:this.bzsr_code,
                  status: 1
                },
                // headers: headers
              }).then((res) => {
                console.log(res)

                if (res.data.result == "ok") {

                  this.$message({

                    message: '扫码数据已提交！',
                    type: 'success',
                    duration: 1000

                  });
                } else {
                  this.$message({

                    message: '扫码数据提交失败！',
                    type: 'error',
                    duration: 1000

                  });
                }
              })
            } else if (res.data.data.wwStatus == 1 || res.data.data.wwStatus == -1) { //进行中

              this.cz1 = res.data.data.staffName1
              this.cz2 = res.data.data.staffName2
              this.cz3 = res.data.data.staffName3
              this.cz4 = res.data.data.staffName4

            } else if (res.data.data.wwStatus == 2) { //已完成

              Object.assign(this.$data, this.$options.data()) //data数据初始化
              this.$message({

                message: '已完成！',
                type: 'warning',
                duration: 1000

              });
            }
            // this.specification = res.data.data.specification
            // this.piCang = res.data.data.piCang
            // this.piSu = res.data.data.piSu
            // this.zenJinJiHao = res.data.data.zenJinJiHao
            // this.seHao = res.data.data.huaXinDans[0].cpscsh
            // if (res.data.data.workQty1Time != null) {
            //   this.workQty1Time = res.data.data.workQty1Time
            // }
            // if (res.data.data.workQty2Time != null) {
            //   this.workQty1Time = res.data.data.w orkQty2Time
            // }
            // if (res.data.data.workQty3Time != null) {
            //   this.workQty1Time = res.data.data.workQty3Time
            // }



          } else {

            this.$message({

              message: '数据查询失败！',
              type: 'error',
              duration: 1000

            });
          }

          //  this.printCode = ""

        });

      },
            changePdfPage (val) {
        //  console.log(val)
        //  console.log(this.currentPage)
        //  console.log(this.pageCount)
        //     if(this.currentPage==this.pageCount){
        //   this.currentPage=1
        //   return
        // }
        if (val === 0 && this.currentPage > 1) {
          this.currentPage--
          // console.log(this.currentPage)
        }
        if (val === 1 && this.currentPage < this.pageCount) {
          this.currentPage++
          // console.log(this.currentPage)
        }
     
      },

      // pdf加载时
      loadPdfHandler (e) {
        this.currentPage = 1 // 加载的时候先加载第一页
      }
    },
    mounted() {
      this.timer = setInterval(this.getTime, 1000);
    },
    　created() {
　　　　// 有时PDF文件地址会出现跨域的情况,这里最好处理一下
　　　　this.src = pdf.createLoadingTask(this.src)
　　},
    watch: {
      dialogVisible(val) {
        if (val == true) {

          this.$nextTick(() => {
            document.getElementById("code").focus()

          })
        }
      },
      printCode(val) {
        if (val.length == 9) { //扫码码长度到9执行
          this.getInfo(val)

        }
      },
      cz1(val) {
        console.log(val)
        if (val == "") {
          this.xsFlag1 = false
        } else {
          this.xsFlag1 = true
        }

      },
      cz2(val) {
        if (val == "") {
          this.xsFlag2 = false
        } else {
          this.xsFlag2 = true
        }
      },
      cz3(val) {
        if (val == "") {
          this.xsFlag3 = false
        } else {
          this.xsFlag3 = true
        }
      },
      cz4(val) { //穿棕工号为空，工号系数输入框禁用
        if (val == "") {
          this.xsFlag4 = false
        } else {
          this.xsFlag4 = true
        }
      },
      queryShow(val) { //当选择上轴组页面显示时加载数据
        if (val == true) {
          this.getData()

          // })
        }
      },

    }

  }

</script>

<style scoped>
  body {
    padding-right: 0 !important;
  }

  body {
    padding: 0;
  }

  .header {
    background: #317CCD;
    color: white;
  }

  .allPage {
    width: 100%;
    height: 768px;
  }

  .header {
    width: 100%;
    height: 80px;
    background: #29374B;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header_left {
    width: 35%;
    height: 100%;
    display: flex;
    align-items: center;
    color: white;
    font-size: 1.5rem;
  }

  .header_left span {
    margin-left: 1.5rem;
  }

  .header_right {
    width: 62%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .header_right span {
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    margin-right: 1rem;
  }

  .icon_info {
    width: 42%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .icon_info img {
    width: 40px;
    height: 40px;
  }

  .main {
    width: 100%;
    height: 92%;
    display: flex;
    align-items: center;

    justify-content: space-around;
  }

  .query {
    width: 100%;
    height: 92%;
    display: flex;
    flex-direction: column;
  }

  .bottom {
    width: 100%;
    height: 10rem;

    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 0rem;
  }

  .left_bottom {
    width: 45%;
    height: 9rem;
    align-items: center;
    justify-content: space-between;
    display: flex;
  }

  .right_bottom {
    width: 45%;
    height: 9rem;
    align-items: center;
    justify-content: flex-end;
    display: flex;
  }

  .table {
    width: 101%;
    height: 29.4rem;
  }

  .baogong {
    width: 100%;
    height: 92%;
    background: #E2E7ED;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .con1_bottom_con {
    width: 30%;
    height: 100%;
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

  }

  .con1_bottom_con input {
    width: 10rem;
    height: 3.5rem;
    border: 1px solid black;
    font-size: 1.6rem;
  }

  .head {
    width: 100%;
    margin-bottom: 0.5rem;
    height: 4rem;
    background: #317CCD;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .head span {
    font-size: 1.5rem;
    color: white;
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .con1 {
    width: 100%;
    height: 16rem;
    margin-bottom: 1rem;
    background: white;

  }

  .con1_top {
    width: 100%;
    height: 7rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .con1_top_con {
    width: 100%;
    height: 3rem;
    display: flex;
  }

  .con1_top_con span {
    width: 20%;
    height: 100%;
    font-size: 1.6rem;
    color: rgba(0, 0, 0, 0.6);
  }

  .con1_bottom {
    width: 100%;
    height: 9rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .con2 {
    width: 100%;
    height: 16rem;
    background: white;
    display: flex;
  }

  .con2_con {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .con2_con span {
    font-size: 1.6rem;
  }

  .con2_con textarea {
    width: 90%;
    height: 10rem;
    font-size: 2rem;
    border: 1px solid black;
  }

  .btn {
    width: 45%;
    height: 50%;
    background: #A3D897;
    border-top: 3px solid #ffffff;
    border-left: 3px solid #ffffff;
    border-bottom: 3px solid #717171;
    border-right: 3px solid #717171;
    display: flex;

    align-items: center;
    justify-content: center;
    color: black;
    font-size: 3rem;
  }

  .bottom_btn {
    width: 100%;
    height: 9rem;

    display: flex;
    align-items: center;

  }

  .btns {
    width: 10rem;
    height: 62%;
    background: #A3D897;
    border-top: 3px solid #ffffff;
    border-left: 3px solid #ffffff;
    border-bottom: 3px solid #717171;
    border-right: 3px solid #717171;
    display: flex;
    margin-left: 1.5rem;
    align-items: center;
    justify-content: center;
    color: black;
    font-size: 2rem;
  }

  .stopBtn {
    width: 10rem;
    height: 4rem;
    font-size: 1.6rem;
    background: #A3D897;
    border-top: 3px solid #ffffff;
    border-left: 3px solid #ffffff;
    border-bottom: 3px solid #717171;
    border-right: 3px solid #717171;
    display: flex;

    align-items: center;
    justify-content: center;

  }

</style>
