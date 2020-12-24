<template>
  <div class="content">

    <div class="all-page">
      <div class="input">
        <el-select v-model="value" placeholder="请选择查询条件" style="width:40%;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select> <input v-show="value=='机台号'" type="search" ref="input1" placeholder="输入机台号" v-model="machineId" />
        <input v-show="value=='姓名'" type="search" ref="input2" placeholder="输入姓名" v-model="staffName" />
        <input v-show="value=='工号'" type="search" ref="input3" placeholder="输入工号" v-model="staffId" />
        <el-button type="primary" @click="getData()">查询</el-button>
      </div>
      <div style="width:99%;   display: flex;
    align-items: center;
    justify-content: center;">
        <div style="width:77%;background:white;border-radius:8px;margin-top:2rem;    display: flex;
    flex-direction: column; over-flow:hidden;   align-items: flex-start;
    font-size: 1.2rem;"> <span class="spans">详情</span><span class="spans">姓名：{{jsonData.staff_name}}</span><span
            class="spans">工号：{{jsonData.staff_id}}</span><span class="spans">厂区：{{jsonData.CompanyID}}</span><span
            class="spans">车间：{{jsonData.WorkShopID}}</span><div style="    display: flex;
    flex-direction: column;width:100%;padding-bottom:1rem;
    justify-content: flex-start;
    align-items: flex-start;"><span>机台：</span><el-input style="font-size: 1.2rem;width:90%;
    margin-left: 0.6rem;"
  type="textarea"
  :rows="2"
  disabled
:autosize="true"
  v-model="jsonData.MachineID">
</el-input></div></div>
     
      </div>



    </div>



  </div>

</template>

<script>
  import axios from 'axios'
  import VueScroller from "vue-scroller" //引入vue-scroller，用来做上拉加载下拉刷新
  export default {
    name: 'selectStaff',
    data() {
      return {

        selectInfo: {
          company_id: '',

        },
        options: [{
          value: '姓名',
          label: '姓名'
        }, {
          value: '工号',
          label: '工号'
        }, {
          value: '机台号',
          label: '机台号'
        }, ],
        value: '姓名',
        machineId: "",
        staffName: "",
        staffId: "",
        jsonData: {
          MachineID: null,
          staff_name: null,
          WorkShopID: null,
          staff_id: null,
          CompanyID: null
        }

      }
    },
    methods: {

      back() {
        nativeMethod.closeActivity();
      },

      getData() { //获取数据
        let url = "http://106.12.219.66:8227/report/getSimpleReport"
        let that = this
        let query = {}
        if (that.value == "姓名") {
          if (that.staffName == "") {
            this.$message({
              message: '请输入姓名！',
              type: 'warning'
            });
          } else {
            query = {

              staff_name: that.staffName,

            }
          }
        } else if (that.value == "工号") {
          if (that.staffId == "") {
            this.$message({
              message: '请输入工号！',
              type: 'warning'
            });
          } else {
            query = {

              staff_id: that.staffId,

            }
          }
        } else if (that.value == "机台号") {
          if (that.machineId == "") {
            this.$message({
              message: '请输入机台号！',
              type: 'warning'
            });
          } else {
            query = {

              MachineID: that.machineId,

            }
          }
        }
        axios({
            url: url,
            method: "post",
            data: {
              tableName: "lm_shift",
              selectFields: ['MachineID', 'WorkShopID', 'CompanyID', 'staff_name', 'staff_id'],
              query: query
            },
            headers: {
              companyId: that.selectInfo.company_id
            }
          })
          .then(res => {
            console.log(res.data.data)
            let arr = []
            arr = res.data.data.map(x => {
              return x.MachineID
            });
            console.log(arr)
            that.jsonData = {
              MachineID: arr.toString(),
              staff_name: res.data.data[0].staff_name,
              WorkShopID: res.data.data[0].WorkShopID,
              staff_id: res.data.data[0].staff_id,
              CompanyID: res.data.data[0].CompanyID
            }


          })
      },
    },
    mounted() {
      history.pushState(null, null, window.location.href);
      window.addEventListener('popstate', function () {
        history.pushState(null, null, window.location.href);
      });
      this.selectInfo.company_id = this.$route.params.company_id;


    }
  }

</script>

<style scoped>
  .scroller {
    height: 80%;
    overflow: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

  }

  span {
    overflow: hidden;

    text-overflow: ellipsis;

    display: -webkit-box;
    -webkit-line-clamp: 3;
    width: 100%;
    -webkit-box-orient: vertical;
    margin: 7px;
    text-align: left;

  }

  .shortselect {
    border: 0;
    display: block;
    position: relative;
    min-height: 1.146667rem;
    line-height: 1.146667rem;
    white-space: nowrap;
    position: fixed;
    right: 15px;
    top: 12px;
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
    top: 50px;
    left: 0;

  }

  .select span {


    margin-top: 0px;

    font-size: 12px;
    outline: none;


    color: rgb(21, 153, 204);


    border-radius: 4px;


    width: 80px;
    position: fixed;
    top: 10px;
    right: 0px;

  }

  .text {


    height: 20px;


    -webkit-appearance: none;


    appearance: none;


    border: none;


    font-size: 12px;


    padding: 0px 10px;


    display: block;


    width: 100%;


    -webkit-box-sizing: border-box;


    box-sizing: border-box;


    background-color: #FFFFFF;


    color: rgb(65, 152, 199);


    border-radius: 4px;


  }



  .el-dropdown {
    color: #606266;
    font-size: 17px;
    /* float: right; */
    /* position: absolute; */
    width: 100px;
    position: fixed;
    right: 0px;
    top: 10px;
  }

  .bottom {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
  }

  .content {
    position: relative;
    overflow: auto;
    padding-top: 10px;
  }




  .submit {
    width: 49%;
    height: 40px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(49, 153, 102);
    color: white;
  }

  .cancel {
    width: 49%;
    height: 40px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(255, 153, 102);
    color: white;
  }

  .add {
    width: 90%;
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
  }

  .input-number {
    width: 29%;
    display: flex;

    justify-content: space-around;
    align-items: center;
  }



  .input {
    width: 100%;
    height: 42px;

    padding-bottom: 5px;
    background: white;

    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
  }

  .input input {
    width: 40%;
    height: 42px;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
  }

  .input input:focus {
    outline: none;

  }

  .input i {
    position: absolute;
    right: 35px;
    color: rgba(0, 0, 0, 0.5);
    font-weight: 700;

  }

  .input input::-webkit-input-placeholder {
    font-size: 0.7rem;
    text-align: center;
    color: rgba(0, 0, 0, 0.6);
  }

  .contain {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .all-page {

    width: 100%;

    height: 100%;

    background-color: rgb(242, 242, 242);
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;

  }

  .head {
    width: 95%;
    height: 30px;
    display: flex;
    justify-content: space-around;

  }

  .line {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .line-con {
    width: 95%;
    height: 1.5px;
    background: rgb(242, 242, 245);
  }

  .card {
    width: 95%;
    height: 80px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    background: white;
    font-size: 0.9rem;
    position: relative;
    font-weight: 400;
    border-radius: 4px;
  }

  .card_border {
    width: 95%;
    height: 80px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    background: white;
    font-size: 0.9rem;
    position: relative;
    font-weight: 400;
    border: 1px solid red;
    border-radius: 4px;
  }

  .check {
    position: absolute;
    right: 15px;
    top: 23px;

  }

  .el-checkbox__inner {
    border-radius: 8px;
  }

  .check .el-checkbox .el-checkbox__input .el-checkbox__inner {
    border-radius: 8px;
  }

  .check /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: red;
    border-color: red;
  }

  .card2 {
    width: 95%;
    height: 100px;
    display: flex;
    flex-direction: column;
    background: white;
    font-size: 0.9rem;

    font-weight: 400;
  }

  .card-head {
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-head span {
    margin-left: 5px;
  }

  .card-content {
    width: 100%;
    height: 45%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-content2 {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content-one {
    width: 90%;
    display: flex;

  }

  .content-one span {
    width: 50%;
    text-align: left;

  }

  .content-two {
    width: 90%;
    display: flex;

  }

  .content-two span {
    margin-right: 10px;
    text-align: left;

  }

  .con {
    width: 45%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 0.9rem;

    font-weight: 400;
  }

  .con span {
    margin-left: 5px;
  }

</style>
