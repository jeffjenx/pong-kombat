function PickPaddleScene( )
{
	Scene.call( this );

	var paddleScale = 1.75;

	this.level = Levels.RANDOM;
	
	this.backgroundLayer = this.addLayer( 'BackgroundLayer', new Layer( ) );
	this.backgroundLayer.addComponent( 'Background', new Background( 'Background-Title' ) );

	this.primaryLayer = new Layer( );
	this.secondaryLayer = new Layer( );
	this.currentPage = this.primaryLayer;
	
	var titleText = new Text( Resources.Strings.PICK_YOUR_PADDLE );
	titleText.fontFamily = 'MK Mythologies';
	titleText.fontSize = viewport.height * 0.08;
	titleText.position.y = viewport.height * 0.11;
	this.backgroundLayer.addComponent( 'TitleText', titleText );
	
	for( var i = 0; i < 6; i++ )
	{
		var box = new Sprite( 'Black' );
		box.opacity = 0.5;
		box.size.x = viewport.width * 0.27;
		box.size.y = viewport.height * 0.33;
		box.position.x = viewport.width * 0.20 + viewport.width * 0.30 * (i % 3);
		box.position.y = viewport.height * 0.38 + viewport.height * 0.38 * (i<3 ? 0 : 1);
		this.backgroundLayer.addComponent( 'Box' + i, box );
	}
	
	this.primaryPaddles = new Array( );
	this.secondaryPaddles = new Array( );
	this.currentIndex = -1;
	
	var yellowPaddle = new YellowPaddle( );
	yellowPaddle.position.x = viewport.width * 0.20;
	yellowPaddle.position.y = viewport.height * 0.38;
	yellowPaddle.rotation = 33;
	yellowPaddle.scale = paddleScale;
	this.primaryPaddles.push( yellowPaddle );
	
	var randomPaddle = new Sprite( 'Particle-Random1' );
	randomPaddle.color = new Color(0, 255, 255);
	randomPaddle.enum = 'RANDOM';
	randomPaddle.position.x = viewport.width * 0.50;
	randomPaddle.position.y = viewport.height * 0.38;
	randomPaddle.size.x = viewport.width * 0.15;
	randomPaddle.size.y = randomPaddle.size.x;
	this.primaryPaddles.push( randomPaddle );
	
	var bluePaddle = new BluePaddle( );
	bluePaddle.position.x = viewport.width * 0.80;
	bluePaddle.position.y = viewport.height * 0.38;
	bluePaddle.rotation = -20;
	bluePaddle.scale = paddleScale;
	this.primaryPaddles.push( bluePaddle );
	
	var redPaddle = new RedPaddle( );
	redPaddle.position.x = viewport.width * 0.20;
	redPaddle.position.y = viewport.height * 0.76;
	redPaddle.rotation = -69;
	redPaddle.scale = paddleScale;
	this.primaryPaddles.push( redPaddle );
	
	var greenPaddle = new GreenPaddle( );
	greenPaddle.position.x = viewport.width * 0.50;
	greenPaddle.position.y = viewport.height * 0.76;
	greenPaddle.rotation = 10;
	greenPaddle.scale = paddleScale;
	this.primaryPaddles.push( greenPaddle );
	
	var purplePaddle = new PurplePaddle( );
	purplePaddle.position.x = viewport.width * 0.80;
	purplePaddle.position.y = viewport.height * 0.76;
	purplePaddle.rotation = 45;
	purplePaddle.scale = paddleScale;
	this.primaryPaddles.push( purplePaddle );

	var myst = new MystPaddle( );
	myst.position.x = viewport.width * 0.20;
	myst.position.y = viewport.height * 0.38;
	myst.rotation = -33;
	myst.scale = paddleScale;
	this.secondaryPaddles.push( myst );

	var customPaddle = new Sprite( 'Particle-Random1' );
	customPaddle.color = new Color(0, 255, 255);
	customPaddle.enum = 'RANDOM';
	customPaddle.position.x = viewport.width * 0.50;
	customPaddle.position.y = viewport.height * 0.38;
	customPaddle.size.x = viewport.width * 0.15;
	customPaddle.size.y = customPaddle.size.x;
	this.secondaryPaddles.push( customPaddle );

	var mrSlayer = new MrSlayerPaddle( );
	mrSlayer.position.x = viewport.width * 0.80;
	mrSlayer.position.y = viewport.height * 0.38;
	mrSlayer.rotation = 20;
	mrSlayer.scale = paddleScale;
	this.secondaryPaddles.push( mrSlayer );

	var shifter = new ShifterPaddle( );
	shifter.position.x = viewport.width * 0.20;
	shifter.position.y = viewport.height * 0.76;
	shifter.rotation = -80;
	shifter.scale = paddleScale;
	this.secondaryPaddles.push( shifter );

	var monolith = new MonolithPaddle( );
	monolith.position.x = viewport.width * 0.50;
	monolith.position.y = viewport.height * 0.76;
	monolith.rotation = 55;
	monolith.scale = paddleScale * 0.75;
	this.secondaryPaddles.push( monolith );

	var whitePaddle = new WhitePaddle( );
	whitePaddle.position.x = viewport.width * 0.80;
	whitePaddle.position.y = viewport.height * 0.76;
	whitePaddle.rotation = 0;
	whitePaddle.scale = paddleScale * 0.70;
	this.secondaryPaddles.push( whitePaddle );
	
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
	randomPaddle.effect.attachTo( randomPaddle );
	
	randomPaddle.draw = function( context )
	{
		this.effect.draw( context );
		Sprite.prototype.draw.call( this, context );
	};
	
	randomPaddle.update = function( deltaTime )
	{
		Sprite.prototype.update.call( this, deltaTime );
		this.effect.update( deltaTime );
	};
	
	for( var j = 0; j < 100; j++ )
	{
		for( var i in this.primaryPaddles )
		{
			this.primaryPaddles[i].update( 1 / 60 );
		}

		for( var i in this.secondaryPaddles )
		{
			this.secondaryPaddles[i].update( 1 / 60 );
		}
	}

	if( app.settings.SOUND_FX > 0 ) {
		this.clickSound = new Sound( 'Click' );
		this.confirmSound = new Sound( 'Confirm' );
		this.denySound = new Sound( 'Deny' );
	}

	if( app.settings.TUNES > 0 ) {
		this.music = new Sound( 'Music-Pick-Paddle' );
		this.music.setMaxVolume( 0.33 );
		this.music.loop( );
	}
	
	// must be after sounds
	this.selectNextPaddle( 'Right' );
}

PickPaddleScene.prototype = new Scene;
PickPaddleScene.prototype.constructor = PickPaddleScene;

PickPaddleScene.prototype.updateOut = function( transitionPercent ) {
	if( app.settings.TUNES > 0 ) {
		this.music.setVolume( 1 - transitionPercent );
	}
};

PickPaddleScene.prototype.updateIn = function( transitionPercent ) {
	if( app.settings.TUNES > 0 ) {
		this.music.setVolume( transitionPercent );
	}

	if( app.settings.SOUND_FX > 0 && !this.gonged ) {
		this.gonged = true;

		var gong = new Sound( 'Music-Gong' );
		gong.setMaxVolume( 0.25 );
		gong.play( );
	}
};

PickPaddleScene.prototype.unload = function( ) {
	if( app.settings.TUNES > 0 ) {
		this.music.stop( );
	}
};

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

	var paddles = ( this.currentPage === this.secondaryLayer ) ? this.secondaryPaddles : this.primaryPaddles;

	for( var i = 0; i < paddles.length; i++ )
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
			context.strokeStyle = paddles[i].color.RGB();
			context.lineWidth = viewport.width * 0.01;
			context.stroke();
		}
		context.clip();
		paddles[i].draw( context );
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
	
	if( this.currentIndex > 5 )
	{
		this.currentIndex -= 6;
	}
	if( this.currentIndex < 0 )
	{
		this.currentIndex += 6;
	}

	if( app.settings.SOUND_FX > 0 ) {
		this.clickSound.play();
	}
};

PickPaddleScene.prototype.update = function( deltaTime )
{
	Scene.prototype.update.call( this, deltaTime );
	
	if( this.layers['Menu'] )
	{
		return;
	}

	var paddles = ( this.currentPage === this.secondaryLayer ) ? this.secondaryPaddles : this.primaryPaddles;

	if( paddles[this.currentIndex] )
	{
		var selectedPaddle = paddles[this.currentIndex];
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
		player.setPaddle( Paddles[paddles[this.currentIndex].enum] );
		
		if( app.settings.SOUND_FX > 0 ) {
			this.confirmSound.play();
		}
		
		if( app.gameMode === GameModes.TOURNAMENT )
		{
			if( app.tournament )
			{
				app.tournament.changePlayer( player );
				app.tournament.timeElapsed = 0;
				SceneManager.changeScene( app.tournament, Transitions.FADE, 0.5 );
			}
			else
			{
				app.tournament = new TournamentScene( );
				app.tournament.startPlayer( player );
				if( app.godMode === 'Th3r3|15-n0~Kn0wl3d93/7h4t=15+n0t:P0w3r' ) {
					for( var i = 0; i < app.tournament.opponents.length - 1; i++ ) {
						app.tournament.increaseRank( );
					}
				}
				SceneManager.changeScene( app.tournament, Transitions.FADE, 0.5 );
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
			//kombatScene.setBall( Balls.DEFAULT );
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

	// Secret Level Select Menu (Hold direction for # seconds)
	var now = Date.now( );
	var buttons = [ Buttons.DOWN, Buttons.UP, Buttons.LEFT, Buttons.RIGHT ];
	for( var i in buttons )
	{
		if( InputManager.isButtonDown( buttons[i] ) )
		{
			if( now - InputManager.currentState[ buttons[i] ] > 3 * 1000 )
			{
				this.currentPage = ( this.currentPage === this.primaryLayer ) ? this.secondaryLayer : this.primaryLayer;
				InputManager.currentState[ buttons[i] ]  = now;
			}
		}
	}
	
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


	if( InputManager.checkButtonPress( Buttons.BACK ) )
	{
		if( app.settings.SOUND_FX > 0 ) {
			this.denySound.stop();
			this.denySound.play();
		}

		var titleScene = new TitleScene( );
		SceneManager.changeScene( titleScene, Transitions.FADE, 0.33 );
	}
};