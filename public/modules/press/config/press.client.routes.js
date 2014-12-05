'use strict';

// Setting up route
angular.module('press').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('press', {
			url: '/press',
			templateUrl: 'modules/press/views/press.client.view.html'
		});
	}
]);