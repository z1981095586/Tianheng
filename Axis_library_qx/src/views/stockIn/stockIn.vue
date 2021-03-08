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
        <span v-show="!isxuni">入库操作</span>
        <span v-show="isxuni">虚拟入库操作</span>
      </div>
      <div class="main">
        <div class="stockIn_info">
          <div class="stockIn_input"><span>批次扫描：</span>
            <el-input v-model="print_code" autocomplete="on" v-focus></el-input>
          </div>
          <div class="stockIn_span">
            <div class="span_con">
              <div class="span_con_span"><span>入库批号：</span>
                <!-- <el-input v-model="product_name" style="width:33.4%;"></el-input> -->
                <el-autocomplete v-model="product_name" style="width:33.4%;" :fetch-suggestions="querySearchAsync"
                  @select="handleSelect"></el-autocomplete>
              </div>
            </div>
          </div>
          <div class="stockIn_span">
            <div class="span_con">
              <div class="span_con_span"><span>入库库位：</span>
                <el-input disabled v-model="library_name" style="width:33.4%;"></el-input><span
                  style="margin-left:1em;">入库轴号：</span>
                <el-input style="width:33.4%;" v-model="axis_no"></el-input>
              </div>
            </div>
          </div>
          <div class="stockIn_span">
            <div class="span_con">
              <div class="span_con_span"><span>入库米数：</span>
                <el-input v-model="meter" style="width:33.4%;"></el-input><span style="margin-left:1em;">入库人员：</span>
                <el-input disabled style="width:33.4%;" v-model="staff_name"></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom_btn">
          <div class="bottom_btn_contain">
            <div class="sure_btn" @click="warehousing"><span>确认提交</span></div>
            <div class="back_btn" @click="back"><img src="../../static/images/back.png"></div>
          </div>
        </div>

      </div>
    </div>
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
  </div>



</template>
<script>
  import axios from 'axios'
  export default {
    name: "stockIn",
    data: () => ({
 
      network: true,
      time: "", //当前时间
      staff_name: "", //操作人姓名
      staff_id: "", //操作人id
      print_code: "",
      product_name: "", //批号
      library_name: "", //库位
      library_num: "", //几号库
      axis_no: "", //轴号
      meter: "", //入库米数
      user_id: "",
      dialogVisibleClose: false,
      showclose: false,
      autofocus: true,
      product_nameList: [],
      isxuni: null
        
    }),

    methods: {
      toPeople() { //跳转到操作人员更改

        this.$router.push({ //跳转
          path: '/people',
          name: 'people',
          params: {
            lastPath: "stockIn",
            library_name: this.library_name,
            isxuni: this.isxuni
          }

        })

      },
      warehousing() { //确认提交
        console.log(this.isxuni)
        if (this.isxuni == false) {
          if (this.axis_no == undefined) {
            this.axis_no = ""
          }
          if (this.product_name == undefined) {
            this.product_name = ""
          }
          if (this.meter == undefined) {
            this.meter = ""
          }
          if (this.staff_id == "") {
            this.$message({
              type: 'error',
              message: '操作人员为空！'
            });
          } else if (this.library_name === "") {
            this.$message({
              type: 'error',
              message: '库位号为空！'
            });
          } else if (this.axis_no === "") {
            this.$message({
              type: 'error',
              message: '轴号为空！'
            });
          } else if (this.product_name === "") {
            this.$message({
              type: 'error',
              message: '入库批号为空！'
            });
          } else if (this.meter === "") {
            this.$message({
              type: 'error',
              message: '入库米数为空！'
            });
          } else {
            let url = "http://120.55.124.53:8206/api/axis/warehousing"
            let that = this
            axios({
              method: "post",
              url: url,
              data: {
                selectInfo: {
                  company_id: Number(that.$store.state.companyID)
                },
                library_num: that.library_num,
                library_name: String(that.library_name),
                axis: {

                  axis_no: that.axis_no,
                  product_name: that.product_name,
                  total_work_qty: that.meter,
                  user_id: that.staff_name,
                  print_code: that.print_code
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
                  message: res.data.message + '！'
                });
              }

            })
          }
        } else {
          if (this.axis_no == undefined) {
            this.axis_no = ""
          }
          if (this.product_name == undefined) {
            this.product_name = ""
          }
          if (this.meter == undefined) {
            this.meter = ""
          }
          if (this.staff_id == "") {
            this.$message({
              type: 'error',
              message: '操作人员为空！'
            });
          } else if (this.library_name === "") {
            this.$message({
              type: 'error',
              message: '库位号为空！'
            });
          } else if (this.axis_no === "") {
            this.$message({
              type: 'error',
              message: '轴号为空！'
            });
          } else if (this.product_name === "") {
            this.$message({
              type: 'error',
              message: '入库批号为空！'
            });
          } else if (this.meter === "") {
            this.$message({
              type: 'error',
              message: '入库米数为空！'
            });
          } else {
            let url = "http://120.55.124.53:8206/api/axis/virtualWarehousing"
            let that = this
            axios({
              method: "post",
              url: url,
              data: {
                selectInfo: {
                  company_id: Number(that.$store.state.companyID)
                },

                axis: {

                  axis_no: that.axis_no,
                  product_name: that.product_name,
                  total_work_qty: that.meter,
                  user_id: that.staff_name,
                  print_code: that.print_code
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
                  message: res.data.message + '！'
                });
              }

            })
          }
        }

      },
      /**
       *
      
       */
      //品名下拉带输入建议事件
      querySearchAsync(queryString, cb) {
        var restaurants = this.product_nameList;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {

        this.product_name = item.name
      },
      //品名下拉带输入建议事件
      getPinMinPiHao() { //获取品名列表
        let url = "http://120.55.124.53:8206/api/axis/getPinMinPiHao"
        let that = this
        axios({
          method: "post",
          url: url,
          timeout: 1000,
          data: {
            selectInfo: {
              company_id: Number(that.$store.state.companyID)
            },

          },
          headers: {

          }
        }).then((res) => {
          console.log(res)
          for (let i = 0; i < res.data.result.length; i++) {
            that.product_nameList.push({
              value: res.data.result[i].product_name,
              name: res.data.result[i].product_name
            })
          }
        })

      },

      getAxisInfo() { //扫码获取轴信息
        let url = "http://120.55.124.53:8206/api/axis/getAxisInfo"
        let that = this
        axios({
          method: "post",
          url: url,
          timeout: 1000,
          data: {
            selectInfo: {
              company_id: Number(that.$store.state.companyID)
            },
            print_code: that.print_code
          },
          headers: {

          }
        }).then((res) => {
          //console.log(res);
     
          res.data.result.work_qty1 = that.toZero(res.data.result.work_qty1)
          res.data.result.work_qty2 = that.toZero(res.data.result.work_qty2)
          res.data.result.work_qty3 = that.toZero(res.data.result.work_qty3)
          res.data.result.work_qty = that.toZero(res.data.result.work_qty)
          if (that.$store.state.companyID == "10000013") {
            that.meter = res.data.result.work_qty
          } else {
            that.meter = res.data.result.work_qty1 + res.data.result.work_qty2 + res.data.result.work_qty3
          }

          that.axis_no = res.data.result.axis_no
          that.product_name = res.data.result.product_name
          that.user_id = res.data.result.user_id

        }, function (err) {
          //console.log(err)
          // if (err == "Error: timeout of 1000ms exceeded" || "Error: Network Error") { //超时1000毫秒显示断网图标
          //   that.network = false
          //   that.$message({
          //     type: 'warning',
          //     message: '网络掉线了！'
          //   });
          // } else {


          //   that.network = true
          // }

        })
        /**
         * 
         */
      },
      toZero(value) {
        if (value == null) {
          return 0
        } else {
          return value
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

        this.$router.push({
          path: '/index',
          name: 'index',
          params: {
            companyId: this.$store.state.companyID,
            library_num: this.$store.state.library_num
          }
        })
      }


    },
    mounted() {
console.log(this.$route.params)
      let timer = setInterval(this.getTime, 1000);
      if (this.$store.state.peopleData.staff_name) {
        this.staff_name = this.$store.state.peopleData.staff_name
        this.staff_id = this.$store.state.peopleData.staff_id
      }

      this.isxuni = this.$route.params.isxuni

      this.library_num = this.$route.params.library_num
      this.library_name = this.$route.params.library_name

      if (this.isxuni == true) { //虚拟入库按钮进来的
        this.library_name = "虚拟库位"
      }
      this.getAxisInfo()
      this.getPinMinPiHao()

    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    },
    watch: {
      print_code: function (val) {
        this.getAxisInfo()
      },

    },
    directives: {
      focus: {
        inserted: function (el) {
          el.querySelector('input').focus()
        }
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
    align-items: flex-end;
    justify-content: center;

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
    height: 0.5vh;
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

  .span_con_span {
    width: 100%;
    height: 100%;
    display: flex;
    color: white;
    font-size: 1.4em;
    justify-content: flex-start;
    align-items: center;
  }

  /* .span_con span {
    width: 100%;
    height: 100%;
    display: flex;
    color: white;
    font-size: 1.6em;
    justify-content: flex-start;
    align-items: center;
  } */

  /* 主要内容*/

</style>
