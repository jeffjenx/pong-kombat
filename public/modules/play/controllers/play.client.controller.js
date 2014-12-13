'use strict';


angular.module('play').controller('PlayController', ['$scope', 'Authentication', '$translate', '$analytics',
	function($scope, Authentication, $translate, $analytics) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);