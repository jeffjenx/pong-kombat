'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider', '$translateProvider', '$httpProvider', 'localStorageServiceProvider',
	function($locationProvider, $translateProvider, $httpProvider, localStorageServiceProvider) {
		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');

		localStorageServiceProvider.setPrefix('pongkombat');

		$translateProvider
			.useStaticFilesLoader(
			{
				prefix : 'languages/',
				suffix: '/strings.lang.json'
			} )
			.registerAvailableLanguageKeys( [ 'en', 'es' ],
			{
				'en_GB' : 'en',
				'en_US' : 'en',
				'es_ES' : 'es',
				'es_MX' : 'es'
			} )
			.determinePreferredLanguage( function() {
				return 'en';
			} )
			.fallbackLanguage( 'en' );
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});