function HelpScene( ) {
	Scene.call( this );
	
	this.helpLayer = this.addLayer( 'HelpLayer', new Layer( ) );
	this.helpLayer.addComponent( 'Background', new Background( 'Background-Title' ) );
	
	var titleText = new Text( Resources['Localization']['DIP SWITCHES'] );
	titleText.fontFamily = 'MK Mythologies';
	titleText.fontSize = viewport.height * 0.08;
	titleText.position.y = viewport.height * 0.11;
	this.helpLayer.addComponent( 'TitleText', titleText );
	
	this.labels = {
	//	'Locale' : Resources['Localization']['Language/Country'],
	//	'Difficulty' : Resources['Localization']['Difficulty'],
	//	'Powerups' : Resources['Localization']['Powerups'],
	//	'Censored' : Resources['Localization']['Censorship'],
		'SoundFX' : Resources['Localization']['Sound Effects'],
	//	'Music' : Resources['Localization']['Background Music']
	};
	
	/*
	this.difficulties = [
		Resources['Localization']['Easy'],
		Resources['Localization']['Medium'],
		Resources['Localization']['Hard'],
		Resources['Localization']['Extreme']
	];
	*/
	
	/*
	this.locales = {
		'en-US' : Resources['Localization']['English'] + '/' + Resources['Localization']['United States'],
		'fr-CA' : Resources['Localization']['French'] + '/' + Resources['Localization']['Canada']
	};
	*/
	
	var y = viewport.height * 0.25;
	for( var i in app.settings ) {
		if( app.settings.hasOwnProperty( i ) ) {
			var label = new Text( this.labels[i] );
			label.fontFamily = 'Apple Garamond';
			label.fontSize = viewport.height * 0.05;
			label.textAlign = 'left';
			label.position.x = viewport.width * 0.25;
			label.position.y = y;
			this.helpLayer.addComponent( i + 'Label', label );
			
			var value = new Text( );
			switch( i ) {
				case 'Difficulty' :
					value.text = this.difficulties[ app.settings[i] ];
				break;
				
				case 'Locale' :
					value.text = this.locales[ app.settings[i] ];
				break;
				
				default :
					value.text = app.settings[i] ? Resources['Localization']['On'] : Resources['Localization']['Off'];
			}
			
			value.fontFamily = label.fontFamily;
			value.fontSize = label.fontSize;
			value.textAlign = 'right';
			value.position.x = viewport.width * 0.75;
			value.position.y = y;
			this.helpLayer.addComponent( i + 'Value', value );
			
			y += label.fontSize * 1.5;
		}
	}
	
	// Controls
	var controlsLabel = new Text( Resources['Localization']['Configure Controls'] );
	controlsLabel.fontFamily = 'Apple Garamond';
	controlsLabel.fontSize = viewport.height * 0.05;
	controlsLabel.textAlign = 'center';
	controlsLabel.position.y = y + controlsLabel.fontSize * 1.5;
	//this.helpLayer.addComponent( 'ControlsLabel', controlsLabel );
	
	// Main Menu
	var returnLabel = new Text( Resources['Localization']['Return to Main Menu'] );
	returnLabel.fontFamily = 'Apple Garamond';
	returnLabel.fontSize = controlsLabel.fontSize;
	returnLabel.textAlign = 'center';
	returnLabel.position.y = controlsLabel.position.y + controlsLabel.fontSize * 1.5;
	this.helpLayer.addComponent( 'ReturnLabel', returnLabel );
	
	this.selectSetting( 'SoundFX' );
}

HelpScene.prototype = new Scene;
HelpScene.prototype.constructor = HelpScene;

HelpScene.prototype.decreaseSetting = function( ) {
	switch( this.currentSetting ) {
		case 'Locale' :
			var keys = Object.keys( this.locales );
			var index = keys.indexOf( app.settings[this.currentSetting] );
			index -= 1;
			if( index < 0 ) {
				index = keys.length - 1;
			}
			app.settings[this.currentSetting] = keys[index];
			this.helpLayer.components[this.currentSetting+'Value'].text = this.locales[ keys[index] ];
		break;
		
		case 'Difficulty' :
			var index = app.settings[this.currentSetting];
			index -= 1;
			if( index < 0 ) {
				index = this.difficulties.length - 1;
			}
			app.settings[this.currentSetting] = index;
			this.helpLayer.components[this.currentSetting+'Value'].text = this.difficulties[index];
		break;
		
		case 'Powerups' :
		case 'Censored' :
		case 'SoundFX' :
		case 'Music' :
			app.settings[this.currentSetting] = !app.settings[this.currentSetting];
			this.helpLayer.components[this.currentSetting+'Value'].text = ( app.settings[this.currentSetting] ) ? Resources['Localization']['On'] : Resources['Localization']['Off'];
		break;
	}
};

HelpScene.prototype.increaseSetting = function( ) {
	switch( this.currentSetting ) {
		case 'Locale' :
			var keys = Object.keys( this.locales );
			var index = keys.indexOf( app.settings[this.currentSetting] );
			index += 1;
			if( index >= keys.length ) {
				index = 0;
			}
			app.settings[this.currentSetting] = keys[index];
			this.helpLayer.components[this.currentSetting+'Value'].text = this.locales[ keys[index] ];
		break;
		
		case 'Difficulty' :
			var index = app.settings[this.currentSetting];
			index += 1;
			if( index >= this.difficulties.length ) {
				index = 0;
			}
			app.settings[this.currentSetting] = index;
			this.helpLayer.components[this.currentSetting+'Value'].text = this.difficulties[index];
		break;
		
		case 'Powerups' :
		case 'Censored' :
		case 'SoundFX' :
		case 'Music' :
			app.settings[this.currentSetting] = !app.settings[this.currentSetting];
			this.helpLayer.components[this.currentSetting+'Value'].text = ( app.settings[this.currentSetting] ) ? Resources['Localization']['On'] : Resources['Localization']['Off'];
		break;
	}
};

HelpScene.prototype.selectSetting = function( setting ) {
	for( var i in this.layers['HelpLayer'].components ) {
		this.helpLayer.components[i].color = '#FFF';
	}
	
	var label = this.layers['HelpLayer'].components[setting+'Label'];
	if( label ) {
		label.color = '#FF0';
	}
	
	var value = this.helpLayer.components[setting+'Value'];
	if( value ) {
		value.color = '#FF0';
	}
	
	this.currentSetting = setting;
};

HelpScene.prototype.selectNextSetting = function( ) {
	var keys = Object.keys(app.settings);
	keys.push(/*'Controls',*/'Return');
	var i = keys.indexOf( this.currentSetting );
	
	i += 1;
	
	if( i >= keys.length ) {
		i = 0;
	}
	
	this.selectSetting( keys[i] );
};

HelpScene.prototype.selectPreviousSetting = function( ) {
	var keys = Object.keys(app.settings);
	keys.push(/*'Controls',*/'Return');
	var i = keys.indexOf( this.currentSetting );
	
	i -= 1;
	
	if( i < 0 ) {
		i = keys.length - 1;
	}
	
	this.selectSetting( keys[i] );
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
		if( this.currentSetting === 'Return' ) {
			SceneManager.changeScene( new TitleScene( ), Transitions.FADE );
		} else {
			this.increaseSetting();
		}
	}
};