//复制
var fs=require("fs");
var File=function(url,url1){
	fs.readFile(url,"utf-8",function(err,data){
		if(err){
			throw err
		}else{
			console.log("读取成功！")
		}
		fs.writeFile(url1,data,function(err){
			if(err){
				console.log(err)
			}else{
				console.log("复制成功！")
			}
		})
	})
}

module.exports=File;
