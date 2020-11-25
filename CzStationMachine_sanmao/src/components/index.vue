<template>
  <div class="allPage">
    <div class="header">
      <div class="header_left">
        <el-avatar :size="50">
          <img src="../../static/img/logo.png" />
        </el-avatar>
        <span>天衡穿综工位操作系统</span>
      </div>
      <div class="header_right">
        <!-- <span v-show="isShangZhou" v-for="(item,index) in nameList"
          :key="'sz_'+index">{{item.label}}：{{item.staffName}}</span>
        <span v-show="isChaPian" v-for="(item,index) in nameList2"
          :key="'cp_'+index">{{item.label}}：{{item.staffName}}</span>
        <span v-show="isStopCar || isMachine ">{{nameList3}}</span> -->
        <div class="icon_info">
          <img src="../../static/img/remind.png" />

          <img src="../../static/img/unremind.png" />

          <img src="../../static/img/refresh.png" @click="reload()" />

          <img src="../../static/img/question.png" />
        </div>
      </div>
    </div>
    <div class="main" v-show="mainShow">
      <div class="btn" @click="showQuery">穿综计划查询</div>
      <div class="btn" @click="showBaogong">穿综报工</div>
    </div>
    <div class="query" v-show="queryShow">
      <div class="table">
        <el-table :data="tableData" size="medium" :border="border" style="width: 100%;height:100%;font-size:1.3rem"
          :header-cell-style="headerClass">
          <el-table-column :show-overflow-tooltip="true" align="center" prop="date" label="穿综优先等级" width="180">
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" align="center" prop="name" label="产品品号" width="180">
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" align="center" prop="address" label="色号">
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" align="center" prop="address" label="批次">
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" align="center" prop="address" label="轴号">
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" align="center" prop="address" label="整经长度">
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" align="center" prop="address" label="匹数">
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" align="center" prop="address" label="状态">
          </el-table-column>
        </el-table>
      </div>
      <div class="bottom">
        <div class="left_bottom">
          <div class="btn" style="font-size:2rem">上一页</div>
          <div class="btn" style="font-size:2rem">下一页</div>
        </div>
        <div class="right_bottom">
          <div class="btn" style="font-size:2rem;background:#808080;color:white" @click="back">返回</div>
        </div>
      </div>
    </div>
    <div class="baogong" v-show="baogongShow">
      <div class="head" :style="enabled ? 'background:rgba(49,124,205,0.6)':''"><span
          style=" justify-content: flex-start;"></span><span style="font-size:2rem">穿综记录</span><span
          style="    justify-content: flex-end;">{{time}}</span></div>
      <div class="con1">
        <div class="con1_top">
          <div class="con1_top_con"><span
              style="margin-right:9rem;margin-left:3rem">品号：扫码后显示</span><span>色号</span><span>轴号</span><span>整经长度</span>
          </div>
          <div class="con1_top_con"><span
              style="margin-right:9rem;margin-left:3rem">品号：扫码后显示</span><span>色号</span><span>轴号</span><span>整经长度</span>
          </div>
        </div>
        <div class="con1_bottom">
          <div class="con1_bottom_con">
            <span>穿综工号1</span>
            <input v-model="cz1" />
          </div>
          <div class="con1_bottom_con">
            <span>穿综工号2</span>
            <input v-model="cz2" />
          </div>
          <div class="con1_bottom_con">
            <span>穿综工号3</span>
            <input v-model="cz3" />
          </div>
          <div class="con1_bottom_con">
            <span>穿综工号4</span>
            <input v-model="cz4" />
          </div>
        </div>
      </div>
      <div class="con2">
        <div class="con2_con">
          <div class="con1_bottom_con" style="height:50%">
            <span>根数</span>
            <input v-model="gs" />
          </div>
          <div class="con1_bottom_con" style="height:50%">
            <span style="width:10rem">复查人(工长)</span>
            <input v-model="fcr" />
          </div>
        </div>
        <div class="con2_con" style="width:40%;">
          <div class="con1_bottom_con" style="height:50%;width:100%;flex-direction:row;justify-content:flex-start">
            <span style="margin-right:2rem;margin-top:3rem">难度系数</span>
            <input v-model="ndxs" style="margin-top:3rem" />
          </div>
          <div class="con1_bottom_con" style="height:50%;width:100%;flex-direction:row;justify-content:flex-start">
            <span style="margin-right:2rem;margin-top:3rem">加班系数</span>
            <input v-model="jbxs" style="margin-top:3rem" />
          </div>
        </div>
        <div class="con2_con">
          <span style="    margin-bottom: 1.5rem;
    margin-top: 1rem;">备注</span>
          <textarea v-model="bz"></textarea>
        </div>
      </div>
      <div class="bottom_btn">
        <div class="btns" :style=" enabled ? '':'background:rgba(163,216,151,0.6);color:rgba(0,0,0,0.6)'"
          @click="dialogVisible=true">扫码穿综</div>
        <div class="btns" :style=" enabled2 ? '':'background:rgba(163,216,151,0.6);color:rgba(0,0,0,0.6)'"
          @click="save()">保存</div>
        <div class="btns" :style=" !enabled2 ? '':'background:rgba(163,216,151,0.6);color:rgba(0,0,0,0.6)'"
          @click="update()">修改</div>
        <div class="btns" @click="dialogVisible2=true"
          :style=" enabled3 ? '':'background:rgba(163,216,151,0.6);color:rgba(0,0,0,0.6)'">完成</div>
        <div class="btns" style="margin-left:5rem;background:#808080;color:white" @click=" back">返回</div>
      </div>
      <el-dialog title="扫码" :visible.sync="dialogVisible" width="45%">
        <div
          style="width:100%;height:20rem;    display: flex;flex-direction: column;align-items: center;justify-content: space-around;">
          <input v-model="printCode" style="width:10rem;font-size:1.6rem;height:2rem;border:none;" />
          <img src="../../static/img/saomiao.gif" style="width:10rem;" />

          <div class="stopBtn" @click="dialogVisible = false">停止扫码</div>
        </div>





      </el-dialog>
      <el-dialog title="确认提交" :visible.sync="dialogVisible2" width="45%">
        <div
          style="width:100%;height:20rem;    display: flex;flex-direction: column;align-items: center;justify-content: space-around;">

          <img src="../../static/img/face.png" style="width:10rem;" />
          <span style="font-size:1.6rem">是否提交</span>
          <div style="width:100%;display:flex;justify-content: space-around;">
            <div class="stopBtn" @click="Finish()">确认</div>
            <div class="stopBtn" style="background:#808080;color:white;" @click="dialogVisible2 = false">取消</div>
          </div>
        </div>





      </el-dialog>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'index',
    data() {
      return {
        timer:"",
        time:"",
        printCode: "",
        border: false,
        mainShow: true,
        queryShow: false,
        baogongShow: false,
        enabled: true,
        enabled2: false,
        enabled3: false,
        dialogVisible: false,
        dialogVisible2: false,
        pageNum: 1,
        pageSize: 8,
        companyId: "10000025",
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '30070',
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '30070'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '3007021312312312',
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '30070',
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '30070'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '3007021312312312',
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '30070',
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '30070'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '3007021312312312',
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '30070'
          }
        ],
        cz1: "",
        cz2: "",
        cz3: "",
        cz4: "",
        gs: "",
        fcr: "",
        ndxs: "",
        jbxs: "",
        bz: ""
      }
    },
    methods: {
      Finish() {
        this.dialogVisible2 = false
        this.baogongShow = false
        this.mainShow = true
      },
      save() {
        this.enabled2 = !this.enabled2
        this.enabled3 = true
      },
      update() {
        this.enabled2 = !this.enabled2
        this.enabled3 = false
      },
      getData() {
        let url = 'http://106.12.219.66:8227/report/getSimpleReport';
        let headers = {
          'Content-Type': 'application/json',
          'companyID': this.companyId
        };
        let method = "post";
        let data = {
          "tableName": "sizing_produce_info",
          "pageNum": this.pageNum,
          "pageSize": this.pageSize,

        };

        let that = this
        axios({
            url: url,
            method: method,
            data: data,
            headers: headers
          })
          .then(response => {
            console.log(response)

          })
      },
      headerClass({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        console.log(row)
        if (rowIndex == 0) {
          return 'background:#317CCD;color:white;'
        }

      },
      showQuery() {
        this.mainShow = false
        this.baogongShow = false
        this.queryShow = true
      },
      showBaogong() {
        this.mainShow = false
        this.queryShow = false
        this.baogongShow = true

      },
      back() {

        this.queryShow = false
        this.baogongShow = false
        this.mainShow = true
      },
       getTime() { //获取时间
        //定义一个日期对象;
        var dateTime = new Date();
        //获得系统年份;
        var year = dateTime.getFullYear();
        //获得系统月份;
        var month = dateTime.getMonth() + 1;
        //获得系统当月分天数;
        var day = dateTime.getDate();
        //获得系统小时;
        var hours = dateTime.getHours();
        //获得系统分钟;
        var minutes = dateTime.getMinutes();
        //获得系统秒数;
        var second = dateTime.getSeconds();
        day < 10 ? day = '0' + day : day;
        month < 10 ? month = '0' + month : month;
        hours < 10 ? hours = '0' + hours : hours;
        minutes < 10 ? minutes = '0' + minutes : minutes;
        second < 10 ? second = '0' + second : second;

        let dateStr = year + '-' + month + '-' + day + ' ' + ' ' + hours + ':' + minutes + ':' + second;
        this.time = dateStr
      

      },
    },
    mounted() {
     this.timer = setInterval(this.getTime, 1000);
    },
    watch: {
      printCode(val) {
        if (val.length == 10) {
          this.dialogVisible = false
          this.enabled = false
          this.enabled2 = true
          this.enabled3 = false
          this.printCode = ""
        }
      },
      queryShow(val) { //当选择上轴组页面显示时加载数据
        if (val == true) {
          this.getData()


          // })
        }
      },

    }

  }

</script>

<style scoped>
body{
padding-right:0 !important ; 
  }
body{
   padding: 0;
}
  .header {
    background: #317CCD;
    color: white;
  }

  .allPage {
    width: 100%;
    height: 100vh;

  }

  .header {
    width: 100%;
    height: 8%;
    background: #29374B;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header_left {
    width: 35%;
    height: 100%;
    display: flex;
    align-items: center;
    color: white;
    font-size: 1.5rem;
  }

  .header_left span {
    margin-left: 1.5rem;
  }

  .header_right {
    width: 62%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .header_right span {
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    margin-right: 1rem;
  }

  .icon_info {
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .icon_info img {
    width: 30px;
    height: 30px;
  }

  .main {
    width: 100%;
    height: 92%;
    display: flex;
    align-items: center;

    justify-content: space-around;
  }

  .query {
    width: 100%;
    height: 92%;
    display: flex;
    flex-direction: column;
  }

  .bottom {
    width: 100%;
    height: 10rem;

    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 0rem;
  }

  .left_bottom {
    width: 45%;
    height: 9rem;
    align-items: center;
    justify-content: space-between;
    display: flex;
  }

  .right_bottom {
    width: 45%;
    height: 9rem;
    align-items: center;
    justify-content: flex-end;
    display: flex;
  }

  .table {
    width: 100%;
    height: 30rem;
  }

  .baogong {
    width: 100%;
    height: 92%;
    background: #E2E7ED;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .con1_bottom_con {
    width: 30%;
    height: 100%;
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

  }

  .con1_bottom_con input {
    width: 11rem;
    height: 3.5rem;
    border: 1px solid black;
    font-size: 1.6rem;
  }

  .head {
    width: 100%;
    margin-bottom: 1.5rem;
    height: 4rem;
    background: #317CCD;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .head span {
    font-size: 1.5rem;
    color: white;
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .con1 {
    width: 100%;
    height: 16rem;
    margin-bottom: 1rem;
    background: white;

  }

  .con1_top {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .con1_top_con {
    width: 100%;
    height: 3rem;
    display: flex;
  }

  .con1_top_con span {
    width: 20%;
    height: 100%;
    font-size: 1.6rem;
    color: rgba(0, 0, 0, 0.6);
  }

  .con1_bottom {
    width: 100%;
    height: 46%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .con2 {
    width: 100%;
    height: 16rem;
    background: white;
    display: flex;
  }

  .con2_con {
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .con2_con span {
    font-size: 1.6rem;
  }

  .con2_con textarea {
    width: 90%;
    height: 10rem;
    border: 1px solid black;
  }

  .btn {
    width: 45%;
    height: 50%;
    background: #A3D897;
    border-top: 3px solid #ffffff;
    border-left: 3px solid #ffffff;
    border-bottom: 3px solid #717171;
    border-right: 3px solid #717171;
    display: flex;

    align-items: center;
    justify-content: center;
    color: black;
    font-size: 3rem;
  }

  .bottom_btn {
    width: 100%;
    height: 9rem;

    display: flex;
    align-items: center;

  }

  .btns {
    width: 10rem;
    height: 70%;
    background: #A3D897;
    border-top: 3px solid #ffffff;
    border-left: 3px solid #ffffff;
    border-bottom: 3px solid #717171;
    border-right: 3px solid #717171;
    display: flex;
    margin-left: 1.5rem;
    align-items: center;
    justify-content: center;
    color: black;
    font-size: 2rem;
  }

  .stopBtn {
    width: 10rem;
    height: 4rem;
    font-size: 1.6rem;
    background: #A3D897;
    border-top: 3px solid #ffffff;
    border-left: 3px solid #ffffff;
    border-bottom: 3px solid #717171;
    border-right: 3px solid #717171;
    display: flex;

    align-items: center;
    justify-content: center;

  }

</style>
