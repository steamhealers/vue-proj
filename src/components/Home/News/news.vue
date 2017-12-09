<template>
  <div class="mui-content">
      <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="(item,index) in newslist" :key="item.id">
					<router-link :to="{name:'newsDetail',params:{id:item.id}}" class="">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body mui-ellipsis">
							{{item.title}}
							<p class="mui-ellipsis">{{item.zhaiyao}}</p>
              <div class="time">
                <span>发表时间：{{item.add_time | formatDate('YYYY-MM-DD')}}</span>
                <span>点击次数：{{item.click}}</span>
              </div>
						</div>
					</router-link>
				</li>
			</ul>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      newslist: []
    };
  },
  filters: {
    formatDate: function(time, fmt) {
      return moment(time).format(fmt);
    }
  },
  created() {
    this.getnewslist();
  },
  methods: {
    getnewslist: function() {
      this.$http
        .get("getnewslist")
        .then(res => {
          if (res.status === 200 && res.data.status === 0) {
            // console.log(res);
            this.newslist = res.data.message;
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
  padding-bottom: 50px;
}
.mui-content .mui-table-view {
  margin-top: 0;
}
.mui-content .mui-media-body {
  font-size: 15px;
}
.time {
  color: #0094ff;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}
.mui-table-view-cell:after {
  left: 0;
}
</style>
