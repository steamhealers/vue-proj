import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import home from '../components/Home/home.vue'
    import news from '../components/Home/News/news.vue'
        import newsDetail from '../components/Home/News/detile.vue'
    import share from '../components/Home/Share/share.vue'
        import shareDetail from '../components/Home/Share/sharedetail.vue'
    import buy from '../components/Home/Buy/buy.vue'
        import buyDetail from '../components/Home/Buy/buydetail.vue'
    import contack from '../components/Home/Contack/contack.vue'
    import video from '../components/Home/Videos/video.vue'
    import feedback from '../components/Home/Feedback/feedback.vue'
import cart from '../components/cart/cart.vue'
import member from '../components/member/member.vue'
import search from '../components/search/search.vue'


let router = new VueRouter({
    linkActiveClass: 'mui-active',
    routes: [
        {path: '/',redirect: '/home'},
        {path: '/home',meta:{title:'首页'},component: home},
        {path: '/member',meta:{title:'会员'},component: member},
        {path: '/cart',meta:{title:'购物车'},component: cart},
        {path: '/search',meta:{title:'搜索'},component: search},
        {path: '/news',meta:{title:'新闻咨询'},component: news},
        {path: '/share',meta:{title:'图片分享'},component: share},
        {path: '/buy',meta:{title:'商品购买'},component: buy},
        {path: '/contack',meta:{title:'留言反馈'},component: contack},
        {path: '/video',meta:{title:'视频专区'},component: video},
        {path: '/feedback',meta:{title:'联系我们'},component: feedback},
        {name:'newsDetail',meta:{title:'新闻详情'},path: '/news/:id',component: newsDetail , props:true},
        {name:'shareDetail',meta:{title:'图文详情'},path: '/share/:id',component: shareDetail , props:true},
        {name:'buyDetail',meta:{title:'商品详情'},path: '/buy/:id',component: buyDetail , props:true}
    ]
})

export default router