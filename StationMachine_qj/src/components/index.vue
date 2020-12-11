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
          <img src="../../static/img/out.png" /><span>周品道</span>
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
    <MyMachine v-show="isMyMachine"></MyMachine>

    <History v-show="isHistory"></History>

    <RepairMachine v-show="isRepair"></RepairMachine>
    <Maitance v-show="isMaitance"></Maitance>
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
      company_id: "10000015",
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
          label: "保养",
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
    };
  },
  methods: {
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
        if (this.tabList[i].label == "保养") {
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
            return;
          }

          if (this.tabList[i].label == "维修") {
            this.tabList[i].style = "background:#F25643;color:white;";
            this.isMyMachine = false;
            this.isChaPian = false;
            this.isHistory = false;
            this.isLower = false;
            this.isMaitance = false;
            this.isRepair = true;
            return;
          }
          if (this.tabList[i].label == "保养") {
            this.tabList[i].style = "background:#4352F2;color:white;";
            this.isMyMachine = false;
            this.isChaPian = false;
            this.isHistory = false;
            this.isLower = false;
            this.isRepair = false;
            this.isMaitance = true;
            return;
          }
        }
      }
    },
  },
  mounted() {},
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
body /deep/ .el-message .el-icon-success {
  font-size: 3rem;
}

body /deep/ .el-message--success .el-message__content {
  font-size: 3rem;
}

.allPage {
  width: 100%;
  height: 768px;
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
