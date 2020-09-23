// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import VueRouter from 'vue-router'


import productMonitor from './components/productMonitor'
import zj from './components/zj'
import js from './components/js'
import yb from './components/yb'
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
    {path:"/productMonitor/:id",name:"productMonitor",component:productMonitor},
    {path:"/zj/:id/:workshop",name:"zj",component:zj},
    {path:"/js/:id/:workshop",name:"js",component:js},
    {path:"/yb/:id/:workshop",name:"yb",component:yb},
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

