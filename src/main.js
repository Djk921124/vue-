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
import newsinfo from './components/news/newsinfo.vue';




// 3.0.2 定义路由规则
var router1 = new vueRouter({
	linkActiveClass:'mui-active',
	routes:[
		{path:'/home',component:home}, 
		{path:'/shopcar/shopcar',component:shopcar},
		{path:'/news/newlist',component:newlist},
		{path:'/news/newsinfo/:id',component:newsinfo},		
		{path:'/goods/goodlist',component:goodlist}		
	]
	});


// 4.0 注册mint-ui
// 导入mint-ui的css文件
import 'mint-ui/lib/style.min.css';
// 导入mint-ui组件对象
import mintui from 'mint-ui';
// 在Vue中全局使用mintui
Vue.use(mintui);

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-default/index.css';
// Vue.use(ElementUI);

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

// 5.0 利用Vue对象进行解析渲染
new Vue({
	el:'#app',
	// 使用路由对象实例
	router:router1,
	// render:function(create){create(App)} //es5的写法
	render:c=>c(App)  // es6的函数写法 =>：goes to
});