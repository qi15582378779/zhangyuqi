//配置路由


var express=require("express");
var router=express.Router();
router.get("/a",function(req,res){
	res.send("我是路由1")
});
router.get("/a/b",function(req,res){
	res.send("我是a路由的子路由")
});
router.get("/c",function(req,res){
	res.send("<a href='/1.jpg'>点击</a>")
});
router.get("/a/d",function(req,res){
	return res.redirect("/baidu.html")
});
module.exports=router;
