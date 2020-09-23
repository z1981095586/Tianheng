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
// 　　import VueParticles from 'vue-particles'  //粒子特效插件

import Warper3_6 from '../components/wz2q/Warper3_6'
import Warper7_10 from '../components/wz2q/Warper7_10'
import Warper1 from '../components/wz3q/Warper1'
import Sizing1 from '../components/wz3q/Sizing1'
import wk5Warper1 from '../components/jem/Warper1'
import wk5Warper2 from '../components/jem/Warper2'
import wk5Sizing1 from '../components/jem/Sizing1'
import wk5Sizing2 from '../components/jem/Sizing2'
import wk2Warper1 from '../components/wz2q/Warper1'
import wk2Warper2 from '../components/wz2q/Warper2'
import wk2Warper3 from '../components/wz2q/Warper3'
import Sizing1_4 from '../components/wz2q/Sizing1_4'
import Sizing5_6 from '../components/wz2q/Sizing5_6'
import EfficiencyCompare from '../components/EffciencyCompare'


// 　　Vue.use(VueParticles)
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
    {
      path:"/tv/warp2/3_6",
      name:'Warper3_6',
      component:Warper3_6
    },
    {
      path:"/tv/warp2/7_10",
      name:'Warper7_10',
      component:Warper7_10
    },
    {
      path:"/tv/warp2/1",
      name:'wk2Warper1',
      component:wk2Warper1
    },
    {
      path:"/tv/warp2/2",
      name:'wk2Warper2',
      component:wk2Warper2
    },
    {
      path:"/tv/warp2/3",
      name:'wk2Warper3',
      component:wk2Warper3
    },
    {
      path:"/tv/warp3/1",
      name:'Warper1',
      component:Warper1
    },
    {
      path:"/tv/Sizing3/1",
      name:'Sizing1',
      component:Sizing1
    },
    {
      path:"/tv/sizing2/1_4",
      name:'Sizing1_4',
      component:Sizing1_4
    },
    {
      path:"/tv/sizing2/5_6",
      name:'Sizing5_6',
      component:Sizing5_6
    },
    {
      path:"/tv/warp5/1",
      name:'wk5Warper1',
      component:wk5Warper1
    },
    {
      path:"/tv/warp5/2",
      name:'wk5Warper2',
      component:wk5Warper2
    },
    {
      path:"/tv/sizing5/1",
      name:'wk5Sizing1',
      component:wk5Sizing1
    },
    {
      path:"/tv/sizing5/2",
      name:'wk5Sizing2',
      component:wk5Sizing2
    },
    {
      path:"/tv/compare/1",
      name:'EfficiencyCompare',
      component:EfficiencyCompare

    },
  ]
})
