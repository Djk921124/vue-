<!-- 以后项目的根组件 -->
<template>
	<div>
		<!-- 1.0 template主要是放html元素的（html的页面结构） -->
				<mt-header title="VUE项目">
					<div v-if="isshow" id="back">
						<a href="javascript:void(0)" @click="backto">返回</a>
					</div>
					<mt-button icon="more" slot="right"></mt-button>
				</mt-header>
						<!-- 路由占位符 -->
		<router-view></router-view>
		<!--底部栏-->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/news">
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">消息</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-contact"><span id="badge" class="mui-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/tabbar-with-map">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">设置</span>
			</router-link>
		</nav>

	</div>
</template>

<script>
// 按需导入
	//import {add} from './calc.js';
	import {vm,COUNTSTR} from './kits/vm.js';
	vm.$on(COUNTSTR,function(count){
		var badge = document.querySelector("#badge");
		badge.innerText = parseInt(badge.innerText) + count;
	})


	// 负责导出 .vue这个组件对象(它本质上是一个Vue对象,所以Vue中该定义的元素都可以使用)
	// function add(x,y){console.log(x+y)}	
	// module.exports = {  //es5的导出对象的写法
	export default{  // es6的导出对象的写法
		data(){  //等价于 es5的 data:function(){
			return {
			isshow : false
			}
		},
		watch:{
			'$route':function(newroute,oldroute){
				if(newroute.path.toLowerCase()=='/home'
				|| newroute.path.toLowerCase()=='/userinfo'
				|| newroute.path.toLowerCase()=='/login'){
					this.isshow = false;
				}else{
					this.isshow = true;
				}
			}
		},
		methods:{
			// add,  // es6的写法  等价于es5 ： add:add
			//add1:add,
			// substrict:substrict
			tip:function(){
				Toast('你好');
			},
			backto(){
				this.$router.go(-1);
			}
		},
		created(){

		}
	}
</script>

<style scoped>
/*当前页面的css样式写到这里，其中scoped表示这个里面写的css代码只是在当前组件页面上有效，不会去影响到其他组件页面*/
	.red{
		color: red;
	}
</style>