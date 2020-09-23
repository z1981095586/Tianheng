// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui';
import store from './store';
import { Tabbar, TabItem } from 'mint-ui';
Vue.use(MintUI)

Vue.use(ElementUI);
Vue.config.productionTip = false


Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
