function HelpScene( ) {
	Scene.call( this );
	
	// Blood / Censorship
	// Sound Effects Volume
	// Background Music Volume
	// Back to Title Menu / Save
	
	if( !app.settings ) {
		app.settings = {
			censored : true,
			sound_fx : 5,
			music : 5
		};
	}
	
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
	
	var musicLabel = new Text( 'Music' );
	musicLabel.fontSize = viewport.height * 0.05;
	musicLabel.textAlign = 'left';
	musicLabel.position.x = viewport.width * 0.25;
	musicLabel.position.y = viewport.height * 0.67;
	layer.addComponent( 'MusicLabel', musicLabel );
	
	var censoredValue = new Text( app.settings.censored ? 'On' : 'Off' );
	censoredValue.fontSize = viewport.height * 0.05;
	censoredValue.textAlign = 'right';
	censoredValue.position.x = viewport.width * 0.75;
	censoredValue.position.y = viewport.height * 0.33;
	layer.addComponent( 'CensoredValue', censoredValue );
	
	var soundFXValue = new Text( app.settings.sound_fx );
	soundFXValue.fontSize = viewport.height * 0.05;
	soundFXValue.textAlign = 'right';
	soundFXValue.position.x = viewport.width * 0.75;
	soundFXValue.position.y = viewport.height * 0.50;
	layer.addComponent( 'SoundFXValue', soundFXValue );
	
	var musicValue = new Text( app.settings.music );
	musicValue.fontSize = viewport.height * 0.05;
	musicValue.textAlign = 'right';
	musicValue.position.x = viewport.width * 0.75;
	musicValue.position.y = viewport.height * 0.67;
	layer.addComponent( 'MusicValue', musicValue );
	
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
		
		case 'music' :
			this.layers['HelpLayer'].components['MusicLabel'].color = '#FF0';
			this.layers['HelpLayer'].components['MusicValue'].color = '#FF0';
		break;
	}
	
	this.currentSetting = setting;
};

HelpScene.prototype.decreaseSetting = function( ) {
	if( "boolean" === typeof( app.settings[this.currentSetting] ) ) {
		app.settings[this.currentSetting] = !app.settings[this.currentSetting];
	} else {
		app.settings[this.currentSetting] -= 1;
		
		if( app.settings[this.currentSetting] < 1 ) {
			app.settings[this.currentSetting] = 1;
		}
	}
	
	this.layers['HelpLayer'].components['CensoredValue'].text = app.settings.censored ? 'On' : 'Off';
	this.layers['HelpLayer'].components['SoundFXValue'].text = app.settings.sound_fx;
	this.layers['HelpLayer'].components['MusicValue'].text = app.settings.music;
};

HelpScene.prototype.increaseSetting = function( ) {
	if( "boolean" === typeof( app.settings[this.currentSetting] ) ) {
		app.settings[this.currentSetting] = !app.settings[this.currentSetting];
	} else {
		app.settings[this.currentSetting] += 1;
		
		if( app.settings[this.currentSetting] > 10 ) {
			app.settings[this.currentSetting] = 10;
		}
	}
	
	this.layers['HelpLayer'].components['CensoredValue'].text = app.settings.censored ? 'On' : 'Off';
	this.layers['HelpLayer'].components['SoundFXValue'].text = app.settings.sound_fx;
	this.layers['HelpLayer'].components['MusicValue'].text = app.settings.music;
};

HelpScene.prototype.selectNextSetting = function( ) {
	switch( this.currentSetting ) {
		case 'censored' : this.selectSetting( 'sound_fx' ); break;
		case 'sound_fx' : this.selectSetting( 'music' ); break;
		case 'music'    : this.selectSetting( 'censored' ); break;
	}
};

HelpScene.prototype.selectPreviousSetting = function( ) {
	switch( this.currentSetting ) {
		case 'censored' : this.selectSetting( 'music' ); break;
		case 'sound_fx' : this.selectSetting( 'censored' ); break;
		case 'music'    : this.selectSetting( 'sound_fx' ); break;
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
};