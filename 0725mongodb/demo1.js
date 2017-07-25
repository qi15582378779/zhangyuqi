var mongo=require("mongodb");
var assert=require("assert");
//创建一个连接池
var MongoClient=mongo.MongoClient;
//链接地址
var Urls="mongodb://localhost:27017/wahaha";
//        服务名字://主机名称：端口号/链接的数据库
//把链接地址植入
MongoClient.connect(Urls,function(err,db){
//MongoClient.connect  ----》链接数据库	
	assert.equal(err,null);
	//拿着获取到的链接     连接数据库，操作数据
	
	//修改
//	db.collection("kk").update({"name":"5hhhh"},{$set:{"birth":"2014-07-25"}},function(err,result){
//		assert.equal(err,null);
//		console.log(result);
//		console.log("关闭数据库");
//		db.close();//关闭数据库
//	})
    
    //删除
//  db.collection("kk").deleteOne({"name":"5hhhh"},function(err,data){
//  	assert.equal(err,null);
//  	console.log(data);
//  	db.close();
//  })
    
    //增加
//  db.collection("kk").insertOne({"name":"kkkkk","sex":"女","age":50},function(err,data){
//  	assert.equal(err,null);
//  	console.log(data);
//  	db.close();
//  })

    //查找
    db.collection("kk").find({"name":"4hhhh"}).toArray(function(err,data){
    	assert.equal(err,null);
    	console.log(data);
    	db.close();
    })
})

