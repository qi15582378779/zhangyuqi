//  就是书写路由   不使用项目自动生产的路由文件

import Vue from "vue";
import Router from "vue-router";
import about from "@/components/about";

//  要先加载使用路由模块
Vue.use(Router)

const first={
	template:`
	<div>
	<h1>我是组件first</h1>
	<span @click="show">点击</span>
	</div>
	`,
	methods:{
		show(){
			alert(11)
		}
	}
}
const two={
	template:`<div>
	<h1>路由two</h1>
	</div>`
};
const home={
	template:`<div>
	<h1>这是首页</h1>
	</div>`
};
// const routes=[
// 	{path:"/first",component:first}
// ];


//暴露生成的路由配置
export default new Router({
	mode:"history",
	base:"__dirname",
	routes:[
		{path:"/first",component:first},
		{path:"/two",component:two},
		{path:"/about",component:about}
	]
})