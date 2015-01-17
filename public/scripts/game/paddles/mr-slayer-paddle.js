function MrSlayerPaddle( ) {
	this.color = new Color( 160, 33, 33 );
	this.enum = "MRSLAYER"
	this.name = "Mr. Slayer";
	this.bigness = 3.00;
	this.quickness = 3.00;
	
	this.projectileSequence = [ Buttons.DOWN, Buttons.UP, Buttons.DOWN, Buttons.ACTION ];
	this.dismantleSequence = [ Buttons.UP, Buttons.DOWN, Buttons.UP, Buttons.ACTION ];
	
	this.endStory = "Mr. Slayer teaches White Paddle the meaning of pain. They become renowned as the Angel of Death, but are quickly banished to the kingdom of the dead.";
	this.story = "The year is 1994 and things are different than the years before; violence is what Mr. Slayer adores. It is their passion and it likely cannot be contained. Uninvited to the game, they cause unexpected chaos, mayhem and anarchy with no regrets.";
	
	Paddle.call( this, 'Paddle-MrSlayer' );
	this.icon = Resources['Paddle-Icon-MrSlayer'];

	this.gloss = new Sprite( 'Paddle-Gloss-MrSlayer' );

	this.nameSound = new Sound( 'Mr-Slayer' );
	this.geminiSound = new Sound( 'Gemini' );
}

MrSlayerPaddle.prototype = new Paddle;
MrSlayerPaddle.prototype.constructor = MrSlayerPaddle;

MrSlayerPaddle.prototype.dismantle = function( opponent ) {
	var sceneTime = opponent.layer.scene.stateTime;
	
	if( sceneTime < 2 ) {
	} else if( sceneTime < 5 ) {
		this.velocity.x = viewport.width * ( sceneTime - 2 / 100 );
	}
};

MrSlayerPaddle.prototype.shootProjectile = function( ) {
	//Paddle.prototype.shootProjectile.call( this );
	//this.projectile.tint = this.color;

	this.projectile = new BloodballProjectile( this );
	this.projectile.sourcePaddle = this;
	this.projectile.position.x = this.position.x;
	this.projectile.position.y = this.position.y;
	
	this.projectile.velocity.x = Math.cos( this.rotation * Math.TO_RADIANS ) * viewport.width * 0.33;
	this.projectile.velocity.y = Math.sin( this.rotation * Math.TO_RADIANS ) * viewport.width * 0.33;
	
	if( this.position.x > viewport.width * 0.50 )
	{
		this.projectile.velocity.x *= -1;
	}

	if( app.settings.SOUND_FX > 0 ) {
		this.geminiSound.stop();
		this.geminiSound.play();
	}
};

MrSlayerPaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	//this.velocity = this.velocity.multiply( 0.9 );
};