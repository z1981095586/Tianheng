<template>
  <div  @click="makeFullScreen">
    <!--织轴绑定-->
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
    <!--经轴确认-->
    <el-dialog
      :visible.sync="showConfirmAxleTable"
      width="1600px"
      append-to-body
      :close-on-click-modal="false"
      :before-close="confirmAxleFinished"
      @open="changeConfirm"
    >
      <div style="text-align: center">
        <p style="font-size: 3rem">经轴绑定模式</p>
        <!--<el-button type="primary" @click="changeAxleTableMode('showModifyAxleTable')"></el-button>-->
      </div>
      <el-button type="success" @click="confirmAxleFinished"  class="rectangleButton">
        <p  class="middleButtonFont">保存并退出</p>
      </el-button>
      <el-button type="primary" @click="changeAxleTableMode('showModifyAxleTable')"  class="rectangleButton">
        <p  class="middleButtonFont">修改经轴</p>
      </el-button>
      <p class="standard_font">点击下方区域即可扫码确认经轴，显示绿色为绑定成功</p>
      <input v-model="axleNum"  @change="confirmAxle"   style="display: inline-block;font-size: 30px;width: 100%;height: 80px;"></input>
      <table cellspacing='0' cellpadding='0' border="0" width="100%" height="400px" style="overflow-y: auto">
        <tr v-for="indexTr in 3">
          <td v-for="indexTd in 12" style="text-align: center">
            <el-button plain type="primary" disabled :id="axleListArray[(indexTr-1)*12+indexTd-1].beamName+'confirm'" v-if="axleListArray[(indexTr-1)*12+indexTd-1]" style="width: 6rem;height: 6rem">
              <p class="big_font" style="font-size: 18px">{{axleListArray[(indexTr-1)*12+indexTd-1].beamName}}</p>
            </el-button>
          </td>
        </tr>
      </table>
    </el-dialog>
    <!--经轴换绑-->
    <el-dialog
      :visible.sync="showModifyAxleTable"
      width="1200px"
      append-to-body
      :close-on-click-modal="false"
      :before-close="changeAxleFinished"
    >
      <div style="text-align: center">
        <p style="font-size: 3rem">经轴修改模式</p>
        <!--<el-button type="primary" @click="changeAxleTableMode('showConfirmAxleTable')"><p style="font-size: 20px">修改模式，点击切换</p></el-button>-->
      </div>
      <el-tooltip class="item" effect="dark" content="选择轴号进行删除，删除后无法取消" placement="top-start">
        <el-button type="danger" @click="deleteAxle"  class="rectangleButton">
          <p class="middleButtonFont">删除</p>
        </el-button>
      </el-tooltip>
      <el-button type="primary" @click="changeAxleTableMode('showConfirmAxleTable')"  class="rectangleButton">
        <p  class="middleButtonFont">绑定经轴</p>
      </el-button>
      <el-button type="success" @click="changeAxleFinished"  class="rectangleButton">
        <p class="middleButtonFont">保存并退出</p>
      </el-button>
      <p class="standard_font">点击下方区域即可扫码新增经轴，点击经轴选中进行操作，当前选中{{axleSelected}}</p>
      <input v-model="axleNum"  @change="getNewAxleConfirm" @focus="confirmAddPermission"  style="display: inline-block;font-size: 30px;width: 100%;height: 80px;"></input>
      <table cellspacing='0' cellpadding='0' border="0" width="100%" height="400px" style="overflow-y: auto">
        <tr v-for="indexTr in 5">
          <td v-for="indexTd in 7" style="text-align: center">
            <el-button plain type="primary" :id="axleListArray[(indexTr-1)*7+indexTd-1].beamName" v-if="axleListArray[(indexTr-1)*7+indexTd-1]" style="width: 80px;height: 80px" @click="chooseAxle(axleListArray[(indexTr-1)*7+indexTd-1].beamName)">
              <p class="big_font" style="font-size: 18px">{{axleListArray[(indexTr-1)*7+indexTd-1].beamName}}</p>
            </el-button>
          </td>
        </tr>
      </table>
    </el-dialog>
    <!--交换班确认-->
    <el-dialog
      :visible.sync="showChangeStaffMessage"
      width="1200px"
      append-to-body
      :close-on-click-modal="false"
    >
      <changeStaffMessage></changeStaffMessage>
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
    <!--增加织轴-->
    <el-dialog
      :visible.sync="showAddAxisTable"
      width="800px"
      append-to-body
      :close-on-click-modal="false"
    >
      <div slot="title" style="font-size: 2.5vw">增加织轴</div>
      <div style="font-size: 2.5vw">
        当前轴设定产量：<span style="color: #F9243D">{{dataSelect.workQty || ""}}</span>米<br>
        当前轴完成产量：<span style="color: #F9243D">{{dataSelect.currentRealYield || ""}}</span>米<br>
        新增轴设定产量：<span style="color: #F9243D">{{dataSelect.workQty || ""}}</span>米<br>
      </div>
      <div style="width: 100%;text-align: center;margin-top: 5%">
        <el-button type="primary" style="width: 8vw;height: 8vw;margin-right:50px;margin-bottom: 5px" size="medium" @click="cutAxle">
          <p  style="font-weight: bolder;font-size: 2.5vw;width: 100%">确认<br>新增</p>
        </el-button>
        <el-button type="success" style="width: 8vw;height: 8vw;margin-bottom: 5px" size="medium" @click="showAddAxisTable = false">
          <p  style="font-weight: bolder;font-size: 2.5vw;width: 100%">取消<br>新增</p>
        </el-button>
      </div>
    </el-dialog>

    <!--打印经轴-->
    <!--<el-dialog-->
    <!--:visible.sync="printAxisTable"-->
    <!--width="500px"-->
    <!--append-to-body-->
    <!--&gt;-->
    <!--<div style="width: 100%;text-align: center">-->
    <!--<printAxis  ref="printAxisTable"></printAxis>-->
    <!--</div>-->
    <!--</el-dialog>-->
    <printAxis style="display: none" ref="printAxisTable"></printAxis>
    <printClothCard style="display: none" ref="printClothCard" @printReturn="printReturn"></printClothCard>
    <!--头部-->
    <el-dialog
      :visible.sync="otherProduceDialogShow"
      width="1600px"
      append-to-body
      :close-on-click-modal="false"
    >
      <otherProductTable ref="otherProductTable" :order_list="order_list"  :otherProduceDialogShow="otherProduceDialogShow" @cancel="otherProduceDialogShow=false" ></otherProductTable>
    </el-dialog>
    <!--其他产量对话框-->
    <div style="height: 80px;background-color: #29374b;width: 100%">
      <headComponent ref="headComponent" @selectWorker="selectWorker" @getData="getDataRefresh" @getStaffNameById="getStaffNameById" @returnFunc="returnFunc"></headComponent>
    </div>
    <div :style="{height: scrollerHeight,width:scrollerWidth}" style="margin-top: 10px;">
      <div>
        <div :style="{height: scrollerHeightTop,width:scrollerWidthLeft}" style="display: inline-block">
          <el-card style="width: 100%;" :style="{height: scrollerHeightTop,width:scrollerWidthLeft}" shadow="hover">
            <div style="width: 93%;margin-left: 5%" >
              <p class="standard_font">点击下方区域即可扫码</p>
              <input v-model="barCode" :style="{height:inputHeight,paddingRight:paddingRight}" @input="batchCodeChange(barCode)"   style="display: inline-block;font-size: 30px;width: 100%"></input>
              <img :src="delete_icon"  style="display: inline-block;position: fixed" @click="barCode = ''" :style="{opacity:0.2,height:buttonHeight,left:buttonLeft,top:buttonTop}">
            </div>
          </el-card>
        </div>
        <div :style="{height: scrollerHeightTop,width:scrollerWidthRight}" style="display: inline-block;margin-left: 10px">
          <el-card style="width: 100%;position:relative" :style="{height: scrollerHeightTop,width:scrollerWidthRight}" shadow="hover">
            <table cellspacing='0' cellpadding='0' border="0" width="100%" style="display: inline-block;">
              <tr>
                <td style="width: 400px" class="standard_font">
                  计划单号：{{order_list.orderSheetPlan.orderSheetNo}}
                </td>
                <td style="width: 400px" class="standard_font">
                  计划米数：{{order_list.planYield}}
                </td>
                <td style="width: 300px" class="standard_font">
                  设备编号：{{order_list.machineId}}
                </td>
                <td rowspan="6" style="width: 300px;border-width: 3px;"  >
                  <div style="width: 100%;margin-top:-25px;margin-left: 20px" :style="{height:scrollerHeightRightButton}" >
                    <div style="width: 100%;background-color: #29374b;height: 22%" @click="changeAxle">
                      <p class="big_font" style="text-align: center;color:white">经轴换绑</p>
                    </div>
                    <div style="height: 80%;word-break: break-all;word-wrap: break-word;overflow-y: auto" class="b_title"  @click="changeAxle">
                      {{axleList}}
                    </div>
                    <div style="width: 100%;background-color: #e5e6e9;height: 25%;text-align: center">
                      <el-button type="danger" style="width: 45%" @click="printAxis"><p style="font-size: larger;font-weight: bolder;">打 印</p></el-button>
                      <el-button type="primary" style="width: 45%" @click="changeAxle"><p style="font-size: larger;font-weight: bolder">换 绑</p></el-button>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="width: 400px" class="standard_font">
                  加工单号：{{order_list.barCode}}
                </td>
                <td style="width: 300px" class="standard_font">
                  生产速度：
                </td>
                <td style="width: 300px" class="standard_font">
                  生产米数：{{order_list.realYield+"米"}}
                </td>
              </tr>
              <tr>
                <td style="width: 300px" class="standard_font">
                  本班产量：
                </td>
                <td style="width: 300px" class="standard_font">
                  本班停机：
                </td>
                <td class="standard_font">
                  浆纱织轴数：{{order_list.axialNumber}}
                </td>
              </tr>
              <!--<tr>-->
              <!--<td colspan="3" class="standard_font">-->
              <!--整经轴号:{{axleList}}-->
              <!--</td>-->
              <!--</tr>-->
              <tr>
                <td colspan="3" class="standard_font">
                  备注：{{order_list.remark}}
                </td>
              </tr>
            </table>
              <el-button type="warning" style="height: 100px;position: absolute;   width: 11rem;
    height: 4rem;
        right: 52rem;
    top: 10rem;    padding: 10px 40px;" size="medium" @click="otherProduceDialogShow=true">
              <div :style="{height:button_height}" style="display: inline-block">
                <p class="big_font" style="color: white;height: 70%;line-height:70%;margin-top: 13%">其他产量</p>
              </div>
            </el-button>
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
                    <td colspan="2">
                      <p class="standard_font" style="display: inline-block;margin-top: 20px">浆纱单&nbsp{{item.barCode}}</p>
                      <img :src="selectedPicture" alt="" width="30px" style="display: inline-block;" v-show="item.barCode === barCode">
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p class="standard_font">品名&nbsp{{item.orderSheetPlan.productName}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <p class="standard_font">机台号&nbsp{{item.machineId}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 50%">
                      <p class="small_font">单据编号&nbsp{{item.orderSheetId}}</p>
                    </td>
                    <td style="width: 50%">
                      <p class="small_font">合轴数&nbsp{{item.axialNumber}}</p>
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
              <img id="right_up" :src="arrow_icon" :style="{top:upArrowTop,left:arrowRight,width:arrowWidth}" style="position: fixed;webkit-transform: rotate(90deg);" @click="right_up">
              <img id="right_down" :src="arrow_icon" :style="{top:downArrowTop,left:arrowRight,width:arrowWidth}" style="position: fixed;webkit-transform: rotate(-90deg)" @click="right_down">
            </div>
            <div class="left-bottomDiv" :style="{height: scrollerHeightBottomDiv}" id="rightDiv"  @mousedown="mousedown1" @touchstart="mousedown1" @mousemove="move1" @mouseup="end1" @touchmove.prevent="move1"  @touchend="end1" >
              <div class="standard_border" :id="'rightLabel'+ item.id" :style="{height:label_height_right}" v-for="item in order_detail_list" :label="item.axisNo" :key="item.id" style="width: 92%;margin-bottom: 10px;border-width:2px;padding: 10px" @click="rightLabelClick(item)">
                <table id="rightLabel" cellspacing='0' cellpadding='0' border="0" width="100%"  style="height: 100%;overflow-y: scroll">
                  <tr>
                    <td  style="width: 25%">
                      <p class="big_font">序号：{{item.index}}</p>
                    </td>
                    <td  style="width: 25%">
                      <p class="big_font">轴号：{{item.axisNo}}</p>
                    </td>
                    <td style="width: 40%" rowspan="2">
                      <el-button :style="{backgroundColor:getColor(item.status,[0,null])}" style="height: 80px;display: inline-block"  :disabled="item.status!==0&&item.status!==null" @click="setAxle(item)">
                        <div :style="{height:button_height}" style="display: inline-block">
                          <p class="big_font" style="color: white;height: 60%;line-height:60%;margin-top: 20%">织轴绑定</p>
                        </div>
                      </el-button>
                      <!--<el-button :style="{backgroundColor:getColor(item.status,[1,2])}" style="height: 80px;display: inline-block" v-if="item.status!==0&&item.status!==null"  @click="setAxle(item)">-->
                      <!--<div :style="{height:button_height}" style="display: inline-block">-->
                      <!--<p class="big_font" style="color: white;height: 60%;line-height:60%;margin-top: 20%">更换织轴</p>-->
                      <!--</div>-->
                      <!--</el-button>-->
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
                          <div class="big_font">这条织轴的设定米长是{{item.workQty}}米，确定要删除吗</div>
                          <br><br>
                          <el-button type="danger" style="height: 80px;margin-right:5px;margin-bottom: 5px" size="medium" @click="cutDownAxle(item)">
                            <p  style="font-weight: bolder;font-size: 1.5vw;width: 100%">确认删除</p>
                          </el-button>
                        </div>
                      </el-popover>
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
                        <div style="text-align: center">
                          <el-button :style="{backgroundColor:getColor(item.status,[2,3])}" style="height: 80px;display: inline-block" v-show="(item.status===2||item.status===3)" @click="addAxis(item)">
                            <div :style="{height:button_height}" style="display: inline-block">
                              <p class="big_font" style="color: white;height: 60%;line-height:60%;margin-top: 20%">增加织轴</p>
                            </div>
                          </el-button>
                          <el-button :style="{backgroundColor:getColor(item.status,[1,2,3])}" style="height: 80px;display: inline-block" v-show="(item.status===1||item.status===2||item.status===3)" @click="modifyAxis(item)">
                            <div :style="{height:button_height}" style="display: inline-block">
                              <p class="big_font" style="color: white;height: 60%;line-height:60%;margin-top: 20%">修改织轴</p>
                            </div>
                          </el-button>
                          <el-button :style="{backgroundColor:getColor(item.status,[2,3])}" style="height: 80px;display: inline-block" v-show="(item.status===2||item.status===3)" @click="print(item)">
                            <div :style="{height:button_height}" style="display: inline-block">
                              <p class="big_font" style="color: white;height: 60%;line-height:60%;margin-top: 20%">打印报表</p>
                            </div>
                          </el-button>
                          <el-button :style="{backgroundColor:getColor(item.status,[2,3])}" style="height: 80px;display: inline-block" v-show="(item.status===2||item.status===3)&&item.printStatus === 1&&companyId!=10000012" @click="clothPrint(item)">
                            <div :style="{height:button_height}" style="display: inline-block">
                              <p class="big_font" style="color: white;height: 60%;line-height:60%;margin-top: 20%">落布打印</p>
                            </div>
                          </el-button>
                        </div>
                        <el-button :style="{backgroundColor:getColor(item.status,[1,2,3,4])}" style="height: 80px;display: inline-block;background-color: #417804" slot="reference" :disabled="item.status===0||item.status===null" @click="showDetails(item)" v-show="item.status!==null">
                          <div :style="{height:button_height}" style="display: inline-block">
                            <p class="big_font" style="color: white;height: 60%;line-height:60%;margin-top: 20%">更多操作</p>
                          </div>
                        </el-button>
                      </el-popover>
                    </td>
                  </tr>
                  <tr>
                    <td style="">
                      <p class="big_font">生产米数：{{item.currentRealYield}}</p>
                    </td>
                    <td>
                      <p class="big_font">品名：{{order_list.orderSheetPlan.productName}}</p>
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
  import { warp_api,warp_api_get,realOutput_api,weaving_api,common_api } from "../../../static/api/api.js";
  import headComponent from './mainHead.vue';
  import setAxleTable from './warpSetAxle.vue';
  import outputSubmitTable from './produceComfirm.vue';
  import outputPrintTable from './../sizingCardPrint.vue';
  import changeStaffMessage from './changeStaffMessage.vue';
  import printAxis from './printAxis.vue';
  import printClothCard from './printClothCard.vue';
  import screenfull from "screenfull";
  import otherProductTable from './otherProductTable2.vue';
  export default {
    components:{headComponent,setAxleTable,outputSubmitTable,outputPrintTable,changeStaffMessage,printAxis,printClothCard,otherProductTable},
    data () {
      return {
        otherProduceDialogShow:false,
        buttonSetting:"",
        companyId:10000015,
        workShopId:null,
        scrollerHeight:null,
        scrollerWidth:null,
        scrollerHeightTop:null,
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
        axleList:null,
        axleListArray:[],
        showConfirmAxleTable:false,
        showModifyAxleTable: false,
        axleSelected:[],
        axleNum:null,
        axleNumNow:null,
        produce_details_list:[],
        selectId:null,
        ifGetPermission:false,
        axleConfirmedArray:[],
        axleListArrayLength:0,
        axleListArrayLengthNow:0,
        selectedPicture:require("../../../static/picture/select.png"),
        companyName:"浙江鑫海纺织有限公司",
        workshopId:null,
        showChangeStaffMessage:false,
        clock:null,
        printAxisTable:false,
        clickedRightLabel:null,
        scrollTop:true,
        optionConfirm:false,//用于判断织轴操作权限
        showOptionConfirmTable:false,
        buttonList:"1234567890",
        option_code:"",
        showModifyAxisTable:false,
        showAddAxisTable:false,
        dataSelect:{},
        printStaffName:null,
        lengthFinished:"",
        focusName:"",
        axisNo:"",
        funcName:null,
        newBarCode:""
      }
    },
    methods:{
      getUrlMessage(){
        let params = this.$route.params.params.split(",");
        let message = params[0];
        // console.log(params);
        this.companyId = params[1];
        this.$store.commit("setCompanyId",this.companyId);
        this.buttonSetting = "123"+message[0]+message[1]+"456"+message[2]+message[3]+"7890"+message[4];
        this.companyName = params[2];
        this.workshopId = params[3];
        this.$store.state.workshopId = this.workshopId;
        this.$refs.headComponent.getWorker("/s-staff-organization-relation/getJsStaff");
        this.$refs.headComponent.changeMainTitle("天衡浆纱工位操作系统");
        this.$refs.headComponent.sendMachineType("050000",this.workshopId);
        this.getData();
      },
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
        this.label_height_right =(((window.innerHeight*0.98 -80) -20)*0.75 - 64)/4 + "px";
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
        data.workshopId = this.workshopId;
        let url = "/lm-warp-plan-b/selectJsWithOrderSheetRecent";
        warp_api_get(url, data,this.companyId)
          .then(response => {
            // console.log(response.data.data);
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
        let url = "/lm-warp-plan-detail/selectJsDetailByWarpPlanId";
        warp_api(url, data,this.companyId)
          .then(response => {
            //  console.log(response.data.data);
            //==============增加小轴==============
            //let order_detail_list = response.data.data;
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
            this.order_detail_list = response.data.data;
            for (let i = 0; i < this.order_detail_list.length; i++) {
              this.order_detail_list[i].index = i + 1;
            }
            this.getAxle(warpPlanId);
            if(this.scrollTop){
              document.getElementById("right_down").style.display = "inline-block";
              document.getElementById("left_down").style.display = "inline-block";
              // document.getElementById("right_up").style.display = "none";
            }
            //document.getElementById("left_up").style.display = "none";
            this.clickedRightLabel = null;
            this.$store.state.showLoadingLog = false;
          })
          .catch(error => {
            console.log(error);
          });
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
      getAxle(warpPlanId){
        let data = {};
        data.warpPlanId = warpPlanId;
        let url = "/warp-change-axis/selectChangeAxis";
        warp_api_get(url, data,this.companyId)
          .then(response => {
            //console.log(response.data.data);
            this.axleListArray =  [];
            this.axleConfirmedArray = [];
            this.axleList="";
            let countAxle = 1;
            let firstSet = 0;
            for (let t = 0; t <  response.data.data.length; t++) {
              if(response.data.data[t]&&response.data.data[t].beamName!== null){
                // console.log(response.data.data[t].confirm);
                this.axleList =countAxle + ":" +  response.data.data[t].beamName;
                countAxle++;
                this.axleListArray = [{
                  "warpPlanId":  response.data.data[t].warpPlanId,
                  "beamName": response.data.data[t].beamName,
                  "zjwarpDetailId": response.data.data[t].zjwarpDetailId,
                  "confirm":response.data.data[t].confirm
                }];
                if(response.data.data[t].confirm === 1){
                  this.axleConfirmedArray.push(this.axleListArray[t]);
                }
                firstSet = t;
                t = response.data.data.length;
              }
            }
            for (let i = firstSet+1; i < response.data.data.length; i++) {
              if(response.data.data[i].beamName){
                this.axleList+=","+ countAxle + ":" +  response.data.data[i].beamName;
                countAxle++;
                this.axleListArray.push({
                  "warpPlanId":  response.data.data[i].warpPlanId,
                  "beamName": response.data.data[i].beamName,
                  "zjwarpDetailId": response.data.data[i].zjwarpDetailId,
                  "confirm":response.data.data[i].confirm
                });
                if(response.data.data[i].confirm === 1){
                  this.axleConfirmedArray.push(this.axleListArray[i]);
                }
              }
            }
            this.axleListArrayLength = this.axleListArray.length;
            this.axleListArrayLengthNow = this.axleListArray.length;
            // console.log(this.axleListArrayLength);
          })
          .catch(error => {
            console.log(error);
          });
      },
      changeConfirm(){
        this.$nextTick(()=>{
          for (let i = 0; i < this.axleListArray.length; i++) {
            if(this.axleListArray[i].confirm === 1){
              document.getElementById(this.axleListArray[i].beamName+"confirm").style.backgroundColor = "#67C23A";
            }
          }
        })
      },
      getDataByCardNumber(barCode){
        //console.log("查询");
        //this.barCode = barCode;
        //记录查询的barCode用于比较
        this.barCode = barCode;
        let data = {};
        data.barCode = barCode;
        data.workshopId = this.workshopId;
        let url = "/lm-warp-plan-b/selectJsWithOrderSheetRecent";
        warp_api_get(url, data,this.companyId)
          .then(response => {
            //  console.log(response.data.data);
            if(response.data.data.records.length>0){
              this.order_list = response.data.data.records[0];
              this.getDetails(response.data.data.records[0].id)
            }else{
              this.$message.warning("二维码错误或当前车间不存在这条记录");
            }
            if(this.scrollTop){
              document.getElementById("rightDiv").scrollTop = 0;
            }
            this.scrollTop = true;
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
      closeSetAxleTable(emitData){
        if(emitData.status){
          let data = {};
          data.id = this.dataSelect.id;
          data.axisNo = emitData.axleNumber;
          data.staffId = this.staff_id;
          data.vatNums = emitData.cylindersNumber;
          data.beamNums = emitData.axisNumber;
          let shiftObject = this.$refs.headComponent.getShiftName();
          if(shiftObject&&shiftObject.id){
            data.shiftWork = shiftObject.id-1;
            data.shiftStartDatetime = this.addDate(shiftObject.startTime);
            data.shiftEndDatetime =  this.addDate(shiftObject.endTime);
          }
          let url = "/lm-warp-plan-detail/jsSpindle";
          warp_api(url, data,this.companyId)
            .then(response => {
              // console.log(response);
              if(response.data.result === "fail"){
                let message =response.data.successMessage;
                this.$message.warning(message);
              }else{
                this.scrollTop = false;
                this.$message.success(response.data.successMessage);
                this.getDataByCardNumber(this.barCode);
                this.showSetAxleTable = false;
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
        // console.log(item);
        if(this.staff_id){
          this.$store.state.showLoadingLog = true;
          let data = {};
          data.machineId = this.order_list.machineId;
          data.workshopId = this.workshopId;
          let url = "/machine/getXHBoardSlasher";
          realOutput_api(url, data,this.companyId)
            .then(response => {
              //console.log(response.data);
              this.dataSelect = item;
              this.$store.state.ifShift = !(this.staff_id == this.dataSelect.currentStaffId);
              if(response.data.data.actualYarnLength){
                this.dataSelect.actualYarnLength = response.data.data.actualYarnLength;
              }else{
                this.$message.warning("没有读取到米数，请手动输入");
                this.dataSelect.actualYarnLength = 0;
              }
              this.dataSelect.staff_id = this.staff_id;
              this.dataSelect.staff_name = this.staff_name;
              this.showSubmitTable = true;
              this.$store.state.showLoadingLog = false;
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
        if(this.staff_id){
          this.dataSelect = item;
          this.showSetAxleTable = true;
          this.$nextTick(() => {
            this.$refs.setAxleTable.getIfIsJs(true);
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
        if(this.staff_id){
          this.dataSelect = item;
          this.$refs.headComponent.getStaffNameById(this.dataSelect.currentStaffId*1.0);
          this.dataSelect.staff_name = this.printStaffName;
          let data = {};
          data.id = this.dataSelect.id;
          data.staffId = this.staff_id;
          this.$store.state.showLoadingLog = true;
          let url = "/lm-warp-plan-detail/printingJs";
          // console.log(this.dataSelect);
          warp_api(url,data,this.companyId)
            .then(response => {
              this.$store.state.showLoadingLog = false;
              if(response.data.result === "fail"){
                let message =response.data.successMessage;
                this.$message.warning(message);
              }else {
                this.dataSelect.printCode = response.data.data;
                this.$nextTick(() => {
                  if (!this.dataSelect.actualYarnLength) {
                    this.dataSelect.actualYarnLength = this.dataSelect.workQty1 + this.dataSelect.workQty2 + this.dataSelect.workQty3;
                  }
                  if(!this.dataSelect.endDate){
                    this.dataSelect.endDate = this.today();
                  }
                  this.$refs.headComponent.getShiftName();
                  this.$refs.outputPrintTable.startPrint(this.order_list, this.dataSelect, this.companyId,this.companyName);
                })
              }
            })
            .catch(error => {
              console.log(error);
            });
        }else{
          this.$message.warning("请选择操作员工");
        }
      },
      clothPrint(item){
        // console.log(item);
        // console.log(this.order_list);
        if(!this.$store.state.showLoadingLog){
          this.$store.state.showLoadingLog = true;
          let data = {};
          data.tableName = "lm_warp_plan_b";
          data.selectFields =["print_count"];
          data.query = {
            bar_code:this.order_list.barCode
          };
          let print_num = Math.ceil(item.currentRealYield/110);//打印张数=完成米数/每卷米数
          if(item.lmWarpPlanB.yieldMeterSemi){
            print_num = Math.ceil(item.currentRealYield/item.lmWarpPlanB.yieldMeterSemi);
          }
          let print_count = 1;
          common_api("/report/getSimpleReport", data,this.companyId)
            .then(response => {
              console.log();
              if(response.data.result === "ok"){
                if(response.data.data[0]){
                  print_count = response.data.data[0].print_count;
                }
              }
              if(this.order_list.orderSheetPlan){
                this.order_list.productName = this.order_list.orderSheetPlan.productName;
              }
              this.yieldNewBarCode(item,print_num,print_count);
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      yieldNewBarCode(item,print_num,print_count){
        let data = {};
        console.log(this.order_list);
        data.tableName = "lm_weaving_plan_b";
        data.selectFields =["bar_code","order_sheet_id"];
        data.query = {
          order_sheet_id:this.order_list.orderSheetPlan.id
        };
        common_api("/report/getSimpleReport", data,this.companyId)
          .then(response => {
            console.log(response.data.data);
            let newBarCode = "";
            if(response.data.data.length !== 0){
              let lastIndex = response.data.data.length - 1;
              let lastSeriesNo = parseInt(response.data.data[lastIndex].bar_code.slice(this.order_list.orderSheetPlan.orderSheetNo.length+2));
              let newSeriesNo = (lastSeriesNo + 1).toString();
              newSeriesNo = ("000" + newSeriesNo).slice(-3);
              newBarCode = "FB" + this.order_list.orderSheetPlan.orderSheetNo + newSeriesNo;
            } else {
              newBarCode = "FB" + this.order_list.orderSheetPlan.orderSheetNo + "01";
            }
            console.log(newBarCode);
            this.newBarCode = newBarCode;
            let order_detail_list = [];
            let dataObject ={};
            let addCode = "";
            for (let i = 0; i < print_num; i++) {
              dataObject = JSON.parse(JSON.stringify(item));//深拷贝
              dataObject.print_count = print_count + i;
              addCode = "00" + dataObject.print_count;
              dataObject.volumeSemi = addCode.substring(addCode.length-3);
              dataObject.id = this.newBarCode + dataObject.volumeSemi;
              dataObject.yieldMeterSemi = item.lmWarpPlanB.yieldMeterSemi;
              order_detail_list.push(dataObject);
            }
            //console.log(order_detail_list);
            this.order_list.companyId = this.companyId;
            this.$refs.printClothCard.getData(this.order_list,order_detail_list);
            this.printClothCardReturn(order_detail_list);
          })
          .catch(error => {
            console.log(error);
          });
      },
      printClothCardReturn(order_detail_list){
        // console.log(this.order_list);
        // console.log(clothEaches);
        //落布返回记录，生成织造加工单
        if(order_detail_list.length>0){
          let data={};
          data.orderId = this.order_list.orderSheetId;
          data.orderSheetId = this.order_list.orderSheetId;
          data.barCode = "PB" + this.newBarCode.substring(2);
          data.jsPrintCode = this.dataSelect.printCode;
          // console.log(this.dataSelect.printCode);
          data.planDate = this.today();
          data.productId = this.getProductIdByName(this.order_list.orderSheetPlan.productName);
          data.productName = this.order_list.orderSheetPlan.productName;
          data.planPerson = this.staff_name;
          data.workshopId = this.workshopId;
          data.planYield = this.order_list.planYield;
          let clothEaches = [];
          for (let i = 0; i < order_detail_list.length; i++) {
            clothEaches.push({
              id:order_detail_list[i].id,
              volumeSemi:order_detail_list[i].volumeSemi,
              yieldMeterSemi: order_detail_list[i].lmWarpPlanB.yieldMeterSemi,
              remark:""
            })
          }
          data.clothEaches = clothEaches;
          data.yarnWeaving = "";
          data.macPlans = [{
            setYieldNum: clothEaches.length,
            singleYield: "110",
            remark: ""
          }];
          warp_api("/lm-weaving-plan-b/addByPrintCode",data,this.companyId)
            .then(response => {
              // console.log("addByPrintCode返回");
              // console.log(response.data);
              this.$message.success("成功生成织造单");
              this.getDetails(this.order_list.id);
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
      closeSubmitTable(emitData){
        //console.log(emitData);
        if(emitData.status!==null){
          let finalData = [];
          let data = {};
          data.id = this.dataSelect.id;
          data.machineId = this.order_list.machineId;
          data.empIds =  this.staff_id;
          data.workQtys = emitData.data;
          this.dataSelect.actualYarnLength =  emitData.data;
          data.typeId = emitData.status;
          finalData.push(data);
          let url = "/lm-warp-plan-detail/jsReport";
          warp_api(url, finalData,this.companyId)
            .then(response => {
              //console.log(response.data);
              if(response.data.result === "fail"){
                let message = response.data.successMessage;
                this.$message.warning(message);
              }else{
                this.getDataByCardNumber(this.barCode);
                if(emitData.step === 2){
                  this.print(this.dataSelect);
                }
              }
              this.scrollTop = false;
              this.$store.state.showLoadingLog = false;
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
          document.getElementById("left_down").style.display = "inline-block";
          document.getElementById("left_up").style.display = "none";
        }
      },
      left_down(){
        if(document.getElementById("leftDiv").scrollTop+parseInt(this.label_height)*3+46<=document.getElementById("leftDiv").scrollHeight){
          document.getElementById("leftDiv").scrollTop+= (parseInt(this.label_height)*3+46);
          document.getElementById("left_up").style.display = "inline-block";
        }else{
          document.getElementById("leftDiv").scrollTop = document.getElementById("leftDiv").scrollHeight;
          document.getElementById("left_up").style.display = "inline-block";
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
          document.getElementById("right_down").style.display = "inline-block";
        }
      },
      right_down(){
        if(document.getElementById("rightDiv").scrollTop+parseInt(this.label_height)*3+46<=document.getElementById("rightDiv").scrollHeight){
          document.getElementById("rightDiv").scrollTop+= (parseInt(this.label_height)*3+46);
          document.getElementById("right_up").style.display = "inline-block";
        }else{
          document.getElementById("rightDiv").scrollTop = document.getElementById("rightDiv").scrollHeight;
          // document.getElementById("right_down").style.display = "none";
          document.getElementById("right_up").style.display = "inline-block";
        }
      },
      showDetails(item){
        let data = {};
        data.beamName = item.axisNo;
        data.warpPlanId = this.order_list.id;
        data.process = "4";
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
        this.optionConfirm = false;
        // this.showChangeStaffMessage = true;
      },
      changeAxle(){
        this.ifGetPermission = this.$refs.headComponent.getPermissionStatus();
        if(this.ifGetPermission){
          this.showModifyAxleTable = true;
        }else{
          this.showConfirmAxleTable = true;
        }
      },
      chooseAxle(axleNum){
        if(this.axleSelected.indexOf(axleNum)>-1){
          this.axleSelected.splice(this.axleSelected.indexOf(axleNum),1);
          document.getElementById(axleNum).style.backgroundColor = "#ecf5ff";
        }else{
          document.getElementById(axleNum).style.backgroundColor = "#409EFF";
          this.axleSelected.push(axleNum);
        }
      },
      deleteAxle(){
        this.axleListArray = this.axleListArray.filter(item=>{
          return this.axleSelected.indexOf(item.beamName) < 0;
        });
        this.axleListArrayLengthNow = this.axleListArray.length;
        for (let i = 0; i < this.axleSelected.length; i++) {
          document.getElementById(this.axleSelected[i]).style.backgroundColor = "#ecf5ff";
        }
        this.axleSelected = [];
        this.axleList = "";
        for (let i = 0; i < this.axleListArray.length; i++) {
          if(i!==0){
            this.axleList+=","+this.axleListArray[i].beamName
          }else{
            this.axleList+=this.axleListArray[i].beamName
          }
        }
      },
      changeByCardNumber(item){
        this.order_list = item;
        this.getAxle(item.id);
        this.getDataByCardNumber(item.barCode)
      },
      confirmAxle(){
        if(this.axleNumNow){
          if((this.axleNum.length - this.axleNumNow.length)>1){
            this.axleNumNow = this.axleNum.substr(this.axleNumNow.length-this.axleNum.length);
            this.axleNum = this.axleNumNow;
          }else{
            this.axleNumNow = this.axleNum;
          }
        }else{
          this.axleNumNow = this.axleNum;
        }
        let data = {};
        data.printCode = this.axleNum;
        data.warpPlanId = this.order_list.id;
        let url = "/lm-zjwarp-plan-detail/selectByPrintCode";
        warp_api_get(url, data,this.companyId)
          .then(response => {
            //console.log(response);
            if(response.data.data){
              let newAxle = {
                "warpPlanId": this.order_list.id,
                "beamName": response.data.data.axisNo,
                "zjwarpDetailId": response.data.data.id
              };
              let result = this.axleListArray.some(item=>{
                if(item.beamName===newAxle.beamName){
                  return true
                }
              });
              if(result){
                document.getElementById(response.data.data.axisNo+"confirm").style.backgroundColor = "#67C23A";
                newAxle.confirm = 1;
                this.axleListArray.some(item=>{
                  if(item.beamName===newAxle.beamName){
                    item.confirm = 1
                  }
                });
                this.axleConfirmedArray.push(newAxle);
              }else{
                this.$message.warning("不存在此经轴")
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      getNewAxleConfirm(){
        //console.log(this.order_list);
        if(this.axleListArrayLengthNow >= this.axleListArrayLength){
          this.$confirm('轴数超出限制，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            customClass: 'message-logout'
          }).then(() => {
            this.getNewAxle()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消新增'
            });
          });
        }else{ }
        this.getNewAxle()
      },
      getNewAxle(){
        if(this.axleNumNow){
          if((this.axleNum.length - this.axleNumNow.length)>1){
            this.axleNumNow = this.axleNum.substr(this.axleNumNow.length-this.axleNum.length);
            this.axleNum = this.axleNumNow;
          }else{
            this.axleNumNow = this.axleNum;
          }
        }else{
          this.axleNumNow = this.axleNum;
        }
        let data = {};
        data.printCode = this.axleNum;
        data.warpPlanId = this.order_list.id;
        let url = "/lm-zjwarp-plan-detail/selectByPrintCode";
        warp_api_get(url, data,this.companyId)
          .then(response => {
            //console.log(response);
            if(response.data.data){
              let newAxle = {
                "warpPlanId": this.order_list.id,
                "beamName": response.data.data.axisNo,
                "zjwarpDetailId": response.data.data.id,
                "confirm":0
              };
              let result = this.axleListArray.some(item=>{
                if(item.beamName===newAxle.beamName){
                  return true
                }
              });
              if(result){
                this.$message.warning("已存在此经轴")
              }else{
                this.axleListArray.push(newAxle);
                this.axleListArrayLengthNow++;
                if(this.axleList.length === 0){
                  this.axleList+=response.data.data.axisNo;
                }else{
                  this.axleList+=","+response.data.data.axisNo;
                }
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      changeAxleFinished(){
        if(this.axleListArrayLengthNow!==this.axleListArrayLength){
          this.$confirm("总轴数应为"+this.axleListArrayLength+",现为"+this.axleListArrayLengthNow+"请保持总轴数与修改前相同", '提示', {
            confirmButtonText: '不保存并退出,稍后继续绑定',
            cancelButtonText: '继续绑定',
            type: 'warning',
            center: true,
            customClass: 'message-logout'
          }).then(() => {
            this.showConfirmAxleTable = false;
            this.showModifyAxleTable = false;
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '继续绑定'
            });
          });
        }else{
          this.showConfirmAxleTable = false;
          this.showModifyAxleTable = false;
          // let data = {};
          // data.warpChangeAxisVOS = this.axleListArray;
          // data.warpPlanId = this.order_list.id;
          // let url = "/warp-change-axis/changeAxis";
          // warp_api(url, data,this.companyId)
          //   .then(response => {
          //     this.getDataByCardNumber(this.barCode);
          //   })
          //   .catch(error => {
          //     console.log(error);
          //   });
        }
      },
      confirmAxleFinished(){
        if(this.axleListArray.length === this.axleConfirmedArray.length){
          this.changeAxleFinished();
        }else{
          this.$confirm('还未完成绑定, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            customClass: 'message-logout'
          }).then(() => {
            this.changeAxleFinished()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '继续绑定'
            });
          });
        }
      },
      changeAxleTableMode(name){
        if(name === "showModifyAxleTable"){
          if(this.$refs.headComponent.getPermissionStatus()){
            this.showModifyAxleTable = true;
            this.showConfirmAxleTable = false;
          }else{
            this.$message.warning("权限不足，请在设置中输入密码");
            this.$refs.headComponent.clickSettingIcon("permissionManage","showModifyAxleTable")
          }
        }else if(name === "showConfirmAxleTable"){
          this.showModifyAxleTable = false;
          this.showConfirmAxleTable = true;
        }
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
      printAxis(){
        if(!this.$store.state.showLoadingLog){
          this.$nextTick(()=>{
            this.$refs.printAxisTable.showPrintTable(this.axleListArray)
          });
        }
      },
      rightLabelClick(item){
        console.log("点击获取轴详情");
        console.log(item);
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
      cutDownAxle(item){
        if(this.optionConfirm&&!this.$store.state.showLoadingLog){
          let data = {};
          this.dataSelect = item;
          data.id = this.dataSelect.id;
          this.$store.state.showLoadingLog = true;
          let url = "/lm-warp-plan-detail/removeJsAxis";
          warp_api(url, data,this.companyId)
            .then(response => {
              this.getDetails(this.order_list.id);
              this.$store.state.showLoadingLog = false;
            })
            .catch(error => {
              console.log(error);
            });
        }else{
          this.showOptionConfirmTable = true;
          this.funcName = "cutDownAxle";
        }
      },
      printReturn(){
        this.getDetails(this.order_list.id);
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
      // modifyAxis(item){
      //   if(this.optionConfirm){
      //     this.showModifyAxisTable = true;
      //     this.focusName = "axisNo";
      //     this.dataSelect = item;
      //   }else{
      //     this.showOptionConfirmTable = true;
      //     this.focusName = "option_code";
      //   }
      // },
      addAxis(item){
        this.dataSelect = item;
        if(this.optionConfirm){
          //if(this.dataSelect.workQty > this.dataSelect.currentRealYield){
          this.dataSelect.newAddQty = this.dataSelect.workQty - this.dataSelect.currentRealYield;
          this.showAddAxisTable = true;
          // }else{
          //   this.$message.warning("当前轴已完成产量大于设定产量，无法增轴")
          // }
          // console.log(this.dataSelect);
        }else{
          this.funcName = "addAxis";
          this.showOptionConfirmTable = true
        }
      },
      cutAxle(){
        let data = {};
        data.id = this.dataSelect.smallBeamBelong?this.dataSelect.smallBeamBelong:this.dataSelect.id;
        let url = "/lm-warp-plan-detail/addJsAxis";
        warp_api(url, data,this.companyId)
          .then(response => {
            if(response.data.result === "fail"){
              this.showAddAxisTable = false;
              this.$message.warning(response.data.message);
              this.$store.state.showLoadingLog = false;
            }else{
              this.showAddAxisTable = false;
              this.$message.success("新增织轴成功");
              this.getDetails(this.order_list.id);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      submitModifyAxis(){
        if(!this.$store.state.showLoadingLog){
          this.$store.state.showLoadingLog = true;
          if(this.lengthFinished.length>0){
            let data = {};
            data.id = this.dataSelect.id;
            data.workQtys = this.lengthFinished*1.0;
            let url = "/lm-warp-plan-detail/updateReport";
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
            //console.log(this.dataSelect);
            let data = {};
            data.id = this.dataSelect.id;
            data.axisNo = this.axisNo;
            data.staffId = this.staff_id;
            let url = "/lm-warp-plan-detail/updateSpindle";
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
      modifyAxis(item){
        this.dataSelect = item;
        if(this.optionConfirm){
          this.showModifyAxisTable = true;
          this.focusName = "axisNo";
        }else{
          this.showOptionConfirmTable = true;
          this.funcName = "modifyAxis";
          this.focusName = "option_code";
        }
      },
      funcContinue(){
        //权限统一转接口
        if(this.funcName === "modifyAxis"){
          this.modifyAxis(this.dataSelect);
        }else if(this.funcName === "cutDownAxle"){
          this.cutDownAxle(this.dataSelect);
        }else if(this.funcName === "addAxis"){
          this.addAxis(this.dataSelect);
        }
        this.funcName = null;
      },
      //数据库权限获取
      returnFunc(funcName){
        if(funcName === "showModifyAxleTable"){
          this.showModifyAxleTable = true;
          this.showConfirmAxleTable = false;
        }
      },
      changeWorker(){
        this.$refs.headComponent.changeWorker();
      }
    },
    mounted() {
      this.getUrlMessage();
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
    width: 11rem;
    height: 3rem;
    background: red;
    font-size: 1.3rem;

    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: absolute;
    right: 52rem;
    top: 10rem;
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
  .el-icon-close:before{
    font-size: 6rem;
  }
  .message-logout{
    width: 60rem;
    .el-message-box__title{
      font-size: 2.5rem;
    }
    .el-button--small{
      font-size: 2.5rem;
      width: 8rem;
      height: 8rem;
      line-height:1.4;
      letter-spacing:4px
    }
    .el-message-box__status{
      span {
        font-size: 2.5rem;
      }
    }
    .el-message-box__message p{
      font-size: 2.5rem;
      margin-bottom: 20px;

    }
    .el-message-box__btns button:nth-child(2){
      margin-left: 100px;
    }
    .el-message-box__status::before{
      font-size: 5rem;
    }
  }
</style>

