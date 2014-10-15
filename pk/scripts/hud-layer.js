function HUDLayer( scene ) {
	Layer.call( this, scene );
	
	var leftHealth = new Sprite( 'Ball' );
	leftHealth.position.x = 0;
	leftHealth.position.y = 0;
	leftHealth.registration.x = 0;
	leftHealth.registration.y = 0;
	leftHealth.size.x = viewport.width * 0.50;
	leftHealth.size.y = viewport.height * 0.05;
	leftHealth.tint = new Color( 0, 255, 0 );
	this.addComponent( 'LeftHealth', leftHealth );
	
	var leftName = new Text( );
	leftName.color = 'white';
	leftName.fontSize = viewport.height * 0.03;
	leftName.textAlign = 'left';
	leftName.textBaseline = 'top';
	leftName.position.x = 0;
	leftName.position.y = 0;
	this.addComponent( 'LeftName', leftName );
	
	var rightHealth = new Sprite( 'Ball' );
	rightHealth.position.x = viewport.width;
	rightHealth.position.y = 0;
	rightHealth.registration.x = 1;
	rightHealth.registration.y = 0;
	rightHealth.size.x = viewport.width * 0.50;
	rightHealth.size.y = viewport.height * 0.05;
	rightHealth.tint = new Color( 0, 255, 0 );
	this.addComponent( 'RightHealth', rightHealth );
	
	var rightName = new Text( );
	rightName.color = 'white';
	rightName.fontSize = viewport.height * 0.03;
	rightName.textAlign = 'right';
	rightName.textBaseline = 'top';
	rightName.position.x = viewport.width;
	rightName.position.y = 0;
	this.addComponent( 'RightName', rightName );
	
	var announcement = new Text( 'Bounce' );
	announcement.color = 'white';
	announcement.fontSize = viewport.height * 0.10;
	announcement.textAlign = 'center';
	announcement.position.x = viewport.width * 0.50;
	announcement.position.y = viewport.height * 0.50;
	this.addComponent( 'Announcement', announcement );
}

HUDLayer.prototype = new Layer;
HUDLayer.prototype.constructor = HUDLayer;

HUDLayer.prototype.update = function( deltaTime ) {
	var leftKombatant = this.scene.layers['Kombat'].components['LeftKombatant'];
	var rightKombatant = this.scene.layers['Kombat'].components['RightKombatant'];
	
	this.components['LeftHealth'].size.x = viewport.width * 0.50 - viewport.width * 0.50 * ( rightKombatant.score / this.scene.winningScore );
	this.components['RightHealth'].size.x = viewport.width * 0.50 - viewport.width * 0.50 * ( leftKombatant.score / this.scene.winningScore );
	
	Layer.prototype.update.call( this, deltaTime );
};