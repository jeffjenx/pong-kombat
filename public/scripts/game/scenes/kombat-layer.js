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
		case Balls.RUPEE : ball = new Rupee( ); break;
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
	kombatant.life = this.scene.startLife;
	
	if( this.components['LeftKombatant'] ) {
		this.addComponent( 'RightKombatant', kombatant );
		this.scene.layers['HUD'].components['RightName'].text = kombatant.paddle.name;
	} else {
		this.addComponent( 'LeftKombatant', kombatant );
		this.scene.layers['HUD'].components['LeftName'].text = kombatant.paddle.name;
	}
};

KombatLayer.prototype.addPowerup = function( ) {
	var count = 0;
	for( var i in Powerups) {
		if( Powerups.hasOwnProperty(i) && i !== "RANDOM" ) {
			++count;
		}
	}
	var randomPowerup = Math.floor( Math.random( ) * count );
	//randomPowerup = Powerups.GLUE;
	var powerup;
	switch( randomPowerup ) {
		case Powerups.GLUE : powerup = new GluePowerup( ); break;
		case Powerups.LIFE : powerup = new LifePowerup( ); break;
		case Powerups.SHIELD : powerup = new ShieldPowerup( ); break;
		case Powerups.SPEED : powerup = new SpeedPowerup( ); break;
		case Powerups.TIME : powerup = new TimePowerup( ); break;
		default : powerup = new SpeedPowerup( ); break;
	}
	this.addComponent( 'Powerup', powerup );
};

KombatLayer.prototype.update = function( deltaTime ) {
	var ball = this.components['Ball'];
	var leftKombatant = this.components['LeftKombatant'];
	var rightKombatant = this.components['RightKombatant'];
	var powerup = this.components['Powerup'];
	var hud = this.scene.layers['HUD'].components['HUD'];
	
	switch( this.scene.state ) {
		case this.scene.states.starting :
			leftKombatant.update( deltaTime );
			rightKombatant.update( deltaTime );
			return;
		break;
		
		case this.scene.states.fighting :
			if( app.settings.POWER_UPS && !powerup && this.scene.timeElapsed >= this.nextPowerup ) {
				this.addPowerup( );
			}

			if( ball )
			{
				if( ball.scale > 1 ) {
					ball.scale = 1;
				}

				if( ( ball.velocity.y > 0 && ball.boundingBox.bottom > viewport.height ) || ( ball.velocity.y < 0 && ball.boundingBox.top < hud.size.y ) )
				{
					ball.hitWall( );
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
						rightKombatant.life -= 1;
						this.setBall( Balls.RANDOM );
					}

					if( leftKombatant.paddle.timePowerup && ball.velocity.x < 0 && ball.position.x < viewport.width / 2 && !ball.bulletTimed ) {
						ball.bulletTimed = true;
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
						leftKombatant.life -= 1;
						this.setBall( Balls.RANDOM );
					}

					if( rightKombatant.paddle.timePowerup && ball.velocity.x > 0 && ball.position.x > viewport.width / 2 && !ball.bulletTimed ) {
						ball.bulletTimed = true;
					}
				}
			}

			if( leftKombatant && rightKombatant )
			{
				if(leftKombatant.paddle.projectile && Collision.RectRect( leftKombatant.paddle.projectile.boundingBox, rightKombatant.paddle.boundingBox ) ) {
					if( !rightKombatant.paddle.shieldPowerup )
					{
						if( !app.settings.CENSORSHIP ) {
							// blood
							rightKombatant.paddle.getHit( );
						}
						rightKombatant.life -= 1;
					}
					leftKombatant.paddle.projectile = null;
				}
				
				if( rightKombatant.paddle.projectile && Collision.RectRect( rightKombatant.paddle.projectile.boundingBox, leftKombatant.paddle.boundingBox ) ) {
					if( !leftKombatant.paddle.shieldPowerup )
					{
						if( !app.settings.CENSORSHIP ) {
							// blood
							leftKombatant.paddle.getHit( );
						}
						leftKombatant.life -= 1;
					}
					rightKombatant.paddle.projectile = null;
				}
			}

			if( leftKombatant && powerup && Collision.RectRect( leftKombatant.paddle.boundingBox, powerup.boundingBox ) ) {
				powerup.collect( leftKombatant );
			}

			if( rightKombatant && powerup && Collision.RectRect( rightKombatant.paddle.boundingBox, powerup.boundingBox ) ) {
				powerup.collect( rightKombatant );
			}
		break;
		
		case this.scene.states.finishing :
			if( powerup ) {
				powerup.timedOut( );
			}
		break;
	}
	
	Layer.prototype.update.call( this, deltaTime );
};