import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import 'expose-loader?$!expose-loader?jQuery!jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/common.css';

import cmnModule from './service/cmn_module';

if (!process.env.IS_WEB) {
    Vue.use(require('vue-electron'))
}
Vue.prototype.$cmnModule = cmnModule;
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    components: {App},
    router,
    store,
    template: '<App/>'
}).$mount('#app')
