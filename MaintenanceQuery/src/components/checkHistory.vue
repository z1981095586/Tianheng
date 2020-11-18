<template>
  <div class="content" style="padding-top:10px;">

    <span style="font-size: 1rem;font-weight: bold;margin-bottom: -1rem">检查记录</span>
    <i class="el-icon-arrow-left" style="position:fixed;left:17px;top:13px;" @click="back"></i>


    <div class="all-page">
      <div class="checkOption">
        <div class="checkOption_con">
          <input placeholder="#输入检查人姓名查询" v-model="checkName" />
          <div class="search_btn">

            <el-button type="primary" style="width:100%;" @click="getData()">搜索</el-button>
          </div>
        </div>
      </div>
          <div class="query">
        <span style="margin:10px;font-size:0.5rem;margin-right:5px">开始时间</span>
        <el-date-picker v-model=" start_time" style="width:50%;" size="small" type="date" value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
       
      </div>
      <div class="query">
     <span style="margin:10px;font-size:0.5rem">结束时间</span>
        <el-date-picker v-model="end_time" style="width:50%;margin-right:5px" size="small" type="date"
          value-format="yyyy-MM-dd" placeholder="选择日期">
        </el-date-picker>
           </div>
      <!-- <scroller height="80%" :onRefresh="refresh" :onInfinite="inf" ref="my_scroller"> -->
        <div style="overflow:auto;height:70%">
        <div class="checkOption2" v-for="(item,index) in dataList" :key="index">
          <div class="checkOption_con2"  :style="item.check_result=='1'?'background:rgb(202,249,130)': 'background:rgb(244,129,143)' " @click="toDetail(item)">
            <div class="checkOption_con2_con"><span>检查人：{{item.check_person}}</span><span style="margin-left:2rem">{{item.check_time}}
                </span>
            </div>
            <div class="checkOption_con2_con">
              <!-- <span>被检查：鑫海一厂纺织车间每日保养</span> -->
              <!-- <span style="margin-left:1rem">一级检查</span> -->
              <span >一级检查</span>
            </div>
            <img :style="item.check_result=='1'?'':'width:3rem;right:0rem'" :src="item.check_result=='1'? img1:img2" />
          </div>
        </div>
        </div>
      <!-- </scroller> -->
    </div>

  </div>

</template>

<script>
  import axios from 'axios'
  import VueScroller from "vue-scroller"
  export default {
    name: 'checkHistory',
    data() {
      return {
        dataList: [],
        pageNum: 1,
        pageSize: 8,
start_time:"",
end_time:"",
img1:require('../images/hege.png'),
img2:require('../images/buhege.png'),
        checkName: "",
        selectInfo: {
          company_id: this.$route.params.company_id
        },
        staff_id: this.$route.params.staff_id,
        operator: this.$route.params.operator,

      }
    },
    methods: {
      getData() {

        let url = "http://120.55.124.53:8206/api/maintain/queryCheckRecord"
        let that = this


that.dataList=[]
        axios.post(url, {


          selectInfo: {
            company_id: that.selectInfo.company_id,
          
          },
          maintain_check_record:{
            check_person:that.checkName
          },
          start_date:that.start_time,
          end_date:that.end_time
        }, {

        }).then(function (res) {
          
          if (res.data.result.length == 0) {
            that.$message({
              message: '没有数据！',
              center: true,
              duration: 2000
            });
            }else{
res.data.result.forEach(element => {
  that.dataList.push(element)
});
            }
console.log(res)

          // if (res.data.result.maintainRecord.length == 0) {
          //   // that.$message({
          //   //   message: '没有数据！',
          //   //   center: true,
          //   //   duration: 2000
          //   // });

          //   that.$refs.my_scroller.finishInfinite(true)
          //   return
          // } else {
          //   that.total_data_num = res.data.result.total_data_num //设置数据总条数
          //   that.$refs.my_scroller.finishPullToRefresh(true) ////下拉获取数据回调函数停止使用
          //   for (let i = 0; i < res.data.result.maintainRecord.length; i++) {
          //     // if (res.data.result.maintainRecord[i].maintain_type == 1) {
          //     //   res.data.result.maintainRecord[i].maintain_type = "大保养"
          //     // } else if (res.data.result.maintainRecord[i].maintain_type == 2) {
          //     //   res.data.result.maintainRecord[i].maintain_type = "小保养"
          //     // }
          //     that.dataList.push(res.data.result.maintainRecord[i])
          //   }
          //   if (that.datalist.length == that.total_data_num) {
          //     that.$refs.my_scroller.finishInfinite(true) //上拉获取数据回调函数停止使用
          //   } else {
          //     that.$refs.my_scroller.finishInfinite(false) //上拉获取数据回调函数停止使用
          //   }
          // }

        })
      },
      refresh() { //下拉刷新函数
        // this.page_num = 1;
        // this.dataList = [];
        // setTimeout(() => { //不设置定时器会出现bug
        //   this.getData(); //获取数据列表
        //   this.$refs.my_scroller.finishPullToRefresh(); //关闭下拉刷新函数
        // }, 500);
      },
      inf() {


        // setTimeout(() => {

        //   if (this.dataList.length == this.total_data_num) { //如果数据总条数等于当前数据列表长度了，那就关闭上拉加载了

        //     this.$refs.my_scroller.finishInfinite(true);
        //     return;
        //   } else if (this.dataList.length == 0) { //如果查到没数据了，那就关闭上拉加载了
        //     this.$refs.my_scroller.finishInfinite(true);
        //     return;
        //   } else { //否则就++，获取下一页数据
        //     this.page_num++;
        //     this.getData();
        //   }

        // }, 500);


      },
      toDetail(item) {
        console.log(item)
        this.$router.push({ //跳转并传参数
          path: '/checkHistoryDetail',
          name: 'checkHistoryDetail',
          params: {
          
            operator: this.operator,
      
            company_id: this.selectInfo.company_id,
            staff_id: this.staff_id,
          data:item
          }

        })
      },
      back() {
        this.$router.push({ //跳转并传参数
          path: '/ToMaintenance_list',
          name: 'ToMaintenance_list',
          params: {
        
            operator: this.operator,
     
            company_id: this.selectInfo.company_id,
            staff_id: this.staff_id
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
    },
    mounted() {
    this.start_time = this.GetDateStr(-3); //当前日期的前三天
      this.end_time = this.GetDateStr(3); //当前日期的后三天
      this.getData()
    }
  }

</script>

<style scoped>
  .query {
    width: 100%;
    height: 6%;
    background: white;

    display: flex;
    align-items: center;

  }
  .all-page /deep/ ._v-container {
    position: absolute;
    top: 22%;


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

  .checkOption {
    width: 100%;
    height: 8%;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
      background: white;
    justify-content: center;
  }

  .checkOption_con {
    width: 95%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .checkOption_con input {
    width: 60%;
    height: 80%;
    border: 1px solid black;
    font-size: 1rem;
  }

  .search_btn {
    width: 30%;
    height: 80%;
    display: flex;
    align-items: center;


  }

  .checkOption2 {
    width: 100%;
    height: 5rem;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .checkOption_con2 {
    width: 95%;
    height: 100%;
    border: 1px solid black;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    position: relative;
  }

  .checkOption_con2 img {
    position: absolute;
    right: -1rem;
    top: 0;
    width: 5rem;
  }

  .checkOption_con2_con {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 0.9rem;
  }

</style>
