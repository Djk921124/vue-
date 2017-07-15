<template>
  <div id='tmpl'>
      <div class="title">
          <h4>{{info.title}}</h4>
          <p>{{info.add_time | datefmt('YYYY-MM-DD')}}  {{info.click}} 次浏览</p>
      </div>
      <div id="content" v-html="info.content">

      </div>
      <common :id="id"></common>
  </div>
</template>
<script>
import common from '../subcom/common.vue'
export default {
  name: "component_name",
  components:{
    common
  },
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
          var url=this.$comment.apiWhere+'/api/getnew/'+this.id;
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
.title h4 {
    color: #0094ff;
}

.title p {
    color: rgba(0, 0, 0, 0.5);
}

.title,
#content {
    padding: 5px;
}
</style>