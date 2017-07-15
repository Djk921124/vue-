<template>
  <div id='tmpl'>
      <div class="title">
          <h4>{{info.title}}</h4>
          <p>{{info.add_time | datefmt('YYYY-MM-DD')}}  {{info.click}} 次浏览</p>
      </div>
      <div id="content" v-html="info.content">

      </div>
  </div>
</template>
<script>
export default {
  name: "component_name",
  data () {
    return {
        id:0,
        info:{}
    };
  },
  created(){
      this.id = this.$route.params.id;
      this.getInfo();
  },
  methods:{
      getInfo(){
          var url='http://182.254.146.100:8899/api/getnew/'+this.id;
          this.$http.get(url).then(function(res){
              var data = res.body;
              if(data.status != 0){
                  return;
              }
              this.info = data.message[0];
          })
      }
  }
}
</script>
<style lang="css" scoped>
</style>