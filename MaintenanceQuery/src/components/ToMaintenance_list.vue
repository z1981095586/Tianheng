<template>
  <div class="content" style="padding-top:10px;">

    <span style="font-size: 1rem;font-weight: bold;margin-bottom: -1rem">保养</span>
    <i class="el-icon-arrow-left" style="position:fixed;left:17px;top:13px;" @click="back()"></i>

    <!--出库单详细-->
    <div class="all-page">
      <div class="choose" @click="toMaintenance_list()">
        <div class="choose-con">
          <span>待保养记录</span><i class="el-icon-arrow-right"></i>
        </div>

      </div>
      <div class="choose2" @click="toMaintenance_history()">
        <div class="choose-con">
          <span>保养历史记录</span><i class="el-icon-arrow-right"></i>
        </div>

      </div>
      <div class="choose2" @click="toCheck()">
        <div class="choose-con">
          <span>检查</span><i class="el-icon-arrow-right"></i>
        </div>

      </div>
      <div class="choose2" @click="toCheckHistory()">
        <div class="choose-con">
          <span>检查历史记录</span><i class="el-icon-arrow-right"></i>
        </div>

      </div>


    </div>

  </div>

</template>

<script>

  export default {
    name: 'ToMaintenance_list',
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
      }
    },
    methods: {
      toCheck(){
          
      }, 
      toCheckHistory(){ //跳转到检查历史记录

      },
      back() {
        nativeMethod.closeActivity();
      },
      toMaintenance_list() { //跳转到保养列表
        this.$router.push({ //跳转并传参数
          path: '/Maintenance_list',
          name: 'Maintenance_list',
          params: {
            //machine_id:this.macRelation.machine_id,
            operator: this.operator,
            //workshop_id:this.macRelation.workshop_id,
            company_id: this.selectInfo.company_id,
            staff_id: this.staff_id
          }

        })
      },   
      toMaintenance_history() {  //跳转保养历史记录页面
        this.$router.push({ //跳转并传参数
          path: '/Maintenance_history',
          name: 'Maintenance_history',
          params: {       
            operator: this.operator,
            company_id: this.selectInfo.company_id,
            staff_id: this.staff_id
          }
        })
      },

    },
    mounted() {
      // this.macRelation.machine_id = this.$route.params.machine_id;
      this.operator = this.$route.params.operator
      this.selectInfo.company_id = this.$route.params.company_id;
      this.staff_id= this.$route.params.staff_id
      history.pushState(null, null, window.location.href);
      window.addEventListener('popstate', function () {
        history.pushState(null, null, window.location.href);
      });
    },

    
  }

</script>

<style scoped>
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
    margin-top: 12px;
    width: 100%;
    height: 100vh;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
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
