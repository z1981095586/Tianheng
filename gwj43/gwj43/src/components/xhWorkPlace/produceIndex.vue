<template>
    <div>
      <!--更换机器-->
      <el-dialog
        :visible.sync="showMachineTable"
        width="1500px"
        append-to-body
        :close-on-click-modal="false"
      >
        <div slot="title" style="font-size: 48px">更换机器</div>
        <table cellspacing='0' cellpadding='0' width="100%" style="width: 760px;">
          <tr>
            <td style="min-width:250px;vertical-align: top;border-right: 2px solid lightgray ">
              <div class="changeMachineDiv">
                <el-select ref="machineIdSelected" v-model="machineIdSelected" filterable placeholder="请选择">
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
                    <el-button type="primary" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px;font-weight: bolder" @click="showMachineTable = false">确定</el-button>
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
      <!--头部-->
      <div style="height: 80px;background-color: #29374b;width: 100%">
        <headComponent ref="headComponent" @selectWorker="selectWorker" @getData="getDataRefresh"></headComponent>
      </div>
      <div :style="{height: scrollerHeight,width:scrollerWidth}" style="margin-top: 10px;">
        <div>
          <div :style="{height: scrollerHeightTop,width:scrollerWidthLeft}" style="display: inline-block">
            <el-card style="width: 100%;" :style="{height: scrollerHeightTop,width:scrollerWidthLeft}" shadow="hover">
              <div style="width: 30%;display: inline-block" >
                  <el-button :style="{height:inputHeight,width:inputHeight}" style="margin-top: 1.4vw" type="success" @click="changeMachine">
                    <div>
                      <p style="font-size: 30px;color: white">{{machineIdSelected}}</p>
                      <p style="font-size: 20px;color: white">点击更换</p>
                    </div>
                  </el-button>
              </div>
              <div style="width: 63%;margin-left: 3%;display: inline-block;vertical-align: top" >
                <p class="standard_font">点击下方区域即可扫码</p>
                <input v-model="barCode" :style="{height:inputHeight,paddingRight:paddingRight}" @input="batchCodeChange(barCode)"   style="display: inline-block;font-size: 25px;width: 100%"></input>
                <img :src="delete_icon"  style="display: inline-block;position: fixed" @click="barCode = ''" :style="{opacity:0.2,height:buttonHeight,left:buttonLeft,top:buttonTop}">
              </div>
            </el-card>
          </div>
          <div :style="{height: scrollerHeightTop,width:scrollerWidthRight}" style="display: inline-block;margin-left: 10px">
            <el-card style="width: 100%;" :style="{height: scrollerHeightTop,width:scrollerWidthRight}" shadow="hover">
                 <div style="width: 100%;height: 100%">
                   <table class="radioTable" cellspacing='0' cellpadding='0' width="100%" :height="scrollerHeightTopTable" style="font-size: 50px;text-align: center">
                     <tr>
                       <td id="radio1" @click="changeRadio('radio1')" style="background-color: #409EFF">
                         织造小票
                       </td>
                       <td id="radio2" @click="changeRadio('radio2')">
                         更换经轴
                       </td>
                       <td id="radio3" @click="changeRadio('radio3')">
                         更换纬纱
                       </td>
                       <td id="radio4" @click="changeRadio('radio4')">
                         生产工艺
                       </td>
                       <td id="radio5" @click="changeRadio('radio5')">
                         设备状态
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
              <div class="left-bottomDiv" id="leftDiv"  :style="{height: scrollerHeightBottomDiv}" @mousedown="mousedown" @touchstart="mousedown" @mousemove="move" @mouseup="end" @touchmove.prevent="move"  @touchend="end" >
                <div class="standard_border" @click="changeByCardNumber(item)" :style="{height:label_height,backgroundColor:getLabelColor(item.status)}" v-for="item in all_order_list" :label="item.barCode" :key="item.id" style="width: 80%;display: inline-block;margin-left: 5%;margin-bottom: 10px;border-width:2px;padding: 10px" >
                  <table cellspacing='0' cellpadding='0' border="0" width="100%">
                    <tr>
                      <td colspan="2" style="border-bottom: 1px solid lightgray">
                        <p class="standard_font" style="display: inline-block;margin-top: 20px">织造加工单&nbsp{{item.bar_code}}</p>
                        <img :src="selectedPicture" alt="" width="30px" style="display: inline-block;" v-show="item.bar_code === barCode">
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p class="standard_font">品名&nbsp{{item.product_name}}</p>
                      </td>
                      <td>
                        <p class="standard_font">机台号&nbsp{{item.machineId}}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 50%">
                        <p class="small_font">单据编号&nbsp{{item.order_sheet_id}}</p>
                      </td>
                      <td style="width: 50%">
                        <p class="small_font">纱支&nbsp{{item.yarn_weaving}}</p>
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
                <table class="radioTable"  style="width: 84%" cellspacing="20px">
                  <tr>
                    <td style="text-align: center;width: 33%" @click="">
                      <div style="height:15vh" @click="addCloth">
                        <div style="height:5vh;font-size: 2vw;border-bottom: 1px solid lightgray;"><Icon type="md-add" /></div>
                        <div style="height:10vh;font-size: 2vw;margin-top: 2%;font-weight: bolder">手动新增</div>
                      </div>
                    </td>
                    <td id="0" style="text-align: left;width: 33%"  v-if="order_detail_list.length>0" @click="setClothId(0)">
                      <div style="height:15vh;margin-left: 2%;width: 96%">
                        <div style="height:5vh;font-size: 1.6vw;border-bottom: 1px solid lightgray;font-weight: bolder">{{order_detail_list[0].id}}</div>
                        <div style="height:5vh;font-size: 1.8vw;">品名：{{order_detail_list[0].productName}}</div>
                        <div style="height:5vh;font-size: 1.8vw;">设定长度：{{order_detail_list[0].yieldMeterSemi}}</div>
                      </div>
                    </td>
                    <td id="1" style="text-align: left;width: 33%" v-if="order_detail_list.length>1" @click="setClothId(1)">
                      <div style="height:15vh;margin-left: 2%;width: 96%">
                        <div style="height:5vh;font-size: 1.6vw;border-bottom: 1px solid lightgray;font-weight: bolder">{{order_detail_list[1].id}}</div>
                        <div style="height:5vh;font-size: 1.8vw;">品名：{{order_detail_list[1].productName}}</div>
                        <div style="height:5vh;font-size: 1.8vw;">设定长度：{{order_detail_list[1].yieldMeterSemi}}</div>
                      </div>
                    </td>
                  </tr>
                  <tr v-for="indexTr in order_detail_list_length">
                    <td :id="indexTd+indexTr*3-2" v-for="indexTd in 3" v-if="(indexTd+indexTr*3-1)<=order_detail_list.length"  style="text-align: left;width: 33%" @click="setClothId(indexTd+indexTr*3-2)">
                      <div style="height:15vh;margin-left: 2%;width: 96%">
                        <div style="height:5vh;font-size: 1.6vw;border-bottom: 1px solid lightgray;font-weight: bolder">{{order_detail_list[indexTd+indexTr*3-2].id}}</div>
                        <div style="height:5vh;font-size: 1.8vw;">品名：{{order_detail_list[indexTd+indexTr*3-2].productName}}</div>
                        <div style="height:5vh;font-size: 1.8vw;">设定长度：{{order_detail_list[indexTd+indexTr*3-2].yieldMeterSemi}}</div>
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
  import { warp_api,warp_api_get,realOutput_api,common_api,weaving_api } from "../../../static/api/api.js";
  import headComponent from './mainHead.vue';
  import setAxleTable from './warpSetAxle.vue';
  import outputSubmitTable from './produceComfirm.vue';
  import outputPrintTable from './../sizingCardPrint.vue';
  import changeStaffMessage from './changeStaffMessage.vue';
  import screenfull from "screenfull";
  export default {
    components:{headComponent,setAxleTable,outputSubmitTable,outputPrintTable,changeStaffMessage},
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
        barCode:null,
        batchCodeNow:null,
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
        axleSelected:[],
        axleNum:null,
        axleNumNow:null,
        produce_details_list:[],
        selectId:null,
        ifGetPermission:false,
        selectedPicture:require("../../../static/picture/select.png"),
        companyName:"浙江鑫海纺织有限公司",
        workshopId:null,
        showChangeStaffMessage:false,
        clock:null,
        printAxisTable:false,
        clickedRightLabel:null,
        machineIdSelected:"313",
        clothData:null,
        showMachineTable:false,
        machineList:[],
        showAddClothDialog:false,
        radio: "radio1",
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
        this.$refs.headComponent.getWorker("/s-staff-organization-relation/getJsStaff");
        this.$refs.headComponent.changeMainTitle("天衡织造工位操作系统");
        this.workShopId = this.$refs.headComponent.getWorkShop();
        this.$refs.headComponent.sendMachineType("030100",this.workshopId);
        this.getData();
        this.getMachineList();
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
            this.getDetails(response.data.data[0].id)
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
            console.log(response.data.data);
            this.order_detail_list = response.data.data.pceClothEaches;
            this.order_detail_list_length = Math.ceil((this.order_detail_list.length-2)/3);
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
            document.getElementById("rightDiv").scrollTop = 0;
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
        document.getElementById("right_up").style.display = "none";
        document.getElementById("left_up").style.display = "none";
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
          machine_id:this.machineIdSelected
        };
        data.query ={
          workshop_id:this.workshopId,
          mac_type_id:"030100"
        };
        let url = "/report/getSimpleReport";
        common_api(url, data,this.companyId)
          .then(response => {
            console.log(response.data.data);
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
      setClothId(id){
        console.log(id);
        this.clothData = this.order_detail_list[id];
        for (let i = 0; i < this.order_detail_list.length; i++) {
          document.getElementById(i+"").style.backgroundColor = 'white'
        }
        document.getElementById(id+"").style.backgroundColor = '#67C23A'
      },
      addCloth(){
        this.showAddClothDialog = true
      },
      selectTableButton(buttonName){
        this.machineIdSelected+="";
        if(buttonName === "退格"){
          // this.machineIdSelected = this.machineIdSelected.substring(0,this.machineIdSelected.length-1)
          this.machineIdSelected = '';
        }else{
          if(this.machineIdSelected === "0"){
            this.machineIdSelected = "";
          }
          this.machineIdSelected += buttonName;
        }
        //对焦
        this.$refs.machineIdSelected.focus();
        this.getMachineList()
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
