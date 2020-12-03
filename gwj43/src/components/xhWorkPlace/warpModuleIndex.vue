<template>
  <div @click="makeFullScreen">
    <!--经轴绑定-->
    <el-dialog
      :visible.sync="showSetAxleTable"
      width="1200px"
      append-to-body
      :close-on-click-modal="false"
    >
      <setAxleTable ref="setAxleTable" @closeSetAxleTable="closeSetAxleTable"></setAxleTable>
    </el-dialog>
    <!--生产完成-->
    <el-dialog
      :visible.sync="showSubmitTable"
      width="800px"
      append-to-body
      :close-on-click-modal="false"
    >
      <outputSubmitTable ref="outputSubmitTable" @closeSubmitTable="closeSubmitTable" @changeWorker="changeWorker"></outputSubmitTable>
    </el-dialog>
    <!--报表打印-->
    <outputPrintTable ref="outputPrintTable" @printFinished="printFinished" style="display: none"></outputPrintTable>
    <!--交换班确认-->
    <el-dialog
      :visible.sync="showChangeStaffMessage"
      width="1200px"
      append-to-body
      :close-on-click-modal="false"
    >
      <changeStaffMessage ref="changeStaffMessage"></changeStaffMessage>
    </el-dialog>
    <!--织轴操作密码确认-->
    <el-dialog
      :visible.sync="showOptionConfirmTable"
      width="1200px"
      append-to-body
      :close-on-click-modal="false"
    >

      <p style="display: inline-block;font-size: 30px">密码:</p><el-input v-model="option_code" ref="option_code"  style="font-size: 30px;width: 400px" class="standard_input" ></el-input>
      <br> <br>
      <table width="620px"  cellspacing='0' cellpadding='0' height="400px" style="display: inline-block">
        <tr v-for="indexTr in 2" >
          <td  v-for="indexTd in 5" style="text-align: center;">
            <el-button type="primary" plain style="width: 180px;height: 180px;margin-right:5px;margin-bottom: 5px" size="medium"  @click="selectTableButton(buttonList[(indexTr-1)*5+indexTd-1])">
              <p  style="font-weight: bolder;font-size: 80px;width: 100%">{{buttonList[(indexTr-1)*5+indexTd-1]}}</p>
            </el-button>
          </td>
          <td v-if="indexTr===1">
            <el-button type="primary" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px;font-weight: bolder" @click="getOptionPermission">确定</el-button>
          </td>
          <td v-if="indexTr===2">
            <el-button type="info" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px" @click="selectTableButton('退格')">退格</el-button>
          </td>
        </tr>
      </table>
    </el-dialog>
    <!--增加经轴-->
    <el-dialog
      :visible.sync="showAddAxisTable"
      width="800px"
      append-to-body
      :close-on-click-modal="false"
    >
      <div slot="title" style="font-size: 2.5vw">增加经轴</div>
      <div style="font-size: 2.5vw">
        当前轴设定产量：<span style="color: #F9243D">{{dataSelect.workQty || ""}}</span>米<br>
        当前轴完成产量：<span style="color: #F9243D">{{dataSelect.currentRealYield || ""}}</span>米<br>
        新增轴设定产量：<span style="color: #F9243D">{{dataSelect.workQty || ""}}</span>米<br>
      </div>
      <div style="width: 100%;text-align: center;margin-top: 5%">
        <el-button type="primary" style="width: 8vw;height: 8vw;margin-right:50px;margin-bottom: 5px;line-height:1.4;letter-spacing:4px" size="medium" @click="cutAxle">
          <p  style="font-weight: bolder;font-size: 2.5vw;width: 100%">确认<br>新增</p>
        </el-button>
        <el-button type="success" style="width: 8vw;height: 8vw;margin-bottom: 5px;line-height:1.4;letter-spacing:4px" size="medium" @click="showAddAxisTable = false">
          <p  style="font-weight: bolder;font-size: 2.5vw;width: 100%">取消<br>新增</p>
        </el-button>
      </div>
    </el-dialog>
    <!--修改经轴-->
    <el-dialog
      :visible.sync="showModifyAxisTable"
      width="1200px"
      append-to-body
      :close-on-click-modal="false"
    >

      <div slot="title" style="font-size: 2.5vw">修改经轴信息</div>
      <div>
        <p style="font-size: 2rem;display: inline-block">当前轴号为{{dataSelect.axisNo || "无"}},请输入轴号</p>
        <el-input v-model="axisNo" ref="axisNo"  style="font-size: 32px;width: 400px;line-height: 60px" class="standard_input" @focus="focusName = 'axisNo'"></el-input>
        <p style="font-size: 2rem;display: inline-block">当前报产米数为{{dataSelect.currentRealYield || 0}},请输入修改米长</p>
        <el-input v-model="lengthFinished" ref="lengthFinished"  style="font-size: 32px;width: 400px;line-height: 60px" class="standard_input" @focus="focusName = 'lengthFinished'"></el-input>
        <br> <br>
        <table width="1000"  cellspacing='0' cellpadding='0' height="400px" style="display: inline-block" v-show="focusName === 'lengthFinished'">
          <tr v-for="indexTr in 2" >
            <td  v-for="indexTd in 5" style="text-align: center;">
              <el-button type="primary" plain style="width: 180px;height: 180px;margin-right:5px;margin-bottom: 5px" size="medium"  @click="selectTableButton(buttonList[(indexTr-1)*5+indexTd-1])">
                <p  style="font-weight: bolder;font-size: 80px;width: 100%">{{buttonList[(indexTr-1)*5+indexTd-1]}}</p>
              </el-button>
            </td>
            <td v-if="indexTr===1">
              <el-button type="primary" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px;font-weight: bolder" @click="submitModifyAxis">确定</el-button>
            </td>
            <td v-if="indexTr===2">
              <el-button type="info" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px" @click="selectTableButton('退格')">退格</el-button>
            </td>
          </tr>
        </table>
        <table width="1100px"  cellspacing='0' cellpadding='0' height="300px" v-show="focusName === 'axisNo'">
          <tr v-for="indexTr in 3" >
            <td  v-for="indexTd in 5" style="text-align: center;">
              <el-button type="primary" plain style="width: 180px;height: 180px;margin-right:5px;margin-bottom: 5px" size="medium"  @click="selectTableButton(buttonSetting[(indexTr-1)*5+indexTd-1])">
                <p  style="font-weight: bolder;font-size: 80px;width: 100%">{{buttonSetting[(indexTr-1)*5+indexTd-1]}}</p>
              </el-button>
            </td>
            <td v-if="indexTr===1">
              <el-button type="primary" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px;font-weight: bolder" @click="submitModifyAxis">提交</el-button>
            </td>
            <td v-if="indexTr===2">
              <el-button type="danger" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px;font-weight: bolder" @click="showModifyAxisTable = false" >取消</el-button>
            </td>
            <td v-if="indexTr===3">
              <el-button type="info" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px" @click="selectTableButton('退格')">退格</el-button>
            </td>
          </tr>
        </table>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="otherProduceDialogShow"
      width="1600px"
      append-to-body
      :close-on-click-modal="false"
    >
      <otherProductTable ref="otherProductTable" :order_list="order_list"  :otherProduceDialogShow="otherProduceDialogShow" @cancel="otherProduceDialogShow=false" ></otherProductTable>
    </el-dialog>
    <!--其他产量对话框-->
    <!--头部-->
    <div style="height: 80px;background-color: #29374b;width: 100%">
      <headComponent ref="headComponent" @selectWorker="selectWorker"  @getData="getDataRefresh" @getStaffNameById="getStaffNameById"></headComponent>
    </div>
    <div :style="{height: scrollerHeight,width:scrollerWidth}" style="margin-top: 10px;">
      <div>
        <div :style="{height: scrollerHeightTop,width:scrollerWidthLeft}" style="display: inline-block">
          <el-card style="width: 100%;" :style="{height: scrollerHeightTop,width:scrollerWidthLeft}" shadow="hover">
            <div style="width: 93%;margin-left: 5%" >
              <p class="standard_font">点击下方区域即可扫码</p>
              <input v-model="barCode" :style="{height:inputHeight,paddingRight:paddingRight}" @input="batchCodeChange()"   style="display: inline-block;font-size: 30px;width: 100%"></input>
              <img :src="delete_icon"  style="display: inline-block;position: fixed" @click="barCode = ''" :style="{opacity:0.2,height:buttonHeight,left:buttonLeft,top:buttonTop}">
            </div>
          </el-card>
        </div>
        <div :style="{height: scrollerHeightTop,width:scrollerWidthLeft}" style="display: inline-block;margin-left: 10px;">

          <el-card style="width: 100%;position:relative" :style="{height: scrollerHeightTop,width:scrollerWidthRight}" shadow="hover">
            <el-button type="warning" style="height: 100px;position: absolute;top: 45px;right: 20px;    padding: 10px 40px;" size="medium" @click="otherProduceDialogShow=true">
              <div :style="{height:button_height}" style="display: inline-block">
                <p class="big_font" style="color: white;height: 70%;line-height:70%;margin-top: 12%">其他<br/><br/>产量</p>
              </div>
            </el-button>
            <table cellspacing='0' cellpadding='0' border="0" width="100%">
              <tr>
                <td style="width: 40%" class="standard_font">
                  任务单号：{{order_list.orderSheetPlan.orderSheetNo}}
                </td>
                <td style="width: 30%" class="standard_font">
                  生产米数：{{order_list.realYield}}
                </td>
                <td style="width: 30%" class="standard_font">
                  品名：{{order_list.orderSheetPlan.productName}}
                </td>
              </tr>
              <tr>
                <td style="width: 40%" class="standard_font">
                  加工单号：{{order_list.barCode}}
                </td>
                <td style="width: 30%" class="standard_font">
                  总经根数：{{order_list.orderSheetPlan.rootNumber}}
                </td>
                <td style="width: 30%" class="standard_font">
                  纱支：<span v-if="order_detail_list[0]">{{order_detail_list[0].axisInfo.yarnWeaving}}</span>
                </td>
              </tr>
              <tr>
                <td style="width: 40%" class="standard_font">
                  订单米长：{{order_list.orderSheetPlan.planYield}}
                </td>
                <td style="width: 30%" class="standard_font">
                  本班产量：
                </td>
                <td style="width: 30%" class="standard_font">
                  本班停机：{{order_list.brokenCount}}
                </td>
              </tr>
              <tr>
                <td colspan="1" class="standard_font">
                  架数：{{order_list.frameNumber}}
                </td>
                <td colspan="2" class="standard_font">
                  规格：{{order_list.orderSheetPlan.specification}}
                </td>
              </tr>
              <tr>
                <td colspan="3" class="standard_font">
                  备注：{{order_list.orderSheetPlan.remark}}
                </td>
              </tr>
            </table>
          </el-card>
        </div>
      </div>
      <div style="margin-top:10px ">
        <div :style="{height: scrollerHeightBottom,width:scrollerWidthLeft}"  style="display: inline-block" >
          <el-card style="width: 100%;" :style="{height: scrollerHeightBottom,width:scrollerWidthLeft}" shadow="hover" body-style="">
            <div class="left-bottomDiv" id="leftDiv"  :style="{height: scrollerHeightBottomDiv}" @mousedown="mousedown" @touchstart="mousedown" @mousemove="move" @mouseup="end" @touchmove.prevent="move"  @touchend="end" >
              <div class="standard_border" @click="changeByCardNumber(item)" :style="{height:label_height,backgroundColor:getLabelColor(item.status)}" v-for="item in all_order_list" :label="item.barCode" :key="item.id" style="width: 80%;display: inline-block;margin-left: 5%;margin-bottom: 10px;border-width:2px;padding: 10px" >
                <table cellspacing='0' cellpadding='0' border="0" width="100%">
                  <tr>
                    <td>
                      <p class="standard_font" style="display: inline-block;margin-top: 20px">整经单&nbsp{{item.barCode}}</p>
                      <img :src="selectedPicture" alt=""  width="40px" style="display: inline-block;" v-show="item.barCode === barCode">
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p class="standard_font">品名&nbsp{{item.orderSheetPlan.productName}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p class="standard_font">机台号&nbsp{{item.machineId}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p class="small_font">单据编号&nbsp{{item.orderSheetId}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p class="small_font">生产米数&nbsp{{item.realYield}}</p>
                    </td>
                  </tr>
                </table>
              </div>
              <div>
                <img id="left_up" :src="arrow_icon" :style="{top:upArrowTop,left:arrowLeft,width:arrowWidth}" style="position: fixed;webkit-transform: rotate(90deg);display: none" @click="left_up">
                <img id="left_down" :src="arrow_icon" :style="{top:downArrowTop,left:arrowLeft,width:arrowWidth}" style="position: fixed;webkit-transform: rotate(-90deg)" @click="left_down">
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
              <div class="standard_border"  :id="'rightLabel'+ item.id" :style="{height:label_height_right}" v-for="item in order_detail_list" :label="item.axisNo" :key="item.id" style="width: 92%;margin-bottom: 10px;border-width:2px;padding: 10px"  @click="rightLabelClick(item)">
                <table id="rightLabel" cellspacing='0' cellpadding='0' border="0" width="100%"  style="height: 100px;overflow-y: scroll">
                  <tr>
                    <td style="width: 25%">
                      <!--<p class="big_font">轴号：{{item.axisNo}}</p>-->
                      <p class="big_font">序号：{{item.index}}</p>
                    </td>
                    <td style="width: 25%">
                      <p class="big_font">计划米长：{{item.workQty}}</p>
                    </td>
                    <td style="width: 40%" rowspan="3">
                      <el-button :style="{backgroundColor:getColor(item.status,[0,null])}" style="height: 80px;display: inline-block" :disabled="item.status!==0&&item.status!==null" @click="setAxle(item)">
                        <div :style="{height:button_height}" style="display: inline-block">
                          <p class="big_font" style="color: white;height: 60%;line-height:60%;margin-top: 20%">经轴绑定</p>
                        </div>
                      </el-button>
                      <el-button :style="{backgroundColor:getColor(item.status,[4,1])}" style="height: 80px;display: inline-block" :disabled="(item.status===0||item.status===3||item.status===3||item.status===null)" @click="submit(item)">
                        <div :style="{height:button_height}" style="display: inline-block">
                          <p class="big_font" style="color: white;height: 60%;line-height:60%;margin-top: 20%">生产完成</p>
                        </div>
                      </el-button>
                      <el-popover
                        placement="top"
                        width="600"
                        style="margin-left: 10px"
                        trigger="click">
                        <el-button slot="reference" :style="{backgroundColor:getColor(item.status,[null])}" style="height: 80px;display: inline-block" v-show="item.status===null">
                          <div :style="{height:button_height}" style="display: inline-block">
                            <p class="big_font" style="color: white;height: 60%;line-height:60%;margin-top: 20%">删除织轴</p>
                          </div>
                        </el-button>
                        <div style="width: 100%;text-align: center">
                          <div class="big_font">这条经轴的设定米长是{{item.workQty}}米，确定要删除吗</div>
                          <br><br>
                          <el-button type="danger" style="height: 80px;margin-right:5px;margin-bottom: 5px" size="medium" @click="cutDownAxle(item)">
                            <p  style="font-weight: bolder;font-size: 1.5vw;width: 100%">确认删除</p>
                          </el-button>
                        </div>
                      </el-popover>
                      <el-popover
                        placement="top"
                        width="800"
                        trigger="click">
                        <table style="" cellpadding='0' border="0" width="100%">
                          <tr v-for="details in produce_details_list" :key="details.id">
                            <td class="big_font">
                              {{details.updateTime}}
                            </td>
                            <td class="big_font">
                              {{details.axisAction.actionName}}
                            </td>
                            <td class="big_font">
                              当时米长{{details.realYield}}米
                            </td>
                            <td class="big_font">
                              生产人员：{{details.staffName}}
                            </td>
                          </tr>
                        </table>
                        <div style="text-align: center">
                          <el-button :style="{backgroundColor:getColor(item.status,[2,3])}" style="height: 80px;display: inline-block" v-show="(item.status===2||item.status===3)" @click="addAxis(item)">
                            <div :style="{height:button_height}" style="display: inline-block">
                              <p class="big_font" style="color: white;height: 60%;line-height:60%;margin-top: 20%">增加经轴</p>
                            </div>
                          </el-button>
                          <el-button :style="{backgroundColor:getColor(item.status,[1,2,3])}" style="height: 80px;display: inline-block" v-show="(item.status===1||item.status===2||item.status===3)" @click="modifyAxis(item)">
                            <div :style="{height:button_height}" style="display: inline-block">
                              <p class="big_font" style="color: white;height: 60%;line-height:60%;margin-top: 20%">修改经轴</p>
                            </div>
                          </el-button>
                          <el-button :style="{backgroundColor:getColor(item.status,[2,3])}" style="height: 80px;display: inline-block" v-show="(item.status===2||item.status===3)" @click="print(item)">
                            <div :style="{height:button_height}" style="display: inline-block">
                              <p class="big_font" style="color: white;height: 60%;line-height:60%;margin-top: 20%">打印报表</p>
                            </div>
                          </el-button>
                        </div>
                        <el-button :style="{backgroundColor:getColor(item.status,[1,2,3,4])}" style="height: 80px;display: inline-block;background-color: #417804" slot="reference" :disabled="item.status===0||item.status===null" v-show="item.status!==null" @click="showDetails(item)">
                          <div :style="{height:button_height}" style="display: inline-block">
                            <p class="big_font" style="color: white;height: 60%;line-height:60%;margin-top: 20%">更多操作</p>
                          </div>
                        </el-button>
                      </el-popover>
                    </td>
                  </tr>
                  <tr>
                    <td style="">
                      <!--<p class="big_font">纱支：{{item.axisInfo.yarnWeaving}}</p>-->
                      <p class="big_font">轴号：{{item.axisNo}}</p>
                    </td>
                    <td>
                      <p class="big_font">头份：{{item.totalWarpNumber}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p class="big_font">机器ID：{{item.axisInfo.machineId}}</p>
                    </td>
                    <td>
                      <p class="big_font">轴总产量：{{item.totalRealYield}}</p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { warp_api,warp_api_get,realOutput_api } from "../../../static/api/api.js";
  import headComponent from './mainHead.vue';
  import setAxleTable from './warpSetAxle.vue';
  import outputSubmitTable from './produceComfirm.vue';
  import outputPrintTable from './../warpCardPrint.vue';
  import otherProductTable from './otherProductTable.vue';

  import changeStaffMessage from './changeStaffMessage.vue';
  import screenfull from "screenfull"
  export default {
    components:{headComponent,setAxleTable,outputSubmitTable,outputPrintTable,changeStaffMessage,otherProductTable},
    data () {
      return {
        otherProduceDialogShow:false,
        buttonSetting:"JXAHB",
        companyId:10000015,
        scrollerHeight:null,
        scrollerWidth:null,
        scrollerHeightTop:null,
        scrollerHeightBottom:null,
        scrollerHeightBottomDiv:null,
        scrollerWidthLeft:null,
        scrollerWidthRight:null,
        label_height:null,
        label_height_right:null,
        inputHeight:null,
        inputWidth:null,
        buttonHeight:null,
        button_height:null,
        all_order_list:[],
        order_list:{
          "orderSheetPlan": {}
        },
        order_detail_list:[],
        barCode:null,
        batchCodeNow:null,
        showSetAxleTable:false,
        showSubmitTable:false,
        fontPercent:false,
        delete_icon:require("../../../static/picture/delete.png"),
        arrow_icon:require("../../../static/picture/arrow2.png"),
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
        produce_details_list:[],
        selectId:null,
        selectedPicture:require("../../../static/picture/select.png"),
        workshopId:null,
        showChangeStaffMessage:false,
        clock:null,
        clickedRightLabel:null,
        scrollTop:false,
        printStaffName:null,
        optionConfirm:false,//用于判断织轴操作权限
        showOptionConfirmTable:false,
        buttonList:"1234567890",
        option_code:"",
        showAddAxisTable:false,
        dataSelect:{},
        lengthFinished:"",
        axisNo:"",
        focusName:"",//用于判断键盘输入对象
        showModifyAxisTable:false,
        funcName:null,
        machineId:null
      }
    },
    methods:{
      getUrlMessage(){
        let params = this.$route.params.params.split(",");
        let message = params[0];
        this.companyId = params[1];
        this.workshopId = params[2];
        this.machineId = params[3];
        this.$store.state.workshopId = this.workshopId;
        this.buttonSetting = "123"+message[0]+message[1]+"456"+message[2]+message[3]+"7890"+message[4];
        this.$refs.headComponent.sendMachineType("040000",this.workshopId);
        this.getData();
      },
      changeWindow(){
        this.scrollerHeight = (window.innerHeight*0.98 -90) + "px";
        this.scrollerWidth = (window.innerWidth -10) + "px";
        this.scrollerHeightTop = ((window.innerHeight*0.98 -80) -20)*0.25 +"px";
        this.scrollerHeightBottom = ((window.innerHeight*0.98 -80) -20)*0.75 +"px";
        this.scrollerHeightBottomDiv = ((window.innerHeight*0.98 -80) -20)*0.75 -35 +"px";
        this.scrollerWidthLeft = ((window.innerWidth -10)-10)*0.25 +"px";
        this.scrollerWidthRight = ((window.innerWidth -10)-10)*0.75 +"px";
        this.inputHeight = ((window.innerHeight*0.98 -80) -20)*0.25 - 70+"px";
        this.buttonTop =  (((window.innerHeight*0.98 -80) -20)*0.25 - 70)/3+115+window.innerWidth*0.01+"px";
        this.buttonLeft = ((window.innerWidth -10)-10)*0.25*0.93-(((window.innerHeight*0.98 -80) -20)*0.25 - 70)/2+"px";
        this.paddingRight = ((window.innerWidth -10)-10)*0.25*0.02+(((window.innerHeight*0.98 -80) -20)*0.25 - 70)/2+"px";
        this.inputWidth = ((window.innerWidth -10)-10)*0.25*0.95*0.8 +"px";
        this.buttonHeight = (((window.innerHeight*0.98 -80) -20)*0.25 - 70)/2.5 + "px";
        this.label_height =(((window.innerHeight*0.98 -80) -20)*0.75 - 65)/3 + "px";
        this.label_height_right = (((window.innerHeight*0.98 -80) -20)*0.75 - 64)/4 + "px";//window.innerHeight*3*0.025 + 70 + "px";
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
        let url = "/lm-zjwarp-plan-b/selectZjWithOrderSheetRecent";
        data.workshopId = this.workshopId;
        data.pageSize = 1000;
        data.machineId =this.machineId;
        warp_api_get(url, data,this.companyId)
          .then(response => {
            // console.log(response.data.data);
            for (let i = 0; i < response.data.data.records.length; i++) {
              response.data.data.records[i].machineId = "";
              for (let j = 0; j < response.data.data.records[i].axisInfos.length; j++) {
                if(i !== 0&&response.data.data.records[i].machineId!==""&&response.data.data.records[i].machineId.indexOf(response.data.data.records[i].axisInfos[j].machineId)){
                  response.data.data.records[i].machineId += ","
                }
                if(response.data.data.records[i].axisInfos[j].machineId&&response.data.data.records[i].machineId.indexOf(response.data.data.records[i].axisInfos[j].machineId)=== -1){
                  response.data.data.records[i].machineId += response.data.data.records[i].axisInfos[j].machineId
                }
              }
            }
            this.all_order_list = response.data.data.records;
            this.order_list = response.data.data.records[0];
            this.getDetails(response.data.data.records[0].id)
          })
          .catch(error => {
            console.log(error);
          });
      },
      getDetails(warpPlanId){
        let data = {};
        data.warpPlanId = warpPlanId;
        let url = "/lm-zjwarp-plan-detail/selectZjDetailByWarpPlanId";
        warp_api(url, data,this.companyId)
          .then(response => {
            //  console.log(response.data.data.details);
            //==============增加小轴==============
            // let order_detail_list = response.data.data.details;
            // let final_list = [];
            // let object = {};
            // for (let i = 0; i < order_detail_list.length; i++) {
            //   object = JSON.parse(JSON.stringify(order_detail_list[i]));
            //   if(!final_list[object.smallBeamBelong]){
            //     final_list[object.id] = [];
            //     object.index = i + 1;
            //     final_list[object.id].push(object);
            //   }else{
            //     object.index = final_list[object.smallBeamBelong][0].index + "--" + final_list[object.smallBeamBelong].length;
            //     final_list[object.smallBeamBelong].push(object);
            //   }
            // }
            // this.order_detail_list = final_list.flat();
            //==============增加小轴==============
            this.order_detail_list = response.data.data.details;
            for (let i = 0; i < this.order_detail_list.length; i++) {
              this.order_detail_list[i].index = i + 1;
            }
            if(this.scrollTop){
              document.getElementById("right_down").style.display = "inline-block";
              document.getElementById("left_down").style.display = "inline-block";
              //document.getElementById("right_up").style.display = "none";
            }
            //document.getElementById("left_up").style.display = "none";
            this.clickedRightLabel = null;
            this.$store.state.showLoadingLog = false;
          })
          .catch(error => {
            console.log(error);
          });
      },
      getDataByCardNumber(barCode){
        // console.log("查询");
        //this.barCode = barCode;
        this.barCode = barCode;
        let data = {};
        data.barCode = barCode;
        data.workshopId = this.workshopId;
        data.pageSize = 10000;
        data.machineId = this.machineId;
        let url = "/lm-zjwarp-plan-b/selectZjWithOrderSheetRecent";
        warp_api_get(url, data,this.companyId)
          .then(response => {
            // console.log(response.data.data);
            for (let i = 0; i < response.data.data.records.length; i++) {
              response.data.data.records[i].machineId = "";
              for (let j = 0; j < response.data.data.records[i].axisInfos.length; j++) {
                if(i !== 0&&response.data.data.records[i].machineId!==""&&response.data.data.records[i].machineId.indexOf(response.data.data.records[i].axisInfos[j].machineId)){
                  response.data.data.records[i].machineId += ","
                }
                if(response.data.data.records[i].axisInfos[j].machineId&&response.data.data.records[i].machineId.indexOf(response.data.data.records[i].axisInfos[j].machineId)=== -1){
                  response.data.data.records[i].machineId += response.data.data.records[i].axisInfos[j].machineId
                }
              }
            }
            if(response.data.data.records.length>0) {
              this.order_list = response.data.data.records[0];
              this.getDetails(response.data.data.records[0].id)
            }else{
              this.$message.warning("二维码错误或当前车间不存在这条记录");
            }
            if(this.scrollTop){
              document.getElementById("rightDiv").scrollTop = 0
            }
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
      searchCode(){
        if(this.batchCodeNow){
          if((this.barCode.length - this.batchCodeNow.length)>1){
            if(this.batchCodeNow!== this.barCode.substr(0-this.batchCodeNow.length)){
              this.batchCodeNow = this.barCode;
              this.shiftToTop();
              this.getDataByCardNumber(this.batchCodeNow);
            }else{
              this.$message.warning("重复扫码");
              this.barCode = this.batchCodeNow;
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
        document.getElementById("left_down").style.display = "inline-block";
        // document.getElementById("right_up").style.display = "none";
        // document.getElementById("left_up").style.display = "none";
      },
      shiftToTop(){
        for(let i in this.all_order_list){
          if(this.all_order_list[i].barCode === this.barCode){
            this.all_order_list.unshift(this.all_order_list.splice(i , 1)[0]);
          }
        }
        document.getElementById("leftDiv").scrollTop = 0;
      },
      closeSetAxleTable(emitData){
        if(emitData.status){
          let data = {};
          data.id = this.dataSelect.id;
          data.axisNo = emitData.axleNumber;
          data.staffId = this.staff_id;
          let shiftObject = this.$refs.headComponent.getShiftName();
          if(shiftObject&&shiftObject.id){
            data.shiftWork = shiftObject.id-1;
            data.shiftStartDatetime = this.addDate(shiftObject.startTime);
            data.shiftEndDatetime =  this.addDate(shiftObject.endTime);
          }
          let url = "/lm-zjwarp-plan-detail/zjSpindle";
          warp_api(url, data,this.companyId)
            .then(response => {
              if(response.data.result === "fail"){
                let message =response.data.successMessage;
                this.$message.warning(message);
              }else {
                this.$message.success(response.data.successMessage);
                this.showSetAxleTable = false;
                this.getDataByCardNumber(this.barCode);
                this.scrollTop = false;
              }
              this.$store.state.showLoadingLog = false;
            })
            .catch(error => {
              console.log(error);
            });
        }else{
          this.showSetAxleTable = false;
        }
      },
      submit(item){
        //console.log(this.staff_id);
        if(this.staff_id){
          let data = {};
          // console.log(item);
          this.dataSelect = item;
          data.machineId = item.axisInfo.machineId;
          data.workshopId = this.workshopId;
          let url = "/warp/getXHBoardWarp";
          realOutput_api(url, data,this.companyId)
            .then(response => {
              // console.log(this.staff_id);
              // console.log(this.dataSelect.currentStaffId);
              this.$store.state.ifShift = !(this.staff_id == this.dataSelect.currentStaffId);
              if(response.data.data.currentLength){
                this.dataSelect.actualYarnLength = response.data.data.currentLength;
              }else{
                this.$message.warning("没有读取到米数，请手动输入");
                this.dataSelect.actualYarnLength = 0;
              }
              this.dataSelect.staff_id = this.staff_id;
              this.dataSelect.staff_name = this.staff_name;
              this.showSubmitTable = true;
              this.$nextTick(() => {
                this.$refs.outputSubmitTable.getData(this.dataSelect,this.order_detail_list);
              });
            })
            .catch(error => {
              console.log(error);
            });
        }else{
          this.$message.warning("请选择操作员工");
        }
      },
      setAxle(item){
        if(this.staff_name){
          this.dataSelect = item;
          this.showSetAxleTable = true;
          this.$nextTick(() => {
            this.$refs.setAxleTable.getButtonList(this.buttonSetting);
          });
        }else{
          this.$message.warning("请选择操作员工");
        }
      },
      getStaffNameById(staff_name){
        this.printStaffName = staff_name;
      },
      print(item){
        if(!this.$store.state.showLoadingLog){
          if(this.staff_id){
            this.$store.state.showLoadingLog = true;
            this.dataSelect = item;
            this.$refs.headComponent.getStaffNameById(this.dataSelect.currentStaffId*1.0);
            this.dataSelect.staff_name = this.printStaffName;
            let data = {};
            data.id = this.dataSelect.id;
            data.staffId = this.staff_id;
            let url = "/lm-zjwarp-plan-detail/printingZj";
            warp_api(url,data,this.companyId)
              .then(response => {
                this.$store.state.showLoadingLog = false;
                //  this.$message.success("开始打印");
                if(response.data.result === "fail"){
                  let message =response.data.successMessage;
                  this.$message.warning(message);
                }else {
                  this.dataSelect.printCode = response.data.data;
                  this.$nextTick(() => {
                    if (!this.dataSelect.actualYarnLength) {
                      this.dataSelect.actualYarnLength = this.dataSelect.workQty1 + this.dataSelect.workQty2 + this.dataSelect.workQty3;
                    }
                  //  if(this.companyId !== "10000015"){
                      this.$refs.outputPrintTable.startPrint(this.order_list, this.dataSelect, this.companyId);
                   // }
                  })
                }
              })
              .catch(error => {
                console.log(error);
              });
          }else{
            this.$message.warning("请选择操作员工");
          }
        }
      },
      closeSubmitTable(emitData){
        //console.log(this.staff_id);
        if(emitData.status!==null){
          let data = {};
          data.id = this.dataSelect.id;
          data.machineId = this.dataSelect.axisInfo.machineId;
          data.empIds =  this.staff_id;
          data.workQtys = emitData.data;
          this.dataSelect.actualYarnLength =  emitData.data;
          data.typeId = emitData.status;
          let finalData = [];
          finalData.push(data);
          let url = "/lm-zjwarp-plan-detail/zjReport";
          warp_api(url, finalData,this.companyId)
            .then(response => {
              this.$store.state.showLoadingLog = false;
              // console.log(response);
              if(response.data.result === "fail"){
                let message =response.data.successMessage;
                this.$message.warning(message);
              }else{
                this.getDataByCardNumber(this.barCode);
                if(emitData.step === 2){
                  this.print(this.dataSelect);
                }
                this.scrollTop = false;
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
        this.showSubmitTable = false
      },
      printFinished(){

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
      left_up(){
        if(document.getElementById("leftDiv").scrollTop-parseInt(this.label_height)*3-60>=0){
          document.getElementById("leftDiv").scrollTop-= (parseInt(this.label_height)*3+60);
          document.getElementById("left_down").style.display = "inline-block";
        }else{
          document.getElementById("leftDiv").scrollTop = 0;
          document.getElementById("left_up").style.display = "none";
        }
      },
      left_down(){
        if(document.getElementById("leftDiv").scrollTop+parseInt(this.label_height)*3+46<=document.getElementById("leftDiv").scrollHeight){
          document.getElementById("leftDiv").scrollTop+= (parseInt(this.label_height)*3+46);
          document.getElementById("left_up").style.display = "inline-block";
        }else{
          document.getElementById("leftDiv").scrollTop = document.getElementById("leftDiv").scrollHeight;
          document.getElementById("left_down").style.display = "none";
        }
      },
      right_up(){
        if(document.getElementById("rightDiv").scrollTop-parseInt(this.label_height)*3-60>=0){
          document.getElementById("rightDiv").scrollTop-= (parseInt(this.label_height)*3+60);
          document.getElementById("right_down").style.display = "inline-block";
        }else{
          document.getElementById("rightDiv").scrollTop = 0;
          //  document.getElementById("right_up").style.display = "none";
        }
      },
      right_down(){
        if(document.getElementById("rightDiv").scrollTop+parseInt(this.label_height)*3+46<=document.getElementById("rightDiv").scrollHeight){
          document.getElementById("rightDiv").scrollTop+= (parseInt(this.label_height)*3+46);
          document.getElementById("right_up").style.display = "inline-block";
        }else{
          document.getElementById("rightDiv").scrollTop = document.getElementById("rightDiv").scrollHeight;
          // document.getElementById("right_down").style.display = "none";
        }
      },
      showDetails(item){
        let data = {};
        data.beamName = item.axisNo;
        data.warpPlanId = this.order_list.id;
        data.process = "2";
        //  console.log(data);
        let url = "/warp-axis-record-his/selectZjAxisRecords";
        warp_api_get(url, data,this.companyId)
          .then(response => {
            //console.log(response);
            this.produce_details_list = response.data.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      makeFullScreen(){
        // if(this.isFirstTime){
        //   screenfull.toggle();
        //   this.isFirstTime = false;
        // }
      },
      selectWorker(workerId,name){
        this.staff_id = workerId;
        this.staff_name = name;
        let data = {};
        let url = "/lm-zjwarp-plan-b/selectZjWithOrderSheetRecent";
        data.workshopId = this.workshopId;
        //data.staffId = this.staff_id;
        warp_api_get(url, data,this.companyId)
          .then(response => {
            //console.log(response.data.data.records);
            let finalData = [];
            for (let i = 0; i < response.data.data.records.length; i++) {
              for (let j = 0; j < response.data.data.records[i].lmZjwarpPlanDetailDTOS.length; j++) {
                finalData.push(response.data.data.records[i].lmZjwarpPlanDetailDTOS[j])
              }
            }
            //this.$refs.changeStaffMessage.getData(finalData);
          })
          .catch(error => {
            console.log(error);
          });
        //this.showChangeStaffMessage = true;
      },
      changeByCardNumber(item){
        this.order_list = item;
        this.getDataByCardNumber(item.barCode)
      },
      addDate(time){
        let date =  new Date();
        let month = date.getMonth()+1;
        if(month<10){
          month="0"+month
        }
        let day = date.getDate();
        if(day<10){
          day="0"+day
        }
        return date.getFullYear()+"-"+month+"-"+day+" "+time;
      },
      rightLabelClick(item){
        this.dataSelect = item;
        if(this.clickedRightLabel){
          document.getElementById("rightLabel" + this.clickedRightLabel).style.backgroundColor = "white";
        }
        this.clickedRightLabel = item.id;
        document.getElementById("rightLabel" +this.clickedRightLabel).style.backgroundColor = "#c4ff7d";
        //this.clickDetailsChangeStaff(item);//点击切换员工
      },
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
      addAxis(item){
        this.dataSelect = item;
        if(this.optionConfirm){
          // if(this.dataSelect.workQty > this.dataSelect.currentRealYield){
          this.dataSelect.newAddQty = this.dataSelect.workQty - this.dataSelect.currentRealYield;
          this.showAddAxisTable = true;
          // }else{
          //   this.$message.warning("当前轴已完成产量大于设定产量，无法增轴")
          // }
          // console.log(this.dataSelect);
        }else{
          this.showOptionConfirmTable = true;
          this.focusName = "option_code";
          this.funcName = "addAxis"
        }
      },
      selectTableButton(buttonName){
        if(this.focusName === "option_code"){
          this.option_code+="";
          if(buttonName === "退格"){
            this.option_code = this.option_code.substring(0,this.option_code.length-1)
          }else{
            this.option_code += buttonName;
          }
          this.$refs.option_code.focus();
        }
        else if(this.focusName === "lengthFinished"){
          this.lengthFinished+="";
          if(buttonName === "退格"){
            this.lengthFinished = this.lengthFinished.substring(0,this.lengthFinished.length-1)
          }else{
            this.lengthFinished += buttonName;
          }
          this.$refs.lengthFinished.focus();
        }
        else if(this.focusName === "axisNo"){
          this.axisNo+="";
          if(buttonName === "退格"){
            this.axisNo = this.axisNo.substring(0,this.axisNo.length-1)
          }else{
            this.axisNo += buttonName;
          }
          this.$refs.axisNo.focus();
        }
      },
      getOptionPermission(){
        this.$message.success("已获取操作权限");
        this.optionConfirm = true;
        this.showOptionConfirmTable = false;
        this.funcContinue();
        // if(this.option_code === "7777777"){
        //   this.$message.success("已获取操作权限");
        //   this.optionConfirm = true;
        //   this.showOptionConfirmTable = false;
        // }else{
        //   this.$message.error("密码错误，请重新输入");
        //   this.option_code = ""
        // }
      },
      cutAxle(){
        if(!this.$store.state.showLoadingLog){
          let data = {};
          data.id = this.dataSelect.smallBeamBelong?this.dataSelect.smallBeamBelong:this.dataSelect.id;
          let url = "/lm-zjwarp-plan-detail/addSmallBeam";
          warp_api(url, data,this.companyId)
            .then(response => {
              //console.log(response.data);
              if(response.data.result === "ok"){
                this.showAddAxisTable = false;
                this.$message.success(response.data.message);
                this.getDetails(this.order_list.id);
              }else{
                this.$message.success("新增经轴失败")
              }
              this.$store.state.showLoadingLog = false;
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      modifyAxis(item){
        this.dataSelect = item;
        if(this.optionConfirm){
          this.showModifyAxisTable = true;
          this.focusName = "axisNo";
        }else{
          this.showOptionConfirmTable = true;
          this.focusName = "option_code";
          this.funcName = "modifyAxis"
        }
      },
      submitModifyAxis(){
        if(!this.$store.state.showLoadingLog){
          this.$store.state.showLoadingLog = true;
          if(this.lengthFinished.length>0){
            let data = {};
            data.id = this.dataSelect.id;
            data.workQtys = this.lengthFinished*1.0;
            let url = "/lm-zjwarp-plan-detail/updateReport";
            warp_api(url, data,this.companyId)
              .then(response => {
                if(response.data.result === "ok"){
                  this.$message.success("修改米数成功");
                  this.lengthFinished = "";
                  this.showModifyAxisTable = false;
                  this.getDetails(this.order_list.id);
                }else{
                  this.$message.error(response.data.successMessage);
                  this.$store.state.showLoadingLog = false;
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
          if(this.axisNo.length>0){
            console.log(this.dataSelect);
            let data = {};
            data.id = this.dataSelect.id;
            data.axisNo = this.axisNo;
            data.staffId = this.staff_id;
            let url = "/lm-zjwarp-plan-detail/updateSpindle";
            warp_api(url, data,this.companyId)
              .then(response => {
                if(response.data.result === "ok"){
                  this.$message.success("修改轴号成功");
                  this.axisNo = "";
                  this.showModifyAxisTable = false;
                  this.getDetails(this.order_list.id);
                }else{
                  this.$message.error(response.data.successMessage);
                  this.$store.state.showLoadingLog = false;
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        }
      },
      funcContinue(){
        //权限统一转接口
        if(this.funcName === "modifyAxis"){
          this.modifyAxis(this.dataSelect);
        }else if(this.funcName === "addAxis"){
          this.addAxis(this.dataSelect);
        }
        this.funcName = null;
      },
      changeWorker(){
        this.$refs.headComponent.changeWorker();
      }
      // clickDetailsChangeStaff(item){
      //   if(this.selectId!== item.id){
      //     this.selectId = item.id;
      //     if(item.currentStaffId){
      //       this.staff_id = item.currentStaffId;
      //     }
      //     this.$refs.headComponent.changeStaff(this.staff_id);
      //   }
      // }
    },
    mounted() {
      this.getUrlMessage();
      this.$refs.headComponent.getWorker("/s-staff-organization-relation/getZjStaff");
      document.querySelector('body').setAttribute('style', 'background-color:rgba(223,229,236,0.9)');//设置背景色
      this.changeWindow();
      window.onresize = () => {
        this.changeWindow();
      };
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
            //_this.$message.warning("出现异常，自动取消上一步操作");
            _this.$store.state.showLoadingLog = false;
          },15000)
        }else{
          clearTimeout(this.$store.state.commonClock);
          this.$store.state.commonClock = null;
        }
      }
    },
    destroyed() {

    }
  }
</script>

<style lang="less" scoped>
  .otherProduct{
    width: 13rem;
    height: 8rem;
    background: red;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 2rem;
    top: 2rem;
    font-weight: 600;
  }
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
  .el-input__inner{

  }
</style>
<style lang="less">
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
</style>
