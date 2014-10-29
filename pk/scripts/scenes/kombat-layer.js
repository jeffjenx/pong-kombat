function KombatLayer( scene ) {
	Layer.call( this, scene );
	
	this.nextPowerup = this.scene.timeElapsed + 5 + Math.random( ) * 5;
}

KombatLayer.prototype = new Layer;
KombatLayer.prototype.constructor = KombatLayer;

KombatLayer.prototype.centerPaddles = function( ) {
	var leftKombatant = this.components['LeftKombatant'];
	var rightKombatant = this.components['RightKombatant'];
	
	if( leftKombatant.paddle.position.y > viewport.height * 0.51 ) {
		leftKombatant.paddle.moveUp( );
	} else if( leftKombatant.paddle.position.y < viewport.height * 0.49 ) {
		leftKombatant.paddle.moveDown( );
	} else {
		leftKombatant.paddle.position.y = viewport.height * 0.50;
	}
	
	if( rightKombatant.paddle.position.y > viewport.height * 0.51 ) {
		rightKombatant.paddle.moveUp( );
	} else if( rightKombatant.paddle.position.y < viewport.height * 0.49 ) {
		rightKombatant.paddle.moveDown( );
	} else {
		rightKombatant.paddle.position.y = viewport.height * 0.50;
	}
};

KombatLayer.prototype.setBall = function( ballType ) {
	switch( ballType ) {
		case Balls.RANDOM :
			var count = 0;
			for( var i in Balls) {
				if( Balls.hasOwnProperty(i) && i !== "RANDOM" ) {
					++count;
				}
			}
			return this.setBall( Math.ceil( Math.random( ) * count ) );
		break;
		case Balls.BASKETBALL : ball = new Basketball( ); break;
		case Balls.EIGHTBALL : ball = new EightBall( ); break;
		case Balls.BASEBALL : ball = new Baseball( ); break;
		case Balls.EARTH : ball = new EarthBall( ); break;
		case Balls.SMILEY : ball = new SmileyBall( ); break;
		
		case Balls.DEFAULT :
		default :
			ball = new DefaultBall( );
		break;
	}
	
	ball.set( );
	this.addComponent( 'Ball', ball );
};

KombatLayer.prototype.addKombatant = function( kombatant ) {
	if( this.components['LeftKombatant'] ) {
		kombatant.paddle.position.x = viewport.width * 0.98;
		this.addComponent( 'RightKombatant', kombatant );
		this.scene.layers['HUD'].components['RightName'].text = kombatant.paddle.name;
	} else {
		kombatant.paddle.position.x = viewport.width * 0.02;
		this.addComponent( 'LeftKombatant', kombatant );
		this.scene.layers['HUD'].components['LeftName'].text = kombatant.paddle.name;
	}
};

KombatLayer.prototype.addPowerup = function( ) {
	this.addComponent( 'Powerup', new SpeedPowerup( ) );
};

KombatLayer.prototype.update = function( deltaTime ) {
	var ball = this.components['Ball'];
	var leftKombatant = this.components['LeftKombatant'];
	var rightKombatant = this.components['RightKombatant'];
	var powerup = this.components['Powerup'];
	var hud = this.scene.layers['HUD'].components['HUD'];
	
	if( !powerup && this.scene.timeElapsed >= this.nextPowerup ) {
		this.addPowerup( );
	}
	
	switch( this.scene.state ) {
		case this.scene.states.starting :
			return;
		break;
		
		case this.scene.states.fighting :
			if( ( ball.velocity.y > 0 && ball.boundingBox.bottom > viewport.height ) || ( ball.velocity.y < 0 && ball.boundingBox.top < hud.size.y ) )
			{
				console.log(ball.boundingBox, viewport.height, hud.size.y);
				ball.hitWall( );
			}
			
			if( ball.velocity.x > 0 && Collision.RectRect( ball.boundingBox, rightKombatant.paddle.boundingBox ) )
			{
				ball.hitPaddle( rightKombatant );
			}
			
			if( ball.velocity.x < 0 && Collision.RectRect( ball.boundingBox, leftKombatant.paddle.boundingBox ) )
			{
				ball.hitPaddle( leftKombatant );
			}
			
			if( powerup && Collision.RectRect( ball.boundingBox, powerup.boundingBox ) ) {
				ball.hitPowerup( );
			}
			
			if( ball.velocity.x > 0 && ball.boundingBox.left > viewport.width )
			{
				leftKombatant.score += 1;
				this.setBall( Balls.RANDOM );
			}
			else if( ball.velocity.x < 0 && ball.boundingBox.right < 0 )
			{
				rightKombatant.score += 1;
				this.setBall( Balls.RANDOM );
			}
			
			if( leftKombatant.paddle.projectile && Collision.RectRect( leftKombatant.paddle.projectile.boundingBox, rightKombatant.paddle.boundingBox ) ) {
				leftKombatant.score += 1;
				leftKombatant.paddle.projectile = null;
			}
			
			if( rightKombatant.paddle.projectile && Collision.RectRect( rightKombatant.paddle.projectile.boundingBox, leftKombatant.paddle.boundingBox ) ) {
				rightKombatant.score += 1;
				rightKombatant.paddle.projectile = null;
			}
		break;
		
		case this.scene.states.finishing :
		break;
	}
		
	Layer.prototype.update.call( this, deltaTime );
};