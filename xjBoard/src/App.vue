<template>
  <div id="app" >
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
  body{
    /*background-color: #373737;*/
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 100%;
    overflow: hidden;
    -webkit-overflow-scrolling: unset;
    height: 50rem;
    font-size: 5px;
    margin: 0;
    padding: 0;
  }
  html{
    width: 100%;
    overflow: hidden;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
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
    margin: 0;
    border: 2px rgb(255, 255, 255) solid;
    -webkit-box-shadow:1px 1px 1px rgba(19, 19, 19, 0.96) inset;
    -moz-box-shadow:1px 1px 1px rgba(17, 9, 10, 0.88) inset;
    box-shadow:0 0 25px rgba(50, 50, 50, 0.88) inset;
  }
  /* 使表格背景透明 */
 /* .el-table th, .el-table tr {
    background-color: transparent;
  }*/
  /*table表格控件表头与内容列不对齐问题*/
  /*body .el-table th.gutter{*/
  /*display: table-cell!important;*/
  /*}*/
  /*修改element-ui的table 在鼠标悬停hover时的高亮颜色*/
  .el-table tbody tr:hover>td {
    background-color: rgba(48, 162, 211, 0.9) !important
  }

  .el-pagination .btn-next {
    background: center center no-repeat #fff;
    background-size: 16px;
    cursor: pointer;
    color: #103133;
  }
  /*路由动画*/
  .transitionRouter-enter-active,
  .transitionRouter-leave-active {
    transition: all 2s;
  }
  .transitionRouter-leave{
    opacity: 0;
  }
  .transitionRouter-enter{
    opacity: 0;
    transform: translate3d(100%, 0, 0);

  }
  /*滚动条样式*/
  ::-webkit-scrollbar {
    width: 0.5%;
    background-color: rgba(141, 141, 141, 0.86);
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(208, 208, 208, 0.98);
    border-radius: 5px;
  }
  /*.dataTable1::before{*/
  /*height: 0;*/
  /*}*/
  /*.dataTable1::after{*/
  /*height: 0;*/
  /*}*/
  /*table表格控件表头与内容列不对齐问题*/
  body .el-table th.gutter{
    display: table-cell!important;
  }

  /* 表格内背景颜色 */
  .el-table th, .el-table tr,.el-table td{
    border: 0 !important;
  }

</style>
