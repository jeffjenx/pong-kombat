function ShifterPaddle( ) {
	this.color = new Color( 255, 200, 155 );
	this.enum = "SHIFTER"
	this.name = "Shifter";
	this.bigness = 2.50;
	this.quickness = 3.50;
	
	this.projectileSequence = [ Buttons.RIGHT, Buttons.LEFT, Buttons.RIGHT, Buttons.ACTION ];
	this.dismantleSequence = [ Buttons.LEFT, Buttons.UP, Buttons.RIGHT, Buttons.ACTION ];

	this.endStory = "shifter end story";
	this.story = "shifter story";
	
	Paddle.call( this, 'Paddle-Shifter' );
}

ShifterPaddle.prototype = new Paddle;
ShifterPaddle.prototype.constructor = ShifterPaddle;

ShifterPaddle.prototype.dismantle = function( opponent ) {
	var sceneTime = opponent.layer.scene.stateTime;
	
	if( sceneTime < 2 ) {
	} else if( sceneTime < 5 ) {
		this.velocity.x = viewport.width * ( sceneTime - 2 / 100 );
	}
};

ShifterPaddle.prototype.shootProjectile = function( ) {
	Paddle.prototype.shootProjectile.call( this );
	//this.projectile.tint = this.color;
};

ShifterPaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	this.velocity = this.velocity.multiply( 0.9 );
};