
//复制
var fs=require("fs");
fs.readFile("01.txt","utf-8",function(err,data){
	fs.writeFile("02.txt",data,function(err,datas){
		if(err){
			throw err
		}else{
			console.log("写入成功")
		}
	})
})
