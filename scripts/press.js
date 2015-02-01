(function($) {
	var $instruction = $('#press header p');
	$(window).on('scroll',function(){
		if(document.body.scrollTop > 150) {
			$instruction.addClass('hide');
		} else {
			$instruction.removeClass('hide');
		}
	});
})(jQuery);