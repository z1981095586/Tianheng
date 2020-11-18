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
        更换信息
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
    <!--更换品种-->
    <el-dialog
      :visible.sync="showModifiedVarieties"
      width="800px"
      append-to-body
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div slot="title">
        <p @click="showModifiedVarieties = false" style="font-size: 3rem;font-weight: bolder;display: inline-block" >点击此处返回</p>
        <el-button type="primary" style="margin-left: 5%;font-size: 3rem;font-weight: bolder;display: inline-block" @click="startPrint">确认并生成加工单</el-button>
      </div>
      <table style="text-align: center" width="100%">
        <tr>
          <td>
            <div style="font-size: 1.5rem;font-weight: bolder;">
              <span>品种:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <el-input ref="productName" v-model="productName" @focus="focusInput = 'productName'" @blur="all_order_list[0].productNameWeaving = productName" style="font-size: 1.5rem;text-transform: uppercase; width: 240px; height: 50px;"></el-input>
            </div>
          </td>
          <td>
            <div style="font-size: 1.5rem;font-weight: bolder;">
              <span>原品种:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <el-input  v-model="productNameNow" disabled style="font-size: 1.5rem;text-transform: uppercase; width: 240px; height: 50px;"></el-input>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div style="font-size: 1.5rem;font-weight: bolder;margin-top: 20px;">
              <span>纬纱批号:</span>
              <el-input ref="WeavingsupplierCode" @focus="focusInput = 'WeavingsupplierCode'" v-model="WeavingsupplierCode" @blur="all_order_list[0].lmWeavingPlanB.supplierCode = WeavingsupplierCode" style="font-size: 1.5rem; width: 240px;text-transform: uppercase; height: 50px"></el-input>
            </div>
          </td>
          <td>
            <div style="font-size: 1.5rem;font-weight: bolder;margin-top: 20px;">
              <span>原纬纱批号:</span>
              <el-input v-model="WeavingsupplierCodeNow" disabled style="font-size: 1.5rem; width: 240px;text-transform: uppercase; height: 50px"></el-input>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div style="font-size: 1.5rem;font-weight: bolder;margin-top: 20px;">
              <span>纬纱产地:</span>
              <el-input ref="WeavingsupplierName" @focus="focusInput = 'WeavingsupplierName'" v-model="WeavingsupplierName" @blur="all_order_list[0].lmWeavingPlanB.supplierName = WeavingsupplierName" style="font-size: 1.5rem;text-transform: uppercase; width: 240px; height: 50px"></el-input>
            </div>
          </td>
          <td>
            <div style="font-size: 1.5rem;font-weight: bolder;margin-top: 20px;">
              <span>原纬纱产地:</span>
              <el-input v-model="WeavingsupplierNameNow" disabled style="font-size: 1.5rem;text-transform: uppercase; width: 240px; height: 50px"></el-input>
            </div>
          </td>
        </tr>
      </table>
      <div>
        <table width="100%"  cellspacing='0' cellpadding='0' height="300px">
          <tr v-for="indexTr in 7" >
            <td  v-for="indexTd in 6" style="text-align: center;">
              <el-button type="primary" plain style="width: 120px" size="medium"  @click="selectTableButtonAll((indexTr-1)*6+indexTd-1)">
                <p :style="{'color':buttonListAll[(indexTr-1)*6+indexTd-1].color}" style="font-weight: bolder;font-size: 2rem;width: 100%">{{buttonListAll[(indexTr-1)*6+indexTd-1].label}}</p>
              </el-button>
            </td>
          </tr>
        </table>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="showConfirmDialog"
      width="700px"
      append-to-body
    >
      <div style="text-align: center; font-size: 2.2rem; font-weight: bolder">
        是否确认修改信息
      </div>
      <div style="text-align: center;margin-top: 5vw">
        <el-button type="success" style="width: 8vw;height:8vw;margin-bottom: 5px;margin-right: 3vw" size="medium" @click="changePrint">
          <p  style="font-weight: bolder;font-size: 2rem;text-align:center;width: 100%;line-height:1.4;letter-spacing:4px;" >确认<br>修改</p>
        </el-button>
        <el-button type="primary" style="width: 8vw;height: 8vw;margin-bottom: 5px;margin-left: 3vw" size="medium" @click="showConfirmDialog = false">
          <p  style="font-weight: bolder;font-size: 2rem;width: 100%;line-height:1.4;letter-spacing:4px;">返回<br>页面</p>
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="showAddClothDialog"
      width="800"
      append-to-body
    >
      <div slot="title" class="big_font" style="font-size: 40px">新增布票</div>
      <div style="text-align: center">
        <p  class="big_font" style="font-size: 40px">请确认新增数量</p>
        <el-button  type="success" @click="addNumber--" style="width: 7.5vw;height: 7.5vw;margin-right: 2vw"  :disabled="addNumber <= 0">
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
        <el-button  type="success" @click="print_num--" style="width: 7.5vw;height: 7.5vw;margin-right: 2vw"  :disabled="print_num <= 0">
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
                  <td id="radio4" @click="changeRadio('radio4')" style="font-size: 4rem">
                    已穿综单
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
              <div class="standard_border" :style="{height:scrollerHeightBottomDiv,backgroundColor:getLabelColor(item.status)}" v-for="item in all_order_list" :label="item.barCode" :key="item.id" style="width: 90%;display: inline-block;margin-left: 5%;margin-top: 0px;border-width:2px;padding: 5px" >
                <table cellspacing='10px' cellpadding='20px' border="0" width="100%">
                  <tr>
                    <td colspan="2" style="border-bottom: 1px solid lightgray">
                      <p style="display: inline-block;margin-top: 5px;font-size: 2.1vw;font-weight: bolder">织造上轴加工单&nbsp</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <p class="standard_font" style="font-size: 1.3vw;font-weight: bolder">{{plan_code}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <p class="standard_font" style="font-size: 1.3vw;font-weight: bolder">预排机台：&nbsp{{item.machineIdPlan || "无"}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <p class="standard_font" style="font-size: 1.3vw;font-weight: bolder">实际机台：&nbsp{{item.machineId || machineIdSelected}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <p class="standard_font" style="font-size: 1.3vw;font-weight: bolder">轴号：&nbsp{{item.axisNo}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <p class="standard_font" style="font-size: 1.3vw;font-weight: bolder;text-transform: uppercase;">品种：&nbsp{{item.productNameWeaving}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <p class="standard_font" style="font-size: 1.3vw;font-weight: bolder;margin-top: 5px;text-transform: uppercase;">纬纱批号：&nbsp{{item.lmWeavingPlanB.supplierCode }}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <p class="standard_font" style="font-size: 1.3vw;font-weight: bolder;margin-top: 5px;text-transform: uppercase;">纬纱产地：&nbsp{{item.lmWeavingPlanB.supplierName}}</p>
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
              <img id="right_up" :src="arrow_icon" :style="{top:upArrowTop,left:arrowRight,width:arrowWidth}" style="position: fixed;webkit-transform: rotate(90deg);display: none;z-index:1" @click="right_up" v-show="radio != 'radio2'">
              <img id="right_down" :src="arrow_icon" :style="{top:downArrowTop,left:arrowRight,width:arrowWidth}" style="position: fixed;webkit-transform: rotate(-90deg);z-index:1" @click="right_down" v-show="radio != 'radio2'">
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
              <div class="changeWS" v-show="radio === 'radio2'">
                <div class="changeWS-row">
                  <div>
                    <span>品名:</span>
                    <input v-model="productName" style="font-size: 1.5rem;text-transform: uppercase">
                  </div>
                  <div >
                    <span>经纱产地:</span>
                    <span style="font-size: 1.5rem;text-transform: uppercase">{{ZjwarpsupplierName}}</span>
                  </div>
                  <div>
                    <span>经纱批号:</span>
                    <span style="font-size: 1.5rem;text-transform: uppercase">{{ZjwarpsupplierCode}}</span>
                  </div>
                </div>
                <div class="changeWS-row">
                  <div style="margin-top: 5%;">
                    <span>轴号:</span>
                    <span>{{axisNo}}</span>
                    <!-- <input v-model="axisNo" style="font-size: 1.2rem"> -->
                  </div>
                  <div style="margin-top: 5%;">
                    <span>纬纱批号:</span>
                    <input v-model="WeavingsupplierCode" style="font-size: 1.5rem;text-transform: uppercase">
                  </div>
                  <div style="margin-top: 5%;">
                    <span>纬纱产地:</span>
                    <input v-model="WeavingsupplierName" style="font-size: 1.5rem; text-transform: uppercase">
                  </div>
                </div>
                <div class="changeWS-row">
                  <div style="margin-top: 5%;">
                    <span>浆纱匹长:</span>
                    <span>{{workQty}}米</span>
                  </div>
                  <div style="margin-top: 5%;">
                    <span>落布长度:</span>
                    <!-- <span>{{yieldMeterSemi}}</span>-->
                    <input  style="font-size: 1.2rem">
                  </div>
                  <div></div>
                </div>
                <div class="changeWS-btn">
                  <!-- <div>
                     <el-button type="warning" style="width: 8.5vw;height: 7.5vw;margin-bottom: 5px;line-height:1.4;letter-spacing:4px" size="medium" @click="editBySelf">
                       <p  style="font-weight: bolder; font-size: 1.3rem;width: 100%;" >确认<br>修改</p>
                     </el-button>
                   </div> -->
                  <div>
                    <el-button type="success" style="width: 8.5vw;height: 8vw;margin-bottom: 5px;line-height:1.4;letter-spacing:4px;" size="medium" @click="addBySelf">
                      <p  style="font-weight: bolder; font-size: 2.1rem;width: 100%;" >确认<br>提交</p>
                    </el-button></div>

                  <div> <el-button type="danger" style="width:8.5vw;height:8vw;font-size: 2.1rem;margin-bottom: 5px;font-weight: bolder" size="medium" @click="resetRecord">取消</el-button></div>
                  <!--<div> <el-button type="success" style="width: 8.5vw;height: 7.5vw;margin-bottom: 5px;line-height:1.4;letter-spacing:4px" size="medium" @click="changeRecord">-->
                  <!--<p  style="font-weight: bolder; font-size: 1.3rem;width: 100%">查看<br>记录</p>-->
                  <!--</el-button></div>-->
                </div>
              </div>
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
              <div class="pass-bill" v-show="radio === 'radio4'">
                <div class="recorded-F"><span>已记录&nbsp;&nbsp;{{yczListLength}}</span></div><br><br>
                <div class="board_con_bottom" :style="{height: scrollerHeightPassBill+'px'}" id="board_con_bottom">
                  <div class="board_con_bottom_one" v-for="(item,index) in yczList" :key="'ycz'+index" >
                    <span>织轴卡号:{{item.print_code}}</span>
                    <span>机台号:{{item.machine_id}}</span>
                    <span>总经根数:{{item.root_number}}</span>
                    <span>品名:{{item.product_name}}</span>
                    <span>轴号:{{item.beam_name}}</span>
                    <span>筘号:{{item.reed_no}}</span>
                    <span style="color: #606266">{{item.create_time}}</span>
                  </div>
                </div>
              </div>
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
        yczList: [],
        yczListLength: 0,
        scrollerHeightPassBill:'',
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
        showChangeRecordCard:false,
        radio: "radio1",
        addNumber:1,
        newCodeNum:0,
        plan_code:"",
        newBarCode:null,
        print_num:0,//打印张数
        yieldMeterSemi:'',
        WeavingsupplierCode:'',
        WeavingsupplierName:'',
        WeavingsupplierCodeNow:'',
        WeavingsupplierNameNow:'',
        axisNo:'',
        productName:'',
        productNameNow:'',
        productNameWeaving:'',
        ZjwarpsupplierName:'',
        ZjwarpsupplierCode:'',
        workQty:'',
        showConfirmDialog:false,
        showModifiedVarieties:false,
        buttonListAll:[
          {
            label:"A",
            color:"#000000",
          }, {
            label:"B",
            color:"#000000",
          }, {
            label:"C",
            color:"#000000",
          },{
            label:"D",
            color:"#000000",
          },{
            label:"E",
            color:"#000000",
          },{
            label:"F",
            color:"#000000",
          },{
            label:"G",
            color:"#000000",
          },{
            label:"H",
            color:"#000000",
          },{
            label:"I",
            color:"#000000",
          },{
            label:"J",
            color:"#000000",
          },{
            label:"K",
            color:"#000000",
          },{
            label:"L",
            color:"#000000",
          },{
            label:"M",
            color:"#000000",
          },{
            label:"N",
            color:"#000000",
          },{
            label:"O",
            color:"#000000",
          },{
            label:"P",
            color:"#000000",
          },{
            label:"Q",
            color:"#000000",
          },{
            label:"R",
            color:"#000000",
          },{
            label:"S",
            color:"#000000",
          },{
            label:"T",
            color:"#000000",
          },{
            label:"U",
            color:"#000000",
          },{
            label:"1",
            color:"red",
          },{
            label:"2",
            color:"red",
          },{
            label:"3",
            color:"red",
          },{
            label:"V",
            color:"#000000",
          },{
            label:"W",
            color:"#000000",
          },{
            label:"X",
            color:"#000000",
          },{
            label:"4",
            color:"red",
          },{
            label:"5",
            color:"red",
          },{
            label:"6",
            color:"red",
          },{
            label:"Y",
            color:"#000000",
          },{
            label:"Z",
            color:"#000000",
          },{
            label:".",
            color:"#000000",
          },{
            label:"7",
            color:"red",
          },{
            label:"8",
            color:"red",
          },{
            label:"9",
            color:"red",
          },{
            label:"+",
            color:"#000000",
          },{
            label:"_",
            color:"#000000",
          },{
            label:"-",
            color:"#000000",
          },{
            label:"小写",
            color:"#000000",
          },{
            label:"0",
            color:"red",
          },{
            label:"退格",
            color:"#000000",
          }
        ],
        buttonListB:[
          {
            label:"A",
            color:"#000000",
          }, {
            label:"B",
            color:"#000000",
          }, {
            label:"C",
            color:"#000000",
          },{
            label:"D",
            color:"#000000",
          },{
            label:"E",
            color:"#000000",
          },{
            label:"F",
            color:"#000000",
          },{
            label:"G",
            color:"#000000",
          },{
            label:"H",
            color:"#000000",
          },{
            label:"I",
            color:"#000000",
          },{
            label:"J",
            color:"#000000",
          },{
            label:"K",
            color:"#000000",
          },{
            label:"L",
            color:"#000000",
          },{
            label:"M",
            color:"#000000",
          },{
            label:"N",
            color:"#000000",
          },{
            label:"O",
            color:"#000000",
          },{
            label:"P",
            color:"#000000",
          },{
            label:"Q",
            color:"#000000",
          },{
            label:"R",
            color:"#000000",
          },{
            label:"S",
            color:"#000000",
          },{
            label:"T",
            color:"#000000",
          },{
            label:"U",
            color:"#000000",
          },{
            label:"1",
            color:"red",
          },{
            label:"2",
            color:"red",
          },{
            label:"3",
            color:"red",
          },{
            label:"V",
            color:"#000000",
          },{
            label:"W",
            color:"#000000",
          },{
            label:"X",
            color:"#000000",
          },{
            label:"4",
            color:"red",
          },{
            label:"5",
            color:"red",
          },{
            label:"6",
            color:"red",
          },{
            label:"Y",
            color:"#000000",
          },{
            label:"Z",
            color:"#000000",
          },{
            label:".",
            color:"#000000",
          },{
            label:"7",
            color:"red",
          },{
            label:"8",
            color:"red",
          },{
            label:"9",
            color:"red",
          },{
            label:"+",
            color:"#000000",
          },{
            label:"_",
            color:"#000000",
          },{
            label:"-",
            color:"#000000",
          },{
            label:"小写",
            color:"#000000",
          },{
            label:"0",
            color:"red",
          },{
            label:"退格",
            color:"#000000",
          }
        ],
        buttonListS:[
          {
            label:"a",
            color:"#000000",
          }, {
            label:"b",
            color:"#000000",
          }, {
            label:"c",
            color:"#000000",
          },{
            label:"d",
            color:"#000000",
          },{
            label:"e",
            color:"#000000",
          },{
            label:"f",
            color:"#000000",
          },{
            label:"g",
            color:"#000000",
          },{
            label:"h",
            color:"#000000",
          },{
            label:"i",
            color:"#000000",
          },{
            label:"j",
            color:"#000000",
          },{
            label:"k",
            color:"#000000",
          },{
            label:"l",
            color:"#000000",
          },{
            label:"m",
            color:"#000000",
          },{
            label:"n",
            color:"#000000",
          },{
            label:"o",
            color:"#000000",
          },{
            label:"p",
            color:"#000000",
          },{
            label:"q",
            color:"#000000",
          },{
            label:"r",
            color:"#000000",
          },{
            label:"s",
            color:"#000000",
          },{
            label:"t",
            color:"#000000",
          },{
            label:"u",
            color:"#000000",
          },{
            label:"1",
            color:"red",
          },{
            label:"2",
            color:"red",
          },{
            label:"3",
            color:"red",
          },{
            label:"v",
            color:"#000000",
          },{
            label:"w",
            color:"#000000",
          },{
            label:"x",
            color:"#000000",
          },{
            label:"4",
            color:"red",
          },{
            label:"5",
            color:"red",
          },{
            label:"6",
            color:"red",
          },{
            label:"y",
            color:"#000000",
          },{
            label:"z",
            color:"#000000",
          },{
            label:".",
            color:"#000000",
          },{
            label:"7",
            color:"red",
          },{
            label:"8",
            color:"red",
          },{
            label:"9",
            color:"red",
          },{
            label:"+",
            color:"#000000",
          },{
            label:"_",
            color:"#000000",
          },{
            label:"-",
            color:"#000000",
          },{
            label:"大写",
            color:"#000000",
          },{
            label:"0",
            color:"red",
          },{
            label:"退格",
            color:"#000000",
          }
        ],
        focusInput:null,
      }
    },
    methods:{
      getUrlMessage(){
        let params = this.$route.params.params.split(",");//将该网页的参数转化为数组
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
        this.scrollerHeightPassBill = ((window.innerHeight * 0.98 - 80) - 20) * 0.75 - 35 - 60;
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
      getRadio4Data() {
        let data = {
          tableName: "wear_weaving",
          sort: "DESC",
          sortColumn: "create_time",
          query: {
            status: 2
          }
        };
        let url = "/report/getSimpleReport";
        common_api(url, data, this.companyId)
          .then(res => {
            console.log(res);
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].machine_id == -1) {
                res.data.data[i].machine_id = "手工穿综"
              }
            }
            this.yczList = res.data.data;
            this.yczListLength = res.data.data.length;
            console.log(this.yczList)
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
            this.machineIdSelected = "";
            if(response.data.data){
              let changeWSData = response.data.data;
              this.productName = changeWSData.productNameWeaving;
              this.axisNo = changeWSData.axisNo;
              this.WeavingsupplierName = changeWSData.lmWeavingPlanB.supplierName;
              this.WeavingsupplierCode = changeWSData.lmWeavingPlanB.supplierCode;
              this.ZjwarpsupplierName = changeWSData.lmZjwarpPlanB.supplierName;
              this.ZjwarpsupplierCode = changeWSData.lmZjwarpPlanB.supplierCode;
              this.yieldMeterSemi = changeWSData.yieldMeterSemi;
              this.workQty = changeWSData.lmWarpPlanDetail.workQty1+changeWSData.lmWarpPlanDetail.workQty2+changeWSData.lmWarpPlanDetail.workQty3;
              //end
              if(!response.data.data.productNameWeaving){
                response.data.data.productNameWeaving = response.data.data.productName
              }
              this.all_order_list = [];
              this.all_order_list.push(response.data.data);
              console.log(this.all_order_list);
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
        this.resetRecord();
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
      right_up() {
        if (this.radio == 'radio4') {
          if (document.getElementById("board_con_bottom").scrollTop) {

          }
          document.getElementById("board_con_bottom").scrollTop -= 300;

        } else {
          if (document.getElementById("rightDiv").scrollTop - parseInt(this.label_height) * 3 - 60 >= 0) {
            document.getElementById("rightDiv").scrollTop -= parseInt(this.label_height) * 2;
            document.getElementById("right_down").style.display = "inline-block";
          } else {
            document.getElementById("rightDiv").scrollTop = 0;
            document.getElementById("right_up").style.display = "none";
            document.getElementById("right_down").style.display = "inline-block";
          }
        }

      },
      right_down() {
        if (this.radio == 'radio4') {
          document.getElementById("board_con_bottom").scrollTop += 300;//调整滚动距离的，
        } else {
          if (document.getElementById("rightDiv").scrollTop + parseInt(this.label_height) * 3 + 46 <= document.getElementById("rightDiv").scrollHeight) {
            document.getElementById("rightDiv").scrollTop += parseInt(this.label_height) * 2;
            document.getElementById("right_up").style.display = "inline-block";
          } else {
            document.getElementById("rightDiv").scrollTop = document.getElementById("rightDiv").scrollHeight;
            document.getElementById("right_down").style.display = "none";
            document.getElementById("right_up").style.display = "inline-block";
          }
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
      changeRadio(radioId) {
        this.radio = radioId;
        for (let i = 1; i < 5; i++) {
          document.getElementById("radio" + i).style.backgroundColor = "white";
        }
        document.getElementById(radioId).style.backgroundColor = "#409EFF";
        if (this.radio == 'radio4') {
          this.getRadio4Data();

        }
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
        let order_list = {
          productNameWeaving: this.all_order_list[0].productNameWeaving,
          machineAxis: this.all_order_list[0].machineId
        };
        order_list.productName = this.all_order_list[0].productNameWeaving;
        order_list.supplierCode = this.all_order_list[0].lmZjwarpPlanB.supplierCode;
        order_list.supplierName = this.all_order_list[0].lmZjwarpPlanB.supplierName;
        order_list.supplierCode = this.all_order_list[0].lmWeavingPlanB.supplierCode;
        order_list.supplierName = this.all_order_list[0].lmWeavingPlanB.supplierName;
        order_list.yieldMeterSemi = this.all_order_list[0].yieldMeterSemi;
        this.$refs.printClothCard.getData(order_list,order_detail_list,0);
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
      addCloth() {
        this.$store.state.showLoadingLog = true;
        let id = "000" + (this.order_detail_list.length + 1);
        id = id.substr(id.length - 3);
        console.log(this.order_detail_list);
        let code = this.order_detail_list[0].id.substr(0, this.order_detail_list[0].id.length - 3);
        let message = {};
        let data = {};
        data = [];
        let order_detail_list = [];
        this.newCodeNum = this.addNumber;//用于标志新加布票
        for (let i = 0; i < this.addNumber; i++) {
          message = {};
          message.id = code + id;
          message.orderPlanId = this.order_detail_list[0].orderPlanId;
          message.productName = this.all_order_list[0].productNameWeaving;
          message.printCode = this.barCode;
          message.barCode = "P" + this.order_detail_list[0].id.substr(1, this.order_detail_list[0].id.length - 4);
          message.machineAxis = this.machineIdSelected;
          message.yieldMeterSemi = this.order_detail_list[0].yieldMeterSemi;
          message.printCount = 1;
          data.push(message);
          order_detail_list.push({
            staff_id: this.staff_id,
            currentRealYield: this.order_detail_list[0].yieldMeterSemi,
            id: code + id,
            machineAxis: this.machineIdSelected,
            axisNo: this.all_order_list[0].axisNo,
            print_count: this.order_detail_list.length + 1 + i
          });
          id++;
          id = "000" + id;
          id = id.substr(id.length - 3);
        }
        weaving_print_api("/pce-cloth-each/add", data, this.companyId)
          .then(response => {
            this.showAddClothDialog = false;
            this.getDetails(this.all_order_list[0].zbWarpPlanId);
            let order_list = {
              productNameWeaving: this.all_order_list[0].productNameWeaving,
              machineAxis: this.all_order_list[0].machineId
            };
            console.log(this.all_order_list[0]);
            console.log(order_detail_list);
            order_list.productName = this.all_order_list[0].productNameWeaving;
            order_list.supplierCode = this.all_order_list[0].lmZjwarpPlanB.supplierCode;
            order_list.supplierName = this.all_order_list[0].lmZjwarpPlanB.supplierName;
            order_list.supplierCode = this.all_order_list[0].lmWeavingPlanB.supplierCode;
            order_list.supplierName = this.all_order_list[0].lmWeavingPlanB.supplierName;
            order_list.yieldMeterSemi = this.all_order_list[0].yieldMeterSemi;
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
      getPrintStatus() {
        if (this.all_order_list[0].machineId || this.machineIdSelected) {
          if(this.WeavingsupplierCode&&this.WeavingsupplierName){
            this.startPrint();
          }else{
            this.alterPart();
          }
        } else {
          this.showMachineTable = true;
        }
      },
      startPrint(){
        this.showModifiedVarieties = false;
        let data = {};
        data.tableName = "lm_weaving_plan_b";
        data.query = {
          js_print_code: this.barCode
        };
        data.selectFields = ["id"];
        common_api("/report/getSimpleReport", data, this.companyId)
          .then(response => {
            if (response.data.data[0]) {
              this.putUpAxis();
            } else {
              if (this.all_order_list[0].lmWarpPlanDetail.workQty1) {
                let print_meter = parseInt(this.all_order_list[0].lmWarpPlanDetail.workQty1);
                if (this.all_order_list[0].lmWarpPlanDetail.workQty2) {
                  print_meter += this.all_order_list[0].lmWarpPlanDetail.workQty2
                }
                if (this.all_order_list[0].lmWarpPlanDetail.workQty3) {
                  print_meter += this.all_order_list[0].lmWarpPlanDetail.workQty3
                }
                this.print_num = Math.ceil(print_meter / 120);
              } else {
                this.print_num = 1
              }
              this.showAddNewClothDialog = true;
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      yieldNewBarCode() {
        if (!this.$store.state.showLoadingLog) {
          this.$store.state.showLoadingLog = true;
          this.showAddNewClothDialog = false;
          let data = {};
          data.tableName = "lm_weaving_plan_b";
          data.selectFields = ["bar_code", "order_sheet_id"];
          data.query = {
            order_sheet_id: this.all_order_list[0].orderSheetId
          };
          common_api("/report/getSimpleReport", data, this.companyId)
            .then(response => {
              console.log(response.data.data);
              let newBarCode = "";
              if (response.data.data.length !== 0) {
                let lastIndex = response.data.data.length - 1;
                let lastSeriesNo = parseInt(response.data.data[lastIndex].bar_code.slice(this.all_order_list[0].orderSheetNo.length+2));
                let newSeriesNo = (lastSeriesNo + 1).toString();
                newSeriesNo = ("000" + newSeriesNo).slice(-3);
                newBarCode = "FB" + this.all_order_list[0].orderSheetNo + newSeriesNo;
              } else {
                newBarCode = "FB" + this.all_order_list[0].orderSheetNo + "01";
              }
              console.log("织造单号：" + newBarCode);
              console.log(this.all_order_list[0]);

              let print_meter = parseInt(this.all_order_list[0].lmWarpPlanDetail.workQty1);
              if (this.all_order_list[0].lmWarpPlanDetail.workQty2) {
                print_meter += this.all_order_list[0].lmWarpPlanDetail.workQty2
              }
              if (this.all_order_list[0].lmWarpPlanDetail.workQty3) {
                print_meter += this.all_order_list[0].lmWarpPlanDetail.workQty3
              }
              this.newBarCode = newBarCode;
              console.log(this.print_num);
              let print_num = this.print_num;
              console.log("打印张数:" + print_num);
              let order_detail_list = [];
              let order_list = {
                company_Id: this.companyId,
                productName: this.all_order_list[0].productNameWeaving,
                machineAxis: this.all_order_list[0].machineId,
              };
              order_list.ZjwarpsupplierCode = this.all_order_list[0].lmZjwarpPlanB.supplierCode;
              order_list.ZjwarpsupplierName = this.all_order_list[0].lmZjwarpPlanB.supplierName;
              order_list.supplierCode = this.all_order_list[0].lmWeavingPlanB.supplierCode;
              if(this.WeavingsupplierName){
                order_list.supplierName =this.WeavingsupplierCode;
              }
              order_list.supplierName = this.all_order_list[0].lmWeavingPlanB.supplierName;
              if(this.WeavingsupplierName){
                order_list.supplierName =this.WeavingsupplierName;
              }
              let dataObject = {};
              let addCode = "";
              for (let i = 0; i < print_num; i++) {
                dataObject = {};
                dataObject.print_count = 1 + i;
                dataObject.axisNo = this.all_order_list[0].axisNo;
                dataObject.printCode = this.barCode;
                dataObject.staff_id = this.staff_id;
                addCode = "00" + dataObject.print_count;
                dataObject.volumeSemi = addCode.substring(addCode.length - 3);
                dataObject.id = this.newBarCode + dataObject.volumeSemi;
                dataObject.yieldMeterSemi = 120;
                dataObject.productName=this.productNameWeaving;
                dataObject.supplierCode=this.WeavingsupplierCode;
                dataObject.supplierName=this.WeavingsupplierName;
                order_detail_list.push(dataObject);
              }
              order_list.companyId = this.companyId;
              this.$refs.printClothCard.getData(order_list, order_detail_list);
              this.printClothCardReturn(order_detail_list, print_meter);
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
          if(this.all_order_list[0].productNameWeaving){
            data.productId = this.getProductIdByName(this.all_order_list[0].productNameWeaving);
            data.productName = this.all_order_list[0].productNameWeaving;
          }else{
            data.productId = this.getProductIdByName(this.all_order_list[0].productName);
            data.productName = this.all_order_list[0].productName;
          }
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
          data.supplierCode=this.WeavingsupplierCode;
          data.supplierName=this.WeavingsupplierName;
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
      alterPart(){
        this.WeavingsupplierCodeNow = this.WeavingsupplierCode?this.WeavingsupplierCode:"";
        this.WeavingsupplierNameNow = this.WeavingsupplierName?this.WeavingsupplierName:"";
        this.productNameNow = this.all_order_list[0].productName?this.all_order_list[0].productName:"";
        this.productName = this.all_order_list[0].productName?this.all_order_list[0].productName:"";
        this.showModifiedVarieties = true;
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
        this.editBySelf();
      },
      //验证是否有织造加工单
      addBySelf: function () {
        if (
          this.all_order_list[0].productNameWeaving === this.productName&&
          this.all_order_list[0].lmWeavingPlanB.supplierCode === this.WeavingsupplierCode&&
          this.all_order_list[0].lmWeavingPlanB.supplierName === this.WeavingsupplierName&&
          this.all_order_list[0].axisNo === this.axisNo
        ){
          if (this.order_detail_list.length > 0) {
            this.showAddClothDialog = true
          } else {
            this.$message.warning("未生成织造加加工单，请先提交织造加工单");
          }
        }else {
          this.showConfirmDialog = true
        }
      },
      changeRecord: function () {
        this.showChangeRecordCard = true
      },
      resetRecord(){
        this.yieldMeterSemi = this.supplierCode = this.supplierName = this.axisNo = this.productName = this.WeavingsupplierName = this.WeavingsupplierCode = '';
      },
      editBySelf(){
        let data = {};
        data.jsPrintCode=this.barCode;
        data.productName=this.productName;
        data.supplierCode=this.WeavingsupplierCode;
        data.supplierName=this.WeavingsupplierName;
        data.yieldMeterSemi=this.yieldMeterSemi;

        let url = "/lm-weaving-plan-b/update";
        warp_api(url, data, this.companyId)
        //   weaving_api(url, data, this.companyId)
          .then(response => {
            this.getDataByCardNumber(this.barCode)
          })
          .catch(error => {
            console.log(error);
          });
      },
      changePrint(){
        this.editBySelf();
        this.showConfirmDialog = false;
        this.showAddClothDialog = true;
      },
      selectTableButtonAll(index){
        if(!this.WeavingsupplierCode){
          this.WeavingsupplierCode = "";
        }
        if(!this.WeavingsupplierName){
          this.WeavingsupplierName = "";
        }
        if(!this.productName){
          this.productName = "";
        }
        let buttonName =  this.buttonListAll[index].label;
        if(buttonName === "小写"){
          this.buttonListAll=this.buttonListS;
        }else if(buttonName === "大写"){
          this.buttonListAll=this.buttonListB;
        }else if(buttonName === "退格"){
          switch(this.focusInput){
            case "WeavingsupplierCode":
              this.WeavingsupplierCode = this.WeavingsupplierCode.substring(0,this.WeavingsupplierCode.length-1);
              break;
            case "WeavingsupplierName":
              this.WeavingsupplierName = this.WeavingsupplierName.substring(0,this.WeavingsupplierName.length-1);
              break;
            case "productName":
              this.productName = this.productName.substring(0,this.productName.length-1);
              break;
          }
          if(this.focusInput === "axleNumber"){
            this.outputSubmitForm.axleNumber = this.outputSubmitForm.axleNumber.substring(0,this.outputSubmitForm.axleNumber.length-1)
          }else if(this.focusInput === "finished_meter"){
            this.outputSubmitForm.finished_meter = this.outputSubmitForm.finished_meter.substring(0,this.outputSubmitForm.finished_meter.length-1)
          }
        }else{
          switch(this.focusInput){
            case "WeavingsupplierCode":
              this.WeavingsupplierCode += buttonName;
              break;
            case "WeavingsupplierName":
              this.WeavingsupplierName += buttonName;
              break;
            case "productName":
              this.productName += buttonName;
              break;
          }
        }
        //对焦
        switch(this.focusInput){
          case "WeavingsupplierCode":
            this.$refs.WeavingsupplierCode.focus();
            break;
          case "WeavingsupplierName":
            this.$refs.WeavingsupplierName.focus();
            break;
          case "productName":
            this.$refs.productName.focus();
            break;
        }
      },
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
          let _this = this;
          this.$store.commonClock = setTimeout(function () {
            //_this.$message.warning("出现异常，自动取消上一步操作");
            _this.$store.state.showLoadingLog = false;
          },15000)
        }else{
          clearInterval(this.$store.state.commonClock);
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
  .changeWS {
    .changeWS-row {
      display: flex;
      align-items: center;
      margin: 10px 0;

      > div {
        display: flex;
        flex: 1;
        width: 50%;
        input {
          display: inline-block;
          width: 60%;
          font-weight: bolder;
        }
        span {
          padding: 0 10px;
          font-size: 1.8rem;
          font-weight: bolder;
          word-break: keep-all;
        }
      }

    }
    .changeWS-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      div {
        padding: 5px 70px;
        margin-top: 8%;
        text-align: center;
        padding-left: 160px;
        padding-right: 160px;
      }
    }
  }
  .pass-bill{
    position: relative;
  }
  .recorded-F{
    font-size: 1.8rem;
    font-weight: bolder;
    position: absolute;
    right: 0;
    span{
      margin-left: 0.5rem;
      font-weight: bold
    }
  }
  .board_con_bottom{
    overflow: hidden;
    width: 95%;
  }
  .board_con_bottom_one {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0.8rem;
    span{
      font-size: 1.5rem;
      font-weight: bolder;
      text-align: center;
    }
    >:nth-child(1){
      width: 50%;
    }
    >:nth-child(2){
      width: 25%;
    }
    >:nth-child(3){
      width: 25%;
    }
    >:nth-child(4){
      width: 25%;
    }
    >:nth-child(5){
      width: 18%;
    }
    >:nth-child(6){
      width: 17%;
    }
    >:nth-child(7){
      width: 40%;
    }
  }
  .board_con_bottom_one:nth-child(odd){
    background-color: lightgray;
  }
  .board_con_bottom_head {
    width: 95%;
    padding: 1.5rem 0 0.5rem 0;
    display: flex;
    span{
      font-size: 1rem;
      text-align: center;
      font-weight: bolder;
    }
    >:nth-child(1){
      width: 27%;
    }
    >:nth-child(2){
      width: 10%;
    }
    >:nth-child(3){
      width: 10%;
    }
    >:nth-child(4){
      width: 10%;
    }
    >:nth-child(5){
      width: 10%;
    }
    >:nth-child(6){
      width: 6%;
    }
    >:nth-child(7){
      width: 27%;
    }
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
