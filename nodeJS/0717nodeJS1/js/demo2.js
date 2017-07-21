
//同步和异步的时候，优先执行同步
//setTimeout 属于异步



console.log(1);
setTimeout(function(){
	console.log(2)
},2000);
console.log(3)
