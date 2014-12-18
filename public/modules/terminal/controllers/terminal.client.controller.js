'use strict';

angular.module('terminal').controller('TerminalController', ['$scope', 'Authentication', '$translate', '$analytics',
	function($scope, Authentication, $translate, $analytics) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.toggle = false;
		$scope.track = function( action ) {
			$analytics.eventTrack(action, {  category: '/terminal' });
		};

		$scope.handleConsole = function( $event ) {
			if( $event.keyCode === 13 )
			{
				$scope.track('"' + $event.target.value + '"');

				switch( $event.target.value.trim( ).toUpperCase( ) )
				{
					case 'PLAY' :
						window.location = '/play';
					break;

					default :
						var output = document.createElement( 'output' );
						output.value = 'I don\'t understand what you mean by "' + $event.target.value + '".';
						document.getElementById( 'output' ).appendChild( output );
						document.getElementById( 'input' ).value = '';
					break;
				}
			}

		};

		$scope.handleSocial = function(button) {
			$scope.track('toggle');

			$scope.toggle = !$scope.toggle;

			document.getElementById( 'social_toggle' ).blur( );
		};

		$analytics.pageTrack('/terminal');
	}
]);