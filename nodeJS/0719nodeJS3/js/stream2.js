//写入流


var fs=require("fs");
//创建一个写入流
var writeStream=fs.createWriteStream("1.txt");
//开始写入
writeStream.on("open",function(){
	console.log("开始写入流")
});
//写入的内容和编码格式
writeStream.write("这是我要写入的内容","utf-8");
//写完之后，关闭
writeStream.end();
//完毕之后可以再监听一下
writeStream.on("finish",function(){
	console.log("写入完毕")
})
//代码运行完之后，可以提示
console.log("代码执行完毕")
