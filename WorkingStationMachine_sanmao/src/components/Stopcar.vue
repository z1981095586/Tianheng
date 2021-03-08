<template>
  <div class="operationPane">
    <!-- 挡车部分操作栏组件-->
    <!-- 挡车部分主菜单-->
    <div
      class="operationPane_con"
      style="display: flex; justify-content: space-around; align-items: center"
      v-show="isMainShow"
    >
      <div class="main_btn" @click="toShift">换班</div>
      <div class="main_btn" @click="toCar">挡车</div>
      <img src="../../static/img/close.png" @click="closeCurrentPage()" />
    </div>

    <div
      class="operationPane_con"
      style="display: flex; justify-content: center; align-items: flex-start"
      v-show="isMachine"
    >
      <div class="operationPane_con_machineList">
        <el-checkbox-group
          v-model="checkMachine"
          style="width: 100%; height: 100%"
          :max="8"
        >
          <el-checkbox-button
            size="medium"
            v-for="(item, index) in machineList"
            style="magin: 1rem; font-size: 2rem"
            :label="item.machine_id"
            :key="index"
            >{{ item.machine_id }}</el-checkbox-button
          >
        </el-checkbox-group>
      </div>
      <div class="operationPane_con_machineList_btn">
        <div class="operationPane_con_machineList_btn_left">
          <div class="operationPane_con_machineList_btn_leftBtn" @click="sureMachine()">
            保存
          </div>
          <div
            class="operationPane_con_machineList_btn_leftBtn"
            style=""
            @click="goback()"
          >
            返回
          </div>
        </div>
        <div class="operationPane_con_machineList_btn_right">
          <el-pagination
            background
            small
            :pager-count="3"
            @current-change="CurrentChange"
            layout="prev, pager, next"
            :total="total_num"
            :page-size="page_size"
          >
          </el-pagination>
        </div>
      </div>

      <div class="search" style="left: 4rem; width: 95%; top: 18px">
        <span style="font-size: 1.5rem">搜索：</span
        ><input
          style="font-size: 1.5rem"
          v-model="search_machine"
          placeholder="输入机台号"
        />
        <div class="checked_machine_btn_one" style="height: 3rem" @click="search()">
          确认
        </div>
        <span style="color: red; margin-left: 1rem"
          >选中机台：{{ String(this.checkMachine).replace(/ /g, "") }}</span
        >
      </div>
      <img src="../../static/img/close.png" @click="goback()" />
    </div>

    <div
      class="operationPane_con"
      style="
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
      "
      v-show="isCar"
    >
      <div class="checked_machine">
        <div
          class="checked_machine_one"
          v-for="(item, index) in checkMachineColor"
          @click="checkShutdown(item.label)"
          :style="
            item.isChecked
              ? 'background:rgb(50, 150, 250);color:white;'
              : 'background:#808080;color:white;'
          "
          :key="index"
        >
          <span>{{ item.label }}</span
          ><span style="font-size: 1rem" v-show="!item.isShutDown">（状态:开机）</span
          ><span v-show="item.isShutDown" style="font-size: 1rem">（状态:关机）</span>
        </div>
      </div>
      <div class="checked_machine_btn">
        <div class="checked_machine_btn_one" @click="openMachine()">开机</div>
        <div class="checked_machine_btn_one" @click="shutdownMachine()">关机</div>
        <div class="checked_machine_btn_one" @click="toLuobu" v-show="enabled">落布</div>
        <div class="checked_machine_btn_one" @click="toPz" v-show="enabled">改品种</div>

        <div
          class="checked_machine_btn_one"
          style="background: #808080"
          v-show="!enabled"
        >
          落布
        </div>
        <div
          class="checked_machine_btn_one"
          style="background: #808080"
          v-show="!enabled"
        >
          改品种
        </div>

        <div class="checked_machine_btn_one" @click="chooseAll()">全选</div>
        <div
          class="checked_machine_btn_one"
          style="margin-left: 7rem; background: #808080"
          @click="goback2()"
        >
          返回
        </div>
      </div>
      <img src="../../static/img/close.png" @click="goback2()" />
    </div>

    <div
      class="operationPane_con"
      style="display: flex; justify-content: center; align-items: flex-start"
      v-show="shiftShow"
    >
      <div class="operationPane_con_machineList">
        <el-checkbox-group
          :max="1"
          @change="checkName"
          v-model="checkNames"
          style="width: 100%; height: 100%"
        >
          <el-checkbox-button
            size="medium"
            v-for="(item, index) in NameList"
            style="magin: 1rem; font-size: 2rem"
            :label="item.staff_name"
            :key="index"
            >{{ item.staff_name }}</el-checkbox-button
          >
        </el-checkbox-group>
      </div>
      <div class="operationPane_con_machineList_btn">
        <div class="operationPane_con_machineList_btn_left">
          <div class="operationPane_con_machineList_btn_leftBtn" @click="sureShift()">
            保存
          </div>
          <div
            class="operationPane_con_machineList_btn_leftBtn"
            style="background: #808080; color: white"
            @click="ShiftBack()"
          >
            返回
          </div>
        </div>
        <div class="operationPane_con_machineList_btn_right">
          <el-pagination
            background
            small
            :pager-count="3"
            @current-change="CurrentNameChange"
            layout="prev, pager, next"
            :total="total_num2"
            :page-size="page_size2"
          >
          </el-pagination>
        </div>
      </div>
      <div class="select_shift">
        <div>
          <span>班次：</span
          ><select v-model="checkedClass">
            <option value="9">A班</option>
            <option value="10">B班</option>
            <option value="11">C班</option>
          </select>
        </div>
        <div><span>挡车工：</span><input disabled :value="checkedName" /></div>
        <div></div>
      </div>

      <img src="../../static/img/close.png" @click="ShiftBack()" />
    </div>

    <div
      class="operationPane_con"
      style="
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;
      "
      v-show="PzShow"
    >
      <input
        v-model="pzPrintCode"
        ref="inp"
        style="position: absolute; left: 1rem; top: 1rem; font-size: 1.5rem"
        v-show="showPrintCode"
      />
      <div class="pz_left">
        <div class="pz_left_top">
          <div class="pz_left_top_title">
            <span>原品种信息</span
            ><span style="font-size: 1.3rem; color: red"
              >选中机台：{{ checkedMachine }}</span
            >
          </div>
          <div class="pz_left_top_title">
            <span>品号：{{ pin_hao2 }}</span>
          </div>
          <div class="pz_left_top_title">
            <span>色号：{{ se_hao2 }}</span>
          </div>
          <div class="pz_left_top_title" style="height: 3rem">
            <span>批次：{{ pi_ci2 }}</span>
          </div>
          <div class="pz_left_top_title2" style="margin-top: 1rem">
            <span>品种信息</span>
          </div>
          <div class="pz_left_top_title2">
            <span>品号：</span><span style="color: #8c8c8c">{{ pin_hao }}</span>
          </div>
          <div class="pz_left_top_title2">
            <span>色号：</span><span style="color: #8c8c8c">{{ se_hao }}</span>
          </div>
          <div class="pz_left_top_title2" style="height: 3rem">
            <span>批次：</span><span style="color: #8c8c8c">{{ pi_ci }}</span>
          </div>
        </div>
        <div class="pz_left_bottom">
          <div
            class="pz_left_bottom_btn_active"
            @click="showPcode"
            v-text="showPrintCode ? '改品种' : '扫码'"
          ></div>
          <div class="pz_left_bottom_btn_unactive" @click="cancelPz()">取消</div>
        </div>
      </div>
      <div class="pz_right">
        <div class="pz_right_top">
          <div class="pz_right_top_input">
            <span>当前织布长度：</span>
            <div
              :class="
                zbFocus ? 'pz_right_top_input_active' : 'pz_right_top_input_unactive'
              "
              @click="iszb"
            >
              <span>{{ zbLength }}</span>
            </div>
          </div>
          <div class="pz_right_top_input">
            <span>当前剩余经轴长度：</span>
            <div
              :class="
                jzFocus ? 'pz_right_top_input_active' : 'pz_right_top_input_unactive'
              "
              @click="isjz"
            >
              <span>{{ jzLength }}</span>
            </div>
          </div>
        </div>
        <div class="pz_right_bottom">
          <div class="pz_right_bottom_con">
            <keyboard ref="board1" @sure="getNumber" @change="NumberChange"></keyboard>
          </div>
        </div>
      </div>
      <img src="../../static/img/close.png" @click="cancelPz()" />
    </div>

    <div
      class="operationPane_con"
      style="display: flex; justify-content: space-around; align-items: center"
      v-show="LbShow"
    >
      <div class="pz_right">
        <div class="pz_right_top">
          <div class="pz_right_top_input">
            <span>落布米长：</span>
            <div
              :class="
                lbFocus ? 'pz_right_top_input_active' : 'pz_right_top_input_unactive'
              "
              @click="islb"
            >
              <span v-text="lbLength"></span>
            </div>
          </div>
        </div>
        <div class="pz_right_bottom">
          <div class="pz_right_bottom_con">
            <keyboard ref="board2" @sure="getNumber2" @change="NumberChange2"></keyboard>
          </div>
        </div>
      </div>
      <div class="pz_left">
        <div class="pz_left_top">
          <div class="pz_left_top_title" style="margin-top: 6rem">
            <span>品号：{{ pin_hao2 }}</span>
          </div>
          <div class="pz_left_top_title">
            <span>色号：{{ se_hao2 }}</span>
          </div>
          <div class="pz_left_top_title" style="height: 3rem">
            <span>批次：{{ pi_ci2 }}</span>
          </div>
        </div>
        <div class="pz_left_bottom">
          <div class="pz_left_bottom_btn_unactive" @click="cancelLb()">取消</div>
        </div>
      </div>

      <img src="../../static/img/close.png" @click="cancelLb()" />
    </div>
  </div>
</template>

<script>
let host = "http://120.55.124.53:12140";
import axios from "axios";
import keyboard from "@/components/keyboard";
export default {
  components: {
    keyboard,
  },
  name: "Stopcar",
  data() {
    return {
      company_id: "10000025",
      isMainShow: true, //页面显示隐藏
      isMachine: false,
      shiftShow: false,
      PzShow: false,
      isCar: false,
      LbShow: false,

      checkedClass: "9",
      checkedName: "",
      checkNames: [],
      checkMachine: [], //挡车选中机台列表
      checkMachineColor: [], //挡车选中机台列表颜色
      NameList: [],
      machineList: [], //挡车机台列表
      zbFocus: false, //div选中聚焦
      jzFocus: false,
      zbLength: "", //div内容
      jzLength: "",
      lbFocus: false,
      lbLength: "",
      enabled: false,
      page_size: 16,
      page_num: 1,
      page_size2: 15,
      page_num2: 1,
      total_num2: null,
      total_num: null,
      mac_type_id: "030100",
      checkedMachine: "",
      showPrintCode: false,
      pzPrintCode: "",
      search_machine: "",

      product_name: "",
      pin_hao: "",
      se_hao: "",
      pin_hao2: "",
      se_hao2: "",
      pi_ci2: "",
    };
  },
  methods: {
    search() {
      this.getMachineList(this.search_machine);
    },
    showPcode() {
      if (this.showPrintCode == true) {
        //console.log(this.pzPrintCode);
        //console.log(this.checkedMachine);
        //console.log(this.zbLength);
        //console.log(this.jzLength);
        if (this.pzPrintCode == "") {
          this.$message({
            message: "请先扫码！",
            type: "warning",
          });
        } else if (this.zbLength == "") {
          this.$message({
            message: "织布长度为空！",
            type: "warning",
          });
        } else if (this.jzLength == "") {
          this.$message({
            message: "经轴长度为空！",
            type: "warning",
          });
        } else {
          let url = host + "/api/stationMachine/luoBu";
          let url2 = host + "/api/stationMachine/downAxis";
          let that = this;
          axios({
            url: url,
            method: "post",
            data: {
              selectInfo: {
                company_id: that.company_id,
              },
              pce_cloth_each: {
                machine_id: that.checkedMachine,
                yield_meter: String(that.zbLength),
              },
            },

            // headers: headers
          }).then((res) => {
            //console.log(res);
            if (res.data.message == "成功") {
              //落布成功了再换品种
              axios({
                url: url2,
                method: "post",
                data: {
                  selectInfo: {
                    company_id: that.company_id,
                  },
                  machine_id: that.checkedMachine,
                  remain_length: that.jzLength,
                },

                // headers: headers
              }).then((response) => {
                if (res.data.message == "成功") {
                  this.$message.success("改品种成功！");
                } else {
                  this.$message.error("改品种失败！");
                }
              });
            } else {
              this.$message({
                message: res.data.message,
                type: "warning",
              });
            }
          });
        }
      } else {
        this.showPrintCode = true;
        this.$nextTick((x) => {
          this.$refs.inp.focus();
        });
      }
    },
    CurrentNameChange(e) {
      //console.log(e);
      this.page_num2 = e;
      this.getStaffList();
    },
    getGroup(classname) {
      //获取组员信息
      this.checkedName = localStorage.getItem("dcName");
      // let url2 = host + "/api/group/getGroupDetail";
      // let that = this;
      // axios({
      //   url: url2,
      //   method: "post",
      //   data: {
      //     selectInfo: {
      //       company_id: that.company_id,
      //     },
      //     shiftGroup: {
      //       id: 16,
      //     },
      //   },

      //   // headers: headers
      // }).then((res) => {
      //   //console.log(res);
      //   if (classname == "A班") {
      //     res.data.result.forEach((element) => {
      //       if (element.group_name == "挡车班A组") {
      //         //console.log(element);
      //         that.checkedName = element.staffList[0].staff_name;
      //       }
      //     });
      //   } else if (classname == "B班") {
      //     res.data.result.forEach((element) => {
      //       if (element.group_name == "挡车班B组") {
      //         that.checkedName = element.staffList[0].staff_name;
      //       }
      //     });
      //   } else if (classname == "C班") {
      //     res.data.result.forEach((element) => {
      //       if (element.group_name == "挡车班C组") {
      //         that.checkedName = element.staffList[0].staff_name;
      //       }
      //     });
      //   }
      //   //console.log(that.checkedName);
      // });
    },
    getStaffList() {
      let url = "http://106.12.219.66:8227/report/getSimpleReport";
      let data = {
        tableName: "s_staff",
        sort: "DESC",
        sortCloumn: "id",
        selectFields: ["id", "staff_name"],
        pageNum: this.page_num2,
        pageSize: this.page_size2,
        query: {
          staff_organization_id: 39, //挡车工
        },
      };
      let headers = {
        companyId: this.company_id,
      };
      this.NameList = [];
      let that = this;
      axios({
        url: url,
        method: "post",
        headers: headers,
        data: data,

        // headers: headers
      }).then((res) => {
        //console.log(res);
        let arr = res.data.data;
        for (let i = 0; i < arr.length; i++) {
          that.NameList.push(arr[i]);
        }
        //console.log(that.NameList);
        that.total_num2 = res.data.total;
        //   //console.log(that.total_num2)
      });
    },
    //        closeCurrentPage(){
    //   //console.log(this.szMachineShow)
    //  if(this.szMachineShow==true){
    //       this.isCheckedMachine = false;
    //   this.checkedMachineNum = "";
    //   this.checkMachine = []
    //   this.szMachineShow = false;
    //   this.szShiftShow = false;
    //   this.szMainShow = true;
    //   return
    //  }
    //      if(this.szShiftShow==true){
    //   this.szMachineShow = false;
    //     this.szShiftShow = false;
    //     this.szMainShow = true;
    //     this.isStartChange = false
    //   return
    //  }

    // },
    CurrentChange(e) {
      //console.log(e);
      this.page_num = e;
      this.getMachineList();
    },
    getMachineList(machine_id) {
      let data = {};
      if (machine_id) {
        data = {
          selectInfo: {
            company_id: this.company_id,
            page_size: this.page_size,
            page_num: this.page_num,
          },
          mac_type_id: this.mac_type_id,
          machine_id: machine_id,
        };
      } else {
        data = {
          selectInfo: {
            company_id: this.company_id,
            page_size: this.page_size,
            page_num: this.page_num,
          },
          mac_type_id: this.mac_type_id,
        };
      }
      let that = this;
      let url = host + "/api/stationMachine/getMachines";
      let method = axios({
        url: url,
        method: "post",
        data: data,
        // headers: headers
      }).then((response) => {
        that.total_num = response.data.result.total_num;
        let array = response.data.result.models;
        that.machineList = [];
        array.forEach((element) => {
          that.machineList.push(element);
        });
      });
    },
    islb() {
      //点击落布div键盘输入
      this.lbFocus = !this.lbFocus;
      if (this.lbFocus == true) {
        this.$refs.board2.number = [];
        //console.log(this.lbLength.length);
        if (this.lbLength.length > 0) {
          let k = [];
          for (let i = 0; i < this.lbLength.length; i++) {
            k.push(this.lbLength.substr(i, 1));
          }
          this.$refs.board2.number = k;
        }
      }
    },
    getNumber2(number) {
      //点击落布div键盘输入值确定按钮事件

      if (this.lbFocus == true) {
        this.lbLength = number;
      }
      this.lbFocus = false;
      //console.log(number);
      //console.log(this.checkMachineColor);
      this.checkMachineColor.forEach((element) => {
        if (element.isChecked == true) {
          if (String(this.lbLength) != "") {
            let url = host + "/api/stationMachine/luoBu";
            let that = this;
            axios({
              url: url,
              method: "post",
              data: {
                selectInfo: {
                  company_id: that.company_id,
                },
                pce_cloth_each: {
                  machine_id: element.label,
                  yield_meter: String(this.lbLength),
                },
              },

              // headers: headers
            }).then((res) => {
              //console.log(res);
              this.$message({
                message: res.data.message,
                type: "warning",
              });
            });
          } else {
            this.$message({
              message: "落布米长为空！",
              type: "warning",
            });
          }
        }
      });
    },
    NumberChange2(number) {
      //点击落布div键盘输入值数字键盘数值改变事件

      if (this.lbFocus == true) {
        this.lbLength = number;
      } else if (this.lbFocus == true) {
        this.lbLength = number;
      }
    },
    iszb() {
      //点击织布div键盘输入
      this.zbFocus = !this.zbFocus;
      this.jzFocus = false;
      if (this.zbFocus == true) {
        this.$refs.board1.number = [];
        //console.log(this.zbLength.length);
        if (this.zbLength.length > 0) {
          let k = [];
          for (let i = 0; i < this.zbLength.length; i++) {
            k.push(this.zbLength.substr(i, 1));
          }
          this.$refs.board1.number = k;
          //console.log(this.$refs.board1.number);
        }
      }
    },
    isjz() {
      //点击经纱div键盘输入

      this.jzFocus = !this.jzFocus;

      this.zbFocus = false;
      if (this.jzFocus == true) {
        this.$refs.board1.number = [];
        if (this.jzLength.length > 0) {
          let k = [];
          for (let i = 0; i < this.jzLength.length; i++) {
            k.push(this.jzLength.substr(i, 1));
          }
          this.$refs.board1.number = k;
          //console.log(this.$refs.board1.number);
        }
      }
    },
    getNumber(number) {
      //织布经纱div确认按键事件
      //console.log(number);
      if (this.zbFocus == true) {
        this.zbLength = number;
      } else if (this.jzFocus == true) {
        this.jzLength = number;
      }
      this.zbFocus = false;
      this.jzFocus = false;
    },
    NumberChange(number) {
      //织布经纱div数字键盘事件事件
      //console.log(number);
      if (this.zbFocus == true) {
        //     if(this.zbLength.length>0){
        //    let k=[]
        //         for(let i=0;i<jzLength.length;i++){
        //          k.push( jzLength.substr(i,1))
        //         }
        //     }else{
        // this.zbLength=number
        //     }
        this.zbLength = number;
      } else if (this.jzFocus == true) {
        this.jzLength = number;
      } else {
        // this.$refs.board1.number=[]
      }
    },
    ShiftBack() {
      //换班返回按钮
      this.isCar = false;
      this.isMachine = false;
      this.shiftShow = false;
      this.PzShow = false;
      this.isMainShow = true;
      this.checkMachine = [];
    },
    sureShift() {
      //换班确认按钮

      //console.log(this.checkedName);
      //console.log(this.checkedClass);
      if (this.checkedName != "") {
        let url = "http://106.12.219.66:8227/report/getSimpleReport";
        let headers = {
          "Content-Type": "application/json",
          companyID: this.company_id,
        };
        let method = "post";
        let data = {
          tableName: "s_staff",
          pageNum: 1,
          pageSize: 1000,
          query: {
            staff_name: this.checkedName,
          },
        };

        let that = this;

        axios({
          url: url,
          method: method,
          data: data,
          headers: headers,
        }).then((response) => {
          let id = response.data.data[0].id; //绑定员工id
          let staffList = [
            {
              id: id,
              order_num: 1,
            },
          ];

          let checkedClass = "";
          if (this.checkedClass == "9") {
            checkedClass = "挡车班A班";
          } else if (this.checkedClass == "10") {
            checkedClass = "挡车班B班";
          } else if (this.checkedClass == "11") {
            checkedClass = "挡车班C班";
          }
          staffList[0].class = checkedClass;
          staffList[0].name = this.checkedName;
          console.log(staffList);
          console.log(checkedClass);

          localStorage.setItem("dcName", staffList[0].name);
          localStorage.setItem("dcClass", staffList[0].class);
          localStorage.setItem("dcId", staffList[0].id);
          this.$emit("dcChange", this.checkedName);
          console.log(this.checkMachine);
          this.checkMachine = [];
          this.isCar = false;
          this.isMachine = false;
          this.shiftShow = false;
          this.PzShow = false;
          this.isMachine = true;
          // let url2 = host + "/api/group/shift";
          // let data2 = {
          //   selectInfo: {
          //     company_id: that.company_id,
          //   },
          //   shiftGroup: {
          //     id: this.checkedClass,
          //   },
          //   staffList: staffList,
          // };
          // //console.log(data2);
          // axios({
          //   url: url2,
          //   method: "post",
          //   data: data2,
          // }).then((res) => {
          //   //console.log(res);
          //   if (res.data.message == "成功") {
          //     that.$message({
          //       message: "换班成功！",
          //       type: "success",
          //     });

          //     this.isCar = false;
          //     this.isMachine = false;
          //     this.shiftShow = false;
          //     this.PzShow = false;
          //     this.isMainShow = true;
          //     this.checkMachine = [];
          //     this.$emit("dcChange", this.checkedName);
          //     //console.log(this.checkedName);
          //   } else {
          //     this.$message({
          //       message: "发生错误！",
          //       type: "warning",
          //     });
          //   }
          // });
        });
      } else {
        this.$message({
          message: "请选择一个人！",
          type: "warning",
        });
      }
    },
    checkShutdown(label) {
      //选中机台准备开机或者关机

      for (let i = 0; i < this.checkMachineColor.length; i++) {
        if (this.checkMachineColor[i].label == label) {
          this.checkMachineColor[i].isChecked = !this.checkMachineColor[i].isChecked;
        }
      }
      //防止数据更新视图不更新
      this.checkMachineColor.push({});
      this.checkMachineColor.pop();
      //防止数据更新视图不更新
    },
    openMachine() {
      //开机

      if (localStorage.getItem("dcId")) {
        let arr = [];
        for (let i = 0; i < this.checkMachineColor.length; i++) {
          if (this.checkMachineColor[i].isChecked == true) {
            arr.push(this.checkMachineColor[i].label);
          }
        }
        this.checkMachineColor;
        let url = host + "/api/stationMachine/dangCe";

        let method = "post";
        let data = {
          selectInfo: {
            company_id: this.company_id,
          },
          machine_id_list: arr,
          staff_code: localStorage.getItem("dcId"),
          staff_name: localStorage.getItem("dcName"),
        };

        let that = this;
        console.log(data);
        axios({
          url: url,
          method: method,
          data: data,
        }).then((res) => {
          if (res.data.message == "成功") {
            this.$message({
              message: "开机成功！",
              type: "success",
            });
            for (let i = 0; i < this.checkMachineColor.length; i++) {
              if (this.checkMachineColor[i].isChecked == true) {
                this.checkMachineColor[i].isShutDown = false;
              }
            }

            //防止数据更新视图不更新
            this.checkMachineColor.push({});
            this.checkMachineColor.pop();
          } else {
            this.$message.error(res.data.message);
          }
        });
      } else {
        this.$message.error("请先登录！");
      }
    },
    // 对象排序
    sortByKey(array, key) {
      return array.sort(function (a, b) {
        let x = a[key];
        let y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    },
    shutdownMachine() {
      //关机
      if (localStorage.getItem("dcId")) {
        let arr = [];
        for (let i = 0; i < this.checkMachineColor.length; i++) {
          if (this.checkMachineColor[i].isChecked == true) {
            arr.push(this.checkMachineColor[i].label);
          }
        }
        this.checkMachineColor;
        let url = host + "/api/stationMachine/guanJi";

        let method = "post";
        let data = {
          selectInfo: {
            company_id: this.company_id,
          },
          machine_id_list: arr,
          // staff_code: localStorage.getItem("dcId"),
          // staff_name: localStorage.getItem("dcName"),
        };

        let that = this;
        console.log(data);
        axios({
          url: url,
          method: method,
          data: data,
        }).then((res) => {
          if (res.data.message == "成功") {
            this.$message({
              message: "关机成功！",
              type: "success",
            });
            for (let i = 0; i < this.checkMachineColor.length; i++) {
              if (this.checkMachineColor[i].isChecked == true) {
                this.checkMachineColor[i].isShutDown = true;
              }
            }

            //防止数据更新视图不更新
            this.checkMachineColor.push({});
            this.checkMachineColor.pop();
          } else {
            this.$message.error(res.data.message);
          }
        });
      } else {
        this.$message.error("请先登录！");
      }
    },
    cancelPz() {
      //品种取消返回

      this.shiftShow = false;
      this.LbShow = false;
      this.PzShow = false;
      this.isMainShow = false;
      this.isMachine = false;
      this.isCar = true;
    },
    select() {
      let machine_id;
      for (let i = 0; i < this.checkMachineColor.length; i++) {
        if (this.checkMachineColor[i].isChecked == true) {
          machine_id = this.checkMachineColor[i].label;
        }
      }
      let url = host + "/api/zj/getInfoByMachineID";
      let that = this;

      axios({
        url: url,
        method: "post",
        data: {
          selectInfo: {
            company_id: that.company_id,
          },
          machine_id: machine_id,
        },
        // headers: headers
      }).then((res) => {
        console.log(res);
        that.se_hao2 = res.data.result.se_hao;
        that.pin_hao2 = res.data.result.pin_hao;
        that.pi_ci2 = res.data.result.pi_ci;
        // that.machine_id = res.data.result.zen_jin_ji_hua.machine_id;
        // that.axis_no = res.data.result.zen_jin_ji_hua.axis_no;
      });
    },
    toLuobu() {
      //显示落布界面
      console.log(this.checkMachineColor);

      this.shiftShow = false;

      this.PzShow = false;

      this.isMainShow = false;
      this.isMachine = false;
      this.isCar = false;
      this.LbShow = true;
      this.select();
      this.checkMachineColor.forEach((element) => {
        if (element.isChecked == true) {
          this.checkedMachine = element.label;
        }
      });
    },
    cancelLb() {
      //隐藏落布
      this.shiftShow = false;

      this.PzShow = false;
      this.LbShow = false;
      this.isMainShow = false;
      this.isMachine = false;
      this.isCar = true;
    },
    toPz() {
      //显示品种界面

      this.isMainShow = false;
      this.isCar = false;
      this.LbShow = false;
      this.shiftShow = false;
      this.isMachine = false;
      this.PzShow = true;
      this.select();
      this.checkMachineColor.forEach((element) => {
        if (element.isChecked == true) {
          this.checkedMachine = element.label;
        }
      });
    },
    toCar() {
      //机台选择界面
      this.PzShow = false;
      this.isMachine = false;
      this.isMainShow = false;
      this.LbShow = false;
      this.shiftShow = false;
      this.isCar = true;
      this.checkMachineColor = [];
      let url2 = host + "/api/stationMachine/getBindMachines";
      let that = this;
      axios({
        url: url2,
        method: "post",
        data: {
          selectInfo: {
            company_id: that.company_id,
          },
          staff_id: localStorage.getItem("dcId"),
        },
      }).then((res) => {
        console.log(res);
        let arr = [];
        if (res.data.result.length > 0) {
          for (let i = 0; i < res.data.result.length; i++) {
            arr.push({
              label: res.data.result[i],
              isChecked: false,
              isShutDown: false,
            });
          }
          this.checkMachineColor = arr;
        }
      });
    },
    chooseAll() {
      let num = 0;
      for (let i = 0; i < this.checkMachineColor.length; i++) {
        this.checkMachineColor[i].isChecked = true;
        num++;
      }
      if (num > 1 || num == 0) {
        this.enabled = false;
      } else {
        this.enabled = true;
      }
    },
    toShift() {
      //换班界面
      this.isMainShow = false;
      this.isCar = false;
      this.LbShow = false;
      this.PzShow = false;
      this.isMachine = false;
      this.shiftShow = true;
    },
    goback() {
      //显示主菜单界面
      this.isCar = false;
      this.isMachine = false;

      this.LbShow = false;
      this.PzShow = false;
      this.isMainShow = false;
      this.shiftShow = true;
      this.checkMachine = [];
    },
    goback2() {
      this.isCar = false;

      this.PzShow = false;
      this.LbShow = false;
      this.shiftShow = false;
      this.isMachine = false;
      this.isMainShow = true;
    },
    sureMachine() {
      //确认机台

      console.log(this.checkMachine);
      if (this.checkMachineColor.length == 0) {
        this.$message({
          message: "请先选择至少一台！",
          type: "warning",
        });
      } else {
        // this.PzShow = false;
        // this.isMachine = false;
        // this.isMainShow = false;
        // this.LbShow = false;
        // this.shiftShow = false;
        // this.isCar = true;
        console.log(localStorage.getItem("dcId"));
        console.log(this.checkMachine);

        let url = host + "/api/stationMachine/bindMachines";
        let that = this;
        axios({
          url: url,
          method: "post",
          data: {
            selectInfo: {
              company_id: that.company_id,
            },
            staff_id: localStorage.getItem("dcId"),
            machine_id_list: this.checkMachine,
          },
        }).then((res) => {
          if (res.data.message == "成功") {
            this.$message({
              message: "保存成功！",
              type: "success",
            });
          } else {
            this.$message.error(res.data.message);
          }
          this.checkMachine = [];
          this.checkNames = [];
          this.PzShow = false;
          this.isMachine = false;

          this.LbShow = false;
          this.shiftShow = false;
          this.isCar = false;
          this.isMainShow = true;
        });
      }
    },
    checkName(e) {
      //选择机台事件

      this.checkedName = e[0];
    },
  },
  mounted() {},
  watch: {
    pzPrintCode(val) {
      //批轴号事件
      let url = host + "/api/zj/getWarpWorkOrder";
      let that = this;
      if (val != "") {
        axios({
          url: url,
          method: "post",
          data: {
            selectInfo: {
              company_id: that.company_id,
            },
            bar_code: val,
          },
          // headers: headers
        }).then((res) => {
          console.log(res);
          that.se_hao = res.data.result.se_hao;
          that.pin_hao = res.data.result.pinh;
          that.pi_ci = res.data.result.zen_jin_ji_hua.pi_ci;
          // that.machine_id = res.data.result.zen_jin_ji_hua.machine_id;
          // that.axis_no = res.data.result.zen_jin_ji_hua.axis_no;
        });
      }
    },
    checkedClass(e) {
      if (e == "9") {
        this.getGroup("A班");
      } else if (e == "10") {
        this.getGroup("B班");
      } else if (e == "11") {
        this.getGroup("C班");
      }
    },
    checkMachine(e) {
      this.checkMachineColor = [];
      if (this.checkMachine.length > 0) {
        for (let i = 0; i < this.checkMachine.length; i++) {
          let k = {
            label: this.checkMachine[i],
            isChecked: false,
            isShutDown: true,
          };
          this.checkMachineColor[i] = k;
        }
      }
      this.checkMachineColor = this.sortByKey(this.checkMachineColor, "label");

      //console.log(this.checkMachineColor);
    },
    shiftShow(e) {
      if (e == true) {
        this.page_num2 = 1;
        this.getStaffList();
        this.getGroup("A班");
      }
    },
    checkMachineColor(e) {
      //console.log(this.checkMachineColor);
      let num = 0;
      for (let i = 0; i < this.checkMachineColor.length; i++) {
        if (this.checkMachineColor[i].isChecked == true) {
          num++;
        }
      }
      //console.log(num);
      if (num > 1 || num == 0) {
        this.enabled = false;
      } else {
        this.enabled = true;
      }
    },
    isMachine(e) {
      if (e == true) {
        this.page_num = 1;
        this.getMachineList();
        this.search_machine = "";
      }
    },
    LbShow(e) {
      if (e == true) {
        this.lbLength = "";
      }
    },
    PzShow(e) {
      if (e == true) {
        this.zbLength = "";
        this.jzLength = "";
        this.pzPrintCode = "";
      }
    },
  },
};
</script>

<style scoped>
.pz_left {
  width: 45%;
  height: 80%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.pz_left_top {
  width: 100%;
  height: 75%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1.1rem;
  color: #8c8c8c;
}

.pz_left_top_title {
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pz_left_top_title span {
  word-break: break-all;
}

.pz_left_top_title2 {
  width: 100%;
  height: 2rem;
  display: flex;

  align-items: center;
  color: black;
}

.pz_left_top_title2 span {
  word-break: break-all;
}

.pz_left_bottom {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
}

.pz_left_bottom_btn_active {
  width: 40%;
  height: 80%;
  background: #a3d897;

  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 3px solid #ffffff;
  border-left: 3px solid #ffffff;
  border-bottom: 3px solid #717171;
  border-right: 3px solid #717171;
}

.pz_left_bottom_btn_unactive {
  width: 40%;
  height: 80%;
  background: #808080;
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  border-top: 3px solid #ffffff;
  border-left: 3px solid #ffffff;
  border-bottom: 3px solid #717171;
  border-right: 3px solid #717171;
}

.pz_right {
  width: 45%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.pz_right_top {
  width: 100%;
  height: 20%;
  margin-left: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pz_right_top_input {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  font-size: 1.3rem;
  margin: 0.3rem;
}

.pz_right_top_input_unactive {
  width: 80%;
  height: 50%;
  display: flex;
  align-content: center;
  justify-content: flex-start;
  border: 1px solid black;
}

.pz_right_top_input_active {
  width: 80%;
  height: 50%;
  display: flex;
  align-content: center;
  justify-content: flex-start;

  border: 1px solid red;
}

.pz_right_top_input_active span {
  overflow: hidden;
  margin-left: 1rem;

  margin-top: 0.45rem;
}

.pz_right_top_input_unactive span {
  overflow: hidden;
  margin-left: 1rem;
  margin-top: 0.45rem;
}

.pz_right_bottom {
  width: 100%;
  height: 75%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.pz_right_bottom_con {
  width: 97%;
  height: 100%;
}

.select_shift {
  position: absolute;
  top: 0;
  left: 3.8rem;
  width: 70%;
  height: 4rem;

  display: flex;
  justify-content: space-around;
  align-items: center;
}

.select_shift span {
  font-size: 1.8rem;
}

.select_shift select {
  font-size: 1.8rem;
  height: 50%;
  width: 7rem;
  border: 1px solid black;
}

.select_shift input {
  width: 35%;
  height: 50%;
  border: 1px solid black;
  font-size: 1.8rem;
}

.main_btn {
  width: 40%;
  height: 60%;
  background: #a3d897;
  display: flex;

  align-items: center;
  justify-content: center;
  color: black;
  font-size: 4rem;
  border-top: 3px solid #ffffff;
  border-left: 3px solid #ffffff;
  border-bottom: 3px solid #717171;
  border-right: 3px solid #717171;
}

.checked_machine {
  width: 90%;
  height: 70%;
}

.checked_machine_btn {
  width: 90%;
  height: 20%;

  display: flex;
  align-items: center;
}

.checked_machine_one {
  width: 22%;
  height: 40%;
  margin: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  font-size: 4rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  background: #808080;
  float: left;
}

.checked_machine_btn_one {
  width: 18%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
  background: #a3d897;
  border-top: 3px solid #ffffff;
  border-left: 3px solid #ffffff;
  border-bottom: 3px solid #717171;
  border-right: 3px solid #717171;
}
</style>
