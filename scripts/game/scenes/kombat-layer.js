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
			if( leftKombatant.paddle.velocity.y > 0 ) {
				leftKombatant.paddle.velocity.y = 0;
				leftKombatant.paddle.position.y = viewport.height * 0.5;
			} else {
				leftKombatant.paddle.moveUp( );
			}
		} else if( leftKombatant.paddle.position.y < viewport.height * 0.49 ) {
			if( leftKombatant.paddle.velocity.y < 0 ) {
				leftKombatant.paddle.velocity.y = 0;
				leftKombatant.paddle.position.y = viewport.height * 0.5;
			} else {
				leftKombatant.paddle.moveDown( );
			}
			//leftKombatant.paddle.moveDown( );
		} else {
			leftKombatant.paddle.position.y = viewport.height * 0.50;
		}
	
		if( leftKombatant.paddle.position.x > viewport.width * 0.03 ) {
			if( leftKombatant.paddle.velocity.x > 0 ) {
				leftKombatant.paddle.velocity.x = 0;
				leftKombatant.paddle.position.x = viewport.height * 0.025;
			} else {
				leftKombatant.paddle.moveLeft( );
			}
			//leftKombatant.paddle.moveLeft( );
		} else if( leftKombatant.paddle.position.x < viewport.width * 0.01 ) {
			if( leftKombatant.paddle.velocity.x < 0 ) {
				leftKombatant.paddle.velocity.x = 0;
				leftKombatant.paddle.position.x = viewport.height * 0.025;
			} else {
				leftKombatant.paddle.moveRight( );
			}
			//leftKombatant.paddle.moveRight( );
		} else {
			leftKombatant.paddle.position.x = viewport.width * 0.025;
		}
	}
	
	if( rightKombatant )
	{
		if( rightKombatant.paddle.position.y > viewport.height * 0.51 ) {
			if( rightKombatant.paddle.velocity.y > 0 ) {
				rightKombatant.paddle.velocity.y = 0;
				rightKombatant.paddle.position.y = viewport.height * 0.5;
			} else {
				rightKombatant.paddle.moveUp( );
			}
			//rightKombatant.paddle.moveUp( );
		} else if( rightKombatant.paddle.position.y < viewport.height * 0.49 ) {
			if( rightKombatant.paddle.velocity.y < 0 ) {
				rightKombatant.paddle.velocity.y = 0;
				rightKombatant.paddle.position.y = viewport.height * 0.5;
			} else {
				rightKombatant.paddle.moveDown( );
			}
			//rightKombatant.paddle.moveDown( );
		} else {
			rightKombatant.paddle.position.y = viewport.height * 0.50;
		}

		if( rightKombatant.paddle.position.x > viewport.width * 0.99 ) {
			if( rightKombatant.paddle.velocity.x > 0 ) {
				rightKombatant.paddle.velocity.x = 0;
				rightKombatant.paddle.position.x = viewport.height * 0.975;
			} else {
				rightKombatant.paddle.moveLeft( );
			}
			//rightKombatant.paddle.moveLeft( );
		} else if( rightKombatant.paddle.position.x < viewport.width * 0.97 ) {
			if( rightKombatant.paddle.velocity.x < 0 ) {
				rightKombatant.paddle.velocity.x = 0;
				rightKombatant.paddle.position.x = viewport.height * 0.975;
			} else {
				rightKombatant.paddle.moveRight( );
			}
			//rightKombatant.paddle.moveRight( );
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
		this.scene.layers['HUD'].setRight( kombatant );
		//this.scene.layers['HUD'].components['RightName'].text = kombatant.paddle.name;
	} else {
		this.addComponent( 'LeftKombatant', kombatant );
		this.scene.layers['HUD'].setLeft( kombatant );
		//this.scene.layers['HUD'].components['LeftName'].text = kombatant.paddle.name;
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
			this.centerPaddles();
			
			if( leftKombatant ) {
				leftKombatant.update( deltaTime );
				if( leftKombatant.paddle.projectiles.length > 0 ) {
					leftKombatant.paddle.projectiles = [ ];
				}
			}

			if( rightKombatant ) {
				rightKombatant.update( deltaTime );
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
						rightKombatant.life -= 1 * rightKombatant.paddle.lifeModifier;
						this.setBall( Balls.RANDOM );
					}

					if( leftKombatant.paddle.timePowerup && ball.velocity.x < 0 && ball.position.x < viewport.width / 2 && !ball.bulletTimed ) {
						ball.bulletTimed = true;
					}

					leftKombatant.paddle.restrictToBounds( );
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
						leftKombatant.life -= 1 * leftKombatant.paddle.lifeModifier;
						this.setBall( Balls.RANDOM );
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
								rightKombatant.life -= 1 * rightKombatant.paddle.lifeModifier;
							} else {
								rightKombatant.paddle.blockProjectile();
							}

							if( this.scene.state === this.scene.states.dismantling && (leftKombatant.paddle.enum === 'GREEN') ) {
								var speed = projectile.velocity.length();
								var direction = projectile.velocity.normalize();
								projectile.velocity = direction.multiply( speed * 0.8 );
								//projectile.velocity = projectile.velocity.multiply( 0.85 );
							} else {
								leftKombatant.paddle.projectiles.splice( i, 1 );
								--i;
							}
						}
					}
				}

				// if(leftKombatant.paddle.projectile && Collision.RectRect( leftKombatant.paddle.projectile.boundingBox, rightKombatant.paddle.boundingBox ) ) {
				// 	if( !rightKombatant.paddle.shieldPowerup )
				// 	{
				// 		if( !app.settings.CENSORSHIP ) {
				// 			// blood
				// 			rightKombatant.paddle.getHit( );
				// 		}
				// 		rightKombatant.life -= 1 * rightKombatant.paddle.lifeModifier;
				// 	}
				// 	leftKombatant.paddle.projectile = null;
				// }

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
								leftKombatant.life -= 1 * leftKombatant.paddle.lifeModifier;
							} else {
								leftKombatant.paddle.blockProjectile( );
							}
							rightKombatant.paddle.projectiles.splice( i, 1 );
							--i;
						}
					}
				}
				
				// if( rightKombatant.paddle.projectile && Collision.RectRect( rightKombatant.paddle.projectile.boundingBox, leftKombatant.paddle.boundingBox ) ) {
				// 	if( !leftKombatant.paddle.shieldPowerup )
				// 	{
				// 		if( !app.settings.CENSORSHIP ) {
				// 			// blood
				// 			leftKombatant.paddle.getHit( );
				// 		}
				// 		leftKombatant.life -= 1 * leftKombatant.paddle.lifeModifier;
				// 	}
				// 	rightKombatant.paddle.projectile = null;
				// }
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