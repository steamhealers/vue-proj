<template>
  <div class="mui-content">
    <div class="title">
      <h3>{{news.title}}</h3>
      <span>{{news.add_time|formatDate('YYYY-MM-DD')}}&nbsp;&nbsp;&nbsp;&nbsp;{{news.click}}次浏览</span>
    </div>
    <div class="details" v-html="news.content">
      
    </div>
    <comment :id="id"></comment>

  </div>
</template>

<script>
import moment from 'moment'
import comment from '../../Subcomp/comment.vue'
import '../../../../statics/css/image.css'
export default {
  data() {
    return {
      news: {}
    };
  },
  components:{
      comment
  },
  filters:{
    formatDate:function(time,fmt){
      return moment(time).format(fmt)
    }
  },
  props: ["id"],
  created() {
    this.getnews();
  },
  methods: {
    getnews: function() {
      this.$http
        .get("getnew/" + this.id)
        .then(res => {
          if (res.status === 200 && res.data.status === 0) {
            if (res.data.message.length > 0){
                this.news=res.data.message[0]
                console.log(this.news);
            }
          }
        })
        .catch(err => {
          console.log("服务器错误");
        });
    }
  }
};
</script>

<style scoped>
 .mui-content {
    background-color: #fff;
    padding-bottom: 50px;
  }
  .title {
    padding: 10px 5px;
    border-bottom: 1px solid rgba(92, 92, 92, 0.1);
  }
  .title h3 {
    font-size: 16px;
    font-weight: bold;
    color: #0094ff;
  }
  .title span {
    color: rgba(92, 92, 92, 0.7);
    font-size: 12px;
  }
  .details {
    padding: 5px 5px;
    overflow: hidden;;

  }
 
</style>
