function IceRiverForegroundLayer( scene ) {
	Layer.call( this, scene );

	this.riverSound = new Sound( 'River' );
	if( app.settings.SOUND_FX > 0 ) {
		this.riverSound.loop();
	}
}

IceRiverForegroundLayer.prototype = new Layer;
IceRiverForegroundLayer.prototype.constructor = IceRiverForegroundLayer;