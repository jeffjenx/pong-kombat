function WhitePaddle( ) {
	this.color = new Color( 255, 255, 255 );
	this.enum = "WHITE"
	this.name = "White Paddle";
	this.bigness = 4.00;
	this.quickness = 5.00;

	this.projectileSequence = [ Buttons.DOWN, Buttons.DOWN, Buttons.RIGHT, Buttons.ACTION ];
	this.replenishSequence = [ Buttons.RIGHT, Buttons.LEFT, Buttons.LEFT, Buttons.ACTION ];
	
	this.endStory = "white end story";
	this.story = "white story";
	
	Paddle.call( this, 'White' );
}

WhitePaddle.prototype = new Paddle;
WhitePaddle.prototype.constructor = WhitePaddle;

WhitePaddle.prototype.dismantle = function( opponent ) {
	var sceneTime = opponent.layer.scene.stateTime;
	
	if( sceneTime < 2 ) {
	} else if( sceneTime < 5 ) {
		this.velocity.x = viewport.width * ( sceneTime - 2 / 100 );
	}
};

WhitePaddle.prototype.draw = function( context ) {
	//Paddle.prototype.draw.call( this, context );
	Sprite.prototype.draw.call( this, context );

	if( this.shield ) {
		this.shield.draw( context );
	}
	
	if( this.projectile ) {
		this.projectile.draw( context );
	}

	if( this.bloodEffect ) {
		this.bloodEffect.draw( context );
	}
};

WhitePaddle.prototype.replenish = function( ) {
	if( this.quickness <= 4 ) {
		return;
	}

	this.bigness -= 0.25;
	this.quickness -= 0.25;
	this.kombatant.life = Math.min( this.kombatant.life + 0.5, SceneManager.currentScene.startLife );
	InputManager.history = [ ];
};

WhitePaddle.prototype.shootProjectile = function( ) {
	//Paddle.prototype.shootProjectile.call( this );
	//this.projectile.tint = this.color;

	this.projectile = new DefaultBall( this );
	this.projectile.sourcePaddle = this;
	this.projectile.position.x = this.position.x;
	this.projectile.position.y = this.position.y;
	
	var direction = Math.random( ) * 90 - 45;
	this.projectile.velocity.x = Math.cos( direction * Math.TO_RADIANS ) * viewport.width * 0.33;
	this.projectile.velocity.y = Math.sin( direction * Math.TO_RADIANS ) * viewport.width * 0.33;
	
	if( this.position.x > viewport.width * 0.50 )
	{
		this.projectile.velocity.x *= -1;
	}
};

WhitePaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	this.velocity = this.velocity.multiply( 0.9 );

	if( Math.abs( this.size.y - viewport.height * ( 0.01 * Math.pow( this.bigness, 2 ) + 0.09 ) ) < 0.03 )
	{
		this.size.y = viewport.height * ( 0.01 * Math.pow( this.bigness, 2 ) + 0.09 );
	}
	else if( this.size.y > viewport.height * ( 0.01 * Math.pow( this.bigness, 2 ) + 0.09 ) )
	{
		this.size.y -= viewport.height * 0.03 * deltaTime;
	}
	else if( this.size.y < viewport.height * ( 0.01 * Math.pow( this.bigness, 2 ) + 0.09 ) )
	{
		this.size.y += viewport.height * 0.03 * deltaTime;
	}

	if( this.projectile && SceneManager.currentScene && SceneManager.currentScene.layers['HUD'] ) {
		var layer = SceneManager.currentScene.layers['HUD'];
		var hud = ( layer ) ? layer.components['HUD'] : null;
		var top = ( hud ) ? hud.size.y : 0;
		if( this.projectile.velocity.y < 0 && this.projectile.boundingBox.top <= top ) {
			this.projectile.velocity.y *= -1;
		}

		if( this.projectile.velocity.y > 0 && this.projectile.boundingBox.bottom >= viewport.height ) {
			this.projectile.velocity.y *= -1;
		}
	}
};