function ShifterPaddle( ) {
	this.color = new Color( 255, 200, 155 );
	this.enum = "SHIFTER"
	this.name = "Shifter";
	this.bigness = 2.50;
	this.quickness = 3.50;
	
	this.projectileSequence = [ Buttons.RIGHT, Buttons.RIGHT, Buttons.LEFT, Buttons.ACTION ];
	this.dismantleSequence = [ Buttons.UP, Buttons.LEFT, Buttons.RIGHT, Buttons.ACTION ];

	this.endStory = "shifter end story";
	this.story = "shifter story";

	Paddle.call( this, 'Background-Title' );
	this.gloss = new Sprite( 'Paddle-Gloss-Shifter' );

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
	Paddle.prototype.shootProjectile.call( this );
	//this.projectile.tint = this.color;
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