function GreenPaddle( ) {
	this.enum = "GREEN";
	this.name = "Green Paddle";
	this.bigness = 2.50;
	
	Paddle.call( this, 'Paddle-Green' );
	
	this.endStory = "green end story";
	this.story = "green story";
}

GreenPaddle.prototype = new Paddle;
GreenPaddle.prototype.constructor = GreenPaddle;

GreenPaddle.prototype.draw = function( context ) {
	//Paddle.prototype.draw.call( this, context );
	
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	this.patternContext.save( );
	this.patternContext.translate( -this.offset * this.patternCanvas.width, 0 );
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.fillRect( -this.patternCanvas.width, -this.patternCanvas.height, this.patternCanvas.width * 2, this.patternCanvas.height * 2 );
	this.patternContext.restore( );
	
	context.save( );
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
		
		-this.size.x * this.registration.x * this.scale,
		-this.size.y * this.registration.y * this.scale,
		this.size.x * this.scale,
		this.size.y * this.scale
	);
	context.restore( );
	
	context.save( );
	context.globalAlpha *= this.opacity * 0.5;
	context.translate( this.position.x, this.position.y );
	context.rotate( this.rotation * Math.TO_RADIANS );
	if( !this.flipH )
	{
		context.scale( -1, 1 );
	}
	
	context.drawImage(
		this.patternCanvas,
		0,
		this.size.y * 0.75,
		this.patternCanvas.width * (this.size.x / this.size.y) * 0.75,
		this.patternCanvas.height * 0.75,
		
		-this.size.x * this.registration.x * this.scale,
		-this.size.y * this.registration.y * this.scale,
		this.size.x * this.scale,
		this.size.y * this.scale
	);
	context.restore( );
	
	
	if( this.projectile ) {
		this.projectile.draw( context );
	}
};

GreenPaddle.prototype.dismantle = function( opponent ) {
	var sceneTime = opponent.layer.scene.stateTime;
	
	if( sceneTime < 2 ) {
	} else if( sceneTime < 5 ) {
		this.velocity.x = viewport.width * ( sceneTime - 2 / 100 );
	}
};

GreenPaddle.prototype.shootProjectile = function( ) {
	Paddle.prototype.shootProjectile.call( this );
	this.projectile.tint = this.tint;
};

GreenPaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	this.velocity = this.velocity.multiply( 0.9 );
};