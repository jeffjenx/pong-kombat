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
}

HUDLayer.prototype = new Layer;
HUDLayer.prototype.constructor = HUDLayer;

HUDLayer.prototype.addAnnouncement = function( announcement ) {
	var announcement = new Text( announcement );
	announcement.color = 'white';
	announcement.fontSize = viewport.height * 0.10;
	announcement.textAlign = 'center';
	announcement.position.x = viewport.width * 0.50;
	announcement.position.y = viewport.height * 0.50;
	this.addComponent( 'Announcement', announcement );
};

HUDLayer.prototype.cinemaMode = function( ) {
	var letterBox;
	var letterBoxTop;
	
	if( !this.components['LetterBox'] ) {
		letterBox = new Sprite( 'Black' );
		letterBox.registration.y = 1;
		letterBox.size.x = viewport.width;
		letterBox.size.y = viewport.height;// * 0.10;
		letterBox.size.y *= ( app.settings.censored ) ? 0.51 : 0.10;
		letterBox.position.x = viewport.width * 0.50;
		letterBox.position.y = viewport.height + letterBox.size.y;
		letterBox.velocity.y = -viewport.height * 0.10;
		this.addComponent( 'LetterBox', letterBox );
		
		letterBoxTop = new Sprite( 'Black' );
		letterBoxTop.registration.y = 0;
		letterBoxTop.size.x = viewport.width;
		letterBoxTop.size.y = viewport.height;// * 0.10;
		letterBoxTop.size.y *= ( app.settings.censored ) ? 0.51 : 0.10;
		letterBoxTop.position.x = viewport.width * 0.50;
		letterBoxTop.position.y = -letterBoxTop.size.y;
		letterBoxTop.velocity.y = viewport.height * 0.10;
		this.addComponent( 'LetterBoxTop', letterBoxTop );
	} else {
		letterBox = this.components['LetterBox'];
		letterBoxTop = this.components['LetterBoxTop'];
	}
	
	if( letterBoxTop.position.y >= 0 ) {
		letterBox.position.y = viewport.height;
		letterBox.velocity.y = 0;
		letterBoxTop.position.y = 0;
		letterBoxTop.velocity.y = 0;
	}
};

HUDLayer.prototype.update = function( deltaTime ) {
	var leftKombatant = this.scene.layers['Kombat'].components['LeftKombatant'];
	var rightKombatant = this.scene.layers['Kombat'].components['RightKombatant'];
	
	this.components['LeftHealth'].size.x = viewport.width * 0.50 - viewport.width * 0.50 * ( rightKombatant.score / this.scene.winningScore );
	this.components['RightHealth'].size.x = viewport.width * 0.50 - viewport.width * 0.50 * ( leftKombatant.score / this.scene.winningScore );
	
	Layer.prototype.update.call( this, deltaTime );
};