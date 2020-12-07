// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Print from 'vue-print-nb'
import Echarts from 'echarts'
import store from './store';

import "./commonFuncs.js"
Vue.prototype.echarts = Echarts;
Vue.use(Echarts);

//******************覆盖样式，具体参照WEB UI说明****************
import './../static/css/override_button.css'//按钮
import './../static/css/font.css'//字体
import './../static/css/input.css'//输入框
import './../static/css/select.css'//选择
import './../static/css/border.css'//边框
import './../static/css/button.css'//按钮
import './../static/css/loading.css'//加载
//**************************************************************
import preventReClick from './preventClick'
Vue.use(preventReClick)
Vue.config.productionTip = false;
//注册
Vue.use(iView);
Vue.use(ElementUI);
Vue.use(Print);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
