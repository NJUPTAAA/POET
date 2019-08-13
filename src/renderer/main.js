import Vue from 'vue';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';

import './lib/MDI-WXSS/MDI.css';
import './lib/bootstrap-material-design/bootstrap-material-design.min.css';
import './lib/animate/animate.min.css';
import './lib/WeMD/wemd-color-scheme.css';
import './assets/fonts/raleway.css';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
