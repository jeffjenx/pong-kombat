function Opponent( ) {
	this.paddle = null;
	this.life = 0;
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

			if( ball && ball.glued && ball.lastPaddle === this )
			{
				ball.glued = false;
				var speed = viewport.width * 0.1;
				ball.velocity.x = Math.round( speed * Math.cos( ball.rotation * Math.TO_RADIANS ) );
				ball.velocity.y = Math.round( speed * Math.sin( ball.rotation * Math.TO_RADIANS ) );
				ball.speed = ball.startSpeed;
			}
			
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
				if( ball && ball.velocity.x > 0 )
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
				if( ball && ball.velocity.x > 0 )
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
					if( this.paddle.replenishSequence )
					{
						// White Paddle 
						if( this.paddle.quickness == 5.00 && this.life < SceneManager.currentScene.startLife
						 || this.paddle.quickness == 4.75 && this.life < SceneManager.currentScene.startLife * 0.75 
						 || this.paddle.quickness == 4.50 && this.life < SceneManager.currentScene.startLife * 0.50 
						 || this.paddle.quickness == 4.25 && this.life < SceneManager.currentScene.startLife * 0.25 
						 || this.paddle.quickness == 4.00 && this.life < SceneManager.currentScene.startLife * 0.20 )
						{
							this.paddle.replenish( );
							this.nextProjectileTime = app.gameTime + Math.random( ) * 10000;
						}
						else
						{
							this.paddle.shootProjectile( );
							this.nextProjectileTime = app.gameTime + Math.random( ) * 10000;
						}
					}
					else
					{
						// Other Paddles
						this.paddle.shootProjectile( );
						this.nextProjectileTime = app.gameTime + Math.random( ) * 10000;
					}
				}
			}
			else if( app.settings.DIFFICULTY === 3 )
			{
				var enemy = this.layer.components['LeftKombatant'];

				// EXTREME
				// Move to avoid projectiles
				if( Math.abs( enemy.paddle.position.y - this.paddle.position.y ) < this.paddle.size.y * this.paddle.scale )
				{
					if( this.paddle.position.y < viewport.height * 0.5 )
					{
						this.paddle.moveDown( );
					}
					else
					{
						this.paddle.moveUp( );
					}
				}

				if( enemy.paddle.position.x > viewport.width * 0.25 )
				{
					this.paddle.moveRight( );
				}
				else
				{
					this.paddle.moveLeft( );
				}

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

				// White Paddle
				if( this.paddle.replenishSequence )
				{
					if( this.paddle.quickness == 5.00 && this.life < SceneManager.currentScene.startLife
					 || this.paddle.quickness == 4.75 && this.life < SceneManager.currentScene.startLife * 0.75 
					 || this.paddle.quickness == 4.50 && this.life < SceneManager.currentScene.startLife * 0.50 
					 || this.paddle.quickness == 4.25 && this.life < SceneManager.currentScene.startLife * 0.25 
					 || this.paddle.quickness == 4.00 && this.life < SceneManager.currentScene.startLife * 0.20 )
					{
						this.paddle.replenish( );
						this.nextProjectileTime = app.gameTime + Math.random( ) * 5000;
					}
				}

				// Projectiles aimed at return volley
				if( ball && ball.velocity.x < 0 )
				{
					this.targetPosition = (enemy.paddle.position.x - ball.position.x) / ball.velocity.x * ball.velocity.y + ball.position.y;
					
					if( this.paddle.position.y < this.targetPosition + 10 )
					{
						this.paddle.moveDown( );
					}
					else if( this.paddle.position.y > this.targetPosition - 10 )
					{
						this.paddle.moveUp( );
					}
					
					if( this.paddle.canShootProjectile( ) && Math.abs( this.paddle.position.y - this.targetPosition ) < this.paddle.size.y * this.paddle.scale )
					{
						this.paddle.shootProjectile( );
						this.nextProjectileTime = app.gameTime + Math.random( ) * 10000;
					}
				}
			}
		break;
		
		case this.layer.scene.states.finishing :
			if( SceneManager.currentScene.winner === this ) {
				if( !this.randomizer ) {
					this.randomizer = Math.random( );
				}
				if( this.randomizer < 0.11 ) {
					this.layer.scene.finishType = this.layer.scene.finishTypes.dismantled;
					this.layer.scene.changeState( this.layer.scene.states.dismantling );
				} else if( this.paddle.canShootProjectile( ) ) {
					this.paddle.shootProjectile( );
				}
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

	this.paddle.kombatant = this;

	this.paddle.restrictToBounds = function( ) {
		var paddingBottom = viewport.height;
		var paddingTop = SceneManager.currentScene.layers['HUD'].components['HUD'].size.y;
		var paddingLeft = viewport.width * 0.5;
		var paddingRight = viewport.width;
		
		if( ( this.velocity.y > 0 && this.boundingBox.bottom >= paddingBottom ) || ( this.velocity.y < 0 && this.boundingBox.top <= paddingTop ) )
		{
			this.velocity.y = 0;
		}

		if( ( this.velocity.x > 0 && this.boundingBox.right >= paddingRight ) || ( this.velocity.x < 0 && this.boundingBox.left <= paddingLeft ) )
		{
			this.velocity.x = 0;
		}
	};
};

Opponent.prototype.update = function( deltaTime ) {
	if( this.life < 0 ) {
		this.life = 0;
	}
	
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