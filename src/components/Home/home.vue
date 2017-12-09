<template>
  <div class="mui-content">
    <slide></slide>

    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" :style="color" v-for="(item,index) in menus" :key="index">
        <router-link :to="item.url">
          <span class="mui-icon" :class="item.className"></span>
          <div class="mui-media-body">{{item.title}}</div>
        </router-link>
      </li>
    </ul>
  </div>


</template>

<script>
  import common from '../Common/config'
  import slide from '../Subcomp/slider.vue'

  export default {

    data() {
      return {
        menus: [],
        color:'background:#fff'
      }
    },
    components: {
      slide
    },
    created() {
        this.getmenus()
    },
    methods: {
      getmenus: function () {
        this.menus = {
          "status": 0,
          "message": [{
            "title": "新闻资讯",
            "url": "/news",
            "className": "icon-news"
          }, {
            "title": "图片分享",
            "url": "/share",
            "className": "icon-share"
          }, {
            "title": "商品购买",
            "url": "/buy",
            "className": "icon-buy"
          }, {
            "title": "留言反馈",
            "url": "/feedback",
            "className": "icon-feedback"
          }, {
            "title": "视频专区",
            "url": "/video",
            "className": "icon-video"
          }, {
            "title": "联系我们",
            "url": "/contact",
            "className": "icon-contact"
          }]
        }.message
      }
    }

  }
</script>

<style scoped>

.mui-icon{
  height: 40px;
  width: 40px;
  background-repeat: round;
}

.icon-news{
  background-image: url('../../../statics/images/menu1.png');
}
.icon-share{
  background-image: url('../../../statics/images/menu2.png');
}
.icon-buy{
  background-image: url('../../../statics/images/menu3.png');
}
.icon-feedback{
  background-image: url('../../../statics/images/menu4.png');
}
.icon-video{
  background-image: url('../../../statics/images/menu5.png');
}
.icon-contact{
  background-image: url('../../../statics/images/menu6.png');
}

</style>