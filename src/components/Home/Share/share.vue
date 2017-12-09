<template>
	<div class="mui-content">
		<div class="title">
			<ul>
				<li>
					<a href="javascript:;" @click="getimages(-1)">全部</a>
				</li>
				<li v-for="(item,index) in category" :key="item.id">
					<a href="javascript:;" @click="getimages(item.id)">{{item.title}}</a>
				</li>
			</ul>
		</div>

		<div class="images">
			<ul>
				<li v-for="(item,index) in imglist" :key="item.id">
					<router-link :to="{name:'shareDetail',params:{id:item.id}}">
						<img v-lazy="item.img_url" alt="">
						<p class="cover">
							<span>{{item.title}}</span>
							<br> {{item.zhaiyao}}
						</p>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				category: [],
				imglist: []
			}
		},
		created() {
			this.getimgcategory()
			this.getimages(-1)
		},
		methods: {
			getimgcategory() {
				this.$http.get('getimgcategory').then(res => {
					if (res.status === 200 && res.data.status === 0) {
						this.category = res.data.message
					} else {
						this.$Toast('服务器错误')
					}
				}).catch(err => {
					console.log(err);
				})
			},
			getimages(id) {
				this.$http.get('getimages/' + id).then(res => {
					// console.log(res);
					if (res.status === 200 && res.data.status === 0) {
						this.imglist = res.data.message
					} else {
						console.log('server error');
					}
				}).catch(err => {
					console.log(err);
				})
			}
		}
	}
</script>

<style scoped>
	ul {
		margin: 0;
		padding: 0;
		list-style-type: none;
	}

	.title {
		overflow-x: auto;
		overflow-y: hidden;
	}

	.title>ul {
		width: 1000px;
	}
	/* webkit核心的浏览器 隐藏滚动条 */

	 ::-webkit-scrollbar {
		display: none;
	}

	.title>ul>li {
		display: inline-block;
		padding: 20px 5px;
	}

	.images {
		margin-top: 10px;
	}

	.images>ul {}

	.images img {
		height: 300px;
		width: 100%;
	}

	.images>ul>li {
		position: relative;
	}

	.images .cover>span {
		font-weight: bold;
	}

	.images .cover {
		color: #fff;
		position: absolute;
		left: 0px;
		bottom: 0px;
		background-color: rgba(92, 92, 92, 0.4);
		width: 100%;
		margin-bottom: 5px;
	}
</style>