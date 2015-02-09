function TournamentScene( ) {
	Scene.call( this );
	
	this.tournamentTimer = 0;
	this.player;
	this.opponents = new Array( );
	this.currentIndex = -1;

	var backgroundLayer = this.addLayer( 'Background', new Layer( ) );
	
	var background = new Background( 'Background-Title' );
	backgroundLayer.addComponent( 'Background', background );

	this.titleText = new Text( 'PONG LAO' );
	this.titleText.fontFamily = 'MK Mythologies';
	this.titleText.fontSize = viewport.height * 0.11;
	this.titleText.position.y = viewport.height * 0.10;
	this.titleText.opacity = 1;
	backgroundLayer.addComponent( 'TitleText', this.titleText );

	this.tournamentText = new Text( 'TOURNAMENT' );
	this.tournamentText.fontFamily = 'MK Mythologies';
	this.tournamentText.fontSize = viewport.height * 0.07;
	this.tournamentText.position.y = viewport.height * 0.20;
	this.tournamentText.opacity = 1;
	backgroundLayer.addComponent( 'TournamentText', this.tournamentText );

	var backgroundLogo = new Sprite( 'Ball-Yin-Yang' );
	backgroundLogo.size.y = viewport.height * 1.25;
	backgroundLogo.size.x = backgroundLogo.size.y;
	backgroundLogo.opacity = 0.25;
	backgroundLogo.draw = function( context ) {
		context.save( );
		context.globalCompositeOperation = 'overlay';
		Sprite.prototype.draw.call( this, context );
		context.restore( );
	};
	backgroundLayer.addComponent( 'Background-Logo', backgroundLogo );

	this.textLayer = this.addLayer( 'Text', new Layer( ) );

	this.playerName = new Text( 'Player Name' );
	this.playerName.color = 'white';
	this.playerName.fontFamily = 'Anton';
	this.playerName.fontStyle = '800';
	this.playerName.fontSize = viewport.height * 0.25;
	this.playerName.position.x = -this.playerName.fontSize * 0.3;
	this.playerName.position.y = 0;
	this.playerName.textAlign = 'left';
	this.playerName.textBaseline = 'bottom';
	this.playerName.opacity = 0.11;
	this.playerName.rotation = 90;
	this.textLayer.addComponent( 'PlayerName', this.playerName );

	this.opponentName = new Text( 'Opponent Name' );
	this.opponentName.color = this.playerName.color;
	this.opponentName.fontFamily = this.playerName.fontFamily;
	this.opponentName.fontStyle = this.playerName.fontStyle;
	this.opponentName.fontSize = this.playerName.fontSize;
	this.opponentName.position.y = viewport.height;
	this.opponentName.position.x = viewport.width + this.opponentName.fontSize * 0.3;
	this.opponentName.textAlign = 'left';
	this.opponentName.opacity = this.playerName.opacity;
	this.opponentName.rotation = -90;
	this.opponentName.textBaseline = 'bottom';
	this.textLayer.addComponent( 'OpponentName', this.opponentName );

	this.matchRank = new Text( '0 of 0' );
	this.matchRank.color = 'white';
	this.matchRank.fontFamily = 'Apple Garamond';
	this.matchRank.fontSize = viewport.height * 0.05;
	this.matchRank.position.x = viewport.width * 0.48;
	this.matchRank.position.y = viewport.height * 0.90;
	this.matchRank.textAlign = 'right';
	this.textLayer.addComponent( 'MatchRank', this.matchRank );

	this.rankIcon = new Sprite( 'Icon-Trophy' );
	this.rankIcon.size.y = viewport.height * 0.06;
	this.rankIcon.size.x = this.rankIcon.size.y;
	this.rankIcon.position.x = this.matchRank.position.x - this.matchRank.size.x * 0.75;
	this.rankIcon.position.y = viewport.height * 0.90;
	this.textLayer.addComponent( 'RankIcon', this.rankIcon );

	this.tournamentTime = new Text( '00:00' );
	this.tournamentTime.color = this.matchRank.color;
	this.tournamentTime.fontFamily = this.matchRank.fontFamily;
	this.tournamentTime.fontSize = this.matchRank.fontSize;
	this.tournamentTime.position.x = viewport.width * 0.52;
	this.tournamentTime.position.y = viewport.height * 0.90;
	this.tournamentTime.textAlign = 'left';
	this.tournamentTime.update = function(deltaTime) {
		Text.prototype.update.call(this, deltaTime);

		var minutes = parseInt( app.tournament.tournamentTimer / 60 ) % 60;
		var seconds = parseInt( app.tournament.tournamentTimer ) % 60;
		this.text = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
	};
	this.textLayer.addComponent( 'TournamentTime', this.tournamentTime );

	this.timeIcon = new Sprite( 'Icon-Hourglass' );
	this.timeIcon.size.y = viewport.height * 0.06;
	this.timeIcon.size.x = this.timeIcon.size.y;
	this.timeIcon.position.x = this.tournamentTime.position.x + this.tournamentTime.size.x * 0.75;
	this.timeIcon.position.y = viewport.height * 0.90;
	this.textLayer.addComponent( 'TimeIcon', this.timeIcon );
	
	this.ladderLayer = this.addLayer( 'Ladder', new Layer( ) );

	if( app.settings.TUNES > 0 ) {
		this.music = new Sound( 'Music-Tournament' );
		this.music.setMaxVolume( 0.5 * app.settings.TUNES / 11 );
		this.music.loop( );
	}
}

TournamentScene.prototype = new Scene;
TournamentScene.prototype.constructor = TournamentScene;

TournamentScene.prototype.updateOut = function( transitionPercent ) {
	if( app.settings.TUNES > 0 ) {
		this.music.setVolume( 1 - transitionPercent );
	}
};

TournamentScene.prototype.updateIn = function( transitionPercent ) {
	if( app.settings.TUNES > 0 ) {
		if( !this.music.started ) {
			this.music.loop();
		}
		this.music.setVolume( transitionPercent );
	}
};

TournamentScene.prototype.unload = function( ) {
	if( app.settings.TUNES > 0 ) {
		this.music.stop( );
	}
};

TournamentScene.prototype.changePlayer = function( player ) {
	this.player = player;
	this.layers['Ladder'].components['Player'] = this.player.paddle;
	this.player.paddle.scale = 3.3;
	this.player.paddle.position.x = viewport.width * 0.25;
	this.player.paddle.position.y = viewport.height * 0.5;

	this.playerName.text = this.player.paddle.name.toUpperCase( );
	this.playerName.color = this.player.paddle.color.Hex( );
};

TournamentScene.prototype.startPlayer = function( player ) {
	this.changePlayer( player );
	
	for( var i = 2; i <= 6; i++ ) {
		if( i === Paddles[player.paddle.enum] ) {
			continue;
		}
		
		switch( i ) {
			case Paddles.BLUE : this.opponents.unshift( new BluePaddle( ) ); break;
			case Paddles.GREEN : this.opponents.unshift( new GreenPaddle( ) ); break;
			case Paddles.PURPLE : this.opponents.unshift( new PurplePaddle( ) ); break;
			case Paddles.RED : this.opponents.unshift( new RedPaddle( ) ); break;
			case Paddles.YELLOW : this.opponents.unshift( new YellowPaddle( ) ); break;
		}
	}
	
	var shuffle = function(o){ //v1.0
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};
	this.opponents = shuffle( this.opponents );
	
	this.opponents.push( new ShifterPaddle( ) );
	this.opponents.push( new MonolithPaddle( ) );
	this.opponents.push( new WhitePaddle( ) );
	
	for( var i = 0; i < this.opponents.length; i++ ) {
		var opponent = this.opponents[i];
		opponent.scale = 3.3;
		opponent.position.x = viewport.width * 0.75;
		opponent.position.y = viewport.height * 0.5 - (i+1) * viewport.height;
		//opponent.position.x = viewport.width / ( this.opponents.length + 1 ) * ( i + 1 );
		//opponent.position.y = viewport.height * 0.67;
		if( opponent.enum === 'MONOLITH' ) {
			opponent.size.y *= 0.88;
		}
		this.layers['Ladder'].addComponent( 'Opponent' + i, opponent );
	}
	//this.currentIndex = this.opponents.length - 2;
	this.increaseRank( );
};

TournamentScene.prototype.increaseRank = function( ) {
	this.currentIndex++;

	if( this.currentIndex < this.opponents.length ) {
		this.opponentName.text = this.opponents[this.currentIndex].name.toUpperCase( );
		this.opponentName.color = this.opponents[this.currentIndex].color.Hex();
	
		for( var i = 0; i < this.opponents.length; i++ ) {
			var opponent = this.opponents[i];
			opponent.position.y += viewport.height;
		}
	
		this.matchRank.text = (this.currentIndex + 1) + ' of ' + (this.opponents.length);
	}

	//this.player.paddle.position.x = viewport.width / ( this.opponents.length + 1 ) * ( this.currentIndex + 1 );
	//this.player.paddle.position.y = viewport.height * 0.33;
};

TournamentScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );
	
	if( InputManager.checkButtonPress( [ Buttons.ACTION, Buttons.BACK, Buttons.START ] ) || this.timeElapsed > 11 ) {
		InputManager.clear();
		var computer = new Opponent( );
		computer.setPaddle( Paddles[this.opponents[this.currentIndex].enum] );

		this.player.setPaddle( Paddles[this.player.paddle.enum] );
		
		var kombatScene = new KombatScene( );
		kombatScene.addKombatant( this.player );
		kombatScene.addKombatant( computer );
		kombatScene.setLevel( (this.opponents[this.currentIndex].enum === 'WHITE' ) ? Levels.DEFAULT : Levels.RANDOM );
		kombatScene.setBall( Balls.DEFAULT );
		SceneManager.changeScene( kombatScene, Transitions.NONE );
		//this.player.paddle.opacity = 0;
	}
};