require(["config"], function() {
	require(["jquery", "load"], function($) {
		//设置输入框样式
		$(".mail,.password,.surepassword").on("focus", function() {
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
		//提交表单
		$(".sub").click(function(e) {
			//获取所有输入框的val值
			let _mail = $(".mail").val(),
				_password = $(".password").val(),
				_surepassword = $(".surepassword").val(),
				//判断格式是否正确
				regMail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
				name = regMail.test(_mail),
				regPassword = /^\w{6,18}$/,
				word = regPassword.test(_password),
				regSure = /^\w{6,18}$/,
				sure = regSure.test(_surepassword);
			//判断密码是否正确
			if(_password == "") {
				$(".password").next().text("此栏不能为空");
			} else if(!word) {
				$(".password").next().text("请输入6个或更多字符");
			}
			//判断密码和确认密码是否正确
			if(_surepassword == "") {
				$(".surepassword").next().text("此栏不能为空");
			} else if(!sure) {
				$(".surepassword").next().text("请输入6个或更多字符");
			} else if(_surepassword !== _password) {
				$(".warning").show();
				$(".warp").css({"height": 560});
				$(".reg_form").css({"margin-top": 2});
			}
			//获取数据,判断email是否被占用或不正确
			$.getJSON("http://localhost/glass/check.php?mail=" + _mail, function(data) {
				if(_mail == "") {
					$(".mail").next().text("此栏不能为空");
				} else if(data.res_code === 1) { // 已被占用
					$(".mail").next().text("Email已被占用，请重输");
				} else if(!name) {
					$(".mail").next().text("请输入正确的邮箱地址");
				} else {
					$(".mail").next().text("用户名可用");
				}
			});
			//阻止表单提交
			if(_mail == "" || _password == "" || _surepassword == "") {
				event.preventDefault();
			} else if(!name || !word || _surepassword !== _password) {
				event.preventDefault();
			} else { //发送请求
				$.post("http://localhost/glass/register.php", $(".reg_form").serialize(), function(data) {
					if(data.res_code === 1) {
						location = "/html/login.html";
					}
				}, "json");
			}
		});
	})
})