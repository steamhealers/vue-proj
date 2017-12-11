<template>
<div class="main">
  <header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" v-if="isShow" @click="goback"></a>
			<h1 class="mui-title"></h1>
		</header>
    <router-view></router-view>
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/cart">
				<span class="mui-icon mui-icon-trash"><span class="mui-badge">9</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
</div>
</template>

<script>
export default {
  data() {
    return {
			msg: "这是一个新模版",
			isShow:false
    };
	},
	created(){
		this.judgeback(this.$route.path)
	},
  methods: {
    goback() {
      this.$router.back();
    },
    judgeback(path) {
			let arr=['/home','/cart','/member','/search']
			if(arr.indexOf(path)==-1){
				this.isShow=true
			}else{
				this.isShow=false
			}
		}
	},
	watch:{
		'$route':function(newValue){
			this.judgeback(newValue.path)
		}
	}
};
</script>

<style>

</style>
