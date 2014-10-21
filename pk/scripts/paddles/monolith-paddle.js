function MonolithPaddle( ) {
	Paddle.call( this );
	
	this.size.x = viewport.height * 0.02;
	this.size.y = viewport.height * 0.15;
	this.tint = new Color( 90, 90, 80 );
	
	this.enum = "MONOLITH";
	this.name = "Monolith";
	this.endStory = "monolith end story";
	this.story = "monolith story";
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