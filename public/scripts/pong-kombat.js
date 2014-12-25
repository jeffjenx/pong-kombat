load( 'scripts/game/', [
	'ball',
	'level',
	'menu',
	'opponent',
	'paddle',
	'player',
	'powerup',
	'projectile',
	
	'balls/base-ball',
	'balls/basket-ball',
	'balls/default-ball',
	'balls/earth-globe',
	'balls/eight-ball',
	'balls/smiley-ball',
	'balls/soccer-ball',
	
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
	'paddles/shifter-paddle',
	'paddles/monolith-paddle',
	'paddles/white-paddle',
	
	'powerups/speed-powerup',
	
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
	app.aspectRatio = { x : 1 + Math.sqrt( 5 ), y : 2 }; // Golden Ratio
	app.resources = '/';
	app.language = 'en';
	app.settings = {
		'CENSORSHIP' : true,
		'COINAGE' : 0,
		'COMBAT' : true,
		'DIFFICULTY' : 1,
		'POWER_UPS' : true,
		'SOUND_FX' : 10,
		'TUNES' : 10
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
		app.startupScene = new PickPaddleScene();
		app.initialize( );
	};
};

ready( );