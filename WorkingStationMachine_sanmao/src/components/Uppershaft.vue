<template>
  <div class="operationPane">

    <!-- 上轴部分操作栏组件-->
    <!-- 上轴首页-->
    <div class="operationPane_con" style="display:flex;justify-content: space-around;align-items: center;"
      v-show="szIndexShow">



      <div class="main_btn" @click="toClass">换班</div>
      <div class="main_btn" @click="toSz">上轴</div>
      <img src="../../static/img/close.png" @click="closeCurrentPage()" />

    </div>
    <!-- 上轴首页-->
    <!-- 上轴部分选班次-->
    <div class="operationPane_con" style="display:flex;justify-content: center;align-items: flex-start;"
      v-show="szShiftShow">
      <div class="operationPane_con_machineList">
        <div class="currentClass">当前班次：A班</div>
        <div class="classA">
          <div @click="changeClass('a')" :class="isChooseAclass ? 'classA_left_chossed':'classA_left'">
            <span>上轴工组A</span></div>
          <div class="classA_right">
            <span>开出工：{{Aclass.kcg}}</span><span>上轴工01：{{Aclass.szg1}}</span><span>上轴工02：{{Aclass.szg2}}</span><span>上轴工03：{{Aclass.szg3}}</span>
          </div>
        </div>
        <div class="classA">
          <div @click="changeClass('b')" :class="isChooseAclass ? 'classA_left':'classA_left_chossed'">
            <span>上轴工组B</span></div>
          <div class="classA_right">
            <span>开出工：{{Bclass.kcg}}</span><span>上轴工01：{{Bclass.szg1}}</span><span>上轴工02：{{Bclass.szg2}}</span><span>上轴工03：{{Bclass.szg3}}</span>
          </div>
        </div>
      </div>
      <div class="operationPane_con_machineList_btn">
        <div class="operationPane_con_machineList_btn_left">
          <div class="operationPane_con_machineList_btn_leftBtn" @click="sureClass()">确认</div>
          <div class="operationPane_con_machineList_btn_leftBtn" style=" " @click="cancelClass()">取消</div>
        </div>
        <div class="operationPane_con_machineList_btn_right">

        </div>
      </div>
      <div class="leftLabel" style="width:170px;"><span>选择上轴组</span></div>

      <img src="../../static/img/close.png" @click="cancelClass()" />
    </div>
    <!-- 上轴部分选班次-->
    <!-- 上轴部分选班次-->
    <div class="operationPane_con" style="display:flex;justify-content: center;align-items: flex-start;"
      v-show="szShiftShow2">
      <div class="operationPane_con_machineList">
        <div class="currentClass">当前班次：A班</div>
        <div class="classA">
          <div @click="changeClass2('a')" :class="isChooseAclass2 ? 'classA_left_chossed':'classA_left'">
            <span>上轴工组A</span></div>
          <div class="classA_right">
            <span>开出工：{{Aclass2.kcg}}</span><span>上轴工01：{{Aclass2.szg1}}</span><span>上轴工02：{{Aclass2.szg2}}</span><span>上轴工03：{{Aclass2.szg3}}</span>
          </div>
        </div>
        <div class="classA">
          <div @click="changeClass2('b')" :class="isChooseAclass2 ? 'classA_left':'classA_left_chossed'">
            <span>上轴工组B</span></div>
          <div class="classA_right">
            <span>开出工：{{Bclass2.kcg}}</span><span>上轴工01：{{Bclass2.szg1}}</span><span>上轴工02：{{Bclass2.szg2}}</span><span>上轴工03：{{Bclass2.szg3}}</span>
          </div>
        </div>
      </div>
      <div class="operationPane_con_machineList_btn">
        <div class="operationPane_con_machineList_btn_left">
          <div class="operationPane_con_machineList_btn_leftBtn" @click="sureClass2()">确认</div>
          <div class="operationPane_con_machineList_btn_leftBtn" style=" " @click="cancelClass2()">取消</div>
        </div>
        <div class="operationPane_con_machineList_btn_right">

        </div>
      </div>
      <div class="leftLabel" style="width:170px;"><span>选择上轴组</span></div>

      <img src="../../static/img/close.png" @click="cancelClass2()" />
    </div>
    <!-- 上轴部分选班次-->
    <!-- 上轴部分主菜单-->
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
            <div class="chooseBtn_con_label"><span>上轴组</span></div>
            <div class="chooseBtn_con_btn" style="background:white;border:1px solid black;"><span v-text="isChooseAclass2?'A组':'B组'"></span></div>
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
              <span>扫码上轴</span></div>
            <div class="pane_btn_one" @click="wanchen()" :style="issaoma?'background:#A3D897':'background:#808080'">
              <span>上轴完成</span></div>
          </div>
        </div>
      </div>
      <img src="../../static/img/close.png" @click="closeCurrentPage()" />
    </div>
    <!-- 上轴部分主菜单-->
    <!-- 上轴部分选机台-->
    <div class="operationPane_con" style="display:flex;justify-content: center;align-items: flex-start;"
      v-show="szMachineShow">
      <div class="operationPane_con_machineList">
        <el-checkbox-group :max="1" @change="checkedMachine" v-model="checkMachine" style="width:100%;height:100%;">
          <el-checkbox-button size="medium" v-for="(item,index) in machineList" style="magin:1rem;font-size:2rem"
            :label="item.machine_id" :key="index">{{item.machine_id}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div class="operationPane_con_machineList_btn">
        <div class="operationPane_con_machineList_btn_left">
          <div class="operationPane_con_machineList_btn_leftBtn" @click="sureMachine()">确认</div>
          <div class="operationPane_con_machineList_btn_leftBtn"  @click="cancel()">取消</div>
        </div>
        <div class="operationPane_con_machineList_btn_right">
          <el-pagination background small :pager-count="4" @current-change="CurrentChange" layout="prev, pager, next"
            :total="total_num">
          </el-pagination>
        </div>
      </div>
      <div class="leftLabel"><span>选机台</span></div>
      <div class="search"><span style="font-size:2rem">搜索：</span><input placeholder="输入机台号" /><span
          style="color:red;margin-left:1rem">选中机台：{{this.checkedMachineNum}}</span></div>
      <img src="../../static/img/close.png" @click="closeCurrentPage()" />
    </div>
    <!-- 上轴部分选机台-->
    <!-- 上轴换班-->
    <!-- <div class="operationPane_con" style="display:flex;justify-content: center;align-items: flex-start;"
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
       
        <el-checkbox-group :max="1"  :disabled="!isStartChange" v-model="checkName" @change="checkedName"
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

      <img src="../../static/img/close.png" @click="closeCurrentPage()" />
    </div> -->
    <!-- 上轴换班-->
    <!-- 上轴部分操作栏组件-->
  </div>
</template>

<script>
  import axios from 'axios'
  var host = "http://120.55.124.53:12140"
  export default {
    name: 'Uppershaft',
    data() {
      return {
        szIndexShow: true,
        szMainShow: false, //上轴主页面显示隐藏
        szMachineShow: false, //上轴选择机台显示隐藏
        szShiftShow: false, //上轴换班显示隐藏 
        szShiftShow2: false, //上轴换班显示隐藏
        checkMachine: [], //上轴选中机台列表
        checkName: [], //上轴选中的员工名字
        checkedMachineNum: "", //选中的机台号
        isCheckedMachine: false, //是否选中机台
        isStartChange: false, //换班是否开始修改
        issaoma: false,
        staffList: [{
            label: "开出工",
            staffName: "",
            isSelected: false
          },
          {
            label: "上轴工01",
            staffName: "",
            isSelected: false
          },
          {
            label: "上轴工02",
            staffName: "",
            isSelected: false
          },
          {
            label: "上轴工03",
            staffName: "",
            isSelected: false
          },
        ],
        StaffNameList: ['周品道', '周品娥', '周我道', '我品道', '娥品道', '周而且', '娥去道', '偶尔娥', '汽配娥', '我我完', '请求道', ],
        machineList: ['101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114',
          '115', '116', '117', '118',
        ], //上轴机台列表
        page_size: 21,
        page_num: 1,
        mac_type_id: "030100",
        company_id: "10000025",
        total_num: null,
        isChooseAclass: true,
        Aclass: {
          kcg: "张三百",
          szg1: '搜房放',
          szg2: '上轴工',
          szg3: '破恶趣',
        },
        Bclass: {
          kcg: "张三百",
          szg1: '搜房放',
          szg2: '上我请',
          szg3: '破恶趣',
        },
        isChooseAclass2: true,
        Aclass2: {
          kcg: "张三百",
          szg1: '搜房放',
          szg2: '上轴工',
          szg3: '破恶趣',
        },
        Bclass2: {
          kcg: "张三百",
          szg1: '搜房放',
          szg2: '上我请',
          szg3: '破恶趣',
        },
      };
    },
    methods: {
      toSz() {
        this.szShiftShow = false

        this.szMainShow = false
        this.szIndexShow = false
        this.szMachineShow = false;
        this.szShiftShow2 = true
      },
      sureClass2() {


        this.szShiftShow = false
        this.szShiftShow2 = false
        this.szMainShow = false
        this.szIndexShow = false
        this.szMachineShow = true;
        this.getMachineList()
      },
      cancelClass2() {
        this.szShiftShow2=false
        this.szShiftShow = false
        this.szMainShow = false
        this.szMachineShow = false;
        this.szIndexShow = true
      },
      changeClass2(e) {
        if (e == "a") {
          this.isChooseAclass2 = true
          this.staffList2 = [{
              label: "开出工",
              staffName: this.Aclass.kcg,
              isSelected: false
            },
            {
              label: "上轴工01",
              staffName: this.Aclass.szg1,
              isSelected: false
            },
            {
              label: "上轴工02",
              staffName: this.Aclass.szg2,
              isSelected: false
            },
            {
              label: "上轴工03",
              staffName: this.Aclass.szg3,
              isSelected: false
            },
          ]


        } else {
          this.isChooseAclass2 = false
          this.staffList2 = [{
              label: "开出工",
              staffName: this.Bclass.kcg,
              isSelected: false
            },
            {
              label: "上轴工01",
              staffName: this.Bclass.szg1,
              isSelected: false
            },
            {
              label: "上轴工02",
              staffName: this.Bclass.szg2,
              isSelected: false
            },
            {
              label: "上轴工03",
              staffName: this.Bclass.szg3,
              isSelected: false
            },
          ]

        }
      },
      sureClass() {

        this.$emit('szChange', this.staffList)
        this.szShiftShow = false
        this.szMachineShow = false;
        this.szMainShow = false
        this.szIndexShow = true
      },
      cancelClass() {

        this.szShiftShow = false
        this.szMainShow = false
        this.szMachineShow = false;
        this.szIndexShow = true
      },
      changeClass(e) {
        if (e == "a") {
          this.isChooseAclass = true
          this.staffList = [{
              label: "开出工",
              staffName: this.Aclass.kcg,
              isSelected: false
            },
            {
              label: "上轴工01",
              staffName: this.Aclass.szg1,
              isSelected: false
            },
            {
              label: "上轴工02",
              staffName: this.Aclass.szg2,
              isSelected: false
            },
            {
              label: "上轴工03",
              staffName: this.Aclass.szg3,
              isSelected: false
            },
          ]


        } else {
          this.isChooseAclass = false
          this.staffList = [{
              label: "开出工",
              staffName: this.Bclass.kcg,
              isSelected: false
            },
            {
              label: "上轴工01",
              staffName: this.Bclass.szg1,
              isSelected: false
            },
            {
              label: "上轴工02",
              staffName: this.Bclass.szg2,
              isSelected: false
            },
            {
              label: "上轴工03",
              staffName: this.Bclass.szg3,
              isSelected: false
            },
          ]

        }
      },
      CurrentChange(e) {
        console.log(e)
        this.page_num = e
        this.getMachineList()
      },
      getMachineList() {
        let that = this;
        let url = host + "/api/stationMachine/getMachines";
        let method =

          axios({
            url: url,
            method: "post",
            data: {
              selectInfo: {
                company_id: that.company_id,
                page_size: that.page_size,
                page_num: that.page_num
              },
              mac_type_id: that.mac_type_id
            },
            // headers: headers
          })
          .then(response => {
            console.log(response)
            that.total_num = response.data.result.total_num
            let array = response.data.result.models
            that.machineList = []
            array.forEach(element => {
              that.machineList.push(element)
            });

          })
      },
      closeCurrentPage() {
        console.log(this.szMachineShow)
        if (this.szMachineShow == true) {
          this.isCheckedMachine = false;
          this.checkedMachineNum = "";
          this.checkMachine = []
          this.szMachineShow = false;
          this.szShiftShow = false;
          this.szMainShow = true;
          return
        }
        if (this.szShiftShow == true) {
          this.szMachineShow = false;
          this.szShiftShow = false;
          this.szMainShow = true;
          this.isStartChange = false
          return
        }
               if (this.szMainShow == true) {
          this.szMachineShow = false;
          this.szShiftShow = false;
          this.szMainShow = false;
          this.szShiftShow2=false
         this.szIndexShow=true
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
        this.getMachineList()

      },

      toClass() {
        this.szMainShow = false;
        this.szMachineShow = false;
        this.szIndexShow = false
             this.szShiftShow2 = false;
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

          this.$emit('szChange', this.staffList)
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
        this.checkName = []

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
  .currentClass {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 1.5rem;
    color: red;
  }

  .classA {
    width: 50%;

    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .classA_left {
    width: 47%;
    background: rgb(128, 128, 128);
    color: white;
    font-size: 2rem;
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .classA_left_chossed {
    width: 47%;
    background: rgb(50, 150, 250);
    color: white;
    font-size: 2rem;
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .classA_right {
    width: 47%;

    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }

  .classA_right span {
    width: 100%;
    height: 20%;
    text-align: left;
    font-size: 1.3rem;

  }

  .main_btn {
    width: 40%;
    height: 60%;
    background: #A3D897;
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
    width: 80px;
    height: 80px;
  }

  .search {
    position: absolute;
    left: 18%;
    top: 0px;
    font-size: 1.7rem;
    width: 64%;
    height: 66px;



    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .search input {
    border: 1px solid black;
    height: 3rem;
    font-size: 2rem;
  }

  .leftLabel {
    position: absolute;
    left: 0;
    top: 0px;
    border-top-left-radius: 16px;
    font-size: 1.7rem;
    width: 200px;
    height: 70px;
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
    width: 60%;
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
    font-size: 1.5rem;
  }

  .shift {
    width: 28%;
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
    font-size: 2rem;
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
    width: 93%;

    height: 60%;
    margin-top: 5%;

    display: flex;
    justify-content: space-between;
    position: relative;

  }

  .operationPane_con_machineList /deep/ .el-checkbox-button__inner {
    font-size: 4rem;
    padding: 20px 27px;
    margin: 1rem;

    /* background: #8C8C8C; */
  }




  .operationPane_con_machineList /deep/ .el-pagination--small .btn-next,
  .el-pagination--small .btn-prev,
  .el-pagination--small .el-pager li,
  .el-pagination--small .el-pager li.btn-quicknext,
  .el-pagination--small .el-pager li.btn-quickprev,
  .el-pagination--small .el-pager li:last-child {
    font-size: 2rem;
    line-height: 1rem;
    height: 5rem;
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
    font-size: 3rem;
  }

  .operationPane_con_machineList_btn_right /deep/ .el-pager li {
    padding: 2rem 2rem;
    font-size: 2rem;
    min-width: 35.5px;
    height: 5rem;
    line-height: 1rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
  }

  .operationPane_con_machineList_btn_right /deep/ .el-pagination button {
    display: inline-block;
    font-size: 3rem;
    min-width: 35.5px;
    height: 5rem;
    width: 5rem;
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

  .operationPane_con_machineList_btn_right /deep/ .el-pagination.is-background.el-pagination--small .btn-next,
  .el-pagination.is-background.el-pagination--small .btn-prev,
  .el-pagination.is-background.el-pagination--small .el-pager li {
    font-size: 2rem;
    line-height: 2rem;
    height: 4.5rem;
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
    width: 50%;
    height: 4rem;
    background: #317CCD;
    color: white;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .chooseBtn_con_btn {
    width: 50%;
    height: 5rem;
    background: #A3D897;
    color: black;
    font-size: 2.5rem;
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

    margin-bottom: 10px;
    border-top: 3px solid #ffffff;
    border-left: 3px solid #ffffff;
    border-bottom: 3px solid #717171;
    border-right: 3px solid #717171;
  }

</style>
