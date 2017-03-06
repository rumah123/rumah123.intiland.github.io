/*  parralax  */
var EASE = -0.4; 
$(function()
	{
		$(document).scroll(function()
			{
				$('#contact-arebi').css('background-position','0 '+($(document).scrollTop()*EASE)+'px ');
			}
		);
	}
);

var EASE = -0.4; 
$(function()
	{
		$(document).scroll(function()
			{
				$('#qoute-section').css('background-position','0'+($(document).scrollTop()*EASE)+'px ');
			}
		);
	}
);

var EASE = -0.4; 
$(function()
	{
		$(document).scroll(function()
			{
				$('#twitter').css('background-position','0'+($(document).scrollTop()*EASE)+'px ');
			}
		);
	}
);
var EASE = -0.4; 
$(function()
	{
		$(document).scroll(function()
			{
				$('#service-section').css('background-position','0'+($(document).scrollTop()*EASE)+'px ');
			}
		);
	}
);
/* smooth scroll */
// $(function() {
//   $('a[href*=#]:not([href=#])').click(function() {
//     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
//       var target = $(this.hash);
//       target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
//       if (target.length) {
//         $('html,body').animate({
//           scrollTop: target.offset().top
//         }, 1000);
//         return false;
//       }
//     }
//   });
// });

/* Back to top */
$(document).ready(function() {
  	$('.totop').click(function(){
    	$('html, body').animate({scrollTop : 0},1000);
    	return false;
  	});
});

/* Sticky Nav */
$(document).ready(function(){
	var myNavBar = {

	    flagAdd: true,

	    elements: [],

	    init: function (elements) {
	        this.elements = elements;
	    },

	    add : function() {
	        if(this.flagAdd) {
	            for(var i=0; i < this.elements.length; i++) {
	                document.getElementById(this.elements[i]).className += " fixed-theme";
	            }
	            this.flagAdd = false;
	        }
	    },

	    remove: function() {
	        for(var i=0; i < this.elements.length; i++) {
	            document.getElementById(this.elements[i]).className =
	                    document.getElementById(this.elements[i]).className.replace( /(?:^|\s)fixed-theme(?!\S)/g , '' );
	        }
	        this.flagAdd = true;
	    }

	};
	myNavBar.init(  [
	    "header",
	    "header-container",
	    "brand"
	]);
	function offSetManager(){

	    var yOffset = 0;
	    var currYOffSet = window.pageYOffset;

	    if(yOffset < currYOffSet) {
	        myNavBar.add();
	    }
	    else if(currYOffSet == yOffset){
	        myNavBar.remove();
	    }

	}
	window.onscroll = function(e) {
	    offSetManager();
	}
	offSetManager();
});

/* masonry */
  (function( $ ) {

  var $container = $('.masonry-container');
  $container.imagesLoaded( function () {
  $container.masonry({
	columnWidth: '.item',
	itemSelector: '.item'
  });
  });
  
  //Reinitialize masonry inside each panel after the relative tab link is clicked - 
  $('a[data-toggle=tab]').each(function () {
  var $this = $(this);

  $this.on('shown.bs.tab', function () {
  
	$container.imagesLoaded( function () {
	$container.masonry({
	columnWidth: '.item',
	itemSelector: '.item'
	});
	});

  }); //end shown
  });  //end each
  
  })(jQuery);

/* arebi map */
$(document).ready(function(){
	$("#location-arebi .button-map").click(function(){
		$("#arebi-map").slideToggle();
		$('html, body').animate({
			scrollTop: $(".button-map").offset().top -100
		}, 1000);
	});
});
