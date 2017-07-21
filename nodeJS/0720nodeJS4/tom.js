var http=require("http");
http.createServer(function(request,response){
	//request===>浏览器对服务器发送的请求
	//response===》服务器对浏览器返回的数据||结果，都会在response上反映
	
	response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	response.write("<ul><li>这是我第一个服务器</li></ul>");
	response.end()  //====>结束请求，如果不写，浏览器就会一直处于再加载状态
}).listen(2000);
