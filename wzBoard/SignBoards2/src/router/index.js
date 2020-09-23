import Vue from 'vue'
import Router from 'vue-router'
import Content from '../components/Content'
import board from '../components/board'
import board2 from '../components/board2'
import board3 from '../components/board3'
import board4 from '../components/board4'
import ybBoard from '../components/ybBoard'
import ybBoard2 from '../components/ybBoard2'
import ybBoard3 from '../components/ybBoard3'
import ziluoji from '../components/ziluoji'
import allboard from '../components/allboard'
import xisha from '../components/xisha'
import cusha from '../components/cusha'
　　import VueParticles from 'vue-particles'  //粒子特效插件

　　Vue.use(VueParticles)
Vue.use(Router);

export default new Router({
  base:'wzboard',
  routes: [
    {
      path:"/:id",
      name:'Content',
      component:Content
    },
    {
      path:"/board/:id",
      name:'board',
      component:board
    },
    {
      path:"/board2/:id",
      name:'board2',
      component:board2
    },
    {
      path:"/board3/:id",
      name:'board3',
      component:board3
    },
    {
      path:"/board4/:id",
      name:'board4',
      component:board4
    },
    {
      path:"/ybBoard/:id",
      name:'ybBoard',
      component:ybBoard
    },
    {
      path:"/ybBoard2/:id",
      name:'ybBoard2',
      component:ybBoard2
    },
    {
      path:"/ybBoard3/:id",
      name:'ybBoard3',
      component:ybBoard3
    },
    {
      path:"/ziluoji/:id",
      name:'ziluoji',
      component:ziluoji
    },
    {
      path:"/allboard/:id",
      name:'allboard',
      component:allboard
    },
    {
      path:"/xisha/:id",
      name:'xisha',
      component:xisha
    },
    {
      path:"/cusha/:id",
      name:'cusha',
      component:cusha
    },
  ]
})
