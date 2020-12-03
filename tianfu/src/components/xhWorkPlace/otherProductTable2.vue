<template>
  <div class="other_wrap">
    <div class="other_wrap" v-show="isSelect">
    
       <el-table
    :data="dataList"
    height="500"
    border
    style="width: 100%;font-size:1.5rem;margin-bottom:3rem;">
    <el-table-column
      prop="type"
      label="类型"
      width="180">
     <template slot-scope="scope">
       <div style="width:100%;height:5rem;display:flex;align-items:center;justify-content: space-around;position:relative">
          <select v-model="scope.row.type" style="font-size:1.5rem;" >
              <option v-for="(item,index) in typeList" :key="index" :value="item.type">{{item.type}}</option>
            </select>
              <i class="el-icon-arrow-down" style="
      font-size: 2rem;position:absolute;right:3rem;"></i>
       </div>
      </template>
          
    </el-table-column>
    <el-table-column
     prop="num"
      label="数量"
      width="180" >
         <template slot-scope="scope"  >
      
            <!-- <span >{{scope.num}}</span> -->
<input v-model="scope.row.num" @focus="showNum(scope.row.id)" style="border:none;font-size:1.5rem;height:5rem" />       
      </template>
    </el-table-column>
    <el-table-column
      prop="units"
      width="180"
      label="单位">
         <template slot-scope="scope">
           <div style="width:100%;height:5rem;display:flex;align-items:center;justify-content: space-around;position:relative">
            <select v-model="scope.row.unit" style="width:10rem;font-size:1.5rem;">
              <option v-for="(item,index) in unitList" :key="index" :value="item.units">{{item.units}}</option>
            </select>
              <i class="el-icon-arrow-down" style="
      font-size: 2rem;position:absolute;right:3rem;"></i>
      </div>
      </template>
    </el-table-column>
        <el-table-column
      prop="nameList"
      label="人员">
    <template slot-scope="scope">
        <div style="width:100%;height:5rem;display:flex;align-items:center;justify-content: space-between;">
      <span
              style="font-size:1.8rem;width:80%;height:5rem;line-height:5rem; text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;line-clamp: 1;-webkit-box-orient: vertical;"
              v-text="(String(scope.row.nameList))"></span>
            <div class="add" style="width:20%" ><i class="el-icon-circle-plus-outline" @click="addName(scope.row.id)"></i><i
                class="el-icon-remove-outline" @click="deleteName(scope.row.id)"></i></div>
        </div>
      
         
      </template>
    </el-table-column>
  </el-table>
      <div class="bottom_btn" :style="dataList.length>=4 ?'  ':''">
        <div class="bottom_btn_left" @click="add()"><i style="font-size:2rem;color:#409EFF" class="el-icon-plus"></i>
        </div>
        <div class="bottom_btn_right">
          <div class="sub "   style="background:rgb(202,249,130)" @click="submit()"><span>提交</span></div>
          <div class="sub" style="margin-left:1rem"><span @click="$emit('cancel','cancel')">取消</span></div>
          <div class="sub" style="background:#409EFF;margin-left:1rem"><span @click="isSelect=!isSelect">切换</span></div>
        </div>
      </div>
      <el-dialog id="num" :visible.sync="showNumTable" width="1200px" append-to-body :close-on-click-modal="false">
        <p style="display: inline-block;font-size: 2rem">输入数量</p>
        <el-input size="medium" id="num" ref="num" v-model="num"
          style="display: inline-block;width: 500px;font-size:2rem" @focus="changeFocus('num')"></el-input>
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
    
      <!-- <div class="other_content">
        <div class="otherProductTable_table_con"
          :style="items.isSelected ?'border:1px solid red':'   border-left: 1px solid black;'"
          v-for="(items,indexs) in selectData" :key="'cons'+ indexs">
          <div class="otherProductTable_table_head_con" style="width:15%">
            <select v-model="items.type" v-show="items.isSelected">
              <option v-for="(item,index) in typeList" :key="index" :value="item.type">{{item.type}}</option>
            </select>
            <span v-show="!items.isSelected">{{items.type}}</span>
            <i class="el-icon-arrow-down" v-show="items.isSelected" style="   position: absolute;
      right: 3rem;
      top: 2rem;
      font-size: 2rem;"></i>

          </div>
          <div class="otherProductTable_table_head_con" style="width:15%" @click="showNum2(items.id)"
            v-show="items.isSelected">
            <span>{{items.number}}</span>
          </div>
          <div class="otherProductTable_table_head_con" style="width:15%" v-show="!items.isSelected">
            <span>{{items.number}}</span>
          </div>
          <div class="otherProductTable_table_head_con" style="width:15%">
            <select v-model="items.units" style="width:10rem" v-show="items.isSelected">
              <option v-for="(item,index) in unitList" :key="index" :value="item.units">{{item.units}}</option>
            </select>
            <span v-show="!items.isSelected">{{items.units}}</span>
            <i class="el-icon-arrow-down" v-show="items.isSelected" style="   position: absolute;
      right: 3rem;
      top: 2rem;
      font-size: 2rem;"></i>
          </div>
          <div class="otherProductTable_table_head_con"
            style="width:60%;position:relative;justify-content:flex-start;align-items:center;">
            <span
              style="font-size:2rem;margin:0.5rem;line-height:5rem;width:65%;height:80%; text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;line-clamp: 1;-webkit-box-orient: vertical;"
              v-text="(String(items.person))"></span>
            <div class="add"><i class="el-icon-circle-plus-outline" @click="addName2(items.id)"
                v-show="items.isSelected"></i><i class="el-icon-remove-outline" @click="deleteName2(items.id)"
                v-show="items.isSelected"></i></div>
          </div>
          <div class="otherProductTable_table_head_con" style="width:20%">
            <div class="sub" @click="editItem(items.id)"
              style="background:#409EFF;width:45%;height:60%;margin-left:1rem"><span
                v-text="items.isSelected?'完成':'编辑'"></span></div>
            <div class="sub" @click="deleteItem(items.id)"
              style="background:#409EFF;width:45%;height:60%;margin-left:1rem"><span>删除</span></div>
          </div>

        </div>
      </div> -->
          <el-table
    :data="showData"
    height="500"
    border
    style="width: 100%;font-size:1.5rem;margin-bottom:3rem;">
    <el-table-column
      prop="type"
      label="类型"
       width="130" >
     <template slot-scope="scope">
       <div style="width:100%;height:5rem;display:flex;align-items:center;justify-content: space-around;position:relative">
          <select v-model="scope.row.type" style="font-size:1.5rem;" v-show="scope.row.isSelected">
              <option v-for="(item,index) in typeList" :key="index" :value="item.type">{{item.type}}</option>
            </select>
              <i class="el-icon-arrow-down"  v-show="scope.row.isSelected" style="
      font-size: 2rem;position:absolute;right:1rem;"></i>
         <span  v-show="!scope.row.isSelected">{{scope.row.type}}</span>
       </div>
      </template>
          
    </el-table-column>
    <el-table-column
     prop="number"
      label="数量"
      width="130" >
         <template slot-scope="scope"  >
      
            <span v-show="!scope.row.isSelected">{{scope.row.number}}</span>
<input  v-show="scope.row.isSelected" v-model="scope.row.number" @focus="showNum2(scope.row.id)" style="border:none;font-size:1.5rem;height:5rem" />       
      </template>
    </el-table-column>
    <el-table-column
      prop="units"
       width="130" 
      label="单位">
         <template slot-scope="scope">
               <div style="width:100%;height:5rem;display:flex;align-items:center;justify-content: space-around;position:relative">
      <select v-show="scope.row.isSelected" v-model="scope.row.units" style="width:10rem;font-size:1.5rem;">
              <option v-for="(item,index) in unitList" :key="index" :value="item.units">{{item.units}}</option>
            </select>
               <span v-show="!scope.row.isSelected">{{scope.row.units}}</span>
              <i class="el-icon-arrow-down"  v-show="scope.row.isSelected" style="
      font-size: 2rem;position:absolute;right:2rem;"></i>
      
       </div>
          
      </template>
    </el-table-column>
        <el-table-column
      prop="person"
      label="人员">
    <template slot-scope="scope">
        <div style="width:100%;height:5rem;display:flex;align-items:center;justify-content: space-between;">
      <span 
              style="font-size:1.8rem;width:70%;height:5rem;line-height:5rem; text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;line-clamp: 1;-webkit-box-orient: vertical;"
              v-text="(String(scope.row.person))"></span>
            <div class="add" ><i v-show="scope.row.isSelected" class="el-icon-circle-plus-outline" @click="addName2(scope.row.id)"></i><i v-show="scope.row.isSelected"
                class="el-icon-remove-outline" @click="deleteName2(scope.row.id)"></i></div>
        </div>
      
         
      </template>
    </el-table-column>
        <el-table-column
     
      label="操作">
    <template slot-scope="scope">
       <div style="width:100%;height:5rem;display:flex;align-items:center;justify-content: space-between;">
         <div class="sub" @click="editItem(scope.row.id)"
              style="background:#409EFF;width:45%;height:60%;color:white;margin-left:1rem"><span
                v-text="scope.row.isSelected?'完成':'编辑'"></span></div>
            <div class="sub" @click="deleteItem(scope.row.id)"
              style="background:#red;width:45%;height:60%;margin-left:1rem;color:white"><span>删除</span></div>
       </div>
         
      </template>
    </el-table-column>
  </el-table>
      <div class="bottom_btn" style="justify-content:flex-end;border:none">
    <div class="sub" style="background:#409EFF;margin-left:1rem"><span
            @click="lastPage">上一页</span></div>
              <div class="sub" style="background:#409EFF;margin-left:1rem"><span
            @click="nextPage">下一页</span></div>
        <div class="sub" style="background:#409EFF;margin-left:1rem"><span
            @click="isSelect=!isSelect">切换</span></div>
      </div>
      <el-dialog id='num2' :visible.sync="showNumTable2" width="1200px" append-to-body :close-on-click-modal="false">
        <p style="display: inline-block;font-size: 2rem">输入数量</p>
        <el-input size="medium" id="num2" ref="num2" v-model="num2"
          style="display: inline-block;width: 500px;font-size:2rem" @focus="changeFocus2('num')"></el-input>
        <table width="620px" cellspacing='0' cellpadding='0' height="400px"
          style="margin-top: 20px;display: inline-block">
          <tr v-for="indexTr in 2">
            <td v-for="indexTd in 5" style="text-align: center;">
              <el-button type="primary" plain style="width: 180px;height: 180px;margin-right:5px;margin-bottom: 5px"
                size="medium" @click="selectTableButton2(buttonList[(indexTr-1)*5+indexTd-1])">
                <p style="font-weight: bolder;font-size: 80px;width: 100%">{{buttonList[(indexTr-1)*5+indexTd-1]}}</p>
              </el-button>
            </td>
            <td v-if="indexTr===1">
              <el-button type="primary" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px"
                @click="getPermission3">确定</el-button>
            </td>
            <td v-if="indexTr===2">
              <el-button type="info" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px"
                @click="selectTableButton2('退格')">退格</el-button>
            </td>
          </tr>
        </table>
      </el-dialog>
      <el-dialog :visible.sync="showNameTable2" width="1200px" append-to-body :close-on-click-modal="false">
        <p style="display: inline-block;font-size: 2rem">输入员工号</p>
        <el-input size="medium" id="staffcode" ref="staff_code2" v-model="staff_code2"
          style="display: inline-block;width: 500px;font-size:2rem" class="staffcode"
          @focus="changeFocus2('staff_code')"></el-input>
        <table width="620px" cellspacing='0' cellpadding='0' height="400px"
          style="margin-top: 20px;display: inline-block">
          <tr v-for="indexTr in 2">
            <td v-for="indexTd in 5" style="text-align: center;">
              <el-button type="primary" plain style="width: 180px;height: 180px;margin-right:5px;margin-bottom: 5px"
                size="medium" @click="selectTableButton2(buttonList[(indexTr-1)*5+indexTd-1])">
                <p style="font-weight: bolder;font-size: 80px;width: 100%">{{buttonList[(indexTr-1)*5+indexTd-1]}}</p>
              </el-button>
            </td>
            <td v-if="indexTr===1">
              <el-button type="primary" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px"
                @click="getPermission4">确定</el-button>
            </td>
            <td v-if="indexTr===2">
              <el-button type="info" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px"
                @click="selectTableButton2('退格')">退格</el-button>
            </td>
          </tr>
        </table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
      props:['order_list','otherProduceDialogShow'],
    data() {
      return {
        buttonList: "1234567890",
        typeList: [],
        unitList: [],
        dataList: [


        ],
        selectData: [],
        showData:[],
        isSelect: true,
        companyId: "",
        num: "",
        showNameTable: false,
        showNumTable: false,
        focusInput: "",
        id: "",
        staff_code: "",
        isadd: null,
        
        showNameTable2: false,
        showNumTable2: false,
        focusInput2: "",
        num2: "",
        id2: "",
        staff_code2: "",
        isadd2: null,
        pageNum:1,
        pageSize:4

      }
    },
    methods: {
        editItem(id) {

        // this.selectData.forEach(element => {
        //   element.isSelected=false
        //       });

        this.showData.forEach(element => {
          if (element.id == id) {

            element.isSelected = !element.isSelected
    if (element.isSelected == false) {
            let url="http://120.55.124.53:14100/sizing/updateProduceForm"
               let method = "post";
                      let person=(String(element.person)).split('、')
                       if(element.number==null){
                        element.number=0
                      }
        let data = {
          company_id: this.companyId,
          creat_time:this.formatDate(),
          id:element.id,
          type:element.type,
          number:element.number,
          units:element.units,
          person:person,
                    sizing_id:String(this.order_list.id)


        };
             axios({
            url: url,
            method: method,
            data: data,

          })
          .then(response => {
            console.log(response)
                if (response.data.message == "response to success") {
              this.$message({
                message: '更新成功！',
                type: 'success'
              });
            } else {
              this.$message.error('更新失败！');
            }

            this.getData(true)
          })

    
          }
          }
      

        });
      },
      deleteItem(id) {
        console.log(id)
        let url = "http://120.55.124.53:14100/sizing/deleteProduceForm"

        let method = "post";
        let data = {
          company_id: this.companyId,
          id: id

        };
        let that = this
        axios({
            url: url,
            method: method,
            data: data,

          })
          .then(response => {
            console.log(response)
            if (response.data.message == "response to success") {
              this.$message({
                message: '删除成功！',
                type: 'success'
              });
            } else {
              this.$message.error('删除失败！');
            }

            this.getData()
          })

      },
      lastPage(){
      if(this.pageNum>1){
this.pageNum=this.pageNum-1
 this.showData=this.pagination(this.pageNum,this.pageSize,this.selectData)
      }else{
 this.$message({
          message: '没有上一页了哦！',
          type: 'warning'
        });
      }
      },
      nextPage(){
      if((this.pageSize*this.pageNum)<this.selectData.length){
this.pageNum=this.pageNum+1
 this.showData=this.pagination(this.pageNum,this.pageSize,this.selectData)
      }else{
 this.$message({
          message: '最后一页了哦！',
          type: 'warning'
        });
      }
      },
      getData(flag) {
        let url = 'http://106.12.219.66:8227/report/getSimpleReport';
        let headers = {
          'Content-Type': 'application/json',
          'companyID': this.companyId
        };
        let method = "post";
        let data = {
          "tableName": "sizing_produce_info",
          "pageNum": 1,
          "pageSize": 1000,
          query:{
             sizing_id:String(this.order_list.id)
          }

        };

        let that = this
         that.showData=[]
        if(flag!=true){
            
            that.pageNum=1
        }
        that.selectData = []
        axios({
            url: url,
            method: method,
            data: data,
            headers: headers
          })
          .then(response => {
            console.log(response.data.data)

            response.data.data.forEach(element => {
              element.isSelected = false
              that.selectData.push(element)
            });
         
            that.showData=that.pagination(that.pageNum,that.pageSize,that.selectData)
            // this.macRelation.mac_type_id = response.data.data[0].id
            // for (let i = 0; i < response.data.data.length; i++) {

            //   that.mac_type.push(response.data.data[i])
            // }
            // this.getWorkShopList() //获取车间id列表
          })
      },
      formatDate() {
        let d = new Date();

        let f = (v) => ('0' + v).substr(-2);
        return d.getFullYear() + '-' +
          f(d.getMonth() + 1) + '-' +
          f(d.getDate()) + ' ' +
          f(d.getHours()) + ':' +
          f(d.getMinutes()) + ':' +
          f(d.getSeconds());
      },

      submit() {
        console.log(this.formatDate())
        console.log(this.dataList)
        let data = this.dataList

        data.forEach(element => {
          element.number = element.num
          element.person = element.nameList
          element.units = element.unit
              element.sizing_id=String(this.order_list.id)
        });
        let url = "http://120.55.124.53:14100/sizing/addProduceForm"
        if (this.dataList.length > 0) {
          axios({
              url: url,
              method: "post",
              data: {
                company_id: this.companyId,
                form_data: data,
                creat_time: this.formatDate(),
          
              },

            })
            .then(response => {

              if (response.data.message == "response to success") {
                this.$message({
                  message: '插入成功！',
                  type: 'success'
                });
              } else {
                this.$message.error('插入失败！');
              }
              this.$emit('cancel', 'cancel')
              this.dataList = []

            })
        } else {
          this.$message.error('请先添加一条数据！');
        }

      },
      getOpiton() {
        let url = 'http://106.12.219.66:8227/report/getSimpleReport';
        let headers = {
          'Content-Type': 'application/json',
          'companyID': 0
        };
        let method = "post";
        let data = {
          "tableName": "sizing_produce_type",
          "pageNum": 1,
          "pageSize": 1000,
          "selectFields": ["id", "type"],
        };
        let data2 = {
          "tableName": "sizing_produce_units",
          "pageNum": 1,
          "pageSize": 1000,
          "selectFields": ["id", "units"],
        };
        let that = this
        that.unitList = []
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
      addName(id) {
        this.showNameTable = true
   this.id = id
        document.getElementById("staff_code").focus()
        this.focusInput = "staff_code"
        this.isadd = true
      },
      deleteName(id) {
        this.showNameTable = true
   this.id = id
        document.getElementById("staff_code").focus()
        this.focusInput = "staff_code"
        this.isadd = false
      },
      add() {
        if(this.dataList.length<4){
 this.dataList.push({
          id: this.dataList.length,
          type: this.typeList[0].type,
          unit: this.unitList[0].units,
          nameList: [

          ]
        })
        }else{
             this.$message({
          message: '一次添加最多四条！',
          type: 'warning'
        });
        }
       
        console.log(this.dataList)

      },
      addName2(id) {

        this.showNameTable2 = true
        this.id2 = id

        this.focusInput2 = "staff_code"
        this.isadd2 = true
        console.log(document.getElementById("staffcode"))
        // document.getElementById("staffcode").focus()
      },
      deleteName2(id) {
        this.showNameTable2 = true
        this.id2 = id
        document.getElementById("staffcode").focus()
        this.focusInput2 = "staff_code"
        this.isadd2 = false
      },
      showNum2(id) {
     
        this.showNumTable2 = true
        document.getElementById("num2").focus()
        this.focusInput2 = "num"
        this.id2 = id

      },


      showNum(id) {
        this.showNumTable = true
        document.getElementById("num").focus()
        this.focusInput = "num"
        this.id = id
      
      },
      changeFocus2(focusInput) {
        this.focusInput2 = focusInput
      },
      changeFocus(focusInput) {
        this.focusInput = focusInput
      },
      selectTableButton2(buttonName) {
        console.log(document.getElementById("staffcode"))
        if (this.focusInput2 === "num") {
          this.num2 += "";
          if (buttonName === "退格") {
            this.num2 = this.num2.substring(0, this.num2.length - 1)
          } else {
            this.num2 += buttonName;
          }
          document.getElementById("num2").focus()

        } else if (this.focusInput2 === "staff_code") {
          this.staff_code2 += "";
          if (buttonName === "退格") {
            this.staff_code2 = this.staff_code2.substring(0, this.staff_code2.length - 1)
          } else {
            this.staff_code2 += buttonName;
          }
          document.getElementById("staffcode").focus()

        }


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


      },
      getPermission() {
        console.log(this.num)
        this.showNumTable = false
          
        this.dataList.forEach(element => {
          if (element.id == this.id) {
            let type=element.type
            element.num = this.num
                      element.type = element.num
                          element.type=type
            this.num = ""
          }
       
        });
      
     
        console.log(this.dataList)

      },
      getPermission3() {

        this.showNumTable2 = false

        this.showData.forEach(element => {
          if (element.id == this.id2) {
            element.number = this.num2
            this.num2 = ""
          }
        });

      },
      getPermission4() {

        this.showNameTable2 = false
        console.log(this.id2)
        // let key=0
        this.showData.forEach(element => {
        //  if(key==0){
        //    key=1
        //  }
          element.nameList = []
          if (element.id == this.id2) {
            console.log(element.id)
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
                console.log(element.person)
                if (response.data.data.length >= 1) {
                  if (that.isadd2 == true) {
                    console.log(element.person)
                    if(element.person==""){
                       element.person=element.person+(response.data.data[0].staff_name)
                    }else{
                       element.person=element.person+("、"+response.data.data[0].staff_name)
                    }
                   
                  } else {
                     console.log(element.person)
                   
                     if(element.person.indexOf(response.data.data[0].staff_name+'、')==-1){
                       if(element.person[element.person.indexOf(response.data.data[0].staff_name)-1]=='、'){
element.person= element.person.replace('、'+response.data.data[0].staff_name,""); 
                       }else{
                        element.person= element.person.replace(response.data.data[0].staff_name,"");  
                       }
                       
                     }else{
                        
                       element.person= element.person.replace(response.data.data[0].staff_name+"、",""); 
                     }
                  // if(key==1){
                  //     element.person= element.person.replace(response.data.data[0].staff_name+"、",""); 
                  // }else{
                  //     element.person= element.person.replace(response.data.data[0].staff_name,""); 
                  // }
                  }
                

                } else {
                  this.$message.warning("员工号不正确!");

                }
                this.staff_code2 = ""
              })

          }
          // console.log(element)
          // element.person = element.nameList
        });

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
                  if (that.isadd == true) {
                    element.nameList.push(response.data.data[0].staff_name)
                  } else {
                    let index = element.nameList.indexOf((response.data.data[0].staff_name))
                    element.nameList.splice(index, 1)
                  }

                } else {
                  this.$message.warning("员工号不正确!");

                }
                this.staff_code = ""
              })

          }
        });

      },
      pagination(pageNo, pageSize, array) {
var offset = (pageNo - 1) * pageSize;
return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
},
    },
    mounted() {
    
      this.getOpiton()
      let params = this.$route.params.params.split(",");

      this.companyId = params[1];
      this.getData()
      console.log(document.getElementById("num2"))


    },
    destroyed() {

    },
    watch: {
      isSelect(val) {
        if (val == false) {
          this.getData()
        }else{
          this.dataList=[]
        }
      },
               otherProduceDialogShow(val){
   
       if(val==true){
          this.isSelect=true
       }
      }
    }
  }

</script>

<style  scoped>
/deep/ .el-input--medium .el-input__inner{
    height: 5rem;
    line-height: 3rem;
}
.bigSquareButton{
  width: 10rem;
  height: 10rem;
  margin-bottom: 8px;
  line-height:1.4;
  letter-spacing:4px
}
  .add {
 
    width: 30%;
height:5rem;
margin-right: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .add i {
    font-size: 5rem;
  }

  #num {
    .el-input__inner {
      height: 5rem;
      line-height: 3rem;
    }
  }

  #num2 {
    .el-input__inner {
      height: 5rem;
      line-height: 3rem;
    }
  }

  #staff_code {
    .el-input__inner {
      height: 5rem;
      line-height: 3rem;
    }
  }

  .staffcode {
    .el-input__inner {
      height: 5rem;
      line-height: 3rem;
    }
  }

  .sub {
    width: 14rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    background: red;
    border-radius: 8px;
  }

  .bottom_btn {
    width: 100%;
    height: 6rem;
    display: flex;
    border-left: 1px solid black;
  
  
  }

  .bottom_btn_left {
    width: 55%;
    height: 100%;
 border-top: 1px solid black;
  border-right: 1px solid black;
      border-bottom: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;

  }

  .bottom_btn_right {
    width: 45%;
   
    
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


 select {
    font-size: 1.5rem;
    border: none;
    width: 11rem;
    height:5rem;
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
