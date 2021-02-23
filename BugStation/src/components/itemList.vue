<template>
  <div class="allPage">
    <div class="select">
      <div style="font-size:1rem;margin-left:2rem">提报时间：
        <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期"
          value-format="yyyy-MM-dd" end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div style="position:absolute;right:2rem">
        <el-button size="small" @click="reset()">重置</el-button>
        <el-button type="primary" size="small" @click="query()">查询</el-button>
      </div>
    </div>
    <div class="table">
      <div class="table_title">
        <div style="font-size:1.2rem;margin-left:2rem">事项列表</div>
        <div style="position:absolute;right:2rem">
          <el-button type="primary" icon="el-icon-plus" size="small" @click="toAdd()">新建</el-button>
        </div>
      </div>
      <div class="table_con">
        <el-table :data="tableData" :header-cell-style="header" stripe style="width: 100%">
          <el-table-column fixed border type="index" :default-sort="{prop: 'createTime', order: 'descending'}"
            label="项次" width="150">
          </el-table-column>
          <el-table-column prop="type" label="事项分类" width="120">
          </el-table-column>
          <el-table-column prop="userName" label="提报人员" width="120">
          </el-table-column>
          <el-table-column prop="createTime" sortable label="提报日期" width="200">
          </el-table-column>
          <el-table-column prop="updateTime" sortable label="最近更新" width="250">
          </el-table-column>
          <el-table-column prop="status" label="状态" width="150">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pla">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page.sync="pageNum" :page-size="pageSize" layout="prev, pager, next,sizes, jumper"
            :total="totalDataNum">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {

    name: 'login',

    data() {
      return {
        tableData: [],
        header: {
          "background": 'rgb(250,250,250)',
          "border": "none",
        },
        time: "",
        pageNum: 1,
        pageSize: 8,
        totalDataNum: null,


      }
    },

    methods: {
      query() {
        this.pageNum = 1;
        this.getData(true)
      },
      reset() {
        this.time = ''
        this.getData(false)
      },
      handleClick(row) { //查看详情
        //console.log(row.id)
        this.$router.push({

          name: "itemDetail",
          path: "/index/itemDetail",
          params: {
            id: row.id
          }
        })
      },
      getData(ishadTime) { //获取数据
        //console.log(this.time)
        //console.log(window.apiRoot.testApi)
        let that = this;
        let data;
        if (ishadTime == true) {
          data = {
            startDate: this.time[0],
            endDate: this.time[1],
            page: that.pageNum,
            pageNum: that.pageSize,
            createTimeSort: "asc"
          }
        } else {
          data = {
            page: that.pageNum,
            pageNum: that.pageSize,
            createTimeSort: "asc"
          }
        }

        axios({
          url: window.apiRoot.testApi + "getMatterList",
          method: "post",
          // headers: header,
          data: data,
          // headers: headers
        }).then((res) => {
          //console.log(res)
          let arr = []
          for (let i = 0; i < res.data.data.data.length; i++) {
            arr.push(res.data.data.data[i])
          }
          that.tableData = arr
          //console.log(that.tableData)

          that.totalDataNum = res.data.data.totalDataNum
        })
      },
      handleCurrentChange(val) { //页面当前页改变
        //console.log(val)
        this.pageNum = val;
        this.getData(false)
      },
      handleSizeChange(val) { //页面条数改变
        this.pageSize = val;
        this.getData(false)
      },
      toAdd() {
        this.$router.push('/index/addItem')
      },
      total() {
        this.tableData = ['as']
      }


    },
    mounted() {

      this.getData(false)
    },
    watch: {


    }
  }

</script>

<style scoped>
  .allPage {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

  }

  .select {
    width: 100%;
    height: 10%;
    margin-bottom: 2%;
    background: white;
    display: flex;
    align-items: center;
    position: relative;
  }

  .table {
    width: 100%;

    display: flex;
    flex-direction: column;
    background: white;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .pla {
    position: absolute;
    right: 2rem;
    bottom: 2rem;
  }

  .table_title {
    width: 100%;
    height: 10%;
    align-items: center;
    padding-top: 2rem;
    padding-bottom: 2rem;
    display: flex;
    position: relative;
  }

  .table_con {
    width: 96%;
    height: 90%;
    padding-bottom: 9rem;
  }

  .table_con /deep/ .el-table--border,
  .el-table--group {
    border: none;
  }

  .table_con /deep/ .el-table__header-wrapper th:nth-last-of-type(2) {
    border-right: none;
  }

  .table_con /deep/ .el-table--border td:nth-last-of-type(1) {
    border-right: none;
  }

  .table_con /deep/ .el-table--border::after,
  .el-table--group::after {
    width: 0;
  }

</style>
