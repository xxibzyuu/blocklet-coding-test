/*
 * @Description:
 * @Author: yuanzeyu
 * @Date: 2023-10-30 16:11:31
 * @LastEditTime: 2023-10-31 13:37:58
 */
import Vue from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import axios from 'axios';

import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.prototype.$axios = axios;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
