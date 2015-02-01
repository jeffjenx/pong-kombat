function MrSlayerPaddle( ) {
	this.color = new Color( 160, 33, 33 );
	this.enum = "MRSLAYER"
	this.name = "Mr. Slayer";
	this.bigness = 3.00;
	this.quickness = 3.00;
	
	this.projectileSequence = [ Buttons.DOWN, Buttons.UP, Buttons.UP, Buttons.ACTION ];
	this.dismantleSequence = [ Buttons.UP, Buttons.UP, Buttons.DOWN, Buttons.ACTION ];
	
	this.endStory = "Mr. Slayer teaches White Paddle the meaning of pain. They become renowned as the Angel of Death, but are quickly banished to the kingdom of the dead.";
	this.story = "The year is 1994 and things are different than the years before; violence is what Mr. Slayer adores. It is their passion and it likely cannot be contained. Uninvited to the game, they cause unexpected chaos, mayhem and anarchy with no regrets.";
	
	Paddle.call( this, 'Paddle-MrSlayer' );
	this.icon = Resources['Paddle-Icon-MrSlayer'];
	this.broken = Resources['Paddle-Broken-MrSlayer'];

	this.gloss = new Sprite( 'Paddle-Gloss-MrSlayer' );

	this.nameSound = new Sound( 'Mr-Slayer' );
	this.nameSound.setMaxVolume( 1 * app.settings.SOUND_FX / 11 );
	
	this.dismantleAnimationFrames = [
		// end = start?? call only once, end < 0?? call indefinitely
		{ start : 1.0, end : 1.0, action : function(winner) {
			var projectile = new SawBladeProjectile(winner);
			projectile.zOrder = 1;
			projectile.position.x = winner.position.x;
			projectile.position.y = winner.position.y;
			
			projectile.velocity.x = Math.cos( winner.rotation * Math.TO_RADIANS ) * viewport.width * 0.4;
			projectile.velocity.y = Math.sin( winner.rotation * Math.TO_RADIANS ) * viewport.width * 0.4;

			projectile.rotation = winner.rotation;
			
			if( winner.position.x > viewport.width * 0.50 )
			{
				projectile.flipH = true;
				projectile.velocity.x *= -1;
			}
			//Paddle.prototype.shootProjectile.call( winner, new SawBladeProjectile(winner) );
			SceneManager.currentScene.layers['Kombat'].addComponent( 'Saw-Blade-Projectile', projectile );

			if( app.settings.SOUND_FX > 0 ) {
				var sawSound = new Sound( 'Saw-Blade' );
				sawSound.setMaxVolume( 0.75 * app.settings.SOUND_FX / 11 );
				sawSound.play();
			}
		} },
		{ start : 1.0, end : 5.0, action : function(winner,loser){
			var projectile = SceneManager.currentScene.layers['Kombat'].components['Saw-Blade-Projectile'];
			if( Math.abs(projectile.velocity.x) !== viewport.width * 0.2 && Collision.RectRect(projectile.boundingBox, loser.boundingBox ) ) {
				projectile.velocity.x /= 2;
				loser.getHit();
			}
		} },
		{ start : 3.5, end : 3.5, action : function() {
			if( app.settings.SOUND_FX > 0 ) {
				var screamSound = new Sound( 'Scream' );
				screamSound.setMaxVolume( 0.75 * app.settings.SOUND_FX / 11 );
				screamSound.play();
			}
		}},
		{ start : 6.0, end : -1, action : function(winner,loser){
			var projectile = SceneManager.currentScene.layers['Kombat'].components['Saw-Blade-Projectile'];
			projectile.velocity.x = (projectile.velocity.x > 0) ? viewport.width * 0.4 : -viewport.width * 0.4;
		} },
		{ start : 6.0, end : 6.0, action : function(winner, loser) {
			var paddleHalf = new Sprite( 'Paddle-Halved' );
			paddleHalf.zOrder = 1;
			paddleHalf.position.x = loser.position.x;
			paddleHalf.position.y = loser.position.y;
			paddleHalf.size.x = loser.size.x * loser.scale;
			paddleHalf.size.y = loser.size.y * loser.scale;
			SceneManager.currentScene.layers['Kombat'].addComponent('Paddle-Half', paddleHalf );
		} },
		{ start : 6.5, end : -1, action : function(winner, loser, percentComplete) { loser.dismantleFallToBottom(); } },
		{ start : 12.0, end : 12.0, action : function() { SceneManager.currentScene.changeState( SceneManager.currentScene.states.ending ); } }
	];
}

MrSlayerPaddle.prototype = new Paddle;
MrSlayerPaddle.prototype.constructor = MrSlayerPaddle;

MrSlayerPaddle.prototype.shootProjectile = function( ) {
	var projectile = new SkullProjectile(this);

	Paddle.prototype.shootProjectile.call( this, projectile );

	if( app.settings.SOUND_FX > 0 ) {
		projectile.sound = new Sound( 'Whoosh-3' );
		projectile.sound.setMaxVolume( 0.5 * app.settings.SOUND_FX / 11 );
		projectile.sound.play();
	}
};

MrSlayerPaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	//this.velocity = this.velocity.multiply( 0.9 );
};