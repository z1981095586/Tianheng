<template>
  <div class="allPage">

    <div class="header">
      <div class="header_con">
       
        <h2>操作手册上传中心</h2>
       
      
      </div>
    </div>
    <div class="main">
   
      <div class="content">
    
  <div> <el-cascader :clearable="true" :options="data" :props="props" :show-all-levels="false"></el-cascader>
   <el-upload style="margin:2rem"
  class="upload-demo"
  drag
  accept="jpeg"
  action="https://jsonplaceholder.typicode.com/posts/"
  >
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传PDF文件</div>
</el-upload></div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'index',
    data() {
      return {
        companyId: "10000025",
        loginOutShow: false,
        tab: "message",
        data:[],
        props:{
          value:"name",
          label:"name",
          children:"menuMid"
        }
      }
    },
    methods: {
      getNode(){
         axios({
          url: "http://106.12.219.66:16011/api/system/login/judgeUser",
          method: "post",
          // headers: header,
          data:{"name":"admin","password":"f78b638d5893f4b9c03f877da02b5e9b","from":1},
          // headers: headers
        }).then((res) => {
          console.log(res)
           let arr = []
          for (let i = 0; i < res.data.data.menu.length; i++) {
            arr.push(res.data.data.menu[i])
          }
           this.data = arr
          // //console.log(that.tableData)

          // that.totalDataNum = res.data.data.totalDataNum
        })
      }
    },
    mounted() {
    this.getNode()

    },
    watch: {

    }

  }

</script>

<style scoped>
  .menu /deep/ .el-menu-item {
    padding: 0px 135px;
    font-size: 1rem;
  }

  .menu /deep/ .el-submenu__title {
    padding: 0px 130px;
    font-size: 1rem;
  }

  .allPage {
    width: 100%;
    height: 100vh;
    background: rgb(247, 248, 249);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .header {
    width: 100%;
    height: 91px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header_con {
    width: 80%;
    height: 60px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header_left {
    width: 20rem;
    height: 100%;
    display: flex;
    align-items: center;
    /* color: white;
    font-size: 1.5rem; */
  }

  .header_left span {
    margin-left: 1.5rem;
  }

  .header_right {
    width: 20rem;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .header_right_icon {
    width: 8rem;
    height: 100%;
    color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
  }

  .header_right span {
    color: white;
    font-size: 1.1rem;
    font-weight: 600;

  }

  .icon_info {
    width: 42%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .icon_info img {
    width: 40px;
    height: 40px;
  }

  .main {
    width: 84%;
    height: 91%;
    margin-top: 1%;
    background: rgb(247, 248, 249);
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .menu {
    width: 20%;
    height: 100%;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .add_item_btn {
    width: 97%;
    height: 2.5rem;
    margin-top: 1rem;
    background: rgb(208, 5, 19);
    color: white;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }

  .login_out {
    position: absolute;
    right: 0;
    bottom: -1rem;
    width: 5rem;
    height: 1.5rem;
    border-radius: 8px;
    display: flex;
    color: red;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, 0.5);
  }

  .line {
    width: 97%;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
    margin-top: 10px;
  }

  .content {
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .message {
    width: 290px;
    height: 220px;
    overflow: hidden;


  }

  .message_row {
    width: 290px;
    height: 70px;
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .message_row_one {
    width: 280px;
    height: 35px;
    display: flex;
    color: rgba(0, 0, 0, 0.5);
    align-items: center;
    font-size: 1.1rem;
    justify-content: space-between;
  }

  .message_row_two {
    width: 280px;
    height: 35px;

    font-size: 1.1rem;
    display: flex;
    color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: space-between;
  }

  .message_row_one span {
    width: 40%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .message_row_two span {

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /deep/ .el-tabs__item.is-active {
    font-size: 1.1rem;
  }

  /deep/ .el-tabs__item {
    font-size: 1.1rem;
  }

</style>
