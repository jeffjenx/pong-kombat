function Opponent( ) {
	this.paddle = null;
	this.score = 0;
	this.nextProjectileTime = app.gameTime + 2000 + Math.random( ) * 8000;
	this.targetPosition = viewport.height * 0.5;
}

Opponent.prototype.constructor = Opponent;

Opponent.prototype.draw = function( context ) {
	this.paddle.draw( context );
};

Opponent.prototype.applyAI = function( ) {
	switch( this.layer.scene.state ) {
		case this.layer.scene.states.fighting :
			var ball = this.layer.components['Ball'];
			
			if( app.settings.DIFFICULTY === 0 )
			{
				// EASY
				// Move to ball on return volley
				if( ball.velocity.x > 0 )
				{
					if( this.paddle.position.y < ball.position.y - ball.size.y * 0.5 )
					{
						this.paddle.moveDown( );
					}
					else if( this.paddle.position.y > ball.position.y + ball.size.y * 0.5 )
					{
						this.paddle.moveUp( );
					}
				}

				// No Projectiles
			}
			else if( app.settings.DIFFICULTY === 1 ) 
			{
				// MEDIUM
				// Move to ball on return volley
				if( ball.velocity.x > 0 )
				{
					if( this.paddle.position.y < ball.position.y - ball.size.y * 0.5 )
					{
						this.paddle.moveDown( );
					}
					else if( this.paddle.position.y > ball.position.y + ball.size.y * 0.5 )
					{
						this.paddle.moveUp( );
					}
				}

				// Random Projectiles
				if( this.paddle.canShootProjectile( ) && app.gameTime > this.nextProjectileTime )
				{
					this.paddle.shootProjectile( );
					this.nextProjectileTime = app.gameTime + Math.random( ) * 10000;
				}
			}
			else if( app.settings.DIFFICULTY === 2 )
			{
				// HARD
				// Move to ball target on return
				if( ball.velocity.x > 0 )
				{
					this.targetPosition = (this.paddle.position.x - ball.position.x) / ball.velocity.x * ball.velocity.y + ball.position.y;
					
					if( this.paddle.position.y < this.targetPosition + 10 )
					{
						this.paddle.moveDown( );
					}
					else if( this.paddle.position.y > this.targetPosition - 10 )
					{
						this.paddle.moveUp( );
					}
				}

				// Random Projectiles
				if( this.paddle.canShootProjectile( ) && app.gameTime > this.nextProjectileTime )
				{
					this.paddle.shootProjectile( );
					this.nextProjectileTime = app.gameTime + Math.random( ) * 10000;
				}
			}
			else if( app.settings.difficulty === 3 )
			{
				// EXTREME
				// Move to avoid projectiles
				// Move to ball target on return
				// Projectiles aimed at return volley
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