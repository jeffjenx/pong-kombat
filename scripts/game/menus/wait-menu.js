function WaitMenu( scene ) {
	Menu.call( this, scene );
	
	this.addItem( 'Waiting for another player...', this.selectCancel, true );
}

WaitMenu.prototype = new Menu;
WaitMenu.prototype.constructor = WaitMenu;

MultiplayerMenu.prototype.selectClose = function( ) {
	this.scene.addLayer( 'Menu', new MultiplayerMenu( this ) );
};