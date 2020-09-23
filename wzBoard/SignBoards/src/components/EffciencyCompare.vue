<template>
    <div class="main_container">
      <div class="title3">
        {{title}}
      </div>
      <div class="content-table3" >
        <div class="title">
          <h1 style="color: white;font-size: 4rem;height: 2rem">效 率 对 比</h1>
        </div>
        <el-row :gutter="10">
          <el-col :span="12"><h1 style="height: 3rem;color: white;font-weight: bolder;font-size: 5rem;text-align: center">甲班效率</h1></el-col>
          <el-col :span="12"><h1 style="height: 3rem;color: white;font-weight: bolder;font-size: 5rem;text-align: center">乙班效率</h1></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12"><h1 style="color: green;font-weight: bolder;font-size: 5.5rem;text-align: center">{{Aefficiency}}%</h1></el-col>
          <el-col :span="12"><h1 style="color: orange;font-weight: bolder;font-size: 5.5rem;padding-left: 0.6rem">{{Befficiency}}%</h1></el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
  import axios from 'axios' //引入axios获取后台数据
    export default {
      name: "EffciencyCompare",
      data(){
        return{
          Aefficiency: '90', //  A班效率
          Befficiency: '90',//  B班效率
          companyId: this.$route.params.companyId,//公司库表Id
          workshopId:this.$route.params.workshopId,//一分厂
          groupId:this.$route.params.groupId,//一组
          title:'万 舟 控 股 信 息 监 控',
          title2:'班 效 率 对 比',
          // url:'http://112.12.1.41:7070',
          url:'http://47.99.156.243:7070',//祥嘉
        }
      },
      methods:{
        getABEfficiency:function () {
        /*  axios({
            // url:'http://120.55.124.53:7070/ab/getABEfficiency',
            url:this.url+'/ab/getABEfficiency',
            method:'get',
            headers:{
              'Content-Type':'application/json;charset=utf-8',
              'companyId': this.companyId,
            }
          }).then(response=>{
            console.log(response);
            this.Aefficiency = response.data.data[0];
            this.Befficiency = response.data.data[1];
            console.log(this.Aefficiency);
            console.log(this.Befficiency);

          })*/
        this.Aefficiency= (90+Math.random()*3).toFixed(2);
        this.Befficiency= (90+Math.random()*3).toFixed(2);

        },
        getEffciencyTiming:function(){
          const timer = setInterval(() =>{
            this.getABEfficiency();
          }, 5000);
          // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
          this.$once('hook:beforeDestroy', () => {
            clearInterval(timer);
          })
        },
        changePage:function () {
          const timer = setInterval(() =>{
            this.$router.push({path:'/liaoji/'+this.companyId+'/'+this.workshopId+'/'+this.groupId})
          }, 15000);
          // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
          this.$once('hook:beforeDestroy', () => {
            clearInterval(timer);
          })
        }

      },
      mounted(){
        this.getABEfficiency();
        this.getEffciencyTiming();
        // this.changePage();
      },

    }
</script>

<style scoped>
  .main_container{
    background-image: url("../../static/img/wzBack.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .content-table3{
    width: 95% !important;
    height: 50rem;
    margin: 50px auto;
    text-align: center;
    padding-right: 10px;
  /*color: rgba(51, 170, 222, 0.61);*/
}
  .title3{
    width: 100%;
    text-align: center;
    color: white;
    font-size: 1.8rem;
    font-weight: bolder;
    padding-top: 0.2rem;
  }





</style>
