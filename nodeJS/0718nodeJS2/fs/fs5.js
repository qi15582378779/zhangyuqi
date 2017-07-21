//判断文件状态


var fs=require("fs");
fs.exists("01.txt",function(result){
	if(result){
//		console.log("文件存在")
		fs.stat("01.txt",function(err,data){
			console.log(data)
			if(data.isDirectory()){
				console.log("这是一个文件夹")
			}else{
				console.log("这是一个文件")
			}
		})
	}else{
		console.log("文件不存在")
	}
})
