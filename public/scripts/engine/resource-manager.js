Resources = { };

ResourceManager = {
	totalCount : 0,
	loadedCount : 0,
	
	addAudio : function( id, source ) {
		ResourceManager.totalCount++;
		
		var snd = new Audio( );
		var format;
		
		/*
		if( snd.canPlayType )
		{
			if( "" != snd.canPlayType( 'audio/mpeg' ) )
			{
				format = ".mp3";
			}
			else if( "" != snd.canPlayType( 'audio/ogg; codecs="vorbis"' ) )
			{
				format = ".ogg";
			}
		}
		*/
		format = ".m4a";
		
		snd.src = app.resources + source + format;
		snd.load( );
		snd.addEventListener( 'canplaythrough', function( ) {
			snd.removeEventListener( 'canplaythrough', arguments.callee, false );
			ResourceManager.checkLoading( id );
		}, false );
		
		Resources[id] = snd;
	},
	
	addImage : function( id, source ) {
		ResourceManager.totalCount++;
		
		var img = new Image( );
		img.src = app.resources + source + "?" + new Date( ).getTime( );
		img.onload = function( ) {
			ResourceManager.checkLoading( id );
		};
		
		Resources[id] = img;
	},
	
	addJSON : function( id, source ) {
		ResourceManager.totalCount++;
		
		var ajax = new XMLHttpRequest( );
		ajax.open( 'GET', app.resources + source + "?" + new Date( ).getTime( ), true );
		ajax.onreadystatechange = function( ) {
			if( ajax.readyState == 4 )
			{
				var json = JSON.parse( ajax.responseText );
				
				if( json.images !== undefined )
				{
					for( var i in json.images )
					{
						ResourceManager.addImage( i, json.images[i] );
					}
				}

				if( json.audio !== undefined )
				{
					for( var i in json.audio )
					{
						ResourceManager.addAudio( i, json.audio[i] );
					}
				}

				Resources[id] = json;
				
				ResourceManager.checkLoading( id );
			}
		};
		ajax.send( null );
	},
	
	checkLoading : function( loadedID ) {
		ResourceManager.loadedCount++;
		app.loading( );
		
		if( ResourceManager.loadedCount >= ResourceManager.totalCount )
		{
			ResourceManager.onLoaded( );
		}
	},
	
	onLoaded : function( ) {
		alert( "ResourceManager->onLoaded should be overridden in your app's main.js" );
	}
};