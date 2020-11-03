<template>

  <div class="content">
    <div class="head">
      <div class="head_left"> <img class="logo" src="../../assets/logo.png">
        <div class="icon">
          <img class="people" src="../../static/images/people.png">
        </div>
        <div class="name"  @click="toPeople">
          <span>{{staff_name}}</span>
        </div>
        <div class="number">
          <span>{{staff_id}}</span>
        </div>
      </div>
      <div class="head_right">
        <div class="right_con">
          <div class="time">{{time}}</div>
           <div class="shutdown"><img @click="dialogVisibleClose=true" src="../../static/images/shutdown.png" /></div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="contain">
      <div class="name_contain">
        <div class="name_contain_son">
          <div v-for="(item,index) in dataList" class="one_name" @click="deletePeopleShow(item.staff_name,item.id)"  :key="index"><span>{{item.staff_name}}</span> <img v-show="showCloseIcon" class="chahao" src="../../static/images/chacha.png" /></div>
        </div>
        <div class="page_btn">
          <div class="top_jiantou" @click="pageReduce"><img src="../../static/images/shangjiantou.png"></div>
          <div class="current_page"><span>第</span><span>{{page2}}/{{pageNumber}}</span><span>页</span></div>
          <div class="bottom_jiantou" @click="pageAdd"><img src="../../static/images/xiajiantou.png"></div>
        </div>
      </div>
      <div class="bottom_btn">
        <div class="add_btn" @click="add_btn_click"><span>添加操作人员</span></div>
  <div class="add_btn" @click="showCloseIcon=true"  v-show="!showCloseIcon"><span>删除操作人员</span></div>
  <div class="add_btn" @click="showCloseIcon=false" v-show="showCloseIcon"><span>取消操作人员</span></div>
        <div class="back_btn" @click="back"><img src="../../static/images/back.png"></div>
      </div>
    </div>
    <el-dialog :show-close="showclose" :visible.sync="dialogFormVisible" title="操作人信息" top="8vh">
      <el-form style="    height: 70%;" :model="form">


        <input type="text" style="width: 100%;height: 61%;font-size: 2em;   border: 1px solid black;" id="input_bm"
          placeholder="请输入员工编码" v-model="form.staff_code"
          data-layout="normal" />

        <input type="text" style="width: 100%;height: 61%;font-size: 2em;margin-top:15px;   border: 1px solid black;"
          id="input_xm"  placeholder="请输入员工姓名"
          v-model="form.staff_name" data-layout="normal"  />
        <!-- <el-drawer title="" :visible.sync="visible2" direction="btt" :modal="modal" :show-close="showclose" size="61%">
          <vue-touch-keyboard id="v2" style="font-size: 2em;" :options="options" v-show="visible2" :next="next"
            :layout="layout" :cancel="hide" :accept="accept" :input="input" />

        </el-drawer>
        <el-drawer title="" :visible.sync="visible3" direction="btt" :modal="modal" :show-close="showclose" size="61%">
          <vue-touch-keyboard id="v3" style="font-size: 2em;" :options="options" v-show="visible3" :next="next2"
            :layout="layout" :cancel="hide2" :accept="accept2" :input="input2" />

        </el-drawer> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="font-size: 3.5em;" @click="dialogFormVisible = false">取 消</el-button>
        <el-button style="font-size: 3.5em;" type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
           <!-- 退出系统的对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisibleClose" width="50%" :show-close="showclose">
      <div style="display: flex;flex-direction: column;align-items: flex-start;height: 80%;    font-size: 2em;">
       <span>即将关闭当前系统，若需使用需要输入网址！</span></div>
      <!-- <el-drawer title="" :visible.sync="mm_visible2" direction="btt" :modal="mm_modal" :show-close="mm_showclose"
        size="61%">
        <vue-touch-keyboard style="font-size: 2em;" :options="mm_options" v-if="mm_visible2" :next="mm_next"
          :layout="mm_layout" :cancel="mm_hide" :accept="mm_accept" :input="mm_input" />
      </el-drawer> -->
      <span slot="footer" class="dialog-footer">
        <el-button style="    font-size: 3.5em;" @click="dialogVisibleClose = false">取 消</el-button>
        <el-button style="    font-size: 3.5em;" type="primary" @click="shutdown()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 退出系统的对话框 -->
              <!-- 是否删除人员的对话框 -->
    <el-dialog title="提示" :visible.sync="dialogFormVisible2" width="50%" :show-close="showclose">
      <div style="display: flex;flex-direction: column;align-items: flex-start;height: 80%;    font-size: 2em;">
       <span>是否确认删除{{deleteName}}?</span></div>
      <!-- <el-drawer title="" :visible.sync="mm_visible2" direction="btt" :modal="mm_modal" :show-close="mm_showclose"
        size="61%">
        <vue-touch-keyboard style="font-size: 2em;" :options="mm_options" v-if="mm_visible2" :next="mm_next"
          :layout="mm_layout" :cancel="mm_hide" :accept="mm_accept" :input="mm_input" />
      </el-drawer> -->
      <span slot="footer" class="dialog-footer">
        <el-button style="    font-size: 3.5em;" @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button style="    font-size: 3.5em;" type="primary" @click="deletePeople()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 是否删除人员的对话框 -->
  </div>



</template>
<script>
  import axios from 'axios'
  export default {
    name: "peopleIn",
    data: () => ({
      time: "", //当前时间
      staff_name: "", //操作人姓名
      staff_id: "", //操作人id
      page: 1,
      id: "",
        dialogVisibleClose:false,
      showclose:false,
      pageNum: 21, //这个是pagesize
      pageNumber: null, //这个是总页数
      page2: 1, //显示的当前页数
      network: true,
      flag: true, //标识是否可下一页
      companyID: "",
      dataList: [], //存储一页的显示的操作人员数据
      dialogFormVisible: false,
      form: {},
      visible2: false, //抽屉键盘的显示
      visible3: false,
      visible_bm: true, //输入框显示
      visible_xm: true, //输入框显示
      layout: "compact",
      input: null,
      input2: null,
      modal: false,
      showclose: false,
      options: {
        useKbEvents: false,
        preventClickEvent: false,
     
      },
         showCloseIcon:false,
         dialogFormVisible2:false,
         deleteName:"",
         deleteId:""
    }),

    methods: {
      deletePeopleShow( deleteName,deleteId){
        console.log( deleteName)
        this. deleteName= deleteName
        this.deleteId=deleteId
        if(this.showCloseIcon==true){
          this. dialogFormVisible2=true
        }
      
      },
      deletePeople(){
let url="http://120.55.124.53:8206/api/staff/deleteStaff"
let that=this
 let companyID = that.companyID
        axios({
          method: "post",
          url: url,
          data: {
            staff_id:that.deleteId
          },
          headers: {
            companyID: companyID
          }
        }).then((res) => {
          console.log(res)
        if(res.data.message=="删除成功"){
                 that.$message({
              type: 'success',
              message: '删除成功'

            });
                 that.page = 1
            that.page2 = 1
            that.dataList = []
            that.getRootStaffOrganization()
        that.dialogFormVisible2=false
        }else{
                 that.$message({
              type: 'error',
              message: '删除失败'

            });

        }
        })
      },
            shutdown(){//关闭页面
         this.$store.commit('clear', true)
         //console.log(this.$store.state)
var userAgent = navigator.userAgent;
if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") !=-1) {
window.open('','_self').close()  

window.location.href = "about:blank"
}else {
window.opener = null;
window.open("about:blank", "_self");
window.close();
}
      },
   
          toPeople() { //跳转到操作人员更改

        this.$router.push({ //跳转
          path: '/people',
          name: 'people',
          params:{
            lastPath:"peopleIn"
          }

        })

      },
      add_btn_click() {

        this.dialogFormVisible = true
        this.visible_bm = true
        this.visible_xm = true
        // setTimeout(function(){  document.getElementById("input_bm").focus() }, 2000);
        this.form = {}


      },
      bm_focus() {
        document.getElementById("input_bm").focus
      },
      xm_focus() {
        document.getElementById("input_xm").focus
      },
      accept2(text) {
        // alert("Input text: " + text);

        this.visible_xm = false
        //console.log(this.form)
        if (document.getElementById("input_bm")) {
          document.getElementById("input_bm").focus()
        }

        this.hide2();



      },

      show2(e) {
        //console.log("show2")

        this.input2 = e.target;
        this.layout = e.target.dataset.layout;
        //console.log(e)
        if (this.visible3 == false) {

          this.visible3 = true
        }



      },
      next() { //清空功能
        //console.log("清空bianma")
        this.input.value = ""

        this.form.staff_code = ""
      },
      next2() { //清空功能
        //console.log("清空名字")
        this.input2.value = ""

        this.form.staff_name = ""
      },
      hide2() {
        //console.log("hide2")
        if (this.form.staff_name && (this.form.staff_code)) {
          //console.log("add")
          this.add()
          this.visible_bm = false
          this.visible_xm = false
          this.visible3 = false

          this.dialogFormVisible = false
        } else {
          this.visible_bm = false
          this.visible_xm = false
          this.dialogFormVisible = false
          this.input.value = ""//键盘输入框清空
          this.input2.value = ""
          this.visible3 = false//编码键盘隐藏
          this.form = {}

          alert("员工姓名和员工编号是必填项，请输入完整！")
        }


      },
      accept(text) {
        // alert("Input text: " + text);
        //console.log(this.form)

        this.visible_bm = false
        if (document.getElementById("input_xm")) {
          document.getElementById("input_xm").focus()
        }
        this.hide();



      },
      show(e) {

        //console.log("show1")
        this.input = e.target;
        this.layout = e.target.dataset.layout;
        //console.log(e)

        if (this.visible2 == false) {

          this.visible2 = true
        }
        //console.log(this.visible2)


      },

      hide() {
        //console.log("hide1")
        if (this.form.staff_name && (this.form.staff_code)) {
          //console.log(this.form)
          this.add()
          this.visible_bm = false
          this.visible_xm = false
          this.dialogFormVisible = false
          this.visible2 = false
        } else if (this.form.staff_name && (this.form.staff_code == undefined)) {
          document.getElementById("input_bm").focus()
        } else if (this.form.staff_code && (this.form.staff_name == undefined)) {
          document.getElementById("input_xm").focus()
        }


      },
      add() {
        //console.log(this.form)
        let that = this
        let url = "http://120.55.124.53:8206/api/staff/addStaff"
        let companyID = that.companyID
        axios({
          method: "post",
          url: url,
          data: {
            staff_organization_id: that.id,
            staff_code: that.form.staff_code,
            staff_name: that.form.staff_name
          },
          headers: {
            companyID: companyID
          }
        }).then((res) => {
          //console.log(res.data);
          if (res.data.message == "插入成功") {
            that.$message({
              type: 'success',
              message: '添加成功！'

            });

            that.dialogFormVisible = false
            that.page = 1
            that.page2 = 1
            that.dataList = []
            that.getRootStaffOrganization()
          } else {
            that.$message({
              type: 'error',
              message: res.data.message
            });
          }
          //console.log(that.input)
          //console.log(that.form)
          that.input.value = ""
          that.input2.value = ""

          that.form = {}

        })

      },

      getRootStaffOrganization() { //获取根组织
        let url = "http://120.55.124.53:8206/api/staff/getRootStaffOrganization"

        let that = this
        ////console.log(that.companyID)
        let companyID = that.companyID
        axios({
          method: "post",
          url: url,
          timeout: 1000, //设置时间超时，单位毫秒
          data: {

          },
          headers: {
            companyID: companyID
          }
        }).then((res) => {
          ////console.log(res.data.data.id);
          that.id = res.data.data.id;
          that.getStaffListByOrganization(that.id) //获取指定组织下的所有员工列表(包括子组织)
        }, function (err) {
          ////console.log(err)
          if (err == "Error: timeout of 1000ms exceeded" || "Error: Network Error") { //超时1000毫秒显示断网图标
            that.network = false
            that.$message({
              type: 'warning',
              message: '网络掉线了！'
            });
          } else {


            that.network = true
          }
        })

      },

      getStaffListByOrganization(id) { //获取指定组织下的所有员工列表(包括子组织)
        let url = "http://120.55.124.53:8206/api/staff/getStaffListByOrganization"
        let that = this

        let companyID = that.companyID
        axios({
          method: "post",
          url: url,
          data: {
            staff_organization_id: id,
            page: that.page,
            pageNum: that.pageNum
          },
          headers: {
            companyID: that.companyID
          }
        }).then((res) => {
          //console.log(res);
          res.data.totalDataNum
          that.pageNumber = Math.ceil(res.data.totalDataNum / that.pageNum)
          that.page2 = that.page
          if (res.data.data.staffModel.length == 0) {
            this.$notify.info({
              title: '消息',
              duration: 2000,
              message: '这是最后一页了！'
            });
            that.page = that.page - 1 //最后一页页数改正，不可再加
            that.page2 = that.page //用page显示会因为改正闪一下，所以用page2
            that.flag = false //最后一页标识，不能再+页数了
            return
          } else {
            that.flag = true
          }
          if (that.dataList.length > 0) { //
            that.dataList = []
          }
          for (let i = 0; i < res.data.data.staffModel.length; i++) { //当前页数据


            that.dataList.push(res.data.data.staffModel[i])
          }


        })

      },
      pageReduce() { //上一页

        if (this.page > 1) {
          this.page = this.page - 1
        }

        this.getStaffListByOrganization(this.id)


      },
      pageAdd() { //下一页
        if (this.flag == true) { //只有不是最后一页才可下一页操作
          this.page = this.page + 1
          this.getStaffListByOrganization(this.id)


        }

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
      back() { //返回主页
        // this.$router.push("/index/:" + this.$store.state.companyID + "/:" + this.$store.state.library_num)
        this.$router.push({
               path: '/index',
          name: 'index',
          params:{
       companyId:this.$store.state.companyID,
       library_num:this.$store.state.library_num
          }
        })
      }

    },
    mounted() {
      //console.log(Math.ceil(13 / 6))
      let timer = setInterval(this.getTime, 1000);
      if (this.$store.state.peopleData.staff_name) { //获取操作者名字和id
        this.staff_name = this.$store.state.peopleData.staff_name
        this.staff_id = this.$store.state.peopleData.staff_id
      }
      this.companyID = this.$store.state.companyID
      this.getRootStaffOrganization();
    },
      beforeDestroy() {
       if (this.timer) {
          clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
        }
    },


  }

</script>
<style scoped>
.chahao{
width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    right: 1px;
    top: 1px;

}
  .crmx_con /deep/ .el-table th,
  .el-table tr {
    background-color: rgb(179, 206, 248);
    color: black;
  }

  .crmx_con /deep/ .el-table--enable-row-transition .el-table__body td {
    background-color: rgb(179, 206, 248);
    color: black;

  }

  .kc_table /deep/ .el-table th,
  .el-table tr {
    background-color: rgb(179, 206, 248);
    color: black;
  }

  .kc_table /deep/ .el-table--enable-row-transition .el-table__body td {
    background-color: rgb(179, 206, 248);
    color: black;

  }

  /deep/ .el-dialog {
    height: 45%;
  }

  /deep/ .el-dialog__footer {
    margin-top: 15px;
  }

  /deep/ .el-dialog__body {
    height: 45%;
  }

  /deep/ .el-dialog__title {
    font-size: 2em;
  }

  .el-form-item__label {
    font-size: 2em;
  }

  .el-form-item__content .el-input .el-input__inner {
    height: 55px;
  }

  .el-button {
    font-size: 2em;
  }

  .el-dialog__headerbtn {
    font-size: 2em;
  }

  /deep/ .el-dialog__body {
    height: 50%;
  }

  /deep/ .el-drawer__header {
    margin-bottom: 9px;
    padding: 0px 20px 0
  }

  /deep/ .el-dialog__body {
    padding: 0px 20px;
  }

  .content {
    width: 100%;
    height: 100vh;

    background: rgb(33, 30, 124);
    display: flex;
    flex-direction: column;
    align-items: center;

  }

  .contain {
    width: 100%;
    height: 83.5vh;
    display: flex;
    align-items: center;
    flex-direction: column;

  }



  /* 头部*/
  .head {
    width: 100%;
    height: 13vh;
    display: flex;

    align-items: center;

  }

  .line {
    background: white;
    width: 99%;
    height: 0.5vh;
  }

  .head_left {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: flex-end;
  }

  .head_right {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .logo {

    width: 300px;
    margin-bottom: 17px;
    margin-left: 2%;
  }

  .icon {
    height: 100%;
    width: 20%;
    margin-bottom: 17px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-left: 25px;
  }

  .people {
    height: 50%;




  }

  .name {
    margin-bottom: 20px;
    background: rgb(22, 101, 227);
    min-width: 20%;
    min-height: 38%;
    border: 1.5px solid white;
    border-radius: 8px;
    display: flex;
    margin-left: 10px;
    justify-content: center;
    align-items: center;

  }

  .name span {
    font-size: 1.5em;
    font-weight: 600;
    color: white;
    word-break: normal;
    width: auto;
    display: block;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow: hidden;
  }

  .number {
    margin-bottom: 20px;
    height: 38%;
    width: 12%;
    margin-left: 5%;
    border: 1.5px solid white;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .number span {
    font-size: 1.4em;
    font-weight: 600;
    color: rgb(9, 222, 223);
  }

  .right_con {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
        position: relative;
  }

  .time {
    font-size: 1.5em;
    color: white;
    font-weight: 600;
     margin-right: 6rem;
  }
  .shutdown {
      position: absolute;
    /* top: 0rem; */
    right: 1rem;
    width: 3rem;
    height: 3rem;

  }

  .shutdown img {
    width: 100%;
    height: 100%;
  }

  /* 头部*/
  .line {
    background: white;
    width: 99%;
    height: 5px;
  }

  /* 主要内容*/
  .name_contain {
    width: 100%;
    margin: 3%;
    height: 60%;
    overflow: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;

  }

  .page_btn {
    width: 8%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;


  }

  .top_jiantou {
    width: 90%;
    height: 28%;
    background: rgb(204, 190, 217);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .top_jiantou img {
    width: 69%;
  }

  .current_page {
    width: 90%;
    height: 20%;
    color: white;
    font-size: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .bottom_jiantou {
    width: 90%;
    height: 28%;
    background: rgb(204, 190, 217);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bottom_jiantou img {
    width: 69%;
  }

  .name_contain_son {
    width: 85%;

    height: 100%;
    overflow: auto;
  }

  .one_name {
    height: 27%;
    width: 13%;
    background: rgb(41, 159, 78);
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.6%;
    float: left;
    position: relative;
  }

  .one_name span {
    color: white;
    font-size: 1.6em;
    display: block;
    height: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    float: left;

  }

  .one_name_selected {
    width: 10%;
    height: 17%;
    background: rgb(41, 159, 78);
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1%;
    float: left;
  }

  .one_name_selected span {
    color: white;
    font-size: 1.6em;

  }

  .bottom_btn {
    width: 100%;
    height: 34%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .back_btn {
    width: 28%;
    height: 62%;
    background: rgb(173, 128, 29);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5%;

  }

  .back_btn img {
    width: 50%;
  }


  .add_btn {
    width: 28%;
    height: 62%;
    margin-left: 5%;
    background: rgb(74, 160, 188);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .add_btn span {
    color: white;
    font-size: 2.8em;
  }

  /* 主要内容*/

</style>
