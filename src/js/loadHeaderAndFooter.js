define(["jquery"], function($) {
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
	});
	//底部
	$(".footer").load("/html/include/footer.html");
})