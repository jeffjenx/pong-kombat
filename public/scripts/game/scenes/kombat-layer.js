function KombatLayer( scene ) {
	Layer.call( this, scene );
	
	this.nextPowerup = this.scene.timeElapsed + 5 + Math.random( ) * 5;
}

KombatLayer.prototype = new Layer;
KombatLayer.prototype.constructor = KombatLayer;

KombatLayer.prototype.centerPaddles = function( ) {
	var leftKombatant = this.components['LeftKombatant'];
	var rightKombatant = this.components['RightKombatant'];
	
	if( leftKombatant )
	{
		if( leftKombatant.paddle.position.y > viewport.height * 0.51 ) {
			leftKombatant.paddle.moveUp( );
		} else if( leftKombatant.paddle.position.y < viewport.height * 0.49 ) {
			leftKombatant.paddle.moveDown( );
		} else {
			leftKombatant.paddle.position.y = viewport.height * 0.50;
		}
	
		if( leftKombatant.paddle.position.x > viewport.width * 0.03 ) {
			leftKombatant.paddle.moveLeft( );
		} else if( leftKombatant.paddle.position.x < viewport.width * 0.02 ) {
			leftKombatant.paddle.moveRight( );
		} else {
			leftKombatant.paddle.position.x = viewport.width * 0.025;
		}
	}
	
	if( rightKombatant )
	{
		if( rightKombatant.paddle.position.y > viewport.height * 0.51 ) {
			rightKombatant.paddle.moveUp( );
		} else if( rightKombatant.paddle.position.y < viewport.height * 0.49 ) {
			rightKombatant.paddle.moveDown( );
		} else {
			rightKombatant.paddle.position.y = viewport.height * 0.50;
		}

		if( rightKombatant.paddle.position.x > viewport.width * 0.98 ) {
			rightKombatant.paddle.moveLeft( );
		} else if( rightKombatant.paddle.position.x < viewport.width * 0.97 ) {
			rightKombatant.paddle.moveRight( );
		} else {
			rightKombatant.paddle.position.x = viewport.width * 0.975;
		}
	}
};

KombatLayer.prototype.setBall = function( ballType ) {
	switch( ballType ) {
		case Balls.RANDOM :
			var count = 0;
			for( var i in Balls) {
				if( Balls.hasOwnProperty(i) && i !== "RANDOM" ) {
					++count;
				}
			}
			return this.setBall( Math.ceil( Math.random( ) * count ) );
		break;
		case Balls.BASEBALL : ball = new Baseball( ); break;
		case Balls.BASKETBALL : ball = new Basketball( ); break;
		case Balls.BILLIARDS_BALL : ball = new BilliardsBall( ); break;
		case Balls.COIN : ball = new Coin( ); break;
		case Balls.CROQUET_BALL : ball = new CroquetBall( ); break;
		case Balls.DICE : ball = new Dice( ); break;
		case Balls.EMOTICON : ball = new Emoticon( ); break;
		case Balls.EYE_BALL : ball = new EyeBall( ); break;
		case Balls.FOIL_BALL : ball = new FoilBall( ); break;
		case Balls.FOOD : ball = new Food( ); break;
		case Balls.FOOTBALL : ball = new Football( ); break;
		case Balls.LOGO : ball = new Logo( ); break;
		case Balls.MARBLE : ball = new Marble( ); break;
		case Balls.PAC_MAN : ball = new PacMan( ); break;
		case Balls.POKEBALL : ball = new PokeBall( ); break;
		case Balls.PONG_BALL : ball = new PongBall( ); break;
		case Balls.SOCCER_BALL : ball = new SoccerBall( ); break;
		case Balls.SOLAR_SYSTEM : ball = new SolarSystem( ); break;
		case Balls.STORAGE_MEDIA : ball = new StorageMedia( ); break;
		case Balls.SUPER_MARIO : ball = new SuperMario( ); break;
		case Balls.TENNIS_BALL : ball = new TennisBall( ); break;
		
		case Balls.DEFAULT_BALL :
		default :
			ball = new DefaultBall( );
		break;
	}
	
	ball.set( );
	this.addComponent( 'Ball', ball );
};

KombatLayer.prototype.addKombatant = function( kombatant ) {
	if( this.components['LeftKombatant'] ) {
		kombatant.paddle.position.x = viewport.width * 0.98;
		this.addComponent( 'RightKombatant', kombatant );
		this.scene.layers['HUD'].components['RightName'].text = kombatant.paddle.name;
	} else {
		kombatant.paddle.position.x = viewport.width * 0.02;
		this.addComponent( 'LeftKombatant', kombatant );
		this.scene.layers['HUD'].components['LeftName'].text = kombatant.paddle.name;
	}
};

KombatLayer.prototype.addPowerup = function( ) {
	this.addComponent( 'Powerup', new SpeedPowerup( ) );
};

KombatLayer.prototype.update = function( deltaTime ) {
	var ball = this.components['Ball'];
	var leftKombatant = this.components['LeftKombatant'];
	var rightKombatant = this.components['RightKombatant'];
	var powerup = this.components['Powerup'];
	var hud = this.scene.layers['HUD'].components['HUD'];
	
	/*
	if( !powerup && this.scene.timeElapsed >= this.nextPowerup ) {
		this.addPowerup( );
	}
	*/
	
	switch( this.scene.state ) {
		case this.scene.states.starting :
			return;
		break;
		
		case this.scene.states.fighting :
			if( ball )
			{
				if( ( ball.velocity.y > 0 && ball.boundingBox.bottom > viewport.height ) || ( ball.velocity.y < 0 && ball.boundingBox.top < hud.size.y ) )
				{
					ball.hitWall( );
				}

				if( powerup )
				{
					if( Collision.RectRect( ball.boundingBox, powerup.boundingBox ) ) {
						ball.hitPowerup( );
					}
				}

				if( leftKombatant )
				{
					//if( ball.velocity.x < 0 && Collision.RectRect( ball.boundingBox, leftKombatant.paddle.boundingBox ) && ball.position.x > leftKombatant.paddle.position.x )
					if( ball.velocity.x < 0 &&
					    Collision.RectRect( ball.boundingBox, leftKombatant.paddle.boundingBox ) && 
					    Collision.CircleRect( ball.collisionAreas[0], leftKombatant.paddle.boundingBox ) && 
					    ball.position.x > leftKombatant.paddle.position.x
					)
					{
						ball.hitPaddle( leftKombatant );
					}

					if( ball.velocity.x > 0 && ball.boundingBox.left > viewport.width )
					{
						leftKombatant.score += 1;
						this.setBall( Balls.RANDOM );
					}
				}

				if( rightKombatant )
				{
					//if( ball.velocity.x > 0 && Collision.RectRect( ball.boundingBox, rightKombatant.paddle.boundingBox ) && ball.position.x < rightKombatant.paddle.position.x )
					if( ball.velocity.x > 0 &&
					    Collision.RectRect( ball.boundingBox, rightKombatant.paddle.boundingBox ) && 
					    Collision.CircleRect( ball.collisionAreas[0], rightKombatant.paddle.boundingBox ) && 
					    ball.position.x < rightKombatant.paddle.position.x
					)
					{
						ball.hitPaddle( rightKombatant );
					}

					if( ball.velocity.x < 0 && ball.boundingBox.right < 0 )
					{
						rightKombatant.score += 1;
						this.setBall( Balls.RANDOM );
					}
				}
			}

			if( leftKombatant && rightKombatant )
			{
				if( leftKombatant.paddle.projectile && Collision.RectRect( leftKombatant.paddle.projectile.boundingBox, rightKombatant.paddle.boundingBox ) ) {
					if( !app.settings.CENSORSHIP ) {
						// blood
						rightKombatant.paddle.getHit( );
					}
					leftKombatant.score += 1;
					leftKombatant.paddle.projectile = null;
				}
				
				if( rightKombatant.paddle.projectile && Collision.RectRect( rightKombatant.paddle.projectile.boundingBox, leftKombatant.paddle.boundingBox ) ) {
					if( !app.settings.CENSORSHIP ) {
						// blood
						leftKombatant.paddle.getHit( );
					}
					rightKombatant.score += 1;
					rightKombatant.paddle.projectile = null;
				}
			}
		break;
		
		case this.scene.states.finishing :
		break;
	}
	
	Layer.prototype.update.call( this, deltaTime );
};