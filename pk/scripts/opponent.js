function Opponent( ) {
	Paddle.call( this );
	
	this.score = 0;
	
	this.position.x = viewport.width * 0.98;
	this.position.y = viewport.height * 0.50;
}

Opponent.prototype = new Paddle;
Opponent.prototype.constructor = Opponent;

Opponent.prototype.applyAI = function( ) {
	var ball = this.layer.components['Ball'];
	
	//if( this.position.y < ball.position.y )
	if( this.boundingBox.bottom < ball.position.y )
	{
		this.moveDown( );
	}
	//else if( this.position.y > ball.position.y )
	else if( this.boundingBox.top > ball.position.y )
	{
		this.moveUp( );
	}
}

Opponent.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	
	this.applyAI( );
	
	this.restrictToBounds( );
};