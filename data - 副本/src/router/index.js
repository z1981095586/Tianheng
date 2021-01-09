import Vue from 'vue'
import VueRouter from 'vue-router'
import temper from '../components/centerdata.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/centerdata',
    name: 'centerdata',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/centerdata.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router
