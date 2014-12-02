'use strict';


angular.module('teaser').controller('TeaserController', ['$scope', 'Authentication', '$translate', '$window', '$analytics', 'localStorageService',
	function($scope, Authentication, $translate, $window, $analytics, localStorageService) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.toggle = false;
		if( localStorageService.isSupported )
		{
			$scope.toggle = (localStorageService.get('teaser.toggle') === 'true');
		}

		$scope.track = function( action ) {
			$analytics.eventTrack(action, {  category: '/teaser' });

			if( action === 'toggle' )
			{
				$scope.toggle = !$scope.toggle;
				
				if( localStorageService.isSupported )
				{
					localStorageService.set( 'teaser.toggle', $scope.toggle.toString() );
				}
			}
		};
		$analytics.pageTrack('/teaser');

	}
]);