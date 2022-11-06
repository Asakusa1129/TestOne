window.onload = function() {
	function getDateFormat(time){
		var year = time.getFullYear(); //年
		var mouth = time.getMonth() + 1; //月
		var day = time.getDate(); //日
		var hour = time.getHours(); //小时
		var min = time.getMinutes(); //分钟
		var sec = time.getSeconds(); //秒
		if (day < 10) {
			day = "0" + day;
		}
		if (min < 10) {
			min = "0" + min;
		}
		if (sec < 10) {
			sec = "0" + sec;
		}
		return "日期: " + year + " - " + mouth + " - " + day + " " + hour + ":" + min + ":" + sec;
	}
	
	function getChineseWeek(week){
		switch (week) {
			case 0:
				return "日";
				break;
			case 1:
				return "一";
				break;
			case 2:
				return "二";
				break;
			case 3:
				return "三";
				break;
			case 4:
				return "四";
				break;
			case 5:
				return "五";
				break;
			case 6:
				return "六";
				break;
		}
	}
	
	function getFriendlyMsg(hour){
		if (hour > 0 & hour <= 6) {
			return "当前凌晨，注意休息。";
		} else if (hour <= 12) {
			return "一日之计在于晨，早上好。";
		} else if (hour <= 18) {
			return "下午好。";
		} else {
			return "晚上好，记得早点休息。";
		}
	}
	
	//计时器显示时间
	window.setInterval(showtime, 1000);

	function showtime() {
		var showtime = document.getElementById("showtime");
		var time = new Date();
		var hour = time.getHours();
		var week = time.getDay();
		
		showtime.innerHTML =getDateFormat(time) +
			"<br>星期" + getChineseWeek(week) + " " + getFriendlyMsg(hour);
	}
	
	axios.get('json/sentences.json').then(
	res=>{
		if(res.status===200){
			let data=res.data.data;
			let index=0;
			function getPoem(index){
				document.getElementsByClassName("poem-title")[0].innerHTML=data[index].from;
				document.getElementsByClassName("poem-writer")[0].innerHTML=data[index].writer;
				let poem=data[index].sentence;
				var str="";
				for(value of poem){
					str+=value;
					if(value=="，"||value=="。"){
						var p=document.createElement("p");
						document.getElementsByClassName("poem-body")[0].appendChild(p);
						p.innerHTML=str;
						str="";
					}
				}
			}
			getPoem(index);
			
			document.getElementById("poemLast").onclick=function(){
				document.getElementsByClassName("poem-body")[0].innerHTML="";
				index--;
				if(index<0){
					index=data.length-1;
					getPoem(index);
				}else{
					getPoem(index);
				}
			}
			document.getElementById("poemNext").onclick=function(){
				document.getElementsByClassName("poem-body")[0].innerHTML="";
				index++;
				if(index>data.length-1){
					index=0;
					getPoem(index);
				}else{
					getPoem(index);
				}
			}
		}else{
			document.getElementsByClassName("poem-title")[0].innerHTML="未找到诗文";
		}
	},err=>{
		document.getElementsByClassName("poem-title")[0].innerHTML="查询异常";
	});
	
	axios.get('https://restapi.amap.com/v3/ip?key=7942baa16adafeb95cb36bf509375606').then(function(res){
		let address=res.data;
		document.getElementById("address").innerHTML=address.city;
		//处理获取到的位置坐标
		//将地址的经纬度左下和右上存到数组中
		let rectangle=address.rectangle+";";
		let str="";
		let localArr=[];
		for(value of rectangle){
			str+=value;
			if(value==";"||value==","){
				localArr.push(parseFloat(str).toFixed(2));
				str="";
			}
		}
		//求出两经纬坐标的中间值，即坐标中心的经纬度
		let longitude=((parseFloat(localArr[0])+parseFloat(localArr[2]))/2).toFixed(2);
		let latitude=((parseFloat(localArr[1])+parseFloat(localArr[3]))/2).toFixed(2);
		
		axios.get('https://devapi.qweather.com/v7/weather/now?key=09a6816890eb46438e95911fbdf751bb&location='+longitude+','+latitude).then(function(res){
			let data=res.data;
			if(data.code==200){
				let weatherNow=data.now;
				console.log(weatherNow)
				document.getElementById("showweather").innerHTML=weatherNow.text+" "+weatherNow.temp+"℃";
				document.getElementById("weathericon").classList.add("qi-"+weatherNow.icon);
			}else{
				console.log("接口请求错误")
			}
		},function(err){
			console.log(err);
		});
	},function(err){
		console.log(err);
	});
	
	$(function() {
		//轮播图 JQuery版
		var timer = null;
		timer = window.setInterval(showCarousel, 2000);
		var index = 0;

		function showCarousel() { //自动轮播
			$(".img").eq(index).addClass("thisimg").siblings().removeClass("thisimg");
			$(".li").eq(index).addClass("thisli").siblings().removeClass("thisli");
			index++;
			if (index >= 9) {
				index = 0;
			}
		};
		$(".li").click(function() { //鼠标点击跳转
			window.clearInterval(timer); //停止
			$(this).addClass("thisli").siblings().removeClass("thisli");
			var now_list = $(this).index();
			$(".img").eq(now_list).addClass("thisimg").siblings().removeClass("thisimg");
			index = now_list;
		});
		$(".lists").mouseout(function() { //鼠标移出列表
			window.clearInterval(timer); //先清除计时器
			timer = window.setInterval(showCarousel, 2000);
		});
		
		//侧边栏下方点击按钮旋转图片
		$(".join img").click(function() {
			var x = (Math.floor(Math.random() * 9) + 1);
			$(this).attr("src", "images/xl0" + x + ".jpg"); //(JS)img.src="images/xl0"+x+".jpg";
		});
		$(".join input[type='button']").click(function() {
			//点击按钮打开计时器
			rotate();
			var interval=null;
			interval=window.setInterval(rotate,100);
			var rotateDeg=0;
			function rotate(){
				rotateDeg=rotateDeg+20;
				$(".join img").css(
				"transform","rotate(-"+rotateDeg+"deg)"
				);
				$(".join img").css(
				"border-radius","50%"
				);
				if (rotateDeg!=0){
					$(".join input[type='button']").click(function() {
						clearInterval(interval);
						interval=window.setInterval(rotate,100);
					});
				}
			};
			$(this).val("双击停止并复原");
			$(this).dblclick(function(){
				clearInterval(interval);
				rotateDeg=0;
				$(".join img").css({
					"transform":"rotate("+rotateDeg+"deg)",
					"border-radius":"0",
					"transition":"all 5s",
					"border-radius":"10px"
				});
				
				$(".join img").hover(function(){
					$(this).css({
						"transition":"all 2s",
						"border-radius":"50%"
					})
				},function(){
					$(this).css({
						"transition":"all 2s",
						"border-radius":"0"
					})
				})
				nowImg=$(".join img").attr("src");
				if(nowImg!="images/first_pic.gif"){
					$(".join img").attr("src","images/first_pic.gif");
					
				}
				$(this).val("旋转图片");
			});
		});
	});
	
};
