/**
 * Created by guowenqiang on 2016/10/22.
 */
//实现功能接口
var express = require('express'),
    router = express.Router(),
    handler = require('./dbhandler.js'),
    formidable = require('formidable'),    //上传的模块
    crypto = require('crypto');            //加密
//var StringDecoder = require('string_decoder').StringDecoder;
//var decoder = new StringDecoder('utf8');
//
//var images = require("images");
var fs = require('fs');
var ObjectID = require('mongodb').ObjectID;  //处理mongo里面的Id
function User(user) {
  this.id=user.id;
  this.name = user.name;
  this.password = user.password;
  this.veri = user.veri;
};
var flagInt = 0;
//迭代处理删除后的系统管理员各人员的tokenId
var recUpdate = function(req, res, collections,data){
								// '要操作的集合',待处理的结果集
  if(data.length===0){
    res.end('{"success":"删除成功"}');
  }else{
    var selectors = [
      {"userName":data[0].userName},
      {$set:
      {
        "tokenId":data[0].tokenId-1
      }
      }
    ];

    req.query.action = 'update';
    handler(req, res, collections, selectors,function(dat){
      console.log(data)
      data.shift();
      console.log(11111111);
      console.log(data);
     if(data.length!=0){
        recUpdate(req, res, collections,data);
      }else{
        res.end('{"success":"更新成功"}');
      }
    });
  }
}


//迭代处理视频  删除后的ID
var recUpdateID = function(req, res, collections,data,fn){
  if(data.length===0){
    res.end('{"success":"删除成功"}');
  }else{
    var selectors = [
      {"_id":data[0]._id},
      {$set:
      {
        "ID":data[0].ID-1
      }
      }

    ];
    //console.log(fn);
    req.query.action = 'update';
    handler(req, res, collections, selectors,function(dat){
      data.shift();
      if(dat.length==0){
        res.end('{"err":"抱歉，更新失败"}');
      }else if(data.length!=0){
        //console.log(data);
        recUpdateID(req, res, collections,data,fn);
      }else{

        if(fn){
          fn();
        }else{
          res.end('{"success":"更新成功"}');
        }

      }
    });
  }
}
//迭代删除目录绑定的视频
/*
*  dirID:目录_id
*  proID:课程_id
*  VstateName:课程名称
*  data  需要处理的视频数据集
* */
var delDirVideo = function(req, res, dirID,proID,VstateName,data,fn){
  var dirIDProName = dirID+proID ;
  if(data.length===0){
    fn();
  }else{
            req.query.action='find';
            //查询与课程ID对应的目录条数看与该课程绑定的目录是否只剩一条否则不改变videoList的Vstate字段
            handler(req, res, "directoryList", {"CDid":proID},function(set){
              //console.log(set);
              //拆分Vstate去除其中的已删除课程名
              var targetArrVstate = data[0].Vstate.split(",");
              if(set.length===1){
                var indexNumberVstate = (function(arr,val) {
                  for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == val) return i;
                  }
                  return -1;
                })(targetArrVstate,VstateName);
                targetArrVstate.splice(indexNumberVstate,1);
              }
              //拆分Vmosaic去除其中的dirIDProName
              var targetArrVmosaic = data[0].Vmosaic.split(",");
              var indexNumberVmosaic = (function(arr,val) {
                for (var i = 0; i < arr.length; i++) {
                  if (arr[i] == val) return i;
                }
                return -1;
              })(targetArrVmosaic,dirIDProName);
              targetArrVmosaic.splice(indexNumberVmosaic,1);

              var selectors = [
                {"_id":data[0]._id},
                {$set:
                {
                  "Vstate":targetArrVstate.join(","),
                  "Vmosaic":targetArrVmosaic.join(",")
                }
                }

              ];
              //console.log(selectors);
              req.query.action='update';
              //更新视频列表对应数据的Vstate与Vmosaic字段
              handler(req, res, "videoList", selectors,function(da){
                data.shift();
                if(data.length==0){
                  fn();
                }else if(data.length!=0){
                  delDirVideo(req, res, dirID,proID,data,fn);

                }
              });
            });

  }
}
//迭代删除课程绑定的目录
/*
 proID 课程的_id
* */
var delProDir = function(req, res,proID,fn){
    req.query.action = 'find';
  //查询productList，获取对应ID的课程信息的_id和课程名
  handler(req, res, "productList",{_id:proID} ,function(das){
    //获取对应课程_id的目录集directoryList
    handler(req, res, "directoryList",{CDid:proID} ,function(da){
      if(da.length!==0){
        /*
         * /*
         *  dirID:目录_id
         *  proID:课程_id的拼合串
         *  VstateName:课程名称
         *  data  需要处理的视频数据集
         *
         var delDirVideo = function(req, res, dirID,proID,VstateName,data,fn){
         * */
        //获取第一个目录相关的视频集
        handler(req, res, "videoList",{ Vmosaic: { $regex: '.*'+da[0]._id+das[0]._id+'.*' } } ,function(daa){
          delDirVideo(req, res, da[0]._id,das[0]._id,das[0].Cname,daa,function(){
            //删除该目录
            req.query.action = 'delete';
            handler(req, res, "directoryList",{_id:da[0]._id} ,function(dat){
              req.query.action = 'find';
              //再次验证看该课程下是否还有目录，如果有就迭代处理
              handler(req, res, "directoryList",{CDid:proID} ,function(data){
                if(data.length===0){
                  fn();
                }else{
                  delProDir(req, res,proID,fn);
                }
              });
            });
          });

        });

      }else{
        fn();
      }
    });

  });


}
//判断对象是否为空
var isNullObj=function(obj){
  for(var i in obj){
    if(obj.hasOwnProperty(i)){
      return false;
    }
  }
  return true;
}
//生成课程代码
var generateCode = function(){    //生成四位数随机数字+字母
  var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  var numbers = ['0','1','2','3','4','5','6','7','8','9'];
  var str = "";   //容器
  for(var i=0;i<8;i++){
    if(i<4){
      str+= letters.splice(parseInt(Math.random()*(letters.length)),1);
    }else{
      str+= numbers.splice(parseInt(Math.random()*(numbers.length)),1);
    }
  }
  return str;
}

router.get("/hello",function(req,res){
	//如果想在一个接口中，根据传递的不同的参数，响应不同的数据
//	res.send("{'success':'请求成功'}");
   
    // req.query  从请求头中得到参数
    if(req.query.action==="fcxy"){
    	res.send('{"success":"请求数据成功"}')
    }else{
    	res.send('{"err":"没有当前页面"}')
    }
});



//   生成验证码

//  /VueHandler/AdminLoginAndRegHandler?action=verification
router.get("/AdminLoginAndRegHandler",function(req,res){
	if (req.query.action==="verification") {
		var randomNum=function(min,max){
			return Math.floor(Math.random()*(max-min));
		};
		var str="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
		var returnStr="";
		for(var i=0;i<4;i++){
			var txt=str[randomNum(0,str.length)];
			returnStr+=txt;
		};
//  储存用户的登录信息
		var newUser=new User({
			name:"",
			password:"",
			id:"",
			veri:returnStr
		});
		req.session.user=newUser;
		console.log(req.session);
		res.send('{"success":"成功","data":"'+returnStr+'"}');
	}

//    检验验证码是否正确
	else if (req.query.action==="checkVerification") {
		    if (req.query.veri===req.session.user.veri) {
		      res.send("{'success':'验证码正确'}")
		    }else{
		      res.send("{'err':'验证码不正确'}")
		    }
	    }
    })


//  注册账号

//  如何得到前端发送的数据   !
//   /VueHandler/AdminLoginAndRegHandler?action=add
router.post("/AdminLoginAndRegHandler",function(req,res){
	//  对于数据库进行操作
	if (req.query.action==="add") {    //执行注册功能      执行数据库操作首先要确定对于数据库的操作方法
		req.query.action="find";  // 确定对数据库的操作
		handler(req,res,"Administor",null,function(arr){
            //  加密！！！
            var md5=crypto.createHash("md5");
            //  组织用户信息
            var userInfos={};
            userInfos.createAt=new Date();
            userInfos.isdelete=/^fcgl$/.test(req.body.turename)?false:true;
            userInfos.power=req.body.power;
            userInfos.success="成功";
            userInfos.tokenId=arr.length+1;
            userInfos.upDateAt=new Date();
            userInfos.userName=req.body.userName==""?'false':req.body.userName;
            userInfos.turename=req.body.turename==""?'false':req.body.turename;
            userInfos.password=md5.update(req.body.password).digest("base64");
            userInfos.phone=/^1\d{10}$/.test(parseInt(req.body.phone))?req.body.phone:"false";
            userInfos.powerCode=req.body.powerCode=="系统管理人员"?1:2;
            // 添加数据库
            // req.query.action="add";
            // 验证
            if (userInfos.phone!='false'&&userInfos.userName!='false'&&userInfos.turename!='false') {
            	// res.end("{'success':'注册成功'}")；
            	req.query.action="show";
            	//  验证成功之后才能进行数据操作
            	handler(req,res,"Administor",{"userName":req.body.userName},function(data){
            		if (data.length==1) {
            			res.end('{"err":"已拥有该用户！！！"}')
            		}else{
            			req.query.action="add";
            			handler(req,res,"Administor",userInfos,function(datas){
            				if (datas.length==0) {
            					res.end("{'err':'注册失败！！！'}")
            				}else {
            					res.end('{"success":"注册成功！！！"}')
            				}
            			})
            		}
            	})
            }else{
            	res.end('{"err":"抱歉！用户名、姓名、手机号不能为空"}')
            }
          // if (userInfos.userName=="" && userInfos.turename=="" && userInfos.phone=="") {
          //   res.end("{'err':'用户名，姓名，手机号不能为空'}")
          // }else {
          //   req.query.action="find";
          //   handler(req,res,'Administor',{"userName":req.body.userName},function(data){
          //     console.log(data);
          //     if (data.length==1) {
          //       res.end("{'err':'已拥有该用户'}")
          //     }else {
          //       req.query.action="add";
          //       handler(req,res,"Administor",userInfos,function(datas){
          //         if (datas.length==0) {
          //            res.end('{"err":"注册失败！！！"}')
          //          }else{
          //            res.end('{"success":"注册成功!!!"}')
          //          }
          //       })
          //     }
          //   })
          // }
		})
	}

//账号登录
	else if(req.query.action=="login"){
		var md5=crypto.createHash("md5");
		var password=md5.update(req.body.password).digest("base64");
		//根据前端发送的数据 对比数据库里面的信息 判断登录！
		handler(req,res,"Administor",{userName:req.body.userName,password:req.body.password},function(data){
			console.log(data);
			if (data.length===0) {
				res.end('{"err":"抱歉，系统里没有此用户！"}');
			}else{
				req.session.user.name=req.body.userName;
				req.session.user.password=password;
				req.session.user.id=data[0]._id;
				//此时 服务器 才真正 拥有了一个完整登录的用户信息！
				console.log(req.session);
				console.log(req.session.user);
				res.end('{"success":"登录成功！"}')
			}
		})
	}
});

//退出账号！
router.get("/AdminHandler",function(req,res){
	if (req.query.action==="quit") {
		if (req.session.user) {
			req.session.user={};
		}
		res.end('{"success":"退出成功！"}')
	}

//查询显示数据库里面的数据
  else if (req.query.action=="show") {
    //     /VueHandler/AdminHandler?action=show
    handler(req,res,"Administor",null,function(arr){//查询数据库里的数据
      // pageStart  页数
      // {$gt:3*(parseInt(req.query.pageStart)-1),$lte:3*parseInt(req.query.pageStart)}       正序的排序
      // {$gt:arr.length-(parseInt(req.query.pageStart)*3-3)-3,$lte:arr.length-(parseInt(req.query.pageStart)*3-3)}     倒序的排序


      // 根据关键字查询
      // var selector={turename:{$regex:'.*'+req.query.searchText+'.*',$options:'i'}};
                          //使用正则   '.*'=====>相当于通配符       $options ===》不区分大小写

      //分页
      // var selector={"tokenId":{$gt:3*(parseInt(req.query.pageStart)-1),$lte:3*parseInt(req.query.pageStart)}};


      //综合    根据关键字查询要比pageStart优先级别高
    var selector=!req.query.searchText?{"tokenId":{$gt:3*(parseInt(req.query.pageStart)-1),$lte:3*parseInt(req.query.pageStart)}}:{turename:{$regex:'.*'+req.query.searchText+'.*',$options:'i'}};
      handler(req,res,"Administor",selector,function(data){
        if (data.length==0) {
          res.end("{'err':'抱歉，系统里没有该用户'}")
        }else {
          var obj={
            data:{
              pageSize:3,
              count:arr.length,
              list:data
            }
          }
          var str=JSON.stringify(obj);
          res.end(str);
        }
      })
    })
  }
//系统人员迭代删除操作
//    /VueHandler/AdminHandler?action=delete
  else if (req.query.action=="delete") {
    handler(req,res,"Administor",{tokenId:parseInt(req.query.tokenId),isdelete:true},function(data){
      if (data.result.n==0) {   //data   这个是删除的结果集
        res.end("{'err':'删除失败'}")
      }else {
        req.query.action="show";
        handler(req,res,"Administor",{tokenId:{$gt:parseInt(req.query.tokenId)}},function(datas){    //datas   这个是查询到的删除的Id之后的数据
          recUpdate(req,res,"Administor",datas)
        });
        res.end("{'success':'删除成功'}")
      }
    })
  }


//  学员删除操作
    else if (req.query.action="deletes") {
    	handler(req,res,"studentMax",{tokenId:parseInt(req.query.tokenId)},function(data){
    		if (data.result.n==0) {
    			res.end("{'err':'删除失败'}")
    		}else {
    			req.query.action="find";
    			handler(req,res,"studentMax",{tokenId:{$gt:parseInt(req.query.tokenId)}},function(datas){
    				recUpdate(req,res,"studentMax",datas)
    			});
    			res.end("{'success':'删除成功'}")
    		}
    	})
    }
});


//登录之后返回个人信息
// /VueHandler/AdminHandler?action=returnuserinfo
router.post("/AdminHandler",function(req,res){
	if(req.query.action==="returnuserinfo"){
		req.query.action="find";
//  	已经登录了  session 里面已经记录了登陆的账号信息     从session里面取到id的值    到数据库里查找数据
		var sessionId=new ObjectID(req.session.user.id);
		handler(req,res,"Administor",{"_id":sessionId},function(data){
			if(data.length==0){
				res.end("{'err':'抱歉，你没有登录'}")
			}else{
				console.log(data)
				var str=JSON.stringify(data[0]);
				res.end(str)
			}
		})
	}else if(req.query.action=='updatepass'){
  //   前端传进密码 ==》 对于数据库来说 （加密）
    var md5=crypto.createHash('md5');
    var passwordMd5=md5.update(req.body.userPwd).digest('base64');
    //判断  手动输入的原始密码和登录密码  是否一样
    if(req.session.user.password!=passwordMd5){
    	res.end("{'err':'输入的登录密码不正确'}")
    }else{
    	var md56=crypto.createHash("md5");
    	var newPwd=req.session.user.password=md56.update(req.body.newPwd).digest("base64");
    	//对于数据库
    	var selector=[
    		{"_id":new ObjectID(req.session.user.id)},
    		{$set:{
    			"password":newPwd,
    			"upDateAt":new Date()
    		}}
    	];
    	//定义对于数据库的操作方法
    	handler(req,res,"Administor",selector,function(data){
    		if(data.length==0){
    			res.end("{'err':'密码修改失败'}")
    		}else{
    			res.end("{'success':'密码修改成功'}")
    		}
    	})
    }
  }
//修改资料
  else if (req.query.action=="update") {
   //  /VueHandler/AdminHandler?action=update
    var selector=[
      {"tokenId":parseInt(req.body.tokenId)},
      {$set:{
        "userName":req.body.userName,
        "turename":req.body.turename,
        "phone":req.body.phone,
        "power":req.body.power,
        "upDateAt":new Date()
      }}
    ];
    handler(req,res,"Administor",selector,function (data) {
      if (data.length==0) {
        res.end("{'err':'抱歉，更新失败'}")
      }else {
        res.end("{'success':'更新成功'}")
      }
    })
  }

//添加学员
  else if (req.query.action=="adduser") {
  	// res.end("{'success':'接口走通'}");
	req.query.action="find";
	handler(req,res,"studentMax",null,function(arr){
		var studentList={};
		studentList.tokenId=arr.length+1;
		studentList.createAt=new Date();
		studentList.userName=req.body.userName==""?"false":req.body.userName;
		studentList.phone=/^1\d{10}$/.test(parseInt(req.body.phone))?req.body.phone:"false";
		studentList.success="成功";
		studentList.upDateAt=new Date();
		studentList.isstate=false;
		studentList.email=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(req.body.email)?req.body.email:"false";
		studentList.userPwd="123456";
		// console.log(studentList)
		// req.query.action="add";
		if (studentList.userName!="false"&&studentList.phone!="false"&&studentList.email!="false") {
			req.query.action="find";
			handler(req,res,"studentMax",{"userName":req.body.userName},function(data){
				if (data.length>=1) {
					res.end("{'err':'已拥有该学员'}")
				}else {
					req.query.action="add";
					handler(req,res,"studentMax",studentList,function(datas){
						if (datas.length==0) {
							res.end("{'err':'注册失败'}")
						}else {
							res.end("{'success':'注册成功'}")
						}
					})
				}
			})
		}else {
			res.end("{'err':'不能为空'}")
		}
	})
  }

//    添加小学生
  // else if (req.query.action=="xxs") {
  // 	req.query.action="find";
  // 	handler(req,res,"studentMin",null,function(arr){
  // 		var studentInfos={};
  // 		studentInfos.tokenId=arr.length+1;
  // 		studentInfos.createAt=new Date();
  // 		studentInfos.userName=req.body.userName==""?false:req.body.userName;
  // 		studentInfos.need="王者100点";
  // 		studentInfos.dsc=req.body.dsc;
  // 		if (studentInfos.userName!="false") {
  // 			req.query.action="add";
  // 			handler(req,res,"studentMin",studentInfos,function(data){
  // 				if (data.length==0) {
  // 					res.end("{'err':'没有该字段'}")
  // 				}else {
  // 					res.end("{'success':'创建成功'}")
  // 				}
  // 			})
  // 		}else{
  // 			res.end("{'err':'姓名不能为空'}")
  // 		}
  // 	})
  // }
})


//上传视频
router.post("/UploadVideoHandler",function(req,res){
	//这个路由是单独给上传视频用的
	var form =new formidable.IncomingForm();   //创建一个上传的表单
	//上传的配置
	form.encoding="utf-8";
	form.uploadDir="temporary/video";       //路径？  以我的服务器所在的路径为标准app.js
	form.keepExtensions=true;               //保留文件尾缀
	form.maxFieldsSize=100*1024*1024;
	form.maxFields=1000;
	form.parse(req,function(err,fields,files){
		console.log(fields);
		console.log("分界线——————————————————————————————————————————");
		console.log(files);      //文件信息
		console.log("分界线——————————————————————————————————————————");
		if (!err) {
			var obj={   //如果上传成功，前端   我上传的文件的路径是什么
				cacheName:files[Object.getOwnPropertyNames(files)[0]].path,
				//getOwnPropertyNames     获取文件路径
				success:"上传成功"
			}
			var str=JSON.stringify(obj);
			res.end(str)
		}else {
			var obj={
				err:"你上传的文件有毒"
			}
			var str=JSON.stringify(obj);
			res.end(str)
		}
	})
})


//上传的数据传送到数据库
router.post("/VideoHandler",function(req,res){
	//   /VueHandler/VideoHandler?action=
	if (req.query.action=="add") {
		req.query.action="find";        //tonkenId
		handler(req,res,"videoList",null,function(arr){
			var videos={};    //信息的组织校验
			videos.Vname=req.body.Vname;
			videos.Vtime=req.body.Vtime;
			videos.Vurl=req.body.Vurl;
			videos.createAt=new Date();
			videos.ID=arr.length+1;
			videos.Vstate="";
			videos.upDateAt=new Date();
			videos.isFinish=false;
			videos.isViewed=false;
			if(videos.Vname&&videos.Vtime&&videos.Vurl){
				req.query.action="add";
				handler(req,res,"videoList",videos,function(data){
					if (data.length==0) {
						res.end("{'err':'添加失败'}")
					}else {
						var obj={
							ID:parseInt(data.ops[0].ID),
							Vurl:data.ops[0].Vurl,
							success:"成功"
						}
						var str=JSON.stringify(obj);
						res.end(str);
					}
				})
			}
		})
	}

//修改视频信息
	else if (req.query.action=="update") {
		//现在根据ID进行修改
		req.query.action="find";
		handler(req,res,"videoList",{ID:parseInt(req.body.ID)},function(data){
			if (data.length==0) {
				res.end("{'err':'抱歉，系统里没有此视频'}")
			}else{
				if (data[0].Vurl!=req.body.Vurl) {
					// 路径不相符， 删除源url指向的视频
					fs.unlink(data[0].Vurl,function(err){
						if(err) return console.log(err);
					})
				}
				var selector=[
					{"ID":parseInt(req.body.ID)},
					{$set:{
						Vname:req.body.Vname,
						Vtime:req.body.Vtime,
						Vurl:req.body.Vurl,
						upDateAt:new Date()
					}}
				]
				req.query.action="update";
				handler(req,res,"videoList",selector,function(datas){
					if(datas.length==0){
						res.end("{'err':'修改失败'}")
					}else {
						res.end("{'success':'修改成功'}")
					}
				})
			}
		})
	}

//查询视频
	else if (req.query.action=="showlist") {
		var selector={};
		if(req.body.searchText){     //根据模糊字查询
			selector.Vname={$regex:".*"+req.body.searchText+".*"}
		}
		handler(req,res,"videoList",null,function(arr){
			// var selector=!req.body.searchText?{"ID":{$gt:arr.length-(parseInt(req.body.pageStart)*3-3)-3,$lte:arr.length-(parseInt(req.body.pageStart)*3-3)}}:{Vname:{$regex:'.*'+req.body.searchText+'.*',$options:'i'}};
			//倒序的方法    {$gt:arr.length-(parseInt(req.body.pageStart)*3-3)-3}
			if(isNullObj(selector)){    //判断selector是否为空，如果为空，按照页数来查询
				selector={"ID":{$gt:arr.length-(parseInt(req.body.pageStart)*3-3)-3,$lte:arr.length-(parseInt(req.body.pageStart)*3-3)}}
			}
			handler(req,res,"videoList",selector,function(data){
				if(data.length==0){
					res.end("{'err':'没有该视频'}")
				}else{
					var obj={
						data:{
							pageSize:3,
							count:arr.length,
							list:data,
							pageStart:req.body.pageStart
						},
						success:"成功"
					};
					var str=JSON.stringify(obj);
					res.end(str)
				}
			})
		})
	}
})

//删除视频
router.get("/VideoHandler",function(req,res){
	if(req.query.action=="delete"){
// 1.删除服务器里面对应的视频  2.删除集合里面的数据（迭代）
		req.query.action="find";
		handler(req,res,"videoList",{ID:parseInt(req.query.ID)},function(data){
			if(data.length==0){
				res.end("{'err':'系统里没有此视频'}")
			}else{
				//删除服务器里的视频   Vurl
				fs.unlink(data[0].Vurl,function(err){
					if(err) return console.log(err);
				});
				//视频已经删除，下来需要删除的是集合里面的数据
				req.query.action="delete";
				handler(req,res,"videoList",{ID:parseInt(req.query.ID)},function(data){
					if(data.result.n==0){
						res.end("{'err':'删除失败'}")
					}else {
						req.query.action="find";
						handler(req,res,"videoList",{ID:{$gt:parseInt(req.query.ID)}},function(da){
							recUpdateID(req,res,"videoList",da)
						})
						res.end("{'success':'成功'}")
					}
				})
			}
		})
	}
})

module.exports = router;
