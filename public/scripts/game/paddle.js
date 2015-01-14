var Paddles = {
	RANDOM   : 0,
	CUSTOM   : 1,
	
	BLUE     : 2,
	GREEN    : 3,
	PURPLE   : 4,
	RED      : 5,
	YELLOW   : 6,
	
	SHIFTER  : 7,
	MONOLITH : 8,
	WHITE    : 9,
	MRSLAYER : 10,
	MYST     : 11
};

function Paddle( texture ) {
	Sprite.call( this, texture );
	
	if( !this.bigness ) {
		this.bigness = 3;
	}
	
	if( !this.quickness ) {
		this.quickness = 3;
	}
	
	this.gloss = new Sprite( 'Paddle-Gloss' );

	this.drag = 0.95;
	this.lifeModifier = 1;
	
	this.patternCanvas = document.createElement( 'canvas' );
	this.patternCanvas.width = ( this.image ) ? this.image.width : 512;
	this.patternCanvas.height = ( this.image ) ? this.image.height : 512;
	this.patternContext = this.patternCanvas.getContext( '2d' );
	
	this.offset = 0.5;
	this.size.x = viewport.width * 0.03;
	//this.size.y = viewport.height * 0.2;
	this.size.y = viewport.height * ( 0.01 * Math.pow( this.bigness, 2 ) + 0.09 ); 
	
	// Bigness Scale (size.y)
	// 2.0 ~ .12
	// 2.5 ~ .135
	// 3.0 ~ .15
	// 3.5 ~ .175
	// 4.0 ~ .20
	// 4.5 ~ .225
	// 5.0 ~ .25
	
	// Quickness Scale (velocity.y)
	// 2.0 ~ 
	// 2.5 ~ 
	// 3.0 ~ 
	// 3.5 ~ 
	// 4.0 ~ 
	// 4.5 ~ 
	// 5.0 ~ 
	
	this.shieldPowerup = false;
	this.speedPowerup = false;
	this.gluePowerup = false;
	this.timePowerup = false;

	this.glue = null;
	this.shield = null;
	//this.projectile = null;
	this.bloodEffect = null;

	this.maxProjectiles = 5;
	this.projectiles = [ ];

	this.effect = new ParticleSystem();
}

Paddle.prototype = new Sprite;
Paddle.prototype.constructor = Paddle;

Paddle.prototype.canShootProjectile = function( ) {
	return app.settings.COMBAT && this.projectiles.length < this.maxProjectiles;
	//return app.settings.COMBAT && this.projectile === null;
};

Paddle.prototype.dismantleBurning = function(percentComplete) {
	if( this.effect.particleImages[0] !== Resources['Particle-Fire1'] ) {
		this.effect = new ParticleSystem();
		this.effect.particleImages = [Resources['Particle-Fire1'],Resources['Particle-Fire2'],Resources['Particle-Fire3']];
		this.effect.count = 420;
		this.effect.minVelocity.x = -this.size.x;
		this.effect.minVelocity.y = 0;
		this.effect.maxVelocity.x = this.size.x;
		this.effect.maxVelocity.y = -this.size.y;
		this.effect.minParticleSize = this.size.x * 0.1;
		this.effect.maxParticleSize = this.size.x * 0.3;
		this.effect.minLife = 10;
		this.effect.maxLife = 50;
		this.effect.rotationSpeed = 5;
		this.effect.scaleSpeed = 5;
		this.effect.maxOpacity = 0.9;
		this.effect.fadeSpeed = 0.666;
		this.effect.attachTo( this );
	}

	this.gloss.opacity = 1-percentComplete;
	
	this.effect.update( 1/60 );
};
Paddle.prototype.dismantleCharring = function(percentComplete) {
	this.gloss = new Sprite( 'Black' );
	this.gloss.opacity = percentComplete;
	this.effect.count = Math.max( 420 * (1 - percentComplete), 1 );
};
Paddle.prototype.dismantleCharred = function() {
	if( this.effect.particleImages[0] !== Resources['Black'] ) {
		this.effect = new ParticleSystem();
		this.effect.particleImages = [Resources['Black']];
		this.effect.compositeOperation = 'darken';
		this.effect.count = 500;
		this.effect.minVelocity.x = -this.size.x;
		this.effect.minVelocity.y = viewport.height * 0.25;
		this.effect.maxVelocity.x = this.size.x;
		this.effect.maxVelocity.y = viewport.height * 0.25;
		this.effect.minParticleSize = this.size.x * 0.05;
		this.effect.maxParticleSize = this.size.x * 0.1;
		this.effect.minLife = 500;
		this.effect.maxLife = 1000;
		this.effect.rotationSpeed = 1;
		this.effect.scaleSpeed = 0;
		this.effect.maxOpacity = 10;
		this.effect.fadeSpeed = 1;
		this.effect.attachTo( this );
		this.effect.size.x = this.size.x * this.scale;
		this.effect.size.y = this.size.y * this.scale;

		for( var i = 0; i < this.effect.maxLife; i++ ) {
			this.effect.update( 1/60 );	
		}
	}

	//this.opacity = Math.max( this.opacity - 0.005, 0 );
	this.size.y *= 0.99;
	this.scale = Math.max( this.scale - 0.005, 0 );

	if( this.scale <= 0 ) {
		this.effect.count -= 1;
	}
};

Paddle.prototype.draw = function( context ) {
	Component.prototype.draw.call( this, context );
	
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	this.patternContext.save( );
	this.patternContext.translate( -this.offset * this.patternCanvas.width, 0 );
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.fillRect( -this.patternCanvas.width, -this.patternCanvas.height, this.patternCanvas.width * 2, this.patternCanvas.height * 2 );
	this.patternContext.restore( );
	
	var width = this.size.x * this.scale;
	var height = this.size.y * this.scale;
	var x = -width * this.registration.x;
	var y = -height * this.registration.y;
	var radius = width * 0.50;
	
	context.save();
	context.globalAlpha *= this.opacity;
	context.translate( this.position.x, this.position.y );
	context.rotate( this.rotation * Math.TO_RADIANS );
	context.beginPath();
	context.moveTo(x + radius, y);
	context.lineTo(x + width - radius, y);
	context.quadraticCurveTo(x + width, y, x + width, y + radius);
	context.lineTo(x + width, y + height - radius);
	context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	context.lineTo(x + radius, y + height);
	context.quadraticCurveTo(x, y + height, x, y + height - radius);
	context.lineTo(x, y + radius);
	context.quadraticCurveTo(x, y, x + radius, y);
	context.closePath();
	context.clip();
	context.drawImage(
		this.patternCanvas,
		0,
		0,
		this.patternCanvas.width * (this.size.x / this.size.y) * 0.75,
		this.patternCanvas.height * 0.75,
		-width * this.registration.x,
		-height * this.registration.y,
		width,
		height
	);
	context.globalAlpha *= this.gloss.opacity;
	context.drawImage(
		this.gloss.image,
		-width * this.registration.x * 6.5,
		-height * this.registration.y * 1.15,
		width * 6.5,
		height * 1.15
	);
	context.restore();
	
	/*
	context.save();
	context.beginPath();
	context.moveTo(x + radius, y);
	context.lineTo(x + width - radius, y);
	context.quadraticCurveTo(x + width, y, x + width, y + radius);
	context.lineTo(x + width, y + height - radius);
	context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	context.lineTo(x + radius, y + height);
	context.quadraticCurveTo(x, y + height, x, y + height - radius);
	context.lineTo(x, y + radius);
	context.quadraticCurveTo(x, y, x + radius, y);
	context.closePath();
	context.clip();
	//context.restore();
	//context.save( );
	context.globalAlpha *= this.opacity;
	context.translate( this.position.x, this.position.y );
	context.rotate( this.rotation * Math.TO_RADIANS );
	if( this.flipH )
	{
		context.scale( -1, 1 );
	}
	context.drawImage(
		this.patternCanvas,
		0,
		0,
		this.patternCanvas.width * (this.size.x / this.size.y) * 0.75,
		this.patternCanvas.height * 0.75,
		-width * this.registration.x,
		-height * this.registration.y,
		width,
		height
	);
	context.drawImage(
		this.gloss.image,
		-width * this.registration.x * 7,
		-height * this.registration.y * 1.15,
		width * 7,
		height * 1.15
	);
	context.restore( );
	*/

	if( this.glue ) {
		this.glue.draw( context );
	}

	if( this.shield ) {
		this.shield.draw( context );
	}
	
	if( this.projectiles.length > 0 ) {
		for( var i = 0; i < this.projectiles.length; i++ ) {
			this.projectiles[i].draw( context );
		}
	}
	//if( this.projectile ) {
	//	this.projectile.draw( context );
	//}

	if( this.bloodEffect ) {
		this.bloodEffect.draw( context );
	}
};

Paddle.prototype.getHit = function( ) {
	this.bloodEffect = new ParticleSystem( );
	this.bloodEffect.particleImages = [Resources['Particle-Blood1'],Resources['Particle-Blood2']];
	this.bloodEffect.compositeOperation = 'normal';
	this.bloodEffect.count = 50;
	this.bloodEffect.minVelocity.x = -this.size.x / 2;
	this.bloodEffect.minVelocity.y = -this.size.y * 3;
	this.bloodEffect.maxVelocity.x = this.size.x / 2;
	this.bloodEffect.maxVelocity.y = -this.size.y;
	this.bloodEffect.minParticleSize = this.size.x * 0.3;
	this.bloodEffect.maxParticleSize = this.size.x * 0.5;
	this.bloodEffect.minLife = 500;
	this.bloodEffect.maxLife = 500;
	this.bloodEffect.rotationSpeed = 0;
	this.bloodEffect.scaleSpeed = 0.01;
	this.bloodEffect.maxOpacity = 50;
	this.bloodEffect.fadeSpeed = 0.9;
	this.bloodEffect.attachTo( this );
	this.bloodEffect.size.x = 0;
	this.bloodEffect.size.y = 0;
	this.bloodEffect.update = function( deltaTime ) {
		ParticleSystem.prototype.update.call( this, deltaTime );

		var i = this.particles.length;
		while( i-- )
		{
			var p = this.particles[i];
			p.velocity.y += viewport.height * 0.02;
			
			if( p.position.y > viewport.height ) {
				p.velocity.y = 0;
			}

			if( p.remainingLife <= 0 ) {
				this.particles.splice( this.particles.indexOf(i), 1 );
			}
		}
	};
	this.bloodEffect.start = function( ) {
		this.started = true;
		for( var i = 0; i < this.count; i++ )
		{
			this.particles.push( new Particle( this ) );
		}
	};
};

Paddle.prototype.moveDown = function( ) {
	var speedMultiplier = ( this.speedPowerup ) ? 1.5 : 1;

	this.offset = this.position.y / viewport.height * 0.75;
	//this.offset = (Math.abs(this.position.x - viewport.width / 2) + this.position.y) / (viewport.width / 2 + viewport.height);
	
	//this.offset = Math.sqrt( Math.pow( this.position.y, 2 ) + Math.pow( this.position.x, 2 ) );
	//this.offset /= Math.sqrt( Math.pow( viewport.height, 2 ) + Math.pow( viewport.width / 2, 2 ) );

	this.velocity.y = viewport.height * ( 0.01 * Math.pow( this.quickness, 2 ) + 0.2 ) * speedMultiplier;
	this.restrictToBounds( );
};

Paddle.prototype.moveUp = function( ) {
	var speedMultiplier = ( this.speedPowerup ) ? 1.5 : 1;

	this.offset = this.position.y / viewport.height * 0.75;
	//this.offset = (Math.abs(this.position.x - viewport.width / 2) + this.position.y) / (viewport.width / 2 + viewport.height);
	
	//this.offset = Math.sqrt( Math.pow( this.position.y, 2 ) + Math.pow( this.position.x, 2 ) ); 
	//this.offset /= Math.sqrt( Math.pow( viewport.height, 2 ) + Math.pow( viewport.width / 2, 2 ) );

	this.velocity.y = -viewport.height * ( 0.01 * Math.pow( this.quickness, 2 ) + 0.2 ) * speedMultiplier;
	this.restrictToBounds( );
};

Paddle.prototype.moveLeft = function( ) {
	var speedMultiplier = ( this.speedPowerup ) ? 1.5 : 1;

	//this.offset = this.position.y / viewport.height * 0.75;
	//this.offset = (Math.abs(this.position.x - viewport.width / 2) + this.position.y) / (viewport.width / 2 + viewport.height);
	
	//this.offset = Math.sqrt( Math.pow( this.position.y, 2 ) + Math.pow( this.position.x, 2 ) ); 
	//this.offset /= Math.sqrt( Math.pow( viewport.height, 2 ) + Math.pow( viewport.width / 2, 2 ) );

	this.velocity.x = -viewport.width * ( 0.01 * Math.pow( this.quickness, 2 ) + 0.1 ) * speedMultiplier;
	this.restrictToBounds( );
};

Paddle.prototype.moveRight = function( ) {
	var speedMultiplier = ( this.speedPowerup ) ? 1.5 : 1;

	//this.offset = this.position.y / viewport.height * 0.75;	
	//this.offset = (Math.abs(this.position.x - viewport.width / 2) + this.position.y) / (viewport.width / 2 + viewport.height);
	
	//this.offset = Math.sqrt( Math.pow( this.position.y, 2 ) + Math.pow( this.position.x, 2 ) ); 
	//this.offset /= Math.sqrt( Math.pow( viewport.height, 2 ) + Math.pow( viewport.width / 2, 2 ) );

	this.velocity.x = viewport.width * ( 0.01 * Math.pow( this.quickness, 2 ) + 0.1 ) * speedMultiplier;
	this.restrictToBounds( );
};

Paddle.prototype.restrictToBounds = function( ) {
	var paddingBottom = viewport.height;
	var paddingTop = SceneManager.currentScene.layers['HUD'].components['HUD'].size.y;
	var paddingLeft = 0;
	var paddingRight = viewport.width * 0.5;
	
	if( ( this.velocity.y > 0 && this.boundingBox.bottom >= paddingBottom ) || ( this.velocity.y < 0 && this.boundingBox.top <= paddingTop ) )
	{
		this.velocity.y = 0;
	}

	if( ( this.velocity.x > 0 && this.boundingBox.right >= paddingRight ) || ( this.velocity.x < 0 && this.boundingBox.left <= paddingLeft ) )
	{
		this.velocity.x = 0;
	}
};

Paddle.prototype.shootProjectile = function( projectile ) {
	if( !projectile ) {
		projectile = new Projectile( this );
	}
	projectile.position.x = this.position.x;
	projectile.position.y = this.position.y;
	
	projectile.velocity.x = Math.cos( this.rotation * Math.TO_RADIANS ) * viewport.width * 0.33;
	projectile.velocity.y = Math.sin( this.rotation * Math.TO_RADIANS ) * viewport.width * 0.33;
	
	if( this.position.x > viewport.width * 0.50 )
	{
		projectile.velocity.x *= -1;
	}
	/*
	if( this.position.x < viewport.width * 0.50 ) {
		projectile.velocity.x = viewport.width * 0.25;
	} else {
		projectile.velocity.x = -viewport.width * 0.25;
	}
	*/

	if( projectile.effect ) {
		projectile.effect.minVelocity.x += projectile.velocity.x / 2;
		projectile.effect.maxVelocity.x += projectile.velocity.x / 2;
		projectile.effect.minVelocity.y += projectile.velocity.y / 2;
		projectile.effect.maxVelocity.y += projectile.velocity.y / 2;
	}

	this.projectiles.push( projectile );
	InputManager.history = [ ];
};

Paddle.prototype.update = function( deltaTime ) {
	Sprite.prototype.update.call( this, deltaTime );
	
	//this.offset = this.position.y / viewport.height * 0.75;
	
	if( this.projectiles.length > 0 ) {
		for( var i = 0; i < this.projectiles.length; i++ ) {
			var projectile = this.projectiles[i];

			projectile.update( deltaTime );	
		}
	}
	// if( this.projectile ) {
	// 	if( this.projectile.boundingBox.right < 0 || this.projectile.boundingBox.left > viewport.width ) {
	// 		this.projectile = null;
	// 	} else {
	// 		this.projectile.update( deltaTime );
	// 	}
	// }
	
	this.velocity = this.velocity.multiply( this.drag );
	
	if( this.bloodEffect ) {
		this.bloodEffect.update( deltaTime );
		if( this.bloodEffect.particles.count === 0 ) {
			this.bloodEffect = null;
		}
	}

	if( this.glue )
	{
		this.glue.position.x = this.position.x;
		this.glue.position.y = this.position.y;
		//this.glue.size.y = this.size.y * this.scale * 1.2;
		this.glue.size.x = this.size.x * this.scale * 6;
		
		if( this.glue.size.y < this.size.y * this.scale * 1.2 ) {
			this.glue.size.y += this.size.y * 3 * deltaTime;
		} else if( this.glue.size.y !== this.size.y * this.scale * 1.2) {
			this.glue.size.y = this.size.y * this.scale * 1.2;
		}

		// blink last 2 seconds
		if( this.gluePowerup && app.gameTime > this.gluePowerup - 2000 ) {
			this.glue.opacity = ( Math.sin(  app.gameTime / 50 ) > 0 ) ? 1 : 0;
		}
	}

	if( this.shield )
	{
		this.shield.position.x = this.position.x;
		this.shield.position.y = this.position.y;
		this.shield.size.y = this.size.y * this.scale;
		this.shield.size.x = this.shield.size.y;
		this.shield.rotation += 45 * deltaTime;
		if( this.shield.scale < 1 ) {
			this.shield.scale += 3 * deltaTime;
		} else {
			this.shield.scale = (Math.sin( app.gameTime / 250 ) * 0.5 + 0.5) * 0.15 + 1;
		}

		if( this.shield.rotation > 360 ) {
			this.shield.rotation -= 360;
		}

		// blink last 2 seconds
		if( this.shieldPowerup && app.gameTime > this.shieldPowerup - 2000 ) {
			this.shield.opacity = ( Math.sin(  app.gameTime / 50 ) > 0 ) ? 0.5 : 0;
		}
	}

	if( this.shieldPowerup && app.gameTime > this.shieldPowerup ) {
		this.shield = null;
		this.shieldPowerup = false;
	}

	if( this.speedPowerup && app.gameTime > this.speedPowerup ) {
		this.speedPowerup = false;
	}

	if( this.gluePowerup && app.gameTime > this.gluePowerup ) {
		this.glue = null;
		this.gluePowerup = false;

		var ball = SceneManager.currentScene.layers['Kombat'].components['Ball'];
		if( ball && ball.glued ) {
			ball.unglue( );
		}
	}

	if( this.timePowerup && app.gameTime > this.timePowerup ) {
		this.timePowerup = false;
	}
};