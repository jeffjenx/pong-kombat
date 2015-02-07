function TrainingMenu( scene ) {
	Menu.call( this, scene );
	
	this.addItem( 'Continue', this.selectContinue );
	this.addItem( 'End Training', this.selectLeave );
}

TrainingMenu.prototype = new Menu;
TrainingMenu.prototype.constructor = PauseMenu;

TrainingMenu.prototype.selectContinue = function( ) {
	SceneManager.currentScene.removeLayer( 'Menu' );
	SceneManager.currentScene.changeState( SceneManager.currentScene.previousState );
};

TrainingMenu.prototype.selectLeave = function( ) {
	SceneManager.changeScene( new TitleScene( ), Transitions.NONE );
};