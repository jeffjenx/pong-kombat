function StoryScene( ) {
	Scene.call( this );
	
	this.paddle;
	this.ending = false;

	var storyLayer = this.addLayer( 'Story', new Layer( ) );
	
	this.background = new Background( 'Background-Title' );
	storyLayer.addComponent( 'Background', this.background );

	this.box = new Sprite( 'Black' );
	this.box.opacity = 0;
	//this.box.opacity = 0.5;
	this.box.size.x = viewport.width;
	this.box.size.y = viewport.height * 0.55;
	this.box.registration.y = 0;
	this.box.position.x = viewport.width * 0.50;
	this.box.position.y = viewport.height * 0.07;
	storyLayer.addComponent( 'Box', this.box );
	
	this.storyText = new Text( '' );
	this.storyText.opacity = 0;
	this.storyText.color = "#FFE8B8";
	this.storyText.fontFamily = "Helvetica";
	this.storyText.fontSize = viewport.height * 0.045;
	this.storyText.fontStyle = "200";
	this.storyText.position.x = viewport.width * 0.5;
	this.storyText.position.y = viewport.height * 0.5;
	this.storyText.textAlign = "center";
	this.storyText.wordWrap = {
		lineHeight: 1.1,
		position:
		{
			x: viewport.width / 2,
			y: viewport.height - (viewport.height - this.box.size.y - this.box.position.y * 2)
		},
		size:
		{
			x: viewport.width - this.box.position.y * 2,
			y: viewport.height - this.box.size.y - this.box.position.y * 2
		}
	};
	
	storyLayer.addComponent( 'StoryText', this.storyText );

	this.paddleName = new Text( 'Player Name' );
	this.paddleName.opacity = 0;
	this.paddleName.color = 'white';
	this.paddleName.fontFamily = 'Anton';
	this.paddleName.fontSize = viewport.height * 0.25;
	this.paddleName.position.x = viewport.width / 2;
	this.paddleName.position.y = viewport.height * 0.06;
	this.paddleName.textAlign = 'center';
	this.paddleName.textBaseline = 'top';
	//this.paddleName.opacity = 0.11;
	storyLayer.addComponent( 'PlayerName', this.paddleName );
}

StoryScene.prototype = new Scene;
StoryScene.prototype.constructor = StoryScene;

StoryScene.prototype.draw = function( context ) {
	Scene.prototype.draw.call( this, context );

	context.save();
	context.beginPath();
	context.rect(
		0,
		this.box.position.y,
		this.box.size.x,
		this.box.size.y
	);
	context.clip();
	if( this.paddle ) {
		this.paddle.draw( context );
	}
	context.restore();
};

StoryScene.prototype.setPaddle = function( paddle ) {
	if( isNaN( paddle ) ) {
		this.paddle = paddle;
	} else {
		switch( paddle ) {
			case Paddles.RANDOM : this.setPaddle( Math.floor( 2 + Math.random( ) * 8 ) ); break; // 2 + RAND[1,5] refers to Paddles ENUM
			case Paddles.BLUE : this.paddle = new BluePaddle( ); break;
			case Paddles.YELLOW : this.paddle = new YellowPaddle( ); break;
			case Paddles.RED : this.paddle = new RedPaddle( ); break;
			case Paddles.GREEN : this.paddle = new GreenPaddle( ); break;
			case Paddles.PURPLE : this.paddle = new PurplePaddle( ); break;
			case Paddles.WHITE : this.paddle = new WhitePaddle( ); break;
			case Paddles.SHIFTER : this.paddle = new ShifterPaddle( ); break;
			case Paddles.MONOLITH : this.paddle = new MonolithPaddle( ); break;
			case Paddles.MRSLAYER : this.paddle = new MrSlayerPaddle( ); break;
			case Paddles.MYST : this.paddle = new MystPaddle( ); break;
		}
	}

	this.paddle.scale = 6;
	this.paddle.position.x = viewport.width * 0.5;
	this.paddle.position.y = viewport.height + this.paddle.size.y * this.paddle.scale / 2;
	//this.paddle.position.y = viewport.height * 0.11 + this.paddle.size.y * this.paddle.scale / 2;
	//this.paddle.velocity.x = viewport.width * 0.005;
	this.paddle.velocity.y = -viewport.height * 0.2;

	this.paddleName.text = this.paddle.name.toUpperCase( );
	this.paddleName.color = this.paddle.color.Hex( );
};

StoryScene.prototype.setStory = function( story ) {
	var storyText = this.layers['Story'].components['StoryText'];
	if( story === 'end' ) {
		storyText.text = this.paddle.endStory;
	} else if( story === 'start' ) {
		storyText.text = this.paddle.story;
	} else {
		storyText.text = story;
	}
};

StoryScene.prototype.updateIn = function( transitionPercent ) {
	this.box.opacity = transitionPercent * 0.5;
	this.storyText.opacity = transitionPercent;
	this.paddleName.opacity = transitionPercent * 0.11;
};

StoryScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );

	if( this.paddle ) {
		this.paddle.update( deltaTime );
		this.paddle.offset = (Math.sin( app.gameTime / 10000) * 0.5 + 0.5 ) * 0.5;

		if( this.paddle.position.y < viewport.height * 0.11 + this.paddle.size.y * this.paddle.scale / 2 )
		{
			this.paddle.velocity.y = 0;
			this.paddle.position.y = viewport.height * 0.11 + this.paddle.size.y * this.paddle.scale / 2;
		}
		else {
			this.paddle.velocity.y = Math.min( -viewport.height * 0.3 + this.timeElapsed * viewport.height * 0.051, 0 );
		}
	}
	
	if( InputManager.checkButtonPress( Buttons.ACTION ) )
	{
		if( this.ending ) {
			app.tournament = null;
			SceneManager.changeScene( new TitleScene( ), Transitions.FADE, 0.5 );
		} else {
			SceneManager.changeScene( new TitleScene( ), Transitions.FADE, 0.5 );
		}
	}
	
	if( !app.tournament && this.timeElapsed >= 15 ) {
		SceneManager.changeScene( new TitleScene( ), Transitions.FADE, 0.5 );
	}
};