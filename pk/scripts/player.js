function Player( ) {
	this.score = 0;
	this.paddle = null;
}

Player.prototype.constructor = Player;

Player.prototype.draw = function( context ) {
	this.paddle.draw( context );
};

Player.prototype.handleDismantle = function( kombatScene ) {
	this.handleInput( );
	switch( InputManager.context )
	{
		case Keyboard :
			
		break;
	}
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
			
			if( this.paddle.canShootProjectile( ) && InputManager.checkSequence( [ Buttons.LEFT, Buttons.LEFT, Buttons.RIGHT, Buttons.ACTION ] ) )
			{
				this.paddle.shootProjectile( );
			}
			
			if( this.layer.scene.state === this.layer.scene.states.finishing && InputManager.checkSequence( [ Buttons.RIGHT, Buttons.LEFT, Buttons.RIGHT, Buttons.ACTION ] ) ) {
				this.layer.scene.changeState( this.layer.scene.states.dismantling );
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