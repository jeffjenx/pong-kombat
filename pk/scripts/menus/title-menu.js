function TitleMenu( scene ) {
	Menu.call( this, scene );
	
	this.addItem( 'Single Player', this.selectSinglePlayer );
	this.addItem( 'Paddle-2-Paddle', null );
	this.addItem( 'Help & Options', null );
	this.addItem( 'Leaderboards', null );
	this.addItem( 'Get Outta Here!', this.selectQuit );
}

TitleMenu.prototype = new Menu;
TitleMenu.prototype.constructor = TitleMenu;

TitleMenu.prototype.selectSinglePlayer = function( ) {
	SceneManager.changeScene( new ChoosePaddleScene( ), Transitions.NONE );
};

TitleMenu.prototype.selectQuit = function( ) {
	window.location = 'http://www.google.com';
};