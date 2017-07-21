var module=require("./js/helloword.js");//引入已经暴露的文件
//使用module.exports 暴露
//引入的时候  直接使用引入的module：就是暴露出去的对象
console.log(module)//我暴露的内容是什么

module();//为什么这么调用