(function($) {
	var $notifications = $('#notifications');
	if(window.localStorage && localStorage['PongKombat.demo.notifications'] === "hide") {
		$notifications.removeClass('hide');
	}

	window.toggleNotifications = function() {
		$notifications.toggleClass('hide');
		if(window.localStorage) {
			localStorage['PongKombat.demo.notifications'] = (localStorage['PongKombat.demo.notifications'] === "hide") ? "show" : "hide";
		}
	};

	var loadScript = function(url, type, charset) {
	    if (type===undefined) type = 'text/javascript';
	    if (url) {
	        var script = document.querySelector('script[src*="'+url+'"]');
	        if (!script) {
	            var heads = document.getElementsByTagName('head');
	            if (heads && heads.length) {
	                var head = heads[0];
	                if (head) {
	                    script = document.createElement('script');
	                    script.setAttribute('src', url);
	                    script.setAttribute('type', type);
	                    if (charset) script.setAttribute('charset', charset);
	                    head.appendChild(script);
	                }
	            }
	        }
	        return script;
	    }
	};

	window.handleConsole = function( $event ) {
		if( $event.keyCode === 13 )
		{
			track('"' + $event.target.value + '"');

			switch( $event.target.value.trim( ).toUpperCase( ) )
			{
				case 'DEMO' :
				case 'PLAY' :
				case 'PLAY DEMO' :
					document.getElementById( 'console' ).style.display = 'none';
					var framework = loadScript('/demo/scripts/framework/load.js', 'text/javascript', 'utf-8');
					framework.onload = function() {
						loadScript('/demo/scripts/main.js', 'text/javascript', 'utf-8');
					};
				break;

				case 'LOOK' :
					document.getElementById( 'output' ).value = 'You see a computer screen.';
					$event.target.value = '';
				break;

				case 'XYZZY' :
					document.getElementById( 'output' ).value = 'Nothing happens.';
					$event.target.value = '';
				break;

				default :
					var check = new RegExp('shit|piss|fuck|cunt|cocksucker|motherfucker|tits|ass|whore|fag|nigger', 'gi');
					var message = '';
					if( check.test( $event.target.value.toLowerCase( ) ) )
					{
						message = 'Real gamers don\'t use such language.';
					}
					else
					{
						message = 'I don\'t understand what you mean by "' + $event.target.value + '".';
					}

					document.getElementById( 'output' ).value = message;
					$event.target.value = '';
				break;
			}
		}
	};
})(jQuery);