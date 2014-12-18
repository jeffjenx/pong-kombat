function TempScene( ) {
	Scene.call( this );
	
	this.testLayer = new Layer( );
	this.addLayer( 'TestLayer', this.testLayer );
	
	this.testComponent = new Component( );
	this.testLayer.addComponent( 'TesterComponent', this.testComponent );
}

TempScene.prototype = new Scene;
TempScene.prototype.constructor = TempScene;

TempScene.prototype.draw = function( context )
{
	context.save();
	context.fillStyle = 'rgb(255,255,255)';
	context.rect(0,0,viewport.width,viewport.height);
	context.fill();
	context.restore();
	Scene.prototype.draw.call( this, context );
};

TempScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );
	
	if( InputManager.isButtonDown( Buttons.ACTION ) ) {
		this.testComponent.velocity.x += viewport.width * 0.03;
	}
	
	//this.testComponent.velocity.multiply( 0.9 );
};