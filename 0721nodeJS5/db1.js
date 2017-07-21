// 通过js===》 对数据库 进行  增删改查


var mysql=require("mysql");
//准备链接的过程
//创建一个要连接到mysql上面的 地址
var pool=mysql.createPool({  //链接池
	host:"localhost", //主机名称
	//port:"33060"   端口号  默认时，不用写
	user:"root",
	password:"admin",
	database:"mydata1"    //我要连接到那个数据库
});
pool.getConnection(function(err,connection){  // 获取链接
	//connection   第二个参数就是链接到数据库获取的链接
	if(err) throw err;
	//通过获取到的链接===》发送js里面执行的  对于数据库的操作
	connection.query("insert into kk values(?,?,?,?)",[0,'测试2',1,'2017-07-21'],function(err,data){
		if(err){
			throw err
		}else{
			console.log(data)
		}
	});
	connection.release(); //释放链接
})
