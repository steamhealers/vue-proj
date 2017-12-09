<template>
      <!--  评论 -->
      <div class="comment">
        <!--添加评论-->
        <h4>提交评论</h4>

        <div class="submitcomment">
            <textarea placeholder="请输入评论内容" v-model="msg"></textarea>
            <button class="mui-btn mui-btn-primary" @click="submitComment">发表</button>
        </div>
            
        <div class="title">
            <h4>评论列表</h4>
        </div>    
        
        <!--评论列表-->
        
        <div class="item" v-for="(item,index) in comments" :key="index">
            <div class="content">{{item.content}}</div>
            <div>
                <span class="user">{{item.user_name}}</span>  <span>{{item.add_time|formatDate('YYYY-MM-DD HH:mm:ss')}}</span>
            </div>
        </div>

        <div class="more">
            <button class="mui-btn mui-btn-primary mui-btn-outlined">加载更多</button>
        </div>

    </div>
</template>

<script>
import {Toast} from 'mint-ui'
import moment from "moment";
export default {
  data() {
    return {
      comments: [],
      msg:''
    };
  },
  props: ["id"],
  filters: {
    formatDate: function(time, fmt) {
      return moment(time).format(fmt);
    }
  },
  created() {
    this.getcomments();
  },

  methods: {
    getcomments: function() {
    //   console.log(this.id);
      this.$http
        .get("getcomments/" + this.id + "?pageindex=1")
        .then(res => {
          // console.log(res);
          if (res.status === 200 && res.data.status === 0) {
            this.comments = res.data.message;
          } else {
            console.log("服务器错误");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitComment(){
      if(!this.msg){
        Toast('请输入评论内容!')
        return
      }
        this.$http.post('/postcomment/'+this.id,'content='+this.msg).then(res=>{
          if (res.status === 200 && res.data.status === 0) {
              Toast(res.data.message);
              this.msg="";
              this.getcomments()
          }else{
              console.log('服务器错误');
          }
        }).catch(err=>{
            console.log(err);
        })
    }
  }
};
</script>

<style scoped>

/*  评论的样式 */
.submitcomment {
  text-align: center;
}

.submitcomment textarea {
  margin-top: 10px;
  padding: 0;
  width: 96%;
  height: 60px;
}

.submitcomment button {
  width: 96%;
}

.comment .title {
  border-top: 1px solid rgba(92, 92, 92, 0.4);
  border-bottom: 1px solid rgba(92, 92, 92, 0.4);
  margin: 20px 0 0 0;
  vertical-align: middle;
  padding: 10px 0;
}

.item {
  padding: 15px 10px;
  border-bottom: 1px solid rgba(92, 92, 92, 0.4);
}

.item div {
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
}

.item span {
  font-size: 15px;
}

.item .user {
  color: skyblue;
}

.more {
  margin: 10px 0;
  text-align: center;
}

.more > button {
  width: 96%;
}
</style>
