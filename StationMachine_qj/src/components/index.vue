<template>
  <div class="allPage">
    <div class="header">
      <div class="header_left">
        <el-avatar :size="50" style="margin-top: 1rem">
          <img src="../../static/img/logo.png" />
        </el-avatar>
        <span style="margin-top: 1.5rem">天衡机修工位操作系统</span>
      </div>
      <div class="header_right">
        <div class="header_right_con">
          <img src="../../static/img/out.png" @click="quit()" /><span
            @click="showNameTable = true"
            >{{ staff_name }}</span
          >
        </div>
        <div class="icon_info">
          <img src="../../static/img/system.png" />

          <img src="../../static/img/unremind.png" />

          <img src="../../static/img/refresh.png" @click="reload()" />

          <img src="../../static/img/question.png" />
        </div>
      </div>
    </div>
    <div class="tabPane">
      <div class="tabPane_con">
        <div
          :class="item.class"
          @click="changeTab(item.label)"
          :style="item.style"
          v-for="(item, index) in tabList"
          :key="index"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <MyMachine
      :staff_id="staffId"
      :staff_name="staff_name"
      v-show="isMyMachine"
    ></MyMachine>

    <History v-show="isHistory"></History>

    <RepairMachine
      :staff_id="staffId"
      :staff_name="staff_name"
      v-show="isRepair"
      :isUpdate="isRepair"
    ></RepairMachine>
    <Maitance
      :isUpdate="isPiLiang"
      :staff_id="staffId"
      :staff_name="staff_name"
      v-show="isMaitance"
    ></Maitance>
    <el-dialog
      :visible.sync="showNameTable"
      width="800px"
      append-to-body
      @close="close()"
    >
      <p style="display: inline-block; font-size: 3rem">员工号</p>
      <el-input
        size="medium"
        id="staff_code"
        ref="staff_code"
        v-model="staff_code"
        style="font-size: 3rem; width: 400px"
        class="standard_input"
      ></el-input>
      <br />
      <br />
      <table
        width="620px"
        cellspacing="0"
        cellpadding="0"
        height="300px"
        style="display: inline-block"
      >
        <tr v-for="indexTr in 2">
          <td v-for="indexTd in 5" style="text-align: center">
            <el-button
              type="primary"
              plain
              style="width: 7rem; height: 7rem; margin-right: 5px; margin-bottom: 5px"
              size="medium"
              @click="selectTableButton(buttonList[(indexTr - 1) * 5 + indexTd - 1])"
            >
              <p style="font-weight: bolder; font-size: 3rem; width: 100%">
                {{ buttonList[(indexTr - 1) * 5 + indexTd - 1] }}
              </p>
            </el-button>
          </td>
          <td v-if="indexTr === 1">
            <el-button
              type="primary"
              style="
                width: 10rem;
                height: 7rem;
                font-size: 3rem;
                margin-bottom: 5px;
                font-weight: bolder;
              "
              @click="getPermission"
              >确定</el-button
            >
          </td>
          <td v-if="indexTr === 2">
            <el-button
              type="info"
              style="width: 10rem; height: 7rem; font-size: 3rem; margin-bottom: 5px"
              @click="selectTableButton('退格')"
              >退格</el-button
            >
          </td>
        </tr>
      </table>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
var host = "http://120.55.124.53:12140";
import MyMachine from "./MyMachine"; //我的机台操作面板

import History from "./History.vue"; //挡车操作面板

import RepairMachine from "./RepairMachine.vue"; //维修操作面板
import Maitance from "./Maitance.vue"; //开出操作面板
export default {
  components: {
    MyMachine,
    History,

    RepairMachine,
    Maitance,
  },
  name: "index",
  inject: ["reload"],
  data() {
    return {
      workshopId: this.$route.params.workshopId,
      company_id: "10000015",
      workshop_id: "",
      showNameTable: true,
      staff_code: "",
      staff_name: null,
      staffId: "",
      buttonList: "1234567890",
      tabList: [
        {
          label: "我的机台",
          class: "oneTab_Choosed",
          style: "color:white",
        },
        {
          label: "维修",
          class: "oneTab",
          style: "background:white;color:#F25643",
        },
        {
          label: "批量保养",
          class: "oneTab",
          style: "background:white;color:#18BC83",
        },

        {
          label: "历史记录",
          class: "oneTab",
          style: "background:white;color:#FF943E",
        },
      ],
      activeTab: "",
      isMyMachine: true,

      isMaitance: false,
      isHistory: false,
      isRepair: false,
      isPiLiang: false,
    };
  },
  methods: {
    close() {
      if (this.staff_name != null) {
        this.showNameTable = false;
        return;
      } else {
        // this.$message({
        //   message: "请先登录！",
        //   type: "warning",
        // });
        this.showNameTable = true;
      }
    },
    quit() {
      var userAgent = navigator.userAgent;
      if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") != -1) {
        window.open("", "_self").close();

        window.location.href = "about:blank";
      } else {
        window.opener = null;
        window.open("about:blank", "_self");
        window.close();
      }
    },
    selectTableButton(buttonName) {
      this.staff_code += "";
      if (buttonName === "退格") {
        this.staff_code = this.staff_code.substring(0, this.staff_code.length - 1);
      } else {
        this.staff_code += buttonName;
      }
      document.getElementById("staff_code").focus();
    },
    getPermission() {
      //员工号3个

      this.showNameTable = false;

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
        // selectFields: ["staff_code", "staff_name"],
        query: {
          staff_code: this.staff_code,
        },
        selectLikeFields: {
          workshop_id: this.workshopId,
        },
      };

      let that = this;

      axios({
        url: url,
        method: method,
        data: data,
        headers: headers,
      }).then((response) => {
        console.log(response.data.data);

        if (response.data.data.length >= 1) {
          that.staff_name = response.data.data[0].staff_name;
          that.staffId = response.data.data[0].staff_code;
          that.workshop_id = response.data.data[0].workshop_id;
          this.showNameTable = false;
        } else {
          this.showNameTable = true;
          that.$message.warning("员工号不正确!");
        }
        that.staff_code = "";
      });
    },
    changeTab(label) {
      //tab栏切换事件

      this.activeTab = label;
      for (let i = 0; i < this.tabList.length; i++) {
        this.tabList[i].class = "oneTab";
        if (this.tabList[i].label == "我的机台") {
          this.tabList[i].style = "background:white;color:#3296FA;";
        }

        if (this.tabList[i].label == "历史记录") {
          this.tabList[i].style = "background:white;color:#FF943E;";
        }

        if (this.tabList[i].label == "维修") {
          this.tabList[i].style = "background:white;color:#F25643;";
        }
        if (this.tabList[i].label == "批量保养") {
          this.tabList[i].style = "background:white;color:#4352F2;";
        }
      }
      for (let i = 0; i < this.tabList.length; i++) {
        if (this.tabList[i].label == label) {
          this.tabList[i].class = "oneTab_Choosed";
          if (this.tabList[i].label == "我的机台") {
            this.tabList[i].style = "background:#3296FA;color:white;";
            this.isLower = false;
            this.isRepair = false;
            this.isHistory = false;
            this.isChaPian = false;
            this.isPiLiang = false;
            this.isMaitance = false;
            this.isMyMachine = true;
            return;
          }

          if (this.tabList[i].label == "历史记录") {
            this.tabList[i].style = "background:#FF943E;color:white;";
            this.isMyMachine = false;
            this.isChaPian = false;
            this.isLower = false;
            this.isMaitance = false;
            this.isRepair = false;
            this.isHistory = true;
            this.isPiLiang = false;
            return;
          }

          if (this.tabList[i].label == "维修") {
            this.tabList[i].style = "background:#F25643;color:white;";
            this.isMyMachine = false;
            this.isChaPian = false;
            this.isHistory = false;
            this.isLower = false;
            this.isMaitance = false;
            this.isPiLiang = false;
            this.isRepair = true;
            return;
          }
          if (this.tabList[i].label == "批量保养") {
            this.tabList[i].style = "background:#4352F2;color:white;";
            this.isMyMachine = false;
            this.isChaPian = false;
            this.isHistory = false;
            this.isLower = false;
            this.isRepair = false;
            this.isPiLiang = true;
            this.isMaitance = true;
            return;
          }
        }
      }
    },
  },
  mounted() {
    console.log(this.workshopId);
  },
  watch: {
    // isMyMachine(val) {
    //   if (val == true) {
    //     this.getGroup(4, "sz");
    //   }
    // },
  },
};
</script>

<style scoped>
/deep/ .el-button {
  line-height: 0;
}
/deep/ .el-input--medium .el-input__inner {
  height: 5rem;
  line-height: 3rem;
}
/deep/ .el-dialog__headerbtn {
  font-size: 3.5rem;
}
body /deep/ .el-message .el-icon-success {
  font-size: 3rem;
}

body /deep/ .el-message--success .el-message__content {
  font-size: 3rem;
}

.allPage {
  width: 100%;
  height: 740px;
}

.header {
  width: 100%;
  height: 80px;
  background: #29374b;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header_left {
  width: 35%;
  height: 100%;
  display: flex;

  color: white;
  font-size: 1.5rem;
}

.header_left span {
  margin-left: 1.5rem;
  height: 2rem;
}

.header_right {
  width: 65%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.header_right_con {
  width: 42%;
  height: 100%;

  display: flex;

  align-items: center;

  color: white;
  font-size: 2.4rem;
}

.header_right_con img {
  width: 40px;
  height: 40px;
}

.header_right_con span {
  margin-left: 1rem;
  height: 40px;
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 5px;
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

.tabPane {
  width: 100%;
  height: 26%;
  background: #e2e7ed;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tabPane_con {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 99%;
  height: 100%;
}

.oneTab {
  width: 23.5%;
  height: 80%;
  background: white;
  display: flex;
  font-family: FZCYJ;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  border-radius: 16px;
}

.oneTab_Choosed {
  width: 23.5%;
  height: 80%;
  font-family: FZCYJ;
  color: white;
  background: #3296fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  border-radius: 16px;
}
</style>
