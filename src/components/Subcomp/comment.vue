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
                <span class="user">{{item.user_name}}</span>  <span>{{item.add_time|formatDate('HH:mm:ss YYYY-MM-DD')}}</span>
            </div>
        </div>

        <div class="more">
            <button class="mui-btn mui-btn-primary mui-btn-outlined" @click="more">加载更多</button>
        </div>

    </div>
</template>

<script>
export default {
  data() {
    return {
      comments: [],
      msg: "",
      page:1
    };
  },
  props: ["id"],
  created() {
    this.getcomments();
  },

  methods: {
    getcomments() {
      //   console.log(this.id);
      this.$http
        .get("getcomments/" + this.id + "?pageindex="+this.page)
        .then(res => {
          // console.log(res);
          if (res.status === 200 && res.data.status === 0) {
            this.comments =this.comments.concat(res.data.message);
          } else {
            console.log("服务器错误");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitComment() {
      if (!this.msg) {
        this.$Toast("请输入评论内容!");
        return;
      }
      this.$http
        .post("/postcomment/" + this.id, "content=" + this.msg)
        .then(res => {
          if (res.status === 200 && res.data.status === 0) {
            this.msg = "";
            this.getcomments();
          } else {
            console.log("服务器错误");
          }
          this.$Toast(res.data.message);
        })
        .catch(err => {
          console.log(err);
        });
    },
    more(){
      this.page++
      this.getcomments()
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
