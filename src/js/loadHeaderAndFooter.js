define(["jquery","cookie"], function($) {
	$(".header").load("/html/include/header.html", function() {
		//搜索框
		$(".form").hide();
		$(".checkShow").click(function() {
			$(this).remove();
			$(".form").show("fast", function() {
				$(".search").css({
					"cursor": "pointer"
				});
				$(".txt").focus(function() {
					$(this).css({
						"border": "2px solid #7294CB",
						"background": "#EDF7FD"
					});
				});
			});
		});
		//男士
		let timer = 0;
		$(".nav_him").mouseenter(function() {
			$(".list").show();
		});
		$(".nav_him").mouseleave(function() {
			timer = setTimeout(function() {
				$(".list").hide();
			}, 300)
		});
		$(".list").hover(function() {
			clearTimeout(timer);
			$(this).show();
		}, function() {
			$(this).hide();
		});
		//女士
		$(".nav_her").mouseenter(function() {
			$(".list2").show();
		});
		$(".nav_her").mouseleave(function() {
			timer = setTimeout(function() {
				$(".list2").hide();
			}, 300)
		});
		$(".list2").hover(function() {
			clearTimeout(timer);
			$(this).show();
		}, function() {
			$(this).hide();
		});
		//体验店
		$(".nav_store").mouseenter(function() {
			$(".list3").show();
		});
		$(".nav_store").mouseleave(function() {
			timer = setTimeout(function() {
				$(".list3").hide();
			}, 300)
		});
		$(".list3").hover(function() {
			clearTimeout(timer);
			$(this).show();
		}, function() {
			$(this).hide();
		});
		//判断是否登录成功,显示用户账号登录
		let mail = $.cookie("mail");
		if(mail){//登录成功,有保存用户名
			$("#login").hide();
			$("#loginInfo").show().text('欢迎您,'+mail.slice(0,mail.indexOf("@"))+'!');
			$("#register").hide();
			$("#logout").show();
		}
		$("#logout").click(function(){//点击退出登录
			$.cookie("mail",null,{path:"/"});
		});
		if(mail === "null"){//如果未登录
			$("#login").show();
			$("#register").show();
			$("#loginInfo").hide();
			$("#logout").hide();
		}
		//将cookie中的商品解析
		let len = JSON.parse($.cookie("products")).length;
		//设置头部购物车的数量
		$("#count").text(len);
	});
	
	//底部
	$(".footer").load("/html/include/footer.html");
})