function MrSlayerPaddle( ) {
	this.color = new Color( 160, 33, 33 );
	this.enum = "MRSLAYER"
	this.name = "Mr. Slayer";
	this.bigness = 3.00;
	this.quickness = 3.00;

	this.projectileSequence = [ Buttons.DOWN, Buttons.UP, Buttons.DOWN, Buttons.ACTION ];
	this.dismantleSequence = [ Buttons.UP, Buttons.DOWN, Buttons.UP, Buttons.ACTION ];
	
	this.endStory = "mr. slayer end story";
	this.story = "mr. slayer story";
	
	Paddle.call( this, 'Paddle-MrSlayer' );
	
	this.gloss = new Sprite( 'Paddle-Gloss-MrSlayer' );
}

MrSlayerPaddle.prototype = new Paddle;
MrSlayerPaddle.prototype.constructor = MrSlayerPaddle;

MrSlayerPaddle.prototype.dismantle = function( opponent ) {
	var sceneTime = opponent.layer.scene.stateTime;
	
	if( sceneTime < 2 ) {
	} else if( sceneTime < 5 ) {
		this.velocity.x = viewport.width * ( sceneTime - 2 / 100 );
	}
};

MrSlayerPaddle.prototype.shootProjectile = function( ) {
	Paddle.prototype.shootProjectile.call( this );
	//this.projectile.tint = this.color;
};

MrSlayerPaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	this.velocity = this.velocity.multiply( 0.9 );
};