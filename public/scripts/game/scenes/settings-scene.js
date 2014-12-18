function SettingsScene( )
{
	Scene.call( this );
	
	this.settingsLayer = this.addLayer( 'SettingsLayer', new Layer( ) );
	this.settingsLayer.addComponent( 'Background', new Background( 'Background-Title' ) );
	
	var titleText = new Text( Resources['Strings'].SETTINGS.DIP_SWITCHES );
	titleText.fontFamily = 'MK Mythologies';
	titleText.fontSize = viewport.height * 0.08;
	titleText.position.y = viewport.height * 0.11;
	titleText.opacity = 0;
	this.settingsLayer.addComponent( 'TitleText', titleText );
	
	this.labels =
	{
		'CENSORSHIP' : Resources['Strings'].SETTINGS.CENSORSHIP,
		'COINAGE'    : Resources['Strings'].SETTINGS.COINAGE,
		'COMBAT'     : Resources['Strings'].SETTINGS.COMBAT,
		'DIFFICULTY' : Resources['Strings'].SETTINGS.DIFFICULTY,
		'POWER_UPS'  : Resources['Strings'].SETTINGS.POWER_UPS,
		'SOUND_FX'   : Resources['Strings'].SETTINGS.SOUND_FX,
		'TUNES'      : Resources['Strings'].SETTINGS.TUNES
	};
	
	this.difficulties =
	[
		Resources['Strings'].SETTINGS.DIFFICULTIES.EASY,
		Resources['Strings'].SETTINGS.DIFFICULTIES.MEDIUM,
		Resources['Strings'].SETTINGS.DIFFICULTIES.HARD,
		Resources['Strings'].SETTINGS.DIFFICULTIES.EXTREME
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
				case 'DIFFICULTY' :
					value.text = this.difficulties[ app.settings[i] ];
				break;

				case 'SOUND_FX' :
				case 'TUNES' :
					value.text = ( app.settings[i] > 0 ) ? app.settings[i] : Resources['Strings'].SETTINGS.OFF;
				break;
				
				default :
					value.text = app.settings[i] ? Resources['Strings'].SETTINGS.ON : Resources['Strings'].SETTINGS.OFF;
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
	var returnLabel = new Text( Resources['Strings'].RETURN_TO_TITLE );
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
}

SettingsScene.prototype = new Scene;
SettingsScene.prototype.constructor = SettingsScene;

SettingsScene.prototype.decreaseSetting = function( )
{
	switch( this.currentSetting )
	{
		case 'DIFFICULTY' :
			var index = app.settings[ this.currentSetting ];
			index -= 1;
			if( index < 0 ) {
				index = this.difficulties.length - 1;
			}
			app.settings[this.currentSetting] = index;
			this.settingsLayer.components[ this.currentSetting + 'Value' ].text = this.difficulties[ index ];
		break;
		
		case 'SOUND_FX' :
		case 'TUNES' :
			var volume = app.settings[ this.currentSetting ];

			volume -= 1;
			if( volume < 0 )
			{
				volume = 0;
			}

			app.settings[ this.currentSetting ] = volume;
			this.settingsLayer.components[ this.currentSetting + 'Value' ].text = ( volume > 0 ) ? volume : Resources['Strings'].SETTINGS.OFF;
		break;
		
		case 'CENSORSHIP' :
		case 'COINAGE' :
		case 'COMBAT' :
		case 'POWER_UPS' :
			app.settings[ this.currentSetting ] = !app.settings[ this.currentSetting ];
			this.settingsLayer.components[ this.currentSetting + 'Value' ].text = ( app.settings[ this.currentSetting ] ) ? Resources['Strings'].SETTINGS.ON : Resources['Strings'].SETTINGS.OFF;
		break;
	}
};

SettingsScene.prototype.increaseSetting = function( )
{
	switch( this.currentSetting ) {
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

		case 'SOUND_FX' :
		case 'TUNES' :
			var volume = app.settings[ this.currentSetting ];

			volume += 1;
			if( volume > 11 )
			{
				volume = 11;
			}

			app.settings[ this.currentSetting ] = volume;
			this.settingsLayer.components[ this.currentSetting + 'Value' ].text = ( volume > 0 ) ? volume : Resources['Strings'].SETTINGS.OFF;
		break;
		
		case 'CENSORSHIP' :
		case 'COINAGE' :
		case 'COMBAT' :
		case 'POWER_UPS' :
			app.settings[ this.currentSetting ] = !app.settings[ this.currentSetting ];
			this.settingsLayer.components[ this.currentSetting + 'Value' ].text = ( app.settings[ this.currentSetting ] ) ? Resources['Strings'].SETTINGS.ON : Resources['Strings'].SETTINGS.OFF;
		break;
	}
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

SettingsScene.prototype.updateIn = function( transitionPercent ) {
	for( var i in this.settingsLayer.components )
	{
		this.settingsLayer.components[i].opacity = Math.min( transitionPercent, 1 );
	}
};

SettingsScene.prototype.updateOut = function( transitionPercent ) {
	this.green.position.y = this.green.startPosition.y + (this.green.endPosition.y - this.green.startPosition.y) * (1 - transitionPercent);
	this.purple.position.y = this.purple.startPosition.y + (this.purple.endPosition.y - this.purple.startPosition.y) * (1 - transitionPercent);
};

SettingsScene.prototype.update = function( deltaTime )
{
	Scene.prototype.update.call( this, deltaTime );
	
	this.easePosition( 0, 2, this.green );
	this.easePosition( 0.5, 2, this.purple );
	
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
	else if( this.timeElapsed > endTime && component.opacity != 1 )
	{
		component.opacity = 1;
		component.position.x = component.endPosition.x;
		component.position.y = component.endPosition.y;
	}
};