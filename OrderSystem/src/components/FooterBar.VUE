<template>
  <div id="tab-bar">
    <mt-tabbar v-model="selected" v-show="isShow" fixed class="border-1px-top">
      <mt-tab-item id="index"  >
        <img :src="img1" slot="icon">首页 
      </mt-tab-item>
      <mt-tab-item id="ShoppingCart">
        <img :src="img3" slot="icon">购物车
      </mt-tab-item>

      <mt-tab-item id="my">
        <img :src="img5" slot="icon">我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<style scoped>
/deep/.mint-tab-item.is-selected{
  color:red;
}
 /deep/ .mint-tabbar.is-fixed {
  z-index:9999;
}
  /deep/ .mint-tabbar > .mint-tab-item.is-selected{
    background: #fafafa;
  }
</style>
<script>
  export default {
      name:"FooterBar",
      
    data(){
      return {
        selected: 'index',
        img1: require('@/images/index_selected.png'),
        img3:  require('@/images/car.png'),
        img5:  require('@/images/my.png')
      }
    },

  props: ['select'],
    computed: {
      isShow: function () {
        return true;
      }
    },
    watch: {
      'selected': {
        handler(){
          if (this.selected == "index") {
            this.$router.push('/index');
            this.img1 = require('@/images/index_selected.png')
          } else {
            this.img1 = require('@/images/index.png')
          }
          if (this.selected == "ShoppingCart") {
            this.$router.push('/ShoppingCart');
            this.img3 =  require('@/images/car_selected.png')
          } else {
            this.img3 =  require('@/images/car.png')
          }
     
          if (this.selected == "my") {
            this.$router.push('/my')
            this.img5 =  require('@/images/my_selected.png');
          } else {
            this.img5 =  require('@/images/my.png');
          }
        }
      },
          'select': {
        handler(){
   console.log(this.select)
   this.selected=this.select
        }
      },
      
    }
  }
</script>