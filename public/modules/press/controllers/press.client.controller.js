'use strict';


angular.module('press').controller('PressController', ['$scope', 'Authentication', '$translate', '$analytics',
	function($scope, Authentication, $translate, $analytics) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.scrolled = false;

		$scope.activeScreenshot = 0;
		$scope.navigateScreenshots = function()
		{
			console.log('test');
			$scope.activeScreenshot += 1;
			if( $scope.activeScreenshot >= 4 )
			{
				$scope.activeScreenshot = 0;
			}
		};
	}
]);