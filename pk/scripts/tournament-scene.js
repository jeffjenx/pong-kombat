function TournamentScene( ) {	Scene.call( this );
	
	this.player;
	this.opponents = new Array( );
	this.currentIndex = -1;
	
	var layer = this.addLayer( 'Tournament', new Layer( ) );
	var titleText = new Text( 'Pong Lao Tournament' );
	titleText.color = 'white';
	titleText.position.x = viewport.width * 0.50;
	titleText.position.y = viewport.height * 0.10;
	titleText.fontSize = viewport.height * 0.10;
	layer.addComponent( 'TitleText', titleText );}TournamentScene.prototype = new Scene;TournamentScene.prototype.constructor = TournamentScene;

TournamentScene.prototype.startPlayer = function( player ) {
	this.player = player;
	
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
		opponent.position.x = viewport.width / ( this.opponents.length + 1 ) * ( i + 1 );
		opponent.position.y = viewport.height * 0.67;
		this.layers['Tournament'].addComponent( 'Opponent' + i, opponent );
	}
	
	this.layers['Tournament'].addComponent( 'Player', this.player.paddle );
	this.increaseRank( );
};

TournamentScene.prototype.increaseRank = function( ) {
	this.currentIndex++;
	this.player.paddle.position.x = viewport.width / ( this.opponents.length + 1 ) * ( this.currentIndex + 1 );
	this.player.paddle.position.y = viewport.height * 0.33;
};

TournamentScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );
	
	if( InputManager.checkButtonPress( Buttons.ACTION ) ) {
		var computer = new Opponent( );
		computer.setPaddle( Paddles[this.opponents[this.currentIndex].enum] );
		
		var kombatScene = new KombatScene( );
		
kombatScene.addKombatant( this.player );
		kombatScene.addKombatant( computer );
		kombatScene.setLevel( Levels.RANDOM );
		SceneManager.changeScene( kombatScene, Transitions.NONE );
	}
};