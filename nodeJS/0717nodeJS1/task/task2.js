
//exports 封装一个定时器

function time(){
	setInterval(function time1(){
		console.log("hello")
	},1000)
}

exports.say=time;