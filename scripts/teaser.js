(function($) {
	var $header = $('header');
	var $notifications = $('#notifications');
	if(window.localStorage && localStorage['pongkombat.teaser.notifications'] === "hide") {
		$header.addClass('blur');
		$notifications.removeClass('hide');
	}

	window.toggleNotifications = function() {
		$header.toggleClass('blur');
		$notifications.toggleClass('hide');
		if(window.localStorage) {
			localStorage['pongkombat.teaser.notifications'] = (localStorage['pongkombat.teaser.notifications'] === "hide") ? "show" : "hide";
		}
	};
})(jQuery);