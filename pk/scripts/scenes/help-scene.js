function HelpScene( ) {
	Scene.call( this );
	
	// Blood / Censorship
	// Sound Effects Volume
	// Background Music Volume
	// Back to Title Menu / Save
	
	var layer = this.addLayer( 'HelpLayer', new Layer( ) );
	
	var censoredLabel = new Text( 'Censored' );
	censoredLabel.fontSize = viewport.height * 0.05;
	censoredLabel.textAlign = 'left';
	censoredLabel.position.x = viewport.width * 0.25;
	censoredLabel.position.y = viewport.height * 0.33;
	layer.addComponent( 'CensoredLabel', censoredLabel );
	
	var soundFXLabel = new Text( 'Sound Effects' );
	soundFXLabel.fontSize = viewport.height * 0.05;
	soundFXLabel.textAlign = 'left';
	soundFXLabel.position.x = viewport.width * 0.25;
	soundFXLabel.position.y = viewport.height * 0.50;
	layer.addComponent( 'SoundFXLabel', soundFXLabel );
	
	var censoredValue = new Text( app.settings.censored ? 'On' : 'Off' );
	censoredValue.fontSize = viewport.height * 0.05;
	censoredValue.textAlign = 'right';
	censoredValue.position.x = viewport.width * 0.75;
	censoredValue.position.y = viewport.height * 0.33;
	layer.addComponent( 'CensoredValue', censoredValue );
	
	var soundFXValue = new Text( app.settings.sound_fx ? 'On' : 'Off' );
	soundFXValue.fontSize = viewport.height * 0.05;
	soundFXValue.textAlign = 'right';
	soundFXValue.position.x = viewport.width * 0.75;
	soundFXValue.position.y = viewport.height * 0.50;
	layer.addComponent( 'SoundFXValue', soundFXValue );
	
	// Audio
	if( !app.isMobile( ) )
	{
		this.beepSound = new Sound( 'Beep' );
		this.boopSound = new Sound( 'Boop' );
	}
	
	this.selectSetting( 'censored' );
}

HelpScene.prototype = new Scene;
HelpScene.prototype.constructor = HelpScene;

HelpScene.prototype.selectSetting = function( setting ) {
	for( var i in this.layers['HelpLayer'].components ) {
		this.layers['HelpLayer'].components[i].color = '#FFF';
	}
	
	switch( setting ) {
		case 'censored' :
			this.layers['HelpLayer'].components['CensoredLabel'].color = '#FF0';
			this.layers['HelpLayer'].components['CensoredValue'].color = '#FF0';
		break;
		
		case 'sound_fx' :
			this.layers['HelpLayer'].components['SoundFXLabel'].color = '#FF0';
			this.layers['HelpLayer'].components['SoundFXValue'].color = '#FF0';
		break;
	}
	
	this.currentSetting = setting;
};

HelpScene.prototype.decreaseSetting = function( ) {
	switch( this.currentSetting ) {
		case 'censored' : app.settings[this.currentSetting] = !app.settings[this.currentSetting]; break;
		case 'sound_fx' :
			app.settings[this.currentSetting] = !app.settings[this.currentSetting];
			if( app.settings[this.currentSetting] === false ) {
				AudioManager.mute( );
			} else {
				AudioManager.unmute( );
				this.beepSound.play( );
			}
		break;
	}
	
	this.layers['HelpLayer'].components['CensoredValue'].text = app.settings.censored ? 'On' : 'Off';
	this.layers['HelpLayer'].components['SoundFXValue'].text = app.settings.sound_fx ? 'On' : 'Off';
};

HelpScene.prototype.increaseSetting = function( ) {
	switch( this.currentSetting ) {
		case 'censored' : app.settings[this.currentSetting] = !app.settings[this.currentSetting]; break;
		case 'sound_fx' :
			app.settings[this.currentSetting] = !app.settings[this.currentSetting];
			if( app.settings[this.currentSetting] === false ) {
				AudioManager.mute( );
			} else {
				AudioManager.unmute( );
				this.beepSound.play( );
			}
		break;
	}
	
	this.layers['HelpLayer'].components['CensoredValue'].text = app.settings.censored ? 'On' : 'Off';
	this.layers['HelpLayer'].components['SoundFXValue'].text = app.settings.sound_fx ? 'On' : 'Off';
};

HelpScene.prototype.selectNextSetting = function( ) {
	switch( this.currentSetting ) {
		case 'censored' : this.selectSetting( 'sound_fx' ); break;
		case 'sound_fx' : this.selectSetting( 'censored' ); break;
	}
};

HelpScene.prototype.selectPreviousSetting = function( ) {
	switch( this.currentSetting ) {
		case 'censored' : this.selectSetting( 'music' ); break;
		case 'sound_fx' : this.selectSetting( 'censored' ); break;
	}
};

HelpScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );
	
	if( InputManager.checkButtonPress( Buttons.DOWN ) ) {
		this.selectNextSetting( );
	}
	
	if( InputManager.checkButtonPress( Buttons.UP ) ) {
		this.selectPreviousSetting( );
	}
	
	if( InputManager.checkButtonPress( Buttons.LEFT ) ) {
		this.decreaseSetting( );
	}
	
	if( InputManager.checkButtonPress( Buttons.RIGHT ) ) {
		this.increaseSetting( );
	}
	
	if( InputManager.checkButtonPress( Buttons.ACTION ) ) {
		SceneManager.changeScene( new TitleScene( ), Transitions.NONE );
	}
};