<template>
  <div class="operationPane">
    <div class="operationPane_con" style="display:flex;justify-content: space-around;align-items: center;"
      v-show="isIndexShow">

      <div class="main_btn" @click="toLoweraxis">下轴</div>
      <div class="main_btn" @click="toOutaxis">退轴</div>
      <img src="../../static/img/close.png" @click="closeCurrentPage()" />
    </div>
    <!-- 下轴主界面-->
    <div class="operationPane_con" style="display:flex;justify-content: center;align-items: flex-end;"
      v-show="xzMainShow">

      <div class="operationPane_con_uppershaft">

        <div class="chooseBtn">
          <div class="chooseBtn_con">
            <div class="chooseBtn_con_label"><span v-show="!isCheckedMachine">机台</span><span
                v-show="isCheckedMachine">{{checkedMachineNum}}</span></div>
            <div class="chooseBtn_con_btn" @click="toChooseMachine()"><span>请选择</span></div>
          </div>
          <div class="chooseBtn_con">
            <div class="chooseBtn_con_label"><span>班组信息</span></div>
            <div class="chooseBtn_con_btn" @click="toClass()"><span>{{chooseClassName}}</span></div>
          </div>
        </div>
        <div class="pane">
          <div class="text" style="width:100%;">
            <div class="text_con"><span>品名：扫码号显示....</span><span>品名：扫码号显示....</span><span>品名：扫码号显示....</span></div>

          </div>
          <div class="pane_title"><span>规格</span></div>
          <div class="pane_con"><textarea style="background:white" class="textarea" disabled
              placeholder="扫描后显示..."></textarea></div>
          <div class="pane_btn">
            <div class="pane_btn_one" @click="xiazhou()" style="background:#A3D897">
              <span>下轴</span></div>
            <div class="pane_btn_one" @click="toMain()" style="background:#808080">
              <span>取消</span></div>
          </div>
        </div>
      </div>
      <img src="../../static/img/close.png" @click="toMain()" />
    </div>
    <!-- 下轴主界面-->
    <!-- 下轴部分选机台-->
    <div class="operationPane_con" style="display:flex;justify-content: center;align-items: flex-start;"
      v-show="xzMachineShow">
      <div class="operationPane_con_machineList">
        <el-checkbox-group :max="1" @change="checkedMachine" v-model="checkMachine" style="width:100%;height:100%;">
          <el-checkbox-button size="medium" v-for="(item,index) in machineList" style="magin:1rem;font-size:2rem"
            :label="item.machine_id" :key="index">{{item.machine_id}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div class="operationPane_con_machineList_btn">
        <div class="operationPane_con_machineList_btn_left">
          <div class="operationPane_con_machineList_btn_leftBtn" @click="sureMachine()">确认</div>
          <div class="operationPane_con_machineList_btn_leftBtn" @click="cancel()">取消</div>
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
      <img src="../../static/img/close.png" @click="cancel()" />
    </div>
    <!-- 下轴部分选机台-->
    <!-- 下轴部分选班次-->
    <div class="operationPane_con" style="display:flex;justify-content: center;align-items: flex-start;"
      v-show="xzShiftShow">
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
    <!-- 下轴部分选班次-->
    <!-- 退轴主界面-->
    <div class="operationPane_con" style="display:flex;justify-content: space-around;align-items: center;"
      v-show="tzMainShow">
      <div class="tz_main">
        <div class="tz_main_left">
          <div class="tz_main_left_left">
            <div class="tz_main_left_left_top">
              <div class="chooseBtn_con" style="height:90%;margin-top:0.3rem">
                <div class="chooseBtn_con_label" style="width:85%"><span v-show="!isCheckedMachine"
                    style="font-size:1.2rem;">机台</span><span v-show="isCheckedMachine">{{checkedMachineNum}}</span>
                </div>
                <div class="chooseBtn_con_btn" @click="toChooseMachine()" style="font-size:1.3rem;width:85%">
                  <span>请选择</span></div>
              </div>
              <div class="chooseBtn_con" style="height:90%;margin-top:0.3rem">
                <div class="chooseBtn_con_label" style="width:85%"><span v-show="!isCheckedMachine"
                    style="font-size:1.2rem;">班组信息</span><span v-show="isCheckedMachine">{{checkedMachineNum}}</span>
                </div>
                <div class="chooseBtn_con_btn" @click="toChooseMachine()" style="font-size:1.3rem;width:85%">
                  <span>请选择</span></div>
              </div>
            </div>
            <div class="tz_main_left_left_bottom">
              <div class="tz_main_left_left_bottom_span" style="height:15%">
                <span style="width:3rem">品种:</span><span>我是品种我是品种</span>
              </div>
              <div class="tz_main_left_left_bottom_span" style="height:35%">
                <span style="width:7rem">品种:</span><span>我是品种我是品种我是品种我是品种我是品种我是品种我是品种</span>
              </div>
              <div class="tz_main_left_left_bottom_span" style="height:50%">
                <span style="width:9rem"> 规格:</span><span>我是规格我是规格我是规格我是规格我是规格我是规格我是规格我是规格我是规格我是规格我是规格我是规格</span>
              </div>
            </div>
          </div>
          <div class="tz_main_left_right">
            <div class="pz_right_top_input">
              <span>当前布长：</span>
              <div :class="zbFocus?'pz_right_top_input_active':'pz_right_top_input_unactive' " @click="iszb">
                <span>{{zbLength}}</span></div>
            </div>
            <div class="pz_right_top_input">
              <span>当前剩余经轴长度：</span>
              <div :class="jzFocus?'pz_right_top_input_active':'pz_right_top_input_unactive' " @click="isjz">
                <span>{{jzLength}}</span></div>
            </div>
            <div class="chooseBtn_con_btn" @click="toChooseMachine()" style="width:98%;height:4rem"><span>退轴</span>
            </div>
            <div class="chooseBtn_con_btn" @click="toMain()" style="width:98%;background:rgb(128,128,128);height:4rem">
              <span>取消</span></div>
          </div>
        </div>
        <div class="tz_main_right">
          <div class="tz_main_right_con">
            <keyboard ref="board3" @sure="getNumber2" @change="NumberChange2"></keyboard>
          </div>
        </div>
      </div>

      <img src="../../static/img/close.png" @click="toMain()" />
    </div>
    <!-- 退轴主界面-->
     <!-- 退轴部分选机台-->
    <div class="operationPane_con" style="display:flex;justify-content: center;align-items: flex-start;"
      v-show="tzMachineShow">
      <div class="operationPane_con_machineList">
        <el-checkbox-group :max="1" @change="checkedMachine2" v-model="checkMachine2" style="width:100%;height:100%;">
          <el-checkbox-button size="medium" v-for="(item,index) in machineList2" style="magin:1rem;font-size:2rem"
            :label="item.machine_id" :key="index">{{item.machine_id}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div class="operationPane_con_machineList_btn">
        <div class="operationPane_con_machineList_btn_left">
          <div class="operationPane_con_machineList_btn_leftBtn" @click="sureMachine2()">确认</div>
          <div class="operationPane_con_machineList_btn_leftBtn" @click="cancel2()">取消</div>
        </div>
        <div class="operationPane_con_machineList_btn_right">
          <el-pagination background small :pager-count="4" @current-change="CurrentChange2" layout="prev, pager, next"
            :total="total_num2">
          </el-pagination>
        </div>
      </div>
      <div class="leftLabel"><span>选机台</span></div>
      <div class="search"><span style="font-size:2rem">搜索：</span><input placeholder="输入机台号" /><span
          style="color:red;margin-left:1rem">选中机台：{{this.checkedMachineNum2}}</span></div>
      <img src="../../static/img/close.png" @click="cancel2()" />
    </div>
    <!-- 退轴部分选机台-->
    <!-- 退轴部分选班次-->
    <div class="operationPane_con" style="display:flex;justify-content: center;align-items: flex-start;"
      v-show="tzShiftShow">
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
    <!-- 退轴部分选班次-->
  </div>
</template>

<script>
  import axios from 'axios'
  import keyboard from '@/components/keyboard2'
  var host = "http://120.55.124.53:12140"
  export default {
    components: {
      keyboard
    },
    name: 'Loweraxis',
    data() {
      return {
        tzMainShow: false,
        xzMainShow: false,
        isIndexShow: true,
        xzMachineShow: false,
        xzShiftShow: false,
         tzMachineShow: false,
        tzShiftShow: false,
        isChooseAclass: true,
        chooseClassName: "A组",
        isCheckedMachine: false, //是否选中机台
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
        checkedMachineNum: "",
        checkMachine: [], //下轴选中机台列表
        machineList: [],
        page_size: 21,
        page_num: 1,
         total_num: null,
         

             isChooseAclass2: true,
        chooseClassName2: "A组",
        isCheckedMachine2: false, //是否选中机台
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
        checkedMachineNum2: "",
        checkMachine2: [], //下轴选中机台列表
        machineList2: [],
        page_size2: 21,
        page_num2: 1,
         total_num2: null,

        mac_type_id: "030100",
        company_id: "10000025",
       
        zbFocus: false, //div选中聚焦
        jzFocus: false,
        zbLength: "", //div内容
        jzLength: "",

      }
    },
    methods: {
      getNumber2(number) { //织布经纱div确认按键事件
        console.log(number)
        if (this.zbFocus == true) {
          this.zbLength = number
        } else if (this.jzFocus == true) {
          this.jzLength = number
        }
        this.zbFocus = false
        this.jzFocus = false
      },
      NumberChange2(number) { //织布经纱div数字键盘事件事件
        console.log(number)
        if (this.zbFocus == true) {
          //     if(this.zbLength.length>0){
          //    let k=[]
          //         for(let i=0;i<jzLength.length;i++){
          //          k.push( jzLength.substr(i,1))
          //         }
          //     }else{
          // this.zbLength=number
          //     }
          this.zbLength = number

        } else if (this.jzFocus == true) {
          this.jzLength = number
        } else {
          // this.$refs.board1.number=[]

        }
      },
      isjz() { //点击经纱div键盘输入



        this.jzFocus = !this.jzFocus

        this.zbFocus = false
        if (this.jzFocus == true) {
          this.$refs.board3.number = []
          if (this.jzLength.length > 0) {
            let k = []
            for (let i = 0; i < this.jzLength.length; i++) {
              k.push(this.jzLength.substr(i, 1))
            }
            this.$refs.board3.number = k
            console.log(this.$refs.board3.number)
          }
        }

      },
      iszb() {
        this.zbFocus = !this.zbFocus
        this.jzFocus = false
        if (this.zbFocus == true) {
          this.$refs.board3.number = []
          console.log(this.zbLength.length)
          if (this.zbLength.length > 0) {
            let k = []
            for (let i = 0; i < this.zbLength.length; i++) {
              k.push(this.zbLength.substr(i, 1))
            }
            this.$refs.board3.number = k
            console.log(this.$refs.board3.number)
          }
        }
      },
      sureClass() {
        this.xzShiftShow = false


        this.tzMainShow = false
        this.isIndexShow = false
        this.xzMachineShow = false
        this.xzMainShow = true
        if (this.isChooseAclass == true) {
          this.chooseClassName = 'A组'
        } else {
          this.chooseClassName = 'B组'
        }
        //  this.$emit('szChange', this.staffList)
      },
      cancelClass() {
        this.xzShiftShow = false

        this.tzMainShow = false

        this.isIndexShow = false
        this.xzMachineShow = false
        this.xzMainShow = true
      },
      toClass() {
        this.tzMainShow = false
        this.isIndexShow = false
        this.xzMachineShow = false
        this.xzMainShow = false
        this.xzShiftShow = true
      },
      sureMachine() {
        this.xzShiftShow = false

        this.tzMainShow = false

        this.isIndexShow = false
        this.xzMachineShow = false
        this.xzMainShow = true
        this.checkMachine = []
        this.isCheckedMachine = true

      },
      cancel() { //取消按钮事件
        this.xzShiftShow = false


        this.tzMainShow = false
        this.isIndexShow = false
        this.xzMachineShow = false
        this.xzMainShow = true
        this.checkedMachineNum = "";
        this.checkMachine = []

      },
      toOutaxis() {
        this.xzShiftShow = false



        this.isIndexShow = false
        this.xzMachineShow = false
        this.xzMainShow = false
        this.tzMainShow = true
      },
      toChooseMachine() {
        this.xzShiftShow = false
        this.tzMainShow = false

        this.xzMainShow = false
        this.isIndexShow = false
        this.xzMachineShow = true
        this.getMachineList()
      },
      xiazhou() {

      },
      toMain() {
        this.tzMainShow = false
        this.xzShiftShow = false
        this.xzMachineShow = false

        this.xzMainShow = false
        this.isIndexShow = true
      },
      toLoweraxis() {
        this.tzMainShow = false
        this.isIndexShow = false
        this.xzShiftShow = false
        this.xzMachineShow = false

        this.xzMainShow = true

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
      checkedMachine(e) { //选择机台事件

        this.checkedMachineNum = e[0]
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
    },
    mounted() {



    },
    watch: {

    }
  }

</script>

<style scoped>
  .tz_main {
    width: 95%;
    height: 90%;

    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .tz_main_left {
    width: 51%;
    height: 85%;

    display: flex;
    justify-content: space-between;

  }

  .tz_main_left_left {
    width: 48.5%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

  }

  .tz_main_left_right {
    width: 48.5%;
    height: 100%;
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .tz_main_left_left_top {
    width: 100%;
    height: 35%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .tz_main_left_left_bottom {
    width: 100%;
    height: 60%;
    display: flex;
    align-items: center;
    flex-direction: column;

  }

  .tz_main_left_left_bottom_span {
    width: 100%;
    display: flex;
    justify-content: flex-start;

    text-align: left;

  }

  .tz_main_left_left_bottom_span span {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tz_main_right {
    width: 47%;
    height: 85%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tz_main_right_con {
    width: 100%;
    height: 100%;
  }

  .pane_title {
    background: rgb(49, 124, 250);
  }

  .text {

    justify-content: center;
  }

  .text_con span {
    font-size: 1rem;
    margin: 1rem;
  }

  .pz_right_top_input {
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    font-size: 1.3rem;
    margin: 0.3rem;
  }

  .pz_right_top_input_unactive {
    width: 100%;
    height: 50%;
    display: flex;
    align-content: center;
    justify-content: flex-start;
    border: 1px solid black;

  }

  .pz_right_top_input_active {
    width: 100%;
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

</style>
