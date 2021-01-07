<template>
  <div>

    <div class="body" style="height:100vh;width:100%;">
      <div style="height:7vh">

        <div class="fzgy" style="height:16%;width:90%;background:none;">浙江布威信息技术有限公司</div>

      </div>
      <div class="left" style="height:90vh;width:27%;position:relative;">
        <div class="circle" ></div>
        <div class="login">
          <div style="width:100%;height:77%;margin-top:7%;display:flex;flex-direction:column;      justify-content: space-around;
    align-items: center;">
            <div class="login_input"><input v-model="user" placeholder="请输入用户名" /></div>
            <div class="login_input"><input v-model="pass" type="password" placeholder="请输入密码" /></div>
            <div class="login_btn" @click="login()">登录</div>
          </div>
        </div>
      </div>
      <div class="center" style="height:90vh;width:43%;">


      </div>
      <div class="right" style="height:90vh;width:27%">

      </div>
      <div class="bottom_font"><span>Copyright © 浙江布威信息技术有限公司</span></div>
    </div>


  </div>
</template>

<script>
  import echarts from "echarts";
  import china from '../../public/map/全国.json'
  import axios from 'axios'





  export default {

    name: "login",
    data() {
      return {
        user: "",
        pass: ""

      }
    },

    methods: {
      login() {
        if (this.user == "" || this.pass == "") {
          alert("请输入用户名和密码！")
        } else if (this.user != "admin" || this.pass != "admin") {
          alert("请输入正确的用户名和密码！")
        } else {
          this.$router.push({
            //跳转并传参数
            path: "/centerdata",
            name: "centerdata",
            params: {
              user: this.user,
              pass: this.pass,
            },
          });
        }
      },
   

    },

    mounted() {

    },
  }
</script>
<style scoped>
  @font-face {
    font-family: "digital-7 (italic)";
    src: url("../digital-7 (italic)/digital-7 (italic).woff2") format("woff2"),
      url("../digital-7 (italic)/digital-7 (italic).woff") format("woff"),
      url("../digital-7 (italic)/digital-7 (italic).ttf") format("truetype"),
      url("../digital-7 (italic)/digital-7 (italic).eot") format("embedded-opentype"),
      url("../digital-7 (italic)/digital-7 (italic).svg") format("svg");
  }

  body {
    margin: 0;
    padding: 0;
  }

  .body {
    background: rgb(17, 22, 51);
    background-image: url("../icon/bg.png");
    background-size: 100% 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  .ptqyjk {
    background-image: url("../icon/ERP.png");
    background-size: 100% 100%;
    font-size: 3vh;
    text-align: center;
    line-height: 200%;
    position: absolute;
    top: 2%;
    left: 3%;
    color: white;
  }

  .circle {
    background-image: url("../icon/circle.png");

    background-size: 100% 100%;

    width: 7.5rem;
    height: 5rem;
    position: absolute;
    top: -6%;
    left: -6%;

  }

  .login {
    background-image: url("../icon/loginFrame.png");
    background-size: 100% 100%;

    width: 4rem;
    height: 3.5rem;
    position: absolute;
    top: 16%;
    left: 196%;


  }

  .login_input {
    background-image: url("../icon/input.png");
    background-size: 100% 100%;

    width: 3rem;
    height: 0.5rem;
    position: relative;


  }

  .login_input input {
    background: none;
    font-size: 0.266667rem;
    width: 2.9rem;
    padding-left: 0.1rem;
    /* margin-left: 1rem; */
    height: 0.5rem;
    border: none;
    position: absolute;
    outline: none;
    left: 0;
    top: 0;
    color: white;



  }

  .login_btn {
    background: rgb(0, 228, 251);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;

    width: 3rem;
    height: 0.5rem;
  }

  .ptqyjk2 {
    background-image: url("../icon/MES.png");
    background-size: 100% 100%;
    font-size: 3vh;
    text-align: center;
    line-height: 200%;
    position: absolute;
    top: 2%;
    left: 13%;
    color: white;
  }

  .fzgy {
    /* background-image: url("../icon/bg.png"); */
    /* background-size: 100% 100%; */
    position: absolute;
    top: 1%;
    left: 5%;
    color: white;
    text-align: center;
    font-size: 4vh;


  }

  .sj {
    background-image: url("../icon/当前时间.png");
    background-size: 100% 100%;
    position: absolute;
    top: 2%;
    right: 3%;
  }

  .left {
    position: absolute;
    left: 0.7%;
    top: 9%;

  }

  .center {
    position: absolute;
    left: 28%;

  }

  .right {
    position: absolute;
    right: 0.7%;
    top: 9%;
  }

  .left1 {
    background-image: url("../icon/各区域产值背景.png");
    background-size: 100% 100%;
    position: relative;

  }

  .left2 {
    background-image: url("../icon/各区域产值背景.png");
    background-size: 100% 100%;
    position: relative;
    top: 1.5vh;
  }

  .left3 {
    background-image: url("../icon/各区域产值背景.png");
    background-size: 100% 100%;
    position: relative;
    top: 3.5vh;
    z-index: 101;
  }

  .szxx {
    background-image: url("../icon/实政信息.png");
    background-size: 100% 100%;
    position: relative;
    top: -1%;
    left: 4%;
  }

  .right1 {
    background-image: url("../icon/各区域产值背景.png");
    background-size: 100% 100%;
    position: relative;
  }

  .right2 {
    background-image: url("../icon/机修上报维修统计-背景.png");
    background-size: 100% 100%;
    position: relative;
    top: 2%;
  }

  .right3 {
    background-image: url("../icon/各年龄学历分布.png");
    background-size: 100% 100%;
    position: relative;
    top: 4%;
  }

  .bottom_font {
    position: absolute;
    bottom: 2%;
    right: 0;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.8vh;
    z-index: 100;
  }

  .Date {
    font-family: "digital-7 (italic)";
    font-size: 3.3vh;
    color: #00C8DF;
    top: 10%;
    left: 4%;
    position: absolute;
  }

  .time {
    font-family: "digital-7 (italic)";
    font-size: 3.4vh;
    color: #00C8DF;
    top: 22%;
    right: 4%;
    position: absolute;
  }

  .title1 {
    color: white;
    font-size: 2.5vh;
    left: 3%;
    top: 8%;
    position: absolute;
  }

  .choose {
    border: none;
    background-color: #111931;
    font-size: 2vh;
    right: 7%;
    top: 8%;
    position: absolute;
    z-index: 999;
    color: white;
  }

  .message_table {
    width: 100%;
    height: 28vh;
    overflow: hidden;
    display: inline-block;
    font-size: 2.2vh;
  }

  .first_tr1 {
    display: flex;
  }

  .first_th1 {
    color: white;
    font-size: 2.4vh;
    margin-left: 2.2vh;
    margin-top: 2vh;
  }

  .second_th1 {
    color: orange;
    font-size: 2vh;
    right: 5%;
    top: 8%;
    position: absolute;
  }

  .message {
    left: 4%;
    position: relative;
    float: left;
  }

  .date {
    right: 5%;
    position: absolute;
  }

  .item {
    margin-left: -5.6%;
  }

  .itemli1 {
    width: 100%;
    display: flex;
    color: white;
    margin-bottom: 1.5vh;
  }

  .item_style {
    width: 100%;
    float: left;
  }

  /* 奇数行的样式 */
  .itemli1:nth-child(odd)>.item_style {
    background-color: #005B71;
    width: 99.5%;
  }

  /* 偶数行的样式 */
  .itemli1:nth-child(even)>.item_style {
    background: none;
  }

  .border {
    border-left: 3px solid #FF7400;
    position: relative;
    top: 5%;
    margin-left: 3vh;
    width: 100%;
    height: 16.5%;
  }

  .yield {
    color: white;
    font-size: 2.5vh;
    margin-left: 1vh;
  }

  .num {
    color: white;
    font-size: 5vh;
    font-family: "digital-7 (italic)";
  }

  .number1 {
    background: rgb(0, 228, 251, 30%);
    border-radius: 2px;
    text-align: center;
    width: 50%;
    height: 100%;
    margin-top: 1.5vh;
    margin-left: 0.5vh;
    padding: 5%;
  }

  .number {
    background: rgb(0, 228, 251, 30%);
    border-radius: 2px;
    text-align: center;
    width: 50%;
    height: 100%;
    margin-top: 1.5vh;
    padding: 5%;
  }

  .number2 {
    margin-top: 0.5vh;
    margin-left: -1vw;
    position: absolute;
    font-size: 7vh;
  }

  .frame {
    border: 2px solid #00C7EE;
    font-size: 2.5vh;
    color: white;
    width: 25vh;
    height: 9vw;
    text-align: center;
    position: absolute;
    top: 20%;
    right: 0%;
  }

  .frame1 {
    border-bottom: 2px solid #00C7EE;
    height: 5vh;
  }

  .frame_name {
    height: 5vh;
    background: #00617E;
    line-height: 5vh;
  }

  .frame_number {
    height: 5vh;
    line-height: 5vh;
    font-size: 4vh;
    font-family: "digital-7 (italic)";
    text-align: left;
    margin-left: 1vw;
  }

  .frame_name1 {
    background: #00617E;
    height: 5vh;
    line-height: 5vh;
  }

  .frame_number1 {
    line-height: 5vh;
    height: 5vh;
    font-size: 4vh;
    line-height: 5vh;
    font-family: "digital-7 (italic)";
    text-align: left;
    margin-left: 1vw;
  }

  .regional_output {
    font-size: 2vh;
    top: -2%;
    left: 2%;
  }

  .statistics_table {
    font-size: 2vh;
    width: 100%;
    height: 31vh;
    overflow: hidden;
    display: inline-block;
    position: relative;
    top: -50%;
  }

  .table {
    widows: 100%;
    height: 2vh;
    margin-top: 5px;
  }

  .seamless-warp {
    height: 80%;
    overflow: hidden;
    width: 100%;
    text-align: center;
  }

  .first_tr {
    display: flex;
    font-size: 2.2vh;
    color: orange;
    margin-top: 10vh;
  }

  .first_th {
    margin-left: 1.4vw;
  }

  .second_th {
    margin-left: 2.6vw;
  }

  .third_th {
    margin-left: 1.5vw;
  }

  .four_th {
    margin-left: 1.5vw;
  }

  .itemli {
    width: 100%;
    height: 100%;
    display: flex;
    color: white;
    margin-left: -1.3vw;
    margin-bottom: 0.5vh;
    margin-top: 1vh;
    font-size: 2vh;
  }

  .itemli span {
    flex: 1;
  }

  .map-container {
    position: absolute;
    top: 10%;
    left: -5%;
  }

  .select1 {
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: rgb(17, 25, 49, 1);
    font-size: 2vh;
    right: 5%;
    position: absolute;
    z-index: 999;
    color: white;
    height: 4vh;
    padding: 1vh;
    border: 0;
    outline: none;
    width: 4.5vw;
  }

  .arrow {
    border: 1px solid#111931;
    border-radius: 3px;
    color: #00E8FF;
    overflow: hidden;
    height: 4vh;
    width: 5vw;
    font-size: 2vh;
    position: absolute;
    left: 78%;
    top: 5%;
    display: block;

  }

  .arrow:after {
    content: "▼";
    position: absolute;
    right: 1.7vh;
    top: 0.6vh;
    z-index: 9999;
    text-align: center;
    width: 10%;
    height: 10%;
    pointer-events: none;
    box-sizing: border-box;
    transform: scale(1.6, 0.9)
  }

  .select2 {
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: rgb(17, 25, 49, 1);
    font-size: 2vh;
    right: 5%;
    position: absolute;
    z-index: 999;
    color: white;
    height: 4vh;
    padding: 1vh;
    border: 0;
    outline: none;
    width: 4.5vw;
  }

  .head_portrait {
    background-image: url("../icon/头像.png");
    background-size: 100% 100%;
    font-size: 3vh;
    text-align: center;
    position: relative;
    top: 0;
    left: 0;
  }

  .head_portrait2 {
    background-image: url("../icon/头像.png");
    background-size: 100% 100%;
    opacity: 0.3;
    font-size: 3vh;
    text-align: center;
    position: relative;
    top: 0;
    left: 0;
  }

  .head1 {
    position: relative;
    top: 0%;
    left: 14%;
  }

  .head2 {
    position: relative;
    top: -14%;
    left: 14%;
  }

  .head3 {
    position: relative;
    top: -28%;
    left: 14%;
  }

  .head4 {
    position: relative;
    top: -42%;
    left: 14%;
  }

  .head5 {
    position: relative;
    top: -55%;
    left: 14%;
  }

  .txrq1 {
    font-size: 1vw;
    position: relative;
    top: 4.6vh;
    left: -13%;
    color: white;
  }

  .txsj1 {
    font-size: 1vw;
    position: relative;
    top: 2.4vh;
    left: 87%;
    color: #FF9F00;

  }

  .hyyhs {
    font-size: 2.5vh;
    position: relative;
    left: 3%;
    top: 8%;
    color: white;
  }

  .zbz {
    font-size: 2vh;
    position: relative;
    top: -54%;
    left: 14%;
    color: white;
  }

  .education_background {
    top: 8%;
    position: relative;
  }

  .mask {
    background-color: #000;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1
  }

  .pop {
    background-image: url("../icon/弹出框.png");
    background-size: 100% 100%;
    position: absolute;
    z-index: 2;
    right: 110%;
    top: 30%;
  }

  .name {
    top: 25%;
    left: 20%;
    position: absolute;
    color: #008BB0;
    text-align: left;
  }
</style>