require(["config"], function() {
	require(["jquery", "load"], function($) {
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
		
		//判断email是否被占用
		$(".mail").blur(function(){
			$.getJSON("http://localhost/glass/check.php?mail=" +this.value, function(data){
				if (data.res_code === 1) { // 已被占用
							$(".error").text("Email已被占用，请重输");
						} else {
							$(".error").text("用户名可用");
						}
				console.log(data)
			}, "json");
		});
		//请求
		$(".sub").click(function(){
			$.post("http://localhost/glass/register.php", $(".reg_form").serialize(), function(data){				
				if (data.res_code === 1)
					location = "/html/login.html";
				else
					$(".error").text("用户注册失败：" + data.res_message);
			}, "json");
		});
		//判断注册内容是否正确
		
	})
})