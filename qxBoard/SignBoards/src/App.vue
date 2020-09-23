<template>
  <div id="app">
    <!-- 全局音效 -->
    <router-view/>
          <div class="bottom_font"><span>Copyright © 浙江天衡信息技术有限公司</span></div>
  </div>
</template>

<script>
  import '../static/apiRoot'


export default {

  name: 'app',
  data() {
    return {
      title:"",

    }
  },
  components:{
  }
}
</script>

<style>
  .bottom_font{
    position: absolute;
  bottom: 0%;

    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
    z-index: 100;
  }
  html{
    width:100%;
    overflow: hidden;
    font-size: 14px;
    
  }
  body{
    /* background: #092770; */
    
   
    text-align: center;
    -webkit-overflow-scrolling: unset;
    width: 100%;
    height: 52rem;
    font-size: 10px;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #ffffff;
    width: 100%;
    height: 100%;
  }
  ::-webkit-scrollbar {
    display: none;/*隐藏滚轮*/
  }
  .box{
    background: transparent;
    filter:Alpha(opacity=60);
    padding: 0;
    height: auto;
    text-align: center;
    border: 2px rgba(255, 255, 255, 0.41) solid;
    -webkit-box-shadow:1px 1px 1px rgba(255, 255, 255, 0.2) inset;
    -moz-box-shadow:1px 1px 1px rgba(255, 255, 255, 0.2) inset;
    box-shadow:0 0 25px  rgba(255, 255, 255, 0.2) inset;
  }


  /*body .el-table th.gutter{*/
    /*color: #5c5c5c;*/
    /*width: 50px;*/
    /*height: 50px;*/
  /*}*/

  /*滚动条样式*/
  ::-webkit-scrollbar {
    width: 0.5%;
    height: 0.5%;
    background-color: #5c5c5c;
  }
  ::-webkit-scrollbar-thumb {
      background-color: rgba(208, 208, 208, 0.98);
      border-radius: 5px;
    }
  /* 使表格背景透明 */
  .el-table th, .el-table tr {
    background-color: transparent !important;
  }
  /*修改element-ui的table 在鼠标悬停hover时的高亮颜色*/
  .el-table tbody tr:hover>td {
    background-color: rgba(48, 162, 211, 0.9) !important
  }
  /*table表格控件表头与内容列不对齐问题*/
  body .el-table th.gutter{
  display: table-cell!important;
  }


</style>
