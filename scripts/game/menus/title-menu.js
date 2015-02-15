GameModes = {
	TOURNAMENT : 0,
	FREEPLAY : 1,
	SUPERPK : 2,
	TRAINING : 3,
	P2P : 4
};

function TitleMenu( scene ) {
	Menu.call( this, scene );
	
	this.addItem( 'Free Play', this.selectFreePlay );
	this.addItem( 'P9X Training', this.selectTraining );
	this.addItem( 'Tournament Edition', this.selectTournament );
	if(app.p2p) {
		//this.addItem( 'Log In', this.selectLogin );
		this.addItem( 'Paddle-2-Paddle', this.selectMultiplayer );
	}
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
	app.tournament = null;
	SceneManager.changeScene( new PickPaddleScene( ), Transitions.FADE, 0.5 );
};

TitleMenu.prototype.selectLogin = function() {
	window.open('/login');
};

TitleMenu.prototype.selectMultiplayer = function() {
	if( typeof track === 'function' ) {
		track( 'multiplayer' );
	}

	app.gameMode = GameModes.P2P;
	console.log(app.p2p.id);
	SceneManager.changeScene( new MultiplayerScene( ), Transitions.FADE, 0.5 );
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
	app.tournament = null;
	SceneManager.changeScene( new PickPaddleScene( ), Transitions.FADE, 0.5 );
};

TitleMenu.prototype.selectTraining = function( ) {
	if( typeof track === 'function' ) {
		track( 'training' );
	}

	app.gameMode = GameModes.TRAINING;
	SceneManager.changeScene( new PickPaddleScene( ), Transitions.FADE, 0.5 );
};

TitleMenu.prototype.selectQuit = function( ) {
	if( typeof track === 'function' ) {
		track( 'quit' );
	}

	window.location = '/';
};