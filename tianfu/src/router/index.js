import Vue from 'vue'
import Router from 'vue-router'
import warpModuleIndex from '@/components/warpModuleIndex'
import warpIndex2 from '@/components/xhWorkPlace/warpModuleIndexOld'
import sizingModuleIndex from '@/components/sizingModuleIndex'
import sizingModuleIndexTest from '@/components/sizingModuleIndexTest'
import index from '@/components/xhWorkPlace/index'
import warpIndex from '@/components/xhWorkPlace/warpModuleIndex'
import addWarpProcess from '@/components/addWarpProcess'
import module from '@/components/xhWorkPlace/pdfViewer'
import warpProcessSearch from '@/components/warpProcessSearch'
import addSizingProcess from '@/components/addSizingProcess'
import wearahealdListModuleIndex from '@/components/xhWorkPlace/wearahealdListModuleIndex'
import wearahealdListModuleIndexOld from '@/components/xhWorkPlace/wearahealdListModuleIndex2'
import testPage from '@/components/xhWorkPlace/warpSetAxle'
import platform from '@/components/platform/platformIndex'
import wzPlatform from '@/components/platform/wzPlatformIndex'
import produceIndex from '@/components/xhWorkPlace/produceIndex'
import putUpAxis from '@/components/xhWorkPlace/putUpAxis/putUpAxisIndex'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'warpModuleIndex',
      component: warpModuleIndex
      //整经打卡
    },
    {
      path: '/warpIndex2/:params',
      name: 'warpIndex2',
      component: warpIndex2
      //整经打卡
    },
    {
      path: '/0',
      name: 'sizingModuleIndex',
      component: sizingModuleIndex
      //浆纱打卡
    },{
      path: '/1',
      name: 'addWarpProcess',
      component: addWarpProcess
      //整经新增
    },{
      path: '/2',
      name: 'addSizingProcess',
      component: addSizingProcess
      //浆纱新增
    },{
      path: '/3',
      name: 'warpProcessSearch',
      component: warpProcessSearch
      //整经查询
    },{
      path: '/wearahealdListModuleIndex/:params',
      name: 'wearahealdListModuleIndex',
      component: wearahealdListModuleIndex
      //穿棕打卡
    },{
      path: '/wearahealdListModuleIndex2/:params',
      name: 'wearahealdListModuleIndex',
      component: wearahealdListModuleIndexOld
      //穿棕打卡2
    },{
      path: '/test',
      name: 'module',
      component: module
      // 测试页面
    },{
      path: '/index/:params',
      name: 'index',
      component: index
    },{
      path: '/warpIndex/:params',
      name: 'warpIndex',
      component: warpIndex
    },{
      path: '/testPage',
      name: 'testPage',
      component: testPage
    },{
      path: '/test0',
      name: 'sizingModuleIndexTest',
      component: sizingModuleIndexTest
      //浆纱打卡
    },
    {
      path: '/platform',
      name: 'platform',
      component: platform
      //浆纱打卡
    },
    {
      path: '/Platform/:params',
      name: 'wzPlatform',
      component: wzPlatform
      //万舟平台
    },
    {
      path: '/produceIndex/:params',
      name: 'produceIndex',
      component: produceIndex
      //织造
    },
    {
      path: '/putUpAxis/:params',
      name: 'putUpAxis',
      component: putUpAxis
      //织机上轴
    }
  ]
})
