//回调函数


function demo(a,callback){
	if(a){
		var name=a;
		callback(name)  //回调函数调用
	}else{
		//自定义错误
		var err=new Error("这是我自定义的错误");
		callback(err)
	}
}

demo("nanshou",function(a){
	console.log(a)
})
