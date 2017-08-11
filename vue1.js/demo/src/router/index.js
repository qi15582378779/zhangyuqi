import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'   //引入一个组件

const home={
	template:`<div>
	<h1>这是首页</h1>
	</div>`
};
const two={
	template:`<div>
	<h1>路由two</h1>
	</div>`
};


Vue.use(Router)  //让当前的实例使用 路由

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
    	path:"/home",
    	name:"home",
    	component:home
    },
    {
    	path:"/two",
    	name:"two",
    	component:two
    }
  ]
})
