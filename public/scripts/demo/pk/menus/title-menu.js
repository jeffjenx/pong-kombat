GameModes = {
	TOURNAMENT : 0,
	FREEPLAY : 1,
	SUPERPK : 2
};

function TitleMenu( scene ) {
	Menu.call( this, scene );
	
	this.addItem( 'Free Play', this.selectFreePlay );
	//this.addItem( 'Tournament', this.selectTournament );
	//this.addItem( 'Super PK', null );
	this.addItem( 'Help & Options', this.selectHelp );
	this.addItem( 'Get Outta Here!', this.selectQuit );
}

TitleMenu.prototype = new Menu;
TitleMenu.prototype.constructor = TitleMenu;

TitleMenu.prototype.selectFreePlay = function( ) {
	app.gameMode = GameModes.FREEPLAY;
	SceneManager.changeScene( new ChoosePaddleScene( ), Transitions.NONE );
};

TitleMenu.prototype.selectHelp = function( ) {
	SceneManager.changeScene( new HelpScene( ), Transitions.NONE );
};

TitleMenu.prototype.selectTournament = function( ) {
	app.gameMode = GameModes.TOURNAMENT;
	SceneManager.changeScene( new ChoosePaddleScene( ), Transitions.NONE );
};

TitleMenu.prototype.selectQuit = function( ) {
	window.location = 'http://www.pongkombat.com/teaser';
};