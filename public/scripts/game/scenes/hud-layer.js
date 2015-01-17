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
	this.leftHealthBar.position.y = hud.size.y * 0.48;
	this.leftHealthBar.registration.x = 0;
	this.leftHealthBar.registration.y = 0.5;
	this.leftHealthBar.size.x = this.healthBarWidth;
	this.leftHealthBar.size.y = hud.size.y * 0.42;
	this.addComponent( 'LeftHealthBar', this.leftHealthBar );
	
	this.rightHealthBar = new Sprite( 'Health' );
	this.rightHealthBar.position.x = viewport.width - this.leftHealthBar.position.x;
	this.rightHealthBar.position.y = this.leftHealthBar.position.y;
	this.rightHealthBar.registration.x = 1;
	this.rightHealthBar.registration.y = 0.5;
	this.rightHealthBar.size.x = this.leftHealthBar.size.x;
	this.rightHealthBar.size.y = this.leftHealthBar.size.y;
	this.addComponent( 'RightHealthBar', this.rightHealthBar );
	
	var leftName = new Text( );
	leftName.color = 'white';
	leftName.fontFamily = 'Apple Garamond';
	leftName.fontSize = this.leftHealthBar.size.y * 0.75;
	leftName.fontStyle = 200;
	leftName.textAlign = 'left';
	leftName.textBaseline = 'middle';
	leftName.opacity = 0.5;
	leftName.position.x = this.leftHealthBar.position.x + viewport.width * 0.005;
	leftName.position.y = this.leftHealthBar.position.y * 0.95;
	this.addComponent( 'LeftName', leftName );
	
	var rightName = new Text( );
	rightName.color = leftName.color;
	rightName.fontFamily = leftName.fontFamily;
	rightName.fontSize = leftName.fontSize;
	rightName.fontStyle = leftName.fontStyle;
	rightName.textAlign = 'right';
	rightName.textBaseline = 'middle';
	rightName.opacity = leftName.opacity;
	rightName.position.x = this.rightHealthBar.position.x - viewport.width * 0.005;
	rightName.position.y = this.leftHealthBar.position.y;
	this.addComponent( 'RightName', rightName );

	var leftIcon = new Sprite( 'White' );
	leftIcon.size.y = hud.size.y * 0.80;
	leftIcon.size.x = leftIcon.size.y;
	leftIcon.position.x = viewport.width * 0.024;
	leftIcon.position.y = hud.size.y * 0.47;
	// component added to layer after icon border below

	var leftIconBorder = new Component( );
	leftIconBorder.color = new Color(150, 150, 150);
	leftIconBorder.size.x = leftIcon.size.x;
	leftIconBorder.size.y = leftIcon.size.y;
	leftIconBorder.position.x = leftIcon.position.x;
	leftIconBorder.position.y = leftIcon.position.y;
	leftIconBorder.draw = function( context ) {
		context.save();
		context.beginPath();
		context.rect(
			this.position.x - this.size.x / 2,
			this.position.y - this.size.y / 2,
			this.size.x,
			this.size.y
		);
		context.strokeStyle = this.color.RGB();
		context.lineWidth = viewport.height * 0.005;
		context.stroke();
		context.restore();
	};
	this.addComponent( 'LeftIconBorder', leftIconBorder );
	this.addComponent( 'LeftIcon', leftIcon ); // layer ordering

	var leftIconBlood = new Sprite( 'Paddle-Icon-Full-Life' );
	leftIconBlood.size.x = leftIcon.size.x;
	leftIconBlood.size.y = leftIcon.size.y;
	leftIconBlood.position.x = leftIcon.position.x;
	leftIconBlood.position.y = leftIcon.position.y;
	this.addComponent( 'LeftIconBlood', leftIconBlood );

	var rightIcon = new Sprite( 'White' );
	rightIcon.size.y = leftIcon.size.x;
	rightIcon.size.x = leftIcon.size.y;
	rightIcon.position.x = viewport.width - leftIcon.position.x;
	rightIcon.position.y = leftIcon.position.y;
	rightIcon.flipH = true;
	// component added to layer after icon border below

	var rightIconBorder = new Component( );
	rightIconBorder.color = new Color(150, 150, 150);
	rightIconBorder.size.x = rightIcon.size.x;
	rightIconBorder.size.y = rightIcon.size.y;
	rightIconBorder.position.x = rightIcon.position.x;
	rightIconBorder.position.y = rightIcon.position.y;
	rightIconBorder.draw = function( context ) {
		context.save();
		context.beginPath();
		context.rect(
			this.position.x - this.size.x / 2,
			this.position.y - this.size.y / 2,
			this.size.x,
			this.size.y
		);
		context.strokeStyle = this.color.RGB();
		context.lineWidth = viewport.height * 0.005;
		context.stroke();
		context.restore();
	};
	this.addComponent( 'RightIconBorder', rightIconBorder );
	this.addComponent( 'RightIcon', rightIcon );

	var rightIconBlood = new Sprite( 'Paddle-Icon-Full-Life' );
	rightIconBlood.size.x = rightIcon.size.x;
	rightIconBlood.size.y = rightIcon.size.y;
	rightIconBlood.position.x = rightIcon.position.x;
	rightIconBlood.position.y = rightIcon.position.y;
	this.addComponent( 'RightIconBlood', rightIconBlood );

	var leftStats = new Text( '' );
	leftStats.color = 'white';
	leftStats.fontFamily = 'Open Sans';
	leftStats.fontSize = hud.size.y * 0.15;
	leftStats.position.x = this.leftHealthBar.position.x + leftStats.fontSize;
	leftStats.position.y = this.leftHealthBar.position.y * 1.75;
	leftStats.textAlign = 'left';
	leftStats.opacity = 0.5;
	this.addComponent( 'LeftStats', leftStats );

	var leftRounds = new Text( '' );
	leftRounds.color = leftStats.color;
	leftRounds.fontFamily = leftStats.fontFamily;
	leftRounds.fontSize = leftStats.fontSize;
	leftRounds.position.x = leftStats.position.x + this.healthBarWidth - leftStats.fontSize * 2;
	leftRounds.position.y = leftStats.position.y;
	leftRounds.textAlign = 'right';
	leftStats.opacity = 0.5;
	this.addComponent( 'LeftRounds', leftRounds );

	var rightStats = new Text( '' );
	rightStats.color = 'white';
	rightStats.fontFamily = 'Open Sans';
	rightStats.fontSize = hud.size.y * 0.15;
	rightStats.position.x = this.rightHealthBar.position.x - rightStats.fontSize;
	rightStats.position.y = this.rightHealthBar.position.y * 1.75;
	rightStats.textAlign = 'right';
	rightStats.opacity = 0.5;
	this.addComponent( 'RightStats', rightStats );

	var rightRounds = new Text( '' );
	rightRounds.color = rightStats.color;
	rightRounds.fontFamily = rightStats.fontFamily;
	rightRounds.fontSize = rightStats.fontSize;
	rightRounds.position.x = rightStats.position.x - this.healthBarWidth + rightStats.fontSize * 2;
	rightRounds.position.y = rightStats.position.y;
	rightRounds.textAlign = 'right';
	rightStats.opacity = 0.5;
	this.addComponent( 'RightRounds', rightRounds );

	this.bounce = new Sprite( 'Bounce' );
	this.bounce.opacity = 0;
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
	this.flawless.fontSize = viewport.height * 0.04;
	this.flawless.position.y = viewport.height * 0.7;

	this.dismantled = new Sprite( 'Dismantled' );
	this.dismantled.size.y = viewport.height * 0.13;
	this.dismantled.size.x = this.dismantled.size.y * 6;
	this.dismantled.position.y = viewport.height * 0.45;
	this.dismantled.rotation = -5;

	this.finishem = new Sprite( 'Finish-Em' );
	this.finishem.size.y = viewport.height * 0.2;
	this.finishem.size.x = this.finishem.size.y * 4;

	this.currentRound = new Text( 'Round 1' );
	this.currentRound.color = this.flawless.color;
	this.currentRound.fontFamily = this.flawless.fontFamily;
	this.currentRound.fontSize = this.flawless.fontSize;
	this.currentRound.position.y = this.flawless.position.y;
	this.currentRound.opacity = 0;

	this.dismantledSound = new Sound( 'Dismantled!' );
	this.flawlessSound = new Sound( 'Mint-Condition' );
	this.finishEmSound = new Sound( 'Finish-Em!' );
	this.winsSound = new Sound( 'Wins' );
	this.bounceSound = new Sound( 'Bounce!' );
	this.roundSound = new Sound( 'Round' );
	this.roundNumberSounds = [];
	for( var i = 1; i <= 11; i++ ) {
		this.roundNumberSounds.push( new Sound( this.numberToWord(i) ) );
	}
}

HUDLayer.prototype = new Layer;
HUDLayer.prototype.constructor = HUDLayer;

HUDLayer.prototype.resetSounds = function() {
	this.dismantledSound.started = false;
	this.flawlessSound.started = false;
	this.finishEmSound.started = false;
	this.bounceSound.started = false;
	this.roundSound.started = false;
	this.winsSound.started = false;

	this.dismantledSound.played = false;
	this.flawlessSound.played = false;
	this.finishEmSound.played = false;
	this.bounceSound.played = false;
	this.roundSound.played = false;
	this.winsSound.played = false;
};

HUDLayer.prototype.draw = function( context ) {
	Layer.prototype.draw.call( this, context );

	switch( this.scene.state ) {
		case this.scene.states.starting :
			this.currentRound.draw( context );
			this.bounce.draw( context );
		break;

		case this.scene.states.ending :
			this.winner.draw( context );

			if( this.scene.finishType === this.scene.finishTypes.dismantled && this.scene.stateTime > 3 ) {
				this.dismantled.draw( context );
			}

			if( this.scene.winner.life === this.scene.startLife && this.scene.stateTime > 5 ) {
				this.flawless.draw( context );
			}
		break;

		case this.scene.states.announcing :
			if( this.scene.stateTime > 1) {
				this.finishem.draw( context );
			}
		break;
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

HUDLayer.prototype.setLeft = function( kombatant ) {
	this.components['LeftIcon'].image = kombatant.paddle.icon;
	this.components['LeftName'].text = kombatant.paddle.name;
};

HUDLayer.prototype.setRight = function( kombatant ) {
	this.components['RightIcon'].image = kombatant.paddle.icon;
	this.components['RightName'].text = kombatant.paddle.name;
};

HUDLayer.prototype.cinemaMode = function( ) {
	var letterBox;
	var letterBoxTop;
	
	if( !this.components['LetterBox'] ) {
		letterBox = new Sprite( 'Black' );
		letterBox.registration.y = 1;
		letterBox.size.x = viewport.width;
		letterBox.size.y = viewport.height;
		letterBox.size.y *= ( app.settings.CENSORSHIP ) ? 0.51 : 0.10;
		letterBox.position.x = viewport.width * 0.50;
		letterBox.position.y = viewport.height + letterBox.size.y;
		letterBox.velocity.y = -viewport.height * 0.22;
		this.addComponent( 'LetterBox', letterBox );
		
		letterBoxTop = new Sprite( 'Black' );
		letterBoxTop.registration.y = 0;
		letterBoxTop.size.x = viewport.width;
		letterBoxTop.size.y = viewport.height;
		letterBoxTop.size.y *= ( app.settings.CENSORSHIP ) ? 0.51 : 0.10;
		letterBoxTop.position.x = viewport.width * 0.50;
		letterBoxTop.position.y = -letterBoxTop.size.y;
		letterBoxTop.velocity.y = viewport.height * 0.22;
		this.addComponent( 'LetterBoxTop', letterBoxTop );
	} else {
		letterBox = this.components['LetterBox'];
		letterBoxTop = this.components['LetterBoxTop'];
	}
	
	if( letterBoxTop.position.y > 0 ) {
		letterBoxTop.position.y = 0;
		letterBoxTop.velocity.y = 0;
	}

	if( letterBox.position.y < viewport.height ) {
		letterBox.position.y = viewport.height;
		letterBox.velocity.y = 0;
	}
};

HUDLayer.prototype.numberToWord = function( number ) {
	var words = ['One','Two','Three','Four', 'Five','Six','Seven','Eight','Nine','Ten','Eleven'];
	return words[parseInt(number) - 1];
};

HUDLayer.prototype.update = function( deltaTime ) {
	var leftKombatant = this.scene.layers['Kombat'].components['LeftKombatant'];
	var rightKombatant = this.scene.layers['Kombat'].components['RightKombatant'];


	switch( this.scene.state ) {
		case this.scene.states.starting :
			if( this.scene.stateTime > 3 ) {
				var elapsedTime = this.scene.stateTime - 3;
				this.bounce.scale = 0.5 + elapsedTime / 3;
				this.bounce.opacity = Math.max( (2 - elapsedTime) / 2, 0 );
				this.bounceSound.playOnce();
			}
			if( this.scene.stateTime > 1 ) {
				this.currentRound.opacity = 1;
				this.roundSound.playOnce();
				if( this.roundSound.played ) {
					this.roundNumberSounds[this.scene.currentRound - 1].playOnce();
				}
			}
		break;

		case this.scene.states.announcing :
			if( this.scene.stateTime > 1 ) {
				this.finishEmSound.playOnce();
			}
		break;

		case this.scene.states.ending :
			this.scene.winner.getNameSound().playOnce();
			if( this.scene.winner.getNameSound().played ) {
				this.winsSound.playOnce();
			}

			if( this.scene.finishType === this.scene.finishTypes.dismantled && this.scene.stateTime > 3 ) {
				this.dismantledSound.playOnce();
			}

			if( this.scene.winner.life === this.scene.startLife && this.scene.stateTime > 5 ) {
				this.flawlessSound.playOnce();
			}
		break;
	}

	// Drain health gradually
	if( leftKombatant )
	{
		if( leftKombatant.life / this.scene.startLife < this.leftHealthBar.size.x / this.healthBarWidth ) {
			this.leftHealthBar.size.x = Math.max( this.leftHealthBar.size.x - viewport.width * 0.05 * deltaTime, leftKombatant.life / this.scene.startLife * this.healthBarWidth );
			//this.leftHealthBar.size.x -= viewport.width * 0.05 * deltaTime;
		}
		else if( leftKombatant.life / this.scene.startLife > this.leftHealthBar.size.x / this.healthBarWidth ) {
			this.leftHealthBar.size.x = Math.max( this.leftHealthBar.size.x + viewport.width * 0.05 * deltaTime, leftKombatant.life / this.scene.startLife * this.healthBarWidth );
			//this.leftHealthBar.size.x += viewport.width * 0.05 * deltaTime;
		}

		this.components['LeftIconBorder'].color.green = 150 * leftKombatant.life / this.scene.startLife;
		this.components['LeftIconBorder'].color.blue = 150 * leftKombatant.life / this.scene.startLife;

		if( !app.settings.CENSORSHIP ) {
			var leftIconBlood = this.components['LeftIconBlood'];
			if( leftKombatant.life / this.scene.startLife < 0.25 ) {
				leftIconBlood.image = Resources['Paddle-Icon-Low-Life'];
			} else if( leftKombatant.life / this.scene.startLife < 0.65 ) {
				leftIconBlood.image = Resources['Paddle-Icon-Medium-Life'];
			} else if( leftKombatant.life / this.scene.startLife < 0.85 ) {
				leftIconBlood.image = Resources['Paddle-Icon-High-Life'];
			} else {
				leftIconBlood.image = Resources['Paddle-Icon-Full-Life'];
			}
		}
	}
	
	if( rightKombatant )
	{
		if( rightKombatant.life / this.scene.startLife < this.rightHealthBar.size.x / this.healthBarWidth ) {
			this.rightHealthBar.size.x = Math.max( this.rightHealthBar.size.x - viewport.width * 0.05 * deltaTime, rightKombatant.life / this.scene.startLife * this.healthBarWidth );
			//this.rightHealthBar.size.x -= viewport.width * 0.05 * deltaTime;
		}
		else if( rightKombatant.life / this.scene.startLife > this.rightHealthBar.size.x / this.healthBarWidth ) {
			this.rightHealthBar.size.x = Math.max( this.rightHealthBar.size.x + viewport.width * 0.05 * deltaTime, rightKombatant.life / this.scene.startLife * this.healthBarWidth );
			//this.rightHealthBar.size.x += viewport.width * 0.05 * deltaTime;
		}

		this.components['RightIconBorder'].color.green = 150 * rightKombatant.life / this.scene.startLife;
		this.components['RightIconBorder'].color.blue = 150 * rightKombatant.life / this.scene.startLife;

		if( !app.settings.CENSORSHIP ) {
			var rightIconBlood = this.components['RightIconBlood'];
			if( rightKombatant.life / this.scene.startLife < 0.25 ) {
				rightIconBlood.image = Resources['Paddle-Icon-Low-Life'];
			} else if( rightKombatant.life / this.scene.startLife < 0.65 ) {
				rightIconBlood.image = Resources['Paddle-Icon-Medium-Life'];
			} else if( rightKombatant.life / this.scene.startLife < 0.85 ) {
				rightIconBlood.image = Resources['Paddle-Icon-High-Life'];
			} else {
				rightIconBlood.image = Resources['Paddle-Icon-Full-Life'];
			}
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

	// after layer call
	if( this.scene.state === this.scene.states.dismantling )
 	{
 		this.cinemaMode( );
 	}	
};