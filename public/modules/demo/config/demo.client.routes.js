'use strict';

// Setting up route
angular.module('demo').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('demo', {
			url: '/demo',
			templateUrl: 'modules/demo/views/demo.client.view.html'
		});
	}
]);