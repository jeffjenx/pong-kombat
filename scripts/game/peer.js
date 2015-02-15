function Peer( ) {
	this.paddle = null;
	this.life = 0;
	this.roundsWon = 0;

	var that = this;
	app.p2p.on('server:update',function(peerData){
		that.updateFromServer(peerData);
	});
}

Peer.prototype.constructor = Peer;

Peer.prototype.draw = function( context ) {
	this.paddle.draw( context );
};

Peer.prototype.getNameSound = function() {
	if( this.paddle.nameSound ) {
		return this.paddle.nameSound;
	} else {
		var nameSound = new Sound( 'Their Paddle' );
		nameSound.setMaxVolume( 1 * app.settings.SOUND_FX / 11 );
		return nameSound;
	}
};

Peer.prototype.setPaddle = function( paddle ) {
	switch( paddle ) {
		case Paddles.RANDOM : this.setPaddle( Math.floor( 2 + Math.random( ) * 5 ) ); break; // 2 + RAND[1,5] refers to Paddles ENUM
		case Paddles.BLUE : this.paddle = new BluePaddle( ); break;
		case Paddles.YELLOW : this.paddle = new YellowPaddle( ); break;
		case Paddles.RED : this.paddle = new RedPaddle( ); break;
		case Paddles.GREEN : this.paddle = new GreenPaddle( ); break;
		case Paddles.PURPLE : this.paddle = new PurplePaddle( ); break;
		case Paddles.WHITE : this.paddle = new WhitePaddle( ); break;
		case Paddles.SHIFTER : this.paddle = new ShifterPaddle( ); break;
		case Paddles.MONOLITH : this.paddle = new MonolithPaddle( ); break;
		case Paddles.MRSLAYER : this.paddle = new MrSlayerPaddle( ); break;
		case Paddles.MYST : this.paddle = new MystPaddle( ); break;
		case Paddles.PADDLEBOT : this.paddle = new PaddleBot( ); break;
	}

	this.paddle.rotation = 180;
	this.paddle.kombatant = this;

	this.paddle.restrictToBounds = function( ) {
		var paddingBottom = viewport.height;
		var paddingTop = SceneManager.currentScene.layers['HUD'].components['HUD'].size.y;
		var paddingLeft = viewport.width * 0.5;
		var paddingRight = viewport.width;
		
		if( ( this.velocity.y > 0 && this.boundingBox.bottom >= paddingBottom ) || ( this.velocity.y < 0 && this.boundingBox.top <= paddingTop ) )
		{
			this.velocity.y = 0;
		}

		if( ( this.velocity.x > 0 && this.boundingBox.right >= paddingRight ) || ( this.velocity.x < 0 && this.boundingBox.left <= paddingLeft ) )
		{
			this.velocity.x = 0;
		}
	};
};

Peer.prototype.update = function( deltaTime ){
	if( this.life < 0 ) {
		this.life = 0;
	}
	
	this.paddle.update( deltaTime );
};

Peer.prototype.updateFromServer = function( peerData ) {
	if(this.client === peerData.client && peerData.component === 'paddle') {
		this.paddle.position.x = viewport.width - peerData.x;
		this.paddle.position.y = peerData.y;
		this.paddle.size.x = peerData.w;
		this.paddle.size.y = peerData.h;
		this.paddle.scale = peerData.s;
		console.log(this.paddle.scale);
	}
};