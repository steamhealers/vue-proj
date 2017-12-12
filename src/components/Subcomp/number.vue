<template>
    <div class="mui-numbox">
        <button class="mui-btn mui-btn-numbox-minus" type="button" @click="sub">-</button>
        <input class="mui-input-numbox" type="number" v-model="number" v-on:blur="getNum">
        <button class="mui-btn mui-btn-numbox-plus" type="button" @click="add">+</button>
    </div>
</template>

<script>
import { upData } from '../../config/localstroge'
export default {
  data() {
    return {
      number: 1
    };
  },
  created() {

      this.number=this.id?this.num:1;

    // console.log(ab);
  }, 
  props: ["stock",'num','id'],
  methods: {
    add() {
      this.number++;
      if (this.number > this.stock) {
        this.number = this.stock;
      }
      this.communicate()
    },
    sub() {
      this.number--;
      if (this.number < 0) {
        this.number = 0;
      }
      this.communicate()
      
    },
    getNum() {
      this.number = parseInt(this.number);
      this.number=this.number?this.number:0
      if (this.number > this.stock) {
        this.number = this.stock;
      } else if (this.number < 0) {
        this.number = 0;
      }
      this.communicate()
      
    },
    communicate(){
      this.$emit('numchange',this.number)
      this.refreshNum()
    },
    refreshNum(){
      console.log(1);
      console.log(this.number);
      upData({id:this.id,count:this.number})
      this.$emit('refresh')
    }
  }
};
</script>

<style>

</style>
