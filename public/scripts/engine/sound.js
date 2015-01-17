function Sound( resource ) {
	this.mutedVolume = 1.0; // for resetting audio to correct levels
	
	if( Resources[resource] !== undefined )
	{
		this.audio = Resources[resource];
		this.name = resource;
	}

	this.uniqueIdentifier = ++AudioManager.audioCounter;

	this.started = false;
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
	
	this.started = true;
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
		AudioManager.currentSounds[this.name + this.uniqueIdentifier] = this;
		var that = this;
		this.audio.addEventListener( 'ended', function( ) {
			that.played = true;
			delete AudioManager.currentSounds[this.name];
		} );
	}

	this.started = true;
};

Sound.prototype.playOnce = function() {
	if( this.started ) {
		return;
	}

	this.play();
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
		delete AudioManager.currentSounds[this.name + this.uniqueIdentifier];
	}
};

Sound.prototype.unmute = function( ) {
	this.audio.volume = this.mutedVolume;
};