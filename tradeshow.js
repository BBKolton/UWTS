"use strict";

(function() {

	window.addEventListener("load", function() {
		$("img").hover(function() {
			$('.' + $(this).attr('class')).not(this).fadeIn('fast');
			$("#page").fadeTo('fast', 0.7)
		}, function() {
			$('.' + $(this).attr('class')).not(this).fadeOut('fast');
			$("#page").fadeTo('fast', 1)
		});
		$("div").not($("#page")).css("background-color", "blue");
	});

} )();