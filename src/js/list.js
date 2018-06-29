require(["config"], function () {
    require(["jquery", "template", "load"], function ($, template) {
        $(function () {
            // 动态渲染商品数据
            $.getJSON("/mock/list.json", function (data) {
                // 渲染模板
                const html = template("product_temp", {
                    list: data.res_body.list
                });
                // 显示
                $(".list_products").html(html);
            });
        });
		//查看更多筛选
        $("label").click(function () {
            if ($(".list_top").outerHeight()=='158') {
                $(".list_top").css({"height": 316});
            }
			else if($(".list_top").outerHeight()=="316"){
				$(".list_top").css({"height": 158});
			}
        })
		//搜索框
		$(".list_li3").click(function(){
			$(".list_li3").hide();
			$(".list_li4").show();
		})
		$("form>span").click(function(){
			$(".list_li4").hide();
			$(".list_li3").show();
		})
		$("select").click(function(){
			$("select").css({"background":"#EDF7FD"})
		})
    })
})
