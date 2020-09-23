import Vue from 'vue'
import Router from 'vue-router'
import xj1Warper from '../components/xiangjia1/Warper'
import xj2Warper from '../components/xiangjia2/Warper'
import xj1sizing from '../components/xiangjia1/sizing'
import xj2sizing from '../components/xiangjia2/sizing'
import yb from '../components/xiangjia1/yanbu'
import yb2 from '../components/yijun/yanbu'
import czboardxj from '../components/xiangjia1/czboardxj'
import czboardyj from '../components/yijun/czboardyj'
Vue.use(Router);
　import VueParticles from 'vue-particles' 
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
export default new Router({
  base:'xjboard',
  routes: [
    {
      path: '/xj1/warp',
      name: 'xj1Warper',
      component: xj1Warper
    },
    {
      path: '/xj1/yb/:id/:workshop_id',
      name: 'yb',
      component: yb
    },
    {
      path: '/yj/yb/:id/:workshop_id',
      name: 'yb2',
      component: yb2
    },
    {
      path: '/xj2/warp',
      name: 'xj2Warper',
      component: xj2Warper
    },
    {
      path: '/xj1/sizing',
      name: 'xj1sizing',
      component: xj1sizing
    },
    {
      path: '/xj2/sizing',
      name: 'xj2sizing',
      component: xj2sizing
    },
    {
      path: '/xj1/czboard/:id',
      name: 'czboard',
      component: czboardxj
    },
    {
      path: '/yj/czboardyj/:id',
      name: 'czboardyj',
      component: czboardyj
    },
  ]
})
