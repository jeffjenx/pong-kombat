function LifePowerup( ) {
	Powerup.call( this, 'Powerup-Life' );
	
	this.size.x = viewport.height * 0.11;
	this.size.y = this.size.x * 0.7;
	
	this.position.x = viewport.width * 0.5;
	this.position.y = Math.random( ) * viewport.height * 0.6 + viewport.height * 0.2;

	this.scale = 0;

	this.effect = new ParticleSystem( );
	this.effect.particleImages = [Resources['Particle-Glint']];
	this.effect.count = 3;
	this.effect.minVelocity.x = 0;
	this.effect.minVelocity.y = 0;
	this.effect.maxVelocity.x = 0;
	this.effect.maxVelocity.y = 0;
	this.effect.minParticleSize = this.size.x * 0.6;
	this.effect.maxParticleSize = this.size.x * 0.7;
	this.effect.minLife = 50;
	this.effect.maxLife = 100;
	this.effect.maxOpacity = 1.5;
	this.effect.rotationSpeed = 5;
	this.effect.scaleSpeed = 2;
	this.effect.attachTo( this );

	for( var x = 0; x < 100; x++ ) {
		this.effect.update( 1 / 60 );
	}
	
	this.timeoutTime *= 1000 + app.gameTime;
}

LifePowerup.prototype = new Powerup;
LifePowerup.prototype.constructor = LifePowerup;

LifePowerup.prototype.collect = function( kombatant ) {
	Powerup.prototype.collect.call( this, kombatant );
	kombatant.life = Math.min( kombatant.life + 0.5, SceneManager.currentScene.startLife );
};

LifePowerup.prototype.draw = function( context ) {
	Powerup.prototype.draw.call( this, context );
	this.effect.draw( context );
}

LifePowerup.prototype.update = function( deltaTime ) {
	Powerup.prototype.update.call( this, deltaTime );
	this.effect.update( deltaTime );
}