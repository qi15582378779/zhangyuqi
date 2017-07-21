// 路由使用和引入的  入口文件

var express=require("express");
var router=require("./router/router2.js");
var  app=express();
app.use("/",router)

app.listen(2345);
