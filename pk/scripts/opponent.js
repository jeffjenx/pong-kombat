function Opponent( ) {
	this.paddle = null;
	this.score = 0;
	this.nextProjectileTime = 0;
}

Opponent.prototype.constructor = Opponent;

Opponent.prototype.draw = function( context ) {
	this.paddle.draw( context );
};

Opponent.prototype.applyAI = function( ) {
	switch( this.layer.scene.state ) {
		case this.layer.scene.states.fighting :
			var ball = this.layer.components['Ball'];
			
			if( this.paddle.boundingBox.bottom < ball.position.y )
			{
				this.paddle.moveDown( );
			}
			else if( this.paddle.boundingBox.top > ball.position.y )
			{
				this.paddle.moveUp( );
			}
			
			if( this.paddle.canShootProjectile( ) && app.gameTime > this.nextProjectileTime )
			{
				this.paddle.shootProjectile( );
				this.nextProjectileTime = app.gameTime + Math.random( ) * 10000;
			}
		break;
		
		case this.layer.scene.states.finishing :
			if( !this.randomizer ) {
				this.randomizer = Math.random( );
			}
			if( this.randomizer < 0.11 ) {
				this.layer.scene.changeState( this.layer.scene.states.dismantling );
			} else if( this.paddle.canShootProjectile( ) ) {
				this.paddle.shootProjectile( );
			}
		break;
	}
};

Opponent.prototype.setPaddle = function( paddle ) {
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
	}
};

Opponent.prototype.update = function( deltaTime ) {
	switch( this.layer.scene.state ) {
		case this.layer.scene.states.fighting :
			this.applyAI( );
		break;
		
		case this.layer.scene.states.finishing :
			if( this === this.layer.scene.winner ) {
				this.applyAI( );
			}
		break;
	}
	this.paddle.update( deltaTime );
	this.paddle.restrictToBounds( );
};