function PickPaddleScene( )
{
	Scene.call( this );

	var paddleScale = 1.75;

	this.level = Levels.RANDOM;
	
	this.mainLayer = this.addLayer( 'MainLayer', new Layer( ) );
	this.mainLayer.addComponent( 'Background', new Background( 'Background-Title' ) );
	
	var titleText = new Text( Resources.Strings.PICK_YOUR_PADDLE );
	titleText.fontFamily = 'MK Mythologies';
	titleText.fontSize = viewport.height * 0.08;
	titleText.position.y = viewport.height * 0.11;
	this.mainLayer.addComponent( 'TitleText', titleText );
	
	for( var i = 0; i < 6; i++ )
	{
		var box = new Sprite( 'Black' );
		box.opacity = 0.5;
		box.size.x = viewport.width * 0.27;
		box.size.y = viewport.height * 0.33;
		box.position.x = viewport.width * 0.20 + viewport.width * 0.30 * (i % 3);
		box.position.y = viewport.height * 0.38 + viewport.height * 0.38 * (i<3 ? 0 : 1);
		this.mainLayer.addComponent( 'Box' + i, box );
	}
	
	this.paddles = new Array( );
	this.currentIndex = -1;
	
	var yellowPaddle = new YellowPaddle( );
	yellowPaddle.position.x = viewport.width * 0.20;
	yellowPaddle.position.y = viewport.height * 0.38;
	yellowPaddle.rotation = 33;
	yellowPaddle.scale = paddleScale;
	this.paddles.push( yellowPaddle );
	
	var randomPaddle = new Sprite( 'Particle-Random1' );
	randomPaddle.color = new Color(0, 255, 255);
	randomPaddle.enum = 'RANDOM';
	randomPaddle.position.x = viewport.width * 0.50;
	randomPaddle.position.y = viewport.height * 0.38;
	randomPaddle.size.x = viewport.width * 0.15;
	randomPaddle.size.y = randomPaddle.size.x;
	this.paddles.push( randomPaddle );
	
	var bluePaddle = new BluePaddle( );
	bluePaddle.position.x = viewport.width * 0.80;
	bluePaddle.position.y = viewport.height * 0.38;
	bluePaddle.rotation = -20;
	bluePaddle.scale = paddleScale;
	this.paddles.push( bluePaddle );
	
	var redPaddle = new RedPaddle( );
	redPaddle.position.x = viewport.width * 0.20;
	redPaddle.position.y = viewport.height * 0.76;
	redPaddle.rotation = -69;
	redPaddle.scale = paddleScale;
	this.paddles.push( redPaddle );
	
	var greenPaddle = new GreenPaddle( );
	greenPaddle.position.x = viewport.width * 0.50;
	greenPaddle.position.y = viewport.height * 0.76;
	greenPaddle.rotation = 10;
	greenPaddle.scale = paddleScale;
	this.paddles.push( greenPaddle );
	
	var purplePaddle = new PurplePaddle( );
	purplePaddle.position.x = viewport.width * 0.80;
	purplePaddle.position.y = viewport.height * 0.76;
	purplePaddle.rotation = 45;
	purplePaddle.scale = paddleScale;
	this.paddles.push( purplePaddle );
	
	this.selectNextPaddle( 'Right' );
	
	// Setup random paddle effect
	randomPaddle.effect = new ParticleSystem( );
	randomPaddle.effect.particleImages = [ Resources['Particle-Random2'], Resources['Particle-Random3'], Resources['Particle-Random4'], Resources['Particle-Random5'], Resources['Particle-Random6'] ];
	randomPaddle.effect.count = 20;
	randomPaddle.effect.minVelocity.x = -randomPaddle.size.x * 0.25;
	randomPaddle.effect.minVelocity.y = randomPaddle.size.y * 0.25;
	randomPaddle.effect.maxVelocity.x = randomPaddle.size.x * 0.25;
	randomPaddle.effect.maxVelocity.y = -randomPaddle.size.y * 0.25;
	randomPaddle.effect.minParticleSize = randomPaddle.size.x * 0.01;
	randomPaddle.effect.maxParticleSize = randomPaddle.size.x * 0.09;
	randomPaddle.effect.minLife = 50;
	randomPaddle.effect.maxLife = 300;
	randomPaddle.effect.maxOpacity = 0.3;
	randomPaddle.effect.rotationSpeed = 1;
	randomPaddle.effect.scaleSpeed = 3;
	
	randomPaddle.draw = function( context )
	{
		Sprite.prototype.draw.call( this, context );
		randomPaddle.effect.draw( context );
	};
	
	randomPaddle.update = function( deltaTime )
	{
		Paddle.prototype.update.call( this, deltaTime );
		
		this.effect.position = this.position;
		this.effect.rotation = this.rotation;
		this.effect.size.x = this.size.x * this.scale;
		this.effect.size.y = this.size.y * this.scale;
		this.effect.scale = this.scale;
		this.effect.update( deltaTime );
	};
	
	for( var j = 0; j < 100; j++ )
	{
		for( var i in this.paddles )
		{
			this.paddles[i].update( 1 / 60 );
		}
	}
}

PickPaddleScene.prototype = new Scene;
PickPaddleScene.prototype.constructor = PickPaddleScene;

PickPaddleScene.prototype.draw = function( context )
{
	// Override: Scene.prototype.draw.call( this, context );
	for( i in this.layers )
	{
		if( i !== 'Menu' )
		{
			this.layers[i].draw( context );
		}
	}
	
	for( i in this.components )
	{
		this.components[i].draw( context );
	}
	// End Override

	for( var i = 0; i < this.paddles.length; i++ )
	{
		context.save();
		context.beginPath();
		context.rect(
			viewport.width * 0.20 + viewport.width * 0.30 * (i % 3) - viewport.width * 0.135,
			viewport.height * 0.38 + viewport.height * 0.38 * (i<3 ? 0 : 1) - viewport.height * 0.165,
			viewport.width * 0.27,
			viewport.height * 0.33
		);
		if( this.currentIndex === i )
		{
			context.strokeStyle = this.paddles[i].color.RGB();
			context.lineWidth = viewport.width * 0.01;
			context.stroke();
		}
		context.clip();
		this.paddles[i].draw( context );
		context.restore();
	}

	if( this.layers['Menu'] )
	{
		this.layers['Menu'].draw( context );
	}
};

PickPaddleScene.prototype.selectNextPaddle = function( direction )
{
	switch( direction )
	{
		case 'Down' :this.currentIndex += 3; break;
		case 'Left' : this.currentIndex -= 1; break;
		case 'Right' : this.currentIndex += 1; break;
		case 'Up' : this.currentIndex -= 3; break;
	}
	
	if( this.currentIndex > this.paddles.length - 1 )
	{
		this.currentIndex -= this.paddles.length;
	}
	if( this.currentIndex < 0 )
	{
		this.currentIndex += this.paddles.length;
	}
};

PickPaddleScene.prototype.update = function( deltaTime )
{
	Scene.prototype.update.call( this, deltaTime );
	
	if( this.layers['Menu'] )
	{
		return;
	}

	if( this.paddles[this.currentIndex] )
	{
		var selectedPaddle = this.paddles[this.currentIndex];
		selectedPaddle.offset += 0.003;
		if( selectedPaddle.offset > 0.75 )
		{
			selectedPaddle.offset = -0.25;
		}
		selectedPaddle.update( deltaTime );
	}
	
	if( InputManager.checkButtonPress( Buttons.ACTION ) )
	{
		var player = new Player( );
		player.setPaddle( Paddles[this.paddles[this.currentIndex].enum] );
		
		if( app.gameMode === GameModes.TOURNAMENT )
		{
			if( app.tournament )
			{
				app.tournament.changePlayer( player );
				SceneManager.changeScene( app.tournament, Transitions.NONE );
			}
			else
			{
				app.tournament = new TournamentScene( );
				app.tournament.startPlayer( player );
				SceneManager.changeScene( app.tournament, Transitions.NONE );
			}
		}
		else
		{
			var computer = new Opponent( );
			computer.setPaddle( Paddles.RANDOM );
			
			var kombatScene = new KombatScene( );
			kombatScene.addKombatant( player );
			kombatScene.addKombatant( computer );
			kombatScene.setLevel( this.level );
			kombatScene.setBall( Balls.DEFAULT );
			SceneManager.changeScene( kombatScene, Transitions.NONE );
		}
	}

	// Secret Level Select Menu (any direction 11 times)
	if( InputManager.checkSequence([Buttons.UP,Buttons.UP,Buttons.UP,Buttons.UP,Buttons.UP,Buttons.UP,Buttons.UP,Buttons.UP,Buttons.UP,Buttons.UP,Buttons.UP])
	 || InputManager.checkSequence([Buttons.DOWN,Buttons.DOWN,Buttons.DOWN,Buttons.DOWN,Buttons.DOWN,Buttons.DOWN,Buttons.DOWN,Buttons.DOWN,Buttons.DOWN,Buttons.DOWN,Buttons.DOWN])
	 || InputManager.checkSequence([Buttons.RIGHT,Buttons.RIGHT,Buttons.RIGHT,Buttons.RIGHT,Buttons.RIGHT,Buttons.RIGHT,Buttons.RIGHT,Buttons.RIGHT,Buttons.RIGHT,Buttons.RIGHT,Buttons.RIGHT])
	 || InputManager.checkSequence([Buttons.LEFT,Buttons.LEFT,Buttons.LEFT,Buttons.LEFT,Buttons.LEFT,Buttons.LEFT,Buttons.LEFT,Buttons.LEFT,Buttons.LEFT,Buttons.LEFT,Buttons.LEFT])
	) {
		this.addLayer( 'Menu', new LevelMenu( this ) );	
	}

	/*
	// Secret Level Select Menu (Hold direction for # seconds)
	var now = Date.now( );
	var buttons = [ Buttons.DOWN, Buttons.UP, Buttons.LEFT, Buttons.RIGHT ];
	for( var i in buttons )
	{
		if( InputManager.isButtonDown( buttons[i] ) )
		{
			if( now - InputManager.currentState[ buttons[i] ] > 3 * 1000 )
			{
				this.addLayer( 'Menu', new LevelMenu( this ) );
			}
		}
	}
	*/
	
	if( InputManager.checkButtonPress( Buttons.DOWN ) )
	{
		this.selectNextPaddle( 'Down' );
	}
	if( InputManager.checkButtonPress( Buttons.UP ) )
	{
		this.selectNextPaddle( 'Up' );
	}
	if( InputManager.checkButtonPress( Buttons.LEFT ) )
	{
		this.selectNextPaddle( 'Left' );
	}
	if( InputManager.checkButtonPress( Buttons.RIGHT ) )
	{
		this.selectNextPaddle( 'Right' );
	}
};