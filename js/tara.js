var tj=jQuery;
tj.noConflict();

 $('img').imagesLoaded().progress( function( instance, image ) {
        var result = image.isLoaded ? 'loaded' : 'broken';
        console.log( 'image is ' + result + ' for ' + image.img.src );
    });
if ( Modernizr.csstransitions ) {
	var im = tj('img').length;
	var step = 100 / (im / 3);
	var g = 0;
	tj('img').each( function() {
		"use strict";
		tj(this).imagesLoaded( function() {
			g++;
			tj('#progressbar').animate({ width : step*g+'%' },10, function() {
				if ( tj(this).width() >= tj(window).width() ) {
					tj('#progressbar, .fill').addClass('hide');
					// all images loaded
					tj('html').removeClass('tarabox-open');
					tj('#tarapreload').fadeOut( 1200 );
				}
			});
		});
	});
}
tj(document).ready(function($) {
	// CHOOSE YOUR PARALLAX STYLE 
	var ps = 1; // replace 1 with 2 or 3 for the other parallax styles
	// ENABLE & DISABLE CUSTOM SCROLLBAR & SMOOTH SCROLLING
	var cs = 0; // USE 1 FOR ENABLE AND 0 FOR DISABLE ( for parallax style 3 we recommend to turn it on )
	
	// Add specific CSS
	if ( ps === 1 || ps === 0 ) { $('.box').each( function() { var th = $(this).height(); var ph = $(this).parent().height(); var mt = (ph / 2) - (th / 2); $(this).css('margin-top', mt); }); }
	if ( ps === 0 ) { $('.tara-image-holder').css('background-attachment', 'scroll'); }
	// Define variables for checks and making things faster.
	var mobile = false;
	var po = false;
	var wh = $(window).height();
	// Check if we are on a mobile resolution
	if ( $(window).width() < 768 ) { mobile = true; }
	
	// Define specific functions
	function addMenuMobile() {
		if ( $('.tara-extra-menu').hasClass('menuopen') ) {
			var mh = $('.tara-extra-menu').outerHeight();
			var mm = (mh+25);
			$('#expand_menu').css('top', mm+'px');
			$('.nav-separator.menuopen').css('top', mh+'px' );
		} else {
			$('#expand_menu').css('top', '25px');
			$('.nav-separator').css('top', '0' );		
		}
	}
	
	function drawTimer(percent, th){
		percent = parseInt(percent, 10);
		th.html('<p class="circle"></p><div class="slice'+(percent > 50?' gt50':'')+'"><div class="pie border-color"></div>'+(percent > 50?'<div class="pie fill border-color"></div>':'')+'</div>');
		var deg = 360/100*percent;
		var message = th.attr('data-message');
		// console.log(deg);
		th.find('.slice .pie').css({
			'-moz-transform':'rotate('+deg+'deg)',
			'-webkit-transform':'rotate('+deg+'deg)',
			'-o-transform':'rotate('+deg+'deg)',
			'transform':'rotate('+deg+'deg)'
		});
		th.find('p').html(message);
	}
	if ($.fn.cssOriginal!==undefined) {
		$.fn.css = $.fn.cssOriginal;
	}
	function closeTarabox() {
		$('#tarabox').fadeOut(300, function() { 
			$('html').removeClass('tarabox-open');
			if ( typeof taraboxslider !== "undefined" ) {
				taraboxslider.destroySlider();
			}
		});
	}
	function validateValue(ci) { 
		var v = ci.val();
		//console.log(ci);
		var iv = ci[0].title;
		if ( ci.attr('type') === 'email' ) {
			if ( validateEmail(v) ) {
				ci.parent().find('.okay').addClass('active');
				ci.parent().find('.error').removeClass('active');
				ci.removeClass('invalid');
				return true;						
			} else {
				ci.parent().find('.okay').removeClass('active');
				ci.parent().find('.error').addClass('active');	
				ci.addClass('invalid');
				return false;
			}
		} else {
			if ( v.length > 1 && v !== iv ) {
				ci.parent().find('.okay').addClass('active');
				ci.parent().find('.error').removeClass('active');
				ci.removeClass('invalid');
				return true;
			} else {
				ci.parent().find('.okay').removeClass('active');
				ci.parent().find('.error').addClass('active');	
				ci.addClass('invalid');
				return false;
			}
		}
	}	
	function validateEmail(email) { 
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	// Initialize revolution slider
	$('.fullwidthbanner').revolution({    
		delay:9000,                                                
		startheight:772,                            
		startwidth:1920,
		hideThumbs:200,
		thumbWidth:100,                            
		thumbHeight:50,
		thumbAmount:5,
		navigationType:"both",                  
		navigationArrows:"nexttobullets",        
		navigationStyle:"round",                
		touchenabled:"on",                      
		onHoverStop:"on",                        
		navOffsetHorizontal:0,
		navOffsetVertical:20,
		shadow:1,
		fullWidth:"on"
	});
	
	// Define Tara carousel and sliders using bxSlider
	var taracarousel = $('.tara-carousel-slider ul').bxSlider({
		minSlides: 1,
		maxSlides: 4,
		controls: false,
		slideWidth: 215,
		pager: false,
		easing: 'linear',
		responsive: true,
		slideMargin: 16
	});
	$('.tara-about-slider ul').bxSlider({
		'controls' : false,
		'pager' : false,
		'responsive': true,
		'auto' : true,
		'adaptiveHeight' : true,
		'onSliderLoad' : function(currentIndex){
			$('.tara-about-slider ul li').eq(currentIndex+1).children().delay(300).addClass('active');
		},
		'onSlideAfter' : function($slideElement){
				$('.tara-about-slider ul li').children().removeClass('active');
				$slideElement.children().addClass('active');
			}
	});	
	$('.tara-carousel-buttons.next').click( function(event) {
		if(event.preventDefault) { event.preventDefault();} else { event.returnValue = false; }
		taracarousel.goToNextSlide();
	});
	$('.tara-carousel-buttons.prev').click( function(event) {
		if(event.preventDefault) { event.preventDefault();} else { event.returnValue = false; }
		taracarousel.goToPrevSlide();
	});
	var animating = false;
	
	// Define Tara testimonials controls and animation
	$('.tara-testimonials-controls ul li a').click( function(e) {
		e.preventDefault();
		if ( !animating ) {
			animating = true;
			var idtoretrieve = $(this).attr('data-testi');
			var $this = $(this);
			// $('.tara-testimonials-controls ul li a .tara-color-over').transition({ opacity: 0 });
			$('.tara-testimonials-controls ul li a').removeClass('selected');
			$('.tara-testimonals-content').fadeOut(300).promise().done( function() {
				$('.tara-testimonals-content').removeClass('active');
				$('.tara-testimonals-content#taratesti-'+idtoretrieve).delay(300).fadeIn(300, function() {
					animating = false;
					$(this).addClass('active');
					$this.addClass('selected');
				});
			});
		}
		return false;
	});
	
	// Animate skills as you scroll to them
	$('.tara-skills').waypoint( function() {
		if ( !$(this).hasClass('animated') ) {
			$('.tara-skill').each( function() {
				var perc = parseInt($(this).attr('data-percent'), 10);
				drawTimer(perc, $(this));
				var i = 0;
				function animation_loop(th) {
					drawTimer(i, th);
					setTimeout(function() { i++; if (i < perc) { animation_loop(th); } }, 30);
				}
				animation_loop($(this));
			});
			$(this).addClass('animated');
		} 
	}, { offset : function() { var whh = wh * 0.75; return whh; } });
	
	// Tara timeline animation 
	
	$('.tara-timeline .tara-button-year').click(function() {
		var year = $(this).attr('data-year');
		var $this = $(this);
		$('.tara-timeline-year#'+year).slideTo(158,300,'linear', $this);
	});
	
	// Tara mobile & regular navigation menu

	$('.nav a[href*=#]').click(function() {
		if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'')	&& location.hostname === this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
			if ($target.length) {
				var targetOffset = $target.offset().top - 30;
				$('html,body').animate({scrollTop: targetOffset}, 750);
				return false;
			}
		}
	}); 
	$('.tara-mobilemenu select').change(function() {
		var v =$(this).find('option:selected').val();
		if  (v.indexOf('#') === 0  ) {
			var $target = $(v);
			$target = $target.length && $target;
			if ($target.length) {
				var targetOffset = $target.offset().top - 30;
				$('html,body').animate({scrollTop: targetOffset}, 750);
				return false;
			}
		} else {
			window.location = v;
		}
	});
	if ( mobile === true && $(window).scrollTop() > 180) { $('.tara-mobilemenu').addClass('fixed'); }

	// Change menu item as you scroll
	
	$('.tara-menuitem').waypoint(function(direction) {
		if (direction === 'down') {
			var i = $(this).attr('id');
			var el = $('.nav-collapse .nav a[href="#'+i+'"]');
			var w = el.width();
			var p = el.position();
			jQuery('.nav li').removeClass('active');
			console.log("test");
			$('#menu-line').stop().animate({'left': p.left, 'width': w}, 300);
			el.parent().addClass('active');
		}
	},{ offset: 170 }).waypoint(function(direction) {
		if (direction === 'up') {
			var i = $(this).attr('id');
			var el = $('.nav-collapse .nav a[href="#'+i+'"]');
			var w = el.width();
			var p = el.position();
			jQuery('.nav li').removeClass('active');
			$('#menu-line').stop().animate({'left': p.left, 'width': w}, 300);
			el.parent().addClass('active');
		}
	},{ offset: function() { var r = $(this).height() + 70;return '-'+r; } });
	
	// EXTRA MENU
	$('#expand_menu').click( function() {
		$('.tara-extra-menu, .navbar, #menu-line, .navbar .logo, .full-color, .nav-separator').toggleClass('menuopen'); if ( mobile === true ) { addMenuMobile(); }
	});
	
	// Bind scroll actions
	$(window).bind('scroll', function() {
		// Simulate hover effect for services if on mobile resolution
		if ( mobile === true ) { 
			$('.circle.outer:in-viewport').addClass('infocus');
			$('.circle.outer:above-the-top').removeClass('infocus');
			$('.circle.outer:below-the-fold').removeClass('infocus');
		}
		var ws = $(window).scrollTop();
		if ( ws > 78  ) { $('.tara-mobilemenu').addClass('fixed'); } else { $('.tara-mobilemenu').removeClass('fixed'); }
		if ( ps === 2 ) {
			var tih = $('.tara-image-holder:in-viewport');	
			tih.each( function() {
				var tio = $(this).position().top;
				if ( (ws + wh) > tio && ws < (tio + 468) ) {
					var mt = ws - tio;
					if ( /chrom(e|ium)/.test(navigator.userAgent.toLowerCase()) || /Safari/.test(navigator.userAgent) ) {
							$(this).find('.box').css({'-webkit-transform': 'translateY('+(mt+322)+'px) translateZ(0)'});
					} else {
							$(this).find('.box').css({'margin-top': (mt+322)+'px'});
					}                               
				}
			});
		}
	});
	
	// Open portfolio items
	$('.tara-portfolio-item').click( function() {
		var tc = $('#tarabox').find('.tarabox-content');
		var project = $(this).attr('data-address');
		var ind = $(this).index();
		var th = $(this);
		$.ajax({
			url : project
		}).done( function(data) { 
			tc.html(data);
			if ( ps === 3 && mobile === true) {
				var qwo = th.offset();
				var qw = qwo.top;
			} else {
				var qw = wh/4;
			}
			tc.css('margin-top', qw);
			$('html').addClass('tarabox-open').find('#tarabox').attr('data-tara-p', ind).fadeIn(300, function() {
				var hh = parseInt($('.tarabox-text-c').find('h2').outerHeight(true), 10); var hs = parseInt($('.tarabox-text-c').find('.separator').outerHeight(true), 10); var hh5 = parseInt($('.tarabox-text-c').find('h5').outerHeight(true), 10);
				var tth = 336 - ( hh + hs + hh5 ) - 21;
				$('.textbox-height').css('height', tth+'px' );
				window.taraboxslider = $('.tarabox-slider ul').bxSlider({
					'controls' : false,
					'pager' : false,
					'responsive': true,
					'onSliderLoad' : function() { po = true; $('.tara-textbox').tinyscrollbar(); tc.animate({'opacity':1}, 300); }
				});
			});
		});
	});
	// Portfolio slider controls
	$('body').on('click', '.tarabox-slider-buttons.next' , function(e) {
		e.preventDefault();
		taraboxslider.goToNextSlide();
	});
	$('body').on('click', '.tarabox-slider-buttons.prev' , function(e) {
		e.preventDefault();
		taraboxslider.goToPrevSlide();
	});	

	function changeProject(dir) {
		var tc = $('#tarabox').find('.tarabox-content');
		tc.animate({'opacity':0}, 300);
		var pi;
		if ( dir === 'next' ) {
			pi = (parseInt($('#tarabox').attr('data-tara-p'), 10) + 1);
			if ( pi === $('.tara-isotope').find('.tara-portfolio-item').length ) {
				pi = 0;
			}
		} else {
			pi = (parseInt($('#tarabox').attr('data-tara-p'), 10) - 1);
			if ( pi < 0  ) {
				pi = $('.tara-isotope').find('.tara-portfolio-item').length - 1;
			}		
		}
		// console.log(pi);
		var project = $('.tara-isotope').find('.tara-portfolio-item:eq('+pi+')').attr('data-address');
		// console.log(project);
		$.ajax({
			url : project
		}).done( function(data) { 
			tc.html(data);
			var qw = wh/4;
			tc.css('margin-top', qw);
			$('html').addClass('tarabox-open').find('#tarabox').attr('data-tara-p', pi).fadeIn(300, function() {
				var hh = parseInt($('.tarabox-text-c').find('h2').outerHeight(true), 10); var hs = parseInt($('.tarabox-text-c').find('.separator').outerHeight(true), 10); var hh5 = parseInt($('.tarabox-text-c').find('h5').outerHeight(true), 10);
				var tth = 336 - ( hh + hs + hh5 ) - 21;
				$('.textbox-height').css('height', tth+'px' );
				window.taraboxslider = $('.tarabox-slider ul').bxSlider({
					'controls' : false,
					'pager' : false,
					'responsive': true,
					'onSliderLoad' : function() { po = true; $('.tara-textbox').tinyscrollbar(); tc.animate({'opacity':1}, 300); }
				});
			});
		});		
	}

	$('#tarabox').click(function(e) { if ( e.target === this) { closeTarabox(); }  });
	$('body').on('click', '.tarabox-controls .close, .nav a', function() { closeTarabox(); });
	$('body').on('click', '.tarabox-controls .next', function() {
		changeProject('next');
	});
	$('body').on('click', '.tarabox-controls .prev', function() {
		changeProject('prev');
	});

	// Isotope plugin for portfolio thumbnails
	var $container = $('.tara-isotope');
	$container.imagesLoaded( function() {
	//	$('img.defaultimg').css('top', '-'+sia);
		$container.isotope({
		
		});
		$('.tara-portfolio-filters a').click(function(){
			if ( !$(this).hasClass('selected') ) {
				var $this = $(this);
				$('.tara-portfolio-filters a').removeClass('selected');
				$this.addClass('selected');
				var selector = $this.attr('data-filter');
				$container.isotope({ filter: selector }, function() {});
			}
			return false;
		});
		var wa = $('.nav-collapse .nav').find('li.active').width();
		var pa = $('.nav-collapse .nav').find('li.active').position();
		pa = pa.left + 16;
		$('#menu-line').stop().animate({'left': pa, 'width': wa}, 300);
	});
	
	//Tara contact form intialization + validation + ajax send
	if ( $('.tara-formrow input').length > 0 ) {
		var x = false;
		$(".tara-formrow input, .tara-formrow textarea").focus(function() {
			if ($(this).val() === $(this)[0].title)	{
				$(this).removeClass("tara-default");
				$(this).val("");
			}
		});
		$(".tara-formrow input, .tara-formrow textarea").blur(function() {
			if ( x === true ) { validateValue($(this)); }
			if ($(this).val() === "") {
				$(this).addClass("tara-default");
				$(this).val($(this)[0].title);
			}
		});
		$(".tara-formrow input, .tara-formrow textarea").blur(); 
		$('.tara-formrow input').each( function() {
			var ci = $(this);
			if ( ci.attr('type') === 'submit' ) {  ci.parent().append('<div class="loader"><img src="images/loader.gif" /></div>'); }
			ci.parent().append('<div class="tara-validation"><div class="error"></div><div class="okay"></div></div>');
			ci.keypress( function() { x = true; validateValue(ci); } );
		});
		$('.tara-form input[type="submit"].tara-button').click( function(e) {
			e.preventDefault();
			$(this).parent().find('.loader').addClass('active');
			var th = $(this);
			var yn = $(this).parent().parent().find('input[name="yourname"]').val();
			var em = $(this).parent().parent().find('input[name="email"]').val();
			var ta = $(this).parent().parent().find('textarea[name="message"]').val();
			if ( validateValue($(this).parent().parent().find('input[name="yourname"]')) && validateValue($(this).parent().parent().find('input[name="email"]')) && validateValue($(this).parent().parent().find('textarea[name="message"]')) ) {
				$.ajax({
					url : 'email.php',
					type : 'post',
					dataType : 'text',
					data : { 'yourname' : yn, 'email' : em , 'message' : ta }
				}).done(function(data) {
					th.parent().find('.loader').removeClass('active');
					if ( data === 'sent') {
						th.parent().find('.okay').addClass('active');
						th.parent().parent().find('input, textarea').prop('disabled', true);
					} else {
						th.parent().find('.error').addClass('active');
						$('input[name="'+data+'"]').focus(); validateValue($('input[name="'+data+'"]'));
					}
				});
			} else {
				th.parent().find('.loader').removeClass('active');
			}
		});
	}
	
// Everything that needs to be changed on window resize

	$(window).resize(function() { 
		setTimeout(function()  { $container.isotope( 'reLayout', function() { $container.isotope( 'reLayout' ); } ); }, 100 );
		wh = $(window).height();
		if( po === true ) { $('.tara-textbox').tinyscrollbar_update(); }
		if ( $('.tara-tabs').length > 0 ) { $('.tara-accordion').accordion( "refresh" ); }
		if ( $(window).width() < 768 ) { mobile = true; } else { mobile = false; $('.service-icon .circle').removeClass('infocus'); }	
		if ( ps === 3 ) {
			var sh = $('.tara-slider').height();
			$('.tara-services').css('margin-top', sh);
			s.refresh();
		}
	});
	
	// Open services list
	
	$('.tara-services-control a').click( function() {
		$(this).parent().parent().find('.tara-services-content, .tara-services-list').toggleClass('listopen');
	});
	
	// Shortcodes JS
	if ( $('.tara-accordion').length > 0 ) {
		$('.tara-accordion').accordion();
	}
	if ( $('.tara-tabs').length > 0 ) {
		$('.tara-tabs').tabs({	
			fx: { opacity: 'toggle' }
		});
	}
	$('.tara-info-box .close').click(function() { $(this).parent().slideUp(300); });
	jQuery('.open-authors').click(function() {
		jQuery(this).parent().find('ul').slideTo(65, 300, 'linear', $(this));
	});
	if ( ps === 3 ) {	
		$('body').wrapInner('<div id="skrollr-body" />');
		var s = skrollr.init({
			// edgeStrategy: 'set',
			forceHeight : true,
			easing: 'outCubic'
		});
		$(window).imagesLoaded(function() {
			s.refresh(); 
			setTimeout( function() { s.refresh(); }, 300 ); 
			var sh = $('.tara-slider').height(); 
			$('.tara-services').css('margin-top', sh);
		});
	}
	if ( cs === 1 ) {
		$("html").niceScroll({
			cursorcolor : '#3d3d3d',
			cursorwidth : 7,
			cursorborder : 'none',
			cursorborderradius : '15px',
			zindex : '9999'
		});
	}
	// load google maps
		function initialize() {
			var mapOptions = {
				zoom: 10,
				center: address,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				scrollwheel: false,
			};
			map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
			var tarapin = new google.maps.MarkerImage('images/tarapin.png',
				new google.maps.Size(23, 33),
				new google.maps.Point(0,0),
				new google.maps.Point(23, 33)
			);
			marker = new google.maps.Marker({
				map:map,
				draggable:false,
				animation: google.maps.Animation.DROP,
				position: address,
				icon: tarapin
			});
		}
	if ( $('#map-canvas').length > 0 ) {
		var map;
		var address = new google.maps.LatLng(62.061316,9.104809);
		google.maps.event.addDomListener(window, 'load', initialize);
	}
});
// Loading effect, outside of document ready to be relevant

// make function available outside this file
	tj.fn.slideTo = function(slideToMin, duration, easing, clicker) {
		"use strict";
		if ( clicker === undefined ) { clicker = tj(this).parent().find('.tara-button-year'); }
			slideToMin = slideToMin || 30;
			duration = duration || 500;
			easing = easing || 'linear';
		if ( tj(this).attr('data-height') === undefined ) {
			tj(this).attr('data-height', tj(this).height());
		}
			var curH = parseInt(tj(this).height(), 10);
			if (tj(this).is(':animated')) {
				return false;
			}
			else if (curH === parseInt(tj(this).attr('data-height'), 10)) {
				tj(this).animate({
					'height': slideToMin 
				}, duration, easing, function() {
					clicker.removeClass('selected');
				});
			}
			else if (curH === slideToMin) {
				tj(this).animate({
					'height': tj(this).attr('data-height')
				}, duration, easing, function() {
					clicker.addClass('selected');
				});
			}
		return tj(this);
	};