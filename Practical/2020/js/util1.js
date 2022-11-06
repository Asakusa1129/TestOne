layui.use(['jquery','element','layer','form','code'],function(){
	var $=layui.jquery;
	var element=layui.element;
	var layer=layui.layer;
	var form=layui.form;
	var code=layui.code();
	
	function nullError(){
		var errorMsg="空数据，让我很难算呀 = =";
		layer.msg(errorMsg);
	}
	function notNumberError(){
		var errorMsg="不是数字，让我很难算呀 = =";
		layer.msg(errorMsg);
	}
	function notOperationError(){
		var errorMsg="不是合法操作符，让我很难算呀 = =";
		layer.msg(errorMsg);
	}
	function isZeroError(){
		var errorMsg="数据格式不正确。";
		layer.msg(errorMsg);
	}
	function notLessZeroError(){
		var errorMsg="数值不能小于0。";
		layer.msg(errorMsg);
	}
	function notIntegerError(){
		var errorMsg="暂不支持小数。";
		layer.msg(errorMsg);
	}
	function getTrueWeek(today){
		if(today>=7||today<0){
			return false;
		}else{
			return true;
		}
	}
	function getChineseWeek(week){
		switch(week){
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
	function getTime(){
		var date=new Date();
		var year=date.getFullYear();
		var month=date.getMonth()+1;
		var day=date.getDate();
		var hour=date.getHours();
		var min=date.getMinutes();
		var sec=date.getSeconds();
		//初始化小于10的小时 分钟 秒数等
		if (day < 10) {
			day = "0" + day;
		}
		if (hour < 10) {
			hour = "0" + hour;
		}
		if (min < 10) {
			min = "0" + min;
		}
		if (sec < 10) {
			sec = "0" + sec;
		}
		var week=date.getDay();
		week=getChineseWeek(week);
		return year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec+" 星期"+week;
	}
	//字体大小
	changeSize=function(size){
		$("input").css('font-size',size+'px');
	}
	//颜色改变
	changeColor=function(color){
		$("input").css('color',color);
		$("button").css('background-color',color);
		$("lable").css('color',color);
		$("span").css('color',color);
		$("#function").css('background-color',color);
		$("#codeInfo").css('color',color);
	}
	//重置
	$("#reset").click(function(){
		location.reload(true);
	});
	changeBackgroundColor=function(color){
		layer.msg("暂时无功能");
	}
	
	//计算圆
	$("#getCircle").click(function(){
		if($("#r").val()==""||$("#r").val()==null||$("#r").val()==undefined){
			nullError();
		}else if(isNaN($("#r").val())){
			notNumberError();
		}else if($("#r").val().length>1&&$("#r").val()[0]==0){
			isZeroError();
		}else{
			var r=$("#r").val().trim().replace(/\s/g,"");
			var l=Math.PI*r*2;
			var s=Math.PI*r*r;
			var index=layer.open({
				title:'计算结果',
				btn:['OK','保留两位小数'],
				content:"<div style='letter-spacing: 1px'>半径为<span style='color:green;font-weight:bold;'>"+r+"</span>的圆<br>周长为:<span style='color:green'>"+l+"</span><br>面积为:<span style='color:green'>"+s+"</span><div>",
				btn1:function(){
					layer.close(index);
					$("#utilsFormFirst")[0].reset();
				},
				btn2:function(){
					l=l.toFixed(2);
					s=s.toFixed(2);
					var newIndex=layer.open({
						title:'保留两位小数',
						btn:['关闭'],
						content:"<div>周长为:<span style='color:green'>"+l+"</span><br>面积为:<span style='color:green'>"+s+"</span></div>",
						btn1:function(){
							layer.closeAll();
						}
					});
				}
			});
		}
	});
	//算数
	var operationMsg
	$("#operation").mouseover(function(){
		operationMsg=layer.tips('操作符有+、-、*、/、%(求余)、支持(**)求幂','#operation',
		{
		  tips: 3
		});
	});
	$("#operation").mouseout(function(){
		layer.close(operationMsg);
	});
	
	$("#getAnswer").click(function(){
		
		if($("#num1").val()==""||$("#num1").val()==null||$("#num1").val()==undefined||$("#num2").val()==""||$("#num2").val()==null||$("#num2").val()==undefined){
			nullError();
		}else if(isNaN($("#num1").val())||isNaN($("#num2").val())){
			notNumberError();
		}else if($("#operation").val()==""||$("#operation").val()==null||$("#operation").val()==undefined){
			layer.alert($("#num1").val()+$("#num2").val()+" ⇤字符串已拼接(没有操作符)", {icon: 2});
		}else if($("#operation").val().indexOf("+")<0&&$("#operation").val().indexOf("-")<0&&$("#operation").val().indexOf("*")<0&&$("#operation").val().indexOf("/")<0&&$("#operation").val().indexOf("%")<0&&$("#operation").val().indexOf("**")<0){
			notOperationError();
		}else{
			var answer;
			var num1=parseFloat($("#num1").val());
			var num2=parseFloat($("#num2").val());
			switch($("#operation").val()){
				case "+":
					answer=num1+num2;
					break;
				case "-":
					answer=num1-num2;
					break;
				case "*":
					answer=num1*num2;
					break;
				case "/":
					answer=num1/num2;
					break;
				case "%":
					answer=num1%num2;
					break;
				case "**":
					answer=Math.pow(num1,num2);
					break;
			}
			if(answer==Infinity||answer==null){
				layer.alert("结果有误请检查一下你的数值类型", {icon: 2});
			}else{
				var index=layer.open({
					title:'结果',
					content:"<div style='letter-spacing: 1px;font-weight:bold'>"+num1+$("#operation").val()+num2+"="+answer+"</div>",
					btn:['OK'],
					end:function(){
						layer.close(index);
						$("#utilsFormFirst")[0].reset();
					}
				});
			}
		}
	});
	
	//获取n天后
	$("#getWeek").click(function(){
		if($("#today").val()==""||$("#today").val()==null||$("#today").val()==undefined||$("#day").val()==""||$("#day").val()==null||$("#day").val()==undefined){
			nullError();
		}else if(isNaN($("#today").val())||isNaN($("#day").val())){
			notNumberError();
		}else if($("#today").val().indexOf(".")>=0&&$("#today").val().indexOf(".")>=0){
			notIntegerError();
		}else{
			if(getTrueWeek($("#today").val())){
				//起始天
				var today=parseInt($("#today").val());
				//经过天数
				var day=parseInt($("#day").val());
				// 总天数与一周天数求余 例如：20%7=6 如当前周一 1+6=7 与7取余为0 即周日
				var end=getChineseWeek((today+day%7)%7);
				$("#theWeek").val(end);
			}else{
				layer.alert("数据有误请重试(0~6代表周日 ~ 周六)", {icon: 2});
			}
		}
	});

	//n数和
	$("#numberAdd").click(function(){
		if($("#allNumber").val()==""||$("#allNumber").val()==null||$("#allNumber").val()==undefined){
			nullError();
		}else if(isNaN($("#allNumber").val())||isNaN($("#allNumber").val())){
			notNumberError();
		}else if($("#allNumber").val().indexOf(".")>=0){
			notIntegerError();
		}else if($("#allNumber").val().length>1&&$("#allNumber").val()[0]==0){
			isZeroError();
		}else{
			var allNumber=$("#allNumber").val().trim().replace(/\s/g,"");
			var allNumberAdd=0;
			for(var i=0;i<allNumber.length;i++){
				allNumberAdd+=parseInt(allNumber[i]);
			}
			var index=layer.open({
				title:false,
				shadeClose:true,
				closeBtn:false,
				content:"<span style='color:green;font-weigth:bold;letter-spacing: 1px'>结果:"+allNumberAdd+"</span>",
				end:function(){
					layer.close(index);
					$("#utilsFormFirst")[0].reset();
				}
			});
		}
	});

	$("#guessMsg").mouseover(function(){
		guessMsg=layer.tips('生成随机数1-100','#guessMsg',
		{
		  tips: 1,
		});
	});
	$("#guessMsg").mouseout(function(){
		layer.close(guessMsg);
	});
	//猜数字
	var random=Math.floor(Math.random()*100);
	$("#guess").click(function(){
		console.log("会F12的人运气一定不会太差，悄悄告诉你随机数是："+random);
		var guessTimes=1;
		var index=layer.prompt({
			title: '猜数字',
			formType: 2,
			offset: ['120px', '60px'],
			value: 50,
			resize:false,
			area:['100px','20px']
			},
			function(value, index, elem){
					if(value!=random){
						if(isNaN(value)){
							notNumberError();
							guessTimes+=1;
						}else if(value.indexOf(".")>=0){
							notIntegerError();
							guessTimes+=1;
						}else if(value>100){
							layer.msg("数大了");
							guessTimes+=1;
						}else if(value<0){
							layer.msg("数小了");
							guessTimes+=1;
						}else if(value>random){
							layer.msg("猜大了");
							guessTimes+=1;
						}else{
							layer.msg("猜小了");
							guessTimes+=1;
						}
						index=layer.prompt({
							title: '猜数字',
							formType: 2,
							offset: ['120px', '60px'],
							value: 50,
							area:['100px','20px']
						});
					}else{
						layer.close(index);
						layer.alert("<div style='font-weigth:bold;letter-spacing: 1px'>猜对了,该数字是:<span style='color:green;'>"+value+"</span> 你共猜了<span style='color:green;'>"+guessTimes+"</span>次</div>");
					}
			  layer.close(index);
			});
	});
	
	$("#radomMsg").mouseover(function(){
		radomMsg=layer.tips('选择你的随机数范围','#radomMsg',
		{
		  tips: 1,
		});
	});
	$("#radomMsg").mouseout(function(){
		layer.close(radomMsg);
	});
	
	$("#start").click(function(){
		var version=$("#version").val();
		if(version==1){
			randomVersoin1();
		}
		if(version==2){
			randomVersoin2();
		}
		if(version==""||version==null||version==undefined){
			layer.msg("还未选择版本");
		}
	});
	
	/**
	 * 随机数
	 * version1.0
	 */
	function randomVersoin1(){
		if($("#beginNum").val()==""||$("#beginNum").val()==null||$("#beginNum").val()==undefined||$("#endNum").val()==""||$("#endNum").val()==null||$("#endNum").val()==undefined){
			nullError();
		}else if($("#beginNum").val()<0||$("#endNum").val()<0){
			notLessZeroError();
		}else if(isNaN($("#beginNum").val())||isNaN($("#endNum").val())){
			notNumberError();
		}else if($("#beginNum").val().indexOf(".")>=0||$("#endNum").val().indexOf(".")>=0){
			notIntegerError();
		}else if($("#beginNum").val()>$("#endNum").val()){
			layer.msg("n2>n1");
		}else if($("#beginNum").val()==$("#endNum").val()){
			layer.msg($("#beginNum").val());
		}else{
			var beginNum=parseInt($("#beginNum").val());
			var endNum=parseInt($("#endNum").val());
			var random=Math.round((Math.random()*(endNum-beginNum))+beginNum);
			$("#radomNum").val(random);
		}
	}
	/**
	 * 随机数
	 * version1.1
	 */
	var show = null;
	function randomVersoin2(){
		if($("#beginNum").val()==""||$("#beginNum").val()==null||$("#beginNum").val()==undefined||$("#endNum").val()==""||$("#endNum").val()==null||$("#endNum").val()==undefined){
			nullError();
		}else if($("#beginNum").val()<0||$("#endNum").val()<0){
			notLessZeroError();
		}else if(isNaN($("#beginNum").val())||isNaN($("#endNum").val())){
			notNumberError();
		}else if($("#beginNum").val().indexOf(".")>=0||$("#endNum").val().indexOf(".")>=0){
			notIntegerError();
		}else if($("#beginNum").val()>$("#endNum").val()){
			layer.msg("n2>n1");
		}else if($("#beginNum").val()==$("#endNum").val()){
			layer.msg($("#beginNum").val());
		}else{
			var index=layer.open({
				title:'随机数',
				type:1,
				offset: 'r',
				time:0,
				area:['600px','100%'],
				content:$("#randomDiv"),
				success:function(){
					var beginNum=parseInt($("#beginNum").val());
					var endNum=parseInt($("#endNum").val());
					show = window.setInterval(function (){
							var random=Math.round((Math.random()*(endNum-beginNum))+beginNum);
							$("#showRandom").text(random);
						}, 100);
					$("#stopRandom").mouseover(function(){
						window.clearInterval(show);
						$("#stopRandom").text("关 闭");
					});
				},
				end:function(){
					window.clearInterval(show);
				}
			});
		}
	}
	
	var showTime = window.setInterval(function (){
		var timeStr=getTime();
		timeStr=timeStr.split("");
		$("#time").text(getTime())
		}, 1000);
	
	$("#open").click(function(){
		var index=layer.open({
			type:1,
			title:'运行JS代码',
			btn:false,
			closeBtn:false,
			content:$("#showDiv"),
			area:['500px','400px'],
			offset:'rt',
			fixed:true,
			shadeClose:true,
			success:function(layero, index){
				$("#run").click(function(){
					var js=$("#codeInfo").val();
					var newScript=document.createElement("script");
					newScript.innerHTML=js;
					document.body.appendChild(newScript);
				});
			},
			end:function(){
				layer.close(index);
			}
		});
	});
	
	var functionDemo=document.getElementById("function");
	functionDemo.onmouseover=function(){
		layer.msg("移入了功能盒子");
	};
	functionDemo.onmouseout=function(){
		layer.msg("移出了功能盒子");
	};
	functionDemo.onmousemove=function(){
		layer.msg("鼠标在功能盒子内移动");
	};
	functionDemo.onclick=function(){
		layer.msg("点击了功能盒子");
	};
	functionDemo.ondblclick=function(){
		layer.msg("双击了功能盒子");
	};
	
	$("#getLength").click(function(){
		var str=$("#detection").val();
		if(str==""){
			nullError();
			return;
		}
		layer.msg("字符串长度："+str.length);
	});
	$("#getTimes").click(function(){
		var str=$("#detection").val();
		strObj={}; //定义一个对象
		if(str==""){
			nullError();
			return;
		}
		
		for(var i=0;i<str.length;i++){ //循环获取字符串的下标
			var oneStr=str.charAt(i); //获取当前下标的字符串
			if(oneStr in strObj){ //如果这个字符串在对象中则加，否则就为一
				strObj[oneStr]++;
			}else{
				strObj[oneStr]=1;
			}
		}
		var maxStr="";
		var maxNum=0;
		for(var char in strObj){ //循环对象
			if(maxNum<strObj[char]){
				maxNum=strObj[char];
				maxStr=char;
			}else if(maxNum==strObj[char]){
				maxStr+=" | "+char;
			}
		}
		layer.open({
			title:'字符串出现频率',
			content:"<p>出现次数最多的字符串是：<span style='color:green'>"+maxStr+"</span> 出现次数是：<span style='color:green'>"+maxNum+"</span>次。<p>"
		});
		
	});
	$("#getUpper").click(function(){
		var str=$("#detection").val();
		if(str==""){
			nullError();
			return;
		}
		layer.open({
			title:'转大写',
			content:str.toUpperCase()
		});
	});
	$("#getLower").click(function(){
		var str=$("#detection").val();
		if(str==""){
			nullError();
			return;
		}
		layer.open({
			title:'转小写',
			content:str.toLowerCase()
		});
	});
	form.on('select(chose)',function(data){
		var qianduan=document.getElementsByName('qianduan');
		if(data.value==""||data.value==2){
			for(var i=0;i<qianduan.length;i++){
				qianduan[i].nextSibling.setAttribute('class','layui-unselect layui-form-checkbox');
				// $("checkbox [value='"+i+"']").prop('checked',false);
			}
		}
		if(data.value==1){
			for(var i=0;i<qianduan.length;i++){
				qianduan[i].nextSibling.setAttribute('class','layui-unselect layui-form-checkbox layui-form-checked');
				// $("checkbox [value='"+i+"']").prop('checked');
			}
		}
	});
});