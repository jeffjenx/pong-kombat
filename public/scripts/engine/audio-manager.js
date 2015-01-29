var AudioManager = {
	//currentSounds : { },

	instances : [],

	/*
	loop : function( sound, volume ) {
		if( volume === undefined ) {
			volume = 1;
		}

		var audio = sound.audio.cloneNode();
		audio.id = Date.now( );
		audio.volume = volume;
		audio.loop = true;
		audio.play( );
		this.instances.push( audio );
	},

	play : function( sound, volume ) {
		if( volume === undefined ) {
			volume = 1;
		}

		var audio = sound.audio.cloneNode();
		audio.id = Date.now( );
		audio.volume = volume;
		audio.play( );
		this.instances.push( audio );

		audio.addEventListener( 'ended', function( ) {
			AudioManager.remove( audio );
			//delete AudioManager.instances[audio];
		} );
	},
	*/

	remove : function( audio ) {
		this.instances.splice( this.instances.indexOf( audio ), 1 );	
	}
	/*
	mute : function( ) {
		if( app.isMobile( ) )
		{
			app.mobileAudio.pause( );
		}
		
		for( var i in this.currentSounds )
		{
			this.currentSounds[i].mute( );
		}
	},
	
	unmute : function( ) {
		if( app.isMobile( ) )
		{
			app.mobileAudio.play( );
		}
		
		for( var i in this.currentSounds )
		{
			this.currentSounds[i].unmute( );
		}
	}
	*/
};