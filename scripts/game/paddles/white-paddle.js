function WhitePaddle( ) {
	this.color = new Color( 255, 255, 255 );
	this.enum = "WHITE"
	this.name = "White Paddle";
	this.bigness = 4.00;
	this.quickness = 5.00;
	
	this.projectileSequence = [ Buttons.DOWN, Buttons.DOWN, Buttons.RIGHT, Buttons.ACTION ];
	this.replenishSequence = [ Buttons.RIGHT, Buttons.LEFT, Buttons.LEFT, Buttons.ACTION ];
	
	this.endStory = "White Paddle defeats their twin sibling, White Paddle, in an epic battle of classic Pong. The competition went on for days, but the real victory was defeating the colorized, high-def paddles in the tournament and proving that, it's not the number of pixels and hues, but the content within.";
	this.story = "White Paddle makes up for their lack of visual stimulation with pure heart and dedication. The early 1970’s generated an illustrious career for them, but the eventual evolution to color and then to clarity has placed them in times of yore.";
	
	Paddle.call( this, 'White' );
	this.icon = Resources['Paddle-Icon-White'];
	this.broken = Resources['Paddle-Broken-White'];

	this.lifeModifier = 0.75;

	this.nameSound = new Sound( 'White-Paddle' );
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

	if( this.glue ) {
		this.glue.draw( context );
	}

	if( this.shield ) {
		this.shield.draw( context );
	}
	
	if( this.projectiles.length > 0 ) {
		for( var i = 0; i < this.projectiles.length; i++ ) {
			this.projectiles[i].draw( context );
		}
	}

	if( this.effect ) {
		this.effect.draw( context );
	}

	if( this.bloods.length > 0 ) {
		for( var i = 0; i < this.bloods.length; i++ ) {
			this.bloods[i].draw( context );
		}
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

	var projectile = new DefaultBall( this );
	projectile.sourcePaddle = this;
	projectile.position.x = this.position.x;
	projectile.position.y = this.position.y;
	
	var direction = Math.random( ) * 90 - 45;
	projectile.velocity.x = Math.cos( direction * Math.TO_RADIANS ) * viewport.width * 0.33;
	projectile.velocity.y = Math.sin( direction * Math.TO_RADIANS ) * viewport.width * 0.33;
	
	if( this.position.x > viewport.width * 0.50 )
	{
		projectile.velocity.x *= -1;
	}

	this.projectiles.push( projectile );
	InputManager.history = [ ];

	
	if( app.settings.SOUND_FX > 0 ) {
		projectile.sound = new Sound( 'Whoosh-3' );
		projectile.sound.setMaxVolume( 0.5 );
		projectile.sound.play();
	}
};

WhitePaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	//this.velocity = this.velocity.multiply( 0.9 );

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

	if( this.projectiles.length && SceneManager.currentScene && SceneManager.currentScene.layers['HUD'] ) {
		var layer = SceneManager.currentScene.layers['HUD'];
		var hud = ( layer ) ? layer.components['HUD'] : null;
		var top = ( hud ) ? hud.size.y : 0;
		
		for( var i in this.projectiles ) {
			var projectile = this.projectiles[i];

			if( projectile.velocity.y < 0 && projectile.boundingBox.top <= top ) {
				projectile.velocity.y *= -1;
			}

			if( projectile.velocity.y > 0 && projectile.boundingBox.bottom >= viewport.height ) {
				projectile.velocity.y *= -1;
			}

			if( projectile.boundingBox.left > viewport.width || projectile.boundingBox.right < 0 ) {
				this.projectiles.splice( this.projectiles.indexOf( projectile ), 1 );	
			}
		}
	}
};