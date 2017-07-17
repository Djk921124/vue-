<template>
  <div id='tmpl'>
      <section id="headers"> 
              <ul ref="uls">
                  <li  @click="getimages(0)">全部</li>
                    <li v-for="(item,index) in cates" @click="getImgs(item.id)" :key = 'index'>{{item.title}}</li>
              </ul>
      </section>

      <section id="imglist">
          <ul>
              <li v-for="(item,index) in list" :key = 'index'>
                  <router-link v-bind="{to:'/photo/photoinfo/'+item.id}">
                        <img v-lazy="item.img_url">
                        <div id="desc">
                            <h5 v-text="item.title"></h5>
                            <p v-text="item.zhaiyao"></p>
                        </div>
                  </router-link>
              </li>
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
    var all = 0; //获取所有数据
    this.getImgs(all);
  },
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
        },
        getImgs(cateid){
            cateid = cateid || 0; 
            var url = this.$comment.apiWhere + '/api/getimages/'+cateid;
            this.$http.get(url).then(function(res){
                if(res.body.status != 0){
                    return;
                }
                this.list =  res.body.message;
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
	#imglist{

	}
	#imglist ul {
		padding-left: 0px;
	}
	#imglist li{
		list-style:none;
		position: relative ;
	}
	#imglist img{
		width:100%;
		height: 300px;
	}

	#desc{
		width: 100%;
		background-color: rgba(0,0,0,0.2);
		position: absolute;
		bottom: 2px;
		left: 0px;
	}

    #desc h5{
        color: #ffffff;
        font-weight: bold;
    }
    #desc p{
        color:#fff;
    }

    image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }

</style>