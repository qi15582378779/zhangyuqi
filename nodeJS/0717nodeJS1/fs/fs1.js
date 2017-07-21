
//读取文件
var fs=require("fs");
fs.readFile("01.txt","utf-8",function(err,data){
	console.log(err)
	if(err){
		throw err
	}else{
		console.log(data)
	}
})



