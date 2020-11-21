<template>
  <!--新穿综页面-->
  <div>
    <el-dialog
      :visible.sync="changeReedTable"
      width="1200px"
      append-to-body
      :close-on-click-modal="false"
    >
    <p style="display: inline-block;font-size: 30px">输入想要更换的筘号</p>
    <el-input ref="reedNum" v-model="reedNum" style="display: inline-block;width: 500px;font-size: 30px" @focus="changeFocus('reedNum')"></el-input>
      <table width="620px"  cellspacing='0' cellpadding='0' height="400px" style="margin-top: 20px;display: inline-block">
        <tr v-for="indexTr in 2" >
          <td  v-for="indexTd in 5" style="text-align: center;">
            <el-button type="primary" plain style="width: 180px;height: 180px;margin-right:5px;margin-bottom: 5px" size="medium"  @click="selectTableButton(buttonList[(indexTr-1)*5+indexTd-1])">
              <p  style="font-weight: bolder;font-size: 80px;width: 100%">{{buttonList[(indexTr-1)*5+indexTd-1]}}</p>
            </el-button>
          </td>
          <td v-if="indexTr===1">
            <el-button type="primary" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px" @click="changeReedNumber">确定</el-button>
          </td>
          <td v-if="indexTr===2">
            <el-button type="info" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px" @click="selectTableButton('退格')">退格</el-button>
          </td>
        </tr>
      </table>
    </el-dialog>
    <!--选择计划-->
    <el-dialog
      :visible.sync="showBindingPlanTable"
      width="1600px"
      append-to-body
      :close-on-click-modal="false"
    >
      <div style="text-align: center">
        <p style="font-size: 3rem">穿综计划列表</p>
      </div>
      <div style="height: 600px;overflow-y: auto">
        <div class="standard_border"  :style="{height:label_height_right}" v-for="item in wear_order_list" v-if="item.finishBeamNum<item.beamNum" :label="item.id" :key="item.id" style="margin-bottom: 10px;border-width:2px;padding: 10px">
          <table  cellspacing='0' cellpadding='0' border="0" width="100%"  style="height: 100%;overflow-y: scroll;text-align: center">
            <tr>
              <td class="big_font" style="width: 20%">
                序号{{item.id}}
              </td>
              <td class="big_font"  style="width: 20%">
                已绑定/总量：{{item.finishBeamNum}}/{{item.beamNum}}
              </td>
              <td class="big_font"  style="width: 20%">
                品名：{{order_list.orderSheetPlan.productName}}
              </td>
              <td class="big_font"  style="width: 20%">
                筘号：{{item.reed_no}}
              </td>
              <td style="width: 20%">
                <el-button type="success"  class="rectangleButton" @click="bindingPlan(item)">
                  <p  class="middleButtonFont">绑定计划</p>
                </el-button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </el-dialog>
    <!--头部-->
    <div style="height: 80px;background-color: #29374b;width: 100%">
      <headComponent ref="headComponent" @selectWorker="selectWorker"></headComponent>
    </div>
    <div :style="{height: scrollerHeight,width:scrollerWidth}" style="margin-top: 10px;">
      <div>
        <div :style="{height: scrollerHeightTop,width:scrollerWidthLeft}" style="display: inline-block">
          <el-card style="width: 100%;" :style="{height: scrollerHeightTop,width:scrollerWidthLeft}" shadow="hover">
            <div style="width: 93%;margin-left: 5%" >
              <p class="standard_font">点击下方区域即可扫码</p>
              <input v-model="batchCode" :style="{height:inputHeight,paddingRight:paddingRight}" @input="batchCodeChange()"   style="display: inline-block;font-size: 30px;width: 100%"></input>
              <img :src="delete_icon"  style="display: inline-block;position: fixed" @click="batchCode = ''" :style="{opacity:0.2,height:buttonHeight,left:buttonLeft,top:buttonTop}">
            </div>
          </el-card>
        </div>
        <div :style="{height: scrollerHeightTop,width:scrollerWidthLeft}" style="display: inline-block;margin-left: 10px">
          <el-card style="width: 100%;" :style="{height: scrollerHeightTop,width:scrollerWidthRight}" shadow="hover">
            <table cellspacing='0' cellpadding='0' border="0" width="100%">
              <tr>
                <td style="width: 40%" class="standard_font">
                  织轴卡号：{{order_list.orderSheetPlan.orderSheetNo}}
                </td>
                <td style="width: 30%" class="standard_font">
                  品名：{{order_list.orderSheetPlan.productName}}
                </td>
                <td rowspan="6" style="width: 300px;border-width: 3px;"   @click="changeReed">
                  <div style="width: 100%;margin-top:-15px;margin-left: 20px" :style="{height:scrollerHeightRightButton}">
                    <div style="width: 100%;background-color: #29374b;height: 22%">
                      <p class="big_font" style="text-align: center;color:white">更换筘号</p>
                    </div>
                    <div style="height: 80%;" class="standard_font">
                      {{order_list.reedNumber}}
                    </div>
                    <div style="width: 100%;background-color: #e5e6e9;height: 25%">
                      <p class="big_font" >点击此区域更换筘号</p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="width: 40%" class="standard_font">
                  总经根数：{{order_list.orderSheetPlan.rootNumber}}
                </td>
                <td style="width: 30%" class="standard_font">
                  米长：<span v-if="order_list.lmWarpPlanDetail">{{order_list.lmWarpPlanDetail.workQty}}</span>
                </td>
              </tr>
              <tr>
                <td style="width: 40%" class="standard_font" >
                  轴号：<span v-if="order_list.lmWarpPlanDetail">{{order_list.lmWarpPlanDetail.axisNo}}</span>
                </td>
              </tr>
            </table>
          </el-card>
        </div>
      </div>
      <div style="margin-top:10px ">
        <div :style="{height: scrollerHeightBottom,width:scrollerWidthLeft}"  style="display: inline-block" >
          <el-card style="width: 100%;" :style="{height: scrollerHeightBottom,width:scrollerWidthLeft}" shadow="hover" body-style="">
            <div class="left-bottomDiv" id="leftDiv"  style="height: 90%" @mousedown="mousedown" @touchstart="mousedown" @mousemove="move" @mouseup="end" @touchmove.prevent="move"  @touchend="end" >
              <div class="standard_border" @click="changeByCardNumber(item)" :style="{height:scrollerHeightBottomDiv,backgroundColor:getLabelColor(item.status)}" v-for="item in all_order_list" :label="item.batchCode" :key="item.id" style="width: 90%;display: inline-block;margin-left: 5%;margin-bottom: 10px;border-width:2px;padding: 10px" >
                <table cellspacing='20px' cellpadding='20px' border="0" width="100%">
                  <tr>
                    <td colspan="2" style="border-bottom: 1px solid lightgray">
                      <p style="display: inline-block;margin-top: 5px;font-size: 1.8vw;font-weight: bolder">穿综加工单&nbsp</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <p class="standard_font" style="font-size: 1.2vw;font-weight: bolder">{{item.printCode}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <p class="standard_font" style="font-size: 1.5vw;font-weight: bolder">实际机台：&nbsp{{item.machineId || null}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <p class="standard_font" style="font-size: 1.5vw;font-weight: bolder">总经根数：&nbsp{{item.rootNumber}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <p class="standard_font" style="font-size: 1.5vw;font-weight: bolder">品种：&nbsp{{item.productName}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-popover
                        placement="top"
                        width="480"
                        style="margin-left: 10px"
                        title="穿综机台"
                        trigger="click">
                        <div style="text-align: center">
                          <table  width="100%">
                            <tr>
                              <td style="width: 33%">
                                <el-button style="height: 80px;display: inline-block;width: 8rem" @click="startStep(item,-1)" type="success">
                                  <p class="big_font" style="color: white">手工穿</p>
                                </el-button>
                              </td>
                              <td v-if="machineCount>0">
                                <el-button style="height: 80px;display: inline-block;width: 8rem" @click="startStep(item,machineList[0].machine_id)" type="success">
                                  <p class="big_font" style="color: white">1号机</p>
                                </el-button>
                              </td>
                              <td v-if="machineCount>1">
                                <el-button style="height: 80px;display: inline-block;width: 8rem" @click="startStep(item,machineList[1].machine_id)" type="success">
                                  <p class="big_font" style="color: white">2号机</p>
                                </el-button>
                              </td>
                            </tr>
                            <tr v-for="indexTr in machineCount_length">
                              <td  v-for="indexTd in 3" v-if="(indexTd+indexTr*3-1)<=machineCount"  style="width: 33%" >
                                <el-button style="height: 80px;display: inline-block;width: 8rem" @click="startStep(item,machineList[indexTd+indexTr*3-2].machine_id)" type="success">
                                  <p class="big_font" style="color: white">{{indexTd+indexTr*3-1}}号机</p>
                                </el-button>
                              </td>
                            </tr>
                          </table>
                        </div>
                        <el-button slot="reference" :style="{backgroundColor:getColor(item.status,[0])}" :disabled="item.status!==0" style="height: 80px;display: inline-block">
                          <div :style="{height:button_height}" style="display: inline-block">
                            <p class="big_font" style="color: white;height: 60%;line-height:60%;margin-top: 20%">开始穿综</p>
                          </div>
                        </el-button>
                      </el-popover>
                    </td>
                    <td>
                      <el-popover
                        placement="top"
                        width="180"
                        style="margin-left: 10px"
                        title="确认要结束穿综吗"
                        trigger="click">
                        <div style="text-align: center">
                          <el-button style="height: 80px;width:120px;display: inline-block" @click="endStep(item)"  type="success">
                            <p class="big_font" style="color: white">确 定</p>
                          </el-button>
                        </div>
                        <el-button :style="{backgroundColor:getColor(item.status,[1])}" slot="reference" :disabled="item.status!==1" style="height: 80px;display: inline-block" >
                          <div :style="{height:button_height}" style="display: inline-block">
                            <p class="big_font" style="color: white;height: 60%;line-height:60%;margin-top: 20%">结束穿综</p>
                          </div>
                        </el-button>
                      </el-popover>
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
              <img id="right_down" :src="arrow_icon" :style="{top:downArrowTop,left:arrowRight,width:arrowWidth}" style="position: fixed;webkit-transform: rotate(-90deg);" @click="right_down">
            </div>
            <div class="left-bottomDiv" :style="{height: scrollerHeightBottomDiv}">
              <el-tabs type="border-card"  style="width: 92%"  v-model="rightTabs">
                <el-tab-pane label="穿综计划" :style="{height: scrollerHeightBottomDiv}" name="rightDiv">
                  <div id="rightDiv">
                    <div class="standard_border" :id="'rightLabel'+ item.id"  v-if="(wearPlanId === item.id)" :style="{height:label_height_right}" v-for="item in wear_order_list" :label="item.id" :key="item.id" style="margin-bottom: 10px;border-width:2px;padding: 10px"  @click="rightLabelClick(item)">
                      <table id="rightLabel" cellspacing='0' cellpadding='0' border="0" width="100%"  style="height: 100%;overflow-y: scroll;text-align: center">
                        <tr>
                          <td class="big_font" style="width: 20%">
                            序号{{item.id}}
                          </td>
                          <td class="big_font"  style="width: 20%">
                            已绑定/总量：{{item.finishBeamNum}}/{{item.beamNum}}
                          </td>
                          <td class="big_font"  style="width: 20%">
                            筘号：{{item.reed_no}}
                          </td>
                          <td class="big_font"  style="width: 20%">
                            品名：{{item.productName}}
                          </td>
                          <td  style="width: 20%" v-if="all_order_list[0]">
                            <!--<el-button type="success"  class="rectangleButton" @click="bindingPlan"  v-if="!(wearPlanId === item.id)">-->
                              <!--<p  class="middleButtonFont">绑定计划</p>-->
                            <!--</el-button>-->
                            <!--<el-button type="danger"  class="rectangleButton" @click="reWear(item)">-->
                            <!--<p  class="middleButtonFont">重新绑定</p>-->
                            <!--</el-button>-->
                            <el-button type="danger"  class="rectangleButton" @click="reWear(item)">
                              <p  class="middleButtonFont">重复穿综</p>
                            </el-button>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="历史记录" name="rightLabelHis">
                  <div id="timeSelect">
                    <el-radio-group v-model="timeRangeSelect" @change="changeTimeRange">
                      <el-radio-button label="最近一天"></el-radio-button>
                      <el-radio-button label="最近三天"></el-radio-button>
                      <el-radio-button label="最近一月"></el-radio-button>
                    </el-radio-group>
                  </div>
                  <!--<div id="rightDivHis">-->
                    <!--<div class="standard_border" :id="'rightLabelHis'+ item.id" :style="{height:label_height_right}" v-for="item in historyList" :label="item.id" :key="item.id" style="margin-bottom: 10px;margin-top: 20px;border-width:2px;padding: 10px" >-->
                      <!--<table cellspacing='0' cellpadding='0' border="0" width="100%"  style="height: 100%;overflow-y: scroll;text-align: center">-->
                        <!--<tr>-->
                          <!--<td class="big_font" style="width: 20%">-->
                            <!--计划单号-->
                          <!--</td>-->
                          <!--<td class="big_font"  style="width: 20%">-->
                            <!--绑定穿综单号-->
                          <!--</td>-->
                          <!--<td class="big_font"  style="width: 20%">-->
                            <!--更新时间-->
                          <!--</td>-->
                          <!--<td class="big_font"  style="width: 20%">-->
                            <!--品名-->
                          <!--</td>-->
                          <!--<td  style="width: 20%" rowspan="2">-->
                            <!--<el-button type="success"  class="rectangleButton" @click="bindingPlan" v-if="!(wearPlanId === item.id)">-->
                              <!--<p  class="middleButtonFont">查看明细</p>-->
                            <!--</el-button>-->
                          <!--</td>-->
                        <!--</tr>-->
                        <!--<tr>-->
                          <!--<td class="big_font" style="width: 20%">-->
                            <!--{{item.print_code}}-->
                          <!--</td>-->
                          <!--<td class="big_font"  style="width: 20%">-->
                            <!--{{item.wear_plan_id}}-->
                          <!--</td>-->
                          <!--<td class="big_font"  style="width: 20%">-->
                            <!--{{item.update_time}}-->
                          <!--</td>-->
                          <!--<td class="big_font"  style="width: 20%">-->
                            <!--{{item.product_name}}-->
                          <!--</td>-->
                        <!--</tr>-->
                      <!--</table>-->
                    <!--</div>-->
                  <!--</div>-->
                  <div id="rightDivHis">
                    <div class="standard_border" v-if="historyList.length>((hisPage-1)*3 + index -1)" :id="'rightLabelHis'+ historyList[(hisPage-1)*3 + index -1].id" :style="{height:label_height_right}" v-for="index in 3"  style="margin-bottom: 10px;margin-top: 20px;border-width:2px;padding: 10px" >
                      <table cellspacing='0' cellpadding='0' border="0" width="100%"  style="height: 100%;overflow-y: scroll;text-align: center">
                        <tr>
                          <td class="big_font" style="width: 20%">
                            计划单号
                          </td>
                          <td class="big_font" style="width: 20%">
                            轴号
                          </td>
                          <td class="big_font"  style="width: 20%">
                            绑定穿综单号
                          </td>
                          <td class="big_font"  style="width: 20%">
                            更新时间
                          </td>
                          <td class="big_font"  style="width: 20%">
                            品名
                          </td>
                          <td  style="width: 20%" rowspan="2">
                            <el-popover
                              placement="top"
                              width="800"
                              style=""
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
                              <el-button type="success"  class="rectangleButton" @click="showDetails(historyList[(hisPage-1)*3 + index -1])" v-if="!(wearPlanId === historyList[(hisPage-1)*3 + index -1].id)">
                                <p  class="middleButtonFont">查看明细</p>
                              </el-button>
                            </el-popover>
                          </td>
                        </tr>
                        <tr>
                          <td class="big_font" style="width: 20%">
                            {{historyList[(hisPage-1)*3 + index -1].print_code}}
                          </td>
                          <td class="big_font"  style="width: 20%">
                            {{historyList[(hisPage-1)*3 + index -1].beam_name}}
                          </td>
                          <td class="big_font"  style="width: 20%">
                            {{historyList[(hisPage-1)*3 + index -1].wear_plan_id}}
                          </td>
                          <td class="big_font"  style="width: 20%">
                            {{historyList[(hisPage-1)*3 + index -1].update_time}}
                          </td>
                          <td class="big_font"  style="width: 20%">
                            {{historyList[(hisPage-1)*3 + index -1].product_name}}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { warp_api,warp_api_get,common_api  } from "../../../static/api/api.js";
  import headComponent from './mainHead.vue';
  import setAxleTable from './../setAxleTable.vue';
  import outputSubmitTable from './../outputSubmitTable.vue';
  import outputPrintTable from './../sizingCardPrint.vue';
  export default {
    components:{headComponent,setAxleTable,outputSubmitTable,outputPrintTable},
    data () {
      return {
        db:null,
        companyId:null,
        scrollerHeight:null,
        scrollerWidth:null,
        scrollerHeightTop:null,
        scrollerHeightBottom:null,
        scrollerHeightBottomDiv:null,
        scrollerWidthLeft:null,
        scrollerWidthRight:null,
        label_height:null,
        label_height_right:null,
        scrollerWidthRightTable:null,
        scrollerHeightRightButton:null,
        inputHeight:null,
        inputWidth:null,
        buttonHeight:null,
        button_height:null,
        order_list: {
          orderSheetPlan: {},
          lmWarpPlanB:{},
          lmWarpPlanDetail:{},
        },
        order_detail_list:[],
        batchCode:null,
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
        staff_id:null,
        staff_name:null,
        all_order_list:[],
        showChangeReedNumber:false,
        workshopId:null,
        machineCount:0,
        machineCount_length:0,
        machineList:[],
        clock:null,
        wear_order_list:[],//穿综计划任务单
        showBindingPlanTable:false,//穿综绑定界面
        dataSelect:null,//计划单选择
        clickedRightLabel:null,//已选计划单
        wearPlanId:null,//绑定计划单号
        buttonList:"1234567890",
        focusInput:null,
        changeReedTable:false,
        reedNum:"",
        timeRangeSelect:"最近一天",//历史记录时间区域
        dateStart: this.standardDateTransferToYMD(new Date().getTime() - 3600 * 1000 * 24),
        dateEnd: this.standardDateTransferToYMD(new Date()),
        historyList:[],
        rightTabs:"rightDiv",
        hisPage:1,//历史记录页码
        pageCountHis:0,//历史记录总页数
        produce_details_list:[],
      }
    },
    methods:{
      changeWindow(){
        this.scrollerHeight = (window.innerHeight*0.98 -90) + "px";
        this.scrollerWidth = (window.innerWidth -10) + "px";
        this.scrollerHeightTop = ((window.innerHeight*0.98 -80) -20)*0.25 +"px";
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
        this.label_height_right = window.innerHeight*3*0.025 + 65 + "px";
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
      getDataByCardNumber(batchCode){
        //console.log("查询");
        //this.batchCode = batchCode;
        this.batchCode = batchCode;
        let data = {};
        data.warpCode = batchCode;
        let url = "/wear-weaving/selectByWarpCode";
        warp_api_get(url, data,this.companyId)
          .then(response => {
            //console.log(response.data.data);
            if(response.data.data){
              this.order_detail_list = [];
              this.order_detail_list.push(response.data.data);
              this.getData();
              this.getPlanProps();
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
            if(this.batchCodeNow!== this.batchCode.substr(0-this.batchCodeNow.length)){
              this.batchCodeNow = this.batchCode;
             // this.getDataByCardNumber(this.batchCodeNow);
              this.getPlanProps(this.batchCodeNow);
            }else{
              this.$message.warning("重复扫码");
              this.batchCode = this.batchCodeNow;
              this.$store.state.showLoadingLog = false;
            }
        }else{
          this.batchCodeNow = this.batchCode;
          //this.getDataByCardNumber(this.batchCode);
          this.getPlanProps(this.batchCodeNow);
        }
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
        switch(this.rightTabs) {
          case "rightLabelHis":
            if(this.hisPage>1){
              this.hisPage--;
              if(this.hisPage === 1){
                document.getElementById("right_up").style.display = "none";
              }
            }
            document.getElementById("right_down").style.display = "inline-block";
            break;
          case "rightDiv":
            if(document.getElementById(this.rightTabs).scrollTop-parseInt(this.label_height)*3-60>=0){
              document.getElementById(this.rightTabs).scrollTop-= (parseInt(this.label_height)*3+60);
              document.getElementById("right_down").style.display = "inline-block";
            }else{
              document.getElementById(this.rightTabs).scrollTop = 0;
              //  document.getElementById("right_up").style.display = "none";
              document.getElementById("right_down").style.display = "inline-block";
            }
            break;
        }
      },
      right_down(){
       // console.log(this.rightTabs);
        switch(this.rightTabs) {
          case "rightLabelHis":
           // console.log("总"+this.pageCountHis+"现"+this.hisPage);
            if(this.hisPage<this.pageCountHis){
              this.hisPage++;
              if(this.hisPage === this.pageCountHis){
                document.getElementById("right_down").style.display = "none";
              }
            }
            document.getElementById("right_up").style.display = "inline-block";
            break;
          case "rightDiv":
            if(document.getElementById(this.rightTabs).scrollTop+parseInt(this.label_height)*3+46<=document.getElementById(this.rightTabs).scrollHeight){
              document.getElementById(this.rightTabs).scrollTop+= (parseInt(this.label_height)*3+46);
              document.getElementById("right_up").style.display = "inline-block";
            }else{
              document.getElementById(this.rightTabs).scrollTop = document.getElementById(this.rightTabs).scrollHeight;
              // document.getElementById("right_down").style.display = "none";
              document.getElementById("right_up").style.display = "inline-block";
            }
            break;
        }
        // console.log(document.getElementById(this.rightTabs).scrollTop+parseInt(this.label_height)*3+46);
        // console.log(document.getElementById(this.rightTabs));

      },
      selectWorker(workerId,name){
        this.staff_id = workerId;
        this.staff_name = name;
      },
      startStep(item,machineId){
        let data = {};
        console.log(this.machineList);
        data.staffId = this.staff_id;
        data.id = item.id;
        data.machineId = machineId;
        let shiftObject = this.$refs.headComponent.getShiftName();
        if(shiftObject&&shiftObject.id){
          data.shiftWork = shiftObject.id-1;
          data.shiftStartDatetime = this.addDate(shiftObject.startTime);
          data.shiftEndDatetime =  this.addDate(shiftObject.endTime);
        }
        data.workshopId = this.workshopId;
        console.log(data);
        let url = "/wear-weaving/startWear";
        warp_api(url, data,this.companyId)
          .then(response => {
            if(response.data.result === "fail"){
              let message =response.data.successMessage;
              this.$message.warning(message);
            }else{
              this.$message.success("开始穿综成功");
              this.getData();
              this.getDataByCardNumber(item.printCode);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      endStep(item){
        let data = {};
        data.id = item.id;
        let url = "/wear-weaving/endWear";
        warp_api_get(url, data,this.companyId)
          .then(response => {
            this.$message.success("结束穿综成功");
            this.getData();
            this.getDataByCardNumber(item.printCode);
          })
          .catch(error => {
            console.log(error);
          });
      },
      getData(){
        let data = {};
        let url = "/wear-weaving/selectRecent";
        warp_api_get(url, data,this.companyId)
          .then(response => {
            //console.log(response.data.data[0]);
            this.all_order_list = response.data.data;
            if(this.batchCode){
              this.shiftToTop()
            }
            else{
              if(response.data.data.length>0){
                this.order_list = response.data.data[0];
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      changeByCardNumber(item){
       // console.log(item);
        this.order_list = item;
        this.getDataByCardNumber(item.printCode)
      },
      //更换筘号
      changeReedNumber(){
        this.changeReedTable = false;
        let url = "/wear-weaving-plan/updateReedNo";
        warp_api(url,{reedNo:this.reedNum,id:this.dataSelect.id},this.companyId)
          .then(response => {
            console.log(response);
            if(this.batchCode){
              this.getPlanProps();
            }else{
              this.wearWeavingPlan();
            }
            this.reedNum = "";
          })
          .catch(error => {
            console.log(error);
          });
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
      getMachineNum(){
        let data = {};
        data.tableName = "mac_relation";
        data.selectFields =["mac_type_id","machine_id"];
        data.query = {
          mac_type_id:"070000"
        };
        common_api("/report/getSimpleReport", data,this.companyId)
          .then(response => {
            if(response.data.result === "ok"){
              this.machineCount = response.data.data.length;
              this.machineList = response.data.data;
              this.machineCount_length = Math.ceil((this.machineCount-2)/3);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      wearWeavingPlan(){
        let data = {};
        data.tableName = "wear_weaving_plan";
        data.query = {
          workshop_id: this.workshopId
        };
        common_api("/report/getSimpleReport", data,this.companyId)
          .then(response => {
           // console.log(response.data);
            if(response.data.result === "ok"){
              this.wear_order_list = response.data.data;
              for (let i = 0; i < response.data.data.length; i++) {
                this.wear_order_list[i].finishBeamNum = this.wear_order_list[i].finish_beam_num;
                this.wear_order_list[i].beamNum = this.wear_order_list[i].beam_num;
                this.wear_order_list[i].productName = this.wear_order_list[i].product_name;
              }
            }else{
              this.$message.warning("暂无可用的穿综计划");
              this.wear_order_list = [];
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      getPlanProps(){
        let data = {};
        data.printCode = this.batchCode;
        warp_api_get("/wear-weaving-plan/selectByPrintCodeProductName", data,this.companyId)
          .then(response => {
            this.wearPlanId = null;
            if(response.data.result === "ok"){
              this.wear_order_list = response.data.data.wearWeavingPlans;
              this.wearPlanId = response.data.data.wearPlanId;
              this.getData();
              if(!response.data.data.binding){
                this.showBindingPlanTable = true;
              }
            }else{
              this.$message.warning("暂无可用的穿综计划");
              this.wear_order_list = [];
              this.batchCode = "";
              this.batchCodeNow = "";
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //绑定穿综计划
      bindingPlan(item){
       // console.log(item);
        this.$store.state.showLoadingLog = true;
        let url = "/lm-warp-plan-detail/selectAllByPrintCode";
        warp_api(url,{printCode:this.batchCode},this.companyId)
          .then(response => {
            let  data = {
              wearPlanId:item.id,
              printCode:this.batchCode,
              createDate:this.today(),
              createTime:this.thisTime(),
              productName:item.productName,
              rootNumber:response.data.data.rootNumber,
              workshopId:this.workshopId,
              beamName:item.beamNum,
              staffId:this.staff_id
            };
            warp_api("/wear-weaving/insertWear", data,this.companyId)
              .then(response1 => {
                console.log(response1);
                this.showBindingPlanTable = false;
                this.$store.state.showLoadingLog = false;
                this.wearWeavingPlan();
                this.getPlanProps(this.batchCodeNow);
                // if(response1.data.result === "OK"){
                //   if(item.id){
                //     warp_api("/wear-weaving-plan/syncFinish",{wearPlanId:item.id},this.companyId)
                //       .then(response2 => {
                //         common_api("/report/getSimpleReport",
                //           {
                //             query:{
                //               print_code:this.batchCode
                //             }
                //           },this.companyId)
                //           .then(response => {
                //             if(response.data.result === "ok"){
                //               this.saveOption(15,response.data.data[0].id);
                //             }
                //           })
                //           .catch(error => {
                //             console.log(error);
                //           });
                //       })
                //       .catch(error => {
                //         console.log(error);
                //       });
                //   }
                // }else{
                //   this.$message.error("操作失败");
                //   this.$store.state.showLoadingLog = false;
                // }
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log(error);
          });
       },
      //保存历史纪录
      saveOption(code,detailId){
        if(code&&detailId){
          warp_api("/wear-weaving/czRecording",{code:code,detailId:detailId,staffId:this.staff_id},this.companyId)
            .then(response => {

            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      //搜索项置顶
      shiftToTop(){
        for(let i in this.all_order_list){
          if(this.all_order_list[i].printCode === this.batchCode){
            this.all_order_list.unshift(this.all_order_list.splice(i , 1)[0]);
          }
        }
        document.getElementById("leftDiv").scrollTop = 0;
      },
      //点击事件
      rightLabelClick(item){
        // console.log(item);
        this.dataSelect = item;
        if(this.clickedRightLabel){
          document.getElementById("rightLabel" + this.clickedRightLabel).style.backgroundColor = "white";
        }
        this.clickedRightLabel = item.id;
        document.getElementById("rightLabel" +this.clickedRightLabel).style.backgroundColor = "#c4ff7d";
      },
      //更换筘号
      changeReed(){
        if(this.dataSelect){
          this.changeReedTable = true;
          this.focusInput = "reedNum";
        }else{
          this.$message.warning("请先选择想要更换筘号的穿综计划单");
        }
      },
      changeFocus(focusInput){
        this.focusInput = focusInput
      },
      selectTableButton(buttonName){
        if(this.focusInput === "reedNum"){
          this.reedNum+="";
          if(buttonName === "退格"){
            this.reedNum = this.reedNum.substring(0,this.reedNum.length-1)
          }else{
            this.reedNum += buttonName;
          }
          this.$refs.reedNum.focus();
        }
      },
      changeTimeRange(){
       // console.log(this.timeRangeSelect);
        switch(this.timeRangeSelect){
          case "最近一天":
            this.dateStart = this.standardDateTransferToYMD(new Date().getTime() - 3600 * 1000 * 24);
            this.dateEnd = this.standardDateTransferToYMD(new Date());
            break;
          case "最近三天":
            this.dateStart = this.standardDateTransferToYMD(new Date().getTime() - 3600 * 1000 * 24 * 7);
            this.dateEnd = this.standardDateTransferToYMD(new Date());
            break;
          case "最近一月":
            this.dateStart = this.standardDateTransferToYMD(new Date().getTime() - 3600 * 1000 * 24 * 30);
            this.dateEnd = this.standardDateTransferToYMD(new Date());
            break;
        }
        this.$nextTick(()=>{
         this.getHistory()
        })
      },
      //获取历史记录
      getHistory(){
        let data = {};
        data.tableName = "wear_weaving";
        data.query = {
          workshop_id: this.workshopId
        };
        data.startTime = this.dateStart + " 00:00:00";
        data.endTime = this.dateEnd + " 23:59:59";
        data.sort = "desc";
        data.sortColumn = "update_time";
        common_api("/report/getSimpleReport", data,this.companyId)
          .then(response => {
             //console.log(response.data);
             if(response.data.result === "ok"){
               this.historyList = response.data.data;
               this.pageCountHis = Math.ceil(response.data.data.length/3);
               this.hisPage = 1;
             }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //查询明细
      showDetails(item){
        console.log(item);
        let data = {};
        data.beamName = item.beam_name;
        data.warpPlanId = item.wear_plan_id;
        data.process = "6";
        let url = "/warp-axis-record-his/selectJsAxisRecords";
        warp_api_get(url, data,this.companyId)
          .then(response => {
            console.log(response.data);
            this.produce_details_list = response.data.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      //重新绑定
      reWear(item){
        //console.log(item);
        this.$store.state.showLoadingLog = true;
        for (let i = 0; i < item.wearWeavings.length; i++) {
          if(item.wearWeavings[i].beamName == item.beamNum){
            let data = {};
            data.id = item.wearWeavings[i].id;
            data.staffId = this.staff_id;
            warp_api("/wear-weaving/restartWear", data,this.companyId)
              .then(response => {
                //console.log(response);
                this.getPlanProps(this.batchCodeNow);
                this.$store.state.showLoadingLog = false;
              })
              .catch(error => {
                console.log(error);
              });
            i = item.wearWeavings.length;
          }
        }

      },
    },
    mounted() {
      let params = this.$route.params.params.split(",");
      this.workshopId = params[0];
      this.$store.state.workshopId = this.workshopId;
      this.companyId = params[1];
      this.getMachineNum();
      this.wearWeavingPlan();//获取穿综计划列表
      this.getHistory();//获取历史记录
      this.$refs.headComponent.getWorker("/s-staff-organization-relation/getCzStaff");
      this.$refs.headComponent.changeMainTitle("天衡穿综工位操作系统");
      document.querySelector('body').setAttribute('style', 'background-color:rgba(223,229,236,0.9)');//设置背景色
      this.changeWindow();
      window.onresize = () => {
        this.changeWindow();
      };
     // this.getData();
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
         //  _this.$message.warning("出现异常，自动取消上一步操作");
            _this.$store.state.showLoadingLog = false;
          },5000)
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
  #timeSelect{
    .el-radio-button{
      height: 3rem
    }
    .el-radio-button__inner{
      font-size: 2.5rem;
      font-weight: 700;
    }
  }
</style>
