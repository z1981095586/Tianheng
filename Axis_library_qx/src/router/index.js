import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index/index'
import stockIn from '@/views/stockIn/stockIn'
import stockOut from '@/views/stockOut/stockOut'
import peopleIn from '@/views/peopleIn/peopleIn'
import people from '@/views/people/people'
import VueTouchKeyboard from "vue-touch-keyboard";//底部键盘
import style from "vue-touch-keyboard/dist/vue-touch-keyboard.css";
 Vue.use(VueTouchKeyboard);


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index/:companyId/:library_num',
      name: 'index',
      component: index
    },
    {
      path: '/stockIn',
      name: 'stockIn',
      component: stockIn
    },
    {
      path: '/stockOut',
      name: 'stockOut',
      component: stockOut
    },
    {
      path: '/people',
      name: 'people',
      component: people
    },
    {
      path: '/peopleIn',
      name: 'peopleIn',
      component: peopleIn
    },
  
  ]
})
