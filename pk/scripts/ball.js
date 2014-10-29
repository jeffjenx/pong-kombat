var Balls = {
	RANDOM : 0,
	BASKETBALL : 1,
	EIGHTBALL : 2,
	BASEBALL : 3,
	DEFAULT : 4,
	EARTH : 5,
	SMILEY : 6
};

function Ball( texture ) {
	Sprite.call( this, texture );
	
	this.startSpeed = 1;
	this.maxSpeed = 6;
	
	this.patternCanvas = document.createElement( 'canvas' );
	this.patternCanvas.width = ( this.image ) ? this.image.width : 512;
	this.patternCanvas.height = ( this.image ) ? this.image.height : 512;
	this.patternContext = this.patternCanvas.getContext( '2d' );
	
	this.offset = copy( Vector.Zero );
	this.size.x = viewport.width * 0.03;
	this.size.y = this.size.x;
	
	// Audio
	this.beepSound = new Sound( 'Beep' );
	this.boopSound = new Sound( 'Boop' );
	
	this.lastPaddle = null;
	this.sourceRotation = this.rotation;
	this.targetRotation = this.rotation;
}

Ball.prototype = new Sprite;
Ball.prototype.constructor = Ball;

Ball.prototype.addGlare = function( ) {
	this.glare = new Sprite( 'Ball-Glare' );
	this.glare.opacity = 0.666;
	this.glare.size.x = this.size.x * 3.05;
	this.glare.size.y = this.size.y * 3.05;
};

Ball.prototype.draw = function( context ) {
	Component.prototype.draw.call( this, context );
	
	if( !this.enabled ) {
		return;
	}
	
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	this.patternContext.save( );
	this.patternContext.translate( this.offset.x * 3, this.offset.y * 3 );
	this.patternContext.rect( -viewport.width, -viewport.height, viewport.width * 2, viewport.height * 2 );
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.fill( );
	this.patternContext.restore( );
	
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
	context.drawImage(
		this.patternCanvas,
		0,
		0,
		this.image.width * 0.50,
		this.image.height * 0.50,
		-this.size.x * this.registration.x * this.scale,
		-this.size.y * this.registration.y * this.scale,
		this.size.x * this.scale,
		this.size.y * this.scale
	);
	context.restore( );
	
	if( this.glare ){
		this.glare.draw(context);
	}
};

Ball.prototype.hitPaddle = function( kombatant ) {
	// Reflect ball
	this.velocity.x *= -1;
	
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
	
	if( !app.isMobile( ) )
	{
		this.beepSound.stop( );
		this.beepSound.play( );
	}
	
	this.lastPaddle = kombatant;
	this.changedRotation();
};

Ball.prototype.hitPowerup = function( ) {
	this.layer.components['Powerup'].collect( this.lastPaddle );
};

Ball.prototype.hitWall = function( ) {
	this.velocity.y *= -1;
	
	if( !app.isMobile( ) )
	{
		this.boopSound.stop( );
		this.boopSound.play( );
	}
	
	this.changedRotation();
};

Ball.prototype.set = function( ) {
	this.speed = this.startSpeed;
	
	this.position.x = viewport.width * 0.50;
	this.position.y = viewport.height * 0.50;
	
	var angle;
	var speed = viewport.width * 0.1; // Always start at the same speed
	
	// Randomize direction of ball
	angle = Math.random( ) * 90 - 45; // Angle between -45 and +45deg
	angle += ( Math.random( ) >= 0.5 ) ? 180 : 0; // Towards left or right
	angle = 180;
	
	this.velocity.x = Math.round( speed * Math.cos( angle * Math.TO_RADIANS ) );
	this.velocity.y = Math.round( speed * Math.sin( angle * Math.TO_RADIANS ) );
	
	this.scale = 0;
	
	this.updateBoundingBox( );
	this.changedRotation( );
};

Ball.prototype.changedRotation = function( ) {
	if( !this.glare){
		this.addGlare();
	}
	this.sourceRotation = this.glare.rotation;
	this.targetRotation = Math.atan2( this.velocity.y, this.velocity.x ) * Math.TO_DEGREES;
};

Ball.prototype.update = function( deltaTime ) {
	if( this.scale < 1 ) {
		this.scale += 3.3 * deltaTime;
		this.glare.scale = this.scale;
		this.glare.opacity = this.scale * 0.666;
	} else {
		this.scale = 1;
		this.glare.scale = 1;
		this.glare.opacity = 0.666;
		Sprite.prototype.update.call( this, deltaTime );
	}
	
	this.offset.x += this.velocity.x * deltaTime;
	this.offset.y += this.velocity.y * deltaTime;
	
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
};