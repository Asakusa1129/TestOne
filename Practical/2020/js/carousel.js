// 查找当前节点的兄弟节点
let findSibling=function(tag){
	let parent=tag.parentNode;
	let childs=parent.children;
	let siblings=[];
	for(var i=0;i<childs.length;i++){
		if(childs[i]==tag){
			continue;
		}
		siblings.push(childs[i]);
	}
	return siblings;
};

// js实现轮播图
window.onload=function(){
	var jsRun=window.setInterval(leftRun,1000);
	var index=0;
	var leftLi=document.getElementsByClassName("left-li");
	function leftRun(){
		document.getElementsByClassName("left-img")[0].src="images/"+(index+1)+".jpg";
		leftLi[index].style.cssText="background-color:var(--deepgrey)";
		for(var i=0;i<findSibling(leftLi[index]).length;i++){
			findSibling(leftLi[index])[i].style.cssText="background-color:var(--green)";
		}
		index++;
		if(index>leftLi.length-1){
			index=0;
		}
	}
	leftLi=Array.from(leftLi); //Array.from()方法就是将类数组对象转换为真正数组
	leftLi.forEach(function(value,item){
		leftLi[item].onmouseover=function(){
			window.clearInterval(jsRun);
			this.style.cssText="background-color:var(--deepgrey)";
			for(var j=0;j<findSibling(this).length;j++){
				findSibling(this)[j].style.cssText="background-color:var(--green)";
			}
			document.getElementsByClassName("left-img")[0].src="images/"+(item+1)+".jpg";
			index=item;
		}
		leftLi[item].onmouseout=function(){
			window.clearInterval(jsRun);
			index=item;
			jsRun=window.setInterval(leftRun,1000);
		}
	});
	
	var leftStatus=true;
	document.getElementById("leftButton").onclick=function(){
		if(leftStatus){
			this.innerHTML="启动";
			window.clearInterval(jsRun);
			leftStatus=false;
		}else{
			this.innerHTML="暂停";
			window.clearInterval(jsRun);
			jsRun=window.setInterval(leftRun,1000);
			leftStatus=true;
		}
	}
}


// jq实现轮播图
$(function(){
	var jqRun=window.setInterval(rightRun,1000);
	var index=0;
	function rightRun(){
		$(".right-li").eq(index).css({"background-color":"var(--deepgrey)"}).siblings().css({"background-color":"var(--green)"});
		$(".right-img").attr("src","images/"+(index+1)+".jpg");
		index+=1;
		if(index>$(".right-li").length-1){
			index=0;
		}
	}
	
	$(".right-li").hover(function(){
		window.clearInterval(jqRun);
		$(this).css({"background-color":"var(--deepgrey)"}).siblings().css({"background-color":"var(--green)"});
		var i=$(this).index();
		$(".right-img").attr("src","images/"+(i+1)+".jpg");
		index=i;
	},function(){
		window.clearInterval(jqRun);
		jqRun=window.setInterval(rightRun,1000);
	});
	// $(".right-li").mouseover(function(){
	// });
	// $(".right-li").mouseout(function(){
	// });
	
	var rightStatus=true;
	$("#rightButton").click(function(){
		if(rightStatus){
			$(this).text("启动");
			window.clearInterval(jqRun);
			rightStatus=false;
		}else{
			$(this).text("暂停");
			window.clearInterval(jqRun);
			jqRun=window.setInterval(rightRun,1000);
			rightStatus=true;
		}
	});
});
