var express=require("express");
var fs=require("fs");
var app=express();
console.log("这是我的服务器");
app.use("/abc",function(req,res,next){
	res.send("<h1>hello</h1>");
	next()
});
app.use("/bbc",function(req,res,next){
	res.send("<h1>yes</h1>");
	next();
});
app.use("/",function(req,res){
	res.send("<h3>这是首页</h3>")
})
app.listen(2000);
