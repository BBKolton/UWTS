"use strict";

(function() {
	//SET THIS TO CHANGE CYCLE TYPE
	var cycle = false;
	var delayTimer;
	var cycleTimer;

	window.addEventListener("contextmenu", function(e) { e.preventDefault(); })
	$(document).ready(function() {
		$("body > img").on('mouseenter', function() {
			$('body > img').each(function(i, el) {
				hoverEnd(el);
			})
			window.clearTimeout(delayTimer);
			window.clearInterval(cycleTimer);		
			hoverStart(this);
		});
		$("body > img").on('mouseleave',function() {
			window.clearTimeout(delayTimer);
			window.clearInterval(cycleTimer);		
			hoverEnd(this);
		});
		fader();
	});

	function hoverStart(el) {
		console.log("hoverStart");
		console.log(this);
		console.log(el)
		$(el).stop();
		//get related divs and fade them in from hidden
		$('.' + $(el).attr('class')).not(el).stop().fadeIn(500);
		//fade the page darker
		$("#page").stop().fadeTo(500, 0.5);
		//all images under body that is not el image, fade to half
		$("body > img").stop().not(el).fadeTo(500, 0.5);
		//fade el image to half (in order to change it)
		$(el).stop().fadeTo(250, 0.5, function() {
			//change picture from triangles to subsystem
			$(el).attr('src', $(el).attr('src').substring(0, 9) + '.png');
			//restore the visibility of the object
			$(el).stop().fadeTo(250, 1);
		});
		//bring the image forward one z level (to prevent overlapping)
		$('.' + $(el).attr('class')).css("z-index", "1");
	}

	function hoverEnd(el) {
		console.log('hoverEnd ' + el);
		//change the image back to original one
		$(el).attr('src', $(el).attr('src').substring(0, 9) + 'tri.png');
		delayTimer = window.setTimeout(fader, 1000 * 10);
		//stop animations on el
		$(el).stop();
		//get related divs and fade them out to hidden
		$('.' + $(el).attr('class')).not(el).stop().fadeOut(500);
		//restore the page's fade
		$("#page").stop().fadeTo(500, 1);
		//all images fade back to full
		$("body > img").not(el).stop().fadeTo(500, 1);
		//restore the original z level
		$('.' + $(el).attr('class')).css("z-index", "auto");
	}

	function fader() {
		$("body > img").stop(true);
		console.log("initiated fades");
		if (cycle) {
			console.log('cycleFade');
			cycleFade();
		} else {
			console.log('randFade')
			$('body > img').fadeTo(2 * 1000, 1, randFade);
		}
	}

	function randFade() {
		$(this).stop();
		$(this).fadeTo(Math.random() * 2.5 * 1000 + 250, Math.random() + 0.10, randFade);
		console.log("new fade");
	}

	function cycleFade() {
		console.log('inside cyclefade');
		var elems = $('body > img');
		var index = 0;
		window.clearInterval(cycleTimer);
		cycleTimer = window.setInterval(function() {
			console.log('sup');
			elems.not(this).each(function(i, el) {
				hoverEnd(el);
				window.clearTimeout(delayTimer);
			});
			hoverStart(elems[index]);
			index++;
			if (index >= 5) {index = 0;}
		}, 10 * 1000);

	}

} )();

//will have to change functionality. to support multiple users,
//set a class, on every mouse over or mouse out, add and remove
//imgs from the class, excecuting a fadeTo() command on all imgs
//based on class.

//old code
//			from change the image back to original one
/*			$(this).stop().fadeTo(250, 0.5, function() {
				//change picture from subsystem to triangles
				//restore the visibility of the object
				$(this).stop().fadeTo(250, 1);
			});*/