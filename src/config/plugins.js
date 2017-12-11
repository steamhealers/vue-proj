import Vue from 'vue'
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'
import { Lazyload } from 'mint-ui';
import { Loadmore } from "mint-ui";
import '../../statics/css/mui.css'

import axios from 'axios'
axios.defaults.baseURL='http://60.205.213.93:8899/api/'
Vue.prototype.$http=axios
Vue.prototype.axios=axios


Vue.prototype.$Indicator=Indicator
Vue.prototype.$Toast=Toast

Vue.component(Loadmore.name, Loadmore);
Vue.use(Lazyload)