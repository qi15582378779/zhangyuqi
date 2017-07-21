//写入文件
var fs=require("fs");
fs.writeFile("01.txt","我是一只鸟",function(err,data){
	if(err){
		throw err
	}else{
		console.log("写入成功")
	}
})