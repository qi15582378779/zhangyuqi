//读取流


var fs=require("fs");
//创建一个容器存储  每次读取的流
var data="";
//创建一个可读取的流
var readStream=fs.createReadStream("1.txt");
//规定读取的格式
readStream.setEncoding("utf-8");
//监听    每次流里面的内容，并保存下来
readStream.on("data",function(chunk){
	data+=chunk
})
//读取完成之后，可以监听一下
readStream.on("end",function(){
	console.log("读取完毕");
	//可以再打印一下读取的内容
	console.log(data)
})
//可以再提示一下代码运行完毕
console.log("代码运行完毕")
