<template>
  <div class="operationPane">
    <!-- 开出部分操作栏组件-->
    <!-- 开出首页-->
    <div
      class="operationPane_con"
      style="display: flex; justify-content: space-around; align-items: center"
      v-show="szIndexShow"
    >
      <div class="main_btn" @click="toClass">运转班</div>
      <div class="main_btn" @click="toClass2">长白班</div>
      <div class="main_btn" @click="toSz">开出</div>
      <img src="../../static/img/close.png" @click="closeCurrentPage()" />
    </div>
    <!-- 开出首页-->
    <!-- 开出部分选班次-->
    <div
      class="operationPane_con"
      style="display: flex; justify-content: center; align-items: flex-start"
      v-show="szShiftShow"
    >
      <div class="operationPane_con_machineList">
        <div
          class="currentClass"
          v-html="
            isChooseAclass == 0
              ? '当前班次：运转班A组'
              : isChooseAclass == 1
              ? '当前班次：运转班B组'
              : ''
          "
          v-show="isYunzhuan == '运转班'"
        ></div>
        <div class="currentClass" v-show="isYunzhuan == '长白班'">
          当前班次：运转班C组
        </div>
        <div class="classA" v-show="isYunzhuan == '运转班'">
          <div
            @click="changeClass('a')"
            :class="
              isChooseAclass == 0
                ? 'classA_left_chossed'
                : isChooseAclass == 1
                ? 'classA_left'
                : isChooseAclass == 2
                ? 'classA_left'
                : ''
            "
          >
            <span>运转班A组</span>
          </div>
          <div class="classA_right">
            <span></span><span>开出工01：{{ Aclass.szg1 }}</span
            ><span></span>
          </div>
        </div>
        <div class="classA" v-show="isYunzhuan == '运转班'">
          <div
            @click="changeClass('b')"
            :class="
              isChooseAclass == 0
                ? 'classA_left'
                : isChooseAclass == 1
                ? 'classA_left_chossed'
                : isChooseAclass == 2
                ? 'classA_left'
                : ''
            "
          >
            <span>运转班B组</span>
          </div>
          <div class="classA_right">
            <span></span> <span>开出工01：{{ Bclass.szg1 }}</span
            ><span></span>
          </div>
        </div>
        <div class="classA" v-show="isYunzhuan == '长白班'">
          <div
            @click="changeClass('c')"
            :class="
              isChooseAclass == 0
                ? 'classA_left'
                : isChooseAclass == 1
                ? 'classA_left'
                : isChooseAclass == 2
                ? 'classA_left_chossed'
                : ''
            "
          >
            <span>运转班C组</span>
          </div>
          <div class="classA_right">
            <span>开出工01：{{ Cclass.szg1 }}</span>
          </div>
        </div>
      </div>
      <div class="operationPane_con_machineList_btn">
        <div class="operationPane_con_machineList_btn_left">
          <div class="operationPane_con_machineList_btn_leftBtn" @click="sureClass()">
            确认
          </div>
          <div
            class="operationPane_con_machineList_btn_leftBtn"
            style=""
            @click="cancelClass()"
          >
            取消
          </div>
        </div>
        <div class="operationPane_con_machineList_btn_right"></div>
      </div>
      <div class="leftLabel" style="width: 170px"><span>选择开出组</span></div>

      <img src="../../static/img/close.png" @click="cancelClass()" />
    </div>
    <!-- 开出部分选班次-->
    <!-- 开出部分选班次-->
    <div
      class="operationPane_con"
      style="display: flex; justify-content: center; align-items: flex-start"
      v-show="szShiftShow2"
    >
      <div class="operationPane_con_machineList">
        <div
          class="currentClass"
          v-html="
            isChooseAclass2 == 0
              ? '当前班次：运转班A组'
              : isChooseAclass2 == 1
              ? '当前班次：运转班B组'
              : isChooseAclass2 == 2
              ? '当前班次：运转班C组'
              : ''
          "
        ></div>
        <div class="classA">
          <div
            @click="changeClass2('a')"
            :class="
              isChooseAclass2 == 0
                ? 'classA_left_chossed'
                : isChooseAclass2 == 1
                ? 'classA_left'
                : isChooseAclass2 == 2
                ? 'classA_left'
                : ''
            "
          >
            <span>运转班A组</span>
          </div>
          <div class="classA_right">
            <span></span> <span>开出工01：{{ Aclass2.szg1 }}</span
            ><span></span>
          </div>
        </div>
        <div class="classA">
          <div
            @click="changeClass2('b')"
            :class="
              isChooseAclass2 == 0
                ? 'classA_left'
                : isChooseAclass2 == 1
                ? 'classA_left_chossed'
                : isChooseAclass2 == 2
                ? 'classA_left'
                : ''
            "
          >
            <span>运转班B组</span>
          </div>
          <div class="classA_right">
            <span></span> <span>开出工01：{{ Bclass2.szg1 }}</span
            ><span></span>
          </div>
        </div>
        <div class="classA">
          <div
            @click="changeClass2('c')"
            :class="
              isChooseAclass2 == 0
                ? 'classA_left'
                : isChooseAclass2 == 1
                ? 'classA_left'
                : isChooseAclass2 == 2
                ? 'classA_left_chossed'
                : ''
            "
          >
            <span>运转班C组</span>
          </div>
          <div class="classA_right">
            <span></span> <span>开出工01：{{ Cclass2.szg1 }}</span
            ><span></span>
          </div>
        </div>
      </div>
      <div class="operationPane_con_machineList_btn">
        <div class="operationPane_con_machineList_btn_left">
          <div class="operationPane_con_machineList_btn_leftBtn" @click="sureClass2()">
            确认
          </div>
          <div
            class="operationPane_con_machineList_btn_leftBtn"
            style=""
            @click="cancelClass2()"
          >
            取消
          </div>
        </div>
        <div class="operationPane_con_machineList_btn_right"></div>
      </div>
      <div class="leftLabel" style="width: 170px"><span>选择开出组</span></div>

      <img src="../../static/img/close.png" @click="cancelClass2()" />
    </div>
    <!-- 开出部分选班次-->
    <!-- 开出部分换班-->
    <div
      class="operationPane_con"
      style="display: flex; justify-content: center; align-items: flex-start"
      v-show="isShift"
    >
      <div class="operationPane_con_machineList">
        <el-checkbox-group v-model="checkName" style="width: 100%; height: 100%" :max="1">
          <el-checkbox-button
            size="medium"
            v-for="(item, index) in StaffNameList"
            style="magin: 1rem; font-size: 2rem"
            :label="item.staff_name"
            :key="index"
            >{{ item.staff_name }}</el-checkbox-button
          >
        </el-checkbox-group>
      </div>
      <div class="operationPane_con_machineList_btn">
        <div class="operationPane_con_machineList_btn_left">
          <div class="operationPane_con_machineList_btn_leftBtn" @click="save()">
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
            @current-change="CurrentChange2"
            layout="prev, pager, next"
            :page-size="page_size2"
            :total="total_num2"
          >
          </el-pagination>
        </div>
      </div>

      <div class="search" style="left: 4rem; width: 95%; top: 18px">
        <span style="font-size: 1.5rem">开出工：</span
        ><input
          style="font-size: 1.5rem; width: 10rem"
          disabled
          :value="String(this.checkedName).replace(/ /g, '')"
        /><span
          style="color: red; margin-left: 1rem"
          v-html="
            isChooseAclass == 0
              ? '当前选中：' + isYunzhuan + 'A组'
              : isChooseAclass == 1
              ? '当前选中：' + isYunzhuan + 'B组'
              : isChooseAclass == 2
              ? '当前选中：' + isYunzhuan + 'C组'
              : ''
          "
        ></span>
      </div>
      <img src="../../static/img/close.png" @click="goback()" />
    </div>
    <!-- 开出部分换班-->
    <!-- 开出部分换班-->
    <!-- <div class="operationPane_con" style="display:flex;justify-content: center;align-items: flex-start;"
      v-show="isShift2">

      <div class="operationPane_con_machineList">
        <el-checkbox-group v-model="checkName2" style="width:100%;height:100%;" :max="1">
          <el-checkbox-button size="medium" v-for="(item,index) in StaffNameList" style="magin:1rem;font-size:2rem"
            :label="item.staff_name" :key="index">{{item.staff_name}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div class="operationPane_con_machineList_btn">
        <div class="operationPane_con_machineList_btn_left">
          <div class="operationPane_con_machineList_btn_leftBtn" @click="sureName2()">保存</div>
          <div class="operationPane_con_machineList_btn_leftBtn" style=" " @click="goback2()">返回</div>
        </div>
        <div class="operationPane_con_machineList_btn_right">
          <el-pagination background small :pager-count="3" @current-change="CurrentChange" layout="prev, pager, next"
            :total="total_num">
          </el-pagination>
        </div>
      </div>

      <div class="search" style="left:4rem;width:95%;top:18px"><span style="font-size:1.5rem">开出工：</span><input
          style="font-size:1.5rem;width:10rem;" disabled v-model="String(this.checkName2).replace(/ /g, '')" /><span
          style="color:red;margin-left:1rem;">当前选中：运转班C组</span></div>
      <img src="../../static/img/close.png" @click="goback2()" />
    </div> -->
    <!-- 开出部分换班-->
    <!-- 开出部分主菜单-->
    <div
      class="operationPane_con"
      style="display: flex; justify-content: center; align-items: flex-end"
      v-show="szMainShow"
    >
      <div class="operationPane_con_uppershaft">
        <div class="pch" v-show="issaoma"><input ref="inputs" v-model="pch" /></div>
        <div class="chooseBtn">
          <div class="chooseBtn_con">
            <div class="chooseBtn_con_label"><span>机台</span></div>
            <div
              class="chooseBtn_con_btn"
              style="background: white; border: 1px solid black"
            >
              <span v-show="machine_id == ''">请扫码</span
              ><span v-show="machine_id != ''">{{ machine_id }}</span>
            </div>
          </div>
          <div class="chooseBtn_con">
            <div class="chooseBtn_con_label"><span>开出组</span></div>
            <div
              class="chooseBtn_con_btn"
              style="background: white; border: 1px solid black"
            >
              <span
                v-text="
                  isChooseAclass2 == 0
                    ? 'A组'
                    : isChooseAclass2 == 1
                    ? 'B组'
                    : isChooseAclass2 == 2
                    ? 'C组'
                    : ''
                "
              ></span>
            </div>
          </div>
        </div>
        <div class="pane">
          <div
            class="text"
            style="position: absolute; top: -20%; left: 0%; width: 100%; height: 20%"
          >
            <div class="text_con">
              <span>品号：{{ pin_hao }}</span>
              <span>色号：{{ se_hao }}</span>
              <span>批次：{{ pi_ci }}</span>
            </div>
            <div class="text_con">
              <span>轴号：{{ axis_no }}</span>
            </div>
          </div>
          <div class="pane_title"><span>注意事项</span></div>
          <div class="pane_con">
            <textarea
              style="background: white"
              class="textarea"
              disabled
              placeholder="扫描后显示..."
            ></textarea>
          </div>
          <div class="pane_btn">
            <div
              class="pane_btn_one"
              @click="saoma()"
              :style="issaoma ? 'background:#808080' : 'background:#A3D897'"
            >
              <span>扫码开出</span>
            </div>
            <div
              class="pane_btn_one"
              @click="wanchen()"
              :style="issaoma ? 'background:#A3D897' : 'background:#808080'"
            >
              <span>开出完成</span>
            </div>
          </div>
        </div>
      </div>
      <img src="../../static/img/close.png" @click="closeCurrentPage()" />
    </div>
    <!-- 开出部分主菜单-->

    <!-- 开出部分操作栏组件-->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Out",
  props: ["nameList4"],
  data() {
    return {
      szIndexShow: true,
      szMainShow: false, //开出主页面显示隐藏

      isShift: false, //开出换班显示隐藏
      isShift2: false, //开出换班显示隐藏
      szShiftShow2: false,
      szShiftShow: false,
      isCheckedMachine: false,
      checkedMachineNum: "",
      checkName: [], //开出选中的员工名字
      checkName2: [], //开出选中的员工名字
      issaoma: false,
      staffList: [
        {
          label: "开出工01",
          staffName: "",
          isSelected: false,
        },
      ],
      staffList2: [
        {
          label: "开出工01",
          staffName: "",
          isSelected: false,
        },
      ],
      StaffNameList: [],
      page_size2: 15,
      page_num2: 1,
      total_num2: null,
      page_size: 21,
      page_num: 1,
      total_num: null,
      mac_type_id: "030100",
      company_id: "10000025",

      isChooseAclass: 0,
      Aclass: {
        szg1: "",
        szg1Id: null,
        szg2: "",
        szg2Id: null,
        szg3: "",
        szg3Id: null,
        id: null,
      },
      Bclass: {
        szg1: "",
        szg1Id: null,
        szg2: "",
        szg2Id: null,
        szg3: "",
        szg3Id: null,
        id: null,
      },
      Cclass: {
        szg1: "",
        szg1Id: null,
        szg2: "",
        szg2Id: null,
        szg3: "",
        szg3Id: null,
        id: null,
      },
      isChooseAclass2: 0,
      Aclass2: {
        szg1: "",
        szg1Id: null,
        szg2: "",
        szg2Id: null,
        szg3: "",
        szg3Id: null,
        id: null,
      },
      Bclass2: {
        szg1: "",
        szg1Id: null,
        szg2: "",
        szg2Id: null,
        szg3: "",
        szg3Id: null,
        id: null,
      },
      Cclass2: {
        szg1: "",
        szg1Id: null,
        szg2: "",
        szg2Id: null,
        szg3: "",
        szg3Id: null,
        id: null,
      },
      pch: "",
      product_name: "",
      axis_no: "",
      isYunzhuan: "运转班", // 当前选择的班
      checkedName: "",
      pi_ci: "",
      pin_hao: "",
      se_hao: "",
      axis_no: "",
      machine_id: "",
    };
  },
  methods: {
    goback() {
      this.szShiftShow2 = false;
      this.isShift = false;

      this.szShiftShow = false;
      this.szMainShow = false;
      this.szIndexShow = true;
    },
    // sureName2() {
    //   this.szMainShow = false

    //   this.szShiftShow2 = false
    //   this.isShift = false
    //   this.isShift2 = false
    //   this.szIndexShow = true
    // },
    // goback2() {
    //   this.szMainShow = false
    //   this.isShift2 = false
    //   this.szShiftShow2 = false
    //   this.isShift = false
    //   this.szIndexShow = true
    // },
    toClass2() {
      this.szMainShow = false;
      this.szIndexShow = false;
      this.szShiftShow2 = false;

      this.szShiftShow = false;

      this.isShift = true;
      this.isChooseAclass = "2";
      this.isYunzhuan = "长白班";
    },
    toClass() {
      this.szMainShow = false;
      this.szIndexShow = false;
      this.szShiftShow2 = false;
      this.isShift2 = false;
      this.isShift = false;
      this.szShiftShow = true;
      this.isChooseAclass = "0";
      this.isYunzhuan = "运转班";
    },
    toSz() {
      this.szMainShow = false;
      this.szIndexShow = false;
      this.isShift2 = false;
      this.isShift = false;
      this.szShiftShow2 = true;
    },
    sureClass2() {
      this.UpdatePeopleShow = false;
      this.szShiftShow = false;
      this.szShiftShow2 = false;

      this.szIndexShow = false;
      this.szMainShow = true;
      //console.log(this.staffList2);

      // this.szMachineShow = true;
      // this.getMachineList()
    },
    cancelClass2() {
      this.szShiftShow2 = false;
      this.UpdatePeopleShow = false;
      this.szShiftShow = false;
      this.szMainShow = false;
      this.szMachineShow = false;
      this.szIndexShow = true;
    },
    sureClass() {
      // this.$emit('szChange', this.staffList)
      this.szShiftShow = false;
      this.szMachineShow = false;
      this.szMainShow = false;
      this.szIndexShow = false;
      this.UpdatePeopleShow = true;
      this.isShift = true;
    },
    cancelClass() {
      this.UpdatePeopleShow = false;
      this.szShiftShow = false;
      this.szMainShow = false;
      this.szMachineShow = false;
      this.szIndexShow = true;
    },
    changeClass2(e) {
      if (e == "a") {
        this.isChooseAclass2 = 0;
        this.staffList2 = [
          {
            label: "开出工01",
            staffName: this.Aclass2.szg1,
            isSelected: false,
            groupId: this.Aclass2.id,
          },
          {
            label: "开出工02",
            staffName: this.Aclass2.szg2,
            isSelected: false,
            groupId: this.Aclass2.id,
          },
          {
            label: "开出工03",
            staffName: this.Aclass2.szg3,
            isSelected: false,
            groupId: this.Aclass2.id,
          },
        ];
      } else if (e == "b") {
        this.isChooseAclass2 = 1;
        this.staffList2 = [
          {
            label: "开出工01",
            staffName: this.Bclass2.szg1,
            isSelected: false,
            groupId: this.Bclass2.id,
          },
          {
            label: "开出工02",
            staffName: this.Bclass2.szg2,
            isSelected: false,
            groupId: this.Bclass2.id,
          },
          {
            label: "开出工03",
            staffName: this.Bclass2.szg3,
            isSelected: false,
            groupId: this.Bclass2.id,
          },
        ];
      } else if (e == "c") {
        this.isChooseAclass2 = 2;
        this.staffList2 = [
          {
            label: "开出工01",
            staffName: this.Cclass2.szg1,
            isSelected: false,
            groupId: this.Cclass2.id,
          },
          {
            label: "开出工02",
            staffName: this.Cclass2.szg2,
            isSelected: false,
            groupId: this.Cclass2.id,
          },
          {
            label: "开出工03",
            staffName: this.Cclass2.szg3,
            isSelected: false,
            groupId: this.Cclass2.id,
          },
        ];
      }
    },

    changeClass(e) {
      if (e == "a") {
        this.isChooseAclass = 0;

        this.staffList = [
          {
            label: "开出工01",
            staffName: this.Aclass.szg1,
            isSelected: false,
            groupId: this.Aclass.id,
          },
          {
            label: "开出工02",
            staffName: this.Aclass.szg2,
            isSelected: false,
            groupId: this.Aclass.id,
          },
          {
            label: "开出工03",
            staffName: this.Aclass.szg3,
            isSelected: false,
            groupId: this.Aclass.id,
          },
        ];
      } else if (e == "b") {
        this.isChooseAclass = 1;
        this.staffList = [
          {
            label: "开出工01",
            staffName: this.Bclass.szg1,
            isSelected: false,
            groupId: this.Bclass.id,
          },
          {
            label: "开出工02",
            staffName: this.Bclass.szg2,
            isSelected: false,
            groupId: this.Bclass.id,
          },
          {
            label: "开出工03",
            staffName: this.Bclass.szg3,
            isSelected: false,
            groupId: this.Bclass.id,
          },
        ];
      } else if (e == "c") {
        this.isChooseAclass = 2;
        this.staffList = [
          {
            label: "开出工01",
            staffName: this.Cclass.szg1,
            isSelected: false,
            groupId: this.Cclass.id,
          },
          {
            label: "开出工02",
            staffName: this.Cclass.szg2,
            isSelected: false,
            groupId: this.Cclass.id,
          },
          {
            label: "开出工03",
            staffName: this.Cclass.szg3,
            isSelected: false,
            groupId: this.Cclass.id,
          },
        ];
      }
      //console.log(this.staffList);
    },
    CurrentChange2(e) {
      //console.log(e);
      this.page_num2 = e;
      this.getStaffList();
    },
    CurrentChange(e) {
      //console.log(e);
      this.page_num = e;
      this.getMachineList();
    },
    CurrentNameChange(e) {
      //console.log(e);
      this.page_num2 = e;
      this.getStaffList();
    },
    getMachineList() {
      let that = this;
      let url = window.apiRoot.api53 + "/api/stationMachine/getMachines";

      axios({
        url: url,
        method: "post",
        data: {
          selectInfo: {
            company_id: that.company_id,
            page_size: that.page_size,
            page_num: that.page_num,
          },
          mac_type_id: that.mac_type_id,
        },
        // headers: headers
      }).then((response) => {
        //console.log(response);
        that.total_num = response.data.result.total_num;
        let array = response.data.result.models;
        that.machineList = [];
        array.forEach((element) => {
          that.machineList.push(element);
        });
      });
    },
    closeCurrentPage() {
      //console.log(this.szMachineShow);
      if (this.szMachineShow == true) {
        this.isCheckedMachine = false;
        this.checkedMachineNum = "";
        this.UpdatePeopleShow = false;
        this.checkMachine = [];
        this.szMachineShow = false;
        this.szShiftShow = false;
        this.szMainShow = true;
        return;
      }
      if (this.szShiftShow == true) {
        this.szMachineShow = false;
        this.szShiftShow = false;
        this.szMainShow = true;
        this.UpdatePeopleShow = false;
        this.isStartChange = false;
        return;
      }
      if (this.szMainShow == true) {
        this.szMachineShow = false;
        this.szShiftShow = false;
        this.szMainShow = false;
        this.UpdatePeopleShow = false;
        this.szShiftShow2 = false;
        this.szIndexShow = true;
        return;
      }
      if (this.UpdatePeopleShow == true) {
        this.szMachineShow = false;
        this.szShiftShow = false;
        this.szMainShow = false;
        this.UpdatePeopleShow = false;
        this.szShiftShow2 = false;
        this.szIndexShow = true;
        this.isStartChange = false;
        return;
      }
    },
    saoma() {
      this.issaoma = true;
      this.$nextTick((x) => {
        this.$refs.inputs.focus();
      });
    },
    wanchen() {
      console.log(this.issaoma);
      if (this.issaoma == true) {
        if (this.print_code != "" && this.machine_id != "") {
          let url = window.apiRoot.api53 + "/api/stationMachine/kaiCu";
          let data = {
            selectInfo: {
              company_id: this.company_id,
            },
            shang_zou_gon_dan: {
              kai_cu_gong_hao: this.nameList4[0].id,
              kai_cu_name: this.nameList4[0].staff_name,
            },
            print_code: this.pch,
          };
          console.log(data);
          let that = this;
          axios({
            url: url,
            method: "post",
            data: data,
          }).then((response) => {
            if (response.data.message == "成功") {
              this.$message({
                message: "开出成功！",
                type: "success",
              });
            } else {
              this.$message.error(response.data.message);
            }
            this.se_hao = "";
            this.pch = "";
            this.pi_ci = "";
            this.pin_hao = "";
            this.machine_id = "";
            that.closeCurrentPage();
          });
        } else {
          this.$message({
            message: "码没有读取到！",
            type: "warning",
          });
        }
      }
      this.issaoma = false;
    },
    toChooseMachine() {
      this.szMainShow = false;
      this.UpdatePeopleShow = false;
      this.szShiftShow = false;
      this.szMachineShow = true;
      this.getMachineList();
    },

    sureMachine() {
      this.isCheckedMachine = true;
      this.checkMachine = [];
      this.szMachineShow = false;
      this.UpdatePeopleShow = false;
      this.szShiftShow = false;
      this.szMainShow = true;
    },
    cancel() {
      //取消按钮事件
      this.isCheckedMachine = false;
      this.checkedMachineNum = "";
      this.checkMachine = [];
      this.szMachineShow = false;
      this.UpdatePeopleShow = false;
      this.szShiftShow = false;
      this.szMainShow = true;
    },
    save() {
      //确认按钮事件
      console.log(this.checkedName);
      console.log(this.StaffNameList);
      if (this.checkedName != "") {
        //console.log(this.Aclass);
        //console.log(this.Bclass);
        //console.log(this.Cclass);
        //console.log(this.staffList);
        //console.log(this.isChooseAclass);
        let id;
        let staffList = [
          {
            id: null,
            order_num: null,
          },
        ];
        for (let i = 0; i < this.StaffNameList.length; i++) {
          {
            if (this.StaffNameList[i].staff_name == this.checkedName) {
              staffList[0].id = this.StaffNameList[i].id;
            }
          }
        }
        if (this.isChooseAclass == 0) {
          id = this.Aclass.id;
        } else if (this.isChooseAclass == 1) {
          id = this.Bclass.id;
        } else if (this.isChooseAclass == 2) {
          id = this.Cclass.id;
        }

        // staffList[0].id = this.staffList[0].id;
        staffList[0].order_num = 1;

        let url = window.apiRoot.api53 + "/api/group/shift";
        let data = {
          selectInfo: {
            company_id: this.company_id,
          },
          shiftGroup: {
            id: id,
          },
          staffList: staffList,
        };
        let that = this;
        //console.log(data);
        axios({
          url: url,
          method: "post",
          data: data,
        }).then((response) => {
          //console.log(response);
          if (response.data.message == "成功") {
            that.$message({
              message: "换班成功！",
              type: "success",
            });

            this.szMachineShow = false;
            this.szShiftShow = false;
            this.UpdatePeopleShow = false;
            this.szMainShow = false;
            this.isStartChange = false;
            this.isShift = false;
            this.szIndexShow = true;

            this.$emit("kcChange", this.staffList);
          } else {
            this.$message({
              message: "发生错误！",
              type: "warning",
            });
          }
        });
      } else {
        this.$message({
          message: "请选择一个名字！",
          type: "warning",
        });
      }
    },
    startChange() {
      //开始修改按钮单击事件
      this.isStartChange = true;
    },
    checkedMachine(e) {
      //选择机台事件

      this.checkedMachineNum = e[0];
    },
    checkedName(e) {
      //选择员工

      for (let i = 0; i < this.staffList.length; i++) {
        if (this.staffList[i].isSelected == true) {
          this.staffList[i].staffName = e[0];
          let url = window.apiRoot.api66 + "/report/getSimpleReport";
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
              staff_name: e[0],
            },
          };

          let that = this;

          axios({
            url: url,
            method: method,
            data: data,
            headers: headers,
          }).then((response) => {
            //console.log(response);
            this.staffList[i].id = response.data.data[0].id; //绑定员工id
          });
        }
      }
      //此处查询staff表的对应e【0】的id
    },
    chooseStaff(label) {
      //换班选中其中输入框的事件
      if (this.isStartChange == true) {
        for (let i = 0; i < this.staffList.length; i++) {
          this.staffList[i].isSelected = false;
        }
        for (let i = 0; i < this.staffList.length; i++) {
          if (this.staffList[i].label == label) {
            this.staffList[i].isSelected = true;
          }
        }
      }
    },

    getGroup() {
      //获取组员信息
      //console.log("getGroup");
      //console.log(this.isYunzhuan);
      let url2 = window.apiRoot.api53 + "/api/group/getGroupDetail";
      let that = this;
      axios({
        url: url2,
        method: "post",
        data: {
          selectInfo: {
            company_id: that.company_id,
          },
          shiftGroup: {
            id: 4,
          },
        },

        // headers: headers
      }).then((res) => {
        //console.log(res.data.result);
        res.data.result.forEach((element) => {
          if (element.group_name == "运转班A组") {
            this.Aclass.id = element.id;
            for (let i = 0; i < element.staffList.length; i++) {
              if (element.staffList[i].staff_organization_name == "开出工") {
                if (element.staffList[i].order_num == "1") {
                  this.Aclass.szg1 = element.staffList[i].staff_name;
                  this.Aclass.szg1Id = element.staffList[i].id;
                }
              }
            }
          } else if (element.group_name == "运转班B组") {
            this.Bclass.id = element.id;
            for (let i = 0; i < element.staffList.length; i++) {
              if (element.staffList[i].staff_organization_name == "开出工") {
                if (element.staffList[i].order_num == "1") {
                  this.Bclass.szg1 = element.staffList[i].staff_name;
                  this.Bclass.szg1Id = element.staffList[i].id;
                }
              }
            }
          }
        });
        that.staffList = [
          {
            label: "开出工01",
            staffName: that.Aclass.szg1,
            isSelected: false,
            id: that.Aclass.szg1Id,
          },
        ];
        that.Aclass2 = that.Aclass;
        that.Bclass2 = that.Bclass;
        that.staffList2 = that.staffList;

        // that.Aclass.id = res.data.result[0].id
        // that.Bclass.id = res.data.result[1].id
        // that.Cclass.id = res.data.result[2].id
        // res.data.result[0].staffList.forEach(element => {
        //   if (element.order_num == "1") {
        //     that.Aclass.szg1Id = element.id
        //     that.Aclass.szg1 = element.staff_name
        //   } else if (element.order_num == "2") {
        //     that.Aclass.szg2Id = element.id
        //     that.Aclass.szg2 = element.staff_name
        //   } else if (element.order_num == "3") {
        //     that.Aclass.szg3Id = element.id
        //     that.Aclass.szg3 = element.staff_name
        //   }
        // });
        // res.data.result[1].staffList.forEach(element => {
        //   if (element.order_num == "1") {
        //     that.Bclass.szg1Id = element.id
        //     that.Bclass.szg1 = element.staff_name
        //   } else if (element.order_num == "2") {
        //     that.Bclass.szg2Id = element.id
        //     that.Bclass.szg2 = element.staff_name
        //   } else if (element.order_num == "3") {
        //     that.Bclass.szg3Id = element.id
        //     that.Bclass.szg3 = element.staff_name
        //   }
        // });
        // res.data.result[2].staffList.forEach(element => {
        //   if (element.order_num == "1") {
        //     that.Cclass.szg1Id = element.id
        //     that.Cclass.szg1 = element.staff_name
        //   } else if (element.order_num == "2") {
        //     that.Cclass.szg2Id = element.id
        //     that.Cclass.szg2 = element.staff_name
        //   } else if (element.order_num == "3") {
        //     that.Cclass.szg3Id = element.id
        //     that.Cclass.szg3 = element.staff_name
        //   }
        // });
        // that.staffList = [{

        //     label: "上轴工01",
        //     staffName: that.Aclass.szg1,
        //     isSelected: false,
        //     id: that.Aclass.szg1Id
        //   },
        //   {
        //     label: "上轴工02",
        //     staffName: that.Aclass.szg2,
        //     isSelected: false,
        //     id: that.Aclass.szg2Id
        //   },
        //   {
        //     label: "上轴工03",
        //     staffName: that.Aclass.szg3,
        //     isSelected: false,
        //     id: that.Aclass.szg3Id
        //   },
        // ]
        // that.staffList2 = that.staffList
        // that.Aclass2 = that.Aclass
        // that.Bclass2 = that.Bclass
        // that.Cclass2 = that.Cclass
      });
      axios({
        url: url2,
        method: "post",
        data: {
          selectInfo: {
            company_id: that.company_id,
          },
          shiftGroup: {
            id: 5,
          },
        },

        // headers: headers
      }).then((res) => {
        //console.log(res.data.result);
        res.data.result.forEach((element) => {
          if (element.group_name == "长白班C组") {
            this.Cclass.id = element.id;
            for (let i = 0; i < element.staffList.length; i++) {
              if (element.staffList[i].staff_organization_name == "开出工") {
                if (element.staffList[i].order_num == "1") {
                  this.Cclass.szg1 = element.staffList[i].staff_name;
                  this.Cclass.szg1Id = element.staffList[i].id;
                }
              }
            }
          }
        });
        that.Cclass2 = that.Cclass;
        //console.log(this.isYunzhuan);
        if (this.isYunzhuan == "长白班") {
          this.staffList = [
            {
              label: "开出工01",
              staffName: this.Cclass.szg1,
              isSelected: false,
              groupId: this.Cclass.id,
            },
          ];
          this.checkedName = this.staffList[0].staffName;
          that.staffList2 = that.staffList;

          //console.log(this.checkName);
        }
      });
    },
    getStaffList() {
      let url = window.apiRoot.api66 + "/report/getSimpleReport";
      let data = {
        tableName: "s_staff",
        sort: "DESC",
        sortCloumn: "id",
        selectFields: ["id", "staff_name"],
        pageNum: this.page_num2,
        pageSize: this.page_size2,
        query: {
          staff_organization_id: 36, //上轴工
        },
      };
      let headers = {
        companyId: this.company_id,
      };
      this.StaffNameList = [];
      let that = this;
      axios({
        url: url,
        method: "post",
        headers: headers,
        data: data,

        // headers: headers
      }).then((res) => {
        console.log(res);
        let arr = res.data.data;
        for (let i = 0; i < arr.length; i++) {
          that.StaffNameList.push(arr[i]);
        }
        that.total_num2 = res.data.total;
        console.log(that.total_num2);
      });
    },
  },
  mounted() {},
  watch: {
    checkName(val) {
      if (val == "") {
        this.getGroup();
      } else {
        this.checkedName = val;
      }
    },
    pch(val) {
      //批轴号事件
      let url = window.apiRoot.api53 + "/api/zj/getWarpWorkOrder";
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
          that.machine_id = res.data.result.zen_jin_ji_hua.machine_id;
          that.axis_no = res.data.result.zen_jin_ji_hua.axis_no;
        });
      }
    },

    isShift(val) {
      if (val == true) {
        this.page_num2 = 1;
        this.StaffNameList = [];
        this.getStaffList();
        this.getGroup();
      }
    },
    isShift2(val) {
      if (val == true) {
        this.page_num2 = 1;
        this.StaffNameList = [];
        this.getStaffList();
      }
    },

    szShiftShow2(val) {
      //当选择开出组页面显示时加载数据
      if (val == true) {
        this.getGroup();
      }
    },
    szShiftShow(val) {
      //当选择开出组页面显示时加载数据
      if (val == true) {
        this.getGroup();
      }
    },
  },
};
</script>

<style scoped>
.pch {
  position: absolute;
  left: 1rem;
  top: -3.5rem;
  width: 15.5rem;
  height: 3rem;
}

.pch input {
  width: 100%;
  height: 100%;
  border: 1px solid black;
  font-size: 1.5rem;
}

.pch input::-webkit-input-placeholder {
  font-size: 1.3rem;
}

.operationPane {
  width: 100%;
  height: 64%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: #e2e7ed;
}

.operationPane_con {
  width: 98%;
  height: 96%;
  background: white;
  border-radius: 16px;
  position: relative;
}

.operationPane_con img {
  position: absolute;
  right: 0;
  top: -8px;
  width: 63px;
  height: 63px;
}

.search {
  position: absolute;
  left: 14%;
  top: 10px;

  font-size: 1.7rem;
  width: 69%;
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.search input {
  border: 1px solid black;
  height: 3rem;
  font-size: 1.7rem;
}

.leftLabel {
  position: absolute;
  left: 0;
  top: 0px;
  border-top-left-radius: 16px;
  font-size: 1.7rem;
  width: 135px;
  height: 63px;
  background: #d4d4d4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.operationPane_con_uppershaft {
  width: 85%;
  height: 70%;
  margin-bottom: 3%;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.text {
  position: absolute;
  top: -20%;
  left: 0%;
  width: 77%;
  height: 20%;
  display: flex;
  flex-direction: column;
}

.text_con {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
}

.text_con span {
  margin-left: 15px;
  margin-right: 15px;
  font-size: 1.25rem;
}

.shift {
  width: 35%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
}

.shift_con {
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 15px;
}

.shift_con span {
  font-size: 1.3rem;
}

.shift_con select {
  font-size: 2rem;
  width: 50%;
  height: 100%;
  border: 1px solid black;
}

.staffCheck {
  font-size: 2rem;
  width: 50%;
  height: 100%;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
}

.staffCheck2 {
  font-size: 2rem;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
}

.shift_con input {
  font-size: 2rem;
  width: 50%;
  height: 100%;
  border: 1px solid black;
}

.operationPane_con_machineList {
  width: 90%;
  height: 60%;
  margin-top: 9%;

  display: flex;
  justify-content: space-between;
}

.operationPane_con_machineList /deep/ .el-checkbox-button__inner {
  font-size: 2rem;
  padding: 20px 27px;
  margin: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  /* background: #8C8C8C; */
}

.el-pagination--small .btn-next,
.el-pagination--small .btn-prev,
.el-pagination--small .el-pager li,
.el-pagination--small .el-pager li.btn-quicknext,
.el-pagination--small .el-pager li.btn-quickprev,
.el-pagination--small .el-pager li:last-child {
  font-size: 3rem;
  line-height: 2rem;
  height: 4.5rem;
}

.operationPane_con_machineList /deep/ .el-checkbox-button,
.el-checkbox-button__inner {
  float: left;
}

.operationPane_con_machineList_btn_right /deep/ .el-pagination .btn-prev .el-icon {
  font-size: 2rem;
}

.operationPane_con_machineList_btn {
  width: 93%;

  height: 20%;
  position: absolute;
  bottom: -7px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.operationPane_con_machineList_btn_left {
  width: 40%;
  height: 60%;
  display: flex;

  align-items: center;
}

.operationPane_con_machineList_btn_leftBtn {
  width: 40%;
  height: 100%;
  background: #a3d897;
  display: flex;
  margin-left: 15px;
  align-items: center;
  justify-content: center;
  color: black;
  border-top: 3px solid #ffffff;
  border-left: 3px solid #ffffff;
  border-bottom: 3px solid #717171;
  border-right: 3px solid #717171;
  font-size: 1.5rem;
}

.operationPane_con_machineList_btn_right /deep/ .el-pager li {
  padding: 1.5rem 1.5rem;
  font-size: 3rem;
  min-width: 38px;
  height: 4.5rem;
  line-height: 2rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
}

.operationPane_con_machineList_btn_right /deep/ .el-pagination button {
  display: inline-block;
  font-size: 3rem;
  min-width: 35.5px;
  height: 4.5rem;
  width: 4.5rem;
  line-height: 28px;
  vertical-align: top;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.operationPane_con_machineList_btn_right /deep/ .el-pagination .btn-next .el-icon,
.el-pagination .btn-prev .el-icon {
  font-size: 2rem;
}

.operationPane_con_machineList_btn_right
  /deep/
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background: #ffc100;
}

.operationPane_con_machineList_btn_right {
  width: 54%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.chooseBtn {
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chooseBtn_con {
  width: 100%;
  height: 40%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.chooseBtn_con_label {
  width: 67%;
  height: 4rem;
  background: #317ccd;
  color: white;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.chooseBtn_con_btn {
  width: 67%;
  height: 5rem;
  background: #a3d897;
  color: black;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 3px solid #ffffff;
  border-left: 3px solid #ffffff;
  border-bottom: 3px solid #717171;
  border-right: 3px solid #717171;
}

.pane {
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.pane_title {
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: #808080;
  font-size: 1.5rem;
}

.pane_con {
  width: 99.8%;
  height: 55%;
  border-left: 1px solid #a0a0a0;
  border-bottom: 1px solid #a0a0a0;
  border-right: 1px solid #a0a0a0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pane_con textarea {
  width: 95%;
  height: 80%;
  color: #6c6c6c;
  border: none;
  font-size: 2rem;
}

textarea[class="textarea"]::-moz-placeholder {
  color: #6c6c6c;
  font-size: 1.5rem;
}

.pane_btn {
  width: 100%;
  height: 30%;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
}

.pane_btn_one {
  width: 40%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #808080;
  color: white;
  font-size: 2.5rem;

  margin-bottom: 3px;
  border-top: 3px solid #ffffff;
  border-left: 3px solid #ffffff;
  border-bottom: 3px solid #717171;
  border-right: 3px solid #717171;
}
</style>
