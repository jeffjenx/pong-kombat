GameModes = {
	TOURNAMENT : 0,
	FREEPLAY : 1,
	SUPERPK : 2
};

function TitleMenu( scene ) {
	Menu.call( this, scene );
	
	this.addItem( 'Free Play', this.selectFreePlay );
	this.addItem( 'Tournament', this.selectTournament );
	//this.addItem( 'Super PK', null );
	this.addItem( 'Dip Switches', this.selectSettings );
	this.addItem( 'Get Outta Here!', this.selectQuit );
}

TitleMenu.prototype = new Menu;
TitleMenu.prototype.constructor = TitleMenu;

TitleMenu.prototype.selectFreePlay = function( ) {
	if( typeof track === 'function' ) {
		track( 'free-play' );
	}

	app.gameMode = GameModes.FREEPLAY;
	SceneManager.changeScene( new PickPaddleScene( ), Transitions.FADE, 0.5 );
};

TitleMenu.prototype.selectSettings = function( ) {
	if( typeof track === 'function' ) {
		track( 'dip-switches' );
	}

	this.closeMenu( );
	SceneManager.changeScene( new SettingsScene( ), Transitions.FADE );
};

TitleMenu.prototype.selectTournament = function( ) {
	if( typeof track === 'function' ) {
		track( 'tournament' );
	}

	app.gameMode = GameModes.TOURNAMENT;
	SceneManager.changeScene( new PickPaddleScene( ), Transitions.FADE, 0.5 );
};

TitleMenu.prototype.selectQuit = function( ) {
	if( typeof track === 'function' ) {
		track( 'quit' );
	}

	window.location = '/';
};