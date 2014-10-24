load( "pk/scripts/", [
	"player",
	"opponent",
	"ball",
	"projectile",
	"menu",
	"menus/title-menu",
	"level",
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
	"paddle",
	"paddles/yellow-paddle",
	"paddles/blue-paddle",
	"paddles/green-paddle",
	"paddles/red-paddle",
	"paddles/purple-paddle",
	"paddles/shifter-paddle",
	"paddles/monolith-paddle",
	"paddles/white-paddle",
	
	"splash-scene",
	"title-scene",
	"choose-paddle-scene",
	"kombat-scene",
	"tournament-scene",
	"story-scene",
	"help-scene",
	
	"kombat-layer",
	"hud-layer"
] );

window.onload = ready;

function ready( ) {
	if( scriptsToLoad.length > 0 )
	{
		setTimeout( ready, 500 );
		return;
	}
	
	app = new App( );
	app.aspectRatio = { x : 16, y : 9 };
	app.resources = "pk/";
	app.settings = {
		censored : true,
		sound_fx : true
	};
	if( window.lang !== undefined )
	{
		app.language = window.lang;
	}
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
	
	ResourceManager.addJSON( 'Assets', 'scripts/assets.js' );
	ResourceManager.addJSON( 'Localization', 'locales/' + app.language + '.js' );
	
	ResourceManager.onLoaded = function( ) {
		clearInterval( loadingInterval );
		app.startupScene = new SplashScene( );
		app.initialize( );
	};
};