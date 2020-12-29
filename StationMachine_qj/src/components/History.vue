<template>
  <div class="operationPane">
    <!-- 挡车部分操作栏组件-->
    <!-- 挡车部分主菜单-->
    <div
      class="operationPane_con"
      style="display: flex; justify-content: space-around; align-items: center"
      v-show="isMainShow"
    >
      <div
        class="main_btn"
        @click="
          ListShow = true;
          isMainShow = false;
          isRepair = true;
        "
      >
        维修记录
      </div>
      <div
        class="main_btn"
        @click="
          isMainShow = false;
          ListShow = true;
          isRepair = false;
        "
      >
        保养记录
      </div>
      <img src="../../static/img/close.png" @click="closeCurrentPage()" />
    </div>
    <!-- 维修界面-->
    <div
      class="operationPane_con"
      style="
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
      "
      v-show="repairShow"
    >
      <div class="Maintance_machine">
        机台号：{{ String(checkMachine)
        }}<span style="margin-left: 2rem">维修人：{{ repairPeople }}</span
        ><span style="margin-left: 10rem">报修时间：{{ repairTime }}</span>
      </div>
      <div class="Maintance_machine" style="color: black; height: 5%">
        故障分类：{{ repairReason }}
      </div>
      <div class="Maintance_machine" style="color: black; height: 20%">
        <span class="span1">处理方式:{{ repairSolve }}</span>
      </div>
      <div class="Maintance_machine" style="color: black; height: 10%">零配件：</div>
      <div class="Maintance_materials" style="display: block">
        <div
          class="Maintance_materials_con"
          v-for="(item, index) in repairParts"
          :key="index"
        >
          <span>{{ item.product_name }}</span>
          <span>{{ item.num }}{{ item.unit_name }}</span>
        </div>
      </div>
      <div class="Maintance_btn">
        <div
          class="btns"
          style="margin: 0"
          @click="
            repairShow = false;
            ListShow = true;
          "
        >
          返回
        </div>

        <div
          class="btns"
          style="background: #808080; color: white"
          @click="
            peijianShow = true;
            repairShow = false;
          "
        >
          配件详情
        </div>
      </div>
      <img
        src="../../static/img/close.png"
        @click="
          repairShow = false;
          ListShow = true;
        "
      />
    </div>
    <!-- 维修界面-->
    <!-- 保养界面-->
    <div
      class="operationPane_con"
      style="
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
      "
      v-show="maitanceShow"
    >
      <div class="Maintance_machine" style="color: black">
        机台号：<span style="color: grey">{{ machine_id }}</span
        ><span style="margin-left: 4rem; color: red">{{ maintain_type_name }}</span>
      </div>
      <div class="Maintance_machine" style="color: black; height: 5%">
        保养人:{{ operator }}<span style="margin-left: 19.8rem">保养项次</span>
      </div>
      <div class="Maintance_object" style="height: 30%; margin-top: 1rem">
        <div
          class="Maintance_object_con"
          style="height: 38%"
          v-for="(item, index) in maintainRecords"
          :key="index"
        >
          <span style="margin-right: 4rem">项次{{ index + 1 }}</span>
          <el-checkbox disabled v-model="item.istick">{{
            item.maintain_item_name
          }}</el-checkbox>
        </div>
      </div>
      <div class="Maintance_machine" style="color: black; height: 10%">零配件：</div>
      <div class="Maintance_materials" style="display: block">
        <div
          class="Maintance_materials_con"
          v-for="(item, index) in consumeMaterials"
          :key="index"
        >
          <span>{{ item.product_name }}</span>
          <span>{{ item.quantity }}个</span>
        </div>
      </div>
      <div class="Maintance_btn">
        <div
          class="btns"
          style="margin: 0"
          @click="
            maitanceShow = false;
            ListShow = true;
          "
        >
          返回
        </div>

        <div
          class="btns"
          style="background: #808080; color: white"
          @click="
            peijianShow = true;
            maitanceShow = false;
          "
        >
          配件详情
        </div>
        <div
          class="btns"
          style="background: #808080; color: white"
          @click="
            xiangciShow = true;
            maitanceShow = false;
          "
        >
          项次详情
        </div>
      </div>
      <img
        src="../../static/img/close.png"
        @click="
          maitanceShow = false;
          ListShow = true;
        "
      />
    </div>
    <!-- 保养界面-->
    <!-- 零配件详情-->
    <div
      class="operationPane_con"
      style="
        display: flex;

        align-items: center;
        flex-direction: column;
      "
      v-show="peijianShow"
    >
      <span style="font-size: 1.5rem; margin: 1rem">零配件详情</span>
      <div style="width: 93%; height: 78%">
        <div
          class="material_ones"
          v-show="isRepair"
          style="background: grey; color: white; margin-left: 0.5rem"
          v-for="(item, index) in repairPartsCon"
          :key="index"
        >
          <span>{{ item.product_name }}</span>
          <span>{{ item.num }}{{ item.unit_name }}</span>
        </div>
        <div
          class="material_ones"
          v-show="!isRepair"
          style="background: grey; color: white; margin-left: 0.5rem"
          v-for="(item, index) in consumeMaterialsCon"
          :key="index"
        >
          <span>{{ item.product_name }}</span>
          <span>{{ item.quantity }}个</span>
        </div>
      </div>
      <div class="operationPane_con_machineList_btn">
        <div class="operationPane_con_machineList_btn_left">
          <div class="operationPane_con_machineList_btn_leftBtn" @click="peijianBack()">
            返回
          </div>
        </div>
      </div>

      <img src="../../static/img/close.png" @click="peijianBack()" />
    </div>
    <!-- 零配件详情-->
    <!--项次详情-->
    <div
      class="operationPane_con"
      style="display: flex; align-items: center; flex-direction: column"
      v-show="xiangciShow"
    >
      <span style="font-size: 1.5rem; margin: 1rem">项次详情</span>
      <div style="width: 93%; height: 78%">
        <div
          class="material_ones"
          v-for="(item, index) in maintainRecordsCon"
          :key="index"
        >
          <el-checkbox disabled v-model="item.istick">{{
            item.maintain_item_name
          }}</el-checkbox>
        </div>
      </div>
      <div class="operationPane_con_machineList_btn">
        <div class="operationPane_con_machineList_btn_left">
          <div class="operationPane_con_machineList_btn_leftBtn" @click="xiangciBack()">
            返回
          </div>
        </div>
      </div>

      <img src="../../static/img/close.png" @click="xiangciBack()" />
    </div>
    <!-- 项次详情-->
    <!--记录列表-->
    <div
      class="operationPane_con"
      style="display: flex; justify-content: center; align-items: flex-start"
      v-show="ListShow"
    >
      <div class="operationPane_con_machineList" style="margin: 0" v-show="isRepair">
        <el-checkbox-group
          :max="1"
          v-model="checkMachine"
          style="width: 100%; height: 100%"
        >
          <el-checkbox-button
            size="medium"
            v-for="(item, index) in machineList"
            style="magin: 1rem; font-size: 1rem"
            :label="item.machine_id"
            :key="index"
            ><span>机台号：{{ item.machine_id }}</span
            ><span style="margin: 0.5rem">{{ item.submit_person }}</span
            ><span>上报时间：{{ item.submit_date }}</span>
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div class="operationPane_con_machineList" style="margin: 0" v-show="!isRepair">
        <el-checkbox-group
          :max="1"
          v-model="checkMachine"
          style="width: 100%; height: 100%"
        >
          <el-checkbox-button
            size="medium"
            v-for="(item, index) in machineList"
            style="magin: 1rem; font-size: 1rem"
            :label="item.id"
            :key="index"
            ><span>机台号：{{ item.machine_id }}</span
            ><span style="margin: 0.5rem" v-show="item.operator != ''">{{
              item.operator
            }}</span
            ><span style="margin: 0.5rem" v-show="item.operator == ''">未填写</span
            ><span>保养时间：{{ item.maintain_time }}</span>
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div class="operationPane_con_machineList_btn">
        <div class="operationPane_con_machineList_btn_left">
          <div class="operationPane_con_machineList_btn_leftBtn" @click="showOne()">
            查看
          </div>
          <div
            class="operationPane_con_machineList_btn_leftBtn"
            style="background: rgb(128, 128, 128)"
            @click="
              isMainShow = true;
              ListShow = false;
            "
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
          >
          </el-pagination>
        </div>
      </div>
      <!-- <div class="leftLabel"><span>选机台</span></div> -->

      <img
        src="../../static/img/close.png"
        @click="
          isMainShow = true;
          ListShow = false;
        "
      />
    </div>
    <!-- 记录列表-->
  </div>
</template>

<script>
let host = "http://120.55.124.53:12140";
import axios from "axios";
export default {
  components: {
    keyboard,
  },
  name: "History",
  data() {
    return {
      workshopId: this.$route.params.workshopId,
      company_id: "10000015",
      isMainShow: true, //页面显示隐藏
      repairShow: false,
      maitanceShow: false,
      ListShow: false,
      checkedCities: ["上海", "北京"],
      cities: ["上海", "北京", "广州", "深圳"],
      checkAll: false,
      isIndeterminate: true,
      xiangciShow: false,
      peijianShow: false,
      isRepair: null,
      checkMachine: [],
      machineList: [
        //假数据
        {
          machineId: 1011,
          type: "织机报修",
          time: "2020-12-11 18:00",
        },
        {
          machineId: 1012,
          type: "织机报修",
          time: "2020-12-11 18:00",
        },
      ],
      machineListCon: [],
      total_num: null,
      page_num: 1,
      page_size: 9,
      repairPeople: "",
      repairTime: "",
      repairParts: [],
      repairPartsCon: [],
      repairReason: "",
      repairSolve: "",
      machine_id: "",
      maintain_type_name: "",
      operator: "",
      consumeMaterials: [],
      consumeMaterialsCon: [],
      maintainRecords: [],
      maintainRecordsCon: [],
    };
  },
  methods: {
    CurrentChange(e) {
      //机台分页

      if (this.isRepair == true) {
        this.page_num = e;

        this.machineList = this.pagination(
          this.page_num,
          this.page_size,
          this.machineListCon
        );
      } else {
        this.page_num = e;
        this.getMaitanceList();
      }
    },
    getRepairList() {
      let url =
        "http://112.12.1.41:8091/APP/repair_history?company_id=" +
        this.company_id +
        "&isMessage=4";
      let that = this;
      that.machineList = [];
      that.machineListCon = [];
      axios
        .get(
          url,

          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (res) {
          console.log(res);
          let arr = JSON.parse(res.data.repair_history);
          arr.forEach((element) => {
            if (
              element.submit_person == "" ||
              !element.submit_person ||
              element.submit_person == null
            ) {
              element.submit_person = "未填写";
            }
            if (that.workshopId.indexOf(element.workshop_id) != -1) {
              that.machineListCon.push(element);
            }
          });
          that.total_num = that.machineListCon.length;
          that.machineList = that.pagination(
            that.page_num,
            that.page_size,
            that.machineListCon
          );
          console.log(that.machineList);
        });
    },
    pagination(pageNo, pageSize, array) {
      var offset = (pageNo - 1) * pageSize;
      return offset + pageSize >= array.length
        ? array.slice(offset, array.length)
        : array.slice(offset, offset + pageSize);
    },
    showOne() {
      if (this.isRepair == true) {
        this.repairPeople = "";
        this.repairTime = "";
        this.repairParts = [];
        this.repairPartsCon = [];
        this.repairReason = "";
        this.repairSolve = "";

        this.total_num = null;
        this.page_num = 1;
        this.page_size = 9;
        this.repairShow = true;
        this.ListShow = false;
        this.machineList.forEach((element) => {
          if (element.machine_id == this.checkMachine[0]) {
            let url =
              "http://112.12.1.41:8091/APP/repair_detail?company_id=" +
              this.company_id +
              "&machine_id=" +
              element.machine_id +
              "&repaired_id=" +
              element.repaired_id;
            let that = this;
            axios
              .get(
                url,

                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then(function (res) {
                let arr = JSON.parse(res.data.detail_data);
                console.log(arr[0]);
                that.repairPeople = arr[0].repair_person;
                that.repairTime = arr[0].date;
                that.repairReason = arr[0].error_reason;
                that.repairPartsCon = JSON.parse(arr[0].parts);

                console.log(that.repairPartsCon);
                if (that.repairPartsCon.length >= 16) {
                  for (let i = 0; i < 16; i++) {
                    that.repairParts.push(that.repairPartsCon[i]);
                  }
                } else {
                  for (let i = 0; i < that.repairPartsCon.length; i++) {
                    that.repairParts.push(that.repairPartsCon[i]);
                  }
                }
                that.repairSolve = arr[0].solve;
              });
          }
        });
      } else {
        this.maitanceShow = true;
        this.ListShow = false;
        console.log(this.checkMachine[0]);
        this.machineList.forEach((element) => {
          if (element.id == this.checkMachine[0]) {
            console.log(element);
            this.machine_id = element.machine_id;
            this.maintain_type_name = element.maintain_type_name;
            this.operator = element.operator;
          }
        });
        let url = "http://120.55.124.53:8206/api/maintain/getMaintainDetail";
        let that = this;
        that.machineList = [];
        let maintainMainRecord = {};
        that.maintainRecords = [];
        that.maintainRecordsCon = [];
        that.consumeMaterials = [];
        that.consumeMaterialsCon = [];
        axios
          .post(
            url,
            {
              company_id: that.company_id,
              id: that.checkMachine[0],
            },
            {}
          )
          .then(function (res) {
            console.log(res);
            res.data.result.consumeMaterials.forEach((element) => {
              // if (String(element.specification) != " ") {
              //   console.log("sda");
              // } else {
              //   element.specification = element.product_name;
              // }
              that.consumeMaterialsCon.push(element);
            });

            if (that.consumeMaterialsCon.length > 16) {
              for (let i = 0; i < 2; i++) {
                that.consumeMaterials.push(that.consumeMaterialsCon[i]);
              }
            } else {
              for (let i = 0; i < that.consumeMaterialsCon.length; i++) {
                that.consumeMaterials.push(that.consumeMaterialsCon[i]);
              }
            }
            res.data.result.maintainRecords.forEach((element) => {
              if (element.confirm == 1) {
                if (element.tick == 1) {
                  element.istick = true;
                } else {
                  element.istick = false;
                }
                that.maintainRecordsCon.push(element);
              }
            });
            if (that.maintainRecordsCon.length > 2) {
              for (let i = 0; i < 2; i++) {
                that.maintainRecords.push(that.maintainRecordsCon[i]);
              }
            } else {
              for (let i = 0; i < that.maintainRecordsCon.length; i++) {
                that.maintainRecords.push(that.maintainRecordsCon[i]);
              }
            }
          });
        console.log(that.maintainRecords);
        console.log(that.maintainRecordsCon);
        console.log(that.consumeMaterials);
        console.log(that.consumeMaterialsCon);
      }
    },
    handleCheckAllChange(val) {
      //全选保养项次
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },

    peijianBack() {
      if (this.isRepair == true) {
        this.peijianShow = false;
        this.repairShow = true;
      } else {
        this.peijianShow = false;
        this.maitanceShow = true;
      }
    },

    xiangciBack() {
      if (this.isRepair == true) {
        this.xiangciShow = false;
        this.repairShow = true;
      } else {
        this.xiangciShow = false;
        this.maitanceShow = true;
      }
    },
    getMaitanceList() {
      let url = "http://120.55.124.53:8206/api/maintain/getMaintainRecordPage";
      let that = this;
      that.machineList = [];
      let maintainMainRecord = {
        workshop_id: that.workshopId,
      };

      axios
        .post(
          url,
          {
            maintainMainRecord,
            selectInfo: {
              company_id: that.company_id,
              page_size: that.page_size,
              page_num: that.page_num,
            },
          },
          {}
        )
        .then(function (res) {
          that.total_num = res.data.result.total_data_num;
          if (res.data.result.maintainRecord.length == 0) {
            that.total_num = 0;
          }
          res.data.result.maintainRecord.forEach((element) => {
            that.machineList.push(element);
          });
        });
    },
  },
  mounted() {},
  watch: {
    ListShow(val) {
      if (val == true) {
        this.checkMachine = [];
        this.repairPeople = "";
        this.repairTime = "";
        this.repairParts = [];
        this.repairPartsCon = [];
        this.repairReason = "";
        this.repairSolve = "";
        this.total_num = null;
        this.page_num = 1;
        this.page_size = 9;
        if (this.isRepair == true) {
          this.getRepairList();
        } else {
          this.getMaitanceList();
        }
      }
    },
  },
};
</script>

<style scoped>
.operationPane_con_machineList /deep/ .el-checkbox-button__inner {
  font-size: 1rem;
  padding: 10px 27px;
  margin: 1rem;
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 0.5rem;
}

.material_ones {
  width: 13%;
  margin-left: 4rem;
  float: left;
  height: 16%;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.material_ones /deep/ .el-checkbox {
  font-size: 1.2rem;
}

.material_ones /deep/ .el-checkbox__inner {
  width: 1.2rem;
  height: 1.2rem;
}

.material_ones /deep/ .el-checkbox__inner::after {
  height: 8px;
  left: 7px;
  position: absolute;
  top: 4px;
}

.material_ones /deep/ .el-checkbox__label {
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.5);
}

.Maintance_materials {
  width: 95%;
  height: 30%;
}

.Maintance_materials_con {
  background: grey;
  color: white;
  width: 11%;
  float: left;
  height: 43%;
  margin-bottom: 0.2rem;
  margin-left: 0.5rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.Maintance_materials_con span {
  width: 100%;
  height: 40%;
  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  font-size: 1.5rem;
}

.Maintance_btn {
  width: 95%;
  height: 20%;
  display: flex;
  align-items: center;
}

.btns {
  width: 10rem;
  background: #a3d897;
  border-color: #fff #717171 #717171 #fff;
  border-style: solid;
  border-width: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70%;
  margin-left: 1rem;
  font-size: 1.5rem;
}

.Maintance_machine {
  width: 95%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.5rem;
  color: red;
}

.repair_object {
  width: 100%;
  height: 20%;
  display: flex;
  position: relative;
}

.Maintance_machine .span1 {
  font-size: 1.5rem;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-align: left;
}

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
