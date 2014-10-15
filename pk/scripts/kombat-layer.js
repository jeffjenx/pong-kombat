function KombatLayer( scene ) {
	Layer.call( this, scene );
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

KombatLayer.prototype.setBall = function( ) {
	if( !this.components['Ball'] ) {
		this.addComponent( 'Ball', new Ball( ) );
	}
	
	this.components['Ball'].reset( );
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

KombatLayer.prototype.update = function( deltaTime ) {
	var ball = this.components['Ball'];
	var leftKombatant = this.components['LeftKombatant'];
	var rightKombatant = this.components['RightKombatant'];
	
	switch( this.scene.state ) {
		case this.scene.states.starting :
			return;
		break;
		
		case this.scene.states.fighting :
			if( ( ball.velocity.y > 0 && ball.boundingBox.bottom > viewport.height ) || ( ball.velocity.y < 0 && ball.boundingBox.top < viewport.width * 0.03 ) )
			{
				ball.hitWall( );
			}
			
			if( ball.velocity.x > 0 && Collision.RectRect( ball.boundingBox, rightKombatant.paddle.boundingBox ) ||
			    ball.velocity.x < 0 && Collision.RectRect( ball.boundingBox, leftKombatant.paddle.boundingBox ) )
			{
				ball.hitPaddle( );
			}
			
			if( ball.velocity.x > 0 && ball.boundingBox.left > viewport.width )
			{
				leftKombatant.score += 1;
				ball.reset( );
			}
			else if( ball.velocity.x < 0 && ball.boundingBox.right < 0 )
			{
				rightKombatant.score += 1;
				ball.reset( );
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