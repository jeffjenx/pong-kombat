function Sound( resource, unique ) {
	this.mutedVolume = 1.0; // for resetting audio to correct levels
	
	if( Resources[resource] !== undefined )
	{
		this.audio = Resources[resource];
		this.name = resource;
	}

	this.played = false;
}

Sound.prototype.constructor = Sound;
Sound.prototype.loop = function( ) {
	if( app.muted || app.pauseMuted )
	{
		return;
	}
	
	this.audio.loop = true;
	
	if( this.audio.paused )
	{
		this.audio.play( );
		AudioManager.currentSounds[this.name] = this;
	}
	
	this.played = true;
};

Sound.prototype.mute = function( ) {
	this.mutedVolume = this.audio.volume;
	this.audio.volume = 0.00;
};

Sound.prototype.play = function( ) {
	if( app.muted || app.pauseMuted )
	{
		return;
	}
	
	if( this.audio.paused )
	{
		this.audio.play( );
		AudioManager.currentSounds[this.name] = this;
		this.audio.addEventListener( 'ended', function( ) {
			delete AudioManager.currentSounds[this.name];
		} );
	}

	this.played = true;
};

Sound.prototype.setVolume = function( volume ) {
	if( volume > 1 )
	{
		volume = volume / 100;
	}
	else if( volume < 0 )
	{
		volume = 0;
	}
	
	this.audio.volume = volume;
};

Sound.prototype.stop = function( ) {
	if( !this.audio.paused )
	{
		this.audio.pause( );
		this.audio.currentTime = 0;
		delete AudioManager.currentSounds[this.name];
	}
};

Sound.prototype.unmute = function( ) {
	this.audio.volume = this.mutedVolume;
};