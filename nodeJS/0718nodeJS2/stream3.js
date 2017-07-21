//使用流  完成  复制


var fs=require("fs");
//创建流
var rs=fs.createReadStream("01.txt");
var ws=fs.createWriteStream("copy.txt");

//读取流
rs.on("data",function(chunk){
	ws.write(chunk)
});
//读写完毕之后，没有数据了
rs.on("end",function(){
	console.log("读取完成")
	ws.end("成功",function(){
		console.log("写入完成")
	});
})
