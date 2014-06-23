(function($,win) {
    
    var $startSection = $('#start'),
        $navigation = $('ul.nav');
        
    $(win).on('scroll', function(){
        var scrollTop = $(win).scrollTop();
        console.info(scrollTop);
       
    });
    //Stage Resize
    
    $(win).on('resize.stage', function(){
       var wH = $(win).height();
       
       $startSection.css({
        height  :wH 
       });
       
    }).resize();
    
    //Waypoints
    
    $('.menuitem').waypoint(function(direction) {
        if (direction === 'down') {
            var $el = $(this),
                id = $(this).attr('id'),
                $activeAnchor = $navigation.find('a[href="#'+ id +'"]');
                
            $navigation.find('li').removeClass('active');
            $activeAnchor.parent().addClass('active');
        }
    },{ offset: 170 }).waypoint(function(direction) {
        if (direction === 'up') {
            var $el = $(this),
                id = $(this).attr('id'),
                $activeAnchor = $navigation.find('a[href="#'+ id +'"]');
                 
            $navigation.find('li').removeClass('active');
            $activeAnchor.parent().addClass('active');
        }
    },{ offset: function() { var r = $(this).height() + 70;return '-'+r; } });
    
    //Start Loading
    
    if ( Modernizr.csstransitions ) {
	var im = $('img').length;
	var g = 0;
	$('img').each( function() {
             
		"use strict";
		$(this).imagesLoaded( function() {
			g++;
                        var z = (g * 100) /im;
			$('#progressbar').animate({ width : z+'%' },100, function() {
				if ( $(this).width() >= $(win).width() ) {
					$('#progressbar, .fill').addClass('hide');
					// all images loaded
					$('#preload').fadeOut( 1200 );
				}
			});
		});
	});
    }
    
    //About us Carousel
    
    var taracarousel = $('.aboutus-slider ul').bxSlider({
        minSlides: 1,
        maxSlides: 4,
        controls: false,
        slideWidth: 215,
        pager: false,
        easing: 'linear',
        responsive: true,
        slideMargin: 16
    });
    
    $('.aboutus-buttons.next').click( function(event) {
        if(event.preventDefault){
            event.preventDefault();
        }
        else {
            event.returnValue = false;
        }
        taracarousel.goToNextSlide();
    });
    
     $('.aboutus-buttons.prev').click( function(event) {
        if(event.preventDefault){
            event.preventDefault();
        }
        else {
            event.returnValue = false;
        }
        taracarousel.goToPrevSlide();
    });
     
    function validateValue(ci) { 
        var v = ci.val();
        console.info(v.length);
         
        var iv = ci.attr('title');
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
    
     //Kontakt
     
     $('.form-wrapper input[type="submit"].button').click( function(e) {
        
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
                                                console.info(data);
						
					}
				});
			} else {
				th.parent().find('.loader').removeClass('active');
			}
    });
    
    $('html').niceScroll({
		cursorcolor:"#95BC0D",
		background: "#111111",
		cursorborder:"#95BC0D",
		cursoropacitymin : 1,
		cursorwidth : 20,
		cursorborderradius :0,
                zindex : '1000'
	});
    
    
    $('body').wrapInner('<div id="skrollr-body" />');
        var s = skrollr.init({
                // edgeStrategy: 'set',
                forceHeight : false,
                easing: 'outCubic'
    });
	 
    
})(jQuery, window);