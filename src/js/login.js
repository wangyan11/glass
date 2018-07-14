require(["config"], function() {
	require(["jquery", "load", "cookie"], function($) {
		//设置输入框样式
		$(".mail,.password").on("focus", function() {
			$(this).css({
				"border": "2px solid #7294CB",
				"background": "#EDF7FD"
			})
		})
		$(".mail,.password,.surepassword").on("blur", function() {
			$(this).css({
				"border": "1px solid #cccccc",
				"background": "white"
			})
		})
		//登录
		$(".sub").click(function() {
			//获取所有输入框的val值
			let _mail = $(".mail").val(),
				_password = $(".password").val(),
				//判断格式是否正确
				regMail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
				name = regMail.test(_mail),
				regPassword = /^\w{6,18}$/,
				word = regPassword.test(_password);
			//发送请求
			$.post("http://localhost/glass/login.php", $(".reg_form").serialize(), function(data) {
				if(data.res_code === 1) { //登录请求成功跳转首页
					location = "/";
					//保存cookie
					$.cookie("mail", _mail, {expires: 3,path: "/"});
				} else { //登录请求失败
					//判断邮箱是否正确
					if(_mail == "") {
						$(".mail").next().html("↑  此栏不能为空");
					} else if(!name) {
						$(".mail").next().html("↑  请输入正确的邮箱地址");
					} else {
						$(".mail").next().html("↑  邮箱或密码不正确");
					}
					//判断密码是否正确
					if(_password == "") {
						$(".password").next().html("↑  此栏不能为空");
					} else if(!word) {
						$(".password").next().html("↑  请输入6个或更多字符");
					} else {
						$(".password").next().html("↑  邮箱或密码不正确");
					}
				}
			}, "json");
		})
	})
})