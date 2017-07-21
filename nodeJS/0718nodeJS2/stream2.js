//写入流


var fs=require("fs");
//创建一个写入流
var writeStream=fs.createWriteStream("01.txt");
writeStream.on("open",function(){
	console.log("流开始写入")
});

//数据流入
writeStream.write("我要写入的内容阿萨德","utf-8");
//写完之后，关闭
writeStream.end();
//完毕之后监听一下  finish
writeStream.on("finish",function(){
	console.log("写入完毕")
});
console.log("代码执行完毕")
