<template>
  <div class="radio5">
    <div class="radio5_con" v-show="isTable">
      <div class="staff"><span style="margin-left:1rem">员工号：</span><input @focus="nameFocus(1)"
          v-model="staff_name" /><input @focus="nameFocus(2)" v-model="staff_name2" /><input @focus="nameFocus(3)"
          v-model="staff_name3" /></div>
      <div class="radio5Table">
        <div class="radio5Table_head">
          <div class="radio5Table_head_con" style="width:25%"><span>机台号</span></div>
          <div class="radio5Table_head_con"><span>是否分绞</span></div>
          <div class="radio5Table_head_con"><span>结经次数</span></div>
        </div>
        <div class="radio5Table_con">
          <div class="radio5Table_con_row" v-for="(item,index) in dataList" :key="index">
            <div class="radio5Table_con_row_con" style="width:25%"><input v-model="item.machineId"
                @focus="machineFocus(item.id)" /></div>
            <div class="radio5Table_con_row_con" style="  justify-content: space-around;">
              <div class="table_btn" @click="changefenjiao(item.id)"
                :style=" item.isFenJiao? 'background:rgb(68,111,241);color:white':'background:white;color:black'">
                <span>是</span></div>
              <div class="table_btn" @click="changefenjiao(item.id)"
                :style=" !item.isFenJiao? 'background:rgb(68,111,241);color:white':'background:white;color:black'">
                <span>否</span></div>
            </div>
            <div class="radio5Table_con_row_con" style="  justify-content: space-around;">
              <div class="table_btn" @click="changejiejing(item.id)"
                :style=" item.isJieJing? 'background:rgb(68,111,241);color:white':'background:white;color:black'">
                <span>1</span></div>
              <div class="table_btn" @click="changejiejing(item.id)"
                :style=" !item.isJieJing? 'background:rgb(68,111,241);color:white':'background:white;color:black'">
                <span>0.1</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="addRow" @click="addRow()">
        <div style="    display: flex;
    justify-content: center;
    align-items: center;"><i class="el-icon-plus"></i><span>增加一行</span></div>
      </div>
      <div class="radio5Btn">
        <div class="radio5Btn_one" style="background:rgb(94,137,229)">提交</div>
        <div class="radio5Btn_one"
          :style=" dataList.length>0 ? 'background:rgb(204,78,77)':'background:rgb(135,146,141)'" @click="cancel()">取消
        </div>
        <div class="radio5Btn_one" style="background:rgb(135,146,141)" @click="isTable=false">记录</div>
        <div class="radio5Btn_one2" style="justify-content: space-around;    height: 70%;"><img
            style="width:5rem;height:5rem" src="/static/picture/arrow2.png" @click="LastPage()" /><img
            @click="NextPage()" style="width:5rem;height:5rem;   -webkit-transform: rotate(180deg);
                 -moz-transform: rotate(180deg);
                 -o-transform: rotate(180deg);
                 -ms-transform: rotate(180deg);
                 transform: rotate(180deg);" src="/static/picture/arrow2.png" /></div>
      </div>
    </div>
    <div class="radio5_con" v-show="!isTable">
      <div class="staff"><span style="width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;">机台号</span><span style="width: 18%;
    display: flex;
    align-items: center;
    justify-content: center;">是否分绞</span><span style="width: 20%;    
    display: flex;
    align-items: center;
    justify-content: center;">结经次数</span>
        <span style="width: 10%;    
    display: flex;
    align-items: center;
    justify-content: center;">人员</span>
        <div class="line"></div>
      </div>
      <div class="radio5Table2">
        <div class="radio5Table2_row" v-for="(item,index) in SelectDataList" :key="index">
          <input class="inputs" v-model="item.machineId" :disabled="!item.isEdit"
            :style="item.isEdit?'border:1px solid black;':'border:none'" />

          <div
            style="width:16%;margin-left:3%;height:80%;display:flex;align-items:center;justify-content: space-around;position:relative">
            <!-- <select v-model="item.Fenjiao" style="font-size:1.5rem;border:1px solid black;width:90%;height:100%"
              :disabled="!item.isEdit" :style="item.isEdit?'border:1px solid black;':'border:none'">
              <option value="是">是</option>
              <option value="否">否</option>
            </select> -->
             <el-select class="sel"  v-model="item.Fenjiao" style="font-size:1.5rem;border:1px solid black;width:90%;height:100%"
              :disabled="!item.isEdit" :style="item.isEdit?'border:1px solid black;':'border:none'" placeholder="">
    <el-option
     value="是">是
    </el-option>
     <el-option
     value="否">否
    </el-option>
  </el-select>
            <!-- <i class="el-icon-arrow-down" style=" 
      font-size: 2rem;position:absolute;right:2rem;" v-show="item.isEdit"></i> -->
          </div>
          <div
            style="width:16%;margin-left:3%;height:80%;display:flex;align-items:center;justify-content: space-around;position:relative">
                     <el-select class="sel"   v-model="item.JieJing" style="font-size:1.5rem;border:1px solid black;width:90%;height:100%"
              :disabled="!item.isEdit" :style="item.isEdit?'border:1px solid black;':'border:none'" placeholder="">
    <el-option
     value="1">1
    </el-option>
     <el-option
     value="0.1">0.1
    </el-option>
  </el-select>
            <!-- <select v-model="item.JieJing" style="font-size:1.5rem;border:1px solid black;width:90%;height:100%"
              :disabled="!item.isEdit" :style="item.isEdit?'border:1px solid black;':'border:none'">
              <option value="1">1</option>
              <option value="0.1">0.1</option>
            </select>
            
            <i class="el-icon-arrow-down" style="
      font-size: 2rem;position:absolute;right:2rem;" v-show="item.isEdit"></i> -->
          </div>
          <div
            style="width:12%;margin-left:2%;    height: 93%;display:flex;align-items:center;justify-content: space-around;flex-direction:column;"
            @click="NameTable2(item.id,item.isEdit,item.staff_name,item.staff_name2,item.staff_name3)"
            :style="item.isEdit?'border:1px solid black;':'border:none'">
            <span style="font-size:1rem">{{item.staff_name}}</span> <span
              style="font-size:1rem">{{item.staff_name2}}</span> <span
              style="font-size:1rem">{{item.staff_name3}}</span>
          </div>
          <div
            style="width:24%;margin-left:1%;height:90%;display:flex;align-items:center;justify-content: space-around;">
            <div style="width:48%;height:80%;background:rgb(68,111,241);color:white;    display: flex;
    align-items: center;
    font-size: 1.5rem;
    justify-content: center;" @click="item.isEdit=!item.isEdit" v-text="item.isEdit?'完成':'编辑'"></div>

            <div style="width:48%;height:80%;background:rgb(204,78,77);color:white;    display: flex;
    align-items: center;
    font-size: 1.5rem;
    justify-content: center;">删除</div>
          </div>
        </div>
      </div>

      <div class="radio5Btn2">
        <div class="radio5Btn_one2" style="background:rgb(94,137,229)" @click="isTable=true">返回</div>
        <div class="radio5Btn_one2" style="justify-content: space-around;"><img style="width:5rem;height:5rem"
            src="/static/picture/arrow2.png" /><img style="width:5rem;height:5rem;   -webkit-transform: rotate(180deg);
                 -moz-transform: rotate(180deg);
                 -o-transform: rotate(180deg);
                 -ms-transform: rotate(180deg);
                 transform: rotate(180deg);" src="/static/picture/arrow2.png" /></div>

      </div>
    </div>
    <el-dialog :visible.sync="showNameTable" width="800px" append-to-body :close-on-click-modal="false">


      <p style="display: inline-block;font-size: 3rem">输入员工号</p>
      <el-input size="medium" id="staff_code" ref="staff_code" v-model="staff_code" style="font-size: 3rem;width: 400px"
        class="standard_input"></el-input>
      <br> <br>
      <table width="620px" cellspacing='0' cellpadding='0' height="300px" style="display: inline-block">
        <tr v-for="indexTr in 2">
          <td v-for="indexTd in 5" style="text-align: center;">
            <el-button type="primary" plain style="width: 7rem;height: 7rem;margin-right:5px;margin-bottom: 5px"
              size="medium" @click="selectTableButton(buttonList[(indexTr-1)*5+indexTd-1])">
              <p style="font-weight: bolder;font-size: 3rem;width: 100%">{{buttonList[(indexTr-1)*5+indexTd-1]}}</p>
            </el-button>
          </td>
          <td v-if="indexTr===1">
            <el-button type="primary"
              style="width: 10rem;height: 7rem;font-size: 3rem;margin-bottom: 5px;font-weight: bolder"
              @click="getPermission">确定</el-button>
          </td>
          <td v-if="indexTr===2">
            <el-button type="info" style="width: 10rem;height: 7rem;font-size: 3rem;margin-bottom: 5px"
              @click="selectTableButton('退格')">退格</el-button>
          </td>
        </tr>
      </table>
    </el-dialog>
    <el-dialog :visible.sync="showMachineTable" width="800px" append-to-body :close-on-click-modal="false">


      <p style="display: inline-block;font-size: 3rem">输入机台号</p>
      <el-input size="medium" id="machine_code" ref="machine_code" v-model="machine_code"
        style="font-size: 3rem;width: 400px" class="standard_input"></el-input>
      <br> <br>
      <table width="620px" cellspacing='0' cellpadding='0' height="300px" style="display: inline-block">
        <tr v-for="indexTr in 2">
          <td v-for="indexTd in 5" style="text-align: center;">
            <el-button type="primary" plain style="width: 7rem;height: 7rem;margin-right:5px;margin-bottom: 5px"
              size="medium" @click="selectTableButton2(buttonList[(indexTr-1)*5+indexTd-1])">
              <p style="font-weight: bolder;font-size: 3rem;width: 100%">{{buttonList[(indexTr-1)*5+indexTd-1]}}</p>
            </el-button>
          </td>
          <td v-if="indexTr===1">
            <el-button type="primary"
              style="width: 10rem;height: 7rem;font-size: 3rem;margin-bottom: 5px;font-weight: bolder"
              @click="getPermission2">确定</el-button>
          </td>
          <td v-if="indexTr===2">
            <el-button type="info" style="width: 10rem;height: 7rem;font-size: 3rem;margin-bottom: 5px"
              @click="selectTableButton2('退格')">退格</el-button>
          </td>
        </tr>
      </table>
    </el-dialog>
    <el-dialog :visible.sync="showNameTable2" width="800px" append-to-body :close-on-click-modal="false">


      <p style="display: inline-block;font-size: 3rem">输入员工号</p>
      <el-input size="medium" id="staff_code2" ref="staff_code2" v-model="staff_code2"
        style="font-size: 3rem;width: 400px" class="standard_input"></el-input>
      <br> <br>
      <table width="620px" cellspacing='0' cellpadding='0' height="300px" style="display: inline-block">
        <tr v-for="indexTr in 2">
          <td v-for="indexTd in 5" style="text-align: center;">
            <el-button type="primary" plain style="width: 7rem;height: 7rem;margin-right:5px;margin-bottom: 5px"
              size="medium" @click="selectTableButton3(buttonList[(indexTr-1)*5+indexTd-1])">
              <p style="font-weight: bolder;font-size: 3rem;width: 100%">{{buttonList[(indexTr-1)*5+indexTd-1]}}</p>
            </el-button>
          </td>
          <td v-if="indexTr===1">
            <el-button type="primary"
              style="width: 10rem;height: 7rem;font-size: 3rem;margin-bottom: 5px;font-weight: bolder"
              @click="getPermission3">确定</el-button>
          </td>
          <td v-if="indexTr===2">
            <el-button type="info" style="width: 10rem;height: 7rem;font-size: 3rem;margin-bottom: 5px"
              @click="selectTableButton3('退格')">退格</el-button>
          </td>
        </tr>
      </table>
    </el-dialog>
    <el-dialog class="dia" :visible.sync="showSelectStaff" width="800px" append-to-body :close-on-click-modal="false">


      <p style="display: inline-block;font-size: 3rem">选择需要更改的员工</p>
      <br>
      <br>
      <el-radio-group v-model="selectedStaff">
        <el-radio v-for="(item,index) in staff_nameList" :key="index" :label="item" :value="item"></el-radio>

      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSelectStaff = false">取 消</el-button>
        <el-button type="primary" @click="sureStaff()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        staff_name: "",
        staff_name2: "",
        isTable: true,
        staff_name3: "",
        staff_code: "",
        staff_code2: "",
        machine_code: "",
        companyId: null,
        buttonList: "1234567890",
        dataList: [{
          id: 1,
          machineId: "",
          isFenJiao: true,
          isJieJing: false, //代表0.1

        }],
        dataListCon: [{
          id: 1,
          machineId: "",
          isFenJiao: true,
          isJieJing: false, //代表0.1

        }],
        SelectDataList: [{
          id: 1,
          machineId: "1234",
          FenJiao: "",
          isEdit: false,
          staff_name: "周品道",
          staff_name2: "周三顺",

          staff_name3: "周二维",
          JieJing: "", //代表0.1

        }],
        showNameTable: false,
        showMachineTable: false,
        showNameTable2: false,
        showSelectStaff: false,
        num: "",
        id: "",
        selectedStaff: "",
        staff_nameList: [],
        id2: "",
        pageNum: 1,
        pageSize: 3

      }
    },
    methods: {
    
      pagination(pageNo, pageSize, array) { //数组分页函数
        var offset = (pageNo - 1) * pageSize;
        return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset +
          pageSize);
      },

      sureStaff() {  //确认选中需要更改员工
        console.log(this.selectedStaff)
        this.showSelectStaff = false
        this.showNameTable2 = true
      },
      machineFocus(id) { //需要修改哪行的machineID

        this.id = id
        this.showMachineTable = true;
        


      },
      NameTable2(id, isEdit, staff_name, staff_name2, staff_name3) { 
        if (isEdit == true) { //处于编辑状态时才可以设置编辑行id，选择名字弹框出现
          this.id2 = id
          // this.showNameTable2=true
          this.staff_nameList[0] = staff_name
          this.staff_nameList[1] = staff_name2
          this.staff_nameList[2] = staff_name3
          this.showSelectStaff = true

        }
      },
      nameFocus(id) {
        this.showNameTable = true;
        this.isStaff = id

      },
      addRow() { //新增一行



        this.dataListCon.push({
          id: this.dataListCon.length + 1,
          machineId: "",
          isFenJiao: true,
          isJieJing: false, //代表0.1
        })
        if (this.dataListCon.length % 3 == 1) {
          this.pageNum = this.pageNum + 1
          this.dataList = this.pagination(this.pageNum, this.pageSize, this.dataListCon)
        } else {
          this.dataList = this.pagination(this.pageNum, this.pageSize, this.dataListCon)
        }
        console.log(this.dataListCon)
        console.log(this.dataList)



      },
      LastPage() { //提交页面上一页
        if (this.pageNum > 1) { 
          this.pageNum = this.pageNum - 1
          this.dataList = this.pagination(this.pageNum, this.pageSize, this.dataListCon)
        } else {
          this.$message({
            message: '没有上一页了哦！',
            type: 'warning'
          });
        }
      },
      NextPage() {  //提交页面下一页
        if ((this.pageSize * this.pageNum) < this.dataListCon.length) {
          this.pageNum = this.pageNum + 1
          this.dataList = this.pagination(this.pageNum, this.pageSize, this.dataListCon)
        } else {
          this.$message({
            message: '最后一页了哦！',
            type: 'warning'
          });
        }
      },
      changefenjiao(id) { //改变分绞状态
        for (let i = 0; i < this.dataList.length; i++) {
          if (this.dataList[i].id == id) {
            this.dataList[i].isFenJiao = !this.dataList[i].isFenJiao
          }
        }
      },
      changejiejing(id) { ///改变结经状态
        for (let i = 0; i < this.dataList.length; i++) {
          if (this.dataList[i].id == id) {
            this.dataList[i].isJieJing = !this.dataList[i].isJieJing
          }
        }
      },



      selectTableButton(buttonName) {
        console.log(this.focusInput)

        this.staff_code += "";
        if (buttonName === "退格") {
          this.staff_code = this.staff_code.substring(0, this.staff_code.length - 1)
        } else {
          this.staff_code += buttonName;
        }
        document.getElementById("staff_code").focus()



      },
      getPermission() { //员工号3个

        this.showNameTable = false

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
          'query': {
            staff_code: this.staff_code
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


            if (response.data.data.length >= 1) {

              if (this.isStaff == 1) {
                this.staff_name = response.data.data[0].staff_name
              } else if (this.isStaff == 2) {
                this.staff_name2 = response.data.data[0].staff_name
              } else if (this.isStaff == 3) {
                this.staff_name3 = response.data.data[0].staff_name
              }


            } else {
              this.$message.warning("员工号不正确!");

            }
            this.staff_code = ""
          })





      },
      selectTableButton2(buttonName) {


        this.machine_code += "";
        if (buttonName === "退格") {
          this.machine_code = this.machine_code.substring(0, this.machine_code.length - 1)
        } else {
          this.machine_code += buttonName;
        }
        document.getElementById("machine_code").focus()



      },
      getPermission2() { //机器id输入

        this.showMachineTable = false
        for (let i = 0; i < this.dataList.length; i++) {
          if (this.dataList[i].id == this.id) {
            this.dataList[i].machineId = this.machine_code
          }
        }
        this.machine_code = ""








      },

      selectTableButton3(buttonName) {


        this.staff_code2 += "";
        if (buttonName === "退格") {
          this.staff_code2 = this.staff_code2.substring(0, this.staff_code.length - 1)
        } else {
          this.staff_code2 += buttonName;
        }
        document.getElementById("staff_code2").focus()



      },
      getPermission3() { //选中一行更改名字

        this.showNameTable2 = false

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
          'query': {
            staff_code: this.staff_code2
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


            if (response.data.data.length >= 1) {
              that.SelectDataList.forEach(element => {
                if (element.id == that.id2) {
                  if (element.staff_name == that.selectedStaff) {
                    element.staff_name = response.data.data[0].staff_name
                  } else if (element.staff_name2 == that.selectedStaff) {
                    element.staff_name2 = response.data.data[0].staff_name
                  } else if (element.staff_name3 == that.selectedStaff) {
                    element.staff_name3 = response.data.data[0].staff_name
                  }
                }
              });

              //   if (this.isStaff == 1) {
              //     this.staff_name = response.data.data[0].staff_name
              //   } else if (this.isStaff == 2) {
              //     this.staff_name2 = response.data.data[0].staff_name
              //   } else if (this.isStaff == 3) {
              //     this.staff_name3 = response.data.data[0].staff_name
              //   }


            } else {
              this.$message.warning("员工号不正确!");

            }
            this.staff_code2 = ""
            that.selectedStaff = ""

          })





      },
    },
    mounted() {
      let params = this.$route.params.params.split(",");

      this.companyId = params[1];
    },
    destroyed() {

    },
    watch: {
      dataList: { //datalist改变datalistcon也改变数据
        deep: true, //深度监听设置为 true
        handler: function (newV, oldV) {

          for (let i = 0; i < this.dataListCon.length; i++) {
            if (this.dataListCon[i].id == newV[0].id) {

              this.dataListCon[i] = newV[0]
            }
          }
          console.log(this.dataListCon)
        }
      },
      isTable(val) { //提交页面显示初始化数据
        if (val == true) {

          this.dataList = [{
            id: 1,
            machineId: "",
            isFenJiao: true,
            isJieJing: false, //代表0.1

          }]
          this.dataListCon = [{
            id: 1,
            machineId: "",
            isFenJiao: true,
            isJieJing: false, //代表0.1

          }]
          this.pageNum = 1

        }
      }
    },


  }

</script>

<style scoped>
.sel /deep/ input{
  height: 52px !important;
}
.sel /deep/ .el-input{
    font-size: 1.5rem;
}
.sel  /deep/ .el-input__inner{
      height: 52px;

}
.sel  /deep/ .el-input__icon{
    font-size: 1.5rem;
}
 .el-select-dropdown__item{
  font-size: 1.5rem;
    padding: 0px 23px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #606266;
    height: 78px;
    line-height: 78px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;


}
 .el-select-dropdown{
  min-width: 120.688px !important;
}
  .dia /deep/ .el-button {
    font-size: 3rem;
  }

  .dia /deep/ .el-radio__label {
    font-size: 3rem;
  }

  .dia /deep/ .el-radio__inner {
    width: 3rem;
    margin-bottom: 1.5rem;
    height: 3rem;
  }

  /deep/ .el-input--medium .el-input__inner {
    height: 5rem;
    line-height: 3rem;
  }

  .radio5 {
    height: 454.48px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

  }

  .radio5_con {
    width: 98%;
    height: 98%;
    display: flex;
    flex-direction: column;

  }

  .staff {
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    position: relative;

  }

  .line {
    position: absolute;
    bottom: 1rem;
    width: 100%;
    height: 1.1px;
    background: black;
  }

  .staff input {
    width: 25%;
    height: 70%;
    margin-right: 1rem;
    font-size: 1.5rem;
    border: 1px solid black;
  }

  .radio5Table {
    width: 100%;
    height: 45%;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid black;

  }

  .radio5Table2 {
    width: 100%;
    height: 65%;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    border: 1px solid black;

  }

  .inputs {
    width: 20%;
    margin-left: 2%;
    height: 80%;
    font-size: 1.3rem;
    border: 1px solid black;
  }

  .radio5Table2_row {
    width: 100%;
    height: 25%;
    display: flex;
    align-items: center;
    border: 1px solid black;
  }

  .radio5Table_head {
    width: 100%;
    height: 18%;
    display: flex;
    border-left: 1px solid black;
    border-top: 1px solid black;

  }

  .radio5Table_head_con {
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    background: rgb(254, 250, 184);
  }

  .radio5Table_con {
    width: 100%;
    height: 82%;
    display: flex;
    flex-direction: column;
    border-left: 1px solid black;
    border-right: 1px solid black;
  }

  .radio5Table_con_row {
    width: 100%;
    height: 33%;
    display: flex;


  }


  .radio5Table_con_row_con {
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
  }

  .radio5Table_con_row_con input {
    width: 95%;
    height: 80%;
    border: 1px solid black;
  }

  .table_btn {
    width: 45%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    border: 1px solid black;
  }

  .addRow {
    width: 100%;
    margin-top: 2%;
    height: 13%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;


    border: 1px solid black;
  }

  .addRow i {
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }


  .radio5Btn {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;


  }

  .radio5Btn2 {
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;


  }

  .radio5Btn_one2 {
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    color: white;
  }

  .radio5Btn_one {
    width: 21%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    color: white;
  }

  select {
    font-size: 1.5rem;
    border: none;
    width: 11rem;
    height: 5rem;
    /* 鼠标移上，变小手 */
    cursor: pointer;
    padding: 0 10px;
    /* 清除默认的箭头样式 */
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;

    /* 右侧添加箭头的背景图  自行调整位置 */

  }

  span {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  select:disabled {
    color: black;
  }

</style>
