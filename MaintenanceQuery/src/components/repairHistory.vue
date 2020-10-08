<template>
  <div class="content" style="padding-top:10px;">

    <span style="font-size: 1rem;font-weight: bold;margin-bottom: -1rem">维修记录</span>
    <i class="el-icon-arrow-left" style="position:fixed;left:17px;top:13px;" @click="back"></i>

    <!--出库单详细-->
    <div class="all-page">


      <div class="query">
        <span style="margin-left:10px;font-size:0.5em;margin-right:10px">机台号</span>
        <el-input size="small" style="width:20%;" v-model="selectInfo.machineId"></el-input>
        <span style="margin:10px;font-size:0.5em">故障搜索</span>
        <el-input size="small" style="width:39%;" v-model="selectInfo.errorReason"></el-input>

      </div>
      <div class="query">
        <span style="margin-left:10px;font-size:0.5em;margin-right:10px">开始时间</span>
        <el-date-picker v-model="selectInfo.startDate" type="date" style="width:30%;margin-right:10px" size="small"
          value-format="yyyy-MM-dd">
        </el-date-picker>
        <span style="margin-left:5px;font-size:0.5em;margin-right:5px">结束时间</span>
        <el-date-picker v-model="selectInfo.endDate" type="date" style="width:30%;margin-right:10px" size="small"
          value-format="yyyy-MM-dd">
        </el-date-picker>

      </div>
      <div class="query">
        <span style="margin:10px;font-size:0.5em">零部件使用</span>
        <el-input size="small" style="width:48%;" v-model="selectInfo.parts"></el-input>
        <el-button type="primary" style="width:20%;margin-left:2.5%" size="mini" @click="getData(true)">搜索</el-button>
      </div>
      <div class="table">
        <div class="table_con">
          <el-table :data="tableData" :header-cell-style="headerCellStyle" :cell-style="cellStyle"
            @cell-click="cellCick" border max-height="440" style="width: 100%;font-size:0.5em;">
            <el-table-column prop="machineId" width="65" label="机台号">
            </el-table-column>
            <el-table-column prop="date" width="70" label="处理时间">
            </el-table-column>
            <el-table-column prop="errorReason" width="75" label="故障描述">
            </el-table-column>
            <el-table-column prop="solve" label="处理办法">
            </el-table-column>
            <el-table-column prop="img1" width="70" label="图片">
              <template slot-scope="scope">
                <el-image :src="scope.row.img1" lazy :preview-src-list="urls"></el-image>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </div>

      <el-pagination class="bottom" background layout="prev, next" :total="total" @prev-click="prev" @next-click="next">
      </el-pagination>

    </div>

  </div>

</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Maintenance_history',
    data() {
      return {


        urls: [
          "http://47.110.95.57/Img_compress/20200409110500pic1.jpg",
        ],
        tableData: [

        ],
        selectInfo: {
          company_id: '',
          startDate: "",
          endDate: "",
          parts: "",
          errorReason: "",
          machineId: ""

        },
        pageNum: 1,
        total: null

      }
    },
    methods: {
      prev() { //上一页

        if (this.pageNum > 1) {
          this.pageNum--;
          this.getData()
        }
      },
      next() { //下一页

        this.pageNum++;
        this.getData()
      },
      back() {
        nativeMethod.closeActivity();
      },
      headerCellStyle() {
        return "background:rgb(204,204,204);color:black;padding: 2px 0;    text-align: center;"
      },
      cellStyle() {
        return "padding: 5px 0;    text-align: center;"
      },
      cellCick(row, column, cell, event) {
     
        this.urls = []
        if (row.img1 != null) {
          this.urls.push(row.img1)
        }
        if (row.img2 != null) {
          this.urls.push(row.img2)
        }
        if (row.img3 != null) {
          this.urls.push(row.img3)
        }

      },
      getData(IsSearch) {

        let url = "http://106.12.219.66:8227/report/getRepairSubmit"
        let that = this

       if(IsSearch==true){
         that.pageNum=1
       }
        axios({
            url: url,
            method: "post",
            data: {

              "startDate": that.selectInfo.startDate,
              "endDate": that.selectInfo.endDate,
              "machineId": that.selectInfo.machineId,
              "errorReason": that.selectInfo.errorReason,
              "parts": that.selectInfo.parts,
              "pageNum": that.pageNum,
              "pageSize": 4
            },
            headers: {
              companyId: that.selectInfo.company_id

            }
          })
          .then(res => {

            that.total = res.data.data.total
            that.tableData = res.data.data.list

          })

      },



    },
    mounted() {
      history.pushState(null, null, window.location.href);
      window.addEventListener('popstate', function () {
        history.pushState(null, null, window.location.href);
      });


      this.selectInfo.company_id = this.$route.params.company_id;

      this.getData()


    }
  }

</script>

<style scoped>
  .bottom {
    position: fixed;
    bottom: 17px;
    left: 35%;


  }

  .table {
    width: 100%;
    height: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .table_con {
    width: 95%;
    height: 95%;

    border-top: 1px solid grey;
  }

  .table_body {
    width: 100%;
    height: 93%;

  }

  .query /deep/ .el-input--suffix .el-input__inner {
    padding-right: 0;
  }

  .query /deep/ .el-range-editor--small .el-range-input {
    font-size: 0.5em;
  }

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
