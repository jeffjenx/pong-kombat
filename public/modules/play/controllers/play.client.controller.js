'use strict';


angular.module('play').controller('PlayController', ['$scope', 'Authentication', '$translate', '$analytics',
	function($scope, Authentication, $translate, $analytics) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.track = function( action ) {
			$analytics.eventTrack(action, {  category: '/demo' });
		};

		$scope.loadScript = function(url, type, charset) {
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

		var engine = $scope.loadScript('/scripts/engine/start.js', 'text/javascript', 'utf-8');
		engine.onload = function() {
			$scope.loadScript('/scripts/pong-kombat.js', 'text/javascript', 'utf-8');
		};
		
		$analytics.pageTrack('/play');
	}
]);