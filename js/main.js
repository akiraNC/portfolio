; (function () {

	'use strict';

	// iPad and iPod detection	
	var isiPad = function () {
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function () {
		return (
			(navigator.platform.indexOf("iPhone") != -1) ||
			(navigator.platform.indexOf("iPod") != -1)
		);
	};


	var fullHeight = function () {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function () {
			$('.js-fullheight').css('height', $(window).height());
		});

	};

	var burgerMenu = function () {

		$('.js-colorlib-nav-toggle').on('click', function (event) {
			event.preventDefault();
			var $this = $(this);
			if ($('body').hasClass('menu-show')) {
				$('body').removeClass('menu-show');
				$('#colorlib-main-nav > .js-colorlib-nav-toggle').removeClass('show');
			} else {
				$('body').addClass('menu-show');
				setTimeout(function () {
					$('#colorlib-main-nav > .js-colorlib-nav-toggle').addClass('show');
				}, 900);
			}
		})
	};

	// Animations

	var contentWayPoint = function () {
		var i = 0;
		$('.animate-box').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('animated')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .animate-box.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						}, k * 200, 'easeInOutExpo');
					});

				}, 100);

			}

		}, { offset: '85%' });
	};


	var counter = function () {
		$('.js-counter').countTo({
			formatter: function (value, options) {
				return value.toFixed(options.decimals);
			},
		});
	};

	var counterWayPoint = function () {
		if ($('#colorlib-counter').length > 0) {
			$('#colorlib-counter').waypoint(function (direction) {

				if (direction === 'down' && !$(this.element).hasClass('animated')) {
					setTimeout(counter, 400);
					$(this.element).addClass('animated');
				}
			}, { offset: '90%' });
		}
	};

	// Owl Carousel
	var owlCarouselFeatureSlide = function () {
		var owl = $('.owl-carousel1');
		owl.owlCarousel({
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			autoplay: true,
			loop: true,
			margin: 0,
			nav: true,
			dots: false,
			autoHeight: true,
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				},
				1000: {
					items: 3
				}
			},
			navText: [
				"<i class='icon-arrow-left3 owl-direction'></i>",
				"<i class='icon-arrow-right3 owl-direction'></i>"
			]
		});
		var owl2 = $('.owl-carousel');
		owl2.owlCarousel({
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			autoplay: true,
			loop: true,
			margin: 0,
			nav: false,
			dots: true,
			autoHeight: true,
			items: 1,
			navText: [
				"<i class='icon-arrow-left3 owl-direction'></i>",
				"<i class='icon-arrow-right3 owl-direction'></i>"
			]
		});
		var owl3 = $('.owl-carousel3');
		owl3.owlCarousel({
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			autoplay: true,
			loop: true,
			margin: 0,
			nav: false,
			dots: false,
			autoHeight: true,
			items: 1,
			navText: [
				"<i class='icon-arrow-left3 owl-direction'></i>",
				"<i class='icon-arrow-right3 owl-direction'></i>"
			]
		});
	};

	const visibleCount = 6;
	let offset = 0;

	// Refactored Custom Carousel
	const customCarousel = function (carouselId) {
		const $carousel = $(carouselId);
		const indicatorsContainer = $(`${carouselId}-indicators`);
		const totalItems = $(`${carouselId} .carousel-inner .item`).length;

		for (let i = 0; i < totalItems; i++) {
			const indicator = $(`<li data-target="${carouselId}" data-slide-to="${i}"></li>`);
			indicatorsContainer.append(indicator);
		}

		const updateIndicators = () => {
			const allIndicators = indicatorsContainer.children();
			allIndicators.removeClass('active dot-small').hide();

			const activeIndex = $(`${carouselId} .carousel-inner .active`).index();
			allIndicators.eq(activeIndex).addClass('active');

			const end = Math.min(offset + visibleCount, totalItems);

			for (let i = offset; i < end; i++) {
				allIndicators.eq(i).show();
			}

			if (totalItems > visibleCount) {
				if (offset > 0) {
					allIndicators.eq(offset).addClass('dot-small');
				}
				if (offset + visibleCount < totalItems) {
					allIndicators.eq(end - 1).addClass('dot-small');
				}
			}
		};

		const shiftLeft = () => {
			if (offset + visibleCount < totalItems) {
				offset++;
				updateIndicators();
			}
		};

		const shiftRight = () => {
			if (offset > 0) {
				offset--;
				updateIndicators();
			}
		};

		indicatorsContainer.on('click', 'li', function () {
			const clickedIndex = $(this).data('slide-to');

			if (clickedIndex === offset + visibleCount - 1) {
				shiftLeft();
			} else if (clickedIndex === offset) {
				shiftRight();
			}
		});

		$carousel.on('slid.bs.carousel', function () {
			updateIndicators();
		});

		updateIndicators();
	};


	// Document on load.
	$(function () {
		fullHeight();
		burgerMenu();
		counterWayPoint();
		contentWayPoint();
		owlCarouselFeatureSlide();
		customCarousel('#myCarousel');
		customCarousel('#myCarousel2');
		customCarousel('#sirhCarousel');
		customCarousel('#scolariteCarousel');
		customCarousel('#sakaCarousel');
	});

}());
