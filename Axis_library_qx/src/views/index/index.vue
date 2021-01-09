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
        <div class="aside_con">
          <div :class="item.class" @click="tabChange(item.tabName)" v-for="(item,index) in tabList" :key="index">
            <img :src="item.src">
            <span>{{item.tabName}}</span>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="main_con">
          <div class="kcgk_con" v-show="kcgk_show">
            <div :class="[item.flag==true? item.in :item.out]" :style="item.back" v-for="(item,index) in dataList"
              :key="index" @click="StockinOut(item.library_name,item.flag)"><span>{{item.library_name}}</span></div>
              <div class="xn_btn" @click="xnck()">虚拟出库</div>
              <div class="xn_btn2" @click="xnrk()">虚拟入库</div>
          </div>
          <div class="crmx_con" v-show="crmx_show">
            <div class="table">
              <el-table :data="tableData" border style="width: 100%;max-height:100%;   background: rgb(33, 30, 124);">
                <el-table-column type="index" label="序号" width="60">
                </el-table-column>
                <el-table-column prop="update_time" label="日期" width="190">
                </el-table-column>
                <el-table-column prop="is_take" label="操作" width="60">
                </el-table-column>
                <el-table-column prop="library_name" label="库位" width="109">
                </el-table-column>
                <el-table-column prop="axis_name" label="轴号" width="60">
                </el-table-column>
                <el-table-column prop="style_name" label="批号" width="110">
                </el-table-column>
                <el-table-column prop="meter_num" label="长度" width="60">
                </el-table-column>
                <el-table-column prop="user_id" label="操作人" width="90">
                </el-table-column>
              </el-table>
            </div>
            <div class="page_btn">
               <div class="xn_btn" @click="xnmx()" style="width: 7rem;
    height: 4rem;
      border-radius: 4px;

    right: 7%;
    bottom: -6rem;">虚拟明细</div>
              <div class="top_jiantou" @click="crmx_pageReduce"><img src="../../static/images/shangjiantou.png"></div>
              <div class="current_page"><span>第</span><span>{{page_num}}/{{page_num2}}</span><span>页</span></div>
              <div class="bottom_jiantou" @click="crmx_pageAdd"><img src="../../static/images/xiajiantou.png"></div>
            </div>

          </div>
          <div class="kctj_con" v-show="kctj_show">
            <div class="title_info">
              <div class="Used_location"><span>已用库位：&nbsp;&nbsp;&nbsp;{{used_num}}</span></div>
              <div class="Stock_type"><span>库存品种：&nbsp;&nbsp;&nbsp;{{style_num}}</span>
                <div class="enddate_input"><span>限制:</span><input style="width:50%;height:50%" v-model="end_date" />
                </div>
              </div>
            </div>
            <div class="kc_btn_contain">
              <div class="kc_button"
                @click="dialogVisible2=true && (kw_visible=true)&& (zh_visible=true)&& (pm_visible=true)">
                <span>库位查询</span></div>
              <div class="kc_button"
                @click="dialogVisible3=true && (zh_visible=true)&& (kw_visible=true)&& (pm_visible=true)">
                <span>轴号查询</span></div>
              <div class="kc_button"
                @click="dialogVisible=true && (pm_visible=true)&& (zh_visible=true)&& (kw_visible=true)">
                <span>品名查询</span></div>
            </div>
            <div class="kc_table">
              <div class="table2">
                <el-table :data="tableData2" height="100%" :cell-style="tableCellStyle4" border
                  style="width: 100%;    max-height: 90%;   background: rgb(33, 30, 124);">
                  <el-table-column type="index" label="序号" width="112">
                  </el-table-column>
                  <el-table-column prop="end_date3" label="生产日期(天)" width="190">
                  </el-table-column>
                  <el-table-column prop="is_take" label="操作" width="60">
                  </el-table-column>
                  <el-table-column prop="libraryName" label="库位/轴库" width="90">
                  </el-table-column>
                  <el-table-column prop="axis_name" label="轴号" width="130">
                  </el-table-column>
                  <el-table-column prop="style_name" label="批号" width="169">
                  </el-table-column>
                  <el-table-column prop="meter_num" label="长度" width="100">
                  </el-table-column>

                </el-table>
              </div>

            </div>
            <div class="kc_pageBtn" v-show="kc_pageBtn_show">
              <div class="top_jiantou2" @click="pm_pageReduce"><img src="../../static/images/shangjiantou.png"></div>
              <div class="current_page2"><span>第</span><span>{{ kc_pageNum}}/{{ kc_pageSize}}</span><span>页</span></div>
              <div class="bottom_jiantou2" @click="pm_pageAdd"><img src="../../static/images/xiajiantou.png"></div>
            </div>
          </div>
          <div class="xtsz_con" v-show="xtsz_show">
            <div class="xtsz_con_son">
              <div class="xtsz_btn" @click="clear"><span>出入明细清零</span></div>
              <div class="xtsz_btn" @click="toPeopleIn"><span>操作人员录入</span></div>
              <div class="xtsz_btn" @click="getCorrectTime"><span>系统时间校正</span></div>
              <div class="xtsz_btn"><span>权限管理</span></div>
            </div>
            <div class="system_num">V1.06</div>
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
        <vue-touch-keybo。；【  ，ard style="font-size: 2em;" :options="mm_options" v-if="mm_visible2" :next="mm_next"
          :layout="mm_layout" :cancel="mm_hide" :accept="mm_accept" :input="mm_input" />
      </el-drawer> -->
      <span slot="footer" class="dialog-footer">
        <el-button style="    font-size: 3.5em;" @click="dialogVisibleClose = false">取 消</el-button>
        <el-button style="    font-size: 3.5em;" type="primary" @click="shutdown()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 退出系统的对话框 -->
    <!-- 轴号的对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible3" width="50%" :show-close="showclose">
      <div style="display: flex;flex-direction: column;align-items: flex-start;height: 80%;    font-size: 2em;">
        <input type="text" style="width: 100%;height: 71%;font-size: 2em;    " placeholder="请输入轴号" v-model="zh_search"
          data-layout="normal" /></div>
      <!-- <el-drawer title="" :visible.sync="zh_visible2" direction="btt" :modal="zh_modal" :show-close="zh_showclose"
        size="61%">
        <vue-touch-keyboard :options="zh_options" style="font-size: 2em;" v-if="zh_visible2" :layout="zh_layout"
          :cancel="zh_hide" :accept="zh_accept" :input="zh_input" :next="zh_next" />
      </el-drawer> -->
      <span slot="footer" class="dialog-footer">
        <el-button style="    font-size: 3.5em;" @click="dialogVisible3 = false">取 消</el-button>
        <el-button style="    font-size: 3.5em;" type="primary" @click="query('zh')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 轴号的对话框 -->
    <!-- 库位的对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible2" width="50%" :show-close="showclose">
      <div style="display: flex;flex-direction: column;align-items: flex-start;height: 80%;    font-size: 2em;">
        <input type="text" style="width: 100%;height: 71%;font-size: 2em;   border: 1px solid black;"
          placeholder="请输入库位" v-model="kw_search" data-layout="normal" />

        <!-- <el-drawer title="" :visible.sync="kw_visible2" direction="btt" :modal="kw_modal" :show-close="kw_showclose"
          size="61%">
          <vue-touch-keyboard :options="kw_options" v-if="kw_visible2" :layout="kw_layout" :cancel="kw_hide"
            :accept="kw_accept" :input="kw_input" :next="kw_next" />
        </el-drawer> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button style="    font-size: 3.5em;" @click="dialogVisible2 = false">取 消</el-button>
        <el-button style="    font-size: 3.5em;" type="primary" @click="query('kw')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 库位的对话框 -->
    <!-- 品名的对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="80%" :show-close="showclose">
      <div style="display: flex;flex-direction: column;align-items: flex-start;height: 80%;    font-size: 2em;">
        <input type="text" style="width: 100%;height: 71%;font-size: 2em;   border: 1px solid black;"
          placeholder="请输入品名" v-model="pm_search" data-layout="normal" /></div>
      <!-- <el-drawer title="" :visible.sync="pm_visible2" direction="btt" :modal="pm_modal" :show-close="pm_showclose"
        size="61%">
        <vue-touch-keyboard style="font-size: 2em;" :options="pm_options" v-if="pm_visible2" :next="pm_next"
          :layout="pm_layout" :cancel="pm_hide" :accept="pm_accept" :input="pm_input" />
      </el-drawer> -->
      <span slot="footer" class="dialog-footer">
        <el-button style="    font-size: 3.5em;" @click="dialogVisible = false">取 消</el-button>
        <el-button style="    font-size: 3.5em;" type="primary" @click="query('pm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 品名的对话框 -->
    <!-- 输入系统密码的对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible4" width="50%" :show-close="showclose">
      <div style="display: flex;flex-direction: column;align-items: flex-start;height: 80%;    font-size: 2em;">
        <input type="text" style="width: 100%;height: 50%;font-size: 2em;    border: 1px solid black;"
          placeholder="请输入系统密码" v-model="SystemPassword" data-layout="normal" /></div>
      <!-- <el-drawer title="" :visible.sync="mm_visible2" direction="btt" :modal="mm_modal" :show-close="mm_showclose"
        size="61%">
        <vue-touch-keyboard style="font-size: 2em;" :options="mm_options" v-if="mm_visible2" :next="mm_next"
          :layout="mm_layout" :cancel="mm_hide" :accept="mm_accept" :input="mm_input" />
      </el-drawer> -->
      <span slot="footer" class="dialog-footer">
        <el-button style="    font-size: 3.5em;" @click="dialogVisible4 = false">取 消</el-button>
        <el-button style="    font-size: 3.5em;" type="primary" @click=" checkPassword()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 输入系统密码的对话框 -->
    <!-- 输入系统密码的对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible5" width="50%" :show-close="showclose" style="height: 85%;">
      <div style="display: flex;flex-direction: column;align-items: flex-start;height: 80%;    font-size: 2em;">
        <span>{{message}}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button style="    font-size: 3.5em;" @click="dialogVisible5 = false">取 消</el-button>
        <el-button style="    font-size: 3.5em;" type="primary" @click="toInOut()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 输入系统密码的对话框 -->
  </div>



</template>

<script>
  import axios from 'axios'

  export default {
    name: "index",
    data: () => ({


  
      companyID: "", //公司ID
      library_num: "", //几号库
      network: true, //是否联网
      timer: "", //定时器
      time: "", //当前时间
      staff_name: "", //操作人姓名
      staff_id: "", //操作人id
      page_size: 7, //出入明细pagesize
      page_num: 1, //出入明细pagenum
      page_num2: null, //出入明细总页数
      flag: true, //判断是否最后一页
      id: "", //操作人id
      password: "admin", //系统设置密码
      passwordFlag: null, //用户是否输入过正确密码标识
      used_num: "", //已用库存
      style_num: "", //库存品种数量
      kc_pageBtn_show: false, //品名查询时出现显示上下页按钮
      kc_pageNum: 1, //库存品名查询结果当前页数
      kc_pageSize: null, //库存品名查询总页数
      pm_data: [], //暂时存放品名查询数据
      style_name: "", //品名
      dialogVisibleClose: false, //确认退出系统对话框
      dialogVisible: false, //品名对话框
      pm_search: "",
      dialogVisible2: false, //库位对话框
      kw_search: "",
      dialogVisible3: false, //轴号对话框
      zh_search: "",
      dialogVisible4: false, //系统密码对话框
      SystemPassword: "",
      dialogVisible5: false, //确认跳转入库对话框
      message: "",

      zt: "", //入库出库的状态
      library_name: "",
      tabName: "", //当前激活的tabname
      tabList: [ //侧边栏选项
        {
          tabName: "库存概况",
          src: require("../../static/images/kcgk.png"),
          class: "one_chooseed"
        },
        {
          tabName: "出入明细",
          src: require("../../static/images/mx.png"),
          class: "one_choose"
        },
        {
          tabName: "库存统计",
          src: require("../../static/images/tongji.png"),
          class: "one_choose"
        },
        {
          tabName: "系统设置",
          src: require("../../static/images/xtsz.png"),
          class: "one_choose"
        }
      ],
      kcgk_show: true, //控制侧边栏内容显示隐藏 
      crmx_show: false,
      kctj_show: false,
      xtsz_show: false,

      dataList: [], //库存概况数据列表
      tableData: [], //出入库明细数据
      tableData2: [ //库存统计数据

      ],
      clearable: false,
      kw_visible2: false, //抽屉键盘的显示
      kw_visible: true, //输入框显示
      kw_layout: "compact",
      kw_input: null,
      kw_modal: false,
      kw_showclose: false,
      kw_options: {
        useKbEvents: false,
        preventClickEvent: false
      },

      zh_visible2: false, //抽屉键盘的显示
      zh_visible: true, //输入框显示
      zh_layout: "compact",
      zh_input: null,
      zh_modal: false,
      zh_showclose: false,
      zh_options: {
        useKbEvents: false,
        preventClickEvent: false
      },
      showclose: false,
      pm_visible2: false, //抽屉键盘的显示
      pm_visible: true, //输入框显示
      pm_layout: "compact",
      pm_input: null,
      pm_modal: false,
      pm_showclose: false,
      pm_options: {
        useKbEvents: false,
        preventClickEvent: false
      },
      mm_visible2: false, //抽屉键盘的显示
      mm_visible: true, //输入框显示
      mm_layout: "compact",
      mm_input: null,
      mm_modal: false,
      mm_showclose: false,
      mm_options: {
        useKbEvents: false,
        timers: null,
        preventClickEvent: false
      },
      end_date: 3,
      crmxFlag:false
    }),



    methods: {
      xnmx(){
this.crmxFlag=!this.crmxFlag
this.page_num = 1

this.getInAndOutRecord()
      },
      xnrk(){
  this.$router.push({
            path: '/stockIn',
            name: 'stockIn',
            params: {
          isxuni:true
            }
          })
      },
          xnck(){
  this.$router.push({
            path: '/stockOut',
            name: 'stockOut',
            params: {
          isxuni:true
            }
          })
      },
      shutdown() { //关闭页面
        this.$store.commit('clear', true)
        console.log(this.$store.state)
        var userAgent = navigator.userAgent;
        if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") != -1) {
          window.open('', '_self').close()

          window.location.href = "about:blank"
        } else {
          window.opener = null;
          window.open("about:blank", "_self");
          window.close();
        }
      },
      tableCellStyle4({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        if (columnIndex == 1) {
          if (row.end_date2 > this.end_date) {


            return 'color:red;background:rgb(30,30,111);';
          } else {
            return 'background:rgb(30,30,111);color:white';
          }
        } else {
          return 'background:rgb(30,30,111);color:white';
        }


      },
      clearValue(key) {
        console.log("dsa")
        if (key == "zh") {
          this.zh_input = null
          this.zh_search = ""
          console.log(this.zh_search)
        }
      },
      mm_accept(text) {

        console.log(this.SystemPassword)
        this.checkPassword()
        this.mm_hide();



      },

      mm_show(e) {
        this.mm_input = e.target;
        this.mm_layout = e.target.dataset.layout;

        if (!this.mm_visible2) {

          this.mm_visible2 = true
        }
        console.log(this.mh_visible2)


      },
      mm_next() { //密码清空
        this.mm_input.value = ""
        this.SystemPassword = ""

      },
      mm_hide() {

        this.mm_visible = false
        this.mm_visible2 = false
        this.dialogVisible4 = false

      },
      pm_accept(text) {
        // alert("Input text: " + text);
        console.log(this.pm_search)
        this.query('pm')
        this.pm_hide();



      },

      pm_show(e) {
        this.pm_input = e.target;
        this.pm_layout = e.target.dataset.layout;

        if (!this.pm_visible2) {

          this.pm_visible2 = true
        }
        console.log(this.zh_visible2)


      },
      pm_next() { //密码清空
        this.pm_input.value = ""
        this.pm_search = ""

      },
      pm_hide() {

        this.pm_visible = false
        this.pm_visible2 = false
        this.dialogVisible = false

      },
      zh_accept(text) {
        // alert("Input text: " + text);
        console.log(this.zh_search)
        this.query('zh')
        this.zh_hide();



      },

      zh_show(e) {
        this.zh_input = e.target;
        this.zh_layout = e.target.dataset.layout;

        if (!this.zh_visible2) {

          this.zh_visible2 = true
        }


      },
      zh_next() { //密码清空
        this.zh_input.value = ""
        this.zh_search = ""

      },
      zh_hide() {

        this.zh_visible = false
        this.zh_visible2 = false
        this.dialogVisible3 = false

      },
      kw_accept(text) {
        // alert("Input text: " + text);
        console.log(this.kw_search)
        this.query('kw')
        this.kw_hide();



      },
      kw_next() { //密码清空
        this.kw_input.value = ""
        this.kw_search = ""

      },
      kw_show(e) {
        this.kw_input = e.target;
        this.kw_layout = e.target.dataset.layout;

        if (!this.kw_visible2) {

          this.kw_visible2 = true
        }


      },

      kw_hide() {

        this.kw_visible = false
        this.kw_visible2 = false
        this.dialogVisible2 = false

      },
      GetNumberOfDays(date1, date2) { //获得天数
        //date1：开始日期，date2结束日期
        var a1 = Date.parse(new Date(date1));
        var a2 = Date.parse(new Date(date2));
        var day = parseInt((a2 - a1) / (1000 * 60 * 60 * 24)); //核心：时间戳相减，然后除以天数
        return day
      },
      getdate(now) {

        let y = now.getFullYear();
        let m = now.getMonth() + 1
        let d = now.getDate();
        return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
      },
      randomTime(num) {
        let timestamp = Date.parse(new Date());
        timestamp = timestamp - 24 * 60 * 60 * 1000
        let k = timestamp + Math.random() * num * 1000000
        k = new Date(k);
        return this.getdate(k)
      },
      inventoryInquiry(library_num, library_name, axis_name, style_name, type) { //轴库查询


        let url = "http://120.55.124.53:8206/api/axis/inventoryInquiry"
        let that = this

        let selectInfo = {
          company_id: that.companyID
        }
        axios({
          method: "post",
          url: url,
          data: {
            selectInfo: selectInfo,
            axisLib: {
              library_num: that.library_num,
              library_name: library_name,
              axis_name: axis_name,
              style_name: style_name,
              library_num_list: [1, 2,100]
            }
          },
          headers: {

          }
        }).then((res) => {
          that.tableData2 = [] //初始化表格

          //获取日期 YYYY-MM-DD
          var today = new Date();
          var y = today.getFullYear(); //获取年份
          var m = (today.getMonth() + 1) < 10 ? ('0' + (today.getMonth() + 1)) : (today.getMonth() + 1); //获取月份
          var d = today.getDate() < 10 ? ('0' + today.getDate()) : today.getDate(); //获取天

          today = y + "-" + m + "-" + d; //获取当前时间
          console.log(today)
          if (type == "pm") { //品名查询的专属分页，其他查询不需要分页
            console.log(style_name)
            that.pm_data = []
            if (res.data.result.length == 0) {

              this.$message({
                type: 'info',
                message: '没有数据！'
              });
            } else {


              for (let i = 0; i < res.data.result.length; i++) {
                if (res.data.result[i].end_date == null) {
                  res.data.result[i].end_date = that.randomTime(i)
                }
                res.data.result[i].libraryName = res.data.result[i].library_name + "/" + res.data.result[i]
                  .library_num
                if (res.data.result[i].end_date != "" && (res.data.result[i].end_date != null)) {
                  let str = res.data.result[i].end_date

                  res.data.result[i].end_date2 = that.GetNumberOfDays(str.substr(0, 10), today)
                } else {
                  res.data.result[i].end_date2 = 0
                }

                res.data.result[i].end_date3 = res.data.result[i].end_date + '(' + res.data.result[i].end_date2 +
                  "天)"

                if (res.data.result[i].is_take == 1) {
                  res.data.result[i].is_take = "入库"
                } else if (res.data.result[i].is_take == 0) {
                  res.data.result[i].is_take = "出库"
                }
                that.pm_data.push(res.data.result[i]) //先把数据暂时存放在pm——data
              }

            }


            that.kc_pageSize = Math.ceil(that.pm_data.length / 6) //计算一共有多少页
            for (let i = ((that.kc_pageNum * 6 - 1) - 5); i <= (that.kc_pageNum * 6 -
                1); i++) { //把对应当前页面的4条数据放入tableData2

              if (that.pm_data[i]) {
                that.tableData2.push(that.pm_data[i])
              }

            }
            that.tableData2 = that.sortByKey(that.tableData2, "end_date2")
          } else { //除了品名查询其他结果的处理
            if (res.data.result.length == 0) {

              this.$message({
                type: 'info',
                message: '没有数据！'
              });
            } else {


              for (let i = 0; i < res.data.result.length; i++) {
                if (res.data.result[i].end_date == null) {
                  res.data.result[i].end_date = that.randomTime(i)
                }
                res.data.result[i].libraryName = res.data.result[i].library_name + "/" + res.data.result[i]
                  .library_num

                if (res.data.result[i].end_date != "" && (res.data.result[i].end_date != null)) {
                  let str = res.data.result[i].end_date

                  res.data.result[i].end_date2 = that.GetNumberOfDays(str.substr(0, 10), today)
                } else {
                  res.data.result[i].end_date2 = 0
                }
                if (res.data.result[i].end_date == null) {
                  res.data.result[i].end_date = ""
                }
                res.data.result[i].end_date3 = res.data.result[i].end_date + '(' + res.data.result[i].end_date2 +
                  "天)"
                if (res.data.result[i].is_take == 1) {
                  res.data.result[i].is_take = "入库"
                } else if (res.data.result[i].is_take == 0) {
                  res.data.result[i].is_take = "出库"
                }
                that.tableData2.push(res.data.result[i])
              }
              that.tableData2 = that.sortByKey(that.tableData2, "end_date2")


            }
          }




        })
        console.log(that.pm_input)
        if (that.pm_input) {
          that.pm_input.value = ""

        }
        if (that.kw_input) {
          that.kw_input.value = ""
        }
        if (that.zh_input) {
          that.zh_input.value = ""
        }
        that.kw_search = ""
        that.pm_search = ""
        that.zh_search = ""


      },
      sortByKey(array, key) {
        return array.sort(function (a, b) {
          let x = a[key];
          let y = b[key];
          return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
      },
      pm_pageReduce() { //品名查询结果的上一页

        if (this.kc_pageNum > 1) {
          this.kc_pageNum = this.kc_pageNum - 1
          this.inventoryInquiry(this.library_num, "", "", this.style_name, "pm")
        }

      },
      pm_pageAdd() { //品名查询结果的下一页

        if (this.kc_pageNum < this.kc_pageSize) {
          this.kc_pageNum = this.kc_pageNum + 1
          this.inventoryInquiry(this.library_num, "", "", this.style_name, "pm")
        } else {
          this.$message({
            type: 'info',
            message: '最后一页了！'
          });
        }

      },
      inventoryStatistics() { //库存统计
        let url = "http://120.55.124.53:8206/api/axis/inventoryStatistics"
        let that = this


        axios({
          method: "post",
          url: url,
          data: {
            company_id: that.companyID,
            library_num: that.library_num
          },
          headers: {

          }
        }).then((res) => {

          that.used_num = res.data.result.used_num //已用库存
          that.style_num = res.data.result.style_num //库存品种数量



        })
      },
      getAllAxis() { //获取库存概况
        let url = "http://120.55.124.53:8206/api/axis/getAllAxis"
        let that = this
        let selectInfo = {
          company_id: that.companyID
        }
        //console.log(selectInfo)
        axios({
          method: "post",
          url: url,
          data: {
            selectInfo: selectInfo,
            library_num: that.library_num
          },
          timeout: 1000,
          headers: {}
        }).then((res) => {
          console.log(res)
          // res.data.result=that.sortByKey(res.data.result, "library_name")
          if (res.data.result.length == 0) {


            this.$message({
              type: 'info',
              message: '没有数据！'
            });
          } else {

            that.dataList = []
            let arr=[]
            for (let i = 0; i < res.data.result.length; i++) {
       
        res.data.result[i].library_name=parseInt(res.data.result[i].library_name)
              if (res.data.result[i].is_take == 1) {
                res.data.result[i].flag = true
              } else if (res.data.result[i].is_take == 0) {
                res.data.result[i].flag = false
              }
              if (that.companyID == "10000013") {
                res.data.result[i].in = "kcgk_con_one_out"
                res.data.result[i].out = "kcgk_con_one_out2"
              } else {
                res.data.result[i].in = "kcgk_con_one_in"
                res.data.result[i].out = "kcgk_con_one_out"
              }
              arr.push(res.data.result[i])
            }
           arr=that.sortByKey(arr, "library_name")
          for(let i=arr.length-1;i>0;i--){
            that.dataList.push(arr[i])
          }
           
          }


        }, function (err) {

          // if (err == "Error: timeout of 1000ms exceeded" || "Error: Network Error") { //超时1000毫秒显示断网图标
          //   that.network = false
          //   this.$message({
          //     type: 'warning',
          //     message: '网络掉线了！'
          //   });
          // } else {

          //   that.network = true
          // }
        })

      },
      getInAndOutRecord() { //获取出入库明细
        let url = "http://120.55.124.53:8206/api/axis/getInAndOutRecord"
        let that = this
let data={}
if(that.crmxFlag==true){
  data={ //虚拟出入库明细
            company_id: that.companyID,
            page_num: that.page_num,
            page_size: that.page_size,
            library_num: 100
          }
}else{
  data={
            company_id: that.companyID,
            page_num: that.page_num,
            page_size: that.page_size,
            library_num: that.library_num
          }
}
        axios({
          method: "post",
          url: url,
          data: data,
          headers: {

          }
        }).then((res) => {
          console.log(res);
          that.page_num2 = Math.ceil(res.data.result.total_data_num / that.page_size)
          if (res.data.result.in_and_out_record_list.length == 0) {
            that.flag = false //最后一页标识，不能再+页数了
            that.page_num = that.page_num - 1 //最后一页页数改正，不可再加
            this.$message({
              type: 'info',
              message: '最后一页了！'
            });
          } else {
            that.flag = true //不是最后一页可以继续
            that.tableData = [] //初始化表格
            for (let i = 0; i < res.data.result.in_and_out_record_list.length; i++) {
            
              if (res.data.result.in_and_out_record_list[i].is_take == 1) { //出入库状态判断
                res.data.result.in_and_out_record_list[i].is_take = "入库"
              } else if (res.data.result.in_and_out_record_list[i].is_take == 0) {
                res.data.result.in_and_out_record_list[i].is_take = "出库"
              }
              that.tableData.push(res.data.result.in_and_out_record_list[i])
            }
          }

        })
      },
      clear() { //出入库明细清零
        let url = "http://120.55.124.53:8206/api/axis/clearAxisLibraryRecord"
        let that = this

        axios({
          method: "post",
          url: url,
          data: {
            company_id: that.companyID
          },
          headers: {

          }
        }).then((res) => {

          if (res.data.message == "成功") {
            this.$message({
              type: 'success',
              message: '操作成功！'
            });
          } else {
            this.$message({
              type: 'error',
              message: '操作失败！'
            });
          }
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
      tabChange(tabName) { //侧边栏菜单选项改变事件
        console.log(tabName)

        if (tabName != "系统设置") { //系统设置为特殊情况，需输入密码才可改变样式
          for (let i = 0; i < this.tabList.length; i++) { //更改所有样式为未选中

            this.tabList[i].class = "one_choose"

          }
          for (let i = 0; i < this.tabList.length; i++) { //更改点击的样式为选中
            if (this.tabList[i].tabName == tabName) {
              this.tabList[i].class = "one_chooseed"
            }
          }
        }
        /*点击不同侧边栏选项显示不同的view*/
        this.tabName = tabName
        if (tabName == "库存概况") {
          this.kcgk_show = true;
          this.crmx_show = false;
          this.kctj_show = false;
          this.xtsz_show = false;
          this.tableData2 = []
          this.kc_pageBtn_show = false
          this.getAllAxis();
          //    if(this.timers!=null){
          //          clearInterval(this.timers);
          // this.timers = null;
          //    }
          //         this.timers = setInterval(() =>{
          //           this.getCurrent()
          //                }, 1000);


          return
        }
        if (tabName == "出入明细") {
          this.kcgk_show = false;
          this.crmx_show = true;
          this.kctj_show = false;
          this.xtsz_show = false;
          this.tableData2 = []
          this.kc_pageBtn_show = false
          this.page_num = 1
          if (this.timers != null) {
            clearInterval(this.timers);
            this.timers = null;
          }
          this.getInAndOutRecord()
          return
        }
        if (tabName == "库存统计") {
          this.kcgk_show = false;
          this.crmx_show = false;
          this.kctj_show = true;
          this.xtsz_show = false;
          this.tableData2 = []
          this.query('kw');
          this.kc_pageBtn_show = false
          if (this.timers != null) {
            clearInterval(this.timers);
            this.timers = null;
          }
          this.inventoryStatistics()
          return
        }
        if (tabName == "系统设置") {
          console.log(this.companyID)

          if (this.timers != null) {
            clearInterval(this.timers);
            this.timers = null;
          }
          this.tableData2 = []
          this.kc_pageBtn_show = false
          // if (this.passwordFlag == false) { //判断有没有输入过正确的系统密码
          //   this.dialogVisible4 = true
          // } else { //如果已经输入过正确密码，显示系统设置界面
          if (this.staff_name == "") {
            this.$message({
              type: 'warning',
              message: '请先登录！'
            });
          } else {
            for (let i = 0; i < this.tabList.length; i++) { //更改所有样式为未选中


              this.tabList[i].class = "one_choose"

            }
            for (let i = 0; i < this.tabList.length; i++) { //更改系统设置的样式为选中
              if (this.tabList[i].tabName == tabName) {
                this.tabList[i].class = "one_chooseed"
              }
            }
            this.kcgk_show = false; //隐藏其他内容，显示系统设置界面
            this.crmx_show = false;
            this.kctj_show = false;
            this.xtsz_show = true;
          }
          console.log(this.dialogVisible4)

        }
        /*点击不同侧边栏选项显示不同的view*/
      },
      getCurrent() {
        let that = this

        //         let currentName=String(Math.floor(Math.random()*41));
        //         for(let i=0;i<that.dataList.length;i++){
        //   that.dataList[i].back=null
        // }
        //             for(let i=0;i<that.dataList.length;i++){
        //   if(that.dataList[i].library_name==currentName){
        //     that.dataList[i].back="background:red;"
        //   }
        //             }
        let currentName = ""
        let url = "http://127.0.0.1:16099/api/beam/getBeamList"
        for (let i = 0; i < that.dataList.length; i++) {
          that.dataList[i].back = null
        }

        axios({
          method: "post",
          url: url,
          dataType: 'jsonp', // 请求方式为jsonp
          data: {
            selectInfo: {
              company_id: that.companyID
            },
            staff: {
              id: that.staff_id,
              password: that.SystemPassword
            }

          },
          headers: {

          }
        }).then((res) => {
          currentName = res.data[0].libraryName
          for (let i = 0; i < that.dataList.length; i++) {
            if (that.dataList[i].library_name == currentName) {
              that.dataList[i].back = "background:red;"
            }
          }
        })
      },
      checkPassword() {

        console.log(this.staff_id)
        if (this.staff_id) {
          let url = "http://120.55.124.53:8206/api/axis/verifyPassword"
          let that = this

          axios({
            method: "post",
            url: url,
            dataType: 'jsonp', // 请求方式为jsonp
            data: {
              selectInfo: {
                company_id: that.companyID
              },
              staff: {
                id: that.staff_id,
                password: that.SystemPassword
              }

            },
            headers: {

            }
          }).then((res) => {
            console.log(res)
            if (res.data.message == "成功") {
              that.passwordFlag = true //标识输入过密码了
              that.dialogVisible4 = false //隐藏对话框
              that.$store.commit('setPasswordFlag', true)
              for (let i = 0; i < that.tabList.length; i++) { //更改所有样式为未选中

                that.tabList[i].class = "one_choose"

              }
              for (let i = 0; i < that.tabList.length; i++) { //更改系统设置的样式为选中
                if (that.tabList[i].tabName == that.tabName) {
                  that.tabList[i].class = "one_chooseed"
                }
              }
              that.kcgk_show = false; //隐藏其他内容，显示系统设置界面
              that.crmx_show = false;
              that.kctj_show = false;
              that.xtsz_show = true;
            } else {
              this.$message({
                type: 'error',
                message: '密码错误！'
              });
            }
          }, function (err) {

            // if (err == "Error: timeout of 1000ms exceeded" || "Error: Network Error") { //超时1000毫秒显示断网图标
            //   that.network = false
            //   this.$message({
            //     type: 'warning',
            //     message: '网络掉线了！'
            //   });
            // } else {

            //   that.network = true
            // }
          })

        } else {

          this.$message({
            type: 'warning',
            message: ' 请先登录操作人员！'
          });


        }

        this.mm_input.value = ""
        this.SystemPassword = ""



      },
      StockinOut(library_name, flag) { //出入库跳转页面

        //console.log(flag)
        let zt;
        if (flag == false) {
          zt = "入库操作"
        } else {
          zt = "出库操作"
        }
        this.zt = zt
        this.message = library_name + '号进行' + zt

        this.dialogVisible5 = true
        this.library_name = library_name


      },
      toInOut() {
        this.dialogVisible5 = false
        if (this.zt == "入库操作") {

          this.$router.push({
            path: '/stockIn',
            name: 'stockIn',
            params: {
              isxuni:false,
              library_name: this.library_name,
              library_num: this.library_num
            }
          })
        } else {

          this.$router.push({
            path: '/stockOut',
            name: 'stockOut',
            params: {
                   isxuni:false,
              library_name: this.library_name,
              library_num: this.library_num
            }
          })
        }
      },
      query(type) { //查询
        if (type == "kw") { //库位精确查询
          this.kc_pageBtn_show = false
          this.dialogVisible2 = false
          this.inventoryInquiry(this.library_num, this.kw_search, "", "", 'kw')

          return
        }
        if (type == "zh") { //轴号精确查询
          this.kc_pageBtn_show = false
          this.dialogVisible3 = false
          this.inventoryInquiry(this.library_num, "", this.zh_search, "", 'zh')

          return
        }
        if (type == "pm") { //品名精确查询
          this.kc_pageBtn_show = true
          this.style_name = this.pm_search
          this.dialogVisible = false
          this.inventoryInquiry(this.library_num, "", "", this.pm_search, 'pm')

          return
        }

      },
      toPeople() { //跳转到操作人员更改

        this.$router.push({ //跳转
          path: '/people',
          name: 'people',
          params: {
            lastPath: "index"
          }

        })

      },
      toPeopleIn() { //跳转到操作人员录入
        this.$router.push("/peopleIn")
      },
      getCorrectTime() { //获取当前时间
        clearInterval(this.timer)
        this.timer = setInterval(this.getTime, 1000);
        this.$message({
          type: 'success',
          message: '时间已校正！'
        });
      },

      crmx_pageReduce() { //出入明细上一页
 console.log(this.flag)
        if (this.page_num > 1) {
          this.page_num = this.page_num - 1
        }
        this.getInAndOutRecord()

      },
      crmx_pageAdd() { //出入明细下一页
      console.log(this.flag)
        if (this.flag == true) { //只有不是最后一页才可下一页操作
          this.page_num = this.page_num + 1
          this.getInAndOutRecord()
        }

      },


    },
    mounted() {

      this.passwordFlag = this.$store.state.passwordFlag //系统密码是否输入标识设置
      if (this.$store.state.companyID != "") { //判断store是否有companyid
        this.companyID = this.$store.state.companyID
        this.library_num = this.$store.state.library_num
      } else { //没有就从路由那边取值
        this.companyID = this.$route.params.companyId;
        this.library_num = this.$route.params.library_num
      }

      console.log(this.$route)
      this.$store.commit('setCompanyID', {
        companyID: this.companyID,
        library_num: this.library_num
      }) //存储操作人信息
      this.timer = setInterval(this.getTime, 1000);

      //console.log(this.$store.state.peopleData)
      if (this.$store.state.peopleData.staff_name) {
        this.staff_name = this.$store.state.peopleData.staff_name
        this.staff_id = this.$store.state.peopleData.staff_id
      }
      this.getAllAxis(); //默认先获取库存概况
      // this.timers = setInterval(() =>{
      //         this.getCurrent()
      //              }, 1000);


    },

    beforeDestroy() {
       if (this.timer) {
          clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
        }
    },



  }

</script>

<style scoped>
  .crmx_con /deep/.el-table--enable-row-transition .el-table__body td {
    font-size: 1.3em;
  }

  .crmx_con /deep/ .el-table th,
  .el-table tr {
    background: rgb(204, 190, 217);
    color: black;
    font-size: 1.2em;
  }

  /deep/ .el-table th,
  .el-table tr {
    background: rgb(204, 190, 217);
    color: black;
    font-size: 1.2em;

  }

  /deep/ .el-table__empty-block {
    background: rgb(33, 30, 124);
  }



  /deep/ .el-table__body-wrapper {
    background: rgb(33, 30, 124);
  }


  /deep/ .el-dialog {
    height: 40%;
  }

  .el-dialog__body {
    height: 51%;
  }

  /deep/ .el-dialog__title {
    font-size: 2em;
  }

  .el-dialog__footer /deep/ .el-button {
    font-size: 3.5em;
  }

  /deep/ .el-drawer__header {
    margin-bottom: 13px;
    padding: 0;
  }

  .el-dialog__body {
    padding: 1px 20px;
  }

  .el-input /deep/ .el-input__inner {
    height: 99px;
    line-height: 73px;
  }

  /deep/ .el-dialog__headerbtn {
    font-size: 2em;
  }

  /deep/ .el-table--enable-row-transition .el-table__body td {
    background: rgb(33, 30, 124);
    color: white;
    font-size: 1.3em;
  }

  /deep/ .el-table__body,
  .el-table__footer,
  .el-table__header {
    background: white;
  }

  /deep/ .el-table--enable-row-hover .el-table__body tr:hover>td {
    background: rgb(33, 30, 124);
  }

  .enddate_input {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;

  }

  .content {
    width: 100%;
    height: 100vh;

    background: rgb(33, 30, 124);
    display: flex;
    flex-direction: column;
    align-items: center;

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

    margin-left: 2%;
    margin-bottom: 17px;
  }

  .icon {
    height: 100%;
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 17px;
    margin-left: 25px;
  }

  .people {
    height: 50%;
  }

  .name {

    background: rgb(22, 101, 227);
    min-width: 20%;
    min-height: 38%;
    border: 1.5px solid white;
    border-radius: 8px;
    display: flex;
    margin-left: 10px;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
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
    margin-right: 2%;
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
  .contain {
    width: 100%;
    height: 83.5vh;
    display: flex;

  }

  /* 侧边栏*/
  .aside {
    width: 15%;

    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .aside_con {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .one_choose {
    width: 72%;
    height: 20%;
    background: rgb(204, 156, 81);
    border-radius: 0px 12px 12px 0px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
  }

  .one_choose img {
    width: 40%;
  }

  .one_choose span {
    font-size: 1.2em;
  }

  .one_chooseed {
    width: 88%;
    height: 20%;
    background: rgb(64, 160, 220);
    border-radius: 0px 12px 12px 0px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
  }

  .one_chooseed img {
    width: 40%;
  }

  .one_chooseed span {
    font-size: 1.2em;
  }

  /* 侧边栏*/
  /* 主要内容*/
  .main {
    width: 85%;

    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main_con {
    width: 100%;
    height: 90%;

  }

  .kcgk_con {
    width: 100%;
    height: 100%;
    position: relative;

  }
  .xn_btn {
    width: 8rem;
    height: 4rem;
    background: chocolate;
    position: absolute;
    right: 20%;
 bottom: -34px;
    font-size: 1.5rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .xn_btn2 {
    width: 8rem;
    height: 4rem;
    background: chocolate;
    position: absolute;
    right: 2%;
    bottom: -34px;
    font-size: 1.5rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .kcgk_con_one_in {
    width: 9%;
    height: 50px;

    background: rgb(106, 121, 191);
    border-radius: 12px;
    display: flex;
    margin: 0.5%;
    justify-content: center;
    align-items: center;
    float: left;
    color: white;
    font-size: 1.5em;

    font-weight: 600;
  }

  .kcgk_con_one_in span {}

  .kcgk_con_one_out {
    width: 9%;
    height: 50px;
    background: rgb(41, 159, 78);
    border-radius: 12px;
    display: flex;
    margin: 0.5%;
    justify-content: center;
    align-items: center;
    float: left;
    color: white;
    font-size: 1.5em;

    font-weight: 600;
  }

  .kcgk_con_one_out2 {
    width: 9%;
    height: 50px;
    background: rgb(114, 112, 126);
    border-radius: 12px;
    display: flex;
    margin: 0.5%;
    justify-content: center;
    align-items: center;
    float: left;
    color: white;
    font-size: 1.5em;

    font-weight: 600;
  }


  .crmx_con {
    width: 100%;
    height: 100%;
    display: flex;

    color: black;
    font-size: 1.2em;
  }

  .table {
    width: 85%;
    height: 100%;
  }

  .page_btn {
    width: 15%;
    height: 82%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    position: relative;


  }

  .top_jiantou {
    width: 70%;
    height: 28%;
    background: rgb(204, 190, 217);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .top_jiantou img {
    width: 100%;
  }

  .current_page {
    width: 100%;
    height: 44%;
    color: white;
    font-size: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .bottom_jiantou {
    width: 70%;
    height: 28%;
    background: rgb(204, 190, 217);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bottom_jiantou img {
    width: 100%;
  }

  .kctj_con {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

  }

  .title_info {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-around;
  }

  .Used_location {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .Used_location span {
    color: white;
    font-size: 1.8em;

  }

  .kc_btn_contain {
    width: 100%;
    height: 11%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .kc_button {
    width: 22%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    background: rgb(64, 160, 220);
    border-radius: 8px;
    margin-right: 2%;
  }

  .kc_button span {
    color: white;
    font-size: 1.8em;

  }

  .kc_table {
    height: 70%;
    width: 100%;
    display: flex;

  }

  .kc_pageBtn {
    width: 98%;
    height: 12%;
    display: flex;
    align-items: center;
    justify-content: space-around;

  }

  .top_jiantou2 {
    width: 25%;
    height: 100%;
    background: rgb(204, 190, 217);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .top_jiantou2 img {
    height: 100%;
    transform: rotate(-90deg);

    -ms-transform: rotate(-90deg);
    /* IE 9 */

    -moz-transform: rotate(-90deg);
    /* Firefox */

    -webkit-transform: rotate(-90deg);
    /* Safari and Chrome */

    -o-transform: rotate(-90deg);
    /* Opera */
  }

  .current_page2 {
    width: 50%;
    height: 100%;
    color: white;
    font-size: 2em;
    display: flex;

    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .bottom_jiantou2 {
    width: 25%;
    height: 100%;
    background: rgb(204, 190, 217);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bottom_jiantou2 img {
    height: 100%;
    transform: rotate(-90deg);

    -ms-transform: rotate(-90deg);
    /* IE 9 */

    -moz-transform: rotate(-90deg);
    /* Firefox */

    -webkit-transform: rotate(-90deg);
    /* Safari and Chrome */

    -o-transform: rotate(-90deg);
    /* Opera */
  }

  .table2 {
    width: 98%;
    margin-top: 15px;
  }



  .Stock_type span {
    color: white;
    font-size: 1.8em;

  }

  .Stock_type {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .xtsz_con {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .system_num {
    position: absolute;
    bottom: 5%;
    right: 5%;
    color: white;
    font-size: 2em;
  }

  .xtsz_con_son {
    width: 80%;
    height: 80%;
  }




  .xtsz_btn {
    width: 36%;
    height: 40%;
    background: rgb(192, 196, 78);
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5%;
    border: 1.5px solid white;
  }

  .xtsz_btn span {
    color: white;
    font-size: 3em;
  }

  /* 主要内容*/

</style>
