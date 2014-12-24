function TowerBackgroundLayer( scene ) {
	Layer.call( this, scene );
	
	var background = new Background( 'Background-Tower' );
	this.addComponent( 'Background', background );

	this.bell = new Sprite( 'Bell-Shadow' );
	this.bell.size.y = viewport.height * 1.25;
	this.bell.size.x = this.bell.size.y;
	this.addComponent( 'Bell-Shadow', this.bell );

	this.rope1 = new Sprite( 'Rope-1' );
	this.rope1.size.y = viewport.height * 1.25;
	this.rope1.size.x = this.rope1.size.y;
	this.addComponent( 'Rope1', this.rope1 );

	this.rope2 = new Sprite( 'Rope-2' );
	this.rope2.position.x = viewport.width * 0.3;
	this.rope2.size.y = viewport.height * 1.25;
	this.rope2.size.x = this.rope2.size.y;
	this.addComponent( 'Rope2', this.rope2 );

	this.rope3 = new Sprite( 'Rope-3' );
	this.rope3.position.x = viewport.width * 0.3;
	this.rope3.size.y = viewport.height * 1.25;
	this.rope3.size.x = this.rope3.size.y;
	this.addComponent( 'Rope3', this.rope3 );

	this.rope4 = new Sprite( 'Rope-4' );
	this.rope4.position.x = viewport.width * 0.3;
	this.rope4.size.y = viewport.height * 1.25;
	this.rope4.size.x = this.rope4.size.y;
	this.addComponent( 'Rope4', this.rope4 );

	this.bellClapper = new Sprite( 'Bell-Clapper-Shadow' );
	this.bellClapper.size.y = viewport.height * 1.5;
	this.bellClapper.size.x = this.bellClapper.size.y;
	this.addComponent( 'Bell-Clapper-Shadow', this.bellClapper );

	this.bellBall = new Sprite( 'Bell-Ball-Shadow' );
	this.bellBall.size.y = viewport.height * 1.5;
	this.bellBall.size.x = this.bellBall.size.y;
	this.addComponent( 'Bell-Ball-Shadow', this.bellBall );
}

TowerBackgroundLayer.prototype = new Layer;
TowerBackgroundLayer.prototype.constructor = TowerBackgroundLayer;

TowerBackgroundLayer.prototype.update = function( deltaTime ) {
	Layer.prototype.update.call( this, deltaTime );

	var bellFrequency = Math.sin( app.gameTime / 3000 );

	this.bell.position.y = viewport.height / 2 + bellFrequency * viewport.width * 0.33;
	this.bellClapper.position.y = viewport.height / 2 + bellFrequency * viewport.width * 0.22;
	this.bellBall.position.y = viewport.height / 2 + bellFrequency * viewport.width * 0.11;

	var ropeFrequency = Math.cos( app.gameTime / 2000 );

	this.rope1.position.x = viewport.width * 0.3 + ropeFrequency * viewport.width * 0.01;
	this.rope2.position.x = viewport.width * 0.33 - ropeFrequency * viewport.width * 0.01;
	this.rope3.position.x = viewport.width * 0.67 + ropeFrequency * viewport.width * 0.01;
	this.rope4.position.x = viewport.width * 0.7 - ropeFrequency * viewport.width * 0.01;
};