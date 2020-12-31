<template>
  <!-- <div class="content" style="    padding-top: 10px;" >
    <span style="font-size: 1rem;font-weight: bold;margin-bottom: -1rem">保养</span>
    <i class="el-icon-arrow-left" style="position:fixed;left:17px;top:13px;" @click="back()"></i>
    <div class="all-page">
      <div class="input">
        <input @keyup.13="getData(true)" type="search" ref="input1"
          placeholder="输入机台号" v-model="machineId" /><input @keyup.13="getData(true)" type="search" ref="input1"
          placeholder="输入人员" v-model="staff_name" /> <i class="el-icon-search" style="font-size:1.3rem;"></i>
      </div>
    
            <scroller height="100%" :onRefresh="refresh" :onInfinite="inf" ref="my_scroller">
        <div class="scroller">
      <div v-for="(item,index) in tableData" :key="'data_'+index"  class="cardBox" >
<div class="cardBox_con">
    <div class="line"></div>
<div class="cardBox_con_con">

  <span style="width:100%;text-align:left;margin-bottom:0.5rem">机台号：{{item.machineId}}</span>
   <div style="width:100%;text-align:left;display:flex;font-size:0.8rem;color:rgba(0,0,0,0.5);justify-content: space-between;margin-bottom:0.5rem"><span style="wdith:50%;">故障类型：{{item.errorReason}}</span><span style="width:50%;">描述：{{item.remark}}</span></div>
    <span style="width:100%;text-align:left;font-size:0.8rem;color:rgba(0,0,0,0.5);margin-bottom:0.5rem">处理方式：{{item.solve}}</span>
     <span style="width:100%;text-align:left;font-size:0.8rem;color:rgba(0,0,0,0.5);margin-bottom:1rem">使用配件：{{item.parts}}</span>
       <div style="width:100%;text-align:left;display:flex;font-size:0.8rem;color:rgba(0,0,0,0.8);justify-content: space-between;margin-bottom:0rem"><span>维修人：{{item.repairPerson}}</span><span>完成时间：{{item.date}}</span></div>
</div>
</div>
          </div>
          
        </div>
      </scroller>
   
    </div>

  </div> -->
  <div class="content">

    <!-- <span style="font-size: 1rem;font-weight: bold;margin-bottom: -1rem">维修详情</span>
    <i class="el-icon-arrow-left" style="position:fixed;left:17px;top:13px;" @click="back()"></i> -->

    <!--出库单详细-->
    <div class="all-page">
      <div class="all-page_con">
        <span style="font-size:0.8rem;color:rgba(0,0,0,0.5);  ">基础信息</span>
        <div class="cardBox" style="    height: 27%;">
          <div class="cardBox_con">
            <div class="line"></div>
            <div class="cardBox_con_con">

              <div
                style="width:100%;text-align:left;display:flex;font-size:1rem;justify-content: space-between;margin-bottom:1rem">
                <span>机台号</span><span style="width:50%;text-align:right;">{{data.machineId}}</span></div>
              <div style="width:100%;text-align:left;display:flex;font-size:1rem;justify-content: space-between;"
                :style="isHeight?'margin-bottom:5%':'margin-bottom:3%'">
                <span>故障类型</span><span style="width:50%;text-align:right;">{{data.errorReason}}</span></div>
              <div style="width:100%;text-align:left;display:flex;font-size:1rem;justify-content: space-between;"
                :style="isHeight?'margin-bottom:5%':'margin-bottom:3%'">
                <span>维修人</span><span style="width:50%;text-align:right;">{{data.repairPerson}}</span></div>
              <div style="width:100%;text-align:left;display:flex;font-size:1rem;justify-content: space-between;"
                :style="isHeight?'margin-bottom:5%':'margin-bottom:3%'">
                <span>完成时间</span style="width:50%;text-align:right;"><span>{{data.date}}</span></div>

            </div>
          </div>
        </div>
        <span style="font-size:0.8rem;color:rgba(0,0,0,0.5);    ">使用零配件</span>
        <div class="cardBox" style="    height: 20%;">
          <div class="cardBox_con">

            <div class="cardBox_con_con">

              <div
                style="width:100%;text-align:left;display:flex;font-size:1rem;justify-content: space-between;margin-bottom:1rem;height:100%;">
                <span style="width:100%;text-align:left;height:100%;">{{data.parts}}</span></div>
              <!-- <div style="width:100%;text-align:left;display:flex;font-size:1rem;justify-content: space-between;margin-bottom:1rem"><span >故障类型：</span><span >描述：</span></div>
      <div style="width:100%;text-align:left;display:flex;font-size:1rem;justify-content: space-between;margin-bottom:1rem"><span >故障类型：</span><span >描述：</span></div> -->


            </div>
          </div>
        </div>
        <span style="font-size:0.8rem;color:rgba(0,0,0,0.5);    ">维修照片</span>
        <div class="cardBox" style="height: 14%;">
          <div class="cardBox_con">

            <div class="cardBox_con_con" v-if="!noImage">

              <div style="width:100%;text-align:left;display:flex;font-size:1rem;margin-bottom:1rem">
                <el-image style="width: 4rem; height:4rem;margin-right:1.5rem;" :src="data.img1" fit="fill"></el-image>
                <el-image style="width: 4rem; height:4rem;margin-right:1.5rem;" :src="data.img2" fit="fill"></el-image>
                <el-image style="width: 4rem; height:4rem;margin-right:1.5rem;" :src="data.img3" fit="fill"></el-image>
              </div>



            </div>
            <div class="cardBox_con_con" v-if="noImage"
              style="display:flex;justify-content: center;align-items:center;">

              <span style="color:rgba(0,0,0,0.5)">暂无图片</span>



            </div>
          </div>
        </div>
        <div class="cardBox" style="height: 16%;">
          <div class="cardBox_con">

            <div class="cardBox_con_con">

              <div style="    width: 100%;
    text-align: left;
   

    display: flex;
    align-items: flex-end;
    font-size: 1rem;
    justify-content: space-between;
    " :style="isHeight?'margin-bottom:0rem':'margin-bottom:0.5'"><span>故障描述：</span></div>
              <el-input type="textarea" disabled style="    margin-bottom: 1rem;" v-model="data.remark">
              </el-input>


            </div>
          </div>
        </div>
        <div class="cardBox" style="    height: 16%;">
          <div class="cardBox_con">

            <div class="cardBox_con_con">

              <div style="    width: 100%;
    text-align: left;
   
 
    display: flex;
    align-items: flex-end;
    font-size: 1rem;
    justify-content: space-between;
   " :style="isHeight?'margin-bottom:0rem':'margin-bottom:0.5'"><span>处理方式：</span></div>
              <el-input type="textarea" disabled style="    margin-bottom: 1rem;" v-model="data.solve">
              </el-input>


            </div>
          </div>
        </div>
      </div>


    </div>

  </div>

</template>

<script> 
  import axios from 'axios'

  export default {
    name: 'repairHistoryDetail',
    data() {
      return {
        selectInfo: {
          company_id: '',
        },
        data: {},
        noImage: null,
        isHeight: false

      }
    },
    methods: {

      back() {
        this.$router.push({ //跳转并传参数
          path: '/repairHistory',
          name: 'repairHistory',
          params: {

            company_id: this.selectInfo.company_id
          }

        })

      },

    },
    mounted() {
      console.log(window.screen.height)
      if (window.screen.height > 650) {
        this.isHeight = true
      } else {
        this.isHeight = false
      }
      history.pushState(null, null, window.location.href);
      window.addEventListener('popstate', function () {
        history.pushState(null, null, window.location.href);
      });
      this.selectInfo.company_id = this.$route.params.company_id;
      console.log(this.$route.params)
      if (this.$route.params.data.remark == "" || this.$route.params.data.remark == null) {
        this.$route.params.data.remark = "无"
      }
      if (this.$route.params.data.solve == "" || this.$route.params.data.solve == null) {
        this.$route.params.data.solve = "无"
      }
      if ((this.$route.params.data.img1 == "" || this.$route.params.data.img1 == null) && (this.$route.params.data
          .img2 == "" || this.$route.params.data.img2 == null) && (this.$route.params.data.img3 == "" || this.$route
          .params.data.img3 == null)) {
        this.noImage = true
      } else {
        this.noImage = false
      }

      this.data = this.$route.params.data
      let me = this;
      window['back'] = () => {
        me.back(); // 这个也就是我定义的方法
      }
      nativeMethod.flag('false');

    }
  }

</script>

<style scoped>
  .cardBox {
    height: 11rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cardBox_con {
    width: 100%;
    height: 90%;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: relative;
  }

  .cardBox_con_con {
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .line {
    position: absolute;
    top: 2.3rem;
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
    margin-top: 0.5rem;
  }

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .contain {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .all-page {

    width: 100%;
    height: 100vh;
    background-color: #f5f5f5;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    position: fixed;
    left: 0;
  }

  .all-page_con {
    margin-top: 10px;
    width: 90%;
    height: 98%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .choose {
    width: 100%;
    height: 8%;
    margin-top: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
  }

  .choose2 {
    width: 100%;
    height: 8%;
    margin-top: 1%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
  }

  .choose-con {
    width: 90%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .head {
    width: 95%;
    height: 30px;
    display: flex;
    justify-content: space-around;
  }

</style>
