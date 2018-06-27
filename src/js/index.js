require(["config"],function  () {
	require(["jquery","load","xmCarousel"],function  ($) {
		// 轮播图
		$(function(){
			$(".banner").carousel({
					duration: 3000, 
					imgs: [
						{href:"/html/detail.html", src:"/img/banner.jpg"},
						{href:"/html/detail.html", src:"/img/banner1.jpg"},
						{href:"/html/detail.html", src:"/img/banner3.jpg"},
						{href:"/html/detail.html", src:"/img/banner4.jpg"},
					], 
					width:1210, 
					height:400,
					showBtn: false
				});
		});
		// 热销推荐 HOT SALES
		$(".hot_right").on("mouseenter","li",function(){
			$(this).find(".bg").show();
		})
		$(".hot_right").on("mouseleave","li",function(){
			$(this).find(".bg").hide();
		})
		//新品上架 NEW ARRIVAL
		$(".new_left").on("mouseenter","li",function(){
			$(this).find(".bg").show();
		})
		$(".new_left").on("mouseleave","li",function(){
			$(this).find(".bg").hide();
		})
		//正文轮播图
			// for(let i=0;i<lis.length;i++){
				$(".points").on("mouseenter","li",function(){
					console.log($(".points>li").index(this));	
				})	
			// }
			
		
	})
})