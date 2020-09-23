// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import VueRouter from 'vue-router'

import dataAnalyze from './components/dataAnalyze'
import productMonitor from './components/productMonitor'

import ElectricAirPressure from './components/ElectricAirPressure'
import Substation from './components/Substation'
// 引入echarts
import echarts from 'echarts'
// 引入音频文件
import Audio from './static/music/alarm.mp3'
//国际化
import VueI18n from 'vue-i18n'

Vue.use(VueI18n) ;
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(VueRouter);

// 方法1：注册播放音频事件到Vue实例上
Vue.prototype.playAudio = () => {
  let audio = document.getElementById('eventAudio');
  audio.setAttribute('src',Audio);
  audio.load();
  let playPromise = audio.play();
  if(playPromise !== undefined){
    playPromise.then(()=>{
      audio.play();
    }).catch(()=>{
      audio.play();
    })
  }
};
//配置国际化
const i18n = new VueI18n({
  locale: 'zh-CN',    // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale
  messages: {
    'zh-CN': require('./common/lang/zh'),   // 中文语言包
    'en-US': require('./common/lang/en')    // 英文语言包
  }
});
//配置路由
const router = new VueRouter({
  routes:[
    {path:"/dataAnalyze/:id",component:dataAnalyze},
    {path:"/productMonitor/:id",component:productMonitor},

    {path:"/ElectricAirPressure/:id",component:ElectricAirPressure},
    {path:"/Substation/:id",component:Substation},

  ],

  //去掉#
  // mode:"history"
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>'
});

