//流  复制


var fs=require("fs");
//创建流
var rs=fs.createReadStream("1.txt");
var ws=fs.createWriteStream("copy.txt");
//开始读取同时把读取的数据写入保存
rs.on("data",function(chunk){
	ws.write(chunk);
});
//读取完毕,同时也写入完毕
rs.on("end",function(){
	console.log("读取完毕");
	ws.end("成功",function(){
		console.log("写入完毕")
	})
})
//整个代码运行完毕，提示
console.log("代码执行完毕")