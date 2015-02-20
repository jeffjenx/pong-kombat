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
		if( leftKombatant.paddle.position.y > viewport.height * 0.5 ) {
			if(leftKombatant.paddle.velocity.y > 0){
				leftKombatant.paddle.position.y = viewport.height * 0.5;
				leftKombatant.paddle.velocity.y = 0;
			} else {
				leftKombatant.paddle.moveUp( );
			}
		} else if( leftKombatant.paddle.position.y < viewport.height * 0.5 ) {
			if(leftKombatant.paddle.velocity.y < 0){
				leftKombatant.paddle.position.y = viewport.height * 0.5;
				leftKombatant.paddle.velocity.y = 0;
			} else {
				leftKombatant.paddle.moveDown( );
			}
		}
	
		if( leftKombatant.paddle.position.x > viewport.width * 0.03 ) {
			if(leftKombatant.paddle.velocity.x > 0) {
				leftKombatant.paddle.position.x = viewport.width * 0.03;
				leftKombatant.paddle.velocity.x = 0;
			} else {
				leftKombatant.paddle.moveLeft( );
			}
		} else if( leftKombatant.paddle.position.x < viewport.width * 0.03 ) {
			if(leftKombatant.paddle.velocity.x < 0){
				leftKombatant.paddle.position.x = viewport.width * 0.03;
				leftKombatant.paddle.velocity.x = 0;
			} else {
				leftKombatant.paddle.moveRight( );
			}
		}
	}
	
	if( rightKombatant )
	{
		if( rightKombatant.paddle.position.y > viewport.height * 0.5 ) {
			if(rightKombatant.paddle.velocity.y > 0){
				rightKombatant.paddle.position.y = viewport.height * 0.5;
				rightKombatant.paddle.velocity.y = 0;
			} else {
				rightKombatant.paddle.moveUp( );
			}
		} else if( rightKombatant.paddle.position.y < viewport.height * 0.5 ) {
			if(rightKombatant.paddle.velocity.y < 0){
				rightKombatant.paddle.position.y = viewport.height * 0.5;
				rightKombatant.paddle.velocity.y = 0;
			} else {
				rightKombatant.paddle.moveDown( );
			}
		}
	
		if( rightKombatant.paddle.position.x > viewport.width * 0.97 ) {
			if(rightKombatant.paddle.velocity.x > 0) {
				rightKombatant.paddle.position.x = viewport.width * 0.97;
				rightKombatant.paddle.velocity.x = 0;
			} else {
				rightKombatant.paddle.moveLeft( );
			}
		} else if( rightKombatant.paddle.position.x < viewport.width * 0.97 ) {
			if(rightKombatant.paddle.velocity.x < 0){
				rightKombatant.paddle.position.x = viewport.width * 0.97;
				rightKombatant.paddle.velocity.x = 0;
			} else {
				rightKombatant.paddle.moveRight( );
			}
		}
	}
};

KombatLayer.prototype.setBall = function( ballType, ballResource ) {
	var ball;

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
		case Balls.BASEBALL : ball = new Baseball( ballResource ); break;
		case Balls.BASKETBALL : ball = new Basketball( ballResource ); break;
		case Balls.BILLIARDS_BALL : ball = new BilliardsBall( ballResource ); break;
		case Balls.COIN : ball = new Coin( ballResource ); break;
		case Balls.CROQUET_BALL : ball = new CroquetBall( ballResource ); break;
		case Balls.DICE : ball = new Dice( ballResource ); break;
		case Balls.EMOTICON : ball = new Emoticon( ballResource ); break;
		case Balls.EYE_BALL : ball = new EyeBall( ballResource ); break;
		case Balls.FOIL_BALL : ball = new FoilBall( ballResource ); break;
		case Balls.FOOD : ball = new Food( ballResource ); break;
		case Balls.FOOTBALL : ball = new Football( ballResource ); break;
		case Balls.LOGO : ball = new Logo( ballResource ); break;
		case Balls.MARBLE : ball = new Marble( ballResource ); break;
		case Balls.PAC_MAN : ball = new PacMan( ballResource ); break;
		case Balls.POKEBALL : ball = new PokeBall( ballResource ); break;
		case Balls.PONG_BALL : ball = new PongBall( ballResource ); break;
		case Balls.RUPEE : ball = new Rupee( ballResource ); break;
		case Balls.SOCCER_BALL : ball = new SoccerBall( ballResource ); break;
		case Balls.SOLAR_SYSTEM : ball = new SolarSystem( ballResource ); break;
		case Balls.STORAGE_MEDIA : ball = new StorageMedia( ballResource ); break;
		case Balls.SUPER_MARIO : ball = new SuperMario( ballResource ); break;
		case Balls.TENNIS_BALL : ball = new TennisBall( ballResource ); break;
		
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
		this.scene.layers['HUD'].setRight( kombatant );
		this.components['RightKombatant'].zOrder = 0; // player paddle to appear "above" opponent
	} else {
		this.addComponent( 'LeftKombatant', kombatant );
		this.scene.layers['HUD'].setLeft( kombatant );
		this.components['LeftKombatant'].zOrder = 1;
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
	
	if( !app.settings.COMBAT && randomPowerup === Powerups.SHIELD ) {
		return this.addPowerup();
	};

	var powerup;
	switch( randomPowerup ) {
		case Powerups.GLUE : powerup = new GluePowerup( ); break;
		case Powerups.LIFE : powerup = new LifePowerup( ); break;
		case Powerups.SHIELD : powerup = new ShieldPowerup( ); break;
		case Powerups.SPEED : powerup = new SpeedPowerup( ); break;
		case Powerups.TIME : powerup = new TimePowerup( ); break;
		default : powerup = new SpeedPowerup( ); break;
	}
	powerup.timeoutTime = this.scene.timeElapsed + 8.8;
	this.addComponent( 'Powerup', powerup );
};

KombatLayer.prototype.update = function( deltaTime ) {
	var ball = this.components['Ball'];
	var leftKombatant = this.components['LeftKombatant'];
	var rightKombatant = this.components['RightKombatant'];
	var powerup = this.components['Powerup'];
	var hud = this.scene.layers['HUD'].components['HUD'];
	
	switch( this.scene.state ) {
		case this.scene.states.secretMessage :
		case this.scene.states.starting :
			if( leftKombatant ) {
				if( leftKombatant.paddle.projectiles.length > 0 ) {
					leftKombatant.paddle.projectiles = [ ];
				}
			}

			if( rightKombatant ) {
				if( rightKombatant.paddle.projectiles.length > 0 ) {
					rightKombatant.paddle.projectiles = [ ];
				}
			}

			if( powerup ) {
				powerup.timedOut( );
			}

			if( ball ) {
				ball.set();
			}
		break;
		
		case this.scene.states.fighting :
		case this.scene.states.training :
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
						rightKombatant.life -= 1 * rightKombatant.paddle.lifeModifier;
						this.removeComponent('Ball');
						this.setBall( Balls.RANDOM );
						/*
						if(app.gameMode === GameModes.P2P){
							app.p2p.emit('client:pointScored',{
								room:app.p2p.room
							});
						} else {
							this.setBall( Balls.RANDOM );
						}
						*/
					}

					if( leftKombatant.paddle.timePowerup && ball.velocity.x < 0 && ball.position.x < viewport.width / 2 && !ball.bulletTimed ) {
						ball.bulletTimed = true;
					}

					leftKombatant.paddle.restrictToBounds( );
				}

				if( rightKombatant )
				{
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
						leftKombatant.life -= 1 * leftKombatant.paddle.lifeModifier;
						this.removeComponent('Ball');
						
						this.setBall( Balls.RANDOM );
						/*
						if(app.gameMode === GameModes.P2P){
							app.p2p.emit('client:pointScored',{
								room:app.p2p.room
							});
						} else {
						}
						*/
					}

					if( rightKombatant.paddle.timePowerup && ball.velocity.x > 0 && ball.position.x > viewport.width / 2 && !ball.bulletTimed ) {
						ball.bulletTimed = true;
					}

					rightKombatant.paddle.restrictToBounds( );
				}
			}

			if( leftKombatant && powerup && Collision.RectRect( leftKombatant.paddle.boundingBox, powerup.boundingBox ) ) {
				powerup.collect( leftKombatant );
			}

			if( rightKombatant && powerup && Collision.RectRect( rightKombatant.paddle.boundingBox, powerup.boundingBox ) ) {
				powerup.collect( rightKombatant );
			}
		// no break; want to fall down into the code below

		case this.scene.states.finishing :
		case this.scene.states.dismantling :
			if( leftKombatant && rightKombatant )
			{
				if( leftKombatant.paddle.projectiles.length > 0 ) {
					for( var i = 0; i < leftKombatant.paddle.projectiles.length; i++ ) {
						var projectile = leftKombatant.paddle.projectiles[i];

						if(Collision.RectRect( projectile.boundingBox, rightKombatant.paddle.boundingBox ) ) {
							if( !rightKombatant.paddle.shieldPowerup )
							{
								if( !app.settings.CENSORSHIP ) {
									// blood
									rightKombatant.paddle.getHit( projectile );
								}
								rightKombatant.life -= 1 * projectile.lifeModifier * rightKombatant.paddle.lifeModifier;
							} else {
								rightKombatant.paddle.blockProjectile();
							}

							if( this.scene.state === this.scene.states.dismantling && (leftKombatant.paddle.enum === 'GREEN') ) {
								var speed = projectile.velocity.length();
								var direction = projectile.velocity.normalize();
								projectile.velocity = direction.multiply( speed * 0.8 );
							} else {
								leftKombatant.paddle.projectiles.splice( i, 1 );
								--i;
							}
						}
					}
				}

				if( rightKombatant.paddle.projectiles.length > 0 ) {
					for( var i = 0; i < rightKombatant.paddle.projectiles.length; i++ ) {
						var projectile = rightKombatant.paddle.projectiles[i];

						if(Collision.RectRect( projectile.boundingBox, leftKombatant.paddle.boundingBox ) ) {
							if( !leftKombatant.paddle.shieldPowerup )
							{
								if( !app.settings.CENSORSHIP ) {
									// blood
									leftKombatant.paddle.getHit( projectile );
								}
								leftKombatant.life -= 1 * projectile.lifeModifier * leftKombatant.paddle.lifeModifier;
							} else {
								leftKombatant.paddle.blockProjectile( );
							}


							if( this.scene.state === this.scene.states.dismantling && (rightKombatant.paddle.enum === 'GREEN') ) {
								var speed = projectile.velocity.length();
								var direction = projectile.velocity.normalize();
								projectile.velocity = direction.multiply( speed * 0.8 );
							} else {
								rightKombatant.paddle.projectiles.splice( i, 1 );
								--i;
							}
						}
					}
				}
			}
		break;

		case this.scene.states.announcing :
			if( powerup ) {
				powerup.timedOut( );
			}

			if( leftKombatant && leftKombatant.paddle.projectiles.length > 0 ) {
				leftKombatant.paddle.projectiles = [ ];
			}

			if( rightKombatant && rightKombatant.paddle.projectiles.length > 0 ) {
				rightKombatant.paddle.projectiles = [ ];
			}
			if( ball ) {
				ball.set();
			}
		break;
	}
	
	Layer.prototype.update.call( this, deltaTime );
};