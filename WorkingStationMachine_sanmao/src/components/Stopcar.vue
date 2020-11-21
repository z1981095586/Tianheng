<template>
  <div class="operationPane">

    <!-- 挡车部分操作栏组件-->
    <!-- 挡车部分主菜单-->
    <div class="operationPane_con" style="display:flex;justify-content: space-around;align-items: center;"
      v-show="isMainShow">

      <div class="main_btn" @click="toShift">换班</div>
      <div class="main_btn" @click="toCar">挡车</div>
      <img src="../../static/img/close.png" @click="closeCurrentPage()" />
    </div>

    <div class="operationPane_con" style="display:flex;justify-content: center;align-items: flex-start;"
      v-show="isMachine">
      <div class="operationPane_con_machineList">
        <el-checkbox-group v-model="checkMachine" style="width:100%;height:100%;" :max="8">
          <el-checkbox-button size="medium" v-for="(item,index) in machineList" style="magin:1rem;font-size:2rem"
            :label="item.machine_id" :key="index">{{item.machine_id}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div class="operationPane_con_machineList_btn">
        <div class="operationPane_con_machineList_btn_left">
          <div class="operationPane_con_machineList_btn_leftBtn" @click="sureMachine()">保存</div>
          <div class="operationPane_con_machineList_btn_leftBtn" style=" " @click="goback()">返回</div>
        </div>
        <div class="operationPane_con_machineList_btn_right">
          <el-pagination background small :pager-count="3" @current-change="CurrentChange" layout="prev, pager, next"
            :total="total_num">
          </el-pagination>
        </div>
      </div>

      <div class="search" style="left:4rem;width:95%;top:18px"><span style="font-size:1.5rem">搜索：</span><input
          style="font-size:1.5rem" placeholder="输入机台号" /><span
          style="color:red;margin-left:1rem;">选中机台：{{String(this.checkMachine).replace(/ /g, "")}}</span></div>
      <img src="../../static/img/close.png" @click="goback()" />
    </div>

    <div class="operationPane_con"
      style="display:flex;justify-content: space-around;align-items: center;flex-direction:column;" v-show="isCar">
      <div class="checked_machine">
        <div class="checked_machine_one" v-for="(item,index) in checkMachineColor" @click="checkShutdown(item.label)"
          :style="item.isChecked? 'background:rgb(50, 150, 250);color:white;':'background:#808080;color:white;'"
          :key="index"><span>{{item.label}}</span><span style="font-size:1rem"
            v-show="!item.isShutDown">（状态:开机）</span><span v-show="item.isShutDown" style="font-size:1rem">（状态:关机）</span>
        </div>

      </div>
      <div class="checked_machine_btn">
        <div class="checked_machine_btn_one" @click="openMachine()">开机</div>
        <div class="checked_machine_btn_one" @click="shutdownMachine()">关机</div>
        <div class="checked_machine_btn_one" @click="toLuobu" v-show="enabled">落布</div>
        <div class="checked_machine_btn_one" @click="toPz" v-show="enabled">改品种</div>
        <div class="checked_machine_btn_one" style=" background:#808080" v-show="!enabled">落布</div>
        <div class="checked_machine_btn_one" style=" background:#808080" v-show="!enabled">改品种</div>
        <div class="checked_machine_btn_one" style=" margin-left: 12rem;background:#808080" @click="goback2()">返回</div>
      </div>
      <img src="../../static/img/close.png" @click="goback2()" />
    </div>

    <div class="operationPane_con" style="display:flex;justify-content: center;align-items: flex-start;"
      v-show="shiftShow">
      <div class="operationPane_con_machineList">
        <el-checkbox-group :max="1" @change="checkName" v-model="checkMachine" style="width:100%;height:100%;">
          <el-checkbox-button size="medium" v-for="(item,index) in NameList" style="magin:1rem;font-size:2rem"
            :label="item" :key="index">{{item}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div class="operationPane_con_machineList_btn">
        <div class="operationPane_con_machineList_btn_left">
          <div class="operationPane_con_machineList_btn_leftBtn" @click="sureShift()">保存</div>
          <div class="operationPane_con_machineList_btn_leftBtn" style="background:#808080;color:white"
            @click="ShiftBack()">返回</div>
        </div>
        <div class="operationPane_con_machineList_btn_right">
          <el-pagination background small :pager-count="3" layout="prev, pager, next" :total="40">
          </el-pagination>
        </div>
      </div>
      <div class="select_shift">
        <div><span>班次：</span><select>
            <option value="请选择">请选择</option>
          </select></div>
        <div><span>挡车工：</span><input disabled :value="checkedName" /></div>
        <div></div>
      </div>

      <img src="../../static/img/close.png" @click="ShiftBack()" />
    </div>

    <div class="operationPane_con" style="display:flex;justify-content: space-around;align-items: center"
      v-show="PzShow">
      <div class="pz_left">
        <div class="pz_left_top">
          <div class="pz_left_top_title"><span>原品种信息</span><span style="font-size:1.3rem;color:red">选中机台：713</span>
          </div>
          <div class="pz_left_top_title"><span>品号：843-349-3495</span></div>
          <div class="pz_left_top_title"><span>品名：我是品名，我是品名，我是品名品名</span></div>
          <div class="pz_left_top_title" style="height:3rem;"><span>规格：我是规格我是规格，我是规格，我是规格我是</span></div>
          <div class="pz_left_top_title2" style="margin-top:1rem"><span>原品种信息</span></div>
          <div class="pz_left_top_title2"><span>品号：</span><span style="color:#8C8C8C;">扫码后获取…</span></div>
          <div class="pz_left_top_title2"><span>品名：</span><span style="color:#8C8C8C;">扫码后获取…</span></div>
          <div class="pz_left_top_title2" style="height:3rem;"><span>规格：</span><span
              style="color:#8C8C8C;">扫码后获取…</span></div>
        </div>
        <div class="pz_left_bottom">
          <div class="pz_left_bottom_btn_active">扫码</div>
          <div class="pz_left_bottom_btn_unactive" @click="cancelPz()">取消</div>
        </div>
      </div>
      <div class="pz_right">
        <div class="pz_right_top">
          <div class="pz_right_top_input">
            <span>当前织布长度：</span>
            <div :class="zbFocus?'pz_right_top_input_active':'pz_right_top_input_unactive' " @click="iszb">
              <span>{{zbLength}}</span></div>
          </div>
          <div class="pz_right_top_input">
            <span>当前剩余经轴长度：</span>
            <div :class="jzFocus?'pz_right_top_input_active':'pz_right_top_input_unactive' " @click="isjz">
              <span>{{jzLength}}</span></div>
          </div>
        </div>
        <div class="pz_right_bottom">
          <div class="pz_right_bottom_con">
            <keyboard ref="board1" @sure="getNumber" @change="NumberChange"></keyboard>
          </div>
        </div>
      </div>
      <img src="../../static/img/close.png" @click="cancelPz()" />
    </div>

    <div class="operationPane_con" style="display:flex;justify-content: space-around;align-items: center"
      v-show="LbShow">
      <div class="pz_right">
        <div class="pz_right_top">
          <div class="pz_right_top_input">
            <span>落布米长：</span>
            <div :class="lbFocus?'pz_right_top_input_active':'pz_right_top_input_unactive' " @click="islb">
              <span>{{lbLength}}</span></div>
          </div>

        </div>
        <div class="pz_right_bottom">
          <div class="pz_right_bottom_con">
            <keyboard ref="board2" @sure="getNumber2" @change="NumberChange2"></keyboard>
          </div>
        </div>
      </div>
      <div class="pz_left">
        <div class="pz_left_top">

          <div class="pz_left_top_title" style="    margin-top: 6rem;"><span>品号：843-349-3495</span></div>
          <div class="pz_left_top_title"><span>品名：我是品名，我是品名，我是品名品名</span></div>
          <div class="pz_left_top_title" style="height:3rem;"><span>规格：我是规格我是规格，我是规格，我是规格我是</span></div>

        </div>
        <div class="pz_left_bottom">

          <div class="pz_left_bottom_btn_unactive" @click="cancelLb()">取消</div>
        </div>
      </div>

      <img src="../../static/img/close.png" @click="cancelLb()" />
    </div>

  </div>
</template>

<script>
  let host = "http://120.55.124.53:12140"
  import axios from 'axios'
  import keyboard from '@/components/keyboard'
  export default {
    components: {
      keyboard
    },
    name: 'Stopcar',
    data() {
      return {
        company_id: "10000025",
        isMainShow: true, //页面显示隐藏
        isMachine: false,
        shiftShow: false,
        PzShow: false,
        isCar: false,
        LbShow: false,


        checkedName: "",
        checkMachine: [], //挡车选中机台列表
        checkMachineColor: [], //挡车选中机台列表颜色
        NameList: ['跑品德', '而且跑', '张三百'],
        machineList: ['101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114',
          '115', '116', '117', '118',
        ], //挡车机台列表
        zbFocus: false, //div选中聚焦
        jzFocus: false,
        zbLength: "", //div内容
        jzLength: "",
        lbFocus: false,
        lbLength: "",
        enabled: false,
        page_size: 21,
        page_num: 1,
        mac_type_id: "030100",
      }
    },
    methods: {
      //        closeCurrentPage(){
      //   console.log(this.szMachineShow)
      //  if(this.szMachineShow==true){
      //       this.isCheckedMachine = false;
      //   this.checkedMachineNum = "";
      //   this.checkMachine = []
      //   this.szMachineShow = false;
      //   this.szShiftShow = false;
      //   this.szMainShow = true;
      //   return
      //  }
      //      if(this.szShiftShow==true){
      //   this.szMachineShow = false;
      //     this.szShiftShow = false;
      //     this.szMainShow = true;
      //     this.isStartChange = false
      //   return
      //  }

      // },
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

            that.total_num = response.data.result.total_num
            let array = response.data.result.models
            that.machineList = []
            array.forEach(element => {
              that.machineList.push(element)
            });
          })
      },
      islb() { //点击落布div键盘输入
        this.lbFocus = !this.lbFocus
        if (this.lbFocus == true) {
          this.$refs.board2.number = []
          console.log(this.lbLength.length)
          if (this.lbLength.length > 0) {
            let k = []
            for (let i = 0; i < this.lbLength.length; i++) {
              k.push(this.lbLength.substr(i, 1))
            }
            this.$refs.board2.number = k

          }
        }
      },
      getNumber2(number) { //点击落布div键盘输入值确定按钮事件

        if (this.lbFocus == true) {
          this.lbLength = number
        }
        this.lbFocus = false
        console.log(number)
        console.log(this.checkMachineColor)
        this.checkMachineColor.forEach(element => {
          if (element.isChecked == true) {

            let url = host + "/api/stationMachine/luoBu"
            let that = this
            axios({
                url: url,
                method: "post",
                data: {
                  selectInfo: {
                    company_id: that.company_id,
                  },
                  pce_cloth_each: {
                    machine_id: element.label,
                    yield_meter: String(number)
                  }
                },


                // headers: headers
              })
              .then(res => {
                console.log(res)
              })
          }
        });

      },
      NumberChange2(number) { //点击落布div键盘输入值数字键盘数值改变事件

        if (this.lbFocus == true) {

          this.lbLength = number

        } else if (this.lbFocus == true) {
          this.lbLength = number
        }
      },
      iszb() { //点击织布div键盘输入
        this.zbFocus = !this.zbFocus
        this.jzFocus = false
        if (this.zbFocus == true) {
          this.$refs.board1.number = []
          console.log(this.zbLength.length)
          if (this.zbLength.length > 0) {
            let k = []
            for (let i = 0; i < this.zbLength.length; i++) {
              k.push(this.zbLength.substr(i, 1))
            }
            this.$refs.board1.number = k
            console.log(this.$refs.board1.number)
          }
        }
      },
      isjz() { //点击经纱div键盘输入



        this.jzFocus = !this.jzFocus

        this.zbFocus = false
        if (this.jzFocus == true) {
          this.$refs.board1.number = []
          if (this.jzLength.length > 0) {
            let k = []
            for (let i = 0; i < this.jzLength.length; i++) {
              k.push(this.jzLength.substr(i, 1))
            }
            this.$refs.board1.number = k
            console.log(this.$refs.board1.number)
          }
        }

      },
      getNumber(number) { //织布经纱div确认按键事件
        console.log(number)
        if (this.zbFocus == true) {
          this.zbLength = number
        } else if (this.jzFocus == true) {
          this.jzLength = number
        }
        this.zbFocus = false
        this.jzFocus = false
      },
      NumberChange(number) { //织布经纱div数字键盘事件事件
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
      ShiftBack() { //换班返回按钮
        this.isCar = false
        this.isMachine = false
        this.shiftShow = false
        this.PzShow = false
        this.isMainShow = true
        this.checkMachine = []
      },
      sureShift() { //换班确认按钮
        this.isCar = false
        this.isMachine = false
        this.shiftShow = false
        this.PzShow = false
        this.isMainShow = true
        this.checkMachine = []
        this.$emit("dcChange", this.checkedName)
        console.log(this.checkedName)
      },
      checkShutdown(label) { //选中机台准备开机或者关机

        for (let i = 0; i < this.checkMachineColor.length; i++) {
          if (this.checkMachineColor[i].label == label) {
            this.checkMachineColor[i].isChecked = !this.checkMachineColor[i].isChecked
          }
        }
        //防止数据更新视图不更新
        this.checkMachineColor.push({})
        this.checkMachineColor.pop()
        //防止数据更新视图不更新
      },
      openMachine() { //开机
        for (let i = 0; i < this.checkMachineColor.length; i++) {
          if (this.checkMachineColor[i].isChecked == true) {
            this.checkMachineColor[i].isShutDown = false
          }
        }
        //防止数据更新视图不更新
        this.checkMachineColor.push({})
        this.checkMachineColor.pop()
        //防止数据更新视图不更新
      },
      // 对象排序
      sortByKey(array, key) {
        return array.sort(function (a, b) {
          let x = a[key];
          let y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      },
      shutdownMachine() { //关机
        for (let i = 0; i < this.checkMachineColor.length; i++) {
          if (this.checkMachineColor[i].isChecked == true) {
            this.checkMachineColor[i].isShutDown = true
          }
        }
        //防止数据更新视图不更新
        this.checkMachineColor.push({})
        this.checkMachineColor.pop()
        //防止数据更新视图不更新
      },
      cancelPz() { //品种取消返回



        this.shiftShow = false
        this.LbShow = false
        this.PzShow = false
        this.isMainShow = false
        this.isMachine = false
        this.isCar = true
      },
      toLuobu() { //显示落布界面
        this.shiftShow = false

        this.PzShow = false

        this.isMainShow = false
        this.isMachine = false
        this.isCar = false
        this.LbShow = true
      },
      cancelLb() { //隐藏落布
        this.shiftShow = false

        this.PzShow = false
        this.LbShow = false
        this.isMainShow = false
        this.isMachine = false
        this.isCar = true
      },
      toPz() { //显示品种界面
        this.isMainShow = false
        this.isCar = false
        this.LbShow = false
        this.shiftShow = false
        this.isMachine = false
        this.PzShow = true
      },
      toCar() { //机台选择界面
        this.isMainShow = false
        this.isCar = false
        this.LbShow = false
        this.PzShow = false
        this.shiftShow = false
        this.isMachine = true
      },
      toShift() { //换班界面
        this.isMainShow = false
        this.isCar = false
        this.LbShow = false
        this.PzShow = false
        this.isMachine = false
        this.shiftShow = true
      },
      goback() { //显示主菜单界面
        this.isCar = false
        this.isMachine = false
        this.shiftShow = false
        this.LbShow = false
        this.PzShow = false
        this.isMainShow = true
        this.checkMachine = []
      },
      goback2() {
        this.isCar = false
        this.isMainShow = false
        this.PzShow = false
        this.LbShow = false
        this.shiftShow = false
        this.isMachine = true


      },
      sureMachine() { //确认机台

        console.log(this.checkMachineColor)
        if (this.checkMachineColor.length == 0) {
          this.$message({
            message: '请先选择至少一台！',
            type: 'warning'
          });
        } else {
          this.PzShow = false
          this.isMachine = false
          this.isMainShow = false
          this.LbShow = false
          this.shiftShow = false
          this.isCar = true
        }

      },
      checkName(e) { //选择机台事件

        this.checkedName = e[0]
      },
    },
    mounted() {

    },
    watch: {
      checkMachine(e) {
        this.checkMachineColor = []
        if (this.checkMachine.length > 0) {
          for (let i = 0; i < this.checkMachine.length; i++) {

            let k = {
              label: this.checkMachine[i],
              isChecked: false,
              isShutDown: true
            }
            this.checkMachineColor[i] = k

          }
        }
        this.checkMachineColor = this.sortByKey(this.checkMachineColor, 'label')

        console.log(this.checkMachineColor)
      },
      checkMachineColor(e) {

        console.log(this.checkMachineColor)
        let num = 0
        for (let i = 0; i < this.checkMachineColor.length; i++) {
          if (this.checkMachineColor[i].isChecked == true) {
            num++;
          }
        }
        console.log(num)
        if (num > 1 || num == 0) {
          this.enabled = false
        } else {
          this.enabled = true
        }
      },
      isMachine(e) {
        if (e == true) {
          this.page_num = 1
          this.getMachineList()
        }
      }
    }
  }

</script>

<style scoped>
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
    color: #8C8C8C;


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
    background: #A3D897;

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
    background: #A3D897;
    border-top: 3px solid #ffffff;
    border-left: 3px solid #ffffff;
    border-bottom: 3px solid #717171;
    border-right: 3px solid #717171;
  }

</style>
