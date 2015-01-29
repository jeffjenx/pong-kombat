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
	this.broken = Resources['Paddle-Broken-Shifter'];
	this.gloss = new Sprite( 'Paddle-Gloss-Shifter' );
	this.opacity = 0.6;
	this.gloss.opacity = 0.6;

	this.patternCanvas.width = viewport.width;
	this.patternCanvas.height = viewport.height;

	this.nameSound = new Sound( 'Shifter' );
	
	this.dismantleAnimationFrames = [
		// end = start?? call only once, end < 0?? call indefinitely
		{ start : 1.0, end : 4.0, action : function(winner, loser, percentComplete) { winner.dismantleVanish(percentComplete); } },
		{ start : 2.0, end : 4.5, action: function(winner, loser, percentComplete) { loser.dismantleMeanderToMiddle(percentComplete); } },
		
		{ start : 6.0, end : 6.2, action : function(winner, loser, percentComplete) { winner.dismantleAppear(); } },
		{ start : 6.1, end : 6.1, action : function(winner,loser){ loser.getHit(); } },
		{ start : 6.3, end :  7.3, action : function(winner, loser, percentComplete) { winner.dismantleVanish(percentComplete); } },
		
		{ start : 8.0, end : 8.2, action : function(winner, loser, percentComplete) { winner.dismantleAppear(); } },
		{ start : 8.1, end : 8.1, action : function(winner,loser){ loser.getHit(); } },
		{ start : 8.3, end : 9.3, action : function(winner, loser, percentComplete) { winner.dismantleVanish(percentComplete); } },
		
		{ start : 10.0, end : 10.2, action : function(winner, loser, percentComplete) { winner.dismantleAppear(); } },
		{ start : 10.1, end : 10.1, action : function(winner,loser){ loser.getHit(); } },
		{ start : 10.3, end : 13.3, action : function(winner, loser, percentComplete) { winner.dismantleVanish(percentComplete); } },

		{ start : 10.2, end : 15.0, action : function(winner, loser) {loser.dismantleFallToBottom();} },
		
		{ start : 14.0, end : 14.0, action : function() { SceneManager.currentScene.changeState( SceneManager.currentScene.states.ending ); } }
	];
}

ShifterPaddle.prototype = new Paddle;
ShifterPaddle.prototype.constructor = ShifterPaddle;

ShifterPaddle.prototype.shootProjectile = function( ) {
	//Paddle.prototype.shootProjectile.call( this );
	//this.projectile.tint = this.color;
	var projectile = new LaserProjectile( this );
	Paddle.prototype.shootProjectile.call( this, projectile );

	
	if( app.settings.SOUND_FX > 0 ) {
		projectile.sound = new Sound( 'Laser' );
		projectile.sound.setMaxVolume( 0.5 );
		projectile.sound.play();
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