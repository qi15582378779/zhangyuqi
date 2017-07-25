//封装


var mongo=require("mongodb");
var assert=require("assert");
//创建一个连接池
var MongoClient=mongo.MongoClient;
//链接地址
var Urls="mongodb://localhost:27017/wahaha";
/***************************************************************************/

//删除
var deletes=function(db,collections){
	db.collection(collections).deleteOne({"name":"kkkkk"},function(err,data){
		assert.equal(err,null);
		console.log("删除成功")
	})
}


MongoClient.connect(Urls,function(err,db){
//MongoClient.connect  ----》链接数据库	
	assert.equal(err,null);
	deletes(db,"kk");
	db.close();
})
