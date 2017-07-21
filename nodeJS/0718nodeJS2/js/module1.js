var fs=require("fs");
var readFile1=function(url){
	fs.readFile(url,"utf-8",function(err,data){
		if(err){
			throw err
		}else{
			console.log(data)
		}
	})
}

module.exports=readFile1;