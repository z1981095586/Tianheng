<template>
  <div>
    <!--打印temp-->
    <printClothCard style="display: none" ref="printClothCard"></printClothCard>
    <!--更换机器-->
    <el-dialog
      :visible.sync="showMachineTable"
      width="1500px"
      append-to-body
      :close-on-click-modal="false"
    >
      <div  style="width: 100%;text-align: center;font-size: 48px">
        更换机器
      </div>
      <div style="width: 100%;font-size: 32px;color: #F9243D" v-show="!(machineIdSelected&&machineIdSelected.length>0)">
        请先选择想要上轴的机台，预排产机台:<span v-if="all_order_list[0]&&all_order_list[0].machineIdPlan">{{all_order_list[0].machineIdPlan}}</span><span v-if="!(all_order_list[0]&&all_order_list[0].machineIdPlan)">无</span>
      </div>
      <table cellspacing='0' cellpadding='0' width="100%" style="width: 760px;">
        <tr>
          <td style="min-width:250px;vertical-align: top;border-right: 2px solid lightgray ">
            <div class="changeMachineDiv">
              <el-select ref="machineId" v-model="machineId" filterable placeholder="请选择">
                <el-option
                  v-for="item in machineList"
                  :key="item.machine_id"
                  :label="item.machine_id"
                  :value="item.machine_id"
                  style="line-height: 96px;height: 96px"
                >
                  <span style="font-size: 48px;line-height: 96px;height: 96px">{{item.machine_id}}</span>
                </el-option>
              </el-select>
            </div>
          </td>
          <td>
            <table width="620px"  cellspacing='0' cellpadding='0' height="400px" style="display: inline-block">
              <tr v-for="indexTr in 2" >
                <td  v-for="indexTd in 5" style="text-align: center;">
                  <el-button type="primary" plain style="width: 180px;height: 180px;margin-right:5px;margin-bottom: 5px" size="medium"  @click="selectTableButton(buttonList[(indexTr-1)*5+indexTd-1])">
                    <p  style="font-weight: bolder;font-size: 80px;width: 100%">{{buttonList[(indexTr-1)*5+indexTd-1]}}</p>
                  </el-button>
                </td>
                <td v-if="indexTr===1">
                  <el-button type="primary" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px;font-weight: bolder" @click="finishChangeMachine">确定</el-button>
                </td>
                <td v-if="indexTr===2">
                  <el-button type="info" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px" @click="selectTableButton('退格')">清空</el-button>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </el-dialog>
    <el-dialog
      :visible.sync="showAddClothDialog"
      width="800"
      append-to-body
    >
      <div slot="title" class="big_font" style="font-size: 40px">新增布票</div>
      <div style="text-align: center">
        <p  class="big_font" style="font-size: 40px">请确认新增数量</p>
        <el-button  type="success" @click="addNumber--" style="width: 7.5vw;height: 7.5vw;margin-right: 2vw"  :disabled="addNumber <= 1">
          <div>
            <p style="font-size: 3vw;color: white">
              <i class="el-icon-remove"></i>
            </p>
          </div>
        </el-button>
        <p style="display: inline-block;font-size: 3vw;font-weight: bolder" >{{addNumber}}</p>
        <el-button  type="success" @click="addNumber++" style="width: 7.5vw;height: 7.5vw;margin-left: 2vw">
          <div>
            <p style="font-size: 3vw;color: white">
              <i class="el-icon-circle-plus"></i>
            </p>
          </div>
        </el-button>
      </div>
      <div style="text-align: center;margin-top: 5vw">
        <el-button type="success" style="width: 7.5vw;height: 7.5vw;margin-bottom: 5px;margin-right: 2.5vw" size="medium" @click="addCloth">
          <p  style="font-weight: bolder;font-size: 1.5vw;width: 100%;line-height:1.4;letter-spacing:4px;">确认<br>并打印</p>
        </el-button>
        <el-button type="primary" style="width: 7.5vw;height: 7.5vw;margin-bottom: 5px;margin-left: 2.5vw" size="medium" @click="showAddClothDialog = false">
          <p  style="font-weight: bolder;font-size: 1.5vw;width: 100%;line-height:1.4;letter-spacing:4px;">取消<br>新增</p>
        </el-button>
      </div>
    </el-dialog>
    <!--新增织造单-->
    <el-dialog
      :visible.sync="showAddNewClothDialog"
      width="800"
      append-to-body
    >
      <div slot="title" class="big_font" style="font-size: 40px">新增布票</div>
      <div style="text-align: center">
        <p  class="big_font" style="font-size: 40px">请确认新增数量</p>
        <el-button  type="success" @click="print_num--" style="width: 7.5vw;height: 7.5vw;margin-right: 2vw"  :disabled="print_num <= 1">
          <div>
            <p style="font-size: 3vw;color: white">
              <i class="el-icon-remove"></i>
            </p>
          </div>
        </el-button>
        <p style="display: inline-block;font-size: 3vw;font-weight: bolder" >{{print_num}}</p>
        <el-button  type="success" @click="print_num++" style="width: 7.5vw;height: 7.5vw;margin-left: 2vw">
          <div>
            <p style="font-size: 3vw;color: white">
              <i class="el-icon-circle-plus"></i>
            </p>
          </div>
        </el-button>
      </div>
      <div style="text-align: center;margin-top: 5vw">
        <el-button type="success" style="width: 7.5vw;height: 7.5vw;margin-bottom: 5px;margin-right: 2.5vw" size="medium" @click="yieldNewBarCode">
          <p  style="font-weight: bolder;font-size: 1.5vw;width: 100%;line-height:1.4;letter-spacing:4px;">确认<br>并打印</p>
        </el-button>
        <el-button type="primary" style="width: 7.5vw;height: 7.5vw;margin-bottom: 5px;margin-left: 2.5vw" size="medium" @click="showAddNewClothDialog = false">
          <p  style="font-weight: bolder;font-size: 1.5vw;width: 100%;line-height:1.4;letter-spacing:4px;">取消<br>新增</p>
        </el-button>
      </div>
    </el-dialog>
    <!--头部-->
    <div style="height: 80px;background-color: #29374b;width: 100%">
      <headComponent ref="headComponent" @selectWorker="selectWorker" @getData="getDataRefresh"></headComponent>
    </div>
    <div :style="{height: scrollerHeight,width:scrollerWidth}" style="margin-top: 10px;">
      <div>
        <div :style="{height: scrollerHeightTop,width:scrollerWidthLeft}" style="display: inline-block">
          <el-card style="width: 100%;" :style="{height: scrollerHeightTop,width:scrollerWidthLeft}" shadow="hover">
            <!--<div style="width: 30%;display: inline-block" >-->
            <!--<el-button :style="{height:inputHeight,width:inputHeight}" style="margin-top: 1.4vw" type="success" @click="changeMachine">-->
            <!--<div>-->
            <!--<p style="font-size: 30px;color: white">{{machineIdSelected}}</p>-->
            <!--<p style="font-size: 20px;color: white">点击更换</p>-->
            <!--</div>-->
            <!--</el-button>-->
            <!--</div>-->
            <div style="width: 93%;margin-left: 3%;display: inline-block;vertical-align: top" >
              <p class="standard_font">点击下方区域扫描生产批号</p>
              <input v-model="barCode" :style="{height:inputHeight,paddingRight:paddingRight}"  @input="batchCodeChange(barCode)"   style="display: inline-block;font-size: 28px;width: 100%"></input>
              <img :src="delete_icon"  style="display: inline-block;position: fixed" @click="clearBarCode" :style="{opacity:0.2,height:buttonHeight,left:buttonLeft,top:buttonTop}">
            </div>
          </el-card>
        </div>
        <div :style="{height: scrollerHeightTop,width:scrollerWidthRight}" style="display: inline-block;margin-left: 10px">
          <el-card style="width: 100%;" :style="{height: scrollerHeightTop,width:scrollerWidthRight}" shadow="hover">
            <div style="width: 100%;height: 100%">
              <table class="radioTable" cellspacing='0' cellpadding='0' width="100%" :height="scrollerHeightTopTable" style="font-size: 50px;text-align: center">
                <tr>
                  <td id="radio1" @click="changeRadio('radio1')" style="background-color: #409EFF;font-size: 4rem">
                    织造小票
                  </td>
                  <td id="radio2" @click="changeRadio('radio2')" style="font-size: 4rem">
                    更换纬纱
                  </td>
                  <td id="radio3" @click="changeRadio('radio3')" style="font-size: 4rem">
                    了机预测
                  </td>
                </tr>
              </table>
            </div>
          </el-card>
        </div>
      </div>
      <div style="margin-top:10px ">
        <div :style="{height: scrollerHeightBottom,width:scrollerWidthLeft}"  style="display: inline-block" >
          <el-card style="width: 100%;" :style="{height: scrollerHeightBottom,width:scrollerWidthLeft}" shadow="hover" body-style="">
            <div class="left-bottomDiv" id="leftDiv"  :style="" style="overflow-y: hidden;height: 90%" @mousedown="mousedown" @touchstart="mousedown" @mousemove="move" @mouseup="end" @touchmove.prevent="move"  @touchend="end" >
              <div class="standard_border" :style="{height:scrollerHeightBottomDiv,backgroundColor:getLabelColor(item.status)}" v-for="item in all_order_list" :label="item.barCode" :key="item.id" style="width: 90%;display: inline-block;margin-left: 5%;margin-top: 5px;border-width:2px;padding: 10px" >
                <table cellspacing='20px' cellpadding='20px' border="0" width="100%">
                  <tr>
                    <td colspan="2" style="border-bottom: 1px solid lightgray">
                      <p style="display: inline-block;margin-top: 5px;font-size: 2.2vw;font-weight: bolder">织造上轴加工单&nbsp</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <p class="standard_font" style="font-size: 1.5vw;font-weight: bolder">{{plan_code}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <p class="standard_font" style="font-size: 1.5vw;font-weight: bolder">预排机台：&nbsp{{item.machineIdPlan || "无"}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <p class="standard_font" style="font-size: 1.5vw;font-weight: bolder">实际机台：&nbsp{{item.machineId || machineIdSelected}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <p class="standard_font" style="font-size: 1.5vw;font-weight: bolder">轴号：&nbsp{{item.axisNo}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <p class="standard_font" style="font-size: 1.5vw;font-weight: bolder">品种：&nbsp{{item.productName}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-button type="success" style="width: 7.5vw;height: 6vw;margin-bottom: 5px;line-height:1.4;letter-spacing:4px" size="medium"  @click="getPrintStatus">
                        <p  style="font-weight: bolder;font-size: 1.5vw;width: 100%">确认<br>提交</p>
                      </el-button>
                    </td>
                    <td>
                      <el-button slot="reference" type="danger" style="width: 7.5vw;height: 6vw;margin-bottom: 5px;line-height:1.4;letter-spacing:4px" size="medium"  @click="showChangeMachine">
                        <p  style="font-weight: bolder;font-size: 1.5vw;width: 100%">修改<br>机台</p>
                      </el-button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </el-card>
        </div>
        <div :style="{height: scrollerHeightBottom,width:scrollerWidthLeft}"  style="display: inline-block;margin-left: 10px">
          <el-card style="width: 100%;" :style="{height: scrollerHeightBottom,width:scrollerWidthRight}" shadow="hover" >
            <div>
              <img id="right_up" :src="arrow_icon" :style="{top:upArrowTop,left:arrowRight,width:arrowWidth}" style="position: fixed;webkit-transform: rotate(90deg);display: none" @click="right_up">
              <img id="right_down" :src="arrow_icon" :style="{top:downArrowTop,left:arrowRight,width:arrowWidth}" style="position: fixed;webkit-transform: rotate(-90deg)" @click="right_down">
            </div>
            <div class="left-bottomDiv" :style="{height: scrollerHeightBottomDiv}" id="rightDiv"  @mousedown="mousedown1" @touchstart="mousedown1" @mousemove="move1" @mouseup="end1" @touchmove.prevent="move1"  @touchend="end1" >
              <table class="radioTable"  style="width: 84%" cellspacing="20px" v-show="radio === 'radio1'&&all_order_list[0]">
                <tr>
                  <td style="text-align: center;width: 33%" @click="">
                    <div style="height:15vh" @click="addBySelf">
                      <div style="height:5vh;font-size: 2vw;border-bottom: 1px solid lightgray;"><Icon type="md-add" /></div>
                      <div style="height:10vh;font-size: 2vw;margin-top: 2%;font-weight: bolder">手动新增</div>
                    </div>
                  </td>
                  <td id="0" style="text-align: left;width: 33%"  v-if="order_detail_list.length>0" @click="setClothId(0)">
                    <div style="height:15vh;margin-left: 2%;width: 96%">
                      <div id="0title" style="height:5vh;font-size: 1.4vw;border-bottom: 1px solid lightgray;font-weight: bolder">{{order_detail_list[0].id}}</div>
                      <div style="height:5vh;font-size: 1.8vw;">品名：{{order_detail_list[0].productName}}</div>
                      <div style="height:5vh;font-size: 1.8vw;">设定长度：{{order_detail_list[0].yieldMeterSemi}}</div>
                    </div>
                  </td>
                  <td id="1" style="text-align: left;width: 33%" v-if="order_detail_list.length>1" @click="setClothId(1)">
                    <div style="height:15vh;margin-left: 2%;width: 96%">
                      <div id="1title" style="height:5vh;font-size: 1.4vw;border-bottom: 1px solid lightgray;font-weight: bolder">{{order_detail_list[1].id}}</div>
                      <div style="height:5vh;font-size: 1.8vw;">品名：{{order_detail_list[1].productName}}</div>
                      <div style="height:5vh;font-size: 1.8vw;">设定长度：{{order_detail_list[1].yieldMeterSemi}}</div>
                    </div>
                  </td>
                </tr>
                <tr v-for="indexTr in order_detail_list_length">
                  <td :id="indexTd+indexTr*3-2" v-for="indexTd in 3" v-if="(indexTd+indexTr*3-1)<=order_detail_list.length"  style="text-align: left;width: 33%" @click="setClothId(indexTd+indexTr*3-2)">
                    <div style="height:15vh;margin-left: 2%;width: 96%">
                      <div :id="indexTd+indexTr*3-2 + 'title'" style="height:5vh;font-size: 1.4vw;border-bottom: 1px solid lightgray;font-weight: bolder">{{order_detail_list[indexTd+indexTr*3-2].id}}</div>
                      <div style="height:5vh;font-size: 1.8vw;">品名：{{order_detail_list[indexTd+indexTr*3-2].productName}}</div>
                      <div style="height:5vh;font-size: 1.8vw;">设定长度：{{order_detail_list[indexTd+indexTr*3-2].yieldMeterSemi}}</div>
                    </div>
                  </td>
                </tr>
              </table>
              <table class="radioTable"  style="width: 84%" cellspacing="20px" v-show="radio === 'radio2'">
                <tr>
                  <td>

                  </td>
                </tr>
              </table>
              <table class="radioTable"  style="width: 84%" cellspacing="20px" v-show="radio === 'radio3'">
                <tr v-for="indexTr in machine_detail_list_length">
                  <td :id="indexTd+indexTr*3-3+'radio3'" v-for="indexTd in 3" v-if="(indexTd+indexTr*3-3)<=machine_detail_list.length"  style="text-align: left;width: 33%" @click="setMachineId(indexTd+indexTr*3-3+'radio3')">
                    <div style="height:16vh;margin-left: 2%;width: 96%">
                      <div style="height:5vh;font-size: 1.5vw;border-bottom: 1px solid lightgray;font-weight: bolder">机器号：{{machine_detail_list[indexTd+indexTr*3-4].machineid}}</div>
                      <div style="height:5vh;font-size: 1.5vw;font-weight: bolder;">了机时间：{{machine_detail_list[indexTd+indexTr*3-4].machineEndHours}}h</div>
                      <div style="height:9vh;font-size: 1.5vw;font-weight: bolder;">当前品种：{{machine_detail_list[indexTd+indexTr*3-4].styleName}}</div>
                      <!--<div style="height:9vh;font-size: 1.5vw;font-weight: bolder;">排产品种：<br>{{machine_detail_list[indexTd+indexTr*3-4].styleName}}</div>-->
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { warp_api,warp_api_get,realOutput_api,common_api,weaving_api,weaving_print_api } from "../../../../static/api/api.js";
  import headComponent from './../mainHead.vue';
  import setAxleTable from './../warpSetAxle.vue';
  import outputSubmitTable from './../produceComfirm.vue';
  import outputPrintTable from './../../sizingCardPrint.vue';
  import changeStaffMessage from './../changeStaffMessage.vue';
  import printClothCard from './../printClothCard.vue';
  import screenfull from "screenfull";
  export default {
    components:{headComponent,setAxleTable,outputSubmitTable,outputPrintTable,changeStaffMessage,printClothCard},
    data () {
      return {
        buttonList:"1234567890",
        buttonSetting:"",
        companyId:10000015,
        workShopId:null,
        scrollerHeight:null,
        scrollerWidth:null,
        scrollerHeightTop:null,
        scrollerHeightTopTable:null,
        scrollerHeightBottom:null,
        scrollerHeightBottomDiv:null,
        scrollerWidthLeft:null,
        scrollerWidthRight:null,
        scrollerWidthRightTable:null,
        scrollerHeightRightButton:null,
        label_height:null,
        label_height_right:"120px",
        inputHeight:null,
        inputWidth:null,
        buttonHeight:null,
        button_height:null,
        all_order_list:[],
        order_list:{
          "orderSheetPlan": {}
        },
        order_detail_list:[],
        order_detail_list_length:0,
        machine_detail_list_length:0,
        machine_detail_list:[],
        barCode:null,
        batchCodeNow:null,
        fontPercent:false,
        delete_icon:require("../../../../static/picture/delete.png"),
        arrow_icon:require("../../../../static/picture/arrow2.png"),
        flags:false,
        flags1:false,
        getY:null,startY:null,
        buttonLeft:null,
        buttonTop:null,
        paddingRight:null,
        upArrowTop:null,
        arrowLeft:null,
        arrowWidth:null,
        downArrowTop:null,
        arrowRight:null,
        isFirstTime:true,
        staff_id:null,
        staff_name:null,
        axleSelected:[],
        axleNum:null,
        axleNumNow:null,
        produce_details_list:[],
        selectId:null,
        ifGetPermission:false,
        selectedPicture:require("../../../../static/picture/select.png"),
        companyName:"浙江鑫海纺织有限公司",
        workshopId:null,
        showChangeStaffMessage:false,
        clock:null,
        printAxisTable:false,
        clickedRightLabel:null,
        machineIdSelected:null,
        machineId:"",
        clothData:null,
        showMachineTable:false,
        machineList:[],
        showAddClothDialog:false,
        showAddNewClothDialog:false,
        radio: "radio1",
        addNumber:1,
        newCodeNum:0,
        plan_code:"",
        newBarCode:null,
        print_num:0,//打印张数
      }
    },
    methods:{
      getUrlMessage(){
        let params = this.$route.params.params.split(",");
        let message = params[0];
        // console.log(params);
        this.companyId = params[1];
        this.buttonSetting = "123"+message[0]+message[1]+"456"+message[2]+message[3]+"7890"+message[4];
        this.workshopId = params[2];
        this.$store.state.workshopId = this.workshopId;
        this.$refs.headComponent.getWorker("/s-staff-organization-relation/getJsStaff");
        this.$refs.headComponent.changeMainTitle("天衡织造工位操作系统");
        this.workShopId = this.$refs.headComponent.getWorkShop();
        this.$refs.headComponent.sendMachineType("030100",this.workshopId);
        // this.getData();
        this.getMachineList();
        this.machineSchedule();
      },
      changeWindow(){
        this.scrollerHeight = (window.innerHeight*0.98 -90) + "px";
        this.scrollerWidth = (window.innerWidth -10) + "px";
        this.scrollerHeightTop = ((window.innerHeight*0.98 -80) -20)*0.25 +"px";
        this.scrollerHeightTopTable = ((window.innerHeight*0.98 -80) -20)*0.25 -40 +"px";
        this.scrollerHeightBottom = ((window.innerHeight*0.98 -80) -20)*0.75 +"px";
        this.scrollerHeightBottomDiv = ((window.innerHeight*0.98 -80) -20)*0.75 -35 +"px";
        this.scrollerWidthLeft = ((window.innerWidth -10)-20)*0.25 +"px";
        this.scrollerWidthRight = ((window.innerWidth -10)-20)*0.75 +"px";
        this.scrollerWidthRightTable = ((window.innerWidth -10)-20)*0.75*0.8 +"px";
        this.scrollerHeightRightButton = ((window.innerHeight*0.98 -80) -20)*0.25 - 40 +"px";
        this.inputHeight = ((window.innerHeight*0.98 -80) -20)*0.25 - 70+"px";
        this.buttonTop =  (((window.innerHeight*0.98 -80) -20)*0.25 - 70)/3+115+window.innerWidth*0.01+"px";
        this.buttonLeft = ((window.innerWidth -10)-10)*0.25*0.93-(((window.innerHeight*0.98 -80) -20)*0.25 - 70)/2+"px";
        this.paddingRight = ((window.innerWidth -10)-10)*0.25*0.02+(((window.innerHeight*0.98 -80) -20)*0.25 - 70)/2+"px";
        this.inputWidth = ((window.innerWidth -10)-10)*0.25*0.95*0.8 +"px";
        this.buttonHeight = (((window.innerHeight*0.98 -80) -20)*0.25 - 70)/2.5 + "px";
        this.label_height =(((window.innerHeight*0.98 -80) -20)*0.75 - 65)/3 + "px";
        //this.label_height_right =(((window.innerHeight*0.98 -80) -20)*0.75 - 50)/4 + "px";
        this.button_height =((((window.innerHeight*0.98 -80) -20)*0.75 - 70)/4.5 -20)/2 +"px";
        this.upArrowTop = ((window.innerHeight*0.98 -80) -20)*0.25 +80+50+((window.innerWidth -10)-10)*0.25*0.3+"px";
        this.arrowLeft = ((window.innerWidth -10)-10)*0.25*0.82+"px";
        this.arrowRight = 20+((window.innerWidth -10)-10)*0.25+((window.innerWidth -10)-10)*0.75*0.92+10+"px";
        this.arrowWidth = ((window.innerWidth -10)-10)*0.25*0.15+"px";
        this.downArrowTop = window.innerHeight -30 - ((window.innerWidth -10)-10)*0.25*0.45 + "px";
      },
      getColor(status,step){
        if(step.indexOf(status)>-1){
          return "#417804";
        }else{
          return "gray";
        }
      },
      getData(){
        let data = {};
        data.tableName = "lm_weaving_plan_b";
        data.query ={
          workshop_id:this.workshopId
        };
        let url = "/report/getSimpleReport";
        common_api(url, data,this.companyId)
          .then(response => {
            // console.log(response.data.data);
            this.all_order_list = response.data.data;
            this.order_list = response.data.data[0];
            this.getDetails(this.all_order_list[0].id)
          })
          .catch(error => {
            console.log(error);
          });
      },
      getDetails(warpPlanId){
        let data = {};
        data.id = warpPlanId;
        let url = "/lm-weaving-plan-b/getData";
        weaving_api(url, data,this.companyId)
          .then(response => {
            // console.log(response.data.data);
            this.order_detail_list = response.data.data.pceClothEaches;
            this.order_detail_list_length = Math.ceil((this.order_detail_list.length-2)/3);
            // this.$nextTick(()=>{
            //   if(this.newCodeNum>0){
            //     for (let i = 0; i < this.newCodeNum; i++) {
            //       document.getElementById(this.order_detail_list.length-i-1+"title").style.color = "#00801f";
            //     }
            //   }
            //   this.newCodeNum = 0;
            // });
            this.$store.state.showLoadingLog = false;
          })
          .catch(error => {
            console.log(error);
          });
      },
      getDataByCardNumber(barCode){
        //console.log("查询");
        //this.barCode = barCode;
        //记录查询的barCode用于比较
        this.barCode = barCode;
        let data = {};
        data.printCode = this.barCode;
        let url = "/lm-warp-plan-detail/selectAllByPrintCode";
        warp_api(url, data,this.companyId)
          .then(response => {
            //console.log(response.data.data);
            this.order_detail_list = [];
            if(response.data.data){
              this.all_order_list = [];
              this.all_order_list.push(response.data.data);
              // this.order_list = response.data.data.records[0];
              this.plan_code = this.barCode.substring(0,this.barCode.length-4);
              if(this.all_order_list[0].zbWarpPlanId){
                this.getDetails(this.all_order_list[0].zbWarpPlanId);
              }else{
                this.$message.warning("未生成织造加工单，请先提交织造上轴加工单");
              }
            }else{
              this.$message.warning("二维码错误或当前车间不存在这条记录");
              this.all_order_list = [];
              this.order_detail_list = [];
              this.order_list = {
                "orderSheetPlan": {}
              }
            }
            document.getElementById("rightDiv").scrollTop = 0;
            this.$store.state.showLoadingLog = false;
          })
          .catch(error => {
            console.log(error);
          });
      },
      batchCodeChange(){
        if(this.clock){
          clearInterval(this.clock);
        }
        this.clock = setTimeout(this.searchCode,500);
      },
      clearBarCode(){
        this.barCode="";
        this.all_order_list = [];
        this.order_detail_list = [];
        this.order_list = {
          "orderSheetPlan": {}
        }
      },
      searchCode(){
        this.$store.state.showLoadingLog = true;
        if(this.batchCodeNow){
          if((this.barCode.length - this.batchCodeNow.length)>1){
            if(this.batchCodeNow!== this.barCode.substr(0-this.batchCodeNow.length)){
              this.batchCodeNow = this.barCode;
              this.shiftToTop();
              this.getDataByCardNumber(this.batchCodeNow);
            }else{
              this.$message.warning("重复扫码");
              this.barCode = this.batchCodeNow;
              this.$store.state.showLoadingLog = false;
            }
          }else{
            this.shiftToTop();
            this.getDataByCardNumber(this.barCode);
          }
        }else{
          this.shiftToTop();
          this.batchCodeNow = this.barCode;
          this.getDataByCardNumber(this.barCode);
        }
        document.getElementById("right_down").style.display = "inline-block";
        document.getElementById("right_up").style.display = "none";
        clearTimeout(this.clock);
      },
      shiftToTop(){
        for(let i in this.all_order_list){
          if(this.all_order_list[i].barCode === this.barCode){
            this.all_order_list.unshift(this.all_order_list.splice(i , 1)[0]);
          }
        }
        document.getElementById("leftDiv").scrollTop = 0;
      },
      getLabelColor(status){
        // console.log(status);
        if(status === 1){
          return "#c4ff7d"
        }else{
          return "white"
        }
      },
      mousedown(event){
        this.flags = true;
        this.getY = event.clientY;
        this.startY = document.getElementById("leftDiv").scrollTop;
        return false
      },
      move(event){
        if(this.flags){
          let top = event.clientY-this.getY;
          document.getElementById("leftDiv").scrollTop = this.startY - top;
          return false
        }
      },
      end(){
        this.flags = false;
      },
      mousedown1(event){
        this.flags1 = true;
        this.getY = event.clientY;
        //  console.log(this.getY);
        this.startY = document.getElementById("rightDiv").scrollTop;
        return false
      },
      move1(event){
        if(this.flags1){
          let top = event.clientY-this.getY;
          document.getElementById("rightDiv").scrollTop = this.startY - top;
          return false
        }
      },
      end1(){
        this.flags1 = false;
      },
      right_up(){
        if(document.getElementById("rightDiv").scrollTop-parseInt(this.label_height)*3-60>=0){
          document.getElementById("rightDiv").scrollTop-= parseInt(this.label_height)*2;
          document.getElementById("right_down").style.display = "inline-block";
        }else{
          document.getElementById("rightDiv").scrollTop = 0;
          document.getElementById("right_up").style.display = "none";
          document.getElementById("right_down").style.display = "inline-block";
        }
      },
      right_down(){
        if(document.getElementById("rightDiv").scrollTop+parseInt(this.label_height)*3+46<=document.getElementById("rightDiv").scrollHeight){
          document.getElementById("rightDiv").scrollTop += parseInt(this.label_height)*2;
          document.getElementById("right_up").style.display = "inline-block";
        }else{
          document.getElementById("rightDiv").scrollTop = document.getElementById("rightDiv").scrollHeight;
          document.getElementById("right_down").style.display = "none";
          document.getElementById("right_up").style.display = "inline-block";
        }
      },
      showDetails(item){
        let data = {};
        data.beamName = item.axisNo;
        data.warpPlanId = this.order_list.id;
        let url = "/warp-axis-record-his/selectJsAxisRecords";
        warp_api_get(url, data,this.companyId)
          .then(response => {
            // console.log(response);
            this.produce_details_list = response.data.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      makeFullScreen(){
        // if(this.isFirstTime){
        //  // screenfull.toggle();
        //   this.isFirstTime = false;
        // }
      },
      selectWorker(workerId,name){
        this.staff_id = workerId;
        this.staff_name = name;
        // this.showChangeStaffMessage = true;
      },
      changeByCardNumber(item){
        this.order_list = item;
        this.getDataByCardNumber(item.barCode)
      },
      confirmAddPermission(){

      },
      addDate(time) {
        let date = new Date();
        let month = date.getMonth() + 1;
        if (month < 10) {
          month = "0" + month
        }
        let day = date.getDate();
        if (day < 10) {
          day = "0" + day
        }
        return date.getFullYear() + "-" + month + "-" + day + " " + time;
      },
      rightLabelClick(item){
        console.log(item);
        if(this.clickedRightLabel){
          document.getElementById("rightLabel" + this.clickedRightLabel).style.backgroundColor = "white";
        }
        this.clickedRightLabel = item.id;
        document.getElementById("rightLabel" +this.clickedRightLabel).style.backgroundColor = "#c4ff7d";
        this.clickDetailsChangeStaff(item);
      },
      //点击详情切换员工
      clickDetailsChangeStaff(item){
        if(this.selectId!== item.id){
          this.selectId = item.id;
          if (item.currentStaffId) {
            this.staff_id = item.currentStaffId;
            this.$refs.headComponent.changeStaff(this.staff_id);
          }else{
            this.$refs.headComponent.changeStaff(this.staff_id);
          }
        }
      },
      getDataRefresh(){
        this.getData();
        this.barCode = "";
      },
      getMachineList(){
        let data = {};
        data.tableName = "mac_relation";
        data.selectLikeFields ={
          machine_id:this.machineId
        };
        data.query ={
          workshop_id:this.workshopId,
          mac_type_id:"030100"
        };
        let url = "/report/getSimpleReport";
        common_api(url, data,this.companyId)
          .then(response => {
            //  console.log(response.data.data);
            this.machineList = response.data.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      changeMachine(){
        this.machineIdSelected = '';
        this.showMachineTable = true;
      },
      changeRadio(radioId){
        this.radio = radioId;
        for (let i = 1; i < 4; i++) {
          document.getElementById("radio" + i).style.backgroundColor = "white";
        }
        document.getElementById(radioId).style.backgroundColor = "#409EFF";
      },
      //织造小票td变色
      setClothId(id){
        this.clothData = this.order_detail_list[id];
        for (let i = 0; i < this.order_detail_list.length; i++) {
          document.getElementById(i+"").style.backgroundColor = 'white';
        }
        document.getElementById(id+"").style.backgroundColor = '#75c26a';
        let order_detail_list = [{
          staff_id: this.staff_id,
          currentRealYield: this.clothData.yieldMeterSemi,
          id:this.clothData.id,
          print_count:id+1,
          axisNo: this.all_order_list[0].axisNo
        }];
        let order_list ={
          productName:this.all_order_list[0].productName,
          machineAxis: this.all_order_list[0].machineId
        };
        this.$refs.printClothCard.getData(order_list,order_detail_list);
      },
      //了机预测td变色
      setMachineId(id){
        //console.log(this.order_detail_list.length);
        this.clothData = this.order_detail_list[id];
        for (let i = 1; i <= this.order_detail_list.length; i++) {
          document.getElementById(i+"radio3").style.backgroundColor = 'white';
          console.log(i);
        }
        document.getElementById(id+"").style.backgroundColor = '#67C23A'
      },
      addCloth(){
        this.$store.state.showLoadingLog = true;
        let id = "000" +  (this.order_detail_list.length+1);
        id = id.substr(id.length - 3);
        //   console.log(this.order_detail_list);
        let code = this.order_detail_list[0].id.substr(0,this.order_detail_list[0].id.length-3);
        let message = {};
        let data = {};
        data= [];
        let order_detail_list = [];
        this.newCodeNum = this.addNumber;//用于标志新加布票
        for (let i = 0; i < this.addNumber; i++) {
          message = {};
          message.id = code  + id;
          message.orderPlanId = this.order_detail_list[0].orderPlanId;
          message.productName = this.all_order_list[0].productName;
          message.printCode = this.barCode;
          message.barCode = "P" + this.order_detail_list[0].id.substr(1,this.order_detail_list[0].id.length-4);
          message.machineAxis = this.machineIdSelected;
          message.yieldMeterSemi = this.order_detail_list[0].yieldMeterSemi;
          message.yieldMeter = message.yieldMeterSemi;
          message.printCount = 1;
          data.push(message);
          order_detail_list.push({
            staff_id: this.staff_id,
            currentRealYield: this.order_detail_list[0].yieldMeterSemi,
            id:code + id,
            machineAxis:this.machineIdSelected,
            axisNo: this.all_order_list[0].axisNo,
            print_count: this.order_detail_list.length+1+i
          });
          id++;
          id =  "000" + id;
          id = id.substr(id.length - 3);
        }
        weaving_print_api("/pce-cloth-each/add", data,this.companyId)
          .then(response => {
            this.showAddClothDialog = false;
            this.getDetails(this.all_order_list[0].zbWarpPlanId);
            let order_list ={
              productName:this.all_order_list[0].productName,
              machineAxis: this.all_order_list[0].machineId
            };
            // console.log(this.all_order_list[0]);
            // console.log(order_detail_list);
            order_list.companyId = this.companyId;
            this.$refs.printClothCard.getData(order_list,order_detail_list,0);
          })
          .catch(error => {
            console.log(error);
          });
      },
      selectTableButton(buttonName){
        this.machineIdSelected+="";
        if(buttonName === "退格"){
          this.machineId = '';
        }else{
          // if(this.machineId === "0"){
          //   this.machineId = "";
          // }
          this.machineId += buttonName;
        }
        //对焦
        this.$refs.machineId.focus();
        this.getMachineList()
      },
      //了机预测
      machineSchedule(){
        let data = {
          pageNum:1,
          pageSize: 30,
        };
        data.workShopId = this.workshopId * 1.0;
        data.macTypeId = "030100";
        data.sortColumn = "liaoji_num";
        data.sort = "asc";
        let url = "/report/getShrinkage";
        common_api(url, data,this.companyId)
          .then(response => {
            console.log(response.data);
            if(response.data.result === "ok"){
              this.machine_detail_list_length =Math.ceil(response.data.data.length/3);
              this.machine_detail_list = response.data.data;
              for (let i = 0; i < this.machine_detail_list.length; i++) {
                this.machine_detail_list[i].machineEndHours = Math.ceil((new Date(this.machine_detail_list[i].liaojiNum).getTime() - new Date().getTime())/360000)/10
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      getPrintStatus(){
        if(this.all_order_list[0].machineId||this.machineIdSelected){
          let data = {};
          data.tableName = "lm_weaving_plan_b";
          data.query = {
            js_print_code : this.barCode
          };
          data.selectFields = ["id"];
          common_api("/report/getSimpleReport", data,this.companyId)
            .then(response => {
              if(response.data.data[0]){
                this.putUpAxis();
              }else{
                if(this.all_order_list[0].lmWarpPlanDetail.workQty1){
                  let print_meter = parseInt(this.all_order_list[0].lmWarpPlanDetail.workQty1);
                  if(this.all_order_list[0].lmWarpPlanDetail.workQty2){
                    print_meter+=this.all_order_list[0].lmWarpPlanDetail.workQty2
                  }
                  if(this.all_order_list[0].lmWarpPlanDetail.workQty3){
                    print_meter+=this.all_order_list[0].lmWarpPlanDetail.workQty3
                  }
                  this.print_num = Math.ceil(print_meter/120);
                }else{
                  this.print_num = 1
                }
                this.showAddNewClothDialog = true;
              }
            })
            .catch(error => {
              console.log(error);
            });
        }else{
          this.showMachineTable = true;
        }
      },
      yieldNewBarCode(){
        if(!this.$store.state.showLoadingLog){
          this.$store.state.showLoadingLog = true;
          this.showAddNewClothDialog = false;
          let data = {};
          data.tableName = "lm_weaving_plan_b";
          data.selectFields =["bar_code","order_sheet_id"];
          data.query = {
            order_sheet_id:this.all_order_list[0].orderSheetId
          };
          common_api("/report/getSimpleReport", data,this.companyId)
            .then(response => {
              console.log(response.data.data);
              let newBarCode = "";
              if(response.data.data.length !== 0){
                let lastIndex = response.data.data.length - 1;
                let lastSeriesNo = parseInt(response.data.data[lastIndex].bar_code.slice(-2));
                let newSeriesNo = (lastSeriesNo + 1).toString();
                if(newSeriesNo.length === 1){
                  newSeriesNo = "0" + newSeriesNo;
                }
                newBarCode = "FB" + this.all_order_list[0].orderSheetNo + newSeriesNo;
              } else {
                newBarCode = "FB" + this.all_order_list[0].orderSheetNo + "01";
              }
              console.log("织造单号："+newBarCode);
              console.log(this.all_order_list[0]);

              let print_meter = parseInt(this.all_order_list[0].lmWarpPlanDetail.workQty1);
              if(this.all_order_list[0].lmWarpPlanDetail.workQty2){
                print_meter+=this.all_order_list[0].lmWarpPlanDetail.workQty2
              }
              if(this.all_order_list[0].lmWarpPlanDetail.workQty3){
                print_meter+=this.all_order_list[0].lmWarpPlanDetail.workQty3
              }
              this.newBarCode = newBarCode;
              console.log(this.print_num);
              let print_num = this.print_num;
              console.log("打印张数:"+ print_num);
              let order_detail_list = [];
              let order_list = {
                company_Id:this.companyId,
                productName: this.all_order_list[0].productName,
                machineAxis: this.all_order_list[0].machineId,
              };
              let dataObject ={};
              let addCode = "";
              for (let i = 0; i < print_num; i++) {
                dataObject ={};
                dataObject.print_count = 1 + i;
                dataObject.axisNo = this.all_order_list[0].axisNo;
                dataObject.printCode = this.barCode;
                dataObject.staff_id = this.staff_id;
                addCode = "00" + dataObject.print_count;
                dataObject.volumeSemi = addCode.substring(addCode.length-3);
                dataObject.id = this.newBarCode + dataObject.volumeSemi;
                dataObject.yieldMeterSemi = 120;
                order_detail_list.push(dataObject);
              }
              order_list.companyId = this.companyId;
              this.$refs.printClothCard.getData(order_list,order_detail_list);
              this.printClothCardReturn(order_detail_list,print_meter);
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      printClothCardReturn(order_detail_list,print_meter){
        //落布返回记录，生成织造加工单
        if(order_detail_list.length>0){
          let data={};
          data.orderId = this.all_order_list[0].orderSheetId;
          data.orderSheetId = this.all_order_list[0].orderSheetId;
          data.barCode = "PB" + this.newBarCode.substring(2);
          data.jsPrintCode = this.barCode;
          data.planDate = this.today();
          data.productId = this.getProductIdByName(this.all_order_list[0].productName);
          data.productName = this.all_order_list[0].productName;
          data.planPerson = this.staff_name;
          data.workshopId = this.workshopId;
          data.planYield = print_meter;
          let clothEaches = [];
          for (let i = 0; i < order_detail_list.length; i++) {
            clothEaches.push({
              id:order_detail_list[i].id,
              volumeSemi:order_detail_list[i].volumeSemi,
              yieldMeterSemi:"120",
              machineId:this.all_order_list[0].machineId,
              remark:""
            })
          }
          data.clothEaches = clothEaches;
          data.yarnWeaving = "";
          data.macPlans = [{
            setYieldNum: clothEaches.length,
            singleYield: "120",
            remark: ""
          }];
          warp_api("/lm-weaving-plan-b/addByPrintCode",data,this.companyId)
            .then(response => {
              console.log("addByPrintCode返回");
              console.log(response.data);
              this.putUpAxis();
            })
            .catch(error => {
              console.log(error);
            });
        }else{
          this.$message("流程未知错误，请联系管理员");
        }
      },
      getProductIdByName(name){
        let data = {};
        data.tableName = "product";
        data.selectFields =["product_id"];
        data.query = {
          product_name:name
        };
        common_api("/report/getSimpleReport", data,this.companyId)
          .then(response => {
            return response.data.data[0].product_id;
          })
          .catch(error => {
            console.log(error);
          });
      },
      //确认提交
      putUpAxis(){
        let data = {};
        data.machineId = this.all_order_list[0].machineId?this.all_order_list[0].machineId:this.machineIdSelected;
        data.printCode = this.barCode;
        let url = "/pce-mac-beam/upperBeam";
        warp_api_get(url, data,this.companyId)
          .then(response => {
            //console.log(response);
            this.$message.success("计划单提交成功");
            this.all_order_list = [];
            this.order_detail_list = [];
            this.order_list = {};
            this.barCode = "";
          })
          .catch(error => {
            console.log(error);
          });
      },
      showChangeMachine(){
        this.showMachineTable = true;
        this.machineIdSelected = ""
      },
      //更换加工单机器
      changeMachineId(){
        if(!this.$store.state.showLoadingLog){
          this.$store.state.showLoadingLog = true;
          let data = {};
          data.machineId = this.machineIdSelected;
          data.printCode = this.barCode;
          let url = "/pce-mac-beam-plan/updateMachineId";
          warp_api_get(url, data,this.companyId)
            .then(response => {
              if(response.data.result === "ok"){
                this.$message.success("更换设备成功");
                this.getDataByCardNumber(this.barCode);
              }else{
                this.$message.error("更换设备失败");
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      finishChangeMachine(){
        this.showMachineTable = false;
        this.machineIdSelected = this.machineId;
        this.machineId = "";
        this.changeMachineId();
      },
      //验证是否有织造加工单
      addBySelf(){
        if(this.order_detail_list.length>0){
          this.showAddClothDialog = true
        }else {
          this.$message.warning("未生成织造加加工单，请先提交织造加工单");
        }
      }
    },
    mounted() {
      this.getUrlMessage();
      document.querySelector('body').setAttribute('style', 'background-color:rgba(223,229,236,0.9)');//设置背景色
      this.changeWindow();
      window.onresize = () => {
        this.changeWindow();
      };
      // alert(this.scrollerWidthLeft);
    },
    computed:{
      watchLoadingState(){
        return this.$store.state.showLoadingLog;
      }
    },
    watch:{
      watchLoadingState(newVal,oldVal) {
        if(newVal){
          clearTimeout(this.$store.state.commonClock);
          let _this = this;
          this.$store.commonClock = setTimeout(function () {
            _this.$message.warning("出现异常，自动取消上一步操作");
            _this.$store.state.showLoadingLog = false;
          },5000)
        }else{
          window.clearTimeout(this.$store.state.commonClock);
          this.$store.state.commonClock = null;
        }
      }
    },
    destroyed() {

    }
  }
</script>

<style lang="less" scoped>
  .big_font{
    color: #616164;
    font-weight: bold;
    font-size: 1.2vw;
  }
  .standard_font{
    color: #616164;
    font-weight: bolder;
    font-size: 1vw;
  }
  .small_font{
    color: #616164;
    font-weight: bolder;
    font-size: 0.8vw;
  }
  .light_green{
    color: #c4ff7d;
  }
  .yellow{
    color: #fcff7b;
  }
  .dark_gray{
    color: #717171;
  }
  .dark_green{
    color: #417804;
  }
  .dark_blue{
    color: #29374b;
  }
  .dark_blue_font{
    color: #2d2662;
  }
  .left-bottomDiv{
    overflow-y: scroll;
  }
  .left-bottomDiv::-webkit-scrollbar {
    display: none;
  }
  #rightLabel td{
    height: 4vh;
  }
  .el-dialog{
    display: flex;
    flex-direction: column;
    margin:0 !important;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    /*height:600px;*/
    max-height:calc(100% - 30px);
    max-width:calc(100% - 30px);
  }
  .el-dialog .el-dialog__body{
    flex:1;
    overflow: auto;
  }
  .radioTable td{
    border:2px solid lightgray;
    border-radius:10px;
  }
</style>
<style lang="less">
  .changeMachineDiv{
    .el-input{
      width:240px!important;
      margin-left: 4px;
      font-size: 48px;
      height:96px;
    }
    .el-input__inner{
      width:240px!important;
      margin-left: 4px;
      font-size: 48px;
      height:96px;
    }
    .el-input--suffix .el-input__inner{
      width:240px!important;
      margin-left: 4px;
      font-size: 48px;
      height:96px;
    }
    .el-input__icon{
      height:100%;
    }
  }
</style>
