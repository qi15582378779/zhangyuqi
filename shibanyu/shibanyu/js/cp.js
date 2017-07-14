//使用angularjs实现数据变换
angular.module("app",["ng","ngRoute"]).controller("Mc1",function($http,$scope){
	$http.get("js/data.json").success(function(data){
		var datas=data.goods;
		$scope.arr=[];	
		//封装一个函数，后面直接调用
		Goods=function(){
			i=2;
			$scope.arr=arrhuoguo.slice(0,2);
			$scope.hid1=true;
			$scope.hid2=false;
			$scope.next=function(){
				$scope.hid1=false;
				$scope.arr=arrhuoguo.slice(i,i+2);
				i+=2;
				if (i>=arrhuoguo.length) {
					$scope.hid2=true;
				}else{
					$scope.hid2=false;
				}
			}
			$scope.prev=function(){
				$scope.hid2=false;
				i-=2;
				$scope.arr=arrhuoguo.slice(i-2,i);
				if (i==2) {
					$scope.hid1=true;
				}else{
					$scope.hid1=false;
				}
			}
		}
		var arrhuoguo=datas.slice(0);
		Goods();
		$scope.all=function(){
			arrhuoguo=datas.slice(0);
			Goods();
		}	
		$scope.huoguo=function(){
			arrhuoguo=datas.slice(0,15);
			Goods();
		}
		$scope.difangcai=function(){
			arrhuoguo=datas.slice(15,25);
			Goods();
		}
		$scope.xican=function(){
			arrhuoguo=datas.slice(25,32);
			Goods();
		}
		$scope.kuaican=function(){
			arrhuoguo=datas.slice(32,50);
			Goods();
		}
		$scope.tese=function(){
			arrhuoguo=datas.slice(12,30);
			Goods();
		}
		$scope.tuijian=function(){
			arrhuoguo=datas.slice(28,40);
			Goods();
		}
		$scope.jingpin=function(){
			arrhuoguo=datas.slice(30,50);
			Goods();
		}
	})
	
}).config(function($routeProvider){
	$routeProvider.when("/cp",{
		templateUrl:"temp/caipin1.html"
	}).when("/cpxq",{
		templateUrl:"temp/cpxq.html"
	}).when("/team",{
		templateUrl:"team.html"
	}).when("/vip",{
		templateUrl:"temp/vip.html"
	}).when("/integral",{
		templateUrl:"temp/integral.html"
	}).when("/pass",{
		templateUrl:"temp/password.html"
	}).when("/order",{
		templateUrl:"temp/order.html"
	}).when("/exchange",{
		templateUrl:"temp/exchange.html"
	}).when("/team",{
		templateUrl:"temp/team1.html"
	})
	.otherwise({
		redirectTo:"/cp"
	})
}).controller("luyou",function(){
	
}).controller("cpxq",function($scope,$routeParams){
	$scope.aid=$routeParams.mid;
	$scope.aimag=$routeParams.mimag;
	$scope.aprice=$routeParams.mprice;
	$scope.aVIP=$routeParams.mVIP;
	$scope.atime=$routeParams.mtime;
	$scope.ajifen=$routeParams.mjifen;
	$scope.atedian=$routeParams.mtedian;
	
	var ti=document.getElementById("bnn");
	ti.onclick=function tj(){
		var txt=$("#text").val();
		var val=$("#tar").val();
		var time=new Date().toLocaleString();
		var text=$("<li><img src='img/liuyan.png'/><span class='sp1'>"+txt+"</span><span class='sp2'>"+time+"</span></li>");
		var html=$("<li class='ll'>"+val+"</li>");
		$(".ul").prepend(html);
		$(".ul").prepend(text);
		$("#text").val("");
		$("#tar").val("");
	}
})





