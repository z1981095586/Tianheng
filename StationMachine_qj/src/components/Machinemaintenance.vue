<template>
  <div class="allPage_M">
    <div
      class="operationPane_con"
      v-show="isMachine"
      style="display: flex; justify-content: center; align-items: flex-start"
    >
      <div class="operationPane_con_machineList">
        <el-checkbox-group
          :max="1"
          @change="checkedMachine"
          v-model="checkMachine"
          style="width: 100%; height: 100%"
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
            确认
          </div>
          <div
            class="operationPane_con_machineList_btn_leftBtn"
            style=""
            @click="cancel()"
          >
            取消
          </div>
        </div>
        <div class="operationPane_con_machineList_btn_right">
          <el-pagination
            background
            small
            :pager-count="3"
            layout="prev, pager, next"
            :total="total_num2"
            :page-size="page_size2"
          >
          </el-pagination>
        </div>
      </div>
      <div class="leftLabel"><span>选机台</span></div>
      <div class="search">
        <span style="font-size: 2rem">搜索：</span><input placeholder="输入机台号" /><span
          style="color: red; margin-left: 1rem"
          >选中机台：{{ this.checkedMachineNum }}</span
        >
      </div>
      <img src="../../static/img/close.png" @click="cancel()" />
    </div>
    <div class="allPage_con" v-show="!isMachine">
      <div class="allPage_con_left">
        <div class="allPage_con_left_top">
          <div class="allPage_con_left_top_left">
            <div class="allPage_con_left_top_left_title">报修机台</div>
            <div
              class="allPage_con_left_top_left_btn"
              v-show="!isChecked"
              @click="chooseMachine()"
            >
              请选择
            </div>
            <div
              class="allPage_con_left_top_left_btn"
              v-show="isChecked"
              @click="chooseMachine()"
            >
              {{ checkedMachineNum }}
            </div>
          </div>
          <div class="allPage_con_left_top_right">
            <div
              class="baoxiu_btn"
              :style="!isChecked ? 'background:#808080' : 'background:#A3D897'"
              @click="repair"
            >
              报修
            </div>
          </div>
        </div>
        <div class="allPage_con_left_middle">
          <div class="allPage_con_left_top_left">
            <div class="allPage_con_left_top_left_title">品号</div>
            <textarea disabled placeholder="选择机台后获取..."></textarea>
          </div>
          <div class="allPage_con_left_top_left" style="width: 50%">
            <div class="allPage_con_left_top_left_title">品名</div>
            <textarea disabled placeholder="选择机台后获取..."></textarea>
          </div>
        </div>
        <div class="allPage_con_left_bottom">
          <div class="allPage_con_left_top_left" style="width: 100%">
            <div class="allPage_con_left_top_left_title" style="height: 30%">品名</div>
            <textarea
              disabled
              placeholder="选择机台后获取..."
              style="height: 70%; width: 98.3%"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="allPage_con_right">
        <div class="allPage_con_right_left">
          <div
            class="allPage_con_right_left_one"
            @click="checkQuestion(item.id)"
            v-for="(item, index) in questionList"
            :key="index"
          >
            <!-- <span>{{item.title}}</span> -->
            <div
              class="question_area"
              style="height: 100%"
              :style="item.isChecked ? 'background:#3296FA' : 'background:#808080'"
            >
              <span>{{ item.question }}</span>
            </div>
          </div>
        </div>
        <div class="allPage_con_right_right">
          <div class="allPage_con_right_right_con">
            <img src="../../static/img/page-left.png" @click="lastPage" />
            <img src="../../static/img/page-right.png" @click="nextPage" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
var host = "http://120.55.124.53:12140";
export default {
  name: "Machinemaintenance",
  props: ["problem"],
  data() {
    return {
      mac_type_id: "030100",
      isMachine: false,
      checkedMachineNum: "",
      isChecked: false,
      company_id: "10000025",
      checkMachine: [], //上轴选中机台列表
      questionList: [
        // {
        //   id: 1,
        //   title: "我是问题",
        //   question: "我是问题描述问题描述问题描述问题描述问题备份",
        //   isChecked: false
        // },
        // {
        //   id: 2,
        //   title: "我是问题",
        //   question: "我是问题描述问题描述问题描述问题描述问题备份",
        //   isChecked: false
        // },
        // {
        //   id: 3,
        //   title: "我是问题",
        //   question: "我是问题描述问题描述问题描述问题描述问题备份",
        //   isChecked: false
        // },
        // {
        //   id: 4,
        //   title: "我是问题",
        //   question: "我是问题描述问题描述问题描述问题描述问题备份",
        //   isChecked: false
        // },
        // {
        //   id: 5,
        //   title: "我是问题",
        //   question: "我是问题描述问题描述问题描述问题描述问题备份",
        //   isChecked: false
        // },
        // {
        //   id: 6,
        //   title: "我是问题",
        //   question: "我是问题描述问题描述问题描述问题描述问题备份",
        //   isChecked: false
        // },
      ],
      questionCon: [],
      page_num: 1,
      page_size: 6,
      total_num: null,
      machineList: [], //上轴机台列表
      page_num2: 1,
      page_size2: 6,
      total_num2: null,
    };
  },
  methods: {
    repair() {
      let error_desc = [];
      if (this.questionCon.length < 0) {
        this.$message({
          message: "请选择问题！",
          type: "warning",
        });
      } else {
        this.questionCon.forEach((element) => {
          error_desc.push(element.question);
        });
        error_desc = String(error_desc);
        let url2 = host + "/api/group/getOnDutyShift";
        let that = this;
        axios({
          //获取挡车工姓名
          url: url2,
          method: "post",
          data: {
            selectInfo: {
              company_id: that.company_id,
            },
            shiftGroup: {
              id: 16,
            },
          },
        }).then((res) => {
          //console.log(res);

          let dcName = res.data.result.staffList[0].staff_name;
          //console.log(error_desc);
          //console.log(this.checkedMachineNum);
          //console.log(dcName);
          let url = host + "/api/repair/errorSubmit";
          axios({
            url: url,
            method: "post",
            data: {
              selectInfo: {
                company_id: that.company_id,
              },
              error_submit: {
                machine_id: that.checkedMachineNum,
                error_desc: error_desc,
                submit_person: dcName,
              },
            },
          }).then((res) => {
            //console.log(res);
            if (res.data.message == "成功") {
              this.$message({
                message: "报修成功！",
                type: "success",
              });
            } else {
              this.$message.error("操作失败！");
            }
            this.checkedMachineNum = "";
            this.isChecked = false;
            this.questionCon = [];
            this.getMachine();
          });
        });
      }
    },
    getMachineList() {
      let that = this;
      let url = host + "/api/stationMachine/getMachines";
      let method = axios({
        url: url,
        method: "post",
        data: {
          selectInfo: {
            company_id: that.company_id,
            page_size: that.page_size2,
            page_num: that.page_num2,
          },
          mac_type_id: that.mac_type_id,
        },
        // headers: headers
      }).then((response) => {
        that.total_num2 = response.data.result.total_num;
        let array = response.data.result.models;
        that.machineList = [];
        array.forEach((element) => {
          that.machineList.push(element);
        });
      });
    },
    lastPage() {
      //console.log(this.page_num);
      if (this.page_num > 1) {
        this.page_num = this.page_num - 1;
        this.getMachine();
      } else {
        this.$message({
          message: "没有上一页！",
          type: "warning",
        });
      }
    },
    nextPage() {
      //console.log(this.total_num / this.page_size);
      if (this.page_num > this.total_num / this.page_size) {
        this.$message({
          message: "没有下一页！",
          type: "warning",
        });
      } else {
        this.page_num = this.page_num + 1;
        this.getMachine();
      }
    },
    nextPage2() {
      if (this.page_num2 > this.total_num / this.page_size2) {
        this.$message({
          message: "没有下一页！",
          type: "waring",
          duraing: 1000,
        });
      } else {
        this.page_num2 = this.page_num2 + 1;
        this.getMachine();
      }
    },
    getMachine() {
      let url2 = host + "/api/repair/getRepairType";
      let that = this;
      axios({
        url: url2,
        method: "post",
        data: {
          selectInfo: {
            company_id: that.company_id,
            page_num: that.page_num,
            page_size: that.page_size,
          },
        },
      }).then((res) => {
        //console.log(res);
        let val = res.data.result;
        that.questionList = [];

        val.models.forEach((element) => {
          //   for(let i=0;i<that.questionCon.length;i++){
          //  if(that.questionCon[i].id==element.id){
          //               that.questionList.push(that.questionCon[i])
          //   }else{
          that.questionList.push({
            id: element.id,
            isChecked: false,
            question: element.repair_typename,
          });
          // }
          // }
        });
        for (let j = 0; j < this.questionList.length; j++) {
          for (let i = 0; i < this.questionCon.length; i++) {
            if (this.questionCon[i].id == this.questionList[j].id) {
              this.questionList[j] = this.questionCon[i];
            }
          }
        }
        that.total_num = val.total_num;
      });
    },
    checkQuestion(id) {
      for (let i = 0; i < this.questionList.length; i++) {
        if (this.questionList[i].id == id) {
          this.questionList[i].isChecked = !this.questionList[i].isChecked;
          //console.log(this.questionList[i].isChecked);
          if (this.questionList[i].isChecked == true) {
            if (this.questionCon.indexOf(this.questionList[i]) == -1) {
              this.questionCon.push(this.questionList[i]);
              //console.log(this.questionCon);
            }
          } else if (this.questionList[i].isChecked == false) {
            //console.log(this.questionCon.indexOf(this.questionList[i]));
            if (this.questionCon.indexOf(this.questionList[i]) != -1) {
              this.questionCon.splice(this.questionCon.indexOf(this.questionList[i]), 1);
              //console.log(this.questionCon);
            }
          }
        }
      }
    },

    chooseMachine() {
      this.isMachine = true;
    },
    checkedMachine(e) {
      //选择机台事件
      this.checkedMachineNum = e[0];
    },
    cancel() {
      this.isMachine = false;
      this.isChecked = false;
    },
    sureMachine() {
      this.isMachine = false;
      if (typeof this.checkedMachineNum == "undefined") {
        this.isChecked = false;
      } else {
        this.isChecked = true;
      }
    },
  },
  mounted() {},
  watch: {
    isMachine(val) {
      this.getMachineList();
    },
    problem(val) {
      this.page_num = 1;
      this.questionList = [];

      val.models.forEach((element) => {
        this.questionList.push({
          id: element.id,
          isChecked: false,
          question: element.repair_typename,
        });
      });
      this.total_num = val.total_num;
    },
    questionList(val) {
      // val.forEach(element => {
      //   });
      //console.log(val);
    },
  },
};
</script>

<style>
.allPage_M {
  width: 100%;
  position: relative;
  height: 64%;
  display: flex;
  background: rgb(226, 231, 237);
  align-items: center;
  justify-content: center;
}

.allPage_con {
  width: 98%;
  height: 95%;

  display: flex;
  align-items: center;
  justify-content: space-around;
}

.allPage_con_left {
  width: 40%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.allPage_con_left_top {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 35%;
}

.allPage_con_left_top_left {
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.allPage_con_left_top_left textarea {
  width: 96%;
  height: 40%;
}

.allPage_con_left_top_left_title {
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  color: white;
  background: #317ccd;
}

.allPage_con_left_top_left_btn {
  width: 96%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border-top: 3px solid #ffffff;
  border-left: 3px solid #ffffff;
  border-bottom: 3px solid #717171;
  border-right: 3px solid #717171;
  color: black;
  background: #a3d897;
}

.allPage_con_left_top_right {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.baoxiu_btn {
  width: 100%;
  height: 80%;
  display: flex;
  background: #808080;
  color: #ffffff;
  border-top: 3px solid #ffffff;
  border-left: 3px solid #ffffff;
  border-bottom: 3px solid #717171;
  border-right: 3px solid #717171;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.allPage_con_left_middle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 30%;
}

.allPage_con_left_bottom {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 30%;
}

.allPage_con_right {
  width: 55%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.allPage_con_right_left {
  width: 75%;
  height: 100%;
}

.allPage_con_right_left_one {
  width: 45%;
  height: 30%;

  margin: 0.5rem;
  float: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.allPage_con_right_left_one span {
  width: 100%;
  height: 25%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.question_area {
  width: 100%;
  height: 75%;
  background: #808080;
  display: flex;
  align-items: center;
  justify-content: center;
}

.question_area span {
  width: 90%;
  height: 95%;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;

  color: white;
}

.allPage_con_right_right {
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.allPage_con_right_right_con {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.allPage_con_right_right_con img {
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
}
</style>
