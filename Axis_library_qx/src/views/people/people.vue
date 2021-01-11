<template>

  <div class="content">
    <div class="head">
      <div class="head_left"> <img class="logo" src="../../assets/logo.png">
        <div class="icon">
          <img class="people" src="../../static/images/people.png">
        </div>
        <div class="name">
          <span>{{staff_name}}</span>
        </div>
        <!-- <div class="number">
          <span>{{staff_id}}</span>
        </div> -->
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
<!-- <div class="main" > -->
      <div class="main" style="display:flex;justify-content: center;align-items: center;">
   
  <div style="width:80%;height:60%;display:flex;flex-direction: column;    justify-content: space-around;">
       <div class="stockIn_span">
            <div class="span_con"><div class="span_con_span"><span>账号：</span>     <input v-model="number" id="keyinput" @focus="show" style="width:50.4%;font-size:1.3em;    height: 100%;border-radius: 8px;border: none;"   /></div></div>
          </div>
       
    <div class="stockIn_span" style="height: 39%;">
            <div class="span_con"><div class="span_con_span"> <div class="sure_btn" @click="login"><span>登入</span></div></div></div>
          </div>
  </div>
      
      </div>
      <div class="bottom_btn">
        <div class="btn_con">
          <div class="back_btn" @click="back"><img src="../../static/images/back.png"></div>
        </div>
      </div>
    </div>
  <!-- 退出系统的对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisibleClose" width="50%" :show-close="showclose">
      <div style="display: flex;flex-direction: column;align-items: flex-start;height: 80%;    font-size: 2em;">
       <span>即将关闭当前系统，若需使用需要输入网址！</span></div>
 
      <span slot="footer" class="dialog-footer">
        <el-button style="    font-size: 3.5em;" @click="dialogVisibleClose = false">取 消</el-button>
        <el-button style="    font-size: 3.5em;" type="primary" @click="shutdown()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 退出系统的对话框 -->
       <!-- 小键盘 -->
    <el-drawer
  title=""
  :visible.sync="visible"
  direction="btt"
  size="58.5%">
 <vue-touch-keyboard id="keyboard" style="width:100%;height:100%" v-if="visible" :layout="layout"  :accept="accept" :input="input" :next="next" />
 
</el-drawer>
  <!-- 小键盘 -->

  </div>



</template>
<script>


  import axios from 'axios'
  export default {
    name: "people",

    data: () => ({
      return:{
number:"",

   
    visible: false,
      layout: "numeric",
      input: null,
      options: {
        useKbEvents: false
      },
    
      time: "", //当前时间
      staff_name: "", //操作人姓名
      staff_id: "", //操作人id
      companyID: "", //公司ID
      id: "", //根组织id
      network: true,
      page: 1,
         dialogVisibleClose:false,
      showclose:false,
          page2:1,//显示的当前页数
      flag: true, //判断是否最后一页
      pageNum: 28,//这个是pagesize
      pageNumber:null,//这个是总页数
      lastPath:"",
      dataList: [

      ],
      isxuni:null
      }
      
    }),

    methods: {
 accept(text) {
         
          this.hide();
        },

        show(e) {
       
          this.input = e.target;
          // this.layout = e.target.dataset.layout;
          document.getElementById("keyinput").blur();
          console.log(document.getElementById("keyinput"))
          if (!this.visible)
            this.visible = true
            
        },

        hide() {
     
          this.visible = false;
        },
				
	next() {
   
    //       let inputs = document.querySelectorAll("input");
	  // let found = false;
	  // [].forEach.call(inputs, (item, i) => {
	  //   if (!found && item == this.input && i < inputs.length - 1) {
		// found = true;
		// this.$nextTick(() => {
		// 	inputs[i+1].focus();
		//     });
		// }
	  //   });
	  //  if (!found) {
		// this.input.blur();
		// this.hide();
	  // }
       },
         shutdown(){//关闭页面
         this.$store.commit('clear', true)
         console.log(this.$store.state)
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
        // this.$router.push("/index/:"+this.$store.state.companyID+"/:"+this.$store.state.library_num)
        console.log(this.lastPath)
        if(this.lastPath=="index"){
             this.$router.push({
               path: '/index',
          name: 'index',
          params:{
       companyId:this.$store.state.companyID,
       library_num:this.$store.state.library_num
          }
        })
          // this.$router.push("/index/:"+this.$store.state.companyID+"/:"+this.$store.state.library_num)
        }else if(this.lastPath=="stockIn"){
      if(this.isxuni==false){
               this.$router.push({
               path: '/stockIn',
          name: 'stockIn',
          params:{
       companyId:this.$store.state.companyID,
       library_num:this.$store.state.library_num,
           library_name:this.library_name,
            isxuni:this.isxuni
          }
        })
      }else{
               this.$router.push({
               path: '/stockIn',
          name: 'stockIn',
          params:{
       companyId:this.$store.state.companyID,
      isxuni:this.isxuni
          }
        })
      }
            // this.$router.push("/stockIn/:"+this.$store.state.companyID+"/:"+this.$store.state.library_num)
        }else if(this.lastPath=="stockOut"){
     
              if(this.isxuni==false){
              this.$router.push({
               path: '/stockOut',
          name: 'stockOut',
          params:{
       companyId:this.$store.state.companyID,
       library_num:this.$store.state.library_num,
           library_name:this.library_name,
            isxuni:this.isxuni
          }
        })
      }else{
               this.$router.push({
              path: '/stockOut',
          name: 'stockOut',
          params:{
       companyId:this.$store.state.companyID,
      isxuni:this.isxuni
          }
        })
      }
            // this.$router.push("/stockOut/:"+this.$store.state.companyID+"/:"+this.$store.state.library_num)
        }else if(this.lastPath=="peopleIn"){
            // this.$router.push("/peopleIn")
                 this.$router.push({
               path: '/peopleIn',
          name: 'peopleIn',
          params:{
       companyId:this.$store.state.companyID,
       library_num:this.$store.state.library_num
          }
        })
        }
      },
      login() { //传送操作人信息给主页
 
              let url = "http://120.55.124.53:8206/api/axis/login"

        let that = this
    
        let companyID = that.companyID
        axios({
          method: "post",
          url: url,
       
          data: { 
            selectInfo:{
                 company_id: companyID
            },
            staff:{
              staff_code:that.number,
       
            }
             },
          headers: {
            companyID: companyID
          }
        }).then((res) => {
          console.log(res)
                           that.$message({
              type: 'success',
              message: '登录成功！',
             duration:2000
            });
          if(res.data.message=="成功"){
    that.$store.commit('setPeopleData', {
          staff_name:res.data.result.staff_name,
          staff_id: res.data.result.staff_organization_id
        }) //存储操作人信息
                   that.$store.commit('setPasswordFlag', false)//更改操作人员需要重新输入密码，标识更改
       if(that.lastPath=="index"){
             that.$router.push({
               path: '/index',
          name: 'index',
          params:{
       companyId:that.$store.state.companyID,
       library_num:that.$store.state.library_num
          }
        })
          // this.$router.push("/index/:"+this.$store.state.companyID+"/:"+this.$store.state.library_num)
        }else if(that.lastPath=="stockIn"){
             that.$router.push({
               path: '/stockIn',
          name: 'stockIn',
          params:{
       companyId:that.$store.state.companyID,
       library_num:that.$store.state.library_num,
           library_name:that.library_name,
           isxuni:that.isxuni
          }
        })
            // this.$router.push("/stockIn/:"+this.$store.state.companyID+"/:"+this.$store.state.library_num)
        }else if(that.lastPath=="stockOut"){
               that.$router.push({
               path: '/stockOut',
          name: 'stockOut',
          params:{
       companyId:that.$store.state.companyID,
       library_num:that.$store.state.library_num,
           library_name:that.library_name,
               isxuni:that.isxuni
          }
        })
            // this.$router.push("/stockOut/:"+this.$store.state.companyID+"/:"+this.$store.state.library_num)
        }else if(that.lastPath=="peopleIn"){
            // this.$router.push("/peopleIn")
                 that.$router.push({
               path: '/peopleIn',
          name: 'peopleIn',
          params:{
       companyId:that.$store.state.companyID,
       library_num:that.$store.state.library_num,
           isxuni:that.isxuni
          }
        })
        }
          }else{
                            that.$message({
              type: 'warning',
              message: '请检查账号密码是否正确！'
            });
          }

        })

      //   this.$store.commit('setPeopleData', {
      //     staff_name: name,
      //     staff_id: id
      //   }) //存储操作人信息
      //      this.$store.commit('setPasswordFlag', false)//更改操作人员需要重新输入密码，标识更改
      //  if(this.lastPath=="index"){
      //        this.$router.push({
      //          path: '/index',
      //     name: 'index',
      //     params:{
      //  companyId:this.$store.state.companyID,
      //  library_num:this.$store.state.library_num
      //     }
      //   })
      //     // this.$router.push("/index/:"+this.$store.state.companyID+"/:"+this.$store.state.library_num)
      //   }else if(this.lastPath=="stockIn"){
      //        this.$router.push({
      //          path: '/stockIn',
      //     name: 'stockIn',
      //     params:{
      //  companyId:this.$store.state.companyID,
      //  library_num:this.$store.state.library_num,
      //      library_name:this.library_name
      //     }
      //   })
      //       // this.$router.push("/stockIn/:"+this.$store.state.companyID+"/:"+this.$store.state.library_num)
      //   }else if(this.lastPath=="stockOut"){
      //          this.$router.push({
      //          path: '/stockOut',
      //     name: 'stockOut',
      //     params:{
      //  companyId:this.$store.state.companyID,
      //  library_num:this.$store.state.library_num,
      //      library_name:this.library_name
      //     }
      //   })
      //       // this.$router.push("/stockOut/:"+this.$store.state.companyID+"/:"+this.$store.state.library_num)
      //   }else if(this.lastPath=="peopleIn"){
      //       // this.$router.push("/peopleIn")
      //            this.$router.push({
      //          path: '/peopleIn',
      //     name: 'peopleIn',
      //     params:{
      //  companyId:this.$store.state.companyID,
      //  library_num:this.$store.state.library_num
      //     }
      //   })
      //   }
      },
    //   getRootStaffOrganization() { //获取根组织
    //     let url = "http://120.55.124.53:8206/api/staff/getRootStaffOrganization"

    //     let that = this
    
    //     let companyID = that.companyID
    //     axios({
    //       method: "post",
    //       url: url,
    //       timeout:1000,
    //       data: {    },
    //       headers: {
    //         companyID: companyID
    //       }
    //     }).then((res) => {
    //       //console.log(res.data.data.id);
    //       that.id = res.data.data.id;
    //       that.getStaffListByOrganization(that.id) //获取指定组织下的所有员工列表(包括子组织)
    //     }, function (err) {
       
    // //  if (err == "Error: timeout of 1000ms exceeded"||"Error: Network Error") { //超时1000毫秒显示断网图标
    // //         that.network = false
    // //             that.$message({
    // //           type: 'warning',
    // //           message: '网络掉线了！'
    // //         });
    // //       } else {

    // //         that.network = true
    // //       }
    //     })

    //   },
    //   getStaffListByOrganization(id) { //获取指定组织下的所有员工列表(包括子组织)
    //     let url = "http://120.55.124.53:8206/api/staff/getStaffListByOrganization"
    //     let that = this
    //     //console.log(that.companyID)
    //     let companyID = that.companyID
    //     axios({
    //       method: "post",
    //       url: url,
    //       data: {
    //         staff_organization_id: id,
    //         page: that.page,
    //         pageNum: that.pageNum
    //       },
    //       headers: {
    //         companyID: companyID
    //       }
    //     }).then((res) => {
    //       console.log(res);
    //           that.page2=that.page
    //               that.pageNumber=Math.ceil(res.data.totalDataNum/that.pageNum)
    //       if (res.data.data.staffModel.length == 0) {
    //         this.$notify.info({
    //           title: '消息',
    //           duration: 2000,
    //           message: '这是最后一页了！'
    //         });
    //         that.page = that.page - 1 //最后一页页数改正，不可再加
    //          that.page2=that.page //用page显示会因为改正闪一下，所以用page2
    //         that.flag = false //最后一页标识，不能再+页数了
    //         return
    //       } else {
    //         that.flag = true
    //       }
    //       if (that.dataList.length > 0) {
    //         that.dataList = []
    //       }
    //       for (let i = 0; i < res.data.data.staffModel.length; i++) {
    //         that.dataList.push(res.data.data.staffModel[i])
    //       }
    //     })

    //   },
    //   pageReduce() { //上一页

    //     if (this.page > 1) {
    //       this.page = this.page - 1
    //     }
    //     this.getStaffListByOrganization(this.id)
    //   },
    //   pageAdd() { //下一页
    //     if (this.flag == true) { //只有不是最后一页才可下一页操作
    //       this.page = this.page + 1
    //       this.getStaffListByOrganization(this.id)
    //     }

    //   },
    },
    mounted() {
console.log(this.$route.params)
     if (this.$store.state.companyID != "") { //判断store是否有companyid
        this.companyID = this.$store.state.companyID
        this.library_num = this.$store.state.library_num
      } else {//没有就从路由那边取值
        this.companyID = this.$route.params.companyId;
        this.library_num = this.$route.params.library_num
      }
           if (this.$store.state.peopleData.staff_name) {
        this.staff_name = this.$store.state.peopleData.staff_name
        this.staff_id = this.$store.state.peopleData.staff_id
      }
      this.lastPath=this.$route.params.lastPath
      this.isxuni=this.$route.params.isxuni
            this.library_name=this.$route.params.library_name
      console.log(this.$route.params.lastPath)
      let timer = setInterval(this.getTime, 1000);
      // this.getRootStaffOrganization()


    },
      beforeDestroy() {
       if (this.timer) {
          clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
        }
    },


  }

</script>
<style scoped>
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

.inputs{
  width: 50.4%;
  height: 100%;
  background: white;
  border-radius: 8px;
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
    word-break:normal; width:auto; display:block; white-space:pre-wrap;word-wrap : break-word ;overflow: hidden ;
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
  .main {
    display: flex;
    width: 100%;
    height: 60%;

  }
  .stockIn_span {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .span_con {
    width: 90%;
    height: 100%;
    display: flex;

    justify-content: space-between;
    align-items: center;
  }
.span_con_span{
     width: 100%;
    height: 100%;
    display: flex;
    color: white;
    font-size: 1.6em;
    justify-content: center;
    align-items: center;
}
  .sure_btn {
    width: 42%;
    height: 87%;
    font-size: 1.6em;
    background: rgb(74, 160, 188);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .sure_btn span {
    color: white;
    font-size: 1em;
  }
  .name_contain {
    width: 80%;
    margin: 3%;
    height: 100%;
    overflow: auto;

  }

  .page_btn {
    width: 10%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;


  }

  .top_jiantou {
      width: 72%;
    height: 28%;
    background: rgb(204, 190, 217);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .top_jiantou img {
    width: 69%;
  }
.current_page{
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
    width: 72%;
    height: 28%;
    background: rgb(204, 190, 217);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bottom_jiantou img {
    width: 69%;
  }

  .one_name {
       height: 17%;
    width: 13%;
    background: rgb(211, 209, 219);
    border-radius: 12px;
    display: flex;
    justify-content:center;
    align-items: center;
    margin: 0.6%;
    float: left;
   
  }

  .one_name span {
    color: black;
    font-size: 1.6em;
    display:block;
height: 50%;
      overflow: hidden ;
            text-overflow: ellipsis ;
            float: left;
  }

  .bottom_btn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .btn_con {
    width: 50%;
    display: flex;
    justify-content: flex-end;
  }

  .back_btn {
          width: 35%;
    height: 74%;
    background: rgb(173, 128, 29);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5%;

  }

  .back_btn img {
    width: 50%;
  }

  /* 主要内容*/

</style>
