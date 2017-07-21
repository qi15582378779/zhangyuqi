//非覆盖模式


var fs=require("fs");
fs.appendFile("conver.txt","飞覆盖的模式",function(err){
	if(err) throw err;
	console.log("这是覆盖的")
})
