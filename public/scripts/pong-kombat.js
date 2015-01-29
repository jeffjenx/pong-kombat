load( 'scripts/game/', [
	'ball',
	'level',
	'opponent',
	'paddle',
	'player',
	'powerup',
	'projectile',
	'menu',
	
	'balls/baseball',
	'balls/basketball',
	'balls/billiards-ball',
	'balls/coin',
	'balls/croquet-ball',
	'balls/dice',
	'balls/default-ball',
	'balls/emoticon',
	'balls/eye-ball',
	'balls/foil-ball',
	'balls/food',
	'balls/football',
	'balls/logo',
	'balls/marble',
	'balls/pac-man',
	'balls/pong-ball',
	'balls/pokeball',
	'balls/rupee',
	'balls/soccer-ball',
	'balls/solar-system',
	'balls/storage-media',
	'balls/super-mario',
	'balls/tennis-ball',
	
	'effects/stackblur',
//	'effects/fastblur',
	'effects/particle-system',
	
	'levels/default-background',
	'levels/default-foreground',
	'levels/forest-background',
	'levels/forest-foreground',
	'levels/hell-background',
	'levels/hell-foreground',
	'levels/highway-background',
	'levels/highway-foreground',
	'levels/ice-river-background',
	'levels/ice-river-foreground',
	'levels/pit-background',
	'levels/pit-foreground',
	'levels/portal-background',
	'levels/portal-foreground',
	'levels/storm-background',
	'levels/storm-foreground',
	'levels/tower-background',
	'levels/tower-foreground',
	'levels/toxic-pool-background',
	'levels/toxic-pool-foreground',
	'levels/watercolor-background',
	'levels/watercolor-foreground',
	
	'menus/title-menu',
	'menus/pause-menu',
	'menus/test-menu',
	'menus/level-menu',
	
	'paddles/yellow-paddle',
	'paddles/blue-paddle',
	'paddles/green-paddle',
	'paddles/red-paddle',
	'paddles/purple-paddle',
	'paddles/myst-paddle',
	'paddles/mr-slayer-paddle',
	'paddles/shifter-paddle',
	'paddles/monolith-paddle',
	'paddles/white-paddle',
	
	'powerups/glue-powerup',
	'powerups/life-powerup',
	'powerups/shield-powerup',
	'powerups/speed-powerup',
	'powerups/time-powerup',
	
	'projectiles/finger-projectile',
	'projectiles/fireball-projectile',
	'projectiles/ice-blast-projectile',
	'projectiles/green-arrow-projectile',
	'projectiles/laser-projectile',
	'projectiles/lightning-sai-projectile',
	'projectiles/skull-projectile',
	'projectiles/rock-projectile',
	'projectiles/saw-blade-projectile',
	'projectiles/shadow-projectile',

	'scenes/splash-scene',
	'scenes/title-scene',
	'scenes/pick-paddle-scene',
	'scenes/kombat-scene',
	'scenes/tournament-scene',
	'scenes/story-scene',
	'scenes/settings-scene',
	'scenes/kombat-layer',
	'scenes/legal-scene',
	'scenes/hud-layer',
	'scenes/main-story-scene',
	'scenes/test-scene',
	'scenes/temp-scene'
] );

function ready( ) {
	if( scriptsToLoad.length > 0 )
	{
		setTimeout( ready, 500 );
		return;
	}
	
	app = new App( );
	app.version = '0.9.6';
	app.aspectRatio = { x : 1 + Math.sqrt( 5 ), y : 2 }; // Golden Ratio
	app.resources = '/';
	app.language = 'en';
	app.settings = {
		'CENSORSHIP' : (localStorage && localStorage['PongKombat.settings.CENSORSHIP'] === "false") ? false : true,
		'COINAGE'    : (localStorage && localStorage['PongKombat.settings.COINAGE']) ? parseInt( localStorage['PongKombat.settings.COINAGE'] ) : 0,
		'COMBAT'     : (localStorage && localStorage['PongKombat.settings.COMBAT'] === "false") ? false : true,
		'DIFFICULTY' : (localStorage && localStorage['PongKombat.settings.DIFFICULTY']) ? parseInt( localStorage['PongKombat.settings.DIFFICULTY'] ) : 1,
		'POWER_UPS'  : (localStorage && localStorage['PongKombat.settings.POWER_UPS'] === "false") ? false : true,
		'ROUNDS'     : (localStorage && localStorage['PongKombat.settings.ROUNDS']) ? parseInt( localStorage['PongKombat.settings.ROUNDS'] ) : 3,
		'SOUND_FX'   : (localStorage && localStorage['PongKombat.settings.SOUND_FX']) ? parseInt( localStorage['PongKombat.settings.SOUND_FX'] ) : 10,
		'TUNES'      : (localStorage && localStorage['PongKombat.settings.TUNES']) ? parseInt( localStorage['PongKombat.settings.TUNES'] ) : 10
	};
	app.resize( );

	var loadingInterval;
	var loadingPercentage;
	var loadingTick = function( ) {
		if( !loadingPercentage ) {
			loadingPercentage = document.createElement( 'div' );
			loadingPercentage.id = 'loading';
			document.getElementById( 'play' ).appendChild( loadingPercentage );
		}
		loadingPercentage.textContent = 'Loading... ' + Math.round( ResourceManager.loadedCount / ResourceManager.totalCount * 100 ) + '%';
	};
	
	app.loading = function( ) {
		if( loadingInterval == null )
		{
			loadingTick( );
			loadingInterval = setInterval( loadingTick, 100 );
		}
	};
	
	ResourceManager.addJSON( 'Assets', 'languages/' + app.language + '/assets.lang.json' );
	ResourceManager.addJSON( 'Strings', 'languages/' + app.language + '/strings.lang.json' );
	
	ResourceManager.onLoaded = function( ) {
		clearInterval( loadingInterval );
		loadingPercentage.parentNode.removeChild( loadingPercentage );
		
		app.startupScene = new SplashScene();
		app.initialize( );
	};
};

ready( );