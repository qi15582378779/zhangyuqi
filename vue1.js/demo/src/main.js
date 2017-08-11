import Vue from 'vue'     //script src=""   require  引入某些外部的文件
// import App from './App'   //App.vue    ====>组件
import router from './router1'   //引入一个路由

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router
  // template: '<App/>',
  // components: { App }   //在实例里面注册组件
})
