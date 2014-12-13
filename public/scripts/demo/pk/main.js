load( "scripts/demo/pk/", [
	"ball",
	"level",
	"menu",
	"opponent",
	"paddle",
	"player",
	"powerup",
	"projectile",
	
	"balls/base-ball",
	"balls/basket-ball",
	"balls/default-ball",
	"balls/earth-globe",
	"balls/eight-ball",
	"balls/smiley-ball",
	"balls/soccer-ball",
	
	"effects/stackblur",
//	"effects/fastblur",
	"effects/particle-system",
	
	"levels/default-background",
	"levels/default-foreground",
	"levels/forest-background",
	"levels/forest-foreground",
	"levels/hell-background",
	"levels/hell-foreground",
	"levels/highway-background",
	"levels/highway-foreground",
	"levels/ice-river-background",
	"levels/ice-river-foreground",
	"levels/pit-background",
	"levels/pit-foreground",
	"levels/portal-background",
	"levels/portal-foreground",
	"levels/storm-background",
	"levels/storm-foreground",
	"levels/tower-background",
	"levels/tower-foreground",
	"levels/toxic-pool-background",
	"levels/toxic-pool-foreground",
	
	"menus/title-menu",
	"menus/pause-menu",
	"menus/test-menu",
	
	"paddles/yellow-paddle",
	"paddles/blue-paddle",
	"paddles/green-paddle",
	"paddles/red-paddle",
	"paddles/purple-paddle",
	"paddles/shifter-paddle",
	"paddles/monolith-paddle",
	"paddles/white-paddle",
	
	"powerups/speed-powerup",
	
	"scenes/splash-scene",
	"scenes/title-scene",
	"scenes/choose-paddle-scene",
	"scenes/kombat-scene",
	"scenes/tournament-scene",
	"scenes/story-scene",
	"scenes/help-scene",
	"scenes/kombat-layer",
	"scenes/legal-scene",
	"scenes/hud-layer",
	"scenes/main-story-scene",
	"scenes/test-scene",
	"scenes/temp-scene"
] );

function ready( ) {
	if( scriptsToLoad.length > 0 )
	{
		setTimeout( ready, 500 );
		return;
	}
	
	app = new App( );
	//app.drawComponentBounds = true;
	app.aspectRatio = { x : 1 + Math.sqrt( 5 ), y : 2 }; // Golden Ratio
	app.resources = '/';
	app.language = 'en';
	app.settings = {
	//	'Locale' : app.language,
	//	'Difficulty' : 1,
	//	'Powerups' : true,
	//	'Censored' : true,
		'SoundFX' : true,
	//	'Music' : true
	};
	//app.setMobileAudio( "audio/background-music" );
	app.resize( );
	
	var loadingInterval;
	var loadingTick = function( ) {
	};
	
	app.loading = function( ) {
		if( loadingInterval == null )
		{
			loadingTick( );
			loadingInterval = setInterval( loadingTick, 100 );
		}
	};
	
	ResourceManager.addJSON( 'Assets', 'scripts/demo/pk/assets.json' );
	ResourceManager.addJSON( 'Localization', 'languages/' + app.language + '.lang.json' );
	
	ResourceManager.onLoaded = function( ) {
		clearInterval( loadingInterval );
		app.startupScene = new SplashScene();
		app.initialize( );
	};
};

ready( );