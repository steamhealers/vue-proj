<template>
	<div class="mui-content">
		<div class="row" v-for="(item,index) in goods" :key="item.id">
			<div class="left">
        <mt-switch v-model="values[index]"></mt-switch>
			</div>
			<div class="center">
				<img :src="item.thumb_path" width="75" height="75"  alt="" >
			</div>
			<div class="right">
				<h4>
					{{item.title}}
				</h4>
				<span>&yen;{{item.sell_price}}</span>
        <br>
        <number :num="item.count" :id="item.id" @refresh="refnum"></number>
				<a href="javascript:;" @click="delGoods(item.id)">删除</a>
			</div>
		</div>

		<div class="total">
			<div class="left">
				<h4>总计(不含运费):</h4>
				<span>已经选择商品{{numSum}} 件，共计￥{{priceSum}}元</span>
			</div>
			<div class="right">
				<button  class="mui-btn mui-btn-danger">去结算</button>
			</div>

		</div>
      {{values}}
	</div>
</template>

<script>
import number from "../Subcomp/number.vue";
import { getData, delData } from "../../config/localstroge";
import VueObj from "../../config/common";
//导出组件
export default {
  data() {
    return {
      values: [],
      ids: "",
      goods: [],
      num1: 12,
      numSum:0,
      priceSum:0
    };
  },
  components: {
    number
  },
  created() {
    this.getshopcarlist();
  },
  methods: {
    getshopcarlist() {
      let data = getData();
      let idarr = [];
      data.forEach(element => {
        idarr.push(element.id);
        this.values.push(false)
      });
      this.ids = idarr.join(",");
      console.log(this.ids);
      if (!this.ids.length) return;
      this.$http
        .get("/goods/getshopcarlist/" + this.ids)
        .then(res => {
          if (res.status === 200 && res.data.status === 0) {
            this.goods = res.data.message;
            this.sortGoods()
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    delGoods(id) {
      console.log("del");
      delData(id);
      this.getshopcarlist();
    },
    refnum() {
      this.sortGoods()      
      VueObj.$emit("update");
    },
    sortGoods() {
      let data = getData();
      
      this.goods.sort(function(item1, item2) {
        return item1.id > item2.id;
      });
      data.sort(function(item1, item2) {
        return item1.id > item2.id;
      });
      data.forEach((item, index) => {
        this.goods[index].count = item.count;
      });
    }
  },
  watch: {
    values() {
      let nSum=0
      let pSum=0
      this.values.forEach((item, index) => {
        if(item==true){
        nSum+=parseInt(this.goods[index].count)
        pSum+=parseFloat(this.goods[index].sell_price*this.goods[index].count)
        }
      });
      this.numSum=nSum
      this.priceSum=pSum
    }
  }
};
</script>

<style scoped>
img {
  width: auto;
}
.mui-bar-tab ~ .mui-content {
  padding-bottom: 0;
  background-color: #fff;
}
.total {
  display: flex;
  margin-top: 10px;
  padding: 5px 10px;
  background-color: rgba(92, 92, 92, 0.2);
  justify-content: space-between;
  height: 70px;
}

.total h4 {
  font-weight: bold;
  font-family: "微软雅黑";
}

.total span {
  margin-top: 10px;
  font-size: 14px;
}

.total .right {
  margin-top: 8px;
}

.row {
  display: flex;
  border-bottom: 1px solid rgba(1, 1, 1, 0.3);
  padding: 10px 5px;
}

.row .left {
  /*flex: 0, 0, auto;*/
  padding-top: 20px;
}

.row .center {
  /*flex: 0, 0, auto;*/
  margin-left: 5px;
}

.row .right {
  /*flex: 1;*/
  margin-left: 5px;
}

.row .right h4 {
  color: #0094ff;
  font-size: 16px;
  padding: 5px 0px;
}

.row .right .num {
  display: inline-block;
  margin-left: 5px;
}

.row .right span {
  color: red;
  font-size: 20px;
}

.row .right a {
  color: gray;
  font-size: 14px;
  margin-left: 5px;
}
</style>