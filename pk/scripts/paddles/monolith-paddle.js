function MonolithPaddle( ) {
	this.enum = "MONOLITH"
	this.name = "Monolith";
	this.bigness = 5.00;
	this.quickness = 3.00;
	
	this.endStory = "monolith end story";
	this.story = "monolith story";
	
	Paddle.call( this, 'Paddle-Monolith' );
}

MonolithPaddle.prototype = new Paddle;
MonolithPaddle.prototype.constructor = MonolithPaddle;

MonolithPaddle.prototype.dismantle = function( opponent ) {
	var sceneTime = opponent.layer.scene.stateTime;
	
	if( sceneTime < 2 ) {
	} else if( sceneTime < 5 ) {
		this.velocity.x = viewport.width * ( sceneTime - 2 / 100 );
	}
};

MonolithPaddle.prototype.shootProjectile = function( ) {
	Paddle.prototype.shootProjectile.call( this );
	this.projectile.tint = this.tint;
};

MonolithPaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	this.velocity = this.velocity.multiply( 0.9 );
};