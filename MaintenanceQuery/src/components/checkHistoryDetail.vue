<template>
  <div class="content" style="padding-top:10px;">

    <span style="font-size: 1rem;font-weight: bold;margin-bottom: -1rem">检查详情</span>
    <i class="el-icon-arrow-left" style="position:fixed;left:17px;top:13px;" @click="back"></i>


    <div class="all-page">
      <div class="checkOption">
        <div class="checkOption_con">
          <span>鑫海一厂织机车间每日保养</span>
          <span>二级检查</span>
          <img src="../images/hege.png" />
        </div>
      </div>
      <div class="checkOption">
        <div class="checkOption_con">
          <span>检查人：xhapp</span>
          <span>2020/10/10</span>
          <span style="width:25%"></span>
        </div>
      </div>
      <div class="checkOption">
        <div class="checkOption_con">
          <span>详情：</span>

        </div>
      </div>
      <div class="checkOption" style="height:15%">
        <div class="checkOption_con">
          <el-input type="textarea" :disabled="false" :rows="5" placeholder="请输入内容" v-model="textarea">
          </el-input>


        </div>
      </div>
      <div class="checkOption">
        <div class="checkOption_con">
          <span>检查照片：</span>

        </div>
      </div>
      <div class="checkOption" style="height:40%">
        <div class="checkOption_con2">
          <el-image v-for="(item,index) in picList" :key="index"
            style="width: 100px; height: 100px;float:left;margin:5px" :preview-src-list="picList" :src="item.url"
            :fit="fit"></el-image>


        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import axios from 'axios'
  import VueScroller from "vue-scroller"
  export default {
    name: 'checkHistoryDetail',
    data() {
      return {
        picList: [],
        textarea: "",
        selectInfo: {
          company_id: this.$route.params.company_id
        },
        staff_id: this.$route.params.staff_id,
        operator: this.$route.params.operator,

      }
    },
    methods: {
      back() {
        this.$router.push({ //跳转并传参数
          path: '/checkHistory',
          name: 'checkHistory',
          params: {

            operator: this.operator,
        
            company_id: this.selectInfo.company_id,
            staff_id: this.staff_id
          }

        })
      },
    },
    mounted() {

    }
  }

</script>

<style scoped>
  .all-page /deep/ ._v-container {
    position: absolute;
    top: 10%;


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

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .checkOption_con {
    width: 95%;
    height: 100%;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .checkOption_con img {
    width: 5rem;
  }

  .checkOption_con2 {
    width: 95%;
    height: 100%;




  }

  .checkOption_con2 /deep/ .el-upload-list--picture-card .el-upload-list__item {
    width: 80px;
    height: 80px;
  }

  .checkOption_con2 /deep/ .el-upload--picture-card {
    width: 80px;
    height: 80px;
    line-height: 85px;
  }

  .checkOption_con2 /deep/ .el-textarea__inner {
    margin-top: 8%;
    height: 90%;
  }

  .shortselect3 {
    height: 50%;
  }

  .btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn span {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(49, 153, 102);
    color: white;
  }

</style>
