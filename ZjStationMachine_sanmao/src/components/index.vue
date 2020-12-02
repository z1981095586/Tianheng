<template>
  <div class="allPage">
    <div class="header">
      <div class="header_left">
        <el-avatar :size="50">
          <img src="../../static/img/logo.png" />
        </el-avatar>
        <span>天衡整经工位操作系统</span>
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
    <div class="main" style="background:white" v-show="mainShow">
      <div class="btn" @click="dialogVisible=true">扫码</div>

    </div>
    <div class="query" v-show="queryShow">
      <div class="head" :style="enabled ? 'background:rgba(49,124,205,0.6)':''"><span
          style=" justify-content: flex-start;"></span><span style="font-size:2rem">上纱记录</span><span
          style="    justify-content: flex-end;">{{time}}</span></div>
      <div class="con1">
        <div class="con1_left">
          <div class="con1_left_con">
            <span :style="enabled ? 'color:rgba(0,0,0,0.6)':''">整经工号1</span>
            <input :disabled="enabled" v-model="ss_zjgh1" :style="enabled ? 'border:1px solid rgba(0,0,0,0.6)':''" />
          </div>
          <div class="con1_left_con">
            <span :style="enabled ? 'color:rgba(0,0,0,0.6)':''">整经工号2</span>
            <input :disabled="enabled" v-model="ss_zjgh2" :style="enabled ? 'border:1px solid rgba(0,0,0,0.6)':''" />
          </div>
          <div class="con1_left_con">
            <span :style="enabled ? 'color:rgba(0,0,0,0.6)':''">筒子纱数</span>
            <input :disabled="enabled" v-model="ss_tzss" :style="enabled ? 'border:1px solid rgba(0,0,0,0.6)':''" />
          </div>
        </div>
        <div class="con1_right">
          <div class="con1_right_con">
            <div class="ph">
              <span :style="enabled ? 'color:rgba(0,0,0,0.6)':''">品号：8943-2349-2</span>
            </div>
            <div class="pm">
              <span
                :style="enabled ? 'color:rgba(0,0,0,0.6)':''">品名：我是品名，我是品名品名名我是品名我是品名，我是品名品名名我是品名我是品名，我是品名品名名我是品名我是品名，我是品名品名名我是品名</span>
            </div>
            <div class="gg">
              <span :style="enabled ? 'color:rgba(0,0,0,0.6)':''"> 规格：我是规格规格硅谷贵已个IGUI个贵</span>
            </div>
          </div>
        </div>
      </div>
      <div class="head"><span style=" justify-content: flex-start;">品号：239-2394-2备份</span><span style="font-size:2rem"
          v-text="isZJ1? '整经记录1':'整经记录2'"></span><span style="    justify-content: flex-end;">机台：701</span></div>
      <div class="con2">
        <div class="con2_left" v-show="isZJ1">
          <div class="con2_left_con"><span>整经工号</span><input v-model="form.zj_zjgh2" /> <span>整经长度</span><input
              v-model="form.zj_zjcd" /> </div>
          <div class="con2_left_con"><span>把数</span><input v-model="form.zj_bs" /> <span>扫尾把数</span><input
              v-model="form.zj_swbs" /> </div>
          <div class="con2_left_con"><span>轴号</span><input v-model="form.zj_zh" /> <span>倒轴工号</span><input
              v-model="form.zj_dzgh" /> </div>
          <div class="con2_left_con"><span>备注</span><input v-model="form.zj_bz" style="width:35rem" /> </div>
        </div>
        <div class="con2_left" v-show="!isZJ1">
          <div class="con2_left_con"><span>整经工号</span><input v-model="form.zj2_zjgh2" /> <span>整经长度</span><input
              v-model="form.zj2_zjcd" /> </div>
          <div class="con2_left_con"><span>把数</span><input v-model="form.zj2_bs" /> <span>扫尾把数</span><input
              v-model="form.zj2_swbs" /> </div>
          <div class="con2_left_con"><span>轴号</span><input v-model="form.zj2_zh" /> <span>倒轴工号</span><input
              v-model="form.zj2_dzgh" /> </div>
          <div class="con2_left_con"><span>备注</span><input v-model="form.zj2_bz" style="width:35rem" /> </div>
        </div>
        <div class="con2_right">
          <span class="con2_right_con">匹长：999</span>
          <span class="con2_right_con">匹数：999</span>
          <div class="con2_right_con"> <span>倒轴时间</span>
            <span>2020/11/20 19:23</span></div>
          <div class="con2_right_con"> <span>其他停车时间</span>
            <span> 2020/11/20 19:23</span></div>
        </div>


      </div>
      <div class="bottom_btn">
        <div class="btns" :style=" enabled ? 'background:rgba(163,216,151,0.6);color:rgba(0,0,0,0.6)':''"
          @click="ssFinish()">上纱完成</div>
        <div class="btns" :style=" enabled ? '':'background:rgba(163,216,151,0.6);color:rgba(0,0,0,0.6)'"
          @click="jjFinish()">交接班</div>
        <div class="btns" :style=" enabled ? '':'background:rgba(163,216,151,0.6);color:rgba(0,0,0,0.6)'"
          @click="dialogVisible2=true">完成</div>
        <div class="btns" style="margin-left:15rem;background:#808080;color:white" @click=" back">返回</div>
      </div>
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
    <el-dialog title="警告" :visible.sync="dialogVisible3" width="45%">
      <div
        style="width:100%;height:20rem;    display: flex;flex-direction: column;align-items: center;justify-content: space-around;">


        <span style="font-size:1.6rem">整经工号1，整经工号2其中一个不能为空，筒子纱数不为空且大于0，才可提交！</span>
        <div class="stopBtn" @click="dialogVisible3=false">确认</div>
      </div>





    </el-dialog>
    <el-dialog title="警告" :visible.sync="dialogVisible4" width="45%">
      <div
        style="width:100%;height:20rem;    display: flex;flex-direction: column;align-items: center;justify-content: space-around;">


        <span style="font-size:1.6rem">两个班的整经工号，整经长度，把数都填写完整，才可提交！</span>
        <div class="stopBtn" @click="dialogVisible4=false">确认</div>
      </div>





    </el-dialog>
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
        enabled: false,
        isZJ1: true,
        printCode: "",
        dialogVisible3: false,
        dialogVisible4: false,
        dialogVisible: false,
        dialogVisible2: false,
        mainShow: true,
        queryShow: false,


        companyId: "10000025",
        ss_zjgh1: "",
        ss_zjgh2: "",
        ss_tzss: "",
        form: {


          zj_zjgh2: "",
          zj_zjcd: "",
          zj_bs: "",
          zj_swbs: "",
          zj_zh: "",
          zj_dzgh: "",
          zj_bz: "",
          zj2_zjgh2: "",
          zj2_zjcd: "",
          zj2_bs: "",
          zj2_swbs: "",
          zj2_zh: "",
          zj2_dzgh: "",
          zj2_bz: ""
        }

      }
    },
    methods: {
      ssFinish() {
        if ((this.ss_zjgh1 == "" && this.ss_zjgh2 == "") || (this.ss_tzss == "" || this.ss_tzss <= 0)) {
          console.log("不能为空！")
          this.dialogVisible3 = true
          console.log(this.ss_tzss < 0)
        } else {
          this.enabled = true
        }

      },
      jjFinish() {
        this.isZJ1 = !this.isZJ1
      },
      Finish() {
        console.log(this.zj2_zjcd)
        if (this.form.zj2_zjgh2 == "" || this.form.zj_zjgh2 == "" || this.form.zj_zjcd == "" || this.form.zj2_zjcd ==
          "" || this.form.zj_bs == "" || this.form.zj2_bs == "") {
          console.log("不能为空！")
          this.dialogVisible4 = true

        } else {
          this.enabled = false
          this.dialogVisible2 = false
          this.showQuery = false
          this.mainShow = true
          for (var item in this.form) {
            this.form[item] = ""
          }
          this.ss_tzss = ""
          this.ss_zjgh1 = ""
          this.ss_zjgh2 = ""
          console.log(this.form)
        }


      },
      getData() {

      },

      showQuery() {
        this.mainShow = false
        this.queryShow = true
      },

      back() {

        this.queryShow = false
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
        if (val.length == 9) {
          this.dialogVisible = false
          this.mainShow = false
          this.queryShow = true
          this.printCode = ""
        }
      },
      dialogVisible4(val) {
        if (val == true) {
          this.dialogVisible2 = false
        }
      }

    }

  }

</script>

<style scoped>
  .header {
    background: #317CCD;
    color: white;
  }

  .allPage {
    width: 100%;
  height: 768px;
    background: #E2E7ED;
  }

  .header {
    width: 100%;
height: 80px;
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

  .head {
    width: 100%;
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
    height: 9rem;
    display: flex;
    background: white;
    margin-bottom: 1rem;
  }

  .con1_left {
    width: 65%;
    height: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

  }

  .con1_left_con {
    width: 30%;
    height: 100%;
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

  }

  .con1_left_con input {
    width: 11rem;
    height: 3.5rem;
    border: 1px solid black;
    font-size: 1.6rem;
  }

  .con1_right {
    width: 35%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

  }

  .con1_right_con {
    width: 90%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .ph {
    width: 100%;
    height: 30%;

    display: flex;
    align-items: center;
  }

  .pm {
    width: 100%;
    height: 40%;
    display: flex;
    align-items: center;


  }

  .pm span {
    overflow: hidden;

    text-overflow: ellipsis;

    display: -webkit-box;

    -webkit-box-orient: vertical;

    -webkit-line-clamp: 2;
  }

  .gg span {
    overflow: hidden;

    text-overflow: ellipsis;

    display: -webkit-box;

    -webkit-box-orient: vertical;

    -webkit-line-clamp: 2;
  }

  .gg {
    width: 100%;
    height: 40%;
    display: flex;
    align-items: center;


  }

  .con2 {
    width: 100%;
    height: 19rem;
    background: white;
    padding-bottom: 0.5rem;
    display: flex;

  }

  .con2_left {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

  }

  .con2_left_con {
    width: 100%;
    height: 25%;
    display: flex;
    align-items: center;
    font-size: 1.6rem;
  }

  .con2_left_con span {
    margin-left: 3rem;
    margin-right: 1.5rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 8rem;
  }

  .con2_left_con input {
    width: 11rem;
    height: 3.5rem;
    border: 1px solid black;
  }

  .con2_right {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

  }

  .con2_right_con {
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    font-size: 1.6rem;
    color: #808080;
  }

  .bottom_btn {
    width: 100%;
    height: 9rem;

    display: flex;
    align-items: center;
    margin-bottom: 1rem;
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
    margin-left: 2rem;
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
