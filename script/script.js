$(document).ready(function(){
	console.log('hey');
	$(window).scroll(function(e) {
		var scroll = $(this).scrollTop();
		if (scroll > 322) {
			// console.log('322!!!')
			$('header').addClass('fixed');
		} else {
			$('header').removeClass('fixed');
		}
	});
	$('a').on('click', function(e){
		e.preventDefault();
		var target = findTarget($(this));
		console.log(target)
    $('html, body').stop().animate({
    	scrollTop: target.offset().top
    }, 800);
	})
})


function findTarget(element) {
	var name = element.attr('href').replace(/#/, '');
	return $('a[name="' + name + '"]')
}





