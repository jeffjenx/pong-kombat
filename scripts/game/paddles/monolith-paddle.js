function MonolithPaddle( ) {
	this.color = new Color( 155, 50, 0 );
	this.enum = "MONOLITH"
	this.name = "Monolith";
	this.bigness = 5.00;
	this.quickness = 3.00;
	
	this.projectileSequence = [ Buttons.DOWN, Buttons.UP, Buttons.DOWN, Buttons.ACTION ];
	this.dismantleSequence = [ Buttons.UP, Buttons.DOWN, Buttons.UP, Buttons.ACTION ];
	
	this.endStory = "After the tournament, Monolith was found lifeless in the barren regions of northern Chile. They were taken to a local facility where their chemical makeup was determined to be that of a MGP Pallasite meteorite, Imilac, and are held captive to this day.";
	this.story = "Monolith has spent the past million years eroding into their current form. When White Paddle constructed his tournament, they enlisted the massive paddle for the sole purpose of intimidating the opposition.";
	
	Paddle.call( this, 'Paddle-Monolith' );
	this.icon = Resources['Paddle-Icon-Monolith'];
	this.broken = Resources['Paddle-Broken-Monolith'];

	this.lifeModifier = 0.5;
	this.gloss = new Sprite( 'Paddle-Gloss-Monolith' );

	// Monolith throws 3 rocks at a time
	this.maxProjectiles = 3;

	this.nameSound = new Sound( 'Monolith' );
	this.nameSound.setMaxVolume( 1 * app.settings.SOUND_FX / 11 );
	
	this.dismantleAnimationFrames = [
		// end = start?? call only once, end < 0?? call indefinitely
		{ start : 1.0, end : 1.0, action : function(winner, loser) { winner.shootProjectile(); loser.maxBloods = 15; } },
		{ start : 1.0, end : 1.5, action : function(winner) { winner.moveUp(); winner.velocity.y *= 0.5; } },
		{ start : 1.25, end : 1.25, action : function(winner) { winner.shootProjectile(); } },
		{ start : 1.5, end : 1.5, action : function(winner) { winner.shootProjectile(); } },
		{ start : 1.5, end : 2.5, action : function(winner) { winner.moveDown(); winner.velocity.y *= 0.5; } },
		{ start : 1.75, end : 1.75, action : function(winner) { winner.shootProjectile(); } },
		{ start : 2.25, end : 2.25, action : function(winner) { winner.shootProjectile(); } },
		{ start : 2.5, end : 2.5, action : function(winner) { winner.shootProjectile(); } },
		{ start : 2.5, end : 3.0, action : function(winner) { winner.moveUp(); winner.velocity.y *= 0.5; } },
		{ start : 2.75, end : 2.75, action : function(winner) { winner.shootProjectile(); } },
		{ start : 3.0, end : 3.0, action : function(winner) { winner.shootProjectile(); } },
		{ start : 3.0, end : 3.0, action : function(winner, loser) { winner.shootProjectile(); } },
		{ start : 4.0, end : 4.0, action : function(winner, loser) { loser.dismantleStickToWall(winner); } },
		{ start : 5.0, end : 8.0, action : function(winner, loser, percentComplete) {
			for( var i in winner.projectiles) {
				if( winner.projectiles[i].velocity.x === 0) {
					winner.projectiles[i].rotation = 0;
				}
			}
			loser.dismantleRocked(percentComplete);
		} },
		{ start : 9.0, end : -1, action : function(winner,loser,percentComplete) { loser.dismantleRockFalling(); } },
		{ start : 9.5, end : -1, action : function(winner,loser){ loser.dismantleFallToBottom(); } },
		{ start : 10.0, end : 10.0, action : function() {
			var dropSound = new Sound( 'Drop-Cup' );
			dropSound.setMaxVolume( 1 * app.settings.SOUND_FX / 11 );
			dropSound.play();
		} },
		{ start : 13.0, end : 13.0, action : function() { SceneManager.currentScene.changeState( SceneManager.currentScene.states.ending ); } }
	];
}

MonolithPaddle.prototype = new Paddle;
MonolithPaddle.prototype.constructor = MonolithPaddle;

MonolithPaddle.prototype.shootProjectile = function( ) {
	var projectile = new RockProjectile( this );
	Paddle.prototype.shootProjectile.call( this, projectile );

	var direction = (this.position.x > viewport.width * 0.5 ) ? -180 : 0;
	var projectile2 = new RockProjectile( this );
	Paddle.prototype.shootProjectile.call( this, projectile2 );
	projectile2.position.y = projectile.position.y - this.size.y * 0.11;
	projectile2.velocity.x = Math.cos( (direction-1.5) * Math.TO_RADIANS ) * viewport.width * (0.33 + Math.random() * 0.07);
	projectile2.velocity.y = Math.sin( (direction-1.5) * Math.TO_RADIANS ) * viewport.width * (0.33 + Math.random() * 0.07);

	var projectile3 = new RockProjectile( this );
	Paddle.prototype.shootProjectile.call( this, projectile3 );
	projectile3.position.y = projectile.position.y + this.size.y * 0.11;
	projectile3.velocity.x = Math.cos( (direction+1.5) * Math.TO_RADIANS ) * viewport.width * (0.33 + Math.random() * 0.07);
	projectile3.velocity.y = Math.sin( (direction+1.5) * Math.TO_RADIANS ) * viewport.width * (0.33 + Math.random() * 0.07);
	
	if( app.settings.SOUND_FX > 0 ) {
		projectile.sound = new Sound( 'Throw' );
		projectile.sound.setMaxVolume( 0.5 * app.settings.SOUND_FX / 11 );
		projectile.sound.play();
	}
};