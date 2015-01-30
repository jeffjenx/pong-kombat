function Sound( resource ) {
	if( Resources[resource] !== undefined )
	{
		this.audio = Resources[resource].cloneNode();
		this.name = resource;
		this.id = this.name + Date.now();
	}

	this.started = false;
	this.ended = false;
	this.maxVolume = 1;
}

Sound.prototype.constructor = Sound;

Sound.prototype.loop = function( ) {
	this.started = true;
	this.audio.loop = true;
	this.audio.play( );

	AudioManager.instances.push( this );
};

Sound.prototype.play = function( ) {
	this.started = true;
	this.audio.play( );
	
	AudioManager.instances.push( this );

	var sound = this;
	this.audio.addEventListener( 'ended', function( ) {
		sound.ended = true;
		AudioManager.remove( sound );
	} );
};

Sound.prototype.setMaxVolume = function( volume ) {
	if( volume > 1 )
		volume = 1;
	else if (volume < 0 )
		volume = 0;

	this.maxVolume = volume;
	this.audio.volume = this.maxVolume;
};

Sound.prototype.setPan = function( pan ) {
	// pan should be left = -1, right = +1, center = 0
	// TODO
};

Sound.prototype.setVolume = function( volume ) {
	if( volume > 1 )
	{
		volume = 1;
	}
	else if( volume < 0 )
	{
		volume = 0;
	}
	
	this.audio.volume = volume * this.maxVolume;
};

Sound.prototype.stop = function( ) {
	this.started = false;
	this.ended = false;
	this.audio.pause( );
	AudioManager.remove( this );
};
/*

Sound.prototype.mute = function( ) {
	this.mutedVolume = this.audio.volume;
	this.audio.volume = 0.00;
};


Sound.prototype.playOnce = function() {
	if( this.started ) {
		return;
	}

	this.play();
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
*/