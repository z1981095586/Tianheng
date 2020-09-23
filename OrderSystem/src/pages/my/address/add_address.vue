<template>
  <div class="content">
    <div class="head">
      <i class="el-icon-arrow-left" @click="back"></i>
      <span>新增地址</span>
    </div>

    <div class="address_info">
      <div class="info">
        <span>联系人：</span>
        <el-input style="width:80%;border:none" v-model="contactName" placeholder="请输入内容"></el-input>
      </div>
      <div class="info2"><span>电话：</span>
        <el-input style="width:80%;border:none" v-model="contactPhone" placeholder="请输入内容"></el-input>
      </div>
      <div class="info2"><span>地址：</span>
        <el-input style="width:80%;border:none" v-model="contactAddress" placeholder="请输入内容"></el-input>
      </div>
      <div class="info2"><span>详细地址：</span>
        <el-input style="width:80%;border:none" v-model="contactDetailAddress" placeholder="请输入内容"></el-input>
      </div>
      <div class="address_surebtn">
        <div class="sure_btn"><span>确定</span></div>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    name: "add_address",
    data: () => ({
contactDetailAddress:'',
contactName:"",
contactPhone:"",
contactAddress:""
    }),
    methods: {
      back() {
        console.log(this.$router.history.current.params.lastPath)
           if(this.$router.history.current.params.lastPath2){
              this.$router.push({
                path:"/my/address",
                name:"address",
                params:{
                  lastPath2:this.$router.history.current.params.lastPath2
                }
              })
          }else if(this.$router.history.current.params.lastPath){
       this.$router.push({ path:"/my/address",
                name:"address",
                params:{
                  lastPath:this.$router.history.current.params.lastPath
                }
          })
          }
     
      },


    },
    mounted() {
console.log(this.$router)

    },

  }

</script>

<style scoped>
  .content {
    width: 100%;
    height: 100vh;
    background: rgb(247, 248, 250);
  }

  /* 头部 */
  .head {
    width: 100%;
    height: 40px;
    color: rgba(0, 0, 0, 1);
    font-size: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    position: relative;
    border-bottom: 1.8px solid rgba(0, 0, 0, 0.028);
    z-index: 999;
    position: fixed;
    top: 0;
  }

  .head i {
    position: absolute;
    left: 15px;
  }



  /* 头部 */
  .address_info {
    width: 100%;
    height: 500px;
    background: rgb(247, 248, 250);
    display: flex;
    flex-direction: column;
  }

  .info {
    margin-top: 60px;
    width: 100%;
    height: 60px;
    background: white;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .info span {
    margin-left: 10px;
    font-size: 13px;
     width: 22%;
  }

  .info2 {
    width: 100%;
    height: 60px;
    background: white;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .info2 span {
    margin-left: 10px;
    font-size: 13px;
    width: 22%;
  }

  .address_surebtn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sure_btn {
    width: 75%;
    height: 100%;
    background: rgb(76, 217, 106);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }

  /deep/ .el-input__inner {
    border: none;
  }

</style>
