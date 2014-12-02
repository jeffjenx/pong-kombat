'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$translate',
	function($scope, Authentication, $translate) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);