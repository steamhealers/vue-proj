<template>
	<div class="mui-content" ref="muicontent">
		<mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" ref="loadmore">
			<ul class="mui-table-view mui-grid-view">
				<li v-for="(item,index) in goodslist" :key="item.id" class="mui-table-view-cell mui-media mui-col-xs-2">
					<div class="wrap">
						<router-link :to="{name:'buyDetail',params:{id:item.id}}">
							<img class="mui-media-object" :src="item.img_url">
							<div class="mui-media-body mui-ellipsis">{{item.title}}</div>
						</router-link>
						<div class="bottom">
							<h6>
								<span>&yen;{{item.sell_price}}</span>
								<s>&yen;{{item.market_price}}</s>
							</h6>
							<div class="sell">
								<span>热卖中</span>
								<span>剩余{{item.stock_quantity}}件</span>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</mt-loadmore>
	</div>

</template>

<script>
export default {
  data() {
    return {
      goodslist: [],
      allLoaded: false,
      page: 1
    };
  },
  created() {
    this.getgoods();
  },
  mounted(){
	  this.$refs.muicontent.style.height=(document.documentElement.clientHeight) + 'px'
  },
  methods: {
    getgoods() {
      this.$http
        .get("/getgoods?pageindex=" + this.page)
        .then(res => {
          if (res.status === 200 && res.data.status === 0) {
			this.goodslist =this.goodslist.concat(res.data.message)
            if (res.data.message.length === 0) {
              this.allLoaded = true;
            }
            console.log(this.$refs);
            this.$refs.loadmore.onTopLoaded();
            this.$refs.loadmore.onBottomLoaded();
          } else {
            console.log("服务器错误");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadTop() {
      this.getgoods();
    },
    loadBottom() {
		this.page++
      this.getgoods();
    }
  }
};
</script>

<style scoped>
/* .mui-content{
	padding: 0;
} */
/* .mint-loadmore{
	padding-top: 44px;
	padding-bottom: 50px;
} */
.mui-table-view:before {
  display: none;
}

.mui-table-view:after {
  display: none;
}

.mui-content > .mui-table-view:first-child {
  margin-top: 0px;
}

.mui-table-view.mui-grid-view .mui-table-view-cell {
  margin-right: 0px;
  padding: 0px;
}

.mui-table-view.mui-grid-view {
  padding: 5px;
}

.mui-table-view.mui-grid-view .mui-table-view-cell {
  padding: 5px;
  /* margin-top: 10px; */
  /* margin-left: 10px; */
  width: 50%;
}

.mui-table-view.mui-grid-view .mui-table-view-cell .wrap {
  box-shadow: 0 0 4px #999;
  padding: 5px;
}

.mui-table-view-cell img {
  width: 100%;
}

.mui-table-view-cell:after {
  display: none;
}

.mui-table-view-cell > a {
  margin: 0;
}

.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
  margin: 0;
  margin-bottom: 5px;
  text-align: left;
  color: #000;
}

.bottom {
  text-align: left;
  padding: 5px;
}

.bottom > h6 > span {
  color: red;
  font-size: 14px;
  margin-right: 20px;
}

.bottom > .sell {
  margin-top: 15px;
  color: rgba(92, 92, 92, 0.8);
  font-size: 13px;
  display: flex;
  justify-content: space-between;
}
</style>