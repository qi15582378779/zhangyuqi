var http=require("http");
http.createServer(function(requerst,response){
	//requerst  代表前端发送的请求
	//response  代表服务器  返回的响应
	
	response.writeHead(200,{"Content-type":"text/html;charset=utf-8"});
	response.write("<ul><li style='list-style: none;'>51</li></ul>"+"<div style='width:200px;height:300px;border: 1px solid black;'>我要飞的更高</div>");
	response.end();
	
}).listen(3000);
