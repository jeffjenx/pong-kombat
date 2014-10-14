load( "pk/scripts/", [
	"paddle",
	"player",
	"opponent",
	"ball",
	"projectile",
	"paddles/yellow-paddle",
	"paddles/blue-paddle",
	
	"splash-scene",
	"title-scene",
	"choose-paddle-scene",
	"kombat-scene",
	
	"background-layer",
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
	app.aspectRatio = { x : 800, y : 530 };
	app.resources = "pk/";
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
	
	ResourceManager.addJSON( 'Localization', 'locales/' + app.language + '.js' );
	
	ResourceManager.onLoaded = function( ) {
		clearInterval( loadingInterval );
		app.startupScene = new SplashScene( );
		app.initialize( );
	};
};