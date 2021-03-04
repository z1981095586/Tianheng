<template>
  <div class="allPage">
    <div class="header">
      <div class="header_left">
        <el-avatar :size="50">
          <img src="../../static/img/logo.png" />
        </el-avatar>
        <span>天衡织机工位操作系统</span>
      </div>
      <div class="header_right">
        <div class="header_right_con">
          <span v-show="isShangZhou || isChaPian || isKaiChu || isLower">{{
            className
          }}</span
          ><span v-show="isShangZhou || isChaPian || isKaiChu || isLower"
            >开出工:{{ kcgName }}</span
          ><span
            v-show="isShangZhou || isKaiChu || isLower"
            v-for="(item, index) in nameList"
            :key="'sz_' + index"
            >{{ item.label }}：{{ item.staffName }}</span
          >
          <span v-show="isChaPian" v-for="(item, index) in nameList2" :key="'cp_' + index"
            >{{ item.label }}：{{ item.staffName }}</span
          ><span v-show="isMachine">机台：701@王某人</span>
          <span v-show="isStopCar || isMachine"
            >{{ dcClass }}&nbsp;&nbsp;挡车工:{{ dcName }}</span
          >
        </div>
        <div class="icon_info">
          <img src="../../static/img/remind.png" />

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
    <uppershaft v-show="isShangZhou" @szChange="getGroup(4, 'sz')"></uppershaft>
    <illustration
      v-show="isChaPian"
      @cpChange="getGroup(15, 'cp')"
      :nameList3="nameList3"
    ></illustration>
    <stopcar v-show="isStopCar" @dcChange="dcChange"></stopcar>
    <loweraxis v-show="isLower"></loweraxis>
    <machinemaintenance v-show="isMachine" :problem="problem"></machinemaintenance>
    <out v-show="isKaiChu" @kcChange="getGroup(4, 'sz')" :nameList4="nameList4"></out>
  </div>
</template>

<script>
import axios from "axios";
var host = "http://120.55.124.53:12140";
import Uppershaft from "./Uppershaft"; //上轴操作面板
import illustration from "./illustration"; //扫码插片操作面板
import Stopcar from "./Stopcar"; //挡车操作面板
import Loweraxis from "./Loweraxis"; //下轴操作面板
import Machinemaintenance from "./Machinemaintenance"; //机修操作面板
import Out from "./Out"; //开出操作面板
export default {
  components: {
    illustration,
    Uppershaft,
    Stopcar,
    Loweraxis,
    Machinemaintenance,
    Out,
  },
  name: "index",
  inject: ["reload"],
  data() {
    return {
      company_id: "10000025",
      tabList: [
        {
          label: "上轴",
          class: "oneTab_Choosed",
          style: "color:white",
        },
        {
          label: "插片",
          class: "oneTab",
          style: "background:white;color:#18BC83",
        },
        {
          label: "开出",
          class: "oneTab",
          style: "background:white;color:#18BC83",
        },
        {
          label: "挡车",
          class: "oneTab",
          style: "background:white;color:#FF943E",
        },
        {
          label: "下轴",
          class: "oneTab",
          style: "background:white;color:#9373EF",
        },

        {
          label: "机修",
          class: "oneTab",
          style: "background:white;color:#F25643",
        },
      ],
      activeTab: "",
      isShangZhou: true,
      isChaPian: false,
      isKaiChu: false,
      isStopCar: false,
      isMachine: false,
      isLower: false,
      nameList: [], //上轴顶部栏名字列表

      nameList2: [], //插片顶部栏名字列表
      nameList3: [], //当前插片员工数组
      nameList4: [], //当前开出员工数组
      dcClass: "",
      dcName: "",
      problem: null,
      className: "",
      kcgName: "",
    };
  },
  methods: {
    getGroup(id, page) {
      //第一个参数groupId，第二个参数页面缩写
      //获取当前班次(当班分组)(倒数第二级分组)

      let url2 = host + "/api/group/getOnDutyShift";
      let that = this;
      axios({
        url: url2,
        method: "post",
        data: {
          selectInfo: {
            company_id: that.company_id,
          },
          shiftGroup: {
            id: id,
          },
        },
      }).then((res) => {
        console.log(res);
        let nameList = res.data.result.staffList;
        that.className = res.data.result.group_name;
        nameList.forEach((element) => {
          element.label = element.staff_organization_name + "0" + element.order_num;
          element.staffName = element.staff_name;
        });
        console.log(nameList);
        if (page == "sz") {
          this.szChange(nameList);
        } else if (page == "cp") {
          this.cpChange(nameList);
        } else if (page == "dc") {
          this.dcClass = res.data.result.group_name;
          this.dcName = res.data.result.staffList[0].staff_name;
        }
      });
    },
    szChange(nameList) {
      //上轴换班事件
      this.nameList = [];
      let str = "";
      console.log(nameList);
      this.nameList4 = nameList;
      for (let i = 0; i < nameList.length; i++) {
        if (nameList[i].label == "开出工01" && nameList[i].staffName != "") {
          this.kcgName = nameList[i].staffName;
          //console.log(this.kcgName);
        }
        if (nameList[i].label.indexOf("上轴工") != -1 && nameList[i].staffName != "") {
          str = str + nameList[i].staffName + "，";
        }
      }
      str = str.substr(0, str.length - 1);
      //console.log(str);
      if (this.nameList.length > 1) {
        if (str != "" && this.nameList[1].staffName != str) {
          this.nameList[1] = {
            label: "上轴工",
            staffName: str,
          };
        }
      } else {
        if (str != "") {
          this.nameList.push({
            label: "上轴工",
            staffName: str,
          });
        }
      }
    },
    cpChange(nameList) {
      //插片换班事件

      let str = "";
      this.nameList3 = nameList;
      for (let i = 0; i < nameList.length; i++) {
        if (nameList[i].label.indexOf("插片工") != -1 && nameList[i].staffName != "") {
          str = str + nameList[i].staffName + "，";
        }
      }
      str = str.substr(0, str.length - 1);
      if (this.nameList2.length > 0) {
        if (str != "" && this.nameList2[0].staffName != str) {
          this.nameList2 = [];
          this.nameList2.push({
            label: "插片工",
            staffName: str,
          });
        }
      } else {
        if (str != "") {
          this.nameList2.push({
            label: "插片工",
            staffName: str,
          });
        }
      }
    },
    dcChange(nameList) {
      //挡车换班事件
      this.getGroup(16, "dc");
    },
    changeTab(label) {
      //tab栏切换事件

      this.activeTab = label;
      for (let i = 0; i < this.tabList.length; i++) {
        this.tabList[i].class = "oneTab";
        if (this.tabList[i].label == "上轴") {
          this.tabList[i].style = "background:white;color:#3296FA;";
        }
        if (this.tabList[i].label == "插片") {
          this.tabList[i].style = "background:white;color:#18BC83;";
        }
        if (this.tabList[i].label == "挡车") {
          this.tabList[i].style = "background:white;color:#FF943E;";
        }
        if (this.tabList[i].label == "下轴") {
          this.tabList[i].style = "background:white;color:#9373EF;";
        }
        if (this.tabList[i].label == "机修") {
          this.tabList[i].style = "background:white;color:#F25643;";
        }
        if (this.tabList[i].label == "开出") {
          this.tabList[i].style = "background:white;color:#4352F2;";
        }
      }
      for (let i = 0; i < this.tabList.length; i++) {
        if (this.tabList[i].label == label) {
          this.tabList[i].class = "oneTab_Choosed";
          if (this.tabList[i].label == "上轴") {
            this.tabList[i].style = "background:#3296FA;color:white;";
            this.isLower = false;
            this.isMachine = false;
            this.isStopCar = false;
            this.isChaPian = false;
            this.isKaiChu = false;
            this.isShangZhou = true;
            return;
          }
          if (this.tabList[i].label == "插片") {
            this.tabList[i].style = "background:#18BC83;color:white;";
            this.isShangZhou = false;
            this.isLower = false;
            this.isMachine = false;
            this.isStopCar = false;
            this.isKaiChu = false;
            this.isChaPian = true;
            return;
          }
          if (this.tabList[i].label == "挡车") {
            this.tabList[i].style = "background:#FF943E;color:white;";
            this.isShangZhou = false;
            this.isChaPian = false;
            this.isLower = false;
            this.isKaiChu = false;
            this.isMachine = false;
            this.isStopCar = true;
            return;
          }
          if (this.tabList[i].label == "下轴") {
            this.tabList[i].style = "background:#9373EF;color:white;";
            this.isShangZhou = false;
            this.isChaPian = false;
            this.isStopCar = false;
            this.isMachine = false;
            this.isKaiChu = false;
            this.isLower = true;
            return;
          }
          if (this.tabList[i].label == "机修") {
            this.tabList[i].style = "background:#F25643;color:white;";
            this.isShangZhou = false;
            this.isChaPian = false;
            this.isStopCar = false;
            this.isLower = false;
            this.isKaiChu = false;
            this.isMachine = true;
            return;
          }
          if (this.tabList[i].label == "开出") {
            this.tabList[i].style = "background:#4352F2;color:white;";
            this.isShangZhou = false;
            this.isChaPian = false;
            this.isStopCar = false;
            this.isLower = false;
            this.isMachine = false;
            this.isKaiChu = true;
            return;
          }
        }
      }
    },
    getProblem() {
      //获取问题列表
      let url2 = host + "/api/repair/getRepairType";
      let that = this;

      axios({
        url: url2,
        method: "post",
        data: {
          selectInfo: {
            company_id: that.company_id,
            page_num: 1,
            page_size: 6,
          },
        },
      }).then((res) => {
        //console.log(res);
        this.problem = res.data.result;
      });
    },
  },
  mounted() {
    this.getGroup(4, "sz"); //默认
  },
  watch: {
    isShangZhou(val) {
      if (val == true) {
        this.getGroup(4, "sz");
      }
    },
    isChaPian(val) {
      if (val == true) {
        this.getGroup(15, "cp");
      }
    },
    isStopCar(val) {
      if (val == true) {
        this.getGroup(16, "dc");
      }
    },
    isMachine(val) {
      if (val == true) {
        this.getProblem();
        this.getGroup(16, "dc");
      }
    },
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
  align-items: center;
  color: white;
  font-size: 1.5rem;
}

.header_left span {
  margin-left: 1.5rem;
}

.header_right {
  width: 65%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.header_right_con {
  color: white;
  font-size: 1rem;
  font-weight: 600;

  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.header_right_con span {
  margin-right: 1rem;
}
.icon_info {
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.icon_info img {
  width: 30px;
  height: 30px;
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
  width: 15.5%;
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
  width: 15.5%;
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
