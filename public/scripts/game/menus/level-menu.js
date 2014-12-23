function LevelMenu( scene ) {
	Menu.call( this, scene );
	
	for( var i in Levels )
	{
		this.addItem( Resources.Strings.LEVELS[i], this.selectLevel );
	}
}

LevelMenu.prototype = new Menu;
LevelMenu.prototype.constructor = LevelMenu;

LevelMenu.prototype.selectLevel = function( ) {
	this.closeMenu( );
	this.scene.level = this.currentIndex;
};