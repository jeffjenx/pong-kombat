function TitleScene( ) {
	Scene.call( this );
	
	var titleLayer = this.addLayer( 'Title', new Layer( ) );
	
	this.background = new Background( 'Background-Title' );
	titleLayer.addComponent( 'Background', this.background );
	
	this.ball = new DefaultBall( );
	this.ball.scale = 2;
	this.ball.opacity = 0;
	this.ball.startPosition = {x: viewport.width * 0.65, y: viewport.height * 0.30};
	this.ball.endPosition = {x: viewport.width * 0.45, y: viewport.height * 0.55};
	this.ball.position.x = this.ball.startPosition.x;
	this.ball.position.y = this.ball.startPosition.y;
	this.ball.targetRotation = 135;
	this.ball.addGlare( );
	titleLayer.addComponent( 'Ball', this.ball );
	
	this.blue = new BluePaddle( );
	this.blue.scale = 4;
	this.blue.startPosition = {x: viewport.width * 1.50, y: viewport.height * 0.70};
	this.blue.endPosition = {x: viewport.width * 0.80, y: viewport.height * 0.20};
	this.blue.position.x = this.blue.startPosition.x;
	this.blue.position.y = this.blue.startPosition.y;
	this.blue.rotation = -60;
	titleLayer.addComponent( 'Blue', this.blue );
	
	this.yellow = new YellowPaddle( );
	this.yellow.scale = 4;
	this.yellow.startPosition = {x: viewport.width * -0.30, y:viewport.height * 0.40};
	this.yellow.endPosition = {x: viewport.width * 0.20, y:viewport.height * 0.75};
	this.yellow.position.x = this.yellow.startPosition.x;
	this.yellow.position.y = this.yellow.startPosition.y;
	this.yellow.rotation = -60;
	titleLayer.addComponent( 'Yellow', this.yellow );
	
	this.logo = new Sprite( 'Logo' );
	this.logo.position.x = viewport.width * 0.50;
	this.logo.position.y = viewport.height * 0.40;
	this.logo.opacity = 0;
	this.logo.scale = viewport.height / 1080;
	titleLayer.addComponent( 'Logo', this.logo );
	
	this.text = new Text( Resources.Strings.PRESS_START + ' ' + Resources.Strings.TO_BEGIN );
	this.text.fontFamily = 'MK Mythologies';
	this.text.fontSize = viewport.height * 0.044;
	this.text.position.y = viewport.height * 0.67;
	this.text.opacity = 0;
	titleLayer.addComponent( 'Text', this.text );

	this.message = new Text( );
	this.message.fontFamily = 'Open Sans';
	this.message.fontSize = viewport.height * 0.05;
	this.message.position.y = viewport.height * 0.25;
	this.message.opacity = 0;
	titleLayer.addComponent( 'Message', this.message );

	if( app.settings.TUNES > 0 ) {
		this.music = new Sound( 'Music-Intro' );
		this.music.setMaxVolume( 0.5 * app.settings.TUNES / 11 );
		this.music.loop( );
	}

	this.godSequence = [Buttons.UP, Buttons.UP, Buttons.DOWN, Buttons.DOWN, Buttons.LEFT, Buttons.RIGHT, Buttons.LEFT, Buttons.RIGHT, Buttons.BACK, Buttons.ACTION ];
}

TitleScene.prototype = new Scene;
TitleScene.prototype.constructor = TitleScene;

TitleScene.prototype.updateOut = function( transitionPercent ) {
	this.blue.offset = transitionPercent / 2;
	this.blue.position.x = this.blue.startPosition.x + (this.blue.endPosition.x - this.blue.startPosition.x) * (1 - transitionPercent);
	this.blue.position.y = this.blue.startPosition.y + (this.blue.endPosition.y - this.blue.startPosition.y) * (1 - transitionPercent);
	this.yellow.offset = transitionPercent / 2;
	this.yellow.position.x = this.yellow.startPosition.x + (this.yellow.endPosition.x - this.yellow.startPosition.x) * (1 - transitionPercent);
	this.yellow.position.y = this.yellow.startPosition.y + (this.yellow.endPosition.y - this.yellow.startPosition.y) * (1 - transitionPercent);

	if( app.settings.TUNES > 0 ) {
		this.music.setVolume( 1 - transitionPercent );
	}
};

TitleScene.prototype.updateIn = function( transitionPercent ) {
	if( app.settings.TUNES > 0 ) {
		this.music.setVolume( transitionPercent );
	}
};

TitleScene.prototype.unload = function( ) {
	if( app.settings.TUNES > 0 ) {
		this.music.stop( );
	}
};

TitleScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );
	if( this.timeElapsed > 2.5 && this.timeElapsed < 4 ) {
		this.logo.opacity = ( this.timeElapsed - 2.5 ) / 1.5;
	}
	
	if( !this.layers['Menu'] && this.timeElapsed > 5 ) {
		this.text.opacity = 0.5 * Math.cos( 2 * Math.PI * this.timeElapsed * 0.5 ) + 0.5;
	}
	
	if( !this.layers['Menu'] && (InputManager.checkButtonPress( Buttons.ACTION ) || InputManager.checkButtonPress( Buttons.START ) ) )
	{
		if( InputManager.checkSequence( this.godSequence ) ) {
			app.godMode = 'Th3r3|15-n0~Kn0wl3d93/7h4t=15+n0t:P0w3r';
			this.message.text = 'GOD MODE';
			this.message.opacity = 1;
			if( app.settings.SOUND_FX > 0 ) {
				var excellentSound = new Sound( 'Excellent' );
				excellentSound.setMaxVolume( 0.75 * app.settings.SOUND_FX / 11 );
				excellentSound.play( );
			}
			
			if( typeof track === 'function' ) {
				track( 'god-mode' );
			}
		}
		else {
			this.addLayer( 'Menu', new TitleMenu( this ) );
		}
	}
	
	this.easePosition( 0.5, 3, this.ball );
	this.easePosition( 1.5, 3, this.yellow );
	this.easePosition( 1, 3, this.blue );
	this.ball.rotation = 150;
	this.ball.targetRotation = 150;
	this.ball.glare.rotation = 150;
	
	if( this.message.opacity > 0 ) {
		this.message.opacity = Math.max( this.message.opacity - deltaTime * 0.5, 0 );
	} else {
		this.message.opacity = 0;
	}

	if( !this.layers['Menu'] && this.timeElapsed > 15 ) {
		if( typeof track === 'function' ) {
			track( 'story' );
		}

		var storyScene = new StoryScene( );
		storyScene.setPaddle( Paddles.RANDOM );
		storyScene.setStory( storyScene.paddle.story );
		SceneManager.changeScene( storyScene, Transitions.FADE );
	}
};

TitleScene.prototype.ballInterpolation = function( startTime, endTime ) {
	if( this.timeElapsed > startTime && this.timeElapsed < endTime ) {
		var time = 1 - (this.timeElapsed - startTime) / (endTime - startTime);
		
		this.ball.opacity = (1 - time) * 2;
		
		this.ball.position.x = this.ball.endPosition.x - (this.ball.endPosition.x - this.ball.startPosition.x) * time * time;
		this.ball.position.y = this.ball.endPosition.y - (this.ball.endPosition.y - this.ball.startPosition.y) * time * time;
	} else if( this.timeElapsed > endTime && this.ball.opacity != 1 ) {
		this.ball.opacity = 1;
		this.ball.position.x = this.ball.endPosition.x;
		this.ball.position.y = this.ball.endPosition.y;
	}
};

TitleScene.prototype.easePosition = function( startTime, endTime, component ) {
	if( this.timeElapsed > startTime && this.timeElapsed < endTime ) {
		var time = 1 - (this.timeElapsed - startTime) / (endTime - startTime);
		
		component.opacity = (1 - time) * 2;
		component.offset = time / 2;
		
		component.position.x = component.endPosition.x - (component.endPosition.x - component.startPosition.x) * time * time;
		component.position.y = component.endPosition.y - (component.endPosition.y - component.startPosition.y) * time * time;
	} else if( this.timeElapsed > endTime && component.opacity != 1 ) {
		component.opacity = 1;
		component.position.x = component.endPosition.x;
		component.position.y = component.endPosition.y;
	}
};