import Vue from 'vue'
import Router from 'vue-router'

import czboard from '../components/czboard'
import czboardxj from '../components/czboardxj'
　　import VueParticles from 'vue-particles'  //粒子特效插件

　　Vue.use(VueParticles)
Vue.use(Router);

export default new Router({
  base:'qxboard',
  routes: [
    {
      path:"/:id",
      name:'czboard',
      component:czboard
    },  {
      path:"/xj/:id",
      name:'czboardxj',
      component:czboardxj
    },


  ]
})
