//index.js   入口文件
// 引入以及使用  配置好的  路由文件

var express=require("express");
var path=require("path");
//引入路由文件
var router=require("./router/router1.js");
var app=express();
app.use(express.static(path.join(__dirname,"public")));
//使用路由
app.use("/",router)

//访问到127.0.0.1:6666/  自动加载 路由文件


app.listen(1415);
