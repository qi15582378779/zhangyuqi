//读取流


var fs=require('fs');
//读取流
var data="";  //每次流入的数据 存储的容器

//创建一个可读流
var readStream=fs.createReadStream("02.txt");
readStream.setEncoding("utf-8");

//监听  流里面的内容
readStream.on("data",function(chunk){   //监听  data  事件==》  有数据流入  流里面
	//chunk  我每次流入的数据
	data+=chunk
})

//数据读取完毕
readStream.on("end",function(){  //end  流里面没有数据   ==》  数据读取完毕
	//读取完
	console.log("数据读取完毕")
	console.log(data)
});

console.log("代码执行完毕")
