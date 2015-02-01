function ForestForegroundLayer( scene ) {
	Layer.call( this, scene );

	this.trees1 = new Sprite( 'Trees-1' );
	this.trees1.size.x = viewport.width;
	this.trees1.size.y = viewport.height;
	this.trees1.opacity = 0.75;
	this.addComponent( 'Trees1', this.trees1 );

	this.trees2 = new Sprite( 'Trees-2' );
	this.trees2.size.x = viewport.width;
	this.trees2.size.y = viewport.height;
	this.trees2.opacity = this.trees1.opacity;
	this.addComponent( 'Trees2', this.trees2 );

	this.trees3 = new Sprite( 'Trees-3' );
	this.trees3.size.x = viewport.width;
	this.trees3.size.y = viewport.height;
	this.trees3.opacity = this.trees1.opacity;
	this.addComponent( 'Trees3', this.trees3 );

	this.ambientSound = new Sound( 'Birds' );
	this.ambientSound.setMaxVolume( 1 * app.settings.SOUND_FX / 11 );
}

ForestForegroundLayer.prototype = new Layer;
ForestForegroundLayer.prototype.constructor = ForestForegroundLayer;

ForestForegroundLayer.prototype.unload = function() {
	if( app.settings.SOUND_FX > 0 ) {
		this.ambientSound.stop();
	}
};

ForestForegroundLayer.prototype.update = function( deltaTime ) {
	Layer.prototype.update.call( this, deltaTime );

	if( app.settings.SOUND_FX > 0 && !this.ambientSound.started ) {
		this.ambientSound.loop();
	}

	this.trees1.scale = 1.1 + 0.01 * (0.5 + Math.sin( app.gameTime / 5000 ) * 0.5);
	this.trees1.rotation = 1 + Math.cos( app.gameTime / 1500 ) * 0.5;

	this.trees2.scale = this.trees1.scale;
	this.trees2.rotation = -1 * this.trees1.rotation;

	this.trees3.scale = this.trees1.scale;
	this.trees3.rotation = 1 + Math.sin( app.gameTime / 1500 ) * 0.3;

	this.trees1.position.x = viewport.width / 2 + this.trees1.rotation * viewport.width * 0.01;
	this.trees2.position.x = viewport.width / 2 + this.trees2.rotation * viewport.width * 0.01;
	this.trees3.position.x = viewport.width / 2 + this.trees3.rotation * viewport.width * 0.01;
};