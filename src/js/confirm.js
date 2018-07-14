require(["config"], function() {
	require(["jquery", "load"], function($) {
		// 加载省份
		function loadProvince() {
			const url1 = "http://route.showapi.com/1149-1?showapi_appid=69692&showapi_sign=a353c554fa9246b48f05f3e000080852&level=1&page=1",
				url2 = "http://route.showapi.com/1149-1?showapi_appid=69692&showapi_sign=a353c554fa9246b48f05f3e000080852&level=1&page=2";
			// 读取两页省份数据
			$.when($.ajax(url1, {
					dataType: "json"
				}), $.ajax(url2, {
					dataType: "json"
				}))
				.then(function(data1, data2) {
					// html 字符串
					let html = "<option value='-1'>请选择省份或地区</option>";
					// 将省份数组遍历，每个省份信息添加到下拉列表项中
					data1[0].showapi_res_body.data
						.concat(data2[0].showapi_res_body.data)
						.forEach(function(curr) {
							html += `<option value="${curr.id}">${curr.areaName}</option>`;
						});
					// 显示省份信息
					$("#province").html(html);
				});
		}

		// 加载城市
		function loadCity() {
			// 获取所选中的省份id
			const prov_id = $("#province").val();
			// 根据省份id查询城市信息
			const url = `http://route.showapi.com/1149-2?showapi_appid=69692&showapi_sign=a353c554fa9246b48f05f3e000080852&parentId=${prov_id}`;
			$.getJSON(url, function(data) {
				let html = "<option value='-1'>请选择</option>";
				data.showapi_res_body.data.forEach(function(curr) {
					html += `<option value="${curr.id}">${curr.areaName}</option>`;
				});
				$("#city").html(html);
			});
		}

		// 加载区县
		function loadDistrict() {
			// 获取所选中的城市id
			const city_id = $("#city").val();
			// 根据城市id查询区县信息
			const url = `http://route.showapi.com/1149-2?showapi_appid=69692&showapi_sign=a353c554fa9246b48f05f3e000080852&parentId=${city_id}`;
			$.getJSON(url, function(data) {
				let html = "<option value='-1'>请选择</option>";
				data.showapi_res_body.data.forEach(function(curr) {
					html += `<option value="${curr.id}">${curr.areaName}</option>`;
				});
				$("#district").html(html);
			});
		}

		loadProvince();
		// 省份选择发生改变，则加载城市
		$("#province").on("change", function(){
			$("#city").show();
			loadCity();
		});
		// 城市选择发生改变，加载区县
		$("#city").on("change", function(){
			$("#district").show();
			loadDistrict();
		});
	})
})