<template>
  <div class="operationPane">

    <!-- 插片部分操作栏组件-->
    <!-- 插片部分主菜单-->
    <div class="operationPane_con" style="display:flex;justify-content: center;align-items: flex-end;"
      v-show="szMainShow">

      <div class="operationPane_con_uppershaft">

        <div class="chooseBtn">
          <div class="chooseBtn_con">
            <div class="chooseBtn_con_label"><span v-show="!isCheckedMachine">机台</span><span
                v-show="isCheckedMachine">{{checkedMachineNum}}</span></div>
            <div class="chooseBtn_con_btn" @click="toChooseMachine()"><span>请选择</span></div>
          </div>
          <div class="chooseBtn_con">
            <div class="chooseBtn_con_label"><span>A班&B班</span></div>
            <div class="chooseBtn_con_btn" @click="toShift()"><span>换班</span></div>
          </div>
        </div>
        <div class="pane">
          <div class="text">
            <div class="text_con"><span>品名：扫码号显示....</span><span>品名：扫码号显示....</span></div>
            <div class="text_con"><span>品名：扫码号显示....</span></div>
          </div>
          <div class="pane_title"><span>注意事项</span></div>
          <div class="pane_con"><textarea style="background:white" class="textarea" disabled
              placeholder="扫描后显示..."></textarea></div>
          <div class="pane_btn">
            <div class="pane_btn_one" @click="saoma()" :style="issaoma?'background:#808080':'background:#A3D897'">
              <span>扫码插片</span></div>
            <div class="pane_btn_one" @click="wanchen()" :style="issaoma?'background:#A3D897':'background:#808080'">
              <span>完成插片</span></div>
          </div>
        </div>
      </div>
      <img src="../../static/img/close.png" @click="  closeCurrentPage" />
    </div>
    <!-- 插片部分主菜单-->
    <!-- 插片部分选机台-->
    <div class="operationPane_con" style="display:flex;justify-content: center;align-items: flex-start;"
      v-show="szMachineShow">
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
      <div class="search"><span style="font-size:1.7rem">搜索：</span><input placeholder="输入机台号" /><span
          style="color:red;margin-left:1rem">选中机台：{{this.checkedMachineNum}}</span></div>
      <img src="../../static/img/close.png" @click="  closeCurrentPage" />
    </div>
    <!-- 插片部分选机台-->
    <!-- 插片换班-->
    <div class="operationPane_con" style="display:flex;justify-content: center;align-items: flex-start;"
      v-show="szShiftShow">
      <div class="operationPane_con_machineList">
        <div class="shift">
          <div class="shift_con"><span>班次：</span><select :disabled="!isStartChange">
              <option value="A班">A班</option>
            </select></div>
          <div class="shift_con" v-for="(item,index) in staffList" :key="index"><span>{{item.label}}：</span>
            <div :class="item.isSelected?'staffCheck2': 'staffCheck'" @click="chooseStaff(item.label)">
              {{item.staffName}}</div>
          </div>

        </div>
        <el-checkbox-group :max="1" :disabled="!isStartChange" text-color="#ffffff" fill="#3296FA" v-model="checkStaffName" @change="checkedName"
          style="width:100%;height:100%;">
          <el-checkbox-button size="medium" v-for="(item,index) in StaffNameList" style="magin:1rem;font-size:2rem"
            :label="item" :key="index">{{item}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div class="operationPane_con_machineList_btn">
        <div class="operationPane_con_machineList_btn_left">
          <div class=" operationPane_con_machineList_btn_leftBtn" @click="startChange()"
            :style="isStartChange?'background:#8C8C8C':'background:#A3D897'">开始修改</div>
          <div class="operationPane_con_machineList_btn_leftBtn"
            :style="isStartChange?'background:#A3D897;':'background:#8C8C8C;'"
            @click="save()">保存</div>
        </div>
        <div class="operationPane_con_machineList_btn_right">
          <el-pagination background small layout="prev, pager, next" :total="50">
          </el-pagination>
        </div>
      </div>
      <div class="leftLabel"><span>换班</span></div>

      <img src="../../static/img/close.png" @click="  closeCurrentPage" />
    </div>
    <!-- 插片换班-->
    <!-- 插片部分操作栏组件-->
  </div>
</template>

<script>
  export default {
        name: 'illustration',
    data() {
      return {
        szMainShow: true, //插片主页面显示隐藏
        szMachineShow: false, //插片选择机台显示隐藏
        szShiftShow: false, //插片换班显示隐藏
        checkMachine: [], //插片选中机台列表
        checkStaffName: [], //插片选中的员工名字
        checkedMachineNum: "", //选中的机台号
        isCheckedMachine: false, //是否选中机台
        isStartChange: false, //换班是否开始修改
        issaoma: false,
        staffList: [{
            label: "插片工01",
            staffName: "",
            isSelected: false
          },
          {
            label: "插片工02",
            staffName: "",
            isSelected: false
          },
          {
            label: "插片工03",
            staffName: "",
            isSelected: false
          },
          {
            label: "插片工04",
            staffName: "",
            isSelected: false
          },
        ],
        StaffNameList: ['周品道', '周品娥', '周我道', '我品道', '娥品道', '周而且', '娥去道', '偶尔娥', '汽配娥', '我我完', '请求道', ],
        machineList: ['101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114',
          '115', '116', '117', '118',
        ] //插片机台列表

      };
    },
    methods: {
           closeCurrentPage(){
        console.log(this.szMachineShow)
       if(this.szMachineShow==true){
            this.isCheckedMachine = false;
        this.checkedMachineNum = "";
        this.checkMachine = []
        this.szMachineShow = false;
        this.szShiftShow = false;
        this.szMainShow = true;
        return
       }
           if(this.szShiftShow==true){
        this.szMachineShow = false;
          this.szShiftShow = false;
          this.szMainShow = true;
          this.isStartChange = false
        return
       }
       
      },
      saoma() {
        this.issaoma = true
      },
      wanchen() {
        this.issaoma = false
      },
      toChooseMachine() {
        this.szMainShow = false;
        this.szShiftShow = false;
        this.szMachineShow = true;

      },
      toShift() {
        this.szMainShow = false;
        this.szMachineShow = false;
        this.szShiftShow = true;


      },
      sureMachine() {
        this.isCheckedMachine = true
        this.checkMachine = []
        this.szMachineShow = false;
        this.szShiftShow = false;
        this.szMainShow = true;
      },
      cancel() { //取消按钮事件
        this.isCheckedMachine = false;
        this.checkedMachineNum = "";
        this.checkMachine = []
        this.szMachineShow = false;
        this.szShiftShow = false;
        this.szMainShow = true;
      },
      save() { //确认按钮事件
        if (this.isStartChange == true) {
          this.szMachineShow = false;
          this.szShiftShow = false;
          this.szMainShow = true;
          this.isStartChange = false
            this.$emit('cpChange',this.staffList)
            console.log(this.staffList)
        }

      },
      startChange() { //开始修改按钮单击事件
        this.isStartChange = true;

      },
      checkedMachine(e) { //选择机台事件

        this.checkedMachineNum = e[0]
      },
      checkedName(e) { //选择员工
        for (let i = 0; i < this.staffList.length; i++) {
          if (this.staffList[i].isSelected == true) {
            this.staffList[i].staffName = e[0]

          }
        }
        this.checkStaffName = []

      },
      chooseStaff(label) { //换班选中其中输入框的事件
        if (this.isStartChange == true) {
          for (let i = 0; i < this.staffList.length; i++) {
            this.staffList[i].isSelected = false
          }
          for (let i = 0; i < this.staffList.length; i++) {

            if (this.staffList[i].label == label) {
              this.staffList[i].isSelected = true
            }
          }
        }

      }
    },
    mounted() {

    }
  };

</script>

<style>
  .operationPane {
    width: 100%;
    height: 66%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background: #E2E7ED;
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
    background: #D4D4D4;
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
    bottom: 0;

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
    background: #A3D897;
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

  .operationPane_con_machineList_btn_right /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #FFC100;
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
    background: #317CCD;
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
    background: #A3D897;
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
    color: #FFFFFF;
    background: #808080;
    font-size: 1.5rem;
  }

  .pane_con {
    width: 99.8%;
    height: 55%;
    border-left: 1px solid #A0A0A0;
    border-bottom: 1px solid #A0A0A0;
    border-right: 1px solid #A0A0A0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pane_con textarea {
    width: 95%;
    height: 80%;
    color: #6C6C6C;
    border: none;
    font-size: 2rem;
  }

  textarea[class='textarea']::-moz-placeholder {
    color: #6C6C6C;
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
