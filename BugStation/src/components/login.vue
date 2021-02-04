<template>
  <div class="allPage">
   <div class="loginFrame">
  <img src="../common/icon/logo.png" style="width:20rem;">
  <span class="font">争做全国高端智能制造行业的领先者</span>
  <div class="loginForm">
<div class="login_font">账户密码登录<div class="line"></div> </div>
<div class="input"><img src="../common/icon/user.png" /><input placeholder="账户" v-model="user" /><span class="error" v-show="error1">请输入账户名</span></div>
<div class="input"><img src="../common/icon/lock.png" /><input placeholder="密码" v-model="pass" type="password" /><span class="error" v-show="error2">请输入密码</span></div>
<el-checkbox v-model="autoLogin" size="medium" style="font-size:2rem;margin-top:2.2rem;">自动登录</el-checkbox>
 <el-button type="primary" style="width:100%;font-size:1.5rem;margin-top:1.2rem;" :loading="isLoading" @click="loginTo()">{{btnTxt}}</el-button>
 <span style="color:#409EFF;margin-top:2rem;">注册请联系：113894382921</span>
  </div>
   </div>
   <div class="bottom_font">Copyright@2020-2025&nbsp;浙江天衡信息技术有限公司 &nbsp;保留所有权利 &nbsp;浙ICP备2020044448号-2</div>
  </div>
</template>

<script>
  export default {

    name: 'login',

    data() {
      return {
isLoading:false,
btnTxt:'',
autoLogin:true,
      user:"",
      pass:"",
      error1:false,
      error2:false
      }
    },

    methods: {
      loginTo(){
        this.login(this.user,this.pass)
      },
login(user,pass){
if(this.user==""){
  this.error1=true
}else if(this.pass==""){
  this.error2=true
    this.error1=false
}else if(this.user==""&&this.pass==""){
  this.error2=true
  this.error1=true
}else{
  this.error1=false
  this.error2=false
    if(user=="admin" &&pass=="admin"){
    
     
     if(this.autoLogin==true){
         this.btnTxt="登录中..."
  this.$store.commit('setPasswordFlag', true)
              this.$store.commit('setPeopleData', {
                user:"admin",
                pass:"admin"
              })
  this.isLoading=true
  setTimeout(() => {
       this.$router.push({
   
      name:"addItem",
      path:"/index/addItem"
     })
  }, 2000);
         
     }

  }else{
      this.$message.error('账号或密码错误！');
  }
}
}
    },
    mounted() {
if(this.$store.state.passwordFlag==true){
  this.btnTxt="自动登录中..."
  this.user=this.$store.state.peopleData.user
    this.pass=this.$store.state.peopleData.pass
  this.isLoading=true
  setTimeout(() => {
     this.login(this.$store.state.peopleData.user,this.$store.state.peopleData.pass)
  }, 2000);
 
}else{
  this.btnTxt="登录"
  this.isLoading=false
}
    },
    watch: {
   

    }
  }

</script>

<style scoped>
::-webkit-input-placeholder { /* Chrome/Opera/Safari */
color:rgba(0,0,0,0.3);

}

::-moz-placeholder { /* Firefox 19+ */
  color:rgba(0,0,0,0.3);

}  

:-moz-placeholder { /* Firefox 19+ */
 color:rgba(0,0,0,0.3);

}  
 .loginForm /deep/ .el-checkbox__input.is-checked .el-checkbox__inner::after{
    left: 6px;
    position: absolute;
    top: 3px;
  }

:-ms-input-placeholder { /* IE 10+ */
 color:rgba(0,0,0,0.3);

}  
  .allPage {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

  }
.loginFrame{
  width: 30%;
  height: 61%;

  display: flex;
  justify-content:center;
  align-items: center;
  flex-direction: column;
}
.font{
  width: 20rem;
  color:rgba(0,0,0,0.3);
  margin-top: 1rem;
}
.loginForm{
  width: 100%;
  height: 78%;
 
  display: flex;
  justify-content:flex-start;
  align-items: flex-start;
  flex-direction: column;
}
.login_font{
    color: #409EFF;
    width: 8rem;
    height: 2.2rem;
    font-size: 1.2rem;
    /* margin-left: 3rem; */
    margin-top: 3rem;
    position: relative;
}
.line{
  height: 2px;
  background:  #409EFF;
  width: 8rem;
  position: absolute;
  left: 0;
  bottom: -0.5rem;
}
.input{
    width: 100%;
    height: 3.2rem;
    border: 1px solid rgba(0,0,0,0.3);
    position: relative;
    margin-top: 3rem;
}
.error{
position: absolute;
    bottom: -2rem;
    color: red;
    left: 0;
    font-size: 1.2rem;

}
.input img{
    position: absolute;
    left: 0.5rem;
    top: 0.7rem;
    width: 1.5rem;
    height: 1.5rem;
}

.input input{
      width: 92%;
    margin-left: 6%;
    height: 3rem;
    border: none;
    font-size: 1.2rem;
}
.input input:focus { 
outline: none;
}
/deep/ .el-checkbox__inner{
    width: 1.1rem;
    height: 1.1rem;
}
/deep/ .el-checkbox__label{
   font-size: 1.1rem;
}
.bottom_font{
  position: fixed;
  bottom: 3rem;
  color: rgba(0,0,0,0.3);
}
</style>
