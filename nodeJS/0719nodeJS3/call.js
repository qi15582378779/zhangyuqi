var call=require("./callback/call1.js");
console.log(call)

call("hjk",function(err,data){
	if(err){
		console.log(err)
	}else{
		console.log(data+"高交会馆")
	}
});
