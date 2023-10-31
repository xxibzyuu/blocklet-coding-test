/*
 * @Description:
 * @Author: yuanzeyu
 * @Date: 2023-10-30 16:11:31
 * @LastEditTime: 2023-10-31 14:10:45
 */
import Vue from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import axios from './utils/request';
import NProgress from 'nprogress'

import 'ant-design-vue/dist/antd.css';
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.prototype.$axios = axios;
Vue.prototype.$NProgress = NProgress

new Vue({
  render: (h) => h(App),
}).$mount('#app');
