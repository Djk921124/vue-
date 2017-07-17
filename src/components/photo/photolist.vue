<template>
  <div id='tmpl'>
      <section id="headers"> 
              <ul ref="uls">
                  <li>全部</li>
                  <li v-for="itme in cates">{{itme.title}}</li>
              </ul>
      </section>
  </div>
</template>
<script>
export default {
  name: "component_name",
  data () {
    return {
        cates:[],
        ulWidth : 320,
        list:[]
    };
  },
  created(){
      this.getCates();
  }
  ,
  methods:{
        getCates(){
            var url = this.$comment.apiWhere + '/api/getimgcategory';
            this.$http.get(url).then(function(res){
                if(res.body.status != 0){
                    return;
                }
                this.cates = res.body.message;
                var w = 62;
                var count = res.body.message.length + 1;
                this.ulWidth = w*count;

                //this.refs.uls.style.width = this.ulWidth;
            })
        }
  }
}
</script>
<style lang="css" scoped>
    #headers{
		width: 375px;
		max-width: 375px;
		overflow-x: auto;
	}
	#headers ul{
		margin: 0px;
		padding-left: 10px;
        width: 1000px;
	}
	#headers ul li{
		cursor: pointer;
		list-style: none;
		display: inline-block;
		color:#0094ff;
		font-size: 14px;
		padding-left: 6px;
	}


</style>