<template>

  <div class="content">
    <div class="head">
      <div class="head_left"> <img class="logo" src="../../assets/logo.png">
        <div class="icon">
          <img class="people" src="../../static/images/people.png">
        </div>
        <div class="name" @click="toPeople">
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
      <div class="aside">
        <span v-show="!isxuni">出库操作</span>
            <span v-show="isxuni">虚拟出库操作</span>
      </div>
      <div class="main">
        <div class="stockIn_info">
 <div class="stockIn_input"><span>批次扫描：</span>
            <el-input v-model="print_code" autocomplete="on" v-focus></el-input>
          </div>
          <div class="stockIn_span" v-show="!isxuni">
            <div class="span_con"><span >出库批号：{{style_name}}</span></div>
          </div>
          <div class="stockIn_span">
            <div class="span_con">
            <span>出库库位：{{ library_name}}</span>
            <span v-show="!isxuni">出库轴号：{{axis_name}}</span>
            </div>
          </div>
          <div class="stockIn_span">
            <div class="span_con"><span v-show="!isxuni">出库米数：{{meter_num}}</span><span>出库人员：{{staff_name}}</span></div>
          </div>
        </div>
        <div class="bottom_btn">
          <div class="bottom_btn_contain">
            <div class="sure_btn" @click=" outOfStock"><span>确认提交</span></div>
            <div class="back_btn" @click="back"><img src="../../static/images/back.png"></div>
          </div>
        </div>

      </div>
    </div>

  </div>



</template>
<script>
  import axios from 'axios'
  export default {
    name: "stockOut",
    data: () => ({
  network: true,
      time: "", //当前时间
      staff_name: "", //操作人姓名
      staff_id: "", //操作人id
      library_name: "",
      library_num: "",
      style_name: "", //批号
      meter_num: "", //出库米数
      axis_name: "", //出库轴号
     dialogVisibleClose:false,
      showclose:false,
      isxuni:null,
      print_code:""
    }),

    methods: {
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
            toPeople() { //跳转到操作人员更改

        this.$router.push({ //跳转
          path: '/people',
          name: 'people',
          params:{
            lastPath:"stockOut",
               library_name:this.library_name
          }

        })

      },
      outOfStock() { //出库
       if(this.isxuni==false){
          let url = "http://120.55.124.53:8206/api/axis/outOfStock"
        let that = this
  if (that.staff_id == "") {
          that.$message({
            type: 'error',
            message: '操作人员为空！'
          });
        } else if (that.library_name == "") {
          that.$message({
            type: 'error',
            message: '库位号为空！'
          });
        } else {
        axios({
          method: "post",
          url: url,
          data: {
            selectInfo: {
              company_id: Number(that.$store.state.companyID)
            },
            library_name: that.library_name,
            library_num: that.library_num,
            user_id:that.staff_name


          },
          headers: {
          }
        }).then((res) => {
          //console.log(res);
          if (res.data.message == "成功") {
            that.$message({
              type: 'success',
              message: '操作成功！'
            });
             that.back()
          } else {
            that.$message({
              type: 'error',
              message: '操作失败！'
            });
          }


        })
        }
       }else{
          let url = "http://120.55.124.53:8206/api/axis/virtualOutOfStock"
        let that = this
  if (that.print_code == "") {
          that.$message({
            type: 'error',
            message: '请先扫码！'
          });
        }  else {
        axios({
          method: "post",
          url: url,
          data: {
            selectInfo: {
              company_id: Number(that.$store.state.companyID)
            },
            axis:{
              print_code:that.print_code,
 user_id:that.staff_name
            }
         
           


          },
          headers: {
          }
        }).then((res) => {
          //console.log(res);
          if (res.data.message == "成功") {
            that.$message({
              type: 'success',
              message: '操作成功！'
            });
             that.back()
          } else {
            that.$message({
              type: 'error',
              message: '操作失败！'
            });
          }


        })
        }
       }
      },
      inventoryInquiry() { //获取出库轴信息
        let url = "http://120.55.124.53:8206/api/axis/inventoryInquiry"
        let that = this
        axios({
          method: "post",
          url: url,
          data: {
            selectInfo: {
              company_id: Number(that.$store.state.companyID)
            },
            axisLib: {
                      library_name: that.library_name,
               library_num_list: [that.library_num]
            }
          },
          timeout:1000,
          headers: {

          }
        }).then((res) => {
          //console.log(res);
          if (res.data.result.length == 0) {
            that.$message({
              type: 'info',
              message: '没有数据！'
            });
          } else {
            that.style_name = res.data.result[0].style_name
            that.meter_num = res.data.result[0].meter_num
            that.axis_name = res.data.result[0].axis_name
          }


        },function (err) {
          //console.log(err)
      //  if (err == "Error: timeout of 1000ms exceeded"||"Error: Network Error") { //超时1000毫秒显示断网图标
      //       that.network = false
      //          that.$message({
      //         type: 'warning',
      //         message: '网络掉线了！' 
      //       });
      //     } else {


      //       that.network = true
      //     }
        })
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

      let timer = setInterval(this.getTime, 1000);
      if (this.$store.state.peopleData.staff_name) {
        this.staff_name = this.$store.state.peopleData.staff_name
        this.staff_id = this.$store.state.peopleData.staff_id
      }
      this.library_num = this.$route.params.library_num
      this.library_name = this.$route.params.library_name
      this.isxuni=this.$route.params.isxuni
     if(this.isxuni==true){
  this.library_name="虚拟库位"
}else{
   this.inventoryInquiry()
}
   
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
  .stockIn_input {
    width: 90%;
    height: 20%;

    margin: 2%;
    display: flex;
    align-items: center;
  }

  .stockIn_input span {
    width: 25%;
    color: white;
    font-size: 1.6em;
    margin: 3%;
  }

  .stockIn_info input {
    width: 75%;
    height: 80%;
    font-size: 1.6em;
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

  }



  /* 头部*/
  .head {
    width: 100%;
    height: 13vh;
    display: flex;

    align-items: flex-end;

  }

 .line {
    background: white;
    width: 99%;
    height: 0.5vh;
  }

  .head_left {
    width: 50%;
    height: 100%;
    display: flex;   align-items: flex-end;
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

  /* 侧边栏*/
  .aside {
    width: 15%;

    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .aside span {
  width: 20%;
    padding-right: 21%;
    border-right: 1.6px solid white;
    font-size: 3em;
    font-weight: 600;
    color: white;
  }

  /* 侧边栏*/
  /* 主要内容*/
  .main {
    width: 85%;

    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

  }

  .stockIn_info {
    width: 95%;
    height: 60%;
    margin: 4%;
    background: rgb(16, 45, 169);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
  }

  .bottom_btn {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .bottom_btn_contain {
    width: 70%;
    height: 80%;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
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
    font-size: 2em;
  }

  .back_btn {
    width: 32%;
    height: 87%;
    background: rgb(173, 128, 29);
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .back_btn img {
    width: 50%;
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

  .span_con span {
    width: 100%;
    height: 100%;
    display: flex;
    color: white;
    font-size: 1.4em;
    margin-top: 10%;
    justify-content: flex-start;
    align-items: center;
  }

  /* 主要内容*/

</style>
