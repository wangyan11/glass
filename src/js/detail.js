require(["config"], function () {
    require(["jquery", "load","zoom"], function ($) {
		$('.zoom').elevateZoom({
			gallery:'gallery_01',
			cursor : 'pointer',
			galleryActiveClass : 'active'
		});

	})
})
