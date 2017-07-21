//创建文件夹


var fs=require("fs");
fs.mkdir("module",function(err){
	if(err) throw err;
	console.log("创建成功")
})
