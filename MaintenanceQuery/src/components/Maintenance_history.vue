<template>
  <div class="content" style="padding-top:10px;">

    <span style="font-size: 1rem;font-weight: bold;margin-bottom: -1rem">保养历史记录</span>
    <i class="el-icon-arrow-left" style="position:fixed;left:17px;top:13px;" @click="back"></i>

    <!--出库单详细-->
    <div class="all-page">


      <div class="query">
        <span style="margin-left:10px;font-size:0.5em;margin-right:10px">开始时间</span>
        <el-date-picker v-model=" start_time" style="width:40%;" size="small" type="date" value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
        <span style="margin:18px;font-size:0.5em">机台号</span>
        <el-input v-model="  macRelation.machine_id" size="small" style="width:20%;"></el-input>
      </div>
      <div class="query">
        <span style="margin:10px;font-size:0.5em">结束时间</span>
        <el-date-picker v-model="end_time" style="width:40%;margin-right:10px" size="small" type="date"
          value-format="yyyy-MM-dd" placeholder="选择日期">
        </el-date-picker>
        <el-button type="primary" style="width:20%;" @click="query()">查询</el-button>
      </div>
      <div class="query">
        <span style="margin:10px;font-size:0.5em">员工筛选</span>
        <select name="bbxb" id="selecte" class="shortselect3" @change="change">
          <option :value="item.id" v-for="item in staffList">{{item.staff_name}}</option>

        </select>
      </div>
      <scroller height="100%" :onRefresh="refresh" :onInfinite="inf" ref="my_scroller">
        <div class="scroller">
          <div class="card" v-for="(item,index) in dataList" :key="index">
            <div class="card-con"><span>设备名称：{{item.machine_id}}</span></div>
            <div class="card-con"><span>保养时间：{{item.maintain_time}}</span></div>
            <div class="card-con"><span>保养人：{{item.operator}}</span></div>
            <div class="card-con"><span>保养类型：{{item.maintain_type_name}}</span></div>
            <div class="detail">
              <div @click="toDetail(item.id)"><span>保养详情</span><i class="el-icon-arrow-right"></i></div>
            </div>
          </div>
        </div>
      </scroller>
    </div>

  </div>

</template>

<script>
  import axios from 'axios'
  import VueScroller from "vue-scroller" //引入vue-scroller，用来做上拉加载下拉刷新
  export default {
    name: 'Maintenance_history',
    data() {
      return {
        staff_id: "",
        macRelation: {
          machine_id: '',
          workshop_id: ''
        },
        selectInfo: {
          company_id: ''
        },
        operator: '', //操作人
        start_time: "",
        end_time: "",
        page_size: 10,
        page_num: 1,
        total_data_num: null,
        dataList: [],
        newStaff_id: "",
        staffList: []
      }
    },
    methods: {
      change(e) { //mactype下拉选择框值改变重新获取数据


        this.newStaff_id = e.target.value;
        this.dataList = [];
        this.page_num = 1;
        this.getData(this.newStaff_id);
      },
      back() {
        this.$router.push({ //跳转并传参数
          path: '/ToMaintenance_list',
          name: 'ToMaintenance_list',
          params: {
            machine_id: this.macRelation.machine_id,
            operator: this.operator,
            workshop_id: this.macRelation.workshop_id,
            company_id: this.selectInfo.company_id,
            staff_id: this.staff_id
          }

        })
      },
      toDetail(id) {
        this.$router.push({ //跳转并传参数
          path: '/Maintenance_history_detail',
          name: 'Maintenance_history_detail',
          params: {
            machine_id: this.macRelation.machine_id,
            operator: this.operator,
            workshop_id: this.macRelation.workshop_id,
            company_id: this.selectInfo.company_id,
            id: id
          }

        })
      },
      refresh() { //下拉刷新函数
        this.page_num = 1;
        this.dataList = [];
        setTimeout(() => { //不设置定时器会出现bug
          this.getData(); //获取数据列表
          this.$refs.my_scroller.finishPullToRefresh(); //关闭下拉刷新函数
        }, 500);
      },
      inf() {


        setTimeout(() => {

          if (this.dataList.length == this.total_data_num) { //如果数据总条数等于当前数据列表长度了，那就关闭上拉加载了

            this.$refs.my_scroller.finishInfinite(true);
            return;
          } else if (this.dataList.length == 0) { //如果查到没数据了，那就关闭上拉加载了
            this.$refs.my_scroller.finishInfinite(true);
            return;
          } else { //否则就++，获取下一页数据
            this.page_num++;
            this.getData();
          }

        }, 500);


      },
      getData(newStaff_id) {
        console.log(newStaff_id)
        let url = "http://120.55.124.53:8206/api/maintain/getMaintainRecordPage"
        let that = this


        let maintainMainRecord = {}
        if (that.macRelation.machine_id != "") {
          maintainMainRecord = {
            machine_id: that.macRelation.machine_id
          }
        } else {
          maintainMainRecord = {

          }
        }
        axios.post(url, {
          maintainMainRecord,

          selectInfo: {
            company_id: that.selectInfo.company_id,
            page_size: that.page_size,
            page_num: that.page_num,
            start_time: that.start_time,
            end_time: that.end_time
          }
        }, {

        }).then(function (res) {
          console.log(res.data.result.maintainRecord)
          if (res.data.result.maintainRecord.length == 0) {
            // that.$message({
            //   message: '没有数据！',
            //   center: true,
            //   duration: 2000
            // });
        
            that.$refs.my_scroller.finishInfinite(true)
            return
          } else {
            that.total_data_num = res.data.result.total_data_num //设置数据总条数
            that.$refs.my_scroller.finishPullToRefresh(true) ////下拉获取数据回调函数停止使用
            for (let i = 0; i < res.data.result.maintainRecord.length; i++) {
              // if (res.data.result.maintainRecord[i].maintain_type == 1) {
              //   res.data.result.maintainRecord[i].maintain_type = "大保养"
              // } else if (res.data.result.maintainRecord[i].maintain_type == 2) {
              //   res.data.result.maintainRecord[i].maintain_type = "小保养"
              // }
              that.dataList.push(res.data.result.maintainRecord[i])
            }
            that.$refs.my_scroller.finishInfinite(true) //上拉获取数据回调函数停止使用
          }

        })
      },
      GetDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
        return y + "-" + m + "-" + d;
      },
      query() {
        this.page_num = 1;
        this.dataList = [];
        this.getData();
      }
 

    },
    mounted() {
      history.pushState(null, null, window.location.href);
      window.addEventListener('popstate', function () {
        history.pushState(null, null, window.location.href);
      });
      this.start_time = this.GetDateStr(-3); //当前日期的前三天
      this.end_time = this.GetDateStr(3); //当前日期的后三天
      // this.macRelation.machine_id = this.$route.params.machine_id;
      this.dataList = [];
      this.staff_id = this.$route.params.staff_id;
      this.operator = this.$route.params.operator;
      // this.macRelation.workshop_id = this.$route.params.workshop_id;
      this.selectInfo.company_id = this.$route.params.company_id;
      this.getData();
      // console.log(this.staff_id)

    }
  }

</script>

<style scoped>
  .shortselect3 {
    border: 0;
    display: block;
    position: relative;
    min-height: 1.146667rem;
    line-height: 1.146667rem;
    white-space: nowrap;
    padding-left: 30px;
    padding-right: 30px;
    width: 40%;
    height: 32px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    font-size: 12px;
    color: rgb(21, 153, 204);
    overflow: hidden;

    background-color: #eee;
    background: transparent;
    appearance: none;
    -moz-appearance: none;
    /* Firefox */
    -webkit-appearance: none;
    /* Safari 和 Chrome */
  }

  .all-page /deep/ ._v-container {
    position: absolute;
    top: 19%;


  }

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

  }


  .all-page {
    margin-top: 12px;
    width: 100%;


    height: 100vh;

    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;

  }

  .query {
    width: 100%;
    height: 6%;
    background: white;

    display: flex;
    align-items: center;

  }

  .scroller {
    height: 80%;
    overflow: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

  }

  .card {
    width: 90%;
    height: 200px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;

  }

  .card-con {
    width: 90%;
    text-align: left;
    line-height: 37px;
    height: 37px;
    color: black;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }

  .detail {
    width: 90%;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: red;
  }

</style>
