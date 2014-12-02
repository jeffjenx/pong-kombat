'use strict';

// Setting up route
angular.module('teaser').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('teaser', {
			url: '/teaser',
			templateUrl: 'modules/teaser/views/teaser.client.view.html'
		});
	}
]);