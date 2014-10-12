function Player( ) {
	Paddle.call( this );
	
	this.tint = new Color( 255, 255, 0 );
	this.score = 0;
	
	this.position.x = viewport.width * 0.02;
	this.position.y = viewport.height * 0.50;
}

Player.prototype = new Paddle;
Player.prototype.constructor = Player;

Player.prototype.handleInput = function( deltaTime ) {
	switch( InputManager.context )
	{
		case Keyboard :
			if( InputManager.isButtonDown( Buttons.UP ) )
			{
				this.moveUp( );
			}
			else if( InputManager.isButtonDown( Buttons.DOWN ) )
			{
				this.moveDown( );
			}
			
			if( InputManager.checkButtonPress( Buttons.ACTION ) && !this.layer.components['PlayerProjectile'] )
			{
				var projectile = this.shootProjectile( );
				projectile.velocity.x = viewport.width * 0.25;
			}
		break;
	}
};

Player.prototype.shootProjectile = function( ) {
	var projectile = Paddle.prototype.shootProjectile.call( this );
	projectile.velocity.x = viewport.width * 0.25;
	this.layer.addComponent( 'PlayerProjectile', projectile );
	
	return projectile;
};

Player.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	
	this.handleInput( deltaTime );
	this.restrictToBounds( );
};