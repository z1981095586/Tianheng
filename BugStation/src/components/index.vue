<template>
  <div class="allPage" >

    <div class="header">
      <div class="header_con">
        <div class="header_left">
          <img src="../common/icon/logo.png" style="width:100%;height:100%;">
        </div>
        <div class="header_right">
          <div class="header_right_icon">
            <el-popover placement="top-end" width="290"    trigger="hover">
              <el-tabs v-model="tab">
                <el-tab-pane label="消息(3)" name="message">
                  <div class="message">
                    <div class="message_row">
                      <div class="message_row_one"><span style="color:black;">鑫海纺织</span><span
                          style="width:60%">2021-01-23 12:31</span></div>
                      <div class="message_row_two"><span>我我哦都怕我脾气都片尾曲www轻微的</span></div>
                    </div>
                    <div class="message_row"></div>
                    <div class="message_row"></div>
                  </div>
                </el-tab-pane>

              </el-tabs>
              <img src="../common/icon/message.png" slot="reference" style="height: 30px;
    width: 30px;" />
            </el-popover>
           <el-divider direction="vertical"></el-divider>
            <el-popover placement="top-start" width="30"    trigger="hover">
              <el-button type="primary" style="width:150px" @click="loginOut()">退出系统</el-button>
              <img slot="reference" src="../common/icon/avator.png" style="height: 35px;
    width: 35px;" />
            </el-popover>

            <!-- <div class="login_out" v-show="loginOutShow" @mouseenter="loginOutShow=true" @mouseleave="loginOutShow=false" @click="loginOut()"><a>登出</a></div> -->
          </div>

        </div>
      </div>
    </div>
    <div class="main">
      <div class="menu">
        <div class="add_item_btn" @click="toAdd()">
          新增事项
        </div>
        <div class="line"></div>
        <el-menu style="width:97%;height:97%;border:none;" :default-active="this.$route.path"
          class="el-menu-vertical-demo" router background-color="white" text-color="black" active-text-color="red">
          <el-menu-item index="">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>         
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>事项管理</span>
            </template>
            <el-menu-item index="/index/addItem">新增事项</el-menu-item>
            <el-menu-item index="/index/itemDetail">事项详情</el-menu-item>
            <el-menu-item index="/index/itemList">事项列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>帮助中心</span>
            </template>

            <el-menu-item index="/index/introduce">功能介绍</el-menu-item>
            <el-menu-item index="/index/contactUs">联系我们</el-menu-item>

            <el-menu-item index="/index/content">内容规范</el-menu-item>
          </el-submenu>

        </el-menu>
      </div>
      <div class="content">
        <router-view />  
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
        tab: "message"
      }
    },
    methods: {
      loginOut() {
        this.$store.commit('setPasswordFlag', false)
        this.$store.commit('setPeopleData', {
          user: "",
          pass: ""
        })
        this.$router.push({

          name: "login",
          path: "/login"
        })
      },

      toAdd() {
        this.$router.push('/index/addItem')
      }
    },
    mounted() {
if(this.$store.state.passwordFlag==false){
    this.$router.push('/login')
}

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
    justify-content: space-between;
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
    width: 77%;
    height: 100%;
    background: white;
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
