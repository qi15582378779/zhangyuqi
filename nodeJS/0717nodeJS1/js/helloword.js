console.log("hello word!");
console.log(__dirname);
console.log(__filename);

function time(){
	console.log("hello");
//	clearInterval(t);//清空定时器
}
var t=setInterval(time,1000);//设置定时器

module.exports=time;