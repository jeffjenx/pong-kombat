function PauseMenu( scene ) {
	Menu.call( this, scene );
	
	this.addItem( 'Kontinue', this.selectContinue );
	this.addItem( 'Resign', this.selectResign );
}

PauseMenu.prototype = new Menu;
PauseMenu.prototype.constructor = PauseMenu;

PauseMenu.prototype.selectContinue = function( ) {
	SceneManager.currentScene.removeLayer( 'Menu' );
	SceneManager.currentScene.changeState( SceneManager.currentScene.states.fighting );
};

PauseMenu.prototype.selectResign = function( ) {
	SceneManager.changeScene( new TitleScene( ), Transitions.NONE );
};