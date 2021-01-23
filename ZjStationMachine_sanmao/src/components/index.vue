<template>
  <div class="allPage">
    <div class="header">
      <div class="header_left">
        <el-avatar :size="50">
          <img src="../../static/img/logo.png" />
        </el-avatar>
        <span>天衡整经工位操作系统</span>
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

          <img src="../../static/img/refresh.png" @click="reload()" />

          <img src="../../static/img/question.png" />
        </div>
      </div>
    </div>
    <div class="main" style="background:white" v-show="mainShow">
      <div class="btn" @click="dialogVisible=true">扫码</div>

    </div>
    <div class="query" v-show="queryShow">
      <div class="head" :style="enabled ? 'background:rgba(49,124,205,0.6)':''"><span
          style=" justify-content: flex-start;"></span><span style="font-size:2rem">上纱记录</span><span
          style="    justify-content: flex-end;">{{time}}</span></div>
      <div class="con1">
        <div class="con1_left">
          <div class="con1_left_con">
            <span :style="enabled ? 'color:rgba(0,0,0,0.6)':''">整经工号1</span>
            <input :disabled="enabled" v-model="ss_zjgh1" @blur="selectStaffCode('1')"
              :style="enabled ? 'border:1px solid rgba(0,0,0,0.6)':''" />
          </div>
          <div class="con1_left_con">
            <span :style="enabled ? 'color:rgba(0,0,0,0.6)':''">整经工号2</span>
            <input :disabled="enabled" v-model="ss_zjgh2" @blur="selectStaffCode('2')"
              :style="enabled ? 'border:1px solid rgba(0,0,0,0.6)':''" />
          </div>
          <div class="con1_left_con">
            <span :style="enabled ? 'color:rgba(0,0,0,0.6)':''">筒子纱数</span>
            <input :disabled="enabled" v-model="ss_tzss" :style="enabled ? 'border:1px solid rgba(0,0,0,0.6)':''" />
          </div>
        </div>
        <div class="con1_right">
          <div class="con1_right_con">
            <div class="ph">
              <span :style="enabled ? 'color:rgba(0,0,0,0.6)':''">品号：{{pinh}}</span>
            </div>
            <!-- <div class="pm">
              <span :style="enabled ? 'color:rgba(0,0,0,0.6)':''">品名：{{productName}}</span>
            </div> -->
            <div class="pm">
              <span :style="enabled ? 'color:rgba(0,0,0,0.6)':''"></span>
            </div>
            <div class="gg">
              <span :style="enabled ? 'color:rgba(0,0,0,0.6)':''"> 色号：{{seHao}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="head"><span style=" justify-content: flex-start;">品号：{{pinh}}</span><span style="font-size:2rem"
          v-show="isZJ1==0">整经记录{{isZJ1+1}}</span><span style="font-size:2rem"
          v-show="isZJ1==1">整经记录{{isZJ1+1}}</span><span style="font-size:2rem"
          v-show="isZJ1==2">整经记录{{isZJ1+1}}</span><span style="    justify-content: flex-end;">机台：{{zenJinJiHao}}</span>
      </div>


      <div class="con2">
        <div class="con2_left" v-show="isZJ1==0">
          <div class="con2_left_con"><span>整经工号</span><input v-model="form.zj_zjgh2_name"
              @blur="selectStaffCode('3')" /> <span>整经长度</span><input v-model="form.zj_zjcd" /> </div>
          <div class="con2_left_con"><span style="width:4rem">把数</span><input v-model="form.zj_bs" /> <span
              style="    margin-left: 5rem;">扫尾把数</span><input v-model="form.zj_swbs" /> </div>
          <div class="con2_left_con"><span style="width:4rem">扫尾</span><input style="width:6rem;margin-right:1rem;"
              v-model="form.zj_sw1" /><input style="width:6rem;margin-right:1rem;" v-model="form.zj_sw2" /><input
              style="width:6rem;margin-right:1rem;" v-model="form.zj_sw3" /><input style="width:6rem;margin-right:1rem;"
              v-model="form.zj_sw4" /><input style="width:6rem;margin-right:1rem;" v-model="form.zj_sw5" /><input
              style="width:6rem;margin-right:1rem;" v-model="form.zj_sw6" /> </div>
          <div class="con2_left_con"><span style="width:4rem">轴号</span><input v-model="form.zj_zh" /> <span
              style="    margin-left: 5rem;">倒轴工号</span><input v-model="form.zj_dzgh_name"
              @blur="selectStaffCode('4')" /> </div>
          <div class="con2_left_con"><span style="width:4rem">备注</span><input v-model="form.zj_bz"
              style="width:35rem" /> </div>
        </div>
        <div class="con2_left" v-show="isZJ1==1">
          <div class="con2_left_con"><span>整经工号</span><input v-model="form.zj2_zjgh2_name"
              @blur="selectStaffCode('5')" /> <span>整经长度</span><input v-model="form.zj2_zjcd" /> </div>
          <div class="con2_left_con"><span style="width:4rem">把数</span><input v-model="form.zj2_bs" /> <span
              style="    margin-left: 5rem;">扫尾把数</span><input v-model="form.zj2_swbs" /> </div>
          <div class="con2_left_con"><span style="width:4rem">扫尾</span><input style="width:6rem;margin-right:1rem;"
              v-model="form.zj2_sw1" /><input style="width:6rem;margin-right:1rem;" v-model="form.zj2_sw2" /><input
              style="width:6rem;margin-right:1rem;" v-model="form.zj2_sw3" /><input
              style="width:6rem;margin-right:1rem;" v-model="form.zj2_sw4" /><input
              style="width:6rem;margin-right:1rem;" v-model="form.zj2_sw5" /><input
              style="width:6rem;margin-right:1rem;" v-model="form.zj2_sw6" /> </div>
          <div class="con2_left_con"><span style="width:4rem">轴号</span><input v-model="form.zj2_zh" /> <span
              style="    margin-left: 5rem;">倒轴工号</span><input v-model="form.zj2_dzgh_name"
              @blur="selectStaffCode('6')" /> </div>
          <div class="con2_left_con"><span style="width:4rem">备注</span><input v-model="form.zj2_bz"
              style="width:35rem" /> </div>
        </div>
        <div class="con2_left" v-show="isZJ1==2">
          <div class="con2_left_con"><span>整经工号</span><input v-model="form.zj3_zjgh2_name"
              @blur="selectStaffCode('7')" /> <span>整经长度</span><input v-model="form.zj3_zjcd" /> </div>
          <div class="con2_left_con"><span style="width:4rem">把数</span><input v-model="form.zj3_bs" /> <span
              style="    margin-left: 5rem;">扫尾把数</span><input v-model="form.zj3_swbs" /> </div>
          <div class="con2_left_con"><span style="width:4rem">扫尾</span><input style="width:6rem;margin-right:1rem;"
              v-model="form.zj3_sw1" /><input style="width:6rem;margin-right:1rem;" v-model="form.zj3_sw2" /><input
              style="width:6rem;margin-right:1rem;" v-model="form.zj3_sw3" /><input
              style="width:6rem;margin-right:1rem;" v-model="form.zj3_sw4" /><input
              style="width:6rem;margin-right:1rem;" v-model="form.zj3_sw5" /><input
              style="width:6rem;margin-right:1rem;" v-model="form.zj3_sw6" /> </div>
          <div class="con2_left_con"><span style="width:4rem">轴号</span><input v-model="form.zj3_zh" /> <span
              style="    margin-left: 5rem;">倒轴工号</span><input v-model="form.zj3_dzgh_name"
              @blur="selectStaffCode('8')" /> </div>
          <div class="con2_left_con"><span style="width:4rem">备注</span><input v-model="form.zj3_bz"
              style="width:35rem" /> </div>
        </div>

        <div class="con2_right">
          <span class="con2_right_con">匹长：{{piCang}}</span>
          <span class="con2_right_con">匹数：{{piSu}}</span>
          <div class="con2_right_con"> <span>倒轴时间</span>
            <span>{{workQty1Time}}</span></div>
          <!-- <div class="con2_right_con"> <span>其他停车时间</span>
            <span> 2020/11/20 19:23</span></div> -->
        </div>


      </div>
      <div class="bottom_btn">
        <div class="btns" :style=" enabled ? 'background:rgba(163,216,151,0.6);color:rgba(0,0,0,0.6)':''"
          @click="ssFinish()">上纱完成</div>
        <div class="btns" :style=" (enabled&&isZJ1!=2)  ? '':'background:rgba(163,216,151,0.6);color:rgba(0,0,0,0.6)'"
          @click="jjFinish()">交接班</div>
        <div class="btns" :style="isZJ1==2 ?'' :'background:rgba(163,216,151,0.6);color:rgba(0,0,0,0.6)'"
          @click="dialogVisible2=true">完成</div>
        <div class="btns" style="margin-left:15rem;background:#808080;color:white" @click=" back">返回</div>
      </div>
    </div>

    <el-dialog title="扫码" :visible.sync="dialogVisible" width="45%">
      <div
        style="width:100%;height:20rem;    display: flex;flex-direction: column;align-items: center;justify-content: space-around;">
        <input v-model="printCode" style="width:10rem;font-size:1.6rem;height:2rem; border: 1px solid black;"
          ref="inputs" />
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
    <el-dialog title="警告" :visible.sync="dialogVisible3" width="45%">
      <div
        style="width:100%;height:20rem;    display: flex;flex-direction: column;align-items: center;justify-content: space-around;">


        <span style="font-size:1.6rem">整经工号1，整经工号2其中一个不能为空，筒子纱数不为空且大于0，才可提交！</span>
        <div class="stopBtn" @click="dialogVisible3=false">确认</div>
      </div>





    </el-dialog>
    <el-dialog title="警告" :visible.sync="dialogVisible4" width="45%">
      <div
        style="width:100%;height:20rem;    display: flex;flex-direction: column;align-items: center;justify-content: space-around;">

        <span style="font-size:1.6rem">两个班的整经工号，整经长度，把数都填写完整，才可提交！</span>
        <div class="stopBtn" @click="dialogVisible4=false">确认</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {

    name: 'index',

    data() {
      return {
        timer: "",
        time: "",
        enabled: false,
        mainShow: true,
        queryShow: false,
        isZJ1: 0,
        printCode: "",
        dialogVisible3: false,
        dialogVisible4: false,
        dialogVisible: false,
        dialogVisible2: false,


        productName: "",
        pinh: "",
        specification: "",
        piCang: "",
        piSu: "",
        seHao: "",
        workQty1Time: "",
        zenJinJiHao: "",
        companyId: "10000025",
        ss_zjgh1: "",
        ss_zjgh2: "",
        ss_zjgh1_code: "",
        ss_zjgh2_code: "",

        ss_tzss: "",
        form: {

          zj_zjgh_name: "",
          zj_zjgh2: "",
          zj_zjcd: "",
          zj_bs: "",
          zj_sw1: "",
          zj_sw2: "",
          zj_sw3: "",
          zj_sw4: "",
          zj_sw5: "",
          zj_sw6: "",
          zj_swbs: "",
          zj_zh: "",
          zj_dzgh: "",
          zj_dzgh_name: "",
          zj_bz: "",
          zj2_zjgh_name: "",
          zj2_zjgh2: "",
          zj2_sw1: "",
          zj2_sw2: "",
          zj2_sw3: "",
          zj2_sw4: "",
          zj2_sw5: "",
          zj2_sw6: "",
          zj2_zjcd: "",
          zj2_bs: "",
          zj2_swbs: "",
          zj2_zh: "",
          zj2_dzgh: "",
          zj2_dzgh_name: "",
          zj2_bz: "",
          zj3_zjgh_name: "",
          zj3_zjgh2: "",
          zj3_sw1: "",
          zj3_sw2: "",
          zj3_sw3: "",
          zj3_sw4: "",
          zj3_sw5: "",
          zj3_sw6: "",
          zj3_zjcd: "",
          zj3_bs: "",
          zj3_swbs: "",
          zj3_zh: "",
          zj3_dzgh: "",
          zj3_dzgh_name: "",
          zj3_bz: ""
        },
        warpPlanId: "",
        Id: "",
        shiftManageList: [],
        shiftStartTime: "",
        shiftEndTime: "",
        shiftWork: ""

      }
    },
    methods: {
      getInfo(val) {
        let url = "http://106.12.219.66:8763/lm-zjwarp-plan-detail/selectByPlanB";
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
          console.log(res);
          if (res.data.data) {
            this.dialogVisible = false
            this.mainShow = false
            this.queryShow = true
            this.warpPlanId = res.data.data.lzdid
            this.Id = res.data.data.id
            this.productName = res.data.data.productName //品名
            this.pinh = res.data.data.pinh
            this.specification = res.data.data.specification
            this.piCang = res.data.data.piCang
            this.piSu = res.data.data.piSu
            this.zenJinJiHao = res.data.data.zenJinJiHao
            this.seHao = res.data.data.huaXinDans[0].cpscsh
            if (res.data.data.workQty1Time != null) {
              this.workQty1Time = res.data.data.workQty1Time
            }
            if (res.data.data.workQty2Time != null) {
              this.workQty1Time = res.data.data.workQty2Time
            }
            if (res.data.data.workQty3Time != null) {
              this.workQty1Time = res.data.data.workQty3Time
            }

            this.form.zj_zjcd = res.data.data.planYield
            this.form.zj2_zjcd = res.data.data.planYield
            this.form.zj3_zjcd = res.data.data.planYield

          } else {
            this.$message.error('数据查询失败！');
          }
          //  this.printCode = ""

        });

      },
      isChinese(temp) {
        let re = /[^\u4E00-\u9FA5]/;
        if (re.test(temp)) return false;
        return true;
      },
      selectStaffCode(flag) {
        console.log(flag)
        let url = "http://106.12.219.66:8227/report/getSimpleReport";
        let data = {}
        let header = {
          companyId: this.companyId
        }
        if (flag == "1") {

          data = {

            tableName: "s_staff",
            query: {
              staff_code: this.ss_zjgh1
            }
          };
        } else if (flag == "2") {
          data = {

            tableName: "s_staff",
            query: {
              staff_code: this.ss_zjgh2
            }
          };
        } else if (flag == "3") {
          data = {

            tableName: "s_staff",
            query: {
              staff_code: this.form.zj_zjgh2_name
            }
          };
        } else if (flag == "4") {
          data = {

            tableName: "s_staff",
            query: {
              staff_code: this.form.zj_dzgh_name
            }
          };
        } else if (flag == "5") {
          data = {

            tableName: "s_staff",
            query: {
              staff_code: this.form.zj2_zjgh2_name
            }
          };
        } else if (flag == "6") {
          data = {

            tableName: "s_staff",
            query: {
              staff_code: this.form.zj2_dzgh_name
            }
          };
        } else if (flag == "7") {
          data = {

            tableName: "s_staff",
            query: {
              staff_code: this.form.zj3_zjgh2_name
            }
          };
        } else if (flag == "8") {
          data = {

            tableName: "s_staff",
            query: {
              staff_code: this.form.zj3_dzgh_name
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
                this.ss_zjgh1_code = this.ss_zjgh1
                this.ss_zjgh1 = res.data.data[0].staff_name

              } else if (flag == "2") {
                this.ss_zjgh2_code = this.ss_zjgh2
                this.ss_zjgh2 = res.data.data[0].staff_name
              } else if (flag == "3") {
                this.form.zj_zjgh2 = res.data.data[0].staff_code
                this.form.zj_zjgh2_name = res.data.data[0].staff_name
              } else if (flag == "4") {
                this.form.zj_dzgh = res.data.data[0].staff_code
                this.form.zj_dzgh_name = res.data.data[0].staff_name
              } else if (flag == "5") {
                this.form.zj2_zjgh2 = res.data.data[0].staff_code
                this.form.zj2_zjgh2_name = res.data.data[0].staff_name
              } else if (flag == "6") {
                this.form.zj2_dzgh = res.data.data[0].staff_code
                // this.ss_zjgh2_code = this.ss_zjgh2
                this.form.zj2_dzgh_name = res.data.data[0].staff_name
              } else if (flag == "7") {
                this.form.zj3_zjgh2 = res.data.data[0].staff_code
                // this.ss_zjgh2_code = this.ss_zjgh2
                this.form.zj3_zjgh2_name = res.data.data[0].staff_name
              } else if (flag == "8") {
                this.form.zj3_dzgh = res.data.data[0].staff_code
                // this.ss_zjgh2_code = this.ss_zjgh2
                this.form.zj3_dzgh_name = res.data.data[0].staff_name
              }

            } else {
              this.$message({
                message: "工号不正确！",
                type: "warning",
              });
              if (flag == "1") {
                this.ss_zjgh1_code = ""
                this.ss_zjgh1 = ""

              } else if (flag == "2") {
                this.ss_zjgh2_code = ""
                this.ss_zjgh2 = ""
              } else if (flag == "3") {
                this.form.zj_zjgh2 = ""
                this.form.zj_zjgh2_name = ""
              } else if (flag == "4") {
                this.form.zj_dzgh = ""
                this.form.zj_dzgh_name = ""
              } else if (flag == "5") {
                this.form.zj2_zjgh2 = ""
                this.form.zj2_zjgh2_name = ""
              } else if (flag == "6") {
                this.form.zj2_dzgh = ""
                this.form.zj2_dzgh_name = ""
              } else if (flag == "7") {
                this.form.zj3_zjgh2 = ""
                this.form.zj3_zjgh2_name = ""
              } else if (flag == "8") {
                this.form.zj3_dzgh = ""
                this.form.zj3_dzgh_name = ""
              }
            }
          });
        }

      },
      getDate() {
        var nowDate = new Date();

        var year = nowDate.getFullYear();

        var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1)

          :
          nowDate.getMonth() + 1;

        var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate

          .getDate();

        return (year + "-" + month + "-" + day);
      },
      getShift() {
        console.log(this.getDate())
        let url = "http://106.12.219.66:8763/shift-rule/selectShift";
        let data = {};
        data.workshopId = "1";
        data.macTypeId = "040000";
        let header = {
          companyId: this.companyId
        }
        axios({
            url: url,
            method: "post",
            headers: header,
            data: data,
            // headers: headers
          }).then((response) => {
            // warp_api("/shift-rule/selectShift",data,this.companyId)
            // .then(response => {
            console.log(response);
            this.shiftManageList = response.data.data;
            for (let i = 0; i < this.shiftManageList.length; i++) {
              this.shiftManageList[i].shiftStartTimeH = this.shiftManageList[i].startTime.slice(0, 2);
              this.shiftManageList[i].shiftStartTimeI = this.shiftManageList[i].startTime.slice(3, 5);
              this.shiftManageList[i].shiftStartTimeS = this.shiftManageList[i].startTime.slice(6, 8);
              this.shiftManageList[i].shiftEndTimeH = this.shiftManageList[i].endTime.slice(0, 2);
              this.shiftManageList[i].shiftEndTimeI = this.shiftManageList[i].endTime.slice(3, 5);
              this.shiftManageList[i].shiftEndTimeS = this.shiftManageList[i].endTime.slice(6, 8);
            }

            console.log(this.getShiftName())
            let json = this.getShiftName()
            this.shiftStartTime = this.getDate() + " " + json.startTime
            this.shiftEndTime = this.getDate() + " " + json.endTime
            this.shiftWork = String(json.shiftQueue)
          })
          .catch(error => {
            console.log(error);
          });
      },
      getShiftName() {
        let date = new Date();
        let hour = date.getHours();
        hour = add_0(hour);
        let minute = date.getMinutes();
        minute = add_0(minute);
        let seconds = date.getSeconds();
        seconds = add_0(seconds);

        function add_0(param) {
          if (param < 10) {
            param = "0" + param
          }
          return param
        }
        let time = hour + ":" + minute + ":" + seconds;
        // console.log(this.shiftManageList);
        for (let i = 0; i < this.shiftManageList.length; i++) {
          this.shiftManageList[i].id = i + 1;
          if (this.shiftManageList[i].endTime > this.shiftManageList[i].startTime) {
            if (time < this.shiftManageList[i].endTime && time > this.shiftManageList[i].startTime) {
              // this.name = this.shiftManageList[i].name;
              // this.$store.state.shiftName = this.shiftManageList[i].name;
              // console.log(this.$store.state.shiftName);
              return this.shiftManageList[i]
            }
          } else {
            if (time < this.shiftManageList[i].endTime || time > this.shiftManageList[i].startTime) {
              // this.name = this.shiftManageList[i].name;
              // this.$store.state.shiftName = this.shiftManageList[i].name;
              // console.log(this.$store.state.shiftName);
              return this.shiftManageList[i]
            }
          }
        }
      },
      ssFinish() {
        if ((this.ss_zjgh1 == "" && this.ss_zjgh2 == "") || (this.ss_tzss == "" || this.ss_tzss <= 0)) {
          console.log("不能为空！")
          this.dialogVisible3 = true

        } else {
          let url = "http://106.12.219.66:8763/lm-zjwarp-plan-detail/zjYarnSpindle";
          let data = {

            staffId1Yarn: this.ss_zjgh1_code,
            staffId2Yarn: this.ss_zjgh2_code,
            yarnCount: this.ss_tzss,
            warpPlanId: this.Id
            // warpPlanId:1
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
            console.log(res)
            if (res.data.result == "ok") {
              this.$message({
                message: '上纱成功!',
                type: 'success'
              });
              this.getInfo(this.printCode)
              this.enabled = true
            } else {
              this.$message.error('上纱失败！');
            }
          })

        }

      },
      jjFinish() {
        let url = "http://106.12.219.66:8763/lm-zjwarp-plan-detail/submit";
        let data = {


        };
        let header = {
          companyId: this.companyId
        }
        if (this.isZJ1 == 0) {

          data = {
            "empId1": this.form.zj_zjgh2,
            "workQty1": this.form.zj_zjcd,
            "baCount1": this.form.zj_bs,
            "weiBaCount1": this.form.zj_swbs,
            "saoWei1": this.form.zj_sw1 + "," + this.form.zj_sw2 + "," + this.form.zj_sw3 + "," + this.form.zj_sw4 +
              "," + this.form.zj_sw5 + "," + this.form.zj_sw6,
            "shiftWork": this.shiftWork,
            "shiftStartDatetime": this.shiftStartTime,
            "shiftEndDatetime": this.shiftEndTime,
            "status": 6, //673
            "axisNo": this.form.zj_zh,
            "reAxisStaffId": this.form.zj_dzgh,
            "remark": this.form.zj_bz,
            "id": this.warpPlanId,
            workQty1Time: "2021-09-10 18:00:00"
          }


        } else if (this.isZJ1 == 1) {

          data = {
            "empId2": this.form.zj2_zjgh2,
            "workQty2": this.form.zj2_zjcd,
            "baCount2": this.form.zj2_bs,
            "weiBaCount2": this.form.zj2_swbs,
            "saoWei2": this.form.zj2_sw1 + "," + this.form.zj2_sw2 + "," + this.form.zj2_sw3 + "," + this.form
              .zj2_sw4 + "," + this.form.zj2_sw5 + "," + this.form.zj2_sw6,
            "shiftWork2": this.shiftWork,
            "shiftStartDatetime2": this.shiftStartTime,
            "shiftEndDatetime2": this.shiftEndTime,
            "status": 7, //673
            "axisNo": this.form.zj2_zh,
            "reAxisStaffId": this.form.zj2_dzgh,
            "remark": this.form.zj2_bz,
            "id": this.warpPlanId,
            workQty2Time: "2021-09-10 18:00:00"
          }
        } else if (this.isZJ1 == 2) {
          data = {
            "empId3": this.form.zj3_zjgh2,
            "workQty3": this.form.zj3_zjcd,
            "baCount3": this.form.zj3_bs,
            "weiBaCount3": this.form.zj3_swbs,
            "saoWei3": this.form.zj3_sw1 + "," + this.form.zj3_sw2 + "," + this.form.zj3_sw3 + "," + this.form
              .zj3_sw4 + "," + this.form.zj3_sw5 + "," + this.form.zj3_sw6,
            "shiftWork3": this.shiftWork,
            "shiftStartDatetime3": this.shiftStartTime,
            "shiftEndDatetime3": this.shiftEndTime,
            "status": 3, //673
            "axisNo": this.form.zj3_zh,
            "reAxisStaffId": this.form.zj3_dzgh,
            "remark": this.form.zj3_bz,
            "id": this.warpPlanId,
            workQty3Time: "2021-09-10 18:00:00"
          }

        }
        console.log(this.form)
        console.log(this.isZJ1)
        let that = this;
        axios({
          url: url,
          method: "post",
          headers: header,
          data: data,
          // headers: headers
        }).then((res) => {
          console.log(res)
          if (res.data.result == "ok") {
            this.$message({
              message: '操作成功!',
              type: 'success'
            });
            if (this.isZJ1 == 2) {
              this.isZJ1 = 0
            } else {
              this.isZJ1 = this.isZJ1 + 1
            }
          } else {
            this.$message.error(res.data.successMessage + '！');
          }
        })
      },
      Finish() {

        if (this.form.zj2_zjgh2 == "" || this.form.zj_zjgh2 == "" || this.form.zj_zjcd == "" || this.form.zj2_zjcd ==
          "" || this.form.zj_bs == "" || this.form.zj2_bs == "") {

          this.dialogVisible4 = true

        } else {
          let url = "http://106.12.219.66:8763/lm-zjwarp-plan-detail/submit";
          let data = {
            "empId3": this.form.zj3_zjgh2,
            "workQty3": this.form.zj3_zjcd,
            "baCount3": this.form.zj3_bs,
            "weiBaCount3": this.form.zj3_swbs,
            "saoWei3": this.form.zj3_sw1 + "," + this.form.zj3_sw2 + "," + this.form.zj3_sw3 + "," + this.form
              .zj3_sw4 + "," + this.form.zj3_sw5 + "," + this.form.zj3_sw6,
            "shiftWork3": this.shiftWork,
            "shiftStartDatetime3": this.shiftStartTime,
            "shiftEndDatetime3": this.shiftEndTime,
            "status": 3, //673
            "axisNo": this.form.zj3_zh,
            "reAxisStaffId": this.form.zj3_dzgh,
            "remark": this.form.zj3_bz,
            "id": this.warpPlanId,
            workQty3Time: "2021-09-10 18:00:00"
          }


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
            console.log(res)
            if (res.data.successMessage == "报工") {
              this.$message({
                message: '操作成功!',
                type: 'success'
              });
              this.printCode = ""
              this.enabled = false
              this.dialogVisible2 = false
              this.showQuery = false
              this.mainShow = true
              for (var item in this.form) {
                this.form[item] = ""
              }
              this.ss_tzss = ""
              this.ss_zjgh1 = ""
              this.ss_zjgh2 = ""
              if (this.isZJ1 == 2) {
                this.isZJ1 = 0
              } else {
                this.isZJ1 = this.isZJ1 + 1
              }
            } else {
              this.$message.error(res.data.successMessage + '！');
            }
          })


        }




      },



      showQuery() {
        this.mainShow = false
        this.queryShow = true
      },


      back() {


        this.queryShow = false
        this.mainShow = true



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
      },
    },
    mounted() {
      this.timer = setInterval(this.getTime, 1000);
      this.getShift()
    },
    watch: {

      printCode(val) {
        if (val.length == 9) {
          this.getInfo(val)

        }
      },

      queryShow(val) {
        if (val == true) {
          this.getShift()
          this.ss_zjgh1 = ""
          this.ss_zjgh2 = ""
          this.ss_tzss = ""
        }
      },
      dialogVisible(val) {
        if (val == true) {
          this.$nextTick((x) => {
            this.$refs.inputs.focus();
          })
        } else {
          this.$nextTick((x) => {
            this.$refs.inputs.blur();
          })
        }
      },
      dialogVisible4(val) {
        if (val == true) {
          this.dialogVisible2 = false
        }
      }

    }

  }

</script>

<style scoped>
  .header {
    background: #317CCD;
    color: white;
  }

  .allPage {
    width: 100%;
    height: 768px;
    background: #E2E7ED;
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

  .head {
    width: 100%;
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
    height: 9rem;
    display: flex;
    background: white;
    margin-bottom: 1rem;
  }

  .con1_left {
    width: 65%;
    height: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

  }

  .con1_left_con {
    width: 30%;
    height: 100%;
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

  }

  .con1_left_con input {
    width: 11rem;
    height: 3.5rem;
    border: 1px solid black;
    font-size: 1.6rem;
  }

  .con1_right {
    width: 35%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

  }

  .con1_right_con {
    width: 90%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .ph {
    width: 100%;
    height: 30%;

    display: flex;
    align-items: center;
  }

  .pm {
    width: 100%;
    height: 40%;
    display: flex;
    align-items: center;


  }

  .pm span {
    overflow: hidden;

    text-overflow: ellipsis;

    display: -webkit-box;

    -webkit-box-orient: vertical;

    -webkit-line-clamp: 2;
  }

  .gg span {
    overflow: hidden;

    text-overflow: ellipsis;

    display: -webkit-box;

    -webkit-box-orient: vertical;

    -webkit-line-clamp: 2;
  }

  .gg {
    width: 100%;
    height: 40%;
    display: flex;
    align-items: center;
  }

  .con2 {
    width: 100%;
    height: 19rem;
    background: white;
    padding-bottom: 0.5rem;
    display: flex;
  }

  .con2_left {
    width: 85%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .con2_left_con {
    width: 100%;
    height: 25%;
    display: flex;
    align-items: center;
    font-size: 1.6rem;
  }

  .con2_left_con span {
    margin-left: 1rem;
    margin-right: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 8rem;
  }

  .con2_left_con input {
    width: 11rem;
    height: 2.5rem;
    font-size: 1.5rem;
    border: 1px solid black;
  }

  .con2_right {
    width: 13%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

  }

  .con2_right_con {
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    font-size: 1.3rem;
    color: #808080;
    text-align: right;
  }

  .bottom_btn {
    width: 100%;
    height: 8rem;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .btns {
    width: 10rem;
    height: 70%;
    background: #A3D897;
    border-top: 3px solid #ffffff;
    border-left: 3px solid #ffffff;
    border-bottom: 3px solid #717171;
    border-right: 3px solid #717171;
    display: flex;
    margin-left: 2rem;
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
