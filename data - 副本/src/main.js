import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import '../node_modules/echarts/map/js/china.js'
import scroll from 'vue-seamless-scroll'
import axios from 'axios'


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.use(scroll)
Vue.prototype.$axios=axios


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
