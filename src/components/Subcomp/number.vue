<template>
    <div class="mui-numbox">
        <button class="mui-btn mui-btn-numbox-minus" type="button" @click="sub">-</button>
        <input class="mui-input-numbox" type="number" v-model="number" v-on:blur="getNum">
        <button class="mui-btn mui-btn-numbox-plus" type="button" @click="add">+</button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      number: 1
    };
  },
  created() {
    // console.log(ab);
  },
  props: ["stock"],
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
      if (this.number > this.stock) {
        this.number = this.stock;
      } else if (this.number < 0) {
        this.number = 0;
      }
      this.communicate()
      
    },
    communicate(){
      this.$emit('numchange',this.number)
    }
  }
};
</script>

<style>

</style>
