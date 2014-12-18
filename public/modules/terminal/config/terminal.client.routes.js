'use strict';

// Setting up route
angular.module('terminal').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('terminal', {
			url: '/terminal',
			templateUrl: 'modules/terminal/views/terminal.client.view.html'
		});
	}
]);