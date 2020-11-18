<template>
  <div class="other_wrap" >
      <div class="other_wrap" v-show="isSelect">
    <div class="otherProductTable_table_head" >
      <div class="otherProductTable_table_head_con">
        <span>类型</span>
      </div>
      <div class="otherProductTable_table_head_con" style="width:15%">
        <span>数量</span>
      </div>
      <div class="otherProductTable_table_head_con" style="width:15%">
        <span>单位</span>
      </div>
      <div class="otherProductTable_table_head_con" style="width:70%">
        <span>人员</span>
      </div>
    </div>
    <div class="other_content">
      <div class="otherProductTable_table_con" v-for="(items,indexs) in dataList" :key="'con'+ items.indexs">
        <div class="otherProductTable_table_head_con">
          <select v-model="items.type">
            <option v-for="(item,index) in typeList" :key="index" :value="item.type">{{item.type}}</option>
          </select>
            <i class="el-icon-arrow-down" style="   position: absolute;
      right: 5rem;
      top: 2rem;
      font-size: 2rem;"></i>
        </div>
        <div class="otherProductTable_table_head_con" style="width:15%" @click="showNum(items.id)">
          <span>{{items.num}}</span>
        </div>
        <div class="otherProductTable_table_head_con" style="width:15%">
          <select v-model="items.unit" style="width:10rem">
            <option v-for="(item,index) in unitList" :key="index" :value="item.units">{{item.units}}</option>
          </select>
          <i class="el-icon-arrow-down" style="   position: absolute;
     
      top: 2rem;
      font-size: 2rem; right: 3rem;"></i>
        </div>
        <div class="otherProductTable_table_head_con" style="width:70%;position:relative;justify-content:flex-start;">
          <span
            style="font-size:1.5rem;width:65%;height:80%; text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;"
            v-text="(String(items.nameList))"></span>
          <div class="add"><i class="el-icon-circle-plus-outline" @click="addName()"></i><i
              class="el-icon-remove-outline"  @click="deleteName()"></i></div>
        </div>

      </div>
    </div>
    <div class="bottom_btn" :style="dataList.length>=4 ?'  ':' border-top: 1px solid black;'">
      <div class="bottom_btn_left" @click="add()"><i style="font-size:2rem;color:#409EFF" class="el-icon-plus"></i>
      </div>
      <div class="bottom_btn_right">
        <div class="sub" style="background:rgb(202,249,130)" @click="submit()"><span>提交</span></div>
        <div class="sub" style="margin-left:1rem"><span @click="$emit('cancel','cancel')">取消</span></div>
        <div class="sub" style="background:#409EFF;margin-left:1rem"><span @click="isSelect=!isSelect">切换</span></div>
      </div>
    </div>
    <el-dialog id="num" :visible.sync="showNumTable" width="1200px" append-to-body :close-on-click-modal="false">
      <p style="display: inline-block;font-size: 2rem">输入数量</p>
      <el-input size="medium" id="num" ref="num" v-model="num" style="display: inline-block;width: 500px;font-size:2rem"
        @focus="changeFocus('num')"></el-input>
      <table width="620px" cellspacing='0' cellpadding='0' height="400px"
        style="margin-top: 20px;display: inline-block">
        <tr v-for="indexTr in 2">
          <td v-for="indexTd in 5" style="text-align: center;">
            <el-button type="primary" plain style="width: 180px;height: 180px;margin-right:5px;margin-bottom: 5px"
              size="medium" @click="selectTableButton(buttonList[(indexTr-1)*5+indexTd-1])">
              <p style="font-weight: bolder;font-size: 80px;width: 100%">{{buttonList[(indexTr-1)*5+indexTd-1]}}</p>
            </el-button>
          </td>
          <td v-if="indexTr===1">
            <el-button type="primary" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px"
              @click="getPermission">确定</el-button>
          </td>
          <td v-if="indexTr===2">
            <el-button type="info" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px"
              @click="selectTableButton('退格')">退格</el-button>
          </td>
        </tr>
      </table>
    </el-dialog>
    <el-dialog id="num" :visible.sync="showNameTable" width="1200px" append-to-body :close-on-click-modal="false">
      <p style="display: inline-block;font-size: 2rem">输入员工号</p>
      <el-input size="medium" id="staff_code" ref="staff_code" v-model="staff_code"
        style="display: inline-block;width: 500px;font-size:2rem" @focus="changeFocus('staff_code')"></el-input>
      <table width="620px" cellspacing='0' cellpadding='0' height="400px"
        style="margin-top: 20px;display: inline-block">
        <tr v-for="indexTr in 2">
          <td v-for="indexTd in 5" style="text-align: center;">
            <el-button type="primary" plain style="width: 180px;height: 180px;margin-right:5px;margin-bottom: 5px"
              size="medium" @click="selectTableButton(buttonList[(indexTr-1)*5+indexTd-1])">
              <p style="font-weight: bolder;font-size: 80px;width: 100%">{{buttonList[(indexTr-1)*5+indexTd-1]}}</p>
            </el-button>
          </td>
          <td v-if="indexTr===1">
            <el-button type="primary" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px"
              @click="getPermission2">确定</el-button>
          </td>
          <td v-if="indexTr===2">
            <el-button type="info" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px"
              @click="selectTableButton('退格')">退格</el-button>
          </td>
        </tr>
      </table>
    </el-dialog>
  </div>



  <div class="other_wrap" v-show="!isSelect">
         <div class="otherProductTable_table_head" >
      <div class="otherProductTable_table_head_con">
        <span>类型</span>
      </div>
      <div class="otherProductTable_table_head_con" style="width:15%">
        <span>数量</span>
      </div>
      <div class="otherProductTable_table_head_con" style="width:15%">
        <span>单位</span>
      </div>
      <div class="otherProductTable_table_head_con" style="width:60%">
        <span>人员</span>
      </div>
    </div>
    <div class="other_content">
      <div class="otherProductTable_table_con" v-for="(items,indexs) in selectData" :key="'con'+ items.indexs">
        <div class="otherProductTable_table_head_con">
          <select v-model="items.type">
            <option v-for="(item,index) in typeList" :key="index" :value="item.type">{{item.type}}</option>
          </select>
            <i class="el-icon-arrow-down" style="   position: absolute;
      right: 5rem;
      top: 2rem;
      font-size: 2rem;"></i>
          
        </div>
        <div class="otherProductTable_table_head_con" style="width:15%" @click="showNum(items.id)">
          <span>{{items.number}}</span>
        </div>
        <div class="otherProductTable_table_head_con" style="width:15%">
          <select v-model="items.units" style="width:10rem">
            <option v-for="(item,index) in unitList" :key="index" :value="item.units">{{item.units}}</option>
          </select>
            <i class="el-icon-arrow-down" style="   position: absolute;
      right: 3rem;
      top: 2rem;
      font-size: 2rem;"></i>
        </div>
        <div class="otherProductTable_table_head_con" style="width:60%;position:relative;justify-content:flex-start;align-items:center;">
          <span
            style="font-size:2rem;margin:0.5rem;line-height:5rem;width:65%;height:80%; text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;line-clamp: 1;-webkit-box-orient: vertical;"
            v-text="(String(items.person))"></span>
          <div class="add"><i class="el-icon-circle-plus-outline" @click="addName()"></i><i
              class="el-icon-remove-outline"  @click="deleteName()"></i></div>
        </div>

      </div>
    </div>
       <div class="bottom_btn" style="justify-content:flex-end;border:none" >
  <div class="sub" style="background:#409EFF;width:15%;margin-left:1rem"><span @click="isSelect=!isSelect">切换</span></div>
    </div>
    <!-- <el-dialog id="num" :visible.sync="showNumTable" width="1200px" append-to-body :close-on-click-modal="false">
      <p style="display: inline-block;font-size: 2rem">输入数量</p>
      <el-input size="medium" id="num" ref="num" v-model="num" style="display: inline-block;width: 500px;font-size:2rem"
        @focus="changeFocus('num')"></el-input>
      <table width="620px" cellspacing='0' cellpadding='0' height="400px"
        style="margin-top: 20px;display: inline-block">
        <tr v-for="indexTr in 2">
          <td v-for="indexTd in 5" style="text-align: center;">
            <el-button type="primary" plain style="width: 180px;height: 180px;margin-right:5px;margin-bottom: 5px"
              size="medium" @click="selectTableButton(buttonList[(indexTr-1)*5+indexTd-1])">
              <p style="font-weight: bolder;font-size: 80px;width: 100%">{{buttonList[(indexTr-1)*5+indexTd-1]}}</p>
            </el-button>
          </td>
          <td v-if="indexTr===1">
            <el-button type="primary" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px"
              @click="getPermission">确定</el-button>
          </td>
          <td v-if="indexTr===2">
            <el-button type="info" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px"
              @click="selectTableButton('退格')">退格</el-button>
          </td>
        </tr>
      </table>
    </el-dialog>
    <el-dialog id="num" :visible.sync="showNameTable" width="1200px" append-to-body :close-on-click-modal="false">
      <p style="display: inline-block;font-size: 2rem">输入员工号</p>
      <el-input size="medium" id="staff_code" ref="staff_code" v-model="staff_code"
        style="display: inline-block;width: 500px;font-size:2rem" @focus="changeFocus('staff_code')"></el-input>
      <table width="620px" cellspacing='0' cellpadding='0' height="400px"
        style="margin-top: 20px;display: inline-block">
        <tr v-for="indexTr in 2">
          <td v-for="indexTd in 5" style="text-align: center;">
            <el-button type="primary" plain style="width: 180px;height: 180px;margin-right:5px;margin-bottom: 5px"
              size="medium" @click="selectTableButton(buttonList[(indexTr-1)*5+indexTd-1])">
              <p style="font-weight: bolder;font-size: 80px;width: 100%">{{buttonList[(indexTr-1)*5+indexTd-1]}}</p>
            </el-button>
          </td>
          <td v-if="indexTr===1">
            <el-button type="primary" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px"
              @click="getPermission2">确定</el-button>
          </td>
          <td v-if="indexTr===2">
            <el-button type="info" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px"
              @click="selectTableButton('退格')">退格</el-button>
          </td>
        </tr>
      </table>
    </el-dialog> -->
  </div>
</div>
</template>

<script>
 import axios from 'axios'
  export default {
    data() {
      return {
        buttonList: "1234567890",
        typeList: [ ],
        unitList: [ ],
        dataList: [


        ],
        selectData:[],
        isSelect:true,
        companyId:"",
        num: "",
        showNameTable: false,
        showNumTable: false,
        focusInput: "",
        id: "",
        staff_code: "",
        isadd:null
      }
    },
    methods: {
        getData(){
   let url = 'http://106.12.219.66:8227/report/getSimpleReport';
        let headers = {
          'Content-Type': 'application/json',
          'companyID': this.companyId
        };
        let method = "post";
        let data = {
          "tableName": "station_produce_info",
          "pageNum": 1,
          "pageSize": 1000,
         
        };
           
        let that = this
         that.selectData=[]
        axios({
            url: url,
            method: method,
            data: data,
            headers: headers
          })
          .then(response => {
            console.log(response.data.data)
       
             response.data.data.forEach(element => {
                that.selectData.push(element)
            });
            // this.macRelation.mac_type_id = response.data.data[0].id
            // for (let i = 0; i < response.data.data.length; i++) {

            //   that.mac_type.push(response.data.data[i])
            // }
            // this.getWorkShopList() //获取车间id列表
          })
        },
    formatDate(){
    let d =new Date();

    let f = (v) => ('0' + v).substr(-2);
    return d.getFullYear() + '-'
        + f(d.getMonth() + 1) + '-'
        + f(d.getDate()) + ' '
        + f(d.getHours()) + ':'
        + f(d.getMinutes()) + ':'
        + f(d.getSeconds());
},

        submit(){
            console.log(this.formatDate())
          console.log(this.dataList)
          let data=this.dataList
      
          data.forEach(element => {
              element.number=element.num
               element.person=element.nameList
                element.units=element.unit
          });
          let url="http://120.55.124.53:14100/station/addProduceForm"
            if(this.dataList.length>0){
                  axios({
            url: url,
            method: "post",
            data:{
                  company_id:this.companyId,
              form_data:data,
             creat_time:this.formatDate()
            },
         
          })
          .then(response => {

if(response.data.message=="插入成功"){
 this.$message({
          message: '插入成功！',
          type: 'success'
        });
}else{
      this.$message.error('插入失败！');
}
this.$emit('cancel','cancel')

          })
          }else{
                  this.$message.error('请先添加一条数据！');
          }
           
        },
        getOpiton(){
        let url = 'http://106.12.219.66:8227/report/getSimpleReport';
        let headers = {
          'Content-Type': 'application/json',
          'companyID': 0
        };
        let method = "post";
        let data = {
          "tableName": "station_produce_type",
          "pageNum": 1,
          "pageSize": 1000,
          "selectFields": ["id", "type"],
        };
              let data2 = {
          "tableName": "station_produce_units",
          "pageNum": 1,
          "pageSize": 1000,
          "selectFields": ["id", "units"],
        };
        let that = this
         that.unitList=[]
        axios({
            url: url,
            method: method,
            data: data,
            headers: headers
          })
          .then(response => {
            console.log(response.data.data)
       
             response.data.data.forEach(element => {
                that.typeList.push(element)
            });
            // this.macRelation.mac_type_id = response.data.data[0].id
            // for (let i = 0; i < response.data.data.length; i++) {

            //   that.mac_type.push(response.data.data[i])
            // }
            // this.getWorkShopList() //获取车间id列表
          })
              axios({
            url: url,
            method: method,
            data: data2,
            headers: headers
          })
          .then(response => {
            console.log(response.data.data)
            response.data.data.forEach(element => {
                that.unitList.push(element)
            });
            // this.macRelation.mac_type_id = response.data.data[0].id
            // for (let i = 0; i < response.data.data.length; i++) {

            //   that.mac_type.push(response.data.data[i])
            // }
            // this.getWorkShopList() //获取车间id列表
          })
        },
      addName() {
        this.showNameTable = true
      
       document.getElementById("staff_code").focus()
        this.focusInput="staff_code"
        this.isadd=true
      },
      deleteName(){
    this.showNameTable = true
      
       document.getElementById("staff_code").focus()
        this.focusInput="staff_code"
        this.isadd=false
      },
      add() {
        this.dataList.push({
          id: this.dataList.length,
          type: this.typeList[0].type,
          unit: this.unitList[0].units,
          nameList: [

          ]
        })
        
      },
      showNum(id) {
        this.showNumTable = true
     document.getElementById("num").focus()
        this.focusInput="num"
        this.id = id
      },
      changeFocus(focusInput) {
        this.focusInput = focusInput
      },
      selectTableButton(buttonName) {
        if (this.focusInput === "num") {
          this.num += "";
          if (buttonName === "退格") {
            this.num = this.num.substring(0, this.num.length - 1)
          } else {
            this.num += buttonName;
          }
           document.getElementById("num").focus()

        } else if (this.focusInput === "staff_code") {
          this.staff_code += "";
          if (buttonName === "退格") {
            this.staff_code = this.staff_code.substring(0, this.staff_code.length - 1)
          } else {
            this.staff_code += buttonName;
          }
   document.getElementById("staff_code").focus()

        }

        //   }else if(this.focusInput === "staff_code"){
        //     this.staff_code+="";
        //     if(buttonName === "退格"){
        //       this.staff_code = this.staff_code.substring(0,this.staff_code.length-1)
        //     }else{
        //       this.staff_code += buttonName;
        //     }
        //     this.$refs.staff_code.focus();
        //   }else if(this.focusInput === "changePassword"){
        //     this.changePassword+="";
        //     if(buttonName === "退格"){
        //       this.changePassword = this.changePassword.substring(0,this.changePassword.length-1)
        //     }else{
        //       this.changePassword += buttonName;
        //     }
        //     this.$refs.changePassword.focus();
        //   }else if(this.focusInput === "machineId"){
        //     this.machineId+="";
        //     if(buttonName === "退格"){
        //       this.machineId = this.machineId.substring(0,this.machineId.length-1)
        //     }else{
        //       this.machineId += buttonName;
        //     }
        //     this.$refs.machineId.focus();
        //   }
      },
      getPermission() {
        console.log(this.num)
        this.showNumTable = false

        this.dataList.forEach(element => {
          if (element.id == this.id) {
            element.num = this.num
            this.num = ""
          }
        });
        //   let data = {};
        //   data.tableName = "s_staff";
        //   data.selectFields=["password"];
        //   data.query={
        //     staff_code:this.staff_code
        //   };
        //   common_api("/report/getSimpleReport",data,this.companyId)
        //     .then(response => {
        //       if(response.data.data[0]&&response.data.data[0].password===this.password){
        //         this.ifGetPermission = true;
        //         this.focusInput = "changePassword";
        //         if(this.funcName){
        //           this.showConfig = false;
        //         }
        //         this.$message.success("获取权限成功");
        //         this.$emit("returnFunc",this.funcName);
        //       }else{
        //         this.$message.warning("密码错误或没有权限");
        //         this.password = ""
        //       }
        //     })
        //     .catch(error => {
        //       console.log(error);
        //     });
      },
      getPermission2() {
        console.log(this.staff_code)
        this.showNameTable = false

        this.dataList.forEach(element => {
          if (element.id == this.id) {
                 let url = 'http://106.12.219.66:8227/report/getSimpleReport';
        let headers = {
          'Content-Type': 'application/json',
          'companyID': this.companyId
        };
        let method = "post";
        let data = {
          "tableName": "s_staff",
          "pageNum": 1,
          "pageSize": 1000,
          "selectFields": ["staff_code", "staff_name"],
          'query':{
              staff_code:this.staff_code
          }
        };
       
        let that = this
        
        axios({
            url: url,
            method: method,
            data: data,
            headers: headers
          })
          .then(response => {
            console.log(response.data.data)
             if(response.data.data.length>=1){
              if(that.isadd==true){
                     element.nameList.push(response.data.data[0].staff_name)
              }else{
                  let index=element.nameList.indexOf((response.data.data[0].staff_name))
                  element.nameList.splice(index,1)
              }
              
             }else{
                  this.$message.warning("员工号不正确!");
          
             }
                     this.staff_code=""
         
            // this.macRelation.mac_type_id = response.data.data[0].id
            // for (let i = 0; i < response.data.data.length; i++) {

            //   that.mac_type.push(response.data.data[i])
            // }
            // this.getWorkShopList() //获取车间id列表
          })
            // element.nameList.push(this.staff_code)
            // this.staff_code = ""
          }
        });
        //   let data = {};
        //   data.tableName = "s_staff";
        //   data.selectFields=["password"];
        //   data.query={
        //     staff_code:this.staff_code
        //   };
        //   common_api("/report/getSimpleReport",data,this.companyId)
        //     .then(response => {
        //       if(response.data.data[0]&&response.data.data[0].password===this.password){
        //         this.ifGetPermission = true;
        //         this.focusInput = "changePassword";
        //         if(this.funcName){
        //           this.showConfig = false;
        //         }
        //         this.$message.success("获取权限成功");
        //         this.$emit("returnFunc",this.funcName);
        //       }else{
        //         this.$message.warning("密码错误或没有权限");
        //         this.password = ""
        //       }
        //     })
        //     .catch(error => {
        //       console.log(error);
        //     });
      },
    },
    mounted() {
this.getOpiton()
 let params = this.$route.params.params.split(",");
       
        this.companyId = params[1];
        this.getData()
    
    },
    destroyed() {

    }
  }

</script>

<style lang="less">
  .add {
    position: absolute;
    right: 3rem;
    top: 2rem;
    width: 14%;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .add i {
    font-size: 3rem;
  }

  #num {
    .el-input__inner {
      height: 5rem;
      line-height: 3rem;
    }
  }

  .sub {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    background: red;
  }

  .bottom_btn {
    width: 100%;
    height: 6rem;
    display: flex;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
  }

  .bottom_btn_left {
    width: 55%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

  }

  .bottom_btn_right {
    width: 45%;
    border-left: 1px solid black;
    height: 100%;
    display: flex;
  }

  .other_wrap {
    width: 100%;
    height: 40rem;

  }

  .other_content {
    width: 100%;
    height: 60%;

    overflow: auto;
  }

  .otherProductTable_table_head {
    width: 100%;
    height: 20%;
    display: flex;
    border-left: 1px solid black;
    border-top: 1px solid black;
  }

  .otherProductTable_table_head_con {
    width: 25%;
    height: 100%;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    position: relative;
  }


  .otherProductTable_table_head_con select {
    font-size: 2rem;
    border: none;
    width: 11rem;
     /* 鼠标移上，变小手 */
	 cursor: pointer;
     padding: 0 10px;
     /* 清除默认的箭头样式 */
     appearance: none;
     -moz-appearance: none;
     -webkit-appearance: none;
     /* 右侧添加箭头的背景图  自行调整位置 */
  
  }

  .otherProductTable_table_con {
    width: 100%;
    height: 6rem;
    display: flex;
    border-left: 1px solid black;

  }

  .el-icon-arrow-down {
    font-size: 2rem;
  }

</style>
