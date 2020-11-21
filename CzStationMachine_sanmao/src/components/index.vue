<template>
  <div class="allPage">
    <div class="header">
      <div class="header_left">
        <el-avatar :size="50">
          <img src="../../static/img/logo.png" />
        </el-avatar>
        <span>天衡穿综工位操作系统</span>
      </div>
      <div class="header_right">
        <!-- <span v-show="isShangZhou" v-for="(item,index) in nameList"
          :key="'sz_'+index">{{item.label}}：{{item.staffName}}</span>
        <span v-show="isChaPian" v-for="(item,index) in nameList2"
          :key="'cp_'+index">{{item.label}}：{{item.staffName}}</span>
        <span v-show="isStopCar || isMachine ">{{nameList3}}</span> -->
        <div class="icon_info">
          <img src="../../static/img/remind.png" />

          <img src="../../static/img/unremind.png" />

          <img src="../../static/img/refresh.png" @click="reload()" />

          <img src="../../static/img/question.png" />
        </div>
      </div>
    </div>
    <div class="main" v-show="mainShow">
      <div class="btn" @click="showQuery">穿综计划查询</div>
        <div class="btn" @click="showBaogong">穿综报工</div>
    </div>
  <div class="query" v-show="queryShow">
      <div class="table">
          <el-table
    :data="tableData"
    size="medium"
    :border="border"
    style="width: 100%;height:100%;font-size:1.3rem"
    :header-cell-style="headerClass"
   >
    <el-table-column :show-overflow-tooltip="true" align="center"
      prop="date"
      label="穿综优先等级"
      width="180">
    </el-table-column>
    <el-table-column :show-overflow-tooltip="true" align="center"
      prop="name"
      label="产品品号"
      width="180">
    </el-table-column>
    <el-table-column :show-overflow-tooltip="true" align="center"
      prop="address"
      label="色号">
    </el-table-column>
       <el-table-column :show-overflow-tooltip="true" align="center"
      prop="address"
      label="批次">
    </el-table-column>
       <el-table-column :show-overflow-tooltip="true" align="center"
      prop="address"
      label="轴号">
    </el-table-column>
       <el-table-column :show-overflow-tooltip="true" align="center"
      prop="address"
      label="整经长度">
    </el-table-column>
       <el-table-column :show-overflow-tooltip="true" align="center"
      prop="address"
      label="匹数">
    </el-table-column>
       <el-table-column :show-overflow-tooltip="true" align="center"
      prop="address"
      label="状态">
    </el-table-column>
  </el-table>
      </div>
      <div class="bottom">
<div class="left_bottom">
  <div class="btn" style="font-size:2rem" >上一页</div>
        <div class="btn" style="font-size:2rem" >下一页</div>
</div>
<div class="right_bottom">
 <div class="btn" style="font-size:2rem;background:#808080;color:white" @click="back" >返回</div>
</div>
      </div>
    </div>
 <div class="baogong" v-show="baogongShow">
      
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {

    name: 'index',

    data() {
      return {
        border:false,
        mainShow:false,
        queryShow:true,
        baogongShow:false,
        pageNum:1,
        pageSize:8,
        companyId:"10000025",
          tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '30070',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '30070'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '3007021312312312',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '30070',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '30070'
        }, 
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '3007021312312312',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '30070',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '30070'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '3007021312312312',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '30070'
        }]
      }
    },
    methods: {
      getData(){
       let url = 'http://106.12.219.66:8227/report/getSimpleReport';
        let headers = {
          'Content-Type': 'application/json',
          'companyID': this.companyId
        };
        let method = "post";
        let data = {
          "tableName": "sizing_produce_info",
          "pageNum": this.pageNum,
          "pageSize": this.pageSize,

        };

        let that = this
    
        axios({
            url: url,
            method: method,
            data: data,
            headers: headers
          })
          .then(response => {
            console.log(response)

          })
      },
      headerClass({row, column, rowIndex, columnIndex}){
        console.log(row)
        if(rowIndex==0){
          return 'background:#317CCD;color:white;'
        }

      },
  showQuery(){
    this.mainShow=false
    this.baogongShow=false
    this.queryShow=true
  },
  showBaogong(){
    this.mainShow=false
    this.queryShow=false
    this.baogongShow=true

  },
  back(){
     
    this.queryShow=false
    this.baogongShow=false
     this.mainShow=true
  }
    },
    mounted() {


  
    },
       watch: {
     queryShow(val) { //当选择上轴组页面显示时加载数据
        if (val == true) {
              this.getData()


          // })
        }
      },
    
    }
  
  }

</script>

<style scoped>
.header{
  background: #317CCD;
  color: white;
}
  .allPage {
    width: 100%;
    height: 100vh;
  }

  .header {
    width: 100%;
    height: 8%;
    background: #29374B;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header_left {
    width: 35%;
    height: 100%;
    display: flex;
    align-items: center;
    color: white;
    font-size: 1.5rem;
  }

  .header_left span {
    margin-left: 1.5rem;
  }

  .header_right {
    width: 62%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .header_right span {
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    margin-right: 1rem;
  }

  .icon_info {
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .icon_info img {
    width: 30px;
    height: 30px;
  }
.main{
  width: 100%;
  height: 92%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.query{
  width: 100%;
  height: 92%;
  display: flex;
  flex-direction: column;
}
.bottom{
  width: 100%;
  height: 10rem;
 
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 0rem;
}
.left_bottom{
  width: 45%;
  height: 9rem;
  align-items: center;
  justify-content: space-between;
  display: flex;
}
.right_bottom{
  width: 45%;
  height: 9rem;
  align-items: center;
  justify-content: flex-end;
  display: flex;
}
.table{
  width: 100%;
  height: 30rem;
}
.baogong{
  width: 100%;
  height: 92%;
  display: flex;

 
}
.btn{
  width: 45%;
  height: 50%;
  background: #A3D897;
   border-top: 3px solid #ffffff;
    border-left: 3px solid #ffffff;
    border-bottom: 3px solid #717171;
    border-right: 3px solid #717171;
      display: flex;

    align-items: center;
    justify-content: center;
    color: black;
    font-size: 3rem;
}



</style>
