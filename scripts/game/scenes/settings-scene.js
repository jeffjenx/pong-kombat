function SettingsScene( )
{
	Scene.call( this );
	
	this.settingsLayer = this.addLayer( 'SettingsLayer', new Layer( ) );
	this.settingsLayer.addComponent( 'Background', new Background( 'Background-Title' ) );
	
	this.titleText = new Text( Resources.Strings.SETTINGS.DIP_SWITCHES );
	this.titleText.fontFamily = 'MK Mythologies';
	this.titleText.fontSize = viewport.height * 0.08;
	this.titleText.position.y = viewport.height * 0.11;
	this.titleText.opacity = 0;
	this.settingsLayer.addComponent( 'TitleText', this.titleText );
	
	this.labels =
	{
		'CENSORSHIP' : Resources.Strings.SETTINGS.CENSORSHIP,
		'COINAGE'    : Resources.Strings.SETTINGS.COINAGE,
		'COMBAT'     : Resources.Strings.SETTINGS.COMBAT,
		'DETAIL'     : Resources.Strings.SETTINGS.DETAIL,
		'DIFFICULTY' : Resources.Strings.SETTINGS.DIFFICULTY,
		'POWER_UPS'  : Resources.Strings.SETTINGS.POWER_UPS,
		'ROUNDS'     : 'Rounds',
		'SOUND_FX'   : Resources.Strings.SETTINGS.SOUND_FX,
		'TUNES'      : Resources.Strings.SETTINGS.TUNES
	};

	this.details = 
	[
		Resources.Strings.SETTINGS.DETAILS.LOW,
		Resources.Strings.SETTINGS.DETAILS.MEDIUM,
		Resources.Strings.SETTINGS.DETAILS.HIGH
	];
	
	this.difficulties =
	[
		Resources.Strings.SETTINGS.DIFFICULTIES.EASY,
		Resources.Strings.SETTINGS.DIFFICULTIES.MEDIUM,
		Resources.Strings.SETTINGS.DIFFICULTIES.HARD,
		Resources.Strings.SETTINGS.DIFFICULTIES.EXTREME
	];

	this.coinages =
	[
		Resources.Strings.SETTINGS.COINAGES.FREE_PLAY,
		Resources.Strings.SETTINGS.COINAGES.ONE_COIN,
		Resources.Strings.SETTINGS.COINAGES.TWO_COINS,
		Resources.Strings.SETTINGS.COINAGES.HALF_COIN
	];
	
	// Settings Menu Items
	var y = viewport.height * 0.25;
	for( var i in app.settings )
	{
		if( app.settings.hasOwnProperty( i ) )
		{
			var label = new Text( this.labels[i] );
			label.fontFamily = 'Apple Garamond';
			label.fontSize = viewport.height * 0.05;
			label.textAlign = 'left';
			label.position.x = viewport.width * 0.33;
			label.position.y = y;
			label.opacity = 0;
			this.settingsLayer.addComponent( i + 'Label', label );
			
			var value = new Text( );
			switch( i )
			{
				case 'COINAGE' :
					value.text = this.coinages[ app.settings[i] ];
				break;

				case 'DETAIL' :
					value.text = this.details[ app.settings[i] ];
				break;

				case 'DIFFICULTY' :
					value.text = this.difficulties[ app.settings[i] ];
				break;

				case 'ROUNDS' :
					value.text = 'Best of ' + app.settings[i];
				break;

				case 'SOUND_FX' :
				case 'TUNES' :
					value.text = ( app.settings[i] > 0 ) ? app.settings[i] : Resources.Strings.SETTINGS.OFF;
				break;
				
				default :
					value.text = app.settings[i] ? Resources.Strings.SETTINGS.ON : Resources.Strings.SETTINGS.OFF;
			}
			
			value.fontFamily = label.fontFamily;
			value.fontSize = label.fontSize;
			value.textAlign = 'right';
			value.position.x = viewport.width * 0.67;
			value.position.y = y;
			value.opacity = 0;
			this.settingsLayer.addComponent( i + 'Value', value );
			
			y += label.fontSize * 1.5;
		}
	}
	
	// Main Menu Item
	var returnLabel = new Text( Resources.Strings.RETURN_TO_TITLE );
	returnLabel.fontFamily = 'Apple Garamond';
	returnLabel.fontSize = viewport.height * 0.05;
	returnLabel.textAlign = 'center';
	returnLabel.position.y = y + returnLabel.fontSize * 1.5;
	returnLabel.opacity = 0;
	this.settingsLayer.addComponent( 'ReturnLabel', returnLabel );


	this.green = new GreenPaddle( );
	this.green.scale = 4;
	this.green.startPosition = {x: viewport.width * 0.85, y: -this.green.size.y * this.green.scale};
	this.green.endPosition = {x: viewport.width * 0.85, y: viewport.height * 0.50};
	this.green.position.x = this.green.startPosition.x;
	this.green.position.y = this.green.startPosition.y;
	this.settingsLayer.addComponent( 'Green', this.green );
	
	this.purple = new PurplePaddle( );
	this.purple.scale = 4;
	this.purple.startPosition = {x: viewport.width * 0.15, y: viewport.height + this.purple.size.y * this.purple.scale};
	this.purple.endPosition = {x: viewport.width * 0.15, y: viewport.height * 0.50};
	this.purple.position.x = this.purple.startPosition.x;
	this.purple.position.y = this.purple.startPosition.y;
	this.settingsLayer.addComponent( 'Purple', this.purple );
	
	this.selectSetting( 'CENSORSHIP' );

	this.music = new Sound( 'Music-Settings' );
	this.music.setMaxVolume( 0.5 * app.settings.TUNES / 11 );
	//if( app.settings.TUNES > 0 ) {
	this.music.loop( );
	//}

	this.beepSound = new Sound('Beep');
	this.beepSound.setMaxVolume(0.5 * app.settings.SOUND_FX / 11);
	this.boopSound = new Sound('Boop');
	this.boopSound.setMaxVolume(0.5 * app.settings.SOUND_FX / 11);
}

SettingsScene.prototype = new Scene;
SettingsScene.prototype.constructor = SettingsScene;

SettingsScene.prototype.changeDetail = function() {
	// Resize/Reposition all elements after detail setting changed
	var background = this.settingsLayer.components['Background'];
	background.size.x = viewport.width;
	background.size.y = viewport.height;
	
	this.titleText.fontSize = viewport.height * 0.08;
	this.titleText.position.x = viewport.width / 2;
	this.titleText.position.y = viewport.height * 0.11;
	
	// Settings Menu Items
	var y = viewport.height * 0.25;
	for( var i in app.settings )
	{
		if( app.settings.hasOwnProperty( i ) )
		{
			var label = this.settingsLayer.components[i + 'Label'];
			label.fontSize = viewport.height * 0.05;
			label.position.x = viewport.width * 0.33;
			label.position.y = y;
			
			var value = this.settingsLayer.components[i + 'Value'];
			value.fontSize = label.fontSize;
			value.position.x = viewport.width * 0.67;
			value.position.y = y;
			
			y += label.fontSize * 1.5;
		}
	}
	
	// Main Menu Item
	var returnLabel = this.settingsLayer.components['ReturnLabel'];
	returnLabel.fontSize = viewport.height * 0.05;
	returnLabel.position.x = viewport.width / 2;
	returnLabel.position.y = y + returnLabel.fontSize * 1.5;
	
	this.green.startPosition = {x: viewport.width * 0.85, y: -this.green.size.y * this.green.scale};
	this.green.endPosition = {x: viewport.width * 0.85, y: viewport.height * 0.50};
	//this.green.position.x = this.green.startPosition.x;
	//this.green.position.y = this.green.startPosition.y;
	this.green.size.x = viewport.width * 0.03;
	this.green.size.y = viewport.height * ( 0.01 * Math.pow( this.green.bigness, 2 ) + 0.09 );
	
	
	this.purple.startPosition = {x: viewport.width * 0.15, y: viewport.height + this.purple.size.y * this.purple.scale};
	this.purple.endPosition = {x: viewport.width * 0.15, y: viewport.height * 0.50};
	//this.purple.position.x = this.purple.startPosition.x;
	//this.purple.position.y = this.purple.startPosition.y;
	this.purple.size.x = viewport.width * 0.03;
	this.purple.size.y = viewport.height * ( 0.01 * Math.pow( this.purple.bigness, 2 ) + 0.09 );

	this.easePosition( 0, 2, this.green );
	this.easePosition( 0.5, 2, this.purple );
};

SettingsScene.prototype.decreaseSetting = function( )
{
	switch( this.currentSetting )
	{
		case 'COINAGE' :
			var index = app.settings[ this.currentSetting ];
			index -= 1;
			if( index < 0 ) {
				index = this.coinages.length - 1;
			}
			app.settings[this.currentSetting] = index;
			this.settingsLayer.components[ this.currentSetting + 'Value' ].text = this.coinages[ index ];
		break;

		case 'DETAIL' :
			var index = app.settings[ this.currentSetting ];
			index -= 1;
			if( index < 0 ) {
				index = this.details.length - 1;
			}
			app.settings[this.currentSetting] = index;
			this.settingsLayer.components[ this.currentSetting + 'Value' ].text = this.details[ index ];
			app.resize( index );
			this.changeDetail();
		break;

		case 'DIFFICULTY' :
			var index = app.settings[ this.currentSetting ];
			index -= 1;
			if( index < 0 ) {
				index = this.difficulties.length - 1;
			}
			app.settings[this.currentSetting] = index;
			this.settingsLayer.components[ this.currentSetting + 'Value' ].text = this.difficulties[ index ];
		break;
		
		case 'ROUNDS' :
			var rounds = app.settings[ this.currentSetting ];
			rounds -= 2;
			if( rounds < 1 )
			{
				rounds = 1;
			}
			app.settings[ this.currentSetting ] = rounds;
			this.settingsLayer.components[ this.currentSetting + 'Value' ].text = 'Best of ' + rounds;
		break;

		case 'SOUND_FX' :
			this.beepSound.setMaxVolume(0.5 * app.settings.SOUND_FX / 11);
			this.beepSound.play();
			// no break;
		case 'TUNES' :
			var volume = app.settings[ this.currentSetting ];

			volume -= 1;
			if( volume < 0 )
			{
				volume = 0;
			}

			app.settings[ this.currentSetting ] = volume;
			this.settingsLayer.components[ this.currentSetting + 'Value' ].text = ( volume > 0 ) ? volume : Resources.Strings.SETTINGS.OFF;

			this.music.setMaxVolume(0.5 * app.settings.TUNES / 11);
		break;
		
		case 'CENSORSHIP' :
		case 'COINAGE' :
		case 'COMBAT' :
		case 'POWER_UPS' :
			app.settings[ this.currentSetting ] = !app.settings[ this.currentSetting ];
			this.settingsLayer.components[ this.currentSetting + 'Value' ].text = ( app.settings[ this.currentSetting ] ) ? Resources.Strings.SETTINGS.ON : Resources.Strings.SETTINGS.OFF;
		break;
	}

	localStorage['PongKombat.settings.' + this.currentSetting] = app.settings[this.currentSetting];
};

SettingsScene.prototype.increaseSetting = function( )
{
	switch( this.currentSetting ) {
		case 'COINAGE' :
			var index = app.settings[ this.currentSetting ];
			
			index += 1;
			if( index >= this.coinages.length )
			{
				index = 0;
			}

			app.settings[ this.currentSetting ] = index;
			this.settingsLayer.components[ this.currentSetting + 'Value' ].text = this.coinages[ index ];
		break;

		case 'DETAIL' :
			var index = app.settings[ this.currentSetting ];
			
			index += 1;
			if( index >= this.details.length )
			{
				index = this.details.length - 1;
			}

			app.settings[ this.currentSetting ] = index;
			this.settingsLayer.components[ this.currentSetting + 'Value' ].text = this.details[ index ];
			app.resize( index );
			this.changeDetail();
		break;

		case 'DIFFICULTY' :
			var index = app.settings[ this.currentSetting ];
			
			index += 1;
			if( index >= this.difficulties.length )
			{
				index = 0;
			}

			app.settings[ this.currentSetting ] = index;
			this.settingsLayer.components[ this.currentSetting + 'Value' ].text = this.difficulties[ index ];
		break;

		case 'ROUNDS' :
			var rounds = app.settings[ this.currentSetting ];

			rounds += 2;
			if( rounds > 11 )
			{
				rounds = 11;
			}

			app.settings[ this.currentSetting ] = rounds;
			this.settingsLayer.components[ this.currentSetting + 'Value' ].text = 'Best of ' + rounds;
		break;

		case 'SOUND_FX' :
			this.beepSound.setMaxVolume(0.5 * app.settings.SOUND_FX / 11);
			this.beepSound.play();
			// no break;
		case 'TUNES' :
			var volume = app.settings[ this.currentSetting ];

			volume += 1;
			if( volume > 11 )
			{
				volume = 11;
			}

			app.settings[ this.currentSetting ] = volume;
			this.settingsLayer.components[ this.currentSetting + 'Value' ].text = ( volume > 0 ) ? volume : Resources.Strings.SETTINGS.OFF;

			this.music.setMaxVolume(0.5 * app.settings.TUNES / 11);
		break;
		
		case 'CENSORSHIP' :
		case 'COINAGE' :
		case 'COMBAT' :
		case 'POWER_UPS' :
			app.settings[ this.currentSetting ] = !app.settings[ this.currentSetting ];
			this.settingsLayer.components[ this.currentSetting + 'Value' ].text = ( app.settings[ this.currentSetting ] ) ? Resources.Strings.SETTINGS.ON : Resources.Strings.SETTINGS.OFF;
		break;
	}
	
	localStorage['PongKombat.settings.' + this.currentSetting] = app.settings[this.currentSetting];
};

SettingsScene.prototype.selectSetting = function( setting )
{
	for( var i in this.settingsLayer.components )
	{
		this.settingsLayer.components[ i ].color = '#FFF';
	}
	
	var label = this.settingsLayer.components[ setting + 'Label' ];
	if( label )
	{
		label.color = '#FF0';
	}
	
	var value = this.settingsLayer.components[ setting + 'Value' ];
	if( value )
	{
		value.color = '#FF0';
	}
	
	this.currentSetting = setting;
};

SettingsScene.prototype.selectNextSetting = function( )
{
	var keys = Object.keys( app.settings );
	keys.push( 'Return' );
	var i = keys.indexOf( this.currentSetting );
	
	i += 1;
	
	if( i >= keys.length )
	{
		i = 0;
	}
	
	this.selectSetting( keys[ i ] );
};

SettingsScene.prototype.selectPreviousSetting = function( )
{
	var keys = Object.keys( app.settings );
	keys.push( 'Return' );
	var i = keys.indexOf( this.currentSetting );
	
	i -= 1;
	
	if( i < 0 )
	{
		i = keys.length - 1;
	}
	
	this.selectSetting( keys[i] );
};

SettingsScene.prototype.unload = function( ) {
	this.music.stop( );
};

SettingsScene.prototype.updateIn = function( transitionPercent ) {
	for( var i in this.settingsLayer.components )
	{
		this.settingsLayer.components[i].opacity = Math.min( transitionPercent, 1 );
	}

	if( app.settings.TUNES > 0 ) {
		this.music.setVolume( transitionPercent );
	}
};

SettingsScene.prototype.updateOut = function( transitionPercent ) {
	this.green.position.y = this.green.startPosition.y + (this.green.endPosition.y - this.green.startPosition.y) * (1 - transitionPercent);
	this.purple.position.y = this.purple.startPosition.y + (this.purple.endPosition.y - this.purple.startPosition.y) * (1 - transitionPercent);

	if( app.settings.TUNES > 0 ) {
		this.music.setVolume( 1 - transitionPercent );
	}
};

SettingsScene.prototype.update = function( deltaTime )
{
	Scene.prototype.update.call( this, deltaTime );
	
	this.easePosition( 0, 2, this.green );
	this.easePosition( 0.5, 2, this.purple );
	
	if( InputManager.checkSequence( [ Buttons.UP, Buttons.RIGHT, Buttons.DOWN, Buttons.LEFT, Buttons.UP, Buttons.RIGHT, Buttons.DOWN, Buttons.LEFT ] ) )
	{
		//console.log( 'Blasteroids' );
	}

	if( InputManager.checkButtonPress( Buttons.DOWN ) )
	{
		this.selectNextSetting( );
	}
	
	if( InputManager.checkButtonPress( Buttons.UP ) )
	{
		this.selectPreviousSetting( );
	}
	
	if( InputManager.checkButtonPress( Buttons.LEFT ) )
	{
		this.decreaseSetting( );
	}
	
	if( InputManager.checkButtonPress( Buttons.RIGHT ) )
	{
		this.increaseSetting( );
	}
	
	if( InputManager.checkButtonPress( Buttons.ACTION ) )
	{
		if( this.currentSetting === 'Return' )
		{
			SceneManager.changeScene( new TitleScene( ), Transitions.FADE );
		}
		else
		{
			this.increaseSetting( );
		}
	}
};

SettingsScene.prototype.easePosition = function( startTime, endTime, component )
{
	if( this.timeElapsed > startTime && this.timeElapsed < endTime )
	{
		var time = 1 - (this.timeElapsed - startTime) / (endTime - startTime);
		
		component.opacity = (1 - time) * 2;
		
		component.position.x = component.endPosition.x - (component.endPosition.x - component.startPosition.x) * time * time;
		component.position.y = component.endPosition.y - (component.endPosition.y - component.startPosition.y) * time * time;
	}
	else if( this.timeElapsed > endTime )
	{
		component.opacity = 1;
		component.position.x = component.endPosition.x;
		component.position.y = component.endPosition.y;
	}
};