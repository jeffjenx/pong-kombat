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
	this.gloss = new Sprite( 'Paddle-Gloss-Shifter' );
	this.opacity = 0.6;
	this.gloss.opacity = 0.6;

	this.patternCanvas.width = viewport.width;
	this.patternCanvas.height = viewport.height;
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
};

ShifterPaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	this.velocity = this.velocity.multiply( 0.9 );
	
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