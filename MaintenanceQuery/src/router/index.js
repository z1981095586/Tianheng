import Vue from 'vue'
import Router from 'vue-router'
import select from '@/components/select'//查询
import  Maintenance_details from '@/components/Maintenance_details'//维保详情
import Component_consumption_details from  '@/components/Component_consumption_details'//部品消耗详情
import ToMaintenance_list from '@/components/ToMaintenance_list' //首页
import Maintenance_history from '@/components/Maintenance_history' //保养历史记录
import Maintenance_list from '@/components/Maintenance_list' //保养列表
import Maintenance_materials from '@/components/Maintenance_materials' //保养物料（增加）
import Maintenance from '@/components/Maintenance' //保养
import hello from '@/components/HelloWorld' 
import Maintenance_history_detail from '@/components/Maintenance_history_detail' //保养历史详情
import choose from '@/components/choose' //选择页面
import Axistrace from '@/components/Axistrace' //轴追溯
import repairHistory from '@/components/repairHistory' //维修记录
import repairHistoryDetail from '@/components/repairHistoryDetail' //维修记录
import chooseMachine from '@/components/chooseMachine' //多选机台
import check from '@/components/check' //检查
import checkHistory from '@/components/checkHistory' //检查历史
import checkHistoryDetail from '@/components/checkHistoryDetail' //检查历史详情
import selectStaff from '@/components/selectStaff'
Vue.use(Router)

export default new Router({
  routes: [
        {
      path: '/Axistrace/:beamName/:companyId',
      name: 'Axistrace',
      component: Axistrace
    },
    {
      path: '/',
      name: 'hello',
      component: hello,
   
    },
    {
      path: '/select/:machine_id/:company_id',
      name: 'select',
      component: select
    },
    {
      path: '/repairHistory/:company_id',
      name: 'repairHistory',
      component: repairHistory
    },
    {
      path: '/repairHistoryDetail/:company_id:/data',
      name: 'repairHistoryDetail',
      component: repairHistoryDetail
    },
    {
      path: '/selectStaff/:company_id',
      name: 'selectStaff',
      component: selectStaff
    },
    {
      path: '/chooseMachine/:company_id/:workshop_id/:operator/:flag/:maintain_type_id/:isClickIn',
      name: 'chooseMachine',
      component: chooseMachine
    },
    {
      path: '/Maintenance_details',
      name: 'Maintenance_details',
      component: Maintenance_details
    },
    {
      path: '/Maintenance_list/:company_id/:operator',
      name: 'Maintenance_list',
      component: Maintenance_list
    },
    {
      path: '/choose/:machine_id/:company_id/:operator/:staff_id/:mac_type_id/:days_to_expire/:workshop_id',
      name: 'choose',
      component: choose
    },
    {
      path: '/ToMaintenance_list/:company_id/:operator/:staff_id',
      name: 'ToMaintenance_list',
      component: ToMaintenance_list
    },
    {
      path: '/Maintenance_history/:company_id/:operator',
      name: 'Maintenance_history',
      component: Maintenance_history
    },
    {
      path: '/Maintenance_materials/:isThisApp/:company_id',
      name: 'Maintenance_materials',
      component: Maintenance_materials
    },
    {
      path: '/Maintenance/:company_id/:workshop_id/:operator/:flag/:maintain_type_id/:isClickIn',
      name: 'Maintenance',
      component: Maintenance
    },
    {
      path: '/Maintenance_history_detail',
      name: 'Maintenance_history_detail',
      component:Maintenance_history_detail 
    },
    {
      path: '/Component_consumption_details',
      name: 'Component_consumption_details',
      component: Component_consumption_details
    },
    {
      path: '/check/:company_id/:operator/:staff_id',
      name: 'check',
      component: check
    },
    {
      path: '/checkHistory/:company_id/:operator/:staff_id',
      name: 'checkHistory',
      component: checkHistory
    },
    {
      path: '/checkHistoryDetail/:company_id/:operator/:staff_id/:data',
      name: 'checkHistoryDetail',
      component: checkHistoryDetail
    },
  ]
})
