function ToxicPoolForegroundLayer( scene ) {
	Layer.call( this, scene );

	this.sirens = new Sprite( 'Sirens' );
	this.sirens.size.x = viewport.width * 1.25;
	this.sirens.size.y = viewport.height * 1.25;
	this.addComponent( 'Sirens', this.sirens );

	this.acidSound = new Sound( 'Acid' );
	this.sirenSound = new Sound( 'Siren' );
	if( app.settings.SOUND_FX > 0 ) {
		this.acidSound.loop();
	}
}

ToxicPoolForegroundLayer.prototype = new Layer;
ToxicPoolForegroundLayer.prototype.constructor = ToxicPoolForegroundLayer;

ToxicPoolForegroundLayer.prototype.update = function( deltaTime ) {
	Layer.prototype.update.call( this, deltaTime );

	this.sirens.opacity = 0.25 + Math.sin( app.gameTime / 250 ) / 4;
	this.sirens.rotation += 180 * deltaTime;
	if( this.sirens.rotation > 360 ) {
		this.sirens.rotation -= 360;
		if( app.settings.SOUND_FX > 0 ) {
			this.sirenSound.play();
		}
	}
};