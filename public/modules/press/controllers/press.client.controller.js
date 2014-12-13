'use strict';


angular.module('press').controller('PressController', ['$scope', 'Authentication', '$translate', '$analytics',
	function($scope, Authentication, $translate, $analytics) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.scrolled = false;

		$scope.track = function( action ) {
			$analytics.eventTrack(action, {  category: '/demo' });
		};

		$analytics.pageTrack('/demo');
	}
]);