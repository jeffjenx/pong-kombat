function Ball( ) {
	Sprite.call( this, 'Ball' );
	
	this.startSpeed = 1;
	this.maxSpeed = 6;
	
	this.position.x = viewport.width * 0.50;
	this.position.y = viewport.height * 0.50;
	this.size.x = viewport.height * 0.02;
	this.size.y = viewport.height * 0.02;
	
	// Audio
	if( !app.isMobile( ) )
	{
		this.beepSound = new Sound( 'Beep' );
		this.boopSound = new Sound( 'Boop' );
	}
}

Ball.prototype = new Sprite;
Ball.prototype.constructor = Ball;

Ball.prototype.hitPaddle = function( ) {
	this.velocity.x *= -1;
	
	// Increase ball speed over time
	if( this.speed < this.maxSpeed )
	{
		this.speed += 1;
		this.velocity = this.velocity.multiply( 1.25 );
	}
	
	if( !app.isMobile( ) )
	{
		this.beepSound.stop( );
		this.beepSound.play( );
	}
};

Ball.prototype.hitWall = function( ) {
	this.velocity.y *= -1;
	
	if( !app.isMobile( ) )
	{
		this.boopSound.stop( );
		this.boopSound.play( );
	}
};

Ball.prototype.reset = function( ) {
	this.speed = this.startSpeed;
	
	this.position.x = viewport.width * 0.50;
	this.position.y = viewport.height * 0.50;
	
	var angle;
	var speed = viewport.width * 0.1; // Always start at the same speed
	
	// Randomize direction of ball
	angle = Math.random( ) * 90 - 45; // Angle between -45 and +45deg
	angle += ( Math.random( ) >= 0.5 ) ? 180 : 0; // Towards left or right
	angle *= Math.PI / 180; // Convert ot radians
	
	this.velocity.x = Math.abs( speed ) * Math.cos( angle );
	this.velocity.y = Math.abs( speed ) * Math.sin( angle );
};

Ball.prototype.update = function( deltaTime ) {
	Sprite.prototype.update.call( this, deltaTime );
};