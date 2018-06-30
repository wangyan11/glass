require(["config"], function() {
	require(["jquery", "template", "load", "cookie"], function($, template) {
		$(function() {
			/*********************************************************/
			/* 读取并渲染购物车 */
			/*********************************************************/
			$.cookie.json = true;
			// 读取购物车保存的 cookie
			let products = $.cookie("products") || [];
			// 判断是否有选购过商品
			if(products.length === 0) { // 未选购商品
				$(".cart_empty").removeClass("hide");
				return; // 结束执行
			}

			// 已有选购商品
			$(".cart_not_empty").removeClass("hide");
			// 渲染购物车模板
			const html = template("cart_temp", {
				products
			});
			// 显示
			$(".cart_not_empty table tbody").html(html);

			/*********************************************************/
			/* 删除 */
			/*********************************************************/
			$(".cart_not_empty table tbody").on("click", ".del_link", function() {
				// 获取待删除商品的id
				const id = $(this).parents("tr").data("id");
				// 获取指定id商品在 products 数组中的下标
				const index = exist(id, products);
				// 从数组指定 index 索引处删除1个元素
				products.splice(index, 1);
				// 从cookie中删除部分数据(覆盖保存)
				$.cookie("products", products, {
					expires: 7,
					path: "/"
				});
				// 从DOM树中删除节点
				$(this).parents("tr").remove();
				// 判断购物车是否为空
				if(products.length === 0) {
					$(".cart_empty").removeClass("hide")
						.next().addClass("hide");
				}
				// 计算合计
				calcTotal();
			});

			// 判断某 id 商品在数组中是否存在，
			// 存在则返回其在数组中的下标，-1表示不存在
			function exist(id, array) {
				for(let i = 0, len = array.length; i < len; i++) {
					if(array[i].id == id)
						return i;
				}
				return -1;
			}

			/*********************************************************/
			/* 修改数量 */
			/*********************************************************/
			$(".cart_not_empty table tbody").on("click", ".minus, .add", function() {
				// 获取待修改数量商品的id
				const id = $(this).parents("tr").data("id");
				// 获取指定id商品在 products 数组中的下标
				const index = exist(id, products);
				// 修改指定索引处元素的 amount 属性值
				const prod = products[index];
				if($(this).is(".minus")) {
					if(prod.amount <= 1) // 商品数量小于等于1，不再减
						return;
					prod.amount--;
				} else {
					prod.amount++;
				}
				// 覆盖保存回 cookie 中
				$.cookie("products", products, {
					expires: 7,
					path: "/"
				});
				// 将兄弟元素（文本框）的值修改
				$(this).siblings(".amount").val(prod.amount);
				// 更新小计金额
				$(this).parents("tr").children(".sub_total").text((prod.price * prod.amount).toFixed(2));
				// 计算合计
				calcTotal();
			});
			$(".cart_not_empty table tbody").on("blur", ".amount", function() {
				// 获取待修改数量商品的id
				const id = $(this).parents("tr").data("id");
				// 获取指定id商品在 products 数组中的下标
				const index = exist(id, products);
				// 修改指定索引处元素的 amount 属性值
				const prod = products[index];
				// 判断输入的值格式是否正确
				const val = $(this).val();
				if(!/^[1-9]\d*$/.test(val)) { // 格式有误
					$(this).val(prod.amount);
					return;
				}
				// 修改数量：将商品数量修改为文本框输入的数量
				prod.amount = val;
				// 覆盖保存回 cookie 中
				$.cookie("products", products, {
					expires: 7,
					path: "/"
				});
				// 更新小计金额
				$(this).parents("tr").children(".sub_total").text((prod.price * prod.amount).toFixed(2));
				// 计算合计
				calcTotal();
			});

			/*********************************************************/
			/* 全选、部分选中 */
			/*********************************************************/
			$(".ck_all").click(function() {
				// 获取“全选”复选框选中状态
				const status = $(this).prop("checked");
				// 将商品行前复选框选中状态设置为“全选”一致的选中状态
				$(".ck_prod").prop("checked", status);
				// 计算合计
				calcTotal();
				// console.log(this.checked);
				// console.log($(this).attr("checked")) // elem.getAttribute()/elem.setAttribute()
				// console.log($(this).prop("checked")) // elem.<attrName> "checked" "selected" "disabled"
			});
			$(".ck_prod").click(function() {
				// 获取商品行前选中的复选框个数
				const len = $(".ck_prod:checked").length;
				// 设置“全选”复选框选中状态
				$(".ck_all").prop("checked", len === products.length);

				// 计算合计
				calcTotal();
			});

			/**********************************/
			/* 计算合计金额 */
			/**********************************/
			function calcTotal() {
				// 获取选中的复选框，遍历每个复选框，查找所在行中的小计，累加
				let sum = 0;
				$(".ck_prod:checked").each(function(index, element) {
					// index 是当前遍历到的DOM元素在数组中的下标
					// element 是当前遍历到的DOM元素
					// this === element
					sum += Number($(element).parents("tr").find(".sub_total").text());
				});
				// 显示总金额
				$('.total').text(sum.toFixed(2));
			}
		});
	})
})