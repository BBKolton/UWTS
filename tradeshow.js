"use strict";

(function() {

	$(document).ready(function() {
		$("body > img").hover(function() {

			//get related divs and fade them in from hidden
			$('.' + $(this).attr('class')).not(this).stop().fadeIn(500);
			//fade the page darker
			$("#page").stop().fadeTo(500, 0.5);
			//all images under body that is not this image, fade to half
			$("body > img").stop().not(this).fadeTo(500, 0.5);
			//fade this image to half (in order to change it)
			$(this).stop().fadeTo(250, 0.5, function() {
				//change picture from triangles to subsystem
				$(this).attr('src', $(this).attr('src').substring(0, 9) + '.png');
				//restore the visibility of the object
				$(this).stop().fadeTo(250, 1);
			});
			//bring the image forward one z level (to prevent overlapping)
			$(this).css("z-index", "1");
		
		}, function() {

			$(this).stop();
			//get related divs and fade them out to hidden
			$('.' + $(this).attr('class')).not(this).stop().fadeOut(500);
			//restore the page's fade
			$("#page").stop().fadeTo(500, 1);
			//all images fade back to full
			$("body > img").not(this).stop().fadeTo(500, 1);
			//fade the image to half (in order to change pic)
				$(this).attr('src', $(this).attr('src').substring(0, 9) + 'tri.png');
/*			$(this).stop().fadeTo(250, 0.5, function() {
				//change picture from subsystem to triangles
				//restore the visibility of the object
				$(this).stop().fadeTo(250, 1);
			});*/
			//restore the original z level
			$(this).css("z-index", "auto");
		
		});
	});

} )();

//will have to change functionality. to support multiple users,
//set a class, on every mouse over or mouse out, add and remove
//imgs from the class, excecuting a fadeTo() command on all imgs
//based on class.