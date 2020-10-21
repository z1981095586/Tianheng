<template>
  <div class="content" style="padding-top:10px;">

    <span style="font-size: 1rem;font-weight: bold;margin-bottom: -1rem">选择机台</span>
    <i class="el-icon-arrow-left" style="position:fixed;left:17px;top:13px;" @click="back"></i>

    <!--出库单详细-->
    <div class="all-page">

      <el-button @click="sure">确认</el-button>

    </div>

  </div>

</template>

<script>
  export default {
    name: 'chooseMachine',
    data() {
      return {
        isClickIn: true,
        macRelation: {
          machine_id: "",
          workshop_id: ''
        },
        maintain_type_id: "",
        selectInfo: {
          company_id: ''
        },
        flag: "",//保养类别
        operator: '', //操作人
      }
    },
    methods: {
      back() {
        // nativeMethod.closeActivity();
        this.$router.push({ //跳转并传参数
          path: '/Maintenance_list',
          name: 'Maintenance_list',
          params: {
            company_id: this.selectInfo.company_id,
            operator: this.operator
          }
        })
      },
      sure() { //确认按钮
        this.$router.push({ //跳转并传参数
          path: '/Maintenance',
          name: 'Maintenance',
          params: {
            company_id: this.selectInfo.company_id,
            operator: this.operator,
            workshop_id: this.macRelation.workshop_id,
            flag: this.flag,
            machine_id: this.selectInfo.machine_id,
            maintain_type_id: this.maintain_type_id,
            isClickIn: true
          }
        })
      }
    },
    mounted() {
 
      this.operator = this.$route.params.operator
      this.macRelation.workshop_id = this.$route.params.workshop_id;
      this.selectInfo.company_id = this.$route.params.company_id;
      this.flag = this.$route.params.flag
      this.selectInfo.machine_id = this.$route.params.machine_id
      this.maintain_type_id = this.$route.params.maintain_type_id
      this.isClickIn = this.$route.params.isClickIn
      history.pushState(null, null, window.location.href); //禁止手势返回
      window.addEventListener('popstate', function () {
        history.pushState(null, null, window.location.href);
      });
    }
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
