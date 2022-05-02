import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'animate.css';
import "./styles/index.scss"
import 'vant/lib/index.css';

import { Toast, Slider } from 'vant';

Vue.use(Toast);
Vue.use(Slider);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
