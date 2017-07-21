var fs=require("fs");
//创建一个流
var rs=fs.createReadStream("1.png");
var ws=fs.createWriteStream("copy.txt");

rs.on("data",function(result){
	ws.write(result)
});

rs.on("end",function(){
	console.log("读取结束")
	ws.end("我是结束标记",function(){
		console.log("写入结束")
	})
})
