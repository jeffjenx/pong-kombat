function KombatLayer( scene ) {
	Layer.call( this, scene );
	
	this.addComponent( 'Player', new Player( ) );
	this.addComponent( 'Opponent', new Opponent( ) );
	this.addComponent( 'Ball', new Ball( ) );
	
	this.components['Ball'].reset( );
}

KombatLayer.prototype = new Layer;
KombatLayer.prototype.constructor = KombatLayer;

KombatLayer.prototype.update = function( deltaTime ) {
	Layer.prototype.update.call( this, deltaTime );
	
	var ball = this.components['Ball'];
	
	if( ( ball.velocity.y > 0 && ball.boundingBox.bottom > viewport.height ) || ( ball.velocity.y < 0 && ball.boundingBox.top < 0 ) )
	{
		ball.velocity.y *= -1;
	}
	
	if( ball.velocity.x > 0 && Collision.RectRect( ball.boundingBox, this.components['Opponent'].boundingBox ) ||
	    ball.velocity.x < 0 && Collision.RectRect( ball.boundingBox, this.components['Player'].boundingBox ) )
	{
		ball.velocity.x *= -1;
		ball.hitPaddle( );
	}
	
	if( ball.velocity.x > 0 && ball.boundingBox.left > viewport.width )
	{
		this.components['Player'].score += 1;
		ball.reset( );
	}
	else if( ball.velocity.x < 0 && ball.boundingBox.right < 0 )
	{
		this.components['Opponent'].score += 1;
		ball.reset( );
	}
	
	if( this.components['PlayerProjectile'] && Collision.RectRect( this.components['PlayerProjectile'].boundingBox, this.components['Opponent'].boundingBox ) ) {
		this.components['Player'].score += 1;
		this.removeComponent( 'PlayerProjectile' );
	}
	
	if( this.components['OpponentProjectile'] && Collision.RectRect( this.components['OpponentProjectile'].boundingBox, this.components['Player'].boundingBox ) ) {
		this.components['Opponent'].score += 1;
		this.removeComponent( 'OpponentProjectile' );
	}
};