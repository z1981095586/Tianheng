import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import keyboard from '@/components/keyboard'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:workshopId',
      name: 'index',
      component: index
    },
    {
      path: '/keyboard',
      name: 'keyboard',
      component: keyboard
    },
  ]
})
