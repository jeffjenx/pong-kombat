function Player( ) {
	this.score = 0;
	this.paddle = null;
}

Player.prototype.constructor = Player;

Player.prototype.draw = function( context ) {
	this.paddle.draw( context );
};

Player.prototype.handleInput = function( ) {
	switch( InputManager.context )
	{
		case Keyboard :
			if( InputManager.isButtonDown( Buttons.UP ) )
			{
				this.paddle.moveUp( );
			}
			else if( InputManager.isButtonDown( Buttons.DOWN ) )
			{
				this.paddle.moveDown( );
			}
			
			if( this.paddle.canShootProjectile( ) && InputManager.checkButtonPress( Buttons.ACTION ) )
			{
				this.paddle.shootProjectile( );
			}
		break;
	}
};

Player.prototype.setPaddle = function( paddle ) {
	switch( paddle ) {
		case 'Blue' :
			this.paddle = new BluePaddle( );
		break;
		case 'Yellow' :
			this.paddle = new YellowPaddle( );
		break;
	}
};

Player.prototype.update = function( deltaTime ) {
	this.handleInput( deltaTime );
	this.paddle.update( deltaTime );
};