function Player( ) {
	this.life = 0;
	this.paddle = null;
}

Player.prototype.constructor = Player;

Player.prototype.draw = function( context ) {
	this.paddle.draw( context );
};

Player.prototype.handleInput = function( ) {
	switch( this.layer.scene.state ) {
		case this.layer.scene.states.finishing :
			if( this.paddle.dismantleSequence && InputManager.checkSequence( this.paddle.dismantleSequence ) ) {
				this.layer.scene.finishType = this.layer.scene.finishTypes.dismantled;
				this.layer.scene.changeState( this.layer.scene.states.dismantling );
			}

			if( this.paddle.canShootProjectile( ) && InputManager.checkSequence( this.paddle.projectileSequence ) )
			{
				this.paddle.shootProjectile( );
			}
		break;
		// No "break;" on this case
		
		case this.layer.scene.states.fighting :
			if( InputManager.isButtonDown( Buttons.UP ) )
			{
				this.paddle.moveUp( );
			}
			else if( InputManager.isButtonDown( Buttons.DOWN ) )
			{
				this.paddle.moveDown( );
			}

			if( InputManager.isButtonDown( Buttons.LEFT ) )
			{
				this.paddle.moveLeft( );
			}
			else if( InputManager.isButtonDown( Buttons.RIGHT ) )
			{
				this.paddle.moveRight( );
			}
			
			if( this.paddle.canShootProjectile( ) && InputManager.checkSequence( this.paddle.projectileSequence ) )
			{
				this.paddle.shootProjectile( );
			}

			if( this.paddle.replenishSequence && InputManager.checkSequence( this.paddle.replenishSequence ) )
			{
				this.paddle.replenish( );
			}

			var ball = this.layer.components['Ball'];
			if( ball && ball.glued && ball.lastPaddle === this && InputManager.checkButtonPress( Buttons.ACTION ) )
			{
				ball.unglue( );
			}
		break;
	}
};

Player.prototype.setPaddle = function( paddle ) {
	switch( paddle ) {
		case Paddles.RANDOM : this.setPaddle( Math.floor( 2 + Math.random( ) * 5 ) ); break; // 2 + RAND[1,5] refers to Paddles ENUM
		case Paddles.BLUE : this.paddle = new BluePaddle( ); break;
		case Paddles.YELLOW : this.paddle = new YellowPaddle( ); break;
		case Paddles.RED : this.paddle = new RedPaddle( ); break;
		case Paddles.GREEN : this.paddle = new GreenPaddle( ); break;
		case Paddles.PURPLE : this.paddle = new PurplePaddle( ); break;
		case Paddles.WHITE : this.paddle = new WhitePaddle( ); break;
		case Paddles.SHIFTER : this.paddle = new ShifterPaddle( ); break;
		case Paddles.MONOLITH : this.paddle = new MonolithPaddle( ); break;
		case Paddles.MRSLAYER : this.paddle = new MrSlayerPaddle( ); break;
		case Paddles.MYST : this.paddle = new MystPaddle( ); break;
	}

	this.paddle.kombatant = this;
	
	return this.paddle;
};

Player.prototype.update = function( deltaTime ) {
	switch( this.layer.scene.state ) {
		case this.layer.scene.states.fighting :
			this.handleInput( );
		break;
		
		case this.layer.scene.states.finishing :
			if( this === this.layer.scene.winner ) {
				this.handleInput( );
			}
		break;
	}
	this.paddle.update( deltaTime );
	this.paddle.restrictToBounds( );
};