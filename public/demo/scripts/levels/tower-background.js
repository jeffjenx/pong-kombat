function TowerBackgroundLayer( scene ) {
	Layer.call( this, scene );
	
	var background = new Background( 'Background-Tower' );
	this.addComponent( 'Background', background );
}

TowerBackgroundLayer.prototype = new Layer;
TowerBackgroundLayer.prototype.constructor = TowerBackgroundLayer;