//

function meet(name,callback){
	if(name){
		var Myname=name;
		callback(err,Myname)
	}else{
		var err=new Error("检查第一个参数传递进来没有");
		callback(err)
	}
}
module.exports=meet;


//meet("火腿饭",function(err,data){
//	if(err){
//		console.log(err)
//	}else{
//		console.log("已经做好"+data+",尽情想用！")
//	}
//})