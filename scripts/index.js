(function($) {
	var showSection = function(section) {
		var hash = section || window.location.hash;
		if(hash !== 'undefined')
		{
			$(hash).fadeIn();
		}
	};
	showSection();

	var sections = $('section:not(#warning)');
	$('nav a').click(function(e){
		e.preventDefault();
		var section = $(this).attr('href');
		if($(section).is(':visible')) {
			sections.fadeOut(400);
		} else {
			sections.fadeOut(125).promise().done(function(){
				showSection(section);
			});
		}
	});

	$('h1').css('cursor','pointer').click(function(){
		sections.fadeOut(400);
	});

	$('a').click(function(e){
		var href = $(this).attr('href');
		if(href[0] !== '#' && href.indexOf('mailto') !== 0){
			e.preventDefault();
			$('body').fadeOut(213,function(){
				window.location = href;
			});
		}
	});

	$('.key').each(function() {
		var $key = $(this);
		$key.attr('title',$key.text());
	});

	$('#input-method').change(function(){
		var id = $(this).val();
		$('#instructions table').fadeOut(125).promise().done(function(){
			$('#' + id).fadeIn(125);
		});
	});
})(jQuery);