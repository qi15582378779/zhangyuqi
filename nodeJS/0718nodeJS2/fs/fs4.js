//修改文件名


var fs=require("fs");
fs.rename("文本","01.txt",function(err){
	if(err) throw err;
	console.log("修改成功")
})