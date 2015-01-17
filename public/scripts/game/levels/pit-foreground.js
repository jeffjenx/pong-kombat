function PitForegroundLayer( scene ) {
	Layer.call( this, scene );

	this.pitSound = new Sound( 'Pit' );
	if( app.settings.SOUND_FX > 0 ) {
		this.pitSound.loop();
	}
}

PitForegroundLayer.prototype = new Layer;
PitForegroundLayer.prototype.constructor = PitForegroundLayer;