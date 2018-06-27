require.config({
	baseUrl : "/",
	paths : { // 短名称
		jquery : "lib/jquery/jquery-1.12.4.min",
		load : "js/loadHeaderAndFooter",
		xmCarousel:"/lib/jquery-plugins/jquery.xm_carousel",
		template:"lib/artTemplate/template-web",
		cookie:"lib/jquery-plugins/jquery.cookie",
		zoom : "lib/jquery-plugins/jquery.elevateZoom-3.0.8.min"
	},
	shim:{
		xmCarousel:{
			deps:["jquery"]
		},
		zoom:{
			deps:["jquery"]
		}
	}
});
