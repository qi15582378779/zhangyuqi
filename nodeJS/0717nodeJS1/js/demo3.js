


//运行这个js文件时，当它退出的时候，使用了一个事件监听
process.on("exit",function(){
	console.log("我是退出的程序")
})
console.log("我是打印出来的程序")