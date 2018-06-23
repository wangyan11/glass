/* 轮播图插件 */
(function($){
	// 构造函数
	function Carousel({duration, imgs, container, width, height, showBtn}) {
		this.duration = duration; // 配置的切换时间
		this.imgs = imgs; // 配置的轮播图片相关信息 [{src, href}, {src, href}]
		this.container = $(container); // 存放轮播图的容器
		this.width = width; // 轮播图宽度
		this.height = height; // 高度
		this.showBtn = showBtn; // 是否显示按钮
		this.lis = null; // 所有待轮播切换图片的盒子
		this.len = imgs.length; // 轮播切换图片的张数
		this.currentIndex = 0; // 当前显示图片的索引
		this.nextIndex = 1; // 即将显示图片的索引
		this.points = null; // 所有轮播图片对应的小点
		this.timer = null; // 轮播切换时使用到的计时器

		this.createDom(); // 创建DOM结构
		this.registerEventListener(); // 注册事件监听
	}

	// 原型
	Carousel.prototype = {
		constructor : Carousel,
		// 动态创建DOM元素
		createDom : function(){
			// 动态生成 li，小点
			let lis = "", points = "";
			for (let i = 0; i < this.len; i++) {
				lis += `<li><a href="${this.imgs[i].href}"><img src="${this.imgs[i].src}"></a></li>`;
				points += `<i></i>`;
			}
			// 动态生成HTML结构
			let html = `<ul style="list-style: none; position: relative;">
								${lis}
							</ul>
							<div class="pages">
								${points}
							</div>
							<div class="prev">&lt;</div>
							<div class="next">&gt;</div>`;
			// 将生成的HTML结构放置到容器中
			this.container.html(html);
			// 设置元素CSS样式
			// 容器样式
			this.container.css({
				position:"relative",
				width: this.width,
				height: this.height,
				overflow : "hidden"
			});
			// 所有li
			this.lis = $("li", this.container)
			this.lis.css({
				width: this.width,
				height: this.height,
				position: "absolute",
				top: 0,
				left: 0,
				display: "none"
			}).first().show();
			// .pages
			$(".pages", this.container).css({
				position: "absolute",
				width: "100%",
				height: 30,
				background: "#000",
				bottom: 0
			});
			// 所有小圆点
			this.points = $("i", this.container);
			this.points.css({
				display: "inline-block",
				width: 20,
				height: 20,
				margin: 5,
				borderRadius: 10,
				background: "#fff"
			}).first().css({
				background:"#f00"
			});
			// 向前/后
			$(".prev,.next", this.container).css({
				width: 50,
				height: 100,
				background: "#000",
				lineHeight: "100px",
				textAlign: "center",
				color: "#fff",
				position: "absolute",
				top:0,
				bottom: 0,
				margin:"auto"
			});
			$(".next",this.container).css({
				right: 0
			});
			// 判断是否显示按钮
			if (!this.showBtn)
				$(".pages, .prev, .next", this.container).hide();
		},
		// 图片轮播切换
		move : function(){
			// 当前图片淡出
			$(this.lis[this.currentIndex]).fadeOut();
			// 即将显示图片淡入
			$(this.lis[this.nextIndex]).fadeIn();
			// 小点样式变化
			$(this.points[this.currentIndex]).css({background:"#fff"});
			$(this.points[this.nextIndex]).css({background:"#f00"});
			// 修改索引
			this.currentIndex = this.nextIndex;
			this.nextIndex++;
			if (this.nextIndex >= this.len)
				this.nextIndex = 0;
		},
		// 自动轮播
		autoPlay : function(){
			this.timer = setInterval(()=>{
				this.move();
			}, this.duration);
		},
		// 注册事件监听
		registerEventListener : function(){
			// 鼠标移入/移出轮播图范围，停止/重启自动轮播效果
			this.container.hover(()=>{
				clearInterval(this.timer);
			}, ()=>{
				this.autoPlay();
			});
			// 每个小点绑定事件
			let that = this;
			$(this.points).click(function(){
				const index = $(this).index();
				if (that.currentIndex === index)
					return;
				that.nextIndex = index;
				that.move();
			});
			// $(this.points).each((index, element)=>{
			// 	$(element).on("click", ()=>{
			// 		// 获取小点的索引
			// 		const idx = $(element).index(); // 或是使用 index 变量
			// 		if(this.currentIndex == idx)
			// 			return;
			// 		this.nextIndex = idx;
			// 		this.move();
			// 	});
			// });

			// 向前/后翻页
			$(".prev", this.container).click(()=>{
				this.nextIndex = this.currentIndex - 1;
				if(this.nextIndex < 0)
					this.nextIndex = this.len - 1;
				this.move();
			});
			$(".next", this.container).click(()=>{
				this.move();
			});
		}
	};

	// 创建 jQuery 插件
	$.fn.carousel = function(options){
		this.each(function(index, element){
			options.container = element;
			let c = new Carousel(options);
			c.autoPlay();
		});
	}
	// <==> $.prototype.carousel = function(){}
	// <==> $.fn.extend({carousel:function(){}})
})(jQuery);