<template>
  <div class="mui-content">
        <div class="title">
            <h4>{{info.title}}</h4>
            <span>{{info.add_time|formatDate('YYYY-MM-DD')}}</span> &nbsp;&nbsp;&nbsp;&nbsp; <span>点击次数:{{info.click}}</span>
        </div>

        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" v-for="(item,index) in imglist" :key="index">
                <a href="#">
               <img class="preview-img"  :src="item.src" height="100" @click="$preview.open(index, imglist)">
               </a>
            </li>
        </ul>  

        <p class="content" v-html="info.content">
          <!-- {{info.content}} -->
        </p>
        <comment></comment>
        <!-- 评论--> 
    </div>
</template>

<script>
//导出组件
import Vue from 'vue'
import VuePreview from "vue-preview";
Vue.use(VuePreview);
import comment from "../../Subcomp/comment.vue";
export default {
  data() {
    return {
      info: {},
      imglist: []
    };
  },
  components: {
    comment
  },
  props: ["id"],
  created() {
    this.getimageInfo();
    this.getthumimages();
  },
  methods: {
    getimageInfo() {
      this.$http
        .get("getimageInfo/" + this.id)
        .then(res => {
          if (res.status === 200 && res.data.status === 0) {
            // console.log(res);
            if (res.data.message.length > 0) {
              this.info = res.data.message[0];
            }
          } else {
            console.log("服务器错误");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getthumimages() {
      this.$http
        .get("getthumimages/" + this.id)
        .then(res => {
          if (res.status === 200 && res.data.status === 0) {
            // console.log(res);
            this.imglist = res.data.message;
            this.imglist.forEach(item => {
              item.h=400,
              item.w=600
            });
            
          } else {
            console.log("服务器错误");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.mui-content {
  background-color: #fff;
}
.title {
  margin: 15px 5px;
}

.title h4 {
  color: dodgerblue;
}

.title span {
  font-size: 13px;
  color: rgba(92, 92, 92, 0.6);
}
/*9宫格样式*/

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border-left: 0px;
}

.mui-table-view-cell img {
  height: 100px;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border-right: 0px;
  border-bottom: 0px;
  padding: 0;
  margin: 0;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell > a:not(.mui-btn) {
  padding: 0;
}
</style>
