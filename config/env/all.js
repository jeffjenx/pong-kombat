'use strict';

module.exports = {
	app :
	{
		title       : 'Pong Kombat',
		description : 'So real...it hurts! A mash-up of Pong and Mortal Kombat, first introduced 1994.',
		keywords    : 'Pong, Mortal Kombat, Pong Kombat, Video Games'
	},
	port              : process.env.PORT || 3000,
	templateEngine    : 'swig',
	sessionSecret     : 'MEAN',
	sessionCollection : 'sessions',
	assets :
	{
		lib :
		{
			css :
			[
				'public/styles/pong-kombat.css'
			],
			js :
			[
				'public/vendors/angular/angular.js',
				'public/vendors/angular-resource/angular-resource.js', 
				'public/vendors/angular-cookies/angular-cookies.js', 
				'public/vendors/angular-animate/angular-animate.js', 
				'public/vendors/angular-touch/angular-touch.js', 
				'public/vendors/angular-sanitize/angular-sanitize.js', 
				'public/vendors/angular-ui-router/release/angular-ui-router.js',
				'public/vendors/angular-ui-utils/ui-utils.js',
				'public/vendors/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/vendors/angular-translate/angular-translate.js',
				'public/vendors/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
				'public/vendors/angulartics/dist/angulartics.min.js',
				'public/vendors/angulartics/dist/angulartics-ga.min.js',
				'public/vendors/angular-local-storage/dist/angular-local-storage.js',
				'public/vendors/kineticjs/kinetic.js',
				'public/vendors/stage-directive/stage-directive.js'
			]
		},
		css :
		[
			'public/modules/**/css/*.css'
		],
		js :
		[
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests :
		[
			'public/vendors/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};