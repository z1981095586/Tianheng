import Vue from 'vue'
import Router from 'vue-router'
import Warper from '../components/xinhai1/Warper'
import xinhai2Warper from '../components/xinhai2/Warper'
import xinlangWarper from '../components/xinlang/xinlangWarper'
import xinlangWarper2 from '../components/xinlang/xinlangWarper2'
import xinlangSizing from '../components/xinlang/xinlangSizing'
import ciyuanWarper from '../components/ciyuan/ciyuanWarper'
import ciyuanWarper2 from '../components/ciyuan/ciyuanWarper2'
import Warper2 from '../components/xinhai1/Warper2'
import xinhai2Warper2 from '../components/xinhai2/Warper2'
import SlittingWarper from '../components/xinhai1/SlittingWarper'
import xinhai2SlittingWarper from '../components/xinhai2/SlittingWarper'
import sizing from '../components/xinhai1/sizing'
import xinhai2sizing from '../components/xinhai2/sizing'
import ciyuanSizing from '../components/ciyuan/ciyuanSizing'
import xinlangboard from '../components/xinlang/board'
import ciyuanboard from '../components/ciyuan/board'
Vue.use(Router);

export default new Router({
  base:'xhboard',
  routes: [
    {
      path: '/12',
      name: 'Warper',
      component: Warper
    },
    {
      path: '/xinhai2/12',
      name: 'xinhai2Warper',
      component: xinhai2Warper
    },
    {
      path: '/34',
      name: 'Warper2',
      component: Warper2
    },
    {
      path: '/xinhai2/34',
      name: 'xinhai2Warper2',
      component: xinhai2Warper2
    },
    {
      path: '/34',
      name: 'xinhai2Warper2',
      component: xinhai2Warper2
    },
    {
      path: '/xinlang/34',
      name: 'xinlangWarper',
      component: xinlangWarper
    },
    {
      path: '/xinlang/56',
      name: 'xinlangWarper2',
      component: xinlangWarper2
    },
    {
      path: '/xinlang/sizing',
      name: 'xinlangSizing',
      component: xinlangSizing
    },   {
      path: '/xinlang/board/:id',
      name: 'xinlangboard',
      component: xinlangboard
    },
    {
      path: '/ciyuan/34',
      name: 'ciyuanWarper',
      component: ciyuanWarper
    },
    {
      path: '/ciyuan/56',
      name: 'ciyuanWarper2',
      component: ciyuanWarper2
    },
    {
      path: '/ciyuan/board/:id',
      name: 'ciyuanboard',
      component: ciyuanboard
    },
    {
      path: '/slitting',
      name: 'SlittingWarper',
      component: SlittingWarper
    },
    {
      path: '/sizing',
      name: 'sizing',
      component: sizing
    },
    {
      path: '/xinhai2/sizing',
      name: 'xinhai2sizing',
      component: xinhai2sizing
    },
    {
      path: '/ciyuan/sizing',
      name: 'ciyuanSizing',
      component: ciyuanSizing
    },

  ]
})
