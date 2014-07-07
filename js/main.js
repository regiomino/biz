(function($,win) {
    
    $.fn.viewport =function () {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}
    
    if( isMobile() ) {
        $('html').addClass('mobile');
    }
        
    var $startSection = $('#start'),
        $navigation = $('ul.nav');
   
    //Stage Resize
    
    $(win).on('resize.stage', function(){
       var wH = $(win).height();
       
       $startSection.css({
        height  :wH 
       });
       
    }).resize();
    
    
    /*$(win).on('resize.map', function(){
       
       var $mapContainer = $('#parallax1'),
            $map = $('#map');
            adjustImageSize ( $map,$mapContainer);
      
       
    }).resize();*/
    
    // Mobile Navigation onChange
    
    $(".nav-mobile select").change(function() {
        window.location = $(this).find("option:selected").val();
    });
    
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
    var vp = $.fn.viewport();
    
    if( vp.width >= 768 ) {
       
    
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
} else {
    $('#preload').fadeOut(1400);
}
    
   
     
    function validateValue(ci) { 
        var v = ci.val();
         
         
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
    
    function isMobile() {
        
        if ( (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera) ) {
            return true;
        }
        
        else {
            return false;
        }
    }
    
     //Kontakt
     
     $('.form-wrapper input[type="submit"].button').click( function(e) {
			e.preventDefault();
                        var $form = $(this).parents('.contact-form');
                        
			$(this).parent().find('.loader').addClass('active');
			var th = $(this);
			var yn = $form.find('input[name="yourname"]').val();
			var em = $form.find('input[name="email"]').val();
			var ta = $form.find('textarea[name="message"]').val();
			if ( validateValue($form.find('input[name="yourname"]')) && validateValue($form.find('input[name="email"]')) && validateValue($form.find('textarea[name="message"]')) ) {
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
     if(  !isMobile() ) {
        $('html').niceScroll({
            cursorcolor:"#95BC0D",
            background: "#111111",
            cursorborder:"#95BC0D",
            cursoropacitymin : 1,
            cursorwidth : 20,
            cursorborderradius :0,
            zindex : '1000'
        });
     }
     
     if(  !isMobile() ) {
        $('a.tt').tooltipster();
     }
    
    if( !isMobile() ) {
        $('body').wrapInner('<div id="skrollr-body" />');
            var s = skrollr.init({
                    // edgeStrategy: 'set',
                    forceHeight : false,
                     easing : 'swing',
                    smoothScrolling: true,
                    smoothScrollingDuration:250
        });
    }
        
        
    
    
    
    
    //royalslider
    
     var rsi = $('#slider-in-laptop').royalSlider({
        autoHeight: false,
        arrowsNav: false,
        imageScaleMode: 'fill',
        imageAlignCenter: true,
        autoScaleSlider: true,  
        autoScaleSliderWidth: 486,     
        autoScaleSliderHeight: 315,
        video : { 
            youTubeCode : '<iframe src="https://www.youtube.com/embed/%id%?rel=0&autoplay=1&showinfo=0" frameborder="no"></iframe>'
        }
         

    }).data('royalSlider');
	 
    
})(jQuery, window);