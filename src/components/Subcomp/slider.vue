<template>
    <mt-swipe :auto="1000">
        <mt-swipe-item v-for="(item,index) in imglist" :key="index">
            <a :href="item.url">
                <img :src="item.img" alt="">
            </a>
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
import Vue from "vue";
import "mint-ui/lib/style.css";
import { Swipe, SwipeItem } from "mint-ui";

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

export default {
  data() {
    return {
      imglist: []
    };
  },
  props:['imgurl'],
  created() {
    this.getlunbo();
  },
  methods: {
    getlunbo: function() {
      this.$http
        .get(this.imgurl)
        .then(res => {
          this.imglist = res.data.message;
        })
        .catch(err => {
          console.log("服务器错误");
        });
    }
  }
};
</script>

<style>
.mint-swipe-items-wrap {
  height: 200px;
}
.mint-swipe-items-wrap img {
  height: 100%;
  width: 100%;
}
</style>
