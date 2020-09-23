import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index/index'//首页
import search from '@/pages/index/search'//搜素页面
import good_Detail from '@/pages/index/good_Detail'//商品详情页面
import sureOrder from '@/pages/index/sureOrder'//确认订单
import ShoppingCart from '@/pages/car/ShoppingCart'//购物车
import my from '@/pages/my/my'//我的
import order from "@/pages/my/order/order"//订单列表
import address from "@/pages/my/address/address"//我的地址
import add_address from "@/pages/my/address/add_address"//添加地址
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({

  routes: [
    {
      path: '/index',
      component:index,
      name:"index",
  
    },
    {
      path: '/index/search',
      component:search,
      name:"search",
  
    },
    {
      path: '/index/good_Detail',
      component:good_Detail,
      name:"good_Detail",
  
    },
    {
      path: '/index/sureOrder',
      component:sureOrder,
      name:"sureOrder",
  
    },
    {
      path: '/ShoppingCart',
      name: 'ShoppingCart',
      component: ShoppingCart,
  
    } ,
   
    {
      path: '/my',
      name: 'my',
      component: my,

    },
    {
      path: '/my/address',
      name: 'address',
      component: address,

    },
    {
      path: '/my/address/add_address',
      name: 'add_address',
      component: add_address,

    },
    {
      path: '/order',
      name: 'order',
      component: order,

    },
    {
      path: '/',
      redirect: '/index' 
    
 
    },
  ]
})
