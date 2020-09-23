<template>
  <div class="content">
    <div class="head">
    <div class="user">
    <div> <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="50"></el-avatar></div>
        <div class="name" style="margin-top:10px;"> <span >等待</span></div>
    </div>
      <div class="my_order">
    <div class="order_content">
    <div class="order_head"><span>我的订单</span></div>
       <div class="order_line"><div class="lines"></div></div>
       <div class="menu">
       <div class="one_menu" v-for="(item,index) in tabList" :key="index" @click="toOrder(item.label)"><i class="el-icon-s-order"></i><span>{{item.label}}</span></div>
      
           
       </div>
    </div>
    </div>
    </div>
    <div class="my_order2">
    <div class="order_content">
    <div class="order_head"><span>常用服务</span></div>
       <div class="order_line"><div class="lines"></div></div>
       <div class="menu">
       <div class="one_menu"><i class="el-icon-s-order"></i><span>拼团购</span></div>
        <div class="one_menu"><i class="el-icon-bank-card"></i><span>优惠券</span></div>
         <div class="one_menu" @click="toAddress"><i class="el-icon-truck"></i><span>收货地址</span></div>
          <div class="one_menu"><i class="el-icon-money"></i><span>收藏</span></div>
          
           
       </div>
            <div class="menu">
       <div class="one_menu"><i class="el-icon-s-order"></i><span>拼团购</span></div>
        <div class="one_menu"><i class="el-icon-bank-card"></i><span>优惠券</span></div>
         <div class="one_menu"><i class="el-icon-truck"></i><span>我的奖品</span></div>
          <div class="one_menu"><i class="el-icon-money"></i><span>收藏</span></div>
          
           
       </div>
    </div>
    </div>
<div class="bottom"><span>———————  感谢使用  ———————</span></div>
  </div>

</template>

<script>
  export default {
       name:"my",
  data: () => ({
      tabList: [{
          id: 0,
          label: "全部",
         
        },
        {
          id: 1,
          label: "待付款",
      
        },
        {
          id: 2,
          label: "待收货",
     
        },
        {
          id: 3,
          label: "退款/售后",
         
        },
        {
          id: 4,
          label: "待评价",
   
        },

      ],
    

  }),
    methods: {
      toAddress(){
                this.$router.push({
             path:"/my/address",
             name:"address",
         params:{
           lastPath:"/my"
         }
         }) 
      },
    toOrder(tabName){
        console.log(tabName)
         this.$router.push({
             path:"/order",
             name:"order",
             params:{
                tabName:tabName
             }
         })
    }
   
    },
    mounted() {
 
 
    }
  }

</script>

<style scoped>

  .content {
    width: 100%;
    height: 100vh;
        background-color: rgba(245, 245, 245, 1);
  }
   /* 头部 */
.head{
    width: 100%;
    height: 158px;
    background: red;
    border-radius:0 0 95% 95%;
    display: flex;
    justify-content: center;
    align-items:flex-start;
     background: -webkit-linear-gradient(rgba(255,0,0,0.8), rgba(255,0,0,0.5));
     position: relative;
}
.user{
    margin-top: 15px;
    width: 250px;
    height: 100px;
    display: flex;
    flex-direction: column;
  
    font-size: 13px;
    color: white;
    font-weight: 600;
      
}
.name{
    width: 100%;
   white-space:nowrap;

overflow:hidden;

text-overflow:ellipsis;
}
/* 头部 */
/* 订单 */
.my_order{
    position: absolute;
    top: 115px;
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.order_content{
    width: 85%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 12px;
     z-index:999;
}
.order_head{
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
}
.order_head span{
    margin-left: 25px;
    font-size: 14px;
}
.order_line{
       width: 100%;
        margin-top: 8px;
       height: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.lines{
    width: 90%;
    height: 1px;
    background: rgba(172, 151, 151, 0.5);
}
.menu{
       width: 100%;
        margin-top: 8px;
       height: 66px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.one_menu{
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.one_menu i{
    width: 100%;
    height: 45%;
    font-size: 26px;
    color: red;

}
.one_menu span{
    width: 100%;
    height: 45%;
   font-size: 12px;
}
/* 订单 */
/* 常用服务 */
.my_order2{
   margin-top: 120px;
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
}
/* 常用服务 */
.bottom{
    width: 100%;
    position: fixed;
    bottom: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    color: rgba(0,0,0,0.5);
}
</style>
