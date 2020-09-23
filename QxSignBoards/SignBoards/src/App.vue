<template>
  <div id="app">
    <!-- 全局音效 -->
    <audio src="" id="eventAudio" preload="auto"></audio>
    <router-view/>

  <div class="bottom_font"><span>Copyright © 浙江天衡信息技术有限公司</span></div>
  </div>
</template>

<script>
// 局部注册组件
import '../static/apiRoot'



export default {

  name: 'app',
  data() {
    return {

      companyId: this.$route.params.id,//公司库表Id

    }
  },
  methods:{
  
 
 
  },
  mounted(){

  },


  components:{
  }
}
</script>

<style  >

@import "./common/font/font.css";
  html{
    width:100%;
    height:100%;
    margin:0;
  
  }
  body{
    /*background: #092770;*/
    /* background-image: url("static/img/wzsignboard.png"); */
     background-image: url("static/img/wzBack.png"); 
    background-size: 100% 120%;
    background-repeat: no-repeat;
    text-align: center;
    width: 100%;
    height: 100%;
    font-size: 10px;
    overflow-x: hidden;
      overflow-y: hidden;
    margin: 0;
    position: absolute;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #ffffff;
    margin: 0;
    width: 100%;
    height: 98%;
    padding: 0;
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
  .hoverBar{
   position: absolute;
    top: 30%;
    z-index: 200;
    cursor: pointer;
    width: 10rem;
    height: 50%;
  }
  .hoverBar_con{
    width:100%;height:100%;display:flex;flex-direction:column;
    position: relative;
  }
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
  .barText{
    font-size: 2rem;
    font-weight: bold;
    position: absolute;
    left: 0;
    display: flex;
    /* padding: 1rem; */
    /* border-radius: 1rem; */
    /* box-shadow:2px 2px 8px rgba(59, 59, 59, 0.9); */
      /* background-image: url("static/img/slide_btn.png");
 transform:rotate(-90deg);
   

    background-repeat: no-repeat;
    background-size: 100% 100%; */
    /* margin: 5%; */
    position: relative;
  }
  .con1{
    position: absolute;
    left: 0;
    top: 0;
  }
  .con2{
    position: absolute;
    left: 0;
    top: 28%;
  }
  .con3{
    position: absolute;
    left: 0;
    top:56%;
  }
  .barText img{
width: 60%;
height: 60%;
  }
    .barText span{
position: absolute;
    left: 6%;
    top: 30%;
    width: 50%;
  }
  .barText:hover{
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
