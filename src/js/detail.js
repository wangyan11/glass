require(["config"], function() {
	require(["jquery", "load", "zoom"], function($) {
		$(".zoom").elevateZoom({
			zoomType: "inner",
			gallery: 'gallery_01',
			debug: true,
			cursor: "pointer",
			zoomWindowFadeIn: 500,
			zoomWindowFadeOut: 500
		});
		$(".len_bottom").on("mouseenter",".active",function(){
			$(this).css({"border-color":"red"});
		})
		$(".len_bottom").on("mouseleave",".active",function(){
			$(this).css({"border-color":"#d6d6d6"});
		})
	})
})