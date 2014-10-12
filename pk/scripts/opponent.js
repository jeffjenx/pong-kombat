function Opponent( ) {
	Paddle.call( this );
	
	this.tint = new Color( 0, 0, 255 );
	this.score = 0;
	
	this.position.x = viewport.width * 0.98;
	this.position.y = viewport.height * 0.50;
	
	this.nextProjectileTime = 0;
}

Opponent.prototype = new Paddle;
Opponent.prototype.constructor = Opponent;

Opponent.prototype.applyAI = function( ) {
	var ball = this.layer.components['Ball'];
	
	if( this.boundingBox.bottom < ball.position.y )
	{
		this.moveDown( );
	}
	else if( this.boundingBox.top > ball.position.y )
	{
		this.moveUp( );
	}
	
	if( !this.layer.components['OpponentProjectile'] && app.gameTime > this.nextProjectileTime ) {
		var projectile = this.shootProjectile( );
		this.nextProjectileTime = app.gameTime + Math.random( ) * 10000;
	}
};

Opponent.prototype.shootProjectile = function( ) {
	var projectile = Paddle.prototype.shootProjectile.call( this );
	projectile.velocity.x = -viewport.width * 0.25;
	this.layer.addComponent( 'OpponentProjectile', projectile );
	
	return projectile;
};

Opponent.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	
	this.applyAI( );
	
	this.restrictToBounds( );
};