import Vue from 'vue'
import moment from 'moment'
import app from './app.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
axios.defaults.baseURL='http://60.205.213.93:8080/api/'
Vue.prototype.$http=axios

Vue.use(VueRouter)

import home from './components/Home/home.vue'
    import news from './components/Home/News/news.vue'
        import newsDetail from './components/Home/News/detile.vue'
    import share from './components/Home/Share/share.vue'
    import buy from './components/Home/Buy/buy.vue'
    import contack from './components/Home/Contack/contack.vue'
    import video from './components/Home/Videos/video.vue'
    import feedback from './components/Home/Feedback/feedback.vue'
import cart from './components/cart/cart.vue'
import member from './components/member/member.vue'
import search from './components/search/search.vue'


let router = new VueRouter({
    linkActiveClass: 'mui-active',
    routes: [
        {path: '/',redirect: '/home'},
        {path: '/home',component: home},
        {path: '/member',component: member},
        {path: '/cart',component: cart},
        {path: '/search',component: search},
        {path: '/news',component: news},
        {path: '/share',component: share},
        {path: '/buy',component: buy},
        {path: '/contack',component: contack},
        {path: '/video',component: video},
        {path: '/feedback',component: feedback},
        {name:'newsDetail',path: '/news/:id',component: newsDetail , props:true}
    ]
})


import '../statics/css/mui.css'



let vm = new Vue({
    el: '#app',
    router,
    render: c => c(app),
    dev:{

    }
})