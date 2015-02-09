function PaddleBot( ) {
	this.color = new Color( 0, 0, 0 );
	this.enum = "PADDLEBOT"
	this.name = "Pong-bot 9000";
	this.bigness = 4.00;
	this.quickness = 3.25;

	Paddle.call( this, 'Paddle-Bot' );

	this.icon = Resources['Paddle-Icon-Paddle-Bot'];

	this.size.x = this.size.y;

	this.animations = {
		'default' : { frames : [0], step : 1000 },
		'talking' : { frames : [0,1,1,2,0,2,2,0,1,2,1,0,0,1,2,0,1,1,2,0,1], step : 125 },
		'rotate-in' : { frames : [0,3,4,5,6,7,8], step : 88 },
		'rotate-out' : { frames : [8,7,6,5,4,3,0], step : 88 },
		'rotated' : { frames : [8], step : 1000 }
	};
	this.currentAnimation = 'rotated';
	this.currentFrame = 0;
	this.currentStep = 0;
	this.frame = { x : 0, y : 0, width : 256, height : 256 };
}

PaddleBot.prototype = new Paddle;
PaddleBot.prototype.constructor = PaddleBot;

PaddleBot.prototype.draw = function(context) {
	Component.prototype.draw.call( this, context );
	
	if( this.currentAnimation == null )
	{
		return;
	}
	
	if( this.currentFrame >= this.animations[this.currentAnimation].frames.length )
	{
		this.currentFrame = 0;
	}
	
	context.save( );
	context.globalAlpha = this.opacity;
	context.translate( this.position.x, this.position.y );
	if( this.flipH )
	{
		context.scale( -1, 1 );
	}
	context.rotate( this.rotation * Math.TO_RADIANS );
	context.drawImage(
		this.image,
		this.frame.width * this.animations[this.currentAnimation].frames[this.currentFrame] % this.image.width,
		this.frame.height * Math.floor( this.frame.width * this.animations[this.currentAnimation].frames[this.currentFrame] / this.image.width ),
		this.frame.width,
		this.frame.height,
		-this.size.x * this.registration.x * this.scale,
		-this.size.y * this.registration.y * this.scale,
		this.size.x * this.scale,
		this.size.y * this.scale
	);
	context.restore( );

	if( this.shield ) {
		this.shield.draw( context );
	}
};

PaddleBot.prototype.updateBoundingBox = function() {
	Paddle.prototype.updateBoundingBox.call(this);

	var width = this.boundingBox.right - this.boundingBox.left;
	this.boundingBox.left += width * 0.45;
};

PaddleBot.prototype.update = function(deltaTime) {
	Paddle.prototype.update.call(this,deltaTime);

	if( this.currentAnimation == null )
	{
		return;
	}
	
	this.currentStep += deltaTime * 1000;
	if( this.currentStep >= this.animations[this.currentAnimation].step )
	{
		this.currentFrame += 1;
		this.currentStep = 0;
	}
	
	if( this.currentFrame >= this.animations[this.currentAnimation].frames.length )
	{
		this.currentFrame = 0;

		if( this.currentAnimation === 'rotate-in' ) {
			this.currentAnimation = 'rotated';
		} else if( this.currentAnimation === 'rotate-out' ) {
			this.currentAnimation = 'default';
		}
	}
};