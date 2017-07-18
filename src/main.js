// 1.0 导入vue核心包
import Vue from 'vue';

// 2.0 导入App.vue的vue对象
import App from './App.vue';

// 3.0 将vue-router集成到这个项目中来
import vueRouter from 'vue-router';
// 3.0.1 将vueRouter对象绑定到Vue对象上
Vue.use(vueRouter);

// 3.0.2 导入路由规则对应的组件对象
import home from './components/home.vue';
import shopcar from './components/shopcar/shopcar.vue';
import newlist from './components/news/newlist.vue';
import goodlist from './components/goods/goodlist.vue';
import goodsinfo from './components/goods/goodsinfo.vue';
import goodsdesc from './components/goods/goodsdesc.vue';
import goodscomment from './components/goods/goodscomment.vue';
import newsinfo from './components/news/newsinfo.vue';
import photolist from './components/photo/photolist.vue';
import photoinfo from './components/photo/photoinfo.vue';




// 3.0.2 定义路由规则
var router1 = new vueRouter({
	linkActiveClass:'mui-active',
	routes:[
		{path:'/',redirect:'/home'},  //默认进入首页
		{path:'/home',component:home}, 
		{path:'/shopcar/shopcar',component:shopcar},
		{path:'/news/newlist',component:newlist},
		{path:'/news/newsinfo/:id',component:newsinfo},		
		{path:'/goods/goodlist',component:goodlist},
		{path:'/goods/goodsinfo/:id',component:goodsinfo},	
		{path:'/goods/goodsdesc/:id',component:goodsdesc},	
		{path:'/goods/goodscomment/:id',component:goodscomment},		
		{path:'/photo/photolist',component:photolist},
		{path:'/photo/photoinfo/:id',component:photoinfo},
	]
	});


// 4.0 注册mint-ui
// 导入mint-ui的css文件
import 'mint-ui/lib/style.min.css';
// 导入mint-ui组件对象
import mintui from 'mint-ui';
// 在Vue中全局使用mintui
Vue.use(mintui);


import vueResource from 'vue-resource';
Vue.use(vueResource);


// 5.0 注册mui的css样式
import '../statics/mui/css/mui.css';
import '../statics/css/site.css'

//定义全局过滤器
import moment from 'moment';
Vue.filter('datefmt',function(input,datetime){
	return moment(input).format(datetime);
})

//引入全局API地址
import comment from './kits/comment.js';
Vue.prototype.$comment = comment

//导入全局图片预览组件
import VuePreview from 'vue-preview'
Vue.use(VuePreview);


// 5.0 利用Vue对象进行解析渲染
new Vue({
	el:'#app',
	// 使用路由对象实例
	router:router1,
	// render:function(create){create(App)} //es5的写法
	render:c=>c(App)  // es6的函数写法 =>：goes to
});