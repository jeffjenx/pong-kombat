function ShifterPaddle( ) {
	this.color = new Color( 255, 200, 155 );
	this.enum = "SHIFTER"
	this.name = "Shifter";
	this.bigness = 2.50;
	this.quickness = 3.50;
	
	this.projectileSequence = [ Buttons.RIGHT, Buttons.RIGHT, Buttons.LEFT, Buttons.ACTION ];
	this.dismantleSequence = [ Buttons.UP, Buttons.LEFT, Buttons.RIGHT, Buttons.ACTION ];

	this.endStory = "No one knows what Shifter has been up to since prevailing in the Pong Lao Tournament. I mean, they are practically invisible.";
	this.story = "Shifter has entered the tournament as a joke and for personal entertainment since the sport of battle has intrigued them as long as they can remember, and they have adapted their appearance to guarantee victory.";

	Paddle.call( this, 'Background-Title' );
	this.icon = Resources['Paddle-Icon-Shifter'];
	this.gloss = new Sprite( 'Paddle-Gloss-Shifter' );
	this.opacity = 0.6;
	this.gloss.opacity = 0.6;

	this.patternCanvas.width = viewport.width;
	this.patternCanvas.height = viewport.height;

	this.nameSound = new Sound( 'Shifter' );
	this.laserSound = new Sound( 'Laser' );
	
	this.dismantleAnimationFrames = [
		// end = start?? call only once, end < 0?? call indefinitely
		{ start : 1.0, end : 4.0, action : function(winner, loser, percentComplete) { winner.dismantleVanish(percentComplete); } },
		{ start : 6.0, end : 7.0, action : function(winner, loser, percentComplete) { winner.dismantleAppear(); } },
		{ start : 7.0, end :  10.0, action : function(winner, loser, percentComplete) { winner.dismantleVanish(percentComplete); } },
		{ start : 10.0, end : 11.0, action : function(winner, loser, percentComplete) { winner.dismantleAppear(); } },
		{ start : 11.0, end :  12.5, action : function(winner, loser, percentComplete) { winner.dismantleVanish(percentComplete); } },
		{ start : 12.5, end : 14.0, action : function(winner, loser, percentComplete) { winner.dismantleAppear(); } },
		{ start : 14.0, end :  15.0, action : function(winner, loser, percentComplete) { winner.dismantleVanish(percentComplete); } },
		{ start : 15.0, end : 15.0, action : function() { SceneManager.currentScene.changeState( SceneManager.currentScene.states.ending ); } }
	];
}

ShifterPaddle.prototype = new Paddle;
ShifterPaddle.prototype.constructor = ShifterPaddle;

ShifterPaddle.prototype.dismantle = function( opponent ) {
	var sceneTime = opponent.layer.scene.stateTime;
	
	if( sceneTime < 2 ) {
	} else if( sceneTime < 5 ) {
		this.velocity.x = viewport.width * ( sceneTime - 2 / 100 );
	}
};

ShifterPaddle.prototype.shootProjectile = function( ) {
	//Paddle.prototype.shootProjectile.call( this );
	//this.projectile.tint = this.color;

	this.projectile = new LaserProjectile( this );
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
		this.laserSound.stop();
		this.laserSound.play();
	}
};

ShifterPaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	//this.velocity = this.velocity.multiply( 0.9 );
	
	this.offset *= -1;

	if( SceneManager.currentScene
	 && SceneManager.currentScene.layers['Background'] 
	 && SceneManager.currentScene.layers['Background'].components['Background']
	 && SceneManager.currentScene.layers['Background'].components['Background'].resource !== this.resource )
	{
		this.resource = SceneManager.currentScene.layers['Background'].components['Background'].resource;
		this.image = Resources[this.resource];
	}
};