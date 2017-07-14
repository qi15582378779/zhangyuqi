//底部菜单隐藏与显示
var foot_li=document.getElementsByClassName('footer')[0].getElementsByTagName('li');
var foot_chanpin=document.getElementsByClassName('footer')[0].getElementsByClassName('caipin-hid');
for(var i=0;i<foot_li.length;i++){
	foot_li[i].index=i;
	foot_li[i].onclick=function(ev){
		for(j=0;j<foot_chanpin.length;j++){
			foot_chanpin[j].style.display="none";
		}
		foot_chanpin[this.index-1].style.display="block";
		ev.stopPropagation();//阻止冒泡
	}
}
$(".body").click(function(){
	$('.caipin-hid').css({"display":"none"});
})

//var navtab=document.getElementsByClassName('navtab')[0].getElementsByTagName('li');
//for(i=0;i<navtab.length;i++){
//	navtab[i].index=i;
//	navtab[i].onclick=function(){
//		for(j=0;j<navtab.length;j++){
//			navtab[j].className='';
//		}
//		navtab[this.index].className="navtab1";
//	}
//}

$('.beVip').click(function(){
	$('.vip').css({"display":"block"})
})
$(".yinc").click(function(){
	$('.vip').css({"display":"none"})
})

window.onload=function(){
	document.documentElement.style.fontSize=document.documentElement.clientWidth/7.5+"px";
	window.addEventListener("resize",function(){
	    document.documentElement.style.fontSize=document.documentElement.clientWidth/7.5+"px";	
	})
}
var denglu=document.getElementsByClassName('denglu')[0];
var zhuce=document.getElementsByClassName('zhuce')[0];
var zhanghao1=document.getElementsByClassName('zhanghao1')[0];
var mima1=document.getElementsByClassName('mima1')[0];
zhuce.onclick=function(){
		var keys=mima1.value;
		for(var i=0;i<localStorage.length;i++){
			if(zhanghao1.value==localStorage.key(i)){
				alert("该账号已存在！");
				keys=localStorage.getItem(localStorage.key(i));
			}
		}
		localStorage.setItem(zhanghao1.value,keys);
}
denglu.onclick=function(){
	for(var i=0;i<localStorage.length;i++){
		if(zhanghao1.value==localStorage.key(i) && mima1.value==localStorage.getItem(localStorage.key(i))){
			alert("登录成功");
			$('.vip').css({"display":"none"})
		}
	}
		
}
	
