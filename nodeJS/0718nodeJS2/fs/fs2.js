//删除文件

var fs=require("fs");
fs.unlink("Copy.txt",function(err){
	if(err) throw err;
	console.log("删除成功！")
})
