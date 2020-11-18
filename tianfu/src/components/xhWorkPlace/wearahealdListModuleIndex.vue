<template>
  <div>
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
                <td rowspan="6" style="width: 300px;border-width: 3px;"   @click=" showChangeReedNumber = true">
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
                  <!--<tr>-->
                    <!--<td>-->
                      <!--<el-popover-->
                        <!--placement="top"-->
                        <!--width="480"-->
                        <!--style="margin-left: 10px"-->
                        <!--title="穿综机台"-->
                        <!--trigger="click">-->
                        <!--<div style="text-align: center">-->
                          <!--<table  width="100%">-->
                            <!--<tr>-->
                              <!--<td style="width: 33%">-->
                                <!--<el-button style="height: 80px;display: inline-block;width: 8rem" @click="startStep(item,-1)" type="success">-->
                                  <!--<p class="big_font" style="color: white">手工穿</p>-->
                                <!--</el-button>-->
                              <!--</td>-->
                              <!--<td v-if="machineCount>0">-->
                                <!--<el-button style="height: 80px;display: inline-block;width: 8rem" @click="startStep(item,machineList[0].machine_id)" type="success">-->
                                  <!--<p class="big_font" style="color: white">1号机</p>-->
                                <!--</el-button>-->
                              <!--</td>-->
                              <!--<td v-if="machineCount>1">-->
                                <!--<el-button style="height: 80px;display: inline-block;width: 8rem" @click="startStep(item,machineList[1].machine_id)" type="success">-->
                                  <!--<p class="big_font" style="color: white">2号机</p>-->
                                <!--</el-button>-->
                              <!--</td>-->
                            <!--</tr>-->
                            <!--<tr v-for="indexTr in machineCount_length">-->
                              <!--<td  v-for="indexTd in 3" v-if="(indexTd+indexTr*3-1)<=machineCount"  style="width: 33%" >-->
                                <!--<el-button style="height: 80px;display: inline-block;width: 8rem" @click="startStep(item,machineList[indexTd+indexTr*3-2].machine_id)" type="success">-->
                                  <!--<p class="big_font" style="color: white">{{indexTd+indexTr*3-1}}号机</p>-->
                                <!--</el-button>-->
                              <!--</td>-->
                            <!--</tr>-->
                          <!--</table>-->
                        <!--</div>-->
                        <!--<el-button slot="reference" :style="{backgroundColor:getColor(item.status,[0])}" :disabled="item.status!==0" style="height: 80px;display: inline-block">-->
                          <!--<div :style="{height:button_height}" style="display: inline-block">-->
                            <!--<p class="big_font" style="color: white;height: 60%;line-height:60%;margin-top: 20%">开始穿综</p>-->
                          <!--</div>-->
                        <!--</el-button>-->
                      <!--</el-popover>-->
                    <!--</td>-->
                    <!--<td>-->
                      <!--<el-popover-->
                        <!--placement="top"-->
                        <!--width="180"-->
                        <!--style="margin-left: 10px"-->
                        <!--title="确认要结束穿综吗"-->
                        <!--trigger="click">-->
                        <!--<div style="text-align: center">-->
                          <!--<el-button style="height: 80px;width:120px;display: inline-block" @click="endStep(item)"  type="success">-->
                            <!--<p class="big_font" style="color: white">确 定</p>-->
                          <!--</el-button>-->
                        <!--</div>-->
                        <!--<el-button :style="{backgroundColor:getColor(item.status,[1])}" slot="reference" :disabled="item.status!==1" style="height: 80px;display: inline-block" >-->
                          <!--<div :style="{height:button_height}" style="display: inline-block">-->
                            <!--<p class="big_font" style="color: white;height: 60%;line-height:60%;margin-top: 20%">结束穿综</p>-->
                          <!--</div>-->
                        <!--</el-button>-->
                      <!--</el-popover>-->
                    <!--</td>-->
                  <!--</tr>-->
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
            <div class="left-bottomDiv" :style="{height: scrollerHeightBottomDiv}" id="rightDiv"  @mousedown="mousedown1" @touchstart="mousedown1" @mousemove="move1" @mouseup="end1" @touchmove.prevent="move1"  @touchend="end1" >
              <div class="standard_border" :style="{height:label_height_right}" v-for="item in order_detail_list" :label="item.axisNo" :key="item.axisNo" style="width: 92%;margin-bottom: 10px;border-width:2px;padding: 10px" >
                <!--<el-tabs type="border-card">-->
                  <!--<el-tab-pane label="穿综计划">-->
                    <table id="rightLabel" cellspacing='0' cellpadding='0' border="0" width="100%"  style="height: 100px;overflow-y: scroll">
                      <tr>
                        <td colspan="2" style="width: 50%">
                          <p class="big_font">机器ID：{{item.machineId}}</p>
                        </td>
                        <td style="width: 40%;text-align: right" rowspan="3">
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
                      <tr>
                        <td colspan="2">
                          <p class="big_font">开始时间：{{item.startDatetime}}</p>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <p class="big_font">结束时间：{{item.endDatetime}}</p>
                        </td>
                      </tr>
                    </table>
                  <!--</el-tab-pane>-->
                  <!--<el-tab-pane label="历史记录">配置管理</el-tab-pane>-->
                <!--</el-tabs>-->
              </div>
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
        all_order_list:null,
        showChangeReedNumber:false,
        workshopId:null,
        machineCount:0,
        machineCount_length:0,
        machineList:[],
        clock:null,
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
            console.log(response.data.data);
            if(response.data.data){
              this.order_detail_list = [];
              this.order_detail_list.push(response.data.data);
              this.getData();
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
          if((this.batchCode.length - this.batchCodeNow.length)>1){
            if(this.batchCodeNow!== this.batchCode.substr(0-this.batchCodeNow.length)){
              this.batchCodeNow = this.batchCode;
              this.getDataByCardNumber(this.batchCodeNow);
            }else{
              this.$message.warning("重复扫码");
              this.batchCode = this.batchCodeNow;
            }
          }else{
            this.getDataByCardNumber(this.batchCode);
          }
        }else{
          this.batchCodeNow = this.batchCode;
          this.getDataByCardNumber(this.batchCode);
        }
        clearTimeout(this.clock);
      },
      shiftToTop(){
        for(let i in this.all_order_list){
          if(this.all_order_list[i].printCode === this.batchCode){
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
          document.getElementById("right_up").style.display = "none";
        }
      },
      right_down(){
        if(document.getElementById("rightDiv").scrollTop+parseInt(this.label_height)*3+46<=document.getElementById("rightDiv").scrollHeight){
          document.getElementById("rightDiv").scrollTop+= (parseInt(this.label_height)*3+46);
          document.getElementById("right_up").style.display = "inline-block";
        }else{
          document.getElementById("rightDiv").scrollTop = document.getElementById("rightDiv").scrollHeight;
          document.getElementById("right_down").style.display = "none";
        }
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
            console.log(response.data.data[0]);
            this.all_order_list = response.data.data;
            if(response.data.data.length>0){
              this.shiftToTop();
              this.$nextTick(()=>{
                this.order_list = this.all_order_list[0];
              });
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
      changeReedNumber(){

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
      }
    },
    mounted() {
      let params = this.$route.params.params.split(",");
      this.workshopId = params[0];
      this.$store.state.workshopId = this.workshopId;
      this.companyId = params[1];
      this.getMachineNum();
      this.$refs.headComponent.getWorker("/s-staff-organization-relation/getCzStaff");
      this.$refs.headComponent.changeMainTitle("天衡穿综工位操作系统");
      document.querySelector('body').setAttribute('style', 'background-color:rgba(223,229,236,0.9)');//设置背景色
      this.changeWindow();
      window.onresize = () => {
        this.changeWindow();
      };
      this.getData();
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
