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
	var level = 'RANDOM';
	for(var i in Levels){
		if(Levels.hasOwnProperty(i) && Levels[i] === this.currentIndex){
			level = i;
			break;
		}
	}
	this.scene.level = level;
	this.closeMenu( );
};