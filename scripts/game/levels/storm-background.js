function StormBackgroundLayer( scene ) {
	Layer.call( this, scene );
	
	var background = new Background( 'Background-Storm' );
	this.addComponent( 'Background', background );

	this.effect = new ParticleSystem( );
	this.effect.compositeOperation = 'normal';
	this.effect.particleImages = [Resources['Particle-Smoke2']];
	this.effect.count = 5;
	this.effect.minVelocity.x = -viewport.width * 0.25;
	this.effect.minVelocity.y = viewport.height * 0.25;
	this.effect.maxVelocity.x = viewport.width * 0.25;
	this.effect.maxVelocity.y = -viewport.height * 0.25;
	this.effect.minParticleSize = viewport.width * 0.1;
	this.effect.maxParticleSize = viewport.width * 0.25;
	this.effect.minLife = 300;
	this.effect.maxLife = 500;
	this.effect.maxOpacity = 0.2;
	this.effect.rotationSpeed = 1;
	this.effect.scaleSpeed = 5;
	this.effect.size.x = viewport.width;
	this.effect.size.y = viewport.height;
	this.addComponent( 'Mist', this.effect );

	this.rain = new Sprite( 'Rain' );
	this.rain.opacity = 0.22;
	this.rain.size.x = viewport.width * 1.5;
	this.rain.size.y = viewport.height;
	this.rain.velocity.x = viewport.width / 2;
	this.rain.velocity.y = viewport.height;
	this.rain.draw = function( context ) {
		context.save();
		
		context.rotate( this.rotation * Math.TO_RADIANS );
		context.globalAlpha = this.opacity;
		context.globalCompositeOperation = 'screen';
		
		// Tile Positions:
		// 6 5
		// 4 2
		// 3 1

		// 1
		context.drawImage( this.image, this.position.x - this.size.x * this.registration.x * this.scale, this.position.y - this.size.y * this.registration.y * this.scale, this.size.x * this.scale, this.size.y * this.scale );
		// 2
		context.drawImage( this.image, this.position.x - this.size.x * this.registration.x * this.scale, this.position.y - this.size.y * this.registration.y * this.scale - this.size.y * this.scale, this.size.x * this.scale, this.size.y * this.scale );
		// 3
		context.drawImage( this.image, this.position.x - this.size.x * this.registration.x * this.scale - this.size.x * this.scale, this.position.y - this.size.y * this.registration.y * this.scale, this.size.x * this.scale, this.size.y * this.scale );
		// 4
		context.drawImage( this.image, this.position.x - this.size.x * this.registration.x * this.scale - this.size.x * this.scale, this.position.y - this.size.y * this.registration.y * this.scale - this.size.y * this.scale, this.size.x * this.scale, this.size.y * this.scale );
		// 5
		context.drawImage( this.image, this.position.x - this.size.x * this.registration.x * this.scale, this.position.y - this.size.y * this.registration.y * this.scale - 2 * this.size.y * this.scale, this.size.x * this.scale, this.size.y * this.scale );
		// 6
		context.drawImage( this.image, this.position.x - this.size.x * this.registration.x * this.scale - this.size.x * this.scale, this.position.y - this.size.y * this.registration.y * this.scale - 2 * this.size.y * this.scale, this.size.x * this.scale, this.size.y * this.scale );
		
		context.restore();
	};
	this.addComponent( 'Rain', this.rain );

	this.rain2 = new Sprite( 'Rain' );
	this.rain2.opacity = this.rain.opacity;
	this.rain2.size.x = this.rain.size.x;
	this.rain2.size.y = this.rain.size.y;
	this.rain2.velocity.x = this.rain.velocity.x * 1.5;
	this.rain2.velocity.y = this.rain.velocity.y * 1.5;
	this.rain2.draw = this.rain.draw;
	this.addComponent( 'Rain2', this.rain2 );
}

StormBackgroundLayer.prototype = new Layer;
StormBackgroundLayer.prototype.constructor = StormBackgroundLayer;

StormBackgroundLayer.prototype.update = function( deltaTime ) {
	Layer.prototype.update.call( this, deltaTime );

	this.rain.rotation = (0.5 + Math.sin( app.gameTime / 1000 ) / 2) * 30;
	this.rain.rotation = (0.5 + Math.sin( app.gameTime / 2000 ) / 2) * 30;

	if( this.rain.boundingBox.top >= this.rain.size.y ) {
		this.rain.position.y -= this.rain.size.y;
	}
	if( this.rain.boundingBox.left >= this.rain.size.x ) {
		this.rain.position.x -= this.rain.size.x;
	}

	if( this.rain2.boundingBox.top >= this.rain2.size.y ) {
		this.rain2.position.y -= this.rain2.size.y;
	}
	if( this.rain2.boundingBox.left >= this.rain2.size.x ) {
		this.rain2.position.x -= this.rain2.size.x;
	}
};