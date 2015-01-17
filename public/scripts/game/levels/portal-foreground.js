function PortalForegroundLayer( scene ) {
	Layer.call( this, scene );

	this.spaceSound = new Sound( 'Space' );
	if( app.settings.SOUND_FX > 0 ) {
		this.spaceSound.loop();
	}
}

PortalForegroundLayer.prototype = new Layer;
PortalForegroundLayer.prototype.constructor = PortalForegroundLayer;