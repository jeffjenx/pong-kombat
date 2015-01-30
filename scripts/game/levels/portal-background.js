function PortalBackgroundLayer( scene ) {
	Layer.call( this, scene );
	
	var background = new Background( 'Background-Portal' );
	this.addComponent( 'Background', background );

	this.effect = new ParticleSystem( );
	this.effect.particleImages = [Resources['Star']];
	this.effect.count = 33;
	this.effect.minVelocity.x = 0;
	this.effect.minVelocity.y = 0;
	this.effect.maxVelocity.x = 0;
	this.effect.maxVelocity.y = 0;
	this.effect.minParticleSize = viewport.height * 0.005;
	this.effect.maxParticleSize = viewport.height * 0.01;
	this.effect.minLife = 33;
	this.effect.maxLife = 213;
	this.effect.maxOpacity = 1.5;
	this.effect.rotationSpeed = 1;
	this.effect.scaleSpeed = 0.25;
	this.effect.size.x = viewport.width;
	this.effect.size.y = viewport.height;
	this.effect.compositeOperation = 'lighter';
	this.addComponent( 'Effect', this.effect );

	for( var j = 0; j < 5000; j++ )
	{
		this.effect.update( 1 / 60 );
	}

	this.blackHole = new Sprite( 'Black-Hole' );
	this.blackHole.opacity = 0.5;
	this.blackHole.size.x = viewport.height * 0.75;
	this.blackHole.size.y = this.blackHole.size.x * 0.9;
	this.addComponent( 'BlackHole', this.blackHole );

	this.outerHole = new Sprite( 'Black-Hole' );
	this.outerHole.opacity = 0.33;
	this.outerHole.size.x = viewport.height * 1.25;
	this.outerHole.size.y = this.outerHole.size.x * 0.9;
	this.addComponent( 'OuterHole', this.outerHole );

	this.innerHole = new Sprite( 'Black-Hole' );
	this.innerHole.opacity = 0.33;
	this.innerHole.size.x = viewport.height * 0.4;
	this.innerHole.size.y = this.innerHole.size.x * 0.9;
	this.addComponent( 'InnerHole', this.innerHole );
}

PortalBackgroundLayer.prototype = new Layer;
PortalBackgroundLayer.prototype.constructor = PortalBackgroundLayer;

PortalBackgroundLayer.prototype.update = function( deltaTime ) {
	Layer.prototype.update.call( this, deltaTime );

	// http://jwilson.coe.uga.edu/EMAT6680Fa08/Broderick/assignment10/assignment10.html
	this.blackHole.position.x = viewport.width / 2 + Math.sin( 2 / 3 * app.gameTime / 10000 ) * viewport.width * 0.20;
	this.blackHole.position.y = viewport.height / 2 + Math.sin( app.gameTime / 10000 ) * viewport.height * 0.25;
	
	// Figure 8
	//this.blackHole.position.x = viewport.width / 2 + Math.cos( app.gameTime / 1000 ) * viewport.width * 0.25;
	//this.blackHole.position.y = viewport.height / 2 + Math.sin( app.gameTime / 1000 * 2 ) * viewport.height * 0.33;

	this.blackHole.rotation += 5 * deltaTime;
	if( this.blackHole.rotation > 360 ) {
		this.blackHole.rotation -= 360;
	}

	this.outerHole.position.x = this.blackHole.position.x;
	this.outerHole.position.y = this.blackHole.position.y;
	this.outerHole.rotation += 2 * deltaTime;
	if( this.outerHole.rotation > 360 ) {
		this.outerHole.rotation -= 360;
	}

	this.innerHole.position.x = this.blackHole.position.x;
	this.innerHole.position.y = this.blackHole.position.y;
	this.innerHole.rotation += 11 * deltaTime;
	if( this.innerHole.rotation > 360 ) {
		this.innerHole.rotation -= 360;
	}

	// Affect the ball movement
	var ball = this.scene.layers['Kombat'].components['Ball'];
	if( ball ) {
		var distance = this.blackHole.position.distance( ball.position );
		var gravity = distance / 33000;
		if( distance < viewport.height * 0.25 ) {
			if( ball.velocity.x < 0 ) {
				ball.velocity = ball.velocity.rotate( ( ball.position.y < this.blackHole.position.y ) ? -gravity : gravity );
			} else {
				ball.velocity = ball.velocity.rotate( ( ball.position.y < this.blackHole.position.y ) ? gravity : -gravity );
			}
			//ball.velocity = ball.velocity.rotate( ( ball.velocity.x < this.blackHole.position.y ) ? 0.01 : -0.01 );
		}
	}
};