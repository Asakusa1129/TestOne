layui.use(['jquery', 'element', 'layer'], function() {
	var $ = layui.jquery;
	var element = layui.element;
	var layer = layui.layer;
	var slider = layui.slider;

	$("#flush").click(()=>{
		$("#flush").css({
			'transition': 'all 2s',
			'transform':'scale(0.8)'
		});
		window.location.reload(true);
	});

	//清除缓存
	$("#clearCache").click(function() {
		window.sessionStorage.clear();
		window.localStorage.clear();
		var index = layer.msg('清除缓存中，请稍候', {
			icon: 16,
			time: false,
			shade: 0.8
		});
		setTimeout(function() {
			layer.close(index);
			layer.msg("缓存清除成功！");
		}, 1000);
	});

	axios.get('../json/MyPracticalNavs.json').then(function(res) {
		let leftMenu = res.data.leftMenu;

		for (var i = 0; i < leftMenu.length; i++) {
			var li = document.createElement("li");
			var liLine = document.createElement("li");
			var a = document.createElement("a");
			liLine.className = "layui-menu-item-divider";

			//如果有子页面
			if (leftMenu[i].haveChild) {
				//存放父页面内容
				var div = document.createElement("div");
				var liIcon = document.createElement("i");
				var ul = document.createElement("ul");
				li.className = "layui-menu-item-group layui-menu-item-up";
				li.id = "childLi" + i;
				div.className = "layui-menu-body-title";
				div.id = "childDiv" + i;
				div.innerHTML = leftMenu[i].title;
				ul.className = "child-menu" + i;
				liIcon.className = "layui-icon layui-icon-down";

				$("#leftMenu").append(li).append(liLine);
				$("#childLi" + i).append(div).append(ul);
				$("#childDiv" + i).append(liIcon);

				leftMenu[i].children.forEach(function(value, index) {
					var childLi = document.createElement("li");
					var childA = document.createElement("a");
					childLi.className = "child-list" + index;
					childA.innerHTML = value.title;
					childA.href = value.href;
					$(".child-menu" + i).append(childLi);
					$(".child-list" + index).append(childA);
				})
			} else {
				li.className = "left-menu-li" + i;
				a.className = "layui-menu-body-title" + i;
				a.innerHTML = leftMenu[i].title;
				a.setAttribute("data-url", leftMenu[i].href);
				$("#leftMenu").append(li).append(liLine);
				$(".left-menu-li" + i).append(a);

				$(".left-menu-li" + i).click(function() {
					$("#showOtherHtml").attr("src", this.children[0].dataset.url);
				});
			}
		}
	}, function(err) {
		console.log(err)
	});

	$("#lock").click(function() {
		var lockTip = layer.open({
			type: 1,
			title: '锁屏',
			area: ['400px', '500px'],
			anim: 2,
			closeBtn: false,
			shade:false,
			content: $("#lockDiv")
		});
		
		var [day,hour,minute,second]=[0,0,0,0];
		slider.render({
		    elem: '#day',
			max:'3',
			theme:'#23262E',
			setTips: function(value){
				return value + '天';
			},
			change: function(value){
				day=value;
			}
		});
		slider.render({
		    elem: '#hour',
			max:'24',
			theme:'#23262E',
			setTips: function(value){
				return value + '小时';
			},
			change: function(value){
				hour=value;
			}
		});
		slider.render({
		    elem: '#minute',
			max:'60',
			theme:'#23262E',
			setTips: function(value){
				return value + '分钟';
			},
			change: function(value){
				minute=value;
			}
		});
		slider.render({
		    elem: '#second',
			max:'60',
			theme:'#23262E',
			setTips: function(value){
				return value + '秒';
			},
			change: function(value){
				second=value;
			}
		});
		
		$("#lockSubmit").click(function(){
			if(day===0&&hour===0&&minute===0&&second===0){
				layer.msg("先设置锁屏时长");
			}else{
				var lockPwd=$("#lockPwd").val();
				layer.close(lockTip);
				var lock=layer.open({
					type: 1,
					closeBtn:false,
					area:['100%','100%'],
					title:false,
					// shade : 0.9,
					content:$("#lockingDiv"),
					skin: 'myskin',
					end:function(){
						window.location.reload("#lockingDiv");
					}
				});
				// 存储时间字符串并计算总时长
				var clock=(day*(24*60*60))+(hour*(60*60))+(minute*60)+second;
				var timer=window.setInterval(function(){
					var clockStr='';
					var clockDay=parseInt(clock/(24*60*60)); //天数等于总秒数除以一天的秒数
					var clockHour=parseInt((clock/(60*60))%24); //小时数等于总秒数除以一个小时的秒数，再与一天的小时数求余
					var clockMinute=parseInt((clock/60)%60); //分钟数等于总秒数除以一分钟的秒数，再与一小时的分钟数求余
					var clockSecond=clock%60; //秒数等于与60取余
					if(clockDay>=1){
						clockStr+=clockDay+'天';
					}
					if(clockHour>=1){
						clockStr+=clockHour+'小时';
					}
					if(clockMinute>=1){
						clockStr+=clockMinute+'分钟';
					}
					if(clockSecond>0){
						clockStr+=clockSecond+'秒';
					}
					$("#showClock").html(clockStr);
					clock--;
					if(clock==0){
						window.clearInterval(timer);
						layer.closeAll();
					}
					$("#verLock").click(()=>{
						if($("#verLockPwd").val()==lockPwd){
							window.clearInterval(timer);
							layer.closeAll();
						}else{
							layer.msg('密码错误');
						}
					});
				},1000);
			}
		});
		$("#lockCancel").click(function(){
			layer.close(lockTip);
		});
	});

});
