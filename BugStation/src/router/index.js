import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'

import addItem from '@/components/addItem'
import itemDetail from '@/components/itemDetail'
import itemList from '@/components/itemList'

import introduce from '@/components/introduce'
import contactUs from '@/components/contactUs'
import content from '@/components/content'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: '/index/addItem',
          name: 'addItem',
          component: addItem
        },
        {
          path: '/index/itemDetail',
          name: 'itemDetail',
          component: itemDetail
        },
        {
          path: '/index/itemList',
          name: 'itemList',
          component: itemList
        },
        {
          path: '/index/addItem',
          name: 'addItem',
          component: addItem
        },
        {
          path: '/index/introduce',
          name: 'introduce',
          component: introduce
        },
        {
          path: '/index/contactUs',
          name: 'contactUs',
          component: contactUs
        },
        {
          path: '/index/content',
          name: 'content',
          component: content
        },
      ]

    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
  
   
   
  ]
})
