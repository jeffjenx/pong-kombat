function TowerForegroundLayer( scene ) {
	Layer.call( this, scene );

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
}

TowerForegroundLayer.prototype = new Layer;
TowerForegroundLayer.prototype.constructor = TowerForegroundLayer;

TowerForegroundLayer.prototype.update = function( deltaTime ) {
	Layer.prototype.update.call( this, deltaTime );

	var ropeFrequency = Math.cos( app.gameTime / 2000 );

	this.rope1.position.x = viewport.width * 0.3 + ropeFrequency * viewport.width * 0.01;
	this.rope2.position.x = viewport.width * 0.33 - ropeFrequency * viewport.width * 0.01;
	this.rope3.position.x = viewport.width * 0.67 + ropeFrequency * viewport.width * 0.01;
	this.rope4.position.x = viewport.width * 0.7 - ropeFrequency * viewport.width * 0.01;
};