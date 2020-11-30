<template>
  <div class="operationPane">
    <div class="operationPane_con" style="display:flex;justify-content: space-around;align-items: center;"
      v-show="isIndexShow">

      <div class="main_btn" style="width:40%;height:60%" @click="toLoweraxis">了机</div>
      <div class="main_btn" style="width:40%;height:60%" @click="toOutaxis">换轴</div>
      <img src="../../static/img/close.png" @click="closeCurrentPage()" />
    </div>
    <!-- 下轴主界面-->
    <div class="operationPane_con" style="display:flex;justify-content: center;align-items: flex-end;"
      v-show="xzMainShow">

      <div class="operationPane_con_uppershaft">
        <div class="pch"><input style="width:15rem;" v-model="pch" /></div>
        <div class="chooseBtn">
          <div class="chooseBtn_con">
            <div class="chooseBtn_con_label"><span v-show="!isCheckedMachine">机台</span><span
                v-show="isCheckedMachine">{{checkedMachineNum}}</span></div>
            <div class="chooseBtn_con_btn" @click="toChooseMachine()"><span>请选择</span></div>
          </div>
          <div class="chooseBtn_con">
            <div class="chooseBtn_con_label"><span>班组信息</span></div>
            <div class="chooseBtn_con_btn" @click="toClass()"><span
                v-text="isChooseAclass2==0?'A组':isChooseAclass2==1 ? 'B组' :isChooseAclass2==2? 'C组':''"></span></div>
          </div>
        </div>
        <div class="pane">
          <div class="text" style="width:100%;">
            <div class="text_con"><span>色号：{{se_hao}}</span><span>品名：{{product_name}}</span><span>品号：{{pin_hao}}</span>
            </div>

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
        <div class="currentClass"
          v-html="isChooseAclass2==0?'当前班次：下轴班A组':isChooseAclass2==1 ? '当前班次：下轴班B组' :isChooseAclass2==2? '当前班次：下轴班C组':''">
        </div>
        <div class="classA">
          <div @click="changeClass2('a')"
            :class="isChooseAclass2==0?'classA_left_chossed':isChooseAclass2==1 ? 'classA_left' :isChooseAclass2==2? 'classA_left':''">
            <span>下轴班A组</span></div>
          <div class="classA_right">
            <span>下轴工01：{{Aclass2.szg1}}</span><span>下轴工02：{{Aclass2.szg2}}</span><span>下轴工03：{{Aclass2.szg3}}</span>
          </div>
        </div>
        <div class="classA">
          <div @click="changeClass2('b')"
            :class="isChooseAclass2==0?'classA_left':isChooseAclass2==1 ? 'classA_left_chossed' :isChooseAclass2==2? 'classA_left':''">
            <span>下轴班B组</span></div>
          <div class="classA_right">
            <span>下轴工01：{{Bclass2.szg1}}</span><span>下轴工02：{{Bclass2.szg2}}</span><span>下轴工03：{{Bclass2.szg3}}</span>
          </div>
        </div>
        <div class="classA">
          <div @click="changeClass2('c')"
            :class="isChooseAclass2==0?'classA_left':isChooseAclass2==1 ? 'classA_left' :isChooseAclass2==2? 'classA_left_chossed':''">
            <span>下轴班C组</span></div>
          <div class="classA_right">
            <span>下轴工01：{{Cclass2.szg1}}</span><span>下轴工02：{{Cclass2.szg2}}</span><span>下轴工03：{{Cclass2.szg3}}</span>
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
      <div class="leftLabel" style="width:170px;"><span>选择下轴组</span></div>

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
                <div class="chooseBtn_con_label" style="width:85%"><span style="font-size:1.2rem;">机台</span>
                </div>
                <div class="chooseBtn_con_btn" @click="toChooseMachine2()" style="font-size:1.3rem;width:85%">
                  <span v-show="!isCheckedMachine2">请选择</span><span
                    v-show="isCheckedMachine2">{{checkedMachineNum2}}</span></div>
              </div>
              <div class="chooseBtn_con" style="height:90%;margin-top:0.3rem">
                <div class="chooseBtn_con_label" style="width:85%"><span style="font-size:1.2rem;">班组</span>
                </div>
                <div class="chooseBtn_con_btn" @click="toClass2()" style="font-size:1.3rem;width:85%">
                  <span v-show="isChooseAclass==null">请选择</span><span v-show="!(isChooseAclass==null)"
                    style="font-size:1.2rem;"
                    v-text="isChooseAclass==0?'A组':isChooseAclass==1 ? 'B组' :isChooseAclass==2? 'C组':''"></span></div>
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
            <div class="chooseBtn_con_btn" @click="toChooseMachine()" style="width:98%;height:4rem"><span>换轴</span>
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
        <div class="currentClass"
          v-html="isChooseAclass==0?'当前班次：下轴班A组':isChooseAclass==1 ? '当前班次：下轴班B组' :isChooseAclass==2? '当前班次：下轴班C组':'未选择当前班次'">
        </div>
        <div class="classA">
          <div @click="changeClass('a')"
            :class="isChooseAclass==0?'classA_left_chossed':isChooseAclass==1 ? 'classA_left' :isChooseAclass==2? 'classA_left':'classA_left'">
            <span>下轴班A组</span></div>
          <div class="classA_right">
            <span>下轴工01：{{Aclass.szg1}}</span><span>下轴工02：{{Aclass.szg2}}</span><span>下轴工03：{{Aclass.szg3}}</span>
          </div>
        </div>
        <div class="classA">
          <div @click="changeClass('b')"
            :class="isChooseAclass==0?'classA_left':isChooseAclass==1 ? 'classA_left_chossed' :isChooseAclass==2? 'classA_left':'classA_left'">
            <span>下轴班B组</span></div>
          <div class="classA_right">
            <span>下轴工01：{{Bclass.szg1}}</span><span>下轴工02：{{Bclass.szg2}}</span><span>下轴工03：{{Bclass.szg3}}</span>
          </div>
        </div>
        <div class="classA">
          <div @click="changeClass('c')"
            :class="isChooseAclass==0?'classA_left':isChooseAclass==1 ? 'classA_left' :isChooseAclass==2? 'classA_left_chossed':'classA_left'">
            <span>下轴班C组</span></div>
          <div class="classA_right">
            <span>下轴工01：{{Cclass.szg1}}</span><span>下轴工02：{{Cclass.szg2}}</span><span>下轴工03：{{Cclass.szg3}}</span>
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
      <div class="leftLabel" style="width:170px;"><span>选择下轴组</span></div>

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
        pch: "",
        product_name: "",
        pin_hao: "",
        se_hao: "",

        tzMainShow: false,
        xzMainShow: false,
        isIndexShow: true,
        xzMachineShow: false,
        xzShiftShow: false,
        tzMachineShow: false,
        tzShiftShow: false,
        mac_type_id: "030100",
        company_id: "10000025",

        zbFocus: false, //div选中聚焦
        jzFocus: false,
        zbLength: "", //div内容
        jzLength: "",
        /**下轴数据 */

        staffList: [],
        chooseClassName: "A组",
        isCheckedMachine: false, //是否选中机台
        isChooseAclass: null,
        Aclass: {

          szg1: '',
          szg1Id: null,
          szg2: '',
          szg2Id: null,
          szg3: '',
          szg3Id: null,
          id: null
        },
        Bclass: {


          szg1: '',
          szg1Id: null,
          szg2: '',
          szg2Id: null,
          szg3: '',
          szg3Id: null,
          id: null
        },
        Cclass: {

          szg1: '',
          szg1Id: null,
          szg2: '',
          szg2Id: null,
          szg3: '',
          szg3Id: null,
          id: null
        },
        isChooseAclass2: 0,
        Aclass2: {


          szg1: '',
          szg1Id: null,
          szg2: '',
          szg2Id: null,
          szg3: '',
          szg3Id: null,
          id: null
        },
        Bclass2: {


          szg1: '',
          szg1Id: null,
          szg2: '',
          szg2Id: null,
          szg3: '',
          szg3Id: null,
          id: null
        },
        Cclass2: {


          szg1: '',
          szg1Id: null,
          szg2: '',
          szg2Id: null,
          szg3: '',
          szg3Id: null,
          id: null
        },
        checkedMachineNum: "",
        checkMachine: [], //下轴选中机台列表
        machineList: [],
        page_size: 21,
        page_num: 1,
        total_num: null,
        /**下轴数据 */
        /**退轴数据 */
        staffList2: [],

        chooseClassName2: "A组",
        isCheckedMachine2: false, //是否选中机台

        checkedMachineNum2: "",
        checkMachine2: [], //下轴选中机台列表
        machineList2: [],
        page_size2: 21,
        page_num2: 1,
        total_num2: null,
        /**退轴数据 */


      }
    },
    methods: {
      getGroup() { //获取组员信息
        console.log('getGroup')
        console.log(this.isYunzhuan)
        let url2 = host + "/api/group/getGroupDetail"
        let that = this
        axios({
            url: url2,
            method: "post",
            data: {
              selectInfo: {
                company_id: that.company_id,
              },
              shiftGroup: {
                id: 17
              }
            },


            // headers: headers
          })
          .then(res => {
            console.log(res.data.result)
            res.data.result.forEach(element => {

              if (element.group_name == "下轴班A组") {
                this.Aclass.id = element.id
                for (let i = 0; i < element.staffList.length; i++) {
                  if (element.staffList[i].staff_organization_name == "下轴工") {
                    if (element.staffList[i].order_num == "1") {
                      this.Aclass.szg1 = element.staffList[i].staff_name
                      this.Aclass.szg1Id = element.staffList[i].id
                    } else if (element.staffList[i].order_num == "2") {
                      this.Aclass.szg2 = element.staffList[i].staff_name
                      this.Aclass.szg2Id = element.staffList[i].id
                    } else if (element.staffList[i].order_num == "3") {
                      this.Aclass.szg3 = element.staffList[i].staff_name
                      this.Aclass.szg3Id = element.staffList[i].id
                    }
                  }
                }
              } else if (element.group_name == "下轴班B组") {
                this.Bclass.id = element.id
                for (let i = 0; i < element.staffList.length; i++) {
                  if (element.staffList[i].staff_organization_name == "下轴工") {
                    if (element.staffList[i].order_num == "1") {
                      this.Bclass.szg1 = element.staffList[i].staff_name
                      this.Bclass.szg1Id = element.staffList[i].id
                    } else if (element.staffList[i].order_num == "2") {
                      this.Bclass.szg2 = element.staffList[i].staff_name
                      this.Bclass.szg2Id = element.staffList[i].id
                    } else if (element.staffList[i].order_num == "3") {
                      this.Bclass.szg3 = element.staffList[i].staff_name
                      this.Bclass.szg3Id = element.staffList[i].id
                    }
                  }
                }
              } else if (element.group_name == "下轴班C组") {
                this.Cclass.id = element.id
                for (let i = 0; i < element.staffList.length; i++) {
                  if (element.staffList[i].staff_organization_name == "下轴工") {
                    if (element.staffList[i].order_num == "1") {
                      this.Cclass.szg1 = element.staffList[i].staff_name
                      this.Cclass.szg1Id = element.staffList[i].id
                    } else if (element.staffList[i].order_num == "2") {
                      this.Cclass.szg2 = element.staffList[i].staff_name
                      this.Cclass.szg2Id = element.staffList[i].id
                    } else if (element.staffList[i].order_num == "3") {
                      this.Cclass.szg3 = element.staffList[i].staff_name
                      this.Cclass.szg3Id = element.staffList[i].id
                    }
                  }
                }
              }
            });

            that.Aclass2 = that.Aclass
            that.Bclass2 = that.Bclass
            that.Cclass2 = that.Cclass



          })

      },
      /**退轴函数 */
      sureClass2() {
        this.xzShiftShow = false
        this.xzMainShow = false
        this.isIndexShow = false
        this.xzMachineShow = false
        this.tzShiftShow = false
        this.tzMachineShow = false
        this.tzMainShow = true


        console.log(this.chooseClassName2)
        // this.$emit('szChange', this.staffList)
      },
      cancelClass2() {
        this.xzShiftShow = false
        this.xzMainShow = false
        this.isIndexShow = false
        this.xzMachineShow = false
        this.tzShiftShow = false
        this.tzMachineShow = false
        this.tzMainShow = true
      },
      changeClass2(e) {
        if (e == "a") {
          this.isChooseAclass2 = 0
          this.staffList2 = [

            {
              label: "下轴工01",
              staffName: this.Aclass2.szg1,
              isSelected: false
            },
            {
              label: "下轴工02",
              staffName: this.Aclass2.szg2,
              isSelected: false
            },
            {
              label: "下轴工03",
              staffName: this.Aclass2.szg3,
              isSelected: false
            },
          ]


        } else if (e == 'b') {
          this.isChooseAclass2 = 1
          this.staffList2 = [{
              label: "下轴工01",
              staffName: this.Bclass2.szg1,
              isSelected: false
            },
            {
              label: "下轴工02",
              staffName: this.Bclass2.szg2,
              isSelected: false
            },
            {
              label: "下轴工03",
              staffName: this.Bclass2.szg3,
              isSelected: false
            },
          ]

        } else if (e == 'c') {
          this.isChooseAclass2 = 2
          this.staffList2 = [{
              label: "下轴工01",
              staffName: this.Cclass2.szg1,
              isSelected: false
            },
            {
              label: "下轴工02",
              staffName: this.Cclass2.szg2,
              isSelected: false
            },
            {
              label: "下轴工03",
              staffName: this.Cclass2.szg3,
              isSelected: false
            },
          ]

        }
      },
      checkedMachine2(e) { //选择机台事件

        this.checkedMachineNum2 = e[0]
      },
      CurrentChange2(e) {
        console.log(e)
        this.page_num2 = e
        this.getMachineList2()
      },
      getMachineList2() {
        let that = this;
        let url = host + "/api/stationMachine/getMachines";
        let method =

          axios({
            url: url,
            method: "post",
            data: {
              selectInfo: {
                company_id: that.company_id,
                page_size: that.page_size2,
                page_num: that.page_num2
              },
              mac_type_id: that.mac_type_id
            },
            // headers: headers
          })
          .then(response => {

            that.total_num2 = response.data.result.total_num
            let array = response.data.result.models
            that.machineList2 = []
            array.forEach(element => {
              that.machineList2.push(element)
            });
          })
      },
      sureMachine2() {
        this.checkMachine2 = []
        this.xzShiftShow = false
        this.xzMainShow = false
        this.isIndexShow = false
        this.xzMachineShow = false
        this.tzShiftShow = false
        this.tzMachineShow = false
        this.tzMainShow = true

        if (typeof this.checkedMachineNum2 == "undefined") {
          this.isCheckedMachine2 = false

        } else {
          this.isCheckedMachine2 = true
        }

      },
      cancel2() { //取消按钮事件
        this.xzShiftShow = false

        this.xzMainShow = false
        this.isIndexShow = false
        this.xzMachineShow = false
        this.tzShiftShow = false
        this.tzMachineShow = false
        this.tzMainShow = true
        this.checkMachine2 = []

      },
      toChooseMachine2() {
        this.xzShiftShow = false
        this.tzMainShow = false
        this.xzMainShow = false
        this.isIndexShow = false
        this.xzMachineShow = false
        this.tzShiftShow = false
        this.tzMachineShow = true
        this.getMachineList2()
      },
      toClass2() {
        this.xzShiftShow = false
        this.tzMainShow = false

        this.xzMainShow = false
        this.isIndexShow = false
        this.xzMachineShow = false

        this.tzMachineShow = false
        this.tzShiftShow = true
      },
      /**退轴函数 */
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
      /**下轴函数 */
      sureClass() {
        this.xzShiftShow = false


        this.tzMainShow = false
        this.isIndexShow = false
        this.xzMachineShow = false
        this.xzMainShow = true
        console.log(this.isChooseAclass2)
        // if (this.isChooseAclass == true) {
        //   this.chooseClassName = 'A组'
        // } else {
        //   this.chooseClassName = 'B组'
        // }
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
      changeClass(e) {
        if (e == "a") {
          this.isChooseAclass = 0
          this.staffList = [{
              label: "下轴工01",
              staffName: this.Aclass.szg1,
              isSelected: false
            },
            {
              label: "下轴工02",
              staffName: this.Aclass.szg2,
              isSelected: false
            },
            {
              label: "下轴工03",
              staffName: this.Aclass.szg3,
              isSelected: false
            },
          ]


        } else if (e == 'b') {
          this.isChooseAclass = 1
          this.staffList = [{
              label: "下轴工01",
              staffName: this.Bclass.szg1,
              isSelected: false
            },
            {
              label: "下轴工02",
              staffName: this.Bclass.szg2,
              isSelected: false
            },
            {
              label: "下轴工03",
              staffName: this.Bclass.szg3,
              isSelected: false
            },
          ]

        } else if (e == 'c') {
          this.isChooseAclass = 2
          this.staffList = [{
              label: "下轴工01",
              staffName: this.Cclass.szg1,
              isSelected: false
            },
            {
              label: "下轴工02",
              staffName: this.Cclass.szg2,
              isSelected: false
            },
            {
              label: "下轴工03",
              staffName: this.Cclass.szg3,
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
      /**下轴函数 */
      xiazhou() {
        console.log(this.isChooseAclass2)
        console.log(this.checkedMachineNum)
        if (this.pch == "") {
          this.$message({
            message: '请先扫码！',
            type: 'warning'
          });
        } else if (this.checkedMachineNum == "") {
          this.$message({
            message: '请选择机台！',
            type: 'warning'
          });
        } else {
          let url = host + "/api/stationMachine/downAxis";

          let that = this
          axios({
              url: url,
              method: "post",
              data: {
                selectInfo: {
                  company_id: that.company_id,

                },
                remain_length: "0",
                print_code: that.pch,
                machine_id: that.checkedMachineNum,
              },
              // headers: headers
            })
            .then(response => {
              console.log(response)

              if (response.data.message == "成功") {
                this.$message({
                  message: '下轴成功！',
                  type: 'success'
                });
              } else {
                this.$message.error('下轴失败！');
              }

            })
        }

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

    },
    mounted() {

    },
    watch: {
      pch(val) { //批轴号事件
        let url = host + "/api/stationMachine/getAxisInfo"
        let that = this
        if (val != "") {
          axios({
              url: url,
              method: "post",

              data: {
                selectInfo: {
                  company_id: that.company_id
                },
                print_code: val
              },


              // headers: headers
            })
            .then(res => {
              console.log(res)
              that.se_hao = res.data.result.se_hao
              that.pin_hao = res.data.result.pin_hao
              that.product_name = res.data.result.product_name
              that.machine_id = res.data.result.machine_id
            })
        }
      },
      xzShiftShow(val) { //当选择上轴组页面显示时加载数据
        if (val == true) {
          this.getGroup()


          // })
        }
      },
      tzShiftShow2(val) { //当选择上轴组页面显示时加载数据
        if (val == true) {
          this.getGroup()


          // })
        }
      },
    }
  }

</script>

<style scoped>
  body /deep/ .el-message .el-icon-success {
    font-size: 3rem;
  }

  body /deep/ .el-message--success .el-message__content {
    font-size: 3rem;
  }

  .pch {
    position: absolute;
    left: 1rem;
    top: -3.5rem;
    width: 15.5rem;
    height: 3rem;

  }

  .pch input {
    width: 100%;
    height: 100%;
    border: 1px solid black;
    font-size: 1.5rem;
  }

  .pch input::-webkit-input-placeholder {
    font-size: 1.3rem;

  }

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
