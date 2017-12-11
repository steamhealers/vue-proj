
<template>
    <div class="mui-content">
        <div class="detail">
            <div class="top">
                <slide :imgurl="imgurl"></slide>
            </div>
        </div>
        <div class="sell">
            <h4>{{info.title}}</h4>
            <div class="price">
                市场价：<s>￥{{info.market_price}}</s> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 销售价：<span>￥{{info.sell_price}}</span>
            </div>
            <div class="num">
                购买数量：
                <number :stock="info.stock_quantity"  @numchange="fn1"></number>
                <!-- <div class="number">
                    <input type="button" >
                    <input type="text">
                    <input type="button" >
                </div> -->

                <!-- <div class="ball"></div> -->
            </div>
            <div class="button">
                <button class="mui-btn mui-btn-primary">立刻购买</button>
                <button class="mui-btn mui-btn-danger" >加入购物车</button>
            </div>
        </div>

        <div class="param">
            <h5>商品参数</h5>
            <div class="info">
                <p>商品编号：{{info.goods_no}}</p>
                <p>库存情况：{{info.stock_quantity}}件</p>
                <p>上架时间：{{info.add_time|formatDate('YYYY-MM-DD HH:mm:Ss')}}</p>
            </div>
        </div>
        
        <div class="footer">
            <a class="mui-btn mui-btn-primary mui-btn-outlined">图文介绍</a>
            <a class="mui-btn mui-btn-danger mui-btn-outlined">商品评论</a>
        </div>
    </div>
</template>

<script>
//导出组件
import slide from "../../Subcomp/slider.vue";
import number from "../../Subcomp/number.vue";
export default {
  data() {
    return {
      info: {},
      imgurl: "getthumimages/" + this.id,
      number: 1
    };
  },
  props: ["id"],
  components: {
    slide,
    number
  },
  created() {
    this.getinfo();
  },
  methods: {
    getinfo() {
      this.$http
        .get("/goods/getinfo/" + this.id)
        .then(res => {
          if (res.status === 200 && res.data.status === 0) {
            if (res.data.message.length > 0) {
              console.log(res);
              this.info = res.data.message[0];
            } else {
              console.log("服务器错误");
            }
          } else {
            console.log("服务器错误");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    fn1(num){
      // console.log(num);
      this.number = num
      console.log(this.number);
    }
  }
};
</script>

<style scoped>
.num {
  position: relative;
}

.ball {
  left: 115px;
  top: 3px;
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: red;
  transition: all 0.5s linear;
  z-index: 1000;
}

.mui-content {
  background-color: #fff;
}

.top,
.sell,
.param,
.footer {
  border-radius: 5px;
  box-shadow: 0 0 4px #999;
  margin: 5px;
  padding: 10px;
}

.sell h4 {
  color: dodgerblue;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

.price,
.num,
.button {
  margin: 10px;
  font-size: 15px;
}

.price span {
  font-size: 18px;
  color: red;
}

.param h5 {
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

.info {
  margin-top: 10px;
  margin-left: 20px;
}

.info p {
  margin: 0;
}

.footer .mui-btn {
  width: 100%;
}

.footer .mui-btn-danger {
  margin-top: 10px;
}
</style>
