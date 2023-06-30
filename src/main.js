import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import qs from 'qs';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

axios.defaults.withCredentials=true;

Vue.prototype.qs = qs;

Vue.use(ElementUI);
Vue.prototype.axios = axios;

Vue.config.productionTip = false


axios.defaults.withCredentials=true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
