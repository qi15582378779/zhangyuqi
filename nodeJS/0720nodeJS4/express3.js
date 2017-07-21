var express=require("express");
var path=require("path");

var app=express();
app.use(express.static(path.join(__dirname,"public")));
app.use("/a",function(req,res){
	res.send("<a href='1.jpg'>点击</a>")
});
app.use("/b",function(req,res){
	res.send("<a href='2.jpg'>点击</a>")
});
app.use("/c",function(req,res){
	res.send("<a href='baidu.html'>点击</a>")
});
app.use("/d",function(req,res){
	res.send("<a href='0406页面卧龙'>点击</a>")
})
app.listen(1235);
