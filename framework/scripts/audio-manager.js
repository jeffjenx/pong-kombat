var AudioManager = {
	currentSounds : { },
	
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
};