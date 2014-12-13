var scriptsToLoad = [ ];

function load( directory, source )
{
	if( !( source instanceof Array ) )
	{
		source = [ source ];
	}
	
	for( var i in source )
	{
		scriptsToLoad.push( directory + source[i] + ".js?" + new Date( ).getTime( ) );
	}
	
	loadScript( );
}

function loadScript( )
{
	if( scriptsToLoad.length > 0 )
	{
		var head = document.getElementsByTagName( 'head' )[ 0 ];
		var script = document.createElement( 'script' );
		script.src = scriptsToLoad[ 0 ];
		script.onload = loadScript;
		script.type = "text/javascript";
		head.appendChild( script );
		scriptsToLoad.shift( );
	}
}

load( "scripts/demo/framework/", [
	"app",
	"collision",
	"color",
	"math",
	"matrix",
	"request-animation-frame",
	"vector",
	
	"audio-manager",
	"input-manager",
	"resource-manager",
	"scene-manager",
	"component",
	"layer",
	"scene",
	"background",
	"sprite",
	"sprite-sheet",
	"sound",
	"text",
	
	"konami"
] );