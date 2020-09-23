<template>
  <div style="background-color:white;overflow:auto;height:700px">
    <div style="font-size:20px;border:white 5px solid;display:flex; justify-content: flex-start;text-align:left">轴追溯
    </div>
    <div style="font-size:20px;border:white 5px solid;display:flex; justify-content: flex-start;text-align:left">
      <div>
        <div class="one">
          <span>轴类：</span>
          <span>{{beamType}}</span>
        </div>

        <div class="one">
          <span>轴号：</span>
          <span>{{beamName}}</span>
        </div>

        <div class="one">
          <span>最近事件：</span>
          <span>{{actionName}}</span>
        </div>
        <div class="one">
          <span>员工：</span>
          <span>{{staffName}}</span>
        </div>
        <div class="one">
          <span>产量：</span>
          <span>{{realYield}}</span>
        </div>
        <div class="one">
          <span>时间：</span>
          <span>{{updateTime}}</span>
        </div>

      </div>
    </div>
    <div class="tableBorder" v-for="(item,index) in beamTraceDTOList" :key="index">


      <!-- 整经 -->
      <div v-if="item.zjflag">
        <el-divider content-position="left" style="background-color: #f2f3f2;">
          <span style="font-size:20px;color:red">整经</span>
        </el-divider>
        <div class="tableBorder" v-for="(zjItem,zjIndex) in zjlist" :key="zjIndex">
          <div class="tableInside">
            <div class="titleTop">
              <span></span>
            </div>
            <div class="left">
              <span>轴号:</span>
              <span>{{zjItem.axisNo}}</span>
            </div>
            <div class="left">
              <span>产量:</span>
              <span>{{zjItem.cl}}米</span>
            </div>
            <div class="left">
              <span>操作人:</span>
              <span>{{zjItem.empName1}}{{zjItem.empName2}}{{zjItem.empName3}}</span>
            </div>
            <div class="left">
              <span>机台号:</span>
              <span>{{zjItem.axisInfo.machineId}}</span>
            </div>
            <div class="left">
              <span>完成时间:{{zjItem.endDate}}</span>
              <span></span>
            </div>
          </div>
        </div>
        <div class="right" v-if="zjMoreShow">
          <span @click="zjMoreClick">{{zjMoreSpan}}</span>

        </div>
      </div>
      <!-- 浆纱 -->
      <div v-if="item.jsflag">
        <el-divider content-position="left" style="background-color: #f2f3f2;">
          <span style="font-size:20px;color:red">浆纱详情</span>
        </el-divider>
        <div class="tableBorder" v-for="(jsItem,jsIndex) in jslist" :key="jsIndex">
          <div class="left">
            <span>轴号:</span>
            <span>{{ jsItem.axisNo}}</span>
          </div>
          <div class="left">
            <span>生产产量:</span>
            <span>{{ jsItem.cl}}米</span>
          </div>
          <div class="left">
            <span>合轴数:</span>
            <span>{{item.lmWarpPlanBWithOrderSheetDTO.axialNumber}}</span>
          </div>

          <div class="left">
            <span>机台号:</span>
            <span>{{item.lmWarpPlanBWithOrderSheetDTO.machineId}}</span>
          </div>


        </div>
        <div class="right" v-if="jsMoreShow">
          <span @click="jsMoreClick">{{jsMoreSpan}}</span>

        </div>
      </div>

      <!-- 织布 -->
      <div v-if="item.zbflag">
        <el-divider style="background-color: #f2f3f2;" content-position="left">
          <span style="font-size:20px;color:red;width:100%;height:100%;background-color: #f2f3f2;">织布</span>
        </el-divider>
        <div class="tableBorder" v-for="(zbItem,zbIndex) in item.lmRunProductShifts" :key="zbIndex">
          <div class="left">
            <span>轴号:</span>
            <span>{{zbItem.beamName}}</span>
          </div>
          <div class="left">
            <span>生产产量:</span>
            <span>{{zbItem.clothLengthMeter}}米</span>
          </div>
          <div class="left">
            <span>落布时间:</span>
            <span>{{zbItem.updateTime}}</span>
          </div>

          <div class="left">
            <span>机台号:</span>
            <span>{{zbItem.machineID}}</span>
          </div>

        </div>
      </div>
    </div>
    <el-dialog title="请选择轴类型" :visible.sync="dialogVisible" width="80%" :show-close="false"
      :close-on-click-modal="false">

      <el-radio style="width:36%;" v-model="beamTypeNum" @change="selectChange" :label="item.beamType"
        v-for="(item,index) in selectOption" :key="index">{{item.beamName}}({{item.beam}})</el-radio>

      <span slot="footer" class="dialog-footer">
        <el-button @click="sure">取 消</el-button>
        <el-button type="primary" @click="sure()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import axios from "axios"


  export default {
    name: "App",
    data() {
      return {
        beamName: "",
        warpingOpen: false,
        companyId: "",
        beamType: "", //轴类

        staffName: "", //员工
        actionName: "", //事件
        realYield: "", //产量
        updateTime: "", //时间
        beamTraceDTOList: [],
        beamTypeNum: null, //存储轴号

        dialogVisible: false, //弹出框显示隐藏
        selectOption: [], //提供选择的数组列表
        lmWarpPlanDetails: [], // 暂时存储浆纱详情一条记录
        lmWarpPlanDetailslist: [], // 暂时存储浆纱详情多条记录
        jslist: [], //显示出来的浆纱数据
        jsMoreSpan: "",
        jsMoreShow: false,

        lmZjwarpPlanDetailDTOS: [], // 暂时存储整经详情一条记录
        lmZjwarpPlanDetailDTOSlist: [], // 暂时存储整经详情多条记录
        zjlist: [], //显示出来的整经数据
        zjMoreSpan: "",
        zjMoreShow: false

      };
    },

    methods: {
      selectChange(val) { //选择改变监听
        console.log(val)
        this.beamTypeNum = val

      },
      sure() { //确认选择
        if (this.beamTypeNum == null || this.beamTypeNum == "") {

          this.$message.error({
            message: "请选择一个轴类型!",
            center: true,
            duration: 1000
          });
        } else {
          this.dialogVisible = false
          this.getBegin();
        }


      },
      jsMoreClick() { //浆纱更多
        //console.log(this.lmWarpPlanDetailslist)
        //console.log(this.lmWarpPlanDetails)
        if (this.jsMoreSpan == "更多浆纱") {
          this.jslist = this.lmWarpPlanDetailslist
          this.jsMoreSpan = "收起"
        } else if (this.jsMoreSpan == "收起") {
          this.jsMoreSpan = "更多浆纱"
          this.jslist = this.lmWarpPlanDetails
        }
      },
      zjMoreClick() { //整经更多

        if (this.zjMoreSpan == "更多整经") {
          this.zjlist = this.lmZjwarpPlanDetailDTOSlist
          this.zjMoreSpan = "收起"
        } else if (this.zjMoreSpan == "收起") {
          this.zjMoreSpan = "更多整经"
          this.zjlist = this.lmZjwarpPlanDetailDTOS
        }
      },
      getInfo() { //获取轴信息
        let that = this
        axios.get('http://106.12.219.66:8763/warp-axis-record/selectByBeam?beamName=' + that.beamName, {
          //参数列表

          //请求头配置  
          headers: {
            companyId: that.companyId
          }
        }).then((res) => {
          console.log(res)
          if (res.data.data.length == 0) {
            that.$message.error({
              message: res.data.successMessage,
              center: true,
              duration: 1000
            });
          } else if (res.data.data.length == 1) { //如果只有一条，就直接获取不弹窗
            that.beamTypeNum = res.data.data[0].beamType
            that.getBegin();
          } else {
            that.dialogVisible = true
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].beamType == 1) {
                res.data.data[i].beam = "整经轴"
              } else if (res.data.data[i].beamType == 2) {
                res.data.data[i].beam = "织轴"
              }
              that.selectOption.push(res.data.data[i])
            }
          }
        })


      },
      getBegin() {
        let that = this

        axios.get('http://106.12.219.66:8763/lm-run-product-shift/beamProductTrace?beamName=' + that.beamName +
          '&beamType=' + that.beamTypeNum, {
            //参数列表

            //请求头配置  
            headers: {
              companyId: that.companyId
            }
          }).then((res) => {
          console.log(res)

          that.beamName = res.data.data.warpAxisRecord.beamName //设置轴号
          that.staffName = res.data.data.warpAxisRecord.staffName //设置员工
          that.actionName = res.data.data.warpAxisRecord.actionName //设置事件
          that.realYield = res.data.data.warpAxisRecord.realYield //设置产量
          that.updateTime = res.data.data.warpAxisRecord.updateTime //设置时间
          for (let i = 0; i < res.data.data.beamTraceDTOList.length; i++) {
            if (res.data.data.beamTraceDTOList[i].lmZjwarpPlanDetailDTOS.length > 0) { //判断整经，浆纱详情，织布的数组长度来控制显示隐藏
              res.data.data.beamTraceDTOList[i].zjflag = true //控制整经显示隐藏
            } else {
              res.data.data.beamTraceDTOList[i].zjflag = false
            }
            if (res.data.data.beamTraceDTOList[i].lmRunProductShifts.length > 0) {
              res.data.data.beamTraceDTOList[i].zbflag = true //控制织布显示隐藏
            } else {
              res.data.data.beamTraceDTOList[i].zbflag = false
            }
            if (res.data.data.beamTraceDTOList[i].lmWarpPlanBWithOrderSheetDTO.lmWarpPlanDetails.length > 0) {
              res.data.data.beamTraceDTOList[i].jsflag = true //控制浆纱显示隐藏
            } else {
              res.data.data.beamTraceDTOList[i].jsflag = false
            }
            if (res.data.data.beamTraceDTOList[i].lmRunProductShifts.length > 0) {
              for (let l = 0; l < res.data.data.beamTraceDTOList[i].lmRunProductShifts.length; l++) { //处理织布数据 

                res.data.data.beamTraceDTOList[i].lmRunProductShifts[l].clothLengthMeter = res.data.data
                  .beamTraceDTOList[i].lmRunProductShifts[l].clothLengthMeter / 10; //织布产量计算

              }
            }
            if (res.data.data.beamTraceDTOList[i].lmWarpPlanBWithOrderSheetDTO.lmWarpPlanDetails.length > 0) {

              for (let y = 0; y < res.data.data.beamTraceDTOList[i].lmWarpPlanBWithOrderSheetDTO.lmWarpPlanDetails
                .length; y++) { //处理浆纱详情数据
                let g = res.data.data.beamTraceDTOList[i].lmWarpPlanBWithOrderSheetDTO.lmWarpPlanDetails[y]
                if (g.axisNo == that.beamName) { //找到对应的轴号，暂存
                  that.lmWarpPlanDetails.push(g)

                }

                g.workQty2 = that.isnull(g.workQty2)



                g.workQty3 = that.isnull(g.workQty3)


                g.workQty1 = that.isnull(g.workQty1)

                //console.log(parseInt(g.workQty1))
                let k = parseInt(g.workQty1) + parseInt(g.workQty2) + parseInt(g.workQty3) //产量计算
                /* 字符处理*/
                g.cl = k
                that.lmWarpPlanDetailslist.push(g) //暂存整经数据列表
              }

            }

            if (res.data.data.beamTraceDTOList[i].lmZjwarpPlanDetailDTOS.length > 0) {
              for (let j = 0; j < res.data.data.beamTraceDTOList[i].lmZjwarpPlanDetailDTOS.length; j++) { //处理整经数据

                let value = res.data.data.beamTraceDTOList[i].lmZjwarpPlanDetailDTOS[j]
                /* 字符处理*/
                if (value.axisNo == that.beamName) { //找到对应的轴号，暂存
                  that.lmZjwarpPlanDetailDTOS.push(value)

                }
                value.workQty2 = that.isnull(value.workQty2)
                value.workQty3 = that.isnull(value.workQty3)
                value.workQty1 = that.isnull(value.workQty1)

                value.empName1 = that.addChar(value.empName1)
                value.empName2 = that.addChar(value.empName2)

                let k = parseInt(value.workQty1) + parseInt(value.workQty2) + parseInt(value.workQty3) //产量计算
                /* 字符处理*/
                res.data.data.beamTraceDTOList[i].lmZjwarpPlanDetailDTOS[j].cl = k
                //console.log(res.data.data.beamTraceDTOList[i].lmWarpPlanBWithOrderSheetDTO)
                that.lmZjwarpPlanDetailDTOSlist.push(res.data.data.beamTraceDTOList[i].lmZjwarpPlanDetailDTOS[
                  j]) //暂存整经数据列表
              }
            }

          }
          if (res.data.data.warpAxisRecord.beamType == 2) { //设置轴类 //如果织轴就只显示一条浆纱，显示所有整经轴
            that.beamType = "织轴"
            that.jsMoreShow = true
            that.zjMoreShow = false
            that.jsMoreSpan = "更多浆纱"
            that.jslist = that.lmWarpPlanDetails
            that.zjlist = that.lmZjwarpPlanDetailDTOSlist
          } else if (res.data.data.warpAxisRecord.beamType == 1) { //如果整经轴就只显示一条整经轴，显示所有浆纱
            that.zjlist = that.lmZjwarpPlanDetailDTOS
            that.beamType = "整经轴"
            that.jsMoreShow = false
            that.zjMoreSpan = "更多整经"
            that.zjMoreShow = true
            that.jslist = that.lmWarpPlanDetailslist
          }

          that.beamTraceDTOList = res.data.data.beamTraceDTOList
          //console.log(that.beamTraceDTOList)
        })

      },
      isnull(val) { //判断是否null
        if (val == null) {
          return 0
        } else {
          return val
        }
      },
      addChar(val) { //是null就加逗号连接,用于连接操作人
        if (val == null) {
          return ""
        } else {
          return (val + ",")
        }
      },
    },

    mounted() {
      this.beamName = this.$route.params.beamName
      this.companyId = this.$route.params.companyId
      this.getInfo()
      history.pushState(null, null, window.location.href);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, window.location.href);
        });
    }
  };

</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

  }

  .messagebox {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .titleTop {
    text-align: left;
    font-size: 20px;
    color: red;

  }

  .one {
    margin-top: 5px;
  }

  .left {
    display: flex;
    justify-content: flex-start;
    margin: 5px;
  }

  .right {
    display: flex;
    justify-content: flex-end;
    font-size: 15px;
    color: red;
    padding: 15px;
  }

  .el-divider__text.is-left {
    background-color: #f2f3f2;
  }

  .el-divider__text {
    background-color: #f2f3f2;
  }

  /* 边框样式 */
  .tableBorder {
    border: #2c3e50 dashed 2px;
    margin: 10px;
    padding-left: 5px;
    border-radius: 20px;
    background-color: #f2f3f2;

  }

  .tableBorder2 {
    border: #2c3e50 dashed 2px;
    margin: 10px;
    padding-left: 5px;
    width: 45%;
    text-align: center;
    border-radius: 20px;
    background-color: #f2f3f2;

  }

  .topDiv {
    height: 30px;
    width: 120px;
    float: left;
  }

  /* 框内样式 */
  .tableInside {
    /* border: 15px solid white; */
    margin-top: 15px;
    border-radius: 15px;
    background-color: #f2f3f2;
  }

</style>
