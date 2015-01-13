function HUDLayer( scene ) {
	Layer.call( this, scene );
	
	this.healthBarWidth = viewport.width * 0.411;
	
	var hud = new Sprite( 'HUD' );
	hud.position.x = viewport.width * 0.50;
	hud.position.y = 0;
	hud.registration.y = 0;
	hud.size.x = viewport.width;
	hud.size.y = viewport.height * 0.07;
	this.addComponent( 'HUD', hud );
	
	this.pk = new Sprite( 'PK' );
	this.pk.position.x = viewport.width * 0.50;
	this.pk.position.y = hud.size.y * 0.40;
	this.pk.size.x = viewport.height * 0.09;
	this.pk.size.y = viewport.height * 0.06;
	this.addComponent( 'PK', this.pk );
	
	this.leftHealthBar = new Sprite( 'Health' );
	this.leftHealthBar.position.x = viewport.width * 0.043;
	this.leftHealthBar.position.y = viewport.height * 0.009;
	this.leftHealthBar.registration.x = 0;
	this.leftHealthBar.registration.y = 0;
	this.leftHealthBar.size.x = this.healthBarWidth;
	this.leftHealthBar.size.y = viewport.height * 0.038;
	this.addComponent( 'LeftHealthBar', this.leftHealthBar );
	
	this.rightHealthBar = new Sprite( 'Health' );
	this.rightHealthBar.position.x = viewport.width - this.leftHealthBar.position.x;
	this.rightHealthBar.position.y = this.leftHealthBar.position.y;
	this.rightHealthBar.registration.x = 1;
	this.rightHealthBar.registration.y = 0;
	this.rightHealthBar.size.x = this.leftHealthBar.size.x;
	this.rightHealthBar.size.y = this.leftHealthBar.size.y;
	this.addComponent( 'RightHealthBar', this.rightHealthBar );
	
	var leftName = new Text( );
	leftName.color = 'white';
	leftName.fontFamily = 'Apple Garamond';
	leftName.fontSize = viewport.height * 0.03;
	leftName.fontStyle = 200;
	leftName.textAlign = 'left';
	leftName.textBaseline = 'top';
	leftName.position.x = this.leftHealthBar.position.x + viewport.width * 0.01;
	leftName.position.y = this.leftHealthBar.position.y;
	this.addComponent( 'LeftName', leftName );
	
	var rightName = new Text( );
	rightName.color = leftName.color;
	rightName.fontFamily = leftName.fontFamily;
	rightName.fontSize = leftName.fontSize;
	rightName.fontStyle = leftName.fontStyle;
	rightName.textAlign = 'right';
	rightName.textBaseline = 'top';
	rightName.position.x = this.rightHealthBar.position.x - viewport.width * 0.01;
	rightName.position.y = this.rightHealthBar.position.y;
	this.addComponent( 'RightName', rightName );

	this.bounce = new Sprite( 'Bounce' );
	this.bounce.size.y = viewport.height * 0.2;
	this.bounce.size.x = this.bounce.size.y * 3;

	this.winner = new Text( );
	this.winner.color = 'white';
	this.winner.fontFamily = 'Apple Garamond';
	this.winner.fontSize = viewport.height * 0.08;
	this.winner.position.y = viewport.height * 0.30;
	this.winner.textShadow = {
		color : 'black',
		blur : 1,
		x : 1,
		y : 1
	};

	this.flawless = new Text( 'Mint Condition' );
	this.flawless.color = this.winner.color;
	this.flawless.fontFamily = this.winner.fontFamily;
	this.flawless.fontSize = viewport.height * 0.05;
	this.flawless.position.y = viewport.height * 0.7;

	this.dismantled = new Sprite( 'Dismantled' );
	this.dismantled.size.y = viewport.height * 0.13;
	this.dismantled.size.x = this.dismantled.size.y * 6;
	this.dismantled.position.y = viewport.height * 0.45;
	this.dismantled.rotation = -5;

	this.finishem = new Sprite( 'Finish-Em' );
	this.finishem.size.y = viewport.height * 0.2;
	this.finishem.size.x = this.finishem.size.y * 4;
}

HUDLayer.prototype = new Layer;
HUDLayer.prototype.constructor = HUDLayer;

HUDLayer.prototype.draw = function( context ) {
	Layer.prototype.draw.call( this, context );

	if( this.scene.state === this.scene.states.starting ) {
		this.bounce.draw( context );
	}

	if( this.scene.state === this.scene.states.ending ) {
		this.winner.draw( context );

		if( this.scene.finishType === this.scene.finishTypes.dismantled ) {
			this.dismantled.draw( context );
		}

		if( this.scene.winner.life === this.scene.startLife ) {
			this.flawless.draw( context );
		}
	}

	if( this.scene.state === this.scene.states.announcing ) {
		this.finishem.draw( context );
	}
};

HUDLayer.prototype.addAnnouncement = function( announcement ) {
	var announcement = new Text( announcement );
	announcement.color = 'yellow';
	announcement.fontSize = viewport.height * 0.10;
	announcement.textAlign = 'center';
	announcement.opacity = 1;
	announcement.position.x = viewport.width * 0.50;
	announcement.position.y = viewport.height * 0.50;
	this.addComponent( 'Announcement', announcement );
};

HUDLayer.prototype.updateWinner = function( ) {
	if( this.scene.winner ) {
		this.winner.text = this.scene.winner.paddle.name + ' Wins';
	}
};

HUDLayer.prototype.cinemaMode = function( ) {
	var letterBox;
	var letterBoxTop;
	
	if( !this.components['LetterBox'] ) {
		letterBox = new Sprite( 'Black' );
		letterBox.registration.y = 1;
		letterBox.size.x = viewport.width;
		letterBox.size.y = viewport.height;// * 0.10;
		letterBox.size.y *= 0.51; //( app.settings.censored ) ? 0.51 : 0.10;
		letterBox.position.x = viewport.width * 0.50;
		letterBox.position.y = viewport.height + letterBox.size.y;
		letterBox.velocity.y = -viewport.height * 0.22;
		this.addComponent( 'LetterBox', letterBox );
		
		letterBoxTop = new Sprite( 'Black' );
		letterBoxTop.registration.y = 0;
		letterBoxTop.size.x = viewport.width;
		letterBoxTop.size.y = viewport.height;// * 0.10;
		letterBoxTop.size.y *= 0.51; //( app.settings.censored ) ? 0.51 : 0.10;
		letterBoxTop.position.x = viewport.width * 0.50;
		letterBoxTop.position.y = -letterBoxTop.size.y;
		letterBoxTop.velocity.y = viewport.height * 0.22;
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

	if( this.scene.state === this.scene.states.dismantling )
 	{
 		this.cinemaMode( );
 	}	

	// Drain health gradually
	if( leftKombatant )
	{
		if( leftKombatant.life / this.scene.startLife < this.leftHealthBar.size.x / this.healthBarWidth ) {
			this.leftHealthBar.size.x -= viewport.width * 0.05 * deltaTime;
		}
		else if( leftKombatant.life / this.scene.startLife > this.leftHealthBar.size.x / this.healthBarWidth ) {
			this.leftHealthBar.size.x += viewport.width * 0.05 * deltaTime;
		}
	}
	
	if( rightKombatant )
	{
		if( rightKombatant.life / this.scene.startLife < this.rightHealthBar.size.x / this.healthBarWidth ) {
			this.rightHealthBar.size.x -= viewport.width * 0.05 * deltaTime;
		}
		else if( rightKombatant.life / this.scene.startLife > this.rightHealthBar.size.x / this.healthBarWidth ) {
			this.rightHealthBar.size.x += viewport.width * 0.05 * deltaTime;
		}
	}

	/*
	var announcement = this.components['Announcement'];
	if( announcement && announcement.opacity > 0 ) {
		announcement.opacity = Math.max( announcement.opacity - deltaTime / 2.5, 0 );
		announcement.scale = (1 - announcement.opacity / 3) + 1;
	}
	*/
	
	Layer.prototype.update.call( this, deltaTime );
};