<template>
    <div style="height: 80px;background-color: #29374b;width: 100%">
      <el-dialog
        :visible.sync="showConfig"
        width="1200px"
        append-to-body
        :close-on-click-modal="false"
        id="configTable"
        :modal="false"
      >
        <el-tabs type="border-card" style="width: 100%;height: 650px;overflow-y: auto" v-model="settingMode">
          <el-tab-pane label="班次管理" name="shiftManage">
            <el-table
              :data="shiftManageList"
              border
              stripe
              :row-style="{fontSize:'24px'}"
              :header-row-style="{fontSize:'24px'}"
              style="width: 100%">
              <el-table-column
                prop="id"
                label="序号"
                width="80">
              </el-table-column>
              <el-table-column
                prop="name"
                label="班次"
                width="180">
              </el-table-column>
              <el-table-column
                label="开始时间"
              >
                <template slot-scope="scope">
                  <el-input style="width: 60px;display: inline-block;font-size: 24px" v-model="scope.row.shiftStartTimeH"></el-input>:<el-input style="width: 60px;display: inline-block;font-size: 24px" v-model="scope.row.shiftStartTimeI"></el-input>:<el-input style="width: 60px;display: inline-block;font-size: 24px" v-model="scope.row.shiftStartTimeS"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="结束时间"
               >
                <template slot-scope="scope">
                  <el-input style="width: 60px;display: inline-block;font-size: 24px" v-model="scope.row.shiftEndTimeH"></el-input>:<el-input style="width: 60px;display: inline-block;font-size: 24px" v-model="scope.row.shiftEndTimeI"></el-input>:<el-input style="width: 60px;display: inline-block;font-size: 24px" v-model="scope.row.shiftEndTimeS"></el-input>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top: 10px;width: 100%;text-align: center">
              <el-tooltip class="item" effect="dark"  placement="top">
                <div slot="content" style="font-size: 20px">在末行新增一行数据</div>
                <el-button type="success"  style="width: 180px;height:180px;font-size: 24px" @click="add_new_shift">新增</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark"  placement="top">
                 <div slot="content" style="font-size: 20px">删除末行数据</div>
                <el-popconfirm
                  confirmButtonText='好的'
                  cancelButtonText='不用了'
                  @onConfirm="delete_shift"
                  icon="el-icon-info"
                  iconColor="red"
                  title="确定要删除最后一行吗？"
                >
                 <el-button type="danger" slot="reference" style="width: 180px;height:180px;font-size: 24px" @click="">删除</el-button>
                </el-popconfirm>
              </el-tooltip>
              <el-button type="primary"  style="width: 180px;height:180px;font-size: 24px" @click="saveShift">保存</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="密码设置" name="permissionManage">
            <div v-show="!ifGetPermission">
              <p style="display: inline-block;font-size: 30px">输入密码获取权限</p>
              <el-input ref="password" v-model="password" style="display: inline-block;width: 500px;font-size: 30px" @focus="changeFocus('password')"></el-input>
              <table width="620px"  cellspacing='0' cellpadding='0' height="400px" style="margin-top: 20px;display: inline-block">
                <tr v-for="indexTr in 2" >
                  <td  v-for="indexTd in 5" style="text-align: center;">
                    <el-button type="primary" plain style="width: 180px;height: 180px;margin-right:5px;margin-bottom: 5px" size="medium"  @click="selectTableButton(buttonList[(indexTr-1)*5+indexTd-1])">
                      <p  style="font-weight: bolder;font-size: 80px;width: 100%">{{buttonList[(indexTr-1)*5+indexTd-1]}}</p>
                    </el-button>
                  </td>
                  <td v-if="indexTr===1">
                    <el-button type="primary" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px" @click="getPermission">确定</el-button>
                  </td>
                  <td v-if="indexTr===2">
                    <el-button type="info" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px" @click="selectTableButton('退格')">退格</el-button>
                  </td>
                </tr>
              </table>
            </div>
            <div v-show="ifGetPermission">
              <p style="display: inline-block;font-size: 30px">修改密码</p>
              <el-input ref="changePassword" v-model="changePassword" style="display: inline-block;width: 500px;font-size: 30px" @focus="changeFocus('changePassword')"></el-input>
              <table width="620px"  cellspacing='0' cellpadding='0' height="400px" style="margin-top: 20px;display: inline-block">
                <tr v-for="indexTr in 2" >
                  <td  v-for="indexTd in 5" style="text-align: center;">
                    <el-button type="primary" plain style="width: 180px;height: 180px;margin-right:5px;margin-bottom: 5px" size="medium"  @click="selectTableButton(buttonList[(indexTr-1)*5+indexTd-1])">
                      <p  style="font-weight: bolder;font-size: 80px;width: 100%">{{buttonList[(indexTr-1)*5+indexTd-1]}}</p>
                    </el-button>
                  </td>
                  <td v-if="indexTr===1">
                    <el-button type="primary" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px" @click="changePermissionPassword">确定</el-button>
                  </td>
                  <td v-if="indexTr===2">
                    <el-button type="info" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px" @click="selectTableButton('退格')">退格</el-button>
                  </td>
                </tr>
              </table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
      <el-dialog
        :visible.sync="ifWorkerNameNotExist"
        width="1200px"
        append-to-body
        :before-close="handleClose"
        :close-on-click-modal="false"
        id="staffTable"
      >
        <p style="display: inline-block;font-size: 3rem">员工号:</p><el-input v-model="staff_code" ref="staff_code" id="staff_code" @focus="changeFocus('staff_code')" style="font-size: 3rem;width: 400px" class="standard_input" ></el-input>
        <br> <br>
        <table width="620px"  cellspacing='0' cellpadding='0' height="400px" style="display: inline-block">
          <tr v-for="indexTr in 2" >
            <td  v-for="indexTd in 5" style="text-align: center;">
              <el-button type="primary" plain style="width: 180px;height: 180px;margin-right:5px;margin-bottom: 5px" size="medium"  @click="selectTableButton(buttonList[(indexTr-1)*5+indexTd-1])">
                <p  style="font-weight: bolder;font-size: 80px;width: 100%">{{buttonList[(indexTr-1)*5+indexTd-1]}}</p>
              </el-button>
            </td>
            <td v-if="indexTr===1">
              <el-button type="primary" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px;font-weight: bolder" @click="searchStaff">确定</el-button>
            </td>
            <td v-if="indexTr===2">
              <el-button type="info" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px" @click="selectTableButton('退格')">退格</el-button>
            </td>
          </tr>
        </table>
      </el-dialog>
      <el-dialog
        :visible.sync="showHelp"
        :fullscreen="true"
        append-to-body
        :close-on-click-modal="false"
        id="showHelp"
      >
        <p slot="title" style="font-weight: bolder;font-size: 30px" @click="showHelp = false">天衡工位机使用帮助(点击此处退出)</p>
        <Viewer></Viewer>
      </el-dialog>
      <!--等待界面-->
      <el-dialog
        :visible.sync="$store.state.showLoadingLog"
        width="24rem"
        append-to-body
        :close-on-click-modal="false"
        :show-close="false"
        :close-on-press-escape="false"
      >
        <div style="width: 100%;text-align: center">
          <div class="loader" style="display: inline-block"></div>
          <p style="font-size: 6rem;display: inline-block">请稍候</p>
        </div>
      </el-dialog>
      <!--报修-->
      <el-dialog
        :visible.sync="showRepairTable"
        width="1000px"
        append-to-body
        :modal="false"
      >
        <el-tabs type="border-card" style="width: 100%;height: 550px;overflow-y: auto" v-model="repairTableMode"  @tab-click="getRepairHis">
          <el-tab-pane label="我要报修" name="repair">
              <p style="display: inline-block;font-size: 3rem">报修机台:</p>
            <div class="changeMachineDiv" style="display: inline-block">
              <el-select ref="machineId" v-model="machineId" filterable placeholder="请选择" @focus="changeFocus('machineId')">
                <el-option
                  v-for="item in machineList"
                  :key="item.machine_id"
                  :label="item.machine_id"
                  :value="item.machine_id"
                  style="line-height: 80px;height: 80px"
                >
                  <span style="font-size: 48px;line-height: 80px;height: 80px">{{item.machine_id}}</span>
                </el-option>
              </el-select>
              <el-button type="danger" style="height: 80px;margin-left:20px;margin-bottom: 5px" size="medium" @click="machineId=''">
                <p  style="font-weight: bolder;font-size: 1.5vw;width: 100%">清空</p>
              </el-button>
            </div>
            <p style=";font-size: 3rem">报修人员:{{staff_name}}</p>
            <table width="620px"  cellspacing='0' cellpadding='0' height="280px" style="margin-top: 20px;display: inline-block">
              <tr v-for="indexTr in 2" >
                <td  v-for="indexTd in 5" style="text-align: center;">
                  <el-button type="primary" plain style="width: 8.5rem;height: 8.5rem;margin-right:5px;margin-bottom: 5px" size="medium"  @click="selectTableButton(buttonList[(indexTr-1)*5+indexTd-1])">
                    <p  style="font-weight: bolder;font-size: 3rem;width: 100%">{{buttonList[(indexTr-1)*5+indexTd-1]}}</p>
                  </el-button>
                </td>
                <td v-if="indexTr===1">
                  <el-button type="primary" style="width: 10rem;height: 8.5rem;font-size: 3rem;margin-bottom: 5px" @click="confirmRepair">确定</el-button>
                </td>
                <td v-if="indexTr===2">
                  <el-button type="info" style="width: 10rem;height: 8.5rem;font-size: 3rem;margin-bottom: 5px" @click="selectTableButton('退格')">退格</el-button>
                </td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="报修历史" name="repairHis">
            <el-table
              :data="repairHis"
              style="width: 100%;height: 370px">
              <el-table-column
                label="报修时间"
                width="250">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.submit_date }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="机器"
                width="100">
                <template slot-scope="scope">
                  {{ scope.row.machine_id }}
                </template>
              </el-table-column>
              <el-table-column
                label="报修人员"
                width="120">
                <template slot-scope="scope">
                  {{ scope.row.submit_person }}
                </template>
              </el-table-column>
              <el-table-column
                label="维修人员"
                width="120">
                <template slot-scope="scope">
                  {{ scope.row.get_order_user }}
                </template>
              </el-table-column>
              <el-table-column
                label="状态"
                width="120">
                <template slot-scope="scope">
                  <div v-if="scope.row.isok === 0" style="color: #909399">待接单</div>
                  <div v-if="scope.row.isok === 1" style="color: #67C23A">已维修</div>
                  <div v-if="scope.row.isok === 2" style="color: #409EFF">维修中</div>
                  <div v-if="scope.row.isok === 3" style="color: #E6A23C">已接单</div>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.isok === 2"
                    type="danger"
                    @click="repairFinished(scope.row)">维修完成</el-button>
                  <el-button
                    v-if="scope.row.isok === 3"
                    type="warning"
                    disabled
                    @click="repairFinished(scope.row)">等待开始</el-button>
                  <el-button
                    v-if="scope.row.isok === 1"
                    type="danger"
                    @click="repairAgain(scope.row)">再次报修</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button class="rectangleButton" style="margin-top: 20px;display: inline-block" type="primary" @click="pageHisDown">
              <p class="middleButtonFont">上一页</p>
            </el-button>
            <el-button class="rectangleButton" style="margin-top: 20px;display: inline-block;margin-left: 5%" type="primary" @click="pageHisUp">
              <p class="middleButtonFont">下一页</p>
            </el-button>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
      <table cellspacing='0' cellpadding='0' border="0" width="100%" style="height: 80px">
        <tr>
          <td width="80px">
            <img :src="logo"  style="display: inline-block;margin-left: 5px;margin-top: 5px"  height="70px">
          </td>
          <td style="">
            <div style="display: inline-block"><p style=";color: white;font-size: 30px;">{{title}}</p></div>
          </td>
          <td style="width: 550px;font-size: 50px;color: white">
            <Icon type="ios-power" @click="exit" />
            <p v-model="staff_name" style="width: 160px;position: fixed;top:18px;left:1440px;font-size: 35px;color: #ffffff" @click="ifWorkerNameNotExist = true">{{staff_name}}</p>
            <Icon type="ios-cog" @click="clickSettingIcon('shiftManage')" style="margin-left: 160px" />
            <Icon type="md-build"  @click="startRepair" />
            <Icon v-if="$store.state.openOutline" type="ios-notifications-outline" @click="changeOutline" />
            <Icon v-if="!$store.state.openOutline" type="ios-notifications-off-outline" @click="changeOutline"  />
            <Icon type="md-refresh" @click="refresh"/>
            <Icon type="md-help-circle" @click="showHelp = true" />
            <Icon type="md-power" id="FullScreen" ref="FullScreen" style="display: none" @click="changeFullScreen" />
          </td>
        </tr>
      </table>
    </div>
</template>
<script>
  import { warp_api,warp_api_get,shift_api,workShop_api,common_api,repair_api,repair_api_15 } from "../../../static/api/api.js";
  import screenfull from "screenfull"
  import Viewer from './pdfViewer.vue';
    export default {
      components: {
        Viewer
      },
      data () {
        return {
          companyId:10000015,
          logo:require("../../../static/picture/logo.png"),
          title:"天衡整经工位操作系统",
          staff_code:"",
          staff_name:null,
          staff_id:null,
          workerList:null,
          FullScreen:false,
          full_screen:null,
          showConfig:false,
          shiftManageList:[],
          name:null,
          workShopName:null,
          workShopId:null,
          ifWorkerNameNotExist:true,
          focusInput:"staff_code",
          buttonList:"1234567890",
          password:"",
          ifGetPermission:false,
          changePassword:"",
          settingMode:"shiftManage",
          showHelp:false,
          machineType:null,
          workshopId:null,
          funcName:null,
          showRepairTable:false,
          repairTableMode:"repair",
          machineList:[],
          machineId:"",
          repairHis:[],
          pageHis:1,
          repairHisTotal:[]
        }
      },
      methods:{
        exit(){
          let userAgent = navigator.userAgent;
          if (userAgent.indexOf("Firefox") !== -1 || userAgent.indexOf("Chrome") !==-1) {
            window.open('','_self').close();
            window.location.href = "about:blank";
          }else {
            window.opener = null;
            window.open("about:blank", "_self");
            window.close();
          }
        },
        changeMainTitle(mainTitle){
          this.title = mainTitle
        },
        changeOutline(){
          this.$store.state.openOutline = !this.$store.state.openOutline;
        },
        getWorker(url){
          let data = {};
          data.tableName = "s_staff";
          data.selectFields =["staff_name","staff_code","id"];
          common_api("/report/getSimpleReport", data,this.companyId)
            .then(response => {
              // console.log(response.data.data);
              this.workerList = [];
              for (let i = 0; i < response.data.data.length; i++) {
                if(response.data.data[i].staff_code>0){
                  this.workerList.push(response.data.data[i])
                }
              }
            })
            .catch(error => {
              console.log(error);
            });
          // warp_api_get(url,{},this.companyId)
          //   .then(response => {
          //     //console.log(response.data.data);
          //     this.workerList = response.data.data;
          //   })
          //   .catch(error => {
          //     console.log(error);
          //   });
        },
        changeFullScreen(){
          this.FullScreen = !this.FullScreen;
          if(this.FullScreen){
            screenfull.toggle();
          }else{
            screenfull.exit();
          }
        },
        selectWorker(){
          this.$store.state.staff_id = this.staff_id;
          this.$store.state.staff_name = this.staff_name;
          console.log(this.staff_name);
          this.$forceUpdate();
          this.$emit('selectWorker',this.staff_id,this.staff_name)
        },
        changeNumberToLetter(num){
          let stringName = "";
          if(num > 0) {
            if(num >= 1 && num <= 26) {
              stringName = String.fromCharCode(64 + parseInt(num));
            } else {
              while(num > 26) {
                let count = parseInt(num/26);
                let remainder = num%26;
                if(remainder === 0) {
                  remainder = 26;
                  count--;
                  stringName = String.fromCharCode(64 + parseInt(remainder)) + stringName;
                } else {
                  stringName = String.fromCharCode(64 + parseInt(remainder)) + stringName;
                }
                num = count;
              }
              stringName = String.fromCharCode(64 + parseInt(num)) + stringName;
            }
          }
          return stringName;
        },
        delete_shift(){
          this.shiftManageList.pop();
        },
        add_new_shift(){
          this.shiftManageList.push({
            id:this.shiftManageList.length + 1,
            name:this.changeNumberToLetter(this.shiftManageList.length + 1)+"班",
            startTime:"00:00:00",
            endTime:"00:00:00",
            shiftStartTimeH:"00",
            shiftStartTimeI:"00",
            shiftStartTimeS:"00",
            shiftEndTimeH:"00",
            shiftEndTimeI:"00",
            shiftEndTimeS:"00",
          })
        },
        getShiftName(){
          let date = new Date();
          let hour = date.getHours();
          hour = add_0(hour);
          let minute = date.getMinutes();
          minute = add_0(minute);
          let seconds = date.getSeconds();
          seconds = add_0(seconds);
          function add_0(param){
            if(param<10){
              param="0"+param
            }
            return param
          }
          let time = hour + ":"+minute+":"+seconds;
         // console.log(this.shiftManageList);
          for (let i = 0; i < this.shiftManageList.length; i++) {
            this.shiftManageList[i].id = i+1;
            if(this.shiftManageList[i].endTime>this.shiftManageList[i].startTime){
              if(time<this.shiftManageList[i].endTime&&time>this.shiftManageList[i].startTime){
                this.name = this.shiftManageList[i].name;
                this.$store.state.shiftName = this.shiftManageList[i].name;
                console.log(this.$store.state.shiftName);
                return this.shiftManageList[i]
              }
            }else{
              if(time<this.shiftManageList[i].endTime||time>this.shiftManageList[i].startTime){
                this.name = this.shiftManageList[i].name;
                this.$store.state.shiftName = this.shiftManageList[i].name;
                console.log(this.$store.state.shiftName);
                return this.shiftManageList[i]
              }
            }
          }
        },
        saveShift(){
          for (let i = 0; i < this.shiftManageList.length; i++) {
            this.shiftManageList[i].startTime = this.shiftManageList[i].shiftStartTimeH+":"+this.shiftManageList[i].shiftStartTimeI+":"+this.shiftManageList[i].shiftStartTimeS;
            this.shiftManageList[i].endTime = this.shiftManageList[i].shiftEndTimeH+":"+this.shiftManageList[i].shiftEndTimeI+":"+this.shiftManageList[i].shiftEndTimeS
          }
          let data = {};
          data.shiftRules = this.shiftManageList;
          data.macTypeId =  this.machineType;
          data.workshopId = this.workshopId;
          warp_api("/shift-rule/updateShift",data,this.companyId)
            .then(response => {
             // console.log(response);
            })
            .catch(error => {
              console.log(error);
            });
        },
        changeStaff(staffId){
          console.log(this.workerList);
          if(staffId){
            this.staff_id = parseInt(staffId);
            let name = this.workerList.find((item)=>{
              return item.id === this.staff_id;
            });
            this.staff_code = name.staff_code;
            this.staff_name = name.staff_name;
            this.selectWorker();
          }else{
            this.$message.warning("请在登陆后继续操作");
          }
        },
        getStaffNameById(id){
          //console.log(this.workerList);
          this.workerList.find((item)=>{
            if(item.id === id) {
              //console.log(item.staff_name);
              this.$emit("getStaffNameById",item.staff_name)
            }
          });
        },
        getWorkShop(){
          let data = {};
          data.page = 1;
          data.pageSize = 100;
          workShop_api("/workShop/getWorkShopList",data,this.companyId)
            .then(response => {
            //  console.log(response);
              this.workShopId = response.data.data[0].id;
              this.workShopName =  response.data.data[0].name;
              return this.workShopId;
            })
            .catch(error => {
              console.log(error);
            });
        },
        getShift(){
          let data = {};
          data.workshopId = this.workshopId;
          data.macTypeId = this.machineType;
          warp_api("/shift-rule/selectShift",data,this.companyId)
            .then(response => {
              console.log(response.data);
              this.shiftManageList = response.data.data;
              for (let i = 0; i < this.shiftManageList.length; i++) {
                this.shiftManageList[i].shiftStartTimeH = this.shiftManageList[i].startTime.slice(0,2);
                this.shiftManageList[i].shiftStartTimeI = this.shiftManageList[i].startTime.slice(3,5);
                this.shiftManageList[i].shiftStartTimeS = this.shiftManageList[i].startTime.slice(6,8);
                this.shiftManageList[i].shiftEndTimeH = this.shiftManageList[i].endTime.slice(0,2);
                this.shiftManageList[i].shiftEndTimeI = this.shiftManageList[i].endTime.slice(3,5);
                this.shiftManageList[i].shiftEndTimeS = this.shiftManageList[i].endTime.slice(6,8);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        selectTableButton(buttonName){
          if(this.focusInput === "password"){
            this.password+="";
            if(buttonName === "退格"){
              this.password = this.password.substring(0,this.password.length-1)
            }else{
              this.password += buttonName;
            }
            this.$refs.password.focus();
          }else if(this.focusInput === "staff_code"){
            this.staff_code+="";
            if(buttonName === "退格"){
              this.staff_code = this.staff_code.substring(0,this.staff_code.length-1)
            }else{
              this.staff_code += buttonName;
            }
            this.$refs.staff_code.focus();
          }else if(this.focusInput === "changePassword"){
            this.changePassword+="";
            if(buttonName === "退格"){
              this.changePassword = this.changePassword.substring(0,this.changePassword.length-1)
            }else{
              this.changePassword += buttonName;
            }
            this.$refs.changePassword.focus();
          }else if(this.focusInput === "machineId"){
            this.machineId+="";
            if(buttonName === "退格"){
              this.machineId = this.machineId.substring(0,this.machineId.length-1)
            }else{
              this.machineId += buttonName;
            }
            this.$refs.machineId.focus();
          }
        },
        handleClose(){
          if(!this.staff_name){
            this.$message.error("未登入员工，请重新登录")
          }else{
            this.$message.success("欢迎，"+this.staff_name);
            this.ifWorkerNameNotExist = false;
          }
        },
        searchStaff(){
          let data = {};
          data.tableName = "s_staff";
          data.selectFields=["staff_name","id"];
          data.sort = "DESC";
          data.query={
            staff_code:this.staff_code
          };
          data.selectLikeFields={
            workshop_id: this.$store.state.workshopId
          };
          common_api("/report/getSimpleReport",data,this.companyId)
            .then(response => {
              if(response.data.data.length>0){
                this.$store.state.ifShift = response.data.data[0].id !== this.staff_id;
                this.staff_name = response.data.data[0].staff_name;
                this.staff_id = response.data.data[0].id;
                this.$message.success("欢迎，"+this.staff_name);
                this.ifWorkerNameNotExist = false;
                this.ifGetPermission = false;
                this.selectWorker();
              }else{
                this.$message.warning("员工号有误，请重新输入");
                this.staff_code="";
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        changeFocus(focusInput){
          this.focusInput = focusInput
        },
        clickStaffIcon(){
          this.ifWorkerNameNotExist = true;
          this.focusInput = "staff_code"
        },
        clickSettingIcon(name,funcName){
          this.getShift();
         this.showConfig = true;
         this.focusInput = "password";
         this.settingMode = name;
         if(funcName){
           this.funcName =  funcName;
         }
        },
        getPermission(){
          let data = {};
          data.tableName = "s_staff";
          data.selectFields=["password"];
          data.query={
            staff_code:this.staff_code
          };
          common_api("/report/getSimpleReport",data,this.companyId)
            .then(response => {
              if(response.data.data[0]&&response.data.data[0].password===this.password){
                this.ifGetPermission = true;
                this.focusInput = "changePassword";
                if(this.funcName){
                  this.showConfig = false;
                }
                this.$message.success("获取权限成功");
                this.$emit("returnFunc",this.funcName);
              }else{
                this.$message.warning("密码错误或没有权限");
                this.password = ""
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        changePermissionPassword(){
          let data = {};
          data.tableName = "s_staff";
          data.updateFields = {
            staff_code:this.staff_code,
          };
          data.query={
            password:this.changePassword
          };
          common_api("/report/updateSimpleReport",data,this.companyId)
            .then(response => {
              if(response.data.result === "OK"){
                this.$message.success("修改成功");
                this.showConfig = false
              }else{
                this.$message.error("修改失败");
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        getPermissionStatus(){
          return this.ifGetPermission
        },
        refresh(){
          this.$emit("getData")
        },
        sendMachineType(machineType,workshopId){
          this.machineType = machineType;
          this.workshopId = workshopId;
          this.getShift();
          this.getMachineList()
        },
        getMachineList(){
          let data = {};
          data.tableName = "mac_relation";
          data.selectLikeFields ={
            machine_id:this.machineId
          };
          data.query ={
            workshop_id:this.workshopId,
            mac_type_id:this.machineType
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
        changeWorker(){
          this.ifWorkerNameNotExist = true;
        },
        startRepair(){
          this.showRepairTable = true;
          this.changeFocus('machineId');
        },
        pageHisUp(){
          if(this.pageHis*5>=this.repairHisTotal.length){
            this.$message.warning("已经是最后一页");
          }else{
            this.pageHis++;
            this.getRepairHis();
          }
        },
        pageHisDown(){
          if(this.pageHis === 1){
            this.$message.warning("已经是第一页");
          }else{
            this.pageHis--;
            this.getRepairHis();
          }
        },
        getRepairHis(){
          let data = {};
          data.company_id = this.companyId;
          data.isMessage = 0;
          data.mac_type_id = this.machineType;
          data.error_machine_num = 100000000;
          if(this.companyId == 10000015){
            let url = "/APP/repair_history";
            repair_api_15(url, data)
              .then(response => {
                //console.log(JSON.parse(response.data.repair_history));
                if(response.data.result === "ok"){
                  this.repairHisTotal = JSON.parse(response.data.repair_history);
                  let pageNum = this.repairHisTotal.length-this.pageHis*5+5;
                  this.repairHis = [];
                  if(pageNum>5){
                    for (let i = this.pageHis*5-5; i < this.pageHis*5; i++) {
                      this.repairHis.push(this.repairHisTotal[i])
                    }
                  }else if(pageNum===0){
                    this.$message.warning("没有找到维修记录");
                  }else{
                    for (let i = this.pageHis*5-5; i < this.repairHisTotal.length; i++) {
                      this.repairHis.push(this.repairHisTotal[i])
                    }
                  }
                }
              })
              .catch(error => {
                console.log(error);
              });
          }else{
            let url = "/APP/repair_history";
            repair_api(url, data)
              .then(response => {
                //console.log(JSON.parse(response.data.repair_history));
                if(response.data.result === "ok"){
                  this.repairHisTotal = JSON.parse(response.data.repair_history);
                  let pageNum = this.repairHisTotal.length-this.pageHis*5+5;
                  this.repairHis = [];
                  if(pageNum>5){
                    for (let i = this.pageHis*5-5; i < this.pageHis*5; i++) {
                      this.repairHis.push(this.repairHisTotal[i])
                    }
                  }else if(pageNum === 0){
                    this.$message.warning("没有找到维修记录");
                  }else{
                    for (let i = this.pageHis*5-5; i < this.repairHisTotal.length; i++) {
                      this.repairHis.push(this.repairHisTotal[i])
                    }
                  }
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        },
        confirmRepair(){
          if(this.machineId.length>0){
            let data = {};
            data.company_id = this.companyId;
            data.submit_person = this.staff_name;
            data.machine_id = this.machineId;
            data.workshop_id = this.$store.state.workshopId;
            let url = "/APP/error_submit";
            if(this.companyId == 10000015){
              repair_api_15(url, data)
                .then(response => {
                  console.log(response.data);
                  this.$message.success("报修成功");
                  this.getRepairHis();
                })
                .catch(error => {
                  console.log(error);
                });
            }else{
              repair_api(url, data)
                .then(response => {
                  console.log(response.data);
                  this.$message.success("报修成功");
                  this.getRepairHis();
                })
                .catch(error => {
                  console.log(error);
                });
            }
          }else{
            this.$message.error("请选择报修机台")
          }
        },
        repairAgain(item){
          let url = "/APP/error_submit";
          if(this.companyId == 10000015){
            repair_api_15(url, item)
              .then(response => {
                this.$message.success("报修成功");
                this.getRepairHis();
              })
              .catch(error => {
                console.log(error);
              });
          }else{
            repair_api(url, item)
              .then(response => {
                this.$message.success("报修成功");
                this.getRepairHis();
              })
              .catch(error => {
                console.log(error);
              });
          }
        },
        repairFinished(item){
          let data = {
            order_id:item.order_id,
            company_id:this.companyId,
            machine_id:item.machine_id,
            repair_person:this.staff_name
          };
          let url = "/APP/repair_submit";
          repair_api(url, data)
            .then(response => {
              console.log(response.data)
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      mounted() {
        this.companyId = this.$route.params.params.split(",")[1];
        this.getWorker();
      }
    }
</script>
<style lang="less">
  #staffTable{
    .el-input__inner{
      height:5rem;
      line-height:3rem;
    }
  }
  .el-dialog__header{
    height: 6rem;
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
