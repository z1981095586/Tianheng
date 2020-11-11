<template>
  <div class="allPage_M">

    <div class="operationPane_con" v-show="isMachine"
      style="display:flex;justify-content: center;align-items: flex-start;">
      <div class="operationPane_con_machineList">
        <el-checkbox-group :max="1" @change="checkedMachine" v-model="checkMachine" style="width:100%;height:100%;">
          <el-checkbox-button size="medium" v-for="(item,index) in machineList" style="magin:1rem;font-size:2rem"
            :label="item" :key="index">{{item}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div class="operationPane_con_machineList_btn">
        <div class="operationPane_con_machineList_btn_left">
          <div class="operationPane_con_machineList_btn_leftBtn" @click="sureMachine()">确认</div>
          <div class="operationPane_con_machineList_btn_leftBtn" style=" " @click="cancel()">取消</div>
        </div>
        <div class="operationPane_con_machineList_btn_right">
          <el-pagination background small layout="prev, pager, next" :total="50">
          </el-pagination>
        </div>
      </div>
      <div class="leftLabel"><span>选机台</span></div>
      <div class="search"><span style="font-size:2rem">搜索：</span><input placeholder="输入机台号" /><span
          style="color:red;margin-left:1rem">选中机台：{{this.checkedMachineNum}}</span></div>
      <img src="../../static/img/close.png" />
    </div>
    <div class="allPage_con" v-show="!isMachine">
      <div class="allPage_con_left">
        <div class="allPage_con_left_top">
          <div class="allPage_con_left_top_left">
            <div class="allPage_con_left_top_left_title">报修机台</div>
            <div class="allPage_con_left_top_left_btn" v-show="!isChecked" @click="chooseMachine()">请选择</div>
            <div class="allPage_con_left_top_left_btn" v-show="isChecked" @click="chooseMachine()">{{checkedMachineNum}}
            </div>
          </div>
          <div class="allPage_con_left_top_right">
            <div class="baoxiu_btn" :style="!isChecked?'background:#808080':'background:#A3D897'">报修</div>
          </div>
        </div>
        <div class="allPage_con_left_middle">
          <div class="allPage_con_left_top_left">
            <div class="allPage_con_left_top_left_title">品号</div>
            <textarea disabled placeholder="选择机台后获取..."></textarea>
          </div>
          <div class="allPage_con_left_top_left" style="width:50%">
            <div class="allPage_con_left_top_left_title">品名</div>
            <textarea disabled placeholder="选择机台后获取..."></textarea>
          </div>
        </div>
        <div class="allPage_con_left_bottom">
          <div class="allPage_con_left_top_left" style="width:100%">
            <div class="allPage_con_left_top_left_title" style="height:30%">品名</div>
            <textarea disabled placeholder="选择机台后获取..." style="height:70%;width:98.3%;"></textarea>
          </div>
        </div>
      </div>
      <div class="allPage_con_right">
        <div class="allPage_con_right_left">
          <div class="allPage_con_right_left_one" @click="checkQuestion(item.id)" v-for="(item,index) in questionList"
            :key="index">
            <span>{{item.title}}</span>
            <div class="question_area" :style="item.isChecked?'background:#3296FA':'background:#808080'">
              <span>{{item.question}}</span></div>
          </div>


        </div>
        <div class="allPage_con_right_right">
          <div class="allPage_con_right_right_con">
            <img src="../../static/img/page-left.png" />
            <img src="../../static/img/page-right.png" />
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {

    name: 'Machinemaintenance',
    data() {
      return {
        isMachine: false,
        checkedMachineNum: "",
        isChecked: false,
        checkMachine: [], //上轴选中机台列表
        questionList: [
          {
            id: 1,
            title: "我是问题",
            question: "我是问题描述问题描述问题描述问题描述问题备份",
            isChecked: false
          },
          {
            id: 2,
            title: "我是问题",
            question: "我是问题描述问题描述问题描述问题描述问题备份",
            isChecked: false
          },
          {
            id: 3,
            title: "我是问题",
            question: "我是问题描述问题描述问题描述问题描述问题备份",
            isChecked: false
          },
          {
            id: 4,
            title: "我是问题",
            question: "我是问题描述问题描述问题描述问题描述问题备份",
            isChecked: false
          },
          {
            id: 5,
            title: "我是问题",
            question: "我是问题描述问题描述问题描述问题描述问题备份",
            isChecked: false
          },
          {
            id: 6,
            title: "我是问题",
            question: "我是问题描述问题描述问题描述问题描述问题备份",
            isChecked: false
          },
        ],
        machineList: ['101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114',
          '115', '116', '117', '118',
        ] //上轴机台列表
      }
    },
    methods: {
      checkQuestion(id) {
        for (let i = 0; i < this.questionList.length; i++) {
          if (this.questionList[i].id == id) {
            this.questionList[i].isChecked = !this.questionList[i].isChecked
          }
        }
      },
      chooseMachine() {
        this.isMachine = true
      },
      checkedMachine(e) { //选择机台事件
        this.checkedMachineNum = e[0]
      },
      cancel() {
        this.isMachine = false
        this.isChecked = false
      },
      sureMachine() {
        this.isMachine = false
        this.isChecked = true
      }
    },
    mounted() {

    }
  }

</script>

<style scoped>
  .allPage_M {
    width: 100%;
    position: relative;
    height: 66%;
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
    background: #317CCD;
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
    background: #A3D897;
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
    color: #FFFFFF;
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
