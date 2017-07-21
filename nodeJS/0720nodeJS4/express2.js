//静态资源管理


var express=require('express');
var path=require("path");     //===>对于  “文件”  路径的处理
var app=express();    //搭建服务器
//express.static();    //搭建一个静态资源的管理器（静态资源服务器）,资源放的路径
var a=path.join(__dirname,"img");
console.log(a);  //相当于添加了一个新的文件夹
//使用app use加载   已搭建好的资源路径
var b=express.static(a);
app.use(b);
app.listen(1234);

