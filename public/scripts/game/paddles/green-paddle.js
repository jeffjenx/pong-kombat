function GreenPaddle( ) {
	this.color = new Color( 0, 255, 0 );
	this.enum = "GREEN";
	this.name = "Green Paddle";
	this.bigness = 2.50;
	this.quickness = 2.00;
	
	this.projectileSequence = [ Buttons.LEFT, Buttons.RIGHT, Buttons.RIGHT, Buttons.ACTION ];
	this.dismantleSequence = [ Buttons.LEFT, Buttons.RIGHT, Buttons.LEFT, Buttons.ACTION ];

	this.endStory = "green end story";
	this.story = "green story";
	
	Paddle.call( this, 'Paddle-Green' );
}

GreenPaddle.prototype = new Paddle;
GreenPaddle.prototype.constructor = GreenPaddle;

GreenPaddle.prototype.draw = function( context ) {
	Component.prototype.draw.call( this, context );
	
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	this.patternContext.save( );
	this.patternContext.translate( -this.offset * this.patternCanvas.width, -Math.sin(this.offset * 2 * Math.PI) * this.patternCanvas.height * 0.11 );
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.fillRect( -this.patternCanvas.width, -this.patternCanvas.height, this.patternCanvas.width * 3, this.patternCanvas.height * 3 );
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
	context.save();
	context.globalCompositeOperation = 'difference';
	context.globalAlpha = this.opacity;// * 0.5;
	//context.globalAlpha = this.opacity * Math.abs(this.offset * 2 - 1);
	if( !this.flipH )
	{
		context.scale( -1, -1 );
	}
	context.drawImage(
		this.patternCanvas,
		0,
		0,
		this.patternCanvas.width * (this.size.x / this.size.y) * 0.75,
		this.patternCanvas.height * 0.75,
		-width * (1-this.registration.x),
		-height * this.registration.y,
		width,
		height
	);
	context.restore();
	context.drawImage(
		this.gloss.image,
		-width * this.registration.x * 6.5,
		-height * this.registration.y * 1.15,
		width * 6.5,
		height * 1.15
	);
	context.restore();
	
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
	//this.projectile.tint = this.color;
};

GreenPaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	this.velocity = this.velocity.multiply( 0.9 );

	this.offset += 0.11 * deltaTime;
	if( this.offset > 1 ) {
		this.offset = 0;
	}
};