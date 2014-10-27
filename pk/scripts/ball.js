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
}

Ball.prototype = new Sprite;
Ball.prototype.constructor = Ball;

Ball.prototype.addGlare = function( ) {
	this.glare = new Sprite( 'Ball-Glare' );
	this.glare.opacity = 0.666;
	this.glare.size.x = this.size.x * 3.1;
	this.glare.size.y = this.size.y * 3.1;
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

Ball.prototype.hitPaddle = function( paddle ) {
	this.velocity.x *= -1;
	
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
	
	this.lastPaddle = paddle;
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
	angle *= Math.PI / 180; // Convert to radians
	
	this.velocity.x = Math.abs( speed ) * Math.cos( angle );
	this.velocity.y = Math.abs( speed ) * Math.sin( angle );
};

Ball.prototype.update = function( deltaTime ) {
	Sprite.prototype.update.call( this, deltaTime );
	
	this.offset.x += this.velocity.x * deltaTime;
	this.offset.y += this.velocity.y * deltaTime;
	
	if( this.glare ){
		this.glare.position.x = this.position.x;
		this.glare.position.y = this.position.y;
		
		// Rotate glare texture to match ball direction
		var angle = Math.atan2( this.velocity.y, this.velocity.x ) * Math.TO_DEGREES;
		if( this.glare.rotation < angle ) {
			this.glare.rotation += 90 * Math.abs( (this.glare.rotation - angle) / 360 );
		} else {
			this.glare.rotation -= 90 * Math.abs( (this.glare.rotation - angle) / 360 );
		}
	} else {
		this.addGlare();
	}
};