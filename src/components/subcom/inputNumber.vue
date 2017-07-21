<template>
  <div id='subtmpl'>
        <div class="inleft div" @click="subscribe">-</div>
		<div class="incenter div" v-text="count"></div>
		<div class="inright div"  @click="add">+</div>
  </div>
</template>
<script>
export default {
  name: "component_name",
  data () {
    return {
        count:1
    };
  },
  props:['numMax']
  ,
  methods:{
      subscribe(){
          if(this.count > 1 ){
              this.count--;
          }
          this.sendmessage();
      },
      add(){
          if(this.count < this.numMax){
            this.count++;
          }
          this.sendmessage();      
      },
       sendmessage(){
         this.$emit('dataobj',this.count);
        }

  }
}
</script>
<style lang="css" scoped>
	#subtmpl .div{
		width: 40px;
		height: 25px;
		line-height: 25px;
		border: 1px solid #000;
		display: inline-block;
		text-align: center;
	}
</style>