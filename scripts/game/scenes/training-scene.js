function TrainingScene( ) {
	Scene.call( this );
	
	this.addLayer( 'Background', new DefaultBackgroundLayer( this ) );
	this.addLayer( 'Kombat', new KombatLayer( this ) );
	this.addLayer( 'Foreground', new DefaultForegroundLayer( this ) );
	this.addLayer( 'HUD', new HUDLayer( this ) );

	this.states = {
		// kombatScene states (so HUD layer doesn't get mixed up)
		announcing : 0,
		secretMessage : 1,
		starting : 2,
		fighting : 3,
		finishing : 4,
		dismantling : 5,
		ending : 6,
		paused : 7,

		centering : 8,
		training : 9,
		talking : 10
	};

	this.state = this.states.centering;
	this.stateTime = 0;

	if( app.settings.SOUND_FX > 0 ) {
		this.dismantleSound = new Sound( 'Dun-Dun-Dun' );
		this.dismantleSound.setMaxVolume( 0.5 * app.settings.SOUND_FX / 11 );
	}

	if( app.settings.TUNES > 0 ) {
		this.music = new Sound( 'Music-Retro-Crime-Movie' );
		this.music.setMaxVolume( 0.11 * app.settings.TUNES / 11 );
		this.music.loop( );
	}

	this.messages = [
		'Hello, World.',
		'I am Pong-bot 9000, the training simulator.',
		'My creators, Thomas and Albert, designed me to teach\nothers the ancient combat style, Pon-Git-Su.',
		'Press SPACE to continue, or ESC to end this session.',

		'In Pong Kombat, a ball is volleyed between you and your opponent.',
		'Return the volley by moving your paddle with \u25B2 or \u25BC.',

		'Good.',
		'Now, try to hit the ball closer to the Center Line,\nusing \u25C0 or \u25B6 while I return the volley.',

		'Excellent.',
		'If you fail to return a volley, your paddle will take damage.\nWhichever paddle inflicts the most damage wins the match.',
		'Paddles also possess the ability to attack each other\nby shooting projectiles while the ball is volleyed.',
		'Try figuring out your paddle\'s projectile sequence.\nUse a sequence of \u25B2, \u25BC, \u25C0, or \u25B6 (3\u00D7), then SPACE.',

		'Well done.',
		'The winner of each match is given the opportunity \nto finish off their opponent by Dismantling them.',
		'Try figuring out your paddle\'s dismantle sequence.\nUse another sequence of \u25B2, \u25BC, \u25C0, or \u25B6 (3\u00D7), then SPACE.',

		'That could\'ve hurt.',
		'Congratulations! You\'ve become a Master Paddle.',
		'Now, put your experience to the test by competing in a Tournament.'
	];

	this.currentMessage = -1;
	var messageText = new Text( '' );
	messageText.position.y = viewport.height * 0.85;
	messageText.color = 'white';
	messageText.fontFamily = 'Open Sans';
	messageText.fontSize = viewport.height * 0.04;
	messageText.opacity = 1;
	messageText.textShadow = {
		color : 'black',
		blur : 1,
		x : 1,
		y : 1
	};
	this.layers['HUD'].addComponent('Message', messageText );

	var sequenceText = new Text( '' );
	sequenceText.position.y = viewport.height * 0.2;
	sequenceText.color = 'white';
	sequenceText.fontFamily = 'Open Sans';
	sequenceText.fontSize = viewport.height * 0.08;
	sequenceText.textShadow = messageText.textShadow;
	this.layers['HUD'].addComponent('Sequence', sequenceText);

	this.layers['Kombat'].nextPowerup = this.timeElapsed + 100000;

	this.robotSound = new Sound( 'Robot-Sound' );
	if( app.settings.SOUND_FX ) {
		this.robotSound.setMaxVolume( 0.5 * app.settings.SOUND_FX / 11 );
	}
}

TrainingScene.prototype = new Scene;
TrainingScene.prototype.constructor = TrainingScene;

TrainingScene.prototype.updateOut = function( transitionPercent ) {
	if( app.settings.TUNES > 0 ) {
		this.music.setVolume( 1 - transitionPercent );
	}

	for( var i in this.layers) {
		if( this.layers[i].updateOut ) {
			this.layers[i].updateOut( transitionPercent );
		}
	}
};

TrainingScene.prototype.updateIn = function( transitionPercent ) {
	if( app.settings.TUNES > 0 ) {
		this.music.setVolume( transitionPercent );
	}


	for( var i in this.layers) {
		if( this.layers[i].updateIn ) {
			this.layers[i].updateOut( transitionPercent );
		}
	}
};

TrainingScene.prototype.unload = function( ) {
	if( app.settings.TUNES > 0 ) {
		this.music.stop( );
	}

	for( var i in this.layers) {
		if( this.layers[i].unload ) {
			this.layers[i].unload( );
		}
	}
};

TrainingScene.prototype.addKombatant = function( kombatant ) {
	this.layers['Kombat'].addKombatant( kombatant );

	var paddleBot = new Computer( );
	paddleBot.setPaddle( Paddles.PADDLEBOT );
	paddleBot.paddle.rotation = 0;

	this.layers['Kombat'].addKombatant( paddleBot );
};

TrainingScene.prototype.changeState = function( state ) {
	this.state = state;
	this.stateTime = 0;

	var player = this.layers['Kombat'].components['LeftKombatant'];
	var paddleBot = this.layers['Kombat'].components['RightKombatant'];
	var ball = this.layers['Kombat'].components['Ball'];

	if( ball ) {
		ball.lastPaddle = null;
	}

	switch( this.state ) {
		case this.states.centering :
		break;

		case this.states.talking :
			paddleBot.paddle.currentFrame = 0;
			paddleBot.paddle.currentStep = 0;
			paddleBot.paddle.currentAnimation = 'rotate-out';
			
			if( player ) {
				player.paddle.velocity.x = 0;
				player.paddle.velocity.y = 0;
			}
			if( paddleBot ) {
				paddleBot.paddle.velocity.x = 0;
				paddleBot.paddle.velocity.y = 0;
			}

			if( app.settings.SOUND_FX > 0 ){
				this.robotSound.play( );
			}
		break;

		case this.states.training :
			paddleBot.paddle.currentFrame = 0;
			paddleBot.paddle.currentStep = 0;
			paddleBot.paddle.currentAnimation = 'rotate-in';

			if( app.settings.SOUND_FX > 0 ){
				this.robotSound.stop( );
			}
		break;
	}
};

TrainingScene.prototype.updateTraining = function(deltaTime) {
	var player = this.layers['Kombat'].components['LeftKombatant'];
	var paddleBot = this.layers['Kombat'].components['RightKombatant'];
	var ball = this.layers['Kombat'].components['Ball'];
	
	switch( this.currentMessage ) {
		case 5 :
			// Lesson 1: Returning a volley
			if( InputManager.isButtonDown( Buttons.UP ) )
			{
				player.paddle.moveUp( );
			}
			else if( InputManager.isButtonDown( Buttons.DOWN ) )
			{
				player.paddle.moveDown( );
			}

			if( ball.velocity.x > 0 ) {
				ball.opacity -= deltaTime;
				if( ball.opacity < 0 ) {
					ball.scale = 0;
					ball.opacity = 0;
					ball.enabled = false;

					this.currentMessage++;
					this.changeState( this.states.talking );
				}
			}
		break;

		case 7 :
			// Lesson 2: Moving horizontally
			if( InputManager.isButtonDown( Buttons.UP ) )
			{
				player.paddle.moveUp( );
			}
			else if( InputManager.isButtonDown( Buttons.DOWN ) )
			{
				player.paddle.moveDown( );
			}

			if( InputManager.isButtonDown( Buttons.LEFT ) )
			{
				player.paddle.moveLeft( );
			}
			else if( InputManager.isButtonDown( Buttons.RIGHT ) )
			{
				player.paddle.moveRight( );
			}

			paddleBot.applyAI(0);

			if( ball.lastPaddle === player && ball.velocity.x > 0 ) {
				if( player.paddle.position.x < viewport.width * 0.25 ) {
					this.messages[this.currentMessage] = 'Try to move closer.';
					ball.lastPaddle = null;
				} else {
					ball.opacity -= deltaTime;
					if( ball.opacity < 0 ) {
						ball.scale = 0;
						ball.opacity = 0;
						ball.enabled = false;

						this.currentMessage++;
						this.changeState( this.states.talking );
					}
				}
			}
		break;

		case 11 :
			// Lesson 3: Shooting Projectiles
			if( player.paddle.projectiles.length === 0 )
			{
				var subSequence;
				var sequenceText = '';
				for(var i=0; i<player.paddle.projectileSequence.length; i++) {
					subSequence = player.paddle.projectileSequence.slice(0,i+1);
					if( InputManager.checkSequence(subSequence) ) {
						sequenceText = '';
						for(var j=0; j<subSequence.length; j++) {
							switch( subSequence[j] ) {
								case Buttons.UP : sequenceText += '\u25B2'; break;
								case Buttons.DOWN : sequenceText += '\u25BC'; break;
								case Buttons.LEFT : sequenceText += '\u25C0'; break;
								case Buttons.RIGHT : sequenceText += '\u25B6'; break;
								case Buttons.ACTION : sequenceText += ' SPACE'; break;
							}
						}
					}
				}

				this.layers['HUD'].components['Sequence'].text = sequenceText;
			
				if( InputManager.checkSequence( player.paddle.projectileSequence ) )
				{
					player.paddle.shootProjectile( );
				}
			}
			else if( player.paddle.projectiles.length && Collision.RectRect( player.paddle.projectiles[0].boundingBox, paddleBot.paddle.boundingBox ) )
			{
				if( app.settings.SOUND_FX > 0 ) {
					var absorbSound = new Sound( 'Shield-Absorb' );
					absorbSound.setMaxVolume(1 * app.settings.SOUND_FX / 11);
					absorbSound.play();
				}
				player.paddle.projectiles = [];
				paddleBot.paddle.shield = null;
				paddleBot.paddle.shieldPowerup = false;
				this.currentMessage++;
				this.changeState( this.states.talking );
			}
		break;

		case 14 :
			// Lesson 4: Dismantling Opponents
			var subSequence;
			var sequenceText = '';
			for(var i=0; i<player.paddle.dismantleSequence.length; i++) {
				subSequence = player.paddle.dismantleSequence.slice(0,i+1);
				if( InputManager.checkSequence(subSequence) ) {
					sequenceText = '';
					for(var j=0; j<subSequence.length; j++) {
						switch( subSequence[j] ) {
							case Buttons.UP : sequenceText += '\u25B2'; break;
							case Buttons.DOWN : sequenceText += '\u25BC'; break;
							case Buttons.LEFT : sequenceText += '\u25C0'; break;
							case Buttons.RIGHT : sequenceText += '\u25B6'; break;
							case Buttons.ACTION : sequenceText += ' SPACE'; break;
						}
					}
				}
			}

			this.layers['HUD'].components['Sequence'].text = sequenceText;
			
			if( InputManager.checkSequence( player.paddle.dismantleSequence ) )
			{
				this.changeState( this.states.dismantling );
			}
		break;
	}
};

TrainingScene.prototype.updateTalking = function(deltaTime) {
	var player = this.layers['Kombat'].components['LeftKombatant'];
	var paddleBot = this.layers['Kombat'].components['RightKombatant'];
	var ball = this.layers['Kombat'].components['Ball'];
	
	this.layers['Kombat'].centerPaddles( );

	if( paddleBot.paddle.currentAnimation !== 'talking' && paddleBot.paddle.currentFrame >= paddleBot.paddle.animations[paddleBot.paddle.currentAnimation].frames.length - 1 ) {
		paddleBot.paddle.currentFrame = 0;
		paddleBot.paddle.currentStep = 0;
		paddleBot.paddle.currentAnimation = 'talking';
	}
	
	if( InputManager.checkButtonPress( [ Buttons.ACTION, Buttons.START ] ) || (this.stateTime > 10 && this.currentMessage !== 3) ) {
		InputManager.clear();
		switch( this.currentMessage ) {
			case 5 :
				var ball = new DefaultBall();
				this.layers['Kombat'].addComponent( 'Ball', ball );
				ball.set('left');
				ball.enabled = true;
				ball.opacity = 1;
				this.changeState( this.states.training );
			break;

			case 7 :
				ball.set('right');
				ball.enabled = true;
				ball.opacity = 1;
				this.changeState( this.states.training );
			break;

			case 11 :
				paddleBot.paddle.shield = new Sprite( 'Particle-Bubble' );
				paddleBot.paddle.shield.opacity = 0.5;
				paddleBot.paddle.shield.scale = 0;
				paddleBot.paddle.shieldPowerup = app.gameTime + 1000 * 1000;

				this.changeState( this.states.training );
			break;

			case 12 :
				if(player.paddle.dismantleSequence) {
					this.currentMessage += 1;
				}
				else
				{
					this.currentMessage += 4;
				}
				
				this.stateTime = 0;
			break;

			case 14 :
				this.layers['HUD'].components['Sequence'].text = '';
				this.changeState( this.states.training );
			break;

			case 17 :
				this.previousState = this.state;
				this.changeState( this.states.paused );
			break;

			case 16 :
				this.layers['HUD'].components['Sequence'].text = '';
			// no break;

			default :
				this.currentMessage++;
				this.stateTime = 0;
			break;
		}
	}

	if( this.currentMessage === 3 && this.stateTime > 3 ) {
		paddleBot.paddle.currentFrame = 0;
		paddleBot.paddle.currentStep = 0;
		paddleBot.paddle.currentAnimation = 'default';
	}
};

TrainingScene.prototype.update = function(deltaTime) {
	if( this.state === this.states.paused ) {
		if( !this.layers['Menu'] ) {
			this.addLayer( 'Menu', new TrainingMenu( this ) );
		}

		if( app.settings.SOUND_FX ) {
			this.robotSound.stop();
		}
		
		this.layers['Menu'].update( deltaTime );
		return;
	}

	Scene.prototype.update.call( this, deltaTime );
	this.stateTime += deltaTime;
	
	if( InputManager.checkButtonPress( Buttons.BACK ) || (this.state === this.states.training && InputManager.checkButtonPress(Buttons.START) ) ) {
		InputManager.clear();
		this.previousState = this.state;
		this.changeState( this.states.paused );
	}

	var message = this.layers['HUD'].components['Message'];
	if( this.currentMessage >= 0 && message && message.text !== this.messages[this.currentMessage] ) {
		message.text = this.messages[this.currentMessage];
	}

	switch( this.state ) {
		case this.states.centering :
			if( this.stateTime >= 2.5 ) {
				this.currentMessage++;
				this.changeState( this.states.talking );
			} else {
				this.layers['Kombat'].centerPaddles( );
			}
		break;

		case this.states.talking :
			this.updateTalking( deltaTime );

			if(this.layers['HUD'].components['LetterBoxTop']) {
				this.layers['HUD'].components['LetterBox'].opacity -= deltaTime * 0.33;
				this.layers['HUD'].components['LetterBoxTop'].opacity -= deltaTime * 0.33;

				if(this.layers['HUD'].components['LetterBoxTop'].opacity <= 0) {
					this.layers['HUD'].removeComponent('LetterBoxTop');
					this.layers['HUD'].removeComponent('LetterBox');
				}
			}
		break;

		case this.states.training :
			this.updateTraining( deltaTime );
		break;

		case this.states.dismantling :
			this.layers['Kombat'].components['LeftKombatant'].paddle.dismantle( this.layers['Kombat'].components['RightKombatant'] );

			if(this.layers['HUD'].components['LetterBoxTop'].position.y >= 0) {
				this.layers['Kombat'].components['LeftKombatant'].paddle.projectiles = [];
				this.currentMessage++;
				this.changeState( this.states.talking );
			}
		break;
	}
};