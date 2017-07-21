var express=require("express");
var path=require("path");
var router=require("./router/router1");
var app=express();
app.use("/p",router);
app.use("/abc",function(req,res,next){
	res.send("<h1>服务器</h1>")
});
app.use(express.static(path.join(__dirname,"public")));
app.listen(1414);
