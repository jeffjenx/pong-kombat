var Balls = {
	RANDOM : 0,
	BASEBALL : 1,
	BASKETBALL : 2,
	BILLIARDS_BALL : 3,
	COIN : 4,
	CROQUET_BALL : 5,
	DEFAULT_BALL : 6,
	DICE : 7,
	EMOTICON : 8,
	EYE_BALL : 9,
	FOIL_BALL : 10,
	FOOD : 11,
	FOOTBALL : 12,
	LOGO : 13,
	MARBLE : 14,
	PAC_MAN : 15,
	POKEBALL : 16,
	PONG_BALL : 18,
	RUPEE : 19,
	SOCCER_BALL : 20,
	SOLAR_SYSTEM : 21,
	STORAGE_MEDIA : 22,
	SUPER_MARIO : 23,
	TENNIS_BALL : 24
};

function Ball( texture ) {
	Sprite.call( this, texture );
	
	this.startSpeed = 8;
	this.maxSpeed = 13;
	
	this.patternCanvas = document.createElement( 'canvas' );
	this.patternCanvas.width = (this.image) ? this.image.width : 512;
	this.patternCanvas.height = (this.image) ? this.image.height : 512;
	this.patternContext = this.patternCanvas.getContext( '2d' );
	
	this.offset = copy( Vector.Zero );
	this.size.x = viewport.width * 0.03;
	this.size.y = this.size.x;
	
	// Audio
	this.beepSound = new Sound( 'Beep' );
	this.boopSound = new Sound( 'Boop' );

	this.hitSounds = [];
	this.hitSounds.push( new Sound( 'Kick-1' ) );
	this.hitSounds.push( new Sound( 'Kick-2' ) );
	this.hitSounds.push( new Sound( 'Kick-3' ) );
	this.hitSounds.push( new Sound( 'Punch-1' ) );
	this.hitSounds.push( new Sound( 'Punch-2' ) );
	this.hitSounds.push( new Sound( 'Punch-3' ) );
	this.hitSounds.push( new Sound( 'Punch-4' ) );
	
	this.lastPaddle = null;
	this.sourceRotation = this.rotation;
	this.targetRotation = this.rotation;

	this.collisionAreas = [
		{ type : 'circle', radius : this.width / 2, center : this.position } 
	];
	
	this.addGlare( );
	this.glued = false;
	this.glueOffset = new Vector( [0,0] );
	this.glueSpeed = null;
	this.bulletTimed = false;
}

Ball.prototype = new Sprite;
Ball.prototype.constructor = Ball;

Ball.prototype.addGlare = function( ) {
	this.glare = new Sprite( 'Ball-Glare' );
	this.glare.opacity = 0.666 * this.opacity;
	this.glare.size.x = this.size.x * 3;
	this.glare.size.y = this.size.y * 3;
};

Ball.prototype.draw = function( context ) {
	Component.prototype.draw.call( this, context );
	
	if( !this.enabled ) {
		return;
	}
	
	context.save( );
	context.globalAlpha *= this.opacity;
	context.translate( this.position.x, this.position.y );
	context.rotate( this.rotation * Math.TO_RADIANS );
	if( this.flipH )
	{
		context.scale( -1, 1 );
	}
	context.beginPath();
	context.arc(0, 0, this.size.x * this.scale * 0.49, 0, 2 * Math.PI, false);
	context.clip();
	
	this.patternContext.save();
	this.patternContext.translate( -this.offset.x, -this.offset.y );
	this.patternContext.rect( 0, 0, this.patternCanvas.width, this.patternCanvas.height );
	this.patternContext.fill();
	this.patternContext.restore();
	
	context.drawImage(
		this.patternCanvas,
		// Source
		0,
		0,
		this.patternCanvas.width,
		this.patternCanvas.height,
		// Destination
		-this.size.x * this.scale * 0.50,
		-this.size.y * this.scale * 0.50,
		this.size.x * this.scale,
		this.size.y * this.scale
	);
	context.restore( );
	
	this.drawGlare( context );
};

Ball.prototype.drawGlare = function( context ) {
	if( this.glare ){
		this.glare.draw(context);
	}
};

Ball.prototype.unglue = function( ) {
	this.glued = false;
	//var speed = viewport.width * 0.1;
	this.velocity.x = Math.round( this.glueSpeed * Math.cos( this.rotation * Math.TO_RADIANS ) );
	this.velocity.y = Math.round( this.glueSpeed * Math.sin( this.rotation * Math.TO_RADIANS ) );
	//this.speed = this.startSpeed;
}

Ball.prototype.hitPaddle = function( kombatant ) {
	this.lastPaddle = kombatant;

	// Reflect ball
	this.velocity.x *= -1;
	
	this.changedRotation();

	if( kombatant.paddle.gluePowerup ) {
		this.rotation = Math.atan2( this.velocity.y, this.velocity.x ) * Math.TO_DEGREES;
		this.glueSpeed = this.velocity.length( );
		this.velocity.x = 0;
		this.velocity.y = 0;
		this.glueOffset.x = this.position.x - kombatant.paddle.position.x;
		this.glueOffset.y = this.position.y - kombatant.paddle.position.y;
		this.glued = true;
		return;
	}

	if( this.bulletTimed ) {
		this.bulletTimed = false;
	}
	
	// Handle "paddle friction"
	var x = this.velocity.x;
	var y = this.velocity.y;
	var angle = kombatant.paddle.velocity.y / viewport.height * 60 * Math.TO_RADIANS;
	this.velocity.x = x * Math.cos(angle) - y * Math.sin(angle);
	this.velocity.y = x * Math.sin(angle) + y * Math.cos(angle);
	
	// Increase ball speed over time
	if( this.speed < this.maxSpeed )
	{
		this.speed += 1;
		this.velocity = this.velocity.multiply( 1.25 );
	}
	else
	{
		this.speed += 0.2;
		this.velocity = this.velocity.multiply( 1.05 );
	}
	
	if( app.settings.SOUND_FX > 0 && !app.isMobile( ) )
	{
		if( app.settings.COMBAT ) {
			var randomHitSound = this.hitSounds[ Math.floor(Math.random() * this.hitSounds.length) ];
			randomHitSound.setMaxVolume(0.8 * app.settings.SOUND_FX / 11);
			randomHitSound.play();
		} else {
			this.beepSound.play( );
			this.beepSound.setMaxVolume(0.8 * app.settings.SOUND_FX / 11);
		}
	}
};

Ball.prototype.hitPowerup = function( ) {
	this.layer.components['Powerup'].collect( this.lastPaddle );
};

Ball.prototype.hitWall = function( ) {
	this.velocity.y *= -1;
	
	if( app.settings.SOUND_FX > 0 && !app.isMobile( ) )
	{
		if( app.settings.COMBAT ) {
			var randomHitSound = this.hitSounds[ Math.floor(Math.random() * this.hitSounds.length) ];
			randomHitSound.stop();
			randomHitSound.play();
		} else {
			this.boopSound.stop( );
			this.boopSound.play( );
		}
	}

	this.changedRotation();
};

Ball.prototype.set = function( direction ) {
	this.speed = this.startSpeed;
	
	this.position.x = viewport.width * 0.50;
	this.position.y = viewport.height * 0.50;
	
	var angle;
	var speed = viewport.width * 0.15; // Always start at the same speed
	
	// Randomize direction of ball
	angle = Math.random( ) * 90 - 45; // Angle between -45 and +45deg
	angle += ( direction === 'left' || (Math.random( ) >= 0.5 && direction !== 'right') ) ? 180 : 0; // Towards left or right
	//angle = 180; // Force ball to start toward left
	
	this.velocity.x = Math.round( speed * Math.cos( angle * Math.TO_RADIANS ) );
	this.velocity.y = Math.round( speed * Math.sin( angle * Math.TO_RADIANS ) );
	
	this.rotation = angle;
	this.targetRotation = angle;
	this.scale = 0;
	
	this.updateBoundingBox( );
	this.changedRotation( );
};

Ball.prototype.changedRotation = function( ) {
	this.sourceRotation = this.glare.rotation;
	if( this.velocity.x !== 0 || this.velocity.y !== 0 ) {
		this.targetRotation = Math.atan2( this.velocity.y, this.velocity.x ) * Math.TO_DEGREES;
	} else {
		this.targetRotation = this.rotation;
	}
};

Ball.prototype.update = function( deltaTime ) {
	if( this.scale < 1 ) {
		this.scale += 3.3 * deltaTime;
		if( this.glare ) {
			this.glare.scale = this.scale;
			this.glare.opacity = this.scale * 0.666 * this.opacity;
		}
	} else {
		this.scale = this.scale;
		if( this.glare ) {
			this.glare.scale = this.scale;
			this.glare.opacity = 0.666 * this.opacity;
		}

		if( this.bulletTimed ) {
			this.position = this.position.add( this.velocity.multiply( deltaTime * 0.5 ) );
			
			this.updateBoundingBox( );
			this.updateSize( );
		} else {
			Sprite.prototype.update.call( this, deltaTime );
		}
	}
	
	this.offset.x += this.velocity.x * deltaTime * 3;
	this.offset.y += this.velocity.y * deltaTime * 3;
	
	this.sourceRotation = this.glare.rotation;
	this.targetRotation = this.rotation;
	if( this.velocity.x !== 0 || this.velocity.y !== 0 ) {
		this.rotation = Math.atan2( this.velocity.y, this.velocity.x ) * Math.TO_DEGREES;
	}

	if( this.glued ) {
		this.position = this.lastPaddle.paddle.position.add( this.glueOffset );
		//this.position = this.position.add( this.lastPaddle.paddle.velocity.multiply( deltaTime ) );
		//this.position.x += this.lastPaddle.paddle.velocity.x;
		//this.position.y += this.lastPaddle.paddle.velocity.y;
	}

	this.updateCollision( );
	this.updateGlare( );
};

Ball.prototype.updateCollision = function( ) {
	this.collisionAreas[0].radius = this.width / 2 * this.scale;
	this.collisionAreas[0].center = this.position;
}

Ball.prototype.updateGlare = function( ) {
	if( this.glare ){
		this.glare.position.x = this.position.x;
		this.glare.position.y = this.position.y;

		// Rotate glare to match ball direction
		if( Math.abs( this.glare.rotation - this.targetRotation ) <= 3 ) {
			this.glare.rotation = this.targetRotation;
		}
		else {
			if( this.targetRotation - this.sourceRotation > 180 ){
				this.targetRotation -= 360;
			} else if (this.targetRotation - this.sourceRotation < -180) {
				this.targetRotation += 360;
			}
			
			if( this.glare.rotation < this.targetRotation ) {
				this.glare.rotation += 135 * Math.abs( (this.glare.rotation - this.targetRotation) / 360 );
			} else {
				this.glare.rotation -= 135 * Math.abs( (this.glare.rotation - this.targetRotation) / 360 );
			}
		}
	}
}