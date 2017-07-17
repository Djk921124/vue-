<template>
  <div id='tmpl'>
      <section id="desc">
        <div class="title">
            <h4>{{photoinfo.title}}</h4>
				<p>
					{{photoinfo.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}  {{photoinfo.click}}次浏览
				</p>
			<p class="line"></p>
        </div>
        	<div class="mui-content">
				<ul class="mui-table-view mui-grid-view mui-grid-9">
					<li v-for="(item, index) in list" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
						<img class="preview-img"  :src="item.src" height="100" @click="$preview.open(index, list)">
					</li>
				</ul>
			</div>

			<!--图片详情- 摘要部分-->
			<p v-html="photoinfo.content"></p>

      </section>
  </div>
</template>
<script>
export default {
  name: "component_name",
  data () {
    return {
        id:0,
        photoinfo:[],
        list:[]
    };
  },
  created(){
      this.id = this.$route.params.id;
      this.getinfo();
      this.getImgs();
  }
  ,
  methods:{
      getinfo(){
          var url = this.$comment.apiWhere + '/api/getimageInfo/' + this.id;
          this.$http.get(url).then(function(res){
              if(res.body.status != 0){
                  return;
              }
              this.photoinfo = res.body.message[0];
          })
      },
      getImgs(){
        var url = this.$comment.apiWhere + '/api/getthumimages/'+this.id;
        this.$http.get(url).then(function(res){
            if(res.body.status != 0){
                return;
            }
            res.body.message.forEach(function(element) {
                var img = new Image();
                img.src = element.src;
                element.h = img.height;
                element.w = img.width;
            });
            this.list = res.body.message;
        })
      }
  }
}
</script>
<style lang="css" scoped>

 #desc{
	  padding: 10px;
  }
	#desc  .title h4{
		color: #0094ff;
	}

  #desc .title p{
	color:rgba(0,0,0,0.4);
	  margin-top: 10px;
  }

  #desc .title .line{
	  width: 100%;
	  height: 1px;
	  border-bottom: 1px solid rgba(0,0,0,0.4);
  }

  .mui-content,.mui-content ul{
	  background-color: #fff;
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell{
	  border-right:0px;
	  border-bottom:0px;
  }
  .mui-grid-view.mui-grid-9{
	  border-top:0px;
	  border-left:0px;
  }

  /* 9宫格缩略图的样式*/
	.mui-content img{
		width: 100px;
		height: 100px;
	}
</style>