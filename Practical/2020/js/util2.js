function randomColor(){
	const HEX=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
	var color="#";
	for(var j=0;j<6;j++){
		  var random=Math.floor(Math.random()*15);
		  color+=HEX[random];
	}
	return color;
}
function nullError(){
	var errorMsg="空数据";
	layer.msg(errorMsg);
}
function notNumberError(){
		var errorMsg="有非数字数据，请检查后重试";
		layer.msg(errorMsg);
}
function nullObject(){
	var errorMsg="对象属性为空，请检查后重试";
	layer.msg(errorMsg);
}

layui.use(['jquery','element','layer','form','code'],()=>{
	var $=layui.jquery;
	var element=layui.element;
	var layer=layui.layer;
	var form=layui.form;
	var code=layui.code();
	
	let starState=false;
	$("#getStar").click(()=>{
		starState=true;
		$("#starDiv").css({
			'display':'block',
			'position':'absolute',
			'left':Math.floor(window.innerWidth*Math.random())+"px",
			'top':Math.floor(window.innerHeight*Math.random())+"px"
		});
	});
	$("#disStar").click(()=>{
		if(!starState){
			layer.msg("已经隐藏了");
		}
		starState=false;
		$("#starDiv").css({
			'display':'none',
		});
	});
	
	$("#getAve").click(()=>{
		if ($("#score").val()==null||$("#score").val()==""){
			nullError();
		}else{
			if($("#score").val().indexOf(" ")!=-1){
				var score=$("#score").val().split(" ");
			}
			if($("#score").val().indexOf(",")!=-1){
				var score=$("#score").val().split(",");
			}
			if($("#score").val().indexOf("，")!=-1){
				var score=$("#score").val().split("，");
			}
			if($("#score").val().indexOf("。")!=-1){
				var score=$("#score").val().split("。");
			}
			var sum=0;
			var ave=0;
			for(var val of score){
				if(isNaN(val)){
					notNumberError();
					break;
				}else{
					sum+=parseFloat(val);
				}
			}
			ave=(sum/score.length).toFixed(2);
			
			layer.open({
				title:'平均成绩',
				btn:['关闭'],
				shade:false,
				content:"<div>总成绩:<span style='color:green'>"+sum+"</span><br>平均分:<span style='color:green'>"+ave+"</span></div>",
				btn1:function(){
					layer.closeAll();
				}
			});
		}
	});
	
	const IMGS=["Image1.gif","Image2.gif","Image3.gif","Image4.gif","Image5.gif","Image6.gif"];
	if(IMGS.length>0){
		for(index in IMGS){
			index++;
			var option=document.createElement("option");
			option.value="Image"+index;
			option.innerHTML="Image"+index;
			$("#img").append(option);
			
			form.on('select(img)',function(obj){
				var value=obj.value;
				layer.msg("change");
				$("#showImg").attr('src',"images/"+value+".gif");
			});
		}
		form.render();
	}
	
	function Person(name,age){
		this.name=name;
		this.age=age;
		//定义一个课程对象
		this.course={
			c_name:'JavaScript',
			c_teacher:'Jim',
			c_time:'monday'
		};
		this.showInfo=()=>{
			//关于对象的遍历
			for(index in this.course){
				console.log(index+":"+this.course[index]);
			}
			layer.msg(`对象名字：${this.name},年龄：${this.age}岁`);
		};
	}
	$("#create").click(()=>{
		var name=$("#name").val();
		var age=$("#age").val();
		if(name==null||name==""||name==undefined||age==null||age==""||age==undefined){
			nullObject();
		}else{
			var user=new Person(name,age);
			user.showInfo();
		}
	});
	
	$("#go").click(()=>{
		layer.open({
			type:1,
			area:['700px','460px'],
			title:'抽奖',
			shade:0.3,
			content:$("#raffleDiv"),
			end:function(){
				window.location.reload("#raffleDiv");
			}
		});
	});
	$("#begin").click(()=>{
		var random=parseInt(Math.random()*100);
		if(random<50){
			$("#raffleImage").attr('src','images/jno.jpg');
			$("#raffleMsg").text("很遗憾你没中奖");
		}else if(random<80){
			$("#raffleImage").attr('src','images/j03.jpg');
			$("#raffleMsg").text("恭喜你，中了三等奖！");
		}else if(random<95){
			$("#raffleImage").attr('src','images/j02.jpg');
			$("#raffleMsg").text("恭喜你，中了二等奖！");
		}else{
			$("#raffleImage").attr('src','images/j01.jpg');
			$("#raffleMsg").text("恭喜你，中了一等奖！");
		}
	});
	
	let nodeIndex=1;
	$("#addNode").click(()=>{
		var li=document.createElement("li");
		li.className="li"+nodeIndex;
		li.innerHTML="节点"+nodeIndex;
		li.style.float="left";
		li.style.cursor="pointer";
		li.style.marginLeft="16px";
		$("#nodeList").append(li);
		
		nodeIndex++;
	});
	
	$("#getNode").click(()=>{
		layer.open({
			type:1,
			area:['300px','150px'],
			shade:false,
			title:'ul子节点',
			content:$("#nodeDiv")
		});
		var nodeList=$("#nodeList")[0].childNodes;
		var node="";
		var nodeType="";
		for(val of nodeList){
			node+=val.nodeName+' ';
			nodeType+=val.nodeType+' ';
		}
		if(node.length==0){
			node='空';
		}
		if(nodeType.length==0){
			nodeType='空';
		}
		$("#ulNode").text(node);
		$("#ulNodeType").text(nodeType);
		$("#ulNodeLen").text(nodeList.length);
	});

	$("#delNode").click(()=>{
		var nodeOfDel=$("#nodeOfDel").val();
		var nodeList=$("#nodeList")[0].childNodes;
		if(nodeList.length==0){
			layer.msg("还未添加节点，请先添加");
		}else{
			if(nodeOfDel=="all"){
				for(var i=nodeList.length-1;i>=0;i--){
					$("#nodeList")[0].removeChild(nodeList[i]);
				}
				nodeIndex=1;
			}else if(nodeOfDel==""||nodeOfDel==null){
				layer.msg("请先输入节点");
			}else{
				for(val of nodeList){
					if(val.className.substring(2)==nodeOfDel){
						$("#nodeList")[0].removeChild(val);
					}
				}
			}
		}
	});
	
	$("#getMenu").click(()=>{
		layer.open({
			type:1,
			title:'菜单',
			area:['480px','250px'],
			content:$("#menuDiv"),
			end:function(){
				window.location.reload("#menuDiv");
			}
		});
		var titleLis=$(".titleLis");
		var bodyLis=$(".bodyLis");
		for(var i=0;i<titleLis.length;i++){
			titleLis[i].onmouseover=function(){
				for(var j=0;j<titleLis.length;j++){
					if(titleLis[j]==this){
						bodyLis[j].style.display="block";
					}else{
						bodyLis[j].style.display="none";
					}
				}
			};
		}
	});
	
	$("#picture").click(()=>{
		layer.open({
			type:1,
			title:'图片',
			shade:false,
			area:['800px','500px'],
			content:$("#pictureDiv"),
			end:function(){
				window.location.reload("#pictureDiv");
			}
		});
		
		for(var i=1;i<=9;i++){
			var picLi=document.createElement("li");
			picLi.className="picLi";
			picLi.style.cssText="float:left;font-size:36px;list-style:disc;width:30px;color:var(--deepgrey);cursor: pointer";
			$("#picNode").append(picLi);
		}
		for(var i=0;i<$(".picLi").length;i++){
			$(".picLi")[i].onmouseover=function(){
				for(var j=0;j<$(".picLi").length;j++){
					if($(".picLi")[j]==this){
						this.style.cssText='float:left;font-size:36px;list-style:disc;width:30px;color:var(--grey);cursor: pointer';
						$("#picShow").attr('src','images/1500'+(j+1)+'.jpg');
					}
				}
			}
			$(".picLi")[i].onmouseout=function(){
				for(var j=0;j<$(".picLi").length;j++){
					if($(".picLi")[j]==this){
						this.style.cssText='float:left;font-size:36px;list-style:disc;width:30px;color:var(--deepgrey);cursor: pointer';
					}
				}
			}
		}
	});
	
	$("#calculator").click(()=>{
		layer.open({
			type:1,
			title:'简易计算器',
			shade:false,
			area:['400px','200px'],
			content:$("#calculatorDiv"),
			end:function(){
				window.location.reload("#calculatorDiv");
			}
		});
		
		function getResult(operate){
			var num1=Number($("#num1").val());
			var num2=Number($("#num2").val());
			if(num1==""||num1==null||num2==""||num2==null){
				nullError();
			}else{
				$("#result").html(eval(num1+operate+num2));
			}
		}
		
		$("#calAdd").click(()=>{
			getResult($("#calAdd").text());
		});
		$("#calSub").click(()=>{
			getResult($("#calSub").text());
		});
		$("#calMul").click(()=>{
			getResult($("#calMul").text());
		});
		$("#calDiv").click(()=>{
			getResult($("#calDiv").text());
		});
		$("#calClo").click(()=>{
			getResult($("#calClo").text());
		});
	});
	
	$("#mouseShow").click(()=>{
		$("#mouseDiv").css({'display':'block','background-color':randomColor()});
		document.onmousemove=function(){
			$("#mouseDiv").css({
				'left':event.clientX-2+"px",
				'top':event.clientY+"px"
			});
		};
	});
	$("#mouseDisplay").click(()=>{
		$("#mouseDiv").css({'display':'none'});
	});
	
	$("#move").click(()=>{
		$("#moveDiv").css({'display':'block','background-color':randomColor()});
		var moveDiv=document.getElementById("moveDiv");
		document.onkeydown=()=>{
			switch(event.keyCode){
				case 37:moveDiv.style.left=(moveDiv.offsetLeft-10)+"px";
				if(moveDiv.offsetLeft<=0){
					moveDiv.style.left="0px";
				}
				break;
				
				case 38:moveDiv.style.top=(moveDiv.offsetTop-10)+"px";
				if(moveDiv.offsetTop<=0){
					moveDiv.style.top="0px";
				}
				break;
				
				case 39:moveDiv.style.left=(moveDiv.offsetLeft+10)+"px";
				if(moveDiv.offsetLeft>=window.innerWidth-10){
					moveDiv.style.left=window.innerWidth-10+"px";
				}
				break;
				
				case 40:moveDiv.style.top=(moveDiv.offsetTop+10)+"px";
				if(moveDiv.offsetTop>=window.innerHeight-10){
					moveDiv.style.top=window.innerHeight-10+"px";
				}
				break;
			}
		};
		moveDiv.ondblclick=()=>{
			moveDiv.style.display='none';
		}
	});
	
	$("#check").click(()=>{
		var number=$("#number").val();
		var qqCheck=/^[1-9]\d{4,9}$/;
		// var qqCheck=/^[1-9]{1}[0-9]{4,9}$/;
		var phoneCheck=/^[1]{1}[0-9]{10}$/;
		var idCheck=/^[1-8]{2}[0-9]{4}[0-9]{4}((0[1-9]{1})|(1[0-2]{1}))((0[1-9]{1})|(1[0-9]{1})|(2[0-9]{1})|(3[0-1]{1}))[0-9]{3}[0-9xX]{1}$/;
		if(number==""||number==null||number==undefined){
			nullError();
		}else{
			if(qqCheck.test(number)){
				layer.msg("qq号");
			}else if(phoneCheck.test(number)){
				layer.msg("手机号");
			}else if(idCheck.test(number)){
				layer.msg("身份证号");
			}else{
				layer.msg("无法判断");
			}
		}
	});
	
	$("#normalSub").click(()=>{
		$("#normalForm").submit();
	});
	function toSubmit(){
		return true;
	}
	
	$("#register").click(()=>{
		layer.open({
			type:1,
			title:'注册模板',
			shade:false,
			area:['500px','400px'],
			content:$("#registerDiv"),
			end:function(){
				window.location.reload("#registerDiv");
			}
		});
		
		$("#userName").focus(()=>{
			$("#userNameTag").css({'display':'block'});
		});
		$("#userName").blur(()=>{
			if($("#userName").val()!=""){
				$("#userNameTag").css({'display':'none'});
			}
		});
		$("#userNum").focus(()=>{
			$("#userNumTag").css({'display':'block'});
		});
		$("#userNum").blur(()=>{
			if($("#userNum").val()!=""){
				$("#userNumTag").css({'display':'none'});
			}
		});
		$("#userPwd").focus(()=>{
			$("#userPwdTag").css({'display':'block'});
		});
		$("#userPwd").blur(()=>{
			if($("#userPwd").val()!=""){
				$("#userPwdTag").css({'display':'none'});
			}
		});
		$("#userPwdAg").focus(()=>{
			if($("#userPwdAg").val()==""){
				$("#defPwdAgTag").css({'display':'none'});
				$("#userPwdAgTag").css({'display':'block'});
			}else{
				if($("#userPwdAg").val()!=$("#userPwd").val()){
					$("#userPwdAgTag").css({'display':'none'});
					$("#defPwdAgTag").css({'display':'block'});
				}
			}
		});
		$("#userPwdAg").blur(()=>{
			if($("#userPwdAg").val()!=$("#userPwd").val()){
				$("#userPwdAgTag").css({'display':'none'});
				$("#defPwdAgTag").css({'display':'block'});
			}else{
				$("#userPwdAgTag").css({'display':'none'});
				$("#defPwdAgTag").css({'display':'none'});
			}
		});
	});
	
	const city=[{
		'province_name':'北京',
		'pinyin_name':'beijing',
		'children':[
			{ "city_name": "东城区"},
			{ "city_name": "西城区"}
		]
	},{
		'province_name':'湖北',
		'pinyin_name':'hubei',
		'children':[
			{ "city_name": "武汉"},
			{ "city_name": "宜昌"}
		]
	},{
		'province_name':'山东',
		'pinyin_name':'shandong',
		'children':[
			{ "city_name": "青岛"},
			{ "city_name": "日照"}
		]
	},{
		'province_name':'四川',
		'pinyin_name':'sichuan',
		'children':[
			{ "city_name": "成都"},
			{ "city_name": "乐山"}
		]
	},{
		'province_name':'河南',
		'pinyin_name':'henan',
		'children':[
			{ "city_name": "郑州"},
			{ "city_name": "洛阳"}
		]
	},{
		'province_name':'安徽',
		'pinyin_name':'anhui',
		'children':[
			{ "city_name": "合肥"},
			{ "city_name": "淮南"}
		]
	}];
	
	for(var i=0;i<city.length;i++){
		$("#province").append(`<option value='`+city[i].pinyin_name+`'>`+city[i].province_name+`</option>`);
		form.render();
	}
	form.on('select(province)',function(data){
		var value=data.value;
		for(var i=0;i<city.length;i++){
			if(value==city[i].pinyin_name){
				$("#city").html("<option value=''>城市</option>");
				$("#city").append('')
				for(var j=0;j<city[i].children.length;j++){
					console.log(city[i].children[j].city_name)
					$("#city").append(`<option>`+city[i].children[j].city_name+`</option>`);
					form.render();
				}
			}
		}
	});
	
	var newWindow;
	$("#openNewWindow").click(()=>{
		newWindow=window.open('','newWindow','width=600,height=100,left=800,top=200');
		newWindow.document.write("<p>窗口的名称为:"+newWindow.name+"</p>");
		newWindow.document.write("<p>当前父窗口的地址:"+newWindow.parent.location+"</p>");
	});
	$("#closeNewWindow").click(()=>{
		newWindow.close();
		layer.msg("窗口关闭");
	});
	$("#windowIsClose").click(()=>{
		if(newWindow){
			newWindow.closed?layer.msg("窗口已关闭"):layer.msg("窗口未关闭");
		}else{
			layer.msg("窗口没有被打开");
		}
	});
	
	//toLocaleString 格式转换
	//window.clearInterval(timer); 清除计时器
	var time;
	$("#startCarousel").click(()=>{
		if($("#pageTitle").val()==""){
			layer.msg('没有数据，无法轮播');
		}else{
			var titleIndex=0;
			var pageTitle=$("#pageTitle").val();
			function titleShow(){
				parent.document.title=pageTitle.substring(titleIndex,pageTitle.length)+pageTitle.substring(0,titleIndex);
				titleIndex++;
				if(titleIndex>=pageTitle.length){
					titleIndex=0;
				}
			}
			time=window.setInterval(titleShow,400)
		}
	});
	$("#stopCarousel").click(()=>{
		window.clearInterval(time);
		parent.document.title='基础实训';
	});
	
	$("#goNewPage").click(()=>{
		window.location.assign("test.html");
	});
	$("#goBack").click(()=>{
		history.forward();
	});
	
	$("#aboutDOM").click(()=>{
		layer.open({
			type:1,
			title:'页面跳转',
			shade:false,
			area:['400px','300px'],
			content:$("#domDiv"),
			end:function(){
				window.location.reload("#domDiv");
			}
		});
	});
	
	$("#showPanel").click(()=>{
		$("#panel").fadeIn();
	});
	$("#hidePanel").click(()=>{
		$("#panel").fadeOut();
	});
	$("#toggle").click(()=>{
		$("#panel").fadeToggle(500);
	});
	
	
	$("#pullMenu").click(()=>{
		layer.open({
			type:1,
			title:'下拉菜单',
			shade:false,
			area:['400px','300px'],
			content:$("#pullMenuDiv"),
			end:function(){
				window.location.reload("#pullMenuDiv");
			}
		});
		$(".pullMenuBody").children("li").css({'list-style':'none','cursor':'pointer'});
		$(".pullMenuBody").hide().eq(0).show();
		$(".pullMenuTitle").css({'cursor':'pointer'});
		$(".pullMenuTitle").click(function(){
			$(this).next('ul').show();
			$(this).parent().siblings().children("ul").hide();
		});
		
		$(".pullMenuBody").children("li").hover(function(){
			$(this).css({'background-color':'var(--grey)'});
		},function(){
			$(this).css({'background-color':'var(--white)'});
		});
		$(".pullMenuBody").children("li").click(function(){
			layer.msg($(this).text());
		});
	});
	
	$("#table").click(()=>{
		layer.open({
			type:1,
			title:'表格',
			shade:false,
			area:['800px','600px'],
			content:$("#tableDiv"),
			end:function(){
				window.location.reload("#tableDiv");
			}
		});
		
		var createTab=false;
		$("#createTab").click(()=>{
			var table=document.createElement('table');
			if(createTab){
				layer.msg('表格已经生成');
			}else{
				$("#showTab").append(table);
				createTab=true;
				layer.msg('已生成');
			}
		});
		$("#addTabLine").click(function(){
			if(!createTab){
				layer.msg('请生成表格');
			}else{
				var tr=document.createElement('tr');
				for(var i=0;i<5;i++){
					var td=document.createElement('td');
					td.style.cssText='width:80px;height:30px;border: 1px var(--grey) solid ;';
					tr.append(td);
				}
				$("#showTab").children('table').append(tr);
				$("#showTab").children('table').find('tr:even').css({'background-color':"var(--ghostwhite)"});
				
				$("#showTab").children('table').find('tr:even').hover(function(){
					$(this).css({'background-color':"var(--grey)"});
				},function(){
					$(this).css({'background-color':"var(--ghostwhite)"});
				});
				
				$("#showTab").children('table').find('tr:odd').hover(function(){
					$(this).css({'background-color':"var(--grey)"});
				},function(){
					$(this).css({'background-color':"var(--white)"});
				});
			}
		});
		
		$("#delTabLine").click(()=>{
			if(!createTab){
				layer.msg('请生成表格');
			}else{
				console.log()
				if($("#showTab").children('table').find('tr').length==0){
					layer.msg('已删除完毕');
				}else{
					$("#showTab").children('table').find('tr:last').remove();
				}
			}
		});
	});
	
	$("#jqChose").click(()=>{
		layer.open({
			type:1,
			title:'JQ选择器',
			shade:false,
			area:['600px','100%'],
			anim: 2,
			offset:'r',
			content:$("#choseDiv"),
			end:function(){
				window.location.reload("#choseDiv");
			}
		});
	});
	
	$("#filter").click(()=>{
		var text=$("#text").val();
		var word=$("#word").val();
		var re=eval('/'+word+'/g');
		var endWord=text.replace(re,"*");
		if(text==""||text==null||text==undefined||word==""||word==null||word==undefined){
			nullError();
		}else{
			layer.msg(endWord);
		}
	});
	
});
