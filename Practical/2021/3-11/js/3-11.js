$(function(){
	var timer=window.setInterval(showPic,2000);
	var index=0;
	
	function showPic(){
		$(".img").eq(index).addClass("now").siblings().removeClass("now");
		$(".list").eq(index).addClass("li").siblings().removeClass("li");
		index++;
		if(index>=5){
			index=0;
		}
	}
	$(".list").mouseover(function(){
		window.clearInterval(timer);
		index=$(this).index();
		showPic();
	});
	$(".list").mouseout(function(){
		timer=window.setInterval(showPic,2000);
	});
	
	$(".center-left-bottom li").click(function(){
		alert($(this).children("p").text());
	});
	$(".center-right li").click(function(){
		alert($(this).text());
	});
});